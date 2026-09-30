# Toggle

The iOS switch, 51x31: violet (--violet) when on, grey glass when off.

Toggle from IrisUi (`window.IrisUi.Toggle`, bundle `_ds_bundle.js`, styles `styles.css`). Wrap the tree in `<PreviewI18nProvider>` for the app's background and font.

The iOS switch, 51x31: violet (--violet) when on, grey glass when off.

Props: `{ on?: boolean; onChange?: (on: boolean) => void }`

Variants: Off, On.

```js
const { h } = { h: React.createElement };
h(Toggle, {on:false})
```
