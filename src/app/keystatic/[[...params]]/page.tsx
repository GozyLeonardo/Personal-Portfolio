export const dynamic = "force-dynamic";

import { makePage } from "@keystatic/next/ui/app";
import config from "../../../../keystatic.config";

const KeystaticPage = makePage(config);

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#000" }}>
      <KeystaticPage />
    </div>
  );
}
