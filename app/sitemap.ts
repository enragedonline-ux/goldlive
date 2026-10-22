import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const PRICE_PAGES = [
  "gold-price-today",
  "live-gold-price",
  "gold-price-per-gram",
  "gold-price-per-tola",
  "silver-price-today",
  "bitcoin-price",
  "ethereum-price",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 1,
    },
    ...PRICE_PAGES.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: "hourly" as const,
      priority: 0.9,
    })),
  ];
}
