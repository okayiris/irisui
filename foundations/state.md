# State

What a part does when a hand answers it, the layer values behind that answer, and the floor underneath.

## The seven states

A part is in one of seven states. Six change how it looks. One stops it looking like a part at all.

| State | What it means | What changes |
| --- | --- | --- |
| hover | A pointer is over it, nothing decided yet | the fill, nothing else |
| press | The hand is down | the fill and a shrink to 0.985 |
| focus-visible | A keyboard is here | the `--focus-ring` |
| selected | This one is the current one | the accent layer, an icon that fills, one indicator |
| disabled | It cannot be used now | 38% opacity on the whole part |
| busy | It is working | a spinner in the label, cursor progress |
| error | Something failed | `--error` text, destructive only |

## The layer values

A state is a layer over the part, not a second colour. The layer is the accent or the ink at a fixed alpha.

| Token | Value | Where it shows |
| --- | --- | --- |
| `--state-hover` | rgba(180, 225, 255, 0.07) | the hover of any glass part, `.ix-hit:hover` |
| `--state-press` | rgba(180, 225, 255, 0.12) | the press fill |
| `--state-selected` | rgba(125, 211, 252, 0.12) | the current item, in the accent |
| `--state-disabled` | 0.38 | the alpha of a part that cannot be used |

> rule: One layer at a time. A hovered, pressed, focus-visible part shows the press layer plus the ring, never two fills on top of each other.

## Every control answers the hand

- A control that can be used answers hover and press. `.ix-hit` is the shared answer, on background, border colour, transform, colour and opacity, at `--motion-fast` with the house curve.
- The press is a shrink to 0.985, in place. A slider handle goes to 1.08 on hover and 0.96 on press; the talk button's disc and core go to 0.93.
- Text answers too. A tab goes from `--dim` to `--fg` on hover, a text button underlines with an offset of 4px.
- A part that cannot be used answers nothing. A disabled part inherits no state layer at all.

## Focus is a ring

```css
--focus-ring: 0 0 0 2px var(--bg), 0 0 0 4px var(--accent);
```

One ring, on the accent, with a 2px gap of `--bg` between the part and the ring. The gap is the point. A single accent outline sinks into a glass card; a ring with a background-coloured gap stays visible on glass, on a dark ground and inside a topic.

- Focus is `:focus-visible`, so a mouse click does not leave a ring behind.
- The ring is not a state layer and does not count as one in a table of layer values.
- Parts written before `ext.css` use `outline: 2px solid var(--accent); outline-offset: 2px`. Same idea, one ring, on the accent.
- The ring is never removed without a replacement. `outline: none` is allowed only where the box-shadow ring takes its place.

## Disabled is 38% opacity

Disabled is `--state-disabled`, 0.38 opacity. It is never a different hue. A grey-blue disabled pill teaches people that disabled is another kind of thing, so they stop trusting the colour of the parts around it.

- The part keeps its own fill and its own label colour, and the whole thing fades together.
- A disabled part cannot be focused, pressed, hovered or dragged, and it takes no pointer events.
- It keeps its place in the layout. Nothing reflows and nothing else moves when a part becomes unusable.

> warn: One part breaks the rule. In a topic, `.iris-btn-off:disabled` keeps full opacity on its own ground, #151a21, with a #56606d label. Treat that as the exception, not as the pattern to copy.

## Busy, selected and error

- Busy: a button keeps its label, adds a spinner, sets `cursor: progress`, and a primary fill mixes to 70% so the part reads as working instead of broken.
- Busy, her own screens: `effects.md` asks for a line or an edge instead of a spinner while her screens reload. A spinner belongs to a control that is working, not to a house reload.
- Selected: the accent layer at 12%, an icon that fills, one indicator in place, and text that stays `--fg`. Never a second accent on the same screen.
- Error: `--error` #f87171 is for destructive actions only. It is text, a dot and a danger menu item, never a fill that competes with the accent.

## The floor for targets

Iris names no target token. What the parts measure is the floor in practice.

| Part | Size | Floor |
| --- | --- | --- |
| `.iris-btn-md` | 44px high, 20px side padding | on the 44px pointer floor |
| `.iris-btn-lg` | 56px high, 24px side padding | above the floor |
| `.iris-btn-sm` and an icon-only small button | 28px high, 28px wide | below the floor, a desktop-only part |
| `.iris-chip` | 30px high, 12px side padding | below the floor |
| `.iris-dot` | a 7px dot in 8px by 4px of padding | below the floor |

> warn: The system has no 48px part and no target token in `tokens.css` or `ext.css`. A control that must meet 48x48 needs a padded hit area of its own; nothing in the system provides one.

## The layer values, state by state

One layer, over the container, at a fixed opacity per state.

| State | Iris |
| --- | --- |
| hover | 7%, `--state-hover` |
| focus | a ring, not a layer |
| press | 12%, `--state-press` |
| drag | not named in the system |
| disabled | no contrast requirement, no state layer; answered with 38% opacity |

- Hover is 7% and press is 12%: a press should feel like a decision, not like a second hover.
- The system drops the focus layer and pays for the ring instead, which is stricter: a layer on glass is easy to miss, a ring is not.
