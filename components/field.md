# Field

One line of input inside a card: a search box, an add line, a short answer.

Group: controls. Export: `window.IrisUi.Field`.

## Props

| prop | type | required |
| --- | --- | --- |
| `topic` | `TopicName` | no |

## Examples

### Search

```js
() => h("div", { style: { width: 320 } }, h(UI.Field, { topic: "mail", placeholder: "Search mail" }))
```

### Add

```js
() => h("div", { style: { width: 320 } }, h(UI.Field, { topic: "groceries", placeholder: "Add something", defaultValue: "Oat milk" }))
```

## Guidelines

- Do: Let the placeholder say what to type, in one short sentence case phrase.
- Don't: A placeholder that stands in for a label, or ends in a full stop.
- Do: Keep the caret and the focus edge in the topic colour.
- Don't: Remove the focus edge, or make the field a light or white box.
- Do: Use one field per line of input and let it fill the column.
- Don't: A textarea look for a single line, or two fields in one row on a phone.

## Specs

- Height: `44px, padding 0 16px`
- Radius: `--radius-pill 999px`
- Fill: `--glass, 1px --edge border`
- Text: `15px var(--font), --fg`
- Placeholder: `var(--faint) #5a6b78`
- Caret: `var(--k, var(--accent))`
- Focus: `border 45% --k, ring 3px 14% --k`

## Accessibility

- A placeholder is not a label; give the field a real label or a labelled heading above it.
- The focus state shows on the border and the ring, so keyboard users see where they are.
- 44px tall, which is the comfortable touch height.

## The system's own words

# Field

The pill input: glass, caret and focus edge in the topic colour.

Consumer provides: every input attribute (`placeholder`, `value`, `onChange`...) plus `topic`. The placeholder says what to type, in sentence case, no full stop.

Part of the web parts in the topic palette (`WebKit` shows them together, next to the widget of the same topic). Inside a `Topic` it takes that topic's `--k` and `--kd`.

