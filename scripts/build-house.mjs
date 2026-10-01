// The kit as a house installs it: dist/house/ is one flat package (plugin.json plus the browser build), the
// same format as every plugin in the Iris store. A house never copies the kit; it gets this package by an
// explicit `plugin update iris-ui`, rolled out per group (AGI: iris-group kit).
//   node scripts/build.mjs && node scripts/build-house.mjs
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ds = join(root, "dist/ds"), out = join(root, "dist/house");
const { version } = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const FILES = ["bundle.js", "ext.js", "tokens.css", "bundle.css", "ext.css", "extra.css", "tokens.json", "design-system.json"];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const f of FILES) copyFileSync(join(ds, f), join(out, f));
// A package is flat: the fonts folder lands next to the rest; the house serves it back under fonts/.
for (const f of readdirSync(join(ds, "fonts"))) copyFileSync(join(ds, "fonts", f), join(out, f));
writeFileSync(join(out, "plugin.json"), JSON.stringify({
  name: "iris-ui", version, kind: "kit", author: "Iris",
  description: "The Iris UI kit: every part a screen, a window or a plugin page is built from.",
  permissions: [],
}, null, 2) + "\n");
console.log(`dist/house: iris-ui ${version}, ${readdirSync(out).length} files`);
