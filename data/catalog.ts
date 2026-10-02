export type Dept = "containers" | "conversions" | "reefers" | "sanitation" | "tanks" | "marine";
export type Spec = [string, string];
export interface Product {
  slug: string;
  name: string;
  dept: Dept;
  group: string;
  condition: string;
  size: string;
  price: number; // REFERENCE PRICE, USD, "from"
  lead: string;
  specs: Spec[];
  motor?: { brand: string; hp: number; shaft: string; start: string };
}

export const DEPARTMENTS: { id: Dept; name: string; blurb: string }[] = [
  { id: "containers", name: "Containers", blurb: "New, one-trip, and used steel boxes from 10 to 45 feet." },
  { id: "conversions", name: "Converted spaces", blurb: "Offices, homes, pools, and workshops finished in steel." },
  { id: "reefers", name: "Reefers", blurb: "Refrigerated boxes and cold rooms for food, pharma, and events." },
  { id: "sanitation", name: "Restrooms", blurb: "Portable units, trailers, and restroom containers for any crowd." },
  { id: "tanks", name: "Site tanks", blurb: "Fuel, potable water, and wastewater storage on skids." },
  { id: "marine", name: "Marine", blurb: "Outboard motors and dockside steel for South Florida water." },
];

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

// Builds a product. `specs` is "Label=Value;Label=Value" (avoid ; and = inside values).
function p(name: string, dept: Dept, group: string, condition: string, size: string, price: number, lead: string, specs = ""): Product {
  return {
    slug: slugify(name), name, dept, group, condition, size, price, lead,
    specs: specs ? specs.split(";").map((s) => s.split("=") as Spec) : [],
  };
}

// Builds an outboard motor and fills the `motor` object that powers the motor filters.
function m(brand: string, hp: number, shaft: string, start: string, price: number, lead: string): Product {
  const name = `${brand} ${hp} HP Outboard, ${shaft} Shaft, ${start} Start`;
  const steer = hp <= 15 ? "Tiller" : "Remote";
  return {
    slug: slugify(name), name, dept: "marine", group: "Outboard motors", condition: "New", size: `${hp} HP`, price, lead,
    specs: [["Brand", brand], ["Power", `${hp} HP`], ["Shaft", shaft], ["Start", start], ["Cycle", "Four-stroke"], ["Steering", steer]],
    motor: { brand, hp, shaft, start },
  };
}

const S10 = "Exterior=10 × 8 × 8.5 ft;Interior=9.3 × 7.7 × 7.8 ft;Payload=~22,000 lb;Doors=Cargo doors, one end";
const S20 = "Exterior=20 × 8 × 8.5 ft;Interior=19.4 × 7.7 × 7.8 ft;Payload=~62,000 lb;Doors=Cargo doors, one end";
const S20H = "Exterior=20 × 8 × 9.5 ft;Interior=19.4 × 7.7 × 8.8 ft;Payload=~61,000 lb;Doors=Cargo doors, one end";
const S40 = "Exterior=40 × 8 × 8.5 ft;Interior=39.5 × 7.7 × 7.8 ft;Payload=~58,000 lb;Doors=Cargo doors, one end";
const S40H = "Exterior=40 × 8 × 9.5 ft;Interior=39.5 × 7.7 × 8.8 ft;Payload=~57,000 lb;Doors=Cargo doors, one end";
const S45 = "Exterior=45 × 8 × 9.5 ft;Interior=44.5 × 7.7 × 8.8 ft;Payload=~56,000 lb;Doors=Cargo doors, one end";
const R20 = "Exterior=20 × 8 × 8.5 ft;Temp range=-20°F to +65°F;Power=460V / 3-phase";

