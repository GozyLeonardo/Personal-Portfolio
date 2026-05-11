import Link from "next/link";
import { cn } from "@/lib/utils";

interface GhostButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * GhostButton — secondary CTA. Quiet, supporting role.
 * Hairline border in mute, Warm Off-White text.
 */
export function GhostButton({
  children,
  href,
  onClick,
  className,
}: GhostButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2",
    "px-6 py-3 rounded-[var(--radius-soft)]",
    "font-mono text-sm font-medium uppercase tracking-[0.12em]",
    "border border-[color:var(--color-line)] text-[color:var(--color-warm-off-white)]",
    "transition-all duration-[var(--duration-micro)] ease-[var(--ease-out-quint)]",
    "hover:border-[color:var(--color-solar-gold)] hover:text-[color:var(--color-solar-gold)]",
    "focus-visible:outline-2 focus-visible:outline-[color:var(--color-solar-gold)] focus-visible:outline-offset-4",
    className,
  );

  if (href) {
    return (
      <Link href={href as never} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
