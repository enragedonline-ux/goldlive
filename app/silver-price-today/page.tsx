'use cache';
import { cacheLife } from "next/cache";
import PricePage from "@/components/PricePage";
import { SILVER_PAGES } from "@/lib/registry-silver";
import { pricePageMetadata } from "@/lib/page-meta";

const base = SILVER_PAGES.find((p) => p.slug === "silver-price-today")!;
const page = { ...base, showWorldSilver: true };

export async function generateMetadata() {
  return pricePageMetadata(base);
}

export default async function SilverPriceTodayPage() {
  cacheLife("minutes");
  return <PricePage config={page} />;
}
