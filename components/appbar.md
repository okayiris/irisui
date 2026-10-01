# AppBar

The top line of a screen or a window: what this is, and the few actions that belong to it.

Group: Navigation. Export: `window.IrisUi.AppBar`.

## Props

| prop | type | required |
| --- | --- | --- |
| `title` | `string` | yes |
| `sub` | `string` | no |
| `leading` | `ReactNode` | no |
| `actions` | `ReactNode` | no |
| `variant` | `'small' | 'large'` | no |
| `children` | `ReactNode` | no |

## Examples

### Small, with actions

```js
() => h("div", null,
    h(AppBar, { title: "Bins", sub: "A loop, every Tuesday", leading: h(Button, { variant: "icon", label: "Back", icon: h("span", { style: { display: "inline-flex", transform: "scaleX(-1)" } }, h(Icon, { name: "chevron", size: 18 })) }),
      actions: h(Button, { variant: "icon", label: "Talk about this loop", icon: h(Icon, { name: "mic", size: 18 }) }) }),
    h(Card, { style: { margin: 16 } }, h(Row, { title: "Next time", subtitle: "Tuesday 6 Oct, out by 8" }), h(Row, { title: "Who", subtitle: "You, she reminds you at 7" })))
```

### Large, the title of a screen

```js
() => h(AppBar, { variant: "large", title: "This week", sub: "Six loops, two waiting on you",
      actions: h(Button, { variant: "icon", label: "New loop", icon: h(Icon, { name: "sparkles", size: 18 }) }) })
```

## The system's own words

# AppBar

The top line of a screen or a window: what this is, and the few actions that belong to it.

Iris keeps two shapes: small, and large with the title at size.

## When

- At the top of a screen or a window she opens, above everything else.
- Large when the title is the point of the screen; small when the content is.

Never two bars on one screen, never a bar inside a card, and never a bar with more than three actions (the rest belongs in an overflow Menu).

## The parts

`leading` (a back or close button), the title, `actions` on the right, and `children` for what sits under
the bar (a Segmented, a search field).

## Rules

- Glass and blur, one hairline under it: the bar never becomes a solid panel.
- The title is a statement, not a question, and it never repeats what the first card already says.
- It stays at the top while the content scrolls under it.
- The large variant is the only place a screen title goes to 26px; everything else stays at 15.
- One accent at most: the actions are quiet until they are pressed.

## Values

| value | where |
| --- | --- |
| bar | padding 8px 12px 10px, `rgba(7,9,12,.82)` with a 14px blur, 1px `--line` under it |
| small title | 15px/1.3, `--fg` |
| large title | 26px/1.15 `--font-display`, -0.01em tracking |
| sub | 12px `--dim` |

## Accessibility

A `header` landmark. Actions are real buttons with labels; a leading button says where it goes ("Back"), never just showing an arrow.
