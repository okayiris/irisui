// Per-component guidance: the core controls and surfaces. Every number here is read from
// public/ds/bundle.css, public/ds/tokens.css or the component's own README; nothing is guessed.

import type { Override } from "../content";

export const OVERRIDES_CORE: Record<string, Override> = {
  button: {
    when: "A single action or decision; the browser build of the app's pill button.",
    parts: [
      { name: "primary", what: "The light filled button of the one decision on a screen." },
      { name: "glass", what: "Frosted secondary action next to a primary." },
      { name: "accent", what: "Ice-blue pill for a quiet invitation such as Continue here." },
      { name: "ghost", what: "Dim text button for a way out, such as Don't agree." },
      { name: "danger", what: "Red text for a destructive action." },
      { name: "text", what: "Link-like action in the accent, underline on hover." },
      { name: "icon", what: "Square icon button; give it label as the accessible name." },
      { name: "busy", what: "Spinner state, aria-busy, not clickable." },
    ],
    rules: [
      {
        do: "Use one primary per screen; everything else is glass, text or ghost.",
        dont: "Two filled primary buttons side by side.",
      },
      {
        do: "Give an icon button a label, and wrap an icon plus text with gap 8px.",
        dont: "An icon-only button with no label: a screen reader hears nothing.",
      },
      {
        do: "Use busy for work in progress and disable only with a visible reason.",
        dont: "A disabled button with no reason, or opacity instead of the disabled state.",
      },
      {
        do: "In a topic let primary take the topic accent with dark ink.",
        dont: "A gradient or neon button, or a primary with light ink on a light fill.",
      },
    ],
    specs: [
      { label: "md", value: "height 44px, padding 0 20px" },
      { label: "lg", value: "height 56px, padding 0 24px, font 17px, radius 20px, full width" },
      { label: "sm", value: "height 28px, padding 0 12px, font 13px" },
      { label: "Radius", value: "--radius-pill 999px" },
      { label: "Label", value: "600 15px var(--font), gap 8px to the icon" },
      { label: "Icon button", value: "width 44px, padding 0; sm width 28px" },
      { label: "primary", value: "fill #e9f1f5, ink #0b0f13" },
      { label: "accent", value: "fill rgba(125,211,252,.28), border rgba(125,211,252,.55)" },
      { label: "Focus", value: "2px var(--accent) outline, 2px offset" },
      { label: "Disabled", value: "opacity .35, cursor default" },
      { label: "Busy", value: "aria-busy true; primary fill mixed 70% with #0e1218" },
      { label: "In a topic", value: "primary at oklch .82 / .12 with dark ink" },
    ],
    a11y: [
      "Every button carries its own visible label; icon only buttons need label as the name.",
      "Focus shows a 2px accent outline at 2px offset; never remove it.",
      "A screen reader hears the label, then busy or disabled; a disabled button needs a reason in the row above it.",
    ],
    related: ["buttongroup", "toggle", "card"],
  },

  buttongroup: {
    when: "The button set of one screen in its topic: primary flat, secondary glass, the quieter kinds beside them.",
    parts: [
      { name: "primary", what: "Button variant primary: the topic accent flat with dark ink." },
      { name: "secondary", what: "Button variant glass: 8% accent over the glass fill, 16% on hover." },
      { name: "text", what: "Button variant text: the accent, underline on hover." },
      { name: "danger", what: "Button variant danger: error text only." },
      { name: "icon", what: "Button variant icon with icon and label." },
      { name: "busy", what: "Button busy: spinner and aria-busy, not clickable." },
      { name: "disabled", what: "Button disabled: the off fill and off ink, exempt from contrast." },
      { name: "switch", what: "A Toggle beside the buttons, violet when on." },
    ],
    rules: [
      {
        do: "One primary per screen; give the set a topic so every button takes that accent.",
        dont: "A second accent in the same set, or a gradient primary.",
      },
      {
        do: "Use stack for full-width stacked buttons at the end of a decision.",
        dont: "Three filled buttons in one row.",
      },
      {
        do: "Keep the tie between a button and its result visible, with busy while it runs.",
        dont: "A disabled button with no reason on screen.",
      },
    ],
    specs: [
      { label: "Gap", value: "10px between buttons, wrapped" },
      { label: "stack", value: "column, align stretch, full width" },
      { label: "primary", value: "topic accent at oklch .82 / .12, ink var(--bg)" },
      { label: "secondary", value: "8% accent over the glass fill, 1px hairline, 16% on hover" },
      { label: "Contrast", value: "primary 10.5:1 or more for every topic" },
      { label: "Focus", value: "2px accent ring, 2px offset" },
    ],
    a11y: [
      "Put the set in a group so the buttons read as one decision, not loose actions.",
      "The icon button's label is its accessible name; a Toggle in the set announces its own on or off state.",
      "Disabled is announced as disabled; the reason belongs in the text above the set.",
    ],
    related: ["button", "toggle", "chip"],
  },

  card: {
    when: "Every group of content on the near-black page: one panel, one surface, no second style.",
    parts: [
      { name: "children", what: "The content; a 17px title and a 12px dim line is the house pattern." },
      { name: "padding", what: "Prop that overrides the 14px inner padding, for example 18 on a stat card." },
      { name: "className", what: "Extra class on the glass element." },
      { name: "style", what: "Inline style on the glass element." },
    ],
    rules: [
      {
        do: "Keep the glass fill and the 1px edge stroke; stack cards with 12px between them.",
        dont: "A solid panel, a white or light card, or a drop shadow.",
      },
      {
        do: "Use --glass and --edge, and --pad-card for the padding.",
        dont: "A raw hex or a grey that is not a token.",
      },
      {
        do: "Leave the page margin at 16px and let the card fill the column.",
        dont: "Nest a card inside a card to get a second frame.",
      },
    ],
    specs: [
      { label: "Fill", value: "--glass rgba(180,225,255,.07)" },
      { label: "Stroke", value: "1px --edge rgba(190,230,255,.14)" },
      { label: "Radius", value: "--radius-card 18px" },
      { label: "Padding", value: "--pad-card 14px" },
      { label: "Between cards", value: "--gap 12px" },
      { label: "Page margin", value: "--gutter 16px" },
    ],
    a11y: [
      "The card is a plain container, so give its content real headings instead of relying on the frame.",
      "Text on the glass is --fg or --dim, both of which read on --bg.",
    ],
    related: ["row", "stat", "skeleton"],
  },

  row: {
    when: "One line of a settings page: icon, title, the dim line under it, and a control on the right.",
    parts: [
      { name: "icon", what: "24px icon at 80% --fg in a 24px box, flex none." },
      { name: "title", what: "17px --fg title." },
      { name: "subtitle", what: "12px --dim line under the title." },
      { name: "trailing", what: "What sits on the right: a Toggle, a menu value, a chevron or an external arrow." },
      { name: "chevron", what: "Faint chevron for a row that opens something." },
      { name: "external", what: "Extern arrow for a row that leaves the app." },
      { name: "danger", what: "Error colour for a destructive row, for example Delete account." },
    ],
    rules: [
      {
        do: "Use one trailing control per row, and use chevron or external but not both.",
        dont: "A row that is both a toggle and a link away.",
      },
      {
        do: "Keep the subtitle to one short line and let it end the sentence.",
        dont: "A paragraph under the title, or a subtitle that repeats the title.",
      },
      {
        do: "Use danger only for something destructive, with the consequence in the subtitle.",
        dont: "Danger colour on a row that only navigates.",
      },
    ],
    specs: [
      { label: "Icon", value: "24px box, colour rgba(232,242,247,.8)" },
      { label: "Icon to text", value: "gap 10px" },
      { label: "Title", value: "17px --fg" },
      { label: "Subtitle", value: "12px --dim" },
      { label: "Text block", value: "gap 3px" },
      { label: "Between rows", value: "12px" },
      { label: "Danger", value: "colour var(--error) #f87171" },
    ],
    a11y: [
      "A tappable row is a button or a link, so the whole row is reachable and not only the chevron.",
      "The title is the accessible name; the subtitle stays part of it.",
      "A Toggle as trailing keeps its own label from the row title.",
    ],
    related: ["card", "toggle", "buttongroup"],
  },

  toggle: {
    when: "A setting that is on or off and takes effect at once.",
    parts: [
      { name: "on", what: "Prop for the state; violet when on, grey glass when off." },
      { name: "onChange", what: "Called with the new boolean when the switch is pressed." },
    ],
    rules: [
      {
        do: "Let the switch act immediately and let the row title name the setting.",
        dont: "A toggle that only takes effect after a save button.",
      },
      {
        do: "Use violet for on, the only place violet appears besides the ring.",
        dont: "An ice-blue or green toggle, or a second accent for on.",
      },
      {
        do: "Wait for the change to land before flipping the state when the switch is slow, or show busy.",
        dont: "Flip the switch on a request that has not answered.",
      },
    ],
    specs: [
      { label: "Size", value: "51 x 31px" },
      { label: "Knob", value: "27px, inset 2px, white" },
      { label: "Travel", value: "translateX 20px when on" },
      { label: "Off fill", value: "rgba(120,130,145,.45)" },
      { label: "On fill", value: "var(--violet) #8b5cf6" },
      { label: "Radius", value: "--radius-pill 999px" },
      { label: "Transition", value: "background .2s, knob transform .2s" },
    ],
    a11y: [
      "The switch needs a label, normally the Row title beside it.",
      "A screen reader hears switch, then on or off, after the label.",
      "Do not use colour alone: the knob position carries the state too.",
    ],
    related: ["row", "buttongroup", "segmented"],
  },

  chip: {
    when: "One choice among a few in a topic: a shop, a day, a filter.",
    parts: [
      { name: "on", what: "Fills the chip with --k and switches the ink to --kd." },
      { name: "onClick", what: "Turns the chip into the chosen one of the row." },
      { name: "topic", what: "The topic colour for --k and --kd; wins over a surrounding Topic." },
      { name: "children", what: "One or two words." },
    ],
    rules: [
      {
        do: "Use a row of chips for one choice among a few; wrap them with 6px between.",
        dont: "More than five chips in a row: use a Segmented or a list.",
      },
      {
        do: "Let one chip be on, in the topic accent with dark ink.",
        dont: "Two on chips in a row of one choice, or chip text in white on the accent fill.",
      },
      {
        do: "Keep the label to one or two words in sentence case.",
        dont: "A sentence in a chip, or a chip as a plain action instead of a choice.",
      },
    ],
    specs: [
      { label: "Height", value: "30px, padding 0 12px, gap 6px" },
      { label: "Radius", value: "--radius-pill 999px" },
      { label: "Label", value: "500 13px var(--font)" },
      { label: "Off", value: "14% --k fill, 45% --k edge, --k text" },
      { label: "On", value: "--k fill, --kd ink (fallback #07171f)" },
      { label: "Focus", value: "2px var(--k, var(--accent)) outline, 2px offset" },
      { label: "Transition", value: "background .15s" },
    ],
    a11y: [
      "A row of chips is a set of pressed buttons; expose the chosen one as pressed.",
      "The whole chip is the target, 30px tall, and the label is its name.",
      "Colour alone does not carry the choice; the filled state must be visible.",
    ],
    related: ["segmented", "field", "checklist"],
  },

  field: {
    when: "One line of input inside a card: a search box, an add line, a short answer.",
    parts: [
      { name: "topic", what: "Sets --k for the caret and the focus edge." },
      { name: "placeholder", what: "What to type, sentence case, no full stop." },
      { name: "value / onChange", what: "The usual controlled input pair." },
    ],
    rules: [
      {
        do: "Let the placeholder say what to type, in one short sentence case phrase.",
        dont: "A placeholder that stands in for a label, or ends in a full stop.",
      },
      {
        do: "Keep the caret and the focus edge in the topic colour.",
        dont: "Remove the focus edge, or make the field a light or white box.",
      },
      {
        do: "Use one field per line of input and let it fill the column.",
        dont: "A textarea look for a single line, or two fields in one row on a phone.",
      },
    ],
    specs: [
      { label: "Height", value: "44px, padding 0 16px" },
      { label: "Radius", value: "--radius-pill 999px" },
      { label: "Fill", value: "--glass, 1px --edge border" },
      { label: "Text", value: "15px var(--font), --fg" },
      { label: "Placeholder", value: "var(--faint) #5a6b78" },
      { label: "Caret", value: "var(--k, var(--accent))" },
      { label: "Focus", value: "border 45% --k, ring 3px 14% --k" },
    ],
    a11y: [
      "A placeholder is not a label; give the field a real label or a labelled heading above it.",
      "The focus state shows on the border and the ring, so keyboard users see where they are.",
      "44px tall, which is the comfortable touch height.",
    ],
    related: ["chip", "card", "segmented"],
  },

  segmented: {
    when: "Two to four views of one thing, inside a card.",
    parts: [
      { name: "items", what: "Two to four short words; the tabs." },
      { name: "active", what: "Index of the shown view." },
      { name: "onSelect", what: "Called with the index of the picked tab." },
      { name: "topic", what: "The topic colour for the tint of the active tab." },
    ],
    rules: [
      {
        do: "Use Segmented for views of one thing, and Chip for filters.",
        dont: "Five or more tabs, or a Segmented used to filter a set.",
      },
      {
        do: "Keep the labels to one or two words and pick the active one in 14% of the topic colour.",
        dont: "A filled active tab in the accent with light text, or two active tabs.",
      },
      {
        do: "Give the track a glass fill and an edge so it reads as one control.",
        dont: "An underlined tab strip or a second accent for the active tab.",
      },
    ],
    specs: [
      { label: "Track", value: "padding 3px, gap 2px, --glass fill, 1px --edge, --radius-pill" },
      { label: "Tab", value: "padding 6px 14px, --radius-pill" },
      { label: "Label", value: "500 13px var(--font), --dim when off" },
      { label: "Active", value: "14% --k fill, --k text" },
      { label: "Focus", value: "2px var(--k, var(--accent)) outline, 2px offset" },
    ],
    a11y: [
      "Expose the tabs as a tab list, or as pressed buttons, and keep the order of the views.",
      "The active tab is named to a screen reader as the selected one, not only tinted.",
      "Keyboard: the active tab is reachable, and focus is visible on the tab itself.",
    ],
    related: ["chip", "field", "buttongroup"],
  },

  checklist: {
    when: "A short list of things to do, ticked in the topic colour or ordered by time.",
    parts: [
      { name: "items", what: "Strings, or [time, text] pairs when the list is timed." },
      { name: "done", what: "A count or the indexes of the finished rows." },
      { name: "max", what: "How many rows show; the rest fold into one line." },
      { name: "onToggle", what: "Makes the rows tickable." },
      { name: "topic", what: "The topic colour of the tick circles and the times." },
    ],
    rules: [
      {
        do: "Use strike-through only here, in a tick list, on done rows.",
        dont: "Strike-through on a value, a title or a finished row in any other part.",
      },
      {
        do: "Keep times in the mono value style with a 42px column, or drop the ticks for a timed list.",
        dont: "Times and tick circles in the same list, or a time that moves as you tick.",
      },
      {
        do: "Fold finished rows into one line such as 3 checked when the list is long.",
        dont: "Let a done row keep full height in a small card.",
      },
    ],
    specs: [
      { label: "List", value: "grid, gap 7px, font 14px var(--font), --fg" },
      { label: "Row", value: "flex, gap 8px, align center" },
      { label: "Tick circle", value: "15px, 2px solid #4a5361" },
      { label: "Done tick", value: "--k fill with a dark check, #07090c stroke" },
      { label: "Done text", value: "--dim with strike-through" },
      { label: "Time", value: "600 12px var(--font-mono), --k, column 42px" },
    ],
    a11y: [
      "A tickable row is a button with its state exposed, so a screen reader hears checked or not.",
      "The whole row is the target, not just the 15px circle.",
      "The time is read before the text in a timed list, matching the order on screen.",
    ],
    related: ["chip", "progress", "stat"],
  },

  progress: {
    when: "How far something is: a thin bar by default, or a ring with a value in the middle.",
    parts: [
      { name: "value", what: "0 to 1 of the bar or the ring." },
      { name: "ring", what: "Switches to the ring; give it size in px." },
      { name: "centre", what: "The value in the middle of the ring, short: 3, 55%." },
      { name: "caption", what: "One short word under the centre, such as to go." },
      { name: "topic", what: "The topic colour of the fill." },
    ],
    rules: [
      {
        do: "Let the ring mean progress and nothing else; a ring is never decoration.",
        dont: "A ring around an icon, or a ring that only looks like progress.",
      },
      {
        do: "Show the answer in the middle of the ring: a count, a share, the state.",
        dont: "A ring with an empty middle and no caption.",
      },
      {
        do: "Use the bar for a share of a whole and keep it in the topic colour.",
        dont: "A bar in a second accent, or a gradient fill.",
      },
    ],
    specs: [
      { label: "Bar", value: "height 8px, radius 4px" },
      { label: "Bar track", value: "18% --k mixed with #0b0f0d" },
      { label: "Bar fill", value: "--k, transition .4s cubic-bezier(.2,.9,.25,1)" },
      { label: "Ring sizes", value: "used at 90px and 76px in the preview" },
      { label: "Ring centre", value: "700 40px var(--font-mono), --fg" },
      { label: "Ring caption", value: "11px --dim, 2px above" },
      { label: "Value", value: "0 to 1" },
    ],
    a11y: [
      "Expose the bar or ring as a progressbar with a value now, min 0 and max 1.",
      "The centre text is the answer; a screen reader should hear value and caption together.",
      "Colour is not the only signal: the length of the bar or the ring arc carries it too.",
    ],
    related: ["checklist", "stat", "widget"],
  },

  stat: {
    when: "One number and one word, at the top of a card or a window.",
    parts: [
      { name: "value", what: "The number, short: a count, a time, an amount." },
      { name: "label", what: "One or two words under it." },
      { name: "topic", what: "The topic colour of the number." },
    ],
    rules: [
      {
        do: "Keep the value short and let the number be the answer.",
        dont: "A sentence in the value, or a number used as decoration.",
      },
      {
        do: "Place two or three stats side by side at most.",
        dont: "A row of five tiles, or a stat inside another stat.",
      },
      {
        do: "Let the label name what the number is, in one or two words.",
        dont: "A label that repeats the number, or a full stop after it.",
      },
    ],
    specs: [
      { label: "Tile", value: "--glass fill, 1px --edge, radius 14px" },
      { label: "Padding", value: "12px 14px" },
      { label: "Value", value: "700 28px var(--font-mono), --k, letter-spacing -.02em" },
      { label: "Label", value: "12px --dim" },
      { label: "Side by side", value: "2 or 3 at most" },
    ],
    a11y: [
      "Read the value and the label as one: 5 to get, 14:00 next.",
      "Do not rely on the mono digits for meaning; the label carries the unit.",
      "The tile is not a control, so it takes no focus and no press state.",
    ],
    related: ["card", "progress", "checklist"],
  },

  skeleton: {
    when: "Anything loads from the house: blocks with a sheen in the shape of what is coming.",
    parts: [
      { name: "height", what: "Height in px of one block." },
      { name: "width", what: "Width in px or a CSS string of one block." },
      { name: "screen", what: "A whole window: title line, big card, two rows, gap 12px." },
    ],
    rules: [
      {
        do: "Match the shape of the real content, so the page does not jump when it lands.",
        dont: "A spinner or a line of text on an empty black screen.",
      },
      {
        do: "Use the glass sheen and the 18px card radius for every block.",
        dont: "A solid grey block, a light block, or a raw hex for the sheen.",
      },
      {
        do: "Show the skeleton for the whole window with screen when a window is loading.",
        dont: "A skeleton that stays after the content has arrived.",
      },
    ],
    specs: [
      { label: "Radius", value: "--radius-card 18px" },
      { label: "Sheen", value: "linear-gradient 100deg, rgba(255,255,255,.05) 30%, .13 50%, .05 70%, 300% 100%" },
      { label: "Animation", value: "iris-shine 1.4s ease-in-out infinite" },
      { label: "screen", value: "column, gap 12px: title line, big card, two rows" },
      { label: "Reduced motion", value: "animation none" },
    ],
    a11y: [
      "Mark the loading region busy and hide the placeholder blocks from a screen reader.",
      "Announce when the content has arrived, rather than the blocks themselves.",
      "Under prefers-reduced-motion the sheen stops and the blocks stay still.",
    ],
    related: ["card", "progress", "row"],
  },
};
