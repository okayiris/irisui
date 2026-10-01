# Badge

A count or a dot on the thing it belongs to: a tab, an icon, a word.

Group: Navigation. Export: `window.IrisUi.Badge`.

## Props

| prop | type | required |
| --- | --- | --- |
| `children` | `ReactNode` | yes |
| `count` | `number` | no |
| `dot` | `boolean` | no |
| `tone` | `'accent' | 'violet' | 'error'` | no |
| `max` | `number` | no |

## Examples

### Count, dot and a capped count

```js
() => h("div", { style: { display: "flex", gap: 30, alignItems: "center", paddingTop: 8 } },
    h(Badge, { count: 3 }, h(Button, { variant: "icon", label: "Loops, 3 new", icon: h(Icon, { name: "loop", size: 18 }) })),
    h(Badge, { dot: true }, h(Button, { variant: "icon", label: "Camera, something new", icon: h(Icon, { name: "camera", size: 18 }) })),
    h(Badge, { count: 128, max: 99 }, h(Button, { variant: "icon", label: "Calls, 128 missed", icon: h(Icon, { name: "phone", size: 18 }) })))
```

## The system's own words

# Badge

A count or a dot on the thing it belongs to.

One part is used everywhere a count is needed.

## When

- How many things are waiting: loops, mails, parcels.
- A dot when the count itself does not matter, only that there is something.

Never for a number that is the point of the screen: that is a Stat or a Widget, at size.

## The parts

`children` is the anchor: an icon button, a tab, a word. `count` shows the number, `max` caps it (99+),
`dot` shows a bare dot, and `tone` is `accent`, `violet` or `error`.

## Rules

- A count is capped at 99 with a plus. A bigger number says nothing.
- 0 shows nothing. A dot is for "there is something", not for "there is one".
- It sits on the top right of the anchor, with a 2px ring of `--bg` so it reads on any surface.
- Violet is for her own things (loops), red only for something that failed or needs attention now.

## Values

| value | where |
| --- | --- |
| size | 18px tall, radius 999px, min 18px wide |
| dot | 9px |
| text | 600 10.5px, dark ink on the fill |
| ink | `--accent-ink` on accent, white on violet |

## Accessibility

The number is announced with the anchor ("Loops, 3 new"). A dot alone carries no text and must not be the only
sign that something needs attention.
