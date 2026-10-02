"use client";
import { useQuote } from "@/lib/quote-context";

export default function AddToQuote({ slug, name, full = false }: { slug: string; name: string; full?: boolean }) {
  const { add, items } = useQuote();
  const inList = items.some((i) => i.slug === slug);
  return (
    <button onClick={() => add({ slug, name })} className={full ? "btn w-full" : "btn-ghost w-full !py-2.5"}>
      {inList ? "Add another to quote" : "Add to quote"}
    </button>
  );
}