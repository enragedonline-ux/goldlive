import { cacheLife } from "next/cache";

/**
 * Free ECB-based FX rates (no key). Returns units of `to` per 1 USD.
 * Falls back to 1 (USD) when the currency is unsupported or fetch fails.
 */
export async function usdTo(currency: string): Promise<number> {
  if (!currency || currency === "USD") return 1;
  return _usdToCached(currency.toUpperCase());
}

async function _usdToCached(currency: string): Promise<number> {
  "use cache";
  cacheLife("hours");
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(`https://api.frankfurter.app/latest?from=USD&to=${currency}`, {
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!res.ok) return 1;
    const data = await res.json();
    const rate = data?.rates?.[currency];
    return typeof rate === "number" && rate > 0 ? rate : 1;
  } catch {
    return 1;
  }
}
