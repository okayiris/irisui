# Settings and the You page

The You page is the reference for every settings surface: one column of glass rows, the value on the right, and danger last.

## The You page is the reference

Settings in the app are the You page. One column of rows, each row a Card on --bg, rows 12px apart, card radius 18 and padding 14. Spacing and rhythm come from that page and nowhere else.

1. The person first: name, picture, plan.
2. What Iris may see: mail, calendar, home, location, as switches with one line of explanation each.
3. Voice and language.
4. This device: blocks, voice, notifications, and how she talks here.
5. Account, and danger last.

> rule: Top to bottom is person, then what she may see, then how she sounds, then this device, then danger. A row the person cannot act on sits below the rows they can.

## A row

A row is a 24px icon at 80% --fg, a 17pt title, a 12pt --dim line under it, and one thing on the right.

| Part | What goes there |
| --- | --- |
| icon | a line icon from the system, 24px, never a photo or an emoji |
| title | 17pt, sentence case, the name of the setting |
| subtitle | 12pt --dim, one short line of what it does or what it will change |
| trailing | a Toggle (51x31, violet when on), a menu value, a chevron, or an external arrow |
| chevron | true when the row opens something inside the app |
| external | true when the row leaves the app, instead of a chevron |
| danger | true for a destructive row: the label takes --error |

- One control per row. A toggle and a chevron on one row means the row is two things.
- The subtitle is a sentence with the effect in it: "Blocks, voice, notifications and how she talks here."
- A menu value shows the current choice, in the person's words, never a blank and never a code.
- A value is the shortest true form: a name, a unit, a count. The unit lives in the value, not in the title.

## What a setting may never do without saying so

1. Change what Iris may see without the subtitle naming what she sees and what for.
2. Turn something on for the whole house from one device without the subtitle saying it is shared.
3. Spend money, send a mail or start a loop without the action named in the row.
4. Run in the background, on a schedule or over a network, without the subtitle saying when it runs.
5. Hide a second effect behind one switch.

> rule: If the subtitle cannot say the effect in one line, the setting is two settings. A switch is a promise about the whole app, not about this screen.

## Where danger sits

Danger is one row, at the bottom, alone. Never first, never in the middle of the list, never beside a switch.

- The label takes the danger variant: the text in --error, no toggle, no chevron on its own.
- The label says what goes, in words: "Delete account", not "Remove".
- The row opens a dialog before anything happens, and the dialog names the thing once more.
- --error is red for destructive only. Nothing else on the page is red, and no badge is.

> warn: The system has the danger variant of Row and foundation rule 3 (red for destructive only), but no written rule about the position. This page sets the position for the app: bottom, alone. Move it into the foundations when it ships.

## A value that is still loading

The row stays and only the value waits. The value slot holds a short Skeleton at the width and height the value will take: glass with a 1.4s sheen, from Skeleton's own height and width props.

- Never a spinner inside a row. A skeleton is the shape of the thing that is coming.
- Never an empty right side: an empty right side reads as off, and off reads as broken.
- The row stays tappable only if it does not need the value to work.
- A value that cannot be fetched becomes a sentence, not a skeleton that never ends.

> warn: The system has no token for the delay before a skeleton appears. Until that token lands, pair the skeleton with the motion tokens below.

## States and tokens you may use

| Token | Value | Where it shows |
| --- | --- | --- |
| --state-hover | rgba(180,225,255,.07) | a row under the hand |
| --state-press | rgba(180,225,255,.12) | the moment of the press |
| --state-selected | rgba(125,211,252,.12) | the chosen item in a menu |
| --state-disabled | 0.38 | a control that cannot be used |
| --focus-ring | 0 0 0 2px var(--bg), 0 0 0 4px var(--accent) | keyboard focus, on glass |
| --radius-menu | 14px | a menu opened from a value |
| --sheet-bg, --scrim | rgba(10,13,18,.92), rgba(4,6,9,.62) | a sheet or a dialog over the page |
| --motion-fast / --motion-base / --motion-slow | 0.14s / 0.2s / 0.32s | every answer to the hand |
| --ease-house | cubic-bezier(0.2, 0.9, 0.25, 1) | every answer to the hand |

Under prefers-reduced-motion the three durations become 0.001s and the state stays visible, so a hover or a press still changes the surface without moving.

> llm: When you write a settings page, mirror the You page: 12px between rows, the value on the right, the person's words in the title, danger last. Use these tokens; invent none.
