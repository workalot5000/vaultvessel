# VaultVessel LLC website

Quote-only storefront for VaultVessel LLC, Miami, FL. Next.js 14 (App Router), TypeScript, Tailwind.
Every price is a REFERENCE PRICE · USD. Freight, tax, availability, and final price are confirmed in a written quote.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; also catches catalog mistakes
```

## Where things live

| Path | What it does |
| --- | --- |
| `data/catalog.ts` | All products and departments. Shop, category pages, product pages, filters, related products, and the sitemap read from here. |
| `lib/site.ts` | Business name, city, email, phone, site URL. Replace the placeholders before launch. |
| `lib/routes.ts` | Maps each department to its URL (`conversions` → `/converted-spaces`). |
| `lib/dept-copy.ts` | Intro copy for the shared category page (containers, reefers, restrooms, tanks). |
| `lib/filters.ts` | Filter groups and matching rules. |
| `app/api/quote/route.ts`, `app/api/contact/route.ts` | Form endpoints. They log to the server console until you connect email. |

## Replacing `data/catalog.ts`

Swap the file with your own. Keep these exports so nothing else needs to change:

- Types: `Dept`, `Spec`, `Product`
- Data: `DEPARTMENTS`, `PRODUCTS`, `FEATURED`
- Helpers: `slugify`, `money`

### The Product shape

```ts
{
  slug: string;       // URL id, made from the name by slugify()
  name: string;
  dept: Dept;         // "containers" | "conversions" | "reefers" | "sanitation" | "tanks" | "marine"
  group: string;      // type label, e.g. "Shipping containers". Becomes the "Type" filter
  condition: string;  // "New", "One-trip", "Used", "Custom build". Becomes the "Condition" filter
  size: string;       // display text. "20 ft", "40 ft HC", "2 × 40 ft" feed the Length filter
  price: number;      // REFERENCE PRICE in USD, shown as "from $X"
  lead: string;       // one or two sentences, used on the page and in SEO descriptions
  specs: [string, string][];
  motor?: { brand: string; hp: number; shaft: string; start: string };
}
```

The `p()` helper builds a product from a compact spec string: `"Exterior=20 × 8 × 8.5 ft;Payload=~62,000 lb"`. Use `;` between rows and `=` between label and value, and avoid both characters inside values. The `m()` helper builds an outboard motor and fills in the `motor` object that powers the brand, horsepower, shaft, and start filters.

### Rules that keep the site working

1. **Names make URLs.** `slug` comes from the name, so renaming a product changes its URL. Keep every name unique.
2. **Length filter:** it reads the first number before "ft" in `size`, and only 10, 20, 40, and 45 are recognized. Add more sizes in `SIZE_KEYS` in `lib/filters.ts`.
3. **Motor filters:** they only match products with a `motor` object. Shaft values are `Short`, `Long`, `XL`, `XXL`; start values are `Manual`, `Electric`. Add others in `lib/filters.ts`.
4. **Price bands** (under $5k, $5k-$15k, $15k-$40k, $40k+) are set in `PRICE_BANDS` in `lib/filters.ts`.
5. **Featured items on Home** come from the `FEATURED` slug list. A wrong slug fails the build with a clear message.
6. **Duplicate slugs** also fail with a clear message.

### From a spreadsheet

Export your sheet to JSON, map each row to the `Product` shape, and export it as `PRODUCTS`. Keep the same exports listed above.

### Adding a department

1. Add it to the `Dept` type and `DEPARTMENTS` in `data/catalog.ts`.
2. Add its URL in `lib/routes.ts`.
3. Add intro copy in `lib/dept-copy.ts`. Converted spaces and Marine have their own pages in `app/`.

## Photos

Products currently use drawn steel silhouettes (`components/ProductArt.tsx`). To use photos, add an optional `image` field to `Product` and render it in `ProductCard.tsx` and `app/product/[slug]/page.tsx`, falling back to `ProductArt`.

## Quote and contact email

Both API routes validate the request, then log it. To send real email, replace the `console.log` in each route with your provider's send call (Resend, Postmark, SendGrid, or any SMTP service) and keep the JSON response shape.

## SEO

- Product and category pages generate titles, descriptions, canonical URLs, and Open Graph tags from the catalog.
- Product pages include schema.org JSON-LD (Product and BreadcrumbList). The price is declared as a low reference price, with no availability claim, to match the quote-only model.
- `/sitemap.xml` and `/robots.txt` are generated. `/quote` and `/api/` are excluded from indexing.
- Set `NEXT_PUBLIC_SITE_URL` to your real domain in production (for example in Vercel's environment variables), or edit `url` in `lib/site.ts`.
- Add Open Graph images later by placing `opengraph-image.png` in `app/`.

## Deploying

Any Node host works. On Vercel: import the repo, set `NEXT_PUBLIC_SITE_URL`, deploy.