# TabBar

The bottom of every iPhone screen: her talk button in the middle, the tabs either side of it.

Group: Navigation. Export: `window.IrisUi.TabBar`.

## Props

| prop | type | required |
| --- | --- | --- |
| `tabs` | `string[]` | no |
| `active` | `number` | no |
| `icons` | `string[]` | no |
| `collapsed` | `boolean` | no |
| `progress` | `number` | no |
| `talk` | `'rest' | 'talking' | 'expression' | 'listening' | 'thinking' | 'muted' | 'away'` | no |
| `analyser` | `AnalyserNode` | no |
| `onSelect` | `(i: number) => void` | no |
| `onTalk` | `() => void` | no |

## Examples

### Open

```js
() => pad(h(TabBar, { active: 0 }))
```

### Collapsed

```js
() => pad(h(TabBar, { active: 0, collapsed: true }))
```

### Swipe halfway

```js
() => pad(h(TabBar, { active: 0, progress: 0.5 }))
```

### Swipe (live)

```js
() => h(Swipe)
```

### Talking

```js
() => pad(h(TabBar, { active: 1, talk: "talking" }))
```

## Guidelines

- Do: Two halves of equal width, so the orb stays in the middle. The app now puts Iris alone on the left and Camera and You on the right; the release TabBar still splits four tabs two and two and cannot draw that yet.
- Don't: Never a fifth tab: the middle is the orb.
- Do: The orb stays on top; the pill slides under it and its effects fall over the tabs.
- Do: The bar keeps 22pt into the bottom safe area and leaves the home indicator free.
- Do: collapsed at rest; it opens on a page swipe or a swipe right on the orb, and folds back after 2.5s without touch.

## Specs

- bar: `62px high, radius-pill, glass rgba(20,26,34,.72)`
- talk: `74px wide, margin-top -28px, TalkOrb 66pt`
- collapsed: `clip inset(-14px calc(50% - 33px) 14px round 33px); tabs scale .4 and fade`
- progress: `the front of the pill runs ahead and the back lets go later, a metaball neck between them; a tab tap springs it over`
- fold back: `2.5s without touch`

## Accessibility

- Every tab carries its word: the icon is not the name.
- Active is ice blue on a faint blue pill and keeps its label, so colour is never the only sign.
- The talk button has no word of its own and needs one (Talk); it stands above the bar with the highest z-index of its row.

## The system's own words

# TabBar

The floating tab bar at the bottom: a frosted capsule with four tabs (Iris, Loops, Camera, You) and her TalkOrb in the middle, standing out above the bar. The active tab is ice blue, on a faint blue pill.

TabBar from IrisUi (`window.IrisUi.TabBar`). Wrap the tree in `<PreviewI18nProvider>` for the app's background and font.

Props: `{ tabs?: string[]; active?: number; icons?: string[]; collapsed?: boolean; progress?: number; talk?: TalkOrb state; level?: number; onSelect?: (i: number) => void; onTalk?: () => void }`

- `collapsed`: at rest only the orb shows. The glass shrinks into the orb and the tabs fold towards it. The bar opens on a page swipe or a swipe right on the orb, and folds back in after 2.5 s without touch.
- `progress` (-1...1): a page swipe in flight. The pill follows the finger and is liquid: the front runs ahead, the back lets go later, and a neck between them thins as it stretches (blur plus alpha threshold, a metaball). Tapping a tab springs it over.
- `talk`, `level`: passed on to the TalkOrb.
- The orb is always on top: the pill slides under it, and its effects fall over the tabs.
- The bar sits low: 22pt into the bottom safe area, with the home indicator still free.

```js
const h = React.createElement;
h(TabBar, { active: 0, progress: 0.5 })
```

