import type { PricePageConfig } from "@/components/PricePage";

export interface RegistryPage extends PricePageConfig {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
}

const goldConversions = (usd: number) => [
  { label: "Troy ounce (31.10 g)", usd },
  { label: "Gram · 24K", usd: usd / 31.1035 },
  { label: "Gram · 22K", usd: (usd / 31.1035) * 0.916 },
  { label: "Gram · 18K", usd: (usd / 31.1035) * 0.75 },
  { label: "Tola · 24K (11.66 g)", usd: (usd / 31.1035) * 11.6638 },
  { label: "Kilogram", usd: (usd / 31.1035) * 1000 },
];

const goldRelated = [
  { href: "/gold-price-per-gram", label: "Gold price per gram" },
  { href: "/gold-price-per-tola", label: "Gold price per tola" },
  { href: "/live-gold-price", label: "Live gold price" },
];

const crumbsHome = [{ href: "/", label: "Home" }];

export const GOLD_PAGES: RegistryPage[] = [
  {
    slug: "gold-price-today",
    title: "Gold Price Today | GoldRateToday",
    description:
      "Live XAU/USD rate per troy ounce with real-time chart, 24K/22K/18K conversions per gram and tola — updated...",
    keywords: ["gold price today", "live gold price", "gold rate today", "xau usd"],
    h1: "Gold Price Today",
    asset: "gold",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: goldConversions,
    figure: {
      src: "/images/gold-units-infographic.svg",
      alt: "Gold price today — 1 troy ounce equals 31.10 grams and 2.67 tolas",
      caption: "Gold weight units: 1 troy ounce = 31.10 grams = 2.67 tolas",
    },
    intro: [
      "The live gold price today is quoted in US dollars per troy ounce (XAU/USD) and moves continuously while global markets are open. GoldRateToday streams the spot price every minute, so the number you see above is the market's most recent consensus between wholesale buyers and sellers.",
      "Gold is priced around the clock, but the benchmark most traders watch is set during London and New York trading hours. Prices react within seconds to US inflation data, Federal Reserve decisions, dollar strength and geopolitical headlines — which is why a live chart matters more than a once-a-day fixing.",
      "Use the chart above to follow today's session, switch timeframes from 1 hour to 1 year, and compare the live spot rate with the conversion table for grams, tolas and kilos.",
    ],
    faqs: [
      { q: "What is the gold price today?", a: "The live gold price today is shown at the top of this page in US dollars per troy ounce, updating every minute during market hours. It reflects the global XAU/USD spot market." },
      { q: "Why does the gold price change every minute?", a: "Gold trades nearly 24 hours a day across London, New York and Asian markets. Every buy and sell order nudges the spot price, so it updates continuously — especially around US economic data releases." },
      { q: "What is XAU/USD?", a: "XAU is the ISO currency code for one troy ounce of gold, and XAU/USD is the spot exchange rate: how many US dollars one ounce of gold costs right now." },
      { q: "Is the price here the same as my local jeweller's price?", a: "Close, but not identical. Jewellers add making charges, local taxes and a buy/sell spread on top of the international spot price shown here." },
      { q: "When is the gold market open?", a: "Spot gold trades from Sunday 6pm ET to Friday 5pm ET with a daily one-hour break. The most liquid hours are the London–New York overlap, roughly 8am–12pm ET." },
      { q: "Why do gold prices differ between websites?", a: "Different sites use different data feeds with different refresh speeds. A site updating once a day can lag the live market by hours — GoldRateToday refreshes every minute, so small differences versus slower sites are normal." },
      { q: "Is the spot price what I pay for gold coins or bars?", a: "No. The spot price is the wholesale rate for large bars. Coins and small bars carry a dealer premium — typically 3–8% for common bullion coins — on top of spot." },
      { q: "Does the gold price change on weekends?", a: "Spot trading pauses from Friday 5pm ET to Sunday 6pm ET, so the quoted price holds still over the weekend. It can gap up or down at the Sunday reopen if news broke while markets were closed." },
    ],
    sections: [
      {
        heading: "How the gold price is determined",
        paragraphs: [
          "There is no single official gold price. The spot price emerges from continuous over-the-counter trading between banks, refiners and dealers, benchmarked twice each business day by the LBMA Gold Price auction in London. COMEX gold futures in New York provide a second reference that most traders watch alongside spot.",
          "The number at the top of this page is the wholesale spot rate for one troy ounce of .999 fine gold. The price you pay for coins, bars or jewelry is always higher — the gap is the dealer's premium, covering minting, distribution and margin.",
        ],
      },
      {
        heading: "What moves the gold price",
        paragraphs: [
          "Five forces drive most of gold's daily moves. Understanding them helps you read the chart above instead of just watching the number:",
        ],
        bullets: [
          "US dollar strength — gold is priced in dollars, so a weaker dollar mechanically lifts the gold price for foreign buyers.",
          "Real interest rates — when inflation-adjusted bond yields fall, non-yielding gold becomes relatively more attractive.",
          "Central-bank buying — central banks have been net buyers every year since 2010, with record purchases since 2022 adding a firm floor under the market.",
          "Geopolitical risk — wars, sanctions and financial stress trigger safe-haven flows into gold within hours.",
          "Inflation expectations — rising US inflation data has repeatedly sparked same-day gold rallies as investors hedge purchasing power.",
        ],
      },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/gold-price-today/", label: "Gold Price Today" }],
  },
  {
    slug: "live-gold-price",
    title: "Live Gold Price — Real-Time XAU/USD Chart | GoldRateToday",
    description:
      "Watch the live gold price with a real-time TradingView chart. Streaming XAU/USD quotes, intraday...",
    keywords: ["live gold price", "gold price live", "xauusd live chart", "real time gold price"],
    h1: "Live Gold Price",
    asset: "gold",
    unitLabel: "per troy ounce · live",
    unitDivisor: 1,
    conversions: goldConversions,
    intro: [
      "This page streams the live gold price with a professional TradingView chart — the same charting engine used by goldprice.org and institutional desks. Switch between 1-minute candles for scalping the news and daily candles for the bigger trend.",
      "The live quote above tracks XAU/USD, the global benchmark for physical gold. Use the drawing tools on the left of the chart to mark support and resistance, and add indicators like RSI or moving averages from the Indicators menu.",
    ],
    faqs: [
      { q: "How live is the gold price here?", a: "Quotes stream in real time during market hours and the page refreshes its data every minute. The chart itself ticks live via TradingView's feed." },
      { q: "Can I see 1-minute gold candles?", a: "Yes — open the timeframe menu at the top of the chart and choose 1 minute, 5 minutes or 15 minutes for intraday detail." },
      { q: "What moves the live gold price?", a: "US dollar strength, real interest rates, inflation data, central-bank buying and safe-haven demand during geopolitical stress are the biggest drivers." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/live-gold-price/", label: "Live Gold Price" }],
  },
  {
    slug: "spot-gold-price",
    title: "Spot Gold Price (XAU/USD) — Live Spot Rate | GoldRateToday",
    description:
      "Live spot gold price (XAU/USD) per troy ounce. Understand what the spot price means, how it differs from...",
    keywords: ["spot gold price", "gold spot price", "xau usd spot", "spot price of gold"],
    h1: "Spot Gold Price",
    asset: "gold",
    unitLabel: "per troy ounce · spot",
    unitDivisor: 1,
    conversions: goldConversions,
    intro: [
      "The spot gold price is the current market price for immediate delivery of one troy ounce of gold — the number quoted as XAU/USD on every trading screen in the world. Unlike futures contracts, which price gold for delivery months ahead, the spot price is for settlement almost now.",
      "Dealers, jewellers and central banks all reference the spot price and then add their own premiums. When news headlines say 'gold hit a record', they mean the spot price printed a new high, which you can verify on the live chart above.",
    ],
    faqs: [
      { q: "What is the spot price of gold?", a: "The spot price is the live market price for immediate purchase of physical gold, quoted per troy ounce in US dollars (XAU/USD)." },
      { q: "How is spot gold different from gold futures?", a: "Spot is for near-immediate delivery; futures (like COMEX GC) are contracts for delivery at a set future date and usually trade slightly above spot — a structure called contango." },
      { q: "Who sets the spot gold price?", a: "No single entity sets it. It emerges from continuous electronic trading between banks, funds and dealers, with the LBMA Gold Price auction twice daily acting as a widely watched benchmark." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/spot-gold-price/", label: "Spot Gold Price" }],
  },
  {
    slug: "gold-price-per-gram",
    title: "Gold Price Per Gram Today | GoldRateToday",
    description:
      "Live gold price per gram in USD. 24K, 22K and 18K per-gram rates updated every minute, with a real-time...",
    keywords: ["gold price per gram", "gold rate per gram", "24k gold price per gram", "gold price gram today"],
    h1: "Gold Price Per Gram",
    asset: "gold",
    unitLabel: "per gram · 24K",
    unitDivisor: 31.1035,
    conversions: goldConversions,
    intro: [
      "The gold price per gram is simply the per-ounce spot price divided by 31.1035 (the grams in a troy ounce). Because most jewellery is bought by the gram, this is the number shoppers compare in stores — and it updates here every minute.",
      "Remember that karat matters: the table shows 24K (pure), 22K (91.6% pure, common for jewellery) and 18K (75% pure). A 'per gram' quote without a karat is meaningless, so always check which purity a dealer means.",
    ],
    faqs: [
      { q: "How is the gold price per gram calculated?", a: "Divide the live per-ounce price by 31.1035. For example, at $4,000/oz, one gram of 24K gold is about $128.60." },
      { q: "What is the 22K gold price per gram?", a: "Multiply the 24K per-gram price by 0.916. The live 22K rate is shown in the conversion table above and updates with the spot price." },
      { q: "Why do jewellers charge more than the per-gram price here?", a: "The spot-derived per-gram price is the raw metal value. Retailers add making charges (often 8–20%), taxes and their margin." },
      { q: "Is gold sold by gram or by ounce?", a: "Wholesale markets trade by troy ounce; retail jewellery is priced by gram in most of the world and by pennyweight or ounce in the US." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/gold-price-per-gram/", label: "Gold Price Per Gram" }],
  },
  {
    slug: "gold-price-per-ounce",
    title: "Gold Price Per Ounce | GoldRateToday",
    description:
      "Live gold price per ounce (troy ounce) in USD. Streaming XAU/USD rate, chart and historical context,...",
    keywords: ["gold price per ounce", "gold price per oz", "price of gold per ounce", "1 oz gold price"],
    h1: "Gold Price Per Ounce",
    asset: "gold",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: goldConversions,
    intro: [
      "Gold's headline price is always quoted per troy ounce — a unit of 31.1035 grams used exclusively for precious metals (heavier than the 28.35-gram avoirdupois ounce used for groceries). The live per-ounce price above is the global XAU/USD spot rate.",
      "One ounce is also the standard weight for the world's most traded gold coins, including the American Gold Eagle, Canadian Maple Leaf and South African Krugerrand, which is why dealers price premiums 'per ounce over spot'.",
    ],
    faqs: [
      { q: "What is a troy ounce?", a: "A troy ounce is 31.1035 grams, the traditional weight unit for precious metals. Gold, silver, platinum and palladium are all priced per troy ounce." },
      { q: "How much is 1 ounce of gold worth today?", a: "The live value is shown above in US dollars and updates every minute during market hours." },
      { q: "Why is gold priced per ounce instead of per gram?", a: "The troy ounce is the historic wholesale standard dating back to the French town of Troyes. Retail markets convert it to grams for everyday buyers." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/gold-price-per-ounce/", label: "Gold Price Per Ounce" }],
  },
  {
    slug: "gold-price-per-tola",
    title: "Gold Price Per Tola Today — Live Tola Rate | GoldRateToday",
    description:
      "Live gold price per tola (11.66 grams) in USD. 24K tola rate updated every minute with chart and conversions.",
    keywords: ["gold price per tola", "tola gold price", "1 tola gold price", "gold rate per tola today"],
    h1: "Gold Price Per Tola",
    asset: "gold",
    unitLabel: "per tola · 24K",
    unitDivisor: 31.1035 / 11.6638,
    conversions: goldConversions,
    intro: [
      "A tola is 11.6638 grams — the traditional weight unit for gold across Pakistan, India and the Middle East. The per-tola price is the number quoted in bazaars from Karachi to Dubai, derived live from the international spot price.",
      "To convert: multiply the per-gram 24K price by 11.6638. Our table updates the tola rate every minute, so it always reflects the latest XAU/USD move converted at the current dollar rate.",
    ],
    faqs: [
      { q: "How many grams are in one tola?", a: "One tola equals exactly 11.6638 grams (about 0.375 troy ounces)." },
      { q: "How is the tola price calculated from the dollar rate?", a: "Take the USD per-ounce price, divide by 31.1035 to get per gram, then multiply by 11.6638. Convert to rupees at the current USD/PKR or USD/INR rate for the local price." },
      { q: "Which countries use tola for gold?", a: "Pakistan, India, Bangladesh, Nepal and much of the Gulf price retail gold per tola, especially for bridal and investment jewellery." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/gold-price-per-tola/", label: "Gold Price Per Tola" }],
  },
  {
    slug: "gold-price-per-kilo",
    title: "Gold Price Per Kilo (Kilogram) — Live Rate | GoldRateToday",
    description:
      "Live gold price per kilogram in USD. Wholesale kilo rate updated every minute with live chart.",
    keywords: ["gold price per kilo", "gold price per kg", "1 kg gold price", "gold price kilogram"],
    h1: "Gold Price Per Kilo",
    asset: "gold",
    unitLabel: "per kilogram · 24K",
    unitDivisor: 31.1035 / 1000,
    conversions: goldConversions,
    intro: [
      "A kilogram of gold is 32.1507 troy ounces, and the per-kilo price is the unit wholesale dealers, refiners and central banks think in. At current prices a single kilo bar is worth well over $100,000.",
      "London's wholesale market trades in 400-ounce 'Good Delivery' bars (about 12.5 kg), while 1-kilo bars are the standard for Asian markets — which is why the kilo price is the reference across Dubai, Mumbai and Shanghai.",
    ],
    faqs: [
      { q: "How much is 1 kilo of gold worth?", a: "Multiply the live per-ounce price by 32.1507. The live kilo price is shown above and refreshes every minute." },
      { q: "What is a good delivery bar?", a: "A 400-troy-ounce (12.5 kg) bar meeting LBMA purity and refiner standards, used for settlement in the London wholesale market." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/gold-price-per-kilo/", label: "Gold Price Per Kilo" }],
  },
  {
    slug: "24k-gold-price",
    title: "24K Gold Price Today — Live Pure Gold Rate | GoldRateToday",
    description:
      "Live 24K gold price per ounce, gram and tola. Pure (99.9%) gold rates updated every minute with chart.",
    keywords: ["24k gold price", "24 karat gold price", "pure gold price", "24k gold rate today"],
    h1: "24K Gold Price",
    asset: "gold",
    unitLabel: "per ounce · 24K",
    unitDivisor: 1,
    conversions: goldConversions,
    intro: [
      "24-karat gold is 99.9% pure — the benchmark against which all other purities are measured. The live 24K price on this page is the raw XAU/USD spot rate with no alloy discount applied.",
      "Because pure gold is soft, 24K is used mainly for bars, coins and investment products rather than everyday jewellery. To price 22K or 18K items, multiply the 24K price by 0.916 or 0.750 respectively.",
    ],
    faqs: [
      { q: "What does 24K gold mean?", a: "24 karat means 99.9% pure gold — 24 out of 24 parts are gold, with virtually no alloy metals." },
      { q: "Is 24K gold good for jewellery?", a: "It is too soft for daily-wear jewellery and scratches easily, which is why most jewellery is 22K or 18K. 24K is ideal for bars and coins held as investment." },
      { q: "How do I convert 24K price to 22K?", a: "Multiply by 0.916 (22/24). For 18K multiply by 0.75, for 14K by 0.585." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/24k-gold-price/", label: "24K Gold Price" }],
  },
  {
    slug: "22k-gold-price",
    title: "22K Gold Price Today — Live 22 Karat Rate | GoldRateToday",
    description:
      "Live 22K gold price per gram, tola and ounce. 91.6% pure gold rates updated every minute with chart.",
    keywords: ["22k gold price", "22 karat gold price", "22k gold rate", "916 gold price"],
    h1: "22K Gold Price",
    asset: "gold",
    unitLabel: "per gram · 22K",
    unitDivisor: 31.1035 / 0.916,
    conversions: goldConversions,
    intro: [
      "22-karat gold is 91.6% pure (22 parts gold, 2 parts alloy) — the standard for bridal and fine jewellery across South Asia and the Middle East. Its live price is the 24K spot rate multiplied by 0.916.",
      "The '916' hallmark you see stamped on jewellery certifies this 91.6% purity. Because making charges are calculated on the metal value, even small spot moves change what you pay at the counter.",
    ],
    faqs: [
      { q: "What is 22K gold purity?", a: "22K gold is 91.6% pure gold alloyed with metals like copper or silver for strength — the classic jewellery standard in India, Pakistan and the Gulf." },
      { q: "What does 916 hallmark mean?", a: "916 is the hallmark for 22K gold, certifying 91.6% purity (916 parts per thousand)." },
      { q: "Is 22K better than 24K for jewellery?", a: "For wearing, yes — the alloy makes it harder and more durable. For pure investment, 24K bars carry lower premiums." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/22k-gold-price/", label: "22K Gold Price" }],
  },
  {
    slug: "18k-gold-price",
    title: "18K Gold Price Today — Live 18 Karat Rate | GoldRateToday",
    description:
      "Live 18K gold price per gram and ounce. 75% pure gold rates updated every minute with chart.",
    keywords: ["18k gold price", "18 karat gold price", "18k gold rate", "750 gold price"],
    h1: "18K Gold Price",
    asset: "gold",
    unitLabel: "per gram · 18K",
    unitDivisor: 31.1035 / 0.75,
    conversions: goldConversions,
    intro: [
      "18-karat gold is 75% pure — the global standard for fine Western jewellery and luxury watches. Its price is the 24K spot rate multiplied by 0.75, and it updates live on this page.",
      "The 25% alloy (often copper, silver, palladium or nickel) is what creates rose, yellow and white gold colours while making pieces hard enough for daily wear.",
    ],
    faqs: [
      { q: "What is 18K gold purity?", a: "18K gold is 75% pure gold (18 of 24 parts), stamped 750. It balances rich colour with durability." },
      { q: "Is 18K gold real gold?", a: "Yes — it contains 75% pure gold. Lower karat does not mean fake; it means alloyed for strength." },
      { q: "Why is 18K common in designer jewellery?", a: "It holds gemstones securely, resists scratching better than higher karats, and takes coloured-gold alloys beautifully." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/18k-gold-price/", label: "18K Gold Price" }],
  },
  {
    slug: "gold-rate-today",
    title: "Gold Rate Today | GoldRateToday",
    description:
      "Today's gold rates: live per-tola, per-gram and per-ounce prices with 24K/22K/18K breakup, updated every...",
    keywords: ["gold rate today", "today gold rate", "aaj sonay ka rate", "gold ka rate"],
    h1: "Gold Rate Today",
    asset: "gold",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: goldConversions,
    intro: [
      "Today's gold rate — whether you call it rate or price — is set by the live XAU/USD spot market and converted here into the units shoppers actually use: tola, gram and ounce, across 24K, 22K and 18K purities.",
      "In Pakistan and India the 'rate' most people ask about is the per-tola 24K rate. Find it in the conversion table above; it moves tick-for-tick with the international price and the dollar exchange rate.",
    ],
    faqs: [
      { q: "What is today's gold rate per tola?", a: "The live per-tola 24K rate is in the conversion table above, recalculated every minute from the international spot price." },
      { q: "What is the difference between gold rate and gold price?", a: "Nothing — 'rate' and 'price' mean the same thing. 'Rate' is simply the more common word in South Asian markets." },
      { q: "Why did the gold rate change since morning?", a: "The international spot price moves all day on dollar moves, US data and global risk sentiment, and local currency shifts amplify the move in rupee terms." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/gold-rate-today/", label: "Gold Rate Today" }],
  },
  {
    slug: "gold-price-chart",
    title: "Gold Price Chart | GoldRateToday",
    description:
      "Interactive gold price chart with 1-minute to 1-year timeframes, candlesticks and drawing tools. Live...",
    keywords: ["gold price chart", "xauusd chart", "gold chart live", "gold price graph"],
    h1: "Gold Price Chart",
    asset: "gold",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: goldConversions,
    intro: [
      "This interactive gold price chart plots XAU/USD with professional TradingView charting: switch from 1-minute candles for day trading to monthly candles for decade-long trends, draw trendlines, and overlay indicators like moving averages and RSI.",
      "Chartists watch the same levels worldwide — round numbers like $4,000, previous all-time highs, and the 50/200-day moving averages. Breaks of these levels often accelerate because algorithmic and momentum traders pile in.",
    ],
    faqs: [
      { q: "How do I read the gold price chart?", a: "Each candle shows open, high, low and close for its timeframe. Green candles closed higher than they opened; red closed lower. Longer timeframes smooth out noise." },
      { q: "What timeframe is best for gold?", a: "Day traders use 5–15 minute candles; swing traders use 4-hour and daily; investors watch weekly and monthly closes." },
      { q: "Can I add indicators to the chart?", a: "Yes — click Indicators above the chart to add RSI, MACD, moving averages, Bollinger Bands and hundreds more." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/gold-price-chart/", label: "Gold Price Chart" }],
  },
  {
    slug: "gold-price-history",
    title: "Gold Price History | GoldRateToday",
    description:
      "Explore gold price history: all-time highs, 1-year and 5-year performance, and the events that moved gold,...",
    keywords: ["gold price history", "historical gold prices", "gold all time high", "gold price 5 years ago"],
    h1: "Gold Price History",
    asset: "gold",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: goldConversions,
    intro: [
      "Gold's history is a story of crises and currency debasement: $35/oz under Bretton Woods, $850 in the 1980 inflation spike, $1,900 in the 2011 debt crisis, $2,070 during COVID, and new all-time highs above $4,000 in the mid-2020s as central banks bought record tonnage.",
      "Use the chart's 1Y and All timeframes to see these eras yourself. Notice how gold's biggest bull runs coincide with negative real interest rates — when bonds pay less than inflation, gold's zero yield suddenly looks attractive.",
    ],
    faqs: [
      { q: "What is gold's all-time high?", a: "Gold has printed successive all-time highs through the mid-2020s above $4,000/oz. Check the chart's All timeframe for the exact peak." },
      { q: "What was the gold price 5 years ago?", a: "Roughly five years ago gold traded near $1,800/oz — use the 5Y timeframe above to see the full run." },
      { q: "Why does gold rise during crises?", a: "Gold has no counterparty risk and a 5,000-year record as money. When trust in currencies or banks wobbles, investors pay up for that certainty." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/gold-price-history/", label: "Gold Price History" }],
  },
  {
    slug: "gold-silver-ratio",
    title: "Gold Silver Ratio — Live XAU/XAG Ratio Chart | GoldRateToday",
    description:
      "Live gold-silver ratio: how many ounces of silver buy one ounce of gold. Real-time ratio chart and what it...",
    keywords: ["gold silver ratio", "silver gold ratio", "xau xag ratio", "gold to silver ratio"],
    h1: "Gold-Silver Ratio",
    asset: "gold",
    unitLabel: "ounces of silver per ounce of gold",
    unitDivisor: 1 / 71,
    conversions: goldConversions,
    intro: [
      "The gold-silver ratio tells you how many ounces of silver it takes to buy one ounce of gold — divide the gold price by the silver price. Around 70 is typical in recent years; extremes have marked historic turning points.",
      "Traders use the ratio for pair trades: a very high ratio (silver cheap vs gold) has often preceded silver outperforming, while a very low ratio suggests the opposite. It is a sentiment gauge, not a crystal ball.",
    ],
    faqs: [
      { q: "What is a good gold-silver ratio?", a: "There is no fixed 'good' level. Historically it averaged ~15–20 under bimetallic standards and ~60–80 in modern markets. Traders watch extremes, not averages." },
      { q: "How is the gold-silver ratio calculated?", a: "Divide the gold price per ounce by the silver price per ounce. At $4,000 gold and $50 silver, the ratio is 80." },
      { q: "Does a high ratio mean buy silver?", a: "Many traders treat very high ratios as silver being relatively cheap, but the ratio can stay stretched for years — it is a valuation hint, not timing advice." },
    ],
    related: [
      ...goldRelated,
      { href: "/silver-price-today/", label: "Silver price today" },
    ],
    crumbs: [...crumbsHome, { href: "/gold-silver-ratio/", label: "Gold-Silver Ratio" }],
  },
  {
    slug: "gold-price-calculator",
    title: "Gold Price Calculator | GoldRateToday",
    description:
      "Free gold price calculator: enter weight and karat to get live melt value from the current spot price....",
    keywords: ["gold price calculator", "gold value calculator", "gold melt value calculator", "calculate gold price"],
    h1: "Gold Price Calculator",
    asset: "gold",
    unitLabel: "per troy ounce (calculator base)",
    unitDivisor: 1,
    conversions: goldConversions,
    intro: [
      "To calculate your gold's value: multiply its weight by its purity, then by the live price. A 10-gram 22K bracelet at a $4,000/oz spot is worth 10 × 0.916 × ($4,000 ÷ 31.1035) ≈ $1,178 in melt value.",
      "Enter your gold's weight, pick its unit and karat, and the calculator shows the live melt value at the current spot price, plus a dealer payout estimate you can adjust with the margin slider. No sign-up, no app, the math updates as you type.",
    ],
    faqs: [
      { q: "How do I calculate gold price manually?", a: "Weight × purity × live price per unit. Example: 5g of 18K at $130/g 24K = 5 × 0.75 × 130 = $487.50 melt value." },
      { q: "What is melt value?", a: "The raw metal value of a gold item if melted down — weight times purity times spot price, with no craftsmanship premium." },
      { q: "Why do buyers offer less than the calculator value?", a: "Refiners and dealers need a margin for refining costs, assay risk and their profit — typically 2–10% below melt for scrap." },
      { q: "What is the dealer payout estimate?", a: "An estimate of what a dealer might pay after their margin. Move the slider from 0% for a full melt payout to 15% for a steep discount, and the calculator shows the payout next to the melt value." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/gold-price-calculator/", label: "Gold Price Calculator" }],
  },
  {
    slug: "shanghai-gold-price",
    title: "Shanghai Gold Price | GoldRateToday",
    description:
      "Shanghai Gold Exchange benchmark price and how it compares to London/New York spot. Live gold chart and...",
    keywords: ["shanghai gold price", "sge gold price", "shanghai gold benchmark", "china gold price"],
    h1: "Shanghai Gold Price",
    asset: "gold",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: goldConversions,
    intro: [
      "The Shanghai Gold Exchange (SGE) sets the world's most important Asian gold benchmark, quoted in yuan per gram. Because China is the largest gold consumer, the SGE price — and its premium or discount to London spot — reveals real physical demand.",
      "A rising Shanghai premium means Asian buyers are paying up for metal, historically a bullish signal. When the premium collapses, it often flags weakening Eastern demand even if Western paper markets look calm.",
    ],
    faqs: [
      { q: "What is the Shanghai gold price?", a: "The benchmark set on the Shanghai Gold Exchange, quoted in CNY per gram. It is the reference for physical gold across Asia." },
      { q: "Why does the Shanghai premium matter?", a: "It measures physical demand: a high premium over London spot means buyers are competing for real metal, which has preceded several major rallies." },
      { q: "How do I convert SGE yuan/gram to USD/oz?", a: "Multiply the CNY/gram price by 31.1035, then divide by the USD/CNY rate." },
    ],
    related: goldRelated,
    crumbs: [...crumbsHome, { href: "/shanghai-gold-price/", label: "Shanghai Gold Price" }],
  },
];
