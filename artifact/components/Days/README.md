# Days

One column per day, oldest left, the last one bright: a count over a fortnight.

## When

- Something that happens per day and is worth watching: alerts, calls, sign-ups, jobs that ran.
- A fortnight, or a week. A month of columns on a phone is unreadable.
- Where the shape matters more than the numbers. The numbers belong in a Bars list.

## The parts

`days` is `{ label, value, title? }`: the label under the column (the day), the value, and the line a hover
shows (the count, from `format`). `height` is the column height in px. The last column is the bright one, so
"how are we doing today" is the first thing the eye finds.

## Rules

- A day with nothing still gets a column (a hairline high), never a gap: the fortnight stays one shape.
- The label under the column is the day number, in 10.5px mono faint.
- Motion is the bar's colour on hover, nothing moves on its own.
