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
