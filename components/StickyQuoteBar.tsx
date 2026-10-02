"use client";
import { useQuote } from "@/lib/quote-context";

export default function StickyQuoteBar({ slug, name, price }: { slug: string; name: string; price: string }) {
  const { add } = useQuote();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink bg-bone/95 backdrop-blur">
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="price-label">Reference price · USD · from {price}</p>
        </div>
        <button onClick={() => add({ slug, name })} className="btn shrink-0">Get quote</button>
      </div>
    </div>
  );
}