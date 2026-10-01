# A phone screen

One screen she builds for one person: one answer, one accent, one mark. The rules were settled in review and live in code.

## The seven hard rules

A screen is built from named parts only: `Topic`, `Widget`, `PhaseRing`, `LoopScreen`, `Pen`, `Anchor`, `Word`, `Pattern`, `ButtonGroup`, `PageDots`. The seven rules say how to combine them.

1. The hero shows the answer itself. A timeline with the proposal on it, a route with where you are, a budget bar that does the sum of her sentence, a `PhaseRing` that is the progress. Decoration without meaning scores low, so leave it out.
2. One personal anchor, handwritten. Exactly one `Anchor` per screen, in the topic's pen colour, at -3 degrees, opacity .9, no fill under it. It sits within 24px of its subject (`anchor-reach`) and at least 8px clear of any line or label (`anchor-clear`). It shares no fact with the sub line, the list or her sentence.
3. Her sentence names the person and ties one other thread: "Alex, after the dentist you still have time for the groceries." One link to another thread of the week, and each thread comes back at most twice in a set of screens.
4. At most one hand-drawn mark. One `Pen` per screen, never over a label. The anchor does not count as a pen.
5. One accent per topic. The primary button is that accent, flat, at oklch .82 / .12 (`button-primary-l`, `button-primary-c`) with dark ink. The secondary is glass. Never a gradient or a neon button.
6. One controlled break in three screens. A photo to the edge, a number over the rim, a widget with `bleed`. Never in the header zone, never over readable content. Page dots on such a screen get the dark pill (`PageDots dark`).
7. Function and the personal carry the set. Beauty and expression sit at most half a point lower, and when expression outruns function, beauty drops with it.

> rule: The balance the rules aim for: function and the personal carry the set, and beauty, expression and uniqueness sit close behind. Aim for that shape, never for a spike in one axis.

## The busy budget is 5

Every loud part costs points and one screen holds 5 (`busy-budget`). Count before you draw, not after.

| Part | Cost |
| --- | --- |
| `Word` (effect or theme), text behind a person | 3 |
| pattern widget, duotone photo, `PhaseRing`, route, budget bars | 2 |
| ring widget, timeline, a `Pen` in pen or marker look, confetti | 1 |
| neon pen | 2 |
| clean pen, glass or list widget, buttons | 0 |

Over budget, in this order: the pen turns clean, then confetti goes. If it is still too busy, drop a part rather than shrink everything. Air is the rest height shared evenly over the hero, the block and her sentence, at most 16px extra per gap and never more than 28px (`air-max`). The header stays the same height on every screen.

> rule: Still means the end state. Under reduced motion, in a screenshot, a thumbnail or a share image, the pen is fully drawn, the ring is at its value and the Word is in its final pose. Never a half-drawn circle or a letter mid-pop. The parts do this themselves when `prefers-reduced-motion` is set.

## One screen, built

A shopping screen for Alex. Topic `groceries` (accent #4ade80, ground #04241f), one pattern widget on the list, one pen mark, one primary button. Budget: pattern widget 2 plus a pen in the pen look 1 is 3 of 5. The anchor is free, the buttons are free.

```js
h(Topic, { name: "groceries" },
  h(Widget, {
    look: "pattern",
    size: "wide",
    label: "On the list",
    value: "8",
    unit: "things",
    pattern: { kind: "lanes" },
    note: "home-baked"
  }),
  h(Pen, { kind: "bracket", look: "pen" }, "Fruit and vegetables"),
  h(Anchor, null, "for the neighbour"),
  h(ButtonGroup, null,
    h(Button, { variant: "primary" }, "To the shop"),
    h(Button, { variant: "glass" }, "Later today")
  )
)
```

- The widget carries the answer: 8 things, and the pattern is only its ground.
- The `Pen` bracket sits over two rows, in the topic colour, never over a label.
- The `Anchor` adds the personal fact ("for the neighbour") and shares nothing with the widget label or her sentence.
- One primary, in the topic accent, flat. The second action is glass.

> rule: Colour: a topic has three values, `topic-<name>` for the accent and the pen, `topic-<name>-2` for a second tint used in decoration only, and `topic-<name>-ground` for the ground. Every accent reads on its own ground and on `bg` at 6:1 or more. `health` and `travel` share every value, so they never share a screen.

## What a screen never does

- Never a gradient or a neon primary button, and never two primaries.
- Never two notes and never two pen marks. A second `Anchor` renders as a plain dim line and warns.
- Never a mark over a label, and a strike only in a tick list.
- Never a `Word` and a pattern hero on one screen.
- Never text sitting on a pattern without the frosted panel behind it.
- Never an emoji in a widget label.
- Never the one break in the header zone or over readable content.
- Never an empty black screen: anything that loads shows a `Skeleton` in the shape of what is coming.

> warn: Text behind a person is measured (at least 65% visible, the whole word inside the photo) but the length of a screen's copy is not fixed anywhere. Keep her sentence to one line and let the renderer drop a list row before it drops the hero.
