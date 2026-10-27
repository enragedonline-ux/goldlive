import { BLOG_POSTS } from "@/lib/blog-posts";

/**
 * Latest blog posts block, shared by the main price pages (PricePage,
 * CountryPricePage) and the homepage. Shows the 4 newest posts (BLOG_POSTS
 * is ordered newest first, so this updates automatically when a new post is
 * added) plus a link to the blog index. Uses the existing blog-card styles
 * from the blog index — no new design system.
 */
export default function LatestBlogPosts() {
  const posts = BLOG_POSTS.slice(0, 4);
  return (
    <section aria-label="Latest from the blog">
      <h2 className="sec-title" style={{ marginTop: 30 }}>
        Latest from the blog
      </h2>
      <div className="blog-grid">
        {posts.map((p) => (
          <a key={p.slug} href={`/blog/${p.slug}/`} className="blog-card">
            <span className="blog-tag">{p.tag}</span>
            <h2>{p.h1}</h2>
            <p>{p.excerpt}</p>
            <span className="blog-date">{p.date}</span>
          </a>
        ))}
      </div>
      <p style={{ marginTop: 16 }}>
        <a href="/blog/" style={{ color: "var(--gold)", fontWeight: 700 }}>
          View all articles →
        </a>
      </p>
    </section>
  );
}
