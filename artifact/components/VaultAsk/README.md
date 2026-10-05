# VaultAsk

The question the vault asks before anything leaves it. The same lines on every device, in the same order: who
asks, from where, why, what it does, and how far it reaches. Then allow, or no.

## When

- Every time a secret is read, used or stored. On the phone in a Sheet, on the Mac in a small window, in Chrome
  the extension only points to it: the answer is given on the phone or with Touch ID.

## The parts

`title` is the question in one line. `who`, `from`, `why` and `does` are the four facts; `scope` says
how far it reaches: `names` (only names are read), `use` (one value is used, never shown to Iris) or `store`
(a new secret is saved). `biometric` names how the person confirms, "Face ID" or "Touch ID". `onAllow`,
`onDeny` and, for a use with a reason, `onAlways` ("Always for this site").

## Rules

- A fact nobody gave is said, "the asker did not say", in the wait colour. Never a blank line.
- No why: the question says so and suggests asking Iris first. Always is not offered then.
- Allow is the one primary button and names the confirmation: "Allow once with Face ID". No is plain text.
- Nothing red: saying no destroys nothing.

## Accessibility

The question is a section named by its title. The facts are a description list, so a screen reader reads each
label with its value.
