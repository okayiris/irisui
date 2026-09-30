// Reads the design system that sits in src/content/ (the published Iris Design System, release v32)
// and turns it into the data the site renders: components, their props, their live demos, their docs.

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

// The bundle of this renderer lives in .build/, so the repo root is set by the build script (or the cwd).
export const ROOT = process.env.IRISUI_ROOT ?? process.cwd();
export const CONTENT = join(ROOT, "src", "content");

const read = (p: string) => (existsSync(p) ? readFileSync(p, "utf8") : "");
const exists = (p: string) => existsSync(p) && statSync(p).isFile();

/** The artifact writes a generated marker as an HTML comment at the top of some READMEs: not for a reader. */
const stripNotes = (md: string) => md.replace(/^\s*<!--[\s\S]*?-->\s*/g, "");

export type Prop = { name: string; type: string; required: boolean };
export type Variant = { label: string; code: string };
export type Component = {
  id: string;
  name: string;
  group: string;
  height: number;
  summary: string;
  readme: string;
  api: string;
  props: Prop[];
  variants: Variant[];
  /** The raw preview.html, when a preview exists: the source of the live demo. */
  preview?: string;
  /** The preview draws a whole showcase, not labelled variants: show it as one live frame. */
  showcase: boolean;
  dir: string;
};

/** The group the design system itself gives a preview: `<!-- @dsCard group="Controls" height=420 -->`. */
function cardHeader(html: string): { group: string; height: number } {
  const m = /@dsCard([^>]*)>/.exec(html.slice(0, 400));
  const attrs = m?.[1] ?? "";
  const group = /group="([^"]*)"/.exec(attrs)?.[1] ?? "";
  const height = Number(/height=(\d+)/.exec(attrs)?.[1] ?? 0);
  return { group, height };
}

/** Pull `window.__dsPreview = { Label: () => h(…), … };` out of a preview: label -> code. */
function variantsOf(html: string): Variant[] {
  const start = html.indexOf("window.__dsPreview");
  if (start < 0) return [];
  const open = html.indexOf("{", start);
  if (open < 0) return [];
  const body = sliceBalanced(html, open);
  if (!body) return [];
  const out: Variant[] = [];
  for (const entry of splitTop(body.slice(1, -1), ",")) {
    const m = /^\s*(?:"([^"]+)"|'([^']+)'|([A-Za-z_$][\w$]*))\s*:\s*(.+)$/s.exec(entry);
    if (!m) continue;
    const label = m[1] ?? m[2] ?? m[3];
    out.push({ label, code: m[4].trim().replace(/,\s*$/, "") });
  }
  return out;
}

/** The text between an opening bracket at `at` and its match, brackets included. */
function sliceBalanced(s: string, at: number): string | null {
  const open = s[at];
  const close = open === "{" ? "}" : open === "(" ? ")" : "]";
  let depth = 0;
  let inStr: string | null = null;
  for (let i = at; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (c === "\\") i++;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") inStr = c;
    else if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return s.slice(at, i + 1);
    }
  }
  return null;
}

/** Split on a separator that sits at depth 0 and outside strings. */
function splitTop(s: string, sep: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let inStr: string | null = null;
  let cur = "";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      cur += c;
      if (c === "\\") cur += s[++i] ?? "";
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = c;
      cur += c;
      continue;
    }
    if ("{([".includes(c)) depth++;
    if ("})]".includes(c)) depth--;
    if (c === sep && depth === 0) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += c;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

/** Props from index.d.ts: `export declare function Button(props: { a?: X; b: Y }): JSX.Element;` */
export function parseProps(dts: string): Record<string, Prop[]> {
  const out: Record<string, Prop[]> = {};
  const chunks = dts.split(/export declare function\s+/).slice(1);
  for (const chunk of chunks) {
    const nameM = /^([A-Za-z0-9_]+)/.exec(chunk);
    if (!nameM) continue;
    const name = nameM[1];
    // The props object is the first brace group after the signature's `props:` — braces are matched, so a
    // `)` or `;` inside a type (`(i: number) => void`, `Record<string, x>`) cannot end it early.
    const end = chunk.indexOf("): JSX.Element");
    const sig = end > 0 ? chunk.slice(0, end) : chunk;
    const propsAt = sig.indexOf("{");
    if (propsAt < 0) {
      out[name] = [];
      continue;
    }
    const inner = sliceBalanced(sig, propsAt);
    if (!inner) {
      out[name] = [];
      continue;
    }
    const props: Prop[] = [];
    for (const piece of splitProps(inner.slice(1, -1))) {
      const pm = /^\s*([A-Za-z_$][\w$]*)(\??)\s*:\s*([\s\S]+)$/.exec(piece);
      if (!pm) continue;
      props.push({
        name: pm[1],
        type: pm[3].replace(/\s+/g, " ").trim(),
        required: pm[2] !== "?",
      });
    }
    out[name] = props;
  }
  return out;
}

