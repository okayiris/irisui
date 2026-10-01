# Divider

A hairline that groups what is above it from what is below.

Group: Surfaces. Export: `window.IrisUi.Divider`.

## Props

| prop | type | required |
| --- | --- | --- |
| `label` | `string` | no |
| `inset` | `boolean` | no |

## Examples

### Plain and inset

```js
() => h("div", { style: { display: "grid", gap: 0 } }, h("div", { style: { fontSize: 15 } }, "On this device"), h(Divider, null), h("div", { style: { fontSize: 15 } }, "Blocks and voice"), h(Divider, { inset: true }), h("div", { style: { fontSize: 15 } }, "What she keeps"))
```

### With a label

```js
() => h(Divider, { label: "Only you can open this" })
```

## The system's own words

# Divider

A hairline that groups what is above it from what is below.

Iris uses it far less: space does most of the grouping.

## When

- Between two groups of rows where space alone is not enough, or where a group needs a name.
- Never between two cards (the 12px gap already says they are separate) and never as decoration.

## The parts

`label` puts a name in the middle of the hairline, `inset` starts it after the 44px of a row's icon column so
it lines up with the text above and below.

## Rules

- One hairline, `--line`, never dashed and never the accent.
- A label is 10.5px mono, caps, tracked, `--faint` — the same as a section label.
- Full width inside the card it sits in; inset only under a row with an icon.
- It never replaces the 12px page gap.

## Values

| value | where |
| --- | --- |
| line | 1px `--line`, 12px margin above and below |
| inset | 44px from the left |
| label | `--text-label`, 10px between the rule and the words |

## Accessibility

A separator (`hr`) is announced as a boundary between groups; a labelled divider's words are ordinary text.
