# Orb

Her orb: a ring with a slowly turning violet-blue-pink gradient and a soft glow. 22pt in the header, 64pt+ on hero screens. It is the logo too: never a filled circle, never a face.

Orb from IrisUi (`window.IrisUi.Orb`, bundle `_ds_bundle.js`, styles `styles.css`). Wrap the tree in `<PreviewI18nProvider>` for the app's background and font.

Her orb: a ring with a slowly turning violet-blue-pink gradient and a soft glow. 22pt in the header, 64pt+ on hero screens. It is the logo too: never a filled circle, never a face.

Props: `{ size?: number; state?: 'idle' | 'listening' | 'busy' | 'talking' | 'away' }`

Variants: States, Hero.

```js
const { h } = { h: React.createElement };
h("div", {style:{display:"flex",gap:28,alignItems:"center"}}, ["idle","listening","busy","talking","away"].map(s => h(Orb, {key:s, state:s, size:34})))
```
