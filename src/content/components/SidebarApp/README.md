# SidebarApp

A sidebar of sections on the left, one view on the right. Becomes a bottom tab bar on a phone.

Sections in a sidebar on the left, one view at a time on the right: the default shape for an app with 3 to 7 places (Mail, Notes, a domain radar).

- The sidebar is `13rem`, `--line` on its right edge, items `.45rem .6rem` with radius `.7rem`; the current one gets the accent tint and an accent icon, counts in mono on the right.
- The view has one header: title (`1.05rem`/600), then search, then quiet icon buttons. The primary action, if any, is the last thing in the header.
- Below `40rem` of window width (a container query, not the screen) the sidebar leaves and the same sections become the bottom tab bar. More than five sections: the fifth tab is "More".
- The app remembers the last section per owner.
