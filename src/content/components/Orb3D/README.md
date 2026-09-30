# Orb3D

Her orb in 3D: a glass ball with a ring of light round it. The ring is a small shader written for the orb; what sits behind the ball bends through the glass, and bloom, tone mapping and grain finish it. It takes the TalkOrb states, so it can stand in for the orb on hero screens, the Mac pill or the talk button.

Orb3D from IrisUi (`window.IrisUi.Orb3D`). Wrap the tree in `<PreviewI18nProvider>` for the app's background and font.

Props: `{ size?: number; state?: 'rest' | 'talking' | 'expression' | 'listening' | 'thinking' | 'muted' | 'away'; ring?: 'deepsea' | 'precession' | 'fieldlines' | string; look?: object; analyser?: AnalyserNode; onPress?: () => void }`

White is capped, not removed: bright light is scaled down instead of clipped (clipping made white blobs), and only the hottest cores add white, at most 55% of the way (`WHITE` in the finish shader). A white glint here and there is part of the look.

States (same words as TalkOrb):

- `rest`: silence. The ring breathes softly on its own.
- `talking`: the voice (or any audio) feeds the ring (loudness, pitch bands, onsets). Pass `analyser` (a WebAudio AnalyserNode); without one she talks with a made-up voice.
- `expression`: a made-up voice, time runs faster, colours turn, more glow. Only for a big moment.
- `listening`: three ice-blue echoes run out from the ring.
- `thinking`: time runs 3x and a neon arc (#2ee6d6) races round.
- `muted`: grey-violet, dim, slow, with the struck-through mic in front.
- `away`: grey and still.

Rings: all 28 shader rings ship in the bundle; `Orb3D.rings` lists their keys, `Orb3D.ringName(key)` their name. Default `deepsea` (Deepsea spiral, his favourite); also `precession` (two tilted rings crossing in front of and behind the ball), `fieldlines`, `comet-orbit`, `silk-wave`, `angular-discharge` and more. Or pass your own GLSL `void ring(vec2 p, out vec3 behind, out vec3 front)`; the helpers (polar, round, band, glow, line, iris, tiltedRing, level, pulse ...) are the ring API. `particles` (0..1, default 0) adds motes round the ball in 3D, in front of it or hidden behind it. `shape` says where they go: `orbit` (tilted orbits, the default), `comets`, `sparks`, `dust` (a Saturn disc), `swarm` (fireflies), `circle`, `square`, `triangle`, `knot` (a trefoil round the ball). Best with a ring: the preview's "Rings + particles" row shows pairs.

`particleStyle` tunes them, each shape starting from its own values (`Orb3D.shapeStyle(shape)`):

| key | what |
| --- | --- |
| `count` | how many motes (1 to 512) |
| `lines` | how many lines: orbit lanes, comets, spark jets, dust ringlets, swarms, shape copies, knot strands |
| `sprite` | what one mote looks like: `dot`, `star`, `blob`, `square`, `ring`, `streak` |
| `size`, `trail`, `speed` | size, tail length (comets, streaks), own speed |
| `react` | how much the voice moves them (0 still, 1 normal, 3 wild): louder pushes out and pumps size and light, an onset kicks |
| `minSize`, `maxSize`, `maxLight` | limits: a mote never gets smaller or bigger than this (ball units, default 0 and 6), or brighter than `maxLight` (default 1.6), however hard the voice pumps |
| `colors`, `colorMode` | start, mid and end colour, and the effect: `preset` (the shape's own), `along` the line, `voice` (louder is further along), `depth` (front to back), `cycle` (running in time) |

`tone` (0..1, default 0) turns the whole orb down: less exposure, bloom and white. Use it when a bright ring and big particles together get too much.

`material` is the body's surface: `glass` (the original, default), `matte`, `pearl`, `plasma` (a swirl inside that flares with the voice), `chrome` (mirrors the ring), `hologram` (scan lines, bright rim).

Your own shape is GLSL:

```glsl
vec3 particle(float i, vec3 h, out vec3 color, out float size) {
  // i: 0..COUNT-1, h: three fixed random numbers for this mote. Return its 3D position (ball radius 44, +z towards you).
  // To use: t, level (loudness), pulse (onset), band(x) (pitch band 0 low..1 high), iris(u), rot(a), spin(q, speed),
  // COUNT, LINES, strand(i) (which line, 0..1 along it), uPTrail.
}
```

`body` is the glass itself: `sphere` (the default), `cube`, `triangle`, `donut` (the light shows through the hole), `gem` (a slowly turning hexagon), or your own GLSL `float body(vec2 p)`: the signed distance to the edge (negative inside, the canvas is 230 across). The glass bends over `DEPTH` units in from the edge; set `#define DEPTH 14.0` above your function for a thin body.

`ring: "none"` shows only the body and the particles. A formula that does not compile keeps the last good one and calls `onError` with the line in your formula; the preview has a live editor. `look` overrides the ring's knobs (size, glow, lighting, grain, chroma, hueShift, saturation, spin, sphere).

In the Mac pill: Orb3D at 104 in place of the 60pt TalkOrb, the glass bar behind it with an 80pt gap, the state word 48pt under the centre, the dotted steps ring (r 43) and the badge on top. The canvas is transparent (light is as opaque as it is bright, the ball solid), so bar, desktop and overlays show through round it.

Rules:

- The canvas is the whole orb: the ball is 38% of `size`, the ring fades out before the edge. It is transparent, so it sits on any surface.
- Shaders compile in the background (KHR_parallel_shader_compile) and only once an orb is in view; it appears when ready, the page never waits on it.
- One WebGL context per orb; browsers keep about 16 per page. Use it for one or two orbs, the flat Orb for lists and headers. To show many rings at once, draw them all with one `Orb3D.makeRenderer(canvas)` and copy each frame into small 2D canvases (see the preview's gallery).
- Without WebGL2 it falls back to the flat Orb.

```js
const h = React.createElement;
h(Orb3D, { state: "talking", size: 220 })
```
