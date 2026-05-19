import { cn } from "@/lib/utils";

interface FourDirectionsIconProps {
  size?: number;
  className?: string;
}

export function FourDirectionsIcon({ size = 48, className }: FourDirectionsIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn("inline-block", className)}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" fill="none" stroke="var(--color-solar-gold)" strokeWidth="1" />
      <circle cx="32" cy="16" r="13" fill="none" stroke="var(--color-solar-gold)" strokeWidth="1" />
      <circle cx="16" cy="32" r="13" fill="none" stroke="var(--color-solar-gold)" strokeWidth="1" />
      <circle cx="32" cy="32" r="13" fill="none" stroke="var(--color-solar-gold)" strokeWidth="1" />
    </svg>
  );
}
