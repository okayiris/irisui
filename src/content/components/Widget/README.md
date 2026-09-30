# Widget

A tile that shows one answer at a glance, in four looks (glass, pattern, ring, list) and four sizes (small 170x170, wide 360x170, tall 170x376, large 360x376).

The hero shows the answer itself: the ring IS the progress, the list IS the list. No decoration without meaning.

| Look | Shows | Busy cost |
|---|---|---|
| `glass` | the big number (`value`), `unit`, and in tall and large a frosted list panel | 0 |
| `pattern` | the same over a slow pattern in the topic's two tints (`lanes`, `grid`, `bubbles`, `band`, `rain`, `drift`) | 2 |
| `ring` | a progress ring (`progress` 0..1) with the value inside; tall and large add the open items | 1 |
| `list` | a tick list; the first `done` items fold into one line ("3 done") | 0 |

Consumer provides: `topic`, `look`, `size`, `label` (mono caps in the topic colour), `value`, `unit`, `items` (strings or `[time, text]` pairs), `done`, `progress`, `pattern`, and optionally `note` (the handwritten Anchor) and `bleed` (this screen's one break to the edge).

Values: radius `radius-widget` 26, padding `widget-pad` 16, value 52px mono (46 in small and tall), label 11px mono .14em. Ground is a 160deg fade from `topic-*-ground` to #090b0f with a 1px edge of 16% accent.

Do: one widget = one answer. Put the note next to its subject (the number in glass and pattern, the label in ring and list). Don't: use `bleed` on more than one screen in three, or ever in the header zone or over readable text.

The whole widget lab as three showcase cards: `WidgetGallery` (looks in every size), `WidgetData` (demo data over twelve topics), `WidgetScreens` (scrolling, pictures, the Groceries screen).
