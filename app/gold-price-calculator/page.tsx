'use cache';
import { cacheLife } from "next/cache";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq, { FaqJsonLd } from "@/components/Faq";
import LatestBlogPosts from "@/components/LatestBlogPosts";
import WorldGoldPrices from "@/components/WorldGoldPrices";
import GoldCalculator from "@/components/GoldCalculator";
import { GOLD_PAGES } from "@/lib/registry-gold";
import { pricePageMetadata } from "@/lib/page-meta";
import { getPrices } from "@/lib/prices";

const base = GOLD_PAGES.find((p) => p.slug === "gold-price-calculator")!;

export async function generateMetadata() {
  return pricePageMetadata(base);
}

export default async function GoldPriceCalculatorPage() {
  cacheLife("minutes");
  const { assets } = await getPrices();
  return (
    <>
      <FaqJsonLd items={base.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: base.h1,
            description: base.intro[0] ?? "",
            url: "https://goldratetoday.online/gold-price-calculator",
            dateModified: new Date().toISOString(),
            publisher: {
              "@type": "Organization",
              name: "GoldRateToday",
              url: "https://goldratetoday.online/",
            },
          }),
        }}
      />
      <Header active="calculator" />
      <Ticker assets={assets} />

      <main className="ppage">
        <Breadcrumbs items={base.crumbs} />
        <span className="live-badge">
          <span className="dot pulse"></span>LIVE
        </span>
        <h1 className="ppage-h1">{base.h1}</h1>
        <div className="seo pcontent">
          {base.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <GoldCalculator />

        <div className="seo pcontent">
          <h2 className="sec-title">How the calculator works</h2>
          <ul className="pbullets">
            <li>Enter the weight of your gold item and pick its unit: grams, tolas, troy ounces or kilograms.</li>
            <li>Pick its karat. The calculator adjusts the pure gold content automatically, from 99.9% for 24K down to 58.5% for 14K.</li>
            <li>Read the melt value at the live spot price, then move the dealer margin slider to see a realistic payout estimate.</li>
          </ul>
        </div>

        <div className="panel" style={{ marginTop: 22 }}>
          <h4>GOLD PURITY REFERENCE</h4>
          <table>
            <tbody>
              <tr>
                <td>24K</td>
                <td>99.9% pure gold</td>
                <td>Bars, coins, investment gold</td>
              </tr>
              <tr>
                <td>22K</td>
                <td>91.6% pure gold</td>
                <td>Jewellery, coins, bangles</td>
              </tr>
              <tr>
                <td>21K</td>
                <td>87.5% pure gold</td>
                <td>Jewellery in the Middle East and South Asia</td>
              </tr>
              <tr>
                <td>18K</td>
                <td>75.0% pure gold</td>
                <td>Fine jewellery, watches</td>
              </tr>
              <tr>
                <td>14K</td>
                <td>58.5% pure gold</td>
                <td>Everyday jewellery</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="sec-title" style={{ marginTop: 30 }}>Frequently asked questions</h2>
        <Faq items={base.faqs} />

        {base.related.length > 0 && (
          <>
            <h2 className="sec-title" style={{ marginTop: 30 }}>Related prices</h2>
            <div className="chips">
              {base.related.map((r) => (
                <a className="chip" href={r.href} key={r.href}>
                  {r.label}
                </a>
              ))}
            </div>
          </>
        )}

        <LatestBlogPosts />
      </main>

      <div className="ad">
        <div>ADVERTISEMENT</div>
      </div>

      <WorldGoldPrices />
      <Footer />
    </>
  );
}
