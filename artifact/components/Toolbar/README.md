# Toolbar

A bar of actions that belong together.

Iris had actions scattered over rows and buttons; this is the bar for the ones that belong to one thing.

## When

- Two to five actions on the same object: a week, a note, a device.
- Floating when the bar belongs to what is under it and the page scrolls away underneath.

Never for navigation (that is the tab bar or the sidebar), never for more than five actions, and never as the only way to reach something.

## The parts

`items` are the actions: `label`, an optional `icon`, `active`, `danger`, `disabled` and
`onSelect`. `title` is a small mono label at the front, `trailing` is what sits at the end (a count, a
switch).

## Rules

- The label is always there, even when there is an icon: an icon-only toolbar is a guessing game.
- One action may be active, and it keeps the accent edge. Danger sits last.
- It scrolls itself sideways rather than wrapping, on a phone.
- Arrow left and right move between the actions; Tab leaves the bar.
- The floating variant is the only thing in this system that carries `--elev-2` besides overlays: it floats.

## Values

| value | where |
| --- | --- |
| bar | radius 999px, padding 6px, gap 6px |
| docked | `--glass` fill, 1px `--edge`, no shadow |
| floating | `--sheet-bg`, `--elev-2` |
| action | 32px tall, radius 999px, 13.5px; active `--state-selected` with an accent edge |

## Accessibility

`role="toolbar"` with the title as its `aria-label`. Active actions are `aria-pressed`. Disabled actions keep their label so the reason can be read out beside them.
