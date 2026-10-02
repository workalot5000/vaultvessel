import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";
import { PRODUCTS } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Shop the Catalog — Reference Prices | VaultVessel LLC",
  description: `Browse ${PRODUCTS.length} shipping containers, converted spaces, reefers, restrooms, site tanks, and outboard motors with reference prices in USD. Quote only.`,
  alternates: { canonical: "/shop" },
};

export default function Shop({ searchParams }: { searchParams: { dept?: string } }) {
  return (
    <div className="wrap pb-10 pt-16 md:pt-24">
      <p className="eyebrow">Catalog · Reference prices in USD</p>
      <h1 className="mb-12 mt-4 font-display text-[clamp(3.5rem,11vw,9rem)] font-semibold uppercase leading-[0.86]">The catalog.</h1>
      <ShopGrid initialDept={searchParams.dept} />
    </div>
  );
}