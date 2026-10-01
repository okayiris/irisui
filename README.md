# Iris UI — the design system, and the place to explore it

`ui.okayiris.com`. Two things in one repo:

1. **The design system** — the published Iris Design System (release v32, this project's release v34) plus the parts and values this
   project added. Live in `public/ds/`, docs in `src/content/`.
2. **The site** — every foundation, component, pattern and value as plain static HTML, with a live frame of the
   real component on every page, and a Markdown twin so an LLM can read the same page a person sees.

Nothing on a page re-implements a component. A frame loads the system's own `bundle.js` (and `ext.js` for the
added parts) in a sandbox and runs the component's own code.

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:4173, watches the source and reloads the browser
pnpm dev --no-watch   # or: /__dev/pause and /__dev/resume on a running server
pnpm build        # writes dist/ (builds beside it and swaps it in)
pnpm serve        # serves dist/ with no watching and no reload
pnpm check        # loads every page and every frame in Chromium and fails on a real problem
pnpm check:live   # the same gate against the deployed copy
pnpm check:artifact  # loads the artifact previews and fails if one does not mount
pnpm weigh        # what the site costs: the shared files, the heaviest pages and frames
pnpm test         # build + both gates
pnpm publish:pages  # build for /irisui and push the gh-pages branch
pnpm typecheck
```

`pnpm check` is the gate, and it looks at the built site the way a visitor does: every page and every frame in
Chromium, then

- no console error and no failed request,
- no sideways scroll, a title and a `lang`, exactly one `h1`, no jumped heading level,
- one `main` and a `nav`, every iframe titled, every image with alt, every control with an accessible name,
  no positive tabindex,
- every internal link lands on a file that is in the build,
- every frame drew something and none says it failed to mount,
- every file a page cannot work without answers (the stylesheets, the scripts, the fonts, the frames, the API),
- and it works: `/` focuses search, a word finds hits that exist, Escape closes the panel, the code button
  opens the code.

It also refuses to publish a credential: every text file in `dist/` is scanned for key and token shapes, and a
hit fails the gate. And it measures contrast: the token pairs this site and the added parts put words in are
checked against WCAG AA (4.5:1 text), and a pair below the floor fails.

Shots land in `.playwright/`.

## What is where

| Path | What |
| --- | --- |
| `public/ds/` | the system as it is served: `bundle.js`, `bundle.css`, `tokens.css`, `index.d.ts`, `fonts/`, plus `ext.js`/`ext.css` (the added parts), `extra.css` (the Caveat face), `placeholder.css` + `placeholder.svg` |
| `src/content/` | the published release itself: the chapters (`*.md`), every component's `README.md` and `preview.html`, `api/`, `manifest.json`, `design-system.json` |
| `src/ds/` | the parts this project added: `ext.tsx`, `ext.css`, `react-shim.js` |
| `src/site/` | the site: the renderer (`ssr.tsx`), the layout (`Shell.tsx`), the pages (`pages.tsx`), the data (`parse.ts`, `blobs.ts`, `demos.ts`), the navigation (`nav.ts`) and the written content (`content/`) |
| `scripts/` | `build.mjs`, `build-ext.mjs`, `dev.mjs`, `serve.mjs`, `check.mjs`, `check-artifact.mjs`, `import-blobs.mjs`, `publish-pages.mjs` |
| `artifact/` | the added parts as the Design System artifact wants them: one `README.md` and `preview.html` per part, ready to publish |
| `dist/` | the built site (not in git) |

## The pages

- **Foundations** — colour, type, shape, elevation, motion, state, spacing, layout, icons, accessibility.
- **Components** — 65 parts in nine groups: brand, controls, surfaces, overlays, navigation, feedback, screen
  parts, app layouts, showcases. Each page has live frames per variant, the props, guidelines, specs,
  accessibility and the system's own README.
- **Patterns** — the whole moments: a phone screen, a window she opens, a loop, an app she builds, search,
  settings, loading, errors, onboarding, talking.
- **Resources** — install and bundle, the tokens, release notes, and how to contribute.

## For machines

| Path | What |
| --- | --- |
| `/llms.txt` | the map, in reading order |
| `/api/components.json` | every component: group, props, variants with their code, docs path |
| `/api/tokens.json` | every token with its value and what it is for |
| `/api/site.json` | every page with its title, description and headings |
| `/<page>.md` | the Markdown twin of any page |
| `/ds/index.d.ts` | the props as TypeScript |

An agent should read `/llms.txt` first, then the page of the part it is about to use. A value that was not read
is a guess.

## Adding a part

1. Write it in `src/ds/ext.tsx` using the system's tokens only (no raw values), with hover, press and
   focus-visible states, a focus ring, reduced-motion respect, dark only, sentence case. Take the house Button
   from `window.IrisUi` instead of building a control.
2. Style it in `src/ds/ext.css`; a value that does not exist yet gets a token there first.
3. Describe it in `src/site/ext-components.ts` (props + one demo per variant) and its own words in
   `src/site/ext-docs.ts`.
4. `pnpm build-artifact` regenerates `artifact/components/<Name>/` so the release can take it.
5. `pnpm check`.

## What it costs

`pnpm weigh` reports the built site: 457 files, 5.6 MB in total. A visitor pulls 420 kB of shared CSS, JavaScript
and system files once (`site.css`, `tokens.css`, `bundle.css`, `ext.css`, React 18 UMD, `bundle.js`, `ext.js`),
and after that every page is its own HTML (the heaviest is 34 kB) plus the frames it shows. The heaviest single
frame is a showcase: 51 kB of HTML that then draws in canvas.

## Where the site is mounted

At ui.okayiris.com the site sits at the root, and every path is written as `/…`. The GitHub Pages copy answers
under `/irisui/`, so the prefix is a build input:

```bash
IRISUI_BASE_PATH=/irisui pnpm build     # a copy that works under a subpath
pnpm build                              # the normal, root-based copy for local work
```

`url()` in `src/site/base.ts` and `rewriteBase()` (HTML) / `rewriteBaseText()` (Markdown, JSON, llms.txt) do the
prefixing, and the build writes `dist/.base` so the dev server can serve either copy. `pnpm publish:pages` builds
with the prefix, pushes `gh-pages`, and then rebuilds `dist/` for the root so the dev server keeps working.

The canonical URL, the sitemap and `og:url` follow the copy that is published (`IRISUI_CANONICAL`), so the
GitHub Pages copy points at itself instead of at a domain that does not answer yet. When the domain is live:

```bash
pnpm publish:pages --prefix=/ --canonical=https://ui.okayiris.com
```

## Deploying

`dist/` is plain static files, no server needed: any static host works. Serve `/ds/*` and the fonts with a long
cache, `/api/*` and `*.md` short.

- **GitHub Pages** — `pnpm publish:pages` builds and pushes the `gh-pages` branch, which is what serves
  <https://okayiris.github.io/irisui/>.
- **The CI workflow** — `deploy/pages.workflow.yml` is the same build, gate and deploy as a GitHub Actions
  workflow. It is not in `.github/workflows/` because pushing that path needs a token with the `workflow` scope
  (`gh auth refresh -s workflow`); move it there once the token has it.
- **The custom domain** — when the DNS for `ui.okayiris.com` points at `okayiris.github.io`, publish with
  `pnpm publish:pages --prefix=/ --canonical=https://ui.okayiris.com` and GitHub issues the certificate.
- **Any other host** — upload `dist/`. Cloudflare Pages, Netlify and Vercel all take it with no config: build
  command `pnpm build`, output `dist`.

## This release carries no image bytes

Every picture on the site is generated by the site itself: the canvas pattern labs and the word labs draw
their art at runtime, so no preview and no chapter points at an image file. `public/blobs/` ships only
`SOURCES.md`, which records why the images that used to be copied in there were removed (they showed a real
person's data, or had no licence). The `pnpm blobs` import step is not part of a release any more.
- The added 21 parts are not in the published artifact yet; `artifact/` holds them in its shape.
- The SwiftUI app side belongs to the app; this repo is the web system and its site.

## License

MIT for the code and the site (third-party parts and their notices: `THIRD-PARTY-NOTICES.md`). The Iris name, the ring and the brand belong to Iris.
