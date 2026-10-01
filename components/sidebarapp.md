# SidebarApp

Sections in a sidebar on the left, one view at a time: the default shape for an app with 3 to 7 places.

Group: App layouts. Export: `window.IrisUi.SidebarApp`.

## Guidelines

- Do: One navigation per app, the same in every view.
- Don't: A sidebar is not a tab bar: tabs are for angles on one subject (Tabs app).
- Do: Below 40rem of window width, a container query, the sidebar leaves and the same sections become the bottom tab bar.
- Don't: Do not key this to the screen size with a media query.
- Do: More than five sections: the fifth tab is More.
- Do: The app remembers the last section per owner.

## Specs

- Frame (window / phone): `60rem x 31rem, radius 1rem / 23.5rem x 36rem, radius 1.6rem`
- Sidebar: `13rem, padding .9rem .6rem, gap .15rem, border-right 1px --line`
- Nav item: `padding .45rem .6rem, radius .7rem, .88rem, count 11px mono --faint`
- Current item: `rgba(125,211,252,.14) fill, icon --accent`
- Header: `min-height 3.4rem, padding .8rem 1.1rem, border-bottom 1px --line, title 1.05rem / 600`
- View: `padding 1.1rem, gap 1.3rem`
- Tab bar: `left/right/bottom .6rem, height 3.6rem, padding .3rem, radius 999px, rgba(20,26,34,.82), blur 20px`
- Phone: `view padding-bottom 5rem so nothing hides under the bar`

## Accessibility

- The sidebar is a nav landmark with an accessible name; the current place carries aria-current.
- Tab order is sidebar, then header, then the view: keep the DOM in that order.
- In the phone shape the tab bar is the same nav, so the names must not change between shapes.

## The system's own words

# SidebarApp

A sidebar of sections on the left, one view on the right. Becomes a bottom tab bar on a phone.

Sections in a sidebar on the left, one view at a time on the right: the default shape for an app with 3 to 7 places (Mail, Notes, a domain radar).

- The sidebar is `13rem`, `--line` on its right edge, items `.45rem .6rem` with radius `.7rem`; the current one gets the accent tint and an accent icon, counts in mono on the right.
- The view has one header: title (`1.05rem`/600), then search, then quiet icon buttons. The primary action, if any, is the last thing in the header.
- Below `40rem` of window width (a container query, not the screen) the sidebar leaves and the same sections become the bottom tab bar. More than five sections: the fifth tab is "More".
- The app remembers the last section per owner.

