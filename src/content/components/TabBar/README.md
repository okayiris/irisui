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
