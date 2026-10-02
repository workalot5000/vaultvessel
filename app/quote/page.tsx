import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a quote — VaultVessel LLC",
  robots: { index: false, follow: true },
};

export default function QuotePage() {
  return (
    <div className="wrap pb-10 pt-16 md:pt-24">
      <p className="eyebrow">Written quotes only</p>
      <h1 className="mb-14 mt-4 font-display text-[clamp(3.5rem,11vw,9rem)] font-semibold uppercase leading-[0.86]">Request a <span className="text-bronze">quote.</span></h1>
      <QuoteForm />
    </div>
  );
}