// Demo frames. A live preview on this site is always the real component: either the design system's own
// preview (its markup and its script, run as it ships), or — for the parts added in this project, which have
// no preview file yet — the variant's own code, evaluated with every IrisUi part in scope.

import type { Component, Variant } from "./parse";
import { rewriteBlobs } from "./blobs";
import { BASE } from "./base";

const CSS = (ds: string) => `<link rel="stylesheet" href="${ds}/tokens.css">
<link rel="stylesheet" href="${ds}/bundle.css">
<link rel="stylesheet" href="${ds}/ext.css">
<link rel="stylesheet" href="${ds}/extra.css">
<link rel="stylesheet" href="${ds}/placeholder.css">
<link rel="stylesheet" href="${ds.replace(/\/ds$/, "")}/demos.css">
<link rel="icon" href="/favicon.svg">
<style>html,body{margin:0;background:var(--bg)}body{font-family:var(--font-text)}
/* A frame is as narrow as a phone: nothing a preview sets in pixels may push past it. */
#root{box-sizing:border-box;max-width:100%}#root>*{min-width:0;max-width:100%}#root div[style*="width:"]{max-width:100%}#root .ix-macpill div{max-width:none}
/* Orb3D's hero ships with its formula editor: lab tooling. On the component page the orb stands alone. */
[data-demo="orb3d:0"] .o3-controls,[data-demo="orb3d:0"] textarea,[data-demo="orb3d:0"] textarea~*{display:none}</style>`;

/** React, ReactDOM, the shipped bundle and the additions load before any preview script runs. */
const LIBS = (ds: string) => `<script src="${ds}/vendor/react.js"></script>
<script src="${ds}/vendor/react-dom.js"></script>
<script src="${ds}/bundle.js"></script>
<script src="${ds}/ext.js"></script>`;

/**
 * Last resort for a release preview drawn at a fixed width wider than a phone (the Cover is 960px): scale it down
 * to the frame instead of cutting it off. ponytail: zoom shrinks the text too; a preview that reflows is better,
 * and the release should ship one.
 */
const FIT = `<script>
(() => {
  const fit = () => {
    for (const el of document.body.children) {
      if (el.tagName === "SCRIPT") continue;
      el.style.zoom = "";
      const W = document.documentElement.clientWidth, w = el.scrollWidth, L = Math.max(0, el.getBoundingClientRect().left);
      if (w + 2 * L > W + 1) el.style.zoom = String((W - 2 * L) / w);
    }
  };
  addEventListener("load", () => setTimeout(fit, 300));
  addEventListener("resize", fit);
})();
</script>`;

const shell = (ds: string, body: string) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<title>Iris UI preview</title>
${CSS(ds)}
</head><body>
${LIBS(ds)}
${body}
${FIT}
</body></html>`;

/** A preview that pulls a face from Google Fonts gets it from /ds/extra.css instead: one origin, no third party. */
const localFontsOnly = (html: string) =>
  html
    .replace(/<link[^>]*fonts\.(?:googleapis|gstatic)\.com[^>]*>/gi, "")
    .replace(/@import[^;]*fonts\.googleapis[^;]*;/gi, "");

/** The root the preview mounts into, and the style it likes, taken from the preview itself. */
function rootOf(preview: string): { id: string; style: string } {
  const withoutStyles = preview.replace(/<style[\s\S]*?<\/style>/gi, "");
  const m = /<div\s+id="([A-Za-z0-9_-]+)"([^>]*)>/i.exec(withoutStyles);
  const id = m?.[1] ?? "root";
  const attrs = m?.[2] ?? "";
  const style = /style="[^"]*"/i.exec(attrs)?.[0];
  return { id, style: style ?? 'style="background:var(--bg);color:var(--fg);padding:16px;font-family:var(--font-text)"' };
}

/** Guard a script body so a stray `</script` cannot end the inline element early. */
const safe = (s: string) => s.replace(/<\/script/gi, "<\\/script");

/**
 * A frame for the parts this project added: one cell per variant, the label above it, the variant's own code
 * evaluated with the whole system in scope. `only` shows a single cell.
 */
function addedFrame(c: Component, only?: { variant: Variant; index: number }, ds = `${BASE}/ds`): string {
  const list = only ? [only] : c.variants.map((v, i) => ({ variant: v, index: i }));
  const cells = list
    .map(
      (item) => `  {
    const cell = document.createElement("div");
    cell.innerHTML = ${only ? "''" : `'<div style="font:500 10px var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--label);margin:0 0 8px 2px">' + ${JSON.stringify(item.variant.label)} + '</div>'`} + '<div style="position:relative"></div>';
    root.appendChild(cell);
    try { mount(cell.lastChild, run(${JSON.stringify(safe(item.variant.code))})); }
    catch (e) { cell.lastChild.textContent = "preview failed: " + e.message; }
  }`,
    )
    .join("\n");

  return shell(
    ds,
    `<div id="root" style="background:var(--bg);color:var(--fg);padding:16px;display:grid;gap:20px;font-family:var(--font-text)"></div>
<script>
(() => {
  const h = React.createElement, root = document.getElementById("root");
  // Sloppy mode on purpose: a with block puts every IrisUi part in scope, so a variant's code reads exactly
  // as it was written for the artifact (h(Badge, ...), not IrisUi.Badge).
  const run = (source) => new Function("h", "IrisUi", "with (IrisUi) { return (" + source + "); }")(h, window.IrisUi);
  // A variant whose code is a function is a component, not a value to call: it may use hooks (useState for a
  // slider, a menu that is open). Handing it to createElement lets React run it as a component, which is what
  // the artifact does too.
  const mount = (node, el) =>
    ReactDOM.createRoot(node).render(h(window.IrisUi.PreviewI18nProvider, null, typeof el === "function" ? h(el) : el));
${cells}
  document.documentElement.setAttribute("data-demo", ${JSON.stringify(c.id)});
})();
</script>`,
  );
}

/**
 * One frame. A component with a shipped preview uses it, whole or with one cell kept; a part added here runs
 * its own variant code.
 */
export function demoFrame(c: Component, only?: { variant: Variant; index: number }, ds = `${BASE}/ds`): string {
  if (!c.preview) return addedFrame(c, only, ds);

  const preview = rewriteBlobs(localFontsOnly(c.preview));
  if (!only) return shell(ds, preview);

  const { id } = rootOf(preview);
  return shell(
    ds,
    `${preview}
<script>
(() => {
  const root = document.getElementById(${JSON.stringify(id)}) ?? document.body.firstElementChild;
  if (!root) return;
  const cells = Array.from(root.children);
  if (!cells.length) return;
  const label = ${JSON.stringify(only.variant.label)};
  const text = (el) => (el.textContent || "").replace(/\\s+/g, " ").trim();
  const keep = cells.find((el) => text(el).startsWith(label)) ?? cells[${only.index}] ?? cells[0];
  for (const el of cells) if (el !== keep) el.remove();
  // The page already names the variant above the frame; the preview's own small caps caption goes.
  const cap = keep.firstElementChild;
  if (cap && /uppercase/.test(cap.getAttribute("style") || "") && text(cap) === label) cap.remove();
  document.documentElement.setAttribute("data-demo", ${JSON.stringify(`${c.id}:${only.index}`)});
})();
</script>`,
  );
}

/** The preview as the artifact shows it: every variant on one page. */
export function previewFrame(c: Component, ds = `${BASE}/ds`): string {
  if (!c.preview) return addedFrame(c, undefined, ds);
  return shell(ds, rewriteBlobs(localFontsOnly(c.preview)));
}
