import { cacheLife } from "next/cache";

export interface AssetDef {
  id: string;
  symbol: string;
  name: string;
  pair: string;
  kind: "metal" | "crypto";
  coingeckoId?: string;
  /** Human label for the history data source (metal proxies) */
  histLabel?: string;
}

export interface AssetPrice {
  id: string;
  symbol: string;
  name: string;
  pair: string;
  price: number;
  change24h: number | null;
  updatedAt: string;
}

export interface HistoryPoint {
  time: string;
  value: number;
}

/** Hourly points for smooth intraday-style charts (unix seconds) */
export interface IntradayPoint {
  time: number;
  value: number;
}

export async function getPricesCached(): Promise<{ assets: AssetPrice[]; updatedAt: string }> {
  "use cache";
  cacheLife("minutes");
  return getPrices();
}

export async function getHistoryCached(assetId: string): Promise<HistoryPoint[]> {
  "use cache";
  cacheLife("hours");
  return getHistory(assetId);
}

export const ASSETS: AssetDef[] = [
  { id: "gold", symbol: "XAU", name: "Gold", pair: "XAU/USD", kind: "metal", coingeckoId: "pax-gold", histLabel: "PAX Gold (PAXG)" },
  { id: "silver", symbol: "XAG", name: "Silver", pair: "XAG/USD", kind: "metal", coingeckoId: "kinesis-silver", histLabel: "Kinesis Silver (KAG)" },
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", pair: "BTC/USD", kind: "crypto", coingeckoId: "bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", pair: "ETH/USD", kind: "crypto", coingeckoId: "ethereum" },
];

async function fetchJson(url: string, timeoutMs = 9000): Promise<any> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": "AurumCharts/1.0" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

const memCache = new Map<string, { at: number; data: any }>();

async function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const hit = memCache.get(key);
  if (hit && Date.now() - hit.at < ttlMs) return hit.data as T;
  const data = await fn();
  // Never cache empty results (e.g. a rate-limited fetch) — retry next time
  if (!Array.isArray(data) || data.length > 0) {
    memCache.set(key, { at: Date.now(), data });
  }
  return data;
}

/**
 * Daily history via CoinGecko market_chart.
 * Metals use 1:1-backed token proxies (PAXG ~ XAU, KAG ~ XAG); crypto uses native markets.
 */
async function getCoinGeckoHistory(coingeckoId: string, days = 90): Promise<HistoryPoint[]> {
  return cached(`hist-${coingeckoId}-${days}`, 15 * 60_000, async () => {
    try {
      const data = await fetchJson(
        `https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart?vs_currency=usd&days=${days}`
      );
      const prices: [number, number][] = data?.prices ?? [];
      // Downsample to one point per day (last tick of each UTC day)
      const byDay = new Map<string, number>();
      for (const [ts, v] of prices) {
        if (!Number.isFinite(v) || v <= 0) continue;
        byDay.set(new Date(ts).toISOString().slice(0, 10), v);
      }
      return [...byDay.entries()].map(([time, value]) => ({ time, value }));
    } catch {
      return [];
    }
  });
}

/** Raw hourly points (for 24h change calc) */
async function getCoinGeckoHourly(coingeckoId: string): Promise<[number, number][]> {
  return cached(`hourly-${coingeckoId}`, 10 * 60_000, async () => {
    try {
      const data = await fetchJson(
        `https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart?vs_currency=usd&days=2`
      );
      const prices: [number, number][] = data?.prices ?? [];
      return prices.filter(([, v]) => Number.isFinite(v) && v > 0);
    } catch {
      return [];
    }
  });
}

function change24hFromHourly(pts: [number, number][]): number | null {
  if (pts.length < 25) return null;
  const last = pts[pts.length - 1][1];
  // find point closest to 24h before the last timestamp
  const target = pts[pts.length - 1][0] - 24 * 3600 * 1000;
  let best = pts[0];
  for (const p of pts) {
    if (Math.abs(p[0] - target) < Math.abs(best[0] - target)) best = p;
  }
  if (!best[1]) return null;
  return ((last - best[1]) / best[1]) * 100;
}

