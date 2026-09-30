// Writes artifact/: the parts this project added, as README.md + preview.html in the Design System artifact's
// shape, so the release can take them.
//
//   node scripts/build-artifact.mjs

import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { rmSync } from "node:fs";
import esbuild from "esbuild";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
process.env.IRISUI_ROOT = ROOT;

rmSync(join(ROOT, ".build/artifact.mjs"), { force: true });

await esbuild.build({
  entryPoints: [join(ROOT, "src/site/artifact.ts")],
  outfile: join(ROOT, ".build/artifact.mjs"),
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  packages: "external",
  logLevel: "warning",
});

const { buildArtifact } = await import(pathToFileURL(join(ROOT, ".build/artifact.mjs")).href);
const stats = buildArtifact(join(ROOT, "artifact"));

console.log(`irisui artifact: ${stats.parts} parts, ${stats.files} files -> ${stats.out}`);
