// Per-component guidance for the brand and screen parts. Values come from the component READMEs and
// previews in src/content/components/ and from src/content/screens.md; tokens are named as the CSS names them.

import type { Override } from "../content";

export const OVERRIDES_BRAND: Record<string, Override> = {
  orb: {
    when: "Any where you show that Iris is there: the header of a screen, a hero, the logo.",
    parts: [
      { name: "ring", what: "the turning violet-blue-pink gradient, 5px thick at --k 1" },
      { name: "glow", what: "a blurred copy of the ring behind it, opacity .5, scale 1.3" },
      { name: "echo", what: "the ice-blue ring that runs out and fades while she listens" },
      { name: "state", what: "idle, listening, busy, talking, away" },
    ],
    rules: [
      { do: "Only four sizes: 16 in a line of text, 22 in a header or status, 28 in a field you type to her, 34 in a list row.", dont: "Never a size between the steps, never bigger than 34: a big live Iris is the TalkOrb, a still one the Mark." },
      { do: "The ring is as tall as the text beside it.", dont: "Never a filled circle, never a face." },
      { do: "One or two orbs per page.", dont: "Never decoration in a list or a row; a list keeps the flat orb and nothing more." },
      { do: "Away stays grey and still.", dont: "Never let the grey alone say what is wrong: the word beside it says it." },
    ],
    specs: [
      { label: "size", value: "16, 22, 28 or 34 only; the table \"Which Iris, how big\" is on the Mark page" },
      { label: "ring thickness", value: "5px * --k, cut from the disc with a radial mask" },
      { label: "--orb-gradient", value: "conic from 200deg, #6d5cf6, #38bdf8, #c026d3, #8b5cf6, #6d5cf6" },
      { label: "turn", value: "6s idle, 2s busy, 3s talking, linear" },
      { label: "away", value: "grayscale 1, no animation, opacity .5" },
    ],
    a11y: [
      "The ring has no accessible name: whatever state a person must know is spoken by the word beside it.",
      "Away and muted differ by more than colour: away is grey and still, muted carries the struck-through mic.",
      "Listening shows an echo ring: never let motion be the only sign of what she is doing.",
    ],
    related: ["orb3d", "talkorb", "statuspill", "tabbar", "cover"],
  },

  orb3d: {
    when: "A hero moment, the Mac pill or the talk button, where one or two live orbs carry the screen.",
    parts: [
      { name: "state", what: "rest, talking, expression, listening, thinking, muted, away" },
      { name: "ring", what: "one of 28 shader rings, default deepsea, or your own GLSL ring" },
      { name: "particles", what: "0 to 1: motes round the ball, shapes orbit, comets, sparks, dust, swarm, circle, square, triangle, knot" },
      { name: "material", what: "the ball: glass, matte, pearl, plasma, chrome, hologram" },
      { name: "body", what: "the glass: sphere, cube, triangle, donut, gem, or your own GLSL body" },
      { name: "tone", what: "0 to 1, turns exposure, bloom and white down for a bright ring with many particles" },
    ],
    rules: [
      { do: "One WebGL context per orb; a page keeps about 16.", dont: "Never a wall of Orb3D: for many rings draw them all with one Orb3D.makeRenderer and copy each frame." },
      { do: "The canvas is transparent and the ball is 38% of size, so it sits on any surface." },
      { do: "expression only for a big moment, for a few seconds." },
      { do: "Fall back to the flat orb where WebGL2 is missing, and keep as many orbs as the page can afford." },
    ],
    specs: [
      { label: "canvas", value: "230 across, ball 38% of size, the ring fades out before the edge" },
      { label: "white", value: "capped, only the hottest cores add white, at most 55% of the way" },
      { label: "thinking", value: "time runs 3x, an Edge pattern round the ball, another each time, as on the TalkOrb" },
      { label: "muted", value: "grey-violet, dim, slow, struck-through mic in front" },
      { label: "particles", value: "count 1 to 512, maxSize default 6, maxLight default 1.6, react 0 to 3" },
      { label: "particleStyle", value: "each shape starts from its own values, Orb3D.shapeStyle(shape); sprite is dot, star, blob, square, ring or streak" },
      { label: "Mac pill", value: "Orb3D at 104 in place of the 60pt TalkOrb, glass bar behind it, 80pt gap, state word 48pt under the centre, dotted steps ring r 43" },
      { label: "own GLSL", value: "body(p) returns the signed distance to the edge, negative inside; set #define DEPTH 14.0 for a thin body" },
    ],
    a11y: [
      "The orb is a picture of her state: a screen a person must understand also carries the state as a word.",
      "Reduced motion: thinking, listening and expression stop; the orb still shows its state word.",
      "One orb in view keeps the page quick enough for a person to act on it.",
    ],
    related: ["orb", "talkorb", "statuspill", "cover"],
  },

  talkorb: {
    when: "The talk button: the middle of the iPhone tab bar, and the Mac pill. Hold it to talk.",
    parts: [
      { name: "disc", what: "the dark disc the ring sits in" },
      { name: "core", what: "the ring inside, 22/60 of the disc" },
      { name: "spectrum", what: "48 mirrored pitch bars while she talks, low at the bottom, high at the top" },
      { name: "echo", what: "three ice-blue echoes that run out to 1.35x the disc while it listens" },
      { name: "arc", what: "while she thinks: an Edge pattern round the disc, another each time (comet, zip, orbit, sparks, flow, party), as in the apps" },
      { name: "muted-mic", what: "the struck-through mic, drawn in front when her voice is off" },
    ],
    rules: [
      { do: "Never under 60: its ring is a third of its size, so smaller is a dot. Small and live is the Orb.", dont: "Never in a field, a row or a header." },
      { do: "66pt in the tab bar, standing 14pt above it.", dont: "Never wider than about 1.5x the disc: effects stay close to the button." },
      { do: "It is always drawn above everything around it: the highest z-index of its row." },
      { do: "Hold to talk; swipe up to lock, swipe left for a note, swipe right for the tab bar." },
      { do: "Give the analyser on the web for a real voice.", dont: "Never call expression the look of normal talking." },
    ],
    specs: [
      { label: "size", value: "66pt in the bar, ring 22/60 of the disc" },
      { label: "rest", value: "one turn in 30s, nothing else moves" },
      { label: "spectrum", value: "48 pitches, 90Hz to 7kHz, mirrored, each pitch its own colour, low ice blue via violet to high magenta" },
      { label: "listening", value: "echoes run out to 1.35x the disc, 1.35s, ease-out, infinite" },
      { label: "thinking", value: "Edge at 70/60 of the disc, 1.3s a round; ring pulses .96 to 1.04 in .7s" },
      { label: "muted", value: "core steps back to opacity .2 and scale .65" },
      { label: "away", value: "grey and still" },
    ],
    a11y: [
      "The orb is the mic, so the button needs its own accessible name: there is no mic icon to read.",
      "Muted shows a struck-through mic, not a colour alone.",
      "Reduced motion: the arc, the echoes and the pulse stop; the state word from the screen carries the meaning.",
    ],
    related: ["orb", "orb3d", "tabbar", "statuspill"],
  },

  statuspill: {
    demos: [
      { label: "Word", code: `() => h(StatusPill, { state: "busy", label: "Busy" })` },
      { label: "Action", code: `() => h(StatusPill, { action: "Continue here", onAction: () => {} })` },
      { label: "Away", code: `() => h(StatusPill, { state: "away", label: "Reconnecting" })` },
    ],
    when: "Top left of every screen, while she is doing something or has exactly one action to offer.",
    parts: [
      { name: "orb", what: "the flat orb at its state, 22pt" },
      { name: "label", what: "one word of what she is doing: busy, listening, reconnecting" },
      { name: "action", what: "an accent pill with one action, Continue here" },
    ],
    rules: [
      { do: "One word in the app, lowercase, like busy or listening." },
      { do: "Nothing to report means only the orb shows." },
      { do: "The action pill is the accent and carries one action." , dont: "Never a second status line, and never an action without a state worth telling." },
    ],
    specs: [
      { label: "row", value: "orb, 14px gap, then the label" },
      { label: "label", value: "17px, --fg" },
      { label: "orb", value: "22pt, the header size of Orb" },
      { label: "variants", value: "Word, Action, Away" },
    ],
    a11y: [
      "The label is the accessible name of the state: the orb alone says nothing to a screen reader.",
      "Away keeps a word (reconnecting), so the meaning is not the grey.",
      "The action is a real button with its own name (Continue here), reachable on its own.",
    ],
    related: ["orb", "talkorb", "tabbar"],
  },

  tabbar: {
    when: "The bottom of every iPhone screen: her talk button in the middle, the tabs either side of it.",
    parts: [
      { name: "tabs", what: "Iris, Loops, Camera, You in the release. The app since 29 September: Iris, then Camera and You; Loops is no tab any more, the loops live in the CircleStack above the strip." },
      { name: "active", what: "the active tab in ice blue on a faint blue pill" },
      { name: "talk", what: "the TalkOrb state passed to the middle button" },
      { name: "progress", what: "-1 to 1: a page swipe in flight, the pill follows the finger" },
      { name: "collapsed", what: "at rest only the orb shows, the glass folds into it" },
    ],
    rules: [
      { do: "Two halves of equal width, so the orb stays in the middle. The app now puts Iris alone on the left and Camera and You on the right; the release TabBar still splits four tabs two and two and cannot draw that yet.", dont: "Never a fifth tab: the middle is the orb." },
      { do: "The orb stays on top; the pill slides under it and its effects fall over the tabs." },
      { do: "The bar keeps 22pt into the bottom safe area and leaves the home indicator free." },
      { do: "collapsed at rest; it opens on a page swipe or a swipe right on the orb, and folds back after 2.5s without touch." },
    ],
    specs: [
      { label: "bar", value: "62px high, radius-pill, glass rgba(20,26,34,.72)" },
      { label: "talk", value: "74px wide, margin-top -28px, TalkOrb 66pt" },
      { label: "collapsed", value: "clip inset(-14px calc(50% - 33px) 14px round 33px); tabs scale .4 and fade" },
      { label: "progress", value: "the front of the pill runs ahead and the back lets go later, a metaball neck between them; a tab tap springs it over" },
      { label: "fold back", value: "2.5s without touch" },
    ],
    a11y: [
      "Every tab carries its word: the icon is not the name.",
      "Active is ice blue on a faint blue pill and keeps its label, so colour is never the only sign.",
      "The talk button has no word of its own and needs one (Talk); it stands above the bar with the highest z-index of its row.",
    ],
    related: ["talkorb", "orb", "pagedots", "circlestack"],
  },

  pagedots: {
    demos: [
      { label: "Groceries", code: `() => { const [a, set] = React.useState(1); return h(PageDots, { count: 4, active: a, onSelect: set, topic: "groceries", labels: ["List", "Shops", "History", "Spending"] }); }` },
      { label: "On a photo", code: `() => { const [a, set] = React.useState(2);
  return h("div", { style: { position: "relative", maxWidth: 360 } },
    h(Photo, { kind: "duotone", topic: "weather", alt: "A figure in front of two ridges at dusk" }),
    h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 12, display: "flex", justifyContent: "center" } },
      h(PageDots, { count: 5, active: a, onSelect: set, topic: "weather", dark: true, labels: ["Mon", "Tue", "Wed", "Thu", "Fri"] }))); }` },
    ],
    when: "Under screens a thumb swipes through, when the count matters to the person.",
    parts: [
      { name: "dot", what: "7px, 30% of the topic colour, in 2px gaps" },
      { name: "dot-active", what: "the active dot, a 22px duotone streak from --k to --k2" },
      { name: "dark", what: "the dark pill behind the dots, for a screen that breaks to the edge with a photo" },
      { name: "labels", what: "the accessible name per dot, default 2 / 5" },
    ],
    rules: [
      { do: "One row of dots, one per screen." },
      { do: "dark on a screen with a photo behind the dots; PageDots dark in the one break in three." },
      { do: "Keep the row clear of other targets: the tap target is the dot plus 8px by 4px padding." },
    ],
    specs: [
      { label: "dot", value: "7px wide and 7px high, radius 999px, 30% of --k mixed with #2a313b" },
      { label: "dot-active", value: "22px wide, gradient 90deg from --k to --k2" },
      { label: "vertical", value: "in LoopScreen: 5px dots, the active one 5px wide and 16px high" },
      { label: "dark", value: "rgba(7,9,12,.72), radius 999px, padding 0 6px" },
      { label: "focus", value: "outline 2px in the topic colour, offset 2px" },
    ],
    a11y: [
      "Every dot needs a name: the default is 2 / 5, or pass labels.",
      "The active dot grows and lengthens as well as changing colour.",
      "Vertical dots on the loop screen follow the same names and the same focus ring.",
    ],
    related: ["loopscreen", "widget", "tabbar"],
  },

  topic: {
    when: "Once, high up, on every screen she builds for someone: it colours everything inside it.",
    parts: [
      { name: "--k", what: "the accent and pen colour of the subject" },
      { name: "--k2", what: "the second tint, for pattern shapes and the far end of a duotone" },
      { name: "--kd", what: "the dark ground: widget fill, pattern ground, Word ground" },
      { name: "--k-button", what: "the primary button: oklch .82 / .12 of the accent with dark ink" },
    ],
    rules: [
      { do: "One topic per screen." , dont: "Never mix two topics, and never put health and travel together: they share their values." },
      { do: "A part's own topic prop wins over the wrapper." },
      { do: "Use --k for what matters.", dont: "Never use a topic colour for body text on bg, and never use --k2 as text." },
    ],
    specs: [
      { label: "k", value: "groceries #4ade80, agenda #7dd3fc, mail #94a3b8, parcel #fbbf24, weather #38bdf8, tasks #2dd4bf, sport #fb923c, money #a7f3d0, travel #2ee6d6, health #2ee6d6, home #fde68a, music #c4b5fd, loop #7dd3fc, explain #a78bfa, party #f0abfc" },
      { label: "k2", value: "decoration only, never text on its own" },
      { label: "contrast", value: "every accent reads on its own ground and on bg at 6:1 or more; fg and dim read on every ground" },
      { label: "layout", value: "Topic renders display: contents, so it never changes layout" },
      { label: "unknown name", value: "logs a warning and falls back to the ice-blue accent" },
      { label: "Topic names", value: "groceries, parcel, weather, money, travel, tasks, health, home, music, party, explain all work" },
    ],
    a11y: [
      "A topic is colour only: the label, the word or the number still says what the thing is.",
      "health and travel are identical, so never put both on one screen.",
      "Every accent holds 6:1 on bg and on its own ground, and fg and dim hold on every ground.",
    ],
    related: ["widget", "phasering", "pattern", "word"],
  },

  widget: {
    when: "One answer at a glance on a screen she builds for someone.",
    parts: [
      { name: "glass", what: "the big number and unit, and a frosted list in tall and large" },
      { name: "pattern", what: "the same over a slow pattern in the topic's two tints" },
      { name: "ring", what: "a progress ring with the value inside; tall and large add the open items" },
      { name: "list", what: "a tick list; the first done items fold into one line" },
      { name: "label / value / unit / items / done / progress", what: "the consumer's data" },
      { name: "note", what: "the handwritten Anchor, in the widget" },
      { name: "bleed", what: "this screen's one break to the edge" },
    ],
    rules: [
      { do: "One widget is one answer: the ring is the progress, the list is the list." },
      { do: "Put the note next to its subject: the number in glass and pattern, the label in ring and list." },
      { do: "Fold finished items into one line (3 checked)." },
      { do: "bleed on at most one screen in three.", dont: "Never bleed in the header zone, and never over readable content." },
    ],
    specs: [
      { label: "sizes", value: "small 170x170, wide 360x170, tall 170x376, large 360x376" },
      { label: "radius / padding", value: "radius-widget 26, widget-pad 16" },
      { label: "value", value: "52px mono with tabular numerals in wide and large, 46px in small and tall" },
      { label: "label", value: "11px mono, 600, .14em, uppercase, in the topic colour" },
      { label: "ground", value: "linear 160deg, 70% of the topic ground toward #090b0f, with a 1px edge at 16% of the accent" },
      { label: "list panel", value: "radius-panel 14, backdrop blur 10px, rows 14px with a 1px #1a212b divider" },
      { label: "bleed", value: "radius 0 0 28px 28px, -16px side margins, no side border" },
      { label: "busy cost", value: "pattern 2, ring 1, glass 0, list 0" },
    ],
    a11y: [
      "Every widget carries its answer as text: the value and unit, never only the ring or the pattern.",
      "Text stays on the widget's ground or its frosted panel, never on the moving shapes.",
      "A folded line says 3 checked in words, so the tick circles are not the only signal.",
    ],
    related: ["topic", "anchor", "pattern", "pagedots"],
  },

  phasering: {
    when: "A loop as six phases, when the ring itself is the progress and not decoration round it.",
    parts: [
      { name: "phase", what: "recognised, planned, busy, you, check, done (code key of the first phase: seen)" },
      { name: "progress", what: "0 to 1 within the current phase" },
      { name: "labels", what: "the six phase names round the ring" },
      { name: "pen", what: "a hand-drawn circle round the current label" },
      { name: "center", what: "none, glass, pattern or word (a ThemeWord, theme default frozen)" },
      { name: "eyebrow / title / sub", what: "the words in the middle" },
    ],
    rules: [
      { do: "Phase colours are fixed and do not follow the topic." },
      { do: "Finished phases stay full in their own colour; later ones are grey." },
      { do: "Pick one center.", dont: "Never stack a glass disc and a word in the same middle." },
      { do: "Count the ring as 2 toward the busy budget, and a ThemeWord middle as 3 on top." },
    ],
    specs: [
      { label: "phases", value: "recognised #a78bfa, planned #7dd3fc, busy #2ee6d6, you #f0abfc, check #fbbf24, done #4ade80" },
      { label: "ring parts", value: "phase-track #1e2a3a for the unspent part, phase-rest #2a323d for phases to come, phase-grain #e0f2fe for the grain" },
      { label: "earlier phases", value: "full colour at 80%" },
      { label: "hourglass", value: "the sand piles up at the end of the segment, a white dot marks its edge, the grain falls toward it" },
      { label: "size", value: "default 220; LoopScreen passes 268" },
      { label: "done", value: "at progress 1 all six light" },
      { label: "busy cost", value: "2" },
    ],
    a11y: [
      "Each segment carries its mono label, so a phase is never the colour alone.",
      "The current phase label is white and bold, the rest stay dim; the labels read on bg.",
      "Reduced motion: drawn once at its end state, no grain, never a half-drawn circle.",
    ],
    related: ["loopscreen", "themeword", "widget", "topic"],
  },

  loopscreen: {
    when: "One loop in detail, as a whole screen.",
    parts: [
      { name: "PhaseRing", what: "268px with its six labels round it, the ring at 29%" },
      { name: "eyebrow", what: "when, mono caps" },
      { name: "title", what: "the loop's title in a gradient toward the phase colour" },
      { name: "sub", what: "the line under the title" },
      { name: "NOW card", what: "glass, the phase word, the now text and a dot per phase" },
      { name: "PageDots", what: "vertical, on the right, the streak from this phase's colour to the next" },
    ],
    rules: [
      { do: "The pen circle round the current label is the screen's one pen mark.", dont: "Never add a second mark; pen={false} leaves it out." },
      { do: "Done is glass, In Loops is ghost: one clear action." },
      { do: "Confetti once at done.", dont: "Never confetti when motion is reduced." },
      { do: "Pick one middle: none, glass, pattern or the title as a frozen ThemeWord." },
    ],
    specs: [
      { label: "ring", value: "268px, progress 29% in the preview, labels round it" },
      { label: "NOW card", value: "glass, radius 20, a dot per phase, done dots in --accent" },
      { label: "PageDots", value: "vertical on the right, the active streak from this phase's colour to the next" },
      { label: "busy", value: "ring 2 + pen 1, + 1 for confetti at done" },
      { label: "title gradient", value: "180deg from --fg to the phase colour, clipped to the text" },
      { label: "preview data", value: "phase planned, progress .35, when In 16 hours" },
    ],
    a11y: [
      "The six phase labels are text: a screen reader hears the phase by name.",
      "Confetti fires once, and never when motion is reduced.",
      "The title gradient starts at --fg, so the words stay readable toward the phase colour.",
    ],
    related: ["phasering", "pagedots", "pen", "themeword"],
  },

  pen: {
    demos: [
      { label: "Circle", code: `() => h("p", { style: { fontSize: 17, margin: "12px 0" } }, "The dentist moved you to ", h(Pen, { kind: "circle" }, "14:00"), " on Tuesday.")` },
      { label: "Underline", code: `() => h("p", { style: { fontSize: 17, margin: "12px 0" } }, "Pay ", h(Pen, { kind: "underline" }, "before Friday"), ", or the fine doubles.")` },
      { label: "Check", code: `() => h("p", { style: { fontSize: 17, margin: "12px 0", paddingLeft: 24 } }, h(Pen, { kind: "check" }, "Bins out"), " for this week.")` },
      { label: "Strike", code: `() => h("p", { style: { fontSize: 17, margin: "12px 0" } }, "Milk, ", h(Pen, { kind: "strike" }, "bread"), ", apples.")` },
    ],
    when: "One mark on one piece of text, where a hand would have circled, underlined or ticked it.",
    parts: [
      { name: "kind", what: "circle, check, strike, underline, mark, arrow, bracket, box, spotlight, pulse, star, number" },
      { name: "look", what: "pen, clean, neon or marker" },
      { name: "smoothness / open / tilt", what: "how hand-drawn the mark is" },
      { name: "colour", what: "the topic's --k" },
    ],
    rules: [
      { do: "One pen mark per screen; the Anchor does not count.", dont: "Never two: a second one is drawn plain and warns." },
      { do: "Use strike only in tick lists.", dont: "Never draw over a label." },
      { do: "Over the busy budget (5) the pen turns clean." },
      { do: "spotlight needs a parent with overflow hidden (a card).", dont: "Never spotlight on the page: it dims everything." },
    ],
    specs: [
      { label: "kinds", value: "circle, check, strike, underline, mark (highlighter on the baseline), arrow, bracket, box, spotlight, pulse, star, number (n)" },
      { label: "looks", value: "pen busy 1, clean 0, neon 2, marker 1" },
      { label: "smoothness", value: ".45 by default: by hand, flowing, just not neat" },
      { label: "open", value: ".14: how far the end of a loop lands beside its start" },
      { label: "tilt", value: "-4 degrees; clean sets open and tilt to 0" },
      { label: "placement", value: "an SVG layer over the text, pointer-events none" },
    ],
    a11y: [
      "The mark sits over text that already says the thing: it is never the only signal.",
      "Strike-through is used only in tick lists, where the tick also says done.",
      "Reduced motion: the mark is drawn once, fully, never mid-stroke.",
    ],
    related: ["anchor", "phasering", "word"],
  },

  anchor: {
    when: "The one personal note on a screen she builds for someone, beside the thing it is about.",
    parts: [
      { name: "words", what: "the note itself, in handwriting" },
      { name: "colour", what: "the topic's pen colour, --k" },
      { name: "placement", what: "anchor-reach to its subject, anchor-clear from lines" },
      { name: "plain", what: "the dim fallback when a second anchor appears" },
    ],
    rules: [
      { do: "Exactly one per screen; Widget renders one for you with note." },
      { do: "Keep it within 24px of its subject and 8px clear of lines and labels." },
      { do: "It adds the personal thing, like home-baked or for the neighbour.", dont: "Never repeat a fact from the sub line, the list or her sentence." },
      { do: "No fill under it." },
    ],
    specs: [
      { label: "type", value: "Caveat 700 at 20.8px on a 1 line height" },
      { label: "tilt / opacity", value: "-3 degrees, opacity .9" },
      { label: "colour", value: "the topic's --k; fg and dim read on every ground" },
      { label: "anchor-reach", value: "24px from its subject" },
      { label: "anchor-clear", value: "8px from any line or label" },
      { label: "fallback", value: "Caveat stylesheet on the page (Google Fonts family=Caveat:wght@700), else Bradley Hand; a second anchor renders 13px --dim with a 6px left margin" },
    ],
    a11y: [
      "Handwriting is text: a screen reader reads the words like any other line.",
      "The words must stand on their own, since they add a fact the rest of the screen does not carry.",
      "The fallback face keeps the line readable when Caveat is not loaded, and -3 degrees keeps it legible at 20.8px.",
    ],
    related: ["widget", "pen", "topic"],
  },

  word: {
    demos: [
      { label: "Gradient, a loop done", code: `() => h(Word, { text: "Done", effect: "gradient", topic: "loop", level: 0.6, height: 100 })` },
      { label: "Fill, how far the list is", code: `() => h(Word, { text: "3 / 8", effect: "fill", topic: "groceries", level: 0.6, height: 100 })` },
      { label: "Wave, a parcel on the way", code: `() => h(Word, { text: "On the way", effect: "wave", topic: "parcel", level: 0.6, height: 100 })` },
      { label: "Outline, the weather", code: `() => h(Word, { text: "Rain", effect: "outline", topic: "weather", level: 0.6, height: 100 })` },
      { label: "Stamp, delivered", code: `() => h(Word, { text: "Delivered", effect: "stamp", topic: "parcel", level: 0.6, height: 100 })` },
    ],
    when: "One big word for a moment: a done moment, a number, a name.",
    parts: [
      { name: "effect", what: "gradient, pop, wave, shine, neon, echo, fill, split, lanes, tiles, stretch, outline, long-shadow, stamp" },
      { name: "theme", what: "frozen, fire, autumn: their own colours" },
      { name: "level", what: "0 to 1, for the fill effect" },
      { name: "ground", what: "the topic ground pulled toward bg" },
    ],
    rules: [
      { do: "One effect per word." },
      { do: "Keep it short for tiles, echo and long shadow." },
      { do: "Count a Word as 3 toward the busy budget: with a Word a screen has 2 points left." , dont: "Never use a Word and a pattern hero on one screen." },
      { do: "Let the whole word stay inside its photo when it sits behind a person." },
    ],
    specs: [
      { label: "height", value: "120 by default; the previews pass 100" },
      { label: "busy cost", value: "3" },
      { label: "contrast guard", value: "every letter colour is lightened in 15% steps until it reaches 4.5:1 on its ground" },
      { label: "themes", value: "frozen on #081a34 (letters white to #38bdf8), fire on #1c0d0b (letters #fde68a to #dc2626), autumn on #1f140a (letters #fbbf24 to #c2410c)" },
      { label: "guard in practice", value: "fire's #dc2626 (3.9:1) and autumn's #c2410c (3.5:1) are lifted to 4.5:1" },
      { label: "beat", value: "effects run on 125 bpm" },
      { label: "behind a person", value: "stays at least 65% visible (text-behind-person), and the whole word stays inside the photo" },
    ],
    a11y: [
      "Every letter colour is lifted to 4.5:1 on its ground, so contrast never rests on the theme's deep stop.",
      "Text behind a person stays at least 65% visible; more than a third covered and it stops being a word.",
      "Reduced motion: drawn once at its end state, never a letter mid-pop.",
    ],
    related: ["themeword", "pattern", "topic"],
  },

  themeword: {
    when: "A word that carries one element or season, or the middle of a loop screen.",
    parts: [
      { name: "text / theme / height", what: "what the consumer passes to Word with theme set" },
      { name: "frozen", what: "frost and icicles on #081a34, letters white to #38bdf8" },
      { name: "fire", what: "flames on #1c0d0b, letters #fde68a to #dc2626" },
      { name: "autumn", what: "falling leaves on #1f140a, letters #fbbf24 to #c2410c" },
    ],
    rules: [
      { do: "Treat it as a Word: one effect, one big word per screen." },
      { do: "Count it as 3 toward the busy budget." , dont: "Never count it twice when it sits in a PhaseRing or LoopScreen middle." },
      { do: "Pick the theme that matches the moment.", dont: "Never mix themes on one screen." },
    ],
    specs: [
      { label: "grounds", value: "word-frozen #081a34, word-fire #1c0d0b, word-autumn #1f140a" },
      { label: "contrast guard", value: "same as Word: every letter colour is lifted in 15% steps to 4.5:1 on its ground" },
      { label: "busy cost", value: "3" },
      { label: "height", value: "Word's default 120; the previews pass 100" },
      { label: "preview words", value: "Frost, Hot, Autumn" },
    ],
    a11y: [
      "The guard lifts the deep stop of fire and autumn, so the last letters stay readable.",
      "The same rule as Word holds: never behind text that must be read, at least 65% visible behind a person.",
      "Reduced motion: drawn once at its end state.",
    ],
    related: ["word", "phasering", "loopscreen"],
  },

  pattern: {
    when: "A moving fill behind a card, a header band or a screen strip, in the topic's two tints.",
    parts: [
      { name: "kind", what: "lanes, grid, bubbles, band, rain, drift: the widget motor, shapes at about 30% opacity" },
      { name: "recipe", what: "the full PatternsLab motor: the 13 layouts, 9 shapes, camera, depth and confetti on the big beat" },
      { name: "topic / colors", what: "--k and --k2, or the two tints passed in" },
      { name: "children", what: "they sit on a frosted panel over the pattern" },
    ],
    rules: [
      { do: "One pattern per screen, and count it as 2." , dont: "Never a pattern with a Word hero." },
      { do: "Keep text on the frosted panel.", dont: "Never put a pattern under text that must be read." },
      { do: "Use --k2 for shapes only.", dont: "Never let a shape be the only signal of anything." },
      { do: "Both motors run on the 125 bpm beat; still is one calm frame." },
    ],
    specs: [
      { label: "kinds", value: "lanes, grid, bubbles, band, rain, drift" },
      { label: "recipe layouts", value: "lanes, grid, lanes-round, bubbles, rain, keys, band, scan, drift, eq, spiral, swarm, wave (13 of them)" },
      { label: "recipe fields", value: "layout, shapes, background, palette, density, pop, fill, confetti" },
      { label: "recipe box", value: "16:9, clamped on the way in (Pattern.recipe), ranges in systems.md" },
      { label: "shape opacity", value: "about 30%" },
      { label: "ground", value: "the topic's --kd" },
      { label: "busy cost", value: "2" },
    ],
    a11y: [
      "Children sit on a frosted panel, so no text lies on the moving shapes.",
      "Reduced motion: still shows one calm frame, never a half animation.",
      "The pattern is decoration: the label, the word or the number still says what the screen is about.",
    ],
    related: ["widget", "word", "topic"],
  },

  cover: {
    when: "The one title card of a set, chapter or share image: the word on the left, the look on the right.",
    parts: [
      { name: "title block", what: "the big word and the line under it, at the 40px margin" },
      { name: "stack", what: "three glass blocks in a staggered arrangement" },
      { name: "pills", what: "one accent pill and one violet pill" },
      { name: "ring", what: "her orb as a literal motif, built from discs" },
    ],
    rules: [
      { do: "One word on the left, the stack on the right.", dont: "Never put text over the stack." },
      { do: "Keep the ring a ring.", dont: "Never a filled circle, never a face." },
      { do: "Use --accent and --violet only, as flat fills." , dont: "Never a gradient or a neon edge as a UI accent." },
    ],
    specs: [
      { label: "format", value: "960 x 300" },
      { label: "title", value: "120px, line height .92, weight 700, --fg" },
      { label: "sub", value: "14px --dim, 12px under the title" },
      { label: "blocks", value: "radius-card 18, gap 12, blocks 200x132, 192x64 and 192x152" },
      { label: "pills", value: "accent 200x40 radius 20, violet 96x32 radius 16" },
      { label: "ring", value: "violet disc r 52, accent disc r 30 at opacity .9, --bg disc r 28 on top, all radius-pill" },
      { label: "margins", value: "40px left and bottom for the text block, gutter 16" },
      { label: "shadows", value: "none: light on the edge, glass and a 1px --edge stroke" },
    ],
    a11y: [
      "The title and the sub line are real text: they say what the set is.",
      "The discs and pills are decoration with no text in them, and the cover keeps its meaning without the ring.",
      "Keep contrast: --fg on --bg and --dim read at the same values as every other surface.",
    ],
    related: ["orb", "topic", "widget"],
  },
};
