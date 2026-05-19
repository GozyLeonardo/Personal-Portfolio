import { cn } from "@/lib/utils";

interface IgboUkwuGridProps {
  className?: string;
}

export function IgboUkwuGrid({ className }: IgboUkwuGridProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="igbo-ukwu-grid"
          x="0"
          y="0"
          width="80"
          height="70"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="20" cy="35" r="22" fill="none" stroke="var(--color-solar-gold)" strokeWidth="0.7" />
          <circle cx="60" cy="35" r="22" fill="none" stroke="var(--color-solar-gold)" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#igbo-ukwu-grid)" />
    </svg>
  );
}
