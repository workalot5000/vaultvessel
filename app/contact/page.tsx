import Link from "next/link";
import PageHead from "@/components/PageHead";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Contact — VaultVessel LLC",
  description: "Contact VaultVessel LLC in Miami, Florida. For priced items, build a quote list and send it through the quote form.",
};

export default function Contact() {
  return (
    <>
      <PageHead eyebrow="Contact" title="Talk to" accent="VaultVessel." lede="Questions about a conversion, delivery, or a motor fit? Write to us. For priced items, build a quote list instead." />
      <section className="wrap grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-8">
          <div className="border-t border-ink pt-5">
            <p className="eyebrow">Ready for prices?</p>
            <p className="mt-3 max-w-sm text-ink/75">Add products to your quote list and send it. We reply with a written quote covering freight, tax, availability, and final price.</p>
            <Link href="/quote" className="btn mt-5">Start a quote</Link>
          </div>
          <div className="border-t border-ink pt-5 text-sm">
            <p className="eyebrow">Reach us</p>
            <p className="mt-3">{SITE.city}</p>
            <p className="mt-1"><a className="hover:text-bronze" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            <p className="mt-1"><a className="hover:text-bronze" href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}>{SITE.phone}</a></p>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}