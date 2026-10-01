# An app she builds

Several views, a way to move between them, its own data that is there tomorrow, and a shape that works in a small window, a full browser and a phone.

## Pick the smallest surface that holds it

A screen is one view with no navigation, gone when closed. An app adds views, navigation and data. If you would open it again next week, it is an app. If it answers one question now, it is a window.

> warn: Status: the surfaces up to phone screen exist in the kit today. The App surface and the kit parts marked planned in `apps.md` are the design, to be built next.

## The nine layouts

| Layout | Use it when | Parts |
| --- | --- | --- |
| Sidebar app | 3 to 7 places, and they are places and not angles: mail, notes, a domain radar | `App`, `Sidebar` + `NavItem`, `View`, `Header` |
| List and detail | a collection you open one of: mail, notes, contacts, orders | `App`, `Split` (list, detail, empty), `Header` |
| Tabs | one subject seen from 2 to 5 angles: a trip, a person, a project | `App`, `Tabs` + `Tab`, `View`, `Header` |
| Dashboard | "how is it going" at a glance: a house, a shop, a campaign | `App`, `Header`, `Stat`, `Card` |
| Board | work that moves through stages: jobs, a hiring pipeline, a content calendar | `App`, `Board` + `Column`, `Header` |
| Flow | anything with an end: book, sign up, set up a plugin, file a claim | `App`, `Steps` + `Step`, `Field`, `Choice`, `ButtonGroup` |
| Document | long text: a plan, notes, a report she wrote | `App`, `Inspector`, `Header` |
| Table | records you scan, sort and filter: invoices, orders, domains, contacts | `App`, `Table`, `Header` (search), `Chip`, `StatusPill` |
| Widget pages | the phone's home: pages of widgets, one theme per page | `WidgetPages` + `Page`, `Widget`, `PageDots` |

Layouts nest. A sidebar app whose "Invoices" place is a table, whose row opens a document. The outer shape decides the navigation; the inner one only its own view.

> rule: If the tabs are unrelated places, it is a sidebar app instead. One kind of navigation per app, and never two navigation bars at once.

## What they share

- Frame: the kit window, glass, radius 1rem, resizable. The owner moves it, resizes it and pins it to the lane. On a phone it is full-bleed.
- Navigation: one kind per app. Sidebar for places, tabs for angles on one subject, a back chevron for going deeper.
- Header: one per view, `3.4rem` high, a `--line` hairline under it. Title `1.05rem` / 600 on the left, then search, then quiet round icon buttons at `2.2rem` in ghost, and the one primary action last.
- View: padding `1.1rem`, parts `1.3rem` apart, cards from the kit. The view scrolls, the header does not.
- Overlays: a sheet or dialog, one at a time.
- Data: an app remembers its last view, tab, scroll place and half-filled form per owner, and shows a `Skeleton` in the shape of the view while live data loads.

> rule: When a command fails, the error sits next to the thing that failed: "That didn't work. Try again in a moment." It also goes to Iris on its own, with the request, so she fixes it before you notice.

## Folding: the frame decides, not the screen

An app lives in a window you can make any size, so every rule uses a container query on the frame, never a media query on the screen.

| Width of the frame | What changes |
| --- | --- |
| Below `40rem` | phone shape: the sidebar and the tabs become the bottom tab bar, list and detail become two screens, tables stack into a two-line row, each board column is 85% of the width and the board snaps sideways, the dashboard drops to one column |
| `40rem` to `52rem` | the dashboard is 2 columns, and the document inspector floats over the text instead of squeezing it |
| Above `52rem` | everything sits side by side, and the dashboard is 4 columns |
| The phone itself | full-bleed: no chrome, the app fills the screen, and pages of widgets are swiped with a dot rail |

- The bottom bar is the app's `TabBar` look: a glass capsule, the current tab in the accent tint, `.6rem` from the edges. More than five sections and the fifth tab is "More".
- Views reserve `5rem` at the bottom so nothing hides under the bar.
- Past 50 rows a table loads more on scroll, never numbered pages.

> warn: `apps.md` fixes three frame widths. `web-app.md` names 46rem, 71.99rem and 90rem, but those belong to the talk page, not to an app frame. Do not mix the two sets.

## It uses the system's own controls

An app never brings its own controls. It uses `ButtonGroup`, `Field`, `Choice`, `Toggle`, `Chip`, `Segmented`, `Stat`, `CheckList`, `Card`, `Row`, `TabBar`, `PageDots`, `StatusPill`, `Skeleton` and `Empty`. A plugin that ships its own buttons leaves the look and the keyboard behaviour behind.

| Do | Don't |
| --- | --- |
| build every view from the kit parts | a bare `<button>` or a clickable `<div>` |
| fold by the window's width | assume the screen size, or a fixed pixel width above 64px |
| one primary action last in the header, one per view | a row of filled buttons |
| colour for state: on, late, low | colour for decoration, or a second accent |
| an empty state with the first action | a blank pane, or a spinner that never ends |

> rule: In an app colour carries state and may fill a whole tile: a lamp that is on is warm (`#fbbf24`), energy made is green (`--ok`), a battery under 20% amber (`--wait`), a late invoice red (`--error`). What is off or neutral stays glass. Media keeps its own colour.
