import Link from "next/link";
import { cn } from "@/lib/utils";

interface SolarGoldButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

/**
 * SolarGoldButton — primary CTA. Reserved for high-rhetorical-weight moments.
 * Solar Gold against Foundation Black. Like gold leaf on parchment.
 */
export function SolarGoldButton({
  children,
  href,
  onClick,
  type = "button",
  className,
}: SolarGoldButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2",
    "px-6 py-3 rounded-[var(--radius-soft)]",
    "font-mono text-sm font-medium uppercase tracking-[0.12em]",
    "bg-[color:var(--color-solar-gold)] text-[color:var(--color-foundation)]",
    "transition-all duration-[var(--duration-micro)] ease-[var(--ease-out-quint)]",
    "hover:bg-[color:var(--color-solar-gold-soft)] hover:translate-y-[-1px]",
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
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
