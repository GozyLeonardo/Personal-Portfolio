import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { cn } from "@/lib/utils";

interface GhostGlyphProps {
  variant?: "dot" | "cross" | "spiral" | "wave" | "interlace";
  size?: number;
  className?: string;
}

export function GhostGlyph({
  variant = "interlace",
  size = 80,
  className,
}: GhostGlyphProps) {
  return (
    <span
      className={cn("pointer-events-none select-none opacity-[0.05]", className)}
      aria-hidden="true"
    >
      <NsibidiGlyph variant={variant} size={size} />
    </span>
  );
}
