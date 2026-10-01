# Select

One choice out of a few, in the shape of the fields around it.

Group: Controls. Export: `window.IrisUi.Select`.

## Props

| prop | type | required |
| --- | --- | --- |
| `label` | `string` | no |
| `value` | `string` | no |
| `onChange` | `(v: string) => void` | no |
| `options` | `(string | { value: string; label: string })[]` | yes |

## Examples

### A language

```js
() => { const [v, setV] = React.useState("nl");
  return h(Select, { label: "She talks to you in", value: v, onChange: setV, options: [ { value: "nl", label: "Nederlands" }, { value: "en", label: "English" }, { value: "de", label: "Deutsch" } ] }); }
```

## The system's own words

# Select

One choice out of a few, in the shape of the fields around it.

Iris needed the small version that sits in a settings row.

## When

- Three to seven named options, all known ahead of time, where seeing them all at once is useful.
- Never for more than seven (a Menu or a search), and never for a free value (a Field).

## The parts

`label`, the box, and the options as plain strings or `{ value, label }` pairs.

## Rules

- It looks like `Field`: same height, same radius, same focus edge. A form with two shapes in it is wrong.
- The chevron is drawn by the system, never your own image.
- The chosen value is readable without opening it.
- The first option is never a fake placeholder like "Choose…" if a real default exists.

## Values

| value | where |
| --- | --- |
| box | `--glass`, 1px `--edge`, `--radius-field` (12px), 11px 34px 11px 13px |
| chevron | 12px, `--dim`, 12px from the right |
| focus | border `--k`, 3px accent glow |

## Accessibility

A real `select` element with a tied `label`: the operating system draws the list, the keyboard and the
screen reader behaviour come free.
