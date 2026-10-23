'use cache';
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq, { FaqJsonLd } from "@/components/Faq";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";

const SITE_URL = "https://goldratetoday.online";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p) return {};
  const url = `${SITE_URL}/blog/${slug}/`;
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: url },
    openGraph: { title: p.title, description: p.excerpt, url, type: "article" },
    twitter: { card: "summary", title: p.title, description: p.excerpt },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  cacheLife("minutes");
  const { slug } = await params;
  const p = getBlogPost(slug);
  if (!p) notFound();

  return (
    <>
      <FaqJsonLd items={p.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.h1,
            description: p.excerpt,
            url: `${SITE_URL}/blog/${slug}/`,
            datePublished: p.dateISO,
            author: { "@type": "Organization", name: "GoldLive" },
            publisher: { "@type": "Organization", name: "GoldLive", url: `${SITE_URL}/` },
          }),
        }}
      />
      <Header active="gold" />
      <main className="ppage">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/blog/", label: "Blog" },
            { href: `/blog/${slug}/`, label: p.h1 },
          ]}
        />
        <span className="blog-tag">{p.tag}</span>
        <h1 className="ppage-h1">{p.h1}</h1>
        <p className="pupd">
          Published {p.date} · {p.readingMins} min read
        </p>
        <article className="pintro blog-article">
          {p.sections.map((s, i) => (
            <section key={i}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
              {s.bullets && (
                <ul className="pbullets">
                  {s.bullets.map((b, k) => (
                    <li key={k}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
        <Faq items={p.faqs} />
        <div className="blog-related">
          <h3>More from the blog</h3>
          <div className="blog-grid">
            {BLOG_POSTS.filter((x) => x.slug !== slug)
              .slice(0, 3)
              .map((x) => (
                <a key={x.slug} href={`/blog/${x.slug}/`} className="blog-card">
                  <span className="blog-tag">{x.tag}</span>
                  <h2>{x.h1}</h2>
                  <p>{x.excerpt}</p>
                </a>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
