# Effects

Drawing attention: her LED edges, a neon line, a waiting question, the tour ring, pointing, pen marks.

Group: Showcases. Export: `window.IrisUi.Effects`.

## Guidelines

- Do: One accent of attention at a time: the ring already says she talks, so no second effect then.
- Do: Violet is only for on (toggles) and the ring.
- Don't: Never red: red means destructive only.
- Do: Turn the motion off under prefers-reduced-motion: the preview sets animation none and holds a still frame.

## Specs

- LED box: `150 x 96, radius 22, drawn at 2x; stroke 5, glow 6, up to 18 for lightning`
- Refresh line: `height 2px, gradient #8b5cf6 to #3b82f6 to #c026d3, grows in, then loops`
- Waiting question: `2px angular gradient border, turn 4s, glow radius 10`
- Tour: `ring 2px, radius 16, pulse 2.2s between violet and cyan`
- Ice neon: `#2ee6d6 icon on a 16% disc; active tab icon glows accent .75`
- Finger and loop: `finger 40px, two hand-drawn polylines 3.4px and 2px, gradient #8b5cf6 to #22d3ee to #c026d3`
- Motion tokens: `--motion-fast .14s, --motion-base .2s, --motion-slow .32s, all .001s under reduced motion`

## Accessibility

- An effect marks something that already exists in the DOM; it must add no focusable element of its own.
- Under prefers-reduced-motion the still frame must still show which thing is meant.
- A moving edge is never the only signal of state: give the state a word or an icon too.

## The system's own words

# Effects

How Iris draws attention, all moving on one page: the LED edge patterns, the neon refresh line, the rotating border of a waiting question, the tour ring, ice neon for on and here (Mac bar, active tab), the finger and the hand-drawn loop on the phone, and `Pen` marks in the neon look.

Values and rules: `effects.md`. The LED edges here are a JS port of the app's edge drawing; the loop is the same circle gesture as on the phone screen.

