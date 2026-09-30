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
