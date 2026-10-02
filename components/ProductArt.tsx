import type { Dept } from "@/data/catalog";

const INK = "#1B1D1F";
const STEEL = "#7B8388";
const LIGHT = "#A9B0B4";
const BRONZE = "#A8703A";

export default function ProductArt({ dept, group }: { dept: Dept; group?: string }) {
  const isMotor = dept === "marine" && group === "Outboard motors";
  const ribs = Array.from({ length: 16 }, (_, i) => 70 + i * 17);
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-hidden="true">
      {isMotor ? (
        <g>
          <rect x="150" y="40" width="100" height="70" rx="10" fill={STEEL} />
          <rect x="165" y="52" width="70" height="8" fill={BRONZE} />
          <rect x="188" y="110" width="24" height="90" fill={LIGHT} />
          <path d="M170 200h60l-8 22h-44z" fill={STEEL} />
          <circle cx="200" cy="232" r="16" fill="none" stroke={INK} strokeWidth="3" />
          <rect x="120" y="60" width="30" height="8" fill={INK} />
        </g>
      ) : dept === "tanks" ? (
        <g>
          <rect x="70" y="70" width="260" height="120" fill={STEEL} />
          <ellipse cx="70" cy="130" rx="22" ry="60" fill={LIGHT} />
          <ellipse cx="330" cy="130" rx="22" ry="60" fill={STEEL} stroke={INK} strokeWidth="2" />
          <rect x="185" y="52" width="30" height="18" fill={BRONZE} />
          <rect x="100" y="190" width="14" height="24" fill={INK} />
          <rect x="286" y="190" width="14" height="24" fill={INK} />
        </g>
      ) : dept === "sanitation" ? (
        <g>
          <rect x="140" y="30" width="120" height="190" fill={STEEL} />
          <rect x="140" y="30" width="120" height="14" fill={INK} />
          <rect x="164" y="70" width="72" height="150" fill={LIGHT} />
          <circle cx="226" cy="150" r="4" fill={BRONZE} />
        </g>
      ) : (
        <g>
          <rect x="40" y="60" width="320" height="140" fill={STEEL} />
          {dept !== "conversions" && ribs.map((x) => <rect key={x} x={x} y="60" width="4" height="140" fill={INK} opacity="0.28" />)}
          <rect x="40" y="60" width="320" height="8" fill={INK} />
          <rect x="40" y="192" width="320" height="8" fill={INK} />
          <rect x="316" y="68" width="44" height="124" fill={LIGHT} />
          {dept === "conversions" && (
            <>
              <rect x="80" y="100" width="90" height="56" fill="#EFE9DE" />
              <rect x="190" y="100" width="90" height="56" fill="#EFE9DE" />
              <rect x="122" y="100" width="4" height="56" fill={STEEL} />
              <rect x="232" y="100" width="4" height="56" fill={STEEL} />
            </>
          )}
          {dept === "reefers" && <circle cx="90" cy="130" r="28" fill="none" stroke={BRONZE} strokeWidth="4" />}
          <rect x="52" y="200" width="30" height="14" fill={INK} />
          <rect x="318" y="200" width="30" height="14" fill={INK} />
        </g>
      )}
      <rect x="0" y="238" width="400" height="2" fill={INK} opacity="0.15" />
    </svg>
  );
}