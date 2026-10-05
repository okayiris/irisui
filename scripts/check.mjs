// The gate for this site: builds nothing, but looks at what was built.
//
//   node scripts/check.mjs            (after node scripts/build.mjs)
//
// For every page it loads: no console error, no failed request, no sideways scroll, a real h1, and every
// demo frame mounted a component (its root has height). Contrast is measured in light and dark. Shots land in .playwright/.

import { spawn } from "node:child_process";
import { existsSync, readFileSync, readdirSync, mkdirSync, rmSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SHOTS = join(ROOT, ".playwright");

const playwright = (() => {
  try {
    return require(require.resolve("playwright"));
  } catch {
    /* fall through to the npx cache */
  }
  const cache = join(process.env.HOME ?? "", ".npm/_npx");
  for (const map of existsSync(cache) ? readdirSync(cache) : []) {
    const p = join(cache, map, "node_modules/playwright");
    if (existsSync(p)) return require(p);
  }
  return null;
})();

if (!playwright) {
  console.error("playwright not found; run `npx playwright install chromium`");
  process.exit(2);
}
if (!existsSync(DIST)) {
  console.error("no dist/ — run `node scripts/build.mjs` first");
  process.exit(2);
}

const PORT = process.env.PORT ? Number(process.env.PORT) : 4188;

// Where to look: the build beside us (default) or a site that is already up. `--base https://…` points the
// whole gate at a deployed site, which is how the published one is checked from outside.
const baseArg = process.argv.find((a) => a.startsWith("--base="))?.slice("--base=".length) ?? process.env.BASE ?? "";
const BASE = (baseArg || `http://localhost:${PORT}`).replace(/\/$/, "");

// When the build carries a path prefix (a copy under a subpath), the links written into it start with it.
const PREFIX = (process.env.IRISUI_BASE_PATH ?? "").replace(/\/+$/, "");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const at = join(dir, name);
    if (statSync(at).isDirectory()) walk(at, out);
    else if (name === "index.html") out.push(at);
  }
  return out;
}

const pages = walk(DIST)
  .map((f) => "/" + relative(DIST, f).replace(/index\.html$/, ""))
  .filter((p) => !p.startsWith("/demos/"))
  // ponytail: the local Ringlab pages (/lab/*, which frame localhost:5190, and the theme-lab example) never fire
  // "load" and hung the gate. They are never published; skipped until they settle. Take this line out to gate them.
  .filter((p) => p !== "/examples/labs/theme-lab/" && !p.startsWith("/lab/"));

// The frames the pages point at, checked once each rather than per page.
const demos = [];
for (const c of readdirSync(join(DIST, "demos"))) {
  for (const f of readdirSync(join(DIST, "demos", c))) {
    if (f.endsWith(".html") && f !== "index.html") demos.push(`/demos/${c}/${f}`);
  }
}

const server = BASE.includes("localhost")
  ? spawn(process.execPath, [join(ROOT, "scripts/serve.mjs"), String(PORT)], { cwd: ROOT, stdio: "ignore" })
  : null;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function up() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`${BASE}/`);
      if (r.ok) return true;
    } catch {
      /* not yet */
    }
    await wait(150);
  }
  return false;
}

rmSync(SHOTS, { recursive: true, force: true });
mkdirSync(SHOTS, { recursive: true });

// Nothing that looks like a credential may reach a published file: this repo is public, and a key in a
// bundle is the one mistake you cannot take back.
const SECRETS = [
  /gho_[A-Za-z0-9]{20,}/,
  /ghp_[A-Za-z0-9]{20,}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /sk-[A-Za-z0-9]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN [A-Z ]*PRIVATE KEY/,
  /x-access-token:[A-Za-z0-9_-]{20,}/,
  /[Bb]earer\s+[A-Za-z0-9._-]{30,}/,
  /(?:api[_-]?key|secret|passwd|password)\s*[:=]\s*["'][A-Za-z0-9_\-]{24,}["']/,
];
const TEXT = /\.(?:js|mjs|ts|tsx|json|css|html|md|txt|svg|xml|yml|yaml)$/i;

function scanForSecrets(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const at = join(dir, name);
    if (statSync(at).isDirectory()) scanForSecrets(at, out);
    else if (TEXT.test(name)) {
      const body = readFileSync(at, "utf8");
      for (const re of SECRETS) {
        const hit = re.exec(body);
        if (hit) out.push(`${relative(DIST, at)}: looks like a secret (${hit[0].slice(0, 12)}…)`);
      }
    }
  }
  return out;
}

