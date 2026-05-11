import { cn } from "@/lib/utils";

interface TerminalLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * TerminalLabel — the >_ prefix for section headings.
 * Always precedes section H2s on the homepage. Mono face, Solar Gold accent.
 */
export function TerminalLabel({ children, className }: TerminalLabelProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-[0.18em]",
        "text-[color:var(--color-mute)]",
        "flex items-center gap-2",
        className,
      )}
    >
      <span className="text-[color:var(--color-solar-gold)]">&gt;_</span>
      <span>{children}</span>
    </p>
  );
}
