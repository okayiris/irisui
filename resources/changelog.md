# Release notes

What v33 adds, what v32 is, what changed in it, and what this project added on top of the release.

## Release v34

v34 is this project's release of 1 october 2026, the same day as v33. The package is version 34.0.0. It is also the first kit a house gets as a package: iris-ui, installed and updated by an order, never copied.

| what | in v34 |
| --- | --- |
| Card topic | a card on its topic's ground: the same still fade as a Widget, the first label in the topic colour. No motion and no busy cost, so a grid of cards carries a colour per category. IrisApp passes topic to Card. |
| Package for a house | scripts/build-house.mjs writes the kit as iris-ui (kind kit) with its tokens, the package a house installs and upgrades with plugin update iris-ui. |
| Fixes | a bound Row flips its switch once (the switch and the row both set it, so under preact it flipped back). |

## Release v33

v33 is this project's release of 1 october 2026: the design system of v32 with everything added since. The package is version 33.0.0. The chapters in src/content are still those of v32; what v33 adds lives in the added parts and on these pages.

| what | in v33 |
| --- | --- |
| Light and dark | Iris follows the system, data-mode="light" or "dark" on <html> fixes it. Every token and every fixed colour of the release has both halves; the site has a light, dark or system switch. An app in light gets a ground: a wash of its own colour, tinted cards with a soft shadow. |
| IrisApp | a whole app from one spec, with real navigation, sheets and dialogs, state, lists that filter, swipes (Rail, Pages, Bento, Meter) and swiping sideways between tabs. As a window it takes a NavRail. checkApp checks a spec against Meaning. |
| Picture | a photo as content: a caption, or words over its foot like a cover, or beside it on a card; drawn plain, duotone (with a dark end in both modes) or parallax. |
| Meaning: neighbours | N1 to N6, what may stand next to what: one now per screen, one loud per row, a pattern only behind a panel, a number says what it counts. |
| New parts | MacPill, VaultAsk and TableApp as real components; Edge and EdgeText, the apps' light patterns; Mark, her ring as a still; Photo, BorderPattern and ChatStack. |
| Fixes | a screen never shrinks under the tab bar, an empty group draws nothing, Toggle has a name, the topics of mail, sport and tasks leave violet, red and magenta. |

## Release v32

v32 is the release the site is built against. Its package was version 32.0.0, the site said v32 and its date is 30 september 2026. The artifact is the set of files under public/ds: the two scripts, the stylesheets, the type declaration, the readme and the chapters.

The release records itself in public/ds/design-system.json. That file was created on 2026-09-28T10:25:33Z and is at version 1 of its file record. Its last change is 2026-09-29T19:52:40Z.

## What the release records

| field | value |
| --- | --- |
| createdOnFiles.at | 2026-09-28T10:25:33Z, version 1 |
| lastChange.at | 2026-09-29T19:52:40Z |
| manifestVersion | 3 |
| namespace | IrisUi |
| libraries | react 18 as React, react-dom 18 as ReactDOM |

public/ds/manifest.json lists what the release carries. It names eight components in five groups: Orb in brand; Button and Toggle in controls; Skeleton in feedback; StatusPill and TabBar in navigation; Card and Row in surfaces. It names the eight component readmes, bundle.css, bundle.js, index.d.ts and tokens.css, and beside them the two chapter files the release publishes: web-app.md and website.md.

## What v32 changed

The note on the release is exact: previews for Chip, Progress, Stat, CheckList, Segmented and Field, plus one badge in magenta on the orb's rim, using the badge tokens. That is the whole of the last change. Everything before it was the release taking shape: the parts, the stylesheets, the declaration and the fonts.

Two of the parts the note names, Chip and Segmented, are in the bundle; Field and Progress, Stat and CheckList are in it too. The badge the note names is not in the bundle list, so it lives as a component with its own readme rather than as a registered part.

## What this project added

The parts this project added were built from the system's own tokens, because the system had none of them. Each one takes the house Button.

| part | group | what it is |
| --- | --- | --- |
| Menu | controls | a list of choices on its own surface, anchored to what it changes. |
| Dialog | overlays | the one place Iris interrupts, a decision that cannot wait. |
| Sheet | overlays | secondary content anchored to an edge: the bottom, or the side on a wide window. |
| Snackbar | feedback | one line of what just happened, beside the thing it happened to. |
| Tooltip | feedback | the name of an icon button, after a short delay. |
| Badge | navigation | a count or a mark on a tab or an icon. |
| Slider | controls | one value on a line, for a level or an amount. |
| TextArea | controls | a Field that holds more than one line. |
| Select | controls | one of many, when the list is too long for a menu. |
| SearchField | controls | the field that finds things, with the wait built in. |
| Tabs | navigation | the sections of one screen, with the ink that slides. |
| Steps | navigation | where you are in a short sequence. |
| EmptyState | feedback | what a screen says when there is nothing in it yet. |
| Divider | surfaces | a line that separates, with an optional label. |
| CircleStack | navigation | every chat with its loops, stacked behind the strip; the iPhone app's home for loops since the Loops tab went. |
| LoopBubble | feedback | one loop, small: its letter and its six phases, the current one lit. |

The additions are published as one script beside the release and its own stylesheet. That script is not a new release: it takes the React the page already has and adds its parts to the same global.

## The values the additions introduced

The added parts needed values the system did not have. They sit together at the top of the additions' stylesheet, in one block, and are meant to move into the token file when this ships into the artifact.

- --state-hover, --state-press, --state-selected and --state-disabled: the four answers a hand gets.
- --motion-fast, --motion-base and --motion-slow: 0.14s, 0.2s and 0.32s, and --ease-house, cubic-bezier(0.2, 0.9, 0.25, 1).
- --focus-ring: the two ring stop, a page-coloured gap and an accent line.
- --elev-1 and --elev-2: light on the edge, and the one real shadow the system allows, for a menu or a dialog.
- --sheet-bg and --scrim: the fill of a sheet, and the dimming under it.
- --radius-menu, --radius-sheet and --radius-field: 14px, 22px and 12px.
- --bp-medium, --bp-expanded and --bp-large: 600px, 840px and 1200px.

Under prefers-reduced-motion the three durations fall to 0.001s, so a part still changes state without moving.

## The site itself

The site is this project's other addition: written content plus a renderer that turns it into pages and into plain-text twins. None of it is in the artifact.

> warn: Be exact about the boundary. bundle.js, bundle.css, tokens.css, index.d.ts, design-system.json and manifest.json are the published release. The additions, their stylesheets and the site are this project's, and the last change note in design-system.json does not mention them. The added values are not in tokens.css yet, and the added parts are not in bundle.js or in the manifest yet.
