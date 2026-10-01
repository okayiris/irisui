# Sheet

Secondary content anchored to an edge: the bottom on a phone, the side on a wide window.

Group: Overlays. Export: `window.IrisUi.Sheet`.

## Props

| prop | type | required |
| --- | --- | --- |
| `open` | `boolean` | yes |
| `onClose` | `() => void` | no |
| `title` | `string` | no |
| `sub` | `string` | no |
| `side` | `'bottom' | 'end'` | no |
| `children` | `ReactNode` | no |

## Examples

### Bottom, choosing a voice

```js
() => { const [open, setOpen] = React.useState(true); const [voice, setVoice] = React.useState("Alex");
  const pick = (title, subtitle) => h(Row, { key: title, title, subtitle, onClick: () => setVoice(title),
    trailing: voice === title ? h("span", { "aria-label": "Chosen", style: { color: "var(--accent)", fontSize: 17 } }, "✓") : null });
  return h(Sheet, { open, onClose: () => setOpen(false), title: "Voice", sub: "How she sounds on this device",
    children: [ pick("Alex", "Dutch, warm and clear"), pick("Calmer", "Dutch, softer"), pick("No voice", "She only writes here") ] }); }
```

### Side, on a wide window

```js
() => { const [open, setOpen] = React.useState(true);
  return h(Sheet, { open, onClose: () => setOpen(false), side: "end", title: "Details", sub: "The invoice she read",
    children: [ h(Card, { key: "a" }, h("div", { style: { fontSize: 17 } }, "Van Dijk Contractors"), h("div", { style: { fontSize: 12, color: "var(--dim)", marginTop: 3 } }, "€ 1.240,00 · 14 days")),
      h(Card, { key: "b" }, h("div", { style: { fontSize: 17 } }, "Two prices to compare"), h("div", { style: { fontSize: 12, color: "var(--dim)", marginTop: 3 } }, "She marked the difference")) ] }); }
```

## The system's own words

# Sheet

Secondary content anchored to an edge of the screen: the bottom on a phone, the side on a wide window.

One part covers both edges: the bottom on a phone, the side on a wide window, through `side`.

## When

- A choice that needs a moment but not the whole screen: a voice, a filter, the details of something in front
  of you.
- On a wide window, the side sheet keeps the thing you are looking at visible next to the sheet.

Never for the main content of a screen, and never two at once.

## The parts

The grip (bottom only) says it can be dragged away. `title` and `sub` say what the sheet is for. The body is
the system's own parts: Row, Card, Toggle, Button.

## Rules

- The bottom sheet is a phone shape: full width, `--radius-sheet` (22px) on the top corners, at most 82% tall.
- The side sheet is at most 420px and takes the right edge, with the left corners rounded.
- Star: the scrim is behind it, the sheet is `--sheet-bg`, and a scroll inside the sheet never scrolls the page.
- Escape closes; a click on the scrim closes; the grip drags.
- Never nest a sheet in a sheet.

## Values

| value | where |
| --- | --- |
| bottom sheet | full width, 10px 16px 20px, radius 22px top, max-height 82% |
| side sheet | max 420px, right edge, radius 22px left, scrolls inside |
| grip | 36x4px, radius 999px, `--line` |
| opening | `--motion-slow` (320ms) |

## Accessibility

`role="dialog"` with `aria-modal="true"`. Escape closes and focus returns to the trigger.
