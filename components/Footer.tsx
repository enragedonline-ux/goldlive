export default function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <h5>GOLDLIVE.</h5>
          <a>Live precious metal prices, charts and guides. Updated every minute during market hours.</a>
        </div>
        <div>
          <h5>METALS</h5>
          <a href="/gold-price-today">Gold price today</a>
          <a href="/gold-price-per-gram">Gold per gram</a>
          <a href="/gold-price-per-tola">Gold per tola</a>
          <a href="/silver-price-today">Silver price</a>
        </div>
        <div>
          <h5>CRYPTO</h5>
          <a href="/bitcoin-price">Bitcoin price</a>
          <a href="/ethereum-price">Ethereum price</a>
        </div>
        <div>
          <h5>PAGES</h5>
          <a href="/">Home</a>
          <a href="/gold-price-today">Gold price today</a>
          <a href="/live-gold-price">Live gold price</a>
        </div>
      </div>
      <div className="disc">
        Prices shown are indicative spot rates for informational purposes only and may differ from dealer
        buy/sell prices. Past performance does not guarantee future results. Nothing on this page
        constitutes investment advice.
      </div>
    </footer>
  );
}
