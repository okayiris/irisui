# Web app (talk page and windows)

The browser version of Iris. Every house serves one talk page of its own; the assistant builds
her own windows on it with the screen kit. Same "Ice" look as the app (near-black, frosted glass, one ice-blue
accent), but web-native: the platform's own face, rem sizes, smaller radii. Ice is the only theme; the page is dark only
(`color-scheme: dark`).

## Tokens: what differs from the app

Same values, same names as the app's tokens: `--bg` `--fg` `--dim` `--faint` `--line` `--accent` `--glass`
`--edge`. Only these differ or are new:

| Web token / value | App equivalent |
|---|---|
| `--on-accent: #07171f` | `--accent-ink` (same value, other name) |
| `--accent-soft: rgba(125,211,252,.12)` (hover tint) | none |
| `--accent-line: rgba(125,211,252,.45)` (outlined button, focus edge) | none |
| `--good: #4ade80` / `--warn: #fbbf24` / `--bad: #f87171` | `--ok` / `--wait: #fde68a` / `--error` (warn is amber, not pale yellow) |
| `--fast: .15s` `--dur: .2s` `--ease: cubic-bezier(.2,.9,.25,1)` `--press: .96` | none |
| `--column: 76rem` (84rem from 90rem wide), `--edge: 1.1rem`, `--line: 1.5rem`, `--lane: 2.7rem` | `--gutter: 16px` |
| `--bar: calc(5.45rem + safe-area-bottom)` (input bar height) | tab bar 62px |
| Font the platform's own face, 15px/1.6 | system SF, 15/1.35 |
| Kit window font the platform's own face, 15px/1.5 | |
| Card radius `.9rem`, padding `.7rem .85rem` (page) / `.9rem 1rem` (kit) | 18px, 14px |
| Kit button radius `.6rem`; pills `999px` | every button a pill |
| Primary button = accent fill `--accent` + `--on-accent` text | primary = white `#e9f1f5` |
| Glass carries `backdrop-filter: blur(14px)` (18px on large panels) | no blur on cards |
| Micro label `11px` mono, 500, `.1em` tracking | 10.5px, `.14em` |
| Status word `#cfe8f6`, glow `0 0 22px rgba(125,211,252,.45)` | `--fg` 17pt |
| Violet only in the plan label (`rgba(139,92,246,.14)` fill, `#d8ccfd` text) and the pill | toggles, ring |

No toggles, tab bar or big orb button on the web; the ring lives in `<iris-pill>` and `#sphere`.

## The talk page, top to bottom

- **The beam** `#orb`: a full-screen WebGL wave behind everything, `opacity .85`, never
  clickable. Before the talk starts it runs through the middle of the screen with the status on it; once
  there is text (`body.chatting`) it sinks onto the input bar (`translateY(calc(50dvh - 2.6rem))`).
- **Status** `header > #headgroup`: sticky, centred, a soft dark gradient plus
  `blur(14px)`. The small ring `#sphere` (1.05rem, conic ice gradient, hollow centre) hangs left of one
  status word `#status` (`.95rem`, 500, `.06em`; `1.25rem` before the talk, pushed down to `34vh`). The word
  grows out of the ring when it changes (blur plus slide, `.42s`). Next to it, outside the flow: the plan pill
  (violet, left), "Continue here" and a stop cross (thin accent-outlined pills, `.55rem`-`.6rem` text).
- **Lane** `#screenlane`: one icon per screen, fixed in the left margin, glass
  `rgba(12,17,23,.5)`, radius `1rem`, `blur(14px)`. Items `2.1rem`, radius `.7rem`, `--faint`; current one
  accent tint `rgba(125,211,252,.14)` with the icon in `--accent`. Name shows on hover. A window's icon carries
  a small frame corner. Below 46rem it becomes a row just above the input bar.
- **Column** `.wrap`, max `--column`, then in order: archive strip, cloud chips `#clouds`
  (glass pills `.86rem`), widgets, task list, job cards, her **blocks** `#blocks`, and the
  conversation `main#log`.
- **Conversation**: a timeline, oldest on top, a 1px `--line` hairline on the left with
  a 5px dot per line. Iris speaks in `.agi` (`1.08rem`, `--fg`, bright dot); you in `.you` (`--accent`, 2px
  accent stripe, sticks to the top while replies scroll). Times in 10.5px mono caps `--faint`. Other streams
  get their own stripe colour: a messaging app `#60a5fa`, a job `#fbbf24`.
