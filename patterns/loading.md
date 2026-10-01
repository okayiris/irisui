# Loading and empty

A wait is never an empty black screen. Iris shows the shape of what is coming, then one line of what she is doing, then the thing.

## The beats

1. Under 200ms, nothing shows. Nothing is the same length as --motion-base (0.2s), so a faster answer appears with no state at all.
2. A Skeleton in the shape of what is coming.
3. One line of what she is doing, where the thing will be.
4. The thing itself, filled in place, without a reload.

A card that is already on the screen does not blink. While she builds a screen the card is there with your own words on it, and under it the line "Iris is building this screen..." with a skeleton in the shape it will get.

> rule: Never an empty black screen (foundation rule 5). If something takes long enough to notice, it takes a skeleton, a line, or progress. Silence is the one answer the person cannot read.

## A skeleton

Skeleton is glass blocks with a sheen, in the shape of the real content. Props: height, width and screen. screen draws a whole window: a title line, one big card, two rows.

- The shape tells the truth: the same count of blocks, the same heights, the same place as the thing that is coming.
- The sheen runs 1.4s and stops under prefers-reduced-motion; the block then stays still and the shape still carries the meaning.
- A still frame (a screenshot, a thumbnail, reduced motion) shows the end state of everything else and a still skeleton, never a half-drawn thing.
- A skeleton is for content from the house. It is never used to fake an answer that has not arrived.

## What a skeleton may not be

- Not one grey block for a whole screen.
- Not a spinner on an empty black screen.
- Not a bar that grows to nowhere: where the end is known, the bar is Progress.
- Not a lie about size: a one line block for a five line card teaches the person to distrust the screen.
- Not endless. Every skeleton has a moment where it becomes the thing, or becomes a sentence with a retry.

> rule: A skeleton may not move faster than the real thing arrives. The sheen is the only motion; the blocks never pulse, never scale and never slide.

## Progress, for work with a real end

Progress is a thin bar or a ring in the topic colour. Props: value 0 to 1, ring, size, centre, caption, topic.

- A ring means progress and nothing else (golden key rule 1), so it holds a value, not a mood.
- A ring carries a centre value and the caption under it: one number and one word.
- Use progress when the end is known and countable. When it is not, use the skeleton and a line of what she is doing.
- Long work made of steps shows its steps. The Mac pill shows a dot, the count and a chip that opens the overview of the steps.

## A busy button

A button that has been pressed shows busy: a spinner, aria-busy, and it is not clickable again. The label stays, so the button never changes size.

- In the web kit a busy button shows its spinner while its promise runs, or about 700ms after a sentence is sent.
- One busy button per view: the one primary action. One primary per screen.
- The rest of the screen stays usable. A wait never takes away a thing the person may still do.
- Disabled is not busy: disabled is --state-disabled, 38%, for something that cannot be used at all, and it is not a loading state.

## When it takes long

- Past a few seconds, add one line of what is happening, not another spinner.
- One word of state, next to her ring: the status pill on the app, the status word on the web, and the mono capitals on the Mac pill: LISTENING, THINKING, WORKING, MUTED, CONNECTION LOST, WATCHING.
- When a screen she builds fails, she gets the error first and tries again before the person sees an empty screen.
- If it still is not there, say so in one sentence next to the thing, with retry as the first action. See Errors.

> rule: Long is not the same as broken. Never turn a slow answer into an error, and never promise a time the system cannot keep.

> warn: The system names no threshold where a short wait becomes a long one, and no copy beyond "Iris is building this screen...". Say the line you can source, or leave the wait silent under 200ms.
