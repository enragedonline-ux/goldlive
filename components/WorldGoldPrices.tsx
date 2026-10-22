import { GOLD_COUNTRIES } from "@/lib/countries";

export default function WorldGoldPrices() {
  return (
    <section className="world-gold">
      <div className="world-gold-inner">
        <h3>WORLD GOLD PRICES</h3>
        <div className="world-gold-grid">
          {GOLD_COUNTRIES.map((c) => (
            <a key={c.slug} href={`/gold-price-in-${c.slug}/`}>
              <img
                src={`https://flagcdn.com/w40/${c.flag}.png`}
                alt={`Gold price ${c.name}`}
                width={20}
                height={15}
                loading="lazy"
                className="wflag-img"
              />
              Gold Price {c.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
