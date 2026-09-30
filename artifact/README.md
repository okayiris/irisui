# The added parts, in the artifact's shape

21 parts this project added to the Iris design system, ready to publish into the Design
System artifact as `project/components/<Name>/`:

- **Menu** (Controls) — A list of choices on its own surface: a filter, a sort, a set of actions, anchored to the thing it belongs to.
- **Dialog** (Overlays) — The one place Iris interrupts: a decision that cannot wait, with the action that matters first.
- **Sheet** (Overlays) — Secondary content anchored to an edge: the bottom on a phone, the side on a wide window.
- **Snackbar** (Feedback) — What happened next, next to the thing it happened to: one line and at most one action.
- **Tooltip** (Feedback) — The name of a thing that is only an icon, on hover and on focus.
- **Badge** (Navigation) — A count or a dot on the thing it belongs to: a tab, an icon, a word.
- **Slider** (Controls) — One value on a line: how much, how far, how loud.
- **TextArea** (Controls) — The multi-line field: a note, a message, anything longer than a line.
- **Select** (Controls) — One choice out of a few, in the shape of the fields around it.
- **SearchField** (Controls) — Finding something: a pill field that says what it is doing and clears itself.
- **Tabs** (Navigation) — A few angles on one thing, under its title, with the ink sliding to the active one.
- **Steps** (Navigation) — Where you are in a short flow, and what is still coming.
- **EmptyState** (Feedback) — Nothing here yet, said properly: what this place is for and the one thing to do about it.
- **Toolbar** (Navigation) — A bar of actions that belong together, docked in a screen or floating over the content.
- **DatePicker** (Controls) — A month you pick a day in: one accent on the chosen day, today marked with a ring.
- **TimePicker** (Controls) — A time you set with two strips: the hour, then the minute. The chosen time reads big, in mono.
- **AppBar** (Navigation) — The top line of a screen or a window: what this is, and the few actions that belong to it.
- **NavRail** (Navigation) — The wide-window version of the tab bar: a rail of sections that collapses to icons.
- **SplitButton** (Controls) — One action, and the caret that opens the others that belong to it.
- **Carousel** (Surfaces) — A strip of cards you swipe or scroll sideways, with dots that say where you are.
- **Divider** (Surfaces) — A hairline that groups what is above it from what is below.

Each folder holds a `README.md` in the system's own voice and a `preview.html` with one cell per variant.
The previews need `ext.css` and `ext.js` (from `public/ds/`) beside the release's `bundle.css` and
`bundle.js`; the values the parts introduced are in the header comment of `src/ds/ext.css`.

`manifest.json` here lists them for whoever publishes; the release's own index
(`project/design-system.json`) is written by the artifact, not by this script.
