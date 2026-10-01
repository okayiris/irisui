// The first four foundation pages: colour, type, shape and elevation.
// Every value here is read from public/ds/tokens.css, public/ds/tokens.json, src/content/README.md,
// src/content/screens.md, src/content/web-app.md, src/content/apps.md and the additions' stylesheet.

import type { Doc } from "../content";

export const FOUNDATIONS_A: Record<string, Doc> = {
  colour: {
    id: "colour",
    label: "Colour",
    lede:
      "Iris is a calm ground, near-black or soft near-white as the system is, frosted glass and one ice-blue accent. Colour carries meaning here, it is never decoration.",
    sections: [
      {
        title: "The palette",
        blocks: [
          {
            kind: "p",
            text:
              "Fourteen tokens hold every colour on every surface, each with a dark and a light value. A value that is not on this table is not a colour in this system. Read the token by name, never type a hex.",
          },
          {
            kind: "table",
            head: ["Token", "Dark", "Light", "What it is for"],
            rows: [
              ["--bg", "#07090c", "#f4f7f9", "Page background of every surface. Never grey, never white."],
              ["--fg", "#e8f2f7", "#0d1a22", "Titles and primary text on --bg."],
              ["--dim", "#8fa3b0", "#4a5c68", "The line under a title, secondary text."],
              ["--faint", "#5a6b78", "#8696a1", "Chevrons, section labels, version line. Not for body text."],
              ["--line", "#1b2430", "#dde4ea", "Dividers."],
              ["--accent", "#7dd3fc", "#0369a1", "Ice blue: what is active, a tab, a link, an action pill."],
              ["--accent-ink", "#07171f", "#ffffff", "Text on an accent fill."],
              ["--violet", "#8b5cf6", "#6d28d9", "Only for on (toggles) and the ring."],
              ["--violet-light", "#a78bfa", "#7c3aed", "Hover and edges of violet things."],
              ["--error", "#f87171", "#b91c1c", "Destructive only, such as Delete account."],
              ["--ok", "#4ade80", "#15803d", "Done."],
              ["--wait", "#fde68a", "#a16207", "Waiting."],
              ["--glass", "rgba(180, 225, 255, .07)", "rgba(255, 255, 255, .78)", "Fill of every card."],
              ["--edge", "rgba(190, 230, 255, .14)", "rgba(16, 48, 72, .13)", "The 1px stroke of every card."],
            ],
          },
          {
            kind: "swatches",
            tokens: [
              "--bg",
              "--fg",
              "--dim",
              "--faint",
              "--line",
              "--accent",
              "--accent-ink",
              "--violet",
              "--violet-light",
              "--error",
              "--ok",
              "--wait",
              "--glass",
              "--edge",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Iris is light or dark as the system is; data-mode=\"light\" or \"dark\" on <html> overrides it. The page background is --bg: #07090c in dark, the soft near-white #f4f7f9 in light. It is never grey and never pure white.",
          },
        ],
      },
      {
        title: "Fifteen topics, one accent per screen",
        blocks: [
          {
            kind: "p",
            text:
              "A screen she builds for someone carries one subject, and the subject brings an accent of its own. Fifteen topics exist. Each has three tokens.",
          },
          {
            kind: "ul",
            items: [
              "--topic-<name> is the accent and the pen colour, and is --k in code. It colours the widget label, the ring, the anchor, the pen mark and the page dot. It may be text.",
              "--topic-<name>-2 is the second tint, --k2 for pattern shapes and the far end of a duotone. Decoration only, never text on its own.",
              "--topic-<name>-ground is the dark ground, --kd: a widget fill, a pattern ground, a Word ground. --fg, --dim and the accent read on it.",
            ],
          },
          {
            kind: "table",
            head: ["Topic", "Accent --topic-*", "Second tint", "Ground", "Light: accent, tint, ground"],
            rows: [
              ["groceries", "#4ade80", "#38bdf8", "#04241f", "#15803d #0369a1 #eef9f2"],
              ["agenda", "#7dd3fc", "#e8f2f7", "#08183a", "#0369a1 #334155 #eaf4fa"],
              ["mail", "#94a3b8", "#cbd5e1", "#121821", "#475569 #556274 #f3f5f8"],
              ["parcel", "#fbbf24", "#fde68a", "#221a0e", "#a14a07 #92600a #fdf6ea"],
              ["weather", "#38bdf8", "#e8f2f7", "#081a34", "#075985 #334155 #e9f2f9"],
              ["tasks", "#2dd4bf", "#99f6e4", "#05211f", "#0f766e #115e59 #e8f7f5"],
              ["sport", "#fb923c", "#fdba74", "#26140a", "#b93c0b #9a3412 #fdf1ea"],
              ["money", "#a7f3d0", "#4ade80", "#062016", "#047857 #166534 #ecf8f2"],
              ["travel", "#2ee6d6", "#7dd3fc", "#052331", "#0e7490 #0369a1 #ebf7f9"],
              ["health", "#2ee6d6", "#7dd3fc", "#052331", "#0e7490 #0369a1 #ebf7f9"],
              ["home", "#fde68a", "#fbbf24", "#1f1a0e", "#8a5a1c #8a5a0a #faf4ea"],
              ["music", "#c4b5fd", "#8b5cf6", "#161433", "#6d28d9 #7c3aed #f3effc"],
              ["loop", "#7dd3fc", "#4ade80", "#08183a", "#0369a1 #166534 #eaf4fa"],
              ["explain", "#ede98a", "#fef9c3", "#1c1b08", "#65651a #4d4d12 #f8f7e4"],
              ["party", "#fdab9f", "#fed7cf", "#2a1210", "#a83d62 #9d3a5c #fdf0f4"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "One accent per topic. A widget, its chips, bars, ring, ticks, fields and its primary button all take that one colour. The page itself stays ice. Never two topics on one screen.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "health and travel share their values down to every token. Never put both on one screen, because nothing would tell them apart.",
          },
          {
            kind: "note",
            tone: "llm",
            text:
              "Set --k to the topic accent and --kd to its ground. Do not sample a colour out of a photo, do not mix two topics, and do not invent a tint that is not in the topic's three tokens.",
          },
        ],
      },
      {
        title: "The loop phases",
        blocks: [
          {
            kind: "p",
            text:
              "A loop runs through six phases, and a PhaseRing shows them. Phase colour is fixed: it says where in the loop the person is, not what the loop is about.",
          },
          {
            kind: "table",
            head: ["Phase token", "Dark", "Light", "When"],
            rows: [
              ["phase-recognised", "#a78bfa", "#6d28d9", "The loop has seen the thing."],
              ["phase-planned", "#7dd3fc", "#0369a1", "It is on the plan."],
              ["phase-busy", "#2ee6d6", "#0f766e", "Work is running."],
              ["phase-you", "#f0abfc", "#a21caf", "The turn is with the person."],
              ["phase-check", "#fbbf24", "#b45309", "It is being checked."],
              ["phase-done", "#4ade80", "#15803d", "It is finished."],
            ],
          },
          {
            kind: "p",
            text:
              "Three more tokens hold the ring itself: --phase-track #1e2a3a and --phase-rest #2a323d for the inactive parts, and --phase-grain #e0f2fe for the grain inside a segment.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Phase colours are fixed and do not follow the topic. A finished phase stays full in its own colour, the current one runs as an hourglass, and done lights the whole ring.",
          },
        ],
      },
      {
        title: "What may never be a colour",
        blocks: [
          {
            kind: "ul",
            items: [
              "A grey page. Every page is --bg.",
              "A fixed dark or light value where a token exists. The page follows the mode; a part that keeps its dark colours on a light page is an island.",
              "A brand gradient used as a UI accent: not a button fill, not a header, not a bar.",
              "A second accent next to ice blue on one surface.",
              "Red for anything that is not destructive.",
              "Violet outside two places: a toggle that is on, and the ring.",
              "Colour as decoration. In an app colour carries state: a lamp that is on is a warm fill, energy made is green, a battery under 20% is amber, a late invoice is red. What is off or neutral stays glass.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The ring's conic gradient (violet, sky, magenta, from --orb-gradient) belongs to the orb and the talk button. Never the fill of a button, a header or a chart.",
          },
        ],
      },
      {
        title: "Contrast floors",
        blocks: [
          {
            kind: "p",
            text:
              "Two floors hold everywhere, on every surface, in every theme, and the house adds one more for a topic accent. They do not move for a prettier colour. The two floors are WCAG's: 4.5:1 for text (1.4.3) and 3:1 for large text and graphics (1.4.11).",
          },
          {
            kind: "table",
            head: ["Pair", "Floor", "Where it applies"],
            rows: [
              ["Body and small text on its background", "4.5:1", "--fg, --dim and every topic accent as text"],
              ["Large text and graphics", "3:1", "Icons, strokes, the ring, a chart line"],
              ["A topic accent on its own ground, and on the page background", "6:1", "in dark every one of the fifteen accents clears it: the closest sits at 6.48:1 on its ground. In light they hold 4.5:1 (the closest, groceries, 4.65:1 on the page), short of 6:1: still open"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Body text is 4.5:1 or better. Large text and graphics are 3:1 or better. A graphic that carries meaning is a graphic, not decoration, and the 3:1 floor applies. The house asks more of a topic accent: 6:1 on its own ground and on the page, because an accent carries a whole subject.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "--faint is #5a6b78 in dark (3.5:1 on --bg) and #8696a1 in light (2.8:1). It is not for body text, not for a value the person must read, and never for a label that explains what the person is looking at.",
          },
          {
            kind: "p",
            text:
              "One part lifts itself: a Word lightens its letters until they hold 4.5:1 on their ground, so a deep theme stop never sinks into the background. On a light page the drawing is turned over (lightness inverted, hue kept), so the same letters read dark.",
          },
        ],
      },
      {
        title: "What Iris does instead",
        blocks: [
          {
            kind: "p",
            text:
              "Iris does not generate colour from a source, does not build tonal palettes on tones 0 to 100, and maps no tones onto roles. It does none of that, on purpose.",
          },
          {
            kind: "ul",
            items: [
              "Fifteen fixed topics, hand-picked. No dynamic colour from a wallpaper or a photo",
              "No palette. One value per token",
              "Fourteen base tokens plus 15 topics",
              "Three numbers, checked by hand on every pair",
              "Two modes, light and dark, one value of each token per mode, following the system",
            ],
          },
          {
            kind: "note",
            tone: "llm",
            text:
              "There are no colour roles here. Do not map primary, surface, container or on-primary onto Iris, and do not generate a tonal palette. Pick a token by name, or say that the colour does not exist yet.",
          },
        ],
      },
    ],
  },

  type: {
    id: "type",
    label: "Type",
    lede:
      "Quiet type. The system font, eight named sizes, mono for labels and values. Nothing shouts, and nothing is invented.",
    sections: [
      {
        title: "The eight sizes",
        blocks: [
          {
            kind: "p",
            text:
              "Eight --text-* tokens hold every size in the product. Each one is a full shorthand: weight, size, line height and family. Use the token, not the parts.",
          },
          {
            kind: "table",
            head: ["Token", "Size / line height", "Weight", "Use"],
            rows: [
              ["--text-hero", "34px / 40px", "700", "Big headline on a hero or a post. Display family."],
              ["--text-page-title", "28px / 34px", "700", "Page title in the app. Display family."],
              ["--text-row-title", "17px / 22px", "400", "Card and row titles."],
              ["--text-body", "15px / 20px", "400", "Running text."],
              ["--text-sub", "12px / 16px", "400", "The dim line under a title."],
              ["--text-tab", "13px / 16px", "400", "Tab bar labels."],
              ["--text-label", "10.5px / 14px", "500", "Section labels, caps, faint. Mono, 0.14em tracking."],
              ["--text-value", "12px / 16px", "400", "Times, counters. Mono."],
            ],
          },
          {
            kind: "specimen",
            token: "--text-hero",
            label: "Hero",
            sample: "The assistant that actually does it",
          },
          { kind: "specimen", token: "--text-page-title", label: "Page title", sample: "Loops" },
          { kind: "specimen", token: "--text-row-title", label: "Row title", sample: "On the road" },
          {
            kind: "specimen",
            token: "--text-body",
            label: "Body",
            sample: "The assistant listens and talks through this iPhone.",
          },
          { kind: "specimen", token: "--text-sub", label: "Sub", sample: "Blocks, voice, notifications" },
          { kind: "specimen", token: "--text-label", label: "Label", sample: "SETTINGS" },
          { kind: "specimen", token: "--text-value", label: "Value", sample: "09:12" },
          {
            kind: "note",
            tone: "rule",
            text:
              "Never invent a size. If a size is not one of the eight, the answer is not a ninth size: it is one of these eight, or the content is too long.",
          },
        ],
      },
      {
        title: "Three stacks and where the faces come from",
        blocks: [
          {
            kind: "p",
            text:
              "The type is the system stack. There is one stack for running text, one for the large styles and one for labels and values, and every one of them ends in the generic fallbacks, so a page with nothing else still reads in the right shape.",
          },
          {
            kind: "table",
            head: ["Stack", "Token", "What it is"],
            rows: [
              ["text", "--font-text", "Inter first, then the platform's own text face, then system-ui and the generic fallbacks. Running text and row titles."],
              ["display", "--font-display", "Inter first, then the platform's own display face, then the same fallbacks. The hero and a page title."],
              ["mono", "--font-mono", "The platform's mono face, then the generic mono fallbacks. Labels and values."],
            ],
          },
          {
            kind: "p",
            text:
              "No font file ships for any of the three. Inter stands first in the text and display stacks, so it is used only on a machine that already has Inter installed; everywhere else the platform's own face is used. The one face the system ships is the handwritten one the Anchor draws with.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Display from 20px up. Text below 20px. A 28px title is --font-display, a 17px row title is --font-text.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "No other webfont joins the system. A page does not pull a face from a font host, and a new face is a change to the release, not a line in a page. The system stack is the whole licence.",
          },
        ],
      },
      {
        title: "When mono is used",
        blocks: [
          {
            kind: "p",
            text:
              "Mono carries labels and values, and nothing else. If the reader has to compare or count it, mono. If the reader has to read a sentence, it is text.",
          },
          {
            kind: "ul",
            items: [
              "A section label: 10.5px, weight 500, 0.14em tracking, in caps, in --faint. The one place caps are allowed.",
              "A value: a time, a counter, in 12px. Tabular figures, so columns line up.",
              "A widget label: 11px, weight 600, 0.14em tracking, in the topic colour.",
              "A widget value: 52px, weight 700, letter-spacing -0.02em, 46px in the small and tall widget.",
              "A webpage micro label: 11px mono, weight 500, 0.1em tracking, which is the web app's own value, not the app's.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text: "Mono never carries a sentence. If a paragraph is in mono, the paragraph is in the wrong font.",
          },
        ],
      },
      {
        title: "Sentence case, and quiet",
        blocks: [
          {
            kind: "ul",
            items: [
              "Sentence case everywhere. The only caps are a mono section label and a widget label.",
              "No exclamation marks, anywhere, in any language.",
              "No emoji, in a title, a label, a body or a mail.",
              "No em dashes. Use a period and a new sentence.",
              "The product is Iris. She is she, and she has a name of her own per house.",
              "Short sentences. One thought each.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Sentence case is the house voice, not a style preference. A title in Title Case reads as an announcement, and this is not one.",
          },
        ],
      },
      {
        title: "Two sizes the tokens carry outside --text-*",
        blocks: [
          {
            kind: "p",
            text:
              "tokens.json names two more type groups that have no --text-* token of their own, because they belong to one part rather than to running UI.",
          },
          {
            kind: "table",
            head: ["Style", "Size / line height", "Weight", "Use"],
            rows: [
              ["hand anchor", "20.8px / 20.8px", "700", "The one handwritten Anchor per screen. Caveat, Bradley Hand on Apple devices."],
              ["widget-value", "52px / 52px", "700", "The big number of a wide or large widget, 46px in small and tall."],
              ["widget-label", "11px / 14px", "600", "A widget label, caps, in the topic colour."],
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The hand anchor is a size, not a licence. Exactly one Anchor per screen, in the topic pen colour, at -3 degrees, opacity .9, within 24px of its subject and at least 8px clear of any line.",
          },
        ],
      },
    ],
  },

  shape: {
    id: "shape",
    label: "Shape",
    lede:
      "One shape holds the whole product: a frosted glass card, radius 18, with a 1px light on its edge. Pills for everything you press.",
    sections: [
      {
        title: "Radius tokens",
        blocks: [
          {
            kind: "p",
            text:
              "Six radii are tokens in tokens.css. Three more live in the additions' stylesheet, ext.css. Together they cover every corner in the system.",
          },
          {
            kind: "table",
            head: ["Token", "Value", "What takes it"],
            rows: [
              ["--radius-card", "18px", "Every card, row and sheet."],
              ["--radius-button", "20px", "Large full-width buttons."],
              ["--radius-pill", "999px", "Pills, tabs, small buttons, toggles."],
              ["--radius-widget", "26px", "Every widget."],
              ["--radius-panel", "14px", "The frosted list panel inside a glass or pattern widget."],
              ["--radius-bleed", "28px", "Bottom corners of the one widget per three screens that breaks to the edge."],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "radius-card is the default. Reach for another radius only when this table names it. A card, a row and a list panel are not the same shape, so they do not share a radius.",
          },
        ],
      },
      {
        title: "The glass card recipe",
        blocks: [
          {
            kind: "p",
            text:
              "Every surface in Iris is one card. The recipe does not vary by screen size or mode: in light, --glass is white and --edge is ink, the recipe stays the same.",
          },
          {
            kind: "code",
            lang: "css",
            text:
              ".card {\n  background: var(--glass);        /* rgba(180, 225, 255, .07) */\n  border: 1px solid var(--edge);   /* rgba(190, 230, 255, .14) */\n  border-radius: var(--radius-card); /* 18px */\n  padding: var(--pad-card);        /* 14px */\n}\n\n.page {\n  padding: 0 var(--gutter);        /* 16px side margin */\n  display: flex;\n  flex-direction: column;\n  gap: var(--gap);                 /* 12px between cards */\n}",
          },
          {
            kind: "ul",
            items: [
              "Fill: --glass, seven percent of a pale blue over the near-black page.",
              "Stroke: 1px --edge, fourteen percent. This is the only light on a card.",
              "Radius: 18. Padding: 14. Between cards: 12. Page margin: 16.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Every card is glass. No solid panels, no matte fills, no card with its own background colour, and no rounded corner that is not a token.",
          },
        ],
      },
      {
        title: "Pills",
        blocks: [
          {
            kind: "p",
            text:
              "Anything small that you press is a pill: a tab, a small button, a chip, a toggle. The toggle keeps its own shape (51 by 31) and is still fully rounded.",
          },
          {
            kind: "ul",
            items: [
              "Pills, tabs, small buttons and toggles: 999px, so the end is a half circle whatever the height.",
              "A large full-width button: 20px. It is a decision bar, not a pill.",
              "A status pill and the action pill (Continue here): 999px, glass or accent.",
            ],
          },
          {
            kind: "note",
            tone: "llm",
            text:
              "A primary button is either a pill or a 20px bar, never a square, never a 12px rounded rectangle. The secondary button next to it is glass, with the hairline inset 0 0 0 1px rgba(255,255,255,.08) and no fill of its own.",
          },
        ],
      },
      {
        title: "The ring",
        blocks: [
          {
            kind: "p",
            text:
              "Three different rings carry meaning in Iris, and they are not interchangeable.",
          },
          {
            kind: "table",
            head: ["Ring", "Shape", "Where"],
            rows: [
              ["Her orb", "A full circle filled with --orb-gradient, a conic of violet, sky and magenta", "The logo, the status pill, the talk button"],
              ["The focus ring", "0 0 0 2px var(--bg), 0 0 0 4px var(--accent)", "Keyboard focus on any control, with a page-coloured gap so it reads on glass"],
              ["A ring control", "A 20px circle, --bg fill, 2px border in --k, with --elev-1 on it", "A slider thumb or a selected mark in a topic"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Violet is for on and the ring. A focus ring is never violet: it is --accent, because focus is active, not on.",
          },
        ],
      },
      {
        title: "Sheets, dialogs and menus",
        blocks: [
          {
            kind: "p",
            text:
              "tokens.css names one radius for a card, a row and a sheet. ext.css, which adds the parts the system was missing, names three more for the surfaces that sit on top of the page.",
          },
          {
            kind: "table",
            head: ["Token", "Value", "What takes it"],
            rows: [
              ["--radius-sheet", "22px", "The top two corners of a bottom sheet, never the bottom two"],
              ["--radius-menu", "14px", "A menu, a select list, a search results box"],
              ["--radius-field", "12px", "A text field or an input inside a form"],
              ["--radius-card", "18px", "A dialog, which keeps the card radius rather than taking one of its own"],
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "tokens.css says 18px covers every card, row and sheet; ext.css gives a sheet 22px on its top corners and a menu 14px. Where a chapter disagrees with tokens.css, tokens.css wins. The values ext.css adds are additions waiting to move into the token file, so never invent a fourth answer.",
          },
        ],
      },
    ],
  },

  elevation: {
    id: "elevation",
    label: "Elevation",
    lede:
      "Iris has no shadows on cards. Light on the edge does the work, and a shadow appears only over the page.",
    sections: [
      {
        title: "No shadows on cards",
        blocks: [
          {
            kind: "p",
            text:
              "A card in Iris is flat by design. It is a pane of frosted glass lying on a near-black page, and the only thing that separates it from the page is a 1px edge. There is no lift and no drop shadow.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "A card, a row, a list panel and a widget have no box-shadow. If a card reads as flat, the fix is the edge and the fill, never a shadow.",
          },
        ],
      },
      {
        title: "What replaces a shadow",
        blocks: [
          {
            kind: "p",
            text:
              "Four things do the work a shadow does elsewhere. They are subtle on purpose: on the dark page a black shadow would show nothing, and on the light page --elev-2 adds only a soft ink shadow.",
          },
          {
            kind: "table",
            head: ["Answer", "Value", "What it separates"],
            rows: [
              ["Edge light", "1px --edge, rgba(190, 230, 255, .14)", "A card from the page, a field from a card"],
              ["Glass fill", "--glass, rgba(180, 225, 255, .07)", "A raised surface from the page under it"],
              ["A state fill", "--state-hover .07, --state-press .12, --state-selected rgba(125, 211, 252, .12)", "This control, right now, from its neighbours"],
              ["A scrim", "--scrim rgba(4, 6, 9, .62); on the web, rgba(7, 9, 12, .82) with blur(18px)", "What is behind an overlay from what is on top"],
            ],
          },
          {
            kind: "note",
            tone: "llm",
            text:
              "Hover is a fill, not a lift. Press is a fill and scale(0.985), not a shadow. The hairline inset 0 0 0 1px rgba(255,255,255,.08) belongs to a secondary glass button only. Never add a drop shadow to make a card pop.",
          },
        ],
      },
      {
        title: "The two elevation tokens",
        blocks: [
          {
            kind: "p",
            text:
              "ext.css adds two shadow steps above the page, and both keep the edge as part of the value. There is no third.",
          },
          {
            kind: "table",
            head: ["Token", "Value", "Where it is allowed"],
            rows: [
              [
                "--elev-1",
                "inset 0 0 0 1px var(--edge), 0 1px 0 rgba(190, 230, 255, 0.06)",
                "A small object that sits on a surface: a slider thumb or a selected ring control",
              ],
              [
                "--elev-2",
                "inset 0 0 0 1px var(--edge), 0 10px 34px rgba(0, 0, 0, 0.55)",
                "Anything that floats over the page: a tooltip, a menu, a dialog, a sheet, a snackbar, a search results box",
              ],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Both tokens carry the 1px --edge stroke inset in the shadow, so a floating surface still has its edge light. Never use a bare black shadow without the edge.",
          },
        ],
      },
      {
        title: "Overlays only",
        blocks: [
          {
            kind: "p",
            text:
              "Everything at --elev-2 is an overlay: it sits on the scrim, not in the scroll, and it uses the denser overlay fill rather than the glass of a card.",
          },
          {
            kind: "table",
            head: ["Overlay", "Fill", "Radius", "Step"],
            rows: [
              ["Tooltip", "--sheet-bg, rgba(10, 13, 18, 0.92)", "9px, with a 7px arrow", "--elev-2"],
              ["Menu", "--sheet-bg", "--radius-menu, 14px", "--elev-2"],
              ["Dialog", "--sheet-bg", "--radius-card, 18px", "--elev-2"],
              ["Bottom sheet", "--sheet-bg", "--radius-sheet 22px on the top corners only", "--elev-2"],
              ["Snackbar", "--sheet-bg", "14px", "--elev-2"],
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "One overlay at a time. A dialog does not stack on a sheet, and no overlay takes --elev-2 twice. Two shadows over one another is the trap this page exists to stop.",
          },
        ],
      },
      {
        title: "Nothing above the two steps",
        blocks: [
          {
            kind: "p",
            text:
              "Iris has two steps above the page, and both are overlays. The page itself carries no shadow at all.",
          },
          {
            kind: "ul",
            items: [
              "A card, a list, tabs, buttons and a segmented button sit on the page: glass, the 1px edge, and no shadow.",
              "A card takes no shadow at rest, and a sheet takes --elev-2 when it floats.",
              "A menu, a tooltip and a toolbar take --elev-2.",
              "A dialog, a date picker, a search box and a time picker take --elev-2. A floating action button does not exist here.",
              "Hover and dragged states take a state fill, --state-hover .07, never a step up.",
              "Nothing goes above --elev-2. Iris has no fifth step.",
            ],
          },
          {
            kind: "p",
            text:
              "Iris draws its scrims in the page's own ink: --scrim is rgba(4, 6, 9, .62) over a dark page and rgba(20, 32, 44, .32) over a light one, and the pen spotlight is a 9999px ring of the page colour (rgba(7, 9, 12, .72), in light rgba(244, 247, 249, .78)) that dims everything around one marked row inside its card.",
          },
          {
            kind: "note",
            tone: "llm",
            text:
              "Do not put a shadow on a card. If you need more separation, the order is: better edge, a ground colour, a scrim, and only then --elev-2 on something that actually floats.",
          },
        ],
      },
    ],
  },
};
