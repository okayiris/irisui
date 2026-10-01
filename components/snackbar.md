# Snackbar

What happened next, next to the thing it happened to: one line and at most one action.

Group: Feedback. Export: `window.IrisUi.Snackbar`.

## Props

| prop | type | required |
| --- | --- | --- |
| `text` | `string` | yes |
| `tone` | `'accent' | 'ok' | 'wait' | 'error'` | no |
| `action` | `string` | no |
| `onAction` | `() => void` | no |

## Examples

### Done

```js
() => h(Snackbar, { text: "Added to the list for Saturday", tone: "ok" })
```

### With undo

```js
() => h(Snackbar, { text: "Three mails archived", tone: "accent", action: "Undo", onAction: () => {} })
```

### Waiting

```js
() => h(Snackbar, { text: "Reading the invoice", tone: "wait" })
```

### Failed

```js
() => h(Snackbar, { text: "No connection to the house", tone: "error", action: "Try again", onAction: () => {} })
```

## The system's own words

# Snackbar

What happened next, next to the thing it happened to.

## When

- A result the person needs to see but does not need to answer: added, archived, sent.
- A failure that has a next step ("Try again").
- A wait that is worth saying out loud ("Reading the invoice").

Never for something that needs a decision (that is a Dialog), never stacked, never more than one at a time.

## The parts

A dot in the tone, one line of text, and at most one action. `tone` is `accent`, `ok`, `wait` or `error`;
those are the only four, and they are the tokens the app already has.

## Rules

- One line. If it needs two, it is a card in the flow, not a snackbar.
- Only the error tone uses `--error`, and only when something really failed.
- It never covers the control that caused it.
- It leaves on its own after a few seconds unless it carries an action.

## Values

| value | where |
| --- | --- |
| surface | `--sheet-bg`, 1px `--edge`, radius 14px, `--elev-2` |
| padding | 11px 12px 11px 14px |
| dot | 8px in the tone |
| text | 13.5px `--fg`; action 13px `--accent` |

## Accessibility

`role="status"` and `aria-live="polite"`: it is read out without taking focus.
