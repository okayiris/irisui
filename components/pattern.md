# Pattern

A moving fill behind a card, a header band or a screen strip, in the topic's two tints.

Group: Screen parts. Export: `window.IrisUi.Pattern`.

## Props

| prop | type | required |
| --- | --- | --- |
| `kind` | `'lanes' | 'grid' | 'bubbles' | 'band' | 'rain' | 'drift'` | no |
| `topic` | `TopicName` | no |
| `colors` | `[string, string]` | no |
| `height` | `number` | no |
| `children` | `ReactNode` | no |
| `recipe` | `{ layout: 'lanes' | 'grid' | 'lanes-round' | 'bubbles' | 'rain' | 'keys' | 'band' | 'scan' | 'drift' | 'eq' | 'spiral' | 'swarm' | 'wave'; shapes?: ('circle' | 'ring' | 'capsule' | 'triangle' | 'plus' | 'half' | 'square' | 'arc' | 'dot')[]; background?: string; palette?: string[]; density?: number; scale?: number; speed?: number; pop?: number; fill?: number; rotate?: number; depth?: number; variation?: number; confetti?: number; camera?: { from: number[]; to: number[] } }` | no |

## Guidelines

- Do: One pattern per screen, and count it as 2.
- Don't: Never a pattern with a Word hero.
- Do: Keep text on the frosted panel.
- Don't: Never put a pattern under text that must be read.
- Do: Use --k2 for shapes only.
- Don't: Never let a shape be the only signal of anything.
- Do: Both motors run on the 125 bpm beat; still is one calm frame.

## Specs

- kinds: `lanes, grid, bubbles, band, rain, drift`
- recipe layouts: `lanes, grid, lanes-round, bubbles, rain, keys, band, scan, drift, eq, spiral, swarm, wave (13 of them)`
- recipe fields: `layout, shapes, background, palette, density, pop, fill, confetti`
- recipe box: `16:9, clamped on the way in (Pattern.recipe), ranges in systems.md`
- shape opacity: `about 30%`
- ground: `the topic's --kd`
- busy cost: `2`

## Accessibility

- Children sit on a frosted panel, so no text lies on the moving shapes.
- Reduced motion: still shows one calm frame, never a half animation.
- The pattern is decoration: the label, the word or the number still says what the screen is about.

## The system's own words

# Pattern

A moving pattern fill in the topic's two tints on its dark ground: behind a card, a header band or a screen strip, the same motor as `Widget look="pattern"`.

Two motors. `kind`: `lanes`, `grid`, `bubbles`, `band`, `rain`, `drift`, the widget motor, shapes at about 30% opacity. `recipe`: the full PatternsLab motor with all 13 layouts (`lanes`, `grid`, `lanes-round`, `bubbles`, `rain`, `keys`, `band`, `scan`, `drift`, `eq`, `spiral`, `swarm`, `wave`), 9 shapes, camera, depth and confetti on the big beat, in a 16:9 box; the recipe is clamped on the way in (`Pattern.recipe`), fields and ranges in `systems.md`. Both run on the 125 bpm beat; still = one calm frame.

Consumer provides: `kind`, `topic` (or `colors` [k, k2]) and `height`, or a `recipe`; and optional children, which sit on a frosted panel so text never lies on the pattern itself. Busy cost 2: one pattern per screen, never together with a Word hero.

