'use cache';
import { cacheLife } from "next/cache";
import PricePage from "@/components/PricePage";
import { CRYPTO_PAGES } from "@/lib/registry-crypto";
import { pricePageMetadata } from "@/lib/page-meta";

const page = CRYPTO_PAGES.find((p) => p.slug === "eth-to-usd-converter")!;

export async function generateMetadata() {
  return pricePageMetadata(page);
}

export default async function EthToUsdConverterPage() {
  cacheLife("minutes");
  return <PricePage config={page} />;
}
