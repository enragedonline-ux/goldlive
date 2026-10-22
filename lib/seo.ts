import type { Metadata } from "next";

export const SITE_URL = "https://goldlive-mocha.vercel.app";
export const SITE_NAME = "GoldLive";

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function pageMetadata({ title, description, path, keywords }: PageSeo): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = `${SITE_URL}/og.jpg`;
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
      images: [{ url: ogImage, width: 2240, height: 1120, alt: `${SITE_NAME} — Live Gold Price Today` }],
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
