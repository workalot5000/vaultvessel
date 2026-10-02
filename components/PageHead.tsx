export default function PageHead({ eyebrow, title, accent, lede }: { eyebrow: string; title: string; accent?: string; lede?: string }) {
  return (
    <section className="wrap pb-12 pt-16 md:pb-16 md:pt-24">
      <p className="eyebrow rise">{eyebrow}</p>
      <h1 className="rise mt-4 font-display text-[clamp(3.5rem,11vw,9rem)] font-semibold uppercase leading-[0.86]">
        {title}
        {accent && <> <span className="text-bronze">{accent}</span></>}
      </h1>
      {lede && <p className="rise mt-8 max-w-2xl text-lg leading-relaxed text-ink/75">{lede}</p>}
    </section>
  );
}