# WebKit

The web UI parts inside a topic: Chip, Progress, Stat, CheckList, Segmented, Field.

Group: Showcases. Export: `window.IrisUi.WebKit`.

## Examples

### One topic per screen, four screens

```js
() => h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(460px,1fr))", gap: 16 } },
      Object.keys(DEMO).map(n => h(Screen, { key: n, name: n })))
```

### Without a topic: the ice accent

```js
() => h(Card, { style: { padding: 14, display: "grid", gap: 12, maxWidth: 460 } },
      h(Segmented, { items: ["All", "Open"], active: 0 }), h(Progress, { value: .4 }), h(CheckList, { items: ["Call the plumber", "Pay the invoice"], done: 1 }),
      h("div", { style: { display: "flex", gap: 6 } }, h(Chip, { on: true }, "Today"), h(Chip, null, "This week")), h(Field, { placeholder: "Search" }))
```

## Guidelines

- Do: One topic per screen, and the same topic colours as that topic's Widget, so a window matches the phone.
- Do: The topic colour is for what matters; the primary button stays flat in the topic (ButtonGroup).
- Don't: Never the topic colour for body text.
- Do: Every part takes an optional topic, and it wins over the surrounding Topic.
- Don't: Without either, do not invent a colour: it is the ice accent.

## Specs

- Ring progress: `size 76 in the preview, centre takes the percentage`
- Progress value: `0 to 1`
- Segmented, active: `tinted 14%`
- Screen card: `padding 14, parts 14 apart`
- Showcase grid: `repeat(auto-fit, minmax(460px, 1fr)), gap 16`

## Accessibility

- Segmented is a tablist or a radio group with the active item selected, not three buttons.
- A tickable CheckList row is a checkbox with its label; done must be announced, not just struck through.
- The ring carries a centre value, so the same number is readable as text.

## The system's own words

# WebKit

The web UI parts in the topic palette: `Chip`, `Progress` (bar or `ring`), `Stat`, `CheckList`, `Segmented`, `Field`. Inside a `Topic` they take its `--k` and `--kd`, the same colours as that topic's `Widget`, so a groceries card in a window matches the groceries widget on the phone.

- `Chip`: a pill filter or choice; `on` fills it with the topic colour and `--kd` ink.
- `Progress`: a bar by default; `ring` with `centre` and `caption` like a ring widget.
- `Stat`: one number, one word, the number in the topic colour.
- `CheckList`: strings get tick circles; `[time, text]` pairs get the time in the topic colour instead. `done` is a count or indexes, `onToggle` makes rows tickable.
- `Segmented`: tabs inside a card; the active one tinted 14%.
- `Field`: the pill input; caret and focus edge in the topic colour.
- Every part takes an optional `topic` (it wins over the surrounding `Topic`). Without either: the ice accent.
- The rules of `screens.md` hold: one topic per screen, the primary button flat in the topic (`ButtonGroup`), the topic colour for what matters, never for body text.

