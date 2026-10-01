# Screens: the golden key

The screens Iris builds for someone (a widget, a loop, a list, an answer with a picture) follow one recipe. It came out of an internal critic review of the screen builder, and it lives in code. Build with `Topic`, `Widget`, `PhaseRing`, `LoopScreen`, `Pen`, `Anchor`, `Word`, `Pattern`, `ButtonGroup` and `PageDots`; these rules say how to combine them. The recipe of each part: `systems.md`.

## The seven hard rules

1. **The hero shows the answer itself.** A timeline with the proposal on it, a route with where you are, a budget bar that does the sum of her sentence, a `PhaseRing` that is the progress. Decoration without meaning scores low: leave it out.
2. **One personal anchor, handwritten.** Exactly one `Anchor` per screen, in the topic's pen colour (`topic-*`), -3 degrees, opacity .9, no fill under it. Within 24px of its subject (`anchor-reach`), at least 8px clear of lines (`anchor-clear`). It shares no fact with the sub line, the list or her sentence.
3. **The assistant's sentence names the person and ties one other thread.** "Alex, after the dentist you still have time for the groceries." One link to another thread of the week; each thread at most twice in a set of screens.
4. **At most one hand-drawn mark.** One `Pen` per screen, never over a label. The anchor does not count as a pen.
5. **One accent per topic.** The primary button is that accent, flat, at oklch .82 / .12 (`button-primary-l`, `button-primary-c`) with dark ink (`bg`); the secondary is glass. Never a gradient or neon button.
6. **One controlled break in three screens.** A photo to the edge, a number over the rim, a widget with `bleed`. Never in the header zone, never over readable content. Page dots on such a screen get the dark pill (`PageDots dark`).
7. **Function and the personal carry the set.** Beauty and expression sit at most half a point lower. When expression outruns function, beauty drops with it.

## The balance

The rules aim at a balance rather than a spike. Functional and personal come first: the hero is the answer
(rule 1) and the anchor, the name and the thread carry the personal (rules 2 and 3). Beauty and expression
sit right behind: rest, a flat primary and air carry the beauty, one Word or pattern and one pen mark carry
the expression. None of them is allowed to run ahead of the others.

## Less is more: the busy budget

Every loud part costs points; one screen holds **5** (`busy-budget`).

| Part | Cost |
|---|---|
| `Word` (effect or theme), text behind a person | 3 |
| pattern widget, duotone photo, `PhaseRing`, route, budget bars | 2 |
| ring widget, timeline, a `Pen` in pen or marker look, confetti | 1 |
| neon pen | 2 |
| clean pen, glass or list widget, buttons | 0 |

Over budget, in this order: the pen turns clean, then confetti goes. If it is still too busy, drop a part rather than shrink everything. When in doubt, take one away: a screen with room reads as calm and as sure of itself.

Air: the rest height is shared evenly over the hero, the block and her sentence, at most 16px extra per gap and never more than 28px (`air-max`). The header stays at the same height on every screen. Finished rows fold into one line ("3 checked"). Strike-through only in tick lists.

## Still means the end state

A screen that does not move (reduced motion, a screenshot, a thumbnail, a share image) shows the end state of every animation: the pen fully drawn, the ring at its value, the Word in its final pose. Never a half-drawn circle or a letter mid-pop. The components do this themselves when `prefers-reduced-motion` is set.

## Text behind a person

Text placed behind a person in a photo (the depth cut-out) stays at least **65% visible** (`text-behind-person`), and the whole word stays inside the photo. Something must pass in front of it, or the effect is lost; more than a third covered and it stops being a word.

## The loop screen

One loop in detail is a `LoopScreen`: the `PhaseRing` with its six labels and a pen circle round the current one, the title in a gradient toward the phase colour, a glass NOW card with a dot per phase, Done in glass. Finished phases stay full in their own colour, the current one runs as an hourglass (the sand piles up at the end of its segment), done lights the whole ring and throws confetti once. The middle is text only, a glass disc, lanes, or the title as a `ThemeWord`: pick one, and count it in the budget.

## Colour and contrast

- Each topic has three colours: `topic-<name>` (accent and pen), `topic-<name>-2` (second tint, decoration only) and `topic-<name>-ground` (dark ground). Every accent reads on its own ground and on `bg` at 6:1 or more (above the 4.5:1 the build gate checks); `fg` and `dim` read on every ground.
- `Word` lightens its letters until they hold 4.5:1 on their ground, so a theme's deep stop (fire's red, autumn's burnt orange) never sinks away.
- Phase colours are fixed and do not follow the topic: `phase-recognised`, `phase-planned`, `phase-busy`, `phase-you`, `phase-check`, `phase-done`.
- `health` and `travel` share their values: never put both on one screen.
