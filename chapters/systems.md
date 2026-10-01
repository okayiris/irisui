# Generative systems

Nine systems make the moving and personal parts of Iris. Each works the same way: the framework draws, a recipe (a small JSON) says what. Every value in a recipe is clamped on the way in: an unknown value gets a safe default and never breaks the drawing. How an AI writes these recipes: `generative.md`. The screen rules they all obey: `screens.md`.

Common to all nine:
- **One clock.** Everything that moves runs on the house beat, 125 bpm (a beat is 0.48 s); pops land on the beat, big moments every 16 beats.
- **Still means the end state.** With `prefers-reduced-motion`, in a screenshot or a thumbnail, each system draws its final pose once: a pen fully drawn, a pattern frozen at a calm moment, a word in its last frame.
- **Grounds stay near-black, colour stays bright.** A ground is darkened until its luminance is at most 0.09; palette colours are lightened until at least 0.32; text is lifted to 4.5:1 on its ground.

## 1. Patterns

A world of flat, rounded shapes on the beat (the trip videos' style), behind a widget, a card or a whole screen. Code: `patterns.html`, in the kit as `Pattern recipe={...}` (all 13 layouts, the same motor) and `Pattern kind` / `Widget look="pattern"` (the 6 widget layouts).

| Field | Range | Note |
|---|---|---|
| `layout` | `lanes` `grid` `lanes-round` `bubbles` `rain` `keys` `band` `scan` `drift` `eq` `spiral` `swarm` `wave` | the layout; widgets use `lanes` `grid` `bubbles` `band` `rain` `drift` |
| `shapes` | 1 to 3 of `circle` `ring` `capsule` `triangle` `plus` `half` `square` `arc` `dot` | max 4 kept |
| `background` | hex, dark and saturated | darkened to luminance 0.09 |
| `palette` | 3 to 4 hex | lightened to luminance 0.32; max 5 kept |
| `density` `scale` `speed` `pop` `fill` `rotate` `depth` `variation` `confetti` | 0..1 | defaults .5 .5 .5 .5 .6 .3 .5 .5 .2 |
| `camera.from`, `camera.to` | `[x, y, zoom, rotate]` | x, y -140..140, zoom .9..1.25, rotate -6..6 degrees |

- Rules: one clear idea per pattern; density mostly .3 to .6; rhythm you feel, never hectic. In a widget: opacity about .3, the topic's two tints only, costs 2 of the busy budget.
- Good: `{"layout":"lanes","shapes":["capsule"],"background":"#04241f","palette":["#4ade80","#38bdf8","#a7f3d0"],"density":0.4,"pop":0.5,"fill":0.8,"confetti":0}` for groceries.
- Never: gradients, text or a central orb in the pattern; more than one pattern per screen; a pattern behind body text without a panel.

## 2. Words

One big word with an effect, on the beat. Code: `wordlab.html` (17 effects), all of them in the kit as `Word` (14 effects) and `ThemeWord` (3 themes).

| Field | Range |
|---|---|
| `effect` | `gradient` `pop` `wave` `shine` `neon` `echo` `fill` `split` `lanes` `tiles` `stretch` `outline` `long-shadow` `stamp`, themes `frozen` `fire` `autumn` |
| `edge` | `none` `thin` `glow` `corners` (the lab also has `ants` `double` `rotate` `thick` `drawn`) |
| `palette` | one of 14 named pairs with a ground, e.g. `green and blue` #4ade80 / #38bdf8 on #04241f |
| `letter`, `weight` | `sans` `mono` `serif` `round`; 600 to 900 |
| `uppercase`, `spacing` | boolean; letter spacing -0.03..0.18 em |
| `background` | `flat` `radial` `dots` |
| `rhythm`, `level`, `tempo`, `phase` | .3..1, .5..0.85, .75..1.25, 0..16 beats |

- Busy budget of the lab: 4 (effect 1 to 3, border 0 to 2, background 0 to 2); on a screen a Word costs 3 of 5.
- Rules (critic rounds 1 and 2): less is more. At most one decoration beside the effect: a pattern background never with a loud border. Serif only with calm effects (gradient, shine, neon) in lower case at 500 to 600. Mono: capitals with spacing, never stretch or stamp. Words over 8 letters never tiles, outline or mono; echo and long shadow only sans capitals up to 8 letters; lanes only short and 900. Split only with neighbouring tints. Themes always sans 900, lower case, no border, plain ground. Weighted choice: gradient 5, pop, neon, wave, shine 3, the heavy ones 1.
- Good: `{"effect":"pop","palette":"pink and violet","letter":"sans","weight":800,"uppercase":false}` for "Done".
- Never: two effects on one word; a Word and a pattern hero on one screen; letters under 4.5:1 (the guard lifts them).

## 3. Widgets

A tile that shows one answer. Component `Widget`; lab `widget.html` (4 looks x 4 sizes x 12 topics), the whole lab as the `WidgetGallery`, `WidgetData` and `WidgetScreens` previews.

- Recipe: `{topic, look: glass|pattern|ring|list, size: small|wide|tall|large, label, value, unit, items, done, progress 0..1, pattern, note, bleed}`. Content comes from the house; the look and size are the recipe.
- Rules: one widget, one answer; the hero IS the answer (ring = progress, list = list). Done items fold into one line. The note is the screen's one Anchor. `bleed` on at most one screen in three. Costs: glass and list 0, ring 1, pattern 2.
- Good: `{"topic":"tasks","look":"ring","size":"tall","label":"To do","value":"3","unit":"to go","progress":0.4,"done":2}`.
- Never: an emoji in the label; two notes; a ring that does not mean progress; text on a pattern without the frosted panel.

## 4. Marks (pen)

Hand-drawn marks with pen pressure on one piece of text. Component `Pen`; lab `annotations.html`.

| Field | Range |
|---|---|
| `kind` | `circle` `check` `strike` `underline` `mark` `arrow` `bracket` `box` `spotlight` `pulse` `star` `number` |
| `look` | `pen` `clean` `neon` `marker` |
| `smoothness` | 0 (shaky) .. 1 (clean), default .45 |
| `open`, `tilt` | 0..0.22, default .14; tilt in degrees, default -4 |
| `loop`, `speed`, `color`, `seed` | loop turns about 1.1; draw time in ms 160 to 700; the topic's pen colour; seed for the same hand again |

- Rules: one mark per screen, never over a label; strike only in tick lists; a marker lies on the baseline. Costs: clean 0, pen and marker 1, neon 2; over budget the pen turns clean. When the assistant explains, marks come one step at a time on its words ("You get fruit and vegetables in one go": a bracket over those two rows).
- Good: `{"kind":"circle","look":"pen","smoothness":0.45,"open":0.14,"tilt":-4,"speed":650}`.
- Never: a closed perfect circle in pen style; two marks; a mark over the anchor.

## 5. Buttons

Lab `buttonslab.html` explores 200 recipes; on screens the golden key fixes the outcome.

- Lab recipe: `palette` (pairs such as ice and violet), `shape` pill 999 | round 14 | soft 10 | clean 6 | angular 2 px, `fill` flat | gradient | glass | outlined | soft | neon, `secondary` soft | outlined | grey, `size` S | M | L, `letter`, `shadow` none | soft | 3d | glow, `reaction` press | spring | shine | pulse, `back` dark | card | dots | tint.
- Lab rules: gradient and neon only on primary; secondary and danger always calmer; glow only on dark; no 3D on glass, outline, neon or soft; neon never with glow.
- On a screen (fixed): primary flat at oklch .82 / .12 of the topic with dark ink, secondary glass, one primary per screen; see `ButtonGroup`.
- Never: a gradient or neon primary on a screen; two primaries.

## 6. Photos and depth

Photos with a depth map (Depth Pro on the GPU box). Lab `photolab.src.html`; in the screen builder `photo-back` and `duotone`.

- Recipe: `{photo, kind: back|duotone|parallax|filter|layers, threshold 0.05..0.9 (where the foreground starts), fy (vertical focus), word, colors [k, k2], filter: duotone|trip-flat|retro dither|hueShift|light on person}`.
- Rules: text behind a person stays at least 65% visible and whole inside the photo (the builder searches height, offset and size to hit about 25% hidden). Duotone uses the topic's ground and accent. Parallax moves at most 6% of the width, softly with scroll. Costs: text behind a person 3, duotone 2.
- Never: real user photos in demos (demo photos are Big Sur and coast); a photo hero plus a Word; text fully hidden.

## 7. Rings (shaders)

The light ring round her ball. `index.html` is the framework (WebGL2, bloom, tone map on brightness, grain, glass ball, the voice as textures); an AI writes one GLSL function and sets the knobs. Too heavy for a preview here: the recipe is below, the live lab is `index.html`.

- Recipe: `{"name", "idea", "sentence", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {...}", "look": {"size" .85..1.3, "glow" 0..2, "lighting" .6..2, "grain" 0..1, "chroma" 0..1, "hueShift" 0..1, "saturation" 0..1.5, "sphere": "glass"|"matte"|"pearl"}}`.
- Given to the GLSL: `t level tone pulse px`, `BALL` 44, `R0` 54, `polar round band spec wave noiseRound iris glow line obliqueRing project fbm noise rot`.
- Taste: light as material, no objects; at most two elements; ice blue and cyan as base, violet and magenta at most about 20%; lines taper with a hot core; max 3 to 5 lobes, motion under 0.3 Hz; light between radius 50 and 80; the seam at `q.y` = 0 must join (only periodic functions of `q.y`).
- Inspection (every new ring, 128 px, fake voice, before anyone sees it): at most 42% of the band lit, at least 5%; no seam; centre of light within 22 units; in silence at least 20% of the talking light; talking differs from silence by at least 25%. It fails: the reason goes back to the AI, which repairs it (max 2 times); still failing, it is thrown out.
- Never: flicker, blocks or grain as noise; `texture()`; loops over about 48 steps; filled planes above 1.0.

## 8. The loop screen

One loop in detail: `LoopScreen` (see `screens.md`). Recipe: `{title, when, sub, phase recognised..done, progress 0..1, now, center none|glass|pattern|word, pen}`. Phase colours are fixed; the current phase is an hourglass with the sand at the end of its segment; done lights the whole ring and throws confetti once. The middle counts in the budget: glass 0, pattern 2, word 3 (then no pen).

## 9. Screens

The screen builder turns content and a recipe into a phone screen, from the screen builder preview and the screen kit.

- Content `D`: `clock` (top line with HH:MM), `title`, `word`, `value`, `unit`, `items` [[left, right, extra?]], `done` (done count), `emphasis` (index), `iris` (her sentence, starts with the name and a comma), `buttons` [primary, secondary], `progress` 0..1.
- Recipe `R`: `topic`; `hero.kind` one of `typo` `phaseRing` `timeline` `route` `bars` `duotone` `photo-back` `word` `pattern` `ring` `pictures` `document`, each with its own fields, plus `height`, `note` [text, x, y], `break` edge | overflow; `block` list | pair | strip | none; `hint` {kind, look} or null; `buttons` (always flat accent plus glass).
- Costs: hero word 3, photo-back 3, duotone, pattern, phaseRing, document, route, typo, bars 2, ring, pictures, timeline 1; pen 0 to 2; confetti 1. Budget 5.
- The renderer does the rest: the hero grows to fill the space (route, photo and word with route up to 300 px), a list row drops if it still does not fit, buttons always at the bottom, the header always at the same height.
