# Search and finding

Where the field sits, what it shows while it waits, what an empty result says, and how filtering differs from asking the house.

## Where the field sits

The field lives in the view's header, between the title and the quiet icon buttons. The `Header` part takes `search` and `actions`; only one search field per view.

| Surface | Where the field sits |
| --- | --- |
| An app view | in the header: title `1.05rem` / 600 left, then search, then round ghost icon buttons at `2.2rem`, then the one primary action |
| A table app | one search field under the header, with the filter chips beside it |
| The talk page | the input bar at the bottom: the field is a textarea dressed as a pill, radius `1.45rem`, padding `.85rem 1.15rem`, growing to `33vh` |

- The field is a `Field`: the pill input, glass, with the caret and the focus edge in the topic colour.
- The placeholder says what to type, in sentence case, with no full stop.
- On the web input bar the focus edge is `--accent-line` and the focus ring is 2px in the accent with a 2px offset.

## While it waits

Waiting shows a `Skeleton` in the shape of what is coming: glass blocks with a sheen, never a spinner on an empty black screen. `Skeleton screen` draws a whole window (title line, big card, two rows) and the plain one draws a row in place.

- A view that loads live data shows the skeleton in the shape of the view, so the layout does not jump when the rows arrive.
- The button that started it gets a busy spinner while the promise runs.
- Search does not get its own spinner in the field. The list below it holds the skeleton.

## An empty result

Every list, table and board has an empty state that says what goes there and how to add the first one. Never a blank pane.

- A list and detail with nothing picked shows an empty state that says what to pick, never a blank pane.
- An empty board column says what belongs there, in `--dim`.
- A failed command is not an empty result: it says "That didn't work. Try again in a moment." next to the thing that failed.

> warn: There is no written copy yet for "nothing found" that is separate from "nothing here yet". Those are two different messages and the system only writes the second one. Say what was searched for, and offer the wider search.

## Filtering a list or searching a house

These are different actions and they look different. Filtering narrows what is already in front of you. Searching a house asks for something that is not on screen yet.

|  | Filter | Search |
| --- | --- | --- |
| What it does | narrows the rows already loaded | asks the house for something that is not here |
| The control | `Chip` for one choice among a few; more than five, a `Segmented` or a list | a `Field` in the header, or the talk field itself |
| Where the result goes | the same list, fewer rows | a screen, a window, or an answer in the talk |
| While it runs | no waiting: the rows are local | a `Skeleton` in the shape of the answer, then the real thing |
| Colour | the chosen chip is filled with the topic colour and `--kd` ink | the field keeps the topic caret; the answer brings its own topic |

Searching the house is a question to Iris, not a query against a table. The way out of a window is `say(text)`: it sends a sentence as if you said it. That is also how a search for something the app does not hold becomes a screen.

> rule: One search field per view. Not a field in the header and a field in the table at the same time. When the count matters, show it under the table: "2 of 4 invoices".

## The keyboard

> warn: The system has no keyboard rules written yet: no shortcut to reach the field, no `/` or `Cmd+K`, no Escape behaviour, no arrow keys in the results, and no rule for where focus returns after a search. What is written is the focus ring (2px in the accent, 2px offset) and the topic focus edge on a `Field`. Write the rest down before you rely on it.

- Tab order follows the view: title, search, quiet icons, the primary action last.
- Every action is a real control from the kit, so it is reachable and clickable by keyboard without extra work.

## No bar of its own

Iris has no full-screen search and no search bar of its own: the field is a `Field` in the header of the view, or the talk field at the bottom of the page.

The height comes from the pill padding rather than a fixed 56px, and suggestions are rows in the list below the field, not an overlay.

> rule: The reason is the house: one accent, glass, near-black, and no control that looks like a second system. A search bar with its own elevation and its own radius would be exactly that.
