import { PAKISTAN_CITIES } from "@/lib/pakistan-cities";
import { PAKISTAN_LOCAL_RATE } from "@/lib/pakistan-local-rate";

function fmtLocal(v: number, symbol: string) {
  if (!v) return "—";
  return `${symbol}${v.toLocaleString("en-US", { maximumFractionDigits: v < 100 ? 2 : 0 })}`;
}

/**
 * "Gold Rate in Major Cities of Pakistan" — rendered on the Pakistan country
 * page only. Every city shows the same OFFICIAL LOCAL sarafa rate (APSGJA,
 * daily fixing) — the rate Pakistani bazaars actually trade at.
 */
export default async function PakistanCitiesSection() {
  const local = PAKISTAN_LOCAL_RATE;
  const perTola24 = local.perTola24K;

  return (
    <div className="panel" style={{ marginTop: 22 }}>
      <h4>GOLD RATE IN MAJOR CITIES OF PAKISTAN</h4>
      <table>
        <tbody>
          {PAKISTAN_CITIES.map((c) => (
            <tr key={c.slug}>
              <td>
                <a href={`/gold-price-in-${c.slug}`}>Gold rate in {c.name}</a>
                <br />
                <span style={{ color: "var(--muted)", fontSize: 12 }}>{c.market}</span>
              </td>
              <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                {fmtLocal(perTola24, "₨")}
                <br />
                <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 400 }}>
                  24K / tola
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ padding: "0 20px 16px", margin: 0, fontSize: 13, color: "var(--muted)" }}>
        Local sarafa rate ({local.source}, {local.dateLabel}) — the same across Pakistan. Tap a city
        for its 24K, 22K and 18K rates and local market details.
      </p>
    </div>
  );
}
