import { cacheLife } from "next/cache";

/**
 * Free FX rates (no key). Returns units of `to` per 1 USD.
 * Tries frankfurter.dev first, falls back to open.er-api.com (wider currency coverage
 * incl. AED/SAR/QAR/KWD/BHD), then to 1 (USD) if both fail.
 */
export async function usdTo(currency: string): Promise<number> {
  if (!currency || currency === "USD") return 1;
  return _usdToCached(currency.toUpperCase());
}

async function fetchRate(url: string, pick: (d: any) => number | undefined): Promise<number | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    const rate = pick(await res.json());
    return typeof rate === "number" && rate > 0 ? rate : null;
  } catch {
    return null;
  }
}

async function _usdToCached(currency: string): Promise<number> {
  "use cache";
  cacheLife("hours");

  const r1 = await fetchRate(
    `https://api.frankfurter.dev/v1/latest?from=USD&to=${currency}`,
    (d) => d?.rates?.[currency]
  );
  if (r1 !== null) return r1;

  const r2 = await fetchRate(
    `https://open.er-api.com/v6/latest/USD`,
    (d) => d?.rates?.[currency]
  );
  if (r2 !== null) return r2;

  return 1;
}
