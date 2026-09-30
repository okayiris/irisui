# CircleStack

Every chat with its own loops is one circle, stacked with depth behind the strip.

Since 29 September the iPhone app has no Loops tab and no Loops page. The strip at the bottom is the live
conversation; the other chats, each with the loops hanging under it, wait behind it as circles. The release still
describes the Loops tab (TabBar, the app chapter); the app is ahead of it here.

## When

- The iPhone app, directly above the strip: the one place a person sees every chat and every running loop.
- Not on the Mac: the `MacPill` keeps its own Loops button.

## The parts

Closed, only the top edges of the next two circles peek out above the strip, each a step narrower, higher and
dimmer, with the count on the right. A tap fans the stack upward into cards; the most urgent card sits nearest the
strip. A tap on a card opens that chat and closes the fan. Escape closes it too.

A card: the chat's title, one line under it (pink when a loop waits on you, since that line is her question), up to
three `LoopBubble`s overlapping, `+n` for the rest, and the accent dot when there is something unread.

`items` is a list of `{ id, title, line, unread?, loops? }`, each loop `{ title, step }`. `open` and
`onOpenChange` make it controlled; `onSelect` hands over the id of the chat to open.

## Rules

- Order: a loop waiting on you first, then unread, then the order given (newest first). Six at most.
- The stack never covers the strip: it sits above it, and the strip stays the conversation.
- Nothing shows when there are no circles; the strip stands alone.

## Values

| value | where |
| --- | --- |
| edges | 16px tall, top radius 16px, `--glass` with 1px `--edge`; the second 10px narrower each side, 8px higher, 65% |
| count | `--text-label` in `--accent` on `--state-selected`, a pill |
| card | padding 11px 14px, `--radius-card`, `--bg` at 60% over a 20px blur, 1px `--edge`, 8px apart |
| title | 600 15px, `--fg` |
| line | `--text-sub`, `--dim`, or `--phase-you` when a loop waits |
| bubbles | 26px, 6px overlap |
| unread | 7px dot, `--accent` |

## Accessibility

Closed it is one button, named with the count ("4 conversations") and `aria-expanded`. Open it is a list of
buttons, each read as its title, its line and its loops. The unread dot carries the word "unread" for a screen
reader.
