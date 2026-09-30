// Builds the site: compiles the renderer, renders every page to plain HTML, writes the machine-readable
// layer, and copies the static files in public/.
//
//   node scripts/build.mjs
//
// No client framework: the pages are HTML, and the only script in the browser is /site.js.

import { renameSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import esbuild from "esbuild";
import { buildExtensions } from "./build-ext.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

process.env.IRISUI_ROOT = ROOT;

// The additions to the design system are part of every build: the pages and the frames both use them.
await buildExtensions();

rmSync(join(ROOT, ".build"), { recursive: true, force: true });

const result = await esbuild.build({
  entryPoints: [join(ROOT, "src/site/ssr.tsx")],
  outfile: join(ROOT, ".build/ssr.mjs"),
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  jsx: "automatic",
  packages: "external",
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "warning",
  metafile: true,
});

const mod = await import(pathToFileURL(join(ROOT, ".build/ssr.mjs")).href);

// Build beside dist and swap it in, so the site is never missing while a build runs (a dev server is
// serving it at the same time, and an empty moment looks like a broken site).
const fresh = join(ROOT, ".build/dist");
const live = join(ROOT, "dist");
const old = join(ROOT, ".build/dist-old");
const stats = mod.build(fresh);
swapIntoPlace(fresh, live, old);

/** Two renames, so the served directory is never gone. */
function swapIntoPlace(fresh, live, old) {
  rmSync(old, { recursive: true, force: true });
  if (existsSync(live)) renameSync(live, old);
  mkdirSync(dirname(live), { recursive: true });
  renameSync(fresh, live);
  rmSync(old, { recursive: true, force: true });
}

console.log(
  `irisui: ${stats.pages} pages, ${stats.components} components, ${result.warnings.length} warnings -> ${stats.out}`,
);
