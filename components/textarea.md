# TextArea

The multi-line field: a note, a message, anything longer than a line.

Group: Controls. Export: `window.IrisUi.TextArea`.

## Props

| prop | type | required |
| --- | --- | --- |
| `label` | `string` | no |
| `value` | `string` | no |
| `onChange` | `(v: string) => void` | no |
| `placeholder` | `string` | no |
| `rows` | `number` | no |
| `maxLength` | `number` | no |

## Examples

### A note to her

```js
() => { const [v, setV] = React.useState("The bin must go out by 8 on Tuesday"); return h("div", { style: { display: "grid", gap: 10 } },
    h(TextArea, { label: "What should she remember?", value: v, onChange: setV, rows: 3, maxLength: 280 }),
    h("div", { style: { fontSize: 12, color: "var(--label)", fontFamily: "var(--mono)" } }, v.length + " / 280")); }
```

## The system's own words

# TextArea

The multi-line field: a note, a message, anything longer than a line.

Iris had one line (`Field`) and nothing longer.

## When

- Writing something to a person: a note to her, a reply, a description.
- Never for one word or one number: that is `Field`.

## The parts

`label` in the mono label style above the box, the box itself, and whatever counter or hint you put under it.
`rows` sets the starting height; `maxLength` holds the limit, which you then show.

## Rules

- It grows with its content (`resize: vertical`) and never scrolls inside a short box.
- The focus edge is the accent, the same as Field.
- A limit is shown as "n / max" in mono under the box, and the limit is enforced rather than warned about.
- It never submits on Enter: Enter is a new line, always.

## Values

| value | where |
| --- | --- |
| box | `--glass`, 1px `--edge`, `--radius-field` (12px), 11px 13px |
| focus | border `--k`, 3px accent glow |
| text | 15px/1.5 `--font-text` |
| minimum height | 84px |

## Accessibility

A real `textarea` with a `label` tied to it by id. No custom editing behaviour.