export const PRODUCTS: Product[] = [
  // ---------- Containers (27)
  p("20' Standard Container, New", "containers", "Shipping containers", "New", "20 ft", 4200, "A single-trip steel box with sealed doors and a clean marine-grade floor, ready for storage or conversion.", S20),
  p("20' Standard Container, One-Trip", "containers", "Shipping containers", "One-trip", "20 ft", 3400, "One ocean crossing, near-new paint, and tight door gaskets at a lower reference price than new.", S20),
  p("20' Standard Container, Wind & Water Tight", "containers", "Shipping containers", "Used", "20 ft", 2400, "Sound roof, sound walls, and dry interior. Cosmetic wear is expected and honest.", S20),
  p("20' Standard Container, Cargo-Worthy", "containers", "Shipping containers", "Used", "20 ft", 2100, "Certified to keep shipping. A workhorse for anyone moving freight rather than parking it.", S20),
  p("20' High Cube Container, New", "containers", "Shipping containers", "New", "20 ft HC", 4600, "An extra foot of interior height for shelving, racking, and comfortable conversions.", S20H),
  p("20' High Cube Container, One-Trip", "containers", "Shipping containers", "One-trip", "20 ft HC", 3900, "Extra interior height with only one ocean voyage behind it.", S20H),
  p("40' Standard Container, New", "containers", "Shipping containers", "New", "40 ft", 5600, "Long-span storage with a factory-fresh finish and corrosion-resistant coating.", S40),
  p("40' Standard Container, One-Trip", "containers", "Shipping containers", "One-trip", "40 ft", 4400, "One crossing, light wear, and a sound floor, at a gentler reference price than new.", S40),
  p("40' High Cube Container, New", "containers", "Shipping containers", "New", "40 ft HC", 5900, "The most requested box in the yard. Height and length for homes, offices, and warehouse overflow.", S40H),
  p("40' High Cube Container, One-Trip", "containers", "Shipping containers", "One-trip", "40 ft HC", 4800, "Near-new condition at a friendlier reference price. A favorite base for conversions.", S40H),
  p("40' Standard Container, Wind & Water Tight", "containers", "Shipping containers", "Used", "40 ft", 3300, "Practical storage for job sites, marinas, and back lots.", S40),
  p("40' High Cube Container, Wind & Water Tight", "containers", "Shipping containers", "Used", "40 ft HC", 3700, "Tall interior and a sound shell at a value reference price. A sensible conversion base.", S40H),
  p("45' High Cube Container, New", "containers", "Shipping containers", "New", "45 ft HC", 7200, "Five extra feet over a 40 for oversized inventory and long builds.", S45),
  p("10' Standard Container, New", "containers", "Shipping containers", "New", "10 ft", 3300, "Compact, forklift-friendly storage for tight lots and urban sites.", S10),
  p("10' Standard Container, Wind & Water Tight", "containers", "Shipping containers", "Used", "10 ft", 2200, "The small footprint answer for tools, files, and seasonal gear.", S10),
  p("20' Open-Top Container, New", "containers", "Specialty containers", "New", "20 ft", 5400, "Removable tarp roof for crane loading of tall or awkward cargo.", "Exterior=20 × 8 × 8.5 ft;Roof=Removable tarp and bows;Payload=~60,000 lb"),
  p("20' Open-Top Container, Used", "containers", "Specialty containers", "Used", "20 ft", 3900, "Top-loading steel at a lower reference price, with a serviceable tarp roof.", "Exterior=20 × 8 × 8.5 ft;Roof=Removable tarp and bows;Payload=~60,000 lb"),
  p("40' Open-Top Container, One-Trip", "containers", "Specialty containers", "One-trip", "40 ft", 7300, "Top-loading capacity for machinery, pipe, and oversized freight.", "Exterior=40 × 8 × 8.5 ft;Roof=Removable tarp and bows;Payload=~57,000 lb"),
  p("20' Open-Side Container, New", "containers", "Specialty containers", "New", "20 ft", 6400, "Full-width side doors for pallet access, pop-up retail, and workshops.", "Exterior=20 × 8 × 8.5 ft;Side access=Full-length double doors;Payload=~60,000 lb"),
  p("40' Open-Side Container, New", "containers", "Specialty containers", "New", "40 ft", 8900, "Full-length side access for long loads, pop-up retail, and workshop layouts.", "Exterior=40 × 8 × 8.5 ft;Side access=Full-length double doors;Payload=~57,000 lb"),
  p("20' Double-Door Container, New", "containers", "Specialty containers", "New", "20 ft", 4900, "Cargo doors on both ends for drive-through access and cross-ventilation.", "Exterior=20 × 8 × 8.5 ft;Doors=Cargo doors, both ends;Payload=~60,000 lb"),
  p("20' Insulated Container, New", "containers", "Specialty containers", "New", "20 ft", 6800, "Insulated walls and ceiling hold steadier temperatures for sensitive storage.", "Exterior=20 × 8 × 8.5 ft;Walls=Insulated;Doors=Cargo doors, one end;Payload=~58,000 lb"),
  p("20' Flat Rack, Used", "containers", "Specialty containers", "Used", "20 ft", 6200, "Collapsible-end platform for heavy, wide, or over-height loads.", "Length=20 ft;Ends=Folding;Payload=~68,000 lb"),
  p("40' Flat Rack, Used", "containers", "Specialty containers", "Used", "40 ft", 8800, "Open platform for machinery and construction equipment.", "Length=40 ft;Ends=Folding;Payload=~88,000 lb"),
  p("40' High Cube Double-Door Container, New", "containers", "Specialty containers", "New", "40 ft HC", 6900, "Doors on both ends for drive-through loading and easy conversions.", "Exterior=40 × 8 × 9.5 ft;Doors=Cargo doors, both ends;Payload=~57,000 lb"),
  p("Heavy-Duty Container Lock Box", "containers", "Container accessories", "New", "Accessory", 120, "A shrouded steel lock box that shields the padlock from bolt cutters.", "Fits=Standard cargo door hardware;Material=Hardened steel"),
  p("Container Shelving Kit, 20 ft", "containers", "Container accessories", "New", "Kit", 650, "Bolt-in steel shelving for a 20-foot interior, built for tools and inventory.", "Fits=20' containers;Material=Powder-coated steel;Install=Bolt-in"),

  // ---------- Converted spaces (19)
  p("20' Site Office", "conversions", "Offices", "Custom build", "20 ft", 14800, "Insulated, wired, and climate-controlled with a windowed front and a locking steel door.", "Base=20' container;Finish=Insulated, paneled interior;Power=Panel, outlets, lighting;Climate=Mini-split A/C"),
  p("40' Site Office, Two-Room", "conversions", "Offices", "Custom build", "40 ft", 26500, "Two rooms with a partition wall, ideal for a foreman's office and a meeting space.", "Base=40' container;Rooms=Two;Power=Panel, outlets, lighting;Climate=Dual mini-split"),
  p("20' Backyard Studio Office", "conversions", "Offices", "Custom build", "20 ft", 22800, "A quiet backyard office with glazing, insulation, and a finished interior.", "Base=20' HC container;Windows=Large front glazing;Climate=Mini-split;Finish=Paneled and painted"),
  p("20' Security Booth", "conversions", "Offices", "Custom build", "20 ft", 9800, "A gate-side booth with a sliding window, desk, and A/C for guards and attendants.", "Base=20' container;Window=Sliding service window;Climate=Mini-split;Power=Panel, outlets, lighting"),
  p("40' Classroom", "conversions", "Offices", "Custom build", "40 ft", 48000, "A bright, insulated teaching or training room with windows on both sides.", "Base=40' HC container;Windows=Both sides;Climate=Dual mini-split;Finish=Paneled and painted"),
  p("20' Studio Residence", "conversions", "Homes", "Custom build", "20 ft", 38900, "A compact living space with kitchenette, bath, sleeping area, and full insulation.", "Base=20' container;Layout=Studio with bath;Kitchen=Kitchenette;Climate=Mini-split"),
  p("20' Guest Suite with Bath", "conversions", "Homes", "Custom build", "20 ft", 44500, "A backyard guest suite with private bath, built for Florida heat and humidity.", "Base=20' HC container;Layout=Suite with bath;Climate=Mini-split;Finish=Moisture-rated interior"),
  p("40' One-Bedroom Residence", "conversions", "Homes", "Custom build", "40 ft", 69500, "One bedroom, full bath, open kitchen and living area. Finished to move-in standard.", "Base=40' HC container;Layout=1 bed, 1 bath;Kitchen=Full;Climate=Mini-split"),
  p("40' Two-Bedroom Residence", "conversions", "Homes", "Custom build", "40 ft", 92000, "Two compact bedrooms, a full bath, and an open kitchen inside a single high-cube box.", "Base=40' HC container;Layout=2 bed, 1 bath;Kitchen=Full;Climate=Multi-zone mini-split"),
  p("Twin 40' Two-Bedroom Residence", "conversions", "Homes", "Custom build", "2 × 40 ft", 129000, "Two joined containers with two bedrooms, two baths, and a great room with generous glazing.", "Base=2 × 40' HC containers;Layout=2 bed, 2 bath;Kitchen=Full;Climate=Multi-zone"),
  p("20' Plunge Pool", "conversions", "Pools", "Custom build", "20 ft", 29800, "A steel-framed cooling pool sized for small yards, complete with liner and filtration.", "Base=20' container;Depth=Approx. 4.5 ft;Includes=Liner, pump, filter;Install=Site prep by others"),
  p("40' Lap Pool", "conversions", "Pools", "Custom build", "40 ft", 58000, "Long, narrow, and made for swimming laps. Optional viewing window.", "Base=40' HC container;Depth=Approx. 5 ft;Includes=Liner, pump, filter;Install=Site prep by others"),
  p("20' Workshop", "conversions", "Work spaces", "Custom build", "20 ft", 12900, "Lit, wired, and ventilated, with a work bench and wall-mounted storage.", "Base=20' container;Power=Panel, outlets, lighting;Ventilation=Louvers and fan;Storage=Wall rails"),
  p("40' Workshop with Roll-Up Door", "conversions", "Work spaces", "Custom build", "40 ft", 24500, "A long workshop with a roll-up door, bright lighting, and wall power at bench height.", "Base=40' HC container;Door=Roll-up;Power=Panel, outlets, lighting;Ventilation=Louvers and fan"),
  p("20' Secure Tool Crib", "conversions", "Work spaces", "Custom build", "20 ft", 8900, "Heavy-duty shelving and a hardened lock box keep tools accounted for on active sites.", "Base=20' container;Shelving=Heavy-duty steel;Lock=Shrouded lock box;Lighting=LED"),
  p("20' Gym Pod", "conversions", "Work spaces", "Custom build", "20 ft", 24500, "Rubber flooring, mirrored wall, and climate control in a private steel pod.", "Base=20' HC container;Floor=Rubber;Climate=Mini-split;Wall=Mirror panels"),
  p("20' Sauna Pod", "conversions", "Wellness", "Custom build", "20 ft", 34000, "A cedar-lined sauna with a changing area inside a steel shell.", "Base=20' container;Interior=Cedar-lined;Layout=Sauna and changing area;Power=Dedicated circuit"),
  p("40' Café Kiosk", "conversions", "Retail", "Custom build", "40 ft", 61000, "A serving window, counter, and prep area finished for food and beverage operators.", "Base=40' HC container;Window=Awning service window;Power=Commercial panel;Finish=Washable surfaces"),
  p("20' Pop-Up Retail Shop", "conversions", "Retail", "Custom build", "20 ft", 27500, "A display window, counter, and lockable shutter turn a steel box into a storefront.", "Base=20' container;Window=Display window with shutter;Power=Panel, outlets, lighting;Finish=Paneled interior"),

  // ---------- Reefers (10)
  p("20' Reefer, Used", "reefers", "Refrigerated containers", "Used", "20 ft", 9800, "A working refrigerated box with a serviced cooling unit.", R20),
  p("20' Reefer, One-Trip", "reefers", "Refrigerated containers", "One-trip", "20 ft", 15800, "A compact refrigerated box with one voyage behind it and a clean interior.", R20),
  p("20' Reefer, New", "reefers", "Refrigerated containers", "New", "20 ft", 22500, "A factory-fresh refrigerated container for small operators who want the longest service life.", R20),
  p("40' Reefer, Used", "reefers", "Refrigerated containers", "Used", "40 ft", 12800, "Serious cold storage capacity for produce, seafood, and events.", "Exterior=40 × 8 × 8.5 ft;Temp range=-20°F to +65°F;Power=460V / 3-phase"),
  p("40' High Cube Reefer, One-Trip", "reefers", "Refrigerated containers", "One-trip", "40 ft HC", 21500, "A near-new refrigerated container with extra cubic capacity.", "Exterior=40 × 8 × 9.5 ft;Temp range=-20°F to +65°F;Power=460V / 3-phase"),
  p("40' High Cube Reefer, New", "reefers", "Refrigerated containers", "New", "40 ft HC", 32000, "A factory-fresh unit with the longest expected service life.", "Exterior=40 × 8 × 9.5 ft;Temp range=-20°F to +65°F;Power=460V / 3-phase"),
  p("20' Cold Room Conversion", "reefers", "Cold rooms", "Custom build", "20 ft", 19500, "A stationary walk-in cooler with shelving, sealed floor, and 120/240V power.", "Base=20' insulated container;Temp=34-40°F;Power=Single-phase;Floor=Sealed"),
  p("20' Freezer Room Conversion", "reefers", "Cold rooms", "Custom build", "20 ft", 24500, "A stationary walk-in freezer sized for restaurants, caterers, and small distributors.", "Base=20' insulated container;Temp=-10°F to 0°F;Power=Three-phase;Floor=Sealed"),
  p("40' Freezer Room Conversion", "reefers", "Cold rooms", "Custom build", "40 ft", 34500, "A walk-in freezer for caterers, distributors, and seasonal overflow.", "Base=40' insulated container;Temp=-10°F to 0°F;Power=Three-phase;Floor=Sealed"),
  p("40' Reefer with Genset Skid", "reefers", "Cold rooms", "Custom build", "40 ft", 27500, "A refrigerated container paired with a diesel genset for off-grid operation.", "Base=40' reefer;Genset=Diesel skid;Runtime=Tank-dependent;Use=Off-grid events, remote sites"),

  // ---------- Restrooms (11)
  p("Standard Portable Restroom", "sanitation", "Portable units", "New", "1 unit", 980, "Rugged polyethylene shell with a vented roof and privacy latch.", "Type=Single stall;Material=Polyethylene;Ventilation=Roof vent"),
  p("Portable Restroom with Sink", "sanitation", "Portable units", "New", "1 unit", 1280, "A standard stall with an integrated hand sink, so no second station is needed.", "Type=Single stall with sink;Material=Polyethylene;Water=Integrated sink tank"),
  p("ADA Portable Restroom", "sanitation", "Portable units", "New", "1 unit", 1450, "A wide-door accessible unit with grab rails and a wheelchair turn radius.", "Type=Single stall, ADA;Material=Polyethylene;Access=Wide door, grab rails"),
  p("Flushing Portable Restroom", "sanitation", "Portable units", "New", "1 unit", 1850, "A flush-style unit with a freshwater tank for events that expect more comfort.", "Type=Single stall, flushing;Material=Polyethylene;Water=Fresh tank, foot pump"),
  p("Twin-Sink Handwash Station", "sanitation", "Portable units", "New", "1 unit", 1350, "Two-basin foot-pump station for job sites and events.", "Type=Handwash;Basins=2;Tank=Fresh and grey, integrated"),
  p("2-Stall Restroom Trailer", "sanitation", "Restroom trailers", "New", "2 stalls", 14900, "A towable restroom with sinks, flush toilets, and interior lighting.", "Type=Towable trailer;Stalls=2;Water=Fresh and waste tanks;Power=Shore or generator"),
  p("Single-Stall ADA Restroom Trailer", "sanitation", "Restroom trailers", "New", "1 stall", 17800, "A towable accessible restroom with ramp access, grab rails, and a wide interior.", "Type=Towable trailer, ADA;Stalls=1;Access=Ramp, grab rails;Power=Shore or generator"),
  p("4-Stall Luxury Restroom Trailer", "sanitation", "Restroom trailers", "New", "4 stalls", 42500, "Climate-controlled, hardwood-finished, and made for weddings and premium events.", "Type=Towable trailer;Stalls=4;Climate=A/C and heat;Finish=Vanity, mirrors, lighting"),
  p("Shower Trailer, 4 Stalls", "sanitation", "Restroom trailers", "New", "4 stalls", 38000, "Four private stalls with hot water and changing benches.", "Type=Towable trailer;Stalls=4;Water=Heated;Power=Shore or generator"),
  p("20' Restroom Container, 3 Stalls", "sanitation", "Restroom containers", "Custom build", "20 ft", 31500, "A permanent-grade steel restroom block for parks, marinas, and job camps.", "Base=20' container;Stalls=3;Plumbing=Stub-out connections;Finish=Washable surfaces"),
  p("40' Restroom & Shower Container", "sanitation", "Restroom containers", "Custom build", "40 ft", 52000, "Separate restroom and shower rooms in one steel block for camps, yards, and marinas.", "Base=40' container;Rooms=Restroom and shower;Plumbing=Stub-out connections;Finish=Washable surfaces"),

  // ---------- Site tanks (12)
  p("275-Gallon Fuel Tote", "tanks", "Fuel tanks", "New", "275 gal", 1250, "A caged tote for portable fuel storage on smaller sites.", "Capacity=275 gal;Frame=Steel cage;Fittings=Top fill, bottom valve"),
  p("500-Gallon Skid Diesel Tank", "tanks", "Fuel tanks", "New", "500 gal", 3600, "A compact skid tank with a lockable cap and a fill-and-transfer setup.", "Capacity=500 gal;Wall=Single with containment;Fittings=Fill, vent, gauge"),
  p("1,000-Gallon Double-Wall Fuel Tank", "tanks", "Fuel tanks", "New", "1,000 gal", 7200, "Double-wall construction for cleaner compliance and safer storage.", "Capacity=1,000 gal;Wall=Double;Fittings=Fill, vent, gauge, pump-ready"),
  p("2,000-Gallon Double-Wall Fuel Tank", "tanks", "Fuel tanks", "New", "2,000 gal", 11800, "Mid-size fuel storage for construction fleets and marinas.", "Capacity=2,000 gal;Wall=Double;Fittings=Fill, vent, gauge, pump-ready"),
  p("5,000-Gallon Double-Wall Fuel Tank", "tanks", "Fuel tanks", "New", "5,000 gal", 26500, "Bulk fuel storage for depots, farms, and industrial yards.", "Capacity=5,000 gal;Wall=Double;Fittings=Fill, vent, gauge, pump-ready"),
  p("500-Gallon Potable Water Tank", "tanks", "Water tanks", "New", "500 gal", 1300, "Food-safe storage sized for small crews and temporary facilities.", "Capacity=500 gal;Material=Food-safe poly;Fittings=Fill, outlet, vent"),
  p("1,000-Gallon Potable Water Tank", "tanks", "Water tanks", "New", "1,000 gal", 2400, "Food-safe polyethylene for job site hydration, wash-down, and events.", "Capacity=1,000 gal;Material=Food-safe poly;Fittings=Fill, outlet, vent"),
  p("3,000-Gallon Site Water Tank", "tanks", "Water tanks", "New", "3,000 gal", 5800, "A large water reservoir for construction sites and remote camps.", "Capacity=3,000 gal;Material=Food-safe poly;Fittings=Fill, outlet, vent"),
  p("5,000-Gallon Potable Water Tank", "tanks", "Water tanks", "New", "5,000 gal", 8800, "Large-capacity water storage for farms, camps, and extended projects.", "Capacity=5,000 gal;Material=Food-safe poly;Fittings=Fill, outlet, vent"),
  p("1,500-Gallon Wastewater Holding Tank", "tanks", "Water tanks", "New", "1,500 gal", 3900, "Sealed holding tank for restroom, kitchen, and temporary facility waste.", "Capacity=1,500 gal;Material=Heavy-duty poly;Fittings=Inlet, vent, pump-out"),
  p("10,000-Gallon Wastewater Holding Tank", "tanks", "Water tanks", "New", "10,000 gal", 14500, "High-capacity holding for long-term facilities and larger restroom setups.", "Capacity=10,000 gal;Material=Heavy-duty poly;Fittings=Inlet, vent, pump-out"),
  p("20' ISO Tank Container", "tanks", "Bulk tanks", "Used", "20 ft", 18500, "A stainless steel tank in a standard ISO frame for liquid bulk storage.", "Frame=20' ISO;Capacity=~6,000 gal;Material=Stainless steel;Valves=Top and bottom"),

  // ---------- Marine (26)
  m("Yamaha", 2.5, "Short", "Manual", 1150, "A featherweight portable motor for dinghies and kicker duty."),
  m("Tohatsu", 6, "Short", "Manual", 1750, "Light, simple, and dependable for small skiffs and tenders."),
  m("Yamaha", 9.9, "Short", "Manual", 3100, "A simple, reliable tiller motor for small skiffs and tenders."),
  m("Suzuki", 9.9, "Short", "Electric", 3200, "Push-button start with tiller steering for small boats and tenders."),
  m("Mercury", 15, "Short", "Manual", 3400, "A rugged 15 for jon boats, small skiffs, and inflatables."),
  m("Honda", 20, "Long", "Manual", 4400, "A long-shaft 20 with quiet running for small fishing boats."),
  m("Yamaha", 25, "Long", "Electric", 5200, "Long shaft and electric start for mid-size skiffs and flats boats."),
  m("Mercury", 25, "Short", "Manual", 4600, "A light, manual-start 25 for small utility boats."),
  m("Honda", 30, "Short", "Electric", 5900, "Smooth and quiet with excellent fuel economy for utility skiffs."),
  m("Suzuki", 40, "Long", "Electric", 6900, "A versatile mid-power option for bay boats and workboats."),
  m("Tohatsu", 40, "Long", "Electric", 6500, "A straightforward 40 for workboats and family skiffs."),
  m("Mercury", 60, "Long", "Electric", 8900, "Punchy mid-range power with simple maintenance."),
  m("Yamaha", 90, "Long", "Electric", 12900, "A proven 90 for center consoles and family runabouts."),
  m("Honda", 90, "Long", "Electric", 12400, "Quiet, efficient power for pontoons and mid-size runabouts."),
  m("Suzuki", 115, "Long", "Electric", 14900, "A balanced mid-power motor for pontoons and offshore skiffs."),
  m("Mercury", 150, "XL", "Electric", 17900, "Strong torque and good range for 20-24 ft center consoles."),
  m("Yamaha", 150, "XL", "Electric", 18400, "Dependable mid-high power for bay boats and center consoles."),
  m("Suzuki", 175, "XL", "Electric", 20500, "A step up in thrust for heavier hulls and longer runs."),
  m("Yamaha", 200, "XL", "Electric", 22900, "High-output power for larger center consoles and bay boats."),
  m("Suzuki", 250, "XL", "Electric", 26500, "Big-boat performance for offshore fishing and long runs."),
  m("Yamaha", 300, "XXL", "Electric", 30500, "Flagship power for larger offshore center consoles."),
  m("Mercury", 300, "XXL", "Electric", 31500, "Top-tier output for large offshore boats and twin installations."),
  p("Steel Outboard Stand", "marine", "Outboard accessories", "New", "Accessory", 210, "A freestanding steel stand for storing or servicing outboards up to mid-size horsepower.", "Material=Powder-coated steel;Use=Storage and service;Fits=Outboards up to mid-size HP"),
  p("20' Boat & Gear Locker", "marine", "Dockside steel", "Custom build", "20 ft", 9200, "A ventilated steel locker with racks for rods, lines, fenders, and outboard storage.", "Base=20' container;Ventilation=Louvers;Storage=Racks and shelving;Lock=Shrouded lock box"),
  p("40' Marina Gear Storage", "marine", "Dockside steel", "Custom build", "40 ft", 7800, "A ventilated steel container with racks and shelving for dock lines, fenders, and seasonal gear.", "Base=40' container;Ventilation=Louvers;Storage=Racks and shelving;Lock=Shrouded lock box"),
  p("20' Dockside Bait & Tackle Shop", "marine", "Dockside steel", "Custom build", "20 ft", 32000, "A dockside retail shop with service window, counter, and refrigeration-ready power.", "Base=20' container;Window=Awning service window;Power=Commercial panel;Finish=Washable surfaces"),
];

export const FEATURED = [
  "40-high-cube-container-new",
  "20-site-office",
  "40-one-bedroom-residence",
  "40-high-cube-reefer-one-trip",
  "1-000-gallon-double-wall-fuel-tank",
  "yamaha-90-hp-outboard-long-shaft-electric-start",
];

// Fail fast with a clear message if the catalog is edited incorrectly.
const seen = new Set<string>();
for (const x of PRODUCTS) {
  if (seen.has(x.slug)) throw new Error(`catalog.ts: duplicate product slug "${x.slug}". Product names must be unique.`);
  seen.add(x.slug);
}
for (const s of FEATURED) {
  if (!seen.has(s)) throw new Error(`catalog.ts: FEATURED slug "${s}" does not match any product.`);
}