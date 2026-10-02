import { DEPARTMENTS, type Product } from "@/data/catalog";

export type Sel = Record<string, string[]>;
export type Group = { key: string; label: string; opts: { id: string; label: string; n: number }[] };

export const PRICE_BANDS = [
  { id: "u5", label: "Under $5,000", min: 0, max: 5000 },
  { id: "5-15", label: "$5,000–$15,000", min: 5000, max: 15000 },
  { id: "15-40", label: "$15,000–$40,000", min: 15000, max: 40000 },
  { id: "40p", label: "$40,000+", min: 40000, max: Infinity },
];
export const HP_BANDS = [
  { id: "hp1", label: "Up to 15 HP", min: 0, max: 15 },
  { id: "hp2", label: "16–60 HP", min: 16, max: 60 },
  { id: "hp3", label: "61–150 HP", min: 61, max: 150 },
  { id: "hp4", label: "151+ HP", min: 151, max: Infinity },
];
const SIZE_KEYS = ["10 ft", "20 ft", "40 ft", "45 ft"];
const SHAFTS = ["Short", "Long", "XL", "XXL"];
const STARTS = ["Manual", "Electric"];

export function sizeKey(p: Product): string | null {
  const m = p.size.match(/(\d+)\s*ft/);
  if (!m) return null;
  const k = `${Number(m[1])} ft`;
  return SIZE_KEYS.includes(k) ? k : null;
}

const inPrice = (p: Product, id: string) => {
  const b = PRICE_BANDS.find((x) => x.id === id);
  return !!b && p.price >= b.min && p.price < b.max;
};
const inHp = (hp: number, id: string) => {
  const b = HP_BANDS.find((x) => x.id === id);
  return !!b && hp >= b.min && hp <= b.max;
};

export function matches(p: Product, s: Sel): boolean {
  const on = (k: string) => (s[k]?.length ?? 0) > 0;
  if (on("dept") && !s.dept.includes(p.dept)) return false;
  if (on("group") && !s.group.includes(p.group)) return false;
  if (on("condition") && !s.condition.includes(p.condition)) return false;
  if (on("size")) {
    const k = sizeKey(p);
    if (!k || !s.size.includes(k)) return false;
  }
  if (on("price") && !s.price.some((id) => inPrice(p, id))) return false;
  if (["brand", "hp", "shaft", "start"].some(on)) {
    const m = p.motor;
    if (!m) return false;
    if (on("brand") && !s.brand.includes(m.brand)) return false;
    if (on("hp") && !s.hp.some((id) => inHp(m.hp, id))) return false;
    if (on("shaft") && !s.shaft.includes(m.shaft)) return false;
    if (on("start") && !s.start.includes(m.start)) return false;
  }
  return true;
}

const uniq = (a: string[]) => Array.from(new Set(a));

export function facetGroups(scope: Product[], showDept: boolean): Group[] {
  const n = (f: (p: Product) => boolean) => scope.filter(f).length;
  const g: Group[] = [];
  if (showDept)
    g.push({ key: "dept", label: "Department", opts: DEPARTMENTS.map((d) => ({ id: d.id, label: d.name, n: n((p) => p.dept === d.id) })) });
  const groups = uniq(scope.map((p) => p.group));
  if (groups.length > 1) g.push({ key: "group", label: "Type", opts: groups.map((x) => ({ id: x, label: x, n: n((p) => p.group === x) })) });
  g.push({ key: "condition", label: "Condition", opts: uniq(scope.map((p) => p.condition)).map((c) => ({ id: c, label: c, n: n((p) => p.condition === c) })) });
  const sizes = SIZE_KEYS.filter((s) => scope.some((p) => sizeKey(p) === s));
  if (sizes.length) g.push({ key: "size", label: "Length", opts: sizes.map((s) => ({ id: s, label: s, n: n((p) => sizeKey(p) === s) })) });
  g.push({
    key: "price",
    label: "Reference price · USD",
    opts: PRICE_BANDS.map((b) => ({ id: b.id, label: b.label, n: n((p) => inPrice(p, b.id)) })).filter((o) => o.n > 0),
  });
  if (scope.some((p) => p.motor)) {
    const brands = uniq(scope.filter((p) => p.motor).map((p) => p.motor!.brand)).sort();
    g.push({ key: "brand", label: "Motor brand", opts: brands.map((b) => ({ id: b, label: b, n: n((p) => p.motor?.brand === b) })) });
    g.push({
      key: "hp",
      label: "Motor horsepower",
      opts: HP_BANDS.map((b) => ({ id: b.id, label: b.label, n: n((p) => !!p.motor && inHp(p.motor.hp, b.id)) })).filter((o) => o.n > 0),
    });
    g.push({ key: "shaft", label: "Shaft length", opts: SHAFTS.map((s) => ({ id: s, label: s, n: n((p) => p.motor?.shaft === s) })).filter((o) => o.n > 0) });
    g.push({ key: "start", label: "Start type", opts: STARTS.map((s) => ({ id: s, label: s, n: n((p) => p.motor?.start === s) })).filter((o) => o.n > 0) });
  }
  return g;
}