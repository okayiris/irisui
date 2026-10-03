// Iris Labs Pro: the demo pictures. iris-labs is a paid package, so the site never carries it: the designs are
// drawn here, on this machine, with the package, and only the pictures are published (public/labs-pro/*.webp).
//
//   node scripts/labs-pro-samples.mjs [--pkg=<dir of iris-labs>] [--record]
//
// 1. --record (needs the design lab on http://localhost:5190): asks the lab for the specs and writes
//    scripts/labs-pro/samples.json (the data the pictures are drawn from; it holds no code).
// 2. always: draws every sample with window.IrisLabs in headless Chromium (the package and the lab's app photos are
//    copied to .build/labs-pro-work, which is not committed) and writes <id>-1x.webp and <id>-2x.webp.
// scripts/build.mjs refuses a build that has the package in it.

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LAB = process.env.IRISUI_LAB ?? "http://localhost:5190";
const pkgArg = process.argv.find((a) => a.startsWith("--pkg="));
const PKG = pkgArg ? pkgArg.slice(6) : join(ROOT, "../AGI/.infra/plugins/iris-labs");
const LAB_PUBLIC = process.env.IRISUI_LAB_PUBLIC ?? join(ROOT, "../Ringlab-labs/public");
const DATA = join(ROOT, "scripts/labs-pro");
const WORK = join(ROOT, ".build/labs-pro-work");
const OUT = join(ROOT, "public/labs-pro");

// The salon's own words (spec.content, laid over the topic's copy by the renderer): every key of the "home" topic.
const SALON = {
  name: "Salon", title: "Today", greet: "Good morning, Noor", day: "9 appointments today",
  lede: "Two clients are new. Iris has the colour mixes ready.", hero: "A salon that books itself",
  sub: "Iris answers the phone, fills the gaps in your agenda and reminds every client the day before.",
  action: "New booking",
  stats: [["9", "Appointments today"], ["2", "New clients"], ["EUR 612", "Booked this week", "+14%"], ["3", "Gaps to fill"]],
  items: [["Sanne de Vries", "Cut and wash, with Noor", "09:30"], ["Mo", "Beard trim", "10:15"], ["Lotte Jansen", "Colour, 90 minutes", "11:00"], ["Daan", "Cut", "13:30"], ["Emma", "Wash and style", "14:15"], ["Bram", "Cut and beard", "15:00"]],
  cards: [["Fully booked", "Friday afternoon"], ["Gap", "Tuesday 14:00 to 15:30"], ["Reminders", "Seven sent for tomorrow"], ["Waiting list", "Two clients want a Saturday"]],
  quote: ["Clients book at night and I find a full agenda in the morning.", "Noor Bakker", "Owner, Knipsalon Noor"],
  done: ["Confirmed", "Lotte Jansen", "Colour on Thursday at 11:00, reminder sent", "Open agenda"],
  noticed: ["Saturdays", "fill up three days ahead"],
  chat: [["iris", "Sanne wants to move her cut to Friday. Is 10:00 fine?"], ["me", "Yes, and tell her it is 30 minutes."], ["iris", "Moved. She has the new time and the price."], ["me", "Thanks. Block my lunch every day."]],
  cta: ["Fill your quiet hours", "Iris offers a free slot to clients who book often.", "Set it up"],
  timeline: [["09:30", "Sanne de Vries", "Cut and wash"], ["11:00", "Lotte Jansen", "Colour, 90 minutes"], ["13:00", "Lunch", "Blocked"], ["15:00", "Bram", "Cut and beard"]],
  empty: ["No bookings yet", "Share your booking link and the first client appears here.", "Copy link"],
  form: [["Client", "Sanne de Vries"], ["Treatment", "Cut and wash"], ["With", "Noor"]], formBtn: "Save booking",
  chart: ["Bookings this week", "46"], filters: ["All", "Cut", "Colour", "Beard"],
  media: [["Cut", "30 minutes, EUR 35"], ["Colour", "90 minutes, EUR 85"], ["Wash and style", "45 minutes, EUR 42"]],
  prose: ["A booking page should feel like the salon. Iris keeps your hours, your prices and your tone, and answers the questions you always get."],
};

const design = async (brief) => {
  const r = await fetch(`${LAB}/design`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ brief }) });
  if (!r.ok) throw new Error(`lab ${r.status}`);
  return (await r.json()).spec;
};

