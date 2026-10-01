# CheckList

A short list of things to do, ticked in the topic colour or ordered by time.

Group: surfaces. Export: `window.IrisUi.CheckList`.

## Props

| prop | type | required |
| --- | --- | --- |
| `items` | `(string | [string, string])[]` | no |
| `done` | `number | number[]` | no |
| `max` | `number` | no |
| `onToggle` | `(i: number) => void` | no |
| `topic` | `TopicName` | no |

## Examples

### Tickable

```js
() => { const [done, set] = React.useState([0, 1]); return h("div", { style: { width: 320 } }, h(UI.CheckList, { topic: "groceries", items: ["Milk", "Bread", "Eggs", "Cheese", "Apples"], done, onToggle: i => set(x => x.includes(i) ? x.filter(y => y !== i) : [...x, i]) })); }
```

### Times instead of ticks

```js
() => h("div", { style: { width: 320 } }, h(UI.CheckList, { topic: "agenda", items: [["09:30", "Stand-up"], ["14:00", "Dentist"], ["16:30", "Call a colleague"]], done: [0] }))
```

## Guidelines

- Do: Use strike-through only here, in a tick list, on done rows.
- Don't: Strike-through on a value, a title or a finished row in any other part.
- Do: Keep times in the mono value style with a 42px column, or drop the ticks for a timed list.
- Don't: Times and tick circles in the same list, or a time that moves as you tick.
- Do: Fold finished rows into one line such as 3 checked when the list is long.
- Don't: Let a done row keep full height in a small card.

## Specs

- List: `grid, gap 7px, font 14px var(--font), --fg`
- Row: `flex, gap 8px, align center`
- Tick circle: `15px, 2px solid #4a5361`
- Done tick: `--k fill with a dark check, #07090c stroke`
- Done text: `--dim with strike-through`
- Time: `600 12px var(--font-mono), --k, column 42px`

## Accessibility

- A tickable row is a button with its state exposed, so a screen reader hears checked or not.
- The whole row is the target, not just the 15px circle.
- The time is read before the text in a timed list, matching the order on screen.

## The system's own words

# CheckList

A list with tick circles in the topic colour, or with times in front instead; `onToggle` makes the rows tickable.

Consumer provides: `items` (strings, or `[time, text]` pairs), `done` (a count or indexes), `max` (rows shown), `onToggle`, `topic`. Strike-through only here, in a tick list; done rows may fold away in a widget.

Part of the web parts in the topic palette (`WebKit` shows them together, next to the widget of the same topic). Inside a `Topic` it takes that topic's `--k` and `--kd`.

