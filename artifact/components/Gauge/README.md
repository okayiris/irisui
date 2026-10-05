# Gauge

The release's Stat with a meter under it: one number, its word, and how full the number is. Where a Stat answers
"how much", a Gauge answers "how much, and how close is the line".

## When

- A dashboard tile whose number is a limit: storage, memory, this week's usage, a disk that fills up.
- Two to four in a grid, above the chart. A Gauge without a meter is the Stat, so a row of tiles may mix them.
- Never for a number that cannot fill up. A count of houses is a Stat.

## The parts

`value` and `label` are the release's Stat: one number, one word. `unit` rides beside the number ("of 8 GB"),
`note` is one quiet line under the word (what changed since last week, or what happens when it is full).
`progress` is 0..1 and draws the meter; without it the tile is the Stat itself. `lines` are the marks a value
is measured against, 0..1 each (the 80% and 90% of a disk). `tone` colours the number and the meter: `ok`,
`wait` or `error`, in the status colours only. `topic` is the release Stat's own tint.

## Rules

- One number and one word, like the Stat. The note is a line, not a sentence.
- Colour follows the level, and the level has a word: a red number alone says nothing.
- The meter is the release's Progress, so it is the same bar as everywhere else in the system.
