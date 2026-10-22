'use cache';
import { cacheLife } from "next/cache";
import PricePage from "@/components/PricePage";
import { GOLD_PAGES } from "@/lib/registry-gold";
import { pricePageMetadata } from "@/lib/page-meta";

const page = GOLD_PAGES.find((p) => p.slug === "24k-gold-price")!;

export async function generateMetadata() {
  return pricePageMetadata(page);
}

export default async function K24GoldPricePage() {
  cacheLife("minutes");
  return <PricePage config={page} />;
}
