# Steps

Where you are in a short flow, and what is still coming.

The app's flows needed a plain one.

## When

- Three to five steps that end: setting up a house, connecting a device, a booking.
- Never for more than five, and never as a progress bar for something long (that is `Progress`).

## The parts

A dot per step — a number, or a check when it is done — the label next to it, and a hairline between them that
fills as you go.

## Rules

- Done is filled with the accent and a dark check; now has an accent edge and a glow; coming is glass and quiet.
- The labels are the same words the screens use: "Voice", not "Step 2".
- A step never changes meaning while you look at it.
- It is not a control: the screens move it, the person does not click it.

## Values

| value | where |
| --- | --- |
| dot | 24px circle; done `--k` fill, now accent edge with a 3px glow |
| label | 13px `--dim`; done and now `--fg` |
| line | 1px `--line`, `--k` when the step is behind you |

## Accessibility

An ordered list with `aria-current="step"` on the current one, so a screen reader hears "step 3 of 4".
