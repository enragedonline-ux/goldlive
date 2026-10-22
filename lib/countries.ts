export interface Country {
  slug: string;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
  /** local weight unit commonly used, if any */
  localUnit?: string;
  capital?: string;
}

/** 47 countries for /gold-price-in-{slug}/ pages */
export const GOLD_COUNTRIES: Country[] = [
  { slug: "usa", name: "USA", currency: "USD", currencySymbol: "$", flag: "us" },
  { slug: "europe", name: "Europe", currency: "EUR", currencySymbol: "€", flag: "eu" },
  { slug: "argentina", name: "Argentina", currency: "ARS", currencySymbol: "$", flag: "ar", capital: "Buenos Aires" },
  { slug: "australia", name: "Australia", currency: "AUD", currencySymbol: "$", flag: "au", capital: "Canberra" },
  { slug: "bahrain", name: "Bahrain", currency: "BHD", currencySymbol: "د.ب", flag: "bh", capital: "Manama" },
  { slug: "brazil", name: "Brazil", currency: "BRL", currencySymbol: "R$", flag: "br", capital: "Brasília" },
  { slug: "canada", name: "Canada", currency: "CAD", currencySymbol: "$", flag: "ca", capital: "Ottawa" },
  { slug: "china", name: "China", currency: "CNY", currencySymbol: "¥", flag: "cn", capital: "Beijing" },
  { slug: "colombia", name: "Colombia", currency: "COP", currencySymbol: "$", flag: "co", capital: "Bogotá" },
  { slug: "croatia", name: "Croatia", currency: "EUR", currencySymbol: "€", flag: "hr", capital: "Zagreb" },
  { slug: "denmark", name: "Denmark", currency: "DKK", currencySymbol: "kr", flag: "dk", capital: "Copenhagen" },
  { slug: "egypt", name: "Egypt", currency: "EGP", currencySymbol: "£", flag: "eg", capital: "Cairo" },
  { slug: "hong-kong", name: "Hong Kong", currency: "HKD", currencySymbol: "$", flag: "hk" },
  { slug: "hungary", name: "Hungary", currency: "HUF", currencySymbol: "Ft", flag: "hu", capital: "Budapest" },
  { slug: "india", name: "India", currency: "INR", currencySymbol: "₹", flag: "in", localUnit: "tola", capital: "New Delhi" },
  { slug: "indonesia", name: "Indonesia", currency: "IDR", currencySymbol: "Rp", flag: "id", capital: "Jakarta" },
  { slug: "japan", name: "Japan", currency: "JPY", currencySymbol: "¥", flag: "jp", capital: "Tokyo" },
  { slug: "jordan", name: "Jordan", currency: "JOD", currencySymbol: "د.ا", flag: "jo", capital: "Amman" },
  { slug: "kuwait", name: "Kuwait", currency: "KWD", currencySymbol: "د.ك", flag: "kw", capital: "Kuwait City" },
  { slug: "lebanon", name: "Lebanon", currency: "LBP", currencySymbol: "ل.ل", flag: "lb", capital: "Beirut" },
  { slug: "libya", name: "Libya", currency: "LYD", currencySymbol: "د.ل", flag: "ly", capital: "Tripoli" },
  { slug: "macau", name: "Macau", currency: "MOP", currencySymbol: "MOP$", flag: "mo" },
  { slug: "malaysia", name: "Malaysia", currency: "MYR", currencySymbol: "RM", flag: "my", capital: "Kuala Lumpur" },
  { slug: "mexico", name: "Mexico", currency: "MXN", currencySymbol: "$", flag: "mx", capital: "Mexico City" },
  { slug: "myanmar", name: "Myanmar", currency: "MMK", currencySymbol: "K", flag: "mm", capital: "Naypyidaw" },
  { slug: "new-zealand", name: "New Zealand", currency: "NZD", currencySymbol: "$", flag: "nz", capital: "Wellington" },
  { slug: "nigeria", name: "Nigeria", currency: "NGN", currencySymbol: "₦", flag: "ng", capital: "Abuja" },
  { slug: "north-macedonia", name: "North Macedonia", currency: "MKD", currencySymbol: "ден", flag: "mk", capital: "Skopje" },
  { slug: "norway", name: "Norway", currency: "NOK", currencySymbol: "kr", flag: "no", capital: "Oslo" },
  { slug: "pakistan", name: "Pakistan", currency: "PKR", currencySymbol: "₨", flag: "pk", localUnit: "tola", capital: "Islamabad" },
  { slug: "philippines", name: "Philippines", currency: "PHP", currencySymbol: "₱", flag: "ph", capital: "Manila" },
  { slug: "qatar", name: "Qatar", currency: "QAR", currencySymbol: "ر.ق", flag: "qa", capital: "Doha" },
  { slug: "russia", name: "Russia", currency: "RUB", currencySymbol: "₽", flag: "ru", capital: "Moscow" },
  { slug: "saudi-arabia", name: "Saudi Arabia", currency: "SAR", currencySymbol: "ر.س", flag: "sa", capital: "Riyadh" },
  { slug: "serbia", name: "Serbia", currency: "RSD", currencySymbol: "дин", flag: "rs", capital: "Belgrade" },
  { slug: "singapore", name: "Singapore", currency: "SGD", currencySymbol: "$", flag: "sg" },
  { slug: "south-africa", name: "South Africa", currency: "ZAR", currencySymbol: "R", flag: "za", capital: "Pretoria" },
  { slug: "south-korea", name: "South Korea", currency: "KRW", currencySymbol: "₩", flag: "kr", capital: "Seoul" },
  { slug: "sweden", name: "Sweden", currency: "SEK", currencySymbol: "kr", flag: "se", capital: "Stockholm" },
  { slug: "switzerland", name: "Switzerland", currency: "CHF", currencySymbol: "Fr", flag: "ch", capital: "Bern" },
  { slug: "taiwan", name: "Taiwan", currency: "TWD", currencySymbol: "NT$", flag: "tw", capital: "Taipei" },
  { slug: "thailand", name: "Thailand", currency: "THB", currencySymbol: "฿", flag: "th", localUnit: "baht", capital: "Bangkok" },
  { slug: "turkey", name: "Turkey", currency: "TRY", currencySymbol: "₺", flag: "tr", capital: "Ankara" },
  { slug: "uk", name: "UK", currency: "GBP", currencySymbol: "£", flag: "gb", capital: "London" },
  { slug: "uae", name: "United Arab Emirates", currency: "AED", currencySymbol: "د.إ", flag: "ae", capital: "Abu Dhabi" },
  { slug: "vietnam", name: "Vietnam", currency: "VND", currencySymbol: "₫", flag: "vn", capital: "Hanoi" },
];

