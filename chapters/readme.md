# Iris Design System (`IrisUi`)

The look of the Iris app (iPhone, Mac, the windows the assistant builds): cold light on near-black, everything frosted
glass, one ice-blue accent, and her violet ring. The app itself is SwiftUI; these React components are faithful
web versions of its parts, with every value taken from the app's theme. Build with them, don't reinvent them.

A **house** is one installation of Iris with one person's data; the word is used that way throughout these
chapters.

## Where to find what

| I want to... | Go to |
|---|---|
| pick a colour, font, spacing or radius | **Colors**, **Typography**, **Spacing**, **Corner radius** in the sidebar |
| use a ready part (button, toggle, tab bar, card, orb) | **Components**: Brand, Controls, Navigation, Feedback, Surfaces |
| build a screen the assistant makes for someone (widget, word, pen, ring) | **Components**, group Screen parts; rules in `screens.md` (golden key, busy budget) |
| see whole pages of examples | **Components**, group Showcases |
| build an app the assistant makes (sidebar, tabs, dashboard...) | **Components**, group App layouts; rules in `apps.md` |
| design for the web app or the website | `web-app.md`, `website.md` |
| animate or light something (motion, neon, LEDs) | `motion.md`, `effects.md` |
| let the AI fill a recipe | `systems.md`, `generative.md` |
| find a logo, screenshot or icon | **Assets** |

The `.md` chapters are under **Files**.

## The system on one page

**We build the base, the AI tunes it.** Iris can make something new for every person and every moment (a pattern for their groceries, a word that pops when a loop is done, a ring while the assistant talks) without ever leaving her look, because the AI never draws. It only fills in a small recipe; the framework draws, and guards what may not break.

Four layers, each built only from the one below:

| Layer | What | Who decides | Where |
|---|---|---|---|
| Tokens | colours per topic and phase, type, spacing, radius, the busy budget | fixed, by us | `tokens.json` |
| Components | Widget, PhaseRing, Pen, Word, Pattern, Button, Orb... | fixed, by us | `components/` |
| Recipes | a JSON per pattern, word, widget, mark, photo, ring (a GLSL function), screen | the AI, within ranges | `systems.md` |
| Screens | content from the house plus a recipe, laid out by the renderer | the renderer, by the golden key | `screens.md` |

The golden key (`screens.md`) is seven hard rules on top: the hero shows the answer, one handwritten anchor, her sentence ties one thread, one pen mark, one accent per topic, one controlled break in three screens, function and the personal carry the set. They hold the balance so no axis runs ahead: the hero is the answer, the anchor and the sentence carry the personal, and function comes before expression.

Taste is steered by three hands: the person swipes (beautiful or boo, remembered and fed back into every prompt), a critic scores sets in numbers and turns findings into rules, and an inspection measures every recipe (contrast, busy budget, per system its own checks) and sends failures back for repair. How to ask the AI: `generative.md`.

## The feel, in five rules

