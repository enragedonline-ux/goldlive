import type { RegistryPage } from "./registry-gold";

const crumbsHome = [{ href: "/", label: "Home" }];

const btcConversions = (usd: number) => [
  { label: "1 BTC", usd },
  { label: "0.5 BTC", usd: usd / 2 },
  { label: "0.1 BTC", usd: usd / 10 },
  { label: "0.01 BTC", usd: usd / 100 },
  { label: "1 mBTC (0.001 BTC)", usd: usd / 1000 },
];

const ethConversions = (usd: number) => [
  { label: "1 ETH", usd },
  { label: "0.5 ETH", usd: usd / 2 },
  { label: "0.1 ETH", usd: usd / 10 },
  { label: "0.01 ETH", usd: usd / 100 },
];

export const CRYPTO_PAGES: RegistryPage[] = [
  {
    slug: "bitcoin-price",
    title: "Bitcoin Price Today | Live BTC/USD Chart & Converter | GoldLive",
    description:
      "Live BTC/USD rate with real-time chart, 24h change and USD↔BTC conversions — updated every minute, 24/7.",
    keywords: ["bitcoin price today", "live bitcoin price", "btc usd", "bitcoin rate"],
    h1: "Bitcoin Price Today",
    asset: "bitcoin",
    unitLabel: "per BTC",
    unitDivisor: 1,
    conversions: btcConversions,
    intro: [
      "Bitcoin trades 24 hours a day, 7 days a week — there is no closing price. The live BTC/USD rate below tracks the aggregated spot price across major exchanges, refreshed every minute.",
      "Use the conversion table to see what fractions of a bitcoin cost in dollars right now, from a full BTC down to a millibitcoin. Unlike gold, bitcoin has no physical form: its price is driven purely by supply, demand and market sentiment.",
    ],
    faqs: [
      {
        q: "What is the bitcoin price today?",
        a: "The live BTC/USD price is shown at the top of this page and updates every minute. Because crypto markets never close, the price moves around the clock, including weekends.",
      },
      {
        q: "How is the bitcoin price determined?",
        a: "Bitcoin has no central price setter. Its price is the aggregated result of buy and sell orders across hundreds of exchanges worldwide, weighted by trading volume.",
      },
      {
        q: "Why is bitcoin so volatile?",
        a: "A relatively small market capitalization, 24/7 trading, leverage, and sentiment-driven flows all amplify moves. Bitcoin's volatility is roughly double that of gold.",
      },
      {
        q: "Bitcoin vs gold: which is the better safe haven?",
        a: "Gold has a 5,000-year track record as a store of value and tends to rise in crises. Bitcoin behaves more like a high-growth tech asset — it often falls with stocks during panics. Many investors hold both for different reasons.",
      },
    ],
    related: [
      { href: "/ethereum-price", label: "Ethereum price" },
      { href: "/gold-price-today", label: "Gold price today" },
      { href: "/gold-price-per-gram", label: "Gold price per gram" },
    ],
    crumbs: crumbsHome,
    showWorldGold: false,
  },
  {
    slug: "ethereum-price",
    title: "Ethereum Price Today | Live ETH/USD Chart & Converter | GoldLive",
    description:
      "Live ETH/USD rate with real-time chart, 24h change and fractional ETH conversions — updated every minute, 24/7.",
    keywords: ["ethereum price today", "live ethereum price", "eth usd", "ethereum rate"],
    h1: "Ethereum Price Today",
    asset: "ethereum",
    unitLabel: "per ETH",
    unitDivisor: 1,
    conversions: ethConversions,
    intro: [
      "Ethereum is the second-largest cryptocurrency and the backbone of decentralized finance. The live ETH/USD rate below tracks the aggregated spot price across major exchanges, refreshed every minute.",
      "The conversion table shows what fractions of one ether cost in dollars right now. ETH price tends to follow bitcoin's direction with higher volatility, plus its own drivers like network upgrades and DeFi activity.",
    ],
    faqs: [
      {
        q: "What is the ethereum price today?",
        a: "The live ETH/USD price is shown at the top of this page and updates every minute. Crypto markets trade continuously, so the price moves 24/7.",
      },
      {
        q: "How is the ethereum price determined?",
        a: "Like bitcoin, ether has no official price. Its market price emerges from order books across global exchanges, aggregated here into a single reference rate.",
      },
      {
        q: "Why does ethereum often move more than bitcoin?",
        a: "Ethereum's smaller market cap and its exposure to DeFi and NFT cycles add extra volatility on top of the broad crypto market trend set by bitcoin.",
      },
      {
        q: "Is ethereum digital gold like bitcoin?",
        a: "Not exactly. Bitcoin is positioned as a store of value; ethereum is positioned as programmable infrastructure — 'digital oil' for decentralized apps. They serve different roles in a portfolio.",
      },
    ],
    related: [
      { href: "/bitcoin-price", label: "Bitcoin price" },
      { href: "/gold-price-today", label: "Gold price today" },
      { href: "/silver-price-today", label: "Silver price today" },
    ],
    crumbs: crumbsHome,
    showWorldGold: false,
  },
];
