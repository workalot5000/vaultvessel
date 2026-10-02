import Link from "next/link";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { DEPARTMENTS, PRODUCTS, FEATURED } from "@/data/catalog";

const STEPS = [
  ["01", "Choose what you need", "Browse the catalog and add anything that fits your site to your quote list."],
  ["02", "Send your quote list", "Tell us where it is going and when. One form covers every item."],
  ["03", "Receive a written quote", "Freight, tax, availability, and final price are confirmed in writing."],
];

export default function Home() {
  const featured = FEATURED.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean);
  return (
    <>
      <Hero />
      <section className="wrap py-24 md:py-36">
        <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold uppercase leading-[0.9]">Six ways to put steel to work.</h2>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((d, i) => (
            <CategoryCard key={d.id} index={i + 1} id={d.id} name={d.name} blurb={d.blurb} count={PRODUCTS.filter((p) => p.dept === d.id).length} />
          ))}
        </div>
      </section>
      <section className="wrap py-24 md:py-32">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold uppercase leading-[0.9]">From the yard this month.</h2>
          <Link href="/shop" className="btn-ghost hidden shrink-0 md:inline-flex">All products</Link>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => p && <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
      <section className="wrap py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-3">
          {STEPS.map(([n, t, d]) => (
            <div key={n} className="border-t border-ink pt-6">
              <p className="font-display text-xl tracking-widest text-bronze">{n}</p>
              <h3 className="mt-3 font-display text-3xl font-semibold uppercase">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap">
        <div className="bg-ink px-8 py-20 text-bone md:px-16 md:py-28">
          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-semibold uppercase leading-[0.88]">Tell us the site.<br /><span className="text-bronze">We'll price the steel.</span></h2>
          <Link href="/quote" className="mt-10 inline-flex bg-bronze px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink hover:bg-bone">Start a quote</Link>
        </div>
      </section>
    </>
  );
}