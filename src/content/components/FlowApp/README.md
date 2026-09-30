# FlowApp

One question per step with a progress line on top: sign-ups, bookings, a plugin wizard.

One question per screen, for anything with a clear end: book, sign up, set up a plugin, file a claim.

- A progress line of equal segments on top, "2 of 4" in mono in the header, back chevron top left.
- The question is large (`1.4rem`/500) in a reading column of `30rem`; choices are outlined pills that fill when chosen.
- Back and Continue sit bottom right, primary last; on a phone they share the width. The last step shows a summary and the real verb ("Book", "Pay", "Send"), never "Finish".
- Nothing is sent before the last step; leaving halfway keeps the answers.
