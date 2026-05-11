import { cn } from "@/lib/utils";

interface SectionIndexProps {
  current: number;
  total: number;
  label?: string;
  bearing?: string;
  className?: string;
}

/**
 * SectionIndex — the slash-delimited numeric marker from the Portfolio remake.
 * Sits above section headings as instrument-panel section addressing.
 * Format: "SECTION 02 / 06 · ABOUT · BEARING 035°"
 */
export function SectionIndex({
  current,
  total,
  label,
  bearing,
  className,
}: SectionIndexProps) {
  const indexStr = `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <p
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.22em]",
        "text-[color:var(--color-mute)]",
        "flex items-center gap-3 flex-wrap",
        className,
      )}
      aria-hidden="true"
    >
      <span className="text-[color:var(--color-solar-gold)]">
        Section {indexStr}
      </span>
      {label && (
        <>
          <span>·</span>
          <span className="text-[color:var(--color-warm-off-white)]">
            {label}
          </span>
        </>
      )}
      {bearing && (
        <>
          <span>·</span>
          <span>Bearing {bearing}</span>
        </>
      )}
    </p>
  );
}
