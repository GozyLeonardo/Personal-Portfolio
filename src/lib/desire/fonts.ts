import path from "node:path";
import { Font } from "@react-pdf/renderer";

/* Server-side font registration for the Soul Blueprint PDF. Registers the
   bundled font files from public/fonts by filesystem path (fontkit reads them
   directly). Kept in a separate module so react-pdf stays server-only. */

let registered = false;

export function registerPdfFonts(): void {
  if (registered) return;

  const dir = path.join(process.cwd(), "public", "fonts");
  const file = (name: string): string => path.join(dir, name);

  Font.register({
    family: "Space Grotesk",
    fonts: [
      { src: file("SpaceGrotesk-Regular.otf"), fontWeight: 400 },
      { src: file("SpaceGrotesk-Bold.otf"), fontWeight: 700 },
    ],
  });

  Font.register({
    family: "Inter",
    fonts: [{ src: file("Inter-Regular.ttf"), fontWeight: 400 }],
  });

  Font.register({
    family: "IBM Plex Mono",
    fonts: [
      { src: file("IBMPlexMono-Regular.ttf"), fontWeight: 400 },
      { src: file("IBMPlexMono-Medium.ttf"), fontWeight: 500 },
    ],
  });

  registered = true;
}
