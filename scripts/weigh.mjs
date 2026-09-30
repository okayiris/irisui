// What the site costs a visitor: the shared files, the heaviest pages, the heaviest frames.
//
//   node scripts/weigh.mjs            (after a build)

import { readdirSync, statSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    const at = join(dir, name);
    const st = statSync(at);
    if (st.isDirectory()) walk(at, out);
    else out.push({ at: relative(DIST, at), size: st.size });
  }
  return out;
};

const files = walk(DIST);
const kb = (n) => `${(n / 1024).toFixed(1)} kB`;
const total = files.reduce((sum, f) => sum + f.size, 0);

// What every page pulls before its frames: the shell, and the system's own files for a frame.
const shared = ["site.css", "site.js", "ds/tokens.css", "ds/bundle.css", "ds/ext.css", "ds/extra.css", "ds/placeholder.css", "ds/vendor/react.js", "ds/vendor/react-dom.js", "ds/bundle.js", "ds/ext.js"];
const sharedBytes = shared.reduce((sum, f) => {
  const hit = files.find((x) => x.at === f);
  return sum + (hit?.size ?? 0);
}, 0);

// Frames are served as pages too; only the real pages count here.
const pages = files.filter((f) => f.at.endsWith("index.html") && !f.at.startsWith("demos/")).sort((a, b) => b.size - a.size);
const frames = files.filter((f) => f.at.startsWith("demos/")).sort((a, b) => b.size - a.size);

/** What a page is worth to a first visitor: its own HTML plus the frames it shows (cached after that). */
const withFrames = pages.slice(0, 6).map((p) => {
  const html = readFileSync(join(DIST, p.at), "utf8");
  const shown = (html.match(/src="[^"]*demos\/[^"]*\.html"/g) ?? []).length;
  const heaviest = frames[0]?.size ?? 0;
  return { at: p.at, size: p.size, shown, worst: p.size + shown * heaviest };
});

console.log(`dist: ${files.length} files, ${kb(total)}`);
console.log(`shared before any frame: ${kb(sharedBytes)} (${shared.length} files, cached once)`);
console.log("");
console.log("heaviest pages (own HTML, then their own HTML plus every frame at its heaviest):");
for (const p of withFrames) console.log(`  ${kb(p.size).padStart(9)}  ${String(p.shown).padStart(2)} frames  up to ${kb(p.worst).padStart(9)}  ${p.at}`);
console.log("");
console.log("heaviest frames:");
for (const f of frames.slice(0, 5)) console.log(`  ${kb(f.size).padStart(9)}  ${f.at}`);
