# BoardApp

Work that moves through stages: jobs, a hiring pipeline, a content calendar.

Group: App layouts. Export: `window.IrisUi.BoardApp`.

## Guidelines

- Do: Three to five columns, each for one stage.
- Don't: A board is not a table: no sortable columns, no amounts, no rows to scan. That is Table app.
- Do: Drag a card between columns, with an accent line where it lands; a click opens the card.
- Don't: Do not put more than one pill on a card.
- Do: An empty column says what belongs there, in --dim.
- Don't: Do not hide an empty column.
- Do: Let colour carry state; what is off or neutral stays glass.

## Specs

- Frame (window / phone): `60rem x 31rem, radius 1rem / 23.5rem x 36rem, radius 1.6rem`
- Columns, wide: `repeat(3, minmax(14rem, 1fr)), gap .9rem, view padding 1.1rem`
- Below 40rem: `columns 85% wide, scroll-snap-type x mandatory, view padding-bottom 5rem`
- Column head: `mono 11px caps, --faint, name left and count right`

## Accessibility

- Each card is a button, so its title is the name a screen reader hears and the keyboard can open it.
- The drag grip is decoration: give the move action a real control that a keyboard reaches.
- Column name and count are text, so the stage is announced before the cards in it.

## The system's own words

# BoardApp

Columns of cards for things that move through stages. On a phone one column at a time, swiped sideways.

Columns for work that moves through stages: jobs, a hiring pipeline, a content calendar. In the preview a click moves a card one column on.

- Three to five columns, each a mono label with its count; cards are glass buttons with a title and at most one pill (who, or when).
- Cards are dragged between columns (grip on hover, accent line where it lands, as the rail does); a click opens the card.
- Below `40rem` each column is 85% of the width and the board snaps sideways, one column at a time.
- An empty column says what belongs there, in `--dim`.

