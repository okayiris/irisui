// Renders the whole site to plain HTML files: no framework runtime in the browser, no client routing.
// Every page also gets a Markdown twin, so an LLM can read the same thing a person sees.

import { mkdirSync, writeFileSync, rmSync, cpSync } from "node:fs";
import { dirname, join, sep } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { Shell } from "./Shell";
import { ChapterPage, ComponentPage, DocBody, HomePage, LlmPage, TokensPage } from "./pages";
import { FOUNDATION_DOCS, OVERRIDES, PATTERN_DOCS, RESOURCE_DOCS, chapters, components } from "./content";
import type { Block, Doc } from "./content";
import { FOUNDATIONS, GROUPS, PATTERNS, RESOURCES, SITE, groupOf } from "./nav";
import { loadTokens, ROOT, type Component } from "./parse";
import { demoFrame, previewFrame } from "./demos";
import { LAB } from "./lab";
import { BASE, CANONICAL, rewriteBase, rewriteBaseText, url } from "./base";
import type { Heading } from "./markdown";

export type Page = {
  path: string;
  title: string;
  description: string;
  headings: Heading[];
  content: JSX.Element;
  /** The Markdown twin, when the page has one worth serving. */
  md?: string;
};

const write = (out: string, rel: string, body: string) => {
  const at = join(out, rel);
  mkdirSync(dirname(at), { recursive: true });
  writeFileSync(at, body);
};

/** /components/button -> dist/components/button/index.html */
const htmlPath = (path: string) => (path === "/" ? "index.html" : `${path.replace(/^\//, "")}/index.html`);
const mdPath = (path: string) => (path === "/" ? "index.md" : `${path.replace(/^\//, "")}.md`);

/** One block of a doc page, as Markdown. Every page must read whole in its .md twin, not as a list of headings. */
function blockMarkdown(b: Block): string[] {
  switch (b.kind) {
    case "p":
      return [b.text, ""];
    case "ul":
      return [...b.items.map((t) => `- ${t}`), ""];
    case "ol":
      return [...b.items.map((t, i) => `${i + 1}. ${t}`), ""];
    case "code":
      return [`\`\`\`${b.lang}`, b.text, "```", ""];
    case "table":
      return [
        `| ${b.head.join(" | ")} |`,
        `| ${b.head.map(() => "---").join(" | ")} |`,
        ...b.rows.map((r) => `| ${r.join(" | ")} |`),
        "",
      ];
    case "note":
      return [`> ${b.tone}: ${b.text}`, ""];
    case "swatches":
      return [...b.tokens.map((t) => `- \`--${t}\``), ""];
    case "specimen":
      return [`- \`--${b.token}\` (${b.label}): ${b.sample}`, ""];
  }
}

/** A doc page as one Markdown document, in the same order a reader sees it. */
function docMarkdown(doc: Doc): string {
  const out: string[] = [`# ${doc.label}`, "", doc.lede, ""];
  for (const s of doc.sections) {
    out.push(`## ${s.title}`, "");
    for (const b of s.blocks) out.push(...blockMarkdown(b));
  }
  return `${out.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd()}\n`;
}

function componentMarkdown(c: Component): string {
  const o = OVERRIDES[c.id] ?? {};
  const lines: string[] = [];
  lines.push(`# ${c.name}`, "");
  lines.push(o.when ?? c.summary, "");
  lines.push(`Group: ${c.group}. Export: \`window.IrisUi.${c.name}\`.`, "");
  if (c.props.length) {
    lines.push("## Props", "");
    lines.push("| prop | type | required |", "| --- | --- | --- |");
    for (const p of c.props) lines.push(`| \`${p.name}\` | \`${p.type}\` | ${p.required ? "yes" : "no"} |`);
    lines.push("");
  }
  if (c.variants.length) {
    lines.push("## Examples", "");
    for (const v of c.variants) {
      lines.push(`### ${v.label}`, "", "```js", v.code, "```", "");
    }
  }
  if (o.rules?.length) {
    lines.push("## Guidelines", "");
    for (const r of o.rules) {
      lines.push(`- Do: ${r.do}`);
      if (r.dont) lines.push(`- Don't: ${r.dont}`);
    }
    lines.push("");
  }
  if (o.specs?.length) {
    lines.push("## Specs", "");
    for (const s of o.specs) lines.push(`- ${s.label}: \`${s.value}\``);
    lines.push("");
  }
  if (o.a11y?.length) {
    lines.push("## Accessibility", "");
    for (const a of o.a11y) lines.push(`- ${a}`);
    lines.push("");
  }
  lines.push("## The system's own words", "", c.readme || c.api, "");
  return lines.join("\n");
}

