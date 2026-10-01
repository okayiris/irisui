# Shape

One shape holds the whole product: a frosted glass card, radius 18, with a 1px light on its edge. Pills for everything you press.

## Radius tokens

Six radii are tokens in tokens.css. Three more live in the additions' stylesheet, ext.css. Together they cover every corner in the system.

| Token | Value | What takes it |
| --- | --- | --- |
| --radius-card | 18px | Every card, row and sheet. |
| --radius-button | 20px | Large full-width buttons. |
| --radius-pill | 999px | Pills, tabs, small buttons, toggles. |
| --radius-widget | 26px | Every widget. |
| --radius-panel | 14px | The frosted list panel inside a glass or pattern widget. |
| --radius-bleed | 28px | Bottom corners of the one widget per three screens that breaks to the edge. |

> rule: radius-card is the default. Reach for another radius only when this table names it. A card, a row and a list panel are not the same shape, so they do not share a radius.

## The glass card recipe

Every surface in Iris is one card. The recipe does not vary by screen size or mode: in light, --glass is white and --edge is ink, the recipe stays the same.

```css
.card {
  background: var(--glass);        /* rgba(180, 225, 255, .07) */
  border: 1px solid var(--edge);   /* rgba(190, 230, 255, .14) */
  border-radius: var(--radius-card); /* 18px */
  padding: var(--pad-card);        /* 14px */
}

.page {
  padding: 0 var(--gutter);        /* 16px side margin */
  display: flex;
  flex-direction: column;
  gap: var(--gap);                 /* 12px between cards */
}
```

- Fill: --glass, seven percent of a pale blue over the near-black page.
- Stroke: 1px --edge, fourteen percent. This is the only light on a card.
- Radius: 18. Padding: 14. Between cards: 12. Page margin: 16.

> rule: Every card is glass. No solid panels, no matte fills, no card with its own background colour, and no rounded corner that is not a token.

## Pills

Anything small that you press is a pill: a tab, a small button, a chip, a toggle. The toggle keeps its own shape (51 by 31) and is still fully rounded.

- Pills, tabs, small buttons and toggles: 999px, so the end is a half circle whatever the height.
- A large full-width button: 20px. It is a decision bar, not a pill.
- A status pill and the action pill (Continue here): 999px, glass or accent.

> llm: A primary button is either a pill or a 20px bar, never a square, never a 12px rounded rectangle. The secondary button next to it is glass, with the hairline inset 0 0 0 1px rgba(255,255,255,.08) and no fill of its own.

## The ring

Three different rings carry meaning in Iris, and they are not interchangeable.

| Ring | Shape | Where |
| --- | --- | --- |
| Her orb | A full circle filled with --orb-gradient, a conic of violet, sky and magenta | The logo, the status pill, the talk button |
| The focus ring | 0 0 0 2px var(--bg), 0 0 0 4px var(--accent) | Keyboard focus on any control, with a page-coloured gap so it reads on glass |
| A ring control | A 20px circle, --bg fill, 2px border in --k, with --elev-1 on it | A slider thumb or a selected mark in a topic |

> rule: Violet is for on and the ring. A focus ring is never violet: it is --accent, because focus is active, not on.

## Sheets, dialogs and menus

tokens.css names one radius for a card, a row and a sheet. ext.css, which adds the parts the system was missing, names three more for the surfaces that sit on top of the page.

| Token | Value | What takes it |
| --- | --- | --- |
| --radius-sheet | 22px | The top two corners of a bottom sheet, never the bottom two |
| --radius-menu | 14px | A menu, a select list, a search results box |
| --radius-field | 12px | A text field or an input inside a form |
| --radius-card | 18px | A dialog, which keeps the card radius rather than taking one of its own |

> warn: tokens.css says 18px covers every card, row and sheet; ext.css gives a sheet 22px on its top corners and a menu 14px. Where a chapter disagrees with tokens.css, tokens.css wins. The values ext.css adds are additions waiting to move into the token file, so never invent a fourth answer.
