# Progress

How far something is: a thin bar by default, or a ring with a value in the middle.

Group: feedback. Export: `window.IrisUi.Progress`.

## Props

| prop | type | required |
| --- | --- | --- |
| `value` | `number` | no |
| `ring` | `boolean` | no |
| `size` | `number` | no |
| `centre` | `ReactNode` | no |
| `caption` | `string` | no |
| `topic` | `TopicName` | no |

## Examples

### Bar

```js
() => h("div", { style: { display: "grid", gap: 8, maxWidth: 360 } },
  h("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 13 } }, h("span", null, "Groceries"), h("span", { style: { color: "var(--label)" } }, "3 of 8")),
  h(Progress, { topic: "groceries", value: 3 / 8 }))
```

### Ring

```js
() => h(Progress, { topic: "agenda", ring: true, size: 90, value: 0.4, centre: "3", caption: "to go" })
```

## Guidelines

- Do: Let the ring mean progress and nothing else; a ring is never decoration.
- Don't: A ring around an icon, or a ring that only looks like progress.
- Do: Show the answer in the middle of the ring: a count, a share, the state.
- Don't: A ring with an empty middle and no caption.
- Do: Use the bar for a share of a whole and keep it in the topic colour.
- Don't: A bar in a second accent, or a gradient fill.

## Specs

- Bar: `height 8px, radius 4px`
- Bar track: `18% --k mixed with #0b0f0d`
- Bar fill: `--k, transition .4s cubic-bezier(.2,.9,.25,1)`
- Ring sizes: `used at 90px and 76px in the preview`
- Ring centre: `700 40px var(--font-mono), --fg`
- Ring caption: `11px --dim, 2px above`
- Value: `0 to 1`

## Accessibility

- Expose the bar or ring as a progressbar with a value now, min 0 and max 1.
- The centre text is the answer; a screen reader should hear value and caption together.
- Colour is not the only signal: the length of the bar or the ring arc carries it too.

## The system's own words

# Progress

Progress in the topic colour: a thin bar by default, or a `ring` with a centre value and caption like a ring widget.

Consumer provides: `value` 0..1, `ring`, `size` (ring, px), `centre`, `caption`, `topic`. The ring means progress and nothing else (rule 1 of the golden key).

Part of the web parts in the topic palette (`WebKit` shows them together, next to the widget of the same topic). Inside a `Topic` it takes that topic's `--k` and `--kd`.

