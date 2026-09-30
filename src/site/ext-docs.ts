// The system's own words for the parts this project added: what each one is, when to reach for it, and the
// values it is built from. Written in the voice the rest of the design system uses. It becomes the README of
// the component when these parts move into the artifact.

export const extDocs: Record<string, string> = {
  Menu: `# Menu

A list of choices on its own surface, anchored to the thing it belongs to: a sort, a filter, a set of actions.

Iris had a Row with a value and no
surface to change it on; this is that surface.

## When

- A choice between a few named things, or two to six actions on one object.
- From a Row, an icon button or a small pill. The menu points at what it changes.

## The parts

\`items\` is the list: an item has \`label\`, an optional \`icon\`, \`shortcut\`, \`checked\`, \`danger\`,
\`disabled\` and \`onSelect\`; \`kind: "label"\` is a group heading and \`kind: "sep"\` a separator. Neither is
focusable. \`align: "end"\` opens the menu to the left of its trigger, which is what a menu on the right edge
of a row needs.

## Rules

- One accent, on the active item. Everything else is text.
- Danger sits last, alone, after a separator. Never first, never in the middle.
- The menu closes on Escape, on a choice, and on a click outside. Escape puts focus back on the trigger.
- Arrow up and down, Home and End move; Tab leaves. It is a menu, not a list of links.
- Never put a form in a menu. If it needs a field, it needs a dialog or a sheet.

## Values

| value | where |
| --- | --- |
| surface | \`--sheet-bg\`, 1px \`--edge\`, \`--radius-menu\` (14px), \`--elev-2\` |
| item | 9px 10px, radius 10px, hover \`--state-hover\` |
| label | \`--text-label\` (10.5px mono, caps, tracked), \`--faint\` |
| shortcut | 11px \`--mono\`, \`--faint\` |
| opening | \`--motion-fast\` (150ms) with a 4px rise |

## Accessibility

The trigger says \`aria-haspopup="menu"\` and \`aria-expanded\`. Items are \`menuitem\` or \`menuitemcheckbox\`
with \`aria-checked\`; the separator is \`separator\`. Focus moves into the menu when it opens.`,
  Dialog: `# Dialog

The one place Iris interrupts: a decision that cannot wait.

Iris is calm by rule (one frame, no interruption), so a dialog is rare and has to
earn it.

## When

- A decision that changes something for good: unpair a device, delete an account, send something out.
- A question she cannot answer alone and cannot wait to ask.

Never for a notice, a result, a progress report or a "saved!" — those are a Snackbar, a line next to the
thing, or a Skeleton. Never two dialogs at once.

## The parts

\`title\` says the decision in a question or a plain sentence. \`body\` is one or two lines: what changes. The
actions are the house Button: the decision first (primary, or danger when it destroys), the way out under it.

## Rules

- The way out is always there, and it is never the red one.
- The label of the first button says what happens ("Unpair", not "OK").
- The scrim is \`--scrim\`; the dialog is \`--sheet-bg\` with \`--radius-card\` and \`--elev-2\`.
- It covers its own box, not the browser: the page behind it stays where it is.
- Escape closes it. The first action takes focus when it opens.

## Values

| value | where |
| --- | --- |
| width | min(400px, 100% - 32px) |
| padding | 20px |
| radius | \`--radius-card\` (18px) |
| actions | house Button, full width in one column, 8px apart |
| opening | \`--motion-base\` (200ms), 10px rise |

## Accessibility

\`role="dialog"\`, \`aria-modal="true"\`, labelled by its title. Escape closes; focus goes back to what opened it.`,
  Sheet: `# Sheet

Secondary content anchored to an edge of the screen: the bottom on a phone, the side on a wide window.

One part covers both edges: the bottom on a phone, the side on a wide window, through \`side\`.

## When

- A choice that needs a moment but not the whole screen: a voice, a filter, the details of something in front
  of you.
- On a wide window, the side sheet keeps the thing you are looking at visible next to the sheet.

Never for the main content of a screen, and never two at once.

## The parts

The grip (bottom only) says it can be dragged away. \`title\` and \`sub\` say what the sheet is for. The body is
the system's own parts: Row, Card, Toggle, Button.

## Rules

- The bottom sheet is a phone shape: full width, \`--radius-sheet\` (22px) on the top corners, at most 82% tall.
- The side sheet is at most 420px and takes the right edge, with the left corners rounded.
- Star: the scrim is behind it, the sheet is \`--sheet-bg\`, and a scroll inside the sheet never scrolls the page.
- Escape closes; a click on the scrim closes; the grip drags.
- Never nest a sheet in a sheet.

## Values

| value | where |
| --- | --- |
| bottom sheet | full width, 10px 16px 20px, radius 22px top, max-height 82% |
| side sheet | max 420px, right edge, radius 22px left, scrolls inside |
| grip | 36x4px, radius 999px, \`--line\` |
| opening | \`--motion-slow\` (320ms) |

## Accessibility

\`role="dialog"\` with \`aria-modal="true"\`. Escape closes and focus returns to the trigger.`,
  Snackbar: `# Snackbar

What happened next, next to the thing it happened to.

## When

- A result the person needs to see but does not need to answer: added, archived, sent.
- A failure that has a next step ("Try again").
- A wait that is worth saying out loud ("Reading the invoice").

Never for something that needs a decision (that is a Dialog), never stacked, never more than one at a time.

## The parts

A dot in the tone, one line of text, and at most one action. \`tone\` is \`accent\`, \`ok\`, \`wait\` or \`error\`;
those are the only four, and they are the tokens the app already has.

## Rules

- One line. If it needs two, it is a card in the flow, not a snackbar.
- Only the error tone uses \`--error\`, and only when something really failed.
- It never covers the control that caused it.
- It leaves on its own after a few seconds unless it carries an action.

## Values

| value | where |
| --- | --- |
| surface | \`--sheet-bg\`, 1px \`--edge\`, radius 14px, \`--elev-2\` |
| padding | 11px 12px 11px 14px |
| dot | 8px in the tone |
| text | 13.5px \`--fg\`; action 13px \`--accent\` |

## Accessibility

\`role="status"\` and \`aria-live="polite"\`: it is read out without taking focus.`,
  Tooltip: `# Tooltip

The name of a thing that is only an icon, on hover and on focus.

## When

- An icon button with no visible label.
- A word in a sentence that needs one short explanation.

Never for information you cannot get any other way, and never for a sentence: two lines is the ceiling.

## The parts

\`label\` is the text. The child is what the tooltip belongs to. It opens after \`delay\` (320ms by default) so
that a passing pointer does not flash it.

## Rules

- It opens on hover and on keyboard focus, and closes on leave, blur and Escape.
- It never holds a link, a button or anything clickable.
- It never covers the thing it describes.
- On a touch screen it is not the only way to know what a control is: the control keeps a label too.

## Values

| value | where |
| --- | --- |
| surface | \`--sheet-bg\`, 1px \`--edge\`, radius 9px, \`--elev-2\` |
| text | 12.5px, max 22 characters wide |
| rise | 4px, \`--motion-fast\` |
| delay | 320ms |

## Accessibility

\`role="tooltip"\`, tied to the trigger with \`aria-describedby\` while it is open. Escape closes it.`,
  Badge: `# Badge

A count or a dot on the thing it belongs to.

One part is used everywhere a count is needed.

## When

- How many things are waiting: loops, mails, parcels.
- A dot when the count itself does not matter, only that there is something.

Never for a number that is the point of the screen: that is a Stat or a Widget, at size.

## The parts

\`children\` is the anchor: an icon button, a tab, a word. \`count\` shows the number, \`max\` caps it (99+),
\`dot\` shows a bare dot, and \`tone\` is \`accent\`, \`violet\` or \`error\`.

## Rules

- A count is capped at 99 with a plus. A bigger number says nothing.
- 0 shows nothing. A dot is for "there is something", not for "there is one".
- It sits on the top right of the anchor, with a 2px ring of \`--bg\` so it reads on any surface.
- Violet is for her own things (loops), red only for something that failed or needs attention now.

## Values

| value | where |
| --- | --- |
| size | 18px tall, radius 999px, min 18px wide |
| dot | 9px |
| text | 600 10.5px, dark ink on the fill |
| ink | \`--accent-ink\` on accent, white on violet |

## Accessibility

The number is announced with the anchor ("Loops, 3 new"). A dot alone carries no text and must not be the only
sign that something needs attention.`,
  Slider: `# Slider

One value on a line: how much, how far, how loud.

The topic's accent sits on the filled side.

## When

- A value that is a matter of degree, where the exact number matters less than the feel: distance, volume,
  brightness.
- Never where a precise number is needed (a Field), and never for a choice between named things (Segmented,
  Tabs or a Menu).

## The parts

\`label\` sits above left in the mono label style, the value above right in mono, the track below. \`unit\` and
\`format\` shape how the value reads.

## Rules

- The filled side takes the accent (or the topic's \`--k\` inside a Topic); the rest is \`--line\`.
- The knob is dark with an accent edge: it stays visible on glass, and it grows slightly on hover and gives
  way on press.
- The value is always visible while dragging: a slider without a number is a guess.
- Keyboard: left and right move one step, Home and End go to the ends.

## Values

| value | where |
| --- | --- |
| track | 6px tall, radius 999px, \`--line\` under \`--k\` |
| knob | 20px, \`--bg\` fill, 2px \`--k\` border |
| hover | scale 1.08; press 0.96 |
| label | \`--text-label\`; value 13px \`--mono\` |

## Accessibility

A real \`input[type=range]\`: it takes the keyboard, announces its label and value, and needs no ARIA of its own.`,
  TextArea: `# TextArea

The multi-line field: a note, a message, anything longer than a line.

Iris had one line (\`Field\`) and nothing longer.

## When

- Writing something to a person: a note to her, a reply, a description.
- Never for one word or one number: that is \`Field\`.

## The parts

\`label\` in the mono label style above the box, the box itself, and whatever counter or hint you put under it.
\`rows\` sets the starting height; \`maxLength\` holds the limit, which you then show.

## Rules

- It grows with its content (\`resize: vertical\`) and never scrolls inside a short box.
- The focus edge is the accent, the same as Field.
- A limit is shown as "n / max" in mono under the box, and the limit is enforced rather than warned about.
- It never submits on Enter: Enter is a new line, always.

## Values

| value | where |
| --- | --- |
| box | \`--glass\`, 1px \`--edge\`, \`--radius-field\` (12px), 11px 13px |
| focus | border \`--k\`, 3px accent glow |
| text | 15px/1.5 \`--font-text\` |
| minimum height | 84px |

## Accessibility

A real \`textarea\` with a \`label\` tied to it by id. No custom editing behaviour.`,
  Select: `# Select

One choice out of a few, in the shape of the fields around it.

Iris needed the small version that sits in a settings row.

## When

- Three to seven named options, all known ahead of time, where seeing them all at once is useful.
- Never for more than seven (a Menu or a search), and never for a free value (a Field).

## The parts

\`label\`, the box, and the options as plain strings or \`{ value, label }\` pairs.

## Rules

- It looks like \`Field\`: same height, same radius, same focus edge. A form with two shapes in it is wrong.
- The chevron is drawn by the system, never your own image.
- The chosen value is readable without opening it.
- The first option is never a fake placeholder like "Choose…" if a real default exists.

## Values

| value | where |
| --- | --- |
| box | \`--glass\`, 1px \`--edge\`, \`--radius-field\` (12px), 11px 34px 11px 13px |
| chevron | 12px, \`--dim\`, 12px from the right |
| focus | border \`--k\`, 3px accent glow |

## Accessibility

A real \`select\` element with a tied \`label\`: the operating system draws the list, the keyboard and the
screen reader behaviour come free.`,
  SearchField: `# SearchField

Finding something: a pill field that says what it is doing and clears itself.

Iris has the field, and the results panel under it is yours
to fill.

## When

- Looking for something in a list, a table or everything the person kept.
- In a sheet or a window; not on a screen that has one answer (there is nothing to search).

## The parts

The glass glyph, the input, a spinner while \`busy\`, a clear button when there is text, and \`children\` for the
results.

## Rules

- Results land directly under the field, on their own surface, and never move the page under the pointer.
- While she looks: the spinner in the field, and the previous results stay until new ones arrive.
- Nothing found says what can be searched, not just "no results".
- The clear button appears only when there is something to clear, and it puts focus back in the field.
- It is a search, not a filter: filtering a table's own rows is the table's job.

## Values

| value | where |
| --- | --- |
| field | 40px tall, radius 999px, \`--glass\`, 1px \`--edge\` |
| focus | border \`--k\`, 3px accent glow |
| results | \`--sheet-bg\`, 1px \`--edge\`, \`--radius-menu\` (14px), \`--elev-2\` |
| spinner | 15px, 0.7s |

## Accessibility

The input carries the placeholder as its \`aria-label\`; the spinner has \`role="status"\`; the clear button says
"Clear". Results are real buttons, reachable by Tab.`,
  Tabs: `# Tabs

A few angles on one thing, under its title, with the ink sliding to the active one.

Iris had \`Segmented\` (a control inside a card) and the TabsApp layout; this is the
small control for a screen's own sections.

## When

- Three to five sections of one subject, all equally important, switched without leaving the screen.
- Never for navigation between screens and never for more than five: the tab bar and the sidebar do that.

## The parts

\`items\` are the labels, \`active\` is the index, \`onSelect\` changes it. The ink is a 2px bar that slides and
stretches between the labels.

## Rules

- The ink is one accent, and it is the only thing that moves.
- The labels are sentence case and short: two words is already long.
- It never scrolls sideways on a phone: five short tabs or a Segmented instead.
- Arrow left and right move between tabs; Tab leaves the group.
- Segmented is for a filter inside a card; Tabs is for the sections of a screen. Pick by where it sits.

## Values

| value | where |
| --- | --- |
| tab | 10px 14px 12px, 13.5px, \`--dim\`; active \`--fg\` |
| underline | 1px \`--line\`; ink 2px \`--k\` |
| move | \`--motion-base\` (200ms), width and position |

## Accessibility

\`role="tablist"\` with \`role="tab"\` and \`aria-selected\`; only the active tab is in the tab order.`,
  Steps: `# Steps

Where you are in a short flow, and what is still coming.

The app's flows needed a plain one.

## When

- Three to five steps that end: setting up a house, connecting a device, a booking.
- Never for more than five, and never as a progress bar for something long (that is \`Progress\`).

## The parts

A dot per step — a number, or a check when it is done — the label next to it, and a hairline between them that
fills as you go.

## Rules

- Done is filled with the accent and a dark check; now has an accent edge and a glow; coming is glass and quiet.
- The labels are the same words the screens use: "Voice", not "Step 2".
- A step never changes meaning while you look at it.
- It is not a control: the screens move it, the person does not click it.

## Values

| value | where |
| --- | --- |
| dot | 24px circle; done \`--k\` fill, now accent edge with a 3px glow |
| label | 13px \`--dim\`; done and now \`--fg\` |
| line | 1px \`--line\`, \`--k\` when the step is behind you |

## Accessibility

An ordered list with \`aria-current="step"\` on the current one, so a screen reader hears "step 3 of 4".`,
  EmptyState: `# EmptyState

Nothing here yet, said properly.

## When

- A list, a search or a page that has nothing in it yet, or after a search found nothing.
- Never for a failure (that is an error line) and never for a wait (that is a \`Skeleton\`).

## The parts

An icon in the topic's accent, a title in one short sentence, a line that says what this place is for, and at
most one action.

## Rules

- The line explains the place, not the absence: "A loop is one thing that comes back", not "No data".
- One action at most, and it is the thing that fills this place.
- It sits inside a glass card: the same surface as the content it stands in for.
- It never has a picture and never a joke.

## Values

| value | where |
| --- | --- |
| surface | \`--glass\`, 1px \`--edge\`, \`--radius-card\` (18px), 22px 18px |
| icon | 34px circle, 1px \`--edge\`, accent glyph |
| title | 500 15px \`--fg\`; line 13px \`--dim\`, max 36 characters wide |

## Accessibility

The icon is \`aria-hidden\`; the title and line are plain text, so the screen reader reads a sentence, not a
picture.`,
  Divider: `# Divider

A hairline that groups what is above it from what is below.

Iris uses it far less: space does most of the grouping.

## When

- Between two groups of rows where space alone is not enough, or where a group needs a name.
- Never between two cards (the 12px gap already says they are separate) and never as decoration.

## The parts

\`label\` puts a name in the middle of the hairline, \`inset\` starts it after the 44px of a row's icon column so
it lines up with the text above and below.

## Rules

- One hairline, \`--line\`, never dashed and never the accent.
- A label is 10.5px mono, caps, tracked, \`--faint\` — the same as a section label.
- Full width inside the card it sits in; inset only under a row with an icon.
- It never replaces the 12px page gap.

## Values

| value | where |
| --- | --- |
| line | 1px \`--line\`, 12px margin above and below |
| inset | 44px from the left |
| label | \`--text-label\`, 10px between the rule and the words |

## Accessibility

A separator (\`hr\`) is announced as a boundary between groups; a labelled divider's words are ordinary text.`,

  Toolbar: `# Toolbar

A bar of actions that belong together.

Iris had actions scattered over rows and buttons; this is the bar for the ones that belong to one thing.

## When

- Two to five actions on the same object: a week, a note, a device.
- Floating when the bar belongs to what is under it and the page scrolls away underneath.

Never for navigation (that is the tab bar or the sidebar), never for more than five actions, and never as the only way to reach something.

## The parts

\`items\` are the actions: \`label\`, an optional \`icon\`, \`active\`, \`danger\`, \`disabled\` and
\`onSelect\`. \`title\` is a small mono label at the front, \`trailing\` is what sits at the end (a count, a
switch).

## Rules

- The label is always there, even when there is an icon: an icon-only toolbar is a guessing game.
- One action may be active, and it keeps the accent edge. Danger sits last.
- It scrolls itself sideways rather than wrapping, on a phone.
- Arrow left and right move between the actions; Tab leaves the bar.
- The floating variant is the only thing in this system that carries \`--elev-2\` besides overlays: it floats.

## Values

| value | where |
| --- | --- |
| bar | radius 999px, padding 6px, gap 6px |
| docked | \`--glass\` fill, 1px \`--edge\`, no shadow |
| floating | \`--sheet-bg\`, \`--elev-2\` |
| action | 32px tall, radius 999px, 13.5px; active \`--state-selected\` with an accent edge |

## Accessibility

\`role="toolbar"\` with the title as its \`aria-label\`. Active actions are \`aria-pressed\`. Disabled actions keep their label so the reason can be read out beside them.`,

  DatePicker: `# DatePicker

A month you pick a day in.

Iris had none: the agenda came from what she read. This is the calendar part.

## When

- A date the person chooses: a reminder, a deadline, a booking.
- In a dialog or a sheet when it interrupts, inline when it is the whole question.

Never for a date the person should not change (show it as text), and never for a range: a range is two pickers, and that pattern is not written yet.

## The parts

A head with the month and the two arrows, the weekday row, the day grid, and a foot with Today and what is chosen. \`min\` and \`max\` grey out what is out of reach.

## Rules

- Weeks start on Monday and are named in two letters, mono, uppercase.
- The chosen day is the accent with dark ink; today keeps a hairline ring, not a colour.
- An unreachable day is disabled (38% opacity) and still readable: never removed from the grid.
- The month steps with the arrows; the day cells are real buttons, so the keyboard and the screen reader come free.
- Today is one tap away, at the bottom left. She never has to hunt for it.

## Values

| value | where |
| --- | --- |
| card | 306px, \`--glass\`, 1px \`--edge\`, \`--radius-card\` (18px), 14px padding |
| day cell | 34px tall, radius 10px, 13.5px; chosen fills with \`--k\` and \`--accent-ink\` |
| weekday row | 9.5px mono, uppercase, tracking .1em, \`--label\` |
| nav | 30px circle, 1px \`--edge\` |

## Accessibility

A \`grid\` of \`gridcell\` buttons, each labelled with its full date ("6 October 2026"). The chosen day is \`aria-selected\`, today is \`aria-current="date"\`, and the month change is announced by the head's text.`,

  TimePicker: `# TimePicker

A time you set with two strips: the hour, then the minute.

Iris takes the keyboard-friendly middle: two scrolling strips of chips, and the time reads big in mono.

## When

- A time the person chooses: a reminder, a booking, an alarm.
- Where the exact minute matters less than the hour, keep a larger \`step\` (5, 10, 15).

Never for a duration (that is a Slider or a Field) and never for two times in one part.

## The parts

The chosen time (34px mono, tabular figures), an hour strip of 24 chips, a minute strip of the steps, and a foot with Now and the step.

## Rules

- The chosen time is always visible while choosing: a time picker without the number is a guess.
- The active chip takes the accent with dark ink; the rest are quiet.
- Now is one tap away and rounds to the step.
- Two strips, never one long list of 1440 minutes.

## Values

| value | where |
| --- | --- |
| card | 306px, \`--glass\`, 1px \`--edge\`, \`--radius-card\` (18px), 14px padding |
| time | 34px \`--font-mono\`, tabular-nums, \`--fg\` |
| chip | 30px tall, min 40px wide, radius 999px, 13px mono |
| strip label | 9.5px mono, uppercase, \`--label\` |

## Accessibility

\`role="group"\` with a label; each chip is a real button with \`aria-pressed\`, and the chosen time sits in an
\`aria-live="polite"\` element so the change is read out.`,

  AppBar: `# AppBar

The top line of a screen or a window: what this is, and the few actions that belong to it.

Iris keeps two shapes: small, and large with the title at size.

## When

- At the top of a screen or a window she opens, above everything else.
- Large when the title is the point of the screen; small when the content is.

Never two bars on one screen, never a bar inside a card, and never a bar with more than three actions (the rest belongs in an overflow Menu).

## The parts

\`leading\` (a back or close button), the title, \`actions\` on the right, and \`children\` for what sits under
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
| bar | padding 8px 12px 10px, \`rgba(7,9,12,.82)\` with a 14px blur, 1px \`--line\` under it |
| small title | 15px/1.3, \`--fg\` |
| large title | 26px/1.15 \`--font-display\`, -0.01em tracking |
| sub | 12px \`--dim\` |

## Accessibility

A \`header\` landmark. Actions are real buttons with labels; a leading button says where it goes ("Back"), never just showing an arrow.`,
  NavRail: `# NavRail

The wide-window version of the tab bar: a rail of sections that collapses to icons.

A rail on wide windows, the tab bar on a phone.

## When

- Three to seven sections on a window wide enough for two columns.
- Where the person comes back to the same places; the rail keeps them all visible.

Never on a phone (the tab bar does that), never for more than seven, and never as the only way to reach a screen the person needs.

## The parts

\`items\` (a label, an icon, and which one is current), \`collapsed\`, \`onToggle\`, and \`trailing\` for what
sits at the bottom.

## Rules

- The current section is the accent edge plus a tint, never a filled block: the rail is quiet.
- Collapsed keeps the icons and drops the words; the width animates (200ms), it does not jump.
- The toggle says what it does: "Collapse", with the arrows pointing the way it will go.
- A phone never shows this part; a wide window never shows the tab bar beside it.
- Icons come from the system; a rail of emoji is not a rail.

## Values

| value | where |
| --- | --- |
| rail | 208px wide, 72px collapsed, \`--glass\`, 1px \`--edge\`, \`--radius-card\` (18px) |
| item | min-height 40px, radius 12px, 13.5px \`--dim\`; current \`--state-selected\` with a 2px accent edge |
| icon | 22px box, 16px glyph |
| width change | \`--motion-base\` (200ms), \`--ease-house\` |

## Accessibility

A \`nav\` landmark with a label. The current item is \`aria-current="page"\`; collapsing keeps each item's
accessible name (the label moves into \`aria-label\`), and the toggle carries \`aria-expanded\`.`,
  SplitButton: `# SplitButton

One action, and the caret that opens the others that belong to it.

Iris pairs its own Button with its own Menu, and this part is that pair in one piece.

## When

- One action the person usually wants, and two or three alternatives beside it: send it, or send it another way.
- Two to five alternatives. More than that is a Menu on its own.

Never for navigation, and never where the alternatives do the same thing as the main action in different words.

## The parts

The main action (a house Button: primary, accent or glass), and the caret, which opens the Menu to the left of
its trigger.

## Rules

- The caret is a second target, not part of the button: the two never share a click.
- The main action keeps the label and never becomes an icon-only button.
- The caret has its own accessible name ("More actions"), so a screen reader hears two controls, not one.
- The menu closes on a choice, on Escape and on a click outside, like every other menu.

## Values

| value | where |
| --- | --- |
| pair | 6px apart, both the house Button's own height |
| caret | min-width 40px, radius 999px, \`--glass\` with 1px \`--edge\` |
| menu | \`--sheet-bg\`, \`--radius-menu\` (14px), \`--elev-2\` |

## Accessibility

Two focusable controls in order: the action, then the caret with \`aria-haspopup="menu"\` behaviour from Menu itself.`,
  Mark: `# Mark

Her ring as a still, sharp mark. It is the brand kit's own render (1024px, with its glow), served in three
sizes, so it stays crisp at any size and on any screen.

## When

- A logo: the top of a sign-in, a lock screen, the PIN pad, an empty page, a mail.
- Anywhere the ring stands still and means "this is Iris".

For her state (listening, thinking, talking, away) take the \`Orb\` or the \`TalkOrb\`: those move and change
with her. Never put a Mark and an Orb on one screen.

## Size

\`size\` is the ring. The glow reaches past it on every side, as light does: leave about a ring's width of room.
`,
  Carousel: `# Carousel

A strip of cards you swipe or scroll sideways, with dots that say where you are.

Iris keeps the contained shape: one card per view, snapped.

## When

- Three to seven cards of the same kind, where swiping is faster than a list: today's loops, this week.
- On a phone, and in a window where one card per view is still readable.

Never for more than about seven items (a list is better), never for a card that must be compared with the next one, and never two carousels on one screen.

## The parts

The track (scroll-snap), the slides, the dots, and optional arrows for a pointer.

## Rules

- One card per view, snapping, never a half card to hint at more: the dots say there is more.
- The dots follow the scroll and move the scroll: a dot is 7px, the current one grows to 22px in the accent.
- Swiping is the phone's way and the arrows are the pointer's way; both work, neither is the only one.
- It never auto-plays. The person moves it.
- The slides are the system's own Cards; a carousel does not invent a new surface.

## Values

| value | where |
| --- | --- |
| track | horizontal scroll, scroll-snap mandatory, \`gap\` 12px by default |
| slide | 100% of the track, snap to the start |
| dots | 7px, radius 999px; current 22px in \`--k\` (or \`--accent\`) |
| arrows | 30px circle, 1px \`--edge\` |

## Accessibility

\`role="group"\` with a label; each dot is a button labelled with its slide number and the current one is
\`aria-current\`. The track scrolls with the keyboard and with a trackpad, so nothing depends on the swipe.`,
  Photo: `# Photo

A photo with a depth map: a grey image of the same size, white near and black far. From the Photos lab.

## Kinds

- \`back\`: the photo, then the word, then only the near part on top again, so the word stands behind the person.
- \`duotone\`: the photo's light mapped from the topic's ground (\`--kd\`) to its accent (\`--k\`); without a topic,
  \`--bg\` to \`--accent\`.
- \`parallax\`: four depth layers that move with the pointer, or gently with the scroll (\`motion="scroll"\`).

## Where the photo comes from

No photo ships with the system. Without \`src\` the part paints its own neutral scene (sky, sun, two ridges and a
figure) in the tokens, with a depth map that matches it. With a \`src\` and no \`depth\` the depth is guessed: lower
and central is nearer. A real depth map (Depth Pro) is far better. The pixels are read back, so a photo from
another origin must allow it (CORS); one that does not leaves the frame empty.

## Rules

- The word behind a person stays at least 65% visible and whole inside the photo: the part searches the height,
  and failing that a smaller size, for about 25% hidden. \`threshold\` (0.05 to 0.9) is where the near part starts.
- Parallax moves at most 6% of the width, softly (\`--motion-slow\`); with reduced motion it stands still.
- Never a real user's photo in a demo. Never a photo hero and a \`Word\` together. Never the text fully hidden.

## Not here

The lab also has filters (trip flat, retro dither, colour shift, halftone, glow, a blurred background, light on
the person), tilt on a phone, and the photo pulled apart in 3D layers. They are left out of the part.

## Accessibility

\`role="img"\` named by \`alt\`; with \`kind="back"\` the word is added to the name.`,
  BorderPattern: `# BorderPattern

A pattern that runs along a rounded edge, one for each moment. From the border lab, where it ran along the rim of
the phone.

| pattern | when |
| --- | --- |
| \`comet\` | refreshing: two comets run down both sides and meet |
| \`breathe\` | listening: the whole rim breathes |
| \`orbit\` | thinking: one light goes round with a tail |
| \`sparks\` | working on a loop: sparks drift and flicker |
| \`wave\` | she speaks: a wave of thickness travels round |
| \`stream\` | a question waits on you: three colours stream round |
| \`heartbeat\` | a new loop or a notification: two beats, then rest |
| \`zip\` | saving or sending: the rim zips closed and open |

## Rules

- One pattern at a time, and only while the moment lasts.
- Violet (\`--violet\`), the accent and the "you" pink (\`--phase-you\`) only: the rim belongs to the ring's family.
- The radius is the box's own (\`--radius-card\`), or \`radius\` for a phone-shaped frame.
- With reduced motion the pattern is drawn once, still.

## Accessibility

The canvas is hidden from assistive tech. \`label\` says the moment in words, in a status region.`,
  ChatStack: `# ChatStack

Every chat with its loops as a card in its topic's colour, lying in a stack with depth. From the chat-stack sketch.

\`CircleStack\` is the plain, compact cousin for the strip. This one carries the topic colours and opens a chat.

## States

- At rest: the top card whole, the next two peek out above it, smaller, dimmer and softer; a count says how
  many more. The one that waits on you is on top.
- Fanned: a tap spreads the cards upward (\`--motion-slow\`, \`--ease-house\`). Escape folds them back.
- Open: a tap on a card opens that chat on its own sheet: its message, its loops with their phase, its actions
  (the house \`Button\`, in the topic) and Back. The other chats are two edges behind it.

## The parts

A \`ChatCircle\` has \`id\`, \`title\`, \`line\`, and optionally \`topic\`, \`eyebrow\`, \`loops\` (a \`LoopBubble\` each, with a
\`line\` in the open chat), \`message\` and \`actions\`. \`fanned\` and \`current\` say where it starts.

## Accessibility

Cards are buttons; at rest only the top one can be reached, named with how many more there are. The open chat is
a region named by its title.`,
};
