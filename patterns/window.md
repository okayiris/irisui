# A window she opens

The overlay she lays over the talk for one view: how big it is, what holds its edges, and what never goes inside it.

## A card or a window

A `Card` is a group that belongs together inside something that already exists. A window (`window`) is that something: a sandboxed iframe over the talk page, with a view of its own and no access to the page.

| Surface | What it is | Pick it when |
| --- | --- | --- |
| Block (`block`) | code she injects above the talk in a glass card | it should stay in view while you talk: a timer, a photo, a score |
| Page screen (`screen`) | the talk column rearranged, live parts included | a different arrangement of the page for a while |
| Window (`window`) | one view laid over the talk, then gone | "show me": a day plan, a comparison, a quick form |
| App (`app`) | several views, navigation, its own data (planned) | you will open it again next week: domains, invoices, a trip |

> rule: If it answers one question now, it is a window. If you would open it again next week, it is an app. Never build an app for something a window answers.

## The shape

- The overlay is `rgba(7,9,12,.82)` with `blur(18px)`, and it stops at the input bar, so the field and the send button stay reachable.
- The frame slides in from the right in `.35s` and is glass with the window radius.
- The frame is at most `--window-wide`, default `30rem`. A wide content sheet does not get a wider window; it gets a `Screen` that uses the width it has.
- A `Card` inside a block or inside another `Card` loses its frame. There is one frame per window.

> warn: `web-app.md` names the widest window (30rem) and the grip, but no minimum size and no content-size range. Until that is written, treat the frame as one column that folds at the same widths as the talk page.

## The title bar

The root of every window is `Screen`: padding `1.2rem 1.1rem 2rem`, the `sub` line at `.9rem` in `--dim` above an `h1` at `2rem` / 500. The `icon` prop does not go into the window, it goes to the lane.

- The close cross sits top right at `2rem`, in glass.
- The resize grip sits bottom right. It is the only handle on the frame.
- In the lane, a window's icon carries a small frame corner, so a window is told apart from a page screen at a glance.
- Inside the view, one header per view: title `1.05rem` / 600 on the left, then search, then quiet round icon buttons at `2.2rem` in ghost, and the one primary action last.

> warn: Magnets, meaning a window snapping to an edge or another window, are not in the chapter yet. What is written is the grip, and that the owner moves the frame and pins it to the lane. Do not promise snapping in copy.

## What never appears in a window

- Never a frame inside a frame. One window, one `Screen`, one overlay at a time.
- Never a fixed pixel size. `apps.md` forbids fixed pixel widths above 64px, and the fold answers the frame's width through a container query, never a media query on the screen.
- Never `position: fixed`. The chapter does not name it; the rule that covers it is the container query rule, because a part answers the frame and not the screen.
- Never a hex colour outside the token list, an own font, `outline: none` or `transition: none`. The style gate rejects the window.
- Never a bare `<button>`, a clickable `<div>`, or an own class for what a kit part already does.
- Never three filled buttons. One `primary` per view, the rest quiet or `edge`, and buttons sit under what they act on.

> rule: Every window is built from the kit parts and rooted in `Screen`. Tokens are asked for by name (`var(--accent)`), and every window renders from the same file, so the same screen can be a window on the web, a page on the phone and a widget on the Mac.

## How a window differs from a page

|  | Window | Page screen |
| --- | --- | --- |
| Frame | its own glass frame, max 30rem, sliding in from the right | no frame, it is the column |
| Reach | sandboxed: no access to the page | the page itself, with its live parts |
| Leaves by | `say(text)`, which is how it hands back to the talk | you move back to the talk |
| Parts | the kit with `BASE_CSS` and `KIT_CSS` | every kit rule scoped to `.block` and `.screen` |
| Live page parts | `Clouds`, `Conversation`, `Widgets`, `Tasks`, `Blocks` print a note | they move the real part into place |

> llm: For a model writing a window: root it in `Screen`, put one `primary` action in it, show the result next to the button, use `Icon` for icons and tokens for colour. Sentence case, short, no dashes and no exclamation marks. The product is "Iris".
