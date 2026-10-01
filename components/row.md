# Row

One line of a settings page: icon, title, the dim line under it, and a control on the right.

Group: Surfaces. Export: `window.IrisUi.Row`.

## Props

| prop | type | required |
| --- | --- | --- |
| `icon` | `ReactNode` | no |
| `title` | `string` | yes |
| `subtitle` | `string` | no |
| `trailing` | `ReactNode` | no |
| `chevron` | `boolean` | no |
| `external` | `boolean` | no |
| `danger` | `boolean` | no |
| `onClick` | `() => void` | no |

## Examples

### Chevron

```js
() => h(Row, { icon: h(Icon, { name: "phone" }), title: "This device", subtitle: "Blocks, voice, notifications and how she talks here.", chevron: true, onClick: () => {} })
```

### Toggle

```js
() => h(Row, { icon: h(Icon, { name: "car" }), title: "On the road", subtitle: "She listens and talks through this iPhone, even when locked.", trailing: h(Toggle, { label: "On the road" }) })
```

### Menu

```js
() => h(Row, { icon: h(Icon, { name: "wave" }), title: "Voice", subtitle: "Dutch, warm and clear", trailing: h(Menu, { label: "Alex", align: "end", items: [ { label: "Alex", checked: true }, { label: "Calmer", checked: false }, { label: "No voice", checked: false } ] }) })
```

### Grouped in a card

```js
() => h(Card, { padding: 0 },
  h(Row, { icon: h(Icon, { name: "mic" }), title: "Listen for her name", subtitle: "Say Iris and she answers", trailing: h(Toggle, { on: true, label: "Listen for her name" }) }),
  h(Row, { icon: h(Icon, { name: "speaker" }), title: "Read mail out loud", subtitle: "Only from people you know", trailing: h(Toggle, { label: "Read mail out loud" }) }),
  h(Row, { icon: h(Icon, { name: "shield" }), title: "Vault", subtitle: "Only your iPhone opens it", chevron: true, onClick: () => {} }))
```

### Danger

```js
() => h(Row, { icon: h(Icon, { name: "trash" }), title: "Delete account", subtitle: "Deletes her and everything she stored.", danger: true, onClick: () => {} })
```

## Guidelines

- Do: Use one trailing control per row, and use chevron or external but not both.
- Don't: A row that is both a toggle and a link away.
- Do: Keep the subtitle to one short line and let it end the sentence.
- Don't: A paragraph under the title, or a subtitle that repeats the title.
- Do: Use danger only for something destructive, with the consequence in the subtitle.
- Don't: Danger colour on a row that only navigates.

## Specs

- Icon: `24px box, colour rgba(232,242,247,.8)`
- Icon to text: `gap 10px`
- Title: `17px --fg`
- Subtitle: `12px --dim`
- Text block: `gap 3px`
- Between rows: `12px`
- Danger: `colour var(--error) #f87171`

## Accessibility

- A tappable row is a button or a link, so the whole row is reachable and not only the chevron.
- The title is the accessible name; the subtitle stays part of it.
- A Toggle as trailing keeps its own label from the row title.

## The system's own words

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

