# Slider

One value on a line: how much, how far, how loud.

The topic's accent sits on the filled side.

## When

- A value that is a matter of degree, where the exact number matters less than the feel: distance, volume,
  brightness.
- Never where a precise number is needed (a Field), and never for a choice between named things (Segmented,
  Tabs or a Menu).

## The parts

`label` sits above left in the mono label style, the value above right in mono, the track below. `unit` and
`format` shape how the value reads.

## Rules

- The filled side takes the accent (or the topic's `--k` inside a Topic); the rest is `--line`.
- The knob is dark with an accent edge: it stays visible on glass, and it grows slightly on hover and gives
  way on press.
- The value is always visible while dragging: a slider without a number is a guess.
- Keyboard: left and right move one step, Home and End go to the ends.

## Values

| value | where |
| --- | --- |
| track | 6px tall, radius 999px, `--line` under `--k` |
| knob | 20px, `--bg` fill, 2px `--k` border |
| hover | scale 1.08; press 0.96 |
| label | `--text-label`; value 13px `--mono` |

## Accessibility

A real `input[type=range]`: it takes the keyboard, announces its label and value, and needs no ARIA of its own.
