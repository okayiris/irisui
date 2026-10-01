# VaultAsk

The vault's question, the same on every device: who asks, from where, why, what it does and how far it reaches, then allow or no.

Group: Overlays. Export: `window.IrisUi.VaultAsk`.

## Props

| prop | type | required |
| --- | --- | --- |
| `title` | `string` | yes |
| `who` | `string` | yes |
| `from` | `string` | yes |
| `why` | `string | null` | no |
| `does` | `string | null` | no |
| `scope` | `'names' | 'use' | 'store'` | no |
| `biometric` | `string` | no |
| `onAllow` | `() => void` | no |
| `onAlways` | `() => void` | no |
| `onDeny` | `() => void` | no |
| `allowLabel` | `string` | no |
| `denyLabel` | `string` | no |

## Examples

### Use a login

```js
() => { const [said, setSaid] = React.useState(null);
  return said ? h("p", { role: "status", style: { fontSize: 15 } }, said)
    : h(Card, { padding: 18 }, h(VaultAsk, { title: "Iris wants your shop.example.com login", who: "Iris, your assistant", from: "Chrome on this Mac, shop.example.com",
      why: "You asked her to order the groceries for Saturday", does: "Fills in your password on shop.example.com", scope: "use", biometric: "Touch ID",
      onAllow: () => setSaid("Allowed once. Touch ID confirmed."), onAlways: () => setSaid("Allowed for this site."), onDeny: () => setSaid("Nothing was shared. Iris is told no.") })); }
```

### Nobody said why

```js
() => h(Card, { padding: 18 }, h(VaultAsk, { title: "Iris wants a card", who: "Iris, your assistant", from: "Her own house", scope: "use", onAllow: () => {}, onDeny: () => {} }))
```

## The system's own words

# VaultAsk

The question the vault asks before anything leaves it. The same lines on every device, in the same order: who
asks, from where, why, what it does, and how far it reaches. Then allow, or no.

## When

- Every time a secret is read, used or stored. On the phone in a Sheet, on the Mac in a small window, in Chrome
  the extension only points to it: the answer is given on the phone or with Touch ID.

## The parts

`title` is the question in one line. `who`, `from`, `why` and `does` are the four facts; `scope` says
how far it reaches: `names` (only names are read), `use` (one value is used, never shown to Iris) or `store`
(a new secret is saved). `biometric` names how the person confirms, "Face ID" or "Touch ID". `onAllow`,
`onDeny` and, for a use with a reason, `onAlways` ("Always for this site").

## Rules

- A fact nobody gave is said, "the asker did not say", in the wait colour. Never a blank line.
- No why: the question says so and suggests asking Iris first. Always is not offered then.
- Allow is the one primary button and names the confirmation: "Allow once with Face ID". No is plain text.
- Nothing red: saying no destroys nothing.

## Accessibility

The question is a section named by its title. The facts are a description list, so a screen reader reads each
label with its value.
