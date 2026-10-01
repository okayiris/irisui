# Accessibility: what it holds, and what it owes

Contrast, target size, focus, motion and words: what the system holds today, and what it still owes.

## Contrast floors

The floors are WCAG's, quoted here once: contrast of 4.5:1 for text (1.4.3) and 3:1 for large text and graphics (1.4.11), text that survives a 200% size increase (1.4.4), and a target of at least 44 by 44 CSS pixels (2.5.5). Large text is 14pt bold or 18pt regular and up, and disabled states are exempt.

In Iris, --fg carries titles and text on --bg and --dim carries the 12px line under a title. A topic accent holds 6:1 or more on its ground and on --bg, which is the house's own floor on top of 1.4.3; the closest of the fifteen sits at 6.48:1.

> warn: --faint is stated in tokens.css as 3.5:1 and as not for body text. Under the 4.5:1 floor it may only carry a label that repeats something already on screen: a section label, a version line, a chevron.

The parts added in this project do not use it for words. They take --label (#8fa3b0, 7.63:1 on --bg) for section labels, captions and shortcuts, and keep --faint for hairlines and decoration, which is what the release's own note allows.

## What is tested, and what is not

The gate that runs before this site is published measures one of the four floors above: contrast. It measures the tokens the site itself puts words in, each against the surface behind it, and fails a pair below 4.5:1.

- Contrast (1.4.3, 1.4.11): measured for the site's own token pairs, not for every possible pair. A topic accent on its ground is checked by hand, not by the gate.
- Text resize (1.4.4): not tested. No 200% pass is run, and no layout says what happens to a fixed sidebar when the root size doubles.
- Target size (2.5.5): not tested. Nothing measures a hit area, and two parts are drawn below both floors.
- Focus, keyboard and alt text: asked for in words on this page, and not tested by anything.

> warn: So this page is honest in two halves. The contrast of the site's own text is held. Text resize, target size and the keyboard rules are owed, and each one is written down here rather than claimed.

## Targets

The floors: touch at least 48 by 48px, pointer at least 44 by 44px, with 8px between targets. The 44px pointer floor follows WCAG 2.5.5; Iris does not restate either floor as a token.

| Control | Size in Iris | Against the floors |
| --- | --- | --- |
| Button, size md | 44px high | meets the 44px pointer floor; under the 48px touch floor |
| Button, icon only | 44px wide | the same 44px square, against the same two floors |
| Field | 44px high | meets the 44px pointer floor; under the 48px touch floor |
| Tab in the bar | 54px high in a 62px bar | over both floors |
| Button, size sm | 28px high | under both |
| Search clear button | 28 by 28px | under both |

> warn: The small button and the search clear button are drawn at 28px, under both floors. Their visible box may stay 28, but the hit area has to reach 44px on a touch screen.

## Focus

Focus is one ring and it is always visible. In the bundle it is a 2px outline in the accent with a 2px offset, on buttons, chips, segments, check rows, dots and fields. On glass, ext.css uses two rings, 2px of --bg then 4px of --accent.

Nothing removes an outline without drawing the ring.

> rule: Focus follows the hand and the keyboard in the same order.

## Motion

With prefers-reduced-motion reduce, the three durations in ext.css drop to 0.001s, the press scale of .985 is dropped, and the bundle stops the orb, the skeleton, the spinner and the talk effects. A still screen shows the end state of everything: the pen fully drawn, the ring at its value.

## Text scaling

The house rule is that a UI supports at least 200% text increase. Text and line height scale together while padding stays put: a button keeps 8px top and bottom and 24px left and right at 1x, 1.3x and 2x. At 200% a headline should still fit in four lines, and if it cannot, one tap reaches the full text.

In Iris the type tokens are fixed px (28 for a page title, 17 for a row title, 15 for body, 12 for a sub line, 10.5 for a label), so scaling is the browser's zoom. The window kit and the app chapters use rem, which grows with the root size.

> warn: No 200% pass is written in this repo, and no layout says what happens to a fixed 13rem sidebar when the root size doubles. Treat 200% as a rule we owe, not one we hold.

## Language and reading

English is the source and every other language is generated from it. Sentence case everywhere: titles, labels, buttons, menu items. Short sentences, second person, no idioms, because other languages run about 1.5 times longer.

The house adds: no em dashes, no emoji, no exclamation marks. The product is Iris; the assistant is named per house.

> warn: The system publishes no reading level and no sentence length. The one number here is for notifications: a title under 29 characters, a collapsed body under 40.

## Alt text

Alt text does not start with image of, because the reader already says image, and a decorative picture takes an empty alt.

A chart gets its takeaway, not every point.

> warn: The chapters reference the twelve prototype screenshots and four widget photos as bare images with no alt text, and the repo holds no rule for writing one.

## Never colour alone

A status is a pill with a word in it: done, waiting, late. Colour repeats the word and never replaces it, a status is never the accent, and unread mail carries a dot, not a colour change.

In a widget and on a screen, colour carries state and every state also has a number or a word: a lamp that is on, energy made, a battery under 20%.

> rule: Printed in grey, nothing is lost but the smoothness. Every meaning has a second carrier.

## Keyboard

The stylesheet carries the roles and the drawing: a checked menu item takes a check, a current tab takes aria-selected, a dialog sits on a scrim, a sheet comes from the bottom. The behaviour behind those states has to be built.

- A menu opens from its trigger with Enter, Space or the down arrow, moves with the arrow keys, closes on Escape and returns focus to the trigger.
- A dialog moves focus in when it opens, keeps Tab inside it, closes on Escape and returns focus to the opener; the scrim is not a tab stop.
- A sheet follows the dialog rules, and overlays never stack: one at a time.
- Tabs are one tab stop, the arrow keys move between them, Home and End go to the ends, and the current one carries aria-selected.
- A row that opens something is a button, not a clickable div.

> warn: No keyboard handling is written in the CSS and no test for it exists: no focus trap, no Escape handler, no focus return. These are rules we ask for, not values the system proves.
