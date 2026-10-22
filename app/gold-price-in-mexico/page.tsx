'use cache';
import { cacheLife } from "next/cache";
import CountryPricePage from "@/components/CountryPricePage";
import { getCountry } from "@/lib/countries";
import { goldCountryContent } from "@/lib/country-content";
import { getPrices } from "@/lib/prices";
import { usdTo } from "@/lib/fx";

const SITE_URL = "https://goldlive-mocha.vercel.app";
const SLUG = "mexico";

export async function generateMetadata() {
  const c = getCountry(SLUG)!;
  const [{ assets }, rate] = await Promise.all([getPrices(), usdTo(c.currency)]);
  const usd = assets.find((a) => a.id === "gold")?.price ?? 0;
  const content = goldCountryContent(c, rate, usd);
  const url = `${SITE_URL}/gold-price-in-${SLUG}/`;
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: url },
    openGraph: { title: content.title, description: content.description, url, type: "website" },
    twitter: { card: "summary", title: content.title, description: content.description },
  };
}

export default async function GoldInMexicoPage() {
  cacheLife("minutes");
  const c = getCountry(SLUG)!;
  return <CountryPricePage country={c} asset="gold" slug={`gold-price-in-${SLUG}`} />;
}
