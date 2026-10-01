# Card

Every group of content on the near-black page: one panel, one surface, no second style.

Group: Surfaces. Export: `window.IrisUi.Card`.

## Props

| prop | type | required |
| --- | --- | --- |
| `children` | `ReactNode` | no |
| `padding` | `number` | no |
| `className` | `string` | no |
| `style` | `CSSProperties` | no |

## Examples

### Default

```js
() => h(Card, null, h("div", {style:{fontSize:17}}, "Live report"), h("div", {style:{fontSize:12,color:"var(--dim)",marginTop:3}}, "Updated while we talk"))
```

### Stat

```js
() => h(Card, {padding:18}, h("div", {style:{fontSize:34,fontWeight:500}}, "4/4"), h("div", {style:{fontSize:15,color:"var(--dim)"}}, "points"))
```

### Topic

```js
() => h(Card, {topic:"groceries"}, h("div", {style:{font:"500 11px var(--mono)",letterSpacing:".14em",color:"var(--k)"}}, "GROCERIES"), h("div", {style:{fontSize:15,marginTop:6}}, "Your weekly list, ticked off as you shop."))
```

## Guidelines

- Do: Keep the glass fill and the 1px edge stroke; stack cards with 12px between them.
- Don't: A solid panel, a white or light card, or a drop shadow.
- Do: Use --glass and --edge, and --pad-card for the padding.
- Don't: A raw hex or a grey that is not a token.
- Do: Leave the page margin at 16px and let the card fill the column.
- Don't: Nest a card inside a card to get a second frame.

## Specs

- Fill: `--glass rgba(180,225,255,.07)`
- Stroke: `1px --edge rgba(190,230,255,.14)`
- Radius: `--radius-card 18px`
- Padding: `--pad-card 14px`
- Between cards: `--gap 12px`
- Page margin: `--gutter 16px`

## Accessibility

- The card is a plain container, so give its content real headings instead of relying on the frame.
- Text on the glass is --fg or --dim, both of which read on --bg.

## The system's own words

# Card

The one surface of the app: frosted glass (--glass), 1px --edge stroke, radius 18, padding 14. Every row, panel and sheet section is a Card on the near-black --bg.

Card from IrisUi (`window.IrisUi.Card`, bundle `_ds_bundle.js`, styles `styles.css`). Wrap the tree in `<PreviewI18nProvider>` for the app's background and font.

The one surface of the app: frosted glass (--glass), 1px --edge stroke, radius 18, padding 14. Every row, panel and sheet section is a Card on the near-black --bg.

Props: `{ children?: ReactNode; padding?: number; className?: string; style?: CSSProperties; topic?: string }`

`topic` puts the card on its topic's ground: the same still fade as a Widget, the first label in the topic colour. No motion and no busy cost, so a grid of cards can carry a colour per category.

Variants: Default, Stat, Topic.

```js
const { h } = { h: React.createElement };
h(Card, null, h("div", {style:{fontSize:17}}, "Live report"), h("div", {style:{fontSize:12,color:"var(--dim)",marginTop:3}}, "Updated while we talk"))
```

