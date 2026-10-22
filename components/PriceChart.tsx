"use client";

import { useEffect, useRef, useState } from "react";

const SYMBOLS: Record<string, string> = {
  gold: "TVC:GOLD",
  silver: "TVC:SILVER",
  bitcoin: "BITSTAMP:BTCUSD",
  ethereum: "BITSTAMP:ETHUSD",
};

/**
 * TradingView Advanced Chart embed — the same charting library goldprice.org uses.
 * Gives candlesticks, drawing tools and the full timeframe menu
 * (1m/3m/5m/15m/30m/45m, hours, days, weeks, months, 1D–1Y ranges).
 */
export default function PriceChart({ asset = "gold" }: { asset?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const read = () => {
      const t = document.documentElement.getAttribute("data-theme");
      setTheme(t === "dark" ? "dark" : "light");
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.height = "100%";
    widgetDiv.style.width = "100%";
    container.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.textContent = JSON.stringify({
      autosize: true,
      symbol: SYMBOLS[asset] ?? "TVC:GOLD",
      interval: "D",
      timezone: "America/New_York",
      theme,
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      withdateranges: true,
      hide_side_toolbar: false,
      support_host: "https://www.tradingview.com",
    });
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [theme, asset]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container"
      style={{ height: "640px", width: "100%" }}
    />
  );
}
