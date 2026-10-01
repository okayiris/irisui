# Elevation

Iris has no shadows on cards. Light on the edge does the work, and a shadow appears only over the page.

## No shadows on cards

A card in Iris is flat by design. It is a pane of frosted glass lying on a near-black page, and the only thing that separates it from the page is a 1px edge. There is no lift and no drop shadow.

> rule: A card, a row, a list panel and a widget have no box-shadow. If a card reads as flat, the fix is the edge and the fill, never a shadow.

## What replaces a shadow

Four things do the work a shadow does elsewhere. They are subtle on purpose: on the dark page a black shadow would show nothing, and on the light page --elev-2 adds only a soft ink shadow.

| Answer | Value | What it separates |
| --- | --- | --- |
| Edge light | 1px --edge, rgba(190, 230, 255, .14) | A card from the page, a field from a card |
| Glass fill | --glass, rgba(180, 225, 255, .07) | A raised surface from the page under it |
| A state fill | --state-hover .07, --state-press .12, --state-selected rgba(125, 211, 252, .12) | This control, right now, from its neighbours |
| A scrim | --scrim rgba(4, 6, 9, .62); on the web, rgba(7, 9, 12, .82) with blur(18px) | What is behind an overlay from what is on top |

> llm: Hover is a fill, not a lift. Press is a fill and scale(0.985), not a shadow. The hairline inset 0 0 0 1px rgba(255,255,255,.08) belongs to a secondary glass button only. Never add a drop shadow to make a card pop.

## The two elevation tokens

ext.css adds two shadow steps above the page, and both keep the edge as part of the value. There is no third.

| Token | Value | Where it is allowed |
| --- | --- | --- |
| --elev-1 | inset 0 0 0 1px var(--edge), 0 1px 0 rgba(190, 230, 255, 0.06) | A small object that sits on a surface: a slider thumb or a selected ring control |
| --elev-2 | inset 0 0 0 1px var(--edge), 0 10px 34px rgba(0, 0, 0, 0.55) | Anything that floats over the page: a tooltip, a menu, a dialog, a sheet, a snackbar, a search results box |

> rule: Both tokens carry the 1px --edge stroke inset in the shadow, so a floating surface still has its edge light. Never use a bare black shadow without the edge.

## Overlays only

Everything at --elev-2 is an overlay: it sits on the scrim, not in the scroll, and it uses the denser overlay fill rather than the glass of a card.

| Overlay | Fill | Radius | Step |
| --- | --- | --- | --- |
| Tooltip | --sheet-bg, rgba(10, 13, 18, 0.92) | 9px, with a 7px arrow | --elev-2 |
| Menu | --sheet-bg | --radius-menu, 14px | --elev-2 |
| Dialog | --sheet-bg | --radius-card, 18px | --elev-2 |
| Bottom sheet | --sheet-bg | --radius-sheet 22px on the top corners only | --elev-2 |
| Snackbar | --sheet-bg | 14px | --elev-2 |

> warn: One overlay at a time. A dialog does not stack on a sheet, and no overlay takes --elev-2 twice. Two shadows over one another is the trap this page exists to stop.

## Nothing above the two steps

Iris has two steps above the page, and both are overlays. The page itself carries no shadow at all.

- A card, a list, tabs, buttons and a segmented button sit on the page: glass, the 1px edge, and no shadow.
- A card takes no shadow at rest, and a sheet takes --elev-2 when it floats.
- A menu, a tooltip and a toolbar take --elev-2.
- A dialog, a date picker, a search box and a time picker take --elev-2. A floating action button does not exist here.
- Hover and dragged states take a state fill, --state-hover .07, never a step up.
- Nothing goes above --elev-2. Iris has no fifth step.

Iris draws its scrims in the page's own ink: --scrim is rgba(4, 6, 9, .62) over a dark page and rgba(20, 32, 44, .32) over a light one, and the pen spotlight is a 9999px ring of the page colour (rgba(7, 9, 12, .72), in light rgba(244, 247, 249, .78)) that dims everything around one marked row inside its card.

> llm: Do not put a shadow on a card. If you need more separation, the order is: better edge, a ground colour, a scrim, and only then --elev-2 on something that actually floats.