- **Right rails** from 72rem wide: jobs drawer `#jobrail` and the inbox (messaging and mail tabs,
  `border-left: 1px solid var(--line)`, rows split by hairlines, no cards).
- **Input bar** `form#typed`: sticky at the bottom, column width. Its glass sits on a
  masked layer that fades out at top and sides, so it dissolves into the beam. The field is a
  textarea dressed as a pill (`--glass`, `--edge`, radius `1.45rem`, padding `.85rem 1.15rem`, grows to
  `33vh`; focus edge `--accent-line`). Right of it: a mode button, a small stop button while the assistant works
  (`2.3rem`, glass), and the round action button (`2.9rem`): mic on glass when muted (a strike through it),
  accent fill with a breathing ring while listening, a send arrow while typing.

Breakpoints: `46rem` (phone: `--edge .7rem`, lane to the bottom), `71.99rem` (rails hide), `90rem` (wider).

## Where her UI lands: three surfaces

| Surface | What it is | Frame | Use for |
|---|---|---|---|
| **Window** (`window`) | a sandboxed iframe laid over the talk (`#screen`) | overlay `rgba(7,9,12,.82)` + `blur(18px)` down to the input bar; the frame is max `--window-wide` (default `30rem`), slides in from the right (`.35s`), close cross top right (`2rem`, glass), resize grip bottom right | a standalone view: a day plan, a dashboard, a form. No access to the page. |
| **Page screen** (`screen`) | takes over the column (`#pagescreen`) | none, it is the column | a new arrangement of the page itself, with live parts (`<Clouds/>`, `<Conversation/>` etc.) |
| **Block** (`block`) | code the assistant injects above the talk (`#blocks`) | glass card, radius `.9rem`, padding `.75rem .9rem`, blur 14; a head in 10.5px mono caps `--faint` with its name and small round buttons | a small live thing that should stay in view while talking |

The same kit renders all three. In a window it brings `BASE_CSS` (page ground) plus `KIT_CSS`; in the page
every kit rule is scoped to `.block` and `.screen` so it cannot restyle the conversation.
A Card inside a block or inside another Card loses its frame .
Also: on a phone one window shows full-bleed (no chrome, `#07090c`, transparent inside the
app; a sent press shows a confirm pill `rgba(125,211,252,.16)` with an `--accent-line` edge), and on a
Chromecast one sits under a large animated name (a display web font loaded from a font host, the one
exception to "no other fonts").

## The kit

Globals, no imports; preact `h`, hooks, and every part below. Part names and props are English
(`Screen`, `Card`, `Row`, `Button`, ..., `title`, `subtitle`, `icon`, `say`, `primary`, `outline`),
used by marketplace plugins. Children are always allowed where listed.

| Part | Props | Renders | When |
|---|---|---|---|
| `Screen` | `title`, `subtitle`, `icon` | `.screen` padding `1.2rem 1.1rem 2rem`; `subtitle` (`.9rem` `--dim`) above an `h1` (`2rem`, 500) | the root of every window and page screen. `icon` goes to the lane, not into the window. |
| `Stats` + `Stat` | `value`, `label`, `icon` | grid `auto-fit minmax(7rem,1fr)`, gap `.5rem`; tile glass, radius `.7rem`, padding `.7rem`, value `1.4rem`/500, label `--dim` | a few numbers at the top: one number, one word (`14°` `outside`) |
| `Card` | `label`, `title`, `icon` | glass card, radius `.9rem`, padding `.9rem 1rem`, `1.3rem` below; label 11px mono in `--accent`; title `1.1rem`/600 | a group that belongs together |
| `Row` | `left`, `right`, `icon` | flex row, `.6rem 0`, hairline `--edge` on top, `.9rem`; right side `--dim` | key/value lines inside a Card |
| `Timeline` | children | 1px `--edge` line, `1.4rem` indent, 9px dots | anything in time order |
| `Moment` | `time`, `title`, `subtitle`, `kind` (`"fixed"` / `"hint"` / none), `icon` | dot + mono time + title 600 + `--dim` subtitle. `fixed`: accent dot with glow (an appointment). `hint`: 5px dot, `.92rem` `--dim` (her advice) | one thing on the timeline |
| `Now` | `time` | white filled dot, mono `NOW · 09:40` | the present moment on a timeline |
| `Section` | `name` | faint dot, mono caps name | a part of the day on a timeline |
| `Buttons` | children | flex row, gap `.5rem`, `.6rem` on top | always wrap buttons in it |
| `Button` | `say` (sentence sent to her), `onClick`, `primary`, `outline`, `icon`, `off` (disabled) | `flex: 1`, padding `.7rem`, radius `.6rem`, 600. Quiet: `rgba(255,255,255,.08)` (hover `.14`). `primary`: accent fill, hover `#a5e2ff`. `outline`: pill with `--accent-line` border, accent text, 500, hover `--accent-soft`. Press `scale .96`, focus 2px accent ring, disabled `.45`; busy spinner while a promise runs or ~700ms after `say` | every action. One `primary` per view; a quiet choice next to it is `outline`. |
| `List` | `items` | plain `ul`, `1.1rem` indent | a short loose list |
| `Text` | `dim` | `p`, `1rem` below | a sentence of explanation |
| `Icon` | `name`, `path`, `size` (18), `thick` (1.75), `filled`, `color`, `title` | inline 24x24 Lucide stroke SVG in `currentColor`; unknown name = dashed square | 161 icon names (`clock`, `calendar`, `mail`, `car`...) |
| `Clouds` `Conversation` `Widgets` `Tasks` `Blocks` | none | places the live page part moves into | page screens only; in a window they print a note |

