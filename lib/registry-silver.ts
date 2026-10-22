import type { RegistryPage } from "./registry-gold";

const crumbsHome = [{ href: "/", label: "Home" }];

const silverConversions = (usd: number) => [
  { label: "Troy ounce (31.10 g)", usd },
  { label: "Gram", usd: usd / 31.1035 },
  { label: "Kilogram", usd: (usd / 31.1035) * 1000 },
  { label: "Tola (11.66 g)", usd: (usd / 31.1035) * 11.6638 },
];

export const SILVER_PAGES: RegistryPage[] = [
  {
    slug: "silver-price-today",
    title: "Silver Price Today | Live XAG/USD Spot per Ounce & Gram | GoldLive",
    description:
      "Live XAG/USD rate per troy ounce with real-time chart, per-gram and per-kilo conversions, gold-silver ratio and 24h change — updated every minute.",
    keywords: ["silver price today", "live silver price", "xag usd", "silver rate today", "silver price per gram"],
    h1: "Silver Price Today",
    asset: "silver",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: silverConversions,
    intro: [
      "The silver spot price (XAG/USD) is the live market rate for one troy ounce of .999 fine silver, quoted in US dollars. Unlike gold, roughly half of all silver demand comes from industry — solar panels, electric vehicles and electronics — which is why silver moves faster than gold in both directions.",
      "Below you'll find today's live silver price with an interactive chart, per-gram and per-kilo conversions, and the current gold-silver ratio that traders watch to judge whether silver looks cheap or expensive relative to gold.",
    ],
    faqs: [
      {
        q: "What is the silver spot price?",
        a: "The silver spot price is the current market price for one troy ounce of pure silver for immediate delivery, quoted as XAG/USD. Dealer and retail prices add a premium on top of spot.",
      },
      {
        q: "How much is 1 gram of silver today?",
        a: "Divide the live spot price per troy ounce by 31.1035. The conversion table above does this automatically and updates with the live price.",
      },
      {
        q: "What is the gold-silver ratio?",
        a: "The gold-silver ratio tells you how many ounces of silver it takes to buy one ounce of gold. It has averaged around 60 over the last 50 years; readings far above that have historically favored silver.",
      },
      {
        q: "Why is silver more volatile than gold?",
        a: "Silver's smaller market and heavy industrial use mean the same dollar flow moves its price much more. About 70% of silver is mined as a byproduct of other metals, so supply can't quickly respond to price spikes.",
      },
    ],
    related: [
      { href: "/gold-price-today", label: "Gold price today" },
      { href: "/bitcoin-price", label: "Bitcoin price" },
      { href: "/ethereum-price", label: "Ethereum price" },
    ],
    crumbs: crumbsHome,
    showWorldGold: false,
  },
];
