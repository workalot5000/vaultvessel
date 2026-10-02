import type { Spec } from "@/data/catalog";

export default function SpecTable({ rows }: { rows: Spec[] }) {
  return (
    <dl className="border-t border-ink">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[140px_1fr] gap-4 border-b border-ink/15 py-3 text-sm">
          <dt className="eyebrow !text-[10px] pt-0.5">{k}</dt>
          <dd className="font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}