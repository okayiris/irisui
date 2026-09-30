# Pattern

A moving pattern fill in the topic's two tints on its dark ground: behind a card, a header band or a screen strip, the same motor as `Widget look="pattern"`.

Two motors. `kind`: `lanes`, `grid`, `bubbles`, `band`, `rain`, `drift`, the widget motor, shapes at about 30% opacity. `recipe`: the full PatternsLab motor with all 13 layouts (`lanes`, `grid`, `lanes-round`, `bubbles`, `rain`, `keys`, `band`, `scan`, `drift`, `eq`, `spiral`, `swarm`, `wave`), 9 shapes, camera, depth and confetti on the big beat, in a 16:9 box; the recipe is clamped on the way in (`Pattern.recipe`), fields and ranges in `systems.md`. Both run on the 125 bpm beat; still = one calm frame.

Consumer provides: `kind`, `topic` (or `colors` [k, k2]) and `height`, or a `recipe`; and optional children, which sit on a frosted panel so text never lies on the pattern itself. Busy cost 2: one pattern per screen, never together with a Word hero.
