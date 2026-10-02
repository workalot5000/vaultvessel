"use client";
import { useMemo, useState } from "react";
import { DEPARTMENTS, PRODUCTS, type Dept } from "@/data/catalog";
import { facetGroups, matches, type Sel } from "@/lib/filters";
import ProductCard from "./ProductCard";

export default function ShopGrid({ dept, initialDept }: { dept?: Dept; initialDept?: string }) {
  const scope = useMemo(() => (dept ? PRODUCTS.filter((p) => p.dept === dept) : PRODUCTS), [dept]);
  const groups = useMemo(() => facetGroups(scope, !dept), [scope, dept]);
  const [sel, setSel] = useState<Sel>(() =>
    !dept && DEPARTMENTS.some((d) => d.id === initialDept) ? { dept: [initialDept as string] } : {}
  );
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("default");
  const [open, setOpen] = useState(false);

  const active = Object.values(sel).reduce((n, a) => n + a.length, 0);
  const toggle = (k: string, v: string) =>
    setSel((s) => {
      const cur = s[k] ?? [];
      return { ...s, [k]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });

  const list = useMemo(() => {
    const l = scope.filter((p) => matches(p, sel) && (!q || `${p.name} ${p.group}`.toLowerCase().includes(q.toLowerCase())));
    if (sort === "low") return [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...l].sort((a, b) => b.price - a.price);
    if (sort === "az") return [...l].sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [scope, sel, q, sort]);

  const reset = () => { setSel({}); setQ(""); };

  return (
    <div id="catalog">
      <div className="flex flex-wrap items-center gap-3 border-y border-ink py-4">
        <button onClick={() => setOpen(!open)} className="btn-ghost !py-2.5 lg:hidden">Filters{active ? ` (${active})` : ""}</button>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          className="min-w-0 flex-1 border border-ink/30 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-bronze lg:max-w-xs"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-ink/30 bg-transparent px-3 py-2.5 text-sm" aria-label="Sort">
          <option value="default">Sort: Featured</option>
          <option value="low">Reference price: low to high</option>
          <option value="high">Reference price: high to low</option>
          <option value="az">Name: A to Z</option>
        </select>
        <p className="eyebrow ml-auto">{list.length} products · reference prices in USD</p>
      </div>

      <div className="mt-8 grid gap-12 lg:grid-cols-[250px_1fr]">
        <aside className={`${open ? "block" : "hidden"} lg:block`}>
          {groups.map((g) => (
            <div key={g.key} className="border-t border-ink py-4">
              <p className="eyebrow pb-3">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {g.opts.map((o) => {
                  const on = !!sel[g.key]?.includes(o.id);
                  return (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(g.key, o.id)}
                      className={`border px-3 py-1.5 text-xs font-medium transition-colors ${on ? "border-ink bg-ink text-bone" : "border-ink/30 hover:border-bronze"}`}
                    >
                      {o.label} <span className="opacity-50">{o.n}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {active > 0 && (
            <button onClick={reset} className="mt-2 text-xs font-semibold uppercase tracking-widest text-bronze hover:underline">Clear all filters</button>
          )}
        </aside>

        <div>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          {list.length === 0 && (
            <div className="py-20">
              <p className="text-ink/70">No matches. Loosen a filter, or tell us what you need through the quote form.</p>
              <button onClick={reset} className="btn-ghost mt-5">Clear filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}