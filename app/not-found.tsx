import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | GoldRateToday",
  description: "This page doesn't exist. Check live gold, silver, Bitcoin and Ethereum prices instead.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="nf">
      <div className="nf-card">
        <div className="nf-badge">404</div>
        <h1>Lost in the charts?</h1>
        <p className="nf-sub">
          The page you're looking for doesn't exist — but the markets never stop.
        </p>

        <div className="nf-ticker">
          <span className="nf-dot" aria-hidden="true" />
          <span>
            <Link href="/gold-price-today/" style={{ color: "inherit", fontWeight: 700 }}>
              Check the live gold price →
            </Link>
          </span>
        </div>

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
