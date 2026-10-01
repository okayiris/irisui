# Colour

Iris is a calm ground, near-black or soft near-white as the system is, frosted glass and one ice-blue accent. Colour carries meaning here, it is never decoration.

## The palette

Fourteen tokens hold every colour on every surface, each with a dark and a light value. A value that is not on this table is not a colour in this system. Read the token by name, never type a hex.

| Token | Dark | Light | What it is for |
| --- | --- | --- | --- |
| --bg | #07090c | #f4f7f9 | Page background of every surface. Never grey, never white. |
| --fg | #e8f2f7 | #0d1a22 | Titles and primary text on --bg. |
| --dim | #8fa3b0 | #4a5c68 | The line under a title, secondary text. |
| --faint | #5a6b78 | #8696a1 | Chevrons, section labels, version line. Not for body text. |
| --line | #1b2430 | #dde4ea | Dividers. |
| --accent | #7dd3fc | #0369a1 | Ice blue: what is active, a tab, a link, an action pill. |
| --accent-ink | #07171f | #ffffff | Text on an accent fill. |
| --violet | #8b5cf6 | #6d28d9 | Only for on (toggles) and the ring. |
| --violet-light | #a78bfa | #7c3aed | Hover and edges of violet things. |
| --error | #f87171 | #b91c1c | Destructive only, such as Delete account. |
| --ok | #4ade80 | #15803d | Done. |
| --wait | #fde68a | #a16207 | Waiting. |
| --glass | rgba(180, 225, 255, .07) | rgba(255, 255, 255, .78) | Fill of every card. |
| --edge | rgba(190, 230, 255, .14) | rgba(16, 48, 72, .13) | The 1px stroke of every card. |

- `----bg`
- `----fg`
- `----dim`
- `----faint`
- `----line`
- `----accent`
- `----accent-ink`
- `----violet`
- `----violet-light`
- `----error`
- `----ok`
- `----wait`
- `----glass`
- `----edge`

> rule: Iris is light or dark as the system is; data-mode="light" or "dark" on <html> overrides it. The page background is --bg: #07090c in dark, the soft near-white #f4f7f9 in light. It is never grey and never pure white.

## Fifteen topics, one accent per screen

A screen she builds for someone carries one subject, and the subject brings an accent of its own. Fifteen topics exist. Each has three tokens.

- --topic-<name> is the accent and the pen colour, and is --k in code. It colours the widget label, the ring, the anchor, the pen mark and the page dot. It may be text.
- --topic-<name>-2 is the second tint, --k2 for pattern shapes and the far end of a duotone. Decoration only, never text on its own.
- --topic-<name>-ground is the dark ground, --kd: a widget fill, a pattern ground, a Word ground. --fg, --dim and the accent read on it.

| Topic | Accent --topic-* | Second tint | Ground | Light: accent, tint, ground |
| --- | --- | --- | --- | --- |
| groceries | #4ade80 | #38bdf8 | #04241f | #15803d #0369a1 #eef9f2 |
| agenda | #7dd3fc | #e8f2f7 | #08183a | #0369a1 #334155 #eaf4fa |
| mail | #94a3b8 | #cbd5e1 | #121821 | #475569 #556274 #f3f5f8 |
| parcel | #fbbf24 | #fde68a | #221a0e | #a14a07 #92600a #fdf6ea |
| weather | #38bdf8 | #e8f2f7 | #081a34 | #075985 #334155 #e9f2f9 |
| tasks | #2dd4bf | #99f6e4 | #05211f | #0f766e #115e59 #e8f7f5 |
| sport | #fb923c | #fdba74 | #26140a | #b93c0b #9a3412 #fdf1ea |
| money | #a7f3d0 | #4ade80 | #062016 | #047857 #166534 #ecf8f2 |
| travel | #2ee6d6 | #7dd3fc | #052331 | #0e7490 #0369a1 #ebf7f9 |
| health | #2ee6d6 | #7dd3fc | #052331 | #0e7490 #0369a1 #ebf7f9 |
| home | #fde68a | #fbbf24 | #1f1a0e | #8a5a1c #8a5a0a #faf4ea |
| music | #c4b5fd | #8b5cf6 | #161433 | #6d28d9 #7c3aed #f3effc |
| loop | #7dd3fc | #4ade80 | #08183a | #0369a1 #166534 #eaf4fa |
| explain | #ede98a | #fef9c3 | #1c1b08 | #65651a #4d4d12 #f8f7e4 |
| party | #fdab9f | #fed7cf | #2a1210 | #a83d62 #9d3a5c #fdf0f4 |

