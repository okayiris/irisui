# Mark

Her ring as a still, sharp mark, from the brand kit's 1024px render with its glow. For a logo, a lock screen, an empty page.

Group: Brand. Export: `window.IrisUi.Mark`.

## Props

| prop | type | required |
| --- | --- | --- |
| `size` | `number` | no |
| `label` | `string` | no |

## Examples

### Lock screen size

```js
h("div", { style: { display: "grid", justifyItems: "center", gap: 18, padding: "36px 16px", maxWidth: 300, borderRadius: 32, background: "var(--glass)", border: "1px solid var(--edge)" } },
    h("div", { style: { font: "200 56px/1 var(--font-text)", fontVariantNumeric: "tabular-nums" } }, "9:41"),
    h(Mark, { size: 64 }),
    h("div", { style: { fontSize: 13, color: "var(--label)" } }, "Look at your phone to open"))
```

### Three sizes

```js
h("div", { style: { display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", padding: 16 } }, h(Mark, { size: 48 }), h(Mark, { size: 64 }), h(Mark, { size: 96 }))
```

### Which Iris, how big

```js
h("div", { style: { display: "flex", gap: 36, alignItems: "center", flexWrap: "wrap", padding: 12, font: "var(--text-sub)", color: "var(--dim)" } }, ...[["Orb 22", h(Orb, { size: 22 })], ["Orb 34", h(Orb, { size: 34, state: "listening" })], ["Mark 64", h(Mark, { size: 64 })], ["TalkOrb talking", h(TalkOrb, { size: 120, state: "talking" })], ["TalkOrb thinking", h(TalkOrb, { size: 120, state: "thinking" })], ["Orb3D", h(Orb3D, { size: 180 })]].map(([t, el]) => h("div", { key: t, style: { display: "grid", justifyItems: "center", gap: 22 } }, el, t)))
```

## The system's own words

# Mark

Her ring as a still, sharp mark. It is the brand kit's own render (1024px, with its glow), served in three
sizes, so it stays crisp at any size and on any screen.

## When

- A logo: the top of a sign-in, a lock screen, the PIN pad, an empty page, a mail.
- Anywhere the ring stands still and means "this is Iris".

For her state (listening, thinking, talking, away) take the `Orb` or the `TalkOrb`: those move and change
with her. Never put a Mark and an Orb on one screen.

## Size

`size` is the ring. The glow reaches past it on every side, as light does: leave about a ring's width of room.

## Which Iris, how big

Four drawings of her, and each has its own sizes. What counts is the ring you see, not the box.

This table is documentation, not a product surface: it shows several orbs side by side to compare them. On a
screen the rule stays one orb per surface.

| Where | Take | size |
|---|---|---|
| In a line of text, a chip, a tab | `Orb` | 16 |
| A status, a corner, a header, a task row | `Orb` | 22 |
| A field you type to her (the ring stands in for the mic) | `Orb` | 28 |
| A list row, a card head | `Orb` | 34 |
| The Mac pill | `TalkOrb` | 60 |
| The phone's tab bar | `TalkOrb` | 66 |
| A logo: sign-in, lock screen, PIN pad | `Mark` | 48 to 96 |
| The talk screen: she talks (the neon lines round her) or thinks (an `Edge` pattern, another each time) | `TalkOrb` | 120 or more |
| The big moment: the first start, a hero on the web, a video | `Orb3D` | 100 or more |

- The `Orb` is only ring: it fills its size. Its ring is as tall as the text next to it, never smaller.
- The `TalkOrb` draws its ring at about a third of its size. The rest is room for the glow and the waves.
  So it is never smaller than 60: at 28 its ring is 9px, a dot next to 22px text.
- Only these steps. A size between them is a bug, not a choice.
- Small and live is an `Orb`. Big and live is a `TalkOrb`. Still is a `Mark`.
- The neon lines (talking) and the thinking patterns are the `TalkOrb`'s. They need room, so they never come
  on an `Orb`: small, she talks with the ring's turn alone.
- The `Orb3D` is glass and light, drawn with WebGL: one per screen, never in a bar or a row, and where WebGL is
  missing it falls back to the flat `Orb`.

