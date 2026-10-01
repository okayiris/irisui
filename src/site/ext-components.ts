// The parts this project added to the design system, as the site needs them: a page each, with props, variants
// and the code behind every frame. The parts themselves live in src/ds/ext.tsx and ship as /ds/ext.js.
//
// They exist because the system had no menu, a dialog, a sheet, a
// snackbar, a tooltip, a badge, a slider, a multi-line field, a select, a search field, tabs, steps, an empty
// state or a divider. Each one is built from the system's own tokens and takes the house Button.

import type { Component } from "./parse";
import { extDocs } from "./ext-docs";

type Spec = {
  name: string;
  group: string;
  height: number;
  summary: string;
  props: { name: string; type: string; required?: boolean }[];
  variants: { label: string; code: string }[];
};

const SPECS: Spec[] = [
  {
    name: "Menu",
    group: "Controls",
    height: 260,
    summary: "A list of choices on its own surface: a filter, a sort, a set of actions, anchored to the thing it belongs to.",
    props: [
      { name: "items", type: "MenuItem[]", required: true },
      { name: "label", type: "string" },
      { name: "trigger", type: "ReactNode" },
      { name: "side", type: "'start' | 'end'" },
      { name: "align", type: "'start' | 'end'" },
    ],
    variants: [
      {
        label: "Sort and filter",
        code: `() => {
  const [picked, setPicked] = React.useState(null);
  return h("div", { style: { minHeight: 250 } },
    h(Menu, { label: "Sort", defaultOpen: true, items: [
      { label: "Newest first", checked: picked === "Newest first", onSelect: () => setPicked("Newest first") },
      { label: "By name", checked: picked === "By name", onSelect: () => setPicked("By name") },
      { kind: "label", label: "Show" },
      { label: "Only unread", checked: picked === "Only unread", onSelect: () => setPicked("Only unread") },
      { kind: "sep" },
      { label: "Delete all", danger: true, onSelect: () => setPicked("Delete all") },
    ] }));
}`,
      },
      {
        label: "A menu on a Row",
        code: `() => h(Row, { icon: h(Icon, { name: "wave" }), title: "Voice", subtitle: "Dutch, warm and clear", trailing: h(Menu, { label: "Alex", align: "end", items: [ { label: "Alex", checked: true }, { label: "Calmer" }, { label: "No voice" } ] }) })`,
      },
    ],
  },
  {
    name: "Dialog",
    group: "Overlays",
    height: 340,
    summary: "The one place Iris interrupts: a decision that cannot wait, with the action that matters first.",
    props: [
      { name: "open", type: "boolean", required: true },
      { name: "onClose", type: "() => void" },
      { name: "title", type: "string", required: true },
      { name: "body", type: "string" },
      { name: "actions", type: "{ label: string; variant?: string; onClick?: () => void; danger?: boolean }[]" },
    ],
    variants: [
      {
        label: "Unpair, a destructive decision",
        code: `() => { const [open, setOpen] = React.useState(true);
  return h(Dialog, { open, onClose: () => setOpen(false), title: "Unpair this device?",
    body: "She stops listening and talking here. Everything she stored stays in your vault.",
    actions: [ { label: "Keep it" }, { label: "Unpair", variant: "danger" } ] }); }`,
      },
      {
        label: "A waiting question",
        code: `() => { const [open, setOpen] = React.useState(true);
  return h(Dialog, { open, onClose: () => setOpen(false), title: "Send this to Alex?",
    body: "The list for Saturday, with the two things you added.",
    actions: [ { label: "Send it" }, { label: "Not yet", variant: "ghost" } ] }); }`,
      },
    ],
  },
  {
    name: "Sheet",
    group: "Overlays",
    height: 380,
    summary: "Secondary content anchored to an edge: the bottom on a phone, the side on a wide window.",
    props: [
      { name: "open", type: "boolean", required: true },
      { name: "onClose", type: "() => void" },
      { name: "title", type: "string" },
      { name: "sub", type: "string" },
      { name: "side", type: "'bottom' | 'end'" },
      { name: "children", type: "ReactNode" },
    ],
    variants: [
      {
        label: "Bottom, choosing a voice",
        code: `() => { const [open, setOpen] = React.useState(true); const [voice, setVoice] = React.useState("Alex");
  const pick = (title, subtitle) => h(Row, { key: title, title, subtitle, onClick: () => setVoice(title),
    trailing: voice === title ? h("span", { "aria-label": "Chosen", style: { color: "var(--accent)", fontSize: 17 } }, "✓") : null });
  return h(Sheet, { open, onClose: () => setOpen(false), title: "Voice", sub: "How she sounds on this device",
    children: [ pick("Alex", "Dutch, warm and clear"), pick("Calmer", "Dutch, softer"), pick("No voice", "She only writes here") ] }); }`,
      },
      {
        label: "Side, on a wide window",
        code: `() => { const [open, setOpen] = React.useState(true);
  return h(Sheet, { open, onClose: () => setOpen(false), side: "end", title: "Details", sub: "The invoice she read",
    children: [ h(Card, { key: "a" }, h("div", { style: { fontSize: 17 } }, "Van Dijk Contractors"), h("div", { style: { fontSize: 12, color: "var(--dim)", marginTop: 3 } }, "€ 1.240,00 · 14 days")),
      h(Card, { key: "b" }, h("div", { style: { fontSize: 17 } }, "Two prices to compare"), h("div", { style: { fontSize: 12, color: "var(--dim)", marginTop: 3 } }, "She marked the difference")) ] }); }`,
      },
    ],
  },
  {
    name: "Snackbar",
    group: "Feedback",
    height: 200,
    summary: "What happened next, next to the thing it happened to: one line and at most one action.",
    props: [
      { name: "text", type: "string", required: true },
      { name: "tone", type: "'accent' | 'ok' | 'wait' | 'error'" },
      { name: "action", type: "string" },
      { name: "onAction", type: "() => void" },
    ],
    variants: [
      { label: "Done", code: `() => h(Snackbar, { text: "Added to the list for Saturday", tone: "ok" })` },
      {
        label: "With undo",
        code: `() => h(Snackbar, { text: "Three mails archived", tone: "accent", action: "Undo", onAction: () => {} })`,
      },
      { label: "Waiting", code: `() => h(Snackbar, { text: "Reading the invoice", tone: "wait" })` },
      { label: "Failed", code: `() => h(Snackbar, { text: "No connection to the house", tone: "error", action: "Try again", onAction: () => {} })` },
    ],
  },
  {
    name: "Tooltip",
    group: "Feedback",
    height: 200,
    summary: "The name of a thing that is only an icon, on hover and on focus.",
    props: [
      { name: "label", type: "string", required: true },
      { name: "children", type: "ReactNode", required: true },
      { name: "delay", type: "number" },
    ],
    variants: [
      {
        label: "On an icon button",
        code: `() => h("div", { style: { paddingTop: 60 } }, h(Tooltip, { label: "Read it out", open: true }, h(Button, { variant: "icon", label: "Read it out", icon: h(Icon, { name: "speaker", size: 18 }) })))`,
      },
    ],
  },
  {
    name: "Badge",
    group: "Navigation",
    height: 180,
    summary: "A count or a dot on the thing it belongs to: a tab, an icon, a word.",
    props: [
      { name: "children", type: "ReactNode", required: true },
      { name: "count", type: "number" },
      { name: "dot", type: "boolean" },
      { name: "tone", type: "'accent' | 'violet' | 'error'" },
      { name: "max", type: "number" },
    ],
    variants: [
      {
        label: "Count, dot and a capped count",
        code: `() => h("div", { style: { display: "flex", gap: 30, alignItems: "center", paddingTop: 8 } },
    h(Badge, { count: 3 }, h(Button, { variant: "icon", label: "Loops, 3 new", icon: h(Icon, { name: "loop", size: 18 }) })),
    h(Badge, { dot: true }, h(Button, { variant: "icon", label: "Camera, something new", icon: h(Icon, { name: "camera", size: 18 }) })),
    h(Badge, { count: 128, max: 99 }, h(Button, { variant: "icon", label: "Calls, 128 missed", icon: h(Icon, { name: "phone", size: 18 }) })))`,
      },
    ],
  },
  {
    name: "Slider",
    group: "Controls",
    height: 200,
    summary: "One value on a line: how much, how far, how loud.",
    props: [
      { name: "value", type: "number" },
      { name: "onChange", type: "(v: number) => void" },
      { name: "min", type: "number" },
      { name: "max", type: "number" },
      { name: "step", type: "number" },
      { name: "label", type: "string" },
      { name: "unit", type: "string" },
      { name: "format", type: "(v: number) => string" },
    ],
    variants: [
      {
        label: "How far she listens",
        code: `() => { const [v, setV] = React.useState(60); return h("div", { style: { display: "grid", gap: 18 } },
    h(Slider, { value: v, onChange: setV, label: "Listening distance", unit: "m" }),
    h("div", { style: { fontSize: 13, color: "var(--dim)" } }, v > 75 ? "Far: she hears the whole house" : v < 25 ? "Near: only right in front of the phone" : "About a room")); }`,
      },
      {
        label: "In a topic",
        code: `() => { const [v, setV] = React.useState(3); return h(Topic, { name: "health" }, h(Slider, { value: v, onChange: setV, min: 1, max: 7, label: "Walks a week", format: (n) => n + "×" })); }`,
      },
    ],
  },
  {
    name: "TextArea",
    group: "Controls",
    height: 240,
    summary: "The multi-line field: a note, a message, anything longer than a line.",
    props: [
      { name: "label", type: "string" },
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
      { name: "placeholder", type: "string" },
      { name: "rows", type: "number" },
      { name: "maxLength", type: "number" },
    ],
    variants: [
      {
        label: "A note to her",
        code: `() => { const [v, setV] = React.useState("The bin must go out by 8 on Tuesday"); return h("div", { style: { display: "grid", gap: 10 } },
    h(TextArea, { label: "What should she remember?", value: v, onChange: setV, rows: 3, maxLength: 280 }),
    h("div", { style: { fontSize: 12, color: "var(--label)", fontFamily: "var(--mono)" } }, v.length + " / 280")); }`,
      },
    ],
  },
  {
    name: "Select",
    group: "Controls",
    height: 200,
    summary: "One choice out of a few, in the shape of the fields around it.",
    props: [
      { name: "label", type: "string" },
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
      { name: "options", type: "(string | { value: string; label: string })[]", required: true },
    ],
    variants: [
      {
        label: "A language",
        code: `() => { const [v, setV] = React.useState("nl");
  return h(Select, { label: "She talks to you in", value: v, onChange: setV, options: [ { value: "nl", label: "Nederlands" }, { value: "en", label: "English" }, { value: "de", label: "Deutsch" } ] }); }`,
      },
    ],
  },
  {
    name: "SearchField",
    group: "Controls",
    height: 320,
    summary: "Finding something: a pill field that says what it is doing and clears itself.",
    props: [
      { name: "value", type: "string" },
      { name: "onChange", type: "(v: string) => void" },
      { name: "placeholder", type: "string" },
      { name: "busy", type: "boolean" },
      { name: "children", type: "ReactNode" },
    ],
    variants: [
      {
        label: "With results",
        code: `() => { const [v, setV] = React.useState("dentist"); const hits = ["Dentist, Tuesday 14:00", "Dentist: confirmation", "Call the dentist"];
  return h(SearchField, { value: v, onChange: setV, placeholder: "Search your house", busy: false },
    v ? hits.filter((x) => x.toLowerCase().includes(v.toLowerCase())).map((x, i) => h("button", { key: i, type: "button", className: "ix-menu-item ix-hit" }, h("span", null, x))) : null); }`,
      },
      { label: "While she looks", code: `() => h(SearchField, { value: "when will the parcel arrive", onChange: () => {}, busy: true })` },
      {
        label: "Nothing found",
        code: `() => h(SearchField, { value: "xyz", onChange: () => {} },
    h("div", { className: "ix-results-empty" }, h("strong", null, "Nothing by that name"), h("span", null, "Try a subject, a person or a date. She searches everything you kept.")))`,
      },
    ],
  },
  {
    name: "Tabs",
    group: "Navigation",
    height: 200,
    summary: "A few angles on one thing, under its title, with the ink sliding to the active one.",
    props: [
      { name: "items", type: "string[]", required: true },
      { name: "active", type: "number" },
      { name: "onSelect", type: "(i: number) => void" },
    ],
    variants: [
      {
        label: "Three angles",
        code: `() => { const [i, setI] = React.useState(0); return h("div", { style: { display: "grid", gap: 14 } },
    h(Tabs, { items: ["Today", "Loops", "Kept"], active: i, onSelect: setI }),
    h("div", { role: "tabpanel", style: { fontSize: 15 } }, ["The dentist at 9:30, lunch with Tom at 13:00", "Six loops, two waiting on you", "Twelve things she kept for you"][i])); }`,
      },
    ],
  },
  {
    name: "Steps",
    group: "Navigation",
    height: 200,
    summary: "Where you are in a short flow, and what is still coming.",
    props: [
      { name: "items", type: "string[]", required: true },
      { name: "active", type: "number" },
    ],
    variants: [
      { label: "Halfway", code: `() => h(Steps, { items: ["House", "Voice", "Devices", "Done"], active: 2 })` },
      { label: "At the end", code: `() => h(Steps, { items: ["House", "Voice", "Devices", "Done"], active: 3 })` },
    ],
  },
  {
    name: "EmptyState",
    group: "Feedback",
    height: 300,
    summary: "Nothing here yet, said properly: what this place is for and the one thing to do about it.",
    props: [
      { name: "title", type: "string", required: true },
      { name: "line", type: "string" },
      { name: "action", type: "{ label: string; onClick?: () => void }" },
      { name: "children", type: "ReactNode" },
    ],
    variants: [
      {
        label: "Nothing kept yet",
        code: `() => h(EmptyState, { title: "Nothing kept yet", line: "When she finds something worth keeping, it lands here and stays yours.", action: { label: "Ask her something" } })`,
      },
      {
        label: "No loops yet",
        code: `() => h(Topic, { name: "home" }, h(EmptyState, { title: "No loops yet", line: "A loop is one thing that comes back: the bins, a bill, a birthday." }))`,
      },
    ],
  },
  {
    name: "Toolbar",
    group: "Navigation",
    height: 200,
    summary: "A bar of actions that belong together, docked in a screen or floating over the content.",
    props: [
      { name: "items", type: "ToolbarItem[]" },
      { name: "title", type: "string" },
      { name: "variant", type: "'docked' | 'floating'" },
      { name: "trailing", type: "ReactNode" },
    ],
    variants: [
      {
        label: "Docked, in a screen",
        code: `() => { const [unread, setUnread] = React.useState(true);
  return h(Toolbar, { title: "This week", items: [
    { label: "New", icon: h(Icon, { name: "sparkles", size: 16 }) },
    { label: "Only unread", active: unread, onSelect: () => setUnread(!unread) },
  ] }); }`,
      },
      {
        label: "Floating over content",
        code: `() => h(Toolbar, { variant: "floating", items: [
    { label: "Read out", icon: h(Icon, { name: "speaker", size: 16 }), active: true },
    { label: "Keep" },
    { label: "Delete", danger: true },
  ] })`,
      },
    ],
  },
  {
    name: "DatePicker",
    group: "Controls",
    height: 420,
    summary: "A month you pick a day in: one accent on the chosen day, today marked with a ring.",
    props: [
      { name: "value", type: "string" },
      { name: "onChange", type: "(day: string) => void" },
      { name: "year", type: "number" },
      { name: "month", type: "number" },
      { name: "min", type: "string" },
      { name: "max", type: "string" },
      { name: "label", type: "string" },
      { name: "showToday", type: "boolean" },
    ],
    variants: [
      {
        label: "Pick a day",
        code: `() => { const [day, setDay] = React.useState("2026-10-01");
  return h(DatePicker, { value: day, onChange: setDay, label: "When should she remind you?" }); }`,
      },
      {
        label: "Within two weeks",
        code: `() => { const [day, setDay] = React.useState("2026-10-06");
  return h(DatePicker, { value: day, onChange: setDay, min: "2026-10-01", max: "2026-10-14", label: "Only the next two weeks" }); }`,
      },
    ],
  },
  {
    name: "TimePicker",
    group: "Controls",
    height: 380,
    summary: "A time you set with two strips: the hour, then the minute. The chosen time reads big, in mono.",
    props: [
      { name: "value", type: "string" },
      { name: "onChange", type: "(time: string) => void" },
      { name: "step", type: "number" },
      { name: "label", type: "string" },
    ],
    variants: [
      {
        label: "Pick a time",
        code: `() => { const [t, setT] = React.useState("14:30");
  return h(TimePicker, { value: t, onChange: setT, label: "When should the bins go out?" }); }`,
      },
      {
        label: "Every quarter hour",
        code: `() => { const [t, setT] = React.useState("09:45");
  return h(TimePicker, { value: t, onChange: setT, step: 15, label: "A reminder" }); }`,
      },
    ],
  },
  {
    name: "AppBar",
    group: "Navigation",
    height: 260,
    summary: "The top line of a screen or a window: what this is, and the few actions that belong to it.",
    props: [
      { name: "title", type: "string", required: true },
      { name: "sub", type: "string" },
      { name: "leading", type: "ReactNode" },
      { name: "actions", type: "ReactNode" },
      { name: "variant", type: "'small' | 'large'" },
      { name: "children", type: "ReactNode" },
    ],
    variants: [
      {
        label: "Small, with actions",
        code: `() => h("div", null,
    h(AppBar, { title: "Bins", sub: "A loop, every Tuesday", leading: h(Button, { variant: "icon", label: "Back", icon: h("span", { style: { display: "inline-flex", transform: "scaleX(-1)" } }, h(Icon, { name: "chevron", size: 18 })) }),
      actions: h(Button, { variant: "icon", label: "Talk about this loop", icon: h(Icon, { name: "mic", size: 18 }) }) }),
    h(Card, { style: { margin: 16 } }, h(Row, { title: "Next time", subtitle: "Tuesday 6 Oct, out by 8" }), h(Row, { title: "Who", subtitle: "You, she reminds you at 7" })))`,
      },
      {
        label: "Large, the title of a screen",
        code: `() => h(AppBar, { variant: "large", title: "This week", sub: "Six loops, two waiting on you",
      actions: h(Button, { variant: "icon", label: "New loop", icon: h(Icon, { name: "sparkles", size: 18 }) }) })`,
      },
    ],
  },
  {
    name: "NavRail",
    group: "Navigation",
    height: 320,
    summary: "The wide-window version of the tab bar: a rail of sections that collapses to icons.",
    props: [
      { name: "items", type: "RailItem[]" },
      { name: "collapsed", type: "boolean" },
      { name: "onToggle", type: "() => void" },
      { name: "trailing", type: "ReactNode" },
      { name: "label", type: "string" },
    ],
    variants: [
      {
        label: "Expanded",
        code: `() => { const [at, setAt] = React.useState(0);
  const items = [["Iris", "sparkles"], ["Loops", "loop"], ["Camera", "camera"], ["You", "person"]];
  return h(NavRail, { items: items.map(([label, name], i) => ({ label, icon: h(Icon, { name, size: 16 }), active: i === at, onSelect: () => setAt(i) })),
    trailing: h("span", { style: { fontSize: 12, color: "var(--dim)", padding: "0 10px" } }, "On this device") }); }`,
      },
      { label: "Collapsed", code: `() => h(NavRail, { collapsed: true, items: [["Iris", "sparkles"], ["Loops", "loop"], ["Camera", "camera"], ["You", "person"]].map(([label, name], i) => ({ label, icon: h(Icon, { name, size: 16 }), active: i === 1 })) })` },
    ],
  },
  {
    name: "SplitButton",
    group: "Controls",
    height: 220,
    summary: "One action, and the caret that opens the others that belong to it.",
    props: [
      { name: "children", type: "ReactNode", required: true },
      { name: "onSelect", type: "() => void" },
      { name: "items", type: "MenuItem[]", required: true },
      { name: "variant", type: "'primary' | 'accent' | 'glass'" },
      { name: "size", type: "'sm' | 'md' | 'lg'" },
    ],
    variants: [
      {
        label: "Send, or send another way",
        code: `() => h("div", { style: { minHeight: 180 } },
    h(SplitButton, { items: [
      { label: "Send as a mail" },
      { label: "Send as a text" },
      { kind: "sep" },
      { label: "Schedule for tomorrow" },
    ] }, "Send it"))`,
      },
      {
        label: "In a topic",
        code: `() => h(Topic, { name: "parcel" }, h(SplitButton, { size: "sm", variant: "accent", items: [ { label: "Track it" }, { label: "Open the carrier's site" } ] }, "Track parcel"))`,
      },
    ],
  },
  {
    name: "Carousel",
    group: "Surfaces",
    height: 320,
    summary: "A strip of cards you swipe or scroll sideways, with dots that say where you are.",
    props: [
      { name: "children", type: "ReactNode", required: true },
      { name: "gap", type: "number" },
      { name: "snap", type: "'start' | 'center'" },
      { name: "arrows", type: "boolean" },
      { name: "label", type: "string" },
    ],
    variants: [
      {
        label: "Three cards",
        code: `() => h(Carousel, { label: "What is waiting" }, [
    h(Card, { key: 1, style: { padding: 16 } }, h("div", { style: { fontSize: 17 } }, "Dentist"), h("div", { style: { fontSize: 12, color: "var(--dim)", marginTop: 3 } }, "Tuesday 14:00, confirm it")),
    h(Card, { key: 2, style: { padding: 16 } }, h("div", { style: { fontSize: 17 } }, "Parcel"), h("div", { style: { fontSize: 12, color: "var(--dim)", marginTop: 3 } }, "Arrives today between 13 and 15")),
    h(Card, { key: 3, style: { padding: 16 } }, h("div", { style: { fontSize: 17 } }, "Contractor"), h("div", { style: { fontSize: 12, color: "var(--dim)", marginTop: 3 } }, "Compare the quotes")),
  ])`,
      },
      {
        label: "With arrows",
        code: `() => h(Carousel, { arrows: true, label: "This week" }, [0, 1, 2].map((i) => h(Card, { key: i, style: { padding: 16 } }, h("div", { style: { fontSize: 17 } }, ["Monday", "Tuesday", "Wednesday"][i]), h("div", { style: { fontSize: 12, color: "var(--dim)", marginTop: 3 } }, "Three things, one waiting on you"))))`,
      },
    ],
  },
  {
    name: "Mark",
    group: "Brand",
    height: 300,
    summary: "Her ring as a still, sharp mark, from the brand kit's 1024px render with its glow. For a logo, a lock screen, an empty page.",
    props: [
      { name: "size", type: "number" },
      { name: "label", type: "string" },
    ],
    variants: [
      { label: "Lock screen size", code: `h("div", { style: { display: "grid", justifyItems: "center", gap: 18, padding: "36px 16px", maxWidth: 300, borderRadius: 32, background: "var(--glass)", border: "1px solid var(--edge)" } },
    h("div", { style: { font: "200 56px/1 var(--font-text)", fontVariantNumeric: "tabular-nums" } }, "9:41"),
    h(Mark, { size: 64 }),
    h("div", { style: { fontSize: 13, color: "var(--label)" } }, "Look at your phone to open"))` },
      { label: "Three sizes", code: `h("div", { style: { display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", padding: 16 } }, h(Mark, { size: 48 }), h(Mark, { size: 64 }), h(Mark, { size: 96 }))` },
      { label: "Which Iris, how big", code: `h("div", { style: { display: "flex", gap: 36, alignItems: "center", flexWrap: "wrap", padding: 12, font: "var(--text-sub)", color: "var(--dim)" } }, ...[["Orb 22", h(Orb, { size: 22 })], ["Orb 34", h(Orb, { size: 34, state: "listening" })], ["Mark 64", h(Mark, { size: 64 })], ["TalkOrb talking", h(TalkOrb, { size: 120, state: "talking" })], ["TalkOrb thinking", h(TalkOrb, { size: 120, state: "thinking" })], ["Orb3D", h(Orb3D, { size: 180 })]].map(([t, el]) => h("div", { key: t, style: { display: "grid", justifyItems: "center", gap: 10 } }, el, t)))` },
    ],
  },
  {
    name: "Edge",
    group: "Brand",
    height: 300,
    summary: "The apps' light patterns along an edge: round her orb while she thinks, along a screen while it reloads. The TalkOrb and the Orb3D think with it.",
    props: [
      { name: "pattern", type: "'comet' | 'zip' | 'orbit' | 'sparks' | 'flow' | 'party' | 'wave' | 'breathe' | 'heartbeat' | 'aurora'" },
      { name: "colors", type: "string[]" },
      { name: "shape", type: "'ring' | 'rect'" },
      { name: "width", type: "number" },
      { name: "height", type: "number" },
      { name: "radius", type: "number" },
      { name: "stroke", type: "number" },
      { name: "speed", type: "number" },
    ],
    variants: [
      { label: "She thinks, each time another", code: `() => { const [n, setN] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setN((x) => x + 1), 4000); return () => clearInterval(t); }, []);
  return h("div", { style: { display: "flex", gap: 20, alignItems: "center", padding: 16 } },
    h(TalkOrb, { size: 90, state: "thinking", thinking: THINKING[n % THINKING.length] }),
    h("div", { style: { display: "grid", gap: 4 } }, h("div", { style: { fontSize: 17 } }, "Comparing three quotes"), h("div", { style: { fontSize: 13, color: "var(--label)" } }, "Each time she thinks, the light runs another way"))); }` },
      { label: "Round a screen, while it reloads", code: `h("div", { style: { padding: 20 } }, h(Edge, { pattern: "comet", shape: "rect", width: 180, height: 120, radius: 28 }))` },
    ],
  },
  {
    name: "EdgeText",
    group: "Brand",
    height: 220,
    summary: "A word as a neon sign: the Edge light runs along the outline of every letter. SVG and CSS only.",
    props: [
      { name: "text", type: "string", required: true },
      { name: "pattern", type: "'comet' | 'sparks' | 'zip' | 'party'" },
      { name: "colors", type: "string[]" },
      { name: "size", type: "number" },
      { name: "weight", type: "number" },
      { name: "speed", type: "number" },
    ],
    variants: [
      { label: "The word of a big moment", code: `h("div", { style: { padding: 12 } }, h(EdgeText, { text: "Done", pattern: "comet", size: 64 }))` },
    ],
  },
  {
    name: "Divider",
    group: "Surfaces",
    height: 180,
    summary: "A hairline that groups what is above it from what is below.",
    props: [
      { name: "label", type: "string" },
      { name: "inset", type: "boolean" },
    ],
    variants: [
      {
        label: "Plain and inset",
        code: `() => h("div", { style: { display: "grid", gap: 0 } }, h("div", { style: { fontSize: 15 } }, "On this device"), h(Divider, null), h("div", { style: { fontSize: 15 } }, "Blocks and voice"), h(Divider, { inset: true }), h("div", { style: { fontSize: 15 } }, "What she keeps"))`,
      },
      { label: "With a label", code: `() => h(Divider, { label: "Only you can open this" })` },
    ],
  },
  {
    name: "CircleStack",
    group: "Navigation",
    height: 330,
    summary: "Every chat with its loops as a circle, stacked behind the strip: where the loops live now that the iPhone app has no Loops tab.",
    props: [
      { name: "items", type: "Circle[]", required: true },
      { name: "open", type: "boolean" },
      { name: "onOpenChange", type: "(open: boolean) => void" },
      { name: "onSelect", type: "(id: string) => void" },
    ],
    variants: [
      {
        label: "Closed, above the strip",
        code: `() => h("div", { style: { display: "grid", alignContent: "end", minHeight: 150, paddingTop: 30 } },
    h(CircleStack, { items: [
      { id: "debtors", title: "Debtors", line: "Van Dijk is 34 days late", unread: 1, loops: [{ title: "Van Dijk", step: 3 }, { title: "Bakker", step: 2 }] },
      { id: "groceries", title: "Groceries", line: "Saturday delivery, 8 on the list", loops: [{ title: "Groceries", step: 1 }] },
      { id: "renovation", title: "Renovation", line: "Comparing 3 quotes" },
      { id: "dentist", title: "Dentist", line: "Pick a time" },
    ] }),
    h(Card, null, h("div", { style: { fontSize: 15 } }, "The dentist at 9:30, lunch with Tom at 13:00")))`,
      },
      {
        label: "Fanned out",
        code: `() => {
  return h(CircleStack, { open: true, items: [
      { id: "debtors", title: "Debtors", line: "Van Dijk is 34 days late", unread: 1, loops: [{ title: "Van Dijk", step: 3 }, { title: "Bakker", step: 2 }, { title: "Peters", step: 4 }, { title: "Jansen", step: 1 }] },
      { id: "groceries", title: "Groceries", line: "Saturday delivery, 8 on the list", loops: [{ title: "Groceries", step: 1 }] },
      { id: "renovation", title: "Renovation", line: "Comparing 3 quotes" },
      { id: "dentist", title: "Dentist", line: "Pick a time" },
    ] });
}`,
      },
    ],
  },
  {
    name: "LoopBubble",
    group: "Feedback",
    height: 120,
    summary: "One loop, small: its first letter in a disc and the six phases round it, the current one lit.",
    props: [
      { name: "title", type: "string", required: true },
      { name: "step", type: "0 | 1 | 2 | 3 | 4 | 5" },
      { name: "size", type: "number" },
    ],
    variants: [
      {
        label: "Every phase",
        code: `() => h("div", { style: { display: "flex", flexWrap: "wrap", gap: 16, paddingTop: 8 } },
    ["Recognised", "Planned", "Busy", "You", "Check", "Done"].map((t, i) => h("div", { key: t, style: { display: "grid", justifyItems: "center", gap: 6, fontSize: 12, color: "var(--label)" } }, h(LoopBubble, { title: t, step: i }), t)))`,
      },
    ],
  },
  {
    name: "Photo",
    group: "Surfaces",
    height: 450,
    summary:
      "A photo with a depth map: a word behind the person, duotone in the topic's colours, or parallax in four depth layers. No photo ships: without a src it paints its own neutral scene with a matching depth map, and without a depth map it guesses one (lower and central is nearer).",
    props: [
      { name: "alt", type: "string", required: true },
      { name: "src", type: "string" },
      { name: "depth", type: "string" },
      { name: "kind", type: "'back' | 'duotone' | 'parallax'" },
      { name: "word", type: "string" },
      { name: "threshold", type: "number" },
      { name: "topic", type: "TopicName" },
      { name: "ratio", type: "number" },
      { name: "motion", type: "'pointer' | 'scroll'" },
    ],
    variants: [
      {
        label: "The word behind the person",
        code: `() => h("div", { style: { maxWidth: 380 } }, h(Photo, { kind: "back", word: "CALM", alt: "A figure in front of two ridges at dusk" }))`,
      },
      {
        label: "Parallax and duotone",
        code: `() => h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 } },
    h(Photo, { kind: "parallax", alt: "A figure in front of two ridges, moving with the pointer" }),
    h(Photo, { kind: "duotone", topic: "money", alt: "The same scene in the money topic's two colours" }),
    h(Photo, { kind: "duotone", topic: "weather", alt: "The same scene in the weather topic's two colours" }))`,
      },
    ],
  },
  {
    name: "BorderPattern",
    group: "Feedback",
    height: 470,
    summary: "A pattern running along a rounded edge, one per moment: refreshing, listening, thinking, working, speaking, a question waiting, news, saving.",
    props: [
      { name: "pattern", type: "BorderPatternName" },
      { name: "radius", type: "number" },
      { name: "label", type: "string" },
      { name: "children", type: "ReactNode" },
    ],
    variants: [
      {
        label: "All eight, one at a time",
        code: `() => { const all = [["comet", "Refreshing"], ["breathe", "Listening"], ["orbit", "Thinking"], ["sparks", "Working on a loop"], ["wave", "She speaks"], ["stream", "Waits on you"], ["heartbeat", "A new loop"], ["zip", "Saving"]];
  const [p, setP] = React.useState("comet"); const when = all.find((x) => x[0] === p)[1];
  return h("div", { style: { display: "grid", gap: 16, maxWidth: 360 } },
    h(Select, { label: "The moment", value: p, onChange: setP, options: all.map(([value, label]) => ({ value, label })) }),
    h(BorderPattern, { key: p, pattern: p, label: when },
      h("div", { style: { padding: "var(--pad-card)", display: "grid", gap: 4 } }, h("div", { style: { fontSize: 17 } }, "Groceries for Saturday"), h("div", { style: { fontSize: 12, color: "var(--label)" } }, when)))); }`,
      },
      {
        label: "Round a card",
        code: `() => h(BorderPattern, { pattern: "orbit", label: "Iris is thinking" },
    h("div", { style: { padding: "var(--pad-card)", display: "grid", gap: 4 } },
      h("div", { style: { fontSize: 17 } }, "Comparing three quotes"),
      h("div", { style: { fontSize: 12, color: "var(--label)" } }, "Iris is reading the small print")))`,
      },
    ],
  },
  {
    name: "ChatStack",
    group: "Navigation",
    height: 440,
    summary: "Every chat with its loops as a card in its topic's colour, stacked with depth; a tap fans them out, a tap on one opens that chat with its loops and actions.",
    props: [
      { name: "items", type: "ChatCircle[]", required: true },
      { name: "fanned", type: "boolean" },
      { name: "current", type: "string | null" },
      { name: "onSelect", type: "(id: string | null) => void" },
    ],
    variants: [
      {
        label: "At rest, tap to fan out",
        code: `() => h("div", { style: { display: "grid", alignContent: "end", minHeight: 300 } },
    h(ChatStack, { items: [
      { id: "debtors", topic: "money", eyebrow: "Money", title: "Debtors", line: "Van Dijk waits on you", loops: [{ title: "Van Dijk", step: 3 }, { title: "Korenaar", step: 1 }, { title: "Noorderlicht", step: 1 }, { title: "Debtors", step: 1 }] },
      { id: "groceries", topic: "groceries", eyebrow: "Groceries", title: "Groceries", line: "Saturday delivery, 8 on the list", loops: [{ title: "Jumbo", step: 4 }] },
      { id: "renovation", topic: "home", eyebrow: "Home", title: "Renovation", line: "Comparing 3 quotes", loops: [{ title: "Quotes", step: 2 }, { title: "Tiles", step: 1 }] },
      { id: "dentist", topic: "health", eyebrow: "Health", title: "Dentist", line: "Pick a time", loops: [{ title: "Dentist", step: 3 }] },
    ] }))`,
      },
      {
        label: "One chat open",
        code: `() => h(ChatStack, { current: "debtors", items: [
    { id: "debtors", topic: "money", eyebrow: "Money", title: "Debtors", line: "Van Dijk waits on you",
      message: "Only Van Dijk is 34 days late, 4,840 euros. My suggestion: one last reminder with a deadline, and only then a delivery stop.",
      loops: [
        { title: "Debtors", step: 0, line: "the house rules" },
        { title: "Van Dijk", step: 3, line: "34 days late, 4,840 euros" },
        { title: "Korenaar", step: 1, line: "12 days late, 1,210 euros" },
      ],
      actions: [{ label: "Send the reminder", primary: true }] },
    { id: "groceries", topic: "groceries", title: "Groceries", line: "Saturday delivery" },
    { id: "renovation", topic: "home", title: "Renovation", line: "Comparing 3 quotes" },
  ] })`,
      },
    ],
  },
];

export const EXT_COMPONENTS: Component[] = SPECS.map((s) => ({
  id: s.name.toLowerCase(),
  name: s.name,
  group: s.group,
  height: s.height,
  summary: s.summary,
  readme: extDocs[s.name] ?? "",
  api: "",
  props: s.props.map((p) => ({ name: p.name, type: p.type, required: !!p.required })),
  variants: s.variants,
  preview: undefined,
  showcase: false,
  dir: "src/ds",
}));

export const EXT_GROUPS = Array.from(new Set(SPECS.map((s) => s.group)));
