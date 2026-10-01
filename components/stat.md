# Stat

One number and one word, at the top of a card or a window.

Group: surfaces. Export: `window.IrisUi.Stat`.

## Props

| prop | type | required |
| --- | --- | --- |
| `value` | `ReactNode` | yes |
| `label` | `string` | yes |
| `topic` | `TopicName` | no |

## Examples

### Pair

```js
() => h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 } },
  h(Stat, { topic: "groceries", value: "5", label: "to get" }), h(Stat, { topic: "groceries", value: "€42", label: "estimate" }))
```

### Three, one topic

```js
() => h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 } },
  h(Stat, { topic: "agenda", value: "14:00", label: "next" }), h(Stat, { topic: "agenda", value: "4", label: "today" }), h(Stat, { topic: "agenda", value: "1", label: "waiting" }))
```

## Guidelines

- Do: Keep the value short and let the number be the answer.
- Don't: A sentence in the value, or a number used as decoration.
- Do: Place two or three stats side by side at most.
- Don't: A row of five tiles, or a stat inside another stat.
- Do: Let the label name what the number is, in one or two words.
- Don't: A label that repeats the number, or a full stop after it.

## Specs

- Tile: `--glass fill, 1px --edge, radius 14px`
- Padding: `12px 14px`
- Value: `700 28px var(--font-mono), --k, letter-spacing -.02em`
- Label: `12px --dim`
- Side by side: `2 or 3 at most`

## Accessibility

- Read the value and the label as one: 5 to get, 14:00 next.
- Do not rely on the mono digits for meaning; the label carries the unit.
- The tile is not a control, so it takes no focus and no press state.

## The system's own words

# Stat

One number and one word: the number large in the topic colour, the word dim under it.

Consumer provides: `value` (short: a count, a time, an amount), `label` (one or two words), `topic`. Two or three side by side at most; the number is the answer, never decoration.

Part of the web parts in the topic palette (`WebKit` shows them together, next to the widget of the same topic). Inside a `Topic` it takes that topic's `--k` and `--kd`.

