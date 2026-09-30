# PhaseRing

A loop as six phases around a ring, each in its own colour; the current phase runs as an hourglass.

Phases: `recognised` (#a78bfa), `planned` (#7dd3fc), `busy` (#2ee6d6), `you` (#f0abfc, waiting on you), `check` (#fbbf24), `done` (#4ade80). Tokens `phase-*`; every label reads on `bg` at 7:1 or more. The code key for the first phase is `seen`; both work, as do the numbers 0-5.

The current phase is an hourglass: the whole segment soft (`phase-track`); the sand, bright with a glow, piles up at the END of the segment and grows back toward its start as `progress` rises; a white dot marks the edge of the sand, and a grain (`phase-grain`) falls from the start of the segment to that edge, speeding up. Same direction as the app's loop clock and the phase ring drawing. Earlier phases full colour at 80%, later ones grey (`phase-rest`). Done at progress 1 lights all six.

Consumer provides: `phase`, `progress` (0..1 within the phase), `eyebrow`, `title`, `sub`, `size` (default 220). `labels` puts the six phase names round the ring; `pen` draws a hand-drawn circle round the current one. `center` fills the middle: `none`, `glass` (frosted disc), `pattern` (lanes in green and grey) or `word` (a ThemeWord, `theme` default frozen). Busy cost 2. The full loop screen: `LoopScreen`.

Still (reduced motion or a screenshot): drawn once at its end state, no grain, never a half animation.
