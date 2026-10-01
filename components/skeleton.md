# Skeleton

Anything loads from the house: blocks with a sheen in the shape of what is coming.

Group: Feedback. Export: `window.IrisUi.Skeleton`.

## Props

| prop | type | required |
| --- | --- | --- |
| `height` | `number` | no |
| `width` | `number | string` | no |
| `screen` | `boolean` | no |

## Examples

### Row

```js
() => h(Skeleton, null)
```

### Screen

```js
() => h(Skeleton, {screen:true})
```

## Guidelines

- Do: Match the shape of the real content, so the page does not jump when it lands.
- Don't: A spinner or a line of text on an empty black screen.
- Do: Use the glass sheen and the 18px card radius for every block.
- Don't: A solid grey block, a light block, or a raw hex for the sheen.
- Do: Show the skeleton for the whole window with screen when a window is loading.
- Don't: A skeleton that stays after the content has arrived.

## Specs

- Radius: `--radius-card 18px`
- Sheen: `linear-gradient 100deg, rgba(255,255,255,.05) 30%, .13 50%, .05 70%, 300% 100%`
- Animation: `iris-shine 1.4s ease-in-out infinite`
- screen: `column, gap 12px: title line, big card, two rows`
- Reduced motion: `animation none`

## Accessibility

- Mark the loading region busy and hide the placeholder blocks from a screen reader.
- Announce when the content has arrived, rather than the blocks themselves.
- Under prefers-reduced-motion the sheen stops and the blocks stay still.

## The system's own words

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

