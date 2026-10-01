# Pen

One mark on one piece of text, where a hand would have circled, underlined or ticked it.

Group: Screen parts. Export: `window.IrisUi.Pen`.

## Props

| prop | type | required |
| --- | --- | --- |
| `kind` | `'circle' | 'check' | 'strike' | 'underline' | 'mark' | 'arrow' | 'bracket' | 'box' | 'spotlight' | 'pulse' | 'star' | 'number'` | no |
| `look` | `'pen' | 'clean' | 'neon' | 'marker'` | no |
| `smoothness` | `number` | no |
| `open` | `number` | no |
| `tilt` | `number` | no |
| `n` | `number` | no |
| `children` | `ReactNode` | yes |

## Examples

### Circle

```js
() => h("p", { style: { fontSize: 17, margin: "12px 0" } }, "The dentist moved you to ", h(Pen, { kind: "circle" }, "14:00"), " on Tuesday.")
```

### Underline

```js
() => h("p", { style: { fontSize: 17, margin: "12px 0" } }, "Pay ", h(Pen, { kind: "underline" }, "before Friday"), ", or the fine doubles.")
```

### Check

```js
() => h("p", { style: { fontSize: 17, margin: "12px 0", paddingLeft: 24 } }, h(Pen, { kind: "check" }, "Bins out"), " for this week.")
```

### Strike

```js
() => h("p", { style: { fontSize: 17, margin: "12px 0" } }, "Milk, ", h(Pen, { kind: "strike" }, "bread"), ", apples.")
```

## Guidelines

- Do: One pen mark per screen; the Anchor does not count.
- Don't: Never two: a second one is drawn plain and warns.
- Do: Use strike only in tick lists.
- Don't: Never draw over a label.
- Do: Over the busy budget (5) the pen turns clean.
- Do: spotlight needs a parent with overflow hidden (a card).
- Don't: Never spotlight on the page: it dims everything.

## Specs

- kinds: `circle, check, strike, underline, mark (highlighter on the baseline), arrow, bracket, box, spotlight, pulse, star, number (n)`
- looks: `pen busy 1, clean 0, neon 2, marker 1`
- smoothness: `.45 by default: by hand, flowing, just not neat`
- open: `.14: how far the end of a loop lands beside its start`
- tilt: `-4 degrees; clean sets open and tilt to 0`
- placement: `an SVG layer over the text, pointer-events none`

## Accessibility

- The mark sits over text that already says the thing: it is never the only signal.
- Strike-through is used only in tick lists, where the tick also says done.
- Reduced motion: the mark is drawn once, fully, never mid-stroke.

## The system's own words

# Pen

A hand-drawn mark on one piece of text, drawn in with pen pressure: thick where the hand presses, thin at both ends.

Kinds: `circle`, `check`, `strike`, `underline`, `mark` (highlighter on the baseline), `arrow`, `bracket`, `box`, `spotlight` (dims the rest of the card), `pulse` (rings widening from the start), `star`, `number` (`n`).

Looks: `pen` (default, busy 1), `clean` (busy 0), `neon` (busy 2), `marker` (busy 1). Settings: `smoothness` 0..1 (default .45: by hand, flowing, just not neat), `open` (default .14: how far the end of a loop lands beside its start), `tilt` in degrees (default -4). `clean` sets open and tilt to 0.

Colour: the topic's `--k`. Consumer provides the text as children; the mark sits in an absolutely positioned SVG over it. `spotlight` needs a parent with `overflow: hidden` (a card), or it dims the whole page.

Rules: one pen mark per screen (a second one is drawn plain and warns). The Anchor does not count. Never over a label. Strike only in tick lists. A screen over the busy budget (5) gets the clean look.