function collectPages(): Page[] {
  const pages: Page[] = [];
  const tokens = loadTokens();

  const home = HomePage();
  pages.push({
    path: "/",
    title: "Overview",
    description: SITE.description,
    ...home,
    md: [
      "# Iris UI",
      "",
      SITE.description,
      "",
      "## Foundations",
      "",
      ...FOUNDATIONS.map((f) => `- \`/foundations/${f.id}.md\` — ${f.label}: ${f.blurb}`),
      "",
      "## Patterns",
      "",
      ...PATTERNS.map((f) => `- \`/patterns/${f.id}.md\` — ${f.label}: ${f.blurb}`),
      "",
      "## Resources",
      "",
      ...RESOURCES.map((r) => `- \`/resources/${r.id}.md\` — ${r.label}: ${r.blurb}`),
      "",

      "This overview is a map: every foundation, pattern and resource above has a page of its own, and each of",
      "those pages carries its full text at the same address with `.md` after it.",
      "",
    ].join("\n"),
  });

  for (const f of FOUNDATIONS) {
    const doc = FOUNDATION_DOCS[f.id];
    if (!doc) {
      pages.push({
        path: `/foundations/${f.id}`,
        title: f.label,
        description: f.blurb,
        headings: [],
        content: (
          <>
            <header className="page-head">
              <p className="eyebrow">Foundations</p>
              <h1>{f.label}</h1>
              <p className="lede">{f.blurb}</p>
            </header>
            <p className="note is-warn">
              <span className="note-tag">watch</span>
              This page is not written yet. The chapter and the tokens are the source until it is.
            </p>
          </>
        ),
      });
      continue;
    }
    const r = DocBody({ doc });
    pages.push({
      path: `/foundations/${f.id}`,
      title: f.label,
      description: doc.lede,
      ...r,
      md: docMarkdown(doc),
    });
  }

  for (const c of components) {
    const r = ComponentPage({ c, o: OVERRIDES[c.id] ?? {} });
    pages.push({
      path: `/components/${c.id}`,
      title: c.name,
      description: OVERRIDES[c.id]?.when ?? c.summary,
      ...r,
      md: componentMarkdown(c),
    });
  }

  // Every part at a glance: its first live frame as a picture, grouped the way the menu is.
  const byGroup = GROUPS.map((g) => ({ ...g, items: components.filter((c) => groupOf(c) === g.key) })).filter(
    (g) => g.items.length,
  );
  pages.push({
    path: "/components",
    title: "All components",
    description: "Every part of the system as a live picture. Pick one by how it looks.",
    headings: byGroup.map((g) => ({ id: g.key.replace(/ /g, "-"), text: g.label, level: 2 })),
    md: ["# All components", "", ...components.map((c) => `- [${c.name}](/components/${c.id}.md): ${c.summary}`)].join("\n"),
    content: (
      <>
        <header className="page-head">
          <p className="eyebrow">Components</p>
          <h1>All components</h1>
          <p className="lede">Every part as a live picture. Pick one by how it looks.</p>
        </header>
        {byGroup.map((g) => (
          <section className="sec" key={g.key}>
            <h2 id={g.key.replace(/ /g, "-")}>{g.label}</h2>
            <p className="gal-blurb">{g.blurb}</p>
            <div className="gal">
              {g.items.map((c) => (
                <a className="gal-card" href={`/components/${c.id}`} key={c.id}>
                  <span className="gal-shot">
                    <iframe data-src={`/demos/${c.id}/0.html`} title={c.name} tabIndex={-1} aria-hidden="true" />
                  </span>
                  <b>{c.name}</b>
                </a>
              ))}
            </div>
          </section>
        ))}
      </>
    ),
  });

  for (const p of PATTERNS) {
    const doc = PATTERN_DOCS[p.id];
    const r = doc
      ? DocBody({ doc })
      : {
          content: (
            <>
              <header className="page-head">
                <p className="eyebrow">Patterns</p>
                <h1>{p.label}</h1>
                <p className="lede">{p.blurb}</p>
              </header>
              <p className="note is-warn">
                <span className="note-tag">watch</span>
                Not written yet.
              </p>
            </>
          ),
          headings: [] as Heading[],
        };
    pages.push({
      path: `/patterns/${p.id}`,
      title: p.label,
      description: doc?.lede ?? p.blurb,
      ...r,
      md: doc
        ? docMarkdown(doc)
        : [`# ${p.label}`, "", p.blurb, "", "This pattern is not written yet.", ""].join("\n"),
    });
  }

  for (const id of Object.keys(RESOURCE_DOCS)) {
    const doc = RESOURCE_DOCS[id];
    const r = DocBody({ doc });
    pages.push({
      path: `/resources/${id}`,
      title: doc.label,
      description: doc.lede,
      ...r,
      md: docMarkdown(doc),
    });
  }

  // Tokens and the LLM page have their own renderers.
  if (!RESOURCE_DOCS["tokens"]) {
    const r = TokensPage({ tokens });
    pages.push({
      path: "/resources/tokens",
      title: "Tokens",
      description: "Every value the system defines.",
      ...r,
      md: ["# Tokens", "", "| token | value | what it is for |", "| --- | --- | --- |"]
        .concat(tokens.map((t) => `| \`--${t.name}\` | \`${t.value}\` | ${t.comment} |`))
        .join("\n"),
    });
  }
  if (!RESOURCE_DOCS["llms"]) {
    const r = LlmPage({ counts: { components: components.length, chapters: chapters.length, tokens: tokens.length } });
    pages.push({
      // The short address is the one the header and the notes use: /llms.
      path: "/llms",
      title: "For LLMs",
      description: "How an agent reads this system.",
      ...r,
      md: [
        "# For LLMs",
        "",
        `This system is ${components.length} parts, ${chapters.length} chapters and ${tokens.length} tokens.`,
        "Read /llms.txt first: it is the map, one line per part. Then the page of the part you are about to use",
        "(/components/<id>.md), and the chapter of the surface you are building for (/chapters/<id>.md). Every",
        "value comes from the tokens: load /ds/tokens.css and use the variables.",
        "",
      ].join("\n"),
    });
  }

  for (const ch of chapters) {
    const r = ChapterPage({ title: ch.title, body: ch.body });
    pages.push({
      path: `/chapters/${ch.id}`,
      title: ch.title,
      description: ch.body.split("\n").find((l) => l.trim() && !l.startsWith("#"))?.slice(0, 200) ?? "",
      ...r,
      md: ch.body,
    });
  }

  // These two are rendered by their own functions, under their own address.
  const RENDERED_ELSEWHERE = new Set(["llms", "tokens"]);
  for (const r of RESOURCES) {
    if (RENDERED_ELSEWHERE.has(r.id)) continue;
    if (pages.some((p) => p.path === `/resources/${r.id}`)) continue;
    pages.push({
      path: `/resources/${r.id}`,
      title: r.label,
      description: r.blurb,
      headings: [],
      content: (
        <>
          <header className="page-head">
            <p className="eyebrow">Resources</p>
            <h1>{r.label}</h1>
            <p className="lede">{r.blurb}</p>
          </header>
          <p className="note is-warn">
            <span className="note-tag">watch</span>
            Not written yet.
          </p>
        </>
      ),
    });
  }

  // Ringlab modules, local only (see lab.ts): the lab itself, live, in a frame.
  for (const m of LAB.modules) {
    pages.push({
      path: `/lab/${m.id}`,
      title: m.name,
      description: m.blurb ?? "A Ringlab module.",
      headings: [],
      content: (
        <>
          <header className="page-head">
            <p className="eyebrow">Lab, internal</p>
            <h1>{m.name}</h1>
            {m.blurb ? <p className="lede">{m.blurb}</p> : null}
          </header>
          <p className="note is-warn">
            <span className="note-tag">lab</span>
            Nothing here has a meaning yet, so nothing here goes in a product screen. First give it one on{" "}
            <a href="/foundations/meaning">Meaning: what may go where</a>.
          </p>
          <iframe className="lab-frame" src={LAB.url + m.path} title={m.name} />
          <p className="foot-dim">
            From Ringlab, <a href={LAB.url + m.path}>{LAB.url + m.path}</a>. Never published.
          </p>
        </>
      ),
    });
  }

  return pages;
}

