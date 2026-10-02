import Link from "next/link";

export default function CtaBand({ title = "Tell us the site.", accent = "We'll price the steel." }: { title?: string; accent?: string }) {
  return (
    <section className="wrap mt-24 md:mt-32">
      <div className="bg-ink px-8 py-16 text-bone md:px-16 md:py-24">
        <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold uppercase leading-[0.88]">
          {title}
          <br />
          <span className="text-bronze">{accent}</span>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/shop" className="inline-flex bg-bronze px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink hover:bg-bone">Browse the catalog</Link>
          <Link href="/quote" className="inline-flex border border-bone px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] hover:bg-bone hover:text-ink">Start a quote</Link>
        </div>
      </div>
    </section>
  );
}