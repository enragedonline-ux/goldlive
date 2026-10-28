import type { Country } from "./countries";

export interface CountryPageContent {
  title: string;
  description: string;
  h1: string;
  intro: string[];
  faqs: { q: string; a: string }[];
  /** extra Urdu paragraph for Pakistan */
  urdu?: string;
}

const fmtLocal = (v: number, symbol: string) =>
  `${symbol}${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export function goldCountryContent(c: Country, rate: number, usdPerOz: number): CountryPageContent {
  const perTola = (usdPerOz / 31.1035) * 11.6638 * rate;
  const perGram = (usdPerOz / 31.1035) * rate;
  const isPK = c.slug === "pakistan";
  const isAR = c.slug === "argentina";
  const unitWord = c.localUnit === "tola" || isPK ? "tola" : "gram";
  const h1 = isPK ? `Gold Rate in Pakistan` : `Gold Price in ${c.name}`;
  const keyword = isPK ? "gold rate in Pakistan" : `gold price in ${c.name}`;

  return {
    title: isPK
      ? `Gold Rate in Pakistan Today — Live per Tola & Gram in PKR | GoldRateToday`
      : isAR
        ? `Gold Rate Today in Argentina | Live per Gram in ARS | GoldRateToday`
        : `Gold Price in ${c.name} Today | Live per Gram & Ounce in ${c.currency} | GoldRateToday`,
    description: isPK
      ? `Live gold rate in Pakistan: ${fmtLocal(perTola, "Rs")} per tola, ${fmtLocal(perGram, "Rs")} per gram. Updated every minute from international spot.`
      : isAR
        ? `Gold rate today in Argentina: ${fmtLocal(perGram, c.currencySymbol)} per gram in ARS. Live chart, conversions and 24h change — updated every minute.`
        : `Live ${keyword}: ${fmtLocal(perGram, c.currencySymbol)} per gram in ${c.currency}. Real-time chart, conversions and 24h change — updated every minute.`,
    h1,
    intro: [
      isPK
        ? `The gold rate in Pakistan today is ${fmtLocal(perTola, "Rs")} per tola and ${fmtLocal(perGram, "Rs")} per gram, tracking the international spot price of $${usdPerOz.toLocaleString("en-US", { maximumFractionDigits: 0 })} per ounce converted at the current USD/PKR rate. Pakistan's bullion market follows the All Pakistan Sarafa Gems and Jewellers Association (APSGJA) daily rates, which move with global spot plus the rupee's value against the dollar.`
        : isAR
          ? `The gold rate today in Argentina is ${fmtLocal(perGram, c.currencySymbol)} per gram (${fmtLocal((usdPerOz * rate), c.currencySymbol)} per troy ounce), converted live from the international XAU/USD spot price of $${usdPerOz.toLocaleString("en-US", { maximumFractionDigits: 0 })}. Local dealer prices in ${c.currency} add a small premium over this benchmark for refining, minting and retail margin.`
          : `The gold price in ${c.name} today is ${fmtLocal(perGram, c.currencySymbol)} per gram (${fmtLocal((usdPerOz * rate), c.currencySymbol)} per troy ounce), converted live from the international XAU/USD spot price of $${usdPerOz.toLocaleString("en-US", { maximumFractionDigits: 0 })}. Local dealer prices in ${c.currency} add a small premium over this benchmark for refining, minting and retail margin.`,
      isPK
        ? `In Pakistan, gold is quoted per tola (11.6638 grams) — the traditional unit across South Asia. When the rupee weakens against the dollar, local gold rates rise even if the international price is flat, because Pakistan imports virtually all its gold. Check the live chart below and the per-tola/per-gram table before buying from any sarafa market.`
        : `${c.name === "USA" ? "US" : c.name}'s retail gold market prices 24-karat bars and coins slightly above spot. The table below converts the live spot price into ${c.currency} across common weights — use it as a fair-value benchmark when comparing dealer quotes${c.capital ? ` in ${c.capital}` : ""} or online.`,
    ],
    faqs: [
      ...(isAR
        ? [
            {
              q: "What is the gold rate today in Argentina?",
              a: `Today's gold rate in Argentina is ${fmtLocal(perGram, c.currencySymbol)} per gram (ARS), converted live from the international spot market. The price refreshes every minute.`,
            },
          ]
        : []),
      {
        q: isPK ? "What is the gold rate in Pakistan today?" : `What is the gold price in ${c.name} today?`,
        a: isPK
          ? `Today's gold rate in Pakistan is ${fmtLocal(perTola, "Rs")} per tola and ${fmtLocal(perGram, "Rs")} per gram for 24K, converted live from the international spot price. Rates update every minute during market hours.`
          : `Today's gold price in ${c.name} is ${fmtLocal(perGram, c.currencySymbol)} per gram (${c.currency}), converted live from the international spot market. The price refreshes every minute.`,
      },
      {
        q: isPK ? "How much is 1 tola gold in Pakistan?" : `How much is 1 gram of gold in ${c.name}?`,
        a: isPK
          ? `One tola (11.6638 grams) of 24K gold costs ${fmtLocal(perTola, "Rs")} at the current live rate. For 22K jewellery gold, multiply by 0.916 — roughly ${fmtLocal(perTola * 0.916, "Rs")} per tola before making charges.`
          : `One gram of 24K gold in ${c.name} costs ${fmtLocal(perGram, c.currencySymbol)} at the live rate. Jewellery-grade 22K works out to about ${fmtLocal(perGram * 0.916, c.currencySymbol)} per gram before craftsmanship charges.`,
      },
      {
        q: isPK ? "Why does the gold rate change daily in Pakistan?" : `Why is gold priced in ${c.currency} different from the dollar price?`,
        a: isPK
          ? `Two forces move Pakistan's gold rate: the international dollar price of gold, and the USD/PKR exchange rate. A weaker rupee pushes local rates up even when global gold is unchanged — which is why Pakistani buyers watch both.`
          : `The ${c.currency} price is the dollar spot price converted at the live USD/${c.currency} exchange rate, so currency moves shift local prices even when gold itself is flat. Dealer premiums add a further small spread.`,
      },
      {
        q: isPK ? "Is the APSGJA rate the same as this live rate?" : `Where can I buy gold at near-spot prices in ${c.name}?`,
        a: isPK
          ? `APSGJA publishes an official daily rate that closely tracks the international market; our live rate updates continuously through the day while APSGJA fixes once daily. Small differences between the two are normal.`
          : `Licensed bullion dealers and major banks typically sell closest to spot. Compare at least two quotes against the live benchmark above — unusually large premiums are a red flag.`,
      },
    ],
    urdu: isPK
      ? "پاکستان میں سونے کی قیمت کا انحصار عالمی مارکیٹ اور ڈالر کے مقابلے میں روپے کی قدر پر ہوتا ہے۔ خریداری سے پہلے لائیو ریٹ ضرور چیک کریں۔"
      : undefined,
  };
}

