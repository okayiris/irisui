# Website

The marketing site: a calm night-blue page, big tight headlines, white pill buttons, and the Iris ring as the only
colour. Source of truth is the site's own stylesheet.

## How the site differs from the app

| | App (`IrisUi`) | Website |
|---|---|---|
| Background | `--bg` #07090c, near-black | `--night` #0C0F1C, night blue |
| Font | system font | a display grotesk, 400 to 700 |
| Surfaces | frosted glass card on everything | no glass: open space, 1px or 1.5px line borders, a ring border for what matters |
| Accent | ice blue `#7dd3fc`, violet for "on" | the ring gradient (cyan, blue, violet, magenta); cyan for focus and hover |
| Buttons | glass / accent pills | solid off-white pill with night text; outlined pill as second |
| Type | quiet, 17pt titles | loud: h1 up to 88px, weight 700, tracking -0.045em |
| Density | dense rows, 12px gaps | lots of air: 136px between sections, 96px between columns |

Do not use app tokens (`--bg`, `--fg`, `--accent`, `--glass` rgba) on the site, and do not use site tokens in the app.
The one shared thing is the orb drawing (glass circle, turning ring, dark heart).

## Tokens

| Token | Value | Use |
|---|---|---|
| `--night` | `#0C0F1C` | page background, text on white buttons |
| `--text` | `#E9ECF4` | body text, primary button fill |
| `--muted` | `#98A0B6` | lede, list items, footer, captions |
| `--line` | `#232A3F` | every border and divider |
| `--cyan` | `#22D3EE` | focus ring, button hover, links in text |
| `--blue` | `#3B82F6` | ring, speech bubbles (with violet) |
| `--violet` | `#8B5CF6` | ring, plan bullets, glow shadows |
| `--magenta` | `#C026D3` | ring |
| `--ring` | `conic-gradient(from 200deg, cyan, blue, violet, magenta, cyan)` | featured borders, bullets, active chips |
| `--glass` | `#151A2E` | icon tiles, language banner (solid, not rgba) |
| stage | `radial-gradient(120% 90% at 50% 0%, #1a1f3a, #0b0e1a 70%)` | demo panels |
| done green | border `#2F6B57`, text `#b7f0d2` | "done" chips, thank-you |
| error | `#fca5a5` | form error text |
| info pill | text `#93C5FD`, border `#2F4F80` | "in test", "building" |
| glow | `0 20px 60px rgba(139,92,246,.14)` | under a ring-bordered card |
| radius | 999px pills; 18px cards; 22px stages; 28px hero card, photos, big cards; 14px screenshots | |

## Type

Font a self-hosted grotesk (`system-ui, -apple-system, "Segoe UI", sans-serif` as fallback), woff2 (latin +
latin-ext, weights 400 to 700). Free under the SIL Open Font License. Only 400, 500 and 700 are used.

| Role | Size | Weight / line / tracking |
|---|---|---|
| Body | 1.125rem (18px) | 400 / 1.55 (1.65 in paragraphs) / 0 |
| h1 | `clamp(2.75rem, 7vw, 5.5rem)`; hero `clamp(2.8rem, min(5vw, 8.4svh), 4.6rem)` | 700 / 0.98 / -0.045em, `text-wrap: balance` |
| h2 | `clamp(1.9rem, 3.6vw, 2.75rem)` | 700 / 1.05 / -0.03em |
| h2 big | `clamp(2.4rem, 5vw, 4rem)` | 700 / 1.05 / -0.03em |
| h3 | 1.15rem (1.4rem in pillars) | 700 / - / -0.01em |
| Lede | 1.3rem, `--muted`, max 32 to 46ch | 400 |
| Lead | 1.2rem, `--text`, max 46ch | 400 / 1.55 / -0.01em |
| Quote | `clamp(1.5rem, 3vw, 2.1rem)` | 400 / 1.25 / -0.02em |
| Price | 2.2rem, unit 0.95rem muted | 700 / 1.1 / -0.02em |
| Small | 0.95rem (nav 1rem, notes 0.85 to 0.92rem) | 400 |

Paragraphs cap at 62ch. Sentence case. Scripts that break under tight tracking (Arabic, Indic, CJK) get
`letter-spacing: 0` and more line height via `html[data-loose]`; CJK h1 one size down.

## Layout

- Container `.wrap`: max 1120px, side padding 24px, 16px under 600px.
- Two-column split 5fr / 7fr (text left, picture or demo right), gap 96px. One column under 860px, gap 28px.
- Section `section.block`: 136px top and bottom, no border lines (the "Calm" pass). 88px under 860px.
- Section head `.head`: h2 left, lead right on the same 5/7 grid, 72px above the content.
- Feature grid: 3 columns, gap 64px 56px; 1 column under 860px.
- Breakpoints: 1000px (hero goes two-column), 860px (everything stacks), 760px (nav hides), 640px, 600px, 520px (buttons full width).
- `.page { overflow-x: clip }`: nothing may scroll sideways.

