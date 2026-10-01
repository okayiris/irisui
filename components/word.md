# Word

One big word for a moment: a done moment, a number, a name.

Group: Screen parts. Export: `window.IrisUi.Word`.

## Props

| prop | type | required |
| --- | --- | --- |
| `text` | `string` | yes |
| `effect` | `'gradient' | 'pop' | 'wave' | 'shine' | 'neon' | 'echo' | 'fill' | 'split' | 'lanes' | 'tiles' | 'stretch' | 'outline' | 'long-shadow' | 'stamp' | string` | no |
| `theme` | `'frozen' | 'fire' | 'autumn'` | no |
| `topic` | `TopicName` | no |
| `level` | `number` | no |
| `height` | `number` | no |

## Examples

### Gradient, a loop done

```js
() => h(Word, { text: "Done", effect: "gradient", topic: "loop", level: 0.6, height: 100 })
```

### Fill, how far the list is

```js
() => h(Word, { text: "3 / 8", effect: "fill", topic: "groceries", level: 0.6, height: 100 })
```

### Wave, a parcel on the way

```js
() => h(Word, { text: "On the way", effect: "wave", topic: "parcel", level: 0.6, height: 100 })
```

### Outline, the weather

```js
() => h(Word, { text: "Rain", effect: "outline", topic: "weather", level: 0.6, height: 100 })
```

### Stamp, delivered

```js
() => h(Word, { text: "Delivered", effect: "stamp", topic: "parcel", level: 0.6, height: 100 })
```

## Guidelines

- Do: One effect per word.
- Do: Keep it short for tiles, echo and long shadow.
- Do: Count a Word as 3 toward the busy budget: with a Word a screen has 2 points left.
- Don't: Never use a Word and a pattern hero on one screen.
- Do: Let the whole word stay inside its photo when it sits behind a person.

## Specs

- height: `120 by default; the previews pass 100`
- busy cost: `3`
- contrast guard: `every letter colour is lightened in 15% steps until it reaches 4.5:1 on its ground`
- themes: `frozen on #081a34 (letters white to #38bdf8), fire on #1c0d0b (letters #fde68a to #dc2626), autumn on #1f140a (letters #fbbf24 to #c2410c)`
- guard in practice: `fire's #dc2626 (3.9:1) and autumn's #c2410c (3.5:1) are lifted to 4.5:1`
- beat: `effects run on 125 bpm`
- behind a person: `stays at least 65% visible (text-behind-person), and the whole word stays inside the photo`

## Accessibility

- Every letter colour is lifted to 4.5:1 on its ground, so contrast never rests on the theme's deep stop.
- Text behind a person stays at least 65% visible; more than a third covered and it stops being a word.
- Reduced motion: drawn once at its end state, never a letter mid-pop.

## The system's own words

# Word

One big word with a moving effect, whose colours always stay readable on their ground.

Effects (topic colours): `gradient`, `pop`, `wave`, `shine`, `neon`, `echo`, `fill` (`level` 0..1), `split`, and from the word lab `lanes` (lanes cut through the letters), `tiles` (a key per letter, one lights up per beat, capitals), `stretch` (tall and narrow), `outline`, `long-shadow`, `stamp` (a rough print). Word rules (short words for tiles, echo and long shadow; one effect per word) are in `systems.md`. They run on 125 bpm. Themes (own colours): `frozen` (frost and icicles on `word-frozen`), `fire` (flames on `word-fire`), `autumn` (falling leaves on `word-autumn`).

Contrast guard: every colour of the letters is lightened in 15% steps until it reaches 4.5:1 on its ground. That lifts fire's #dc2626 (3.9:1) and autumn's #c2410c (3.5:1). The ground of an effect is the topic ground pulled toward `bg`.

Consumer provides: `text`, `effect` or `theme`, `topic`, `height` (default 120). Busy cost 3: with a Word, a screen has 2 points left. Still: drawn once at its end state.