function mdTwin(p: Page): string {
  if (p.md) return p.md;
  const heads = p.headings.map((h) => `${"#".repeat(h.level)} ${h.text}`).join("\n\n");
  return [`# ${p.title}`, "", p.description, "", heads].join("\n");
}

export function build(out: string) {
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });

  const pages = collectPages();
  const index = pages.map((p) => ({
    path: p.path,
    title: p.title,
    description: p.description,
    headings: p.headings.map((h) => h.text),
  }));

  for (const page of pages) {
    const el = (
      <Shell
        title={page.title}
        description={page.description}
        path={page.path}
        headings={page.headings}
        components={components}
      >
        {page.content}
      </Shell>
    );
    const html = "<!doctype html>\n" + rewriteBase(renderToStaticMarkup(el));
    write(out, htmlPath(page.path), html);
    write(out, mdPath(page.path), rewriteBaseText(mdTwin(page)));
  }

  // Demo frames: one per variant, plus the system's own preview of each component.
  for (const c of components) {
    if (c.variants.length) {
      c.variants.forEach((v, i) => write(out, `demos/${c.id}/${i}.html`, demoFrame(c, { variant: v, index: i })));
    } else {
      write(out, `demos/${c.id}/0.html`, previewFrame(c));
    }
    write(out, `demos/${c.id}/index.html`, previewFrame(c));
  }

  // The machine-readable layer.
  write(
    out,
    "api/components.json",
    JSON.stringify(
      components.map((c) => ({
        id: c.id,
        name: c.name,
        group: c.group,
        summary: c.summary || OVERRIDES[c.id]?.when || c.name,
        export: `window.IrisUi.${c.name}`,
        props: c.props,
        variants: c.variants.map((v) => ({ label: v.label, code: v.code })),
        docs: `/components/${c.id}.md`,
      })),
      null,
      2,
    )
      .replace(/\"docs\": \"\//g, `"docs": "${BASE}/`),
  );
  write(
    out,
    "api/tokens.json",
    JSON.stringify(
      loadTokens().map((t) => ({ token: `--${t.name}`, value: t.value, group: t.group, use: t.comment })),
      null,
      2,
    ),
  );
  write(out, "api/site.json", rewriteBaseText(JSON.stringify(index, null, 2)));

  const llms = [
    `# ${SITE.name} (${SITE.version}) — ${SITE.host}`,
    "",
    `> ${SITE.description}`,
    "",
    `This copy answers at ${CANONICAL}${BASE || "/"}.`,
    "",
    "The design system itself is served as files under /ds/.",
    "Read, in this order:",
    "1. /api/components.json — every component with props and examples",
    "2. /api/tokens.json — every token with its value and use",
    "3. the page of the part you are about to use: /components/<id>.md",
    "4. the chapter of the surface you are building for: /chapters/<id>.md",
    "",
    "## Foundations",
    "",
    ...FOUNDATIONS.map((f) => `- /foundations/${f.id}.md — ${f.label}: ${f.blurb}`),
    "",
    "## Components",
    "",
    ...components.map((c) => `- /components/${c.id}.md — ${c.group}: ${c.summary || OVERRIDES[c.id]?.when || c.name}`),
    "",
    "## Patterns",
    "",
    ...PATTERNS.map((p) => `- /patterns/${p.id}.md — ${p.label}: ${p.blurb}`),
    "",
    "## Chapters (the long-form rules)",
    "",
    ...chapters.map((c) => `- /chapters/${c.id}.md — ${c.title}`),
    "",
    "## Prompts",
    "",
    "- /llms.md — four prompts that work, one per surface (a phone screen, a window, settings, an app)",
    "",
    "## Everything in one file",
    "",
    "- /llms-full.txt — every page of this site, in reading order, as Markdown",
    "",
    "## Files",
    "",
    "- /ds/bundle.js — window.IrisUi, the components (needs React 18 and ReactDOM 18 globals)",
    "- /ds/bundle.css — their stylesheet",
    "- /ds/tokens.css — every token as a CSS variable",
    "- /ds/index.d.ts — the props as TypeScript",
    "- /ds/vendor/react.js, /ds/vendor/react-dom.js — React 18 UMD, if you need a copy",
    "",
    "## Rules an agent must keep",
    "",
    "- Use the tokens through their variables; never a raw value.",
    "- Never hand-build a control the system provides, and never draw your own icon.",
    "- Near-black only, one accent per screen, sentence case, no emoji, no exclamation marks.",
    "- Never leave an empty black screen: show a Skeleton in the shape of what is coming.",
    "- If a part is missing, say so and stop; do not invent one.",
    "",
  ].join("\n");
  write(out, "llms.txt", rewriteBaseText(llms));

  // The whole site as one text file: what an agent reads when it wants everything, not a page.
  const full = [
    `# ${SITE.name} (${SITE.version}) — everything`,
    "",
    `> ${SITE.description}`,
    "",
    `This is every page of https://${SITE.host} in reading order: the overview, the ${FOUNDATIONS.length} foundations, the ${components.length} components, the ${PATTERNS.length} patterns, the resources and the ${chapters.length} chapters. Each page keeps its own address, so a fetch can replace a section with the live version.`,
    "",
  ]
    .concat(pages.map((p) => [`---`, ``, `# ${p.title}`, ``, `address: ${p.path}`, ``, mdTwin(p), ``].join("\n")))
    .join("\n");

  write(out, "llms-full.txt", rewriteBaseText(full));

  write(
    out,
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => `  <url><loc>${CANONICAL}${p.path}</loc></url>`)
  .join("\n")}
