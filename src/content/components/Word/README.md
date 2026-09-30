# Word

One big word with a moving effect, whose colours always stay readable on their ground.

Effects (topic colours): `gradient`, `pop`, `wave`, `shine`, `neon`, `echo`, `fill` (`level` 0..1), `split`, and from the word lab `lanes` (lanes cut through the letters), `tiles` (a key per letter, one lights up per beat, capitals), `stretch` (tall and narrow), `outline`, `long-shadow`, `stamp` (a rough print). Word rules (short words for tiles, echo and long shadow; one effect per word) are in `systems.md`. They run on 125 bpm. Themes (own colours): `frozen` (frost and icicles on `word-frozen`), `fire` (flames on `word-fire`), `autumn` (falling leaves on `word-autumn`).

Contrast guard: every colour of the letters is lightened in 15% steps until it reaches 4.5:1 on its ground. That lifts fire's #dc2626 (3.9:1) and autumn's #c2410c (3.5:1). The ground of an effect is the topic ground pulled toward `bg`.

Consumer provides: `text`, `effect` or `theme`, `topic`, `height` (default 120). Busy cost 3: with a Word, a screen has 2 points left. Still: drawn once at its end state.
