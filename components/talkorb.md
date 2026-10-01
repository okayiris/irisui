# TalkOrb

The talk button: the middle of the iPhone tab bar, and the Mac pill. Hold it to talk.

Group: Brand. Export: `window.IrisUi.TalkOrb`.

## Props

| prop | type | required |
| --- | --- | --- |
| `size` | `number` | no |
| `state` | `'rest' | 'talking' | 'expression' | 'listening' | 'thinking' | 'muted' | 'away'` | no |
| `analyser` | `AnalyserNode` | no |
| `onPress` | `() => void` | no |

## Examples

### States

```js
() => h("div", { style: { display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 18 } }, ["rest", "talking", "expression", "listening", "thinking", "muted", "away"].map(cell))
```

### Spectrogram (test sound or your voice)

```js
() => h(Spectrogram)
```

### Expression

```js
() => h("div", { style: { display: "grid", placeItems: "center", padding: 70 } }, h(TalkOrb, { state: "expression", size: 120 }))
```

## Guidelines

- Do: Never under 60: its ring is a third of its size, so smaller is a dot. Small and live is the Orb.
- Don't: Never in a field, a row or a header.
- Do: 66pt in the tab bar, standing 14pt above it.
- Don't: Never wider than about 1.5x the disc: effects stay close to the button.
- Do: It is always drawn above everything around it: the highest z-index of its row.
- Do: Hold to talk; swipe up to lock, swipe left for a note, swipe right for the tab bar.
- Do: Give the analyser on the web for a real voice.
- Don't: Never call expression the look of normal talking.

## Specs

- size: `66pt in the bar, ring 22/60 of the disc`
- rest: `one turn in 30s, nothing else moves`
- spectrum: `48 pitches, 90Hz to 7kHz, mirrored, each pitch its own colour, low ice blue via violet to high magenta`
- listening: `echoes run out to 1.35x the disc, 1.35s, ease-out, infinite`
- thinking: `Edge at 70/60 of the disc, 1.3s a round; ring pulses .96 to 1.04 in .7s`
- muted: `core steps back to opacity .2 and scale .65`
- away: `grey and still`

## Accessibility

- The orb is the mic, so the button needs its own accessible name: there is no mic icon to read.
- Muted shows a struck-through mic, not a colour alone.
- Reduced motion: the arc, the echoes and the pulse stop; the state word from the screen carries the meaning.

## The system's own words

# TalkOrb

The orb as the talk button: a dark disc with the turning Iris ring inside, the middle of the tab bar on iPhone ("the orb is the mic"). There is no mic icon: the orb is the mic.

TalkOrb from IrisUi (`window.IrisUi.TalkOrb`). Wrap the tree in `<PreviewI18nProvider>` for the app's background and font.

Props: `{ size?: number; state?: 'rest' | 'talking' | 'expression' | 'listening' | 'thinking' | 'muted' | 'away'; analyser?: AnalyserNode; onPress?: () => void }`

States, each one hugs the disc (never wider than about 1.5x its size):

- `rest`: the ring turns slowly (one turn in 30 s). Nothing else moves.
- `talking`: the spectrogram of the voice, measured: yours while you hold it, hers while she speaks. 48 pitches from 90 Hz to 7 kHz, mirrored: low at the bottom, up both sides at once to high at the top. High and low never meet, so there is no seam in length or colour. Each pitch has a fixed colour (low ice blue, via violet, to high magenta), and a bar is as long as that pitch is loud: up at once, settling slowly, like a meter. On the web pass `analyser` (a WebAudio AnalyserNode); without one the bars rest low.
- `expression`: the bars dance by themselves in waves and turning colours. Only when she calls it for a big moment ("your first sale!", `device expression`), for a few seconds. Never as the look of normal talking.
- `listening`: always-on (locked): three ice-blue echoes run out to 1.35x the disc and fade.
- `thinking`: a neon arc (#2ee6d6) races round the disc and the ring pulses.
- `muted`: her voice is off. The ring steps back (20%, smaller) and a struck-through mic draws itself in front. Still, so it costs nothing.
- `away`: no connection. Grey and still.

Rules:

- 66pt in the tab bar, standing 14pt above it. The ring inside is 22/60 of the disc.
- It is always drawn above everything around it: tabs, the conversation strip, the page. Give it the highest z-index of its row.
- Keep it subtle. Effects stay close to the button and never cross the screen.
- Hold to talk. Swipe up to lock, swipe left for a note, swipe right to open the tab bar.

```js
const h = React.createElement;
h(TalkOrb, { state: "talking" })
```

