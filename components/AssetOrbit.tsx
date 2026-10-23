"use client";

import { useState, type ReactElement } from "react";
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

const ICONS: Record<string, ReactElement> = {
  gold: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="8" width="18" height="8" rx="1.5" />
      <path d="M3 12h18M7 8v8M12 8v8M17 8v8" />
    </svg>
  ),
  silver: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
    </svg>
  ),
  bitcoin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 6h5a3.5 3.5 0 0 1 0 7H9zM9 13h6a3.5 3.5 0 0 1 0 7H9zM7 4v16M12 3v3M12 18v3" />
    </svg>
  ),
  ethereum: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2l6 10-6 4-6-4zM12 16l6 4-6 4-6-4z" />
    </svg>
  ),
  spot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 17l5-6 4 3 6-8 3 4" />
      <path d="M18 6h3v3" />
    </svg>
  ),
};

export default function AssetOrbit({ assets }: { assets: OrbitAsset[] }) {
  const [focus, setFocus] = useState(0);
  const n = assets.length;
  const current = assets[focus];

  const prev = () => setFocus((f) => (f - 1 + n) % n);
  const next = () => setFocus((f) => (f + 1) % n);

  // Flatter, tighter arc for a clean minimal look
  const R = 38; // radius in % of container
  const pos = (i: number) => {
    // offset from focused index, wrapped to [-n/2, n/2]
    let d = i - focus;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    const angle = 90 - (d * 150) / (n - 1 || 1); // 150° spread, flatter arc
    const rad = (angle * Math.PI) / 180;
    return {
      left: 50 + R * Math.cos(rad),
      top: 58 - R * 0.62 * Math.sin(rad), // flattened vertically
      isFocus: d === 0,
    };
  };

  const chg = current.change24h;
  const down = chg !== null && chg < 0;

  return (
    <section className="aorbit" aria-label="Live asset prices">
      <h2 className="aorbit-title">Live Prices at a Glance</h2>
      <div className="aorbit-stage">
        {assets.map((a, i) => {
          const p = pos(i);
          return (
            <button
              key={a.id}
              onClick={() => setFocus(i)}
              className={`aorbit-icon${p.isFocus ? " focus" : ""}`}
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
              aria-label={`${a.name} price`}
            >
              {ICONS[a.icon] ?? ICONS.gold}
            </button>
          );
        })}
      </div>
      <div className="aorbit-detail">
        <h3>{current.name}</h3>
        <p className="aorbit-price">
          {current.price !== null ? fmtPriceExact(current.price) : "—"}
          {chg !== null && (
            <span className={down ? "neg" : "pos"}> {fmtPct(chg)}</span>
          )}
        </p>
        <Link href={current.href} className="aorbit-link">
          View {current.name} →
        </Link>
      </div>
      <div className="aorbit-nav">
        <button onClick={prev} aria-label="Previous asset">←</button>
        <button onClick={next} aria-label="Next asset">→</button>
      </div>
      <p className="aorbit-hint">CLICK ANY ICON TO FOCUS IT</p>
    </section>
  );
}
