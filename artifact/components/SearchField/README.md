# SearchField

Finding something: a pill field that says what it is doing and clears itself.

Iris has the field, and the results panel under it is yours
to fill.

## When

- Looking for something in a list, a table or everything the person kept.
- In a sheet or a window; not on a screen that has one answer (there is nothing to search).

## The parts

The glass glyph, the input, a spinner while `busy`, a clear button when there is text, and `children` for the
results.

## Rules

- Results land directly under the field, on their own surface, and never move the page under the pointer.
- While she looks: the spinner in the field, and the previous results stay until new ones arrive.
- Nothing found says what can be searched, not just "no results".
- The clear button appears only when there is something to clear, and it puts focus back in the field.
- It is a search, not a filter: filtering a table's own rows is the table's job.

## Values

| value | where |
| --- | --- |
| field | 40px tall, radius 999px, `--glass`, 1px `--edge` |
| focus | border `--k`, 3px accent glow |
| results | `--sheet-bg`, 1px `--edge`, `--radius-menu` (14px), `--elev-2` |
| spinner | 15px, 0.7s |

## Accessibility

The input carries the placeholder as its `aria-label`; the spinner has `role="status"`; the clear button says
"Clear". Results are real buttons, reachable by Tab.
