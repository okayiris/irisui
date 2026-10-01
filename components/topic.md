# Topic

Once, high up, on every screen she builds for someone: it colours everything inside it.

Group: Screen parts. Export: `window.IrisUi.Topic`.

## Props

| prop | type | required |
| --- | --- | --- |
| `name` | `TopicName` | yes |
| `children` | `ReactNode` | no |

## Examples

### Groceries

```js
() => h(UI.Topic, { name: "groceries" }, h(UI.ButtonGroup, null, h(UI.Button, { variant: "primary" }, "Add to list"), h(UI.Button, { variant: "glass" }, "Later")))
```

### Parcel

```js
() => h(UI.Topic, { name: "parcel" }, h(UI.ButtonGroup, null, h(UI.Button, { variant: "primary" }, "Track"), h(UI.Button, { variant: "text" }, "Details")))
```

### Sport

```js
() => h(UI.Topic, { name: "sport" }, h(UI.ButtonGroup, null, h(UI.Button, { variant: "primary" }, "Start run"), h(UI.Button, { variant: "glass" }, "Skip")))
```

## Guidelines

- Do: One topic per screen.
- Don't: Never mix two topics, and never put health and travel together: they share their values.
- Do: A part's own topic prop wins over the wrapper.
- Do: Use --k for what matters.
- Don't: Never use a topic colour for body text on bg, and never use --k2 as text.

## Specs

- k: `groceries #4ade80, agenda #7dd3fc, mail #94a3b8, parcel #fbbf24, weather #38bdf8, tasks #2dd4bf, sport #fb923c, money #a7f3d0, travel #2ee6d6, health #2ee6d6, home #fde68a, music #c4b5fd, loop #7dd3fc, explain #ede98a, party #fdab9f`
- k2: `decoration only, never text on its own`
- contrast: `every accent reads on its own ground and on bg at 6:1 or more; fg and dim read on every ground`
- layout: `Topic renders display: contents, so it never changes layout`
- unknown name: `logs a warning and falls back to the ice-blue accent`
- Topic names: `groceries, parcel, weather, money, travel, tasks, health, home, music, party, explain all work`

## Accessibility

- A topic is colour only: the label, the word or the number still says what the thing is.
- health and travel are identical, so never put both on one screen.
- Every accent holds 6:1 on bg and on its own ground, and fg and dim hold on every ground.

## The system's own words

# Topic

Gives everything inside it the colours of one topic: `--k` (accent and pen), `--k2` (second tint), `--kd` (dark ground) and `--k-button` (the primary button, oklch .82 / .12 of the accent).

One accent per topic, one topic per screen. Tokens: `topic-<name>`, `topic-<name>-2`, `topic-<name>-ground`.

| Topic | k | Use |
|---|---|---|
| `groceries` | #4ade80 | shopping list |
| `agenda` | #7dd3fc | today, appointments |
| `mail` | #a78bfa | mail, messages |
| `parcel` | #fbbf24 | parcels |
| `weather` | #38bdf8 | weather |
| `tasks` | #f0abfc | to do |
| `sport` | #fb7185 | sport, movement |
| `money` | #a7f3d0 | money, budget |
| `travel` | #2ee6d6 | travel, routes |
| `health` | #2ee6d6 | health (same as travel: never both on one screen) |
| `home` | #fde68a | lights, heating, devices |
| `music` | #c4b5fd | what is playing |
| `loop`, `explain`, `party` | #7dd3fc, #a78bfa, #f0abfc | a loop, an explanation, a done moment |

An unknown name logs a warning and falls back to the ice-blue accent.

Consumer provides: `name` and the children. `Topic` renders `display: contents`, so it never changes layout. A part's own `topic` prop wins over the wrapper.

Do: set the topic once, high up. Don't: mix two topics on one screen, or use a topic colour for body text on `bg` (it reads, but the accent is for what matters).

```js
h(Topic, { name: "groceries" }, h(Widget, { look: "pattern", label: "On the list", value: "8" }), h(ButtonGroup, null, h(Button, { variant: "primary" }, "Add")))
```

