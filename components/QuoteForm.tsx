"use client";
import Link from "next/link";
import { useState } from "react";
import { useQuote } from "@/lib/quote-context";

const field = "w-full border border-ink/30 bg-transparent px-4 py-3 text-sm outline-none focus:border-bronze";

export default function QuoteForm() {
  const { items, setQty, remove, clear } = useQuote();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [ref, setRef] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const contact = Object.fromEntries(f.entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, items }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error();
      setRef(data.ref);
      clear();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done")
    return (
      <div className="border-t border-ink py-12">
        <h2 className="font-display text-5xl font-semibold uppercase">Request received</h2>
        <p className="mt-4 max-w-lg text-ink/75">Your reference is <strong>{ref}</strong>. We will reply with a written quote confirming freight, tax, availability, and final price.</p>
        <Link href="/shop" className="btn mt-8">Back to the catalog</Link>
      </div>
    );

  return (
    <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
      <section>
        <h2 className="eyebrow">Your quote list</h2>
        {items.length === 0 ? (
          <p className="mt-6 text-ink/70">Your list is empty. <Link href="/shop" className="underline decoration-bronze underline-offset-4">Browse the catalog</Link> to add products.</p>
        ) : (
          <div className="mt-4 border-t border-ink">
            {items.map((i) => (
              <div key={i.slug} className="flex items-center justify-between gap-4 border-b border-ink/15 py-4">
                <Link href={`/product/${i.slug}`} className="font-semibold hover:text-bronze">{i.name}</Link>
                <div className="flex shrink-0 items-center gap-4">
                  <input type="number" min={1} value={i.qty} onChange={(e) => setQty(i.slug, Number(e.target.value))} className="w-16 border border-ink/30 bg-transparent px-2 py-1.5 text-center text-sm" aria-label={`Quantity for ${i.name}`} />
                  <button type="button" onClick={() => remove(i.slug)} className="text-xs font-semibold uppercase tracking-widest text-steel hover:text-bronze">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <form onSubmit={onSubmit} className="grid gap-4">
        <h2 className="eyebrow">Your details</h2>
        <input name="name" required placeholder="Full name" className={field} />
        <input name="company" placeholder="Company (optional)" className={field} />
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="email" type="email" required placeholder="Email" className={field} />
          <input name="phone" placeholder="Phone" className={field} />
        </div>
        <input name="destination" required placeholder="Delivery city, ZIP, or port" className={field} />
        <textarea name="notes" rows={5} placeholder="Site access, timing, modifications, anything we should price in" className={field} />
        <p className="text-xs leading-relaxed text-steel">Freight, tax, availability, and final price are confirmed in a written quote. Nothing is charged by submitting this form.</p>
        <button disabled={items.length === 0 || status === "sending"} className="btn disabled:opacity-40">
          {status === "sending" ? "Sending…" : "Send quote request"}
        </button>
        {status === "error" && <p className="text-sm text-bronze">Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}