## Components

**Header** (`.headbar`). Wordmark left: small orb (26px) plus lowercase "iris", 700, 1.25rem,
-0.02em. Nav links 1rem `--muted`, hover `--text`, one line high (overflow hidden). Right: language select,
"Log in" text link, outlined pill "Join the waitlist", solid pill "Try Iris". No bar, no background, no sticky.
- Do: keep the solid pill as the last item. Don't: add a filled header bar or a second solid button.

**Buttons.**
- Solid `.button-solid`: `--text` fill, `--night` label, 500, 1rem, padding 9px 18px (form: 14px 24px), radius 999px, hover fill `--cyan`.
- Outlined `.button-small`: 1.5px `--line` border, `--text` label, padding 8px 16px, hover border `--violet`.
- Do: one solid button per block. Don't: coloured or gradient buttons, square corners, shadows.

**Hero** (`.hero`). Wide: text left (1.15fr), picture right (0.85fr), gap 96px, padding 64px / 136px.
Behind it one aura: the ring gradient, `blur(110px)`, opacity .12, turning in 80s. Right side is a
4:5 photo, radius 28, 1.5px line border, with a 46px orb in the corner and "what you say" plus a green done-chip
under it. Phones: centred, the orb alone.
- Do: h1 max 17ch, one lede, then the card. Don't: stock gradients, more than one aura.

**Waitlist / sign-in card** (`.entry`). Max 440px, radius 28, 1.5px line border, fill
`rgba(233,236,244,.035)`. Two tabs in a pill track; the active tab gets a ring border. Email input: pill, 1.5px
line border, transparent, padding 14px 18px. Button: solid pill. Small print 0.85rem muted. Success: green chip
text `#b7f0d2`; error `#fca5a5`.
- Don't: labels floating over the field, or a coloured submit.

**Feature group** (`.group`). A 44px icon tile (radius 13, `--glass` fill, 1px line) with a small living
animation that only runs on hover, then h3, then a 1rem muted paragraph. Bullets in lists are tiny ring dots.

**Pricing card** (`.price`). Padding 28px 26px, radius 18, 1px line border, rows on a subgrid so names,
prices and buttons line up across cards. Order: 32px violet line icon, name (h3), tagline, price (2.2rem + "a month"),
usage badge (cyan pill), full-width solid button, "No commitment", "Everything in X, plus:", muted list with
9px dots. Featured card `.featured`: 1.5px ring border, violet glow, violet dots. Contact card: dashed border.
Month/year switch: one pill track, active segment filled `--line`, saving in violet 0.78rem.
- Do: at most one featured card. Don't: "most popular" ribbons, strike-through prices.

**Big call card** (`.call-card`): centred, padding 56px 32px, radius 28, ring border, glow, a small aura.

**FAQ** (`.questions`): `details` with a bottom line, 26px padding, summary 700 1.12rem, a muted "+" that turns 45deg.

**Footer**. 1.5px top line, padding 56px 0 72px, muted 0.95rem, one wrapping flex row:
copyright, EU pill, language select, links. Under it two rows of 0.85rem links (guides, all languages).

**Language switch** (`.language-choice`): a native `<select>`, transparent, 1px line border, pill, padding
6px 12px (header: 0.9rem, muted, 5px 10px, hidden under 640px). Plus a plain link row of every language in the footer.

**Focus**: 3px `--cyan` outline, offset 3px, on every interactive element. Respect `prefers-reduced-motion`
(stop the ring, aura and icon animations).

## Logo

The mark is drawn in CSS (`.orb`): a glass circle with the turning ring and a dark heart, plus the wordmark
"iris" in lowercase. The site also ships a favicon (a ring on `#14172A`, gradient cyan, blue, magenta), an icon set and a 1200x630 share image.

## Imagery

- Photos are generated: photorealistic, candid, 35mm, warm evening light with a soft cyan and
  violet glow, muted colours that sit on night blue. Ordinary people, no text, no logos, screens dark or showing only the ring.
- Never pair a generated person with a name, quote or review.
- Portrait 4:5 (hero, band, "in charge") or 4:3 (use-case cards); radius 18 (28 for the big ones); max height 470px.
- WebP in two sizes (`-480`, `-960`). Screenshots: 1px line border, radius 14, demo content only.
- Demos of the product are drawn in HTML on a stage panel (radial night gradient, radius 22), not faked screenshots.

## Copy

- English is the source; every other language is generated from it.
- Short sentences. Say what Iris does, in everyday examples: "Move my dentist appointment to Friday."
- Sentence case. No em dashes, no emoji, no exclamation marks.
- Call it Iris (the product). Real numbers only (spots left, real prices), no fake urgency.
