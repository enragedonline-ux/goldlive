import type { Metadata } from "next";

export const SITE_URL = "https://goldratetoday.online";
export const SITE_NAME = "GoldRateToday";

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function pageMetadata({ title, description, path, keywords }: PageSeo): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = `${SITE_URL}/og.svg`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${SITE_NAME} — Live Gold Price Today` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  };
}
