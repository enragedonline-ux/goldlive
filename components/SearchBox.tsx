"use client";
import { useEffect, useRef, useState } from "react";

const INDEX = [
  { t: "Gold Price Today", h: "/gold-price-today", k: "gold price today live xau usd spot" },
  { t: "Live Gold Price", h: "/live-gold-price", k: "live gold chart real time" },
  { t: "Gold Price Per Gram", h: "/gold-price-per-gram", k: "gram 24k 22k 18k per gram rate" },
  { t: "Gold Price Per Tola", h: "/gold-price-per-tola", k: "tola pakistan india uae rate" },
  { t: "Silver Price Today", h: "/silver-price-today", k: "silver price xag usd" },
  { t: "Bitcoin Price", h: "/bitcoin-price", k: "bitcoin btc crypto usd" },
  { t: "Ethereum Price", h: "/ethereum-price", k: "ethereum eth crypto usd" },
];

export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const results =
    q.trim().length > 0
      ? INDEX.filter((i) => `${i.t} ${i.k}`.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6)
      : [];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQ("");
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQ("");
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  const go = (href: string) => {
    window.location.href = href;
  };

  return (
    <div className="sbox" ref={boxRef}>
      {!open ? (
        <button type="button" className="search sbox-btn" onClick={() => setOpen(true)} aria-label="Search">
          Search prices…
        </button>
      ) : (
        <div className="sbox-open">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results.length > 0) go(results[0].h);
            }}
            placeholder="Search prices…"
            aria-label="Search prices"
          />
          {results.length > 0 && (
            <ul className="sbox-results">
              {results.map((r) => (
                <li key={r.h}>
                  <button type="button" onClick={() => go(r.h)}>
                    {r.t}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {q.trim().length > 0 && results.length === 0 && (
            <div className="sbox-empty">No matches found</div>
          )}
        </div>
      )}
    </div>
  );
}
