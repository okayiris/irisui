# WebKit

The web UI parts in the topic palette: `Chip`, `Progress` (bar or `ring`), `Stat`, `CheckList`, `Segmented`, `Field`. Inside a `Topic` they take its `--k` and `--kd`, the same colours as that topic's `Widget`, so a groceries card in a window matches the groceries widget on the phone.

- `Chip`: a pill filter or choice; `on` fills it with the topic colour and `--kd` ink.
- `Progress`: a bar by default; `ring` with `centre` and `caption` like a ring widget.
- `Stat`: one number, one word, the number in the topic colour.
- `CheckList`: strings get tick circles; `[time, text]` pairs get the time in the topic colour instead. `done` is a count or indexes, `onToggle` makes rows tickable.
- `Segmented`: tabs inside a card; the active one tinted 14%.
- `Field`: the pill input; caret and focus edge in the topic colour.
- Every part takes an optional `topic` (it wins over the surrounding `Topic`). Without either: the ice accent.
- The rules of `screens.md` hold: one topic per screen, the primary button flat in the topic (`ButtonGroup`), the topic colour for what matters, never for body text.
