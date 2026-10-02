import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEPARTMENTS, PRODUCTS, money } from "@/data/catalog";
import { deptHref } from "@/lib/routes";
import { SITE } from "@/lib/site";
import ProductArt from "@/components/ProductArt";
import SpecTable from "@/components/SpecTable";
import AddToQuote from "@/components/AddToQuote";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import RelatedProducts from "@/components/RelatedProducts";
import JsonLd from "@/components/JsonLd";

type P = { params: { slug: string } };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: P): Metadata {
  const p = PRODUCTS.find((x) => x.slug === params.slug);
  if (!p) return { title: "Product not found | VaultVessel LLC" };
  const title = `${p.name} | VaultVessel LLC`;
  const description = `${p.lead} Reference price from ${money(p.price)} USD, quote only.`;
  const url = `/product/${p.slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { type: "website", title, description, url } };
}

export default function ProductPage({ params }: P) {
  const p = PRODUCTS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const dept = DEPARTMENTS.find((d) => d.id === p.dept);
  const rows: [string, string][] = [["Department", dept?.name ?? ""], ["Type", p.group], ["Condition", p.condition], ["Size", p.size], ...p.specs];

  // Quote-only: the price is declared as a low reference price, with no availability claim.
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: p.name,
        description: p.lead,
        category: dept?.name,
        url: `${SITE.url}/product/${p.slug}`,
        ...(p.motor ? { brand: { "@type": "Brand", name: p.motor.brand } } : {}),
        additionalProperty: p.specs.map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: p.price,
          offerCount: 1,
          seller: { "@type": "Organization", name: SITE.name },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Catalog", item: `${SITE.url}/shop` },
          { "@type": "ListItem", position: 2, name: dept?.name ?? "Department", item: `${SITE.url}${dept ? deptHref(dept.id) : "/shop"}` },
          { "@type": "ListItem", position: 3, name: p.name, item: `${SITE.url}/product/${p.slug}` },
        ],
      },
    ],
  };

  return (
    <div className="wrap pb-32 pt-10 md:pt-16">
      <JsonLd data={ld} />
      <nav className="eyebrow">
        <Link href="/shop" className="hover:text-bronze">Catalog</Link> /{" "}
        <Link href={dept ? deptHref(dept.id) : "/shop"} className="hover:text-bronze">{dept?.name}</Link>
      </nav>
      <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="aspect-[4/3] bg-[#E4DDCF] p-10 md:p-16"><ProductArt dept={p.dept} group={p.group} /></div>
        <div>
          <p className="eyebrow">{p.group} · {p.condition}</p>
          <h1 className="mt-3 font-display text-5xl font-semibold uppercase leading-[0.95] md:text-6xl">{p.name}</h1>
          <p className="mt-5 leading-relaxed text-ink/75">{p.lead}</p>
          <div className="mt-8 border-y border-ink py-5">
            <p className="price-label">Reference price · USD</p>
            <p className="font-display text-5xl font-semibold">from {money(p.price)}</p>
            <p className="mt-2 text-xs leading-relaxed text-steel">Freight, tax, availability, and final price are confirmed in a written quote.</p>
          </div>
          <div className="mt-6"><AddToQuote slug={p.slug} name={p.name} full /></div>
          <div className="mt-10"><SpecTable rows={rows} /></div>
        </div>
      </div>
      <RelatedProducts product={p} />
      <StickyQuoteBar slug={p.slug} name={p.name} price={money(p.price)} />
    </div>
  );
}