/** Split a props body on the `;` and `,` that separate props, never inside a nested group. */
function splitProps(body: string): string[] {
  return splitTop(body, ";")
    .flatMap((piece) => (depthFree(piece) ? splitTop(piece, ",") : [piece]))
    .filter((piece) => /[A-Za-z_$][\w$]*\??\s*:/.test(piece));
}

/** True when a piece has no unclosed bracket: then an inner `,` also separates props. */
function depthFree(s: string): boolean {
  let depth = 0;
  let inStr: string | null = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (c === "\\") i++;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") inStr = c;
    else if ("{([<".includes(c)) depth++;
    else if ("})]>".includes(c)) depth--;
  }
  return depth === 0;
}

export function loadComponents(): Component[] {
  const dir = join(CONTENT, "components");
  if (!existsSync(dir)) return [];
  const dts = read(join(dir, "index.d.ts"));
  const props = parseProps(dts);
  const comps: Component[] = [];
  for (const name of readdirSync(dir)) {
    const at = join(dir, name);
    if (!statSync(at).isDirectory()) continue;
    const previewFile = join(at, "preview.html");
    const preview = exists(previewFile) ? read(previewFile) : undefined;
    const readme = stripNotes(read(join(at, "README.md")));
    const header = preview ? cardHeader(preview) : { group: "", height: 0 };
    const variants = preview ? variantsOf(preview) : [];
    const api = stripNotes(read(join(CONTENT, "api", "components", `${name}.md`)));
    const summary = firstSentence(api || readme);
    comps.push({
      id: name.toLowerCase(),
      name,
      group: header.group || "Other",
      height: header.height,
      summary,
      readme,
      api,
      props: props[name] ?? [],
      variants,
      preview,
      showcase: variants.length === 0,
      dir: at,
    });
  }
  comps.sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
  return comps;
}

function firstSentence(md: string): string {
  const para = stripNotes(md)
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith("#"));
  if (!para) return "";
  const s = para.replace(/[`*_]/g, "");
  const cut = s.indexOf(". ");
  return cut > 0 ? s.slice(0, cut + 1) : s;
}

/** The chapters: README.md, screens.md, apps.md, tokens.md … shipped with the system. */
export function loadChapters(): { id: string; title: string; body: string }[] {
  const out: { id: string; title: string; body: string }[] = [];
  for (const f of readdirSync(CONTENT)) {
    if (!f.endsWith(".md")) continue;
    const body = read(join(CONTENT, f));
    const title = /^#\s+(.*)$/m.exec(body)?.[1] ?? f.replace(/\.md$/, "");
    out.push({ id: f.replace(/\.md$/, "").toLowerCase(), title, body });
  }
  return out;
}

export type Token = { name: string; value: string; comment: string; group: string };

/** Every `--token: value; /* comment *​/` in tokens.css, grouped by the first word of its comment. */
export function loadTokens(): Token[] {
  const css = loadTokensCss();
  const out: Token[] = [];
  const seen = new Set<string>();
  const re = /--([a-z0-9-]+):\s*([^;]+);(?:\s*\/\*\s*([^*]*)\*\/)?/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css))) {
    const name = m[1];
    if (seen.has(name)) continue;
    seen.add(name);
    const comment = (m[3] ?? "").trim();
    const group = name.startsWith("topic")
      ? "Topic accents"
      : name.startsWith("phase")
        ? "Loop phases"
        : name.startsWith("text-")
          ? "Type"
          : name.startsWith("font")
            ? "Fonts"
            : name.startsWith("radius")
              ? "Radius"
              : name.startsWith("pad") || name.startsWith("gap") || name.startsWith("gutter")
                ? "Spacing"
                : comment.toLowerCase().includes("destructive") || /^(ok|wait|error|violet|accent)/.test(name)
                  ? "Colour"
                  : /#[0-9a-f]{3,8}|rgba?\(|gradient|oklch/i.test(m[2])
                    ? "Colour"
                    : "Other";
    out.push({ name, value: m[2].trim(), comment, group });
  }
  return out;
}

/** The machine-readable layer lives in public/ds/, beside the bundle it describes. */
export const SHIPPED = join(ROOT, "public", "ds");

export function loadManifest(): any {
  return JSON.parse(read(join(SHIPPED, "manifest.json")) || "{}");
}

export function loadTokensJson(): any {
  return JSON.parse(read(join(SHIPPED, "tokens.json")) || "{}");
}

export function loadTokensCss(): string {
  return read(join(SHIPPED, "tokens.css"));
}
