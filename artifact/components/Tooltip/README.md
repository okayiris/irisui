# Tooltip

The name of a thing that is only an icon, on hover and on focus.

## When

- An icon button with no visible label.
- A word in a sentence that needs one short explanation.

Never for information you cannot get any other way, and never for a sentence: two lines is the ceiling.

## The parts

`label` is the text. The child is what the tooltip belongs to. It opens after `delay` (320ms by default) so
that a passing pointer does not flash it.

## Rules

- It opens on hover and on keyboard focus, and closes on leave, blur and Escape.
- It never holds a link, a button or anything clickable.
- It never covers the thing it describes.
- On a touch screen it is not the only way to know what a control is: the control keeps a label too.

## Values

| value | where |
| --- | --- |
| surface | `--sheet-bg`, 1px `--edge`, radius 9px, `--elev-2` |
| text | 12.5px, max 22 characters wide |
| rise | 4px, `--motion-fast` |
| delay | 320ms |

## Accessibility

`role="tooltip"`, tied to the trigger with `aria-describedby` while it is open. Escape closes it.
