// Ringlab's labs as modules in the local site. Ringlab stays its own internal package (~/Developer/Sandbox/Ringlab,
// no git): its modules.json says which labs are on. Only a build with IRISUI_INTERNAL=1 (the dev server) reads it;
// the public build never does, so nothing internal reaches GitHub.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./parse";

export type LabModule = { id: string; name: string; path: string; blurb?: string; on: boolean };

const DIR = process.env.IRISUI_RINGLAB ?? join(ROOT, "../Ringlab");

function load(): { url: string; modules: LabModule[] } {
  const file = join(DIR, "modules.json");
  if (process.env.IRISUI_INTERNAL !== "1" || !existsSync(file)) return { url: "", modules: [] };
  const j = JSON.parse(readFileSync(file, "utf8"));
  return { url: j.url ?? "http://localhost:5190", modules: (j.modules ?? []).filter((m: LabModule) => m.on) };
}

export const LAB = load();
