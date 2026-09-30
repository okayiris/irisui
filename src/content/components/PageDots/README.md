# PageDots

Page dots under swipeable screens: each dot 7px in 30% of the topic colour, the active one a 22px duotone streak from `--k` to `--k2`.

Consumer provides: `count`, `active`, `topic`, `onSelect`, optional `labels` (accessible names; default "2 / 5"). `dark` puts them on a dark pill: use it when the screen breaks to the edge with a photo behind the dots.

Tokens: `dot`, `dot-active`. Tap target is the dot plus 8px by 4px padding.
