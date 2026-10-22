const COUNTRIES: [string, string][] = [
  ["us", "USA"], ["eu", "Europe"], ["ar", "Argentina"], ["au", "Australia"],
  ["bh", "Bahrain"], ["br", "Brazil"], ["ca", "Canada"], ["cn", "China"],
  ["co", "Colombia"], ["hr", "Croatia"], ["dk", "Denmark"], ["eg", "Egypt"],
  ["hk", "Hong Kong"], ["hu", "Hungary"], ["in", "India"], ["id", "Indonesia"],
  ["jp", "Japan"], ["jo", "Jordan"], ["kw", "Kuwait"],
  ["lb", "Lebanon"], ["ly", "Libya"], ["mo", "Macau"], ["my", "Malaysia"],
  ["mx", "Mexico"], ["mm", "Myanmar"], ["nz", "New Zealand"], ["ng", "Nigeria"],
  ["mk", "North Macedonia"], ["no", "Norway"], ["pk", "Pakistan"], ["ph", "Philippines"],
  ["qa", "Qatar"], ["ru", "Russia"], ["sa", "Saudi Arabia"], ["rs", "Serbia"],
  ["sg", "Singapore"], ["za", "South Africa"], ["kr", "South Korea"], ["se", "Sweden"],
  ["ch", "Switzerland"], ["tw", "Taiwan"], ["th", "Thailand"], ["tr", "Turkey"],
  ["gb", "UK"], ["ae", "United Arab Emirates"], ["vn", "Vietnam"],
];

export default function WorldGoldPrices() {
  return (
    <section className="world-gold">
      <div className="world-gold-inner">
        <h3>WORLD GOLD PRICES</h3>
        <div className="world-gold-grid">
          {COUNTRIES.map(([code, name]) => (
            <a key={name} href="#">
              <img
                src={`https://flagcdn.com/w40/${code}.png`}
                alt={`Gold price ${name}`}
                width={20}
                height={15}
                loading="lazy"
                className="wflag-img"
              />
              Gold Price {name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
