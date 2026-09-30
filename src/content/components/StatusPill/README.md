# StatusPill

Top left of every screen: the orb and one word of what she is doing ("busy", "listening"), or an accent pill with an action ("Continue here"). Nothing to report = only the orb.

StatusPill from IrisUi (`window.IrisUi.StatusPill`, bundle `_ds_bundle.js`, styles `styles.css`). Wrap the tree in `<PreviewI18nProvider>` for the app's background and font.

Top left of every screen: the orb and one word of what she is doing ("busy", "listening"), or an accent pill with an action ("Continue here"). Nothing to report = only the orb.

Props: `{ state?: 'idle' | 'listening' | 'busy' | 'talking' | 'away'; label?: string; action?: string; onAction?: () => void }`

Variants: Word, Action, Away.

```js
const { h } = { h: React.createElement };
h(StatusPill, {state:"busy", label:"busy"})
```
