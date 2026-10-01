# Spacing

Three tokens on a page, one rhythm inside a card, and every number the parts use.

## The three tokens

A page in Iris has three distances and no more: padding inside, gap between, and never a margin. There are no margins at all, only padding and gaps.

| Token | Value | Where |
| --- | --- | --- |
| `--gutter` | 16px | The page side margin, on every surface |
| `--gap` | 12px | Between cards on a page |
| `--pad-card` | 14px | The padding inside a card, on all four sides |

```css
.card {
  padding: var(--pad-card);
}
.page {
  padding: 0 var(--gutter);
  display: grid;
  gap: var(--gap);
}
```

## The rhythm inside a card

Inside a card the rhythm climbs 4, 8, 12, 16, 20, 24. Each step has one job, and a part that needs a distance in between uses the value the parts around it already use.

| Step | Where it is used |
| --- | --- |
| 4 | The vertical padding of a panel over a widget, `padding: 4px 10px` |
| 8 | The gap in a widget head, a slider, a dialog's actions, and the top of a panel |
| 12 | Between cards, around a divider, and the padding inside a stat |
| 16 | The page gutter and the padding of a widget |
| 20 | The padding of a dialog and the side padding of a medium button |
| 24 | The side padding of a large button, and the minimum outside padding of a toolbar |

Three values sit outside that climb and are just as real: 6px between the blocks of a widget and the lines of a row, 10px between the parts of a menu item, a button group and a widget row, and 14px for the card padding and the sides of a stat.

> rule: One distance per job. If two parts in one card need air, that air is a gap, not a margin on one of them.

## The page rhythm

A page is 16px from the sides, cards are 12px apart, and every card is 14px from its own edge to its content. Those three numbers are the whole grid.

1. The gutter is 16px, everywhere, on the phone and in a window she opens.
2. The gap between two cards is 12px. A card never touches another card.
3. The padding inside a card is 14px. A card with its own header keeps the header at 14px and starts the content below it.
4. A widget is the exception on the phone: its padding is 16px, because it is a smaller surface with a larger frame.

> warn: The three numbers are the app. A website and a mail each have their own rhythm, and each says so in its own chapter. `website.md` puts 136px between sections and 96px between columns against dense rows with 12px gaps.

## Divider or space

Iris groups with space almost everywhere, and with a line when the line is the structure.

- Use space when the parts belong to one thought. A title, a value and a line under it are one thing, so nothing divides them.
- Use a divider when two meanings share one card, or when a list's lines are the structure and the eye needs them.
- The divider is 1px `--line`, with 12px above and below. `data-inset` pushes it 44px in, so it starts at the text and not at the icon.
- Never a divider between two cards. `--gap` does that job, and a line there would read as a third thing.

## Density and compact rows

The app is dense on purpose. A settings row carries a 17px title and a 12px line under it and still keeps a comfortable height, because the row answers the hand and a target that is too short is a target people miss.

- Inside a widget a row is 6px of vertical padding with a 10px gap and one 1px `--line` between rows, never a blank line.
- In an app she builds, the view has 1.1rem of padding and its parts sit 1.3rem apart, looser than a widget, tighter than a website.
- Density is a property of the surface, not a setting. The app is compact and the website has air.

## Values on one page

| Where | Value | Source |
| --- | --- | --- |
| Page side margin | 16px | `--gutter` |
| Between cards | 12px | `--gap` |
| Inside a card | 14px | `--pad-card` |
| Inside a widget | 16px | bundle: `.iris-widget { padding: 16px }` |
| Between the blocks of a widget | 6px | bundle: `.iris-widget { gap: 6px }` |
| Between the lines of a row | 10px | bundle: `.iris-rows li { gap: 10px }` |
| Between the parts of a menu item | 10px | ext: `.ix-menu-item { gap: 10px }` |
| Around a divider | 12px | ext: `.ix-divider { margin: 12px 0 }` |
| A dialog | 20px | ext: `.ix-dialog { padding: 20px }` |
| A medium button, side padding | 20px | bundle: `.iris-btn-md { padding: 0 20px }` |
| A large button, side padding | 24px | bundle: `.iris-btn-lg { padding: 0 24px }` |

## The numbers behind the rhythm

Every distance below is one the parts actually use, read out of the bundle and ext.css.

| Value | Where it shows |
| --- | --- |
| 8px | the gap in a head, a slider and a panel top |
| 16px | the gutter and the padding of a widget |
| 24px | the side padding of a large button |
| 4px, 6px, 10px | panel padding, widget gap, menu and row gap |
| 12px, 14px | between cards and inside a card, the two most used numbers |
| 6px, 10px, 14px | ordinary values here, not exceptions |

- 12px and 14px carry the most pages in the system.
- The values ship as CSS variables, so a part and its page read one source.

> warn: Iris has no named step between 16px and 20px, no 2px spacing in use anywhere, and no token for a target size. Where a layout needs one of those, it writes the value, and that value is not part of the system yet.
