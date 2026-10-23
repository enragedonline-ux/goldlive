'use cache';
import { cacheLife } from "next/cache";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import PriceChart from "@/components/PriceChart";
import WorldGoldPrices from "@/components/WorldGoldPrices";
import dynamic from "next/dynamic";
const AssetOrbit = dynamic(() => import("@/components/AssetOrbit"), {
  loading: () => <div style={{ height: 300, textAlign: "center", padding: 40, color: "var(--faint)" }}>Loading…</div>,
});
import type { OrbitAsset } from "@/components/AssetOrbit";
import { getPrices } from "@/lib/prices";
import { fmtPrice, fmtPriceExact, fmtPct } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const NEWS = [
  { t: "09:41", tag: "GOLD", title: "Gold slips 1% as oil rally fuels higher-for-longer rate bets" },
  { t: "08:15", tag: "FED", title: "Traders price 90% chance of December rate hike — CME FedWatch" },
  { t: "07:02", tag: "SILVER", title: "Silver underperforms, gold-silver ratio climbs to 71.1" },
  { t: "06:30", tag: "ASIA", title: "Shanghai gold benchmark steady as yuan holds firm" },
];

const CHIPS: [string, string][] = [
  ["Gold price per gram", "/gold-price-per-gram"],
  ["Gold price per tola", "/gold-price-per-tola"],
  ["Silver price today", "/silver-price-today"],
  ["Bitcoin price USD", "/bitcoin-price"],
  ["22K gold rate", "/22k-gold-price"],
  ["Live gold price", "/live-gold-price"],
];

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: "Gold Price Today | Live XAU/USD Rate | GoldRateToday",
    description: "Best live gold price today with real-time XAU/USD charts. Check silver, Bitcoin & Ethereum rates now — accurate prices updated every 60 seconds.",
    path: "/",
    keywords: ["gold price today", "live gold price", "gold rate today", "silver price", "bitcoin price"],
  });
}

