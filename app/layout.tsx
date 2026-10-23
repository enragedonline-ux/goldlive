import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoldRateToday — Live Gold, Silver & Crypto Prices",
  description:
    "Real-time charts for gold, silver, Bitcoin and Ethereum. Live XAU/USD price per ounce, gram and tola, updated every minute.",
  keywords: ["gold price today", "live gold price", "silver price", "bitcoin price", "gold price per gram"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "GoldRateToday — Live Gold, Silver & Crypto Prices",
    description: "Real-time charts for gold, silver, Bitcoin and Ethereum, updated every minute.",
    type: "website",
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem('aurum-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
