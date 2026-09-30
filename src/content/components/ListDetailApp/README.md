# ListDetailApp

A list on the left, the chosen item on the right. On a phone the list and the item are two screens with a back chevron.

A list of things on the left and the one you picked on the right: mail, notes, contacts, orders.

- List `19rem` wide; each item is a button (hover glass, current accent tint) with a bold first line, time on the right, a `--dim` preview cut with an ellipsis. Unread gets an accent dot, never bold colour.
- The detail has its own header with quiet icon buttons; its actions sit under the content, the primary one first.
- Below `40rem`: two screens. The list fills the window; picking an item slides the detail in with a back chevron in its header. Back returns to the same scroll place.
- Nothing picked yet: the detail shows an empty state that says what to pick, never a blank pane.
