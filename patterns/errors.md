# Errors and refusal

Say what happened next to the thing that failed, in one sentence, with retry first. A refusal is not an error.

## Next to the thing that failed

The sentence goes where the thing was: in the card, the row or the field that failed. An error shows "That didn't work. Try again in a moment." next to the thing that failed, and goes to Iris on her own with the request, so she can fix it before the person notices.

- Same place as the thing: never a corner, never a toast for a failure the person is looking at.
- One sentence, then the action. The action sits under the sentence it belongs to.
- The same shape every time: what happened, then what to do. No stack traces, no codes, no server words.
- The rest of the screen stays: the other rows, the other cards, the things that still work.

## One sentence shape

| Situation | What is said | Action |
| --- | --- | --- |
| A request fails | "That didn't work. Try again in a moment." (apps.md, the error trap of 29-09) | Try again, first |
| A list, table or board is empty | A sentence that says what goes there and how to add the first one | The first action the empty state offers |
| Work she is doing fails | Nothing on screen yet: she gets the error first and tries again before the person sees an empty screen | None until her own retry has failed |

> warn: Only the request sentence and the empty state rule are written in the system. The rest of the copy is open: write it in this shape, one sentence plus one action, and keep it in the same words everywhere.

## Retry is the first action

- Retry comes first, in a house button, not as a link inside the sentence.
- Retry repeats the same request. It never quietly starts something else.
- A second retry is allowed; the wording does not promise it will work this time.
- A second action beside retry is quiet, and danger only when it destroys something.
- Never a retry that needs the person to remember what they typed.

> rule: The first action after a failure is the one that costs nothing: the same request again. Anything that deletes, discards or leaves is beside it and quiet.

## Refusal is its own case

When she will not do something, nothing failed. There is no error and no retry: there is a sentence in her voice, where the question was asked, in the conversation.

- Refusal is not red. Red is destructive only.
- It is not a toast, not a corner of the screen and not a log line.
- Shape: what she will not do, then what she can do instead.
- She says it once, plainly, in the person's language, and does not answer a different question.
- A refusal never looks like a fault: no broken icon, no blame, no apology loop.

> warn: The system has no refusal copy yet and no component for it. The shape above is decided here; the words are not written anywhere. Write them with the assistant's own name, one or two sentences, with a way forward.

## Red is only for destructive

- --error is the destructive colour: a delete, an account that goes, a thing that cannot be undone.
- A failed request is not red. It is a sentence and a retry in the ordinary text colours.
- A warning is --wait, a finished thing is --ok. The snackbar dot carries the tone.
- No badge is red. The Mac pill badge is magenta (badge colour #c026d3) with white digits, because red means destructive only.
- A required field is explained in --dim, not shouted in red.

> rule: Before painting anything red, name the thing it destroys. If nothing is destroyed, it is not red (foundation rule 3).

## What is never logged or shown

- No secrets: no keys, no tokens, no credential values, in the message, the log or the screenshot.
- No personal content in what the person sees: no mail body, no calendar entry, no location, no name that came from a real account.
- No raw request or response body in the interface, and demo content only in any shot or mock.
- What goes to Iris is the request and the failure, enough to fix it, and nothing more about the person than the fix needs.

> rule: One sentence for the person, one record for her. They are never the same string, and neither carries a secret.

## The one place an error may interrupt

A dialog is the one place an error may stop the person, and only when there is a choice for them to make. The overlays are one at a time, and they wear --sheet-bg over the --scrim.

| A dialog may appear when | It may not appear when |
| --- | --- |
| The action destroys something and must be confirmed first | A load, a refresh or a call failed: that is a sentence beside the thing, with retry |
| The account or the session cannot continue at all | Work she runs in the background fails: say it in the conversation, not over the screen |
| Nothing else can be done and the person has to decide | The same failure has already been shown: a dialog may not repeat it |

> rule: A dialog asks something. If there is nothing to ask, it is not a dialog. When in doubt, keep the person in the place they were and put the sentence next to the thing that failed.
