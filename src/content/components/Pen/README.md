# Pen

A hand-drawn mark on one piece of text, drawn in with pen pressure: thick where the hand presses, thin at both ends.

Kinds: `circle`, `check`, `strike`, `underline`, `mark` (highlighter on the baseline), `arrow`, `bracket`, `box`, `spotlight` (dims the rest of the card), `pulse` (rings widening from the start), `star`, `number` (`n`).

Looks: `pen` (default, busy 1), `clean` (busy 0), `neon` (busy 2), `marker` (busy 1). Settings: `smoothness` 0..1 (default .45: by hand, flowing, just not neat), `open` (default .14: how far the end of a loop lands beside its start), `tilt` in degrees (default -4). `clean` sets open and tilt to 0.

Colour: the topic's `--k`. Consumer provides the text as children; the mark sits in an absolutely positioned SVG over it. `spotlight` needs a parent with `overflow: hidden` (a card), or it dims the whole page.

Rules: one pen mark per screen (a second one is drawn plain and warns). The Anchor does not count. Never over a label. Strike only in tick lists. A screen over the busy budget (5) gets the clean look.
