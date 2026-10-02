import Link from "next/link";
import type { Dept } from "@/data/catalog";
import { deptHref } from "@/lib/routes";

export default function CategoryCard({ index, id, name, blurb, count }: { index: number; id: string; name: string; blurb: string; count: number }) {
  return (
    <Link href={deptHref(id as Dept)} className="group flex min-h-[260px] flex-col justify-between border-t border-ink py-6 transition-colors hover:bg-ink hover:text-bone md:px-6">
      <div className="flex items-start justify-between">
        <span className="font-display text-lg tracking-widest text-bronze">{String(index).padStart(2, "0")}</span>
        <span className="eyebrow group-hover:text-bone/70">{count} items</span>
      </div>
      <div>
        <h3 className="font-display text-4xl font-semibold uppercase leading-none md:text-5xl">{name}</h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/70 group-hover:text-bone/75">{blurb}</p>
      </div>
    </Link>
  );
}