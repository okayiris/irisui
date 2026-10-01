# Type

Quiet type. The system font, eight named sizes, mono for labels and values. Nothing shouts, and nothing is invented.

## The eight sizes

Eight --text-* tokens hold every size in the product. Each one is a full shorthand: weight, size, line height and family. Use the token, not the parts.

| Token | Size / line height | Weight | Use |
| --- | --- | --- | --- |
| --text-hero | 34px / 40px | 700 | Big headline on a hero or a post. Display family. |
| --text-page-title | 28px / 34px | 700 | Page title in the app. Display family. |
| --text-row-title | 17px / 22px | 400 | Card and row titles. |
| --text-body | 15px / 20px | 400 | Running text. |
| --text-sub | 12px / 16px | 400 | The dim line under a title. |
| --text-tab | 13px / 16px | 400 | Tab bar labels. |
| --text-label | 10.5px / 14px | 500 | Section labels, caps, faint. Mono, 0.14em tracking. |
| --text-value | 12px / 16px | 400 | Times, counters. Mono. |

- `----text-hero` (Hero): The assistant that actually does it

- `----text-page-title` (Page title): Loops

- `----text-row-title` (Row title): On the road

- `----text-body` (Body): The assistant listens and talks through this iPhone.

- `----text-sub` (Sub): Blocks, voice, notifications

- `----text-label` (Label): SETTINGS

- `----text-value` (Value): 09:12

> rule: Never invent a size. If a size is not one of the eight, the answer is not a ninth size: it is one of these eight, or the content is too long.

## Three stacks and where the faces come from

The type is the system stack. There is one stack for running text, one for the large styles and one for labels and values, and every one of them ends in the generic fallbacks, so a page with nothing else still reads in the right shape.

| Stack | Token | What it is |
| --- | --- | --- |
| text | --font-text | Inter first, then the platform's own text face, then system-ui and the generic fallbacks. Running text and row titles. |
| display | --font-display | Inter first, then the platform's own display face, then the same fallbacks. The hero and a page title. |
| mono | --font-mono | The platform's mono face, then the generic mono fallbacks. Labels and values. |

No font file ships for any of the three. Inter stands first in the text and display stacks, so it is used only on a machine that already has Inter installed; everywhere else the platform's own face is used. The one face the system ships is the handwritten one the Anchor draws with.

> rule: Display from 20px up. Text below 20px. A 28px title is --font-display, a 17px row title is --font-text.

> warn: No other webfont joins the system. A page does not pull a face from a font host, and a new face is a change to the release, not a line in a page. The system stack is the whole licence.

## When mono is used

Mono carries labels and values, and nothing else. If the reader has to compare or count it, mono. If the reader has to read a sentence, it is text.

- A section label: 10.5px, weight 500, 0.14em tracking, in caps, in --faint. The one place caps are allowed.
- A value: a time, a counter, in 12px. Tabular figures, so columns line up.
- A widget label: 11px, weight 600, 0.14em tracking, in the topic colour.
- A widget value: 52px, weight 700, letter-spacing -0.02em, 46px in the small and tall widget.
- A webpage micro label: 11px mono, weight 500, 0.1em tracking, which is the web app's own value, not the app's.

> rule: Mono never carries a sentence. If a paragraph is in mono, the paragraph is in the wrong font.

## Sentence case, and quiet

- Sentence case everywhere. The only caps are a mono section label and a widget label.
- No exclamation marks, anywhere, in any language.
- No emoji, in a title, a label, a body or a mail.
- No em dashes. Use a period and a new sentence.
- The product is Iris. She is she, and she has a name of her own per house.
- Short sentences. One thought each.

> rule: Sentence case is the house voice, not a style preference. A title in Title Case reads as an announcement, and this is not one.

## Two sizes the tokens carry outside --text-*

tokens.json names two more type groups that have no --text-* token of their own, because they belong to one part rather than to running UI.

| Style | Size / line height | Weight | Use |
| --- | --- | --- | --- |
| hand anchor | 20.8px / 20.8px | 700 | The one handwritten Anchor per screen. Caveat, Bradley Hand on Apple devices. |
| widget-value | 52px / 52px | 700 | The big number of a wide or large widget, 46px in small and tall. |
| widget-label | 11px / 14px | 600 | A widget label, caps, in the topic colour. |

> warn: The hand anchor is a size, not a licence. Exactly one Anchor per screen, in the topic pen colour, at -3 degrees, opacity .9, within 24px of its subject and at least 8px clear of any line.
