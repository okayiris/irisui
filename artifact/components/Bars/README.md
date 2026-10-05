# Bars

Rows that say which one is the biggest: a name, a bar, the number, biggest first.

## When

- "Which one is it": the houses that used the most, the campaigns that cost the most, the slowest checks.
- One series only. Two series in one row are a chart, and a chart is not this.
- Four to twelve rows. More belongs behind a "view all", fewer is a table.

## The parts

`rows` is `{ label, value, href?, tone?, title? }`; `href` makes the name a link, `tone` puts the row's bar in a
status colour for a value that is over its line, `title` is the line a hover shows. `format` prints the number (the right column), `max` is what a
full bar means (without it the biggest row is full), `empty` is the line when there are no rows.

## Rules

- The biggest row is the full bar, so the bars compare to each other, not to a scale the reader cannot see.
- Hairlines between the rows, never a frame around the list: it goes on a Card.
- The number is right-aligned in mono, so a column of them lines up.
