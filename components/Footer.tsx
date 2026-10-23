export default function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <h5>GOLDRATETODAY.</h5>
          <a>Live precious metal prices, charts and guides. Updated every minute during market hours.</a>
        </div>
        <div>
          <h5>GOLD</h5>
          <a href="/gold-price-today">Gold price today</a>
          <a href="/live-gold-price">Live gold price</a>
          <a href="/gold-price-per-gram">Gold per gram</a>
          <a href="/gold-price-per-tola">Gold per tola</a>
          <a href="/gold-price-per-ounce">Gold per ounce</a>
          <a href="/24k-gold-price">24K gold price</a>
          <a href="/gold-price-calculator">Gold calculator</a>
        </div>
        <div>
          <h5>SILVER & CRYPTO</h5>
          <a href="/silver-price-today">Silver price</a>
          <a href="/live-silver-price">Live silver price</a>
          <a href="/bitcoin-price">Bitcoin price</a>
          <a href="/live-bitcoin-price">Live bitcoin price</a>
          <a href="/ethereum-price">Ethereum price</a>
          <a href="/live-ethereum-price">Live ethereum price</a>
        </div>
        <div>
          <h5>COMPANY</h5>
          <a href="/about/">About</a>
          <a href="/contact/">Contact</a>
          <a href="/privacy/">Privacy policy</a>
          <a href="/disclaimer/">Disclaimer</a>
          <a href="/blog/">Blog</a>
          <a href="/sitemap.xml">Sitemap</a>
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
