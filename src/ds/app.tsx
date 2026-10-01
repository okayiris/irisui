// IrisApp: a whole app from one JSON spec, drawn with the system's own parts, and checkApp, the Meaning rules as code.
//
// A spec names screens and the parts on them. Every part is a real component from window.IrisUi, so a tap does
// what the component does: a Toggle switches, a CheckList ticks, a Row opens the next screen, a button opens a
// sheet or a dialog. Navigation is a stack (push, back), plus one sheet and one dialog on top: three depths.
//
//   { name, topic, start: "home", tabs: [{ label, icon, to }], state: { done: [0] },
//     screens: { home: { title, lede, hero: Part, parts: Part[], action: { label, on } }, ... } }
//
// A Part is { c: "Row", title: "Voice", on: "push:voice" } with the component's own props. Strings may hold
// {key} (state, or the item inside `each`). Actions: push:id, sheet:id, dialog:id, back, close, tab:i,
// toggle:key, set:key=value, inc:key/max, later:ms:action (commas for ;), snack:text, talk.
// each + filter: searchKey / where: "field=={key}" narrow a list; a screen's top: { label, on } sits top right. Two-way state: `bind: "key"` on Toggle, Chip, Segmented,
// Tabs, Slider, Select, TextArea, Field, SearchField, DatePicker, TimePicker, CheckList, Steps.

import React, { useEffect, useRef, useState } from "react";

const h = React.createElement as Any;
type Any = any;

export type Act = string;
export type Part = { c: string; on?: Act; bind?: string; each?: string; parts?: Part[]; [prop: string]: Any };
export type Screen = {
  kind?: "page" | "sheet" | "dialog" | "talk";
  title: string;
  eyebrow?: string;
  lede?: string;
  topic?: string;
  hero?: Part;
  parts?: Part[];
  action?: { label: string; on?: Act; danger?: boolean };
  second?: { label: string; on?: Act };
  actions?: { label: string; on?: Act; danger?: boolean }[]; // dialog
  body?: string; // dialog
  tab?: number;
  status?: { state: string; label: string };
  mark?: { kind?: string; look?: string }; // her pen on the ==fact== in the lede
  top?: { label: string; on?: Act; icon?: string }; // one action top right in the header, always above the fold // her StatusPill, top left: only in an app without a tab bar
  bare?: boolean; // the AppBar shows only the way back: a part on the screen carries the title
};
export type AppSpec = {
  name: string;
  topic?: string;
  start: string;
  tabs?: { label: string; icon: string; to: string }[];
  rail?: { label: string; icon: string; to: string }[]; // a window: a NavRail on the left instead of a tab bar
  backdrop?: Part; // the app's theme as a quiet layer behind every screen (a lab ambience), never in front of content
  state?: Record<string, Any>;
  screens: Record<string, Screen>;
};

const UI = () => (window as Any).IrisUi ?? {};

/* ------------------------------------------------------------- state paths */

const get = (scope: Any, path: string): Any => path.split(".").reduce((o, k) => (o == null ? o : o[k]), scope);
/** "{done} of {items}" against the item ($.field) or the app state. Alone, "{items}" is the value itself. */
function fill(v: Any, state: Any, item?: Any): Any {
  if (typeof v !== "string" || !v.includes("{")) return v;
  const one = /^\{([^}]+)\}$/.exec(v);
  const look = (p: string) => (item !== undefined && p.startsWith("$") ? (p === "$" ? item : get(item, p.slice(2))) : get(state, p));
  if (one) return look(one[1]); // "{items}" is the list itself; inside a sentence a list reads as its length
  return v.replace(/\{([^}]+)\}/g, (_, p) => { const x = look(p); return String(Array.isArray(x) ? x.length : x ?? ""); });
}
/** value: "=done/items" is a ratio of two list lengths, for a Progress. */
function ratio(v: Any, state: Any) {
  const m = typeof v === "string" && /^=(\w+)\/(\w+)$/.exec(v);
  if (!m) return v;
  const a = state[m[1]], b = state[m[2]];
  const n = (x: Any) => (Array.isArray(x) ? x.length : Number(x) || 0);
  return n(b) ? n(a) / n(b) : 0;
}

