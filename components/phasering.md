# PhaseRing

A loop as six phases, when the ring itself is the progress and not decoration round it.

Group: Screen parts. Export: `window.IrisUi.PhaseRing`.

## Props

| prop | type | required |
| --- | --- | --- |
| `phase` | `Phase | 'seen' | 0 | 1 | 2 | 3 | 4 | 5` | yes |
| `progress` | `number` | no |
| `eyebrow` | `string` | no |
| `title` | `string` | no |
| `sub` | `string` | no |
| `size` | `number` | no |
| `labels` | `boolean` | no |
| `pen` | `boolean` | no |
| `center` | `'none' | 'glass' | 'pattern' | 'word'` | no |
| `word` | `string` | no |
| `theme` | `'frozen' | 'fire' | 'autumn'` | no |

## Examples

### Busy

```js
() => h(UI.PhaseRing, { phase: "busy", progress: 0.45, title: "Contractor quote", sub: "comparing 3 prices", size: 220 })
```

### Waiting on you

```js
() => h(UI.PhaseRing, { phase: "you", progress: 0.7, title: "Dentist", sub: "pick a time", size: 220 })
```

### Done

```js
() => h(UI.PhaseRing, { phase: "done", progress: 1, title: "Passport", size: 220 })
```

## Guidelines

- Do: Phase colours are fixed and do not follow the topic.
- Do: Finished phases stay full in their own colour; later ones are grey.
- Do: Pick one center.
- Don't: Never stack a glass disc and a word in the same middle.
- Do: Count the ring as 2 toward the busy budget, and a ThemeWord middle as 3 on top.

## Specs

- phases: `recognised #a78bfa, planned #7dd3fc, busy #2ee6d6, you #f0abfc, check #fbbf24, done #4ade80`
- ring parts: `phase-track #1e2a3a for the unspent part, phase-rest #2a323d for phases to come, phase-grain #e0f2fe for the grain`
- earlier phases: `full colour at 80%`
- hourglass: `the sand piles up at the end of the segment, a white dot marks its edge, the grain falls toward it`
- size: `default 220; LoopScreen passes 268`
- done: `at progress 1 all six light`
- busy cost: `2`

## Accessibility

- Each segment carries its mono label, so a phase is never the colour alone.
- The current phase label is white and bold, the rest stay dim; the labels read on bg.
- Reduced motion: drawn once at its end state, no grain, never a half-drawn circle.

## The system's own words

# PhaseRing

A loop as six phases around a ring, each in its own colour; the current phase runs as an hourglass.

Phases: `recognised` (#a78bfa), `planned` (#7dd3fc), `busy` (#2ee6d6), `you` (#f0abfc, waiting on you), `check` (#fbbf24), `done` (#4ade80). Tokens `phase-*`; every label reads on `bg` at 7:1 or more. The code key for the first phase is `seen`; both work, as do the numbers 0-5.

The current phase is an hourglass: the whole segment soft (`phase-track`); the sand, bright with a glow, piles up at the END of the segment and grows back toward its start as `progress` rises; a white dot marks the edge of the sand, and a grain (`phase-grain`) falls from the start of the segment to that edge, speeding up. Same direction as the app's loop clock and the phase ring drawing. Earlier phases full colour at 80%, later ones grey (`phase-rest`). Done at progress 1 lights all six.

Consumer provides: `phase`, `progress` (0..1 within the phase), `eyebrow`, `title`, `sub`, `size` (default 220). `labels` puts the six phase names round the ring; `pen` draws a hand-drawn circle round the current one. `center` fills the middle: `none`, `glass` (frosted disc), `pattern` (lanes in green and grey) or `word` (a ThemeWord, `theme` default frozen). Busy cost 2. The full loop screen: `LoopScreen`.

Still (reduced motion or a screenshot): drawn once at its end state, no grain, never a half animation.

