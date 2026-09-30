// Patterns, part A: the five pages she builds most often.
// phone, window, loop, apps, search. Every value here is read from src/content/ and public/ds/tokens.css.

import type { Doc } from "../content";

export const PATTERNS_A: Record<string, Doc> = {
  phone: {
    id: "phone",
    label: "A phone screen",
    lede:
      "One screen she builds for one person: one answer, one accent, one mark. The rules were settled in review and live in code.",
    sections: [
      {
        title: "The seven hard rules",
        blocks: [
          {
            kind: "p",
            text:
              "A screen is built from named parts only: `Topic`, `Widget`, `PhaseRing`, `LoopScreen`, `Pen`, `Anchor`, `Word`, `Pattern`, `ButtonGroup`, `PageDots`. The seven rules say how to combine them.",
          },
          {
            kind: "ol",
            items: [
              "The hero shows the answer itself. A timeline with the proposal on it, a route with where you are, a budget bar that does the sum of her sentence, a `PhaseRing` that is the progress. Decoration without meaning scores low, so leave it out.",
              "One personal anchor, handwritten. Exactly one `Anchor` per screen, in the topic's pen colour, at -3 degrees, opacity .9, no fill under it. It sits within 24px of its subject (`anchor-reach`) and at least 8px clear of any line or label (`anchor-clear`). It shares no fact with the sub line, the list or her sentence.",
              "Her sentence names the person and ties one other thread: \"Alex, after the dentist you still have time for the groceries.\" One link to another thread of the week, and each thread comes back at most twice in a set of screens.",
              "At most one hand-drawn mark. One `Pen` per screen, never over a label. The anchor does not count as a pen.",
              "One accent per topic. The primary button is that accent, flat, at oklch .82 / .12 (`button-primary-l`, `button-primary-c`) with dark ink. The secondary is glass. Never a gradient or a neon button.",
              "One controlled break in three screens. A photo to the edge, a number over the rim, a widget with `bleed`. Never in the header zone, never over readable content. Page dots on such a screen get the dark pill (`PageDots dark`).",
              "Function and the personal carry the set. Beauty and expression sit at most half a point lower, and when expression outruns function, beauty drops with it.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "The balance the rules aim for: function and the personal carry the set, and beauty, expression and uniqueness sit close behind. Aim for that shape, never for a spike in one axis.",
          },
        ],
      },
      {
        title: "The busy budget is 5",
        blocks: [
          {
            kind: "p",
            text:
              "Every loud part costs points and one screen holds 5 (`busy-budget`). Count before you draw, not after.",
          },
          {
            kind: "table",
            head: ["Part", "Cost"],
            rows: [
              ["`Word` (effect or theme), text behind a person", "3"],
              ["pattern widget, duotone photo, `PhaseRing`, route, budget bars", "2"],
              ["ring widget, timeline, a `Pen` in pen or marker look, confetti", "1"],
              ["neon pen", "2"],
              ["clean pen, glass or list widget, buttons", "0"],
            ],
          },
          {
            kind: "p",
            text:
              "Over budget, in this order: the pen turns clean, then confetti goes. If it is still too busy, drop a part rather than shrink everything. Air is the rest height shared evenly over the hero, the block and her sentence, at most 16px extra per gap and never more than 28px (`air-max`). The header stays the same height on every screen.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Still means the end state. Under reduced motion, in a screenshot, a thumbnail or a share image, the pen is fully drawn, the ring is at its value and the Word is in its final pose. Never a half-drawn circle or a letter mid-pop. The parts do this themselves when `prefers-reduced-motion` is set.",
          },
        ],
      },
      {
        title: "One screen, built",
        blocks: [
          {
            kind: "p",
            text:
              "A shopping screen for Alex. Topic `groceries` (accent #4ade80, ground #04241f), one pattern widget on the list, one pen mark, one primary button. Budget: pattern widget 2 plus a pen in the pen look 1 is 3 of 5. The anchor is free, the buttons are free.",
          },
          {
            kind: "code",
            lang: "js",
            text: `h(Topic, { name: "groceries" },
  h(Widget, {
    look: "pattern",
    size: "wide",
    label: "On the list",
    value: "8",
    unit: "things",
    pattern: { kind: "lanes" },
    note: "home-baked"
  }),
  h(Pen, { kind: "bracket", look: "pen" }, "Fruit and vegetables"),
  h(Anchor, null, "for the neighbour"),
  h(ButtonGroup, null,
    h(Button, { variant: "primary" }, "To the shop"),
    h(Button, { variant: "glass" }, "Later today")
  )
)`,
          },
          {
            kind: "ul",
            items: [
              "The widget carries the answer: 8 things, and the pattern is only its ground.",
              "The `Pen` bracket sits over two rows, in the topic colour, never over a label.",
              "The `Anchor` adds the personal fact (\"for the neighbour\") and shares nothing with the widget label or her sentence.",
              "One primary, in the topic accent, flat. The second action is glass.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Colour: a topic has three values, `topic-<name>` for the accent and the pen, `topic-<name>-2` for a second tint used in decoration only, and `topic-<name>-ground` for the ground. Every accent reads on its own ground and on `bg` at 6:1 or more. `health` and `travel` share every value, so they never share a screen.",
          },
        ],
      },
      {
        title: "What a screen never does",
        blocks: [
          {
            kind: "ul",
            items: [
              "Never a gradient or a neon primary button, and never two primaries.",
              "Never two notes and never two pen marks. A second `Anchor` renders as a plain dim line and warns.",
              "Never a mark over a label, and a strike only in a tick list.",
              "Never a `Word` and a pattern hero on one screen.",
              "Never text sitting on a pattern without the frosted panel behind it.",
              "Never an emoji in a widget label.",
              "Never the one break in the header zone or over readable content.",
              "Never an empty black screen: anything that loads shows a `Skeleton` in the shape of what is coming.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "Text behind a person is measured (at least 65% visible, the whole word inside the photo) but the length of a screen's copy is not fixed anywhere. Keep her sentence to one line and let the renderer drop a list row before it drops the hero.",
          },
        ],
      },
    ],
  },

  window: {
    id: "window",
    label: "A window she opens",
    lede:
      "The overlay she lays over the talk for one view: how big it is, what holds its edges, and what never goes inside it.",
    sections: [
      {
        title: "A card or a window",
        blocks: [
          {
            kind: "p",
            text:
              "A `Card` is a group that belongs together inside something that already exists. A window (`window`) is that something: a sandboxed iframe over the talk page, with a view of its own and no access to the page.",
          },
          {
            kind: "table",
            head: ["Surface", "What it is", "Pick it when"],
            rows: [
              ["Block (`block`)", "code she injects above the talk in a glass card", "it should stay in view while you talk: a timer, a photo, a score"],
              ["Page screen (`screen`)", "the talk column rearranged, live parts included", "a different arrangement of the page for a while"],
              ["Window (`window`)", "one view laid over the talk, then gone", "\"show me\": a day plan, a comparison, a quick form"],
              ["App (`app`)", "several views, navigation, its own data (planned)", "you will open it again next week: domains, invoices, a trip"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "If it answers one question now, it is a window. If you would open it again next week, it is an app. Never build an app for something a window answers.",
          },
        ],
      },
      {
        title: "The shape",
        blocks: [
          {
            kind: "ul",
            items: [
              "The overlay is `rgba(7,9,12,.82)` with `blur(18px)`, and it stops at the input bar, so the field and the send button stay reachable.",
              "The frame slides in from the right in `.35s` and is glass with the window radius.",
              "The frame is at most `--window-wide`, default `30rem`. A wide content sheet does not get a wider window; it gets a `Screen` that uses the width it has.",
              "A `Card` inside a block or inside another `Card` loses its frame. There is one frame per window.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "`web-app.md` names the widest window (30rem) and the grip, but no minimum size and no content-size range. Until that is written, treat the frame as one column that folds at the same widths as the talk page.",
          },
        ],
      },
      {
        title: "The title bar",
        blocks: [
          {
            kind: "p",
            text:
              "The root of every window is `Screen`: padding `1.2rem 1.1rem 2rem`, the `sub` line at `.9rem` in `--dim` above an `h1` at `2rem` / 500. The `icon` prop does not go into the window, it goes to the lane.",
          },
          {
            kind: "ul",
            items: [
              "The close cross sits top right at `2rem`, in glass.",
              "The resize grip sits bottom right. It is the only handle on the frame.",
              "In the lane, a window's icon carries a small frame corner, so a window is told apart from a page screen at a glance.",
              "Inside the view, one header per view: title `1.05rem` / 600 on the left, then search, then quiet round icon buttons at `2.2rem` in ghost, and the one primary action last.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "Magnets, meaning a window snapping to an edge or another window, are not in the chapter yet. What is written is the grip, and that the owner moves the frame and pins it to the lane. Do not promise snapping in copy.",
          },
        ],
      },
      {
        title: "What never appears in a window",
        blocks: [
          {
            kind: "ul",
            items: [
              "Never a frame inside a frame. One window, one `Screen`, one overlay at a time.",
              "Never a fixed pixel size. `apps.md` forbids fixed pixel widths above 64px, and the fold answers the frame's width through a container query, never a media query on the screen.",
              "Never `position: fixed`. The chapter does not name it; the rule that covers it is the container query rule, because a part answers the frame and not the screen.",
              "Never a hex colour outside the token list, an own font, `outline: none` or `transition: none`. The style gate rejects the window.",
              "Never a bare `<button>`, a clickable `<div>`, or an own class for what a kit part already does.",
              "Never three filled buttons. One `primary` per view, the rest quiet or `edge`, and buttons sit under what they act on.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Every window is built from the kit parts and rooted in `Screen`. Tokens are asked for by name (`var(--accent)`), and every window renders from the same file, so the same screen can be a window on the web, a page on the phone and a widget on the Mac.",
          },
        ],
      },
      {
        title: "How a window differs from a page",
        blocks: [
          {
            kind: "table",
            head: ["", "Window", "Page screen"],
            rows: [
              ["Frame", "its own glass frame, max 30rem, sliding in from the right", "no frame, it is the column"],
              ["Reach", "sandboxed: no access to the page", "the page itself, with its live parts"],
              ["Leaves by", "`say(text)`, which is how it hands back to the talk", "you move back to the talk"],
              ["Parts", "the kit with `BASE_CSS` and `KIT_CSS`", "every kit rule scoped to `.block` and `.screen`"],
              ["Live page parts", "`Clouds`, `Conversation`, `Widgets`, `Tasks`, `Blocks` print a note", "they move the real part into place"],
            ],
          },
          {
            kind: "note",
            tone: "llm",
            text:
              "For a model writing a window: root it in `Screen`, put one `primary` action in it, show the result next to the button, use `Icon` for icons and tokens for colour. Sentence case, short, no dashes and no exclamation marks. The product is \"Iris\".",
          },
        ],
      },
    ],
  },

  loop: {
    id: "loop",
    label: "A loop",
    lede:
      "One thing that comes back: the six phases, the ring that shows them, and what the person can do while it runs.",
    sections: [
      {
        title: "The six phases",
        blocks: [
          {
            kind: "p",
            text:
              "Phase names and colours are fixed and do not follow the topic. Every label reads on `bg` at 7:1 or more. The code key for the first phase is `seen`, and the words themselves and the numbers 0 to 5 work too.",
          },
          {
            kind: "table",
            head: ["Phase", "Colour", "Means", "What you can do"],
            rows: [
              ["`recognised` (`seen`)", "#a78bfa", "she saw it", "nothing yet; correct her if she read it wrong"],
              ["`planned`", "#7dd3fc", "she has a plan", "read the plan, change when it runs"],
              ["`busy`", "#2ee6d6", "she is doing it", "wait, or stop it"],
              ["`you`", "#f0abfc", "waiting on you", "answer, choose, confirm: the loop cannot move on without you"],
              ["`check`", "#fbbf24", "she checks the result", "nothing; she compares what came back with what she promised"],
              ["`done`", "#4ade80", "done", "read the result, or start it again"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "The phase colours are the only place these six values appear. `phase-track` #1e2a3a is the unspent part of the current phase, `phase-rest` #2a323d is a phase still to come, and `phase-grain` #e0f2fe is the grain that falls into the current phase.",
          },
        ],
      },
      {
        title: "The ring",
        blocks: [
          {
            kind: "ul",
            items: [
              "`PhaseRing` draws the six phases around a ring, each in its own colour, with mono labels that read on `bg` at 7:1 or more.",
              "The current phase runs as an hourglass. The whole segment sits soft in `phase-track`; the sand, bright with a glow, piles up at the end of the segment and grows back toward its start as `progress` rises. A white dot marks the edge of the sand and a grain falls from the start to that edge, speeding up.",
              "Earlier phases stay full colour at 80%. Later ones are grey in `phase-rest`.",
              "Done lights all six and throws confetti once. Under reduced motion there is no confetti.",
              "`labels` puts the six names round the ring, and `pen` draws a hand-drawn circle round the current one.",
              "`center` fills the middle: `none`, `glass`, `pattern` (lanes in green and grey) or `word`.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Still means the end state. Under reduced motion, or in a screenshot, the ring is drawn once at its end state with no grain, never half animated.",
          },
        ],
      },
      {
        title: "The loop screen",
        blocks: [
          {
            kind: "p",
            text:
              "One loop in detail is a `LoopScreen`, top to bottom: a `PhaseRing` at 268px with its labels, the eyebrow (`when`) in mono caps, the title in a gradient toward the phase colour, and the `sub` line. Then a hand-drawn `Pen` circle round the current label (the screen's one pen mark, and `pen={false}` leaves it out), a glass NOW card at 20px radius with the phase word, the `now` text and a dot per phase, and the two buttons: Done in glass, In Loops in ghost. Vertical `PageDots` on the right carry the active streak from this phase's colour to the next.",
          },
          {
            kind: "p",
            text:
              "The recipe is `{title, when, sub, phase, progress, now, center, pen}`. Busy cost: ring 2 plus pen 1, plus confetti 1 at done.",
          },
        ],
      },
      {
        title: "What the middle shows",
        blocks: [
          {
            kind: "p",
            text:
              "The middle of the ring is text only, or one of three fills. Pick one and count it in the busy budget.",
          },
          {
            kind: "table",
            head: ["Middle", "What it is", "Cost"],
            rows: [
              ["`none`", "the ring and its labels only", "0"],
              ["`glass`", "a frosted disc", "0"],
              ["`pattern`", "lanes in green and grey", "2"],
              ["`word`", "the title as a `ThemeWord`, theme `frozen` by default", "3, and then no pen"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "A `ThemeWord` middle is `Word` with a theme set, so it costs 3 of 5, and with a `Word` on the screen only 2 points are left. The same contrast guard holds: every letter colour is lifted until it reaches 4.5:1 on its ground.",
          },
        ],
      },
      {
        title: "Waiting on you is the loud one",
        blocks: [
          {
            kind: "p",
            text:
              "Five of the six phases are her working. `you` (#f0abfc) is the phase where nothing moves until the person acts: the loop cannot reach `check` without an answer, a choice or a confirmation. That is why the current phase carries a pen circle round its label, why the NOW card shows the phase word and the `now` text, and why the page dots take their streak from this phase's colour to the next.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The chapter does not fix how loudly a waiting loop may interrupt. Nothing beyond the phase colour, the pen circle and the NOW card is specified, so do not add a badge, a sound or a repeat on your own.",
          },
        ],
      },
      {
        title: "When a loop is missed",
        blocks: [
          {
            kind: "p",
            text:
              "What is written: a loop has a schedule (\"Every workday 07:30\"), a switch, and it lives under Loops with chips (All, Loops, Chats, Questions). A loop she runs can feed a screen, for example a price alarm that feeds Compare.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "There is no rule yet for a skipped or missed run: no catch-up copy, no state, no colour. This page says so rather than guessing. Until it is written, a missed loop is silent, and the next run is the next run.",
          },
        ],
      },
    ],
  },

  apps: {
    id: "apps",
    label: "An app she builds",
    lede:
      "Several views, a way to move between them, its own data that is there tomorrow, and a shape that works in a small window, a full browser and a phone.",
    sections: [
      {
        title: "Pick the smallest surface that holds it",
        blocks: [
          {
            kind: "p",
            text:
              "A screen is one view with no navigation, gone when closed. An app adds views, navigation and data. If you would open it again next week, it is an app. If it answers one question now, it is a window.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "Status: the surfaces up to phone screen exist in the kit today. The App surface and the kit parts marked planned in `apps.md` are the design, to be built next.",
          },
        ],
      },
      {
        title: "The nine layouts",
        blocks: [
          {
            kind: "table",
            head: ["Layout", "Use it when", "Parts"],
            rows: [
              [
                "Sidebar app",
                "3 to 7 places, and they are places and not angles: mail, notes, a domain radar",
                "`App`, `Sidebar` + `NavItem`, `View`, `Header`",
              ],
              [
                "List and detail",
                "a collection you open one of: mail, notes, contacts, orders",
                "`App`, `Split` (list, detail, empty), `Header`",
              ],
              [
                "Tabs",
                "one subject seen from 2 to 5 angles: a trip, a person, a project",
                "`App`, `Tabs` + `Tab`, `View`, `Header`",
              ],
              [
                "Dashboard",
                "\"how is it going\" at a glance: a house, a shop, a campaign",
                "`App`, `Header`, `Stat`, `Card`",
              ],
              [
                "Board",
                "work that moves through stages: jobs, a hiring pipeline, a content calendar",
                "`App`, `Board` + `Column`, `Header`",
              ],
              [
                "Flow",
                "anything with an end: book, sign up, set up a plugin, file a claim",
                "`App`, `Steps` + `Step`, `Field`, `Choice`, `ButtonGroup`",
              ],
              [
                "Document",
                "long text: a plan, notes, a report she wrote",
                "`App`, `Inspector`, `Header`",
              ],
              [
                "Table",
                "records you scan, sort and filter: invoices, orders, domains, contacts",
                "`App`, `Table`, `Header` (search), `Chip`, `StatusPill`",
              ],
              [
                "Widget pages",
                "the phone's home: pages of widgets, one theme per page",
                "`WidgetPages` + `Page`, `Widget`, `PageDots`",
              ],
            ],
          },
          {
            kind: "p",
            text:
              "Layouts nest. A sidebar app whose \"Invoices\" place is a table, whose row opens a document. The outer shape decides the navigation; the inner one only its own view.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "If the tabs are unrelated places, it is a sidebar app instead. One kind of navigation per app, and never two navigation bars at once.",
          },
        ],
      },
      {
        title: "What they share",
        blocks: [
          {
            kind: "ul",
            items: [
              "Frame: the kit window, glass, radius 1rem, resizable. The owner moves it, resizes it and pins it to the lane. On a phone it is full-bleed.",
              "Navigation: one kind per app. Sidebar for places, tabs for angles on one subject, a back chevron for going deeper.",
              "Header: one per view, `3.4rem` high, a `--line` hairline under it. Title `1.05rem` / 600 on the left, then search, then quiet round icon buttons at `2.2rem` in ghost, and the one primary action last.",
              "View: padding `1.1rem`, parts `1.3rem` apart, cards from the kit. The view scrolls, the header does not.",
              "Overlays: a sheet or dialog, one at a time.",
              "Data: an app remembers its last view, tab, scroll place and half-filled form per owner, and shows a `Skeleton` in the shape of the view while live data loads.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "When a command fails, the error sits next to the thing that failed: \"That didn't work. Try again in a moment.\" It also goes to Iris on its own, with the request, so she fixes it before you notice.",
          },
        ],
      },
      {
        title: "Folding: the frame decides, not the screen",
        blocks: [
          {
            kind: "p",
            text:
              "An app lives in a window you can make any size, so every rule uses a container query on the frame, never a media query on the screen.",
          },
          {
            kind: "table",
            head: ["Width of the frame", "What changes"],
            rows: [
              [
                "Below `40rem`",
                "phone shape: the sidebar and the tabs become the bottom tab bar, list and detail become two screens, tables stack into a two-line row, each board column is 85% of the width and the board snaps sideways, the dashboard drops to one column",
              ],
              [
                "`40rem` to `52rem`",
                "the dashboard is 2 columns, and the document inspector floats over the text instead of squeezing it",
              ],
              ["Above `52rem`", "everything sits side by side, and the dashboard is 4 columns"],
              [
                "The phone itself",
                "full-bleed: no chrome, the app fills the screen, and pages of widgets are swiped with a dot rail",
              ],
            ],
          },
          {
            kind: "ul",
            items: [
              "The bottom bar is the app's `TabBar` look: a glass capsule, the current tab in the accent tint, `.6rem` from the edges. More than five sections and the fifth tab is \"More\".",
              "Views reserve `5rem` at the bottom so nothing hides under the bar.",
              "Past 50 rows a table loads more on scroll, never numbered pages.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "`apps.md` fixes three frame widths. `web-app.md` names 46rem, 71.99rem and 90rem, but those belong to the talk page, not to an app frame. Do not mix the two sets.",
          },
        ],
      },
      {
        title: "It uses the system's own controls",
        blocks: [
          {
            kind: "p",
            text:
              "An app never brings its own controls. It uses `ButtonGroup`, `Field`, `Choice`, `Toggle`, `Chip`, `Segmented`, `Stat`, `CheckList`, `Card`, `Row`, `TabBar`, `PageDots`, `StatusPill`, `Skeleton` and `Empty`. A plugin that ships its own buttons leaves the look and the keyboard behaviour behind.",
          },
          {
            kind: "table",
            head: ["Do", "Don't"],
            rows: [
              ["build every view from the kit parts", "a bare `<button>` or a clickable `<div>`"],
              ["fold by the window's width", "assume the screen size, or a fixed pixel width above 64px"],
              ["one primary action last in the header, one per view", "a row of filled buttons"],
              ["colour for state: on, late, low", "colour for decoration, or a second accent"],
              ["an empty state with the first action", "a blank pane, or a spinner that never ends"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "In an app colour carries state and may fill a whole tile: a lamp that is on is warm (`#fbbf24`), energy made is green (`--ok`), a battery under 20% amber (`--wait`), a late invoice red (`--error`). What is off or neutral stays glass. Media keeps its own colour.",
          },
        ],
      },
    ],
  },

  search: {
    id: "search",
    label: "Search and finding",
    lede:
      "Where the field sits, what it shows while it waits, what an empty result says, and how filtering differs from asking the house.",
    sections: [
      {
        title: "Where the field sits",
        blocks: [
          {
            kind: "p",
            text:
              "The field lives in the view's header, between the title and the quiet icon buttons. The `Header` part takes `search` and `actions`; only one search field per view.",
          },
          {
            kind: "table",
            head: ["Surface", "Where the field sits"],
            rows: [
              ["An app view", "in the header: title `1.05rem` / 600 left, then search, then round ghost icon buttons at `2.2rem`, then the one primary action"],
              ["A table app", "one search field under the header, with the filter chips beside it"],
              ["The talk page", "the input bar at the bottom: the field is a textarea dressed as a pill, radius `1.45rem`, padding `.85rem 1.15rem`, growing to `33vh`"],
            ],
          },
          {
            kind: "ul",
            items: [
              "The field is a `Field`: the pill input, glass, with the caret and the focus edge in the topic colour.",
              "The placeholder says what to type, in sentence case, with no full stop.",
              "On the web input bar the focus edge is `--accent-line` and the focus ring is 2px in the accent with a 2px offset.",
            ],
          },
        ],
      },
      {
        title: "While it waits",
        blocks: [
          {
            kind: "p",
            text:
              "Waiting shows a `Skeleton` in the shape of what is coming: glass blocks with a sheen, never a spinner on an empty black screen. `Skeleton screen` draws a whole window (title line, big card, two rows) and the plain one draws a row in place.",
          },
          {
            kind: "ul",
            items: [
              "A view that loads live data shows the skeleton in the shape of the view, so the layout does not jump when the rows arrive.",
              "The button that started it gets a busy spinner while the promise runs.",
              "Search does not get its own spinner in the field. The list below it holds the skeleton.",
            ],
          },
        ],
      },
      {
        title: "An empty result",
        blocks: [
          {
            kind: "p",
            text:
              "Every list, table and board has an empty state that says what goes there and how to add the first one. Never a blank pane.",
          },
          {
            kind: "ul",
            items: [
              "A list and detail with nothing picked shows an empty state that says what to pick, never a blank pane.",
              "An empty board column says what belongs there, in `--dim`.",
              "A failed command is not an empty result: it says \"That didn't work. Try again in a moment.\" next to the thing that failed.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "There is no written copy yet for \"nothing found\" that is separate from \"nothing here yet\". Those are two different messages and the system only writes the second one. Say what was searched for, and offer the wider search.",
          },
        ],
      },
      {
        title: "Filtering a list or searching a house",
        blocks: [
          {
            kind: "p",
            text:
              "These are different actions and they look different. Filtering narrows what is already in front of you. Searching a house asks for something that is not on screen yet.",
          },
          {
            kind: "table",
            head: ["", "Filter", "Search"],
            rows: [
              ["What it does", "narrows the rows already loaded", "asks the house for something that is not here"],
              ["The control", "`Chip` for one choice among a few; more than five, a `Segmented` or a list", "a `Field` in the header, or the talk field itself"],
              ["Where the result goes", "the same list, fewer rows", "a screen, a window, or an answer in the talk"],
              ["While it runs", "no waiting: the rows are local", "a `Skeleton` in the shape of the answer, then the real thing"],
              ["Colour", "the chosen chip is filled with the topic colour and `--kd` ink", "the field keeps the topic caret; the answer brings its own topic"],
            ],
          },
          {
            kind: "p",
            text:
              "Searching the house is a question to Iris, not a query against a table. The way out of a window is `say(text)`: it sends a sentence as if you said it. That is also how a search for something the app does not hold becomes a screen.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "One search field per view. Not a field in the header and a field in the table at the same time. When the count matters, show it under the table: \"2 of 4 invoices\".",
          },
        ],
      },
      {
        title: "The keyboard",
        blocks: [
          {
            kind: "note",
            tone: "warn",
            text:
              "The system has no keyboard rules written yet: no shortcut to reach the field, no `/` or `Cmd+K`, no Escape behaviour, no arrow keys in the results, and no rule for where focus returns after a search. What is written is the focus ring (2px in the accent, 2px offset) and the topic focus edge on a `Field`. Write the rest down before you rely on it.",
          },
          {
            kind: "ul",
            items: [
              "Tab order follows the view: title, search, quiet icons, the primary action last.",
              "Every action is a real control from the kit, so it is reachable and clickable by keyboard without extra work.",
            ],
          },
        ],
      },
      {
        title: "No bar of its own",
        blocks: [
          {
            kind: "p",
            text:
              "Iris has no full-screen search and no search bar of its own: the field is a `Field` in the header of the view, or the talk field at the bottom of the page.",
          },
          {
            kind: "p",
            text:
              "The height comes from the pill padding rather than a fixed 56px, and suggestions are rows in the list below the field, not an overlay.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "The reason is the house: one accent, glass, near-black, and no control that looks like a second system. A search bar with its own elevation and its own radius would be exactly that.",
          },
        ],
      },
    ],
  },
};
