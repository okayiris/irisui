# Chip

One choice among a few in a topic: a shop, a day, a filter.

Group: controls. Export: `window.IrisUi.Chip`.

## Props

| prop | type | required |
| --- | --- | --- |
| `on` | `boolean` | no |
| `topic` | `TopicName` | no |
| `children` | `ReactNode` | no |
| `onClick` | `() => void` | no |

## Examples

### Choices

```js
() => { const [on, set] = React.useState(0); return h("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, ["the supermarket", "the bookshop", "the market"].map((c, i) => h(UI.Chip, { key: c, topic: "groceries", on: i === on, onClick: () => set(i) }, c))); }
```

### Per topic

```js
() => h("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, ["agenda", "mail", "parcel", "sport", "money"].map(t => h(UI.Chip, { key: t, topic: t, on: true }, t)))
```

### Without a topic

```js
() => h("div", { style: { display: "flex", gap: 6 } }, h(UI.Chip, { on: true }, "Today"), h(UI.Chip, null, "This week"))
```

## Guidelines

- Do: Use a row of chips for one choice among a few; wrap them with 6px between.
- Don't: More than five chips in a row: use a Segmented or a list.
- Do: Let one chip be on, in the topic accent with dark ink.
- Don't: Two on chips in a row of one choice, or chip text in white on the accent fill.
- Do: Keep the label to one or two words in sentence case.
- Don't: A sentence in a chip, or a chip as a plain action instead of a choice.

## Specs

- Height: `30px, padding 0 12px, gap 6px`
- Radius: `--radius-pill 999px`
- Label: `500 13px var(--font)`
- Off: `14% --k fill, 45% --k edge, --k text`
- On: `--k fill, --kd ink (fallback #07171f)`
- Focus: `2px var(--k, var(--accent)) outline, 2px offset`
- Transition: `background .15s`

## Accessibility

- A row of chips is a set of pressed buttons; expose the chosen one as pressed.
- The whole chip is the target, 30px tall, and the label is its name.
- Colour alone does not carry the choice; the filled state must be visible.

## The system's own words

# Chip

A pill filter or choice in the topic colour: `on` fills it with `--k` and dark `--kd` ink, off it is glass with the topic edge.

Consumer provides: `children` (one or two words), `on`, `onClick`, `topic` (wins over a surrounding `Topic`; without either the ice accent). Use a row of chips for one choice among a few (shops, days); more than five: a `Segmented` or a list.

Part of the web parts in the topic palette (`WebKit` shows them together, next to the widget of the same topic). Inside a `Topic` it takes that topic's `--k` and `--kd`.

