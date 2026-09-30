# DatePicker

A month you pick a day in.

Iris had none: the agenda came from what she read. This is the calendar part.

## When

- A date the person chooses: a reminder, a deadline, a booking.
- In a dialog or a sheet when it interrupts, inline when it is the whole question.

Never for a date the person should not change (show it as text), and never for a range: a range is two pickers, and that pattern is not written yet.

## The parts

A head with the month and the two arrows, the weekday row, the day grid, and a foot with Today and what is chosen. `min` and `max` grey out what is out of reach.

## Rules

- Weeks start on Monday and are named in two letters, mono, uppercase.
- The chosen day is the accent with dark ink; today keeps a hairline ring, not a colour.
- An unreachable day is disabled (38% opacity) and still readable: never removed from the grid.
- The month steps with the arrows; the day cells are real buttons, so the keyboard and the screen reader come free.
- Today is one tap away, at the bottom left. She never has to hunt for it.

## Values

| value | where |
| --- | --- |
| card | 306px, `--glass`, 1px `--edge`, `--radius-card` (18px), 14px padding |
| day cell | 34px tall, radius 10px, 13.5px; chosen fills with `--k` and `--accent-ink` |
| weekday row | 9.5px mono, uppercase, tracking .1em, `--label` |
| nav | 30px circle, 1px `--edge` |

## Accessibility

A `grid` of `gridcell` buttons, each labelled with its full date ("6 October 2026"). The chosen day is `aria-selected`, today is `aria-current="date"`, and the month change is announced by the head's text.
