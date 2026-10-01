# Segmented

Two to four views of one thing, inside a card.

Group: navigation. Export: `window.IrisUi.Segmented`.

## Props

| prop | type | required |
| --- | --- | --- |
| `items` | `string[]` | no |
| `active` | `number` | no |
| `onSelect` | `(i: number) => void` | no |
| `topic` | `TopicName` | no |

## Examples

### Tabs

```js
() => { const [a, set] = React.useState(0); return h(Segmented, { topic: "groceries", items: ["List", "Shops", "History"], active: a, onSelect: set }); }
```

### In the agenda topic

```js
() => { const [a, set] = React.useState(1); return h(Segmented, { topic: "agenda", items: ["Day", "Week", "Month"], active: a, onSelect: set }); }
```

## Guidelines

- Do: Use Segmented for views of one thing, and Chip for filters.
- Don't: Five or more tabs, or a Segmented used to filter a set.
- Do: Keep the labels to one or two words and pick the active one in 14% of the topic colour.
- Don't: A filled active tab in the accent with light text, or two active tabs.
- Do: Give the track a glass fill and an edge so it reads as one control.
- Don't: An underlined tab strip or a second accent for the active tab.

## Specs

- Track: `padding 3px, gap 2px, --glass fill, 1px --edge, --radius-pill`
- Tab: `padding 6px 14px, --radius-pill`
- Label: `500 13px var(--font), --dim when off`
- Active: `14% --k fill, --k text`
- Focus: `2px var(--k, var(--accent)) outline, 2px offset`

## Accessibility

- Expose the tabs as a tab list, or as pressed buttons, and keep the order of the views.
- The active tab is named to a screen reader as the selected one, not only tinted.
- Keyboard: the active tab is reachable, and focus is visible on the tab itself.

## The system's own words

# Segmented

Tabs inside a card: a glass track with the active tab tinted 14% of the topic colour.

Consumer provides: `items` (two to four short words), `active`, `onSelect`, `topic`. For views of one thing; for filters use `Chip`s.

Part of the web parts in the topic palette (`WebKit` shows them together, next to the widget of the same topic). Inside a `Topic` it takes that topic's `--k` and `--kd`.

