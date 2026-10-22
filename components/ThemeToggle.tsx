"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "dark" || t === "light") setTheme(t);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("aurum-theme", next);
    } catch {}
  };

  return (
    <button className="theme-btn" onClick={toggle} title="Switch theme" aria-label="Switch theme">
      {theme === "light" ? "☾ Dark" : "☀ Light"}
    </button>
  );
}
