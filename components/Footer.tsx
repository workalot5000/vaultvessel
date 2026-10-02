import Link from "next/link";
import { DEPARTMENTS } from "@/data/catalog";
import { deptHref } from "@/lib/routes";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-32 bg-ink text-bone">
      <div className="wrap grid gap-12 py-20 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-5xl font-semibold uppercase leading-none">VaultVessel <span className="text-bronze">LLC</span></p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone/65">Containers, converted spaces, and marine power, supplied by written quote from {SITE.city}.</p>
        </div>
        <div className="text-sm">
          <p className="eyebrow !text-bone/50">Departments</p>
          <ul className="mt-4 space-y-2">
            {DEPARTMENTS.map((d) => (
              <li key={d.id}><Link className="hover:text-bronze" href={deptHref(d.id)}>{d.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="eyebrow !text-bone/50">Company</p>
          <ul className="mt-4 space-y-2">
            <li><Link className="hover:text-bronze" href="/shop">Full catalog</Link></li>
            <li><Link className="hover:text-bronze" href="/delivery">Delivery</Link></li>
            <li><Link className="hover:text-bronze" href="/about">About</Link></li>
            <li><Link className="hover:text-bronze" href="/contact">Contact</Link></li>
            <li><Link className="hover:text-bronze" href="/quote">Start a quote</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="eyebrow !text-bone/50">Reach us</p>
          <ul className="mt-4 space-y-2">
            <li>{SITE.city}</li>
            <li><a className="hover:text-bronze" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a className="hover:text-bronze" href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}>{SITE.phone}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bone/15">
        <p className="wrap py-6 text-xs leading-relaxed text-bone/55">
          All prices shown are REFERENCE PRICE · USD. Freight, tax, availability, and final price are confirmed in a written quote. © {new Date().getFullYear()} {SITE.name}, Miami, FL.
        </p>
      </div>
    </footer>
  );
}