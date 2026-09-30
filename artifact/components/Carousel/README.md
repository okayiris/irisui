# Carousel

A strip of cards you swipe or scroll sideways, with dots that say where you are.

Iris keeps the contained shape: one card per view, snapped.

## When

- Three to seven cards of the same kind, where swiping is faster than a list: today's loops, this week.
- On a phone, and in a window where one card per view is still readable.

Never for more than about seven items (a list is better), never for a card that must be compared with the next one, and never two carousels on one screen.

## The parts

The track (scroll-snap), the slides, the dots, and optional arrows for a pointer.

## Rules

- One card per view, snapping, never a half card to hint at more: the dots say there is more.
- The dots follow the scroll and move the scroll: a dot is 7px, the current one grows to 22px in the accent.
- Swiping is the phone's way and the arrows are the pointer's way; both work, neither is the only one.
- It never auto-plays. The person moves it.
- The slides are the system's own Cards; a carousel does not invent a new surface.

## Values

| value | where |
| --- | --- |
| track | horizontal scroll, scroll-snap mandatory, `gap` 12px by default |
| slide | 100% of the track, snap to the start |
| dots | 7px, radius 999px; current 22px in `--k` (or `--accent`) |
| arrows | 30px circle, 1px `--edge` |

## Accessibility

`role="group"` with a label; each dot is a button labelled with its slide number and the current one is
`aria-current`. The track scrolls with the keyboard and with a trackpad, so nothing depends on the swipe.
