import { createElement } from "react";
import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { BriefPdfDocument } from "@/components/brief/BriefPdf";
import { registerPdfFonts } from "@/lib/brief/fonts";
import type { BriefData } from "@/lib/brief/types";

export const runtime = "nodejs";

function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return slug || "project-brief";
}

export async function POST(req: NextRequest) {
  let data: BriefData;
  try {
    data = (await req.json()) as BriefData;
  } catch {
    return new Response("Invalid request body.", { status: 400 });
  }

  if (!data || typeof data.projectName !== "string") {
    return new Response("Missing brief data.", { status: 400 });
  }

  try {
    registerPdfFonts();
    const document = createElement(
      BriefPdfDocument,
      { data }
    ) as unknown as Parameters<typeof renderToBuffer>[0];
    const buffer = await renderToBuffer(document);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slugify(data.projectName)}-brief.pdf"`,
      },
    });
  } catch (err) {
    console.error("[brief/pdf] render error:", err);
    return new Response("Could not generate the PDF.", { status: 500 });
  }
}
