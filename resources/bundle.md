# Install and bundle

Two stylesheets and three scripts. Everything in the system is on one global, window.IrisUi.

## Two stylesheets

A page loads tokens.css first and bundle.css second. tokens.css holds every value the system is made of: the colours, the type stack, the radii, the padding. bundle.css holds the rules that use those values. Load them in that order, because bundle.css reads the tokens.

This project adds two more files beside them. ext.css carries the parts and values the artifact did not have yet, and it never overrides bundle.css, it only adds. extra.css carries the Caveat face for the handwritten Anchor and the widget note, because the release asks for that face but does not ship it. placeholder.css styles the stand-in tile for an asset a preview points at and the release does not carry.

```html
<link rel="stylesheet" href="/irisui/ds/tokens.css">
<link rel="stylesheet" href="/irisui/ds/bundle.css">
<link rel="stylesheet" href="/irisui/ds/ext.css">
<link rel="stylesheet" href="/irisui/ds/extra.css">
<link rel="stylesheet" href="/irisui/ds/placeholder.css">
```

## Three scripts

The system needs React on the page before it runs. It does not ship React as a module; it expects React 18 as a global, the way a plain script page in a design tool has it. Load react.js and react-dom.js from /irisui/ds/vendor first, then bundle.js, then ext.js.

- /irisui/ds/vendor/react.js and /irisui/ds/vendor/react-dom.js: React 18 as a UMD global. They put React and ReactDOM on window.
- /irisui/ds/bundle.js: the release itself, a classic script that lands on window.IrisUi.
- /irisui/ds/ext.js: the additions, built into one file. It takes the React the page already has and adds its own parts to the same global.

The order matters for one reason. bundle.js sets window.IrisUi, and ext.js merges into whatever is already there, so ext.js comes last. Nothing in ext.js replaces a shipped part; it only adds names the bundle did not have.

## What lands on window.IrisUi

The release publishes its own parts on the one global: Orb, Orb3D, TalkOrb, Button, Toggle, Skeleton, StatusPill, TabBar, Card, Row, Topic, Widget, PhaseRing, LoopScreen, Pen, Anchor, Word, ThemeWord, Pattern, ButtonGroup, PageDots, Chip, Progress, Stat, CheckList, Segmented and Field.

ext.js adds the parts this project added: Tooltip, Menu, Dialog, Sheet, Snackbar, Badge, Slider, TextArea, Select, SearchField, Tabs, Steps, EmptyState, Divider, Toolbar, DatePicker, TimePicker, AppBar, NavRail, SplitButton, Carousel, CircleStack and LoopBubble. A page reads all of them from the one object, so an editor suggests the name after window.IrisUi and nothing else has to be imported.

For an editor, /irisui/ds/index.d.ts is the props source. Add it to the page's types and every part gets its props, its unions and its optional fields. Field, for example, is typed as an input's own attributes plus a topic, so the ordinary input props keep working.

## A page that works

This is a whole page. It loads the two stylesheets, the two React files, the bundle and the additions, then draws a card with a sort menu and one primary button.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <link rel="stylesheet" href="/irisui/ds/tokens.css">
  <link rel="stylesheet" href="/irisui/ds/bundle.css">
  <link rel="stylesheet" href="/irisui/ds/ext.css">
</head>
<body>
  <div id="root" style="background:var(--bg);color:var(--fg);padding:16px;font-family:var(--font-text)"></div>
  <script src="/irisui/ds/vendor/react.js"></script>
  <script src="/irisui/ds/vendor/react-dom.js"></script>
  <script src="/irisui/ds/bundle.js"></script>
  <script src="/irisui/ds/ext.js"></script>
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
</html>
```

## The fonts

The UI faces are the system stack. tokens.css names one stack for running text, one for the large styles and one for labels and values, and each one starts with the face the reader's own machine already has. The system ships no font file for any of them: nothing is borrowed from a font host, and nothing is downloaded.

Inter stands first in the text and display stacks, so it is used only on a machine that already has Inter installed; everywhere else the platform's own face is used. That is the whole of the webfont story: the system stack, Inter only where it is already present.

The one face the system does ship is the handwritten one the Anchor uses. The release asks for that face and ships no file for it, so a preview used to pull it from a font host. extra.css carries that one file from /irisui/ds/fonts/ instead, so a page keeps a single origin.

## Build only from these parts

> rule: Every screen, window and app is built from the parts in window.IrisUi. Do not draw a new button, a new card or a new menu in a page, and do not reach for a CSS framework beside the system. Where a part is missing, add it to the system's additions so everyone gets it, or ask for it. The page never grows its own copy of the system.

The same rule holds for values. A page uses the tokens from tokens.css or, where the system had none, the added values this project publishes beside them. A raw hex value in a page is a bug: it cannot answer the theme, it cannot answer reduced motion, and it will drift from the release.
