// Fill the asset store the release points at but does not carry.
//
//   node scripts/import-blobs.mjs [bron-map …]
//
// A preview or a chapter may refer to `/_blob/<id>`: the artifact's own asset store. The release lists those
// blobs in design-system.json but ships no bytes, so the build serves what it has and shows a deliberate
// placeholder for the rest. This script copies any blob it can find by name from a source folder, so those
// pages show the real picture.
//
// Sources are searched by the record's own file name (e.g. `01-product.webp`) and then by any file of exactly
// the recorded size under the source folder's tree.

import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "blobs");

const SOURCES = process.argv.slice(2);
if (!SOURCES.length) {
  console.log("usage: node scripts/import-blobs.mjs <source folder> [more folders …]");
  process.exit(2);
}

/** Every file under a folder, with its size: small trees only, this is a local import. */
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const at = join(dir, name);
    const st = statSync(at);
    if (st.isDirectory()) walk(at, out);
    else out.push({ at, name, size: st.size });
  }
  return out;
}

const files = SOURCES.flatMap((s) => (existsSync(s) ? walk(s) : []));
const manifest = JSON.parse(readFileSync(join(ROOT, "public", "ds", "design-system.json"), "utf8"));

mkdirSync(OUT, { recursive: true });
const imported = [];
const provenance = [];
const missing = [];

for (const [group, g] of Object.entries(manifest.assetGroups ?? {})) {
  for (const [name, rec] of Object.entries(g.files ?? {})) {
    const id = String(rec.blob ?? "");
    if (!id) continue;
    const target = join(OUT, id);
    if (existsSync(target)) continue;

    const byName = files.find((f) => f.name === name);
    const bySize = files.find((f) => f.size === Number(rec.size));
    const hit = byName ?? bySize;
    if (!hit) {
      missing.push(`${group}/${name} (${rec.size} bytes, blob ${id})`);
      continue;
    }
    copyFileSync(hit.at, target);
    provenance.push(`| \`${id}\` | ${group}/${name} | \`${relative(ROOT, hit.at)}\` | ${rec.size} bytes |`);
    imported.push(`${name} <- ${relative(ROOT, hit.at)}`);
  }
}

// One file records where each asset came from: the release names the blobs, this says which file answered.
const SOURCES_FILE = join(OUT, "SOURCES.md");
const earlier = existsSync(SOURCES_FILE) ? readFileSync(SOURCES_FILE, "utf8").split("\n").filter((l) => l.startsWith("| `")) : [];
writeFileSync(
  SOURCES_FILE,
  [
    "# Where the assets came from",
    "",
    "The release points at `/_blob/<id>` for its pictures but carries no bytes. This file says, per blob, which",
    "file on disk was copied in by `node scripts/import-blobs.mjs <folder …>`. A blob that is still missing shows",
    "a deliberate placeholder on the site.",
    "",
    "| blob | asset | source file | size |",
    "| --- | --- | --- | --- |",
    ...Array.from(new Set([...earlier, ...provenance])),
    "",
  ].join("\n"),
);

console.log(`irisui blobs: ${imported.length} imported, ${missing.length} still missing`);
for (const line of imported) console.log("  + " + line);
for (const line of missing) console.log("  ? " + line);
