import { PRODUCTS, type Product } from "@/data/catalog";

// Same department only. Same type ranks first, then closest reference price,
// then matching condition (and matching brand for outboard motors).
export function relatedProducts(p: Product, n = 4): Product[] {
  return PRODUCTS.filter((x) => x.slug !== p.slug && x.dept === p.dept)
    .map((x) => {
      const sameGroup = x.group === p.group ? 2 : 0;
      const closeness = 1 - Math.min(1, Math.abs(Math.log(x.price / p.price)) / 2);
      const sameCondition = x.condition === p.condition ? 0.3 : 0;
      const sameBrand = x.motor && p.motor && x.motor.brand === p.motor.brand ? 0.3 : 0;
      return { x, score: sameGroup + closeness + sameCondition + sameBrand };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((r) => r.x);
}