'use cache';
import { cacheLife } from "next/cache";
import PricePage from "@/components/PricePage";
import { CRYPTO_PAGES } from "@/lib/registry-crypto";
import { pricePageMetadata } from "@/lib/page-meta";

const page = CRYPTO_PAGES.find((p) => p.slug === "ethereum-price-chart")!;

export async function generateMetadata() {
  return pricePageMetadata(page);
}

export default async function EthereumPriceChartPage() {
  cacheLife("minutes");
  return <PricePage config={page} />;
}
