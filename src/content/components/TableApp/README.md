# TableApp

Rows of records with search, filter chips and a primary action. On a phone each row becomes a stacked card.

Records you scan, sort and filter: invoices, orders, domains, contacts.

- Header: title, quiet export, then the primary action. Under it one search field and filter chips (outlined, the chosen one tinted).
- Headers in 11px mono caps `--faint`; amounts right-aligned in tabular digits; status as a pill (ok / wait / bad, never the accent). The whole row is the button.
- Show the count under the table ("2 of 4 invoices"). Past 50 rows: load more on scroll, never numbered pages.
- Below `40rem` each row is a two-line stack: name and amount on top, number and status under it.
