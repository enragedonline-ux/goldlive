import type { AssetPrice } from "@/lib/prices";
import { fmtPrice, fmtPct } from "@/lib/format";

export default function Ticker({ assets }: { assets: AssetPrice[] }) {
  const items = assets.map((a) => (
    <span key={a.id}>
      {a.name.toUpperCase()} <b>{fmtPrice(a.price)}</b>{" "}
      <span className={a.change24h !== null && a.change24h >= 0 ? "up" : "down"}>{fmtPct(a.change24h)}</span>
    </span>
  ));
  return (
    <div className="ticker" aria-hidden>
      <div className="ticker-track">
        {items}
        {items}
      </div>
    </div>
  );
}