/** "step==1", "when!=pick" or just "near": a condition on the state. */
function test(cond: string, state: Any, item?: Any) {
  const m = /^([\w.$]+)\s*(==|!=)\s*(.*)$/.exec(cond);
  if (!m) { const v = fill(`{${cond}}`, state, item); return Array.isArray(v) ? v.length > 0 : !!v; }
  const v = String(fill(`{${m[1]}}`, state, item));
  return m[2] === "==" ? v === m[3] : v !== m[3];
}

/* --------------------------------------------------------------- the parts */

// What a part costs on the busy budget of 5 (Meaning, Decoration), and which parts are her.
const BUSY: Record<string, (p: Part) => number> = {
  Word: () => 3, ThemeWord: () => 3, EdgeText: () => 3, Pattern: () => 2, PhaseRing: () => 2, LoopScreen: () => 2,
  Pen: (p) => (p.look === "neon" ? 2 : 0), Widget: (p) => (p.look === "ring" || p.look === "pattern" ? 1 : 0),
  Progress: (p) => (p.ring ? 1 : 0), Orb3D: () => 2,
};
const ORBS = new Set(["Orb", "TalkOrb", "Orb3D", "StatusPill", "MacPill"]);
const HEROES = new Set(["LabWord", "Word", "ThemeWord", "EdgeText", "Orb3D", "PhaseRing", "Progress", "Stat", "Photo", "Widget", "Pattern"]);

function icon(name: Any, size = 20) {
  return typeof name === "string" ? h(UI().Icon, { name, size }) : name;
}

