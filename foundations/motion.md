# Motion

Two durations the parts already used, three the system now names, one house curve, and her ring.

## What moves

Motion in Iris answers a hand or explains a change. Nothing moves to look busy.

- A control answers: hover changes the fill, press shrinks the part to 0.985.
- A surface arrives: a menu drops 4px, a dialog rises 10px, a sheet comes up from the bottom or in from the side.
- A value changes: the tab ink slides, a bar grows, a pen draws itself in.
- Her ring turns, always. It is the one thing that moves with no input at all.

Each of those is one transition on a named property. The shared answer, `.ix-hit`, changes background, border colour, transform, colour and opacity together, all at `--motion-fast` with the house curve.

```css
.ix-hit {
  transition: background var(--motion-fast) var(--ease-house),
    border-color var(--motion-fast) var(--ease-house),
    transform var(--motion-fast) var(--ease-house),
    color var(--motion-fast) var(--ease-house),
    opacity var(--motion-fast) var(--ease-house);
}
```

## What never moves

- The page background. It is `--bg` on every surface and never fades.
- Type. Text does not slide, bounce or fade in as a block.
- Layout. Hover and press never reflow a row or move a neighbour; the press shrinks the part in place.
- The header. It keeps the same height on every screen, so a screen never jumps when her sentence changes.
- Card fill at rest. Glass is `--glass` plus a 1px `--edge` stroke; it does not breathe.

> rule: Add motion only where something changed. If the answer is the same, the screen is still.

## Durations and the house curve

The parts already carried two durations of their own: .2s on background and transform, and .15s on opacity and on chip fills. `ext.css` names them and adds a third value plus one curve.

```css
--motion-fast: 0.14s;
--motion-base: 0.2s;
--motion-slow: 0.32s;
--ease-house: cubic-bezier(0.2, 0.9, 0.25, 1);
```

The curve is quick off the line and long to settle, and it never overshoots. It is the same shape the app previews use, `cubic-bezier(.2,.9,.25,1)`.

| Token | Value | Use |
| --- | --- | --- |
| `--motion-fast` | 0.14s | An answer under the hand: hover, press, colour |
| `--motion-base` | 0.2s | A surface that arrives: menu, dialog, snackbar |
| `--motion-slow` | 0.32s | A full panel: the sheet from the bottom or the side |
| `--ease-house` | cubic-bezier(0.2, 0.9, 0.25, 1) | Everything above, unless a part has its own |

> warn: Three values do not cover every animation in the system. A pen draws in over 520ms scaled by length, the tab bar folds over .42s, the ring turns for as long as it likes. Those are the part's own clock, not a token.

## The ring's own animation

The orb is the exception to every rule on this page: it never stops. The gradient ring turns one full turn in 6s, linear, forever.

| Her state | A turn | What else |
| --- | --- | --- |
| rest | 6s | nothing else |
| busy | 2s | the same ring, faster |
| talking | 3s | the disc answers the voice |
| thinking | 1.5s | the core pulses .7s, alternate |
| away | stopped | greyscale and 50% opacity |

Two more clocks sit on the talk button and are not part of `--motion-*`: the thinking arc is a teal conic ring at .69s a turn, and the echo ring runs 1.35s, growing from 1 to 1.35 and fading out.

> warn: The ring does not follow `--motion-*`. Under `prefers-reduced-motion` the bundle switches the ring's animation off, so it never stops in normal use only, and never at all in reduced motion or in the `away` state.

## Reduced motion is a hard rule

`prefers-reduced-motion` is not a preference to negotiate. When it is set, the system changes what it does.

- The three durations become 0.001s, so a change lands without a journey.
- The press scale goes: `.ix-hit:active` returns `transform: none`.
- The ring, the skeleton, the spinner and the thinking arc all stop.
- A still screen shows the end state: the pen fully drawn, the ring at its value, the Word in its last pose.
- Her edge draws one still frame, a third into its round, and the glow over the letters is the one effect left, at 1.2s.

> rule: Never ship a half-drawn mark. A screenshot, a thumbnail and a share image all show the end state of every animation.

## Loading beats

1. Under 200ms, show nothing. A skeleton that flashes reads as a fault, not as speed.
2. Past that, show a `Skeleton` in the shape of what is coming: glass blocks with a sheen that runs 1.4s. Never an empty black screen.
3. When there is real progress, show it: a `Progress` bar grows its width over .4s with the house curve, or a ring counts in the middle.
4. A reload of her own screens is not a spinner. A 2px line runs under the safe area, 1s a loop, and her edge pattern runs on the phone instead.

> warn: The 200ms threshold and the order above are not tokens. The system names Skeleton, Progress and two spinners, `.ix-spin` at 0.7s and `.iris-spin` at 0.8s a turn, and states no threshold value anywhere.

## Why there are no springs

Motion in Iris is a curve, not physics. There are no springs and no speed schemes: three durations and one curve carry the whole system.

- The house curve arrives and stops. It never passes its own control points, so nothing overshoots.
- Three duration values, and nothing in the UI above 0.32s.
- The interface stays near 0.2s. The long motion is the ring and one pen draw, and those run on the part's own clock rather than on a token.
- One exception: where a finger lets go (a swipe, a dragged sheet) a spring carries the hand's speed on, damped so it never bounces. See Interaction.
