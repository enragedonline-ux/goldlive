'use cache';
import { cacheLife } from "next/cache";
import CountryPricePage from "@/components/CountryPricePage";
import { getSilverCountry } from "@/lib/countries";
import { silverCountryContent } from "@/lib/country-content";
import { getPrices } from "@/lib/prices";
import { usdTo } from "@/lib/fx";

const SITE_URL = "https://goldlive-mocha.vercel.app";
const SLUG = "uae";

export async function generateMetadata() {
  const c = getSilverCountry(SLUG)!;
  const [{ assets }, rate] = await Promise.all([getPrices(), usdTo(c.currency)]);
  const usd = assets.find((a) => a.id === "silver")?.price ?? 0;
  const content = silverCountryContent(c, rate, usd);
  const url = `${SITE_URL}/silver-price-in-${SLUG}/`;
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: url },
    openGraph: { title: content.title, description: content.description, url, type: "website" },
    twitter: { card: "summary", title: content.title, description: content.description },
  };
}

export default async function SilverInUaePage() {
  cacheLife("minutes");
  const c = getSilverCountry(SLUG)!;
  return <CountryPricePage country={c} asset="silver" slug={`silver-price-in-${SLUG}`} />;
}
