# LoopScreen

One loop in detail, as a whole screen.

Group: Screen parts. Export: `window.IrisUi.LoopScreen`.

## Props

| prop | type | required |
| --- | --- | --- |
| `title` | `string` | yes |
| `when` | `string` | no |
| `sub` | `string` | no |
| `phase` | `Phase | 0 | 1 | 2 | 3 | 4 | 5` | no |
| `progress` | `number` | no |
| `now` | `string` | no |
| `center` | `'none' | 'glass' | 'pattern' | 'word'` | no |
| `pen` | `boolean` | no |
| `onDone` | `() => void` | no |
| `onLoops` | `() => void` | no |
| `doneLabel` | `string` | no |
| `loopsLabel` | `string` | no |

## Examples

### Planned

```js
() => h(UI.LoopScreen, { title: "Bins out", when: "In 16 hours", sub: "even weeks green, odd weeks grey", phase: "planned", progress: 0.35, now: "even weeks green, odd weeks grey" })
```

### Done

```js
() => h(UI.LoopScreen, { title: "Bins out", when: "done", phase: "done", now: "next time: Tuesday, grey", pen: false })
```

## Guidelines

- Do: The pen circle round the current label is the screen's one pen mark.
- Don't: Never add a second mark; pen={false} leaves it out.
- Do: Done is glass, In Loops is ghost: one clear action.
- Do: Confetti once at done.
- Don't: Never confetti when motion is reduced.
- Do: Pick one middle: none, glass, pattern or the title as a frozen ThemeWord.

## Specs

- ring: `268px, progress 29% in the preview, labels round it`
- NOW card: `glass, radius 20, a dot per phase, done dots in --accent`
- PageDots: `vertical on the right, the active streak from this phase's colour to the next`
- busy: `ring 2 + pen 1, + 1 for confetti at done`
- title gradient: `180deg from --fg to the phase colour, clipped to the text`
- preview data: `phase planned, progress .35, when In 16 hours`

## Accessibility

- The six phase labels are text: a screen reader hears the phase by name.
- Confetti fires once, and never when motion is reduced.
- The title gradient starts at --fg, so the words stay readable toward the phase colour.

## The system's own words

# LoopScreen

One loop in detail: the phase ring with its six labels, the loop's title in the middle, a glass NOW card and Done.

Parts, top to bottom: a `PhaseRing` (268px, labels round it, the ring at 29%) with the eyebrow (`when`, mono caps), the title in a gradient toward the phase colour and the `sub` line; a hand-drawn `Pen` circle round the current label (the screen's one pen mark; `pen={false}` leaves it out); the NOW card (glass, 20px radius) with the phase word, `now` text and a dot per phase, done ones in `accent`; Done (glass) and In Loops (ghost); vertical `PageDots` on the right, the active streak from this phase's colour to the next.

Phase colours are fixed (`phase-*`); finished phases stay full, the current one runs as an hourglass (sand piles up at the end of its segment), done lights the whole ring and throws confetti once (not when motion is reduced).

`center` picks the middle: `none`, `glass`, `pattern` (lanes in green and grey) or `word` (the title as a frozen ThemeWord). Busy: ring 2 + pen 1 (+ confetti 1 at done).

Consumer provides: `title`, `when`, `sub`, `phase`, `progress`, `now`, `center`, `onDone`, `onLoops`, and the labels (`doneLabel`, `loopsLabel`).

