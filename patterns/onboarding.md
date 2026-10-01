# Onboarding and permission

The first minutes ask once, say what for, and take one permission at a time. A refusal never disables the app.

## The first minutes

The first minutes have one job: get the person to the thing Iris is for, with what she needs and nothing more. Nothing is explained twice, and nothing is asked before it is useful.

1. Who she is: the assistant has a name of her own per house, the product is Iris.
2. What she may see: one permission at a time, each with one line of what for.
3. Voice: how she sounds and how you talk to her.
4. The first thing she does for you, with the answer on screen, not a promise of one.

> rule: Every screen in the first minutes ends with a way forward, and the way past is always visible. A person who wants to look around first is not a problem to solve.

## Ask once, and say what for

The You page is the model: "What Iris may see" as switches, each with one line of explanation, mail, calendar, home, location, top to bottom.

- One line, sentence case, no jargon and no "for a better experience".
- Name what she sees and what she does with it, in the person's terms.
- Name the limit where there is one: what she does not see, what she does not keep.
- Say what for before the system dialog appears, never after it.
- A permission the person did not ask for is not asked for.

> rule: The permission dialog comes from the system and comes once. If the person says no, the system dialog never returns, so the asking screen has to carry the reason before it opens.

## One permission at a time

- One card, one question, one line of what for.
- Two ways forward on the same screen: the ask, and a quiet way past it.
- The result of a yes is described on the same screen, in one sentence.
- A second question waits until the first is answered. Two system dialogs in a row reads as a form.
- Afterwards the same choice stays in the You page as a switch, so the person can change their mind there.

> warn: The system has no onboarding component: the first-minutes screens are not built yet. The switch, the card and the row exist; the asking screen does not.

## While a permission is pending

- The screen says what it is waiting for, and the rest of the app keeps working without it.
- On our side the button shows busy: a spinner and aria-busy, with its label still in place, so nothing moves around it.
- A skeleton is for content from the house, never for an answer from the person.
- While the system dialog is open, nothing else on our screens changes underneath it.
- When the answer comes back no, the screen changes to the refused state, not to an error state.

> warn: The pending state is not written anywhere. The only thing the system names is busy on a button, so that is all this page can promise until a screen for it exists.

## The order of the first screens

What the sources do cover, and what this page decides on top of them.

| Step | Where it comes from |
| --- | --- |
| Who she is | The assistant's own name per house; the product is Iris |
| What she may see | The You page: mail, calendar, home, location, as switches with one line of explanation |
| Voice and language | The You page puts voice and language rows after the permissions |
| The first result | The gate pages are a flow: one question in a column, buttons full width below 40rem |

> warn: Decided here, written nowhere else: the order is who she is, then permissions, then voice, then the first result. What is still open: whether the first minutes are a Flow layout, a set of sheets, or screens of their own, and the exact copy on each of them.

## What is never asked twice

- A permission the person already answered. The system dialog cannot come back, so a second ask is a row in the You page, in her words, with the reason.
- The person's name, mail or language.
- Anything she can find herself, once she may see it.
- A choice the person already made on another device of the same house.
- Anything a second time in the same session: the first answer stands until the person changes it.

> rule: A second ask is allowed only when the thing changed, or when the person turns it on themselves.

## When a permission is refused

- The app is never disabled by a refusal. Every screen still opens.
- Every screen that wanted the permission shows what she can still do without it.
- The way forward stays in sight: the switch in the You page, named in the sentence.
- A refusal is not an error: no red, no warning icon, no counting down.
- The refusal is remembered. The app does not ask again on the next launch.

> rule: Never disabled, always a way forward. The refusal is a state of the app, not a state of the person.

> llm: When you write a screen that needs something she may not see, write the without-it sentence first. That sentence is the screen; the permission is only the shortcut.
