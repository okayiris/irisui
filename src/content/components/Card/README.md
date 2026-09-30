# Card

The one surface of the app: frosted glass (--glass), 1px --edge stroke, radius 18, padding 14. Every row, panel and sheet section is a Card on the near-black --bg.

Card from IrisUi (`window.IrisUi.Card`, bundle `_ds_bundle.js`, styles `styles.css`). Wrap the tree in `<PreviewI18nProvider>` for the app's background and font.

The one surface of the app: frosted glass (--glass), 1px --edge stroke, radius 18, padding 14. Every row, panel and sheet section is a Card on the near-black --bg.

Props: `{ children?: ReactNode; padding?: number; className?: string; style?: CSSProperties }`

Variants: Default, Stat.

```js
const { h } = { h: React.createElement };
h(Card, null, h("div", {style:{fontSize:17}}, "Live report"), h("div", {style:{fontSize:12,color:"var(--dim)",marginTop:3}}, "Updated while we talk"))
```
