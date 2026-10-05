# TableApp

A list you search, filter and open, as one part: search in the AppBar, filter chips under it, the rows on one
Card split by hairlines, a line that counts what is shown, and a row that opens its detail in a Sheet from the
side.

## When

- Things of one kind that someone looks through: what Iris did, the vault's logins, invoices, people.
- Not for a few settings (a Card of Rows), and not for numbers side by side (a table in a document).

## The parts

`rows` is the list: `{ title, subtitle, icon, tags, detail }`. `tags` names the filter chips a row belongs to;
`filters` lists those chips, "All" comes first by itself. A row with `detail` opens a Sheet with that content;
a row without it does not open and has no chevron. `noun` is the word of the count line ("2 of 3 tasks"),
`actions` sits next to the search in the AppBar, `empty` is what an empty list says.

## Rules

- The search filters what is shown, on title and subtitle, at once. Nothing found says what was searched for.
- The count line always counts what is shown out of the whole.
- One chip is on at a time. All is always there.

## Accessibility

The search field is named by its placeholder, the chips are pressed buttons in a group named Show, the count line
is a polite live region. The Sheet closes on Escape.
