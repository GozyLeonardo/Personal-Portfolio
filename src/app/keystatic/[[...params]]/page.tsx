"use client";

export const dynamic = "force-dynamic";

import nextDynamic from "next/dynamic";
import config from "../../../../keystatic.config";

const KeystaticPage = nextDynamic(
  () =>
    import("@keystatic/next/ui/app").then((mod) => ({
      default: mod.makePage(config),
    })),
  { ssr: false },
);

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <KeystaticPage />
    </div>
  );
}
