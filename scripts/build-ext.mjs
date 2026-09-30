// Builds the additions to the design system into the one file the site and a page can load:
//
//   src/ds/ext.tsx + src/ds/ext.css  ->  public/ds/ext.js + public/ds/ext.css
//
// The extensions resolve "react" to src/ds/react-shim.js, which hands them the React the page already has:
// the shipped bundle is a classic script on window.React, and these parts live beside it, not above it.

import { copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import esbuild from "esbuild";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export async function buildExtensions() {
  const result = await esbuild.build({
    entryPoints: [join(ROOT, "src/ds/ext.tsx")],
    outfile: join(ROOT, "public/ds/ext.js"),
    bundle: true,
    format: "iife",
    target: ["chrome110", "safari16", "firefox110"],
    jsx: "transform",
    jsxFactory: "h",
    jsxFragment: "Fragment",
    alias: { react: join(ROOT, "src/ds/react-shim.js") },
    legalComments: "none",
    logLevel: "warning",
    metafile: true,
  });
  copyFileSync(join(ROOT, "src/ds/ext.css"), join(ROOT, "public/ds/ext.css"));
  return result;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = await buildExtensions();
  const bytes = Object.values(r.metafile.outputs)[0]?.bytes ?? 0;
  console.log(`irisui extensions: public/ds/ext.js (${Math.round(bytes / 1024)} kB) and public/ds/ext.css`);
}
