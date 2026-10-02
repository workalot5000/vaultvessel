import Link from "next/link";

export default function Hero() {
  return (
    <section className="wrap pb-24 pt-16 md:pb-40 md:pt-28">
      <p className="eyebrow rise">Miami, Florida · Quote-only supply</p>
      <h1 className="rise mt-6 font-display text-[clamp(3.5rem,13vw,12rem)] font-semibold uppercase leading-[0.86] tracking-tight">
        Steel,
        <br />
        built to
        <br />
        <span className="text-bronze">your site.</span>
      </h1>
      <div className="rise mt-14 grid gap-10 border-t border-ink pt-8 md:grid-cols-[1fr_auto] md:items-end">
        <p className="max-w-xl text-lg leading-relaxed text-ink/75">
          Shipping containers, converted spaces, reefers, site tanks, restrooms, and outboard motors, priced against your site and delivered from South Florida.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/shop" className="btn">Browse the catalog</Link>
          <Link href="/quote" className="btn-ghost">Start a quote</Link>
        </div>
      </div>
    </section>
  );
}