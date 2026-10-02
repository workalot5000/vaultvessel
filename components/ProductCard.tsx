import Link from "next/link";
import { Product, money } from "@/data/catalog";
import ProductArt from "./ProductArt";
import AddToQuote from "./AddToQuote";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="flex flex-col">
      <Link href={`/product/${p.slug}`} className="group block">
        <div className="aspect-[4/3] overflow-hidden bg-[#E4DDCF] p-6 transition-colors group-hover:bg-[#DCD3C1]">
          <ProductArt dept={p.dept} group={p.group} />
        </div>
        <p className="eyebrow mt-4">{p.group} · {p.condition}</p>
        <h3 className="mt-1 text-lg font-semibold leading-snug group-hover:text-bronze">{p.name}</h3>
      </Link>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="price-label">Reference price · USD</p>
          <p className="font-display text-2xl font-semibold">from {money(p.price)}</p>
        </div>
        <span className="text-xs text-steel">{p.size}</span>
      </div>
      <div className="mt-4">
        <AddToQuote slug={p.slug} name={p.name} />
      </div>
    </article>
  );
}