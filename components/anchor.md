# Anchor

The one personal note on a screen she builds for someone, beside the thing it is about.

Group: Screen parts. Export: `window.IrisUi.Anchor`.

## Props

| prop | type | required |
| --- | --- | --- |
| `children` | `ReactNode` | yes |

## Examples

### In a widget

```js
() => h(UI.Widget, { topic: "groceries", look: "glass", size: "wide", label: "On the list", value: "8", unit: "things", note: "home-baked" })
```

## Guidelines

- Do: Exactly one per screen; Widget renders one for you with note.
- Do: Keep it within 24px of its subject and 8px clear of lines and labels.
- Do: It adds the personal thing, like home-baked or for the neighbour.
- Don't: Never repeat a fact from the sub line, the list or her sentence.
- Do: No fill under it.

## Specs

- type: `Caveat 700 at 20.8px on a 1 line height`
- tilt / opacity: `-3 degrees, opacity .9`
- colour: `the topic's --k; fg and dim read on every ground`
- anchor-reach: `24px from its subject`
- anchor-clear: `8px from any line or label`
- fallback: `Caveat stylesheet on the page (Google Fonts family=Caveat:wght@700), else Bradley Hand; a second anchor renders 13px --dim with a 6px left margin`

## Accessibility

- Handwriting is text: a screen reader reads the words like any other line.
- The words must stand on their own, since they add a fact the rest of the screen does not carry.
- The fallback face keeps the line readable when Caveat is not loaded, and -3 degrees keeps it legible at 20.8px.

## The system's own words

# Anchor

The one personal note in handwriting on a screen: Caveat 700 at 20.8px, the topic's pen colour, -3 degrees, opacity .9, no fill under it.

It sits within 24px of its subject (`anchor-reach`) and at least 8px clear of lines and labels (`anchor-clear`). It shares no fact with the sub line, the list or her sentence: it adds the personal thing ("home-baked", "for Alex").

Consumer provides: the words, and a Caveat stylesheet on the page (Google Fonts, `family=Caveat:wght@700`); without it, Bradley Hand on Apple devices. Widget renders one for you with `note`.

One per screen: a second one renders as a plain dim line and warns.

