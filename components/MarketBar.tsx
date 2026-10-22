"use client";
import { useEffect, useState } from "react";

interface MarketInfo {
  dateStr: string;
  open: boolean;
  session: string;
  nextSession: string;
  nextTime: string;
}

function fmtTime(mins: number): string {
  const h24 = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const ap = h24 >= 12 ? "PM" : "AM";
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m).padStart(2, "0")} ${ap} ET`;
}

function compute(d: Date): MarketInfo {
  const et = new Date(d.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = et.getDay();
  const mins = et.getHours() * 60 + et.getMinutes();

  const dateStr =
    et.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "America/New_York",
    }) +
    " · " +
    et.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    }) +
    " ET";

  // Spot gold: Sun 18:00 ET -> Fri 17:00 ET, daily break 17:00-18:00 ET
  const weekend = day === 5 && mins >= 1020 ? true : day === 6 ? true : day === 0 && mins < 1080;
  const brk = !weekend && mins >= 1020 && mins < 1080;

  if (weekend) {
    return { dateStr, open: false, session: "", nextSession: "Asian", nextTime: "Sun 6:00 PM ET" };
  }
  if (brk) {
    return { dateStr, open: false, session: "", nextSession: "Asian", nextTime: fmtTime(1080) };
  }
  if (mins >= 1080 || mins < 180) {
    return { dateStr, open: true, session: "Asian", nextSession: "London", nextTime: fmtTime(180) };
  }
  if (mins < 480) {
    return { dateStr, open: true, session: "London", nextSession: "New York", nextTime: fmtTime(480) };
  }
  return { dateStr, open: true, session: "New York", nextSession: "Asian", nextTime: fmtTime(1080) };
}

export default function MarketBar() {
  const [info, setInfo] = useState<MarketInfo | null>(null);

  useEffect(() => {
    setInfo(compute(new Date()));
    const t = setInterval(() => setInfo(compute(new Date())), 30000);
    return () => clearInterval(t);
  }, []);

  if (!info) {
    return (
      <div className="util" aria-hidden>
        <span>…</span>
        <span>…</span>
        <span>…</span>
      </div>
    );
  }

  return (
    <div className="util">
      <span>{info.dateStr}</span>
      <span className="mkt">
        <span className={`dot${info.open ? " pulse" : " closed"}`}></span>
        {info.open ? `${info.session} spot market open` : "Spot market closed"}
      </span>
      <span>
        Next: {info.nextSession} opens {info.nextTime}
      </span>
    </div>
  );
}
