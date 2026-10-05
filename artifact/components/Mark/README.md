# Mark

Her ring as a still, sharp mark. It is the brand kit's own render (1024px, with its glow), served in three
sizes, so it stays crisp at any size and on any screen.

## When

- A logo: the top of a sign-in, a lock screen, the PIN pad, an empty page, a mail.
- Anywhere the ring stands still and means "this is Iris".

For her state (listening, thinking, talking, away) take the `Orb` or the `TalkOrb`: those move and change
with her. Never put a Mark and an Orb on one screen.

## Size

`size` is the ring. The glow reaches past it on every side, as light does: leave about a ring's width of room.

## Which Iris, how big

Four drawings of her, and each has its own sizes. What counts is the ring you see, not the box.

This table is documentation, not a product surface: it shows several orbs side by side to compare them. On a
screen the rule stays one orb per surface.

| Where | Take | size |
|---|---|---|
| In a line of text, a chip, a tab | `Orb` | 16 |
| A status, a corner, a header, a task row | `Orb` | 22 |
| A field you type to her (the ring stands in for the mic) | `Orb` | 28 |
| A list row, a card head | `Orb` | 34 |
| The Mac pill | `TalkOrb` | 60 |
| The phone's tab bar | `TalkOrb` | 66 |
| A logo: sign-in, lock screen, PIN pad | `Mark` | 48 to 96 |
| The talk screen: she talks (the neon lines round her) or thinks (an `Edge` pattern, another each time) | `TalkOrb` | 120 or more |
| The big moment: the first start, a hero on the web, a video | `Orb3D` | 100 or more |

- The `Orb` is only ring: it fills its size. Its ring is as tall as the text next to it, never smaller.
- The `TalkOrb` draws its ring at about a third of its size. The rest is room for the glow and the waves.
  So it is never smaller than 60: at 28 its ring is 9px, a dot next to 22px text.
- Only these steps. A size between them is a bug, not a choice.
- Small and live is an `Orb`. Big and live is a `TalkOrb`. Still is a `Mark`.
- The neon lines (talking) and the thinking patterns are the `TalkOrb`'s. They need room, so they never come
  on an `Orb`: small, she talks with the ring's turn alone.
- The `Orb3D` is glass and light, drawn with WebGL: one per screen, never in a bar or a row, and where WebGL is
  missing it falls back to the flat `Orb`.
