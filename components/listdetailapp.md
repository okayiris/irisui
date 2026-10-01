# ListDetailApp

A collection you open one of: mail, notes, contacts, orders.

Group: App layouts. Export: `window.IrisUi.ListDetailApp`.

## Guidelines

- Do: Unread gets an accent dot, never bold colour.
- Don't: Do not colour the whole row for state.
- Do: The detail has its own header with quiet icon buttons; the actions sit under the content, primary first.
- Don't: Do not reuse the list header for the detail.
- Do: Nothing picked yet: the detail shows an empty state that says what to pick.
- Don't: Never a blank pane.
- Do: Below 40rem it becomes two screens: the list fills the window, picking an item slides the detail in with a back chevron; back returns to the same scroll place.

## Specs

- Frame (window / phone): `60rem x 31rem, radius 1rem / 23.5rem x 36rem, radius 1.6rem`
- List: `19rem, border-right 1px --line, items padding .4rem, gap .15rem`
- Item: `padding .6rem .7rem, radius .7rem, current tint rgba(125,211,252,.14)`
- Unread dot: `.45rem accent circle before the name`
- Detail text: `max-width 34rem`
- Below 40rem: `list width 100%, border 0; detail hidden until open; back button shown`

## Accessibility

- Each item is a button; the current one carries aria-current, so the selection is announced.
- The back chevron needs aria-label Back and returns focus to the item it came from.
- Announce the detail header on open, so a screen reader knows the view changed.

## The system's own words

# ListDetailApp

A list on the left, the chosen item on the right. On a phone the list and the item are two screens with a back chevron.

A list of things on the left and the one you picked on the right: mail, notes, contacts, orders.

- List `19rem` wide; each item is a button (hover glass, current accent tint) with a bold first line, time on the right, a `--dim` preview cut with an ellipsis. Unread gets an accent dot, never bold colour.
- The detail has its own header with quiet icon buttons; its actions sit under the content, the primary one first.
- Below `40rem`: two screens. The list fills the window; picking an item slides the detail in with a back chevron in its header. Back returns to the same scroll place.
- Nothing picked yet: the detail shows an empty state that says what to pick, never a blank pane.