</urlset>
`,
  );
  write(out, "robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${CANONICAL}/sitemap.xml\n`);

  // Static files the browser needs, and a note of where this copy is mounted (a server reads it).
  // The blobs' provenance note stays in the repo: it names where each asset came from and is not part of the site.
  cpSync(join(ROOT, "public"), out, {
    recursive: true,
    // The lab copies under examples/labs are internal: only a local build (IRISUI_INTERNAL=1) carries them.
    filter: (src) =>
      !src.endsWith(`${sep}blobs${sep}SOURCES.md`) &&
      (process.env.IRISUI_INTERNAL === "1" || !src.includes(`${sep}examples${sep}labs`)),
  });
  write(out, ".base", BASE + "\n");

  const notFound = (
    <Shell
      title="Not found"
      description="That page is not here."
      path="/404"
      components={components}
    >
      <>
        <header className="page-head">
          <p className="eyebrow">404</p>
          <h1>Not here</h1>
          <p className="lede">
            Nothing lives at this address. The <a href="/">overview</a> lists everything, and{" "}
            <a href="/llms.txt">/llms.txt</a> lists it for a machine.
          </p>
        </header>
      </>
    </Shell>
  );
  write(out, "404.html", "<!doctype html>\n" + rewriteBase(renderToStaticMarkup(notFound)));

  return { pages: pages.length, components: components.length, out };
}
