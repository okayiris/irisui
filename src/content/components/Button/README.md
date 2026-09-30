# Button

Pills. primary = the light full-width button of a decision ("Agree and continue", size lg); glass = frosted; accent = ice-blue glow ("Continue here", size sm); ghost = quiet text ("Don't agree"); danger = red text.

Button from IrisUi (`window.IrisUi.Button`, bundle `_ds_bundle.js`, styles `styles.css`). Wrap the tree in `<PreviewI18nProvider>` for the app's background and font.

Pills. primary = the light full-width button of a decision ("Agree and continue", size lg); glass = frosted; accent = ice-blue glow ("Continue here", size sm); ghost = quiet text ("Don't agree"); danger = red text.

Props: `{ variant?: 'primary' | 'glass' | 'accent' | 'ghost' | 'danger' | 'text' | 'icon'; size?: 'sm' | 'md' | 'lg'; icon?: ReactNode; children?: ReactNode; onClick?: () => void; disabled?: boolean; busy?: boolean; topic?: TopicName; label?: string }`

In a topic (`topic`, or a `Topic` / `ButtonGroup` around it) primary becomes the topic accent at oklch .82 / .12 with dark ink, and glass takes an 8% tint of it. `text` is a link-like action, `icon` a square icon button (give it `label`), `busy` shows a spinner. The whole set: `ButtonGroup`.

Variants: Primary, Accent, Glass, Ghost, Danger, Text, Icon, Busy.

```js
const { h } = { h: React.createElement };
h(Button, {variant:"primary", size:"lg"}, "Agree and continue")
```
