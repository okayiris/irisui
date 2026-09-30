// Per-component guidance for the app layouts, the showcases and the Mac pill.
// Numbers come from the previews under src/content/components/<Name>/, from src/content/apps.md
// and from public/ds/tokens.css; the chapter is the source for anything the previews do not show.

import type { Override } from "../content";

/** Every app layout preview shares one frame. */
const FRAME = { label: "Frame (window / phone)", value: "60rem x 31rem, radius 1rem / 23.5rem x 36rem, radius 1.6rem" };

export const OVERRIDES_APPS: Record<string, Override> = {
  boardapp: {
    when: "Work that moves through stages: jobs, a hiring pipeline, a content calendar.",
    parts: [
      { name: "board", what: "The view itself: a grid of columns, scrolls on its own." },
      { name: "bcol / bhead", what: "One column and its head, a mono label with the count of cards." },
      { name: "bcard", what: "One card: a title and at most one pill (who, or when). A button." },
      { name: "head", what: "The app header: title, then the one primary action (New job)." },
    ],
    rules: [
      { do: "Three to five columns, each for one stage.", dont: "A board is not a table: no sortable columns, no amounts, no rows to scan. That is Table app." },
      { do: "Drag a card between columns, with an accent line where it lands; a click opens the card.", dont: "Do not put more than one pill on a card." },
      { do: "An empty column says what belongs there, in --dim.", dont: "Do not hide an empty column." },
      { do: "Let colour carry state; what is off or neutral stays glass." },
    ],
    specs: [
      FRAME,
      { label: "Columns, wide", value: "repeat(3, minmax(14rem, 1fr)), gap .9rem, view padding 1.1rem" },
      { label: "Below 40rem", value: "columns 85% wide, scroll-snap-type x mandatory, view padding-bottom 5rem" },
      { label: "Column head", value: "mono 11px caps, --faint, name left and count right" },
    ],
    a11y: [
      "Each card is a button, so its title is the name a screen reader hears and the keyboard can open it.",
      "The drag grip is decoration: give the move action a real control that a keyboard reaches.",
      "Column name and count are text, so the stage is announced before the cards in it.",
    ],
    related: ["tableapp", "listdetailapp", "dashboardapp", "surfaces", "apps"],
  },

  dashboardapp: {
    when: "A page of tiles that answers how it is going at a glance: a house, a shop, a campaign.",
    parts: [
      { name: "dash", what: "The grid that holds the tiles." },
      { name: "tile", what: "A card with one number and one word (Stat), padding .75rem .85rem." },
      { name: "wide", what: "A card that spans 3 columns: the one chart, bars with an axis in mono." },
      { name: "wide2", what: "A card that spans 1 column: what needs attention, as rows that open." },
    ],
    rules: [
      { do: "Order: numbers, then one chart, then what needs attention. Summary before detail." },
      { do: "One series per chart in the accent; the latest bar is the bright one.", dont: "No second accent, and no chart for a single number." },
      { do: "Every tile opens what is behind it; the owner can move and resize tiles." },
      { do: "Status is a pill (ok, wait, bad), never the accent." },
    ],
    specs: [
      FRAME,
      { label: "Grid, wide", value: "repeat(4, minmax(0, 1fr)), gap .6rem" },
      { label: "Spans", value: ".wide spans 3, .wide2 spans 1" },
      { label: "Number", value: "1.4rem / 500, tabular digits" },
      { label: "Chart", value: "bars 7rem high, 2px gap, axis 11px mono --faint" },
      { label: "Below 52rem", value: "2 columns, both wide cards span 2" },
      { label: "Phone", value: "1 column" },
    ],
    a11y: [
      "The DOM order is numbers, chart, needs-you, so a screen reader reads the summary first.",
      "A tile that opens something is a control, not a card with a click handler.",
      "Give every bar a name (a title or an aria-label with its value and unit).",
    ],
    related: ["sidebarapp", "tableapp", "widgetpagesapp", "surfaces", "apps"],
  },

  documentapp: {
    when: "Long text: a plan, notes, a report she wrote.",
    parts: [
      { name: "side", what: "The notes list on the left, 12rem in the preview." },
      { name: "doc", what: "The reading column: mono Updated line, title, body." },
      { name: "head", what: "The toolbar: title, then quiet round icon buttons, the info one last." },
      { name: "insp", what: "The inspector on the right: created, by, tag (15rem)." },
    ],
    rules: [
      { do: "The column is 40rem at most and centred; a wide window gets more air, never longer lines.", dont: "Do not stretch the text to the window." },
      { do: "Put Updated 11:34 in mono above the title, so it is clear when she last touched it." },
      { do: "One toolbar of quiet icon buttons; the info button toggles the inspector.", dont: "Do not put a row of filled buttons in the document header." },
      { do: "Below 52rem the inspector floats as a glass panel over the text instead of squeezing it; below 40rem the notes list becomes the bottom bar." },
    ],
    specs: [
      FRAME,
      { label: "Column", value: "max-width 40rem, centred, padding 1.6rem 1.4rem 5rem" },
      { label: "Title / body", value: "h1 2rem / 500, body line-height 1.6, subheads 1.05rem / 600" },
      { label: "Inspector", value: "15rem, border-left 1px --line, padding 1rem" },
      { label: "Below 52rem", value: "inspector absolute, right .6rem, top 3.8rem, bottom .6rem, radius 1rem, rgba(12,17,23,.94), blur 18px" },
    ],
    a11y: [
      "The toolbar buttons are icon-only, so each needs an aria-label (Edit, Share, Details).",
      "The inspector is a region with a label, after the article in the DOM, so it is reachable but does not interrupt reading.",
      "The mono Updated line is before the title, so a screen reader gets the age of the text first.",
    ],
    related: ["listdetailapp", "sidebarapp", "tableapp", "effects", "apps"],
  },

  flowapp: {
    when: "Anything with an end: book, sign up, set up a plugin, file a claim.",
    parts: [
      { name: "prog", what: "The progress line of equal segments on top." },
      { name: "head", what: "Back chevron, title, and n of m in mono." },
      { name: "flow / question", what: "The reading column with one question in 1.4rem / 500." },
      { name: "choices", what: "Outlined pills that fill when chosen, or one field." },
      { name: "foot", what: "Back and Continue at the bottom right, primary last." },
    ],
    rules: [
      { do: "One question per step, for anything with a clear end.", dont: "A flow is not a form: do not stack ten fields in one view." },
      { do: "The last step shows a summary and the real verb (Book, Pay, Send).", dont: "Never Finish, never Done." },
      { do: "Nothing is sent before the last step; leaving halfway keeps the answers." },
      { do: "On a phone Back and Continue share the width." },
    ],
    specs: [
      FRAME,
      { label: "Progress line", value: "segments 3px high, radius 2px, gap .3rem, padding .7rem 1.1rem 0" },
      { label: "Question column", value: "max-width 30rem, centred, padding-top 2rem" },
      { label: "Choices", value: "pills radius 999px, padding .45rem .9rem, 1px rgba(125,211,252,.45), filled accent when chosen" },
      { label: "Foot", value: "justify flex-end, gap .5rem, border-top 1px --line, padding .8rem 1.1rem" },
      { label: "Below 40rem", value: "foot buttons flex 1" },
    ],
    a11y: [
      "The back chevron and Back are the same action; the chevron needs aria-label Back and disabled on step one.",
      "n of m is text, so the position in the flow is announced.",
      "The chosen pill is pressed state (aria-pressed or a radio group), not colour alone.",
    ],
    related: ["documentapp", "window", "phone", "surfaces", "apps"],
  },

  listdetailapp: {
    when: "A collection you open one of: mail, notes, contacts, orders.",
    parts: [
      { name: "ld / ld-list", what: "The list on the left, 19rem wide, with its own header." },
      { name: "ld-item", what: "One item: bold first line, time right, --dim preview cut with an ellipsis." },
      { name: "ld-detail", what: "The chosen item, with its own header and a back button." },
      { name: "body", what: "The detail content, then its actions, the primary one first." },
    ],
    rules: [
      { do: "Unread gets an accent dot, never bold colour.", dont: "Do not colour the whole row for state." },
      { do: "The detail has its own header with quiet icon buttons; the actions sit under the content, primary first.", dont: "Do not reuse the list header for the detail." },
      { do: "Nothing picked yet: the detail shows an empty state that says what to pick.", dont: "Never a blank pane." },
      { do: "Below 40rem it becomes two screens: the list fills the window, picking an item slides the detail in with a back chevron; back returns to the same scroll place." },
    ],
    specs: [
      FRAME,
      { label: "List", value: "19rem, border-right 1px --line, items padding .4rem, gap .15rem" },
      { label: "Item", value: "padding .6rem .7rem, radius .7rem, current tint rgba(125,211,252,.14)" },
      { label: "Unread dot", value: ".45rem accent circle before the name" },
      { label: "Detail text", value: "max-width 34rem" },
      { label: "Below 40rem", value: "list width 100%, border 0; detail hidden until open; back button shown" },
    ],
    a11y: [
      "Each item is a button; the current one carries aria-current, so the selection is announced.",
      "The back chevron needs aria-label Back and returns focus to the item it came from.",
      "Announce the detail header on open, so a screen reader knows the view changed.",
    ],
    related: ["sidebarapp", "tableapp", "documentapp", "phone", "apps"],
  },

  sidebarapp: {
    when: "Sections in a sidebar on the left, one view at a time: the default shape for an app with 3 to 7 places.",
    parts: [
      { name: "side", what: "The sidebar: a brand line, then the nav items." },
      { name: "nav", what: "One place. Icon, name, count in mono on the right; current gets the accent tint and an accent icon." },
      { name: "head", what: "The view header: title, then search, then quiet icon buttons, primary last." },
      { name: "body", what: "The one view, padded 1.1rem, parts 1.3rem apart; it scrolls, the header does not." },
      { name: "tabbar", what: "The same sections as a bottom bar on a phone." },
    ],
    rules: [
      { do: "One navigation per app, the same in every view.", dont: "A sidebar is not a tab bar: tabs are for angles on one subject (Tabs app)." },
      { do: "Below 40rem of window width, a container query, the sidebar leaves and the same sections become the bottom tab bar.", dont: "Do not key this to the screen size with a media query." },
      { do: "More than five sections: the fifth tab is More." },
      { do: "The app remembers the last section per owner." },
    ],
    specs: [
      FRAME,
      { label: "Sidebar", value: "13rem, padding .9rem .6rem, gap .15rem, border-right 1px --line" },
      { label: "Nav item", value: "padding .45rem .6rem, radius .7rem, .88rem, count 11px mono --faint" },
      { label: "Current item", value: "rgba(125,211,252,.14) fill, icon --accent" },
      { label: "Header", value: "min-height 3.4rem, padding .8rem 1.1rem, border-bottom 1px --line, title 1.05rem / 600" },
      { label: "View", value: "padding 1.1rem, gap 1.3rem" },
      { label: "Tab bar", value: "left/right/bottom .6rem, height 3.6rem, padding .3rem, radius 999px, rgba(20,26,34,.82), blur 20px" },
      { label: "Phone", value: "view padding-bottom 5rem so nothing hides under the bar" },
    ],
    a11y: [
      "The sidebar is a nav landmark with an accessible name; the current place carries aria-current.",
      "Tab order is sidebar, then header, then the view: keep the DOM in that order.",
      "In the phone shape the tab bar is the same nav, so the names must not change between shapes.",
    ],
    related: ["listdetailapp", "tabsapp", "tableapp", "documentapp", "apps"],
  },

  tableapp: {
    when: "Records you scan, sort and filter: invoices, orders, domains, contacts.",
    parts: [
      { name: "head", what: "Title, quiet export, then the primary action." },
      { name: "tools", what: "One search field and the filter chips, outlined and tinted when chosen." },
      { name: "table", what: "thead in 11px mono caps, one row per record." },
      { name: "count", what: "The line under the table: 2 of 4 invoices." },
    ],
    rules: [
      { do: "The whole row is the button, so opening a record needs no chevron hunting.", dont: "A table is not a board: no stages to drag between." },
      { do: "Status as a pill (ok, wait, bad), never the accent; amounts right-aligned in tabular digits.", dont: "Never use the accent for status." },
      { do: "Past 50 rows: load more on scroll.", dont: "No numbered pages." },
      { do: "Below 40rem each row is a two-line stack: name and amount on top, number and status under it." },
    ],
    specs: [
      FRAME,
      { label: "Header / tools", value: "header padding .8rem 1.1rem; tools padding .8rem 1.1rem, gap .5rem" },
      { label: "Head cells", value: "500 11px mono, letter-spacing .1em, caps, --faint, padding .5rem .6rem" },
      { label: "Body cells", value: "padding .65rem .6rem, border-bottom 1px --line" },
      { label: "Chips", value: "radius 999px, padding .3rem .8rem, chosen: rgba(125,211,252,.12) fill, accent text" },
      { label: "Below 40rem", value: "thead hidden, row grid 1fr auto, date and chevron cells hidden, search on its own row" },
    ],
    a11y: [
      "A focusable row must announce itself: tabindex on the row plus a role that a screen reader can act on, or a real button in the first cell.",
      "The count line is text, so how much is shown and how much exists are both read.",
      "Sortable headers are buttons and carry aria-sort; the chips are a group with the chosen state.",
    ],
    related: ["listdetailapp", "boardapp", "dashboardapp", "search", "apps"],
  },

  tabsapp: {
    when: "One subject seen from two to five angles: a trip, a person, a project.",
    parts: [
      { name: "head", what: "The subject title with its sub line, no border under it in the preview." },
      { name: "tabs", what: "The tab row: words, the current one with a 2px accent underline." },
      { name: "body", what: "The view of the current tab." },
      { name: "tabbar", what: "On a phone the same tabs as icons in the bottom bar." },
    ],
    rules: [
      { do: "Tabs sit under the title as words with a 2px accent underline on the current one.", dont: "No pills, and no icons on the tabs on a wide window." },
      { do: "Every tab is a view of the same subject.", dont: "If the tabs are unrelated places, it is a Sidebar app instead." },
      { do: "A tab keeps its own scroll place and state; a half-filled checklist stays checked." },
      { do: "Below 40rem the tabs move to the bottom tab bar with icons." },
    ],
    specs: [
      FRAME,
      { label: "Tab row", value: "gap 1.1rem, padding 0 1.1rem, border-bottom 1px --line" },
      { label: "Tab", value: "padding .6rem 0, .9rem, --dim; current --fg with border-bottom 2px --accent, margin-bottom -1px" },
      { label: "Phone tab", value: "icon 20px above the name, bar height 3.6rem" },
    ],
    a11y: [
      "The tab row is a tablist: each tab is selected state, with the panel as its target.",
      "Arrow keys should move between tabs; do not make them plain links.",
      "The current tab carries aria-current so both shapes announce the same thing.",
    ],
    related: ["sidebarapp", "listdetailapp", "widgetpagesapp", "apps"],
  },

  widgetpagesapp: {
    when: "The phone home: pages of widgets, one theme per page, swiped with a dot rail.",
    parts: [
      { name: "wpages", what: "All pages together; columns side by side in a wide window, one block on a phone." },
      { name: "wpage / whead", what: "One page: its theme title with a sub line, then the grid." },
      { name: "wgrid / w", what: "A 2-column grid of widgets; a widget is a tile (one number, one word)." },
      { name: "w.span", what: "A widget that spans both columns: a list, a player, a chart, a map." },
      { name: "wdots / wdot", what: "The dot rail; the current dot stretches into a pill." },
    ],
    rules: [
      { do: "Colour here is state, not decoration: a lamp that is on is a warm fill (#fbbf24), energy made is green, a battery under 20% is amber, today is red.", dont: "What is off or neutral stays glass; never decorate with the accent." },
      { do: "Every widget is a control or opens its app: tick a reminder, turn the lamp off, nudge the thermostat by half a degree, start a scene." },
      { do: "Pages snap; the order of pages is the owner's (drag the dots)." },
      { do: "A wide window shows the pages as columns instead of a swipe." },
    ],
    specs: [
      FRAME,
      { label: "Pages, wide", value: "grid repeat(3, minmax(0,1fr)), gap 1.1rem, padding 1.1rem" },
      { label: "Grid", value: "grid-template-columns 1fr 1fr, gap .5rem" },
      { label: "Widget", value: "radius .9rem, padding .7rem, min-height 7rem" },
      { label: "Number in a widget", value: "min(1.9rem, 30cqi), tabular digits" },
      { label: "Below 40rem", value: "one block, scroll-snap-type y mandatory, page min-height 100%, dot rail column at right .35rem, current dot 1rem tall" },
      { label: "Container tweaks", value: "below 8.5rem the row wraps; below 17rem the scenes become 2 columns" },
    ],
    a11y: [
      "A widget that changes something is a button (tick, lamp, scene); the number alone is not interactive.",
      "Each page has a heading, so a screen reader can tell the themes apart.",
      "The dots are labelled buttons (Today, Home, Movement), not decoration.",
      "State fills (lamp on, battery low) need a text or icon answer as well, never colour alone.",
    ],
    related: ["widgetgallery", "widgetscreens", "widgetdata", "sidebarapp", "widget", "pagedots", "phone"],
  },

  surfaces: {
    when: "Choosing where something she built lands, from a line in the chat to a full app.",
    parts: [
      { name: "sf", what: "The grid of six surfaces, smallest to largest." },
      { name: "card", what: "One surface: a small shape diagram, its name, its command, what it is and an example." },
    ],
    rules: [
      { do: "Pick the smallest surface that holds it: block, Stat, window, screen, device, app.", dont: "Never build an app for something a window answers." },
      { do: "If he would open it again next week, it is an app; if it answers one question now, it is a window." },
      { do: "The App surface is planned, not in the kit yet." },
    ],
    specs: [
      { label: "Grid", value: "repeat(3, minmax(0,1fr)), gap 1.3rem; 1 column below 40rem" },
      { label: "Card", value: "radius .9rem, padding .9rem 1rem, name 1.05rem / 600, command 11px mono --faint" },
      { label: "Diagram", value: "6.5rem high, radius .7rem" },
      { label: "Commands", value: "block, Stat, window, screen, device, app" },
    ],
    a11y: [
      "The diagram is decoration: it must not be the only thing that says which surface this is.",
      "Each card names its command in text, so the surface can be picked without reading the picture.",
    ],
    related: ["apps", "window", "phone", "webkit", "dashboardapp"],
  },

  effects: {
    when: "Drawing attention: her LED edges, a neon line, a waiting question, the tour ring, pointing, pen marks.",
    parts: [
      { name: "led", what: "Her LED edge patterns on a rounded rectangle (POST /edge): comet, breathe, orbit, sparks, wave, flow, heartbeat, zip, aurora, fire, storm, party." },
      { name: "refresh", what: "The neon refresh line: 2px, a violet to blue to magenta gradient that grows, then loops." },
      { name: "strip", what: "A waiting question: a 2px angular-gradient border turning 90 degrees a second." },
      { name: "tour", what: "The tour ring round the thing being explained: 2px, radius 16, violet pulsing to cyan." },
      { name: "bar / tabs", what: "Ice neon for on and here: #2ee6d6 icon on a 16% disc, and the active tab icon glowing in the accent." },
      { name: "finger / loop", what: "Her finger glides to the thing, then the hand-drawn loop (POST /device/do)." },
      { name: "pen", what: "Pen marks in the neon look (circle, check, underline, mark, arrow, star)." },
    ],
    rules: [
      { do: "One accent of attention at a time: the ring already says she talks, so no second effect then." },
      { do: "Violet is only for on (toggles) and the ring.", dont: "Never red: red means destructive only." },
      { do: "Turn the motion off under prefers-reduced-motion: the preview sets animation none and holds a still frame." },
    ],
    specs: [
      { label: "LED box", value: "150 x 96, radius 22, drawn at 2x; stroke 5, glow 6, up to 18 for lightning" },
      { label: "Refresh line", value: "height 2px, gradient #8b5cf6 to #3b82f6 to #c026d3, grows in, then loops" },
      { label: "Waiting question", value: "2px angular gradient border, turn 4s, glow radius 10" },
      { label: "Tour", value: "ring 2px, radius 16, pulse 2.2s between violet and cyan" },
      { label: "Ice neon", value: "#2ee6d6 icon on a 16% disc; active tab icon glows accent .75" },
      { label: "Finger and loop", value: "finger 40px, two hand-drawn polylines 3.4px and 2px, gradient #8b5cf6 to #22d3ee to #c026d3" },
      { label: "Motion tokens", value: "--motion-fast .14s, --motion-base .2s, --motion-slow .32s, all .001s under reduced motion" },
    ],
    a11y: [
      "An effect marks something that already exists in the DOM; it must add no focusable element of its own.",
      "Under prefers-reduced-motion the still frame must still show which thing is meant.",
      "A moving edge is never the only signal of state: give the state a word or an icon too.",
    ],
    related: ["macpill", "tabbar", "pen", "widgetscreens", "motion"],
  },

  webkit: {
    when: "The web UI parts inside a topic: Chip, Progress, Stat, CheckList, Segmented, Field.",
    parts: [
      { name: "Topic", what: "The wrapper that sets --k and --kd for everything inside it." },
      { name: "Chip", what: "A pill filter or choice; on fills it with the topic colour and --kd ink." },
      { name: "Progress", what: "A bar by default; ring with centre and caption like a ring widget." },
      { name: "Stat", what: "One number, one word, the number in the topic colour." },
      { name: "CheckList", what: "Strings get tick circles; [time, text] pairs get the time in the topic colour. done is a count or indexes, onToggle makes rows tickable." },
      { name: "Segmented", what: "Tabs inside a card; the active one tinted 14%." },
      { name: "Field", what: "The pill input; caret and focus edge in the topic colour." },
    ],
    rules: [
      { do: "One topic per screen, and the same topic colours as that topic's Widget, so a window matches the phone." },
      { do: "The topic colour is for what matters; the primary button stays flat in the topic (ButtonGroup).", dont: "Never the topic colour for body text." },
      { do: "Every part takes an optional topic, and it wins over the surrounding Topic.", dont: "Without either, do not invent a colour: it is the ice accent." },
    ],
    specs: [
      { label: "Ring progress", value: "size 76 in the preview, centre takes the percentage" },
      { label: "Progress value", value: "0 to 1" },
      { label: "Segmented, active", value: "tinted 14%" },
      { label: "Screen card", value: "padding 14, parts 14 apart" },
      { label: "Showcase grid", value: "repeat(auto-fit, minmax(460px, 1fr)), gap 16" },
    ],
    a11y: [
      "Segmented is a tablist or a radio group with the active item selected, not three buttons.",
      "A tickable CheckList row is a checkbox with its label; done must be announced, not just struck through.",
      "The ring carries a centre value, so the same number is readable as text.",
    ],
    related: ["widget", "topic", "chip", "progress", "stat", "checklist", "segmented", "field", "screens"],
  },

  widgetdata: {
    when: "A showcase: the widget system filled with real demo content, over twelve topics.",
    parts: [
      { name: "compare", what: "The old app widget beside the same content in the four new looks." },
      { name: "demo", what: "18 widgets over 12 topics, each topic its own colour and pattern." },
      { name: "words", what: "The word lab's letter recipes on the same beat (125 bpm)." },
    ],
    rules: [
      { do: "Read it as a sample of content and colour, not as a page to copy." },
      { do: "Build real widgets with Widget, Pattern, PageDots and Topic; the rules are in systems.md and screens.md." },
      { do: "The data is the widget lab's widgetdata.json, written for a demo persona." },
    ],
    specs: [
      { label: "Sizes", value: "small 170 x 170, wide 360 x 170, tall 170 x 376, large 360 x 376" },
      { label: "Widget", value: "radius 26px, padding 16px; label 600 11px mono, caps, letter-spacing .14em" },
      { label: "Number", value: "700 52px mono, -.02em; 46px in small and tall" },
      { label: "Demo page", value: "1180 wide" },
    ],
    a11y: [
      "The showcase adds no behaviour: store, ticking and controls belong to the built widgets.",
      "Every colour on this page also stands for a topic; do not read a colour here as state.",
    ],
    related: ["widgetgallery", "widgetscreens", "widgetpagesapp", "widget", "pattern", "topic"],
  },

  widgetgallery: {
    when: "A showcase: the four widget looks, each in the four sizes, with changing topics.",
    parts: [
      { name: "glass", what: "Dark glass with the topic colour as accent; dots show progress." },
      { name: "pattern", what: "The topic's own moving world as the background: lanes, grid, bubbles, rain." },
      { name: "ring", what: "Progress as a ring, like her own ring, with what is left or next in the centre." },
      { name: "list", what: "The things themselves first: small gets a large number as background, larger gets the list." },
    ],
    rules: [
      { do: "Use it to compare the four looks in one size before choosing." },
      { do: "Build real widgets with Widget, Pattern, PageDots and Topic; the rules are in systems.md and screens.md." },
      { do: "The demo data over twelve topics is in WidgetData; pictures and the full screen are in WidgetScreens." },
    ],
    specs: [
      { label: "Sizes", value: "small 170 x 170, wide 360 x 170, tall 170 x 376, large 360 x 376" },
      { label: "Widget", value: "radius 26px, padding 16px" },
      { label: "Ring sizes", value: "126 in a small, 136 beside a list, 132 in a tall, 180 in a large" },
      { label: "List length", value: "3 items wide, 7 tall, 8 large" },
      { label: "Showcase page", value: "1180 wide" },
    ],
    a11y: [
      "The looks are visual variants of the same content, so switching a look must not change the reading order.",
      "The pattern backgrounds are decoration and take no text with them.",
    ],
    related: ["widgetdata", "widgetscreens", "widget", "pattern", "topic", "systems"],
  },

  widgetscreens: {
    when: "A showcase: widgets in use, as the widget lab has them, with scrolling and pictures.",
    parts: [
      { name: "phone", what: "The phone frame the scroll examples sit in, 392px wide, radius 36px." },
      { name: "hscroll", what: "Horizontal scrolling with page dots in the topic colour." },
      { name: "vscroll / vpager", what: "Vertical scrolling with the app's pointer on the side." },
      { name: "visuals", what: "Widgets with pictures: real photos in duotone, or flat trip-style drawings." },
      { name: "screen", what: "The full Groceries screen: head, two small widgets, the week list, the pointer." },
    ],
    rules: [
      { do: "Tapping an item ticks it off, and the counter, the dots and the ring follow." },
      { do: "A photo is duotone in two colours of the topic; things themselves are flat drawings in trip style." },
      { do: "Colour is state: the lamp that is on is warm, energy made is green, a low battery is amber, today is red." },
    ],
    specs: [
      { label: "Phone frame", value: "392px wide, radius 36px, padding 16px" },
      { label: "Scrollers", value: "gap 12px, scroll-snap-type x mandatory / y mandatory, no scrollbar" },
      { label: "Vertical window", value: "height 376px" },
      { label: "Dots", value: "6px, current stretches to 18px (x) or 18px tall (y)" },
      { label: "Groceries head", value: "title 20px with the date beside it" },
      { label: "Week rows", value: "padding 12px 0, border-top 1px #1f2630, tick 24px" },
    ],
    a11y: [
      "A page of widgets needs its dots as labelled buttons; the colour of a dot is not the label.",
      "Ticking an item must be a checkbox-like control, so the done state is announced.",
      "The patterns and photos are decoration; the number and the word carry the meaning.",
    ],
    related: ["widgetgallery", "widgetdata", "widgetpagesapp", "widget", "pagedots", "pattern"],
  },

  macpill: {
    when: "The Mac: her orb floating above every window, with the bar that grows out from behind it.",
    parts: [
      { name: "orb", what: "A 60pt TalkOrb, in every TalkOrb state; clicking it opens the type field." },
      { name: "bar", what: "The glass capsule that grows out from behind the orb: loops and chats left, a 68pt gap under the orb, vault, settings and mic right." },
      { name: "above", what: "What you say while you hold to talk, in quotes; or while she works: a dot, 6 steps and a STEPS chip." },
      { name: "label", what: "One word of state in mono caps: LISTENING, THINKING, WORKING, MUTED, CONNECTION LOST, WATCHING." },
      { name: "work ring", what: "A dotted ice-blue ring (70pt) turning slowly round the orb while she works through steps." },
      { name: "badge", what: "The count of new messages plus Mac notifications, at 45 degrees on the orb's rim." },
    ],
    rules: [
      { do: "The pill is only her orb and what belongs to it; it is composed, not a component of its own in the bundle." },
      { do: "Magenta is the badge, red is destructive only: never a red badge." },
      { do: "Nothing while she talks: the ring already says so." },
      { do: "The bar is shorter on a side with fewer buttons and shifts so the 68pt gap stays under the orb." },
    ],
    specs: [
      { label: "Orb", value: "60pt; work ring 70pt, #7dd3fc dotted" },
      { label: "Bar", value: "44pt high, radius 22px, rgba(7,9,12,.78), inset ring rgba(190,230,255,.14), blur 18px" },
      { label: "Gap under the orb", value: "68pt" },
      { label: "Button", value: "36pt, icon 14pt, ink 85%; hover or open: #2ee6d6 on a 16% disc" },
      { label: "Tip", value: "white, 11pt, radius 6, 32pt above the button, appears in .12s" },
      { label: "State word", value: "9.5pt mono, caps, tracking 1.4, #8fa3b0" },
      { label: "Badge", value: "magenta #c026d3, white 700 11pt tabular, min-width 20px, height 20px, radius 10px, 2pt ring in --bg" },
      { label: "Open and close", value: "opens 180ms after the mouse rests, stays 700ms, then folds in (scale x 0.3, blur 6 to 0)" },
    ],
    a11y: [
      "The bar has no keyboard trigger of its own, so the same commands need a reachable path (the right-click menu or a shortcut).",
      "Each button is icon-only: give it the tip text as its label, since the hover tip is not focusable.",
      "The state word is text, so a screen reader hears LISTENING, THINKING, MUTED without the ring.",
      "The badge count is text (99+ above 99, gone at 0); clicking it opens notifications.",
    ],
    related: ["talkorb", "effects", "tabbar", "widgetscreens", "talk"],
  },
};
