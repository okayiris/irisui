// The dev server: serves dist/, watches the source, rebuilds in a second or two, and reloads the browser.
//
//   node scripts/dev.mjs [port]
//
// Nothing to configure: change a page, a chapter, a token or site.css and the tab you are looking at
// refreshes itself. The build is the same one `node scripts/build.mjs` runs.

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { watch } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, extname, join, normalize } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
// The local site shows the internal Ringlab modules too (src/site/lab.ts); a public build never does.
process.env.IRISUI_INTERNAL = "1";
const DIST = join(ROOT, "dist");
const port = Number(process.argv[2] ?? 4173);
/** --no-watch serves what is in dist/ and rebuilds nothing: for looking without the page moving. */
let watching = !process.argv.includes("--no-watch");
/** How long the source has to be quiet before a rebuild: one build per burst, not one per file. */
const debounce = Number((process.argv.find((a) => a.startsWith("--debounce=")) ?? "").split("=")[1] ?? 3000);

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

const LIVE = `<script>
(() => {
  // Only the top page listens: a browser keeps six lines open per server, so a page of demo frames that
  // each held one would stall every frame after the sixth. Reloading the top reloads its frames too.
  if (window !== top) return;
  const es = new EventSource("/__dev");
  es.addEventListener("built", () => location.reload());
  es.addEventListener("failed", (e) => console.error("[irisui]", e.data));
})();
</script>`;

// ---------- build ----------

let building = false;
let again = false;

function build() {
  if (building) {
    again = true;
    return;
  }
  building = true;
  const started = Date.now();
  const r = spawnSync(process.execPath, [join(ROOT, "scripts/build.mjs")], { cwd: ROOT, encoding: "utf8" });
  building = false;
  const ms = Date.now() - started;
  if (r.status === 0) {
    const line = (r.stdout || "").trim().split("\n").pop() ?? "";
    console.log(`[${new Date().toLocaleTimeString()}] built in ${ms}ms — ${line}`);
    broadcast("built", String(ms));
  } else {
    const why = (r.stderr || r.stdout || "unknown").trim().split("\n").slice(-6).join("\n");
    console.error(`[${new Date().toLocaleTimeString()}] build failed\n${why}`);
    broadcast("failed", why);
  }
  if (again) {
    again = false;
    build();
  }
}

// ---------- reload channel ----------

const clients = new Set();
const broadcast = (event, data) => {
  for (const res of clients) res.write(`event: ${event}\ndata: ${data.replace(/\n/g, "\\n")}\n\n`);
};

// ---------- files ----------

async function resolvePath(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const tries = clean.endsWith("/") || clean === "/" ? [join(clean, "index.html")] : [clean, join(clean, "index.html")];
  for (const t of tries) {
    try {
      const s = await stat(join(DIST, t));
      if (s.isFile()) return join(DIST, t);
    } catch {
      /* next */
    }
  }
  return null;
}

createServer(async (req, res) => {
  const url = req.url ?? "/";

  if (url.startsWith("/__dev/pause")) {
    watching = false;
    console.log("[irisui] watching paused: nothing rebuilds until /__dev/resume");
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("paused\n");
    return;
  }
  if (url.startsWith("/__dev/resume")) {
    watching = true;
    console.log("[irisui] watching resumed");
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("watching\n");
    return;
  }
  if (url.startsWith("/__dev")) {
    res.writeHead(200, {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      connection: "keep-alive",
    });
    res.write(": connected\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  const at = await resolvePath(url);
  if (!at) {
    try {
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      res.end(await readFile(join(DIST, "404.html")));
    } catch {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("not found\n");
    }
    return;
  }

  const type = TYPES[extname(at)] ?? "application/octet-stream";
  const body = await readFile(at);
  if (type.startsWith("text/html")) {
    res.writeHead(200, { "content-type": type, "cache-control": "no-store" });
    const html = body.toString("utf8");
    res.end(html.includes("</body>") ? html.replace("</body>", LIVE + "\n</body>") : html + LIVE);
    return;
  }
  res.writeHead(200, { "content-type": type, "cache-control": "no-store" });
  res.end(body);
}).listen(port, () => {
  console.log(
    `irisui dev: http://localhost:${port}${watching ? ` (watching, rebuild after ${debounce}ms of quiet)` : " (watching off)"}`,
  );
  if (watching) build();
});

// ---------- watch ----------

const ignore = /(^|\/)(dist|node_modules|\.build|\.playwright|\.git)(\/|$)|(^|\/)\.DS_Store$/;
let timer = null;
for (const dir of ["src", "public", "scripts"]) {
  watch(join(ROOT, dir), { recursive: true }, (_event, file) => {
    if (!file || ignore.test(file) || !watching) return;
    clearTimeout(timer);
    timer = setTimeout(build, debounce);
  });
}
