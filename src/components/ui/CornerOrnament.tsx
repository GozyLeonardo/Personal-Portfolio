import { cn } from "@/lib/utils";

interface CornerOrnamentProps {
  position: "tl" | "tr" | "bl" | "br";
  size?: number;
  className?: string;
}

/**
 * CornerOrnament — a small Nsibidi-inspired ornament placed at a card corner.
 * Treats project cards and direction cards as bordered manuscript pages —
 * each corner held by a glyph, like ancient bronzework punctuated at the joints.
 *
 * Position codes: tl = top-left, tr = top-right, bl = bottom-left, br = bottom-right
 */
export function CornerOrnament({
  position,
  size = 14,
  className,
}: CornerOrnamentProps) {
  const positionClasses: Record<typeof position, string> = {
    tl: "top-3 left-3",
    tr: "top-3 right-3",
    bl: "bottom-3 left-3",
    br: "bottom-3 right-3",
  };

  // Each corner gets a slightly different rotation — the ornament is not
  // mass-produced, it is hand-placed
  const rotations: Record<typeof position, number> = {
    tl: 0,
    tr: 90,
    br: 180,
    bl: 270,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn(
        "absolute pointer-events-none",
        positionClasses[position],
        className,
      )}
      style={{ transform: `rotate(${rotations[position]}deg)` }}
      aria-hidden="true"
    >
      {/* L-shaped corner mark with a single gold node */}
      <path
        d="M 4 12 L 4 4 L 12 4"
        fill="none"
        stroke="var(--color-solar-gold)"
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.55}
      />
      <circle cx={4} cy={4} r={1.5} fill="var(--color-solar-gold)" opacity={0.85} />
    </svg>
  );
}
