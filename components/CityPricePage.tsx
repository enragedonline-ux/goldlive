import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import PriceChart from "@/components/PriceChart";
import Breadcrumbs from "@/components/Breadcrumbs";
import LatestBlogPosts from "@/components/LatestBlogPosts";
import Faq, { FaqJsonLd } from "@/components/Faq";
import WorldGoldPrices from "@/components/WorldGoldPrices";
import { getPrices } from "@/lib/prices";
import { usdTo } from "@/lib/fx";
import { fmtPct } from "@/lib/format";
import { cityContent, PAKISTAN_CITIES, type PakistanCity } from "@/lib/pakistan-cities";

const SITE_URL = "https://goldratetoday.online";

function fmtLocal(v: number, symbol: string) {
  if (!v) return "—";
  return `${symbol}${v.toLocaleString("en-US", { maximumFractionDigits: v < 100 ? 2 : 0 })}`;
}

/**
 * City gold-rate page (e.g. /gold-price-in-karachi).
 * Rates are the national live rate (international spot + USD/PKR) — the same
 * in every Pakistani city. The page adds 24K/22K/18K purity tables and the
 * city's own sarafa-market info on top of that live rate.
 */
export default async function CityPricePage({
  city,
  slug,
}: {
  city: PakistanCity;
  slug: string;
}) {
  const [{ assets }, rate] = await Promise.all([getPrices(), usdTo("PKR")]);
  const live = assets.find((a) => a.id === "gold");
  const usdPerOz = live?.price ?? 0;
  const chg = live?.change24h ?? null;
  const down = chg !== null && chg < 0;

  const content = cityContent(city, rate, usdPerOz);

  const perGram24 = usdPerOz ? (usdPerOz / 31.1035) * rate : 0;
  const perTola24 = usdPerOz ? (usdPerOz / 31.1035) * 11.6638 * rate : 0;
  const purities = [
    { label: "24K (99.9% pure)", factor: 1 },
    { label: "22K (91.6% pure)", factor: 0.916 },
    { label: "18K (75.0% pure)", factor: 0.75 },
  ];

  const crumbs = [
    { href: "/", label: "Home" },
    { href: "/gold-price-today", label: "Gold Price" },
    { href: "/gold-price-in-pakistan", label: "Pakistan" },
    { href: `/${slug}`, label: city.name },
  ];

  const otherCities = PAKISTAN_CITIES.filter((c) => c.slug !== city.slug);

  return (
    <>
      <FaqJsonLd items={content.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: content.h1,
            description: content.description,
            url: `${SITE_URL}/${slug}`,
            dateModified: new Date().toISOString(),
            publisher: { "@type": "Organization", name: "GoldRateToday", url: `${SITE_URL}/` },
          }),
        }}
      />
      <Header active="gold" />
      <Ticker assets={assets} />

      <main className="ppage">
        <Breadcrumbs items={crumbs} />
        <span className="live-badge">
          <span className="dot pulse"></span>LIVE
        </span>
        <h1 className="ppage-h1">{content.h1}</h1>
        <div className="price-row">
          <span className="big-price">{fmtLocal(perTola24, "₨")}</span>
          <span className={`chg ${down ? "down" : "up"}`}>
            {down ? "▾" : "▴"} {fmtPct(chg)} today
          </span>
          <span className="per">per tola · 24K · PKR</span>
        </div>
        <p className="pupd">
          Gold price updated every minute · Spot: gold-api.com / CoinGecko · FX: ECB reference rates
          {live?.updatedAt
            ? ` · Last updated ${new Date(live.updatedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC`
            : ""}
        </p>

        <div className="chart-card">
          <PriceChart asset="gold" />
        </div>

        <div className="panel" style={{ marginTop: 22 }}>
          <h4>GOLD RATE IN {city.name.toUpperCase()} — 24K / 22K / 18K</h4>
          <table>
            <thead>
              <tr>
                <td style={{ fontWeight: 800 }}>Purity</td>
                <td style={{ textAlign: "right", fontWeight: 800 }}>Per tola (11.66 g)</td>
                <td style={{ textAlign: "right", fontWeight: 800 }}>Per gram</td>
              </tr>
            </thead>
            <tbody>
              {purities.map((p) => (
                <tr key={p.label}>
                  <td>{p.label}</td>
                  <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {fmtLocal(perTola24 * p.factor, "₨")}
                  </td>
                  <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {fmtLocal(perGram24 * p.factor, "₨")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pintro">
          {content.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="panel" style={{ marginTop: 22 }}>
          <h4>GOLD RATE IN OTHER PAKISTANI CITIES</h4>
          <table>
            <tbody>
              {otherCities.map((c) => (
                <tr key={c.slug}>
                  <td>
                    <a href={`/gold-price-in-${c.slug}`}>Gold rate in {c.name}</a>
                  </td>
                  <td style={{ textAlign: "right", color: "var(--muted)" }}>{c.market}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Faq items={content.faqs} />

        <LatestBlogPosts />
      </main>

      <WorldGoldPrices />
      <Footer />
    </>
  );
}
