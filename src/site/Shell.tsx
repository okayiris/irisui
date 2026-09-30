import type { ReactNode } from "react";
import type { Heading } from "./markdown";
import { FOUNDATIONS, GROUPS, PATTERNS, RESOURCES, SITE, groupOf } from "./nav";
import { BASE, CANONICAL } from "./base";
import type { Component } from "./parse";
import { chapters } from "./content";

export type ShellProps = {
  title: string;
  description: string;
  path: string;
  headings?: Heading[];
  components: Component[];
  children: ReactNode;
};

function NavLink({ href, path, children, hint }: { href: string; path: string; children: ReactNode; hint?: string }) {
  const here = path === href;
  // The hint on a component link is a variant count, not a step or a page number: say so, in words.
  const name = typeof children === "string" ? children : "";
  const counted = hint && name ? `${name}, ${hint} variants` : undefined;
  return (
    <a
      className={"nav-link" + (here ? " is-here" : "")}
      href={href}
      aria-current={here ? "page" : undefined}
      aria-label={counted}
      title={counted}
    >
      <span>{children}</span>
      {hint ? <span className="nav-hint">{hint}</span> : null}
    </a>
  );
}

/** A chapter title can carry Markdown code ticks from the chapter's own heading; never show them as text. */
const plain = (s: string) => s.replace(/`/g, "");

export function Shell({ title, description, path, headings = [], components, children }: ShellProps) {
  const byGroup = GROUPS.map((g) => ({ ...g, items: components.filter((c) => groupOf(c) === g.key) })).filter(
    (g) => g.items.length,
  );
  const cleanTitle = plain(title);
  const pageTitle = path === "/" ? `${SITE.name} — ${SITE.tagline}` : `${cleanTitle} · ${SITE.name}`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${CANONICAL}${path}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${CANONICAL}${path}`} />
        <meta name="color-scheme" content="dark" />
        <link rel="stylesheet" href="/site.css" />
        <link rel="stylesheet" href="/ds/tokens.css" />
        <link rel="icon" href="/favicon.svg" />
        <script type="module" src="/site.js"></script>
      </head>
      <body data-path={path} data-base={BASE}>
        <a className="skip" href="#main">
          Skip to content
        </a>

        <header className="top">
          <div className="top-left">
            <button className="menu-btn" type="button" aria-label="Show navigation" aria-expanded="false" data-menu>
              <span />
              <span />
            </button>
            <a className="logo" href="/">
              <span className="logo-ring" aria-hidden="true" />
              <span className="logo-word">
                Iris <b>UI</b>
              </span>
            </a>
            <span className="chip-version" title={`Release ${SITE.version}, ${SITE.released}`}>
              {SITE.version}
            </span>
          </div>

          <div className="top-right">
            <div className="search" role="search">
              <input
                type="search"
                id="search"
                placeholder="Search parts, tokens, rules"
                aria-label="Search the design system"
                autoComplete="off"
                spellCheck={false}
                data-search
              />
              <kbd>/</kbd>
              <div className="search-panel" id="search-panel" hidden data-search-panel />
            </div>
            <a className="ghost-link" href="/llms">
              For LLMs
            </a>
            <a className="ghost-link" href={SITE.repo} rel="noopener">
              GitHub
            </a>
          </div>
        </header>

        <div className="frame">
          <aside className="side" id="side" data-side>
            <nav aria-label="Design system">
              <NavLink href="/" path={path}>
                Overview
              </NavLink>
              <NavLink href="/examples/" path={path}>
                Examples: every device
              </NavLink>

              <p className="nav-head">Foundations</p>
              {FOUNDATIONS.map((f) => (
                <NavLink key={f.id} href={`/foundations/${f.id}`} path={path}>
                  {f.label}
                </NavLink>
              ))}

              <p className="nav-head">Components</p>
              {byGroup.map((g) => (
                <div className="nav-group" key={g.key}>
                  <p className="nav-sub">{g.label}</p>
                  {g.items.map((c) => (
                    <NavLink key={c.id} href={`/components/${c.id}`} path={path} hint={c.variants.length ? String(c.variants.length) : undefined}>
                      {c.name}
                    </NavLink>
                  ))}
                </div>
              ))}

              <p className="nav-head">Patterns</p>
              {PATTERNS.map((p) => (
                <NavLink key={p.id} href={`/patterns/${p.id}`} path={path}>
                  {p.label}
                </NavLink>
              ))}

              <p className="nav-head">Resources</p>
              {RESOURCES.map((r) => (
                <NavLink key={r.id} href={r.id === "llms" ? "/llms" : `/resources/${r.id}`} path={path}>
                  {r.label}
                </NavLink>
              ))}

              <p className="nav-head">Chapters</p>
              {chapters.map((c) => (
                <NavLink key={c.id} href={`/chapters/${c.id}`} path={path}>
                  {plain(c.title)}
                </NavLink>
              ))}
            </nav>
          </aside>

          <main id="main" className="main">
            {children}
          </main>

          <aside className="rail" aria-label="On this page">
            {headings.length ? (
              <nav>
                <p className="nav-head">On this page</p>
                {headings.map((h) => (
                  <a key={h.id} className={"rail-link lvl-" + h.level} href={`#${h.id}`}>
                    {h.text}
                  </a>
                ))}
              </nav>
            ) : null}
          </aside>
        </div>

        <footer className="foot">
          <p>
            {SITE.name} {SITE.version} · {SITE.released} · <a href={SITE.repo}>{SITE.repo.replace("https://", "")}</a>
          </p>
          <p className="foot-dim">
            The system is the artifact; this site is generated from it. Every rule page here carries a plain-text
            twin: add <code>.md</code> to the URL, or read <a href="/llms.txt">/llms.txt</a>.
          </p>
        </footer>
      </body>
    </html>
  );
}
