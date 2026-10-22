'use cache';
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import CountryPricePage from "@/components/CountryPricePage";
import { SILVER_COUNTRIES, getSilverCountry } from "@/lib/countries";
import { silverCountryContent } from "@/lib/country-content";
import { getPrices } from "@/lib/prices";
import { usdTo } from "@/lib/fx";

const SITE_URL = "https://goldlive-mocha.vercel.app";

export async function generateStaticParams() {
  return SILVER_COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const { country: slug } = await params;
  const c = getSilverCountry(slug);
  if (!c) return {};
  const [{ assets }, rate] = await Promise.all([getPrices(), usdTo(c.currency)]);
  const usd = assets.find((a) => a.id === "silver")?.price ?? 0;
  const content = silverCountryContent(c, rate, usd);
  const url = `${SITE_URL}/silver-price-in-${slug}/`;
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: url },
    openGraph: { title: content.title, description: content.description, url, type: "website" },
    twitter: { card: "summary", title: content.title, description: content.description },
  };
}

export default async function SilverCountryPage({ params }: { params: Promise<{ country: string }> }) {
  cacheLife("minutes");
  const { country: slug } = await params;
  const c = getSilverCountry(slug);
  if (!c) notFound();
  return <CountryPricePage country={c} asset="silver" slug={`silver-price-in-${slug}`} />;
}