function Part({ p, ctx, item }: { p: Part; ctx: Any; item?: Any }): Any {
  const { state, set, run } = ctx;
  const I = UI();
  if (p.each) {
    let list: Any[] = get(state, p.each) ?? [];
    // filter: a state key holding search text, matched against every value of the item; where: "field==value".
    const q = p.filter ? String(get(state, p.filter) ?? "").trim().toLowerCase() : "";
    if (q) list = list.filter((it) => JSON.stringify(it).toLowerCase().includes(q));
    if (p.where) { const [k, v] = String(fill(p.where, state)).split("=="); if (v !== undefined && v !== "") list = list.filter((it) => String(it?.[k]) === v); }
    const { each, filter: _f, where: _w, ...one } = p;
    return h(React.Fragment, null, list.map((it: Any, i: number) => h(Part, { key: i, p: one, ctx, item: { ...(typeof it === "object" ? it : { v: it }), i } })));
  }
  if (p.if && !test(p.if, state, item)) return null;
  if (p.unless && test(p.unless, state, item)) return null;

  const props: Any = {};
  for (const [k, v] of Object.entries(p)) {
    if (["c", "on", "bind", "parts", "if", "unless", "add", "filter", "where"].includes(k) || (v && typeof v === "object" && !Array.isArray(v) && "c" in (v as Any))) continue;
    props[k] = Array.isArray(v) ? v.map((x) => (typeof x === "string" ? fill(x, state, item) : x)) : ratio(fill(v, state, item), state);
  }
  const on = p.on ? fill(p.on, state, item) : undefined;
  const act = on ? () => run(on) : undefined;
  const kids = (p.parts ?? []).map((q, i) => h(Part, { key: i, p: q, ctx, item }));
  const b = p.bind, val = b ? get(state, b) : undefined;

  switch (p.c) {
    case "Text":
      return h("p", { className: "ia-say" + (p.tone ? " ia-" + p.tone : "") }, props.text);
    case "Label":
      return h("p", { className: "ia-label" }, props.text);
    case "Group": // rows that belong together: one card, hairlines between
      return h(I.Card, { padding: 0, className: "ia-group" }, kids);
    case "Grid":
      return h("div", { className: "ia-grid", style: { gridTemplateColumns: `repeat(${props.cols ?? 2}, minmax(0, 1fr))` } }, kids);
    case "Tap": // makes a part that is a picture (a Widget) open something
      return h("button", { type: "button", className: "ia-tapbtn", onClick: act, "aria-label": props.label }, kids);
    case "Rail": // a row you swipe sideways: tiles at their own width, the next one peeks in
      return h("div", { className: "ia-rail", role: "group", "aria-label": props.label ?? "More" },
        (p.parts ?? []).map((q, i) => h("div", { key: i, className: "ia-rail-item", style: { width: q.w ?? props.w ?? 160 } }, h(Part, { p: q, ctx, item }))));
    case "Pages": // pages you swipe through, with dots that say where you are; vertical pages stack in a fixed height
      return h(Pages, { p, ctx, item, vertical: !!props.vertical, height: props.height, topic: props.topic });
    case "Bento": // a grid of two columns where a tile may take both columns (span: 2) or two rows (tall: true)
      return h("div", { className: "ia-bento" }, (p.parts ?? []).map((q, i) =>
        h("div", { key: i, className: "ia-bento-item", style: { gridColumn: q.span === 2 ? "span 2" : undefined, gridRow: q.tall ? "span 2" : undefined } }, h(Part, { p: q, ctx, item }))));
    case "Meter": // one measured thing: a label, its value, and a bar of how far
      return h("div", { className: "ia-meter" },
        h("div", { className: "ia-meter-head" }, h("span", null, props.label), h("b", null, props.value)),
        h(I.Progress, { value: props.of, topic: props.topic }));
    case "Stack":
      return h("div", { className: "ia-stack" }, kids);
    case "Row": {
      let trailing = props.trailing;
      if (b) trailing = h(I.Toggle, { on: !!val, onChange: (x: boolean) => set(b, x) });
      else if (props.value != null) trailing = h("span", { className: "ia-value" }, props.value);
      const ic = p.icon && typeof p.icon === "object" ? h(Part, { p: p.icon, ctx, item }) : props.icon ? icon(props.icon) : undefined;
      return h(I.Row, { ...props, icon: ic, trailing, chevron: props.chevron ?? (!!act && !b),
        onClick: act ?? (b ? () => set(b, !val) : undefined) });
    }
    case "Button":
      return h(I.Button, { ...props, icon: props.icon ? icon(props.icon, 16) : undefined, onClick: act }, props.label);
    case "Buttons":
      return h(I.ButtonGroup, { stack: props.stack ?? true, topic: props.topic }, kids);
    case "Toggle":
      return h(I.Toggle, { on: !!val, onChange: (x: boolean) => set(b, x) });
    case "Chip":
      return h(I.Chip, { ...props, on: b ? val === props.value : props.on, onClick: b ? () => set(b, props.value) : act }, props.label);
    case "Chips":
      return h("div", { className: "ia-chips" }, (props.items ?? []).map((l: string, i: number) =>
        h(I.Chip, { key: l, topic: props.topic, on: val === l, onClick: () => set(b, l) }, l)));
    case "Segmented": case "Tabs": case "Steps":
      return h(I[p.c], { ...props, active: b ? val : props.active, onSelect: b ? (i: number) => set(b, i) : undefined });
    case "Slider": case "Select": case "TextArea": case "DatePicker": case "TimePicker":
      return h(I[p.c], { ...props, value: val, onChange: (x: Any) => set(b, x) });
    case "SearchField":
      return h(I.SearchField, { ...props, value: val ?? "", onChange: (x: string) => set(b, x) });
    case "Field": // with add: "items", Enter puts the text on that list
      return h("form", { className: "ia-field", onSubmit: (e: Any) => { e.preventDefault(); const t = (val ?? "").trim(); if (!t) return;
          if (p.add) set(p.add, [...(get(state, p.add) ?? []), t]); set(b, ""); if (p.on) run(fill(p.on, { ...state, [b!]: t })); } },
        h(I.Field, { ...props, "aria-label": props.placeholder, value: val ?? "", onChange: (e: Any) => set(b, e.target.value) }));
    case "CheckList": {
      const items = props.items ?? [];
      if (!b) return h(I.CheckList, props);
      const done: number[] = val ?? [];
      return h(I.CheckList, { ...props, items, done, onToggle: (i: number) => set(b, done.includes(i) ? done.filter((x) => x !== i) : [...done, i]) });
    }
    case "Icon":
      return icon(props.name, props.size);
    case "Card":
      return h(I.Card, { padding: props.padding, onClick: act, className: act ? "ia-tap" : undefined }, kids.length ? kids : props.text);
    case "Topic":
      return h(I.Topic, { name: props.name }, kids);
    case "Carousel":
      return h(I.Carousel, props, kids);
    case "Dialog": case "Sheet": // inline overlays are not parts: open them with an action
      return null;
    default: {
      const C = I[p.c];
      if (!C) return h("p", { className: "ia-missing" }, `No part ${p.c}`);
      const extra: Any = {};
      if (act) { extra.onClick = act; extra.onPress = act; extra.onAction = act; }
      // Any other onSomething given as an action string (VaultAsk's onAllow, onDeny, onAlways) runs it.
      for (const [k, v] of Object.entries(props)) if (/^on[A-Z]/.test(k) && typeof v === "string") extra[k] = () => run(v);
      if (p.c === "EmptyState" && props.action) extra.action = { label: props.action, onClick: act };
      if (p.c === "LoopScreen") { extra.onDone = act ?? (() => run("back")); extra.onLoops = () => run("back"); }
      if ((p.c === "ChatStack" || p.c === "CircleStack") && p.on) extra.onSelect = (id: string) => id && run(fill(p.on ?? "", state, { id }) || `push:${id}`);
      return h(C, { ...props, ...extra }, kids.length ? kids : props.text);
    }
  }
}

