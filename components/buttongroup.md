# ButtonGroup

The button set of one screen in its topic: primary flat, secondary glass, the quieter kinds beside them.

Group: Controls. Export: `window.IrisUi.ButtonGroup`.

## Props

| prop | type | required |
| --- | --- | --- |
| `topic` | `TopicName` | no |
| `stack` | `boolean` | no |
| `children` | `ReactNode` | no |

## Examples

### One decision

```js
() => h(ButtonGroup, { topic: "agenda" },
  h(Button, { variant: "primary" }, "Schedule it"),
  h(Button, { variant: "glass" }, "Later"),
  h(Button, { variant: "text" }, "Details"))
```

### In the parcel topic

```js
() => h(ButtonGroup, { topic: "parcel" }, h(Button, { variant: "primary" }, "Track parcel"), h(Button, { variant: "glass" }, "Other address"))
```

## Guidelines

- Do: One primary per screen; give the set a topic so every button takes that accent.
- Don't: A second accent in the same set, or a gradient primary.
- Do: Use stack for full-width stacked buttons at the end of a decision.
- Don't: Three filled buttons in one row.
- Do: Keep the tie between a button and its result visible, with busy while it runs.
- Don't: A disabled button with no reason on screen.

## Specs

- Gap: `10px between buttons, wrapped`
- stack: `column, align stretch, full width`
- primary: `topic accent at oklch .82 / .12, ink var(--bg)`
- secondary: `8% accent over the glass fill, 1px hairline, 16% on hover`
- Contrast: `primary 10.5:1 or more for every topic`
- Focus: `2px accent ring, 2px offset`

## Accessibility

- Put the set in a group so the buttons read as one decision, not loose actions.
- The icon button's label is its accessible name; a Toggle in the set announces its own on or off state.
- Disabled is announced as disabled; the reason belongs in the text above the set.

## The system's own words

# ButtonGroup

The button set of one screen in its topic: primary flat, secondary glass, and the quieter kinds beside them.

| Kind | How |
|---|---|
| primary | `Button variant="primary"`: the topic accent at oklch .82 / .12 (`button-primary-l`, `button-primary-c`), ink `bg`. 10.5:1 or more for every topic. Without a topic: the app's light button. |
| secondary | `variant="glass"`: 8% accent over `button-secondary`, 1px hairline `shadow-secondary`; 16% on hover |
| text | `variant="text"`: the accent, underline on hover |
| danger | `variant="danger"`: `error` text |
| icon | `variant="icon"` with `icon` and `label` (the label is the accessible name) |
| busy | `busy`: spinner, `aria-busy`, not clickable |
| disabled | `disabled`: `button-off` with `button-off-ink` (2.7:1, exempt as disabled) |
| switch | `Toggle`: violet when on, as everywhere |

Consumer provides: `topic`, the buttons as children, `stack` for full-width stacked buttons. One primary per screen. Focus ring: 2px in the accent, 2px offset.