const failures = [];

// Contrast. The tokens this site and the added parts put words in, measured against the surface behind them, in
// both modes: the browser resolves every token in a real frame (tokens.css, bundle.css, ext.css) with the system set
// to light and to dark. Floors are WCAG AA: 4.5:1 for text, 3:1 for large text and graphics. A pair that fails is a
// page a person with ordinary eyesight has to work at.
function toRgb(value, background) {
  if (!value) return null;
  const h = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value);
  if (h) {
    let hex = h[1];
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  }
  const m = /rgba?\(([^)]+)\)/.exec(value);
  if (!m) return null;
  const parts = m[1].split(",").map((x) => parseFloat(x));
  const alpha = parts.length > 3 ? parts[3] : 1;
  const base = background ?? [0, 0, 0];
  return [0, 1, 2].map((i) => Math.round(parts[i] * alpha + base[i] * (1 - alpha)));
}

const luminance = ([r, g, b]) => {
  const f = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const CONTRAST = [
  ["fg", "bg", 4.5, "body text"],
  ["dim", "bg", 4.5, "secondary text"],
  ["label", "bg", 4.5, "labels and small caps"],
  ["accent", "bg", 4.5, "links and accents"],
  ["error", "bg", 4.5, "destructive text"],
  ["ok", "bg", 4.5, "done"],
  ["wait", "bg", 4.5, "waiting"],
  ["violet", "bg", 4.5, "violet text"],
  ["accent-ink", "accent", 4.5, "ink on the accent fill"],
  ["fg", "glass", 4.5, "text on a glass card"],
  ["dim", "sheet-bg", 4.5, "text on a sheet"],
];

/** Every token of CONTRAST as the browser computes it, in the page's current mode. */
const readTokens = (page) =>
  page.evaluate((names) => {
    const probe = document.createElement("i");
    document.body.append(probe);
    const out = {};
    for (const n of names) {
      probe.style.color = "";
      probe.style.color = `var(--${n})`;
      out[n] = getComputedStyle(probe).getPropertyValue(`--${n}`).trim() ? getComputedStyle(probe).color : "";
    }
    probe.remove();
    return out;
  }, [...new Set(CONTRAST.flatMap(([a, b]) => [a, b]))]);

function checkContrast(tokens, mode) {
  const bg = toRgb(tokens.bg, [0, 0, 0]);
  for (const [fgName, bgName, floor, what] of CONTRAST) {
    const back = bgName === "bg" ? bg : toRgb(tokens[bgName], bg);
    const front = toRgb(tokens[fgName], back);
    if (!front || !back) {
      failures.push(`contrast (${mode}): --${fgName} on --${bgName} (${what}) could not be measured`);
      continue;
    }
    const ratio = contrast(front, back);
    if (ratio < floor) failures.push(`contrast (${mode}): --${fgName} on --${bgName} is ${ratio.toFixed(2)}:1, below ${floor} (${what})`);
  }
}

// The files a page cannot work without, fetched directly: on a deployed site this catches a 404 that a
// console alone would only hint at.
const ASSETS = [
  "/site.css",
  "/site.js",
  "/favicon.svg",
  "/llms.txt",
  "/llms-full.txt",
  "/api/site.json",
  "/api/components.json",
  "/api/tokens.json",
  "/ds/tokens.css",
  "/ds/bundle.css",
  "/ds/bundle.js",
  "/ds/ext.css",
  "/ds/ext.js",
  "/ds/index.d.ts",
  "/ds/vendor/react.js",
  "/ds/vendor/react-dom.js",
  "/ds/fonts/Caveat-700.woff2",
  "/ds/placeholder.svg",
  "/demos/button/0.html",
  "/demos/menu/0.html",
];

// The published files first: no key, no token, nothing that looks like one.
for (const hit of scanForSecrets(DIST)) failures.push(hit);

// Her size: the steps in "Which Iris, how big" (the Mark page). A TalkOrb draws its ring at a third of its
// size, so under 60 it is a dot; an Orb only takes the four small steps.
// ponytail: reads literal sizes in the example pages only; a size from a variable is not seen.
const ORB_STEPS = [16, 22, 28, 34];
for (const file of walk(join(DIST, "examples")).filter((f) => f.endsWith(".html"))) {
  for (const [, name, size] of readFileSync(file, "utf8").matchAll(/h\((Orb|TalkOrb|Orb3D), \{[^}]*?size: (\d+)/g)) {
    const n = Number(size);
    if (name === "Orb" ? !ORB_STEPS.includes(n) : n < (name === "TalkOrb" ? 60 : 100))
      failures.push(`${relative(DIST, file)}: ${name} at ${n}, not a step in "Which Iris, how big"`);
  }
}
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });

