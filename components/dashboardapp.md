# DashboardApp

A page of tiles that answers how it is going at a glance: a house, a shop, a campaign.

Group: App layouts. Export: `window.IrisUi.DashboardApp`.

## Guidelines

- Do: Order: numbers, then one chart, then what needs attention. Summary before detail.
- Do: One series per chart in the accent; the latest bar is the bright one.
- Don't: No second accent, and no chart for a single number.
- Do: Every tile opens what is behind it; the owner can move and resize tiles.
- Do: Status is a pill (ok, wait, bad), never the accent.

## Specs

- Frame (window / phone): `60rem x 31rem, radius 1rem / 23.5rem x 36rem, radius 1.6rem`
- Grid, wide: `repeat(4, minmax(0, 1fr)), gap .6rem`
- Spans: `.wide spans 3, .wide2 spans 1`
- Number: `1.4rem / 500, tabular digits`
- Chart: `bars 7rem high, 2px gap, axis 11px mono --faint`
- Below 52rem: `2 columns, both wide cards span 2`
- Phone: `1 column`

## Accessibility

- The DOM order is numbers, chart, needs-you, so a screen reader reads the summary first.
- A tile that opens something is a control, not a card with a click handler.
- Give every bar a name (a title or an aria-label with its value and unit).

## The system's own words

# DashboardApp

Tiles in a grid of 4, 2 or 1 columns: numbers first, then a chart, then what needs attention.

A page of tiles that answers "how is it going" at a glance: a house, a shop, a campaign.

- Order: numbers (`Stat`: one number, one word), then one chart, then a card with what needs attention. Summary before detail.
- The grid is 4 columns in a wide window, 2 below `52rem`, 1 on a phone; a wide card spans the row so no row ends in a gap.
- Every tile opens what is behind it. The owner can move and resize tiles (the grid snaps, see the Widgets preview).
- One series per chart in the accent; the latest value is the bright bar.