if (process.argv.includes("--record")) {
  const salon = { house: "knipsalon-noor", page: "home", topic: "home" };
  const look = async (level, salt, palette, mode = "light") => ({ ...(await design({ ...salon, level, salt, palette, prefs: { mode } })), name: "Knipsalon Noor", headline: "Knipsalon Noor", content: SALON });
  const samples = {
    salon: [{ name: "Quiet", spec: await look(1, "a", "Spring") }, { name: "Rich", spec: await look(3, "b", "Valentine") }, { name: "Loud", spec: await look(4, "c", "Night", "dark") }],
    apps: [],
  };
  for (const [family, seed, name] of [["beauty", 3, "Beauty"], ["juridisch", 5, "Legal"], ["horeca", 7, "Hospitality"], ["zorg", 11, "Care"]]) {
    samples.apps.push({ name, spec: await design({ kind: "app", family, level: 3, seed, prefs: { mode: "light" } }) });
  }
  writeFileSync(join(DATA, "samples.json"), JSON.stringify(samples));
  console.log("recorded", samples.salon.length, "salon looks and", samples.apps.length, "apps");
}

// The work folder: the frame, the package, the specs (photos renamed relative) and the photos they name.
rmSync(WORK, { recursive: true, force: true });
mkdirSync(join(WORK, "labs-pro/photos"), { recursive: true });
let json = readFileSync(join(DATA, "samples.json"), "utf8");
for (const f of new Set(json.match(/\/apps\/photos\/[\w.-]+/g) ?? [])) copyFileSync(join(LAB_PUBLIC, f), join(WORK, "labs-pro/photos", f.split("/").pop()));
writeFileSync(join(WORK, "labs-pro/samples.json"), json.replaceAll("/apps/photos/", "photos/"));
copyFileSync(join(DATA, "frame.html"), join(WORK, "labs-pro/frame.html"));
copyFileSync(join(PKG, "bundle-labs.js"), join(WORK, "labs-pro/iris-labs.js"));
writeFileSync(join(WORK, "labs-pro/iris-labs.css"), readFileSync(join(PKG, "design.css"), "utf8") + "\n" + readFileSync(join(PKG, "labs.css"), "utf8"));

const playwright = (() => {
  try { return require(require.resolve("playwright")); } catch { /* the npx cache, like scripts/check.mjs */ }
  const cache = join(process.env.HOME ?? "", ".npm/_npx");
  for (const m of existsSync(cache) ? readdirSync(cache) : []) { const p = join(cache, m, "node_modules/playwright"); if (existsSync(p)) return require(p); }
  throw new Error("playwright not found; run `npx playwright install chromium`");
})();

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png" };
const server = createServer((req, res) => {
  const p = new URL(req.url, "http://x").pathname;
  const file = p.startsWith("/ds/") ? join(ROOT, "public", p) : p === "/favicon.svg" ? join(ROOT, "public/favicon.svg") : join(WORK, p);
  if (!file.includes("..") && existsSync(file)) res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" }).end(readFileSync(file));
  else res.writeHead(404).end();
});
await new Promise((ok) => server.listen(0, ok));
const base = `http://127.0.0.1:${server.address().port}`;

mkdirSync(OUT, { recursive: true });
const ids = ["salon-0", "salon-1", "salon-2", "booking", "app-0", "app-1", "app-2", "app-3"];
const browser = await playwright.chromium.launch();
const bad = [];
for (const scale of [1, 2]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 760 }, deviceScaleFactor: scale, colorScheme: "light", reducedMotion: "reduce" });
  for (const id of ids) {
    const page = await ctx.newPage();
    page.on("pageerror", (e) => bad.push(`${id}: ${e}`));
    page.on("response", (r) => { if (r.status() >= 400) bad.push(`${id}: ${r.status()} ${r.url()}`); });
    await page.goto(`${base}/labs-pro/frame.html?d=${id}`);
    await page.waitForSelector("html[data-drawn]", { timeout: 15000 });
    await page.waitForTimeout(900);
    const png = join(WORK, `${id}-${scale}x.png`);
    await page.screenshot({ path: png });
    execFileSync("cwebp", ["-quiet", "-q", "82", png, "-o", join(OUT, `${id}-${scale}x.webp`)]);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
server.close();
if (bad.length) { console.error(bad.join("\n")); process.exit(1); }
console.log(`labs-pro: ${ids.length} designs drawn with iris-labs, ${ids.length * 2} pictures in public/labs-pro/`);
