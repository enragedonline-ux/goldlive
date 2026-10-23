"use client";

import { useEffect, useRef, useState } from "react";

const SYMBOLS: Record<string, string> = {
  gold: "TVC:GOLD",
  silver: "TVC:SILVER",
  bitcoin: "BITSTAMP:BTCUSD",
  ethereum: "BITSTAMP:ETHUSD",
};

/**
 * TradingView Advanced Chart embed — lazy-loaded via IntersectionObserver
 * so it doesn't block initial page render (LCP/FCP).
 */
export default function PriceChart({ asset = "gold" }: { asset?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [visible, setVisible] = useState(false);

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

  // Lazy-load: only init TradingView when chart scrolls into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const container = containerRef.current;
    if (!container) return;
    const widgetHost = container.querySelector(".tv-widget-host") as HTMLDivElement;
    if (!widgetHost) return;

    // Small delay to ensure layout is complete before TradingView measures the container
    const timer = setTimeout(() => {
      widgetHost.innerHTML = "";

      const widgetDiv = document.createElement("div");
      widgetDiv.className = "tradingview-widget-container__widget";
      widgetDiv.style.height = "100%";
      widgetDiv.style.width = "100%";
      widgetHost.appendChild(widgetDiv);

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
      widgetHost.appendChild(script);
    }, 100);

    return () => {
      clearTimeout(timer);
      widgetHost.innerHTML = "";
    };
  }, [theme, asset, visible]);

  return (
    <>
      <div
        ref={containerRef}
        className="tradingview-widget-container"
        style={{ height: "640px", width: "100%" }}
      >
        <div className="tv-widget-host" style={{ height: "100%", width: "100%" }}>
          {!visible && (
            <div className="chart-skeleton">
              <div className="pulse-bar" />
              <p>Loading chart…</p>
            </div>
          )}
        </div>
      </div>
      <p className="chart-credit">
        Interactive chart by <a href="https://www.tradingview.com/" target="_blank" rel="noopener">TradingView</a>
        {` · `}
        <a href="https://www.binance.com/en/markets" target="_blank" rel="noopener">Binance Markets</a>
      </p>
    </>
  );
}