function Pages({ p, ctx, item, vertical, height, topic }: Any) {
  const I = UI();
  const [at, setAt] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const pages = p.parts ?? [];
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setAt(Math.round(vertical ? el.scrollTop / el.clientHeight : el.scrollLeft / el.clientWidth));
  };
  const go = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ [vertical ? "top" : "left"]: i * (vertical ? el.clientHeight : el.clientWidth), behavior: "smooth" });
  };
  return h("div", { className: "ia-pages" + (vertical ? " ia-pages-v" : ""), style: vertical ? { height: height ?? 420 } : undefined },
    h("div", { ref: track, className: "ia-pages-track", onScroll, role: "group", "aria-label": p.label ?? "Pages" },
      pages.map((q: Part, i: number) => h("div", { key: i, className: "ia-page" }, h(Part, { p: q, ctx, item })))),
    h("div", { className: "ia-pages-dots" }, h(I.PageDots, { count: pages.length, active: at, topic, vertical, onSelect: go })));
}

/* ------------------------------------------------------------------ screens */

function Page({ s, ctx, depth }: { s: Screen; ctx: Any; depth: number }) {
  const I = UI();
  const back = depth > 0
    ? h(I.Button, { variant: "icon", label: "Back", onClick: () => ctx.run("back"),
        icon: h("span", { style: { display: "inline-flex", transform: "scaleX(-1)" } }, icon("chevron", 18)) })
    : null;
  const top = s.top ? h(I.Button, { variant: "glass", size: "sm", icon: s.top.icon ? icon(s.top.icon, 14) : undefined, onClick: () => s.top!.on && ctx.run(s.top!.on) }, fill(s.top.label, ctx.state)) : null;
  const body = h(React.Fragment, null,
    // One header everywhere: one level down the app bar holds only the way back (and its one action); the title stands
    // large under it, as on the first screen, so every screen has the same hierarchy.
    depth > 0
      ? h(React.Fragment, null, h(I.AppBar, { title: "", leading: back, actions: top }),
          s.bare ? null : h("header", { className: "ia-head ia-head-deep" },
            s.eyebrow ? h("p", { className: "ia-eyebrow" }, fill(s.eyebrow, ctx.state)) : null,
            h("h1", { className: "ia-title" }, fill(s.title, ctx.state))))
      : h("header", { className: "ia-head" + (top ? " ia-head-top" : "") },
          top ? h("div", { className: "ia-top" }, top) : null,
          s.status ? h("div", { className: "ia-status" }, h(I.StatusPill, s.status)) : null,
          s.eyebrow ? h("p", { className: "ia-eyebrow" }, fill(s.eyebrow, ctx.state)) : null,
          h("h1", { className: "ia-title" }, fill(s.title, ctx.state))),
    s.lede ? h(Lede, { text: fill(s.lede, ctx.state), mark: s.mark }) : null,
    s.hero ? h("div", { className: "ia-hero" }, h(Part, { p: s.hero, ctx })) : null,
    h("div", { className: "ia-parts" }, (s.parts ?? []).map((p, i) => h(Part, { key: i, p, ctx }))),
    s.action || s.second
      ? h("div", { className: "ia-action" }, h(I.ButtonGroup, { stack: true, topic: s.topic ?? ctx.topic },
          s.action ? h(I.Button, { variant: s.action.danger ? "danger" : "primary", size: "lg", topic: s.topic ?? ctx.topic, onClick: () => s.action!.on && ctx.run(s.action!.on) }, fill(s.action.label, ctx.state)) : null,
          s.second ? h(I.Button, { variant: "glass", onClick: () => s.second!.on && ctx.run(s.second!.on) }, fill(s.second.label, ctx.state)) : null))
      : null);
  const t = s.topic ?? ctx.topic;
  return t ? h(I.Topic, { name: t }, body) : body;
}
// Her words may name the person in bold ("**Alex**, the candles ...") and mark the one fact that matters with her pen
// ("the deadline is ==Friday 17:00=="): the mark sits in the sentence, on the fact, never on its own line.
function Lede({ text, mark }: { text: string; mark?: { kind?: string; look?: string } }) {
  const I = UI();
  const bits = String(text).split(/(\*\*.+?\*\*|==.+?==)/g).filter(Boolean);
  return h("p", { className: "ia-lede" }, bits.map((b, i) =>
    b.startsWith("**") ? h("b", { key: i }, b.slice(2, -2))
      : b.startsWith("==") ? (mark && I.Pen ? h(I.Pen, { key: i, kind: mark.kind ?? "underline", look: mark.look ?? "clean" }, b.slice(2, -2)) : h("b", { key: i }, b.slice(2, -2)))
        : b));
}

