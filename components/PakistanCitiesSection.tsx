import { getPrices } from "@/lib/prices";
import { usdTo } from "@/lib/fx";
import { PAKISTAN_CITIES } from "@/lib/pakistan-cities";

function fmtLocal(v: number, symbol: string) {
  if (!v) return "—";
  return `${symbol}${v.toLocaleString("en-US", { maximumFractionDigits: v < 100 ? 2 : 0 })}`;
}

/**
 * "Gold Rate in Major Cities of Pakistan" — rendered on the Pakistan country
 * page only. Every city shows the same national live rate (spot + USD/PKR);
 * the section exists so city searches land on a dedicated live page.
 */
export default async function PakistanCitiesSection() {
  const [{ assets }, rate] = await Promise.all([getPrices(), usdTo("PKR")]);
  const usdPerOz = assets.find((a) => a.id === "gold")?.price ?? 0;
  const perTola24 = usdPerOz ? (usdPerOz / 31.1035) * 11.6638 * rate : 0;

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
        Rates are the same across Pakistan — every city follows the national live rate (international
        spot + USD/PKR). Tap a city for its 24K, 22K and 18K rates and local market details.
      </p>
    </div>
  );
}
