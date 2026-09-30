# Contributing

Thanks for looking. Two things can change here: the design system itself (a part, a value, a rule) and the site
that documents it.

## Small changes

Open a pull request against `main`. Before you push, run:

```bash
pnpm install
pnpm build
pnpm check
```

`pnpm check` is the gate, and it looks at the built site the way a visitor does: every page and every frame in
Chromium, then links, headings, landmarks, alt text, contrast, the search box, the code buttons, and a scan for
anything that looks like a credential. A red gate is a real problem, not a formality. See `AGENTS.md` for what
it asserts and for the rules a new part must keep.

## Bigger changes

The design system's own text lives in `src/content/` — the chapters, the per-component `README.md`, the release
index. That folder is the published release; changes to it belong in the design system repository, not here.
What this repo adds on top sits in `src/ds/` (parts and values) and `src/site/` (pages and guidance).

- Add or change a part: `src/ds/ext.tsx` + `src/ds/ext.css`, then describe it in `src/site/ext-components.ts`
  and `src/site/ext-docs.ts`.
- Add or change a value: a token in `src/ds/ext.css`, with a note saying what it is for and the contrast it has.
- Add or change a page: `src/site/content/`.
- Change how the site looks: `public/site.css` (the shell) — the components' own look comes from the release.

## Words

English, sentence case, calm and concrete. No emoji, no exclamation marks, no em dashes. "She" for the
assistant, "Iris" for the product, "you" for the reader. Say what a thing is, what it measures and when not to
use it; leave out anything you cannot source.

## Publishing

`pnpm publish:pages` builds the copy for the GitHub Pages address and pushes it. Maintainers run it; it needs
push access to the repository.