export default async function Home() {
  cacheLife("minutes");
  const { assets } = await getPrices();
  const gold = assets.find((a) => a.id === "gold");
  const goldPrice = gold?.price ?? 0;
  const goldChg = gold?.change24h ?? null;
  const down = goldChg !== null && goldChg < 0;

  const perGram = goldPrice ? goldPrice / 31.1035 : 0;
  const perTola = perGram * 11.6638;
  const perKilo = perGram * 1000;

  const byId = (id: string) => assets.find((a) => a.id === id);
  const orbitAssets: OrbitAsset[] = [
    { id: "gold", name: "Gold", price: byId("gold")?.price ?? null, change24h: byId("gold")?.change24h ?? null, href: "/gold-price-today", icon: "gold" },
    { id: "silver", name: "Silver", price: byId("silver")?.price ?? null, change24h: byId("silver")?.change24h ?? null, href: "/silver-price-today", icon: "silver" },
    { id: "bitcoin", name: "Bitcoin", price: byId("bitcoin")?.price ?? null, change24h: byId("bitcoin")?.change24h ?? null, href: "/bitcoin-price", icon: "bitcoin" },
    { id: "ethereum", name: "Ethereum", price: byId("ethereum")?.price ?? null, change24h: byId("ethereum")?.change24h ?? null, href: "/ethereum-price", icon: "ethereum" },
    { id: "spot", name: "Gold Spot", price: byId("gold")?.price ?? null, change24h: byId("gold")?.change24h ?? null, href: "/spot-gold-price", icon: "spot" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "GoldRateToday",
        url: "https://goldratetoday.online",
        description: "Live gold, silver, Bitcoin and Ethereum prices with real-time charts.",
      },
      {
        "@type": "Organization",
        name: "GoldRateToday",
        url: "https://goldratetoday.online",
        logo: "https://goldratetoday.online/favicon.svg",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header active="gold" />
      <Ticker assets={assets} />

      <section className="hero">
        <span className="live-badge">
          <span className="dot pulse"></span>LIVE
        </span>
        <h1>Gold Price Today</h1>
        <p className="sub">XAU/USD spot · New York · Updated every minute during market hours</p>
        <div className="price-row">
          <span className="big-price">{fmtPriceExact(goldPrice)}</span>
          <span className={`chg ${down ? "down" : "up"}`}>
            {down ? "▾" : "▴"} {fmtPriceExact(Math.abs(goldPrice * (goldChg ?? 0)) / 100)} ({fmtPct(goldChg)}) today
          </span>
          <span className="per">per troy ounce</span>
        </div>
        <div className="bidask">
          <span>Bid <b>{fmtPriceExact(goldPrice ? goldPrice - 0.6 : 0)}</b></span>
          <span>Ask <b>{fmtPriceExact(goldPrice ? goldPrice + 0.6 : 0)}</b></span>
          <span>Spread <b>$1.20</b></span>
        </div>
        <div className="hero-btns">
          <a className="btn-solid" href="#chart">Gold Price Today</a>
          <a className="btn-line" href="#assets">View All Charts</a>
        </div>
      </section>

      <section className="section" id="assets">
        <h2 className="sec-title">Live prices</h2>
        <div className="cards">
          {assets.map((a) => (
            <a className="card" href={`#${a.id}`} key={a.id}>
              <div className="s">{a.name.toUpperCase()} · {a.pair}</div>
              <div className="p">{fmtPrice(a.price)}</div>
              <div className={`c ${a.change24h !== null && a.change24h >= 0 ? "up" : "down"}`}>
                {fmtPct(a.change24h)} today
              </div>
            </a>
          ))}
        </div>

        <div className="chart-card" id="chart">
          <PriceChart asset="gold" />
        </div>

        <div className="cols">
          <div className="panel">
            <h4>GOLD CONVERSIONS</h4>
            <table>
              <tbody>
                <tr className="hl"><td>Troy ounce (31.10 g)</td><td>{fmtPriceExact(goldPrice)}</td></tr>
                <tr><td>Gram · 24K</td><td>{fmtPriceExact(perGram)}</td></tr>
                <tr><td>Gram · 22K</td><td>{fmtPriceExact(perGram * 0.916)}</td></tr>
                <tr><td>Tola · 24K (11.66 g)</td><td>{fmtPriceExact(perTola)}</td></tr>
                <tr><td>Kilogram</td><td>{fmtPriceExact(perKilo)}</td></tr>
                <tr><td>Pennyweight (dwt)</td><td>{fmtPriceExact(perGram * 1.5552)}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="panel">
            <h4>MARKET NEWS</h4>
            <div className="news">
              {NEWS.map((n) => (
                <div className="nitem" key={n.t + n.tag}>
                  <span className="ntime">{n.t}</span>
                  <span className="ntitle"><span>{n.tag}</span>{n.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="sec-title">Popular right now</h2>
        <div className="chips">
          {CHIPS.map(([label, href]) => (
            <a className="chip" href={href} key={label}>{label}</a>
          ))}
        </div>
      </section>

      <section className="section seo">
        <h2 className="sec-title">Real-time precious metal prices, made simple</h2>
        <p>
          GoldRateToday tracks live spot prices for gold, silver, Bitcoin and Ethereum in one clean dashboard.
          Follow the XAU/USD chart through the trading day, convert between troy ounces, grams, tolas and
          kilograms, and compare 24K, 22K and 18K rates at a glance. Every price page pairs its live chart
          with plain-English context — day highs and lows, bid/ask spreads and the market news moving the
          metals — so you always know not just the price, but the story behind it.
        </p>
      </section>

      <section className="section">
        <div className="cta">
          <h3>Never miss a price move</h3>
          <p>Charts refresh every 60 seconds during market hours.<br />Bookmark your metal and check back anytime.</p>
          <a className="btn-solid" href="#chart">Explore Live Charts</a>
        </div>
      </section>

      <div className="ad"><div>ADVERTISEMENT</div></div>

      <AssetOrbit assets={orbitAssets} />

      <WorldGoldPrices />

      <Footer />
    </>
  );
}
