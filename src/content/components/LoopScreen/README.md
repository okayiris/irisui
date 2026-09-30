# LoopScreen

One loop in detail: the phase ring with its six labels, the loop's title in the middle, a glass NOW card and Done.

Parts, top to bottom: a `PhaseRing` (268px, labels round it, the ring at 29%) with the eyebrow (`when`, mono caps), the title in a gradient toward the phase colour and the `sub` line; a hand-drawn `Pen` circle round the current label (the screen's one pen mark; `pen={false}` leaves it out); the NOW card (glass, 20px radius) with the phase word, `now` text and a dot per phase, done ones in `accent`; Done (glass) and In Loops (ghost); vertical `PageDots` on the right, the active streak from this phase's colour to the next.

Phase colours are fixed (`phase-*`); finished phases stay full, the current one runs as an hourglass (sand piles up at the end of its segment), done lights the whole ring and throws confetti once (not when motion is reduced).

`center` picks the middle: `none`, `glass`, `pattern` (lanes in green and grey) or `word` (the title as a frozen ThemeWord). Busy: ring 2 + pen 1 (+ confetti 1 at done).

Consumer provides: `title`, `when`, `sub`, `phase`, `progress`, `now`, `center`, `onDone`, `onLoops`, and the labels (`doneLabel`, `loopsLabel`).
