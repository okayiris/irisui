// The second three foundations: motion, state, spacing.
// Every value below is read from public/ds/tokens.css, src/ds/ext.css or public/ds/bundle.css.
// Where a number is not in the system, it is said so in a warn note rather than invented.

import type { Doc } from "../content";

export const FOUNDATIONS_B: Record<string, Doc> = {
  motion: {
    id: "motion",
    label: "Motion",
    lede: "Two durations the parts already used, three the system now names, one house curve, and her ring.",
    sections: [
      {
        title: "What moves",
        blocks: [
          {
            kind: "p",
            text: "Motion in Iris answers a hand or explains a change. Nothing moves to look busy.",
          },
          {
            kind: "ul",
            items: [
              "A control answers: hover changes the fill, press shrinks the part to 0.985.",
              "A surface arrives: a menu drops 4px, a dialog rises 10px, a sheet comes up from the bottom or in from the side.",
              "A value changes: the tab ink slides, a bar grows, a pen draws itself in.",
              "Her ring turns, always. It is the one thing that moves with no input at all.",
            ],
          },
          {
            kind: "p",
            text: "Each of those is one transition on a named property. The shared answer, `.ix-hit`, changes background, border colour, transform, colour and opacity together, all at `--motion-fast` with the house curve.",
          },
          {
            kind: "code",
            lang: "css",
            text: ".ix-hit {\n  transition: background var(--motion-fast) var(--ease-house),\n    border-color var(--motion-fast) var(--ease-house),\n    transform var(--motion-fast) var(--ease-house),\n    color var(--motion-fast) var(--ease-house),\n    opacity var(--motion-fast) var(--ease-house);\n}",
          },
        ],
      },
      {
        title: "What never moves",
        blocks: [
          {
            kind: "ul",
            items: [
              "The page background. It is `--bg` on every surface and never fades.",
              "Type. Text does not slide, bounce or fade in as a block.",
              "Layout. Hover and press never reflow a row or move a neighbour; the press shrinks the part in place.",
              "The header. It keeps the same height on every screen, so a screen never jumps when her sentence changes.",
              "Card fill at rest. Glass is `--glass` plus a 1px `--edge` stroke; it does not breathe.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text: "Add motion only where something changed. If the answer is the same, the screen is still.",
          },
        ],
      },
      {
        title: "Durations and the house curve",
        blocks: [
          {
            kind: "p",
            text: "The parts already carried two durations of their own: .2s on background and transform, and .15s on opacity and on chip fills. `ext.css` names them and adds a third value plus one curve.",
          },
          {
            kind: "code",
            lang: "css",
            text: "--motion-fast: 0.14s;\n--motion-base: 0.2s;\n--motion-slow: 0.32s;\n--ease-house: cubic-bezier(0.2, 0.9, 0.25, 1);",
          },
          {
            kind: "p",
            text: "The curve is quick off the line and long to settle, and it never overshoots. It is the same shape the app previews use, `cubic-bezier(.2,.9,.25,1)`.",
          },
          {
            kind: "table",
            head: ["Token", "Value", "Use"],
            rows: [
              ["`--motion-fast`", "0.14s", "An answer under the hand: hover, press, colour"],
              ["`--motion-base`", "0.2s", "A surface that arrives: menu, dialog, snackbar"],
              ["`--motion-slow`", "0.32s", "A full panel: the sheet from the bottom or the side"],
              ["`--ease-house`", "cubic-bezier(0.2, 0.9, 0.25, 1)", "Everything above, unless a part has its own"],
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text: "Three values do not cover every animation in the system. A pen draws in over 520ms scaled by length, the tab bar folds over .42s, the ring turns for as long as it likes. Those are the part's own clock, not a token.",
          },
        ],
      },
      {
        title: "The ring's own animation",
        blocks: [
          {
            kind: "p",
            text: "The orb is the exception to every rule on this page: it never stops. The gradient ring turns one full turn in 6s, linear, forever.",
          },
          {
            kind: "table",
            head: ["Her state", "A turn", "What else"],
            rows: [
              ["rest", "6s", "nothing else"],
              ["busy", "2s", "the same ring, faster"],
              ["talking", "3s", "the disc answers the voice"],
              ["thinking", "1.5s", "the core pulses .7s, alternate"],
              ["away", "stopped", "greyscale and 50% opacity"],
            ],
          },
          {
            kind: "p",
            text: "Two more clocks sit on the talk button and are not part of `--motion-*`: the thinking arc is a teal conic ring at .69s a turn, and the echo ring runs 1.35s, growing from 1 to 1.35 and fading out.",
          },
          {
            kind: "note",
            tone: "warn",
            text: "The ring does not follow `--motion-*`. Under `prefers-reduced-motion` the bundle switches the ring's animation off, so it never stops in normal use only, and never at all in reduced motion or in the `away` state.",
          },
        ],
      },
      {
        title: "Reduced motion is a hard rule",
        blocks: [
          {
            kind: "p",
            text: "`prefers-reduced-motion` is not a preference to negotiate. When it is set, the system changes what it does.",
          },
          {
            kind: "ul",
            items: [
              "The three durations become 0.001s, so a change lands without a journey.",
              "The press scale goes: `.ix-hit:active` returns `transform: none`.",
              "The ring, the skeleton, the spinner and the thinking arc all stop.",
              "A still screen shows the end state: the pen fully drawn, the ring at its value, the Word in its last pose.",
              "Her edge draws one still frame, a third into its round, and the glow over the letters is the one effect left, at 1.2s.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text: "Never ship a half-drawn mark. A screenshot, a thumbnail and a share image all show the end state of every animation.",
          },
        ],
      },
      {
        title: "Loading beats",
        blocks: [
          {
            kind: "ol",
            items: [
              "Under 200ms, show nothing. A skeleton that flashes reads as a fault, not as speed.",
              "Past that, show a `Skeleton` in the shape of what is coming: glass blocks with a sheen that runs 1.4s. Never an empty black screen.",
              "When there is real progress, show it: a `Progress` bar grows its width over .4s with the house curve, or a ring counts in the middle.",
              "A reload of her own screens is not a spinner. A 2px line runs under the safe area, 1s a loop, and her edge pattern runs on the phone instead.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text: "The 200ms threshold and the order above are not tokens. The system names Skeleton, Progress and two spinners, `.ix-spin` at 0.7s and `.iris-spin` at 0.8s a turn, and states no threshold value anywhere.",
          },
        ],
      },
      {
        title: "Why there are no springs",
        blocks: [
          {
            kind: "p",
            text: "Motion in Iris is a curve, not physics. There are no springs and no speed schemes: three durations and one curve carry the whole system.",
          },
          {
            kind: "ul",
            items: [
              "The house curve arrives and stops. It never passes its own control points, so nothing overshoots.",
              "Three duration values, and nothing in the UI above 0.32s.",
              "The interface stays near 0.2s. The long motion is the ring and one pen draw, and those run on the part's own clock rather than on a token.",
              "One exception: where a finger lets go (a swipe, a dragged sheet) a spring carries the hand's speed on, damped so it never bounces. See Interaction.",
            ],
          },
        ],
      },
    ],
  },

  state: {
    id: "state",
    label: "State",
    lede: "What a part does when a hand answers it, the layer values behind that answer, and the floor underneath.",
    sections: [
      {
        title: "The seven states",
        blocks: [
          {
            kind: "p",
            text: "A part is in one of seven states. Six change how it looks. One stops it looking like a part at all.",
          },
          {
            kind: "table",
            head: ["State", "What it means", "What changes"],
            rows: [
              ["hover", "A pointer is over it, nothing decided yet", "the fill, nothing else"],
              ["press", "The hand is down", "the fill and a shrink to 0.985"],
              ["focus-visible", "A keyboard is here", "the `--focus-ring`"],
              ["selected", "This one is the current one", "the accent layer, an icon that fills, one indicator"],
              ["disabled", "It cannot be used now", "38% opacity on the whole part"],
              ["busy", "It is working", "a spinner in the label, cursor progress"],
              ["error", "Something failed", "`--error` text, destructive only"],
            ],
          },
        ],
      },
      {
        title: "The layer values",
        blocks: [
          {
            kind: "p",
            text: "A state is a layer over the part, not a second colour. The layer is the accent or the ink at a fixed alpha.",
          },
          {
            kind: "table",
            head: ["Token", "Value", "Where it shows"],
            rows: [
              ["`--state-hover`", "rgba(180, 225, 255, 0.07)", "the hover of any glass part, `.ix-hit:hover`"],
              ["`--state-press`", "rgba(180, 225, 255, 0.12)", "the press fill"],
              ["`--state-selected`", "rgba(125, 211, 252, 0.12)", "the current item, in the accent"],
              ["`--state-disabled`", "0.38", "the alpha of a part that cannot be used"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text: "One layer at a time. A hovered, pressed, focus-visible part shows the press layer plus the ring, never two fills on top of each other.",
          },
        ],
      },
      {
        title: "Every control answers the hand",
        blocks: [
          {
            kind: "ul",
            items: [
              "A control that can be used answers hover and press. `.ix-hit` is the shared answer, on background, border colour, transform, colour and opacity, at `--motion-fast` with the house curve.",
              "The press is a shrink to 0.985, in place. A slider handle goes to 1.08 on hover and 0.96 on press; the talk button's disc and core go to 0.93.",
              "Text answers too. A tab goes from `--dim` to `--fg` on hover, a text button underlines with an offset of 4px.",
              "A part that cannot be used answers nothing. A disabled part inherits no state layer at all.",
            ],
          },
        ],
      },
      {
        title: "Focus is a ring",
        blocks: [
          {
            kind: "code",
            lang: "css",
            text: "--focus-ring: 0 0 0 2px var(--bg), 0 0 0 4px var(--accent);",
          },
          {
            kind: "p",
            text: "One ring, on the accent, with a 2px gap of `--bg` between the part and the ring. The gap is the point. A single accent outline sinks into a glass card; a ring with a background-coloured gap stays visible on glass, on a dark ground and inside a topic.",
          },
          {
            kind: "ul",
            items: [
              "Focus is `:focus-visible`, so a mouse click does not leave a ring behind.",
              "The ring is not a state layer and does not count as one in a table of layer values.",
              "Parts written before `ext.css` use `outline: 2px solid var(--accent); outline-offset: 2px`. Same idea, one ring, on the accent.",
              "The ring is never removed without a replacement. `outline: none` is allowed only where the box-shadow ring takes its place.",
            ],
          },
        ],
      },
      {
        title: "Disabled is 38% opacity",
        blocks: [
          {
            kind: "p",
            text: "Disabled is `--state-disabled`, 0.38 opacity. It is never a different hue. A grey-blue disabled pill teaches people that disabled is another kind of thing, so they stop trusting the colour of the parts around it.",
          },
          {
            kind: "ul",
            items: [
              "The part keeps its own fill and its own label colour, and the whole thing fades together.",
              "A disabled part cannot be focused, pressed, hovered or dragged, and it takes no pointer events.",
              "It keeps its place in the layout. Nothing reflows and nothing else moves when a part becomes unusable.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text: "One part breaks the rule. In a topic, `.iris-btn-off:disabled` keeps full opacity on its own ground, #151a21, with a #56606d label. Treat that as the exception, not as the pattern to copy.",
          },
        ],
      },
      {
        title: "Busy, selected and error",
        blocks: [
          {
            kind: "ul",
            items: [
              "Busy: a button keeps its label, adds a spinner, sets `cursor: progress`, and a primary fill mixes to 70% so the part reads as working instead of broken.",
              "Busy, her own screens: `effects.md` asks for a line or an edge instead of a spinner while her screens reload. A spinner belongs to a control that is working, not to a house reload.",
              "Selected: the accent layer at 12%, an icon that fills, one indicator in place, and text that stays `--fg`. Never a second accent on the same screen.",
              "Error: `--error` #f87171 is for destructive actions only. It is text, a dot and a danger menu item, never a fill that competes with the accent.",
            ],
          },
        ],
      },
      {
        title: "The floor for targets",
        blocks: [
          {
            kind: "p",
            text: "Iris names no target token. What the parts measure is the floor in practice.",
          },
          {
            kind: "table",
            head: ["Part", "Size", "Floor"],
            rows: [
              ["`.iris-btn-md`", "44px high, 20px side padding", "on the 44px pointer floor"],
              ["`.iris-btn-lg`", "56px high, 24px side padding", "above the floor"],
              ["`.iris-btn-sm` and an icon-only small button", "28px high, 28px wide", "below the floor, a desktop-only part"],
              ["`.iris-chip`", "30px high, 12px side padding", "below the floor"],
              ["`.iris-dot`", "a 7px dot in 8px by 4px of padding", "below the floor"],
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text: "The system has no 48px part and no target token in `tokens.css` or `ext.css`. A control that must meet 48x48 needs a padded hit area of its own; nothing in the system provides one.",
          },
        ],
      },
      {
        title: "The layer values, state by state",
        blocks: [
          {
            kind: "p",
            text: "One layer, over the container, at a fixed opacity per state.",
          },
          {
            kind: "table",
            head: ["State", "Iris"],
            rows: [
              ["hover", "7%, `--state-hover`"],
              ["focus", "a ring, not a layer"],
              ["press", "12%, `--state-press`"],
              ["drag", "not named in the system"],
              ["disabled", "no contrast requirement, no state layer; answered with 38% opacity"],
            ],
          },
          {
            kind: "ul",
            items: [
              "Hover is 7% and press is 12%: a press should feel like a decision, not like a second hover.",
              "The system drops the focus layer and pays for the ring instead, which is stricter: a layer on glass is easy to miss, a ring is not.",
            ],
          },
        ],
      },
    ],
  },

  spacing: {
    id: "spacing",
    label: "Spacing",
    lede: "Three tokens on a page, one rhythm inside a card, and every number the parts use.",
    sections: [
      {
        title: "The three tokens",
        blocks: [
          {
            kind: "p",
            text: "A page in Iris has three distances and no more: padding inside, gap between, and never a margin. There are no margins at all, only padding and gaps.",
          },
          {
            kind: "table",
            head: ["Token", "Value", "Where"],
            rows: [
              ["`--gutter`", "16px", "The page side margin, on every surface"],
              ["`--gap`", "12px", "Between cards on a page"],
              ["`--pad-card`", "14px", "The padding inside a card, on all four sides"],
            ],
          },
          {
            kind: "code",
            lang: "css",
            text: ".card {\n  padding: var(--pad-card);\n}\n.page {\n  padding: 0 var(--gutter);\n  display: grid;\n  gap: var(--gap);\n}",
          },
        ],
      },
      {
        title: "The rhythm inside a card",
        blocks: [
          {
            kind: "p",
            text: "Inside a card the rhythm climbs 4, 8, 12, 16, 20, 24. Each step has one job, and a part that needs a distance in between uses the value the parts around it already use.",
          },
          {
            kind: "table",
            head: ["Step", "Where it is used"],
            rows: [
              ["4", "The vertical padding of a panel over a widget, `padding: 4px 10px`"],
              ["8", "The gap in a widget head, a slider, a dialog's actions, and the top of a panel"],
              ["12", "Between cards, around a divider, and the padding inside a stat"],
              ["16", "The page gutter and the padding of a widget"],
              ["20", "The padding of a dialog and the side padding of a medium button"],
              ["24", "The side padding of a large button, and the minimum outside padding of a toolbar"],
            ],
          },
          {
            kind: "p",
            text: "Three values sit outside that climb and are just as real: 6px between the blocks of a widget and the lines of a row, 10px between the parts of a menu item, a button group and a widget row, and 14px for the card padding and the sides of a stat.",
          },
          {
            kind: "note",
            tone: "rule",
            text: "One distance per job. If two parts in one card need air, that air is a gap, not a margin on one of them.",
          },
        ],
      },
      {
        title: "The page rhythm",
        blocks: [
          {
            kind: "p",
            text: "A page is 16px from the sides, cards are 12px apart, and every card is 14px from its own edge to its content. Those three numbers are the whole grid.",
          },
          {
            kind: "ol",
            items: [
              "The gutter is 16px, everywhere, on the phone and in a window she opens.",
              "The gap between two cards is 12px. A card never touches another card.",
              "The padding inside a card is 14px. A card with its own header keeps the header at 14px and starts the content below it.",
              "A widget is the exception on the phone: its padding is 16px, because it is a smaller surface with a larger frame.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text: "The three numbers are the app. A website and a mail each have their own rhythm, and each says so in its own chapter. `website.md` puts 136px between sections and 96px between columns against dense rows with 12px gaps.",
          },
        ],
      },
      {
        title: "Divider or space",
        blocks: [
          {
            kind: "p",
            text: "Iris groups with space almost everywhere, and with a line when the line is the structure.",
          },
          {
            kind: "ul",
            items: [
              "Use space when the parts belong to one thought. A title, a value and a line under it are one thing, so nothing divides them.",
              "Use a divider when two meanings share one card, or when a list's lines are the structure and the eye needs them.",
              "The divider is 1px `--line`, with 12px above and below. `data-inset` pushes it 44px in, so it starts at the text and not at the icon.",
              "Never a divider between two cards. `--gap` does that job, and a line there would read as a third thing.",
            ],
          },
        ],
      },
      {
        title: "Density and compact rows",
        blocks: [
          {
            kind: "p",
            text: "The app is dense on purpose. A settings row carries a 17px title and a 12px line under it and still keeps a comfortable height, because the row answers the hand and a target that is too short is a target people miss.",
          },
          {
            kind: "ul",
            items: [
              "Inside a widget a row is 6px of vertical padding with a 10px gap and one 1px `--line` between rows, never a blank line.",
              "In an app she builds, the view has 1.1rem of padding and its parts sit 1.3rem apart, looser than a widget, tighter than a website.",
              "Density is a property of the surface, not a setting. The app is compact and the website has air.",
            ],
          },
        ],
      },
      {
        title: "Values on one page",
        blocks: [
          {
            kind: "table",
            head: ["Where", "Value", "Source"],
            rows: [
              ["Page side margin", "16px", "`--gutter`"],
              ["Between cards", "12px", "`--gap`"],
              ["Inside a card", "14px", "`--pad-card`"],
              ["Inside a widget", "16px", "bundle: `.iris-widget { padding: 16px }`"],
              ["Between the blocks of a widget", "6px", "bundle: `.iris-widget { gap: 6px }`"],
              ["Between the lines of a row", "10px", "bundle: `.iris-rows li { gap: 10px }`"],
              ["Between the parts of a menu item", "10px", "ext: `.ix-menu-item { gap: 10px }`"],
              ["Around a divider", "12px", "ext: `.ix-divider { margin: 12px 0 }`"],
              ["A dialog", "20px", "ext: `.ix-dialog { padding: 20px }`"],
              ["A medium button, side padding", "20px", "bundle: `.iris-btn-md { padding: 0 20px }`"],
              ["A large button, side padding", "24px", "bundle: `.iris-btn-lg { padding: 0 24px }`"],
            ],
          },
        ],
      },
      {
        title: "The numbers behind the rhythm",
        blocks: [
          {
            kind: "p",
            text: "Every distance below is one the parts actually use, read out of the bundle and ext.css.",
          },
          {
            kind: "table",
            head: ["Value", "Where it shows"],
            rows: [
              ["8px", "the gap in a head, a slider and a panel top"],
              ["16px", "the gutter and the padding of a widget"],
              ["24px", "the side padding of a large button"],
              ["4px, 6px, 10px", "panel padding, widget gap, menu and row gap"],
              ["12px, 14px", "between cards and inside a card, the two most used numbers"],
              ["6px, 10px, 14px", "ordinary values here, not exceptions"],
            ],
          },
          {
            kind: "ul",
            items: [
              "12px and 14px carry the most pages in the system.",
              "The values ship as CSS variables, so a part and its page read one source.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text: "Iris has no named step between 16px and 20px, no 2px spacing in use anywhere, and no token for a target size. Where a layout needs one of those, it writes the value, and that value is not part of the system yet.",
          },
        ],
      },
    ],
  },
};
