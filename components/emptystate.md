# EmptyState

Nothing here yet, said properly: what this place is for and the one thing to do about it.

Group: Feedback. Export: `window.IrisUi.EmptyState`.

## Props

| prop | type | required |
| --- | --- | --- |
| `title` | `string` | yes |
| `line` | `string` | no |
| `action` | `{ label: string; onClick?: () => void }` | no |
| `children` | `ReactNode` | no |

## Examples

### Nothing kept yet

```js
() => h(EmptyState, { title: "Nothing kept yet", line: "When she finds something worth keeping, it lands here and stays yours.", action: { label: "Ask her something" } })
```

### No loops yet

```js
() => h(Topic, { name: "home" }, h(EmptyState, { title: "No loops yet", line: "A loop is one thing that comes back: the bins, a bill, a birthday." }))
```

## The system's own words

# EmptyState

Nothing here yet, said properly.

## When

- A list, a search or a page that has nothing in it yet, or after a search found nothing.
- Never for a failure (that is an error line) and never for a wait (that is a `Skeleton`).

## The parts

An icon in the topic's accent, a title in one short sentence, a line that says what this place is for, and at
most one action.

## Rules

- The line explains the place, not the absence: "A loop is one thing that comes back", not "No data".
- One action at most, and it is the thing that fills this place.
- It sits inside a glass card: the same surface as the content it stands in for.
- It never has a picture and never a joke.

## Values

| value | where |
| --- | --- |
| surface | `--glass`, 1px `--edge`, `--radius-card` (18px), 22px 18px |
| icon | 34px circle, 1px `--edge`, accent glyph |
| title | 500 15px `--fg`; line 13px `--dim`, max 36 characters wide |

## Accessibility

The icon is `aria-hidden`; the title and line are plain text, so the screen reader reads a sentence, not a
picture.
