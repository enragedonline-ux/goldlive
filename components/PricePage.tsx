import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import PriceChart from "@/components/PriceChart";
import RelatedMarkets from "@/components/RelatedMarkets";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import Faq, { FaqJsonLd, type FaqItem } from "@/components/Faq";
import WorldGoldPrices from "@/components/WorldGoldPrices";
import { getPrices, type AssetPrice } from "@/lib/prices";
import { fmtPriceExact, fmtPct } from "@/lib/format";

export interface ConversionRow {
  label: string;
  usd: number;
}

export interface RelatedLink {
  href: string;
  label: string;
}

export interface ContentSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface PageFigure {
  src: string;
  alt: string;
  caption?: string;
}

export interface PricePageConfig {
  h1: string;
  asset: "gold" | "silver" | "bitcoin" | "ethereum";
  /** e.g. "per troy ounce", "per gram" */
  unitLabel: string;
  /** divide the per-ounce USD price by this to get the unit price */
  unitDivisor: number;
  /** extra conversion table rows, computed from USD/oz */
  conversions: (usdPerOz: number) => ConversionRow[];
  intro: string[];
  faqs: FaqItem[];
  related: RelatedLink[];
  crumbs: Crumb[];
  /** show world gold prices section (default true for gold pages) */
  showWorldGold?: boolean;
  /** extra H2 content sections rendered between intro and FAQ */
  sections?: ContentSection[];
  /** infographic figure rendered after the conversions panel */
  figure?: PageFigure;
  /** optional interactive widget rendered right after the chart section */
  afterChart?: React.ReactNode;
}

const NAMES: Record<string, string> = {
  gold: "Gold",
  silver: "Silver",
  bitcoin: "Bitcoin",
  ethereum: "Ethereum",
};

export default async function PricePage({ config }: { config: PricePageConfig }) {
  const { assets } = await getPrices();
  const live: AssetPrice | undefined = assets.find((a) => a.id === config.asset);
  const usdPerOz = live?.price ?? 0;
  const chg = live?.change24h ?? null;
  const down = chg !== null && chg < 0;
  const unitPrice = usdPerOz ? usdPerOz / config.unitDivisor : 0;
  const rows = usdPerOz ? config.conversions(usdPerOz) : [];

  return (
    <>
      <FaqJsonLd items={config.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: config.h1,
            description: config.intro[0] ?? "",
            url: `https://goldlive-mocha.vercel.app${config.crumbs[config.crumbs.length - 1]?.href ?? "/"}`,
            dateModified: new Date().toISOString(),
            publisher: {
              "@type": "Organization",
              name: "GoldLive",
              url: "https://goldlive-mocha.vercel.app/",
            },
          }),
        }}
      />
      <Header active={config.asset} />
      <Ticker assets={assets} />

      <main className="ppage">
        <Breadcrumbs items={config.crumbs} />
        <span className="live-badge">
          <span className="dot pulse"></span>LIVE
        </span>
        <h1 className="ppage-h1">{config.h1}</h1>
        <div className="price-row">
          <span className="big-price">{fmtPriceExact(unitPrice)}</span>
          <span className={`chg ${down ? "down" : "up"}`}>
            {down ? "▾" : "▴"} {fmtPct(chg)} today
          </span>
          <span className="per">{config.unitLabel}</span>
        </div>
        <p className="pupd">
          {NAMES[config.asset]} price updated every minute during market hours · Source: gold-api.com / CoinGecko
          {live?.updatedAt ? ` · Last updated ${new Date(live.updatedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC` : ""}
        </p>

        <div className="chart-card">
          <PriceChart asset={config.asset} />
        </div>

        {config.afterChart}

        <RelatedMarkets asset={config.asset} related={config.related} />

        {rows.length > 0 && (
          <div className="panel" style={{ marginTop: 22 }}>
            <h4>{NAMES[config.asset].toUpperCase()} CONVERSIONS</h4>
            <table>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.label} className={i === 0 ? "hl" : ""}>
                    <td>{r.label}</td>
                    <td>{fmtPriceExact(r.usd)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {config.figure && (
          <figure className="pfigure">
            <img src={config.figure.src} alt={config.figure.alt} loading="lazy" />
            {config.figure.caption && <figcaption>{config.figure.caption}</figcaption>}
          </figure>
        )}

        <div className="seo pcontent">
          {config.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {config.sections?.map((s) => (
          <div key={s.heading} className="seo pcontent">
            <h2 className="sec-title">{s.heading}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {s.bullets && s.bullets.length > 0 && (
              <ul className="pbullets">
                {s.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <h2 className="sec-title" style={{ marginTop: 30 }}>Frequently asked questions</h2>
        <Faq items={config.faqs} />

        {config.related.length > 0 && (
          <>
            <h2 className="sec-title" style={{ marginTop: 30 }}>Related prices</h2>
            <div className="chips">
              {config.related.map((r) => (
                <a className="chip" href={r.href} key={r.href}>
                  {r.label}
                </a>
              ))}
            </div>
          </>
        )}
      </main>

      <div className="ad">
        <div>ADVERTISEMENT</div>
      </div>

      {config.showWorldGold !== false && <WorldGoldPrices />}
      <Footer />
    </>
  );
}
