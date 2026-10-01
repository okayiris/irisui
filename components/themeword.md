# ThemeWord

A word that carries one element or season, or the middle of a loop screen.

Group: Screen parts. Export: `window.IrisUi.ThemeWord`.

## Props

| prop | type | required |
| --- | --- | --- |
| `text` | `string` | yes |
| `theme` | `'frozen' | 'fire' | 'autumn'` | no |
| `height` | `number` | no |

## Guidelines

- Do: Treat it as a Word: one effect, one big word per screen.
- Do: Count it as 3 toward the busy budget.
- Don't: Never count it twice when it sits in a PhaseRing or LoopScreen middle.
- Do: Pick the theme that matches the moment.
- Don't: Never mix themes on one screen.

## Specs

- grounds: `word-frozen #081a34, word-fire #1c0d0b, word-autumn #1f140a`
- contrast guard: `same as Word: every letter colour is lifted in 15% steps to 4.5:1 on its ground`
- busy cost: `3`
- height: `Word's default 120; the previews pass 100`
- preview words: `Frost, Hot, Autumn`

## Accessibility

- The guard lifts the deep stop of fire and autumn, so the last letters stay readable.
- The same rule as Word holds: never behind text that must be read, at least 65% visible behind a person.
- Reduced motion: drawn once at its end state.

## The system's own words

# ThemeWord

A word in one of three themes: `frozen` (frost and icicles), `fire` (flames) and `autumn` (falling leaves), each on its own ground (`word-frozen`, `word-fire`, `word-autumn`).

It is `Word` with `theme` set, so the same contrast guard holds: every letter colour is lifted to 4.5:1 on its ground. The loop screen uses it as its `word` middle. Busy cost 3. Consumer provides `text`, `theme` and `height`.

