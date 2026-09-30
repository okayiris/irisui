# Skeleton

What shows while anything loads from the house: glass blocks with a sheen, in the shape of the real content. Never a spinner on an empty black screen. screen = a whole window (title line, big card, two rows).

Skeleton from IrisUi (`window.IrisUi.Skeleton`, bundle `_ds_bundle.js`, styles `styles.css`). Wrap the tree in `<PreviewI18nProvider>` for the app's background and font.

What shows while anything loads from the house: glass blocks with a sheen, in the shape of the real content. Never a spinner on an empty black screen. screen = a whole window (title line, big card, two rows).

Props: `{ height?: number; width?: number | string; screen?: boolean }`

Variants: Row, Screen.

```js
const { h } = { h: React.createElement };
h(Skeleton, null)
```
