import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function StaticPage({
  title,
  description,
  crumbs,
  children,
}: {
  title: string;
  description: string;
  crumbs: { href: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <Header active="gold" />
      <main className="ppage">
        <Breadcrumbs items={crumbs} />
        <h1 className="ppage-h1">{title}</h1>
        <p className="pintro" style={{ maxWidth: 780 }}>{description}</p>
        <div className="pintro" style={{ maxWidth: 780 }}>{children}</div>
      </main>
      <Footer />
    </>
  );
}
