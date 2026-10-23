import Link from "next/link";
import { fmtPriceExact, fmtPct } from "@/lib/format";

export interface OrbitAsset {
  id: string;
  name: string;
  price: number | null;
  change24h: number | null;
  href: string;
  icon: string;
}

/**
 * Lightweight static version — server-rendered, zero client JS.
 * 5 asset cards in a clean row with live prices.
 */
export default function AssetOrbitStatic({ assets }: { assets: OrbitAsset[] }) {
  return (
    <section className="aorbit-static" aria-label="Live asset prices">
      <h2>Live Prices at a Glance</h2>
      <div className="aorbit-cards">
        {assets.map((a) => {
          const chg = a.change24h;
          const down = chg !== null && chg < 0;
          return (
            <Link key={a.id} href={a.href} className="aorbit-card">
              <span className="aorbit-card-name">{a.name}</span>
              <span className="aorbit-card-price">
                {a.price !== null ? fmtPriceExact(a.price) : "—"}
              </span>
              {chg !== null && (
                <span className={down ? "neg" : "pos"}>{fmtPct(chg)}</span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
