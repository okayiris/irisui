# LoopBubble

One loop, small: its first letter in a disc and the six phases round it, the current one lit.

Group: Feedback. Export: `window.IrisUi.LoopBubble`.

## Props

| prop | type | required |
| --- | --- | --- |
| `title` | `string` | yes |
| `step` | `0 | 1 | 2 | 3 | 4 | 5` | no |
| `size` | `number` | no |

## Examples

### Every phase

```js
() => h("div", { style: { display: "flex", flexWrap: "wrap", gap: 16, paddingTop: 8 } },
    ["Recognised", "Planned", "Busy", "You", "Check", "Done"].map((t, i) => h("div", { key: t, style: { display: "grid", justifyItems: "center", gap: 6, fontSize: 12, color: "var(--label)" } }, h(LoopBubble, { title: t, step: i }), t)))
```

## The system's own words

# LoopBubble

One loop, small: a disc with the loop's first letter, and six short arcs round it, one per phase.

The same six phases and colours as `PhaseRing` (recognised, planned, busy, you, check, done), at the size of an
avatar. It is how a loop shows inside a `CircleStack` card and next to her answer in the strip.

## The parts

`title` gives the letter and the name, `step` (0 to 5) the phase it is in, `size` scales the whole bubble
(designed at 34px, 26px in a card).

## Rules

- Phases already done stay lit at 70%, the current one is lit full, the rest are a hairline.
- When the loop waits on you (step 3) the current arc glows: it is the one thing on the bubble that asks for a hand.
- The arcs draw themselves round once when the bubble appears, one after the other; with reduced motion they are
  simply there.

## Values

| value | where |
| --- | --- |
| disc | radius 14 of 34, `--bubble-disc` |
| arcs | radius 15, 2.5px, round caps, 7 degrees clear at each end |
| colours | the release's `PHASE_COLOURS`, read from `window.IrisUi.design` |
| letter | 600 13px, `--fg` |
| draw | `--motion-slow`, `--ease-house`, 70ms apart |

## Accessibility

`role="img"`, named with the loop and its phase ("Van Dijk, you").
