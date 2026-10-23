import type { RegistryPage } from "./registry-gold";

const crumbsHome = [{ href: "/", label: "Home" }];

const silverConversions = (usd: number) => [
  { label: "Troy ounce (31.10 g)", usd },
  { label: "Gram", usd: usd / 31.1035 },
  { label: "Kilogram", usd: (usd / 31.1035) * 1000 },
  { label: "Tola (11.66 g)", usd: (usd / 31.1035) * 11.6638 },
];

const silverConversionsLb = (usd: number) => [
  ...silverConversions(usd),
  { label: "Pound (453.6 g)", usd: (usd / 31.1035) * 453.592 },
];

const silverCrumbs = [{ href: "/", label: "Home" }, { href: "/silver-price-today", label: "Silver Price" }];

export const SILVER_PAGES: RegistryPage[] = [
  {
    slug: "silver-price-today",
    title: "Silver Price Today | Live XAG/USD Spot per Ounce & Gram | GoldRateToday",
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
      { href: "/spot-silver-price", label: "Spot silver price" },
      { href: "/silver-price-per-ounce", label: "Silver price per ounce" },
      { href: "/silver-price-chart", label: "Silver price chart" },
    ],
    crumbs: crumbsHome,
    showWorldGold: true,
    showSilverCountries: true,
  },
{
    slug: "live-silver-price",
    title: "Live Silver Price | Real-Time XAG/USD per Ounce | GoldRateToday",
    description:
      "Stream the live silver price in real time — XAG/USD spot per troy ounce with the 24h change, an interactive chart and per-gram, kilo & tola conversions.",
    keywords: ["live silver price", "silver price live", "xag usd live", "silver spot live", "silver price now"],
    h1: "Live Silver Price",
    asset: "silver",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: silverConversions,
    intro: [
      "This page streams the live silver price — the XAG/USD spot rate for one troy ounce of .999 fine silver — refreshing as the market ticks. Silver trades nearly around the clock, from Sunday evening to Friday evening US Eastern with only a short daily settlement break, so there is almost always a live quote on screen.",
      "Below the live quote you will find an interactive chart, the 24-hour change, and conversion rows that translate the spot price into grams, kilograms, tolas and pounds instantly. If the number looks different from your local dealer's quote, that is normal — dealers add a premium over spot for minting, shipping and their margin.",
    ],
    faqs: [
      {
        q: "How often does the live silver price update?",
        a: "The spot price ticks whenever trades happen on the global over-the-counter market — often several times per second during busy hours. This page refreshes its quote every minute and the chart streams continuously, so you are never looking at a stale number during market hours.",
      },
      {
        q: "Why is my dealer's price higher than the live price?",
        a: "Dealers sell physical silver, not the abstract spot contract. Their ask price adds a premium covering minting, distribution and margin — typically a few percent on bars and more on coins. Spot is the wholesale benchmark; the premium is the retail markup.",
      },
      {
        q: "When is the silver market open?",
        a: "Silver spot trades from 6pm Sunday to 5pm Friday US Eastern, with a one-hour daily break from 5pm to 6pm for settlement. Outside those hours the quote you see is the last traded price, and it will jump when trading resumes if news broke over the weekend.",
      },
      {
        q: "What does XAG/USD mean?",
        a: "XAG is the ISO currency code for silver — X for a non-national currency, AG from argentum, Latin for silver. XAG/USD simply means the price of one troy ounce of silver quoted in US dollars.",
      },
      {
        q: "Why did the live price suddenly freeze?",
        a: "A frozen quote usually means the market is in its daily settlement break (5–6pm ET) or it is the weekend. During fast news events some data feeds also pause briefly. If trading is open and the price still looks stuck, refresh the page.",
      },
      {
        q: "Does the live price include the dealer premium?",
        a: "No. The live price shown here is the pure spot rate. To estimate what you will actually pay, add your dealer's premium — check their product page for the per-ounce over-spot figure and add it to the live quote.",
      },
    ],
    related: [
      { href: "/spot-silver-price", label: "Spot silver price" },
      { href: "/silver-price-chart", label: "Silver price chart" },
      { href: "/comex-silver-price", label: "COMEX silver price" },
      { href: "/silver-price-today", label: "Silver price today" },
    ],
    crumbs: silverCrumbs,
    showWorldGold: true,
    showSilverCountries: true,
  },
  {
    slug: "spot-silver-price",
    title: "Spot Silver Price | Live XAG/USD per Ounce | GoldRateToday",
    description:
      "The silver spot price, explained: live XAG/USD per troy ounce, how spot differs from futures and retail prices, plus per-gram, kilo and tola conversions.",
    keywords: ["spot silver price", "silver spot", "xag usd spot", "silver spot price today", "what is silver spot"],
    h1: "Spot Silver Price",
    asset: "silver",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: silverConversions,
    intro: [
      "The spot silver price is the current market price for immediate delivery of one troy ounce of .999 fine silver — the benchmark every dealer, mint and industrial buyer prices against. It comes from the global over-the-counter market where banks and trading firms buy and sell large silver positions around the clock.",
      "Spot is not the same as what you will pay at a coin shop: it excludes minting premiums, shipping and dealer margin, and it can differ slightly from COMEX futures prices. The table below converts the live spot into the units buyers actually use — grams, kilograms, tolas and pounds.",
    ],
    faqs: [
      {
        q: "What exactly is the silver spot price?",
        a: "It is the price for silver delivered on the spot — typically within two business days — as opposed to a futures contract for delivery months away. Quoted as XAG/USD per troy ounce, it reflects real wholesale transactions happening right now.",
      },
      {
        q: "How is the spot price different from the COMEX futures price?",
        a: "Spot is for immediate delivery; futures are for a set future month. The two usually differ by the cost of carry — storage and financing — a gap called contango when futures trade above spot. They converge as the contract nears expiry.",
      },
      {
        q: "Who decides the silver spot price?",
        a: "No single entity. It is the consensus of thousands of buy and sell orders across the global OTC market, with the LBMA's twice-daily silver price auction in London providing a widely referenced benchmark snapshot.",
      },
      {
        q: "Why is retail silver always above spot?",
        a: "Turning a 1,000-ounce wholesale bar into coins or small bars costs money — minting, assaying, packaging, shipping, insurance and the dealer's margin. That markup over spot is called the premium, and it varies by product and market conditions.",
      },
      {
        q: "What is the LBMA silver price?",
        a: "The LBMA silver price is set in an electronic auction in London at noon each business day, with major banks submitting orders until buy and sell interest balance. Many miners, refiners and industrial contracts reference it for settlement.",
      },
    ],
    related: [
      { href: "/live-silver-price", label: "Live silver price" },
      { href: "/comex-silver-price", label: "COMEX silver price" },
      { href: "/silver-price-per-ounce", label: "Silver price per ounce" },
      { href: "/silver-price-today", label: "Silver price today" },
    ],
    crumbs: silverCrumbs,
    showWorldGold: true,
    showSilverCountries: true,
  },
  {
    slug: "silver-price-per-ounce",
    title: "Silver Price per Ounce | Live XAG/USD Rate | GoldRateToday",
    description:
      "Live silver price per troy ounce (XAG/USD) with an interactive chart, 24h change, and conversions to gram, kilo, tola and pound — updated every minute.",
    keywords: ["silver price per ounce", "silver per ounce", "ounce of silver price", "xag usd per ounce", "1 oz silver price"],
    h1: "Silver Price per Ounce",
    asset: "silver",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: silverConversions,
    intro: [
      "Silver is priced by the troy ounce everywhere in the world — from the LBMA benchmark in London to the COMEX futures market in New York to your local coin dealer. One troy ounce equals 31.1035 grams, and the XAG/USD quote on this page is the price for that exact unit.",
      "The per-ounce price is the number everything else derives from: divide by 31.1035 for the gram price, multiply for kilos, or add the day's premium to estimate retail cost. The live quote above updates every minute during market hours, with the day's change shown beside it.",
    ],
    faqs: [
      {
        q: "Why is silver priced per troy ounce instead of a regular ounce?",
        a: "Precious metals have used the troy system since the Middle Ages. A troy ounce is 31.1035 grams — about 10% heavier than the 28.35-gram avoirdupois ounce used for groceries. All global silver benchmarks quote per troy ounce, so the convention keeps everyone on the same unit.",
      },
      {
        q: "How much silver is in a 1-ounce coin?",
        a: "A 1-ounce bullion coin like the American Silver Eagle contains exactly one troy ounce of pure silver. Some coins, like 90% US junk silver, contain less — about 0.715 troy ounces per dollar of face value after wear — so their price tracks spot differently.",
      },
      {
        q: "What will I actually pay for one ounce of silver?",
        a: "Expect spot plus a premium. As a rough guide, 1-ounce government coins often carry premiums of $3–$6 over spot, while 1-ounce private rounds are cheaper. Check the live per-ounce price above, then add the dealer's stated premium.",
      },
      {
        q: "Is the per-ounce price the same worldwide?",
        a: "The US-dollar spot is the same globally, but your local price in another currency moves with the exchange rate. Local taxes, import duties and dealer competition then add regional differences on top.",
      },
      {
        q: "How do I read the XAG/USD quote?",
        a: "A quote of XAG/USD 34.50 means one troy ounce of silver costs 34.50 US dollars. If the number rises, silver is strengthening against the dollar; if it falls, it is weakening.",
      },
    ],
    related: [
      { href: "/silver-price-per-gram", label: "Silver price per gram" },
      { href: "/silver-price-per-kilo", label: "Silver price per kilo" },
      { href: "/silver-price-per-pound", label: "Silver price per pound" },
      { href: "/silver-price-today", label: "Silver price today" },
    ],
    crumbs: silverCrumbs,
    showWorldGold: true,
    showSilverCountries: true,
  },
  {
    slug: "silver-price-per-gram",
    title: "Silver Price per Gram | Live XAG/USD Rate | GoldRateToday",
    description:
      "Live silver price per gram in USD, converted in real time from the XAG/USD spot — plus per-ounce, per-kilo and per-tola equivalents, updated every minute.",
    keywords: ["silver price per gram", "silver per gram", "gram of silver price", "silver gram rate", "1 gram silver price"],
    h1: "Silver Price per Gram",
    asset: "silver",
    unitLabel: "per gram",
    unitDivisor: 31.1035,
    conversions: silverConversions,
    intro: [
      "While the wholesale market quotes silver per troy ounce, jewelry buyers, small investors and scrap dealers think in grams. The per-gram price is simply the spot price divided by 31.1035 — the number of grams in a troy ounce — and this page computes it live from the current XAG/USD quote.",
      "Gram pricing matters most when premiums are quoted per piece: a 10-gram bar's fair value is ten times the per-gram spot plus the bar premium. Use the live figure above as your baseline before any dealer markup, and remember that sterling silver (.925) contains only 92.5% of the fine-silver value.",
    ],
    faqs: [
      {
        q: "How do I calculate the silver price per gram?",
        a: "Divide the live spot price per troy ounce by 31.1035. For example, at $34 per ounce the gram price is about $1.09. This page does the math automatically and refreshes it every minute.",
      },
      {
        q: "Why do jewelers quote silver per gram?",
        a: "Jewelry is sold by finished weight in grams, so per-gram pricing lets buyers compare pieces directly. A jeweler's per-gram ask includes the metal value plus making charges — typically separated on the invoice — which is why it exceeds the raw per-gram spot.",
      },
      {
        q: "What is the scrap silver price per gram?",
        a: "Scrap buyers pay a percentage of the per-gram melt value — often 70–90% depending on purity and the buyer. For sterling (.925) scrap, multiply the fine-silver gram price by 0.925 first, then apply the buyer's payout rate.",
      },
      {
        q: "Is per-gram pricing the same for .999 and sterling silver?",
        a: "No. The live per-gram price assumes .999 fine silver. Sterling is 92.5% silver, so its intrinsic gram value is the fine price times 0.925. Coin silver (90%) and 800-grade silver scale down the same way.",
      },
      {
        q: "How many grams are in a tola of silver?",
        a: "One tola equals 11.6638 grams. At the live gram price, a tola's melt value is simply 11.6638 times the per-gram figure — the conversion table above shows it ready-made.",
      },
    ],
    related: [
      { href: "/silver-price-per-ounce", label: "Silver price per ounce" },
      { href: "/silver-price-per-tola", label: "Silver price per tola" },
      { href: "/silver-price-per-kilo", label: "Silver price per kilo" },
      { href: "/silver-rate-today", label: "Silver rate today" },
    ],
    crumbs: silverCrumbs,
    showWorldGold: true,
    showSilverCountries: true,
  },
  {
    slug: "silver-price-per-kilo",
    title: "Silver Price per Kilo | Live XAG/USD Rate | GoldRateToday",
    description:
      "Live silver price per kilogram — 1,000 g from the XAG/USD spot — with per-gram, per-ounce and per-tola equivalents, refreshed every minute for buyers.",
    keywords: ["silver price per kilo", "silver per kg", "1 kg silver price", "kilo of silver price", "silver kilogram price"],
    h1: "Silver Price per Kilo",
    asset: "silver",
    unitLabel: "per kilogram",
    unitDivisor: 0.0311035,
    conversions: silverConversions,
    intro: [
      "A kilogram of silver is 32.1507 troy ounces, and kilo bars are the standard wholesale unit for investors buying in size. The per-kilo price shown here is the live spot multiplied up — the baseline that dealers use before adding the bar premium, which on kilo bars is among the lowest per ounce in the retail market.",
      "Kilo bars strike a balance: cheaper per ounce than coins or small bars, yet still liquid and easy to store or sell. If you are comparing a kilo bar offer against spot, the number above is your reference — any quote within a few percent over it is in normal territory.",
    ],
    faqs: [
      {
        q: "How is the silver price per kilo calculated?",
        a: "Multiply the spot price per troy ounce by 32.1507 (the number of troy ounces in a kilogram). At $34 spot, a kilo is worth about $1,093. This page updates the figure every minute from the live quote.",
      },
      {
        q: "Are kilo silver bars a good investment?",
        a: "They are among the most cost-efficient ways to own physical silver — premiums are low and they are widely recognized in global markets. The trade-off is divisibility: selling half a kilo means selling the whole bar, unlike smaller units.",
      },
      {
        q: "Kilo bar vs 100-ounce bar — which is better?",
        a: "Both are wholesale formats with low premiums. Kilo bars (32.15 oz) are more widely recognized internationally and easier to resell in Asia and Europe; 100-ounce bars dominate the US market. The price per ounce of metal is nearly identical.",
      },
      {
        q: "What premium should I expect on a kilo bar?",
        a: "Typically $1–$2.50 per ounce over spot from major mints — far less than coins. During supply squeezes premiums can spike, so compare the total ask against the live per-kilo figure above before buying.",
      },
      {
        q: "How should I store a kilo of silver?",
        a: "Keep bars in their sealed assay packaging in a dry, secure place — a home safe or bank box. Silver tarnishes in humid air, which does not affect melt value but can reduce resale appeal, so airtight storage helps.",
      },
    ],
    related: [
      { href: "/silver-price-per-ounce", label: "Silver price per ounce" },
      { href: "/silver-price-per-gram", label: "Silver price per gram" },
      { href: "/silver-price-calculator", label: "Silver price calculator" },
      { href: "/silver-price-today", label: "Silver price today" },
    ],
    crumbs: silverCrumbs,
    showWorldGold: true,
    showSilverCountries: true,
  },
  {
    slug: "silver-price-per-tola",
    title: "Silver Price per Tola | Live XAG Rate Today | GoldRateToday",
    description:
      "Live silver price per tola (11.66 g) — the unit used across India and Pakistan — converted live from the XAG/USD spot with gram and ounce equivalents.",
    keywords: ["silver price per tola", "silver per tola", "chandi rate today", "1 tola silver price", "silver tola rate"],
    h1: "Silver Price per Tola",
    asset: "silver",
    unitLabel: "per tola",
    unitDivisor: 2.6667,
    conversions: silverConversions,
    intro: [
      "Across India and Pakistan, silver is not bought by the ounce — it is bought by the tola. One tola equals 11.6638 grams, a unit dating back to the British colonial era that remains the standard for jewelry, bridal sets and festive gifting across South Asia.",
      "The per-tola figure on this page converts the live international XAG/USD spot into tola terms, so you can sanity-check a jeweler's quote before you buy. Remember that local retail adds making charges and the shop's margin — and in Pakistan and India, prices also move with the dollar exchange rate.",
    ],
    faqs: [
      {
        q: "What is a tola of silver?",
        a: "A tola is a traditional South Asian weight unit equal to 11.6638 grams — roughly 0.375 troy ounces. It originated under British rule in India and is still the standard unit for quoting gold and silver in jewelry markets.",
      },
      {
        q: "How do I convert the tola price to grams?",
        a: "Divide the per-tola price by 11.6638. The conversion table above shows both side by side, computed live from the current spot, so you can compare a jeweler's per-tola quote against the international rate instantly.",
      },
      {
        q: "Why do Pakistan and India use tola instead of grams?",
        a: "Tradition and market habit. Generations of jewelers, wedding planners and families have priced bridal silver in tolas, and the entire wholesale chain — from Karachi's Sarafa market to Mumbai's Zaveri Bazaar — still quotes that way.",
      },
      {
        q: "What is 'chandi rate'?",
        a: "Chandi is the Urdu/Hindi word for silver, so 'chandi rate today' simply means today's silver price. When someone asks for the chandi rate per tola, they are asking for exactly the figure at the top of this page.",
      },
      {
        q: "Why does the local tola price differ from this page?",
        a: "This page converts the dollar spot directly. Your jeweler's price also reflects the USD/PKR or USD/INR exchange rate, import duties, sales tax and their own premium — so a gap of a few percent is normal.",
      },
    ],
    related: [
      { href: "/silver-rate-today", label: "Silver rate today" },
      { href: "/silver-price-per-gram", label: "Silver price per gram" },
      { href: "/silver-price-per-kilo", label: "Silver price per kilo" },
      { href: "/silver-price-today", label: "Silver price today" },
    ],
    crumbs: silverCrumbs,
    showWorldGold: true,
    showSilverCountries: true,
  },
  {
    slug: "silver-rate-today",
    title: "Silver Rate Today | Live Price per Gram & Tola | GoldRateToday",
    description:
      "Today's silver rate per gram, tola, ounce and kilo — converted live from the XAG/USD spot. The figures Indian and Pakistani buyers check before buying.",
    keywords: ["silver rate today", "today silver rate", "chandi ka rate", "silver rate per gram", "aaj chandi ka bhav"],
    h1: "Silver Rate Today",
    asset: "silver",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: silverConversions,
    intro: [
      "In India and Pakistan, nobody asks for the 'silver price' — they ask for the silver rate. Same metal, same market, different vocabulary. This page gives today's silver rate the way local buyers actually use it: per gram and per tola first, converted live from the international XAG/USD spot.",
      "The rate moves through the day with the dollar spot and currency markets, so a morning quote can look different by evening. Jewelers add making charges on top — typically per gram — so compare their final number against the live base rate here before agreeing to a deal.",
    ],
    faqs: [
      {
        q: "Is 'silver rate' different from 'silver price'?",
        a: "No — they describe the same thing. 'Rate' is simply the word used in Indian and Pakistani markets, while 'price' dominates in Western markets. Both track the XAG/USD spot.",
      },
      {
        q: "What is today's 10-gram silver rate?",
        a: "Multiply the live per-gram figure above by 10. Jewelers in India commonly quote per 10 grams, so this is the number to compare against a shop's board — before making charges.",
      },
      {
        q: "Why does the rate change during the day?",
        a: "The international spot trades almost 24 hours, and the rupee moves against the dollar through the day. Local associations update their published rates once or twice daily, but the true market rate — shown live here — never stands still while markets are open.",
      },
      {
        q: "Does purity change the rate?",
        a: "Yes. Published rates assume fine silver (.999). Jewelry is often .925 sterling or lower, so its intrinsic rate is proportionally less. Always ask what purity a quoted rate refers to.",
      },
      {
        q: "When is the best time to buy silver?",
        a: "No one can time the market reliably, but buyers traditionally watch for dips after sharp rallies and buy ahead of wedding and festival seasons when demand — and premiums — rise. Comparing the live rate against recent history helps you judge the moment.",
      },
    ],
    related: [
      { href: "/silver-price-per-tola", label: "Silver price per tola" },
      { href: "/silver-price-per-gram", label: "Silver price per gram" },
      { href: "/live-silver-price", label: "Live silver price" },
      { href: "/silver-price-today", label: "Silver price today" },
    ],
    crumbs: silverCrumbs,
    showWorldGold: true,
    showSilverCountries: true,
  },
  {
    slug: "silver-price-chart",
    title: "Silver Price Chart | Live XAG/USD Interactive Chart | GoldRateToday",
    description:
      "Interactive silver price chart with live XAG/USD candlesticks, drawing tools and full timeframes — from minutes to years — plus 24h change and key stats.",
    keywords: ["silver price chart", "xag usd chart", "silver chart live", "silver price graph", "silver candlestick chart"],
    h1: "Silver Price Chart",
    asset: "silver",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: silverConversions,
    intro: [
      "Charts turn silver's famous volatility into something you can read. The interactive XAG/USD chart below plots live candlesticks — each candle showing the open, high, low and close for its period — with drawing tools for trendlines and a full timeframe menu from one minute to one month.",
      "Silver's swings are wider than gold's, which makes chart levels matter: old highs become resistance, old lows become support. Use the chart to spot the trend before you buy, and switch to longer timeframes to see how today's price compares with the 2011 and 2020 peaks.",
    ],
    faqs: [
      {
        q: "How do I read a silver candlestick chart?",
        a: "Each candle covers one period. The thick body shows where the price opened and closed — green if it closed higher, red if lower — and the thin wicks show the period's high and low. Long wicks mean the price swung widely before settling.",
      },
      {
        q: "Which timeframe is best for silver?",
        a: "It depends on your goal. Day traders use 5-minute to 1-hour candles; swing buyers watch daily candles for trend and momentum; long-term investors check weekly or monthly candles to see where today's price sits in the multi-year range.",
      },
      {
        q: "What are support and resistance on the silver chart?",
        a: "Support is a price level where buying has repeatedly stepped in (a floor); resistance is where selling has capped rallies (a ceiling). Silver respects these levels well because its industrial buyers and speculators both react to round numbers.",
      },
      {
        q: "Why are there gaps in the silver chart?",
        a: "Silver pauses trading for one hour daily and over weekends. If news breaks during the pause, the price jumps at the reopen — leaving a visible gap between the last candle and the next. Gaps are normal, not errors.",
      },
      {
        q: "Can I draw trendlines on this chart?",
        a: "Yes — the chart includes TradingView's full drawing toolkit: trendlines, horizontal levels, Fibonacci retracements and more. Your drawings stay in your browser while you analyze.",
      },
    ],
    related: [
      { href: "/live-silver-price", label: "Live silver price" },
      { href: "/spot-silver-price", label: "Spot silver price" },
      { href: "/silver-price-history", label: "Silver price history" },
      { href: "/comex-silver-price", label: "COMEX silver price" },
    ],
    crumbs: silverCrumbs,
    showWorldGold: true,
    showSilverCountries: true,
  },
  {
    slug: "silver-price-history",
    title: "Silver Price History | Historical XAG/USD Data & Trends | GoldRateToday",
    description:
      "Silver's full price history — from the 1980 Hunt-brothers spike to the 2011 and 2020 highs — with live spot context, charts and long-term trend analysis.",
    keywords: ["silver price history", "historical silver prices", "silver all time high", "silver price 1980", "silver price 2011"],
    h1: "Silver Price History",
    asset: "silver",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: silverConversions,
    intro: [
      "Silver's history is a series of spectacular booms and long, grinding consolidations. It spiked to $50 in January 1980 when the Hunt brothers cornered the market, collapsed for two decades, then climbed back to nearly $50 in April 2011 on post-crisis money printing — before falling 70% again.",
      "Understanding that history matters because silver repeats its patterns: sharp speculative manias driven by small-market dynamics, followed by years of industrial demand quietly rebuilding the base. The live price above shows where we stand now; the story below shows how we got here.",
    ],
    faqs: [
      {
        q: "What is silver's all-time high?",
        a: "Silver touched roughly $50 per troy ounce twice: intraday in January 1980 during the Hunt brothers' squeeze, and again in April 2011. On a closing basis the 1980 peak stands slightly higher. Adjusted for inflation, the 1980 high would be well over $150 today.",
      },
      {
        q: "What happened to silver in 1980?",
        a: "The Hunt brothers accumulated over 100 million ounces trying to corner the market, driving silver from $6 to $50 in a year. When exchanges raised margin requirements, the bubble burst — silver fell 80% in months, and the Hunts went bankrupt.",
      },
      {
        q: "Why did silver peak in 2011?",
        a: "Post-2008 quantitative easing, a weak dollar and fears of inflation pushed investors into hard assets. Silver, with its tiny market, amplified gold's rally — rising nearly 10x from its 2008 low before the CME hiked margins and the mania ended.",
      },
      {
        q: "How did silver perform in 2020?",
        a: "Silver crashed to $12 in the March 2020 panic, then tripled to nearly $30 by August as stimulus flooded markets and retail investors piled in. It showed both faces of silver in a single year: panic asset, then momentum rocket.",
      },
      {
        q: "What is silver's long-term average price?",
        a: "Over the last 50 years silver has averaged roughly $12–$15 in nominal terms, spending most of the 1990s and early 2000s under $6. The long-run trend slopes upward with inflation and industrial demand, but the ride has never been smooth.",
      },
    ],
    related: [
      { href: "/silver-price-chart", label: "Silver price chart" },
      { href: "/spot-silver-price", label: "Spot silver price" },
      { href: "/comex-silver-price", label: "COMEX silver price" },
      { href: "/silver-price-today", label: "Silver price today" },
    ],
    crumbs: silverCrumbs,
    showWorldGold: true,
    showSilverCountries: true,
  },
  {
    slug: "silver-price-calculator",
    title: "Silver Price Calculator | Live Silver Value Converter | GoldRateToday",
    description:
      "Calculate any silver weight's live value — ounces, grams, kilos, tolas or pounds — from the real-time XAG/USD spot. Free converter, updated every minute.",
    keywords: ["silver price calculator", "silver value calculator", "silver converter", "calculate silver worth", "silver melt value calculator"],
    h1: "Silver Price Calculator",
    asset: "silver",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: silverConversionsLb,
    intro: [
      "How much is your silver actually worth right now? This calculator takes any weight — ounces, grams, kilograms, tolas or pounds — and values it at the live XAG/USD spot, refreshing every minute. It is the fastest way to check a dealer's offer, price scrap, or value an inherited coin collection.",
      "The figures assume .999 fine silver. For sterling (.925), 90% coin silver or other purities, multiply the result by the purity — 0.925, 0.90 and so on. And remember: spot is the wholesale baseline. A dealer buying from you will offer below it; a dealer selling to you will ask above it.",
    ],
    faqs: [
      {
        q: "How do I calculate my silver's value?",
        a: "Convert your weight to troy ounces, multiply by the live spot price, then multiply by purity. Example: 100 grams of .999 silver at $34 spot = (100 / 31.1035) x 34 = about $109.30.",
      },
      {
        q: "What is melt value?",
        a: "Melt value is what the raw metal in an item is worth at spot — ignoring collectible, numismatic or craftsmanship value. A rare coin can be worth far more than melt; a plain bar is worth melt plus a small premium.",
      },
      {
        q: "How do I value sterling silver items?",
        a: "Multiply the fine-silver value by 0.925. So 200 grams of sterling at a $1.09/gram fine price = 200 x 1.09 x 0.925 = about $201.65 in metal value.",
      },
      {
        q: "Why does the calculator differ from a dealer's quote?",
        a: "Dealers add premiums when selling (minting, overhead, profit) and apply discounts when buying (their margin, refining costs). The calculator shows the neutral wholesale value both sides negotiate around.",
      },
      {
        q: "Can I calculate the value of silver coins?",
        a: "Yes — if you know the coin's pure silver content. A 1 oz bullion coin is 1.0 troy ounces; a pre-1965 US 90% half dollar holds about 0.3617 oz. Multiply the pure content by the live spot.",
      },
    ],
    related: [
      { href: "/silver-price-per-ounce", label: "Silver price per ounce" },
      { href: "/silver-price-per-gram", label: "Silver price per gram" },
      { href: "/silver-price-per-kilo", label: "Silver price per kilo" },
      { href: "/silver-price-per-pound", label: "Silver price per pound" },
    ],
    crumbs: silverCrumbs,
    showWorldGold: true,
    showSilverCountries: true,
  },
  {
    slug: "silver-price-per-pound",
    title: "Silver Price per Pound | Live XAG/USD Rate | GoldRateToday",
    description:
      "Live silver price per avoirdupois pound (453.6 g), converted from the XAG/USD spot, with ounce, gram and kilo equivalents — updated every minute for US buyers.",
    keywords: ["silver price per pound", "silver per lb", "pound of silver price", "silver lb price", "1 lb silver worth"],
    h1: "Silver Price per Pound",
    asset: "silver",
    unitLabel: "per pound",
    unitDivisor: 0.0685714,
    conversions: silverConversionsLb,
    intro: [
      "In the United States, scrap dealers, pawn shops and industrial buyers often talk in pounds — the avoirdupois pound of 453.592 grams, equal to 14.5833 troy ounces. The per-pound price on this page converts the live XAG/USD spot into that familiar unit.",
      "Watch the distinction: precious metals are weighed in troy ounces, but scrap scales read avoirdupois pounds. Mixing them up overstates value by about 10%. The figure above does the conversion correctly — 14.5833 troy ounces times the live spot — so your math starts right.",
    ],
    faqs: [
      {
        q: "How many troy ounces are in a pound of silver?",
        a: "An avoirdupois pound (453.592 g) contains 14.5833 troy ounces. So at $34 spot, a pound of pure silver is worth about $495.83. A troy pound, rarely used, would be 12 troy ounces — do not confuse them.",
      },
      {
        q: "Why do US scrap dealers use pounds?",
        a: "American scales and commerce run on avoirdupois pounds, and scrap lots — flatware, industrial scrap, mixed lots — are weighed in bulk. Dealers convert to troy ounces internally, but they quote customers in pounds.",
      },
      {
        q: "How do I calculate scrap value per pound?",
        a: "Multiply the per-pound fine price above by the item's purity, then by the dealer's payout percentage. Example: 5 lbs of sterling flatware at $495/lb fine = 5 x 495 x 0.925 x 0.80 payout = about $1,831.",
      },
      {
        q: "Troy pound vs regular pound — what's the difference?",
        a: "A troy pound is 12 troy ounces (373.24 g); an avoirdupois (regular) pound is 14.5833 troy ounces (453.59 g). Scrap and commerce always mean avoirdupois. If a quote seems 20% off, someone mixed up the two.",
      },
      {
        q: "Is per-pound pricing used outside the US?",
        a: "Rarely. Most of the world prices silver per gram, kilo or tola. Per-pound quotes are an American scrap-market convention — international dealers will convert to troy ounces or kilos.",
      },
    ],
    related: [
      { href: "/silver-price-per-ounce", label: "Silver price per ounce" },
      { href: "/silver-price-per-kilo", label: "Silver price per kilo" },
      { href: "/silver-price-calculator", label: "Silver price calculator" },
      { href: "/silver-price-today", label: "Silver price today" },
    ],
    crumbs: silverCrumbs,
    showWorldGold: true,
    showSilverCountries: true,
  },
  {
    slug: "comex-silver-price",
    title: "COMEX Silver Price | Live Silver Futures SI | GoldRateToday",
    description:
      "COMEX silver futures (SI) explained — how the front-month contract sets the global benchmark, contango vs backwardation, and live spot context every minute.",
    keywords: ["comex silver price", "silver futures price", "si futures", "comex silver live", "silver futures chart"],
    h1: "COMEX Silver Price",
    asset: "silver",
    unitLabel: "per troy ounce",
    unitDivisor: 1,
    conversions: silverConversions,
    intro: [
      "The COMEX division of the CME Group in New York hosts the world's benchmark silver futures contract — ticker SI — where each contract represents 5,000 troy ounces. When headlines say 'silver rose,' they are usually describing the front-month SI contract, and its price is what drags the global spot market along.",
      "Futures and spot rarely match exactly: the gap reflects storage, financing and expectations, and it flips between contango (futures above spot) and backwardation (below). The live spot context above anchors the futures discussion — and the chart shows how the two dance together through the trading day.",
    ],
    faqs: [
      {
        q: "What is the COMEX silver futures contract?",
        a: "It is a standardized agreement to buy or sell 5,000 troy ounces of .999 fine silver for delivery in a specified month, traded on CME's COMEX in New York under ticker SI. It is the most liquid silver derivative in the world.",
      },
      {
        q: "How do COMEX futures affect the spot price?",
        a: "Arbitrage keeps them linked: if futures trade too far above spot, traders buy spot and sell futures until the gap closes. Because COMEX volume dwarfs physical trade, futures order flow effectively sets the price the whole world references.",
      },
      {
        q: "What is contango in silver?",
        a: "Contango is when futures prices sit above spot — the normal state, reflecting storage and financing costs. Backwardation (futures below spot) signals tight near-term supply and often precedes sharp rallies.",
      },
      {
        q: "When does COMEX silver trade?",
        a: "Nearly 24 hours: Sunday 6pm to Friday 5pm US Eastern, with a daily one-hour halt from 5pm to 6pm. The most active window is the New York morning when US economic data hits.",
      },
      {
        q: "Can I take delivery of COMEX silver?",
        a: "In theory, yes — contracts allow delivery of 5,000-ounce bars into COMEX vaults. In practice, over 99% of contracts are closed or rolled before expiry; delivery is for refiners, mints and large funds, not retail traders.",
      },
    ],
    related: [
      { href: "/spot-silver-price", label: "Spot silver price" },
      { href: "/live-silver-price", label: "Live silver price" },
      { href: "/silver-price-chart", label: "Silver price chart" },
      { href: "/silver-price-history", label: "Silver price history" },
    ],
    crumbs: silverCrumbs,
    showWorldGold: true,
    showSilverCountries: true,
  },
];
