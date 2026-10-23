import StaticPage from "@/components/StaticPage";

export const metadata = {
  title: "Privacy Policy | GoldLive",
  description: "How GoldLive handles your data: briefly, we collect almost nothing.",
  alternates: { canonical: "https://goldratetoday.online/privacy/" },
};

export default function Page() {
  return (
    <StaticPage
      title="Privacy Policy"
      description="How GoldLive handles your data: briefly, we collect almost nothing."
      crumbs={[{ href: "/", label: "Home" }, { href: "/privacy/", label: "Privacy Policy" }]}
    >
      <div dangerouslySetInnerHTML={{ __html: `<p>GoldLive does not require accounts and does not track you across the web. We don't set advertising cookies.</p><p>Our hosting provider (Vercel) logs standard technical data — IP addresses, pages requested, timestamps — for security and performance, retained per their policy. Embedded third-party content (TradingView charts, flag images from flagcdn.com) may set their own cookies subject to their policies.</p><p>Contact emails are used only to reply to you. We never sell personal data.</p>` }} />
    </StaticPage>
  );
}
