# EdgeText

A word as a neon sign: the Edge light runs along the outline of every letter. SVG and CSS only.

Group: Brand. Export: `window.IrisUi.EdgeText`.

## Props

| prop | type | required |
| --- | --- | --- |
| `text` | `string` | yes |
| `pattern` | `'comet' | 'sparks' | 'zip' | 'party'` | no |
| `colors` | `string[]` | no |
| `size` | `number` | no |
| `weight` | `number` | no |
| `speed` | `number` | no |

## Examples

### The word of a big moment

```js
h("div", { style: { padding: 12 } }, h(EdgeText, { text: "Done", pattern: "comet", size: 64 }))
```

## The system's own words

# EdgeText

A word as a neon sign: the light of an `Edge` runs along the outline of every letter. A moving dash on the
letters' stroke, in SVG and CSS, so it costs next to nothing.

## When

- A big moment in one word: "Party", "Done", her name on a first start.
- Never a sentence, never body text, never below 40px: the dash needs room to read as light.

## Patterns

comet (two colours running round), sparks (dots that twinkle), zip (draws itself and back), party (colours
that turn). One lit thing per screen.

