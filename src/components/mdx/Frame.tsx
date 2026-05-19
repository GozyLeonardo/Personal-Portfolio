import Image from "next/image";

interface FrameProps {
  src: string;
  alt: string;
  caption?: string;
  gold?: boolean;
}

export function Frame({ src, alt, caption, gold = false }: FrameProps) {
  return (
    <figure className="my-8">
      <div
        className={`relative w-full aspect-video rounded overflow-hidden ${
          gold ? "ring-1 ring-[color:var(--color-solar-gold)]" : ""
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-xs text-[color:var(--color-mute)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
