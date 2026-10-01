# MacPill

The Mac: her orb low on the desktop, with the bar that grows out from behind it when the hand rests on it.

Group: Brand. Export: `window.IrisUi.MacPill`.

## Props

| prop | type | required |
| --- | --- | --- |
| `state` | `'rest' | 'listening' | 'thinking' | 'talking' | 'muted' | 'away'` | no |
| `onPress` | `() => void` | no |
| `left` | `PillAction[]` | no |
| `right` | `PillAction[]` | no |
| `open` | `boolean` | no |
| `badge` | `number` | no |
| `words` | `string` | no |
| `status` | `string` | no |
| `back` | `{ label: string; onClick?: () => void; variant?: 'text' | 'glass' }` | no |
| `working` | `boolean` | no |
| `size` | `number` | no |

## Examples

### At rest, hover the orb

```js
() => { const [panel, setPanel] = React.useState(null); const [badge, setBadge] = React.useState(2);
  const [state, setState] = React.useState("rest"); const [words, setWords] = React.useState(null);
  const pick = (k) => () => { setPanel(panel === k ? null : k); if (k === "chats") setBadge(0); };
  const talk = () => { setState("thinking"); setWords(null);
    setTimeout(() => { setState("talking"); setWords("Tomorrow at half past nine you have the dentist."); }, 1400);
    setTimeout(() => { setState("rest"); setWords(null); }, 4600); };
  return h("div", { style: { paddingTop: 40 } }, h(MacPill, { state, onPress: talk, badge, words, status: state === "thinking" ? "Thinking" : undefined,
    left: [ { label: "Calls", icon: "phone", active: panel === "calls", onSelect: pick("calls") }, { label: "Chats", icon: "wave", active: panel === "chats", onSelect: pick("chats") } ],
    right: [ { label: "Vault", icon: "shield", active: panel === "vault", onSelect: pick("vault") }, { label: "Settings", icon: "person", active: panel === "settings", onSelect: pick("settings") } ] })); }
```

### Muted, with the way back

```js
() => { const [muted, setMuted] = React.useState(true);
  return h(MacPill, { open: true, state: muted ? "muted" : "rest", status: muted ? "Muted" : undefined, back: muted ? { label: "Turn sound on", onClick: () => setMuted(false) } : undefined,
    left: [ { label: "Chats", icon: "wave" } ], right: [ { label: "Talk while held", icon: "mic" } ] }); }
```

### Working

```js
() => h(MacPill, { working: true, status: "Booking the table, step 3 of 6" })
```

## Guidelines

- Do: One pill per screen: it is her, so no other orb near it.
- Do: Nothing under the orb while she talks: the orb already talks.
- Don't: A state word in caps, or a count without words.
- Do: Muted and away always carry their way back: Turn sound on, Try now.
- Do: The badge is in the accent.
- Don't: A red or magenta badge: red is destructive, magenta is the ring.

## Specs

- Orb: `60px; work light 70px, the house Edge`
- Bar: `44px high, radius pill, --glass, inset edge, blur 18px, 46px per button`
- Open and close: `opens 180ms after the hand rests, folds 700ms after it leaves (scale x 0.3, blur 6px)`

## Accessibility

- The bar opens on focus as well as hover; folded it is hidden from the keyboard.
- Each button is icon-only and takes its tooltip text as its name.
- Her words are a polite live region, the status line a status.

## The system's own words

# MacPill

Iris on the Mac desktop. At rest it is only her orb, low in the middle of the screen. When the hand rests on it, a
bar of buttons grows out from behind the orb; it folds away a moment after the hand leaves. Her words stand above
the orb, one state line under it, with the way back beside that line.

## When

- The one place Iris lives on a Mac desktop. One per screen: the pill is her, so no second orb anywhere near it.
- Panels (chats, calls, the vault, settings) open above the pill from the buttons in its bar.

## The parts

`left` and `right` are the buttons either side of the orb: `{ label, icon, active, onSelect }`, a house icon
name each, the label is the tooltip and the accessible name. `state` is the TalkOrb's state; a press on the orb
calls `onPress`. `words` is what she says, above the orb. `status` is one line under it, `back` the way out
of that state ("Turn sound on", "Try now"). `badge` counts what is new, in the accent. `working` runs the Edge
light round the orb while she works on something. `open` holds the bar out.

## Rules

- No state word while she talks: the orb already talks. Thinking, muted and away say it in words too.
- A state that stops her (muted, away) always has its way back next to the line.
- The badge is a count of new things, never a colour of its own.
- Working is light round the orb and a line that says what she does, not only a count.

## Values

Orb 60px. Bar 44px high, glass with an edge, radius pill, 46px per button, the gap behind the orb is the orb plus
8px. The bar grows in --motion-base with --ease-house, after 180ms of hover, and folds after 700ms.

## Accessibility

Every bar button has a name and a tooltip. The bar opens on focus as well as on hover; folded it is hidden from
the keyboard. Her words are a polite live region, the state line a status.
