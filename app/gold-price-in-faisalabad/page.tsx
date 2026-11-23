'use cache';
import { cacheLife } from "next/cache";
import CityPricePage from "@/components/CityPricePage";
import { getCity, cityContent } from "@/lib/pakistan-cities";
import { getPrices } from "@/lib/prices";
import { usdTo } from "@/lib/fx";

const SITE_URL = "https://goldratetoday.online";
const SLUG = "faisalabad";

export async function generateMetadata() {
  const city = getCity(SLUG)!;
  const [{ assets }, rate] = await Promise.all([getPrices(), usdTo("PKR")]);
  const usd = assets.find((a) => a.id === "gold")?.price ?? 0;
  const content = cityContent(city, rate, usd);
  const url = `${SITE_URL}/gold-price-in-${SLUG}`;
  return {
    title: content.title,
    description: content.description,
    alternates: { canonical: url },
    openGraph: { title: content.title, description: content.description, url, type: "website" },
    twitter: { card: "summary", title: content.title, description: content.description },
  };
}

export default async function GoldInFaisalabadPage() {
  cacheLife("minutes");
  const city = getCity(SLUG)!;
  return <CityPricePage city={city} slug={`gold-price-in-${SLUG}`} />;
}
