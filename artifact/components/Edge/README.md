# Edge

The apps' light patterns along an edge (`Rand.swift`), drawn the same way on the web: round her orb while she
thinks, along the phone's rounded screen while her screens reload.

## Thinking is never one look

She thinks with a different pattern each time, picked from the cheerful set `THINKING`: comet (two colours up
both sides), zip (fills both ways and back), orbit (a round), sparks, flow and party. The `TalkOrb` and the
`Orb3D` do this themselves; `thinking: "zip"` holds one.

- Cheerful: bright neon on the dark, never grey, never a spinner.
- It hugs her ring (70/60 of the TalkOrb, 72% of the Orb3D). It never crosses the screen.
- One edge at a time. While she thinks, the screen's own edge stays still.
- Moods (`aurora`, `heartbeat`, `breathe`, `wave`) are for moments she chooses, not for thinking.
- Reduced motion: one still frame.

## Shapes and words

- `shape: "ring"` round her orb, `"rect"` along a rounded screen, or `path`: any SVG path, fitted into the box.
  A path of several pieces (an icon) lifts the pen between them.
- Words take `EdgeText`: the light runs round every letter, as a neon sign. It is SVG and CSS, no canvas.
- One lit thing per screen, the same as the busy budget counts a neon Word: a lit word and a thinking orb never
  share a screen.

## Cost

About 1% of one core for one Edge (measured: 5 to 14 ms of work a second, party the most). Out of sight it
stops, and with reduced motion it is one still frame. `EdgeText` is a CSS animation and costs less still.

## Size

`width` is the line. The glow reaches up to 36px past it on every side; the canvas holds that room itself, but a parent with
overflow: hidden cuts it off. Leave the room free.
