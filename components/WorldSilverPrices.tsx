import { SILVER_COUNTRIES } from "@/lib/countries";

export default function WorldSilverPrices() {
  return (
    <section className="world-gold" style={{ marginTop: 16 }}>
      <div className="world-gold-inner">
        <h3>SILVER PRICE BY COUNTRY</h3>
        <div className="world-gold-grid">
          {SILVER_COUNTRIES.map((c) => (
            <a key={c.slug} href={`/silver-price-in-${c.slug}/`}>
              <img
                src={`https://flagcdn.com/w40/${c.flag}.png`}
                alt={`Silver price ${c.name}`}
                width={20}
                height={15}
                loading="lazy"
                className="wflag-img"
              />
              Silver Price {c.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
