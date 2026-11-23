export interface PakistanCity {
  slug: string;
  name: string;
  /** the city's famous sarafa (gold) market */
  market: string;
  /** one line on the city's gold trade */
  marketNote: string;
}

export const PAKISTAN_CITIES: PakistanCity[] = [
  {
    slug: "karachi",
    name: "Karachi",
    market: "Sarafa Bazaar, Saddar",
    marketNote:
      "Pakistan's largest bullion market — Karachi's Sarafa Bazaar in Saddar sets the tone for gold trading across Sindh.",
  },
  {
    slug: "lahore",
    name: "Lahore",
    market: "Sarafa Bazaar, Akbari Mandi",
    marketNote:
      "Lahore's historic Akbari Mandi area hosts the city's main sarafa market, serving Punjab's biggest jewellery trade.",
  },
  {
    slug: "islamabad",
    name: "Islamabad",
    market: "Jinnah Super Market",
    marketNote:
      "The capital's jewellers cluster in Jinnah Super Market and Melody Market, catering to buyers from across the twin cities.",
  },
  {
    slug: "rawalpindi",
    name: "Rawalpindi",
    market: "Sarafa Bazaar, Raja Bazaar",
    marketNote:
      "Rawalpindi's Raja Bazaar is one of the oldest sarafa markets in the region, with generations of family jewellers.",
  },
  {
    slug: "faisalabad",
    name: "Faisalabad",
    market: "Sarafa Bazaar, Clock Tower",
    marketNote:
      "Faisalabad's sarafa market around the historic Clock Tower (Ghanta Ghar) serves the textile city's gold buyers.",
  },
  {
    slug: "multan",
    name: "Multan",
    market: "Sarafa Bazaar, Hussain Agahi",
    marketNote:
      "Multan's Hussain Agahi bazaar is the City of Saints' traditional gold market, busy through wedding season.",
  },
  {
    slug: "peshawar",
    name: "Peshawar",
    market: "Sarafa Bazaar, Chowk Yadgar",
    marketNote:
      "Peshawar's Chowk Yadgar area hosts Khyber Pakhtunkhwa's main sarafa market, known for traditional Pashtun jewellery.",
  },
  {
    slug: "quetta",
    name: "Quetta",
    market: "Sarafa Bazaar, Liaquat Bazaar",
    marketNote:
      "Quetta's Liaquat Bazaar is Balochistan's gold trading centre, drawing buyers from across the province.",
  },
  {
    slug: "sialkot",
    name: "Sialkot",
    market: "Sarafa Bazaar",
    marketNote:
      "Sialkot's sarafa market serves the export city's jewellers and buyers, alongside its famous sports-goods trade.",
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    market: "Sarafa Bazaar, Shahi Bazaar",
    marketNote:
      "Hyderabad's Shahi Bazaar is Sindh's historic gold market, one of the oldest sarafa centres in the province.",
  },
];

export function getCity(slug: string): PakistanCity | undefined {
  return PAKISTAN_CITIES.find((c) => c.slug === slug);
}

import { PAKISTAN_LOCAL_RATE, PURITY_22K, PURITY_18K } from "./pakistan-local-rate";

export interface CityPageContent {
  title: string;
  description: string;
  h1: string;
  intro: string[];
  faqs: { q: string; a: string }[];
}

const fmtLocal = (v: number, symbol: string) =>
  `${symbol}${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

/**
 * Live content for a city page.
 * Headline numbers are the OFFICIAL LOCAL sarafa rate (APSGJA, daily fixing) —
 * the rate Pakistani bazaars actually trade at. The live international spot
 * conversion is shown as a secondary reference (spotPerTola), never as the
 * local rate. 22K/18K are derived from the 24K local rate by standard fineness.
 */
export function cityContent(city: PakistanCity, rate: number, usdPerOz: number): CityPageContent {
  const local = PAKISTAN_LOCAL_RATE;
  const perTola24 = local.perTola24K;
  const perGram24 = perTola24 / 11.6638;
  const perTola22 = perTola24 * PURITY_22K;
  const perTola18 = perTola24 * PURITY_18K;
  const spotPerTola = (usdPerOz / 31.1035) * 11.6638 * rate;
  const changeWord = local.changePerTola >= 0 ? "up" : "down";
  const changeAbs = Math.abs(local.changePerTola);

  return {
    title: `Gold Rate in ${city.name} Today — Local Sarafa Rate 24K, 22K & 18K per Tola | GoldRateToday`,
    description: `Local gold rate in ${city.name}: ${fmtLocal(perTola24, "Rs")} per tola (24K), ${fmtLocal(perTola22, "Rs")} (22K), ${fmtLocal(perTola18, "Rs")} (18K) — APSGJA rate, ${local.dateLabel}. Live international spot also shown.`,
    h1: `Gold Rate in ${city.name}`,
    intro: [
      `The gold rate in ${city.name} today is ${fmtLocal(perTola24, "Rs")} per tola and ${fmtLocal(perGram24, "Rs")} per gram for 24K, as fixed by the All Pakistan Sarafa Gems and Jewellers Association (APSGJA) on ${local.dateLabel} — ${changeWord} ${fmtLocal(changeAbs, "Rs")} from yesterday's ${fmtLocal(local.prevPerTola24K, "Rs")} per tola. This is the local sarafa rate Pakistani bazaars trade at.`,
      `${city.marketNote} Jewellers there quote 24K, 22K and 18K rates per tola (11.6638 grams); 22K is the usual choice for jewellery, while 24K bars and coins are bought for investment. Making charges are added on top of the rates below, so compare two or three shops before buying. For reference, the live international spot value is ${fmtLocal(spotPerTola, "Rs")} per tola — the local rate sits above spot because it carries import cost, dealer margin and the open-market dollar rate.`,
    ],
    faqs: [
      {
        q: `What is the gold rate in ${city.name} today?`,
        a: `Today's local gold rate in ${city.name} is ${fmtLocal(perTola24, "Rs")} per tola and ${fmtLocal(perGram24, "Rs")} per gram for 24K, as fixed by APSGJA on ${local.dateLabel}. The local rate is updated once a day when the association publishes it.`,
      },
      {
        q: `How much is 1 tola gold in ${city.name}?`,
        a: `One tola (11.6638 grams) of 24K gold costs ${fmtLocal(perTola24, "Rs")} in ${city.name} at the current local rate. For 22K jewellery gold, one tola costs about ${fmtLocal(perTola22, "Rs")} before making charges.`,
      },
      {
        q: `What is the 22K gold rate in ${city.name}?`,
        a: `The 22K gold rate in ${city.name} is ${fmtLocal(perTola22, "Rs")} per tola (${fmtLocal(perGram24 * PURITY_22K, "Rs")} per gram). 22K is the standard purity for jewellery in Pakistan.`,
      },
      {
        q: `Why is the local rate higher than the international gold price?`,
        a: `The local sarafa rate sits above the international spot value because it carries import cost, dealer margin and the open-market dollar rate rather than the interbank one. On ${local.dateLabel} the local 24K rate is ${fmtLocal(perTola24, "Rs")} per tola while the live spot value is about ${fmtLocal(spotPerTola, "Rs")} per tola.`,
      },
      {
        q: `Where can I buy gold in ${city.name}?`,
        a: `The main gold market in ${city.name} is ${city.market}. Compare quotes from at least two jewellers there against the local rate above — unusually large premiums over the sarafa rate are a red flag.`,
      },
    ],
  };
}
