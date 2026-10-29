"use client";

import { useEffect, useState } from "react";

const KARATS = [
  { label: "24K", sub: "99.9% pure", purity: 0.999 },
  { label: "22K", sub: "91.6% pure", purity: 0.916 },
  { label: "21K", sub: "87.5% pure", purity: 0.875 },
  { label: "18K", sub: "75.0% pure", purity: 0.75 },
  { label: "14K", sub: "58.5% pure", purity: 0.585 },
];

const UNITS = [
  { label: "Grams", singular: "gram", toGram: 1 },
  { label: "Tolas", singular: "tola", toGram: 11.6638 },
  { label: "Troy ounces", singular: "troy ounce", toGram: 31.1035 },
  { label: "Kilograms", singular: "kilogram", toGram: 1000 },
];

const PRESETS = [
  { label: "1 g", weight: "1", unit: 0 },
  { label: "10 g", weight: "10", unit: 0 },
  { label: "100 g", weight: "100", unit: 0 },
  { label: "1 tola", weight: "1", unit: 1 },
  { label: "1 oz", weight: "1", unit: 2 },
];

export default function GoldCalculator() {
  const [spot, setSpot] = useState<number | null>(null);
  const [weight, setWeight] = useState("10");
  const [unit, setUnit] = useState(0);
  const [karat, setKarat] = useState(1);
  const [margin, setMargin] = useState(5);

  useEffect(() => {
    fetch("/api/prices")
      .then((r) => r.json())
      .then((d) => {
        const g = (d.assets || []).find((a: any) => a.id === "gold");
        if (g && g.price) setSpot(g.price);
      })
      .catch(() => {});
  }, []);

  const fmt = (n: number) =>
    `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

  const w = parseFloat(weight) || 0;
  const grams = w * UNITS[unit].toGram;
  const purity = KARATS[karat].purity;
  const pureGrams = grams * purity;
  const perGram24k = spot ? spot / 31.1035 : null;
  const perGramSelected = perGram24k !== null ? perGram24k * purity : null;
  const perUnitSelected =
    perGramSelected !== null ? perGramSelected * UNITS[unit].toGram : null;
  const melt = spot ? (pureGrams / 31.1035) * spot : null;
  const payout = melt !== null ? melt * (1 - margin / 100) : null;

  return (
    <section className="panel calc-panel" aria-label="Gold value calculator">
      <h2>Calculate your gold&apos;s melt value</h2>
      <p className="calc-sub">
        Live spot price:{" "}
        <strong>{spot ? `${fmt(spot)}/oz` : "loading…"}</strong>
        {perGram24k !== null && (
          <>
            {" "}· 24K per gram: <strong>{fmt(perGram24k)}</strong>
          </>
        )}
      </p>

      <div className="calc-field">
        <span className="calc-label">Weight</span>
        <div className="calc-weight-row">
          <input
            type="number"
            min="0"
            step="any"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            inputMode="decimal"
            aria-label="Weight"
          />
          <div className="calc-presets">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                className="calc-preset"
                onClick={() => {
                  setWeight(p.weight);
                  setUnit(p.unit);
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="calc-field">
        <span className="calc-label">Unit</span>
        <div className="calc-pills" role="group" aria-label="Weight unit">
          {UNITS.map((u, i) => (
            <button
              key={u.label}
              type="button"
              className={unit === i ? "calc-pill on" : "calc-pill"}
              aria-pressed={unit === i}
              onClick={() => setUnit(i)}
            >
              {u.label}
            </button>
          ))}
        </div>
      </div>

      <div className="calc-field">
        <span className="calc-label">Purity</span>
        <div className="calc-pills" role="group" aria-label="Gold purity">
          {KARATS.map((k, i) => (
            <button
              key={k.label}
              type="button"
              className={karat === i ? "calc-pill on" : "calc-pill"}
              aria-pressed={karat === i}
              onClick={() => setKarat(i)}
            >
              {k.label} <small>{k.sub}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="calc-results" aria-live="polite">
        <div className="calc-result">
          <span>Melt value</span>
          <strong>{melt !== null ? fmt(melt) : "—"}</strong>
          <small>
            {grams.toFixed(2)} g × {purity * 100}% purity = {pureGrams.toFixed(2)} g
            pure gold
          </small>
        </div>
        <div className="calc-result calc-payout">
          <span>Dealer payout estimate</span>
          <strong>{payout !== null ? fmt(payout) : "—"}</strong>
          <small>After {margin}% dealer margin</small>
        </div>
      </div>

      <div className="calc-field">
        <span className="calc-label">Dealer margin: {margin}%</span>
        <input
          type="range"
          min="0"
          max="15"
          step="1"
          value={margin}
          onChange={(e) => setMargin(Number(e.target.value))}
          className="calc-slider"
          aria-label="Dealer margin percent"
        />
        <div className="calc-slider-marks">
          <span>0%</span>
          <span>15%</span>
        </div>
      </div>

      {perUnitSelected !== null && (
        <p className="calc-note">
          One {UNITS[unit].singular} of {KARATS[karat].label} gold is worth{" "}
          {fmt(perUnitSelected)} at the live price.
        </p>
      )}
      <p className="calc-note">
        Melt value is the raw metal worth. Dealers typically pay 2 to 10% below
        melt to cover refining and margin, so move the slider to match the offer
        you are checking.
      </p>
    </section>
  );
}
