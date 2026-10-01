# Button

A single action or decision; the browser build of the app's pill button.

Group: Controls. Export: `window.IrisUi.Button`.

## Props

| prop | type | required |
| --- | --- | --- |
| `variant` | `'primary' | 'glass' | 'accent' | 'ghost' | 'danger' | 'text' | 'icon'` | no |
| `size` | `'sm' | 'md' | 'lg'` | no |
| `icon` | `ReactNode` | no |
| `children` | `ReactNode` | no |
| `onClick` | `() => void` | no |
| `disabled` | `boolean` | no |
| `busy` | `boolean` | no |
| `topic` | `TopicName` | no |
| `label` | `string` | no |

## Examples

### Primary

```js
() => h(Button, {variant:"primary", size:"lg"}, "Agree and continue")
```

### Accent

```js
() => h(Button, {variant:"accent", size:"sm", icon:h(Icon,{name:"speaker",size:14})}, "Continue here")
```

### Glass

```js
() => h(Button, {variant:"glass"}, "Edit")
```

### Ghost

```js
() => h(Button, {variant:"ghost"}, "Don't agree")
```

### Danger

```js
() => h(Button, {variant:"danger"}, "Unpair")
```

### Text

```js
() => h(Button, {variant:"text"}, "Details")
```

### Icon

```js
() => h(Button, {variant:"icon", label:"Speaker", icon:h(Icon,{name:"speaker",size:18})})
```

### Busy

```js
() => h(Button, {variant:"primary", busy:true}, "Busy")
```

### Primary in a topic

```js
() => h(Button, {variant:"primary", topic:"parcel"}, "Track parcel")
```

## Guidelines

- Do: Use one primary per screen; everything else is glass, text or ghost.
- Don't: Two filled primary buttons side by side.
- Do: Give an icon button a label, and wrap an icon plus text with gap 8px.
- Don't: An icon-only button with no label: a screen reader hears nothing.
- Do: Use busy for work in progress and disable only with a visible reason.
- Don't: A disabled button with no reason, or opacity instead of the disabled state.
- Do: In a topic let primary take the topic accent with dark ink.
- Don't: A gradient or neon button, or a primary with light ink on a light fill.

## Specs

- md: `height 44px, padding 0 20px`
- lg: `height 56px, padding 0 24px, font 17px, radius 20px, full width`
- sm: `height 28px, padding 0 12px, font 13px`
- Radius: `--radius-pill 999px`
- Label: `600 15px var(--font), gap 8px to the icon`
- Icon button: `width 44px, padding 0; sm width 28px`
- primary: `fill #e9f1f5, ink #0b0f13`
- accent: `fill rgba(125,211,252,.28), border rgba(125,211,252,.55)`
- Focus: `2px var(--accent) outline, 2px offset`
- Disabled: `opacity .35, cursor default`
- Busy: `aria-busy true; primary fill mixed 70% with #0e1218`
- In a topic: `primary at oklch .82 / .12 with dark ink`

## Accessibility

- Every button carries its own visible label; icon only buttons need label as the name.
- Focus shows a 2px accent outline at 2px offset; never remove it.
- A screen reader hears the label, then busy or disabled; a disabled button needs a reason in the row above it.

## The system's own words

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

