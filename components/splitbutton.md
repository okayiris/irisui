# SplitButton

One action, and the caret that opens the others that belong to it.

Group: Controls. Export: `window.IrisUi.SplitButton`.

## Props

| prop | type | required |
| --- | --- | --- |
| `children` | `ReactNode` | yes |
| `onSelect` | `() => void` | no |
| `items` | `MenuItem[]` | yes |
| `variant` | `'primary' | 'accent' | 'glass'` | no |
| `size` | `'sm' | 'md' | 'lg'` | no |

## Examples

### Send, or send another way

```js
() => h("div", { style: { minHeight: 180 } },
    h(SplitButton, { items: [
      { label: "Send as a mail" },
      { label: "Send as a text" },
      { kind: "sep" },
      { label: "Schedule for tomorrow" },
    ] }, "Send it"))
```

### In a topic

```js
() => h(Topic, { name: "parcel" }, h(SplitButton, { size: "sm", variant: "accent", items: [ { label: "Track it" }, { label: "Open the carrier's site" } ] }, "Track parcel"))
```

## The system's own words

# SplitButton

One action, and the caret that opens the others that belong to it.

Iris pairs its own Button with its own Menu, and this part is that pair in one piece.

## When

- One action the person usually wants, and two or three alternatives beside it: send it, or send it another way.
- Two to five alternatives. More than that is a Menu on its own.

Never for navigation, and never where the alternatives do the same thing as the main action in different words.

## The parts

The main action (a house Button: primary, accent or glass), and the caret, which opens the Menu to the left of
its trigger.

## Rules

- The caret is a second target, not part of the button: the two never share a click.
- The main action keeps the label and never becomes an icon-only button.
- The caret has its own accessible name ("More actions"), so a screen reader hears two controls, not one.
- The menu closes on a choice, on Escape and on a click outside, like every other menu.

## Values

| value | where |
| --- | --- |
| pair | 6px apart, both the house Button's own height |
| caret | min-width 40px, radius 999px, `--glass` with 1px `--edge` |
| menu | `--sheet-bg`, `--radius-menu` (14px), `--elev-2` |

## Accessibility

Two focusable controls in order: the action, then the caret with `aria-haspopup="menu"` behaviour from Menu itself.
