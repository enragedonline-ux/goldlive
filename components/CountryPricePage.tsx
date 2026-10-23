import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import PriceChart from "@/components/PriceChart";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq, { FaqJsonLd } from "@/components/Faq";
import WorldGoldPrices from "@/components/WorldGoldPrices";
import WorldSilverPrices from "@/components/WorldSilverPrices";
import { getPrices } from "@/lib/prices";
import { usdTo } from "@/lib/fx";
import { fmtPct } from "@/lib/format";
import { goldCountryContent, silverCountryContent } from "@/lib/country-content";
import type { Country } from "@/lib/countries";

const SITE_URL = "https://goldlive-mocha.vercel.app";

function fmtLocal(v: number, symbol: string) {
  if (!v) return "—";
  return `${symbol}${v.toLocaleString("en-US", { maximumFractionDigits: v < 100 ? 2 : 0 })}`;
}

export default async function CountryPricePage({
  country,
  asset,
  slug,
}: {
  country: Country;
  asset: "gold" | "silver";
  slug: string;
}) {
  const [{ assets }, rate] = await Promise.all([getPrices(), usdTo(country.currency)]);
  const live = assets.find((a) => a.id === asset);
  const usdPerOz = live?.price ?? 0;
  const chg = live?.change24h ?? null;
  const down = chg !== null && chg < 0;

  const content =
    asset === "gold"
      ? goldCountryContent(country, rate, usdPerOz)
      : silverCountryContent(country, rate, usdPerOz);

  const perGram = usdPerOz ? (usdPerOz / 31.1035) * rate : 0;
  const perTola = usdPerOz ? (usdPerOz / 31.1035) * 11.6638 * rate : 0;
  const perOz = usdPerOz ? usdPerOz * rate : 0;
  const perKilo = usdPerOz ? (usdPerOz / 31.1035) * 1000 * rate : 0;
  const tolaFirst = country.localUnit === "tola" || country.slug === "pakistan";

  const rows = tolaFirst
    ? [
        { label: `Tola (11.66 g)`, v: perTola },
        { label: "Gram", v: perGram },
        { label: "Troy ounce (31.10 g)", v: perOz },
        { label: "Kilogram", v: perKilo },
      ]
    : [
        { label: "Gram", v: perGram },
        { label: "Troy ounce (31.10 g)", v: perOz },
        { label: "Kilogram", v: perKilo },
        { label: "Tola (11.66 g)", v: perTola },
      ];

  const heroPrice = tolaFirst ? perTola : perGram;
  const heroLabel = tolaFirst ? "per tola" : "per gram";
  const crumbs = [
    { href: "/", label: "Home" },
    { href: asset === "gold" ? "/gold-price-today" : "/silver-price-today", label: asset === "gold" ? "Gold Price" : "Silver Price" },
    { href: `/${slug}`, label: country.name },
  ];

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
            publisher: { "@type": "Organization", name: "GoldLive", url: `${SITE_URL}/` },
          }),
        }}
      />
      <Header active={asset} />
      <Ticker assets={assets} />

      <main className="ppage">
        <Breadcrumbs items={crumbs} />
        <span className="live-badge">
          <span className="dot pulse"></span>LIVE
        </span>
        <h1 className="ppage-h1">{content.h1}</h1>
        <div className="price-row">
          <span className="big-price">{fmtLocal(heroPrice, country.currencySymbol)}</span>
          <span className={`chg ${down ? "down" : "up"}`}>
            {down ? "▾" : "▴"} {fmtPct(chg)} today
          </span>
          <span className="per">
            {heroLabel} · {country.currency}
          </span>
        </div>
        <p className="pupd">
          {asset === "gold" ? "Gold" : "Silver"} price updated every minute · Spot: gold-api.com / CoinGecko · FX: ECB reference rates
          {live?.updatedAt
            ? ` · Last updated ${new Date(live.updatedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC`
            : ""}
        </p>

        <div className="chart-card">
          <PriceChart asset={asset} />
        </div>

        {asset === "silver" && <WorldSilverPrices />}

        {rows.length > 0 && (
          <div className="panel" style={{ marginTop: 22 }}>
            <h4>
              {(asset === "gold" ? "GOLD" : "SILVER") + ` PRICE IN ${country.currency}`}
            </h4>
            <table>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                      {fmtLocal(r.v, country.currencySymbol)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="pintro">
          {content.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {content.urdu && (
            <p className="urdu" dir="rtl" lang="ur">
              {content.urdu}
            </p>
          )}
        </div>

        <Faq items={content.faqs} />
      </main>

      {asset === "gold" && <WorldGoldPrices />}
      <Footer />
    </>
  );
}
