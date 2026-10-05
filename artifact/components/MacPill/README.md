# MacPill

Iris on the Mac desktop. At rest it is only her orb, low in the middle of the screen. When the hand rests on it, a
bar of buttons grows out from behind the orb; it folds away a moment after the hand leaves. Her words stand above
the orb, one state line under it, with the way back beside that line.

## When

- The one place Iris lives on a Mac desktop. One per screen: the pill is her, so no second orb anywhere near it.
- Panels (chats, calls, the vault, settings) open above the pill from the buttons in its bar.

## The parts

`left` and `right` are the buttons either side of the orb: `{ label, icon, active, onSelect }`, a house icon
name each, the label is the tooltip and the accessible name. `state` is the TalkOrb's state; a press on the orb
calls `onPress`. `words` is what she says, above the orb. `status` is one line under it, `back` the way out
of that state ("Turn sound on", "Try now"). `badge` counts what is new, in the accent. `working` runs the Edge
light round the orb while she works on something. `open` holds the bar out.

## Rules

- No state word while she talks: the orb already talks. Thinking, muted and away say it in words too.
- A state that stops her (muted, away) always has its way back next to the line.
- The badge is a count of new things, never a colour of its own.
- Working is light round the orb and a line that says what she does, not only a count.

## Values

Orb 60px. Bar 44px high, glass with an edge, radius pill, 46px per button, the gap behind the orb is the orb plus
8px. The bar grows in --motion-base with --ease-house, after 180ms of hover, and folds after 700ms.

## Accessibility

Every bar button has a name and a tooltip. The bar opens on focus as well as on hover; folded it is hidden from
the keyboard. Her words are a polite live region, the state line a status.
