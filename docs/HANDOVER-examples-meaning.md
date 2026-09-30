# Handover: examples, the orb family, Meaning, Ringlab modules

Written 1 October 2026 so the work can be picked up months later without the chat it came from.
Everything below is in this repo unless a path says otherwise.

## What this is

1. **Examples as real apps.** `public/examples/` holds clickable demos per device (phone, Mac with Settings, windows Iris opens and a chat bar, web app, Chrome extension, vault with PIN on both devices, TV). They are built from `window.IrisUi`, so testing them tests the system.
2. **The orb family, right.** Fixed sizes, a sharp Orb, thinking drawn as the apps' neon light patterns, and a neon word.
3. **Docs you can see.** Hovering a component in the menu shows a live preview beside it; `/components` shows every part as a live picture.
4. **Meaning: what may go where** (`/foundations/meaning`). What each drawing means, where it lives, and when a state is true. The orb is Iris, never decoration.
5. **Ringlab as internal modules.** The labs (`~/Developer/Sandbox/Ringlab`, port 5190, no git) show inside the local site as switchable modules, and never in a public build.

## Where things are

| Piece | Files |
|---|---|
| Additions to the system | `src/ds/ext.tsx`, `src/ds/ext.css` (built into `public/ds/ext.js`, `ext.css`) |
| Mark, Edge, EdgeText, THINKING | `src/ds/ext.tsx` (Edge section before `SHIPPED`), specs in `src/site/ext-components.ts`, docs in `src/site/ext-docs.ts` |
| Orb sizes, the TalkOrb and Orb3D rules | `src/site/content/overrides-brand.ts`, table "Which Iris, how big" in the Mark doc |
| Size check | `scripts/check.mjs`: literal `size:` in example pages; Orb 16/22/28/34, TalkOrb 60+, Orb3D 100+ |
| Meaning page | `src/site/content/foundations-meaning.ts` |
| Menu preview and gallery | `public/site.js` (peek, gallery queue, zoom to content), `public/site.css`, `/components` page in `src/site/ssr.tsx` |
| Ringlab modules | `src/site/lab.ts`, the "Lab, internal" block in `src/site/Shell.tsx`, `/lab/<id>` pages in `ssr.tsx`, `~/Developer/Sandbox/Ringlab/modules.json` |
| Examples | `public/examples/*/index.html`, the shared bar in `public/examples/nav.js` |

## Decisions, and why

- **An orb is Iris.** It appears only where she is present, speaks, works or waits, and always with a true state. It is never a bullet, logo, avatar, background or spinner for other work. The Mark is the logo and never shows a state.
  Why: Joris, "orbs have a meaning, not a random picture on your screen".
- **Fixed places.** Her orb sits top left. Her words, the hero and the one action sit above the fold (phone: the first 600px). Only content scrolls, never her.
  Why: Joris disliked an orb on a card below the fold, and her sentence repeated in a card.
- **Sizes.** Orb 16/22/28/34, TalkOrb from 60, Orb3D from 100.
  Why: a TalkOrb under 60 reads as a dot.
- **Orb sharpness.** The release blurs the glow and then masks it, which leaves a grey disc with a hard edge. `ext.css` drops the blur and puts the softness in a radial mask. Away keeps `grayscale(1)`.
- **Thinking is never one look.** Each time she starts thinking she picks a random pattern from `THINKING`: comet, zip, orbit, sparks, flow or party. These come from the apps' `RandPatroon` (`AGI/Nova/Packages/NovaKit/Sources/NovaKit/Support/Rand.swift`).
  - `Edge` draws them on a canvas.
  - It pauses when out of sight.
  - It keeps 36px of glow room round the line: never give it a parent with `overflow: hidden`.
  - It works along a ring, a rounded rectangle or any SVG path.
- **EdgeText.** An SVG word with a dim tube and lit strokes. One per screen, 40px or larger.
- **The Team Room is Iris in roles.** Settled with the Team Room concept on 1 October, weighed with a critic.
  - The name is always "Iris · Scout".
  - An orb shows only on the active role.
  - Humans and outside agents never get an orb.
  - A Ringlab personality shows only on the role card.
  - The canvas has fixed slots.
  - Initiative has one source, and signed taps are a separate layer.
  - The full text is on the Meaning page, "Many of her".
