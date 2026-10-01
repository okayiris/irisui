# A loop

One thing that comes back: the six phases, the ring that shows them, and what the person can do while it runs.

## The six phases

Phase names and colours are fixed and do not follow the topic. Every label reads on `bg` at 7:1 or more. The code key for the first phase is `seen`, and the words themselves and the numbers 0 to 5 work too.

| Phase | Colour | Means | What you can do |
| --- | --- | --- | --- |
| `recognised` (`seen`) | #a78bfa | she saw it | nothing yet; correct her if she read it wrong |
| `planned` | #7dd3fc | she has a plan | read the plan, change when it runs |
| `busy` | #2ee6d6 | she is doing it | wait, or stop it |
| `you` | #f0abfc | waiting on you | answer, choose, confirm: the loop cannot move on without you |
| `check` | #fbbf24 | she checks the result | nothing; she compares what came back with what she promised |
| `done` | #4ade80 | done | read the result, or start it again |

> rule: The phase colours are the only place these six values appear. `phase-track` #1e2a3a is the unspent part of the current phase, `phase-rest` #2a323d is a phase still to come, and `phase-grain` #e0f2fe is the grain that falls into the current phase.

## The ring

- `PhaseRing` draws the six phases around a ring, each in its own colour, with mono labels that read on `bg` at 7:1 or more.
- The current phase runs as an hourglass. The whole segment sits soft in `phase-track`; the sand, bright with a glow, piles up at the end of the segment and grows back toward its start as `progress` rises. A white dot marks the edge of the sand and a grain falls from the start to that edge, speeding up.
- Earlier phases stay full colour at 80%. Later ones are grey in `phase-rest`.
- Done lights all six and throws confetti once. Under reduced motion there is no confetti.
- `labels` puts the six names round the ring, and `pen` draws a hand-drawn circle round the current one.
- `center` fills the middle: `none`, `glass`, `pattern` (lanes in green and grey) or `word`.

> rule: Still means the end state. Under reduced motion, or in a screenshot, the ring is drawn once at its end state with no grain, never half animated.

## The loop screen

One loop in detail is a `LoopScreen`, top to bottom: a `PhaseRing` at 268px with its labels, the eyebrow (`when`) in mono caps, the title in a gradient toward the phase colour, and the `sub` line. Then a hand-drawn `Pen` circle round the current label (the screen's one pen mark, and `pen={false}` leaves it out), a glass NOW card at 20px radius with the phase word, the `now` text and a dot per phase, and the two buttons: Done in glass, In Loops in ghost. Vertical `PageDots` on the right carry the active streak from this phase's colour to the next.

The recipe is `{title, when, sub, phase, progress, now, center, pen}`. Busy cost: ring 2 plus pen 1, plus confetti 1 at done.

## What the middle shows

The middle of the ring is text only, or one of three fills. Pick one and count it in the busy budget.

| Middle | What it is | Cost |
| --- | --- | --- |
| `none` | the ring and its labels only | 0 |
| `glass` | a frosted disc | 0 |
| `pattern` | lanes in green and grey | 2 |
| `word` | the title as a `ThemeWord`, theme `frozen` by default | 3, and then no pen |

> rule: A `ThemeWord` middle is `Word` with a theme set, so it costs 3 of 5, and with a `Word` on the screen only 2 points are left. The same contrast guard holds: every letter colour is lifted until it reaches 4.5:1 on its ground.

## Waiting on you is the loud one

Five of the six phases are her working. `you` (#f0abfc) is the phase where nothing moves until the person acts: the loop cannot reach `check` without an answer, a choice or a confirmation. That is why the current phase carries a pen circle round its label, why the NOW card shows the phase word and the `now` text, and why the page dots take their streak from this phase's colour to the next.

> warn: The chapter does not fix how loudly a waiting loop may interrupt. Nothing beyond the phase colour, the pen circle and the NOW card is specified, so do not add a badge, a sound or a repeat on your own.

## When a loop is missed

What is written: a loop has a schedule ("Every workday 07:30"), a switch, and in the release it lives under Loops with chips (All, Loops, Chats, Questions). The iPhone app dropped that page on 29 September: a loop now hangs under its chat as a `LoopBubble` in the `CircleStack` above the strip. A loop she runs can feed a screen, for example a price alarm that feeds Compare.

> warn: There is no rule yet for a skipped or missed run: no catch-up copy, no state, no colour. This page says so rather than guessing. Until it is written, a missed loop is silent, and the next run is the next run.
