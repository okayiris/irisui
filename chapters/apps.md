# Apps (what the assistant builds)

Until now Iris built screens: one view, no navigation, gone when closed. An app is more: several views, a way
to move between them, its own data that is still there tomorrow, and a shape that works in a small window, a
full browser and a phone. This chapter is the layout framework for both. The previews under **apps** are live:
switch each between Window and Phone to see it fold.

Status: the surfaces up to Phone screen exist in the kit today (see `web-app.md`). The App surface and the kit
parts below are the design for it.

## Pick the smallest surface that holds it

| Surface | Command | What it is | Pick it when |
|---|---|---|---|
| Block | `block` | a small live piece inside the conversation | it should stay in view while talking: a timer, a photo, a score |
| Tile | `<Stat>` | one number and one word, movable and resizable | the answer is a number |
| Window | `window` | one view over the talk, then gone | "show me": a day plan, a comparison, a quick form |
| Page screen | `screen` | the talk page rearranged, with its live parts | a different arrangement of the page for a while |
| Phone screen | `device` | one view full-bleed on the phone | he is on the road |
| **App** | `app` | several views, navigation, its own data | he will come back to it: domains, invoices, a trip, recipes |

Rule of thumb: if he would open it again next week, it is an app. If it answers one question now, it is a
window. Never build an app for something a window answers.

## Anatomy of an app

```
+-- frame (the window: glass, radius 1rem, resizable) -------------+
| sidebar |  header: title . search . quiet icons . primary       |
|  13rem  |---------------------------------------------------------|
|         |  view (scrolls)                                         |
|         |                                                         |
+---------+---------------------------------------------------------+
            phone: the sidebar becomes the bottom tab bar
```

- **Frame**: the kit window. The owner moves it, resizes it, pins it to the lane. On a phone it is full-bleed.
- **Navigation**: one kind per app. Sidebar for places, tabs for angles on one subject, a back chevron for
  going deeper. Never two navigation bars at once.
- **Header**: one per view, `3.4rem` high, a `--line` hairline under it. Title `1.05rem`/600 left; then
  search, quiet icon buttons (`2.2rem`, round, ghost), and the one primary action last.
- **View**: padding `1.1rem`, parts `1.3rem` apart, cards from the kit. It scrolls; the header does not.
- **Overlays**: a sheet or dialog (the Overlays group); one at a time.

## The layouts

| Layout | For | Wide | Phone (below `40rem`) |
|---|---|---|---|
| **Sidebar app** | 3 to 7 places (Mail, Notes, a radar) | sidebar `13rem` + view | bottom tab bar; five or more: "More" |
| **List and detail** | a collection you open one of | list `19rem` + detail | two screens, back chevron |
| **Tabs** | one subject, 2 to 5 angles | underlined words under the title | bottom tab bar with icons |
| **Dashboard** | "how is it going" | tile grid of 4 columns | 2 below `52rem`, then 1 |
| **Board** | work moving through stages | 3 to 5 columns of cards | one column at a time, snaps sideways |
| **Flow** | anything with an end: book, sign up, set up | one question in a `30rem` column | the same, buttons full width |
| **Document** | long text: a plan, notes, a report | `40rem` column + inspector `15rem` | inspector as a floating panel |
| **Table** | records to scan and filter | search, chips, table | each row a two-line stack |
| **Widget pages** | the phone's home: pages of widgets | pages side by side | pages swiped vertically, dot rail |

Layouts nest: a Sidebar app whose "Invoices" place is a Table, whose row opens a Document. The outer shape
decides navigation; the inner one only its own view.

## Folding: sizes come from the window, not the screen

An app lives in a window the owner can make any size, so every rule uses a container query on the frame, never a
media query on the screen.

| Width of the frame | What changes |
|---|---|
| `< 40rem` | phone shape: sidebar and tabs become the bottom bar, list and detail become two screens, tables stack |
| `40rem` to `52rem` | dashboard 2 columns, inspector floats over the text |
| `> 52rem` | everything side by side |

The bottom bar is the app's `TabBar` look: a glass capsule, current tab accent tint, `.6rem` from the edges.
Views reserve `5rem` at the bottom so nothing hides under it.

## Colour in an app

The house rule stands: near-black, glass, one ice accent. In an app colour also carries **state**, and then it
may fill a whole tile: a lamp that is on is a warm fill (`#fbbf24`), energy made is green (`--ok`), a battery
under 20% amber (`--wait`), a late invoice red (`--error`), today's date red. What is off or neutral stays glass.
Status is a pill, never the accent. Media keeps its own colour (album art, a map).

## Data and state

- **Where he was**: an app remembers its last view, tab, scroll place and half-filled form per owner.
- **Its own data**: an app keeps its own data in the house, so it is there tomorrow and on his phone.
- **Live data**: an app can read the data a plugin command returns, with `{ data, loading, error, reload }`.
  Loading shows a skeleton in the shape of the view; an error shows "That didn't work. Try again in a moment."
  next to the thing that failed, and goes to the assistant on its own, with the request, so it fixes it before
  he notices.
- **Empty**: every list, table and board has an empty state that says what goes there and how to add the first
  one. Never a blank pane.

## Kit parts

English names, as in the rest of the kit.

