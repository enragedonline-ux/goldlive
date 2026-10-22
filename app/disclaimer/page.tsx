import StaticPage from "@/components/StaticPage";

export const metadata = {
  title: "Disclaimer | GoldLive",
  description: "GoldLive prices are indicative benchmarks, not financial advice.",
  alternates: { canonical: "https://goldlive-mocha.vercel.app/disclaimer/" },
};

export default function Page() {
  return (
    <StaticPage
      title="Disclaimer"
      description="GoldLive prices are indicative benchmarks, not financial advice."
      crumbs={[{ href: "/", label: "Home" }, { href: "/disclaimer/", label: "Disclaimer" }]}
    >
      <div dangerouslySetInnerHTML={{ __html: `<p>All prices on GoldLive are indicative and for information only. They are not offers to buy or sell, and they are not financial, investment or trading advice. Markets move fast; always confirm the executable price with your dealer or broker before transacting.</p><p>We source data from third-party feeds and exchange-rate providers. While we work to keep it accurate and current, we can't guarantee it's error-free or uninterrupted.</p><p>Past performance — including any historical charts shown — does not predict future results. Precious metals and cryptocurrencies are volatile; never invest money you can't afford to lose.</p>` }} />
    </StaticPage>
  );
}
