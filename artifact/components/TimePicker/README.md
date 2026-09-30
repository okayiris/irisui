# TimePicker

A time you set with two strips: the hour, then the minute.

Iris takes the keyboard-friendly middle: two scrolling strips of chips, and the time reads big in mono.

## When

- A time the person chooses: a reminder, a booking, an alarm.
- Where the exact minute matters less than the hour, keep a larger `step` (5, 10, 15).

Never for a duration (that is a Slider or a Field) and never for two times in one part.

## The parts

The chosen time (34px mono, tabular figures), an hour strip of 24 chips, a minute strip of the steps, and a foot with Now and the step.

## Rules

- The chosen time is always visible while choosing: a time picker without the number is a guess.
- The active chip takes the accent with dark ink; the rest are quiet.
- Now is one tap away and rounds to the step.
- Two strips, never one long list of 1440 minutes.

## Values

| value | where |
| --- | --- |
| card | 306px, `--glass`, 1px `--edge`, `--radius-card` (18px), 14px padding |
| time | 34px `--font-mono`, tabular-nums, `--fg` |
| chip | 30px tall, min 40px wide, radius 999px, 13px mono |
| strip label | 9.5px mono, uppercase, `--label` |

## Accessibility

`role="group"` with a label; each chip is a real button with `aria-pressed`, and the chosen time sits in an
`aria-live="polite"` element so the change is read out.
