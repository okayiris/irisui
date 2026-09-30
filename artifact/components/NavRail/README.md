# NavRail

The wide-window version of the tab bar: a rail of sections that collapses to icons.

A rail on wide windows, the tab bar on a phone.

## When

- Three to seven sections on a window wide enough for two columns.
- Where the person comes back to the same places; the rail keeps them all visible.

Never on a phone (the tab bar does that), never for more than seven, and never as the only way to reach a screen the person needs.

## The parts

`items` (a label, an icon, and which one is current), `collapsed`, `onToggle`, and `trailing` for what
sits at the bottom.

## Rules

- The current section is the accent edge plus a tint, never a filled block: the rail is quiet.
- Collapsed keeps the icons and drops the words; the width animates (200ms), it does not jump.
- The toggle says what it does: "Collapse", with the arrows pointing the way it will go.
- A phone never shows this part; a wide window never shows the tab bar beside it.
- Icons come from the system; a rail of emoji is not a rail.

## Values

| value | where |
| --- | --- |
| rail | 208px wide, 72px collapsed, `--glass`, 1px `--edge`, `--radius-card` (18px) |
| item | min-height 40px, radius 12px, 13.5px `--dim`; current `--state-selected` with a 2px accent edge |
| icon | 22px box, 16px glyph |
| width change | `--motion-base` (200ms), `--ease-house` |

## Accessibility

A `nav` landmark with a label. The current item is `aria-current="page"`; collapsing keeps each item's
accessible name (the label moves into `aria-label`), and the toggle carries `aria-expanded`.
