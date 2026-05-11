import { cn } from "@/lib/utils";

interface IgboUkwuInterlaceProps {
  className?: string;
  density?: "tight" | "normal" | "loose";
}

/**
 * IgboUkwuInterlace — horizontal band of interlocking circles inspired by
 * 9th-century Igbo-Ukwu bronzework. Used as structural framing between
 * major sections: heavier than UliCurveDivider, lighter than a full hr.
 *
 * Africanfuturist visual grammar: the circle is load-bearing, not decoration.
 * Each ring vibrates against the next; together they form a band that
 * speaks the cosmic geometry of an ancient civilization.
 */
export function IgboUkwuInterlace({
  className,
  density = "normal",
}: IgboUkwuInterlaceProps) {
  // Tight: 12 rings · Normal: 8 rings · Loose: 5 rings
  const ringCount = density === "tight" ? 12 : density === "loose" ? 5 : 8;
  const spacing = 400 / (ringCount + 1);
  const radius = spacing * 0.7;
  const centerY = 16;

  return (
    <div
      className={cn(
        "w-full flex justify-center my-12 md:my-16",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 32"
        width={400}
        height={32}
        className="max-w-full opacity-65"
      >
        {/* Background hairline */}
        <line
          x1={0}
          y1={centerY}
          x2={400}
          y2={centerY}
          stroke="var(--color-line)"
          strokeWidth={0.5}
        />

        {/* Interlocking circles — alternating gold and teal */}
        {Array.from({ length: ringCount }, (_, i) => {
          const cx = spacing * (i + 1);
          const isEven = i % 2 === 0;
          const stroke = isEven
            ? "var(--color-solar-gold)"
            : "var(--color-electric-teal)";
          return (
            <circle
              key={i}
              cx={cx}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={stroke}
              strokeWidth={0.9}
              opacity={0.85}
            />
          );
        })}

        {/* Center anchor mark */}
        <circle
          cx={200}
          cy={centerY}
          r={2.5}
          fill="var(--color-solar-gold)"
        />
      </svg>
    </div>
  );
}
