# BorderPattern

A pattern running along a rounded edge, one per moment: refreshing, listening, thinking, working, speaking, a question waiting, news, saving.

Group: Feedback. Export: `window.IrisUi.BorderPattern`.

## Props

| prop | type | required |
| --- | --- | --- |
| `pattern` | `BorderPatternName` | no |
| `radius` | `number` | no |
| `label` | `string` | no |
| `children` | `ReactNode` | no |

## Examples

### All eight, one at a time

```js
() => { const all = [["comet", "Refreshing"], ["breathe", "Listening"], ["orbit", "Thinking"], ["sparks", "Working on a loop"], ["wave", "She speaks"], ["stream", "Waits on you"], ["heartbeat", "A new loop"], ["zip", "Saving"]];
  const [p, setP] = React.useState("comet"); const when = all.find((x) => x[0] === p)[1];
  return h("div", { style: { display: "grid", gap: 16, maxWidth: 360 } },
    h(Select, { label: "The moment", value: p, onChange: setP, options: all.map(([value, label]) => ({ value, label })) }),
    h(BorderPattern, { key: p, pattern: p, label: when },
      h("div", { style: { padding: "var(--pad-card)", display: "grid", gap: 4 } }, h("div", { style: { fontSize: 17 } }, "Groceries for Saturday"), h("div", { style: { fontSize: 12, color: "var(--label)" } }, when)))); }
```

### Round a card

```js
() => h(BorderPattern, { pattern: "orbit", label: "Iris is thinking" },
    h("div", { style: { padding: "var(--pad-card)", display: "grid", gap: 4 } },
      h("div", { style: { fontSize: 17 } }, "Comparing three quotes"),
      h("div", { style: { fontSize: 12, color: "var(--label)" } }, "Iris is reading the small print")))
```

## The system's own words

# BorderPattern

A pattern that runs along a rounded edge, one for each moment. From the border lab, where it ran along the rim of
the phone.

| pattern | when |
| --- | --- |
| `comet` | refreshing: two comets run down both sides and meet |
| `breathe` | listening: the whole rim breathes |
| `orbit` | thinking: one light goes round with a tail |
| `sparks` | working on a loop: sparks drift and flicker |
| `wave` | she speaks: a wave of thickness travels round |
| `stream` | a question waits on you: three colours stream round |
| `heartbeat` | a new loop or a notification: two beats, then rest |
| `zip` | saving or sending: the rim zips closed and open |

## Rules

- One pattern at a time, and only while the moment lasts.
- Violet (`--violet`), the accent and the "you" pink (`--phase-you`) only: the rim belongs to the ring's family.
- The radius is the box's own (`--radius-card`), or `radius` for a phone-shaped frame.
- With reduced motion the pattern is drawn once, still.

## Accessibility

The canvas is hidden from assistive tech. `label` says the moment in words, in a status region.
