import type { Metadata } from "next";
import { getPrices } from "./prices";
import { fmtPriceExact, fmtPct } from "./format";
import { pageMetadata } from "./seo";
import type { RegistryPage } from "./registry-gold";

/** Shared dynamic metadata for template price pages: number-led description with live price. */
export async function pricePageMetadata(page: RegistryPage): Promise<Metadata> {
  const { assets } = await getPrices();
  const live = assets.find((a) => a.id === page.asset);
  const names: Record<string, string> = {
    gold: "Gold",
    silver: "Silver",
    bitcoin: "Bitcoin",
    ethereum: "Ethereum",
  };
  const price = live?.price ? fmtPriceExact(live.price) : null;
  const chg = live?.change24h;
  const dir = chg !== null && chg !== undefined ? `${chg >= 0 ? "up" : "down"} ${fmtPct(chg)}` : "";
  return pageMetadata({
    title: page.title,
    description: price
      ? `${names[page.asset]} price today: ${price}${dir ? ` (${dir})` : ""}. ${page.description}`
      : page.description,
    path: `/${page.slug}`,
    keywords: page.keywords,
  });
}
