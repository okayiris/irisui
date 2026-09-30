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
