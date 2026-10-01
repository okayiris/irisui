# Layout

A phone in the hand, a window she opens, and a wide screen hold the same file. What changes is how many panes it may show and where the navigation sits.

## The same file at three widths

A screen is one file: a window on the web, a page in the Iris tab on a phone, a widget on the Mac. It folds by width instead of having a phone copy.

| At this width | The layout shows |
| --- | --- |
| A window she opens | one view in a frame of 30rem by default, sliding in from the right, overlays one at a time |
| A phone screen | the same view full bleed, the bottom bar, a sheet from the bottom |
| A wide screen | two panes side by side and a sidebar of 13rem |

## The three breakpoints

ext.css names three widths. Each one earns something the width below it cannot hold.

| Token | Width | What it adds |
| --- | --- | --- |
| --bp-medium | 600px | two panes: a list of 19rem next to the detail, a document of 40rem next to an inspector of 15rem |
| --bp-expanded | 840px | the sidebar of 13rem joins the view, tabs sit under the title, the dashboard reaches 4 columns |
| --bp-large | 1200px | the window stops growing: the reading column stays 40rem, the flow column 30rem, the rest is air |

```css
:root {
  --bp-medium: 600px;
  --bp-expanded: 840px;
  --bp-large: 1200px;
}
```

The frame is the container, never the screen: every fold is a container query on the frame, because the owner can drag a window to any size.

Below 40rem the shape is a phone: sidebar and tabs become the bottom bar, list and detail become two screens, tables stack. From 40rem to 52rem a dashboard shows 2 columns and an inspector floats. Above 52rem everything sits side by side.

> warn: The chapters quote 40rem and 52rem while the tokens say 600px, 840px and 1200px, so a fold written from a chapter disagrees with the tokens.

## One frame, one navigation

An app has one navigation, the same in every view: a sidebar for places, tabs for angles on one subject, a back chevron for going deeper. Never a sidebar and tabs and a bottom bar at once.

A window never shows two frames. The frame you see is the outermost surface you are in. A card inside a card loses its frame so the nesting stays one surface.

> rule: Pick the smallest surface that holds it: block, tile, window, page screen, phone screen, app. If he opens it again next week it is an app. If it answers one question now it is a window.

## Which app layout for which content

Nine layouts carry every app. Pick by the content and let the width fold it. They nest: a sidebar app whose Invoices place is a table, whose row opens a document.

| Layout | Right when | Wide | Below 40rem |
| --- | --- | --- | --- |
| Sidebar app | 3 to 7 places to move between | sidebar 13rem plus the view | bottom tab bar, the fifth tab is More |
| List and detail | a collection you open one item of | list 19rem plus the detail | two screens with a back chevron |
| Tabs | one subject, 2 to 5 angles | words under the title, 2px accent underline | the same tabs in the bottom bar, with icons |
| Dashboard | how is it going at a glance | tile grid of 4 columns | 2 columns, then 1 |
| Board | work moving through stages | 3 to 5 columns of cards | one column at 85%, snapping sideways |
| Flow | anything with an end | one question per step in a 30rem column | the same, buttons full width |
| Document | long text: a plan, notes, a report | 40rem column plus an inspector of 15rem | the inspector floats over the text |
| Table | records you scan and filter | search, chips, a sortable table | each row a two line stack |
| Widget pages | the phone home, pages of widgets | pages next to each other as columns | pages swiped vertically, a dot rail |

## Where the tab bar sits, where the sidebar takes over

On a phone the navigation is the tab bar: a frosted capsule at the bottom, 62px high, tabs of 54px, an icon of 26px and a label of 13px. Her talk button stands 28px above it. The bar sits 22pt into the bottom safe area and a view reserves 5rem at the bottom.

From 40rem the sidebar replaces the bar: 13rem, a hairline of --line on its right edge, the current place tinted with the accent. Tabs fold the same way, and each keeps its own scroll place and half filled state.

> rule: The bar and the sidebar are the same list of places, drawn twice. Never both, never a third way to move.

## The three window sizes

Iris names three window sizes as breakpoints: 600px, 840px and 1200px, and no class beyond them. It never draws more than two panes.

| What | In Iris |
| --- | --- |
| Named sizes | three: 600px, 840px, 1200px, no extra large class |
| Panes | 2 at most |
| Fixed pane width | sidebar 13rem, list 19rem, inspector 15rem |
| Layouts | list detail and supporting pane |
| Navigation | tab bar below 40rem, sidebar above, no rail |
| Destinations | sidebar 3 to 7, five tabs then More |
| Pane resizing | the owner resizes the window only |

What Iris keeps: list and detail with a back chevron in the detail view when one pane fits, and a supporting pane that floats over the text.

What Iris refuses: a third pane, a rail, a drawer, a feed of browsing cards, and drag handles on panes. Each of them would add a way to move that this layout does not need.

> warn: Two gaps, not decisions: Iris has no feed, so a page of browsing cards has no layout here, and it has no column grid with margins and gutters and no right to left rule.