const TALK = ["listening", "thinking", "talking"];
function Talk({ s, ctx }: { s: Screen; ctx: Any }) {
  const I = UI();
  const [st, setSt] = useState(-1);
  const lines = (s.parts ?? []).map((p) => p.text);
  useEffect(() => {
    if (st < 0 || st >= 2) return;
    const t = setTimeout(() => setSt(st + 1), st === 0 ? 1800 : 1400);
    return () => clearTimeout(t);
  }, [st]);
  const state = st < 0 ? "rest" : TALK[st];
  return h("div", { className: "ia-talk" },
    h("p", { className: "ia-talk-word", "aria-live": "polite" }, st < 0 ? "Tap to talk" : state[0].toUpperCase() + state.slice(1)),
    h(I.TalkOrb, { size: 200, state, onPress: () => setSt(st === 2 || st < 0 ? 0 : -1) }),
    h("p", { className: "ia-lede ia-talk-line" }, st < 0 ? (s.lede ?? "") : lines[st] ?? ""),
    h(I.Button, { variant: "glass", onClick: () => ctx.run("back") }, "Close"));
}

/* --------------------------------------------------------------------- app */

export function IrisApp({ spec, start, onNavigate, onState, frame = "phone" }: { spec: AppSpec; start?: string | string[]; onNavigate?: (id: string) => void; onState?: (state: Record<string, Any>) => void; frame?: "phone" | "window" }) {
  const I = UI();
  const path = (Array.isArray(start) ? start : [start ?? spec.start]).filter((id) => spec.screens[id]);
  const pages = path.filter((id) => !["sheet", "dialog"].includes(spec.screens[id].kind ?? "page"));
  const layers = () => ({ sheet: path.find((id) => spec.screens[id].kind === "sheet"), dialog: path.find((id) => spec.screens[id].kind === "dialog") });
  const first = pages.length ? pages : [spec.start];
  const key = path.join(">");
  const [stack, setStack] = useState<string[]>(first);
  const [layer, setLayer] = useState<{ sheet?: string; dialog?: string }>(layers);
  const [state, setState] = useState<Record<string, Any>>(() => structuredClone(spec.state ?? {}));
  const [snack, setSnack] = useState<string | null>(null);
  const [dir, setDir] = useState<"in" | "out" | "">("");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => { setStack(first); setLayer(layers()); setDir(""); }, [key]);
  useEffect(() => { onNavigate?.(stack[stack.length - 1]); scroller.current?.scrollTo({ top: 0 }); }, [stack]);
  useEffect(() => { onState?.(state); }, [state]);
  useEffect(() => { if (!snack) return; const t = setTimeout(() => setSnack(null), 3600); return () => clearTimeout(t); }, [snack]);

  const set = (k: string, v: Any) => setState((s) => ({ ...s, [k]: v }));
  const run = (a: string) => {
    for (const one of a.split(";").map((x) => x.trim()).filter(Boolean)) {
      const [verb, ...rest] = one.split(":"), arg = rest.join(":");
      if (verb === "push" && spec.screens[arg]) {
        const k = spec.screens[arg].kind;
        if (k === "sheet") setLayer({ sheet: arg });
        else if (k === "dialog") setLayer((l) => ({ ...l, dialog: arg }));
        else { setLayer({}); setDir("in"); setStack((s) => [...s, arg]); }
      } else if (verb === "sheet") setLayer({ sheet: arg });
      else if (verb === "dialog") setLayer((l) => ({ ...l, dialog: arg }));
      else if (verb === "close") setLayer((l) => (l.dialog ? { sheet: l.sheet } : {}));
      else if (verb === "back") {
        if (layer.dialog || layer.sheet) setLayer((l) => (l.dialog ? { sheet: l.sheet } : {}));
        else { setDir("out"); setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)); }
      } else if (verb === "tab") { setLayer({}); setDir(""); setStack([(spec.tabs ?? spec.rail)![Number(arg)].to]); }
      else if (verb === "toggle") setState((s) => ({ ...s, [arg]: !s[arg] }));
      else if (verb === "later") { const [ms, ...a] = arg.split(":"); const next = a.join(":").replace(/,/g, ";"); setTimeout(() => run(next), Number(ms) || 1000); }
      else if (verb === "inc") { const [k, max] = arg.split("/"); setState((s) => ({ ...s, [k]: Math.min(Number(max ?? Infinity), (Number(s[k]) || 0) + 1) })); }
      else if (verb === "set") { const [k, v] = arg.split("="); setState((s) => ({ ...s, [k]: v === "true" ? true : v === "false" ? false : v === "" || isNaN(+v) ? v : +v })); }
      else if (verb === "snack") setSnack(fill(arg, state));
      else if (verb === "talk") { const t = Object.keys(spec.screens).find((id) => spec.screens[id].kind === "talk"); if (t) { setLayer({}); setStack((s) => [...s, t]); } }
    }
  };
  const ctx = { state, set, run, topic: spec.topic };
  const id = stack[stack.length - 1], s = spec.screens[id];
  const talking = s.kind === "talk";
  const tabOf = (sid: string) => spec.tabs?.findIndex((t) => t.to === sid) ?? -1;
  const activeTab = Math.max(0, [...stack].reverse().map(tabOf).find((i) => i >= 0) ?? 0);
  const railAt = spec.rail ? Math.max(0, spec.rail.findIndex((r) => stack.includes(r.to))) : -1;
  const wide = !!spec.rail || frame === "window";
  const sheet = layer.sheet ? spec.screens[layer.sheet] : null, dialog = layer.dialog ? spec.screens[layer.dialog] : null;

  // One accent per app: the app's topic colour becomes its accent, so the tab bar, chips, links and focus all speak it.
  const tk = spec.topic ? I.design?.TOPIC?.[spec.topic] : null;
  const tint = tk ? { "--accent": tk[0], "--k": tk[0], "--k2": tk[1], "--kd": tk[2] } : undefined;
  return h("div", { className: "ia-app" + (spec.rail ? " ia-win" : ""), "data-frame": wide ? "window" : frame, style: tint },
    spec.rail ? h("div", { className: "ia-rail-col" }, h(I.NavRail, { label: spec.name, items: spec.rail.map((r, i) =>
      ({ label: r.label, icon: icon(r.icon, 18), active: i === railAt, onSelect: () => run(`tab:${i}`) })) })) : null,
    spec.backdrop ? h("div", { className: "ia-backdrop", "aria-hidden": "true" }, h(Part, { p: spec.backdrop, ctx })) : null,
    h("main", { ref: scroller, className: "ia-scroll" + (spec.tabs && !talking ? " ia-has-tabs" : ""), "aria-label": s.title },
      h("div", { key: id + stack.length, className: "ia-screen" + (dir ? " ia-" + dir : "") },
        talking ? h(Talk, { s, ctx }) : h(Page, { s, ctx, depth: stack.length - 1 }))),
    spec.tabs && !talking
      ? h("div", { className: "ia-tabbar" }, h(I.TabBar, { tabs: spec.tabs.map((t) => t.label), icons: spec.tabs.map((t) => t.icon),
          active: activeTab, talk: "rest", onSelect: (i: number) => run(`tab:${i}`), onTalk: () => run("talk") }))
      : null,
    snack ? h("div", { className: "ia-snack" }, h(I.Snackbar, { text: snack, tone: "ok" })) : null,
    h("div", { className: "ia-layer" },
      sheet ? h(spec.topic ? I.Topic : React.Fragment, spec.topic ? { name: spec.topic } : null, h(I.Sheet, { open: true, side: wide ? "end" : "bottom", onClose: () => setLayer({}), title: fill(sheet.title, state), sub: fill(sheet.lede, state) },
        h("div", { className: "ia-sheet-body" }, (sheet.parts ?? []).map((p, i) => h(Part, { key: i, p, ctx })),
          sheet.action || sheet.actions ? h("div", { className: "ia-action" }, h(I.ButtonGroup, { stack: true },
            // The one primary first, then the rest as glass: action is the primary, actions[] the others.
            [...(sheet.action ? [{ ...sheet.action, primary: true }] : []), ...(sheet.actions ?? [])].map((a: Any, i: number) =>
              h(I.Button, { key: i, variant: a.danger ? "danger" : a.primary ? "primary" : "glass", size: a.primary ? "lg" : "md", topic: spec.topic, onClick: () => run(a.on ?? "close") }, fill(a.label, state))))) : null))) : null,
      dialog ? h(I.Dialog, { open: true, onClose: () => run("close"), title: fill(dialog.title, state), body: fill(dialog.body, state),
          actions: (dialog.actions ?? [{ label: "OK" }]).map((a) => ({ label: a.label, danger: a.danger, onClick: () => a.on && setTimeout(() => run(a.on!), 0) })) }) : null));
}

