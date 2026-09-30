# Row

A settings row (the You page): 24px icon at 80% --fg, a 17pt title, a 12pt --dim line under it, and on the right a Toggle, a menu value, a chevron or an external arrow. Rows stack with 12px gaps.

Row from IrisUi (`window.IrisUi.Row`, bundle `_ds_bundle.js`, styles `styles.css`). Wrap the tree in `<PreviewI18nProvider>` for the app's background and font.

A settings row (the You page): 24px icon at 80% --fg, a 17pt title, a 12pt --dim line under it, and on the right a Toggle, a menu value, a chevron or an external arrow. Rows stack with 12px gaps.

Props: `{ icon?: ReactNode; title: string; subtitle?: string; trailing?: ReactNode; chevron?: boolean; external?: boolean; danger?: boolean; onClick?: () => void }`

Variants: Chevron, Toggle, Menu, Danger.

```js
const { h } = { h: React.createElement };
h(Row, {icon:h(Icon,{name:"phone"}), title:"This device", subtitle:"Blocks, voice, notifications and how the assistant talks here.", chevron:true})
```