`say(text)` sends a sentence as if the person had said it: the way out of a window.

## Sign-in pages

Not Ice. The gate pages (sign in, invite, pair a phone, choose a plan) wear the website's look:

- `:root` `--bg #0C0F1C` (night blue), `--fg #E9ECF4`, `--dim #98A0B6`, `--edge #232A3F`, `--button #E9ECF4`,
  `--button-text #0C0F1C`.
- Font a display grotesk (400 to 700), self-hosted under `/_gate/fonts/`, 17px/1.55.
- Background: two soft radial glows, magenta `rgba(192,38,211,.14)` top left and blue `rgba(59,130,246,.14)`
  top right, over `--bg`, fixed.
- One centred column, max 360px, text centred; `h1` 2.6rem/700, `-.04em`, balanced.
- Fields: pill, `14px 20px`, `1.5px` `--edge`, transparent, focus edge violet `#8B5CF6`.
- Button: pill, `14px 24px`, light fill `--button` with dark text, weight 500, lifts 1px on hover.
  Pay button: gradient `#8B5CF6 -> #3B82F6`, white text.
- Card: radius 28px, `1.5px` edge, `rgba(255,255,255,.025)`, shadow `0 20px 60px rgba(0,0,0,.25)`.
- Step dots, tabs and plan tiles in the same pill/edge language; the current step is violet.
- `<iris-pill>` on top as the logo. From 1000px wide a demo window sits on the right: radius 26px, a pill with
  the assistant's name on top, a short scripted exchange looping every 15s (your line in a violet bubble, her steps with a
  cyan `#22D3EE` check). Demo content only.

## Topic colour

A window, block or Card about one subject sits in a `Topic` (see `screens.md` and the `Topic` card): chips, bars, rings, ticks, tabs, fields and the primary button inside it take the subject colour (`--k`, `--kd`), the same as the `Widget` on the phone. The parts: `Chip`, `Progress`, `Stat`, `CheckList`, `Segmented`, `Field` (the `WebKit` preview shows them in four topics). One topic per screen; the page itself stays ice.

## Do and don't

| Do | Don't |
|---|---|
| Build every window from the kit parts, rooted in `Screen` | Bare `<button>`, a clickable `<div>`, own CSS classes for what a part already does |
| Tokens by name (`var(--accent)`) | A hex outside the token list, an own font, `outline: none`, `transition: none` (the style gate rejects the window) |
| One `primary` button, the rest quiet or `outline`, under what they act on | Three filled buttons, buttons in a card header |
| Stats as a number and one word | A sentence in a tile |
| Timeline for anything with a time; `fixed` for fixed appointments, `hint` for her advice | A table of times |
| Show the result next to the button (the busy spinner comes for free) | A result only in the chat |
| Glass over the beam, text shadow on anything floating | Solid panels, heavy drop shadows, light surfaces |
| Lucide icons via `Icon`, few and small | Emoji, icon rows that are always visible |
| Sentence case, short, no dashes, no exclamation marks; the product is "Iris" | A borrowed name or a borrowed voice on screen |
| Real data in the house, demo data in any shot or mock | A real person's name, mail or agenda in a screenshot |

Reference: `Window example.html` next to this file is a day-plan window rendered exactly as the kit does.
