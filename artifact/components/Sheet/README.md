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
