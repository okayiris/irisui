# Icons

One line set, drawn by the system. Fourteen shapes ship, at four sizes, and no screen draws its own.

## One set, from the system

Every icon is a line drawing on a 24 by 24 grid, one path, stroke in currentColor, round caps and round joins, never filled. The bundle draws them in the platform's own icon idiom; the window kit draws the same shapes through Icon as inline 24x24 stroke SVG.

The set is small on purpose. Few and small is the house rule, an icon row that is always visible is not allowed, and an icon that needs a caption under it is the wrong icon.

Colour comes from the parent, never from the icon: 80% of --fg in a settings row, --accent in the current sidebar place, --faint on a chevron. There is no icon colour token.

## What the set ships

The bundle carries fourteen names. This is the whole set, in the order the code holds it.

- sparkles, her working state and the first tab
- loop, a thing that comes back
- camera
- person, the owner
- mic, voice in
- speaker, voice out, and the action pill next to her status
- chevron, a row that opens something, drawn at 14
- external, a row that leaves the app
- car, on the road
- phone, this device
- shield, what she may see
- globe, a domain or a language
- wave, sound or a level
- trash, the one destructive action

A name that is not on this list is not an icon. The bundle draws an empty path for it and the window kit draws a dashed square. Neither is a shape to ship.

> warn: The window kit has 161 names of its own (clock, calendar, mail, car) with English aliases in screen-icons.js. That file is not in this repo, so none of those names can be checked here. Use a name only when you can see it in the bundle.

## Sizes in use

| Where | Size | Where it is set |
| --- | --- | --- |
| Icon default | 20 | bundle.js, Icon size = 20 |
| Tab bar tab icon | 26 | bundle.js, TabBar |
| Settings row icon | 24px container, icon at its default | bundle.css, .iris-row-icon |
| Row chevron and external arrow | 14 | bundle.js, Row |
| StatusPill action speaker | 14 | bundle.js, StatusPill |
| Window kit Icon | 18 by default, size | web-app.md |

Nothing in the system draws an icon above 26. A large picture is a photo, not an icon at 64, and the set has no hero glyph.

## Stroke

The bundle passes a stroke width of 2 on the 24 grid, in currentColor, with round caps and joins; the window kit defaults to a weight of 1.75 on the same shapes. A hairline vanishes on a glass card, which is why the bundle stays at 2.

> warn: The comment above the bundle's icon code says stroke 1.75 while the code draws 2. Match the surface you are on until that is settled: 2 in the bundle, 1.75 in a window.

One stroke weight per surface. Never mix 1.5 and 2 in one row, and never thicken an icon to make it feel important. Weight comes from the words next to it.

## When an icon may stand alone

An icon may stand alone when the control around it carries the name. The icon only Button takes icon and label, and that label is the accessible name. A tab pairs its 26px icon with a 13px word, and a row names itself with its title.

The icon never speaks for itself. Every icon the bundle draws is marked aria-hidden, so a screen reader hears the control and its label, never the shape.

An icon may not stand alone when nothing else names it: a header button with a shape and no label, a list of icons with no words, a row whose only content is an icon.

> rule: One icon per action, and the action is readable in words. If the label has to be hidden to make the row fit, the row holds too much.

## Never draw your own

> rule: Never hand-build a control the system provides, and never draw your own icon. If a part is missing, say so.

- Do reach for a name in the set, and let the size come from where it sits.
- Do give an icon only button its label, so the name is there for a screen reader.
- Do not write an emoji where an icon belongs, and do not ship an emoji as UI.
- Do not add an SVG of your own for something the set already draws.
- Do not invent a stroke weight, a fill, or a second colour for one icon.

> warn: The repo has no icon folder, no naming rule and no mapping from these fourteen names to the shapes the app draws, so there is no agreed way to add the fifteenth. The honest answer today is that the set is closed.
