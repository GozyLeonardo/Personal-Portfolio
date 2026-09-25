import { createElement } from "react";
import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { SoulBlueprintPdf } from "@/components/desire/SoulBlueprintPdf";
import { registerPdfFonts } from "@/lib/desire/fonts";
import type { SoulBlueprint } from "@/lib/desire/types";

export const runtime = "nodejs";

function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return slug || "soul-blueprint";
}

export async function POST(req: NextRequest) {
  let data: SoulBlueprint;
  try {
    data = (await req.json()) as SoulBlueprint;
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }

  if (!data || typeof data.name !== "string") {
    return new Response("Missing blueprint data.", { status: 400 });
  }

  try {
    registerPdfFonts();
    const document = createElement(
      SoulBlueprintPdf,
      { data }
    ) as unknown as Parameters<typeof renderToBuffer>[0];
    const buffer = await renderToBuffer(document);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slugify(data.name)}-soul-blueprint.pdf"`,
      },
    });
  } catch (err) {
    console.error("[desire/pdf] render error:", err);
    return new Response("Could not generate the PDF.", { status: 500 });
  }
}