1. **Near-black, never grey.** Page background `--bg` (#07090c). No white screens, no light mode (mail is the one exception, see Mail).
2. **Everything is a glass card.** `--glass` fill, 1px `--edge` stroke, radius 18, padding 14, 12px between cards, 16px page margin. No shadows on cards, no solid panels.
3. **One accent.** Ice blue `--accent` for what is active (tab, link, action pill). Violet `--violet` only for "on" (toggles) and the ring. Red `--error` only for destructive.
4. **Quiet type.** System font. Titles 17pt `--fg`, the line under them 12pt `--dim`, section labels 10.5pt mono caps with wide tracking in `--faint`. Sentence case everywhere, no exclamation marks, no emoji.
5. **Never an empty black screen.** Anything that loads shows a `Skeleton` in the shape of what is coming.

On the screens the assistant builds for someone, a topic may bring its own accent (rule 3 then reads: one accent per topic), with a handwritten anchor and at most one pen mark. Seven hard rules and a busy budget of 5 keep that calm: read `screens.md` before you build one.

## Loading

```html
<link rel="stylesheet" href="styles.css">
<script src="_vendor/react.js"></script>
<script src="_vendor/react-dom.js"></script>
<script src="_ds_bundle.js"></script>
```

Components land on `window.IrisUi`. Mount into your own node and wrap in the provider (background + font):

```js
const h = React.createElement;
const { PreviewI18nProvider, SectionLabel, Row, Toggle, Icon, TabBar } = window.IrisUi;
ReactDOM.createRoot(document.getElementById("ds-root")).render( h(PreviewI18nProvider, null, h(SectionLabel, null, "Settings"), h(Row, { icon: h(Icon, { name: "car" }), title: "On the road", subtitle: "The assistant listens and talks through this iPhone.", trailing: h(Toggle, { on: true }) }), h(TabBar, { active: 3 })));
```

## Tokens (`styles.css`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#07090c` | every page |
| `--fg` | `#e8f2f7` | titles, text |
| `--dim` | `#8fa3b0` | the line under a title |
| `--faint` | `#5a6b78` | chevrons, section labels, version line |
| `--line` | `#1b2430` | dividers |
| `--accent` | `#7dd3fc` | active tab, action pill, links |
| `--violet` | `#8b5cf6` | toggle on, ring |
| `--error` | `#f87171` | destructive |
| `--ok` / `--wait` | `#4ade80` / `#fde68a` | done / waiting |
| `--glass` | `rgba(180,225,255,.07)` | card fill |
| `--edge` | `rgba(190,230,255,.14)` | card stroke |
| `--radius-card` | `18px` | cards, rows |
| `--topic-*` | 15 topics, 3 colours each | one accent per screen, see `screens.md` |
| `--phase-*` | six loop phases | `PhaseRing` only |
| `--orb-gradient` | violet, sky, magenta conic | the ring, the talk button |

## Components

- **brand**: `Orb` (her ring; also the logo)
- **surfaces**: `Card`, `Row`
- **controls**: `Button` (primary / glass / accent / ghost / danger), `Toggle`
- **navigation**: `StatusPill` (top left), `TabBar` (bottom)
- **feedback**: `Skeleton`
- **screens**: `Topic` (the accent of a subject), `Widget` (glass / pattern / ring / list; small, wide, tall, large), `PhaseRing` (a loop's six phases), `LoopScreen` (one loop in detail), `Pen` (one hand-drawn mark), `Anchor` (one handwritten note), `Word` (one big word with an effect or theme), `ThemeWord` (frozen, fire, autumn), `Pattern` (a moving pattern fill in the topic's tints)
- **web parts, in a topic**: `Chip`, `Progress` (bar or ring), `Stat`, `CheckList`, `Segmented`, `Field`: the same `--k` as the widget, so a web card and a phone widget of one subject match (`WebKit` preview, `web-app.md`)
- **controls, in a topic**: `ButtonGroup` (primary flat, secondary glass, text, danger, icon, busy, disabled, switch); **navigation**: `PageDots`
- plus `Icon` (line icons: sparkles, loop, camera, person, mic, speaker, chevron, external, car, phone, shield, globe, wave, trash) and `SectionLabel`

This project added 21 parts of its own; they sit beside the published system and are documented in the same
place.

Per component: `components/<group>/<Name>/<Name>.prompt.md` (what and when), `.d.ts` (props), `.html` (all variants).

## A screen

The settings page of the app is built only from these parts: use it as the reference for spacing and rhythm. The assistant has a name of her own per house; the product is Iris.

## Surfaces

The rules above are the iPhone app. The other places Iris shows up share the ring, the night and the glass, but
each has its own chapter with its exact values. Read the one you design for before you start:

| Surface | Chapter |
|---|---|
| iPhone app | this README |
| Mac app (the pill, settings, vault) | the **MacPill** component (Controls) |
| Web app (talk page, her windows, sign-in) | `web-app.md` |
| Apps the assistant builds (sidebar, list and detail, tabs, dashboard, board, flow, document, table, widget pages) | `apps.md` and the **apps** previews |
| Website | `website.md` |
| Mail | the Mail section below |
| Screens the assistant builds for someone (widgets, loops, answers) | `screens.md`: the golden key, the busy budget |
| The nine generative systems, and asking an AI for them | `systems.md`, `generative.md`; the labs (wordlab, widget, annotations, buttonslab, photolab, screenbuilder) |
| Light and marks: LED edges, neon lines, pointing, the hand-drawn loop, pen marks | `effects.md` and the `Effects` preview |

One look for the app surfaces (decided 28-09-2026): the app, its screens and every part built for it use the
app's tokens and type (`--font`, `--font-display` from 20px, `--mono`; the faces ship in `fonts/`). The website
and the sign-in pages are their own surface, with their own night-blue ground and their own display face (see
`website.md`), and the web app uses the platform's own face (see `web-app.md`). The chapters describe each
surface's own parts and sizes; where an older value in a chapter disagrees with `styles.css`, `styles.css` wins.
Mail stays light.

## Mail

Mail is the one place Iris is light: a mailbox is a white page, and some mail clients recolour dark mail on their own. The
template is the mail layout; every mail (mailings, the gate's sign-in and invite mails, billing) goes through it.
How to write, test and send one: the `iris-mailing` skill.

**Layout**
- The Iris ring (40px PNG) centred *above* the card, never inside it: a mail is signed by the person, not by a logo, and a lone logo in the card's corner left a hole beside it.
- One white card, max 520px, radius 18, 1px `#E3E6EF`. A 4px gradient bar on top (cyan, blue, violet, magenta), left out on a product mail (`plain`), so nothing reads as advertising. Same look for every mail otherwise.
- Text 16px/1.6 `#1B2033`, title 24px `#0C0F1C`, chapter headings 19px, captions and small print `#8A90A3`. System font; no web fonts, no SVG (neither shows in every mail client).
- Main button dark `#0C0F1C`, radius 12, white label, optionally a small white PNG icon before it. One main button per mail. A second action is an outlined button inside the text (the invite link).
- Screenshots as JPG (a webp does not show everywhere), with a caption. A phone screen is narrow (220 to 300px) and centred; a wide one fills the card. Demo content only, never a real person's data.
- Signed by the person: a round photo and a short sign-off with their own name and role, in the mail's language.
- A mail in a series carries the step bar on top: "Welcome series, mail 2 of 5", every step with when it comes ("received", "today", "in 3 days"), the current one bold.
- Dark mode: one style block (`DARK`) gives each colour its dark twin for the major mail clients on Mac and iPhone. A new colour in the template needs its line there too.

**Words**
- The sender writes, as a person: "I", short sentences, a few chapter headings, a story instead of a list.
- The assistant by her own name (`{{name|Iris|%s}}`), the house as "your home", never "your place".
- No version numbers in a subject; one news item per release mail.
- Say what is coming ("in 3 days I'll send you..."), and that every mail can be answered.
- No em dashes, no emoji, no exclamation marks.


---

## Consuming this system (generated — do not edit)

Every path named below is relative to the root of this design system: read `api/tokens.md`.

If the text above differs on what to load or read, follow this section.

`components/bundle.js` defines `window.IrisUi` (8 components); `components/bundle.css` is its stylesheet; `tokens.css` is every token as a CSS variable plus `@font-face` for the fonts. The bundle needs react 18 (not packed in this system: bring your own copy) (`window.React`), react-dom 18 (not packed in this system: bring your own copy) (`window.ReactDOM`), loaded before it. Build any UI by mounting these components; never hand-build a control or draw an icon the system provides.

- **Standalone page:** inline `tokens.css` and `components/bundle.css` in a `<style>`, then the library files and `components/bundle.js` as classic scripts (a file containing `</style`, `</script` or `<!--` breaks an inline element: write the sequence `<\/style`, `<\/script` or `\x3C!--` in your copy, or load that file by URL).
- **Design canvas:** bring `components/bundle.css`, `components/bundle.js` and `components/index.d.ts` (for the editor’s props panel) onto the canvas in full, as the canvas type’s design-system components reference says (a server-side copy first where it offers one); load the stylesheet before the script; skip the library files (the artboard supplies React); mount with `<x-import component-from-global-scope="IrisUi.<Comp>" …>`.
- **Slides deck, or any surface that cannot run the bundle:** tokens only — the values are on `api/tokens.md`; the deck takes `tokens.json` by file path for its colour pickers.

Fonts: one file per family is enough (below: the upright face nearest regular weight; bold and italic synthesize). Fetch it as the fetch column says (Artifact tool `read`, that id or path as `path`) and upload it as an asset where you use it (`publish`, `file_path`, `asset:true`) — HTML/CSS: an `@font-face { font-family: "<family>"; src: url(<uploaded>) }` rule; a Slides deck: write `fonts/<id>` = `{"family":"<family>","src":"<the url the upload returned>"}`.

| family | file | fetch | CSS | Slides `fonts/<id>` |
| --- | --- | --- | --- | --- |
| SF Pro Text | `fonts/SF-Pro-Text-Regular.woff2` (weight 400) | `read` the file | `var(--font-text)` | `sf-pro-text` |
| SF Pro Display | `fonts/SF-Pro-Display-Regular.woff2` (weight 400) | `read` the file | `var(--font-display)` | `sf-pro-display` |
| SF Mono | `fonts/SF-Mono-Regular.woff2` (weight 400) | `read` the file | `var(--font-mono)` | `sf-mono` |

**Read, per thing:** a component’s props, parts and examples: `api/components/<Comp>.md`; token values: `api/tokens.md`. After this README, fetch the cards and fonts you need in ONE message as parallel calls — none depends on another.

**Two rules.** Before you use a thing — a component, a token group, an icon, an asset — read its card from the index below; a value you did not read from a card is a guess. `tokens.json`, `manifest.json`, `components/index.d.ts` and `design-system.json` are sources for tools: hand them over. `components/<Comp>/README.md` is the long-form second read a card links to.

## Index (generated — do not edit)

**Tokens**

- `api/tokens.md` — Every token: text, fill, palette, type, spacing, radius. (5.5k)

**Components** (`api/components/<Comp>.md`, 8)

- **brand**: `Orb` — Her orb: a ring with a slowly turning violet-blue-pink gradient and a soft glow
- **controls**: `Button` — Pills. primary = the light full-width button of a decision ("Agree and continue", size lg); glass = frosted; accent = ice-blue glow ("Continue here", size sm);… · `Toggle` — The iOS switch, 51x31: violet (--violet) when on, grey glass when off
- **feedback**: `Skeleton` — What shows while anything loads from the house: glass blocks with a sheen, in the shape of the real content
- **navigation**: `StatusPill` — Top left of every screen: the orb and one word of what she is doing ("busy", "listening"), or an accent pill with an action ("Continue here") · `TabBar` — The floating tab bar at the bottom: a frosted capsule with four tabs (Iris, Loops, Camera, You) and the talk button in the middle, a ring like the orb
- **surfaces**: `Card` — The one surface of the app: frosted glass (--glass), 1px --edge stroke, radius 18, padding 14 · `Row` — A settings row (the You page): 24px icon at 80% --fg, a 17pt title, a 12pt --dim line under it, and on the right a Toggle, a menu value, a chevron or an extern…
