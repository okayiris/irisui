# Surfaces

Choosing where something she built lands, from a line in the chat to a full app.

Group: App layouts. Export: `window.IrisUi.Surfaces`.

## Guidelines

- Do: Pick the smallest surface that holds it: block, Stat, window, screen, device, app.
- Don't: Never build an app for something a window answers.
- Do: If he would open it again next week, it is an app; if it answers one question now, it is a window.
- Do: The App surface is planned, not in the kit yet.

## Specs

- Grid: `repeat(3, minmax(0,1fr)), gap 1.3rem; 1 column below 40rem`
- Card: `radius .9rem, padding .9rem 1rem, name 1.05rem / 600, command 11px mono --faint`
- Diagram: `6.5rem high, radius .7rem`
- Commands: `block, Stat, window, screen, device, app`

## Accessibility

- The diagram is decoration: it must not be the only thing that says which surface this is.
- Each card names its command in text, so the surface can be picked without reading the picture.

## The system's own words

# Surfaces

Every place Iris can put something she built, from a line in the chat to a full app, and when to pick which.



