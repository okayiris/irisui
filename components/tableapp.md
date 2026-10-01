# TableApp

Things of one kind you look through: what Iris did, the vault's logins, invoices, people.

Group: App layouts. Export: `window.IrisUi.TableApp`.

## Props

| prop | type | required |
| --- | --- | --- |
| `title` | `string` | yes |
| `rows` | `TableRow[]` | no |
| `filters` | `string[]` | no |
| `search` | `boolean` | no |
| `placeholder` | `string` | no |
| `noun` | `string` | no |
| `actions` | `ReactNode` | no |
| `empty` | `string` | no |
| `topic` | `TopicName` | no |

## Examples

### What Iris did

```js
() => h(TableApp, { title: "What Iris did", noun: "tasks", filters: ["Calls", "On the web"], rows: [
    { title: "Moved the dentist", subtitle: "Called at 14:10", icon: "phone", tags: ["Calls"], detail: h(Card, { padding: 0 }, h(Row, { title: "Asked to move Tuesday", subtitle: "14:10" }), h(Row, { title: "Wednesday 09:30 is free", subtitle: "14:11" }), h(Row, { title: "Booked. Bring the old card", subtitle: "14:12" })) },
    { title: "Looked up houses", subtitle: "On funda.nl at 13:50", icon: "globe", tags: ["On the web"], detail: h(Card, { padding: 0 }, h(Row, { title: "Opened Utrecht, 3 rooms", subtitle: "13:50" }), h(Row, { title: "Saved 4 houses to your list", subtitle: "13:52" })) },
    { title: "Booked Da Mario", subtitle: "Called at 13:40", icon: "phone", tags: ["Calls"], detail: h(Card, { padding: 0 }, h(Row, { title: "Asked for six on Saturday", subtitle: "13:40" }), h(Row, { title: "20:00 is free, inside", subtitle: "13:41" })) },
  ] })
```

### The vault

```js
() => h(TableApp, { title: "Logins", noun: "logins", placeholder: "Search logins", actions: h(Button, { variant: "primary", size: "sm" }, "Add"), rows: [
    { title: "shop.example.com", subtitle: "alex@example.com, used today", detail: h(Card, { padding: 0 }, h(Row, { title: "alex@example.com", subtitle: "Name" }), h(Row, { title: "Iris may use it", subtitle: "Touch ID each time", trailing: h(Toggle, { on: true, label: "Iris may use it" }) })) },
    { title: "da-mario.example", subtitle: "alex@example.com, added Saturday", detail: h(Card, { padding: 0 }, h(Row, { title: "Iris may use it", subtitle: "Touch ID each time", trailing: h(Toggle, { label: "Iris may use it" }) })) },
  ] })
```

## Guidelines

- Do: The search filters at once, on title and subtitle; nothing found says what was searched for.
- Do: Status in words in the subtitle.
- Don't: Red for anything that is not destructive: late is a warning.
- Do: The count always counts what is shown out of the whole.

## Specs

- Body: `padding 12px 16px 16px, gap 12px`
- Search: `up to 240px wide in the app bar, shrinks on a phone`

## Accessibility

- The chips are pressed buttons in a group named Show.
- The count line is a polite live region, so a filter or a search is heard.
- The sheet closes on Escape.

## The system's own words

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