export async function getPrices(): Promise<{ assets: AssetPrice[]; updatedAt: string }> {
  const [xau, xag, crypto, goldH, silverH] = await Promise.all([
    cached("live-xau", 60_000, () => fetchJson("https://api.gold-api.com/price/XAU").catch(() => null)),
    cached("live-xag", 60_000, () => fetchJson("https://api.gold-api.com/price/XAG").catch(() => null)),
    cached("live-crypto", 60_000, () =>
      fetchJson(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
      ).catch(() => null)
    ),
    getCoinGeckoHourly("pax-gold"),
    getCoinGeckoHourly("kinesis-silver"),
  ]);

  const now = new Date().toISOString();
  const goldLast = goldH.length ? goldH[goldH.length - 1][1] : 0;
  const silverLast = silverH.length ? silverH[silverH.length - 1][1] : 0;
  const assets: AssetPrice[] = [
    {
      id: "gold", symbol: "XAU", name: "Gold", pair: "XAU/USD",
      price: typeof xau?.price === "number" ? xau.price : goldLast,
      change24h: change24hFromHourly(goldH),
      updatedAt: xau?.updatedAt ?? now,
    },
    {
      id: "silver", symbol: "XAG", name: "Silver", pair: "XAG/USD",
      price: typeof xag?.price === "number" ? xag.price : silverLast,
      change24h: change24hFromHourly(silverH),
      updatedAt: xag?.updatedAt ?? now,
    },
    {
      id: "bitcoin", symbol: "BTC", name: "Bitcoin", pair: "BTC/USD",
      price: crypto?.bitcoin?.usd ?? 0,
      change24h: typeof crypto?.bitcoin?.usd_24h_change === "number" ? crypto.bitcoin.usd_24h_change : null,
      updatedAt: now,
    },
    {
      id: "ethereum", symbol: "ETH", name: "Ethereum", pair: "ETH/USD",
      price: crypto?.ethereum?.usd ?? 0,
      change24h: typeof crypto?.ethereum?.usd_24h_change === "number" ? crypto.ethereum.usd_24h_change : null,
      updatedAt: now,
    },
  ];
  return { assets, updatedAt: now };
}

export async function getHistory(assetId: string): Promise<HistoryPoint[]> {
  const def = ASSETS.find((a) => a.id === assetId);
  if (!def?.coingeckoId) return [];
  return getCoinGeckoHistory(def.coingeckoId, 365);
}

/** 5-minute candles for the last 24h (CoinGecko granularity for days=1) */
export async function getIntraday5m(assetId: string): Promise<IntradayPoint[]> {
  const def = ASSETS.find((a) => a.id === assetId);
  if (!def?.coingeckoId) return [];
  return cached(`intraday5m-${def.coingeckoId}`, 10 * 60_000, async () => {
    try {
      const data = await fetchJson(
        `https://api.coingecko.com/api/v3/coins/${def.coingeckoId}/market_chart?vs_currency=usd&days=1`
      );
      const prices: [number, number][] = data?.prices ?? [];
      return prices
        .filter(([, v]) => Number.isFinite(v) && v > 0)
        .map(([ts, value]) => ({ time: Math.floor(ts / 1000), value }));
    } catch {
      return [];
    }
  });
}

export async function getIntraday5mCached(assetId: string): Promise<IntradayPoint[]> {
  "use cache";
  cacheLife("minutes");
  return getIntraday5m(assetId);
}

export async function getIntraday(assetId: string): Promise<IntradayPoint[]> {
  const def = ASSETS.find((a) => a.id === assetId);
  if (!def?.coingeckoId) return [];
  return cached(`intraday-${def.coingeckoId}`, 15 * 60_000, async () => {
    try {
      const data = await fetchJson(
        `https://api.coingecko.com/api/v3/coins/${def.coingeckoId}/market_chart?vs_currency=usd&days=30`
      );
      const prices: [number, number][] = data?.prices ?? [];
      return prices
        .filter(([, v]) => Number.isFinite(v) && v > 0)
        .map(([ts, value]) => ({ time: Math.floor(ts / 1000), value }));
    } catch {
      return [];
    }
  });
}

export async function getIntradayCached(assetId: string): Promise<IntradayPoint[]> {
  "use cache";
  cacheLife("hours");
  return getIntraday(assetId);
}