> rule: One accent per topic. A widget, its chips, bars, ring, ticks, fields and its primary button all take that one colour. The page itself stays ice. Never two topics on one screen.

> warn: health and travel share their values down to every token. Never put both on one screen, because nothing would tell them apart.

> llm: Set --k to the topic accent and --kd to its ground. Do not sample a colour out of a photo, do not mix two topics, and do not invent a tint that is not in the topic's three tokens.

## The loop phases

A loop runs through six phases, and a PhaseRing shows them. Phase colour is fixed: it says where in the loop the person is, not what the loop is about.

| Phase token | Dark | Light | When |
| --- | --- | --- | --- |
| phase-recognised | #a78bfa | #6d28d9 | The loop has seen the thing. |
| phase-planned | #7dd3fc | #0369a1 | It is on the plan. |
| phase-busy | #2ee6d6 | #0f766e | Work is running. |
| phase-you | #f0abfc | #a21caf | The turn is with the person. |
| phase-check | #fbbf24 | #b45309 | It is being checked. |
| phase-done | #4ade80 | #15803d | It is finished. |

Three more tokens hold the ring itself: --phase-track #1e2a3a and --phase-rest #2a323d for the inactive parts, and --phase-grain #e0f2fe for the grain inside a segment.

> rule: Phase colours are fixed and do not follow the topic. A finished phase stays full in its own colour, the current one runs as an hourglass, and done lights the whole ring.

## What may never be a colour

- A grey page. Every page is --bg.
- A fixed dark or light value where a token exists. The page follows the mode; a part that keeps its dark colours on a light page is an island.
- A brand gradient used as a UI accent: not a button fill, not a header, not a bar.
- A second accent next to ice blue on one surface.
- Red for anything that is not destructive.
- Violet outside two places: a toggle that is on, and the ring.
- Colour as decoration. In an app colour carries state: a lamp that is on is a warm fill, energy made is green, a battery under 20% is amber, a late invoice is red. What is off or neutral stays glass.

> warn: The ring's conic gradient (violet, sky, magenta, from --orb-gradient) belongs to the orb and the talk button. Never the fill of a button, a header or a chart.

## Contrast floors

Two floors hold everywhere, on every surface, in every theme, and the house adds one more for a topic accent. They do not move for a prettier colour. The two floors are WCAG's: 4.5:1 for text (1.4.3) and 3:1 for large text and graphics (1.4.11).

| Pair | Floor | Where it applies |
| --- | --- | --- |
| Body and small text on its background | 4.5:1 | --fg, --dim and every topic accent as text |
| Large text and graphics | 3:1 | Icons, strokes, the ring, a chart line |
| A topic accent on its own ground, and on the page background | 6:1 | in dark every one of the fifteen accents clears it: the closest sits at 6.48:1 on its ground. In light they hold 4.5:1 (the closest, groceries, 4.65:1 on the page), short of 6:1: still open |

> rule: Body text is 4.5:1 or better. Large text and graphics are 3:1 or better. A graphic that carries meaning is a graphic, not decoration, and the 3:1 floor applies. The house asks more of a topic accent: 6:1 on its own ground and on the page, because an accent carries a whole subject.

> warn: --faint is #5a6b78 in dark (3.5:1 on --bg) and #8696a1 in light (2.8:1). It is not for body text, not for a value the person must read, and never for a label that explains what the person is looking at.

One part lifts itself: a Word lightens its letters until they hold 4.5:1 on their ground, so a deep theme stop never sinks into the background. On a light page the drawing is turned over (lightness inverted, hue kept), so the same letters read dark.

## What Iris does instead

Iris does not generate colour from a source, does not build tonal palettes on tones 0 to 100, and maps no tones onto roles. It does none of that, on purpose.

- Fifteen fixed topics, hand-picked. No dynamic colour from a wallpaper or a photo
- No palette. One value per token
- Fourteen base tokens plus 15 topics
- Three numbers, checked by hand on every pair
- Two modes, light and dark, one value of each token per mode, following the system

> llm: There are no colour roles here. Do not map primary, surface, container or on-primary onto Iris, and do not generate a tonal palette. Pick a token by name, or say that the colour does not exist yet.
