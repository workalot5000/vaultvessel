import PageHead from "@/components/PageHead";
import ShopGrid from "@/components/ShopGrid";
import CtaBand from "@/components/CtaBand";

export const metadata = {
  title: "Converted spaces — VaultVessel LLC",
  description: "Container offices, homes, pools, workshops, and kiosks finished in steel, priced by written quote.",
};

const INCLUDES = [
  ["Structure", "Openings for doors and windows are cut and framed, so the steel box keeps its strength."],
  ["Envelope", "Insulation and moisture control suited to Florida heat, with finishes chosen for humid air."],
  ["Systems", "Electrical, climate control, and plumbing stub-outs sized to the use, from tool crib to residence."],
];
const STEPS = [
  ["01", "Pick a starting point", "Choose the nearest layout in the catalog. Custom changes are welcome."],
  ["02", "Describe your site", "Tell us where it goes, how it will be used, and what finish you prefer."],
  ["03", "Receive a written quote", "Scope, freight, tax, availability, and final price are confirmed in writing."],
  ["04", "Build and deliver", "The unit is finished to the quoted scope and delivered to your prepared ground."],
];

export default function ConvertedSpaces() {
  return (
    <>
      <PageHead
        eyebrow="Department 02"
        title="Converted"
        accent="spaces."
        lede="Offices, homes, pools, workshops, and kiosks, finished inside a steel container. Start from a layout below, then tell us what to change."
      />
      <section className="wrap grid gap-10 border-y border-ink py-14 md:grid-cols-3">
        {INCLUDES.map(([t, d]) => (
          <div key={t}>
            <h2 className="font-display text-3xl font-semibold uppercase">{t}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{d}</p>
          </div>
        ))}
      </section>
      <div className="wrap mt-20"><ShopGrid dept="conversions" /></div>
      <section className="wrap mt-24">
        <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold uppercase leading-[0.9]">From box to built.</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-4">
          {STEPS.map(([n, t, d]) => (
            <div key={n} className="border-t border-ink pt-6">
              <p className="font-display text-xl tracking-widest text-bronze">{n}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold uppercase">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Describe the space." accent="We'll quote the build." />
    </>
  );
}