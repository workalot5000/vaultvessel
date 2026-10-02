import PageHead from "@/components/PageHead";
import ShopGrid from "@/components/ShopGrid";
import SpecTable from "@/components/SpecTable";
import CtaBand from "@/components/CtaBand";

export const metadata = {
  title: "Marine — outboard motors & dockside steel — VaultVessel LLC",
  description: "Outboard motors from 2.5 to 300 HP and dockside steel for South Florida water, priced by written quote.",
};

export default function Marine() {
  return (
    <>
      <PageHead
        eyebrow="Department 06"
        title="Marine"
        accent="power."
        lede="Outboard motors from 2.5 to 300 horsepower, plus dockside steel for gear, bait, and tackle. Filter by brand, horsepower, shaft, and start type."
      />
      <div className="wrap"><ShopGrid dept="marine" /></div>
      <section className="wrap mt-24 grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="font-display text-5xl font-semibold uppercase leading-[0.9]">Choosing a shaft length.</h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/70">
            Shaft length should match your transom height. Measure from the top of the transom to the bottom of the hull, and send it with your quote request. We confirm fit in the written quote.
          </p>
        </div>
        <SpecTable
          rows={[
            ["Short", "Transom height about 15 in"],
            ["Long", "Transom height about 20 in"],
            ["XL", "Transom height about 25 in"],
            ["XXL", "Transom height about 30 in"],
          ]}
        />
      </section>
      <CtaBand title="Send the boat details." accent="We'll match the motor." />
    </>
  );
}