# Tabs

A few angles on one thing, under its title, with the ink sliding to the active one.

Group: Navigation. Export: `window.IrisUi.Tabs`.

## Props

| prop | type | required |
| --- | --- | --- |
| `items` | `string[]` | yes |
| `active` | `number` | no |
| `onSelect` | `(i: number) => void` | no |

## Examples

### Three angles

```js
() => { const [i, setI] = React.useState(0); return h("div", { style: { display: "grid", gap: 14 } },
    h(Tabs, { items: ["Today", "Loops", "Kept"], active: i, onSelect: setI }),
    h("div", { role: "tabpanel", style: { fontSize: 15 } }, ["The dentist at 9:30, lunch with Tom at 13:00", "Six loops, two waiting on you", "Twelve things she kept for you"][i])); }
```

## The system's own words

# Tabs

A few angles on one thing, under its title, with the ink sliding to the active one.

Iris had `Segmented` (a control inside a card) and the TabsApp layout; this is the
small control for a screen's own sections.

## When

- Three to five sections of one subject, all equally important, switched without leaving the screen.
- Never for navigation between screens and never for more than five: the tab bar and the sidebar do that.

## The parts

`items` are the labels, `active` is the index, `onSelect` changes it. The ink is a 2px bar that slides and
stretches between the labels.

## Rules

- The ink is one accent, and it is the only thing that moves.
- The labels are sentence case and short: two words is already long.
- It never scrolls sideways on a phone: five short tabs or a Segmented instead.
- Arrow left and right move between tabs; Tab leaves the group.
- Segmented is for a filter inside a card; Tabs is for the sections of a screen. Pick by where it sits.

## Values

| value | where |
| --- | --- |
| tab | 10px 14px 12px, 13.5px, `--dim`; active `--fg` |
| underline | 1px `--line`; ink 2px `--k` |
| move | `--motion-base` (200ms), width and position |

## Accessibility

`role="tablist"` with `role="tab"` and `aria-selected`; only the active tab is in the tab order.
