import ThemeToggle from "./ThemeToggle";
import MarketBar from "./MarketBar";
import SearchBox from "./SearchBox";
import TranslateWidget from "./TranslateWidget";

const NAV = [
  { href: "/gold-price-today", label: "Gold", key: "gold" },
  { href: "/silver-price-today", label: "Silver", key: "silver" },
  { href: "/bitcoin-price", label: "Bitcoin", key: "bitcoin" },
  { href: "/ethereum-price", label: "Ethereum", key: "ethereum" },
  { href: "/about/", label: "About Us", key: "about" },
  { href: "/privacy/", label: "Privacy", key: "privacy" },
];

export default function Header({ active = "gold" }: { active?: string }) {
  return (
    <>
      <MarketBar />
      <header className="head">
        <a className="logo" href="/">
          GOLDRATETODAY<i>.</i>
        </a>
        <nav className="nav">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={active === n.key ? "on" : ""}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="tools">
          <SearchBox />
          <TranslateWidget />
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
