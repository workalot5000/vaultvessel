import type { Dept, Spec } from "@/data/catalog";

export type DeptCopy = { eyebrow: string; title: string; accent: string; lede: string; guideTitle: string; guide: Spec[] };

// Used by app/[dept]/page.tsx. Converted spaces and Marine have their own pages.
export const DEPT_COPY: Partial<Record<Dept, DeptCopy>> = {
  containers: {
    eyebrow: "Department 01",
    title: "Shipping",
    accent: "containers.",
    lede: "New, one-trip, and used boxes from 10 to 45 feet, plus open-top, open-side, and flat-rack units for loads that do not fit the usual mold.",
    guideTitle: "Reading the grades",
    guide: [
      ["New", "Built for a single voyage, with fresh paint and tight door gaskets."],
      ["One-trip", "Has crossed the ocean once. Light wear, near-new condition."],
      ["Wind & water tight", "Sealed against rain and wind. Cosmetic wear is expected."],
      ["Cargo-worthy", "Certified to keep shipping, not only to sit on a lot."],
      ["High cube", "About one extra foot of interior height over a standard box."],
    ],
  },
  reefers: {
    eyebrow: "Department 03",
    title: "Reefers &",
    accent: "cold rooms.",
    lede: "Refrigerated containers for transport and storage, plus stationary cold and freezer rooms built from insulated steel.",
    guideTitle: "Before you choose",
    guide: [
      ["Reefer units", "Refrigerated containers with a built-in cooling unit, listed with their temperature range."],
      ["Power", "Most reefer units run on three-phase power. Each product page lists what the unit needs."],
      ["Cold rooms", "Stationary walk-ins built for ordinary site power. Requirements are listed per product."],
      ["Genset option", "Pairs a refrigerated box with a diesel generator for sites without a power supply."],
    ],
  },
  sanitation: {
    eyebrow: "Department 04",
    title: "Restrooms",
    accent: "& showers.",
    lede: "Portable units, towable trailers, and permanent-grade restroom containers, sized for job sites, events, parks, and marinas.",
    guideTitle: "Picking the format",
    guide: [
      ["Portable units", "Single-stall polyethylene units, with accessible and handwash options."],
      ["Trailers", "Towable restrooms and showers with water tanks and interior lighting."],
      ["Restroom containers", "Steel blocks with stub-out plumbing for longer-term sites."],
      ["Service", "Servicing and pump-out arrangements are discussed in your written quote."],
    ],
  },
  tanks: {
    eyebrow: "Department 05",
    title: "Site",
    accent: "tanks.",
    lede: "Fuel, potable water, and wastewater storage, from 500-gallon skid tanks to bulk ISO tank containers.",
    guideTitle: "Tank notes",
    guide: [
      ["Fuel tanks", "Wall type and fittings are listed on each product page."],
      ["Water tanks", "Food-safe polyethylene for potable and wash-down use."],
      ["Wastewater", "Heavy-duty holding tanks with inlet, vent, and pump-out fittings."],
      ["Bulk", "ISO tank containers for liquid bulk storage in a standard frame."],
    ],
  },
};