export const dynamic = "force-dynamic";

import { makePage } from "@keystatic/next/ui/app";
import config from "../../../../keystatic.config";

const KeystaticPage = makePage(config);

export default function Page() {
  const slug = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG;
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <div
        style={{
          padding: "12px 20px",
          background: "#1a1a1a",
          color: "#fff",
          fontSize: "13px",
          fontFamily: "monospace",
        }}
      >
        slug: {slug ?? "NOT SET — check Vercel env vars"}
      </div>
      <KeystaticPage />
    </div>
  );
}