- **Ringlab stays internal.** Only the dev server builds with `IRISUI_INTERNAL=1`. `publish:pages` builds without it and refuses if `dist/lab` or `dist/examples/labs` exists. `public/examples/labs/` is in `.gitignore`.
- **The dev server's live-reload listens only in the top page.** Each demo frame used to hold its own connection open. The browser allows six per server, so every frame after the sixth stayed empty.

## Rejected, with the reason

- **An orb per team member as its own assistant, with its own colour or ring.** People read five assistants.
- **A Ringlab form in the member rail, the chat or the canvas.** That is an avatar in disguise (rule 4). A personality is not a state, and a 3D form falls under Orb3D (at most two per screen).
- **"Disagreement is two sides I weigh" as the only voice.** Joris wants independent roles that talk live. Instead, roles address each other openly, as "Iris · Role".
- **The Ringlab lab source in this repo.** Only minified builds or modules may come here. The lab stays in Ringlab.
- **A TalkOrb under 60** (it becomes a dot): use the flat Orb.
- **A blurred Orb glow** (grey disc): use the soft mask.
- **A single cyan thinking arc**: use the app patterns, a different one each time.
- **The SDF shapes the orbs session left out:** trefoil, lemniscate, squircle (the ring needs a true distance), crescent and gear (bad ring shape), the knots (too slow), spring and Möbius (they break into fragments), a 3D heart (hard to read).

## Not upstream yet

These live in `src/ds/ext.tsx` and `ext.css` as overrides on top of the release bundle (`Object.assign(window.IrisUi, SHIPPED)`). They still have to go into the release (`bundle.js` / `bundle.css`, which is never edited here):

1. The Orb glow fix (a soft mask, no blur).
2. Edge thinking: `THINKING`, `Edge`, `EdgeText`.
3. The `TalkOrb` and `Orb3D` wrapper that draws a random Edge pattern while thinking (`thinksWith`).
4. `Mark`.

## Open questions

- **Dialog Stage:** the Dialog's stage fix, which is not settled.
- **One Anchor per screen:** is it always exactly one, including screens that are not built for one person?
- **"Dark only" vs system:** AGENTS.md says dark only, but the decision for Iris is to follow the system's light or dark. One of the two has to change.
- **Orb3D** does not render in headless browsers (no WebGL). Check it by eye in a real browser.

## State of git

- The work is committed locally on `main`: 23 or more commits ahead of `origin/main`, **not pushed**. Pushing is Joris' call.
- Uncommitted on purpose: `public/ds/ext.js` and `ext.css` (built files, mixed with another session's work). Rebuild them and commit once that work has landed.
- Other sessions' uncommitted work is in the same tree (LoopBubble, CircleStack, overrides, `examples/nav.js`, `artifact/`). Commit with your own index or pathspec, never `git add -A`.

## How to go on

- **Dev server:** run `node scripts/dev.mjs 4173` and open http://localhost:4173/.
  - It rebuilds on changes in `src/`, `public/`, `scripts/` and Ringlab's `modules.json`.
  - For screenshots without reloads, run `node scripts/dev.mjs 4191 --no-watch`.
- **Ringlab:** start it in `~/Developer/Sandbox/Ringlab` with `node server.ts` (http://localhost:5190/).
  - Switch modules on or off in `modules.json`, then open http://localhost:4173/lab/orbs.
- **Checks:** `node scripts/check.mjs` (a full run hung on `labs/theme-lab`, another session's page) and `pnpm typecheck`.
- **Before publishing:**
  1. Remove the "Labs" entry from `public/examples/nav.js`. Publicly it becomes a dead link.
  2. Run `pnpm publish:pages`. It already refuses anything from Ringlab.
  3. Ask Joris first.
- **Adding a meaning:** a new drawing (a Ringlab ring, form or pattern) goes into a product only after a row on the Meaning page says what it stands for.
- **Next logical steps:**
  1. Move the "not upstream yet" list into the release.
  2. Walk every example against the Meaning quick test.
  3. Let the Ringlab layouts validator use the slots (appbar, lede, hero, content, tabbar, bottom). That work sits with the layouts session.
