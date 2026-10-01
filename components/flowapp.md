# FlowApp

Anything with an end: book, sign up, set up a plugin, file a claim.

Group: App layouts. Export: `window.IrisUi.FlowApp`.

## Guidelines

- Do: One question per step, for anything with a clear end.
- Don't: A flow is not a form: do not stack ten fields in one view.
- Do: The last step shows a summary and the real verb (Book, Pay, Send).
- Don't: Never Finish, never Done.
- Do: Nothing is sent before the last step; leaving halfway keeps the answers.
- Do: On a phone Back and Continue share the width.

## Specs

- Frame (window / phone): `60rem x 31rem, radius 1rem / 23.5rem x 36rem, radius 1.6rem`
- Progress line: `segments 3px high, radius 2px, gap .3rem, padding .7rem 1.1rem 0`
- Question column: `max-width 30rem, centred, padding-top 2rem`
- Choices: `pills radius 999px, padding .45rem .9rem, 1px rgba(125,211,252,.45), filled accent when chosen`
- Foot: `justify flex-end, gap .5rem, border-top 1px --line, padding .8rem 1.1rem`
- Below 40rem: `foot buttons flex 1`

## Accessibility

- The back chevron and Back are the same action; the chevron needs aria-label Back and disabled on step one.
- n of m is text, so the position in the flow is announced.
- The chosen pill is pressed state (aria-pressed or a radio group), not colour alone.

## The system's own words

# FlowApp

One question per step with a progress line on top: sign-ups, bookings, a plugin wizard.

One question per screen, for anything with a clear end: book, sign up, set up a plugin, file a claim.

- A progress line of equal segments on top, "2 of 4" in mono in the header, back chevron top left.
- The question is large (`1.4rem`/500) in a reading column of `30rem`; choices are outlined pills that fill when chosen.
- Back and Continue sit bottom right, primary last; on a phone they share the width. The last step shows a summary and the real verb ("Book", "Pay", "Send"), never "Finish".
- Nothing is sent before the last step; leaving halfway keeps the answers.

