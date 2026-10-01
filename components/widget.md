# Widget

One answer at a glance on a screen she builds for someone.

Group: Screen parts. Export: `window.IrisUi.Widget`.

## Props

| prop | type | required |
| --- | --- | --- |
| `topic` | `TopicName` | no |
| `look` | `'glass' | 'pattern' | 'ring' | 'list'` | no |
| `size` | `'small' | 'wide' | 'tall' | 'large'` | no |
| `label` | `string` | no |
| `value` | `ReactNode` | no |
| `unit` | `string` | no |
| `items` | `(string | [string, string])[]` | no |
| `done` | `number` | no |
| `progress` | `number` | no |
| `pattern` | `'lanes' | 'grid' | 'bubbles' | 'band' | 'rain' | 'drift'` | no |
| `note` | `string` | no |
| `bleed` | `boolean` | no |

## Examples

### Glass, small

```js
() => h(UI.Widget, { topic: "agenda", look: "glass", size: "small", label: "Today", value: "14:00", unit: "Dentist" })
```

### Pattern, wide

```js
() => h(UI.Widget, { topic: "groceries", look: "pattern", size: "wide", pattern: "lanes", label: "On the list", value: "8", unit: "things", note: "home-baked" })
```

### Ring, tall

```js
() => h(UI.Widget, { topic: "tasks", look: "ring", size: "tall", label: "To do", value: "3", unit: "to go", progress: 0.4, items: ["Sign quote", "Fix tyre", "the neighbour's birthday", "Tax", "Water plants"], done: 2 })
```

### List, large

```js
() => h(UI.Widget, { topic: "mail", look: "list", size: "large", label: "Mail", value: "3", unit: "important", items: ["Contractor: quote", "Tax office", "Alex: Saturday?", "Newsletter", "Dentist: confirmation", "Parents' evening"], done: 1 })
```

## Guidelines

- Do: One widget is one answer: the ring is the progress, the list is the list.
- Do: Put the note next to its subject: the number in glass and pattern, the label in ring and list.
- Do: Fold finished items into one line (3 checked).
- Do: bleed on at most one screen in three.
- Don't: Never bleed in the header zone, and never over readable content.

## Specs

- sizes: `small 170x170, wide 360x170, tall 170x376, large 360x376`
- radius / padding: `radius-widget 26, widget-pad 16`
- value: `52px mono with tabular numerals in wide and large, 46px in small and tall`
- label: `11px mono, 600, .14em, uppercase, in the topic colour`
- ground: `linear 160deg, 70% of the topic ground toward #090b0f, with a 1px edge at 16% of the accent`
- list panel: `radius-panel 14, backdrop blur 10px, rows 14px with a 1px #1a212b divider`
- bleed: `radius 0 0 28px 28px, -16px side margins, no side border`
- busy cost: `pattern 2, ring 1, glass 0, list 0`

## Accessibility

- Every widget carries its answer as text: the value and unit, never only the ring or the pattern.
- Text stays on the widget's ground or its frosted panel, never on the moving shapes.
- A folded line says 3 checked in words, so the tick circles are not the only signal.

## The system's own words

# Widget

A tile that shows one answer at a glance, in four looks (glass, pattern, ring, list) and four sizes (small 170x170, wide 360x170, tall 170x376, large 360x376).

The hero shows the answer itself: the ring IS the progress, the list IS the list. No decoration without meaning.

| Look | Shows | Busy cost |
|---|---|---|
| `glass` | the big number (`value`), `unit`, and in tall and large a frosted list panel | 0 |
| `pattern` | the same over a slow pattern in the topic's two tints (`lanes`, `grid`, `bubbles`, `band`, `rain`, `drift`) | 2 |
| `ring` | a progress ring (`progress` 0..1) with the value inside; tall and large add the open items | 1 |
| `list` | a tick list; the first `done` items fold into one line ("3 done") | 0 |

Consumer provides: `topic`, `look`, `size`, `label` (mono caps in the topic colour), `value`, `unit`, `items` (strings or `[time, text]` pairs), `done`, `progress`, `pattern`, and optionally `note` (the handwritten Anchor) and `bleed` (this screen's one break to the edge).

Values: radius `radius-widget` 26, padding `widget-pad` 16, value 52px mono (46 in small and tall), label 11px mono .14em. Ground is a 160deg fade from `topic-*-ground` to #090b0f with a 1px edge of 16% accent.

Do: one widget = one answer. Put the note next to its subject (the number in glass and pattern, the label in ring and list). Don't: use `bleed` on more than one screen in three, or ever in the header zone or over readable text.

The whole widget lab as three showcase cards: `WidgetGallery` (looks in every size), `WidgetData` (demo data over twelve topics), `WidgetScreens` (scrolling, pictures, the Groceries screen).