/** 15 silver country pages (top-volume subset) */
export const SILVER_COUNTRIES: Country[] = [
  { slug: "usa", name: "USA", currency: "USD", currencySymbol: "$", flag: "us" },
  { slug: "uk", name: "UK", currency: "GBP", currencySymbol: "£", flag: "gb", capital: "London" },
  { slug: "india", name: "India", currency: "INR", currencySymbol: "₹", flag: "in", localUnit: "tola", capital: "New Delhi" },
  { slug: "pakistan", name: "Pakistan", currency: "PKR", currencySymbol: "₨", flag: "pk", localUnit: "tola", capital: "Islamabad" },
  { slug: "uae", name: "United Arab Emirates", currency: "AED", currencySymbol: "د.إ", flag: "ae", capital: "Abu Dhabi" },
  { slug: "saudi-arabia", name: "Saudi Arabia", currency: "SAR", currencySymbol: "ر.س", flag: "sa", capital: "Riyadh" },
  { slug: "canada", name: "Canada", currency: "CAD", currencySymbol: "$", flag: "ca", capital: "Ottawa" },
  { slug: "australia", name: "Australia", currency: "AUD", currencySymbol: "$", flag: "au", capital: "Canberra" },
  { slug: "europe", name: "Europe", currency: "EUR", currencySymbol: "€", flag: "eu" },
  { slug: "china", name: "China", currency: "CNY", currencySymbol: "¥", flag: "cn", capital: "Beijing" },
  { slug: "japan", name: "Japan", currency: "JPY", currencySymbol: "¥", flag: "jp", capital: "Tokyo" },
  { slug: "singapore", name: "Singapore", currency: "SGD", currencySymbol: "$", flag: "sg" },
  { slug: "south-africa", name: "South Africa", currency: "ZAR", currencySymbol: "R", flag: "za", capital: "Pretoria" },
  { slug: "egypt", name: "Egypt", currency: "EGP", currencySymbol: "£", flag: "eg", capital: "Cairo" },
  { slug: "turkey", name: "Turkey", currency: "TRY", currencySymbol: "₺", flag: "tr", capital: "Ankara" },
];

export function getCountry(slug: string): Country | undefined {
  return GOLD_COUNTRIES.find((c) => c.slug === slug);
}

export function getSilverCountry(slug: string): Country | undefined {
  return SILVER_COUNTRIES.find((c) => c.slug === slug);
}