export function silverCountryContent(c: Country, rate: number, usdPerOz: number): CountryPageContent {
  const perGram = (usdPerOz / 31.1035) * rate;
  const perKilo = perGram * 1000;
  const keyword = `silver price in ${c.name}`;

  return {
    title: `Silver Price in ${c.name} Today | Live per Gram & Kilo in ${c.currency} | GoldRateToday`,
    description: `Live ${keyword}: ${fmtLocal(perGram, c.currencySymbol)} per gram in ${c.currency}. Real-time XAG chart, conversions and 24h change — updated every minute.`,
    h1: `Silver Price in ${c.name}`,
    intro: [
      `The silver price in ${c.name} today is ${fmtLocal(perGram, c.currencySymbol)} per gram (${fmtLocal(perKilo, c.currencySymbol)} per kilogram), converted live from the international XAG/USD spot price of $${usdPerOz.toLocaleString("en-US", { maximumFractionDigits: 2 })}. Silver's industrial demand — solar, EVs and electronics — makes it more volatile than gold, so intraday swings are normal.`,
      `Use the live chart and the ${c.currency} conversion table below as your benchmark. Physical silver in ${c.name} typically trades at spot plus a dealer premium that varies with bar size and brand.`,
    ],
    faqs: [
      {
        q: `What is the silver price in ${c.name} today?`,
        a: `Today's silver price in ${c.name} is ${fmtLocal(perGram, c.currencySymbol)} per gram (${c.currency}), converted live from the international spot market and refreshed every minute.`,
      },
      {
        q: `How much is 1 kg of silver in ${c.name}?`,
        a: `One kilogram of fine silver costs ${fmtLocal(perKilo, c.currencySymbol)} at the current live rate, before dealer premiums. Kilo bars usually carry the lowest premium per gram.`,
      },
      {
        q: `Why does silver move more than gold?`,
        a: `Roughly half of silver demand is industrial, so economic cycles hit it harder — it amplifies gold's moves in both directions. The gold-silver ratio on our silver price page shows whether silver looks cheap or expensive versus gold right now.`,
      },
    ],
  };
}