const consoleErrors = [];
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => consoleErrors.push(String(e)));
page.on("requestfailed", (r) => {
  // ERR_ABORTED is what a browser reports for a request still in flight when the page moves on: not a 404.
  const why = r.failure()?.errorText ?? "";
  if (why.includes("ERR_ABORTED")) return;
  consoleErrors.push(`failed ${r.url()} ${why}`);
});

if (!(await up())) {
  console.error(`nothing answers at ${BASE}`);
  server?.kill();
  process.exit(1);
}

for (const mode of ["dark", "light"]) {
  await page.emulateMedia({ colorScheme: mode });
  await page.goto(`${BASE}/demos/button/0.html`, { waitUntil: "load" });
  checkContrast(await readTokens(page), mode);
}
await page.emulateMedia({ colorScheme: "dark" });

for (const p of pages) {
  consoleErrors.length = 0;
  await page.goto(`${BASE}${p}`, { waitUntil: "load" });
  await page.waitForTimeout(120);

  const info = await page.evaluate(() => {
    const named = (el) =>
      (el.getAttribute("aria-label") || el.textContent || el.getAttribute("title") || "").trim() ||
      (el.querySelector("img[alt]")?.getAttribute("alt") || "").trim();
    const levels = Array.from(document.querySelectorAll("h1, h2, h3, h4")).map((el) => Number(el.tagName[1]));
    let skip = "";
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1) skip = `h${levels[i - 1]} -> h${levels[i]}`;
    }
    return {
      h1: document.querySelector("h1")?.textContent?.trim() ?? "",
      h1count: document.querySelectorAll("h1").length,
      skip,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      title: document.title,
      lang: document.documentElement.lang,
      landmarks: { main: document.querySelectorAll("main").length, nav: document.querySelectorAll("nav").length },
      untitledFrames: Array.from(document.querySelectorAll("iframe")).filter((f) => !f.getAttribute("title")).length,
      imagesWithoutAlt: Array.from(document.querySelectorAll("img")).filter((i) => !i.hasAttribute("alt")).length,
      namelessControls: Array.from(document.querySelectorAll("button, a[href]")).filter((el) => !named(el)).length,
      positiveTabindex: Array.from(document.querySelectorAll("[tabindex]")).filter((el) => Number(el.getAttribute("tabindex")) > 0).length,
      links: Array.from(document.querySelectorAll("a[href]"))
        .map((a) => a.getAttribute("href"))
        .filter((h) => h && h.startsWith("/") && !h.startsWith("//")),
      // Two block-level parts under each other never touch (src/ds/ext.css, "Rhythm: two blocks under each
      // other"), and a container that lays its own children out gives that space itself: inside such a container
      // the block must not pay the gap a second time (data-rhythm="off"). Measured, because a page that glues
      // two cards together looks fine in a diff and broken in a browser (the admin panel's Releases page,
      // 02-10-2026).
      glued: (() => {
        const BLOK = ".iris-card, .ix-appbar, .ix-empty";
        const uit = [];
        for (const el of document.querySelectorAll(BLOK)) {
          const vorige = el.previousElementSibling;
          if (!vorige || !vorige.matches(BLOK)) continue;
          const a = vorige.getBoundingClientRect(), b = el.getBoundingClientRect();
          if (a.height < 8 || b.height < 8) continue;
          if (Math.min(a.right, b.right) - Math.max(a.left, b.left) <= 0) continue;   // next to each other, not under
          if (b.top - a.bottom < 2) uit.push(`${vorige.className} + ${el.className}`);
        }
        return uit;
      })(),
      crooked: (() => {
        const BLOK = ".iris-card, .ix-appbar, .ix-empty";
        const uit = [];
        for (const el of document.querySelectorAll(BLOK)) {
          const ouder = el.parentElement;
          if (!ouder) continue;
          const s = getComputedStyle(ouder);
          const eigenGat = /grid|flex/.test(s.display) && parseFloat(s.rowGap || s.gap || "0") > 0;
          if (eigenGat && parseFloat(getComputedStyle(el).marginBlockStart) > 0) uit.push(el.className);
        }
        return uit;
      })(),
    };
  });

  if (!info.h1) failures.push(`${p}: no h1`);
  if (info.h1count > 1) failures.push(`${p}: ${info.h1count} h1 elements`);
  if (info.skip) failures.push(`${p}: heading level jumps (${info.skip})`);
  if (info.overflow > 2) failures.push(`${p}: scrolls sideways by ${info.overflow}px`);
  if (!info.title) failures.push(`${p}: no title`);
  if (info.lang !== "en") failures.push(`${p}: html lang is "${info.lang}"`);
  if (info.landmarks.main !== 1) failures.push(`${p}: ${info.landmarks.main} main landmarks`);
  if (!info.landmarks.nav) failures.push(`${p}: no nav landmark`);
  if (info.untitledFrames) failures.push(`${p}: ${info.untitledFrames} iframe(s) without a title`);
  if (info.imagesWithoutAlt) failures.push(`${p}: ${info.imagesWithoutAlt} image(s) without alt`);
  if (info.namelessControls) failures.push(`${p}: ${info.namelessControls} control(s) with no accessible name`);
  if (info.positiveTabindex) failures.push(`${p}: ${info.positiveTabindex} element(s) with a positive tabindex`);
  if (info.glued.length) failures.push(`${p}: kit blocks touch, with no gap between them (${info.glued.slice(0, 3).join(" | ")})`);
  if (info.crooked.length) failures.push(`${p}: a block inside a container with its own gap pays the space twice (${info.crooked.slice(0, 3).join(" | ")})`);
  if (consoleErrors.length) failures.push(`${p}: ${consoleErrors.slice(0, 2).join(" | ")}`);

  // Every internal link must land on a file that is in the build: a public site with a dead link is broken.
  for (const href of info.links) {
    const withoutPrefix = PREFIX && href.startsWith(PREFIX + "/") ? href.slice(PREFIX.length) : href;
    const clean = withoutPrefix.split("#")[0].split("?")[0];
    if (!clean || clean === "/") continue;
    const candidates = [clean.replace(/^\//, ""), `${clean.replace(/^\//, "").replace(/\/$/, "")}/index.html`, `${clean.replace(/^\//, "")}.md`];
    if (!candidates.some((c) => existsSync(join(DIST, c)))) {
      failures.push(`${p}: link goes nowhere -> ${href}`);
    }
  }

  if (p === "/" || p === "/components/button" || p === "/components/widget" || p === "/components/effects") {
    // Both modes: the light one is where a fixed dark colour shows up as an island.
    await page.screenshot({ path: join(SHOTS, `page${p.replace(/\//g, "_")}.png`), fullPage: false });
    await page.emulateMedia({ colorScheme: "light" });
    await page.waitForTimeout(150);
    await page.screenshot({ path: join(SHOTS, `page${p.replace(/\//g, "_")}-light.png`), fullPage: false });
    await page.emulateMedia({ colorScheme: "dark" });
  }
}

// Every demo frame must have mounted something.
for (const d of demos) {
  consoleErrors.length = 0;
  await page.setViewportSize({ width: 900, height: 700 });
  await page.goto(`${BASE}${d}`, { waitUntil: "load" });
  await page.waitForTimeout(200);
  // A preview either mounts a component (the root grows) or is a static drawing (Cover, Effects): both
  // count as drawn when the page has a visible box that is not a script or a stylesheet.
  const box = await page.evaluate(() => {
    const visible = Array.from(document.body.children).filter(
      (el) => !["SCRIPT", "STYLE", "LINK"].includes(el.tagName),
    );
    const tallest = visible.reduce((max, el) => Math.max(max, el.getBoundingClientRect().height), 0);
    return { h: Math.max(tallest, document.body.scrollHeight) };
  });
  if (box.h < 8) failures.push(`${d}: nothing drawn (height ${box.h})`);

  // A frame that could not mount its variant says so in the page: that is a failure, not a small box.
  const broke = await page.evaluate(() => (document.body.innerText.includes("preview failed") ? document.body.innerText.slice(0, 160) : ""));
  if (broke) failures.push(`${d}: ${broke.replace(/\s+/g, " ")}`);
  if (consoleErrors.length) failures.push(`${d}: ${consoleErrors.slice(0, 2).join(" | ")}`);
}

// The two things a visitor actually does: search, and open the code behind a frame.
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(`${BASE}/`, { waitUntil: "load" });
await page.waitForTimeout(150);
await page.keyboard.press("/");
const focused = await page.evaluate(() => document.activeElement?.id ?? "");
if (focused !== "search") failures.push(`search: "/" did not focus the field (focus on "${focused}")`);

await page.keyboard.type("glass");
await page.waitForTimeout(400);
const hits = await page.evaluate(() =>
  Array.from(document.querySelectorAll("#search-panel .search-hit")).map((a) => a.getAttribute("href")),
);
const localOf = (href) => {
  const withoutPrefix = PREFIX && href?.startsWith(PREFIX + "/") ? href.slice(PREFIX.length) : href ?? "";
  return withoutPrefix.replace(/^\//, "");
};
if (!hits.length) failures.push("search: no hits for a word that is all over the system");
else if (!hits.every((h) => existsSync(join(DIST, localOf(h), "index.html")))) {
  failures.push(`search: a hit points at nothing (${hits[0]})`);
}
await page.keyboard.press("Escape");
if (!(await page.evaluate(() => document.getElementById("search-panel")?.hidden))) {
  failures.push("search: Escape did not close the panel");
}

await page.goto(`${BASE}/components/button`, { waitUntil: "load" });
await page.waitForTimeout(150);
const toggled = await page.evaluate(() => {
  const btn = document.querySelector("[data-code]");
  const pre = btn && document.getElementById(btn.dataset.code);
  if (!btn || !pre) return "no code button";
  btn.click();
  return pre.hidden ? "still hidden" : "shown";
});
if (toggled !== "shown") failures.push(`code toggle: ${toggled}`);

for (const asset of ASSETS) {
  // BASE already carries the mount path when it is a deployed copy; the asset paths are site-relative.
  const url = `${BASE}${asset}`;
  try {
    const r = await fetch(url, { method: "GET" });
    if (!r.ok) failures.push(`${asset}: ${r.status} at ${url}`);
  } catch (e) {
    failures.push(`${asset}: ${String(e).slice(0, 80)} at ${url}`);
  }
}

await browser.close();
server?.kill();

if (failures.length) {
  console.error(`irisui check: ${failures.length} failures over ${pages.length} pages and ${demos.length} demos`);
  for (const f of failures.slice(0, 40)) console.error("  " + f);
  process.exit(1);
}
console.log(`irisui check: ${pages.length} pages and ${demos.length} demo frames clean at ${BASE}`);
