# AppBar

The top line of a screen or a window: what this is, and the few actions that belong to it.

Iris keeps two shapes: small, and large with the title at size.

## When

- At the top of a screen or a window she opens, above everything else.
- Large when the title is the point of the screen; small when the content is.

Never two bars on one screen, never a bar inside a card, and never a bar with more than three actions (the rest belongs in an overflow Menu).

## The parts

`leading` (a back or close button), the title, `actions` on the right, and `children` for what sits under
the bar (a Segmented, a search field).

## Rules

- Glass and blur, one hairline under it: the bar never becomes a solid panel.
- The title is a statement, not a question, and it never repeats what the first card already says.
- It stays at the top while the content scrolls under it.
- The large variant is the only place a screen title goes to 26px; everything else stays at 15.
- One accent at most: the actions are quiet until they are pressed.

## Values

| value | where |
| --- | --- |
| bar | padding 8px 12px 10px, `rgba(7,9,12,.82)` with a 14px blur, 1px `--line` under it |
| small title | 15px/1.3, `--fg` |
| large title | 26px/1.15 `--font-display`, -0.01em tracking |
| sub | 12px `--dim` |

## Accessibility

A `header` landmark. Actions are real buttons with labels; a leading button says where it goes ("Back"), never just showing an arrow.
