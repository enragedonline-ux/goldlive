import StaticPage from "@/components/StaticPage";

export const metadata = {
  title: "About GoldRateToday | Live Precious Metal & Crypto Prices",
  description: "GoldRateToday brings live gold, silver, bitcoin and ethereum prices together in one clean, fast page — no clutter, no paywall.",
  alternates: { canonical: "https://goldratetoday.online/about/" },
};

export default function Page() {
  return (
    <StaticPage
      title="About GoldRateToday"
      description="GoldRateToday brings live gold, silver, bitcoin and ethereum prices together in one clean, fast page — no clutter, no paywall."
      crumbs={[{ href: "/", label: "Home" }, { href: "/about/", label: "About GoldRateToday" }]}
    >
      <div dangerouslySetInnerHTML={{ __html: `<p>GoldRateToday started with a simple frustration: checking the gold price shouldn't require wading through ads, popups and stale numbers. We built a site that shows the live spot price — updated every minute during market hours — with a real interactive chart, honest conversions across grams, tolas, ounces and kilos, and short explainers that actually answer your question.</p><p>Our data comes from free public market feeds: gold-api.com for precious-metal spot prices and CoinGecko for bitcoin and ethereum. Country pages convert the dollar spot price using daily ECB reference exchange rates. Prices are indicative benchmarks — your local dealer will quote a small premium above spot.</p><p>We're an independent project, not a bullion dealer, and we don't sell anything. If you spot an error, tell us via the contact page.</p>` }} />
    </StaticPage>
  );
}
