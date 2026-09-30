// A small Markdown renderer: enough for the design system's chapters (headings, lists, tables, code,
// links, bold, inline code). No HTML pass-through except for our own <br> and the escape rules below.

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Inline: code, bold, italic, links, bare urls. Input is already escaped. */
function inline(s: string): string {
  let out = esc(s);
  out = out.replace(/`([^`]+)`/g, (_m, c) => `<code>${c}</code>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_m, t, u) => `<a href="${u}">${t}</a>`,
  );
  out = out.replace(
    /(^|[\s(])(https?:\/\/[^\s<)]+)/g,
    (_m, p, u) => `${p}<a href="${u}">${u}</a>`,
  );
  return out;
}

export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_[\]()]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export type Heading = { level: number; text: string; id: string };

/** Render Markdown to HTML and collect its headings (for the on-this-page rail). */
export function markdown(md: string, opts: { shift?: number } = {}): { html: string; headings: Heading[] } {
  // A body dropped into a page that already has an h1 shifts down, so a page never holds two h1s and the
  // outline stays in order.
  const shift = opts.shift ?? 0;
  // Generated markers in the artifact are HTML comments: they are for its tools, not for a reader.
  md = md.replace(/<!--[\s\S]*?-->/g, "");
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  const headings: Heading[] = [];
  let i = 0;
  let para: string[] = [];

  const flush = () => {
    if (!para.length) return;
    out.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };

  while (i < lines.length) {
    const line = lines[i];

    // fenced code
    if (/^\s*```/.test(line)) {
      flush();
      const lang = line.trim().replace(/^```/, "").trim();
      const body: string[] = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) body.push(lines[i++]);
      i++;
      out.push(
        `<pre class="code"${lang ? ` data-lang="${esc(lang)}"` : ""}><code>${esc(body.join("\n"))}</code></pre>`,
      );
      continue;
    }

    // table
    if (/^\s*\|/.test(line) && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] ?? "")) {
      flush();
      const cells = (l: string) =>
        l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const head = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(cells(lines[i++]));
      out.push(
        `<div class="table-wrap"><table><thead><tr>${head
          .map((c) => `<th>${inline(c)}</th>`)
          .join("")}</tr></thead><tbody>${rows
          .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
          .join("")}</tbody></table></div>`,
      );
      continue;
    }

    // heading
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      flush();
      const level = Math.min(h[1].length + shift, 6);
      const text = h[2].trim();
      const id = slug(text);
      if (headings.every((x) => x.id !== id)) headings.push({ level, text, id });
      out.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      i++;
      continue;
    }

    // horizontal rule
    if (/^\s*---\s*$/.test(line)) {
      flush();
      out.push("<hr />");
      i++;
      continue;
    }

    // list (ordered or bullet), with one nesting level
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      flush();
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items: string[] = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        const item: string[] = [lines[i].replace(/^\s*([-*]|\d+\.)\s+/, "")];
        i++;
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
          item.push(lines[i].trim());
          i++;
        }
        items.push(item.join(" "));
      }
      const tag = ordered ? "ol" : "ul";
      out.push(`<${tag}>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</${tag}>`);
      continue;
    }

    // blank
    if (!line.trim()) {
      flush();
      i++;
      continue;
    }

    para.push(line.trim());
    i++;
  }
  flush();
  return { html: out.join("\n"), headings };
}

/** The first sentence or two of a Markdown body, for summaries and meta tags. */
export function lede(md: string, max = 240): string {
  const body = md
    .split("\n")
    .filter((l) => l.trim() && !/^#{1,6}\s/.test(l) && !/^\s*\|/.test(l) && !/^\s*```/.test(l))
    .join(" ")
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (body.length <= max) return body;
  const cut = body.slice(0, max);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(". "));
  return (stop > 80 ? cut.slice(0, stop + 1) : cut.trimEnd() + "…").trim();
}
