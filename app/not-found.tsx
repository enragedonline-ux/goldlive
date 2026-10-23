import Link from "next/link";
import { getPrices } from "@/lib/prices";
import { fmtPrice } from "@/lib/format";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | GoldRateToday",
  description: "This page doesn't exist. Check live gold, silver, Bitcoin and Ethereum prices instead.",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  let goldPrice: number | null = null;
  try {
    const { assets } = await getPrices();
    goldPrice = assets.find((a) => a.id === "gold")?.price ?? null;
  } catch {
    /* show page even if price fetch fails */
  }

  return (
    <main className="nf">
      <div className="nf-card">
        <div className="nf-badge">404</div>
        <h1>Lost in the charts?</h1>
        <p className="nf-sub">
          The page you're looking for doesn't exist — but the markets never stop.
        </p>

        {goldPrice !== null && (
          <div className="nf-ticker">
            <span className="nf-dot" aria-hidden="true" />
            <span>
              Gold is trading at <strong>{fmtPrice(goldPrice)}</strong> right now
            </span>
          </div>
        )}

        <div className="nf-links">
          <Link href="/" className="nf-btn">
            ← Back to Home
          </Link>
        </div>

        <nav className="nf-nav" aria-label="Popular pages">
          <Link href="/gold-price-today/">Gold Price Today</Link>
          <span aria-hidden="true">·</span>
          <Link href="/silver-price-today/">Silver Price Today</Link>
          <span aria-hidden="true">·</span>
          <Link href="/bitcoin-price/">Bitcoin Price</Link>
          <span aria-hidden="true">·</span>
          <Link href="/blog/">Blog</Link>
        </nav>
      </div>
    </main>
  );
}
