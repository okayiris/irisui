# Toggle

A setting that is on or off and takes effect at once.

Group: Controls. Export: `window.IrisUi.Toggle`.

## Props

| prop | type | required |
| --- | --- | --- |
| `on` | `boolean` | no |
| `onChange` | `(on: boolean) => void` | no |

## Examples

### Off, in its row

```js
() => h(Row, { icon: h(Icon, { name: "car" }), title: "On the road", subtitle: "She listens and talks through this iPhone, even when locked.", trailing: h(Toggle, { label: "On the road" }) })
```

### On, in its row

```js
() => h(Row, { icon: h(Icon, { name: "mic" }), title: "Listen for her name", subtitle: "Say Iris and she answers", trailing: h(Toggle, { on: true, label: "Listen for her name" }) })
```

## Guidelines

- Do: Let the switch act immediately and let the row title name the setting.
- Don't: A toggle that only takes effect after a save button.
- Do: Use violet for on, the only place violet appears besides the ring.
- Don't: An ice-blue or green toggle, or a second accent for on.
- Do: Wait for the change to land before flipping the state when the switch is slow, or show busy.
- Don't: Flip the switch on a request that has not answered.

## Specs

- Size: `51 x 31px`
- Knob: `27px, inset 2px, white`
- Travel: `translateX 20px when on`
- Off fill: `rgba(120,130,145,.45)`
- On fill: `var(--violet) #8b5cf6`
- Radius: `--radius-pill 999px`
- Transition: `background .2s, knob transform .2s`

## Accessibility

- The switch needs a label, normally the Row title beside it.
- A screen reader hears switch, then on or off, after the label.
- Do not use colour alone: the knob position carries the state too.

## The system's own words

# Toggle

The iOS switch, 51x31: violet (--violet) when on, grey glass when off.

Toggle from IrisUi (`window.IrisUi.Toggle`, bundle `_ds_bundle.js`, styles `styles.css`). Wrap the tree in `<PreviewI18nProvider>` for the app's background and font.

The iOS switch, 51x31: violet (--violet) when on, grey glass when off.

Props: `{ on?: boolean; onChange?: (on: boolean) => void }`

Variants: Off, On.

```js
const { h } = { h: React.createElement };
h(Toggle, {on:false})
```

