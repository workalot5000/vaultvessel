import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEPARTMENTS, PRODUCTS, type Dept } from "@/data/catalog";
import { DEPT_SLUG, slugToDept } from "@/lib/routes";
import { DEPT_COPY } from "@/lib/dept-copy";
import PageHead from "@/components/PageHead";
import ShopGrid from "@/components/ShopGrid";
import SpecTable from "@/components/SpecTable";
import CtaBand from "@/components/CtaBand";

type P = { params: { dept: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return (Object.keys(DEPT_COPY) as Dept[]).map((d) => ({ dept: DEPT_SLUG[d] }));
}

export function generateMetadata({ params }: P): Metadata {
  const d = slugToDept(params.dept);
  const dept = DEPARTMENTS.find((x) => x.id === d);
  const c = d ? DEPT_COPY[d] : undefined;
  if (!dept || !c) return {};
  const n = PRODUCTS.filter((p) => p.dept === dept.id).length;
  const title = `${dept.name} — Reference Prices & Quotes | VaultVessel LLC`;
  const description = `${c.lede} ${n} products with reference prices in USD. Quote only, from Miami, FL.`;
  const url = `/${params.dept}`;
  return { title, description, alternates: { canonical: url }, openGraph: { type: "website", title, description, url } };
}

export default function DeptPage({ params }: P) {
  const dept = slugToDept(params.dept);
  const c = dept ? DEPT_COPY[dept] : undefined;
  if (!dept || !c) notFound();
  return (
    <>
      <PageHead eyebrow={c.eyebrow} title={c.title} accent={c.accent} lede={c.lede} />
      <div className="wrap"><ShopGrid dept={dept} /></div>
      <section className="wrap mt-24 grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <h2 className="font-display text-5xl font-semibold uppercase leading-[0.9]">{c.guideTitle}</h2>
        <SpecTable rows={c.guide} />
      </section>
      <CtaBand />
    </>
  );
}