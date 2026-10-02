"use client";
import Link from "next/link";
import { useState } from "react";
import { useQuote } from "@/lib/quote-context";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/containers", label: "Containers" },
  { href: "/converted-spaces", label: "Converted spaces" },
  { href: "/marine", label: "Marine" },
  { href: "/delivery", label: "Delivery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { count, setOpen } = useQuote();
  const [menu, setMenu] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-bone/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setMenu(false)}>
          <span className="block h-3 w-3 bg-bronze" />
          <span className="font-display text-xl font-semibold uppercase tracking-[0.12em]">VaultVessel</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.slice(0, 6).map((n) => (
            <Link key={n.href} href={n.href} className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink/80 hover:text-bronze">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => setMenu(!menu)} className="text-[12px] font-semibold uppercase tracking-[0.14em] lg:hidden" aria-expanded={menu}>
            {menu ? "Close" : "Menu"}
          </button>
          <button onClick={() => setOpen(true)} className="btn !px-5 !py-2.5" aria-label="Open quote list">
            Quote list ({count})
          </button>
        </div>
      </div>
      {menu && (
        <nav className="border-t border-ink/10 bg-bone lg:hidden">
          <div className="wrap flex flex-col py-3">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setMenu(false)} className="border-b border-ink/10 py-3 font-display text-2xl font-semibold uppercase last:border-0">
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}