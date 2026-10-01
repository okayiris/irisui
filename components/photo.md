# Photo

A photo with a depth map: a word behind the person, duotone in the topic's colours, or parallax in four depth layers. No photo ships: without a src it paints its own neutral scene with a matching depth map, and without a depth map it guesses one (lower and central is nearer).

Group: Surfaces. Export: `window.IrisUi.Photo`.

## Props

| prop | type | required |
| --- | --- | --- |
| `alt` | `string` | yes |
| `src` | `string` | no |
| `depth` | `string` | no |
| `kind` | `'back' | 'duotone' | 'parallax'` | no |
| `word` | `string` | no |
| `threshold` | `number` | no |
| `topic` | `TopicName` | no |
| `ratio` | `number` | no |
| `motion` | `'pointer' | 'scroll'` | no |

## Examples

### The word behind the person

```js
() => h("div", { style: { maxWidth: 380 } }, h(Photo, { kind: "back", word: "CALM", alt: "A figure in front of two ridges at dusk" }))
```

### Parallax and duotone

```js
() => h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 } },
    h(Photo, { kind: "parallax", alt: "A figure in front of two ridges, moving with the pointer" }),
    h(Photo, { kind: "duotone", topic: "money", alt: "The same scene in the money topic's two colours" }),
    h(Photo, { kind: "duotone", topic: "weather", alt: "The same scene in the weather topic's two colours" }))
```

## The system's own words

# Photo

A photo with a depth map: a grey image of the same size, white near and black far. From the Photos lab.

## Kinds

- `back`: the photo, then the word, then only the near part on top again, so the word stands behind the person.
- `duotone`: the photo's light mapped from the topic's ground (`--kd`) to its accent (`--k`); without a topic,
  `--bg` to `--accent`.
- `parallax`: four depth layers that move with the pointer, or gently with the scroll (`motion="scroll"`).

## Where the photo comes from

No photo ships with the system. Without `src` the part paints its own neutral scene (sky, sun, two ridges and a
figure) in the tokens, with a depth map that matches it. With a `src` and no `depth` the depth is guessed: lower
and central is nearer. A real depth map (Depth Pro) is far better. The pixels are read back, so a photo from
another origin must allow it (CORS); one that does not leaves the frame empty.

## Rules

- The word behind a person stays at least 65% visible and whole inside the photo: the part searches the height,
  and failing that a smaller size, for about 25% hidden. `threshold` (0.05 to 0.9) is where the near part starts.
- Parallax moves at most 6% of the width, softly (`--motion-slow`); with reduced motion it stands still.
- Never a real user's photo in a demo. Never a photo hero and a `Word` together. Never the text fully hidden.

## Not here

The lab also has filters (trip flat, retro dither, colour shift, halftone, glow, a blurred background, light on
the person), tilt on a phone, and the photo pulled apart in 3D layers. They are left out of the part.

## Accessibility

`role="img"` named by `alt`; with `kind="back"` the word is added to the name.
