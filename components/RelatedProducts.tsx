import type { Product } from "@/data/catalog";
import { relatedProducts } from "@/lib/related";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ product }: { product: Product }) {
  const items = relatedProducts(product, 4);
  if (items.length === 0) return null;
  return (
    <section className="mt-28">
      <div className="flex items-end justify-between border-t border-ink pt-6">
        <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-semibold uppercase leading-[0.9]">Also consider.</h2>
        <p className="eyebrow hidden md:block">Reference prices in USD</p>
      </div>
      <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}