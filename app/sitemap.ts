import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/catalog";
import { DEPT_SLUG } from "@/lib/routes";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/shop", ...Object.values(DEPT_SLUG).map((s) => `/${s}`), "/delivery", "/about", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...PRODUCTS.map((p) => ({ url: `${SITE.url}/product/${p.slug}`, lastModified: now, priority: 0.6 })),
  ];
}