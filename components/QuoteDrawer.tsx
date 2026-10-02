"use client";
import Link from "next/link";
import { useQuote } from "@/lib/quote-context";

export default function QuoteDrawer() {
  const { items, open, setOpen, setQty, remove, count } = useQuote();
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-ink/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-bone shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-ink px-6 py-5">
          <h2 className="font-display text-3xl font-semibold uppercase">Quote list ({count})</h2>
          <button onClick={() => setOpen(false)} className="text-sm font-semibold uppercase tracking-widest hover:text-bronze">Close</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <p className="py-10 text-ink/70">Nothing here yet. Add products from the catalog and we will price them together.</p>
          ) : (
            items.map((i) => (
              <div key={i.slug} className="border-b border-ink/15 py-5">
                <Link href={`/product/${i.slug}`} onClick={() => setOpen(false)} className="font-semibold hover:text-bronze">{i.name}</Link>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center border border-ink">
                    <button onClick={() => setQty(i.slug, i.qty - 1)} className="h-9 w-9 hover:bg-ink hover:text-bone" aria-label="Decrease">−</button>
                    <span className="w-10 text-center text-sm font-semibold">{i.qty}</span>
                    <button onClick={() => setQty(i.slug, i.qty + 1)} className="h-9 w-9 hover:bg-ink hover:text-bone" aria-label="Increase">+</button>
                  </div>
                  <button onClick={() => remove(i.slug)} className="text-xs font-semibold uppercase tracking-widest text-steel hover:text-bronze">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-ink px-6 py-5">
          <p className="mb-4 text-xs leading-relaxed text-steel">
            Freight, tax, availability, and final price are confirmed in a written quote. Reference prices are for guidance only.
          </p>
          {items.length > 0 ? (
            <Link href="/quote" onClick={() => setOpen(false)} className="btn w-full">Continue to quote form</Link>
          ) : (
            <Link href="/shop" onClick={() => setOpen(false)} className="btn-ghost w-full">Browse the catalog</Link>
          )}
        </div>
      </aside>
    </>
  );
}