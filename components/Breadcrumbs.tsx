export interface Crumb {
  href: string;
  label: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `https://goldratetoday.online${c.href}`,
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="crumbs">
        {items.map((c, i) => (
          <span key={c.href + c.label}>
            {i > 0 && <span className="csep">›</span>}
            {i === items.length - 1 ? (
              <span className="ccur">{c.label}</span>
            ) : (
              <a href={c.href}>{c.label}</a>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
