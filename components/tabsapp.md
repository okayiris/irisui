# TabsApp

One subject seen from two to five angles: a trip, a person, a project.

Group: App layouts. Export: `window.IrisUi.TabsApp`.

## Guidelines

- Do: Tabs sit under the title as words with a 2px accent underline on the current one.
- Don't: No pills, and no icons on the tabs on a wide window.
- Do: Every tab is a view of the same subject.
- Don't: If the tabs are unrelated places, it is a Sidebar app instead.
- Do: A tab keeps its own scroll place and state; a half-filled checklist stays checked.
- Do: Below 40rem the tabs move to the bottom tab bar with icons.

## Specs

- Frame (window / phone): `60rem x 31rem, radius 1rem / 23.5rem x 36rem, radius 1.6rem`
- Tab row: `gap 1.1rem, padding 0 1.1rem, border-bottom 1px --line`
- Tab: `padding .6rem 0, .9rem, --dim; current --fg with border-bottom 2px --accent, margin-bottom -1px`
- Phone tab: `icon 20px above the name, bar height 3.6rem`

## Accessibility

- The tab row is a tablist: each tab is selected state, with the panel as its target.
- Arrow keys should move between tabs; do not make them plain links.
- The current tab carries aria-current so both shapes announce the same thing.

## The system's own words

# TabsApp

One subject, a few angles on it: tabs under the title. On a phone the tabs move to the bottom bar.

One subject seen from two to five angles: a trip (overview, route, packing), a person, a project.

- Tabs sit under the title as words with a `2px` accent underline on the current one; no pills, no icons on a wide window.
- Each tab is a view of the same subject. If the tabs are unrelated places, it is a Sidebar app instead.
- Below `40rem` the tabs move to the bottom tab bar with icons.
- A tab keeps its own scroll place and state (a half-filled checklist stays checked).

