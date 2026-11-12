import fs from "node:fs";
import path from "node:path";

export interface BuildLogEntry {
  date: string;
  message: string;
  hash: string | null;
  files: string[];
}

/**
 * Parse CHANGELOG.md into structured build-log entries.
 * The changelog is appended automatically on every commit by `.githooks/post-commit`,
 * so this is the canonical, never-fake record of shipped work.
 */
export function readBuildLog(): BuildLogEntry[] {
  const filePath = path.join(process.cwd(), "CHANGELOG.md");
  let raw = "";
  try {
    raw = fs.readFileSync(filePath, "utf-8");
  } catch {
    return [];
  }

  const marker = "<!-- entries below -->";
  const idx = raw.indexOf(marker);
  const body = idx >= 0 ? raw.slice(idx + marker.length) : raw;

  const entries: BuildLogEntry[] = [];
  let current: BuildLogEntry | null = null;

  for (const line of body.split("\n")) {
    const entryMatch = line.match(/^-\s+(\d{4}-\d{2}-\d{2})\s+—\s+(.*?)\s+\(`([a-f0-9]+)`\)\s*$/);
    if (entryMatch) {
      current = {
        date: entryMatch[1],
        message: entryMatch[2].trim(),
        hash: entryMatch[3],
        files: [],
      };
      entries.push(current);
      continue;
    }

    const fileMatch = line.match(/^\s+·\s+(.+?)\s*$/);
    if (fileMatch && current) {
      current.files.push(fileMatch[1].trim());
    }
  }

  return entries;
}
