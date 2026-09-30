# Dialog

The one place Iris interrupts: a decision that cannot wait.

Iris is calm by rule (one frame, no interruption), so a dialog is rare and has to
earn it.

## When

- A decision that changes something for good: unpair a device, delete an account, send something out.
- A question she cannot answer alone and cannot wait to ask.

Never for a notice, a result, a progress report or a "saved!" — those are a Snackbar, a line next to the
thing, or a Skeleton. Never two dialogs at once.

## The parts

`title` says the decision in a question or a plain sentence. `body` is one or two lines: what changes. The
actions are the house Button: the decision first (primary, or danger when it destroys), the way out under it.

## Rules

- The way out is always there, and it is never the red one.
- The label of the first button says what happens ("Unpair", not "OK").
- The scrim is `--scrim`; the dialog is `--sheet-bg` with `--radius-card` and `--elev-2`.
- It covers its own box, not the browser: the page behind it stays where it is.
- Escape closes it. The first action takes focus when it opens.

## Values

| value | where |
| --- | --- |
| width | min(400px, 100% - 32px) |
| padding | 20px |
| radius | `--radius-card` (18px) |
| actions | house Button, full width in one column, 8px apart |
| opening | `--motion-base` (200ms), 10px rise |

## Accessibility

`role="dialog"`, `aria-modal="true"`, labelled by its title. Escape closes; focus goes back to what opened it.
