'use cache';
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import CountryPricePage from "@/components/CountryPricePage";
import { GOLD_COUNTRIES, getCountry } from "@/lib/countries";
import { goldCountryContent } from "@/lib/country-content";
import { getPrices } from "@/lib/prices";
import { usdTo } from "@/lib/fx";

const SITE_URL = "https://goldlive-mocha.vercel.app";

export async function generateStaticParams() {
  return GOLD_COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const { country: slug } = await params;
  const c = getCountry(slug);
  if (!c) return {};
  const [{ assets }, rate] = await Promise.all([getPrices(), usdTo(c.currency)]);
  const usd = assets.find((a) => a.id === "gold")?.price ?? 0;
  const content = goldCountryContent(c, rate, usd);
  const url = `${SITE_URL}/gold-price-in-${slug}/`;
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: url },
    openGraph: { title: content.title, description: content.description, url, type: "website" },
    twitter: { card: "summary", title: content.title, description: content.description },
  };
}

export default async function GoldCountryPage({ params }: { params: Promise<{ country: string }> }) {
  cacheLife("minutes");
  const { country: slug } = await params;
  const c = getCountry(slug);
  if (!c) notFound();
  return <CountryPricePage country={c} asset="gold" slug={`gold-price-in-${slug}`} />;
}
