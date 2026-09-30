// The gate for what we hand to the design system: the 14 parts in artifact/ are what a release would take, so
// their previews have to work on their own.
//
//   node scripts/build-artifact.mjs && node scripts/check-artifact.mjs
//
// Each preview is loaded in Chromium inside a small harness (the release's own files plus ext.css/ext.js), and
// must mount every variant, draw something, and log no error.

import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, extname, join } from "node:path";
import { tmpdir } from "node:os";

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ART = join(ROOT, "artifact", "components");
// Staged outside the repo: a build (the dev server rebuilds on any change) clears .build, and the gate must
// not lose its own pages halfway through.
const STAGE = join(tmpdir(), `irisui-artifact-check-${process.pid}`);

const playwright = (() => {
  try {
    return require(require.resolve("playwright"));
  } catch {
    for (const map of existsSync(join(process.env.HOME ?? "", ".npm/_npx"))
      ? readdirSync(join(process.env.HOME ?? "", ".npm/_npx"))
      : []) {
      const p = join(process.env.HOME ?? "", ".npm/_npx", map, "node_modules/playwright");
      if (existsSync(p)) return require(p);
    }
    return null;
  }
})();

if (!playwright) {
  console.error("playwright not found; run `npx playwright install chromium`");
  process.exit(2);
}
if (!existsSync(ART)) {
  console.error("no artifact/ — run `node scripts/build-artifact.mjs` first");
  process.exit(2);
}

const HEAD = (ds) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="dark">
<link rel="stylesheet" href="${ds}/tokens.css">
<link rel="stylesheet" href="${ds}/bundle.css">
<link rel="stylesheet" href="${ds}/ext.css">
<link rel="stylesheet" href="${ds}/extra.css">
<link rel="stylesheet" href="${ds}/placeholder.css">
</head><body>
<script src="${ds}/vendor/react.js"></script>
<script src="${ds}/vendor/react-dom.js"></script>
<script src="${ds}/bundle.js"></script>
<script src="${ds}/ext.js"></script>
`;

// The previews the release ships expect its harness to bring the system; ours bring it the same way.
rmSync(STAGE, { recursive: true, force: true });
mkdirSync(STAGE, { recursive: true });

const parts = readdirSync(ART).filter((n) => statSync(join(ART, n)).isDirectory());
const built = [];
for (const name of parts) {
  const preview = readFileSync(join(ART, name, "preview.html"), "utf8");
  // The harness is at the stage root; the artifacts' own relative references become absolute /ds/ URLs.
  writeFileSync(join(STAGE, `${name}.html`), HEAD("/ds") + preview.replace(/<\/?body[^>]*>/gi, "") );
  built.push(name);
}

const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
const PORT = 4199;

const server = createServer((req, res) => {
  const path = (req.url ?? "/").split("?")[0];
  const local = path.startsWith("/ds/") || path.startsWith("/blobs/") || path.startsWith("/favicon")
    ? join(ROOT, "public", path)
    : join(STAGE, path.replace(/^\//, ""));
  try {
    const body = readFileSync(local);
    res.writeHead(200, { "content-type": TYPES[extname(local)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found\n");
  }
});
await new Promise((r) => server.listen(PORT, r));

const failures = [];
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e).slice(0, 140)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 140)));

for (const name of built) {
  errors.length = 0;
  await page.goto(`http://localhost:${PORT}/${name}.html`, { waitUntil: "load" });
  await page.waitForTimeout(400);
  const drawn = await page.evaluate(() => {
    const root = document.getElementById("root") ?? document.body;
    const cells = Array.from(root.children).filter((el) => !["SCRIPT", "STYLE", "LINK"].includes(el.tagName));
    return {
      cells: cells.length,
      height: cells.reduce((max, el) => Math.max(max, el.getBoundingClientRect().height), 0),
      text: (root.innerText || "").replace(/\s+/g, " ").trim().slice(0, 60),
    };
  });
  if (!drawn.cells) failures.push(`${name}: no cell rendered`);
  else if (drawn.height < 8) failures.push(`${name}: cells are empty`);
  if (errors.length) failures.push(`${name}: ${errors.slice(0, 2).join(" | ")}`);
  console.log(`  ${name.padEnd(12)} cells ${drawn.cells}  ${drawn.height.toFixed(0)}px  ${drawn.text.slice(0, 34)}`);
}

await browser.close();
server.close();
rmSync(STAGE, { recursive: true, force: true });

if (failures.length) {
  console.error(`irisui artifact check: ${failures.length} failures over ${built.length} previews`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log(`irisui artifact check: ${built.length} previews clean`);
