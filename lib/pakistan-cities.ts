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

export interface CityPageContent {
  title: string;
  description: string;
  h1: string;
  intro: string[];
  faqs: { q: string; a: string }[];
}

const fmtLocal = (v: number, symbol: string) =>
  `${symbol}${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

/** Live content for a city page. Rates are the national live rate (spot + USD/PKR) — the same across every Pakistani city. */
export function cityContent(city: PakistanCity, rate: number, usdPerOz: number): CityPageContent {
  const perTola24 = (usdPerOz / 31.1035) * 11.6638 * rate;
  const perGram24 = (usdPerOz / 31.1035) * rate;
  const perTola22 = perTola24 * 0.916;
  const perTola18 = perTola24 * 0.75;

  return {
    title: `Gold Rate in ${city.name} Today — Live 24K, 22K & 18K per Tola | GoldRateToday`,
    description: `Live gold rate in ${city.name}: ${fmtLocal(perTola24, "Rs")} per tola (24K), ${fmtLocal(perTola22, "Rs")} (22K), ${fmtLocal(perTola18, "Rs")} (18K). Updated every minute from international spot.`,
    h1: `Gold Rate in ${city.name}`,
    intro: [
      `The gold rate in ${city.name} today is ${fmtLocal(perTola24, "Rs")} per tola and ${fmtLocal(perGram24, "Rs")} per gram for 24K, tracking the international spot price of $${usdPerOz.toLocaleString("en-US", { maximumFractionDigits: 0 })} per ounce converted at the current USD/PKR rate. Gold rates are the same across Pakistan — ${city.name}'s local market follows the All Pakistan Sarafa Gems and Jewellers Association (APSGJA) daily rates, which move with global spot plus the rupee's value against the dollar.`,
      `${city.marketNote} Jewellers there quote 24K, 22K and 18K rates per tola (11.6638 grams); 22K is the usual choice for jewellery, while 24K bars and coins are bought for investment. Making charges are added on top of the rates below, so compare two or three shops before buying.`,
    ],
    faqs: [
      {
        q: `What is the gold rate in ${city.name} today?`,
        a: `Today's gold rate in ${city.name} is ${fmtLocal(perTola24, "Rs")} per tola and ${fmtLocal(perGram24, "Rs")} per gram for 24K, converted live from the international spot price. Rates update every minute during market hours.`,
      },
      {
        q: `How much is 1 tola gold in ${city.name}?`,
        a: `One tola (11.6638 grams) of 24K gold costs ${fmtLocal(perTola24, "Rs")} in ${city.name} at the current live rate. For 22K jewellery gold, one tola costs about ${fmtLocal(perTola22, "Rs")} before making charges.`,
      },
      {
        q: `What is the 22K gold rate in ${city.name}?`,
        a: `The 22K gold rate in ${city.name} is ${fmtLocal(perTola22, "Rs")} per tola (${fmtLocal(perGram24 * 0.916, "Rs")} per gram). 22K is the standard purity for jewellery in Pakistan.`,
      },
      {
        q: `Where can I buy gold in ${city.name}?`,
        a: `The main gold market in ${city.name} is ${city.market}. Compare quotes from at least two jewellers there against the live rate above — unusually large premiums over spot are a red flag.`,
      },
    ],
  };
}
