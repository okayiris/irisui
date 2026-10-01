# DocumentApp

Long text: a plan, notes, a report she wrote.

Group: App layouts. Export: `window.IrisUi.DocumentApp`.

## Guidelines

- Do: The column is 40rem at most and centred; a wide window gets more air, never longer lines.
- Don't: Do not stretch the text to the window.
- Do: Put Updated 11:34 in mono above the title, so it is clear when she last touched it.
- Do: One toolbar of quiet icon buttons; the info button toggles the inspector.
- Don't: Do not put a row of filled buttons in the document header.
- Do: Below 52rem the inspector floats as a glass panel over the text instead of squeezing it; below 40rem the notes list becomes the bottom bar.

## Specs

- Frame (window / phone): `60rem x 31rem, radius 1rem / 23.5rem x 36rem, radius 1.6rem`
- Column: `max-width 40rem, centred, padding 1.6rem 1.4rem 5rem`
- Title / body: `h1 2rem / 500, body line-height 1.6, subheads 1.05rem / 600`
- Inspector: `15rem, border-left 1px --line, padding 1rem`
- Below 52rem: `inspector absolute, right .6rem, top 3.8rem, bottom .6rem, radius 1rem, rgba(12,17,23,.94), blur 18px`

## Accessibility

- The toolbar buttons are icon-only, so each needs an aria-label (Edit, Share, Details).
- The inspector is a region with a label, after the article in the DOM, so it is reachable but does not interrupt reading.
- The mono Updated line is before the title, so a screen reader gets the age of the text first.

## The system's own words

# DocumentApp

A reading column with a toolbar, and an inspector on the side for details. The inspector folds away on a narrow window.

A reading column for long text, with a toolbar and a details panel: notes, a plan, a report she wrote.

- The column is `40rem` at most, centred, title `2rem`/500, body `1rem`/1.6. A wide window gets more air, never longer lines.
- The toolbar is quiet icon buttons in the header; the info button toggles the inspector on the right (`15rem`, a hairline on its left).
- Below `52rem` the inspector floats as a glass panel over the text instead of squeezing it; below `40rem` the notes list becomes the bottom bar.
- "Updated 11:34" in mono above the title, so it is clear when she last touched it.

