import Link from "next/link";
import PageHead from "@/components/PageHead";
import CtaBand from "@/components/CtaBand";
import { DEPARTMENTS } from "@/data/catalog";
import { deptHref } from "@/lib/routes";

export const metadata = {
  title: "About — VaultVessel LLC",
  description: "VaultVessel LLC supplies shipping containers, converted spaces, reefers, site tanks, restrooms, and outboard motors from Miami, Florida.",
};

const PRINCIPLES = [
  ["Quote, don't guess", "No two sites are alike. Freight, tax, availability, and final price are confirmed in a written quote, never implied by a number on a page."],
  ["Steel that fits the job", "We would rather match you to the right grade and size than sell the most expensive box."],
  ["Plain paperwork", "What we quote is what we deliver. Scope and terms are written down so everyone reads the same page."],
];

export default function About() {
  return (
    <>
      <PageHead eyebrow="About VaultVessel" title="Steel, priced" accent="in writing." />
      <section className="wrap grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <p className="eyebrow">Miami, Florida</p>
        <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-ink/80">
          <p>VaultVessel LLC supplies steel containers, converted spaces, and marine equipment from Miami. Our catalog is broad because the people we serve are: contractors, marinas, restaurateurs, builders, and homeowners who need a durable box or a reliable motor.</p>
          <p>We work by written quote. Reference prices help you compare options, and the quote confirms what matters for your site: freight, tax, availability, and the final price.</p>
        </div>
      </section>
      <section className="wrap mt-24 grid gap-10 md:grid-cols-3">
        {PRINCIPLES.map(([t, d]) => (
          <div key={t} className="border-t border-ink pt-6">
            <h2 className="font-display text-3xl font-semibold uppercase">{t}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{d}</p>
          </div>
        ))}
      </section>
      <section className="wrap mt-24">
        <h2 className="eyebrow">What we supply</h2>
        <ul className="mt-4 border-t border-ink">
          {DEPARTMENTS.map((d) => (
            <li key={d.id} className="border-b border-ink/15">
              <Link href={deptHref(d.id)} className="flex items-baseline justify-between gap-6 py-5 hover:text-bronze">
                <span className="font-display text-3xl font-semibold uppercase">{d.name}</span>
                <span className="hidden text-sm text-ink/60 md:block">{d.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}