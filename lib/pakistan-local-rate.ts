/**
 * Official LOCAL (sarafa) gold rate for Pakistan, published once a day by the
 * All Pakistan Sarafa Gems and Jewellers Association (APSGJA).
 *
 * This is the rate Pakistani bazaars actually trade at — it sits above the
 * international spot conversion because it carries import cost, dealer margin
 * and the open-market dollar rate (not the interbank one).
 *
 * There is NO live/minute-by-minute feed for this rate: APSGJA fixes it once
 * daily. Update the four fields below each morning when the new rate is
 * published (ARY / Aaj / ProPakistani carry it daily). The live international
 * spot rate (updates every minute) is shown alongside it on city pages as a
 * reference — never presented as the local rate.
 */
export interface PakistanLocalRate {
  /** APSGJA 24K rate per tola, PKR */
  perTola24K: number;
  /** change vs the previous day's rate, PKR (positive = up) */
  changePerTola: number;
  /** yesterday's 24K per-tola rate, PKR */
  prevPerTola24K: number;
  /** ISO date of this rate */
  date: string;
  /** display date, e.g. "23 Nov 2026" */
  dateLabel: string;
  source: string;
}

export const PAKISTAN_LOCAL_RATE: PakistanLocalRate = {
  perTola24K: 384136,
  changePerTola: 7800,
  prevPerTola24K: 376336,
  date: "2026-11-23",
  dateLabel: "23 Nov 2026",
  source: "All Pakistan Sarafa Gems and Jewellers Association (APSGJA)",
};

export const PURITY_22K = 0.916;
export const PURITY_18K = 0.75;
