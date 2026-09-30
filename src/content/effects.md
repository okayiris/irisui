# Light and marks: neon, LED edges, pointing

How Iris draws attention: a light running along an edge, a neon line, a finger that points, a loop drawn round
something, a pen mark on a word. Every value below is read from the code named in brackets. The `Effects`
preview shows all of them moving.

## Three lights, three meanings

| Light | Colours | Means | Where |
|---|---|---|---|
| **Her neon** | violet `#8B5CF6`, blue `#3B82F6`, magenta `#C026D3` (the ring's colours), glow violet | "she is doing this, look here" | refresh line, a waiting question, the loop round what she points at, the tour |
| **Ice neon** | `--accent` `#7dd3fc`, teal `#2EE6D6` | "this is on, you are here" | active tab, Mac bar buttons, her thinking arc |
| **Topic pen** | the topic's `--k` | "this, in this answer" | `Pen` marks and the `Word` neon effect on a screen she built |

A glow is always the colour itself, never black: `shadow(color: c.opacity(.9))`, `drop-shadow(0 0 6px c)`.
Black shadows are only for things that float (the white tip label, the finger).

## The edge: her LEDs (the app's edge drawing)

A light pattern running along an edge: the phone's rounded screen edge, a strip's border, the ring round the orb.
The assistant picks one per moment; the apps get the whole set at once.

| Moment | Edge | Default |
|---|---|---|
| `refresh` | the phone's rounded screen edge while her screens reload | comet |
| `thinking` | a ring round the orb (70/60 of the disc) | comet |
| `listening` | round her orb | comet |
| `question` | the border of the strip with a waiting question | the rotating neon border (below) |

`null` for a moment puts the default back.

**Patterns** (colours: 1 to 4, start, middle, end)

| Pattern | What it does |
|---|---|
| `comet` | a head with a tail from the top middle both ways, one pair per colour (tail .09 of the edge) |
| `breathe` | the whole edge swells in and out, glow 0 to 14 |
| `orbit` | 14 segments chasing round, the first 3 in the second colour |
| `sparks` | 28 dots twinkling along the edge |
| `wave` | 4 crests of thickness running round, the crest in the second colour |
| `flow` | the colours flowing round like a band |
| `heartbeat` | two beats running out from the top |
| `zip` | fills from the top both ways, then empties |

**Moods** (their own colours when she gives none)

| Mood | Colours | Feel |
|---|---|---|
| `aurora` | `#22D3EE` `#34D399` `#A78BFA` | slow curtains, breathing wider and narrower |
| `fire` | `#FDE047` `#F97316` `#DC2626` | flickering tongues, embers where it is low |
| `ocean` | `#1E3A8A` `#06B6D4` `#E0F2FE` | two swells rolling round, foam on the crests |
| `forest` | `#14532D` `#22C55E` `#BEF264` | deep green, four sunbeams moving through |
| `mist` | `#94A3B8` `#CBD5E1` `#64748B` | wide soft veils drifting |
| `storm` | `#312E81` `#6366F1` `#F8FAFC` | a dark moving sky, now and then lightning |
| `stars` | `#FFFFFF` `#93C5FD` `#FDE68A` | 34 small stars twinkling in place |
| `lake` | `#0E7490` `#38BDF8` `#A7F3D0` | slow low ripples and a few glints |
| `meteors` | `#FFFFFF` `#FDBA74` `#A855F7` | now and then a head with a long tail |
| `rain` | `#93C5FD` `#60A5FA` `#1D4ED8` | streaks running down both sides |
| `party` | `#F43F5E` `#FACC15` `#22D3EE` | a fast colour chase on a beat |

**Settings**: `round` seconds per round, .3 to 6 (default 1.3); `speed` .25 to 4; `brightness` .1 to 1.
**Drawing**: the edge starts at the top middle (position .5) and meets at the bottom middle; line 3pt (2pt on a
strip or the orb), round caps, glow radius 6 (up to 18 for lightning). `comet`, `orbit` and `heartbeat` lay a
faint base line under them (18%).
**The page dots join in**: while the screens refresh, the dots on the right light up one after another in the
edge's colours (a chase), or all together when the pattern is `breathe`.
**Reduced motion**: the edge draws one still frame, a third into its round.

## Her neon lines

- **Refresh, on the web**: no spinner, one line 2px high, 16px in from the sides, just
  under the safe area. Gradient `#8B5CF6 → #3B82F6 → #C026D3 → #8B5CF6` at 200% width, glow
  `0 0 8px rgba(139,92,246,.8), 0 0 2px rgba(192,38,211,.9)`. It grows from the middle with your finger
  (`--refresh` 0 to 1) and runs (1s per loop) while the screens reload. In the app the phone draws its LED edge instead.
- **A waiting question**: the strip loses its `--edge` and gets a 2pt border in the ring's colours as
  an angular gradient turning 90 degrees a second, glow violet .6 radius 10. Her own `question` pattern wins.
- **Tour**: a 2px ring round the thing being explained, radius 16,
  `0 0 0 2px rgba(139,92,246,.9), 0 0 24px 4px rgba(139,92,246,.45)`, pulsing to cyan `#22D3EE` every 2.2s,
  gliding .35s to the next thing.

## Ice neon: on and here

- **Active tab** (the tab bar): icon and label `--accent`, the icon glows `accent .75`, radius 9. Off: `fg` at 55%.
- **Mac bar button** (`MacPill BarButton`): 36x36 circle, icon 14pt. Hover: icon `#2EE6D6`, fill `#2EE6D6` 16%.
  On: plus a stroke `#2EE6D6` 60% and a glow 35% radius 6. The tip appears above it in a white cloud
  (11pt, `#0B0F13`, radius 6) in .12s, faster than the macOS tooltip.
- **Steps chip** (`StepsLine`): mono caps 9pt, tracking 1.4; hover turns text and stroke `#2EE6D6` (70%) with a
  16% fill.
- **Thinking**: her `thinking` edge pattern round the orb (the comet by default); the web orb uses a teal arc
  (`#2ee6d6`, conic, .69s a turn).

## Pointing: the finger on the phone

The assistant can show you where something is on one of its screens.

| Action | What you see |
|---|---|
| `point` | the finger glides to it and rests |
| `tap` | the finger glides there, presses (scale .72, 170ms) and taps it |
| `circle` | the finger glides there, then she circles it by hand |
| `type` | the finger taps the field and types, 55ms a letter |
| `scroll` | scrolls it into view (or by `dy` screens) |
| `page` | goes to screen `n` |
| `glow` | light over the letters of `target` (or the screen's title), below |

**Where**: `target` = words on it (the smallest element whose text contains them), or `x`, `y` as 0 to 1 of the
screen. `screen` = which of her screens, else the one in view.

**The finger**: a 40px white touch, fill white 38%, rim 1.5px white 75%, shadow `0 1px 6px rgba(0,0,0,.35)`,
like the simulator's pointer. It glides in .45s `cubic-bezier(.22,.8,.24,1)`, the page first scrolls the thing to
the middle, and it fades 2.6s after its last move.

**The loop** (`circle`): drawn round the whole thing the words belong to (the button, tile, row or card), not the
word. A squircle (superellipse, n = 4), so a wide row gets a pill and not a thin oval through its corners. Room
around it 8 to 18px (18% of its height), tighter near the screen's edge so the glow stays on screen. One stroke
that runs 1.09 turns (a hand never closes exactly), slightly wobbling, 3.4px, with a softer second pass behind it
(2px, 35%). Gradient violet `#8b5cf6` → cyan `#22d3ee` → magenta `#c026d3`, glow
`drop-shadow(0 0 6px rgba(139,92,246,.85)) drop-shadow(0 0 2px rgba(34,211,238,.9))`. Drawn in .95s
`cubic-bezier(.3,.7,.3,1)`, stays 3.4s, gone at 4s.

**The glow** (`glow`): a band in her neon (`#8b5cf6 #22d3ee #c026d3`, or up to 4 `colors` she sends) sweeps through
the letters twice (1.4s each, ease-in-out) with a soft glow in its first colour (`drop-shadow(0 0 6px`, 60%), then
the text is exactly as it was. On a refresh the screen's title gets it, together with the edge. Reduced motion:
only the glow, 1.2s.

## Marks on a screen the assistant built (`Pen`)

A hand-drawn mark on one word or number of a screen (when she explains: one step at a time, on her words), in the topic's `--k`. Pick the kind by what you mean:

| You mean | Kind |
|---|---|
| this one (the answer, the time) | `circle` |
| done | `check` |
| no longer (only in tick lists) | `strike` |
| this matters | `underline`, or `mark` (highlighter on the baseline) |
| look here | `arrow` |
| these belong together | `bracket` |
| only this (dims the rest of the card) | `spotlight` |
| new, changed | `pulse` |
| the favourite | `star` |
| step n | `number` |

The recipe (look, smoothness, open, tilt, speed) and its ranges: `systems.md`, 4. Marks. The neon look is a 2.2
stroke, a little rough, pressure .3, with `drop-shadow(0 0 3px k) drop-shadow(0 0 8px k)` in the topic colour, and
costs 2 of the busy budget (pen and marker 1, clean 0). Drawn in along its middle: 520ms scaled by length (x .35
to 1.4), 250ms after it appears, strokes one after another.

`Word` has a `neon` effect too: the letters as a 4px stroke with a 22px glow in the topic colour, a thin white
core (1.4px, 82%) on top. It costs 3 of the screen's 5.

## Do and don't

| Do | Don't |
|---|---|
| One light at a time on a screen: an edge pattern, or a loop, or a pen mark | A pen mark, a loop and a moving edge at once |
| Her neon (violet, blue, magenta) for what she does; ice or teal for "on" and "here" | Her neon on a button or a toggle; a neon or gradient button (`screens.md` rule 5) |
| A glow in the light's own colour | A black glow, a grey drop shadow as "neon" |
| A line or an edge instead of a spinner | A spinning icon while her screens reload |
| Circle the whole thing the words belong to | A thin oval through the corners of a wide row |
| Reduced motion: the end state (pen drawn, Word in its last pose, edge still) | A half-drawn mark in a screenshot |
| Say what she points at in words too | Light as the only way the meaning comes across |
