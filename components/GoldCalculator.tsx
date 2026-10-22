"use client";

import { useEffect, useState } from "react";

const KARATS = [
  { label: "24K (99.9% pure)", purity: 0.999 },
  { label: "22K (91.6% pure)", purity: 0.916 },
  { label: "21K (87.5% pure)", purity: 0.875 },
  { label: "18K (75.0% pure)", purity: 0.75 },
  { label: "14K (58.5% pure)", purity: 0.585 },
];

const UNITS = [
  { label: "Grams", toGram: 1 },
  { label: "Tolas", toGram: 11.6638 },
  { label: "Troy ounces", toGram: 31.1035 },
  { label: "Kilograms", toGram: 1000 },
];

export default function GoldCalculator() {
  const [spot, setSpot] = useState<number | null>(null);
  const [weight, setWeight] = useState("10");
  const [unit, setUnit] = useState(0);
  const [karat, setKarat] = useState(1);

  useEffect(() => {
    fetch("/api/prices")
      .then((r) => r.json())
      .then((d) => {
        const g = (d.assets || []).find((a: any) => a.id === "gold");
        if (g && g.price) setSpot(g.price);
      })
      .catch(() => {});
  }, []);

  const w = parseFloat(weight) || 0;
  const grams = w * UNITS[unit].toGram;
  const pureGrams = grams * KARATS[karat].purity;
  const melt = spot ? (pureGrams / 31.1035) * spot : null;

  return (
    <section className="panel calc-panel" aria-label="Gold value calculator">
      <h2>Calculate your gold&apos;s melt value</h2>
      <p className="calc-sub">
        Live spot price:{" "}
        <strong>{spot ? `$${spot.toLocaleString("en-US", { maximumFractionDigits: 2 })}/oz` : "loading…"}</strong>
      </p>
      <div className="calc-grid">
        <label>
          Weight
          <input
            type="number"
            min="0"
            step="any"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            inputMode="decimal"
          />
        </label>
        <label>
          Unit
          <select value={unit} onChange={(e) => setUnit(Number(e.target.value))}>
            {UNITS.map((u, i) => (
              <option key={u.label} value={i}>
                {u.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Purity
          <select value={karat} onChange={(e) => setKarat(Number(e.target.value))}>
            {KARATS.map((k, i) => (
              <option key={k.label} value={i}>
                {k.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="calc-result" aria-live="polite">
        <span>Melt value</span>
        <strong>
          {melt !== null
            ? `$${melt.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
            : "—"}
        </strong>
        <small>
          {grams.toFixed(2)} g × {KARATS[karat].purity * 100}% purity = {pureGrams.toFixed(2)} g pure gold
        </small>
      </div>
      <p className="calc-note">
        Melt value is the raw metal worth. Dealers typically pay 2–10% below melt to cover refining and margin.
      </p>
    </section>
  );
}
