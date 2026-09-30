// Foundations, part C: layout, icons and accessibility.
// Every value here is read from the system: tokens.css, ext.css, bundle.css, bundle.js, the component
// READMEs and the chapters in src/content/. Nothing is guessed.

import type { Doc } from "../content";

export const FOUNDATIONS_C: Record<string, Doc> = {
  layout: {
    id: "layout",
    label: "Layout",
    lede:
      "A phone in the hand, a window she opens, and a wide screen hold the same file. What changes is how many panes it may show and where the navigation sits.",
    sections: [
      {
        title: "The same file at three widths",
        blocks: [
          {
            kind: "p",
            text:
              "A screen is one file: a window on the web, a page in the Iris tab on a phone, a widget on the Mac. It folds by width instead of having a phone copy.",
          },
          {
            kind: "table",
            head: ["At this width", "The layout shows"],
            rows: [
              ["A window she opens", "one view in a frame of 30rem by default, sliding in from the right, overlays one at a time"],
              ["A phone screen", "the same view full bleed, the bottom bar, a sheet from the bottom"],
              ["A wide screen", "two panes side by side and a sidebar of 13rem"],
            ],
          },
        ],
      },
      {
        title: "The three breakpoints",
        blocks: [
          {
            kind: "p",
            text:
              "ext.css names three widths. Each one earns something the width below it cannot hold.",
          },
          {
            kind: "table",
            head: ["Token", "Width", "What it adds"],
            rows: [
              ["--bp-medium", "600px", "two panes: a list of 19rem next to the detail, a document of 40rem next to an inspector of 15rem"],
              ["--bp-expanded", "840px", "the sidebar of 13rem joins the view, tabs sit under the title, the dashboard reaches 4 columns"],
              ["--bp-large", "1200px", "the window stops growing: the reading column stays 40rem, the flow column 30rem, the rest is air"],
            ],
          },
          {
            kind: "code",
            lang: "css",
            text: ":root {\n  --bp-medium: 600px;\n  --bp-expanded: 840px;\n  --bp-large: 1200px;\n}",
          },
          {
            kind: "p",
            text:
              "The frame is the container, never the screen: every fold is a container query on the frame, because the owner can drag a window to any size.",
          },
          {
            kind: "p",
            text:
              "Below 40rem the shape is a phone: sidebar and tabs become the bottom bar, list and detail become two screens, tables stack. From 40rem to 52rem a dashboard shows 2 columns and an inspector floats. Above 52rem everything sits side by side.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The chapters quote 40rem and 52rem while the tokens say 600px, 840px and 1200px, so a fold written from a chapter disagrees with the tokens.",
          },
        ],
      },
      {
        title: "One frame, one navigation",
        blocks: [
          {
            kind: "p",
            text:
              "An app has one navigation, the same in every view: a sidebar for places, tabs for angles on one subject, a back chevron for going deeper. Never a sidebar and tabs and a bottom bar at once.",
          },
          {
            kind: "p",
            text:
              "A window never shows two frames. The frame you see is the outermost surface you are in. A card inside a card loses its frame so the nesting stays one surface.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Pick the smallest surface that holds it: block, tile, window, page screen, phone screen, app. If he opens it again next week it is an app. If it answers one question now it is a window.",
          },
        ],
      },
      {
        title: "Which app layout for which content",
        blocks: [
          {
            kind: "p",
            text:
              "Nine layouts carry every app. Pick by the content and let the width fold it. They nest: a sidebar app whose Invoices place is a table, whose row opens a document.",
          },
          {
            kind: "table",
            head: ["Layout", "Right when", "Wide", "Below 40rem"],
            rows: [
              ["Sidebar app", "3 to 7 places to move between", "sidebar 13rem plus the view", "bottom tab bar, the fifth tab is More"],
              ["List and detail", "a collection you open one item of", "list 19rem plus the detail", "two screens with a back chevron"],
              ["Tabs", "one subject, 2 to 5 angles", "words under the title, 2px accent underline", "the same tabs in the bottom bar, with icons"],
              ["Dashboard", "how is it going at a glance", "tile grid of 4 columns", "2 columns, then 1"],
              ["Board", "work moving through stages", "3 to 5 columns of cards", "one column at 85%, snapping sideways"],
              ["Flow", "anything with an end", "one question per step in a 30rem column", "the same, buttons full width"],
              ["Document", "long text: a plan, notes, a report", "40rem column plus an inspector of 15rem", "the inspector floats over the text"],
              ["Table", "records you scan and filter", "search, chips, a sortable table", "each row a two line stack"],
              ["Widget pages", "the phone home, pages of widgets", "pages next to each other as columns", "pages swiped vertically, a dot rail"],
            ],
          },
        ],
      },
      {
        title: "Where the tab bar sits, where the sidebar takes over",
        blocks: [
          {
            kind: "p",
            text:
              "On a phone the navigation is the tab bar: a frosted capsule at the bottom, 62px high, tabs of 54px, an icon of 26px and a label of 13px. Her talk button stands 28px above it. The bar sits 22pt into the bottom safe area and a view reserves 5rem at the bottom.",
          },
          {
            kind: "p",
            text:
              "From 40rem the sidebar replaces the bar: 13rem, a hairline of --line on its right edge, the current place tinted with the accent. Tabs fold the same way, and each keeps its own scroll place and half filled state.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "The bar and the sidebar are the same list of places, drawn twice. Never both, never a third way to move.",
          },
        ],
      },
      {
        title: "The three window sizes",
        blocks: [
          {
            kind: "p",
            text:
              "Iris names three window sizes as breakpoints: 600px, 840px and 1200px, and no class beyond them. It never draws more than two panes.",
          },
          {
            kind: "table",
            head: ["What", "In Iris"],
            rows: [
              ["Named sizes", "three: 600px, 840px, 1200px, no extra large class"],
              ["Panes", "2 at most"],
              ["Fixed pane width", "sidebar 13rem, list 19rem, inspector 15rem"],
              ["Layouts", "list detail and supporting pane"],
              ["Navigation", "tab bar below 40rem, sidebar above, no rail"],
              ["Destinations", "sidebar 3 to 7, five tabs then More"],
              ["Pane resizing", "the owner resizes the window only"],
            ],
          },
          {
            kind: "p",
            text:
              "What Iris keeps: list and detail with a back chevron in the detail view when one pane fits, and a supporting pane that floats over the text.",
          },
          {
            kind: "p",
            text:
              "What Iris refuses: a third pane, a rail, a drawer, a feed of browsing cards, and drag handles on panes. Each of them would add a way to move that this layout does not need.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "Two gaps, not decisions: Iris has no feed, so a page of browsing cards has no layout here, and it has no column grid with margins and gutters and no right to left rule.",
          },
        ],
      },
    ],
  },

  icons: {
    id: "icons",
    label: "Icons",
    lede:
      "One line set, drawn by the system. Fourteen shapes ship, at four sizes, and no screen draws its own.",
    sections: [
      {
        title: "One set, from the system",
        blocks: [
          {
            kind: "p",
            text:
              "Every icon is a line drawing on a 24 by 24 grid, one path, stroke in currentColor, round caps and round joins, never filled. The bundle draws them in the platform's own icon idiom; the window kit draws the same shapes through Icon as inline 24x24 stroke SVG.",
          },
          {
            kind: "p",
            text:
              "The set is small on purpose. Few and small is the house rule, an icon row that is always visible is not allowed, and an icon that needs a caption under it is the wrong icon.",
          },
          {
            kind: "p",
            text:
              "Colour comes from the parent, never from the icon: 80% of --fg in a settings row, --accent in the current sidebar place, --faint on a chevron. There is no icon colour token.",
          },
        ],
      },
      {
        title: "What the set ships",
        blocks: [
          {
            kind: "p",
            text:
              "The bundle carries fourteen names. This is the whole set, in the order the code holds it.",
          },
          {
            kind: "ul",
            items: [
              "sparkles, her working state and the first tab",
              "loop, a thing that comes back",
              "camera",
              "person, the owner",
              "mic, voice in",
              "speaker, voice out, and the action pill next to her status",
              "chevron, a row that opens something, drawn at 14",
              "external, a row that leaves the app",
              "car, on the road",
              "phone, this device",
              "shield, what she may see",
              "globe, a domain or a language",
              "wave, sound or a level",
              "trash, the one destructive action",
            ],
          },
          {
            kind: "p",
            text:
              "A name that is not on this list is not an icon. The bundle draws an empty path for it and the window kit draws a dashed square. Neither is a shape to ship.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The window kit has 161 names of its own (clock, calendar, mail, car) with English aliases in screen-icons.js. That file is not in this repo, so none of those names can be checked here. Use a name only when you can see it in the bundle.",
          },
        ],
      },
      {
        title: "Sizes in use",
        blocks: [
          {
            kind: "table",
            head: ["Where", "Size", "Where it is set"],
            rows: [
              ["Icon default", "20", "bundle.js, Icon size = 20"],
              ["Tab bar tab icon", "26", "bundle.js, TabBar"],
              ["Settings row icon", "24px container, icon at its default", "bundle.css, .iris-row-icon"],
              ["Row chevron and external arrow", "14", "bundle.js, Row"],
              ["StatusPill action speaker", "14", "bundle.js, StatusPill"],
              ["Window kit Icon", "18 by default, size", "web-app.md"],
            ],
          },
          {
            kind: "p",
            text:
              "Nothing in the system draws an icon above 26. A large picture is a photo, not an icon at 64, and the set has no hero glyph.",
          },
        ],
      },
      {
        title: "Stroke",
        blocks: [
          {
            kind: "p",
            text:
              "The bundle passes a stroke width of 2 on the 24 grid, in currentColor, with round caps and joins; the window kit defaults to a weight of 1.75 on the same shapes. A hairline vanishes on a glass card, which is why the bundle stays at 2.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The comment above the bundle's icon code says stroke 1.75 while the code draws 2. Match the surface you are on until that is settled: 2 in the bundle, 1.75 in a window.",
          },
          {
            kind: "p",
            text:
              "One stroke weight per surface. Never mix 1.5 and 2 in one row, and never thicken an icon to make it feel important. Weight comes from the words next to it.",
          },
        ],
      },
      {
        title: "When an icon may stand alone",
        blocks: [
          {
            kind: "p",
            text:
              "An icon may stand alone when the control around it carries the name. The icon only Button takes icon and label, and that label is the accessible name. A tab pairs its 26px icon with a 13px word, and a row names itself with its title.",
          },
          {
            kind: "p",
            text:
              "The icon never speaks for itself. Every icon the bundle draws is marked aria-hidden, so a screen reader hears the control and its label, never the shape.",
          },
          {
            kind: "p",
            text:
              "An icon may not stand alone when nothing else names it: a header button with a shape and no label, a list of icons with no words, a row whose only content is an icon.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "One icon per action, and the action is readable in words. If the label has to be hidden to make the row fit, the row holds too much.",
          },
        ],
      },
      {
        title: "Never draw your own",
        blocks: [
          {
            kind: "note",
            tone: "rule",
            text:
              "Never hand-build a control the system provides, and never draw your own icon. If a part is missing, say so.",
          },
          {
            kind: "ul",
            items: [
              "Do reach for a name in the set, and let the size come from where it sits.",
              "Do give an icon only button its label, so the name is there for a screen reader.",
              "Do not write an emoji where an icon belongs, and do not ship an emoji as UI.",
              "Do not add an SVG of your own for something the set already draws.",
              "Do not invent a stroke weight, a fill, or a second colour for one icon.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The repo has no icon folder, no naming rule and no mapping from these fourteen names to the shapes the app draws, so there is no agreed way to add the fifteenth. The honest answer today is that the set is closed.",
          },
        ],
      },
    ],
  },

  accessibility: {
    id: "accessibility",
    label: "Accessibility: what it holds, and what it owes",
    lede:
      "Contrast, target size, focus, motion and words: what the system holds today, and what it still owes.",
    sections: [
      {
        title: "Contrast floors",
        blocks: [
          {
            kind: "p",
            text:
              "The floors are WCAG's, quoted here once: contrast of 4.5:1 for text (1.4.3) and 3:1 for large text and graphics (1.4.11), text that survives a 200% size increase (1.4.4), and a target of at least 44 by 44 CSS pixels (2.5.5). Large text is 14pt bold or 18pt regular and up, and disabled states are exempt.",
          },
          {
            kind: "p",
            text:
              "In Iris, --fg carries titles and text on --bg and --dim carries the 12px line under a title. A topic accent holds 6:1 or more on its ground and on --bg, which is the house's own floor on top of 1.4.3; the closest of the fifteen sits at 6.48:1.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "--faint is stated in tokens.css as 3.5:1 and as not for body text. Under the 4.5:1 floor it may only carry a label that repeats something already on screen: a section label, a version line, a chevron.",
          },
          {
            kind: "p",
            text:
              "The parts added in this project do not use it for words. They take --label (#8fa3b0, 7.63:1 on --bg) for section labels, captions and shortcuts, and keep --faint for hairlines and decoration, which is what the release's own note allows.",
          },
        ],
      },
      {
        title: "What is tested, and what is not",
        blocks: [
          {
            kind: "p",
            text:
              "The gate that runs before this site is published measures one of the four floors above: contrast. It measures the tokens the site itself puts words in, each against the surface behind it, and fails a pair below 4.5:1.",
          },
          {
            kind: "ul",
            items: [
              "Contrast (1.4.3, 1.4.11): measured for the site's own token pairs, not for every possible pair. A topic accent on its ground is checked by hand, not by the gate.",
              "Text resize (1.4.4): not tested. No 200% pass is run, and no layout says what happens to a fixed sidebar when the root size doubles.",
              "Target size (2.5.5): not tested. Nothing measures a hit area, and two parts are drawn below both floors.",
              "Focus, keyboard and alt text: asked for in words on this page, and not tested by anything.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "So this page is honest in two halves. The contrast of the site's own text is held. Text resize, target size and the keyboard rules are owed, and each one is written down here rather than claimed.",
          },
        ],
      },
      {
        title: "Targets",
        blocks: [
          {
            kind: "p",
            text:
              "The floors: touch at least 48 by 48px, pointer at least 44 by 44px, with 8px between targets. The 44px pointer floor follows WCAG 2.5.5; Iris does not restate either floor as a token.",
          },
          {
            kind: "table",
            head: ["Control", "Size in Iris", "Against the floors"],
            rows: [
              ["Button, size md", "44px high", "meets the 44px pointer floor; under the 48px touch floor"],
              ["Button, icon only", "44px wide", "the same 44px square, against the same two floors"],
              ["Field", "44px high", "meets the 44px pointer floor; under the 48px touch floor"],
              ["Tab in the bar", "54px high in a 62px bar", "over both floors"],
              ["Button, size sm", "28px high", "under both"],
              ["Search clear button", "28 by 28px", "under both"],
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The small button and the search clear button are drawn at 28px, under both floors. Their visible box may stay 28, but the hit area has to reach 44px on a touch screen.",
          },
        ],
      },
      {
        title: "Focus",
        blocks: [
          {
            kind: "p",
            text:
              "Focus is one ring and it is always visible. In the bundle it is a 2px outline in the accent with a 2px offset, on buttons, chips, segments, check rows, dots and fields. On glass, ext.css uses two rings, 2px of --bg then 4px of --accent.",
          },
          {
            kind: "p",
            text:
              "Nothing removes an outline without drawing the ring.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Focus follows the hand and the keyboard in the same order.",
          },
        ],
      },
      {
        title: "Motion",
        blocks: [
          {
            kind: "p",
            text:
              "With prefers-reduced-motion reduce, the three durations in ext.css drop to 0.001s, the press scale of .985 is dropped, and the bundle stops the orb, the skeleton, the spinner and the talk effects. A still screen shows the end state of everything: the pen fully drawn, the ring at its value.",
          },
        ],
      },
      {
        title: "Text scaling",
        blocks: [
          {
            kind: "p",
            text:
              "The house rule is that a UI supports at least 200% text increase. Text and line height scale together while padding stays put: a button keeps 8px top and bottom and 24px left and right at 1x, 1.3x and 2x. At 200% a headline should still fit in four lines, and if it cannot, one tap reaches the full text.",
          },
          {
            kind: "p",
            text:
              "In Iris the type tokens are fixed px (28 for a page title, 17 for a row title, 15 for body, 12 for a sub line, 10.5 for a label), so scaling is the browser's zoom. The window kit and the app chapters use rem, which grows with the root size.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "No 200% pass is written in this repo, and no layout says what happens to a fixed 13rem sidebar when the root size doubles. Treat 200% as a rule we owe, not one we hold.",
          },
        ],
      },
      {
        title: "Language and reading",
        blocks: [
          {
            kind: "p",
            text:
              "English is the source and every other language is generated from it. Sentence case everywhere: titles, labels, buttons, menu items. Short sentences, second person, no idioms, because other languages run about 1.5 times longer.",
          },
          {
            kind: "p",
            text:
              "The house adds: no em dashes, no emoji, no exclamation marks. The product is Iris; the assistant is named per house.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The system publishes no reading level and no sentence length. The one number here is for notifications: a title under 29 characters, a collapsed body under 40.",
          },
        ],
      },
      {
        title: "Alt text",
        blocks: [
          {
            kind: "p",
            text:
              "Alt text does not start with image of, because the reader already says image, and a decorative picture takes an empty alt.",
          },
          {
            kind: "p",
            text:
              "A chart gets its takeaway, not every point.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The chapters reference the twelve prototype screenshots and four widget photos as bare images with no alt text, and the repo holds no rule for writing one.",          },
        ],
      },
      {
        title: "Never colour alone",
        blocks: [
          {
            kind: "p",
            text:
              "A status is a pill with a word in it: done, waiting, late. Colour repeats the word and never replaces it, a status is never the accent, and unread mail carries a dot, not a colour change.",
          },
          {
            kind: "p",
            text:
              "In a widget and on a screen, colour carries state and every state also has a number or a word: a lamp that is on, energy made, a battery under 20%.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Printed in grey, nothing is lost but the smoothness. Every meaning has a second carrier.",
          },
        ],
      },
      {
        title: "Keyboard",
        blocks: [
          {
            kind: "p",
            text:
              "The stylesheet carries the roles and the drawing: a checked menu item takes a check, a current tab takes aria-selected, a dialog sits on a scrim, a sheet comes from the bottom. The behaviour behind those states has to be built.",
          },
          {
            kind: "ul",
            items: [
              "A menu opens from its trigger with Enter, Space or the down arrow, moves with the arrow keys, closes on Escape and returns focus to the trigger.",
              "A dialog moves focus in when it opens, keeps Tab inside it, closes on Escape and returns focus to the opener; the scrim is not a tab stop.",
              "A sheet follows the dialog rules, and overlays never stack: one at a time.",
              "Tabs are one tab stop, the arrow keys move between them, Home and End go to the ends, and the current one carries aria-selected.",
              "A row that opens something is a button, not a clickable div.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "No keyboard handling is written in the CSS and no test for it exists: no focus trap, no Escape handler, no focus return. These are rules we ask for, not values the system proves.",
          },
        ],
      },
    ],
  },
};
