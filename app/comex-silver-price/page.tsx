'use cache';
import { cacheLife } from "next/cache";
import PricePage from "@/components/PricePage";
import { SILVER_PAGES } from "@/lib/registry-silver";
import { pricePageMetadata } from "@/lib/page-meta";

const page = SILVER_PAGES.find((p) => p.slug === "comex-silver-price")!;

export async function generateMetadata() {
  return pricePageMetadata(page);
}

export default async function ComexSilverPricePage() {
  cacheLife("minutes");
  return <PricePage config={page} />;
}
