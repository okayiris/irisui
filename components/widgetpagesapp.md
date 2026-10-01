# WidgetPagesApp

The phone home: pages of widgets, one theme per page, swiped with a dot rail.

Group: App layouts. Export: `window.IrisUi.WidgetPagesApp`.

## Guidelines

- Do: Colour here is state, not decoration: a lamp that is on is a warm fill (#fbbf24), energy made is green, a battery under 20% is amber, today is red.
- Don't: What is off or neutral stays glass; never decorate with the accent.
- Do: Every widget is a control or opens its app: tick a reminder, turn the lamp off, nudge the thermostat by half a degree, start a scene.
- Do: Pages snap; the order of pages is the owner's (drag the dots).
- Do: A wide window shows the pages as columns instead of a swipe.

## Specs

- Frame (window / phone): `60rem x 31rem, radius 1rem / 23.5rem x 36rem, radius 1.6rem`
- Pages, wide: `grid repeat(3, minmax(0,1fr)), gap 1.1rem, padding 1.1rem`
- Grid: `grid-template-columns 1fr 1fr, gap .5rem`
- Widget: `radius .9rem, padding .7rem, min-height 7rem`
- Number in a widget: `min(1.9rem, 30cqi), tabular digits`
- Below 40rem: `one block, scroll-snap-type y mandatory, page min-height 100%, dot rail column at right .35rem, current dot 1rem tall`
- Container tweaks: `below 8.5rem the row wraps; below 17rem the scenes become 2 columns`

## Accessibility

- A widget that changes something is a button (tick, lamp, scene); the number alone is not interactive.
- Each page has a heading, so a screen reader can tell the themes apart.
- The dots are labelled buttons (Today, Home, Movement), not decoration.
- State fills (lamp on, battery low) need a text or icon answer as well, never colour alone.

## The system's own words

# WidgetPagesApp

Pages of widgets you swipe through, each page one theme (Today, Home, Movement). The phone's home screen; on a wide window the pages sit side by side.

The phone's home: pages of widgets, one theme per page (Today, Home, Movement), swiped vertically with a dot rail on the right. In a wide window the pages stand next to each other as columns.

- A page is a 2-column grid of widgets; a widget is a tile (one number, one word) or spans both columns for a list, a player, a chart or a map.
- Colour here is state, not decoration: a lamp that is on is a warm fill, energy made is green, a battery under 20% is amber, today's date red. Everything off stays glass.
- Every widget is a control or opens its app: tick a reminder, turn the lamp off, nudge the thermostat by half a degree, start a scene.
- Pages snap; the dot of the current page stretches into a pill. Order of pages is the owner's (drag the dots).

