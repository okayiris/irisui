# StatusPill

Top left of every screen, while she is doing something or has exactly one action to offer.

Group: Navigation. Export: `window.IrisUi.StatusPill`.

## Props

| prop | type | required |
| --- | --- | --- |
| `state` | `'idle' | 'listening' | 'busy' | 'talking' | 'away'` | no |
| `label` | `string` | no |
| `action` | `string` | no |
| `onAction` | `() => void` | no |

## Examples

### Word

```js
() => h(StatusPill, { state: "busy", label: "Busy" })
```

### Action

```js
() => h(StatusPill, { action: "Continue here", onAction: () => {} })
```

### Away

```js
() => h(StatusPill, { state: "away", label: "Reconnecting" })
```

## Guidelines

- Do: One word in the app, lowercase, like busy or listening.
- Do: Nothing to report means only the orb shows.
- Do: The action pill is the accent and carries one action.
- Don't: Never a second status line, and never an action without a state worth telling.

## Specs

- row: `orb, 14px gap, then the label`
- label: `17px, --fg`
- orb: `22pt, the header size of Orb`
- variants: `Word, Action, Away`

## Accessibility

- The label is the accessible name of the state: the orb alone says nothing to a screen reader.
- Away keeps a word (reconnecting), so the meaning is not the grey.
- The action is a real button with its own name (Continue here), reachable on its own.

## The system's own words

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

