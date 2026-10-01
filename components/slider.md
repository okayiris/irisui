# Slider

One value on a line: how much, how far, how loud.

Group: Controls. Export: `window.IrisUi.Slider`.

## Props

| prop | type | required |
| --- | --- | --- |
| `value` | `number` | no |
| `onChange` | `(v: number) => void` | no |
| `min` | `number` | no |
| `max` | `number` | no |
| `step` | `number` | no |
| `label` | `string` | no |
| `unit` | `string` | no |
| `format` | `(v: number) => string` | no |

## Examples

### How far she listens

```js
() => { const [v, setV] = React.useState(60); return h("div", { style: { display: "grid", gap: 18 } },
    h(Slider, { value: v, onChange: setV, label: "Listening distance", unit: "m" }),
    h("div", { style: { fontSize: 13, color: "var(--dim)" } }, v > 75 ? "Far: she hears the whole house" : v < 25 ? "Near: only right in front of the phone" : "About a room")); }
```

### In a topic

```js
() => { const [v, setV] = React.useState(3); return h(Topic, { name: "health" }, h(Slider, { value: v, onChange: setV, min: 1, max: 7, label: "Walks a week", format: (n) => n + "×" })); }
```

## The system's own words

# Slider

One value on a line: how much, how far, how loud.

The topic's accent sits on the filled side.

## When

- A value that is a matter of degree, where the exact number matters less than the feel: distance, volume,
  brightness.
- Never where a precise number is needed (a Field), and never for a choice between named things (Segmented,
  Tabs or a Menu).

## The parts

`label` sits above left in the mono label style, the value above right in mono, the track below. `unit` and
`format` shape how the value reads.

## Rules

- The filled side takes the accent (or the topic's `--k` inside a Topic); the rest is `--line`.
- The knob is dark with an accent edge: it stays visible on glass, and it grows slightly on hover and gives
  way on press.
- The value is always visible while dragging: a slider without a number is a guess.
- Keyboard: left and right move one step, Home and End go to the ends.

## Values

| value | where |
| --- | --- |
| track | 6px tall, radius 999px, `--line` under `--k` |
| knob | 20px, `--bg` fill, 2px `--k` border |
| hover | scale 1.08; press 0.96 |
| label | `--text-label`; value 13px `--mono` |

## Accessibility

A real `input[type=range]`: it takes the keyboard, announces its label and value, and needs no ARIA of its own.
