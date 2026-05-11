import { cn } from "@/lib/utils";

interface TelemetryStripProps {
  readouts: { label: string; value: string; status?: "live" | "lock" | "idle" }[];
  className?: string;
  align?: "start" | "center" | "between";
}

/**
 * TelemetryStrip — instrument-panel HUD readouts as a horizontal data line.
 * Africanfuturist personality layer: cosmic instrument, not just cosmic manuscript.
 * Lifted from the Portfolio remake mockup's carousel chrome.
 *
 * The ◉ glyph is the canonical signal marker. Bearings, frames, locks live here.
 */
export function TelemetryStrip({
  readouts,
  className,
  align = "between",
}: TelemetryStripProps) {
  const alignClass =
    align === "start"
      ? "justify-start gap-6"
      : align === "center"
        ? "justify-center gap-6"
        : "justify-between";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center w-full",
        "font-mono text-[10px] uppercase tracking-[0.22em]",
        "text-[color:var(--color-mute)]",
        alignClass,
        className,
      )}
      aria-hidden="true"
    >
      {readouts.map((r, idx) => {
        const dotColor =
          r.status === "live"
            ? "var(--color-electric-teal)"
            : r.status === "lock"
              ? "var(--color-solar-gold)"
              : "var(--color-mute)";

        return (
          <span key={idx} className="flex items-center gap-2 whitespace-nowrap">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: dotColor }}
            />
            <span className="text-[color:var(--color-mute)]">{r.label}</span>
            <span className="text-[color:var(--color-warm-off-white)]">
              {r.value}
            </span>
          </span>
        );
      })}
    </div>
  );
}
