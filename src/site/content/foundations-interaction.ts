// Foundations: interaction. What a hand gets back on a phone, a window and the web: press, navigation, sheets,
// swipes, lists, the done moment, haptics. Source: the micro-interaction review of the iPhone and Android apps
// (1 October 2026). Motion values come from the Motion page; this page says when and where they are used.

import type { Doc } from "../content";

export const FOUNDATIONS_INTERACTION: Record<string, Doc> = {
  interaction: {
    id: "interaction",
    label: "Interaction",
    lede:
      "Every touch gets an answer you can see, and on a phone one you can feel. Nothing arrives or leaves in one frame, and nothing moves that nobody asked for.",
    sections: [
      {
        title: "Three rules over all of it",
        blocks: [
          {
            kind: "ol",
            items: [
              "Answer the hand within one frame. A tap that shows nothing reads as a tap that did not land.",
              "Nothing appears or disappears in one frame. A screen slides, a row leaves, a sheet rises. The only exception is reduced motion, where the end state lands without the journey.",
              "Nothing redraws itself unasked. A refresh updates what changed in place; it never rebuilds a screen, restarts a drawing or throws away the scroll position and the text someone is typing.",
            ],
          },
          {
            kind: "note",
            tone: "llm",
            text:
              "Building a screen: for every tappable thing, name its press answer, its haptic and what happens on the screen after. If one of the three is \"nothing\", it is not finished.",
          },
        ],
      },
      {
        title: "Press",
        blocks: [
          {
            kind: "table",
            head: ["Part", "Press answer", "Why"],
            rows: [
              ["Button, chip, tab, icon", "`.ix-hit`: press layer and a shrink to 0.985", "The State page; small parts need little travel"],
              ["Row, card, list item", "Press layer and a shrink to 0.97", "0.985 on a 340pt row is 2pt; the hand does not see it"],
              ["Talk button", "Disc and core to 0.93", "The one big press in the product"],
              ["Anything disabled", "Nothing", "No answer means it cannot be used"],
            ],
          },
          {
            kind: "ul",
            items: [
              "A row that opens something is a button, not a tap gesture on a view. On iOS a `Button` with the `Druk` style, on Android the same scale on press. Iris uses no ripple: one look on both platforms.",
              "The press answer runs at `--motion-fast` and releases on the same curve, also when the finger slides off.",
            ],
          },
        ],
      },
      {
        title: "Going deeper and coming back",
        blocks: [
          {
            kind: "table",
            head: ["Move", "What it does", "Timing"],
            rows: [
              ["Open a screen", "Slides in from the trailing edge; the screen below moves 30% the other way and dims", "`--motion-slow`, house curve"],
              ["Back", "The same move in reverse, and it follows the finger from the leading edge", "Tracks the finger, then settles"],
              ["Switch tab by tap", "A crossfade, no slide: the tab ink already moves", "`--motion-base`"],
              ["Switch tab by swipe", "The pages follow the finger and settle on the nearest", "Tracks the finger, then settles"],
              ["The tab bar on a deeper screen", "Fades and drops 8px, never vanishes in one frame", "`--motion-base`"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Back is always a gesture as well as a button. On Android that is predictive back (`OnBackPressedCallback` with progress), never the old `onBackPressed`.",
          },
        ],
      },
      {
        title: "Sheets",
        blocks: [
          {
            kind: "ul",
            items: [
              "A sheet has a visible grabber and can always be dragged down to close.",
              "A sheet that holds a list or a conversation opens at half height and can be pulled to full. A sheet with one short question opens at its own height.",
              "The sheet is glass, like a card, with `--radius-sheet` (22px) on the top two corners.",
              "Dragging a sheet past its top stretches a little and comes back. It never stops like a wall.",
            ],
          },
        ],
      },
      {
        title: "Swipe on a row",
        blocks: [
          {
            kind: "ol",
            items: [
              "A swipe only opens or closes the row; an action is always a tap on its button. A long swipe never picks one by itself.",
              "One light haptic when the swipe passes the point where letting go keeps the row open.",
              "Past the last action the row keeps following, slower: travel beyond the edge is `over^0.7`, never a hard stop.",
              "Opening a row closes the one that was open. Only one row is open at a time.",
              "Where a platform has no swipe (Android lists, the web), the same actions live under a long press.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text: "A destructive swipe is undone, not confirmed. The row leaves and a bar says what happened, with Undo, for 4 seconds.",
          },
        ],
      },
      {
        title: "Lists that change",
        blocks: [
          {
            kind: "table",
            head: ["Change", "What it does"],
            rows: [
              ["A row arrives", "Fades in from 0.97, the rows below make room at `--motion-base`"],
              ["A row is done", "The circle fills and gets a check at once, then after 0.35s the row slides out to the leading edge and the gap closes"],
              ["A row moves up", "It travels to its new place; it never jumps"],
              ["A filter changes", "The selected pill slides to its place, the list changes with a crossfade"],
              ["Data is still coming", "A `Skeleton` in the shape of the rows. The empty state shows only after the data answered empty"],
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "An empty state that flashes before the list arrives says \"you have nothing\" for a moment. Keep \"not loaded yet\" and \"loaded, empty\" as two different values in code.",
          },
        ],
      },
      {
        title: "The done moment",
        blocks: [
          {
            kind: "p",
            text:
              "Finishing a loop is the one celebration in Iris. It runs once, at the moment it becomes true, and then the screen gets out of the way.",
          },
          {
            kind: "ol",
            items: [
              "The Done button presses.",
              "The ring fills its remaining phases one by one, 50ms apart.",
              "The ring pulses once, the check draws itself in, and the success haptic plays.",
              "Confetti flies out from the ring's edge, once, for at most 1.6s.",
              "After 1.2s the screen closes by itself. Nobody needs a second tap to leave.",
            ],
          },
          {
            kind: "ul",
            items: [
              "Opening a loop that was already done shows it done: full ring, check, no confetti.",
              "Under reduced motion: the ring is full at once, a soft glow comes up over 0.3s, and the haptic still plays.",
            ],
          },
        ],
      },
      {
        title: "Haptics",
        blocks: [
          {
            kind: "table",
            head: ["Moment", "iOS", "Android"],
            rows: [
              ["A choice changes: tab, filter, ring phase", "`.selection`", "`SEGMENT_TICK` or `CLOCK_TICK`"],
              ["A threshold or a snap: swipe, sheet detent", "`.impact(weight: .light)`", "`CLOCK_TICK`"],
              ["Something is done", "`.success`", "`CONFIRM`"],
              ["Something failed", "`.error`", "`REJECT`"],
              ["Scrolling, every row, every keystroke", "nothing", "nothing"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Haptics go through the system (`.sensoryFeedback` on iOS, `performHapticFeedback` on Android), so the phone's own setting switches them off. Never call the vibrator directly.",
          },
        ],
      },
      {
        title: "Springs, only after a finger",
        blocks: [
          {
            kind: "p",
            text:
              "The Motion page has no springs, and that holds for everything Iris starts herself. The one place a spring is allowed is where a finger lets go: a swipe, a dragged sheet, a pulled page. There the motion has to carry on at the speed of the hand, and a curve cannot do that.",
          },
          {
            kind: "table",
            head: ["Platform", "The spring"],
            rows: [
              ["iOS", "`.spring(response: 0.35, dampingFraction: 0.85)` or stiffer"],
              ["Android", "`SpringForce` with `DAMPING_RATIO_NO_BOUNCY`, stiffness `STIFFNESS_MEDIUM`"],
              ["Web", "The house curve at `--motion-slow`; the web has no velocity handoff"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text: "Damping never below 0.85. A spring that bounces is decoration; one that settles looks like the house curve.",
          },
        ],
      },
      {
        title: "Motion that costs nothing",
        blocks: [
          {
            kind: "ul",
            items: [
              "An animation stops when it is done. Confetti is removed after it lands; a drawing that is finished is no longer redrawn.",
              "A clock that runs without input (an hourglass, a countdown) draws at most 30 frames a second. The ring is the only thing that may run forever.",
              "Nothing draws off screen or in the background.",
              "On Android, custom drawing uses the hardware layer. A software layer that redraws every frame drains the battery.",
            ],
          },
        ],
      },
    ],
  },
};
