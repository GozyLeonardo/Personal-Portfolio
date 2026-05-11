import { cn } from "@/lib/utils";

interface NsibidiGlyphProps {
  variant?: "dot" | "cross" | "spiral" | "wave" | "interlace";
  size?: number;
  color?: "gold" | "teal" | "muted";
  className?: string;
}

/**
 * NsibidiGlyph — Africanfuturist section markers.
 * Inspired by Nsibidi ideographs. Used as section entry points and structural
 * punctuation, never decoration. Each glyph is a load-bearing mark.
 */
export function NsibidiGlyph({
  variant = "dot",
  size = 16,
  color = "gold",
  className,
}: NsibidiGlyphProps) {
  const stroke =
    color === "gold"
      ? "var(--color-solar-gold)"
      : color === "teal"
        ? "var(--color-electric-teal)"
        : "var(--color-mute)";

  const paths: Record<string, React.ReactNode> = {
    dot: <circle cx={12} cy={12} r={4} fill={stroke} />,
    cross: (
      <>
        <line x1={4} y1={12} x2={20} y2={12} stroke={stroke} strokeWidth={1.5} />
        <line x1={12} y1={4} x2={12} y2={20} stroke={stroke} strokeWidth={1.5} />
        <circle cx={12} cy={12} r={2} fill={stroke} />
      </>
    ),
    spiral: (
      <path
        d="M 12 12 m -6 0 a 6 6 0 1 1 12 0 a 4 4 0 1 1 -8 0 a 2 2 0 1 1 4 0"
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    ),
    wave: (
      <path
        d="M 3 12 Q 7.5 6, 12 12 T 21 12"
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    ),
    interlace: (
      <>
        <circle cx={9} cy={12} r={5} fill="none" stroke={stroke} strokeWidth={1.2} />
        <circle cx={15} cy={12} r={5} fill="none" stroke={stroke} strokeWidth={1.2} />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      {paths[variant]}
    </svg>
  );
}
