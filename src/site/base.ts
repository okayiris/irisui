// Where the site is served from.
//
// At ui.okayiris.com it sits at the root, and every absolute path is written as "/…". A preview of the same
// build can sit under a subpath (the GitHub Pages copy answers on /irisui/), so the prefix is a build input:
//
//   IRISUI_BASE_PATH=/irisui node scripts/build.mjs
//
// Everything that points at something on this site goes through here, or through rewriteBase() on the
// rendered HTML, so a copy under a subpath is not a copy with broken styling.

export const BASE = (process.env.IRISUI_BASE_PATH ?? "").replace(/\/+$/, "");

/** The address this copy is published at: the canonical URL, the sitemap and the og:url all use it.
 *  Default is the real domain; the GitHub Pages copy is published with its own address until DNS points here. */
export const CANONICAL = (process.env.IRISUI_CANONICAL ?? "https://ui.okayiris.com").replace(/\/+$/, "");

/** A path on this site, with the prefix when there is one. */
export const url = (path: string) => (path.startsWith("/") ? BASE + path : path);

/** Prefix the same-origin paths inside a finished HTML page (href, src, action). */
export function rewriteBase(html: string): string {
  if (!BASE) return html;
  return html.replace(/(\s(?:href|src|action)=")(\/[^"]*)"/g, (_m, before: string, path: string) => {
    // A path that already went through url() keeps its prefix: prefixing twice is a dead URL.
    if (path.startsWith(`${BASE}/`)) return `${before}${path}"`;
    return `${before}${BASE}${path}"`;
  });
}

/** Prefix the same-origin paths inside a text file we publish for machines (Markdown, JSON, llms.txt). */
export function rewriteBaseText(text: string): string {
  if (!BASE) return text;
  return text.replace(
    /(^|[^:\w./])\/(components|foundations|patterns|chapters|resources|llms|api|ds|demos)\b/g,
    (_m, before: string, part: string) => `${before}${BASE}/${part}`,
  );
}