| Part | Props | Does |
|---|---|---|
| `App` | `title`, `icon` | the frame, remembers where he was, folds by width |
| `Sidebar` + `NavItem` | `to`, `icon`, `count` | places; becomes the bottom bar on a phone |
| `View` | `path`, `title` | one view with its header; only the current one renders |
| `Header` | `search`, `actions` | title, search, quiet icons, the primary action last |
| `Tabs` + `Tab` | `title`, `icon` | underlined tabs; the bottom bar on a phone |
| `Split` | `list`, `detail`, `empty` | list and detail, two screens on a phone |
| `Table` | `columns`, `rows`, `filters` | sortable, filter chips, stacks on a phone |
| `Board` + `Column` | `title`, `onMove` | columns with draggable cards |
| `Steps` + `Step` | `title`, `valid` | a flow with the progress line and Back/Continue |
| `Inspector` | `open` | the side panel of a document |
| `WidgetPages` + `Page` | `title` | swipeable pages of widgets |
| `Field`, `Choice`, `Toggle` | `label`, `value`, `onChange` | form controls in the house style |
| `Empty` | `icon`, `title`, `action` | the empty state |
| `Sheet` | `title` | a sheet from the bottom on a phone, a dialog when wide |
| `useRoute`, `useStore`, `useCommand` | | where he is, its own data, live data |

## An app, in JSX

```jsx
export default () => (
  <App title="Domains" icon="globe">
    <Sidebar>
      <NavItem to="/" icon="today">Free today</NavItem>
      <NavItem to="/watch" icon="star">Watchlist</NavItem>
    </Sidebar>
    <View path="/" title="Free today">
      <FreeToday />
    </View>
    <View path="/watch" title="Watchlist">
      <Watchlist />
    </View>
  </App>
`);
```

## The phone app: the assistant's screens in the Iris tab

The phone is where screens become an app of their own. The Iris tab holds the screens themselves, and the tabs
beside it hold the loops, the camera and the You page. How the surface behaves:

- **Two axes.** Swipe sideways to change tab (Iris, Loops, Camera, You); the tab pill is liquid: its leading edge
  runs ahead of the finger, the trailing edge catches up. Swipe up and down on the Iris tab to go from screen to
  screen (Product, Inbox, Today, Compare, Home, Movement). A thin hairline between two screens wakes up in the
  accent while you swipe; the page dots on the right stretch between dots.
- **A screen can hold a stack**: several cards of the same kind on top of each other ("1/3" in the label),
  flicked through vertically inside the screen before the swipe moves to the next screen.
- **Pull to refresh** on the first card of a screen: an arc fills, then a small bubble says what it did.
- **Hold to edit.** A long press opens "Screens": every screen as a thumbnail with a switch ("6 of 6 on, drag
  to reorder"), dragged to reorder, "Done" top right. The last tile is "Add screen".
- **Colour is state** (see Colour in an app): the lamp that is on is warm, energy green, today's date red, a
  low battery amber, the best price white on a light card.
- The status pill ("Continue here") and three quiet round buttons stay on top of every screen; the tab bar
  with the talk button stays at the bottom.

## Ways to make a screen

Until now there was one way: he asks, and the assistant writes the JSX. There are five.

| Way | Who starts it | What happens |
|---|---|---|
| **Ask her** | he, in the conversation | "make a screen for my invoices": she writes it and puts it in the lane and the Iris tab |
| **Describe it** | he, in "New screen" | a sheet: type what you want to see, **speak** it, or add an **image** (a screenshot of an app you like, a photo of a sketch). "Make screen with Iris" |
| **Start from a layout** | he or she | one of the nine layouts above as the starting shape; she fills it with his data |
| **From a plugin** | installing it | a plugin ships its own screens; they appear switched off in the edit grid |
| **She proposes one** | she | when she sees a pattern (he asks the price of the same jeans every day) she offers a screen; it arrives switched off with "New", he turns it on |

**While she builds**, the screen is already there: a card "New · described by you" with his words and the
voice note, and under it "Iris is building this screen…" with a skeleton in the shape it will get. In the edit
grid the tile says "Being made". When it is ready it fills in place, without a reload; if it fails, the assistant gets
the error first (the error trap) and tries again before he sees an empty screen.

**One file, every surface.** A screen is one file in her house. The same file is a window on the web, a page
in the Iris tab on the phone, and a widget on the Mac; it folds by width (see Folding) instead of having a
phone copy.

## The other tabs

The tabs beside Iris are the assistant's own tools, each with its own surface:

- **Loops**: chips on top (All, Loops, Chats, Questions), chats as rows with a two-line preview, loops with
  their schedule ("Every workday 07:30") and a switch. A loop she runs can feed a screen (the price alarm feeds
  Compare).
- **Camera**: "Point and ask Iris", corner marks, the modes Ask, Scan, Translate as pills, the shutter in the
  middle.
- **You**: the owner, then "What Iris may see" (mail, calendar, home, location) as switches with one line of
  explanation, then voice and language rows.

## Do and don't

| Do | Don't |
|---|---|
| One navigation per app, the same in every view | A sidebar and tabs and a bottom bar at once |
| The primary action last in the header, one per view | A row of filled buttons |
| Fold by the window's width | Assume the screen size; fixed pixel widths above 64px |
| An empty state with the first action | A blank pane, a spinner that never ends |
| Colour for state (on, late, low) | Colour for decoration, a second accent |
| Data in `useStore`, live data through `useCommand` | Data in `localStorage` only; hand-rolled fetch without errors |
| A window for a one-off answer | An app for one question |
