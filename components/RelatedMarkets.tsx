import Link from "next/link";
import { getPrices } from "@/lib/prices";
import { fmtPriceExact, fmtPct } from "@/lib/format";
import type { RelatedLink } from "./PricePage";

const MAIN_PAGE: Record<string, string> = {
  gold: "/gold-price-today",
  silver: "/silver-price-today",
  bitcoin: "/bitcoin-price",
  ethereum: "/ethereum-price",
};

const NAMES: Record<string, string> = {
  gold: "Gold",
  silver: "Silver",
  bitcoin: "Bitcoin",
  ethereum: "Ethereum",
};

export default async function RelatedMarkets({
  asset,
  related,
}: {
  asset: string;
  related: RelatedLink[];
}) {
  const { assets } = await getPrices();
  const others = assets.filter((a) => a.id !== asset);
  const links = related.slice(0, 3);

  return (
    <section className="rmark" aria-label="Related markets">
      {links.length > 0 && (
        <div className="rmark-row">
          <span className="rmark-label">More {NAMES[asset].toLowerCase()} prices</span>
          <span className="rmark-links">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rmark-link">
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      )}
      <div className="rmark-row">
        <span className="rmark-label">Other live markets</span>
        <span className="rmark-links">
          {others.map((a) => {
            const chg = a.change24h;
            const down = chg !== null && chg < 0;
            return (
              <Link key={a.id} href={MAIN_PAGE[a.id]} className="rmark-link rmark-rate">
                <strong>{NAMES[a.id]}</strong>
                <span>{a.price ? fmtPriceExact(a.price) : "—"}</span>
                {chg !== null && (
                  <em className={down ? "neg" : "pos"}>{fmtPct(chg)}</em>
                )}
              </Link>
            );
          })}
        </span>
      </div>
    </section>
  );
}
