# ChatStack

Every chat with its loops as a card in its topic's colour, stacked with depth; a tap fans them out, a tap on one opens that chat with its loops and actions.

Group: Navigation. Export: `window.IrisUi.ChatStack`.

## Props

| prop | type | required |
| --- | --- | --- |
| `items` | `ChatCircle[]` | yes |
| `fanned` | `boolean` | no |
| `current` | `string | null` | no |
| `onSelect` | `(id: string | null) => void` | no |

## Examples

### At rest, tap to fan out

```js
() => h("div", { style: { display: "grid", alignContent: "end", minHeight: 300 } },
    h(ChatStack, { items: [
      { id: "debtors", topic: "money", eyebrow: "Money", title: "Debtors", line: "Van Dijk waits on you", loops: [{ title: "Van Dijk", step: 3 }, { title: "Korenaar", step: 1 }, { title: "Noorderlicht", step: 1 }, { title: "Debtors", step: 1 }] },
      { id: "groceries", topic: "groceries", eyebrow: "Groceries", title: "Groceries", line: "Saturday delivery, 8 on the list", loops: [{ title: "Jumbo", step: 4 }] },
      { id: "renovation", topic: "home", eyebrow: "Home", title: "Renovation", line: "Comparing 3 quotes", loops: [{ title: "Quotes", step: 2 }, { title: "Tiles", step: 1 }] },
      { id: "dentist", topic: "health", eyebrow: "Health", title: "Dentist", line: "Pick a time", loops: [{ title: "Dentist", step: 3 }] },
    ] }))
```

### One chat open

```js
() => h(ChatStack, { current: "debtors", items: [
    { id: "debtors", topic: "money", eyebrow: "Money", title: "Debtors", line: "Van Dijk waits on you",
      message: "Only Van Dijk is 34 days late, 4,840 euros. My suggestion: one last reminder with a deadline, and only then a delivery stop.",
      loops: [
        { title: "Debtors", step: 0, line: "the house rules" },
        { title: "Van Dijk", step: 3, line: "34 days late, 4,840 euros" },
        { title: "Korenaar", step: 1, line: "12 days late, 1,210 euros" },
      ],
      actions: [{ label: "Send the reminder", primary: true }] },
    { id: "groceries", topic: "groceries", title: "Groceries", line: "Saturday delivery" },
    { id: "renovation", topic: "home", title: "Renovation", line: "Comparing 3 quotes" },
  ] })
```

## The system's own words

# ChatStack

Every chat with its loops as a card in its topic's colour, lying in a stack with depth. From the chat-stack sketch.

`CircleStack` is the plain, compact cousin for the strip. This one carries the topic colours and opens a chat.

## States

- At rest: the top card whole, the next two peek out above it, smaller, dimmer and softer; a count says how
  many more. The one that waits on you is on top.
- Fanned: a tap spreads the cards upward (`--motion-slow`, `--ease-house`). Escape folds them back.
- Open: a tap on a card opens that chat on its own sheet: its message, its loops with their phase, its actions
  (the house `Button`, in the topic) and Back. The other chats are two edges behind it.

## The parts

A `ChatCircle` has `id`, `title`, `line`, and optionally `topic`, `eyebrow`, `loops` (a `LoopBubble` each, with a
`line` in the open chat), `message` and `actions`. `fanned` and `current` say where it starts.

## Accessibility

Cards are buttons; at rest only the top one can be reached, named with how many more there are. The open chat is
a region named by its title.
