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
