import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata = {
  title: "GoldLive Blog | Gold Price Guides, Explainers & Market Insights",
  description:
    "Plain-English guides on gold pricing, silver investing, tola conversions, karats and crypto — from the team behind GoldLive's live price charts.",
  alternates: { canonical: "https://goldlive-mocha.vercel.app/blog/" },
};

export default function BlogIndex() {
  return (
    <>
      <Header active="gold" />
      <main className="ppage">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/blog/", label: "Blog" },
          ]}
        />
        <h1 className="ppage-h1">GoldLive Blog</h1>
        <p className="pintro" style={{ maxWidth: 780 }}>
          Plain-English guides on how gold is priced, how to read the charts, and how South Asia
          buys gold — tolas, karats and all.
        </p>
        <div className="blog-grid">
          {BLOG_POSTS.map((p) => (
            <a key={p.slug} href={`/blog/${p.slug}/`} className="blog-card">
              <span className="blog-tag">{p.tag}</span>
              <h2>{p.h1}</h2>
              <p>{p.excerpt}</p>
              <span className="blog-date">{p.date}</span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
