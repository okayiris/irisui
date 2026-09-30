# Working in this repo (for an agent)

This repo is the Iris design system and the site that documents it. If you are an agent asked to build or change
something here, read this first: it says what to touch, what to leave, and how to know you are done.

## Read before you write

- `https://ui.okayiris.com/llms.txt` — the map of the system, one line per part, in reading order.
- `/api/components.json` — every component with its props and the code behind each variant.
- `/api/tokens.json` — every token, its value and what it is for.
- `/<page>.md` — the plain-text twin of any page (e.g. `/foundations/colour.md`).
- `src/content/` — the published release as it ships: the chapters, and each component's `README.md` and
  `preview.html`. That folder is the design system's own text; do not rewrite it to make code compile.

Build only from what the system provides. Never hand-build a control it already has, never draw your own icon,
never write a raw value where a token exists.

## The layout of the repo

| Path | What you may change |
| --- | --- |
| `src/ds/ext.tsx`, `src/ds/ext.css` | the parts and values this project added. New work goes here. |
| `src/site/*.tsx`, `src/site/content/*.ts` | the site: the renderer, the pages, the written content, the per-component guidance. |
| `public/ds/` | the system as served. `bundle.js`, `bundle.css`, `tokens.css`, `index.d.ts` come from the release: do not edit. `ext.js`/`ext.css` are built from `src/ds/`. |
| `src/content/` | the release. Add nothing here unless the release itself changed. |
| `scripts/` | the build, the dev server, the gate, the publish. |
| `artifact/` | generated: `pnpm build-artifact` writes the added parts in the Design System artifact's shape. |

## The rules a part must keep

1. Tokens only, through the variables. No hex, no px where a token exists.
2. Every control answers the hand: hover, active, `:focus-visible` with the focus ring (`--focus-ring`).
3. Motion through `--motion-fast`/`--motion-base`/`--motion-slow` and `--ease-house`, and respect
   `prefers-reduced-motion`.
4. Dark only. Near-black, glass, one accent (`--accent`), violet only for on and the ring, red only for
   destructive.
5. Labels take `--label` (7.6:1), never `--faint` (3.6:1) — the gate measures this.
6. Sentence case. No emoji, no exclamation marks, no em dashes.
7. Take the house `Button` from `window.IrisUi` instead of making one.

## How to check your work

```bash
pnpm build            # renders the site into dist/
pnpm check            # the gate: every page and frame in Chromium
pnpm check:artifact   # the 14 artifact previews must mount
pnpm check:live       # the same gate against the deployed copy
pnpm typecheck
```

The gate is not a formality. It fails on a console error, a failed request, a sideways scroll, a missing `h1`,
a jumped heading level, a missing title or `lang`, a missing landmark, an untitled frame, an image without alt,
a control without an accessible name, a positive tabindex, a link that lands on no file, a frame that did not
mount, a credential in a published file, and a colour pair below its contrast floor. It also drives the site:
`/` focuses search, a query returns hits that exist, Escape closes the panel, the code button opens the code.

## Publishing

```bash
pnpm publish:pages    # build for /irisui, push gh-pages, then rebuild dist/ for the root
```

`git` on this machine may be the Xcode shim that refuses to run; the publish script finds a working one and
`IRISUI_GIT` overrides it. Pushing `.github/workflows/` needs a token with the `workflow` scope, which is why
the workflow lives in `deploy/` until then.

## Honesty rules

- A number you did not read from a token, a README or a preview is a guess. Do not guess: write down that the
  system has no value for it, and leave it out rather than inventing one.
- Do not claim something works because a command exited zero. Look at the built site, or run the gate.
- The release is the system; this repo is the system plus the additions. Where the two disagree, say so in the
  text instead of quietly picking one.
