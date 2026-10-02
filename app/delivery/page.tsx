import PageHead from "@/components/PageHead";
import SpecTable from "@/components/SpecTable";
import CtaBand from "@/components/CtaBand";

export const metadata = {
  title: "Delivery — VaultVessel LLC",
  description: "How delivery works from Miami, Florida, and what your site needs for a smooth drop. Freight is confirmed in a written quote.",
};

const STEPS = [
  ["01", "Send your address", "Add your delivery city, ZIP, or port to the quote form."],
  ["02", "We check the route", "We review access, unloading space, and the right truck for your site."],
  ["03", "Written quote", "Freight, tax, availability, and final price arrive together, in writing."],
  ["04", "Drop and placement", "The unit is unloaded and placed on your prepared ground."],
];
const AREAS = [
  ["South Florida", "Local delivery from our Miami base, quoted to your address."],
  ["Florida and the Southeast", "Regional delivery quoted by route and unit."],
  ["Beyond", "Out-of-state and port shipments quoted case by case."],
];

export default function Delivery() {
  return (
    <>
      <PageHead
        eyebrow="Delivery · Miami, Florida"
        title="Delivered"
        accent="to the pad."
        lede="Every delivery is priced to your address and confirmed in writing. Here is what to expect, and what we need from your site."
      />
      <section className="wrap grid gap-10 border-t border-ink pt-10 md:grid-cols-4">
        {STEPS.map(([n, t, d]) => (
          <div key={n}>
            <p className="font-display text-xl tracking-widest text-bronze">{n}</p>
            <h2 className="mt-3 font-display text-2xl font-semibold uppercase">{t}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{d}</p>
          </div>
        ))}
      </section>
      <section className="wrap mt-24 grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="font-display text-5xl font-semibold uppercase leading-[0.9]">Typical site requirements.</h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/70">Requirements vary by unit and truck. Your written quote lists what applies to your site.</p>
        </div>
        <SpecTable
          rows={[
            ["Approach", "A clear, firm route wide enough for a tilt-bed or flatbed truck."],
            ["Overhead", "Clearance from wires, branches, and signs along the route and at the drop."],
            ["Ground", "Level, compacted ground. Blocking or a pad can be arranged."],
            ["Unload space", "The length of the unit plus room for the truck to maneuver."],
            ["Access", "Someone available on site to direct placement."],
          ]}
        />
      </section>
      <section className="wrap mt-24 grid gap-10 md:grid-cols-3">
        {AREAS.map(([t, d]) => (
          <div key={t} className="border-t border-ink pt-6">
            <h3 className="font-display text-3xl font-semibold uppercase">{t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{d}</p>
          </div>
        ))}
      </section>
      <CtaBand title="Give us the address." accent="We'll confirm the freight." />
    </>
  );
}