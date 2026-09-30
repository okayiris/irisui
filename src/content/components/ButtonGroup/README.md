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
