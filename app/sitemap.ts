import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { GOLD_PAGES } from "@/lib/registry-gold";
import { SILVER_PAGES } from "@/lib/registry-silver";
import { CRYPTO_PAGES } from "@/lib/registry-crypto";
import { GOLD_COUNTRIES, SILVER_COUNTRIES } from "@/lib/countries";
import { BLOG_POSTS } from "@/lib/blog-posts";

const STATIC_PAGES = ["about", "contact", "privacy", "disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "hourly", priority: 1 },
  ];

  for (const p of GOLD_PAGES)
    urls.push({ url: `${SITE_URL}/${p.slug}`, lastModified: now, changeFrequency: "hourly", priority: 0.9 });
  for (const p of SILVER_PAGES)
    urls.push({ url: `${SITE_URL}/${p.slug}`, lastModified: now, changeFrequency: "hourly", priority: 0.9 });
  for (const p of CRYPTO_PAGES)
    urls.push({ url: `${SITE_URL}/${p.slug}`, lastModified: now, changeFrequency: "hourly", priority: 0.9 });

  for (const c of GOLD_COUNTRIES)
    urls.push({ url: `${SITE_URL}/gold-price-in-${c.slug}/`, lastModified: now, changeFrequency: "hourly", priority: 0.8 });
  for (const c of SILVER_COUNTRIES)
    urls.push({ url: `${SITE_URL}/silver-price-in-${c.slug}/`, lastModified: now, changeFrequency: "hourly", priority: 0.8 });

  urls.push({ url: `${SITE_URL}/blog/`, lastModified: now, changeFrequency: "daily", priority: 0.7 });
  for (const p of BLOG_POSTS)
    urls.push({ url: `${SITE_URL}/blog/${p.slug}/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });

  for (const s of STATIC_PAGES)
    urls.push({ url: `${SITE_URL}/${s}/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });

  return urls;
}