/* ------------------------------------------------------------------- checks */

export type Finding = { screen: string; rule: string; level: "break" | "warn" };

/** The Meaning page as code: what a screen may hold, and where. Empty means the app keeps every rule here. */
export function checkApp(spec: AppSpec): Finding[] {
  const out: Finding[] = [];
  const add = (screen: string, rule: string, level: Finding["level"] = "break") => out.push({ screen, rule, level });
  const walk = (ps: Part[] = [], f: (p: Part) => void) => ps.forEach((p) => { f(p); walk(p.parts, f); });
  const reach = new Set<string>();
  // A target built from the item ("push:{$.id}") is checked when it is drawn, not here.
  const targets = (a?: string) => (a ?? "").split(";").map((x) => x.trim().match(/^(push|sheet|dialog):([^{]+)$/)?.[2]).filter(Boolean) as string[];

  for (const [id, s] of Object.entries(spec.screens)) {
    const parts = [...(s.hero ? [s.hero] : []), ...(s.parts ?? [])];
    let orbs = spec.tabs && s.kind !== "talk" && s.kind !== "sheet" && s.kind !== "dialog" ? 1 : 0; // the TalkOrb in the tab bar
    if (s.kind === "talk") orbs = 1;
    if (s.status) orbs++;
    let busy = s.mark && /==.+==/.test(s.lede ?? "") ? BUSY.Pen({ c: "Pen", look: s.mark.look }) : 0, markPen = s.mark && /==.+==/.test(s.lede ?? "") ? 1 : 0, words = 0, pens = markPen, anchors = 0, primaries = s.action && !s.action.danger ? 1 : 0;
    walk(parts, (p) => {
      if (ORBS.has(p.c) || (p.c === "Widget" && p.look === "orb")) orbs++;
      // A part the system does not know (a lab part) says its own cost and whether it is a big word.
      busy += BUSY[p.c]?.(p) ?? (Number(p.busy) || 0);
      if (p.c === "Word" || p.c === "ThemeWord" || p.c === "EdgeText" || p.big) words++;
      if (p.c === "Pen") pens++;
      if (p.c === "Anchor") anchors++;
      if (p.c === "Button" && p.variant === "primary") primaries++;
      if (p.c === "Mark") add(id, "Mark is the brand, never inside an app screen");
      if (p.c === "Button" && p.variant === "danger" && !/delete|remove|unpair|cancel|leave|erase/i.test(p.label ?? "")) add(id, `Red only destroys: "${p.label}"`);
      targets(p.on).forEach((t) => (spec.screens[t] ? reach.add(t) : add(id, `"${p.on}" goes to a screen that does not exist`)));
      if (p.c === "Segmented" && !p.bind) add(id, "A Segmented with nothing behind it is a demo control", "warn");
    });
    targets(s.action?.on).concat(targets(s.second?.on), ...(s.actions ?? []).map((a) => targets(a.on))).forEach((t) =>
      spec.screens[t] ? reach.add(t) : add(id, `action goes to "${t}", which does not exist`));
    if (orbs > 1) add(id, `${orbs} orbs: one Iris per surface`);
    if (busy > 5) add(id, `busy ${busy} of 5`);
    if (words > 1) add(id, `${words} big words: one per screen`);
    if (pens > 1) add(id, `${pens} pen marks: one per screen`);
    if (anchors > 1) add(id, `${anchors} anchors: one per screen`);
    if (primaries > 1) add(id, `${primaries} primary buttons: one action per screen`);
    const heroAt = (s.parts ?? []).findIndex((p) => HEROES.has(p.c) && (p.c !== "Progress" || p.ring) && p.c !== "Stat" && p.c !== "Widget");
    if (heroAt > 1) add(id, `${(s.parts ?? [])[heroAt].c} is a hero, but sits below other parts: move it to hero`, "warn");
    const rows = (s.parts ?? []).flatMap((p) => (p.c === "Group" ? p.parts ?? [] : [p]));
    const dangerAt = rows.findIndex((p) => p.danger);
    if (dangerAt >= 0 && rows.slice(dangerAt + 1).some((p) => p.c === "Row" && !p.danger)) add(id, "Danger is the last row, never above a normal one");
    if ((s.kind ?? "page") === "page" && !s.lede && id === spec.start) add(id, "The first screen has no words of hers", "warn");
  }
  reach.add(spec.start);
  spec.tabs?.forEach((t) => reach.add(t.to));
  spec.rail?.forEach((t) => reach.add(t.to));
  if (Object.values(spec.screens).some((s) => s.kind === "talk") && spec.tabs) for (const [id, s] of Object.entries(spec.screens)) if (s.kind === "talk") reach.add(id);
  for (const id of Object.keys(spec.screens)) if (!reach.has(id)) add(id, "No way to reach this screen", "warn");
  return out;
}

/** What each loud part on a screen costs, for the busy budget of 5. */
export function costOf(s: Screen): [string, number][] {
  const out: [string, number][] = [];
  const walk = (ps: Part[] = []) => ps.forEach((p) => { const c = BUSY[p.c]?.(p) ?? (Number(p.busy) || 0); if (c) out.push([p.c + (p.look ? ", " + p.look : p.effect ? ", " + p.effect : ""), c]); walk(p.parts); });
  walk([...(s.hero ? [s.hero] : []), ...(s.parts ?? [])]);
  if (s.mark?.look === "neon" && /==.+==/.test(s.lede ?? "")) out.push(["Pen, neon", 2]);
  return out;
}

/** How deep an app goes: the longest push chain from the start, plus 1 for a sheet and 1 for a dialog on the way. */
export function depthOf(spec: AppSpec): number {
  const seen = new Set<string>();
  const go = (id: string): number => {
    if (seen.has(id)) return 0;
    seen.add(id);
    const s = spec.screens[id];
    if (!s) return 0;
    const ons: string[] = [];
    const walk = (ps: Part[] = []) => ps.forEach((p) => { if (p.on) ons.push(p.on); walk(p.parts); });
    walk([...(s.hero ? [s.hero] : []), ...(s.parts ?? [])]);
    [s.action?.on, s.second?.on, ...(s.actions ?? []).map((a) => a.on)].forEach((a) => a && ons.push(a));
    let best = 0;
    for (const a of ons) for (const m of a.matchAll(/(push|sheet|dialog):([\w-]+)/g)) best = Math.max(best, 1 + go(m[2]));
    seen.delete(id);
    return best;
  };
  return 1 + Math.max(go(spec.start), ...(spec.tabs ?? []).map((t) => go(t.to)));
}
