import StaticPage from "@/components/StaticPage";

export const metadata = {
  title: "Contact GoldLive",
  description: "Questions, corrections or feedback about GoldLive's live price pages.",
  alternates: { canonical: "https://goldlive-mocha.vercel.app/contact/" },
};

export default function Page() {
  return (
    <StaticPage
      title="Contact Us"
      description="Questions, corrections or feedback about GoldLive's live price pages."
      crumbs={[{ href: "/", label: "Home" }, { href: "/contact/", label: "Contact Us" }]}
    >
      <div dangerouslySetInnerHTML={{ __html: `<p>For corrections, feedback or partnership enquiries, email us at <strong>hello@goldlive.example</strong>. We read everything and fix data errors fast.</p><p>Please don't send investment advice requests — we're a price-information site, not financial advisors.</p>` }} />
    </StaticPage>
  );
}
