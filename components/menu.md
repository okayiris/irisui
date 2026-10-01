# Menu

A list of choices on its own surface: a filter, a sort, a set of actions, anchored to the thing it belongs to.

Group: Controls. Export: `window.IrisUi.Menu`.

## Props

| prop | type | required |
| --- | --- | --- |
| `items` | `MenuItem[]` | yes |
| `label` | `string` | no |
| `trigger` | `ReactNode` | no |
| `side` | `'start' | 'end'` | no |
| `align` | `'start' | 'end'` | no |

## Examples

### Sort and filter

```js
() => {
  const [picked, setPicked] = React.useState(null);
  return h("div", { style: { minHeight: 250 } },
    h(Menu, { label: "Sort", defaultOpen: true, items: [
      { label: "Newest first", checked: picked === "Newest first", onSelect: () => setPicked("Newest first") },
      { label: "By name", checked: picked === "By name", onSelect: () => setPicked("By name") },
      { kind: "label", label: "Show" },
      { label: "Only unread", checked: picked === "Only unread", onSelect: () => setPicked("Only unread") },
      { kind: "sep" },
      { label: "Delete all", danger: true, onSelect: () => setPicked("Delete all") },
    ] }));
}
```

### A menu on a Row

```js
() => h(Row, { icon: h(Icon, { name: "wave" }), title: "Voice", subtitle: "Dutch, warm and clear", trailing: h(Menu, { label: "Alex", align: "end", items: [ { label: "Alex", checked: true }, { label: "Calmer" }, { label: "No voice" } ] }) })
```

## The system's own words

# Menu

A list of choices on its own surface, anchored to the thing it belongs to: a sort, a filter, a set of actions.

Iris had a Row with a value and no
surface to change it on; this is that surface.

## When

- A choice between a few named things, or two to six actions on one object.
- From a Row, an icon button or a small pill. The menu points at what it changes.

## The parts

`items` is the list: an item has `label`, an optional `icon`, `shortcut`, `checked`, `danger`,
`disabled` and `onSelect`; `kind: "label"` is a group heading and `kind: "sep"` a separator. Neither is
focusable. `align: "end"` opens the menu to the left of its trigger, which is what a menu on the right edge
of a row needs.

## Rules

- One accent, on the active item. Everything else is text.
- Danger sits last, alone, after a separator. Never first, never in the middle.
- The menu closes on Escape, on a choice, and on a click outside. Escape puts focus back on the trigger.
- Arrow up and down, Home and End move; Tab leaves. It is a menu, not a list of links.
- Never put a form in a menu. If it needs a field, it needs a dialog or a sheet.

## Values

| value | where |
| --- | --- |
| surface | `--sheet-bg`, 1px `--edge`, `--radius-menu` (14px), `--elev-2` |
| item | 9px 10px, radius 10px, hover `--state-hover` |
| label | `--text-label` (10.5px mono, caps, tracked), `--faint` |
| shortcut | 11px `--mono`, `--faint` |
| opening | `--motion-fast` (150ms) with a 4px rise |

## Accessibility

The trigger says `aria-haspopup="menu"` and `aria-expanded`. Items are `menuitem` or `menuitemcheckbox`
with `aria-checked`; the separator is `separator`. Focus moves into the menu when it opens.
