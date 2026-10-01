# Contribute

Add a part or a value to the system, in the real files, and hold it to the same promises as everything already there.

## The rules a part keeps

A part that joins the system keeps the same promises as the parts already in it. These are not style advice; they are the lines a review will hold you to.

- Tokens only. Every colour, duration, radius and space is a var() from the token file, or one of the added values when the system had no token. No raw hex, no raw pixel duration.
- The four states. Hover, press, focus and disabled each get an answer. Hover uses --state-hover, press uses --state-press, disabled is an opacity of 0.38, and busy says what it is doing.
- A focus ring. Keyboard focus shows --focus-ring, the accent line with a page-coloured gap. Never remove the outline and put nothing back.
- Reduced motion. The part loses its movement under prefers-reduced-motion, through the durations, not through a rewritten animation.
- Dark only. Iris is near-black with one accent. There is no light theme to add, and no second accent.
- Sentence case. Labels, titles and menu items start with a capital and continue in lower case. No title case.
- No emoji. Not in a label, not in a value, not in an empty state.
- The house Button. If the part needs a button, it takes the system's Button, so a topic and a size still work.

## What a part brings with it

A part is not done when it draws. Five things travel with it, and a review looks for all five.

1. The code, with typed props, registered on window.IrisUi beside the parts that already ship.
2. The styles, in a section of their own, built from the tokens and overriding nothing in the release.
3. A preview. A part that moves into the release carries its own preview and a readme beside it. A part that is still an addition gets its frames from the additions' own variant code, where each variant carries the code that draws it.
4. Props. Every prop is typed, and a shipped part publishes its own declaration; the prop table on this site comes from there.
5. The system's own words: what it is, when to reach for it, its parts, its rules, its values and its accessibility. A page on this site follows from that automatically.

## How you hand it in

The types are checked first: run the type check and fix what it finds. The renderer is Node only, so a mistake in a page's content shows up there before it shows up in the browser.

Then build the additions and the site with the commands the repo's own readme lists. The build prints the page count, the component count and the warning count; read the warnings, because a part that adds a value the system already had usually shows up there.

## The gate

The gate builds nothing. It looks at what was built, page by page, and asks each page for six core things: a real h1 and only one of them, a page title, no sideways scroll, no console error, no failed request, and a contrast check over the token pairs the site puts words in.

It asks for more beside those: heading levels that do not skip, html lang set to English, one main landmark and a nav, every demo frame titled, every image with alt text, every control with an accessible name, no positive tabindex, and no internal link that points at a file the build does not carry. Nothing that looks like a credential may reach a published file.

The contrast check measures each of those token pairs against the surface behind it and fails a pair below the floor: 4.5:1 for text, and 3:1 for large text and graphics.

Every demo frame is opened as well: a frame that drew nothing, or one that could not mount its variant, fails with the reason printed. The two things a visitor does are walked too: the search shortcut, and the button that opens the code behind a frame. Run the gate with the command the repo's readme lists, and read the failures it prints, because each one names the page or the frame and the reason.

## How to add a value

A value is smaller than a part but it has the same two homes. If the value belongs to the release, it goes into tokens.json and tokens.css, with a comment that says what it is for, and the system's own rules for sizing and spacing hold it. If it is a value the system did not have, it waits in the added block at the top of the additions' stylesheet until it moves.

Add it once and name it for what it does, not for where it is used. Then use it in the parts that need it and nowhere else. A value with two names, or a value written twice in two files, is the first sign of a system that stopped holding.
