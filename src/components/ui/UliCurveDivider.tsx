import { cn } from "@/lib/utils";

interface UliCurveDividerProps {
  className?: string;
}

/**
 * UliCurveDivider — single-stroke curve replacing standard horizontal rules.
 * Inspired by Uli body painting: one fluid line, drawn as if by a hand
 * that has made this mark ten thousand times.
 */
export function UliCurveDivider({ className }: UliCurveDividerProps) {
  return (
    <div
      className={cn("w-full flex justify-center my-16", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 24"
        width={400}
        height={24}
        className="max-w-full opacity-70"
      >
        <path
          d="M 8 12 Q 80 2, 160 12 T 320 12 Q 360 18, 392 12"
          fill="none"
          stroke="var(--color-solar-gold)"
          strokeWidth={1.2}
          strokeLinecap="round"
        />
        <circle cx={200} cy={12} r={2.5} fill="var(--color-solar-gold)" />
      </svg>
    </div>
  );
}
