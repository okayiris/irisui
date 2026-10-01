# Orb

Any where you show that Iris is there: the header of a screen, a hero, the logo.

Group: Brand. Export: `window.IrisUi.Orb`.

## Props

| prop | type | required |
| --- | --- | --- |
| `size` | `number` | no |
| `state` | `'idle' | 'listening' | 'busy' | 'talking' | 'away'` | no |

## Examples

### States

```js
() => h("div", {style:{display:"flex",gap:28,alignItems:"center"}}, ["idle","listening","busy","talking","away"].map(s => h(Orb, {key:s, state:s, size:34})))
```

### Hero

```js
() => h("div", {style:{display:"grid",placeItems:"center",padding:24}}, h(Orb, {size:112}))
```

## Guidelines

- Do: Only four sizes: 16 in a line of text, 22 in a header or status, 28 in a field you type to her, 34 in a list row.
- Don't: Never a size between the steps, never bigger than 34: a big live Iris is the TalkOrb, a still one the Mark.
- Do: The ring is as tall as the text beside it.
- Don't: Never a filled circle, never a face.
- Do: One or two orbs per page.
- Don't: Never decoration in a list or a row; a list keeps the flat orb and nothing more.
- Do: Away stays grey and still.
- Don't: Never let the grey alone say what is wrong: the word beside it says it.

## Specs

- size: `16, 22, 28 or 34 only; the table "Which Iris, how big" is on the Mark page`
- ring thickness: `5px * --k, cut from the disc with a radial mask`
- --orb-gradient: `conic from 200deg, #6d5cf6, #38bdf8, #c026d3, #8b5cf6, #6d5cf6`
- turn: `6s idle, 2s busy, 3s talking, linear`
- away: `grayscale 1, no animation, opacity .5`

## Accessibility

- The ring has no accessible name: whatever state a person must know is spoken by the word beside it.
- Away and muted differ by more than colour: away is grey and still, muted carries the struck-through mic.
- Listening shows an echo ring: never let motion be the only sign of what she is doing.

## The system's own words

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

