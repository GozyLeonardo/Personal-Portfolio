import { cn } from "@/lib/utils";

interface GoldLeafRuleProps {
  className?: string;
  width?: "narrow" | "full";
}

/**
 * GoldLeafRule — a thin Solar Gold horizontal rule with feathered edges.
 * Used for subtle structural separation inside sections.
 * The rule is not decoration — it is the breath between ideas.
 */
export function GoldLeafRule({
  className,
  width = "narrow",
}: GoldLeafRuleProps) {
  return (
    <div
      className={cn(
        "flex justify-center",
        width === "narrow" ? "my-8" : "my-12",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "h-px",
          width === "narrow" ? "w-24" : "w-full max-w-2xl",
        )}
        style={{
          background:
            "linear-gradient(to right, transparent 0%, color-mix(in oklab, var(--color-solar-gold) 85%, transparent) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
