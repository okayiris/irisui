// The resource pages: how to load and use the system, what release v32 is, and how to add a part.
// Written content only; the code and the artifact stay where they are.

import type { Doc } from "../content";

export const RESOURCE_DOCS_EXT: Record<string, Doc> = {
  bundle: {
    id: "bundle",
    label: "Install and bundle",
    lede: "Two stylesheets and three scripts. Everything in the system is on one global, window.IrisUi.",
    sections: [
      {
        title: "Two stylesheets",
        blocks: [
          {
            kind: "p",
            text: "A page loads tokens.css first and bundle.css second. tokens.css holds every value the system is made of: the colours, the type stack, the radii, the padding. bundle.css holds the rules that use those values. Load them in that order, because bundle.css reads the tokens.",
          },
          {
            kind: "p",
            text: "This project adds two more files beside them. ext.css carries the parts and values the artifact did not have yet, and it never overrides bundle.css, it only adds. extra.css carries the Caveat face for the handwritten Anchor and the widget note, because the release asks for that face but does not ship it. placeholder.css styles the stand-in tile for an asset a preview points at and the release does not carry.",
          },
          {
            kind: "code",
            lang: "html",
            text: `<link rel="stylesheet" href="/ds/tokens.css">
<link rel="stylesheet" href="/ds/bundle.css">
<link rel="stylesheet" href="/ds/ext.css">
<link rel="stylesheet" href="/ds/extra.css">
<link rel="stylesheet" href="/ds/placeholder.css">`,
          },
        ],
      },
      {
        title: "Three scripts",
        blocks: [
          {
            kind: "p",
            text: "The system needs React on the page before it runs. It does not ship React as a module; it expects React 18 as a global, the way a plain script page in a design tool has it. Load react.js and react-dom.js from /ds/vendor first, then bundle.js, then ext.js.",
          },
          {
            kind: "ul",
            items: [
              "/ds/vendor/react.js and /ds/vendor/react-dom.js: React 18 as a UMD global. They put React and ReactDOM on window.",
              "/ds/bundle.js: the release itself, a classic script that lands on window.IrisUi.",
              "/ds/ext.js: the additions, built into one file. It takes the React the page already has and adds its own parts to the same global.",
            ],
          },
          {
            kind: "p",
            text: "The order matters for one reason. bundle.js sets window.IrisUi, and ext.js merges into whatever is already there, so ext.js comes last. Nothing in ext.js replaces a shipped part; it only adds names the bundle did not have.",
          },
        ],
      },
      {
        title: "What lands on window.IrisUi",
        blocks: [
          {
            kind: "p",
            text: "The release publishes its own parts on the one global: Orb, Orb3D, TalkOrb, Button, Toggle, Skeleton, StatusPill, TabBar, Card, Row, Topic, Widget, PhaseRing, LoopScreen, Pen, Anchor, Word, ThemeWord, Pattern, ButtonGroup, PageDots, Chip, Progress, Stat, CheckList, Segmented and Field.",
          },
          {
            kind: "p",
            text: "ext.js adds the parts this project added: Tooltip, Menu, Dialog, Sheet, Snackbar, Badge, Slider, TextArea, Select, SearchField, Tabs, Steps, EmptyState, Divider, Toolbar, DatePicker, TimePicker, AppBar, NavRail, SplitButton, Carousel, CircleStack and LoopBubble. A page reads all of them from the one object, so an editor suggests the name after window.IrisUi and nothing else has to be imported.",
          },
          {
            kind: "p",
            text: "For an editor, /ds/index.d.ts is the props source. Add it to the page's types and every part gets its props, its unions and its optional fields. Field, for example, is typed as an input's own attributes plus a topic, so the ordinary input props keep working.",
          },
        ],
      },
      {
        title: "A page that works",
        blocks: [
          {
            kind: "p",
            text: "This is a whole page. It loads the two stylesheets, the two React files, the bundle and the additions, then draws a card with a sort menu and one primary button.",
          },
          {
            kind: "code",
            lang: "html",
            text: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <link rel="stylesheet" href="/ds/tokens.css">
  <link rel="stylesheet" href="/ds/bundle.css">
  <link rel="stylesheet" href="/ds/ext.css">
</head>
<body>
  <div id="root" style="background:var(--bg);color:var(--fg);padding:16px;font-family:var(--font-text)"></div>
  <script src="/ds/vendor/react.js"></script>
  <script src="/ds/vendor/react-dom.js"></script>
  <script src="/ds/bundle.js"></script>
  <script src="/ds/ext.js"></script>
  <script>
    const h = React.createElement;
    const { Button, Card, Menu } = window.IrisUi;
    ReactDOM.render(
      h(Card, null,
        h(Menu, { label: "Sort", items: [
          { label: "Newest first", checked: true },
          { label: "By name" }
        ] }),
        h(Button, { variant: "primary", size: "lg" }, "Agree and continue")),
      document.getElementById("root"));
  </script>
</body>
</html>`,
          },
        ],
      },
      {
        title: "The fonts",
        blocks: [
          {
            kind: "p",
            text: "The UI faces are the system stack. tokens.css names one stack for running text, one for the large styles and one for labels and values, and each one starts with the face the reader's own machine already has. The system ships no font file for any of them: nothing is borrowed from a font host, and nothing is downloaded.",
          },
          {
            kind: "p",
            text: "Inter stands first in the text and display stacks, so it is used only on a machine that already has Inter installed; everywhere else the platform's own face is used. That is the whole of the webfont story: the system stack, Inter only where it is already present.",
          },
          {
            kind: "p",
            text: "The one face the system does ship is the handwritten one the Anchor uses. The release asks for that face and ships no file for it, so a preview used to pull it from a font host. extra.css carries that one file from /ds/fonts/ instead, so a page keeps a single origin.",
          },
        ],
      },
      {
        title: "Build only from these parts",
        blocks: [
          {
            kind: "note",
            tone: "rule",
            text: "Every screen, window and app is built from the parts in window.IrisUi. Do not draw a new button, a new card or a new menu in a page, and do not reach for a CSS framework beside the system. Where a part is missing, add it to the system's additions so everyone gets it, or ask for it. The page never grows its own copy of the system.",
          },
          {
            kind: "p",
            text: "The same rule holds for values. A page uses the tokens from tokens.css or, where the system had none, the added values this project publishes beside them. A raw hex value in a page is a bug: it cannot answer the theme, it cannot answer reduced motion, and it will drift from the release.",
          },
        ],
      },
    ],
  },

  changelog: {
    id: "changelog",
    label: "Release notes",
    lede: "What v33 adds, what v32 is, what changed in it, and what this project added on top of the release.",
    sections: [
      {
        title: "Release v34.1",
        blocks: [
          {
            kind: "p",
            text: "v34.1 is this project's release of 3 october 2026. The package is version 34.1.0: everything in it is new and optional, so a page built on 34.0 draws the same.",
          },
          {
            kind: "table",
            head: ["what", "in v34.1"],
            rows: [
              ["DatePicker", "isDisabled(day) draws a day that cannot be picked like a day outside min/max, block fills the column, locale (\"nl\") names the month and the week days in the visitor's language."],
              ["IrisApp onAction", "a verb the app does not know (act:book) goes to the host, which may answer with more actions (close;push:done), also later from a promise."],
              ["Directions", "data-style on a page or app: calm (the default), solid, editorial, pastel or terminal. Each changes the variables only, so every part follows. A chosen chip stays the filled one in pastel. The block comes from the design lab (Ringlab), which dresses apps with it; bookings and iris-labs wear it."],
              ["Touch", "data-touch on a page or container gives chips, buttons and calendar days the 44px target; without it the kit stays compact."],
              ["AppBar", "the bar takes the ground's own --bg, so a page whose ground carries a wash shows it through the bar."],
            ],
          },
        ],
      },
      {
        title: "Release v34",
        blocks: [
          {
            kind: "p",
            text: "v34 is this project's release of 1 october 2026, the same day as v33. The package is version 34.0.0. It is also the first kit a house gets as a package: iris-ui, installed and updated by an order, never copied.",
          },
          {
            kind: "table",
            head: ["what", "in v34"],
            rows: [
              ["Card topic", "a card on its topic's ground: the same still fade as a Widget, the first label in the topic colour. No motion and no busy cost, so a grid of cards carries a colour per category. IrisApp passes topic to Card."],
              ["Package for a house", "scripts/build-house.mjs writes the kit as iris-ui (kind kit) with its tokens, the package a house installs and upgrades with plugin update iris-ui."],
              ["Fixes", "a bound Row flips its switch once (the switch and the row both set it, so under preact it flipped back)."],
            ],
          },
        ],
      },
      {
        title: "Release v33",
        blocks: [
          {
            kind: "p",
            text: "v33 is this project's release of 1 october 2026: the design system of v32 with everything added since. The package is version 33.0.0. The chapters in src/content are still those of v32; what v33 adds lives in the added parts and on these pages.",
          },
          {
            kind: "table",
            head: ["what", "in v33"],
            rows: [
              ["Light and dark", "Iris follows the system, data-mode=\"light\" or \"dark\" on <html> fixes it. Every token and every fixed colour of the release has both halves; the site has a light, dark or system switch. An app in light gets a ground: a wash of its own colour, tinted cards with a soft shadow."],
              ["IrisApp", "a whole app from one spec, with real navigation, sheets and dialogs, state, lists that filter, swipes (Rail, Pages, Bento, Meter) and swiping sideways between tabs. As a window it takes a NavRail. checkApp checks a spec against Meaning."],
              ["Picture", "a photo as content: a caption, or words over its foot like a cover, or beside it on a card; drawn plain, duotone (with a dark end in both modes) or parallax."],
              ["Meaning: neighbours", "N1 to N6, what may stand next to what: one now per screen, one loud per row, a pattern only behind a panel, a number says what it counts."],
              ["New parts", "MacPill, VaultAsk and TableApp as real components; Edge and EdgeText, the apps' light patterns; Mark, her ring as a still; Photo, BorderPattern and ChatStack."],
              ["Fixes", "a screen never shrinks under the tab bar, an empty group draws nothing, Toggle has a name, the topics of mail, sport and tasks leave violet, red and magenta."],
            ],
          },
        ],
      },
      {
        title: "Release v32",
        blocks: [
          {
            kind: "p",
            text: "v32 is the release the site is built against. Its package was version 32.0.0, the site said v32 and its date is 30 september 2026. The artifact is the set of files under public/ds: the two scripts, the stylesheets, the type declaration, the readme and the chapters.",
          },
          {
            kind: "p",
            text: "The release records itself in public/ds/design-system.json. That file was created on 2026-09-28T10:25:33Z and is at version 1 of its file record. Its last change is 2026-09-29T19:52:40Z.",
          },
        ],
      },
      {
        title: "What the release records",
        blocks: [
          {
            kind: "table",
            head: ["field", "value"],
            rows: [
              ["createdOnFiles.at", "2026-09-28T10:25:33Z, version 1"],
              ["lastChange.at", "2026-09-29T19:52:40Z"],
              ["manifestVersion", "3"],
              ["namespace", "IrisUi"],
              ["libraries", "react 18 as React, react-dom 18 as ReactDOM"],
            ],
          },
          {
            kind: "p",
            text: "public/ds/manifest.json lists what the release carries. It names eight components in five groups: Orb in brand; Button and Toggle in controls; Skeleton in feedback; StatusPill and TabBar in navigation; Card and Row in surfaces. It names the eight component readmes, bundle.css, bundle.js, index.d.ts and tokens.css, and beside them the two chapter files the release publishes: web-app.md and website.md.",
          },
        ],
      },
      {
        title: "What v32 changed",
        blocks: [
          {
            kind: "p",
            text: "The note on the release is exact: previews for Chip, Progress, Stat, CheckList, Segmented and Field, plus one badge in magenta on the orb's rim, using the badge tokens. That is the whole of the last change. Everything before it was the release taking shape: the parts, the stylesheets, the declaration and the fonts.",
          },
          {
            kind: "p",
            text: "Two of the parts the note names, Chip and Segmented, are in the bundle; Field and Progress, Stat and CheckList are in it too. The badge the note names is not in the bundle list, so it lives as a component with its own readme rather than as a registered part.",
          },
        ],
      },
      {
        title: "What this project added",
        blocks: [
          {
            kind: "p",
            text: "The parts this project added were built from the system's own tokens, because the system had none of them. Each one takes the house Button.",
          },
          {
            kind: "table",
            head: ["part", "group", "what it is"],
            rows: [
              ["Menu", "controls", "a list of choices on its own surface, anchored to what it changes."],
              ["Dialog", "overlays", "the one place Iris interrupts, a decision that cannot wait."],
              ["Sheet", "overlays", "secondary content anchored to an edge: the bottom, or the side on a wide window."],
              ["Snackbar", "feedback", "one line of what just happened, beside the thing it happened to."],
              ["Tooltip", "feedback", "the name of an icon button, after a short delay."],
              ["Badge", "navigation", "a count or a mark on a tab or an icon."],
              ["Slider", "controls", "one value on a line, for a level or an amount."],
              ["TextArea", "controls", "a Field that holds more than one line."],
              ["Select", "controls", "one of many, when the list is too long for a menu."],
              ["SearchField", "controls", "the field that finds things, with the wait built in."],
              ["Tabs", "navigation", "the sections of one screen, with the ink that slides."],
              ["Steps", "navigation", "where you are in a short sequence."],
              ["EmptyState", "feedback", "what a screen says when there is nothing in it yet."],
              ["Divider", "surfaces", "a line that separates, with an optional label."],
              ["CircleStack", "navigation", "every chat with its loops, stacked behind the strip; the iPhone app's home for loops since the Loops tab went."],
              ["LoopBubble", "feedback", "one loop, small: its letter and its six phases, the current one lit."],
            ],
          },
          {
            kind: "p",
            text: "The additions are published as one script beside the release and its own stylesheet. That script is not a new release: it takes the React the page already has and adds its parts to the same global.",
          },
        ],
      },
      {
        title: "The values the additions introduced",
        blocks: [
          {
            kind: "p",
            text: "The added parts needed values the system did not have. They sit together at the top of the additions' stylesheet, in one block, and are meant to move into the token file when this ships into the artifact.",
          },
          {
            kind: "ul",
            items: [
              "--state-hover, --state-press, --state-selected and --state-disabled: the four answers a hand gets.",
              "--motion-fast, --motion-base and --motion-slow: 0.14s, 0.2s and 0.32s, and --ease-house, cubic-bezier(0.2, 0.9, 0.25, 1).",
              "--focus-ring: the two ring stop, a page-coloured gap and an accent line.",
              "--elev-1 and --elev-2: light on the edge, and the one real shadow the system allows, for a menu or a dialog.",
              "--sheet-bg and --scrim: the fill of a sheet, and the dimming under it.",
              "--radius-menu, --radius-sheet and --radius-field: 14px, 22px and 12px.",
              "--bp-medium, --bp-expanded and --bp-large: 600px, 840px and 1200px.",
            ],
          },
          {
            kind: "p",
            text: "Under prefers-reduced-motion the three durations fall to 0.001s, so a part still changes state without moving.",
          },
        ],
      },
      {
        title: "The site itself",
        blocks: [
          {
            kind: "p",
            text: "The site is this project's other addition: written content plus a renderer that turns it into pages and into plain-text twins. None of it is in the artifact.",
          },
          {
            kind: "note",
            tone: "warn",
            text: "Be exact about the boundary. bundle.js, bundle.css, tokens.css, index.d.ts, design-system.json and manifest.json are the published release. The additions, their stylesheets and the site are this project's, and the last change note in design-system.json does not mention them. The added values are not in tokens.css yet, and the added parts are not in bundle.js or in the manifest yet.",
          },
        ],
      },
    ],
  },

  contribute: {
    id: "contribute",
    label: "Contribute",
    lede: "Add a part or a value to the system, in the real files, and hold it to the same promises as everything already there.",
    sections: [
      {
        title: "The rules a part keeps",
        blocks: [
          {
            kind: "p",
            text: "A part that joins the system keeps the same promises as the parts already in it. These are not style advice; they are the lines a review will hold you to.",
          },
          {
            kind: "ul",
            items: [
              "Tokens only. Every colour, duration, radius and space is a var() from the token file, or one of the added values when the system had no token. No raw hex, no raw pixel duration.",
              "The four states. Hover, press, focus and disabled each get an answer. Hover uses --state-hover, press uses --state-press, disabled is an opacity of 0.38, and busy says what it is doing.",
              "A focus ring. Keyboard focus shows --focus-ring, the accent line with a page-coloured gap. Never remove the outline and put nothing back.",
              "Reduced motion. The part loses its movement under prefers-reduced-motion, through the durations, not through a rewritten animation.",
              "Dark only. Iris is near-black with one accent. There is no light theme to add, and no second accent.",
              "Sentence case. Labels, titles and menu items start with a capital and continue in lower case. No title case.",
              "No emoji. Not in a label, not in a value, not in an empty state.",
              "The house Button. If the part needs a button, it takes the system's Button, so a topic and a size still work.",
            ],
          },
        ],
      },
      {
        title: "What a part brings with it",
        blocks: [
          {
            kind: "p",
            text: "A part is not done when it draws. Five things travel with it, and a review looks for all five.",
          },
          {
            kind: "ol",
            items: [
              "The code, with typed props, registered on window.IrisUi beside the parts that already ship.",
              "The styles, in a section of their own, built from the tokens and overriding nothing in the release.",
              "A preview. A part that moves into the release carries its own preview and a readme beside it. A part that is still an addition gets its frames from the additions' own variant code, where each variant carries the code that draws it.",
              "Props. Every prop is typed, and a shipped part publishes its own declaration; the prop table on this site comes from there.",
              "The system's own words: what it is, when to reach for it, its parts, its rules, its values and its accessibility. A page on this site follows from that automatically.",
            ],
          },
        ],
      },
      {
        title: "How you hand it in",
        blocks: [
          {
            kind: "p",
            text: "The types are checked first: run the type check and fix what it finds. The renderer is Node only, so a mistake in a page's content shows up there before it shows up in the browser.",
          },
          {
            kind: "p",
            text: "Then build the additions and the site with the commands the repo's own readme lists. The build prints the page count, the component count and the warning count; read the warnings, because a part that adds a value the system already had usually shows up there.",
          },
        ],
      },
      {
        title: "The gate",
        blocks: [
          {
            kind: "p",
            text: "The gate builds nothing. It looks at what was built, page by page, and asks each page for six core things: a real h1 and only one of them, a page title, no sideways scroll, no console error, no failed request, and a contrast check over the token pairs the site puts words in.",
          },
          {
            kind: "p",
            text: "It asks for more beside those: heading levels that do not skip, html lang set to English, one main landmark and a nav, every demo frame titled, every image with alt text, every control with an accessible name, no positive tabindex, and no internal link that points at a file the build does not carry. Nothing that looks like a credential may reach a published file.",
          },
          {
            kind: "p",
            text: "The contrast check measures each of those token pairs against the surface behind it and fails a pair below the floor: 4.5:1 for text, and 3:1 for large text and graphics.",
          },
          {
            kind: "p",
            text: "Every demo frame is opened as well: a frame that drew nothing, or one that could not mount its variant, fails with the reason printed. The two things a visitor does are walked too: the search shortcut, and the button that opens the code behind a frame. Run the gate with the command the repo's readme lists, and read the failures it prints, because each one names the page or the frame and the reason.",
          },
        ],
      },
      {
        title: "How to add a value",
        blocks: [
          {
            kind: "p",
            text: "A value is smaller than a part but it has the same two homes. If the value belongs to the release, it goes into tokens.json and tokens.css, with a comment that says what it is for, and the system's own rules for sizing and spacing hold it. If it is a value the system did not have, it waits in the added block at the top of the additions' stylesheet until it moves.",
          },
          {
            kind: "p",
            text: "Add it once and name it for what it does, not for where it is used. Then use it in the parts that need it and nowhere else. A value with two names, or a value written twice in two files, is the first sign of a system that stopped holding.",
          },
        ],
      },
    ],
  },
};
