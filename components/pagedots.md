# PageDots

Under screens a thumb swipes through, when the count matters to the person.

Group: Navigation. Export: `window.IrisUi.PageDots`.

## Props

| prop | type | required |
| --- | --- | --- |
| `count` | `number` | no |
| `active` | `number` | no |
| `topic` | `TopicName` | no |
| `labels` | `string[]` | no |
| `dark` | `boolean` | no |
| `vertical` | `boolean` | no |
| `onSelect` | `(i: number) => void` | no |

## Examples

### Groceries

```js
() => { const [a, set] = React.useState(1); return h(PageDots, { count: 4, active: a, onSelect: set, topic: "groceries", labels: ["List", "Shops", "History", "Spending"] }); }
```

### On a photo

```js
() => { const [a, set] = React.useState(2);
  return h("div", { style: { position: "relative", maxWidth: 360 } },
    h(Photo, { kind: "duotone", topic: "weather", alt: "A figure in front of two ridges at dusk" }),
    h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 12, display: "flex", justifyContent: "center" } },
      h(PageDots, { count: 5, active: a, onSelect: set, topic: "weather", dark: true, labels: ["Mon", "Tue", "Wed", "Thu", "Fri"] }))); }
```

## Guidelines

- Do: One row of dots, one per screen.
- Do: dark on a screen with a photo behind the dots; PageDots dark in the one break in three.
- Do: Keep the row clear of other targets: the tap target is the dot plus 8px by 4px padding.

## Specs

- dot: `7px wide and 7px high, radius 999px, 30% of --k mixed with #2a313b`
- dot-active: `22px wide, gradient 90deg from --k to --k2`
- vertical: `in LoopScreen: 5px dots, the active one 5px wide and 16px high`
- dark: `rgba(7,9,12,.72), radius 999px, padding 0 6px`
- focus: `outline 2px in the topic colour, offset 2px`

## Accessibility

- Every dot needs a name: the default is 2 / 5, or pass labels.
- The active dot grows and lengthens as well as changing colour.
- Vertical dots on the loop screen follow the same names and the same focus ring.

## The system's own words

# PageDots

Page dots under swipeable screens: each dot 7px in 30% of the topic colour, the active one a 22px duotone streak from `--k` to `--k2`.

Consumer provides: `count`, `active`, `topic`, `onSelect`, optional `labels` (accessible names; default "2 / 5"). `dark` puts them on a dark pill: use it when the screen breaks to the edge with a photo behind the dots.

Tokens: `dot`, `dot-active`. Tap target is the dot plus 8px by 4px padding.

