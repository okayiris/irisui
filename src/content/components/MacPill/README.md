# MacPill

The Mac pill is only the orb: a 60pt TalkOrb floating above every window, with a glass bar of buttons that grows out from behind it when the mouse rests on it.

Built from TalkOrb (`window.IrisUi.TalkOrb`), a glass capsule and small mono labels. No component of its own in the bundle: the preview composes it.

Anatomy, top to bottom:

- Above: what you say while you hold to talk (12pt medium, centred, in quotes), or while she works: a dot, "6 steps" and a STEPS chip that opens the overview.
- The orb, 60pt, every TalkOrb state. While she works through steps (tool calls) a dotted ice-blue ring (#7dd3fc, 70pt) turns slowly round it.
- The bar behind it, 44pt high, glass (`surface` over blur, 1px `edge`): left loops and chats, a 68pt gap under the orb, right vault, settings and the mic. "Continue here" joins on the left when another device holds her voice. The bar is shorter on a side with fewer buttons and shifts so the gap stays under the orb.
- Under it: one word of state in mono capitals (9.5pt, tracking 1.4, #8fa3b0): LISTENING, THINKING, WORKING, MUTED, CONNECTION LOST, WATCHING. Nothing while she talks: the ring already says so. When she talks elsewhere, a neon "Continue here" chip takes that place.
- Badge: the count of new messages plus Mac notifications, centred on the orb's rim at the top right (45 degrees), never cut off. Magenta `badge` (#c026d3) with white bold 11pt digits (`badge-ink`, 4.7:1), a 2pt ring in `bg` round it and a soft magenta glow; "99+" above 99, gone at 0. Click opens notifications. No red: red means destructive only.

Behaviour:

- Mouse on the orb: the bar opens after 180 ms, so passing over it does nothing. Off: it stays 700 ms, then folds back into the orb (scale x 0.3 to 1, blur 6 to 0, from the centre).
- The bar stays open while a panel from it is open or while you talk.
- Button: 36pt, icon 14pt, 85% ink. Hover or open: neon #2ee6d6 icon on a 16% neon disc, and a white tip 32pt above ("Loops"). The native tooltip is too slow on a panel that never takes focus.
- Click the orb: type to her (Spotlight-like field). Right-click: type, status and steps, notifications, mute, replay, quit. Drag anywhere on the pill to move it; drop a file on it to send it (violet ring).
- MUTED: click the word to turn sound back on.
- Panels (settings, loops, chats) open above the pill, or below it when the pill sits at the top of the screen.

```js
const h = React.createElement;
h(TalkOrb, { state: "thinking", size: 60 })
```
