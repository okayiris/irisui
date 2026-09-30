// A tiny static server for dist/ — enough to look at the site, nothing more.
//
//   node scripts/serve.mjs [port]

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, extname, join, normalize } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.argv[2] ?? 4173);

// Where the copy in dist/ is mounted: the root, or a subpath (the GitHub Pages copy answers on /irisui/).
// The build writes dist/.base for exactly this.
const MOUNT = (() => {
  try {
    return readFileSync(join(ROOT, "dist", ".base"), "utf8").trim();
  } catch {
    return "";
  }
})();

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

async function resolvePath(urlPath) {
  let clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  if (MOUNT && (clean === MOUNT || clean.startsWith(MOUNT + "/"))) clean = clean.slice(MOUNT.length) || "/";
  const leaf = clean.endsWith("/") || clean === "/" ? [join(clean, "index.html")] : [clean, join(clean, "index.html")];
  for (const t of leaf) {
    for (const candidate of MOUNT ? [t, join(MOUNT, t)] : [t]) {
      try {
        const s = await stat(join(ROOT, candidate));
        if (s.isFile()) return join(ROOT, candidate);
      } catch {
        /* next */
      }
    }
  }
  return null;
}

createServer(async (req, res) => {
  const at = await resolvePath(req.url ?? "/");
  if (!at) {
    const notFound = join(ROOT, "404.html");
    try {
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      res.end(await readFile(notFound));
    } catch {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("not found\n");
    }
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(at)] ?? "application/octet-stream" });
  res.end(await readFile(at));
}).listen(port, () => console.log(`irisui: http://localhost:${port}`));
