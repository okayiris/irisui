# Orb3D

A hero moment, the Mac pill or the talk button, where one or two live orbs carry the screen.

Group: Brand. Export: `window.IrisUi.Orb3D`.

## Props

| prop | type | required |
| --- | --- | --- |
| `size` | `number` | no |
| `state` | `'rest' | 'talking' | 'expression' | 'listening' | 'thinking' | 'muted' | 'away'` | no |
| `ring` | `string` | no |
| `particles` | `number` | no |
| `shape` | `'orbit' | 'comets' | 'sparks' | 'dust' | 'swarm' | 'circle' | 'square' | 'triangle' | 'knot' | string` | no |
| `material` | `'glass' | 'matte' | 'pearl' | 'plasma' | 'chrome' | 'hologram'` | no |
| `particleStyle` | `{ count?: number; lines?: number; size?: number; trail?: number; react?: number; speed?: number; sprite?: 'dot' | 'star' | 'blob' | 'square' | 'ring' | 'streak'; colors?: [string, string, string]; colorMode?: 'preset' | 'along' | 'voice' | 'depth' | 'cycle'; minSize?: number; maxSize?: number; maxLight?: number }` | no |
| `tone` | `number` | no |
| `body` | `'sphere' | 'cube' | 'triangle' | 'donut' | 'gem' | string` | no |
| `onError` | `(message: string | null) => void` | no |
| `look` | `Record<string` | no |
| `analyser` | `AnalyserNode` | no |
| `onPress` | `() => void` | no |

## Examples

### Hero

```js
() => h(Hero)
```

### In the Mac pill (hover the orb)

```js
() => h(PillPlayground)
```

### Rings + particles

```js
() => h(Multi, { size: 150, items: [
      ["deepsea", "orbit", {}], ["precession", "comets", {}], ["silk-wave", "sparks", {}], ["comet-orbit", "dust", { lines: 4 }],
      ["fieldlines", "swarm", {}], ["angular-discharge", "orbit", { lines: 3, sprite: "streak", trail: 0.6 }],
      ["caustic-orbit", "comets", { lines: 7, trail: 0.8, sprite: "streak" }], ["long-teardrop-orbit", "sparks", { lines: 6, sprite: "star" }],
      ["smoke-spiral", "dust", { sprite: "square", count: 120, size: 0.7 }], ["mercury-strands", "knot", { lines: 3, colorMode: "cycle", colors: ["#2ee6d6", "#7dd3fc", "#c026d3"] }],
      ["deep-stroke", "swarm", { sprite: "blob", count: 40, lines: 3 }], ["drop-wave", "orbit", { sprite: "ring", count: 60, colorMode: "voice", colors: ["#38bdf8", "#8b5cf6", "#ffffff"] }],
    ].map(([r, k, st]) => ({ ring: r, shape: k, particles: 1, particleStyle: st, label: Orb3D.ringName(r), sub: k + (st.sprite ? " \u00b7 " + st.sprite : "") + (st.lines ? " \u00b7 " + st.lines + " lines" : "") })) })
```

### Ball materials

```js
() => h(Multi, { size: 130, items: Orb3D.materials.map(m => ({ ring: "deepsea", material: m, shape: "orbit", particles: 0.6, label: m })) })
```

### Particle shapes (no ring)

```js
() => h(Multi, { size: 120, items: ["circle", "square", "triangle", "knot"].map(k =>
      ({ ring: "none", shape: k, particles: 1, label: k })) })
```

### Ball shapes (with a ring)

```js
() => h(Multi, { size: 150, items: [["sphere", "deepsea"], ["cube", "silk-wave"], ["triangle", "precession"], ["donut", "comet-orbit"], ["gem", "angular-discharge"]].map(([b, r]) =>
      ({ body: b, ring: r, label: b, sub: r })) })
```

### States

```js
() => h("div", { style: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 } },
      ["rest", "talking", "expression", "listening", "thinking", "muted", "away"].map(s => cell(s, { state: s })))
```

### All 28 rings (talking)

```js
() => h(Multi, { items: Orb3D.rings.map(r => ({ ring: r, label: Orb3D.ringName(r), sub: r })) })
```

## Guidelines

- Do: One WebGL context per orb; a page keeps about 16.
- Don't: Never a wall of Orb3D: for many rings draw them all with one Orb3D.makeRenderer and copy each frame.
- Do: The canvas is transparent and the ball is 38% of size, so it sits on any surface.
- Do: expression only for a big moment, for a few seconds.
- Do: Fall back to the flat orb where WebGL2 is missing, and keep as many orbs as the page can afford.

## Specs

- canvas: `230 across, ball 38% of size, the ring fades out before the edge`
- white: `capped, only the hottest cores add white, at most 55% of the way`
- thinking: `time runs 3x, an Edge pattern round the ball, another each time, as on the TalkOrb`
- muted: `grey-violet, dim, slow, struck-through mic in front`
- particles: `count 1 to 512, maxSize default 6, maxLight default 1.6, react 0 to 3`
- particleStyle: `each shape starts from its own values, Orb3D.shapeStyle(shape); sprite is dot, star, blob, square, ring or streak`
- Mac pill: `Orb3D at 104 in place of the 60pt TalkOrb, glass bar behind it, 80pt gap, state word 48pt under the centre, dotted steps ring r 43`
- own GLSL: `body(p) returns the signed distance to the edge, negative inside; set #define DEPTH 14.0 for a thin body`

## Accessibility

- The orb is a picture of her state: a screen a person must understand also carries the state as a word.
- Reduced motion: thinking, listening and expression stop; the orb still shows its state word.
- One orb in view keeps the page quick enough for a person to act on it.

## The system's own words

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

