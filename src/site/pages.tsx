import { markdown, slug, type Heading } from "./markdown";
import { rewriteBlobs } from "./blobs";
import { pageForPart, type Block, type Doc, type Override } from "./content";
import type { Component } from "./parse";
import type { Token } from "./parse";
import { GROUPS, SITE, groupOf } from "./nav";

export type Rendered = { content: JSX.Element; headings: Heading[] };

const h = (level: number, text: string, headings: Heading[]) => {
  const id = slug(text);
  if (headings.every((x) => x.id !== id)) headings.push({ level, text, id });
  const Tag = (`h${level}` as unknown) as "h2";
  return <Tag id={id}>{text}</Tag>;
};

function BlockView({ b }: { b: Block }) {
  switch (b.kind) {
    case "p":
      return <p>{b.text}</p>;
    case "ul":
      return (
        <ul>
          {b.items.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {b.items.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre className="code" data-lang={b.lang}>
          <code>{b.text}</code>
        </pre>
      );
    case "table":
      return (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {b.head.map((c, i) => (
                  <th key={i}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <p className={"note is-" + b.tone}>
          <span className="note-tag">{b.tone === "llm" ? "llm" : b.tone === "warn" ? "watch" : "rule"}</span>
          {b.text}
        </p>
      );
    case "swatches":
      return (
        <div className="swatch-grid">
          {b.tokens.map((t) => (
            <div className="swatch" key={t}>
              <span className="swatch-chip" style={{ background: `var(--${t})` }} />
              <code>--{t}</code>
            </div>
          ))}
        </div>
      );
    case "specimen":
      return (
        <div className="specimen" key={b.token}>
          <div className="specimen-sample" style={{ font: `var(--${b.token})` }}>
            {b.sample}
          </div>
          <div className="specimen-meta">
            <code>--{b.token}</code>
            <span>{b.label}</span>
          </div>
        </div>
      );
  }
}

export function DocBody({ doc }: { doc: Doc }): Rendered {
  const headings: Heading[] = [];
  const content = (
    <>
      <header className="page-head">
        <p className="eyebrow">Foundations</p>
        <h1>{doc.label}</h1>
        <p className="lede">{doc.lede}</p>
      </header>
      {doc.sections.map((s) => (
        <section className="sec" key={s.title}>
          {h(2, s.title, headings)}
          {s.blocks.map((b, i) => (
            <BlockView b={b} key={i} />
          ))}
        </section>
      ))}
    </>
  );
  return { content, headings };
}

function PropsTable({ c }: { c: Component }) {
  if (!c.props.length) return <p className="dim">No props: this part takes children only.</p>;
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          {c.props.map((p) => (
            <tr key={p.name}>
              <td>
                <code>{p.name}</code>
              </td>
              <td>
                <code>{p.type}</code>
              </td>
              <td>{p.required ? "yes" : "no"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ComponentPage({ c, o }: { c: Component; o: Override }): Rendered {
  const headings: Heading[] = [];
  const groupLabel = GROUPS.find((g) => g.key === groupOf(c))?.label ?? "Components";
  const demos = c.variants.length ? c.variants : [{ label: "Live", code: "" }];
  // The part's own words, when the artifact carries any: an empty section says less than no section.
  const words = (c.readme || c.api || "").trim();

  const content = (
    <>
      <header className="page-head">
        <p className="eyebrow">{groupLabel}</p>
        <h1>{c.name}</h1>
        <p className="lede">{o.when ?? c.summary}</p>
        <ul className="facts">
          <li>
            <span>export</span> <code>window.IrisUi.{c.name}</code>
          </li>
          <li>
            <span>variants</span> {c.variants.length || "1"}
          </li>
          {c.props.length ? (
            <li>
              <span>props</span> {c.props.length}
            </li>
          ) : null}
          <li>
            <span>docs</span> <code>components/{c.name}/README.md</code>
          </li>
        </ul>
      </header>

      <section className="sec">
        {h(2, "Live", headings)}
        <p className="dim">
          Every frame below is the real component, mounted from <code>/ds/bundle.js</code> in its own sandbox, so
          nothing on this page can change how it looks.
        </p>
        <div className="demos">
          {demos.map((v, i) => (
            <figure className="demo" key={v.label + i}>
              <figcaption>
                <span className="demo-label">{v.label}</span>
                {v.code ? (
                  <button className="demo-code-btn" type="button" data-code={`${c.id}-${i}`}>
                    code
                  </button>
                ) : null}
              </figcaption>
              <iframe
                className="demo-frame"
                src={`/demos/${c.id}/${i}.html`}
                title={`${c.name}: ${v.label}`}
                loading="lazy"
                height={Math.min(c.height || 320, 720)}
              />
              {v.code ? (
                <pre className="code demo-code" id={`${c.id}-${i}`} hidden>
                  <code>{v.code}</code>
                </pre>
              ) : null}
            </figure>
          ))}
        </div>
      </section>

      {o.parts?.length ? (
        <section className="sec">
          {h(2, "Anatomy", headings)}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Part</th>
                  <th>What it is</th>
                </tr>
              </thead>
              <tbody>
                {o.parts.map((p) => (
                  <tr key={p.name}>
                    <td>
                      <code>{p.name}</code>
                    </td>
                    <td>{p.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section className="sec">
        {h(2, "Props", headings)}
        <PropsTable c={c} />
      </section>

      {o.rules?.length ? (
        <section className="sec">
          {h(2, "Guidelines", headings)}
          <div className="rules">
            {o.rules.map((r, i) => (
              <div className="rule" key={i}>
                <p className="rule-do">
                  <span className="rule-mark">do</span>
                  {r.do}
                </p>
                {r.dont ? (
                  <p className="rule-dont">
                    <span className="rule-mark">don't</span>
                    {r.dont}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {o.specs?.length ? (
        <section className="sec">
          {h(2, "Specs", headings)}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Measure</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {o.specs.map((s) => (
                  <tr key={s.label}>
                    <td>{s.label}</td>
                    <td>
                      <code>{s.value}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {o.a11y?.length ? (
        <section className="sec">
          {h(2, "Accessibility", headings)}
          <ul>
            {o.a11y.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {words ? (
        <section className="sec">
          {h(2, "In the system's own words", headings)}
          <div className="prose" dangerouslySetInnerHTML={{ __html: rewriteBlobs(markdown(words, { shift: 1 }).html) }} />
        </section>
      ) : null}

      {o.related?.length ? (
        <section className="sec">
          {h(2, "Goes with", headings)}
          <ul className="pills">
            {o.related.map((r) => {
              const to = pageForPart(r);
              return (
                <li key={r}>
                  {to ? (
                    <a href={to.path} title={to.kind}>
                      {r}
                    </a>
                  ) : (
                    <span className="dim">{r}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </>
  );
  return { content, headings };
}

export function ChapterPage({ title, body }: { title: string; body: string }): Rendered {
  // The chapter opens with its own title, which the page header already shows: drop that line, shift the rest.
  const trimmed = body.replace(/^#\s+.*\n+/, "");
  // A chapter heading may carry Markdown code ticks; the page shows the words, never the ticks.
  const heading = title.replace(/`/g, "");
  // Chapters open at ## for their sections, which is already right under the page's own h1.
  const { html, headings } = markdown(trimmed);
  return {
    content: (
      <>
        <header className="page-head">
          <p className="eyebrow">Chapter</p>
          <h1>{heading}</h1>
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: rewriteBlobs(html) }} />
      </>
    ),
    headings,
  };
}

export function HomePage(): Rendered {
  const headings: Heading[] = [];
  const content = (
    <>
      <header className="hero-head">
        <p className="eyebrow">Release {SITE.version}</p>
        <h1>
          The look of Iris, <span className="ice">written down</span>
        </h1>
        <p className="lede">
          Iris is one assistant across fifteen subjects, on an iPhone, a Mac, the web and the windows she opens. This
          is every part she is built from: what it is, what it measures, when to reach for it, and where it may not
          go.
        </p>
        <div className="hero-actions">
          <a className="btn-primary" href="/examples/">
            See it as an app
          </a>
          <a className="btn-ghost" href="/foundations/colour">
            Start with the foundations
          </a>
          <a className="btn-ghost" href="/components/orb">
            See a component
          </a>
          <a className="btn-ghost" href="/llms">
            Read it as an LLM
          </a>
        </div>
      </header>

      <section className="sec">
        {h(2, "What is here", headings)}
        <div className="cards">
          {[
            { t: "Foundations", b: "Colour, type, shape, elevation, motion, state, spacing, layout, icons, accessibility.", href: "/foundations/colour" },
            { t: "Components", b: `${"the parts"} — brand, controls, surfaces, navigation, feedback, screens, app layouts.`, href: "/components/button" },
            { t: "Patterns", b: "The whole screens and moments, and the order things come in.", href: "/patterns/phone" },
            { t: "Resources", b: "The bundle, the tokens, the JSON API and how an LLM should read all of it.", href: "/resources/bundle" },
          ].map((c) => (
            <a className="card" href={c.href} key={c.t}>
              <h3>{c.t}</h3>
              <p>{c.b}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="sec">
        {h(2, "The five rules", headings)}
        <div className="rules">
          {[
            { do: "Near-black, never grey. Page background #07090c. No light mode (mail is the exception)." },
            { do: "Everything is a glass card: --glass fill, 1px --edge stroke, radius 18, padding 14." },
            { do: "One accent. Ice blue for what is active, violet only for on and the ring, red only for destructive." },
            { do: "Quiet type: SF, eight named sizes, 10.5px mono caps for labels. Sentence case, no emoji, no exclamation marks." },
            { do: "Never an empty black screen: anything that loads shows a Skeleton in the shape of what is coming." },
          ].map((r, i) => (
            <div className="rule" key={i}>
              <p className="rule-do">
                <span className="rule-mark">{i + 1}</span>
                {r.do}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        {h(2, "Use it", headings)}
        <pre className="code" data-lang="html">
          <code>{`<link rel="stylesheet" href="https://ui.okayiris.com/ds/tokens.css">
<link rel="stylesheet" href="https://ui.okayiris.com/ds/bundle.css">
<script src="https://ui.okayiris.com/ds/vendor/react.js"></script>
<script src="https://ui.okayiris.com/ds/vendor/react-dom.js"></script>
<script src="https://ui.okayiris.com/ds/bundle.js"></script>

<script>
  const h = React.createElement;
  const { PreviewI18nProvider, Card, Row, Toggle } = window.IrisUi;
  ReactDOM.createRoot(document.getElementById("root")).render(
    h(PreviewI18nProvider, null,
      h(Card, null,
        h(Row, { title: "On the road", subtitle: "The assistant listens here even when locked.",
                 trailing: h(Toggle, { on: true }) }))));
<\/script>`}</code>
        </pre>
        <p className="note is-llm">
          <span className="note-tag">llm</span>
          An agent should not guess a value: read <a href="/llms.txt">/llms.txt</a> first, then the page of the part
          it is about to use, or the JSON at <code>/api/components.json</code>. Every part, pattern and foundation
          here carries a <code>.md</code> twin.
        </p>
      </section>
    </>
  );
  return { content, headings };
}

export function TokensPage({ tokens }: { tokens: Token[] }): Rendered {
  const headings: Heading[] = [];
  const groups = Array.from(new Set(tokens.map((t) => t.group)));
  const content = (
    <>
      <header className="page-head">
        <p className="eyebrow">Resources</p>
        <h1>Tokens</h1>
        <p className="lede">
          Every value the system defines, in <code>tokens.css</code> and <code>tokens.json</code>. Use the variable,
          never the value.
        </p>
      </header>
      {groups.map((g) => (
        <section className="sec" key={g}>
          {h(2, g, headings)}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Value</th>
                  <th>What it is for</th>
                </tr>
              </thead>
              <tbody>
                {tokens
                  .filter((t) => t.group === g)
                  .map((t) => (
                    <tr key={t.name}>
                      <td>
                        <code>--{t.name}</code>
                      </td>
                      <td>
                        <code>{t.value}</code>
                      </td>
                      <td>
                        {t.comment}
                        {/^#[0-9a-f]{3,8}$/i.test(t.value) || /^rgba?\(/i.test(t.value) ? (
                          <span className="swatch-inline" style={{ background: `var(--${t.name})` }} />
                        ) : null}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </>
  );
  return { content, headings };
}

export function LlmPage({ counts }: { counts: { components: number; chapters: number; tokens: number } }): Rendered {
  const headings: Heading[] = [];
  const content = (
    <>
      <header className="page-head">
        <p className="eyebrow">Resources</p>
        <h1>For LLMs</h1>
        <p className="lede">
          The whole system is machine-readable: {counts.components} components, {counts.chapters} chapters,{" "}
          {counts.tokens} tokens, no JavaScript needed to read any of it.
        </p>
      </header>
      <section className="sec">
        {h(2, "Read this first", headings)}
        <ol>
          <li>
            <code>/llms.txt</code> — the map: what exists, one line each, and where to go deeper.
          </li>
          <li>
            <code>/api/components.json</code> — every component with its props, variants, groups and docs path.
          </li>
          <li>
            <code>/api/tokens.json</code> — every token with its value and what it is for.
          </li>
          <li>
            <code>/&lt;page&gt;.md</code> — the plain-text twin of a page of the system on this site.
          </li>
        </ol>
        <p className="note is-rule">
          <span className="note-tag">rule</span>
          Never hand-build a control and never draw an icon the system provides. If a part is missing, say so
          instead of inventing one.
        </p>
      </section>
      <section className="sec">
        {h(2, "Endpoints", headings)}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Path</th>
                <th>What</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["/llms.txt", "The map, in the order to read it"],
                ["/llms-full.txt", "Every page of this site in one text file"],
                ["/api/components.json", "Components: groups, props, variants, docs"],
                ["/api/tokens.json", "Tokens: name, value, use"],
                ["/api/site.json", "Every page with its title, description and headings"],
                ["/ds/bundle.js, /ds/bundle.css", "The system itself"],
                ["/ds/index.d.ts", "The props, as TypeScript"],
                ["/ds/tokens.css, /ds/tokens.json", "The values"],
              ].map(([p, w]) => (
                <tr key={p}>
                  <td>
                    <code>{p}</code>
                  </td>
                  <td>{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="sec">
        {h(2, "Four prompts that work", headings)}
        <p className="dim">
          Each one names the surface, the parts and the rules to read. Copy it, change the thing in the middle,
          and hand it to an agent that can fetch pages.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Prompt</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "A phone screen she makes for someone",
                  "Build one phone screen for Iris about <topic>. Read /patterns/phone.md first, then /components/topic.md, /components/widget.md, /components/anchor.md and /components/phasering.md. Seven hard rules, a busy budget of 5, one accent per topic, at most one pen mark. Give me the HTML.",
                ],
                [
                  "A window in the web app",
                  "Build the window Iris opens for <task>. Read /patterns/window.md and /chapters/web-app.md, then /components/card.md and /components/row.md. Nothing inside a frame, no fixed heights above 64px, her window is 30rem wide at most. Give me the HTML.",
                ],
                [
                  "A settings page",
                  "Build the You page of the iPhone app. Read /chapters/readme.md for the five rules and /patterns/settings.md, then /components/row.md and /components/toggle.md. Danger sits last and alone. Use the shipped parts only, no own controls.",
                ],
                [
                  "An app she builds",
                  "Build <a table of invoices | a board of jobs | a flow of four steps>. Read /patterns/apps.md and pick the layout from the table there, then the layout's own page under /components/. It folds on the container, not the screen, and it uses the system's controls only.",
                ],
              ].map(([task, prompt]) => (
                <tr key={task}>
                  <td>{task}</td>
                  <td>
                    <code>{prompt}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note is-rule">
          <span className="note-tag">rule</span>
          An agent that cannot fetch a page should say so and stop, not guess the values from the prompt. Every
          number it needs is in a token or on a page.
        </p>
      </section>

      <section className="sec">
        {h(2, "A prompt that works", headings)}
        <pre className="code" data-lang="text">
          <code>{`Build <thing> for Iris, on one of her surfaces.

Read https://ui.okayiris.com/llms.txt first. Then read the page for every part you are about to use
(https://ui.okayiris.com/components/<part>.md) and the chapter for the surface
(https://ui.okayiris.com/chapters/<chapter>.md). Use tokens.css values through the variables.
Keep to the five rules. Do not invent a part or a colour; if something is missing, say what and stop.`}</code>
        </pre>
      </section>
    </>
  );
  return { content, headings };
}
