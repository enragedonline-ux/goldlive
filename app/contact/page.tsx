import StaticPage from "@/components/StaticPage";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us | GoldRateToday",
  description: "Questions, corrections or feedback about GoldRateToday's live price pages.",
  alternates: { canonical: "https://goldratetoday.online/contact/" },
};

export default function Page() {
  return (
    <StaticPage
      title="Contact Us"
      description="Questions, corrections or feedback about GoldRateToday's live price pages."
      crumbs={[{ href: "/", label: "Home" }, { href: "/contact/", label: "Contact Us" }]}
    >
      <div className="pcontent">
        <p>
          GoldRateToday is a small, independent price-information site. We read every message and fix
          data errors fast, but we are not a bullion dealer and we do not sell gold, silver or crypto.
        </p>
        <h2>What to contact us about</h2>
        <ul>
          <li><strong>Price correction:</strong> a price, conversion or chart that looks wrong or out of date. Tell us the page and the value you saw.</li>
          <li><strong>Broken page or chart:</strong> a link, chart or calculator that is not loading.</li>
          <li><strong>Feedback or suggestion:</strong> a page, currency or feature you would like us to add.</li>
          <li><strong>Partnership enquiry:</strong> advertising or content collaboration.</li>
        </ul>
        <h2>What we cannot help with</h2>
        <p>
          Please do not send investment advice requests. We publish indicative spot prices for
          information only, we do not know your circumstances, and nothing on this site is financial
          advice. We also cannot buy, sell or store metals or crypto on your behalf.
        </p>
        <h2>Send us a message</h2>
        <p>
          Fill in the form below. Your email address is required so we can reply to you. Sending the
          form opens your own email app with the message addressed to us, so press send there to
          deliver it. Or email us directly at <strong>enraged.online@gmail.com</strong>.
        </p>
        <ContactForm />
      </div>
    </StaticPage>
  );
}
