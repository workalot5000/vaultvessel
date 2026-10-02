import type { Dept } from "@/data/catalog";

export const DEPT_SLUG: Record<Dept, string> = {
  containers: "containers",
  conversions: "converted-spaces",
  reefers: "reefers",
  sanitation: "restrooms",
  tanks: "site-tanks",
  marine: "marine",
};

export const deptHref = (d: Dept) => `/${DEPT_SLUG[d]}`;
export const slugToDept = (s: string) => (Object.keys(DEPT_SLUG) as Dept[]).find((d) => DEPT_SLUG[d] === s);