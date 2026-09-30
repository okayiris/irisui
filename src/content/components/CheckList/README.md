# CheckList

A list with tick circles in the topic colour, or with times in front instead; `onToggle` makes the rows tickable.

Consumer provides: `items` (strings, or `[time, text]` pairs), `done` (a count or indexes), `max` (rows shown), `onToggle`, `topic`. Strike-through only here, in a tick list; done rows may fold away in a widget.

Part of the web parts in the topic palette (`WebKit` shows them together, next to the widget of the same topic). Inside a `Topic` it takes that topic's `--k` and `--kd`.
