"use strict";
(() => {
  // src/ds/react-shim.js
  var React = window.React;
  var h = React.createElement;
  var Fragment = React.Fragment;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useRef = React.useRef;
  var useMemo = React.useMemo;
  var useCallback = React.useCallback;
  var useId = React.useId;
  var react_shim_default = React;

  // src/ds/app.tsx
  var h2 = react_shim_default.createElement;
  var UI = () => window.IrisUi ?? {};
  var get = (scope, path) => path.split(".").reduce((o, k) => o == null ? o : o[k], scope);
  function fill(v, state, item) {
    if (typeof v !== "string" || !v.includes("{")) return v;
    const one = /^\{([^}]+)\}$/.exec(v);
    const look = (p) => item !== void 0 && p.startsWith("$") ? p === "$" ? item : get(item, p.slice(2)) : get(state, p);
    if (one) return look(one[1]);
    return v.replace(/\{([^}]+)\}/g, (_, p) => {
      const x = look(p);
      return String(Array.isArray(x) ? x.length : x ?? "");
    });
  }
  function ratio(v, state) {
    const m = typeof v === "string" && /^=(\w+)\/(\w+)$/.exec(v);
    if (!m) return v;
    const a = state[m[1]], b = state[m[2]];
    const n = (x) => Array.isArray(x) ? x.length : Number(x) || 0;
    return n(b) ? n(a) / n(b) : 0;
  }
  function test(cond, state, item) {
    const m = /^([\w.$]+)\s*(==|!=)\s*(.*)$/.exec(cond);
    if (!m) return !!fill(`{${cond}}`, state, item);
    const v = String(fill(`{${m[1]}}`, state, item));
    return m[2] === "==" ? v === m[3] : v !== m[3];
  }
  var BUSY = {
    Word: () => 3,
    ThemeWord: () => 3,
    EdgeText: () => 3,
    Pattern: () => 2,
    PhaseRing: () => 2,
    LoopScreen: () => 2,
    Pen: (p) => p.look === "neon" ? 2 : 0,
    Widget: (p) => p.look === "ring" || p.look === "pattern" ? 1 : 0,
    Progress: (p) => p.ring ? 1 : 0,
    Orb3D: () => 2
  };
  var ORBS = /* @__PURE__ */ new Set(["Orb", "TalkOrb", "Orb3D", "StatusPill", "MacPill"]);
  var HEROES = /* @__PURE__ */ new Set(["Word", "ThemeWord", "EdgeText", "Orb3D", "PhaseRing", "Progress", "Stat", "Photo", "Widget", "Pattern"]);
  function icon(name, size = 20) {
    return typeof name === "string" ? h2(UI().Icon, { name, size }) : name;
  }
  function Part({ p, ctx, item }) {
    const { state, set, run } = ctx;
    const I = UI();
    if (p.each) {
      const list = get(state, p.each) ?? [];
      const { each, ...one } = p;
      return h2(react_shim_default.Fragment, null, list.map((it, i) => h2(Part, { key: i, p: one, ctx, item: { ...typeof it === "object" ? it : { v: it }, i } })));
    }
    if (p.if && !test(p.if, state, item)) return null;
    if (p.unless && test(p.unless, state, item)) return null;
    const props = {};
    for (const [k, v] of Object.entries(p)) {
      if (["c", "on", "bind", "parts", "if", "unless", "add"].includes(k) || v && typeof v === "object" && !Array.isArray(v) && "c" in v) continue;
      props[k] = Array.isArray(v) ? v.map((x) => typeof x === "string" ? fill(x, state, item) : x) : ratio(fill(v, state, item), state);
    }
    const on = p.on ? fill(p.on, state, item) : void 0;
    const act = on ? () => run(on) : void 0;
    const kids = (p.parts ?? []).map((q, i) => h2(Part, { key: i, p: q, ctx, item }));
    const b = p.bind, val = b ? get(state, b) : void 0;
    switch (p.c) {
      case "Text":
        return h2("p", { className: "ia-say" + (p.tone ? " ia-" + p.tone : "") }, props.text);
      case "Label":
        return h2("p", { className: "ia-label" }, props.text);
      case "Group":
        return h2(I.Card, { padding: 0, className: "ia-group" }, kids);
      case "Grid":
        return h2("div", { className: "ia-grid", style: { gridTemplateColumns: `repeat(${props.cols ?? 2}, minmax(0, 1fr))` } }, kids);
      case "Tap":
        return h2("button", { type: "button", className: "ia-tapbtn", onClick: act, "aria-label": props.label }, kids);
      case "Rail":
        return h2(
          "div",
          { className: "ia-rail", role: "group", "aria-label": props.label ?? "More" },
          (p.parts ?? []).map((q, i) => h2("div", { key: i, className: "ia-rail-item", style: { width: q.w ?? props.w ?? 160 } }, h2(Part, { p: q, ctx, item })))
        );
      case "Pages":
        return h2(Pages, { p, ctx, item, vertical: !!props.vertical, height: props.height, topic: props.topic });
      case "Bento":
        return h2("div", { className: "ia-bento" }, (p.parts ?? []).map((q, i) => h2("div", { key: i, className: "ia-bento-item", style: { gridColumn: q.span === 2 ? "span 2" : void 0, gridRow: q.tall ? "span 2" : void 0 } }, h2(Part, { p: q, ctx, item }))));
      case "Meter":
        return h2(
          "div",
          { className: "ia-meter" },
          h2("div", { className: "ia-meter-head" }, h2("span", null, props.label), h2("b", null, props.value)),
          h2(I.Progress, { value: props.of, topic: props.topic })
        );
      case "Stack":
        return h2("div", { className: "ia-stack" }, kids);
      case "Row": {
        let trailing = props.trailing;
        if (b) trailing = h2(I.Toggle, { on: !!val, onChange: (x) => set(b, x) });
        else if (props.value != null) trailing = h2("span", { className: "ia-value" }, props.value);
        const ic = p.icon && typeof p.icon === "object" ? h2(Part, { p: p.icon, ctx, item }) : props.icon ? icon(props.icon) : void 0;
        return h2(I.Row, {
          ...props,
          icon: ic,
          trailing,
          chevron: props.chevron ?? (!!act && !b),
          onClick: act ?? (b ? () => set(b, !val) : void 0)
        });
      }
      case "Button":
        return h2(I.Button, { ...props, icon: props.icon ? icon(props.icon, 16) : void 0, onClick: act }, props.label);
      case "Buttons":
        return h2(I.ButtonGroup, { stack: props.stack ?? true, topic: props.topic }, kids);
      case "Toggle":
        return h2(I.Toggle, { on: !!val, onChange: (x) => set(b, x) });
      case "Chip":
        return h2(I.Chip, { ...props, on: b ? val === props.value : props.on, onClick: b ? () => set(b, props.value) : act }, props.label);
      case "Chips":
        return h2("div", { className: "ia-chips" }, (props.items ?? []).map((l, i) => h2(I.Chip, { key: l, topic: props.topic, on: val === l, onClick: () => set(b, l) }, l)));
      case "Segmented":
      case "Tabs":
      case "Steps":
        return h2(I[p.c], { ...props, active: b ? val : props.active, onSelect: b ? (i) => set(b, i) : void 0 });
      case "Slider":
      case "Select":
      case "TextArea":
      case "DatePicker":
      case "TimePicker":
        return h2(I[p.c], { ...props, value: val, onChange: (x) => set(b, x) });
      case "SearchField":
        return h2(I.SearchField, { ...props, value: val ?? "", onChange: (x) => set(b, x) });
      case "Field":
        return h2(
          "form",
          { className: "ia-field", onSubmit: (e) => {
            e.preventDefault();
            const t = (val ?? "").trim();
            if (!t) return;
            if (p.add) set(p.add, [...get(state, p.add) ?? [], t]);
            set(b, "");
          } },
          h2(I.Field, { ...props, "aria-label": props.placeholder, value: val ?? "", onChange: (e) => set(b, e.target.value) })
        );
      case "CheckList": {
        const items = props.items ?? [];
        if (!b) return h2(I.CheckList, props);
        const done = val ?? [];
        return h2(I.CheckList, { ...props, items, done, onToggle: (i) => set(b, done.includes(i) ? done.filter((x) => x !== i) : [...done, i]) });
      }
      case "Icon":
        return icon(props.name, props.size);
      case "Card":
        return h2(I.Card, { padding: props.padding, onClick: act, className: act ? "ia-tap" : void 0 }, kids.length ? kids : props.text);
      case "Topic":
        return h2(I.Topic, { name: props.name }, kids);
      case "Carousel":
        return h2(I.Carousel, props, kids);
      case "Dialog":
      case "Sheet":
        return null;
      default: {
        const C = I[p.c];
        if (!C) return h2("p", { className: "ia-missing" }, `No part ${p.c}`);
        const extra = {};
        if (act) {
          extra.onClick = act;
          extra.onPress = act;
          extra.onAction = act;
        }
        if (p.c === "EmptyState" && props.action) extra.action = { label: props.action, onClick: act };
        if (p.c === "LoopScreen") {
          extra.onDone = act ?? (() => run("back"));
          extra.onLoops = () => run("back");
        }
        if ((p.c === "ChatStack" || p.c === "CircleStack") && p.on) extra.onSelect = (id) => id && run(fill(p.on ?? "", state, { id }) || `push:${id}`);
        return h2(C, { ...props, ...extra }, kids.length ? kids : props.text);
      }
    }
  }
  function Pages({ p, ctx, item, vertical, height, topic }) {
    const I = UI();
    const [at, setAt] = useState(0);
    const track = useRef(null);
    const pages = p.parts ?? [];
    const onScroll = () => {
      const el = track.current;
      if (!el) return;
      setAt(Math.round(vertical ? el.scrollTop / el.clientHeight : el.scrollLeft / el.clientWidth));
    };
    const go = (i) => {
      const el = track.current;
      if (el) el.scrollTo({ [vertical ? "top" : "left"]: i * (vertical ? el.clientHeight : el.clientWidth), behavior: "smooth" });
    };
    return h2(
      "div",
      { className: "ia-pages" + (vertical ? " ia-pages-v" : ""), style: vertical ? { height: height ?? 420 } : void 0 },
      h2(
        "div",
        { ref: track, className: "ia-pages-track", onScroll, role: "group", "aria-label": p.label ?? "Pages" },
        pages.map((q, i) => h2("div", { key: i, className: "ia-page" }, h2(Part, { p: q, ctx, item })))
      ),
      h2("div", { className: "ia-pages-dots" }, h2(I.PageDots, { count: pages.length, active: at, topic, vertical, onSelect: go }))
    );
  }
  function Page({ s, ctx, depth }) {
    const I = UI();
    const back = depth > 0 ? h2(I.Button, {
      variant: "icon",
      label: "Back",
      onClick: () => ctx.run("back"),
      icon: h2("span", { style: { display: "inline-flex", transform: "scaleX(-1)" } }, icon("chevron", 18))
    }) : null;
    const body = h2(
      react_shim_default.Fragment,
      null,
      depth > 0 ? h2(I.AppBar, { title: s.bare ? "" : fill(s.title, ctx.state), leading: back }) : h2(
        "header",
        { className: "ia-head" },
        s.status ? h2("div", { className: "ia-status" }, h2(I.StatusPill, s.status)) : null,
        s.eyebrow ? h2("p", { className: "ia-eyebrow" }, fill(s.eyebrow, ctx.state)) : null,
        h2("h1", { className: "ia-title" }, fill(s.title, ctx.state))
      ),
      depth > 0 && s.eyebrow ? h2("p", { className: "ia-eyebrow ia-sub" }, fill(s.eyebrow, ctx.state)) : null,
      s.lede ? h2("p", { className: "ia-lede", dangerouslySetInnerHTML: { __html: lede(fill(s.lede, ctx.state)) } }) : null,
      s.hero ? h2("div", { className: "ia-hero" }, h2(Part, { p: s.hero, ctx })) : null,
      h2("div", { className: "ia-parts" }, (s.parts ?? []).map((p, i) => h2(Part, { key: i, p, ctx }))),
      s.action || s.second ? h2("div", { className: "ia-action" }, h2(
        I.ButtonGroup,
        { stack: true, topic: s.topic },
        s.action ? h2(I.Button, { variant: s.action.danger ? "danger" : "primary", size: "lg", topic: s.topic, onClick: () => s.action.on && ctx.run(s.action.on) }, fill(s.action.label, ctx.state)) : null,
        s.second ? h2(I.Button, { variant: "glass", onClick: () => s.second.on && ctx.run(s.second.on) }, s.second.label) : null
      )) : null
    );
    return s.topic ? h2(I.Topic, { name: s.topic }, body) : body;
  }
  var lede = (t) => t.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  var TALK = ["listening", "thinking", "talking"];
  function Talk({ s, ctx }) {
    const I = UI();
    const [st, setSt] = useState(-1);
    const lines = (s.parts ?? []).map((p) => p.text);
    useEffect(() => {
      if (st < 0 || st >= 2) return;
      const t = setTimeout(() => setSt(st + 1), st === 0 ? 1800 : 1400);
      return () => clearTimeout(t);
    }, [st]);
    const state = st < 0 ? "rest" : TALK[st];
    return h2(
      "div",
      { className: "ia-talk" },
      h2("p", { className: "ia-talk-word", "aria-live": "polite" }, st < 0 ? "Tap to talk" : state[0].toUpperCase() + state.slice(1)),
      h2(I.TalkOrb, { size: 200, state, onPress: () => setSt(st === 2 || st < 0 ? 0 : -1) }),
      h2("p", { className: "ia-lede ia-talk-line" }, st < 0 ? s.lede ?? "" : lines[st] ?? ""),
      h2(I.Button, { variant: "glass", onClick: () => ctx.run("back") }, "Close")
    );
  }
  function IrisApp({ spec, start, onNavigate, frame = "phone" }) {
    const I = UI();
    const path = (Array.isArray(start) ? start : [start ?? spec.start]).filter((id2) => spec.screens[id2]);
    const pages = path.filter((id2) => !["sheet", "dialog"].includes(spec.screens[id2].kind ?? "page"));
    const layers = () => ({ sheet: path.find((id2) => spec.screens[id2].kind === "sheet"), dialog: path.find((id2) => spec.screens[id2].kind === "dialog") });
    const first = pages.length ? pages : [spec.start];
    const key = path.join(">");
    const [stack, setStack] = useState(first);
    const [layer, setLayer] = useState(layers);
    const [state, setState] = useState(() => structuredClone(spec.state ?? {}));
    const [snack, setSnack] = useState(null);
    const [dir, setDir] = useState("");
    const scroller = useRef(null);
    useEffect(() => {
      setStack(first);
      setLayer(layers());
      setDir("");
    }, [key]);
    useEffect(() => {
      onNavigate?.(stack[stack.length - 1]);
      scroller.current?.scrollTo({ top: 0 });
    }, [stack]);
    useEffect(() => {
      if (!snack) return;
      const t = setTimeout(() => setSnack(null), 3600);
      return () => clearTimeout(t);
    }, [snack]);
    const set = (k, v) => setState((s2) => ({ ...s2, [k]: v }));
    const run = (a) => {
      for (const one of a.split(";").map((x) => x.trim()).filter(Boolean)) {
        const [verb, ...rest] = one.split(":"), arg = rest.join(":");
        if (verb === "push" && spec.screens[arg]) {
          const k = spec.screens[arg].kind;
          if (k === "sheet") setLayer({ sheet: arg });
          else if (k === "dialog") setLayer((l) => ({ ...l, dialog: arg }));
          else {
            setLayer({});
            setDir("in");
            setStack((s2) => [...s2, arg]);
          }
        } else if (verb === "sheet") setLayer({ sheet: arg });
        else if (verb === "dialog") setLayer((l) => ({ ...l, dialog: arg }));
        else if (verb === "close") setLayer((l) => l.dialog ? { sheet: l.sheet } : {});
        else if (verb === "back") {
          if (layer.dialog || layer.sheet) setLayer((l) => l.dialog ? { sheet: l.sheet } : {});
          else {
            setDir("out");
            setStack((s2) => s2.length > 1 ? s2.slice(0, -1) : s2);
          }
        } else if (verb === "tab") {
          setLayer({});
          setDir("");
          setStack([spec.tabs[Number(arg)].to]);
        } else if (verb === "toggle") setState((s2) => ({ ...s2, [arg]: !s2[arg] }));
        else if (verb === "inc") {
          const [k, max] = arg.split("/");
          setState((s2) => ({ ...s2, [k]: Math.min(Number(max ?? Infinity), (Number(s2[k]) || 0) + 1) }));
        } else if (verb === "set") {
          const [k, v] = arg.split("=");
          setState((s2) => ({ ...s2, [k]: v === "true" ? true : v === "false" ? false : isNaN(+v) ? v : +v }));
        } else if (verb === "snack") setSnack(arg);
        else if (verb === "talk") {
          const t = Object.keys(spec.screens).find((id2) => spec.screens[id2].kind === "talk");
          if (t) {
            setLayer({});
            setStack((s2) => [...s2, t]);
          }
        }
      }
    };
    const ctx = { state, set, run };
    const id = stack[stack.length - 1], s = spec.screens[id];
    const talking = s.kind === "talk";
    const tabOf = (sid) => spec.tabs?.findIndex((t) => t.to === sid) ?? -1;
    const activeTab = Math.max(0, ...stack.map(tabOf).filter((i) => i >= 0).slice(0, 1));
    const sheet = layer.sheet ? spec.screens[layer.sheet] : null, dialog = layer.dialog ? spec.screens[layer.dialog] : null;
    return h2(
      "div",
      { className: "ia-app", "data-frame": frame },
      h2(
        "main",
        { ref: scroller, className: "ia-scroll" + (spec.tabs && !talking ? " ia-has-tabs" : ""), "aria-label": s.title },
        h2(
          "div",
          { key: id + stack.length, className: "ia-screen" + (dir ? " ia-" + dir : "") },
          talking ? h2(Talk, { s, ctx }) : h2(Page, { s, ctx, depth: stack.length - 1 })
        )
      ),
      spec.tabs && !talking ? h2("div", { className: "ia-tabbar" }, h2(I.TabBar, {
        tabs: spec.tabs.map((t) => t.label),
        icons: spec.tabs.map((t) => t.icon),
        active: activeTab,
        talk: "rest",
        onSelect: (i) => run(`tab:${i}`),
        onTalk: () => run("talk")
      })) : null,
      snack ? h2("div", { className: "ia-snack" }, h2(I.Snackbar, { text: snack, tone: "ok" })) : null,
      h2(
        "div",
        { className: "ia-layer" },
        sheet ? h2(
          I.Sheet,
          { open: true, onClose: () => setLayer({}), title: sheet.title, sub: sheet.lede },
          h2(
            "div",
            { className: "ia-sheet-body" },
            (sheet.parts ?? []).map((p, i) => h2(Part, { key: i, p, ctx })),
            sheet.action ? h2("div", { className: "ia-action" }, h2(I.Button, { variant: sheet.action.danger ? "danger" : "primary", size: "lg", onClick: () => run(sheet.action.on ?? "close") }, sheet.action.label)) : null
          )
        ) : null,
        dialog ? h2(I.Dialog, {
          open: true,
          onClose: () => run("close"),
          title: dialog.title,
          body: dialog.body,
          actions: (dialog.actions ?? [{ label: "OK" }]).map((a) => ({ label: a.label, danger: a.danger, onClick: () => a.on && setTimeout(() => run(a.on), 0) }))
        }) : null
      )
    );
  }
  function checkApp(spec) {
    const out = [];
    const add = (screen, rule, level = "break") => out.push({ screen, rule, level });
    const walk = (ps = [], f) => ps.forEach((p) => {
      f(p);
      walk(p.parts, f);
    });
    const reach = /* @__PURE__ */ new Set();
    const targets = (a) => (a ?? "").split(";").map((x) => x.trim().match(/^(push|sheet|dialog):([^{]+)$/)?.[2]).filter(Boolean);
    for (const [id, s] of Object.entries(spec.screens)) {
      const parts = [...s.hero ? [s.hero] : [], ...s.parts ?? []];
      let orbs = spec.tabs && s.kind !== "talk" && s.kind !== "sheet" && s.kind !== "dialog" ? 1 : 0;
      if (s.kind === "talk") orbs = 1;
      if (s.status) orbs++;
      let busy = 0, words = 0, pens = 0, anchors = 0, primaries = s.action && !s.action.danger ? 1 : 0;
      walk(parts, (p) => {
        if (ORBS.has(p.c) || p.c === "Widget" && p.look === "orb") orbs++;
        busy += BUSY[p.c]?.(p) ?? 0;
        if (p.c === "Word" || p.c === "ThemeWord" || p.c === "EdgeText") words++;
        if (p.c === "Pen") pens++;
        if (p.c === "Anchor") anchors++;
        if (p.c === "Button" && p.variant === "primary") primaries++;
        if (p.c === "Mark") add(id, "Mark is the brand, never inside an app screen");
        if (p.c === "Button" && p.variant === "danger" && !/delete|remove|unpair|cancel|leave|erase/i.test(p.label ?? "")) add(id, `Red only destroys: "${p.label}"`);
        targets(p.on).forEach((t) => spec.screens[t] ? reach.add(t) : add(id, `"${p.on}" goes to a screen that does not exist`));
        if (p.c === "Segmented" && !p.bind) add(id, "A Segmented with nothing behind it is a demo control", "warn");
      });
      targets(s.action?.on).concat(targets(s.second?.on), ...(s.actions ?? []).map((a) => targets(a.on))).forEach((t) => spec.screens[t] ? reach.add(t) : add(id, `action goes to "${t}", which does not exist`));
      if (orbs > 1) add(id, `${orbs} orbs: one Iris per surface`);
      if (busy > 5) add(id, `busy ${busy} of 5`);
      if (words > 1) add(id, `${words} big words: one per screen`);
      if (pens > 1) add(id, `${pens} pen marks: one per screen`);
      if (anchors > 1) add(id, `${anchors} anchors: one per screen`);
      if (primaries > 1) add(id, `${primaries} primary buttons: one action per screen`);
      const heroAt = (s.parts ?? []).findIndex((p) => HEROES.has(p.c) && (p.c !== "Progress" || p.ring) && p.c !== "Stat" && p.c !== "Widget");
      if (heroAt > 1) add(id, `${(s.parts ?? [])[heroAt].c} is a hero, but sits below other parts: move it to hero`, "warn");
      const rows = (s.parts ?? []).flatMap((p) => p.c === "Group" ? p.parts ?? [] : [p]);
      const dangerAt = rows.findIndex((p) => p.danger);
      if (dangerAt >= 0 && rows.slice(dangerAt + 1).some((p) => p.c === "Row" && !p.danger)) add(id, "Danger is the last row, never above a normal one");
      if ((s.kind ?? "page") === "page" && !s.lede && id === spec.start) add(id, "The first screen has no words of hers", "warn");
    }
    reach.add(spec.start);
    spec.tabs?.forEach((t) => reach.add(t.to));
    if (Object.values(spec.screens).some((s) => s.kind === "talk") && spec.tabs) {
      for (const [id, s] of Object.entries(spec.screens)) if (s.kind === "talk") reach.add(id);
    }
    for (const id of Object.keys(spec.screens)) if (!reach.has(id)) add(id, "No way to reach this screen", "warn");
    return out;
  }
  function costOf(s) {
    const out = [];
    const walk = (ps = []) => ps.forEach((p) => {
      const c = BUSY[p.c]?.(p) ?? 0;
      if (c) out.push([p.c + (p.look ? ", " + p.look : p.effect ? ", " + p.effect : ""), c]);
      walk(p.parts);
    });
    walk([...s.hero ? [s.hero] : [], ...s.parts ?? []]);
    return out;
  }
  function depthOf(spec) {
    const seen = /* @__PURE__ */ new Set();
    const go = (id) => {
      if (seen.has(id)) return 0;
      seen.add(id);
      const s = spec.screens[id];
      if (!s) return 0;
      const ons = [];
      const walk = (ps = []) => ps.forEach((p) => {
        if (p.on) ons.push(p.on);
        walk(p.parts);
      });
      walk([...s.hero ? [s.hero] : [], ...s.parts ?? []]);
      [s.action?.on, s.second?.on, ...(s.actions ?? []).map((a) => a.on)].forEach((a) => a && ons.push(a));
      let best = 0;
      for (const a of ons) for (const m of a.matchAll(/(push|sheet|dialog):([\w-]+)/g)) best = Math.max(best, 1 + go(m[2]));
      seen.delete(id);
      return best;
    };
    return 1 + Math.max(go(spec.start), ...(spec.tabs ?? []).map((t) => go(t.to)));
  }

  // src/ds/ext.tsx
  var h3 = react_shim_default.createElement;
  function houseButton(props, children) {
    const B = window.IrisUi?.Button;
    if (B) return h3(B, props, children);
    return h3("button", { type: "button", className: "ix-hit ix-menu-trigger", ...props }, children);
  }
  var DS_BASE = (document.currentScript?.src ?? "").replace(/ext\.js(\?.*)?$/, "");
  function Mark({ size = 64, label = "Iris" }) {
    const px = Math.round(size / 0.7);
    return h3(
      "span",
      { className: "ix-mark", style: { width: size, height: size }, role: "img", "aria-label": label },
      h3("img", {
        src: `${DS_BASE}mark/iris-mark-512.png`,
        srcSet: `${DS_BASE}mark/iris-mark-128.png 128w, ${DS_BASE}mark/iris-mark-256.png 256w, ${DS_BASE}mark/iris-mark-512.png 512w`,
        sizes: `${px}px`,
        width: px,
        height: px,
        alt: "",
        draggable: false
      })
    );
  }
  function Tooltip({ label, children, delay = 320, open: shown }) {
    const [hovered, setOpen] = useState(false);
    const open = shown ?? hovered;
    const timer = useRef(null);
    const id = useId();
    const show = useCallback(() => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setOpen(true), delay);
    }, [delay]);
    const hide = useCallback(() => {
      window.clearTimeout(timer.current);
      setOpen(false);
    }, []);
    useEffect(() => () => window.clearTimeout(timer.current), []);
    return h3(
      "span",
      {
        className: "ix-tip",
        "data-open": open ? "1" : "0",
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide
      },
      h3("span", { className: "ix-tip-anchor", "aria-describedby": open ? id : void 0 }, children),
      h3("span", { className: "ix-tip-body", role: "tooltip", id }, label)
    );
  }
  function Menu({
    items,
    label = "More",
    side = "start",
    trigger,
    align,
    defaultOpen = false
  }) {
    const [open, setOpen] = useState(defaultOpen);
    const handOpened = useRef(false);
    const host = useRef(null);
    const list = useRef(null);
    const rows = (items ?? []).filter((it) => (it.kind ?? "item") === "item" && !it.disabled);
    useEffect(() => {
      if (!open) return;
      const onDoc = (e) => {
        if (!host.current?.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }, [open]);
    useEffect(() => {
      if (open && handOpened.current) list.current?.querySelector('[role="menuitem"], [role="menuitemcheckbox"]')?.focus();
      handOpened.current = true;
    }, [open]);
    const onKey = (e) => {
      const nodes = Array.from(list.current?.querySelectorAll('[role="menuitem"]') ?? []);
      const at = nodes.indexOf(document.activeElement);
      if (e.key === "Escape") {
        setOpen(false);
        host.current?.querySelector(".ix-menu-trigger")?.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        nodes[Math.min(at + 1, nodes.length - 1)]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        nodes[Math.max(at - 1, 0)]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        nodes[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        nodes[nodes.length - 1]?.focus();
      } else if (e.key === "Tab") {
        setOpen(false);
      }
    };
    return h3(
      "span",
      { className: "ix-menu-host", ref: host },
      trigger ? h3("span", { className: "ix-menu-trigger", role: "button", "aria-label": label || void 0, onClick: () => setOpen((v) => !v), "aria-haspopup": "menu", "aria-expanded": open, tabIndex: 0, onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen((v) => !v)) }, trigger) : houseButton(
        {
          variant: "glass",
          size: "sm",
          onClick: () => setOpen((v) => !v),
          "aria-haspopup": "menu",
          "aria-expanded": open
        },
        h3("span", { className: "ix-menu-trigger-inner" }, label, h3("span", { "aria-hidden": "true" }, "\u2304"))
      ),
      open ? h3(
        "div",
        {
          className: "ix-menu",
          role: "menu",
          ref: list,
          "data-side": (align ?? side) === "end" ? "end" : "start",
          onKeyDown: onKey
        },
        (items ?? []).map((it, i) => {
          const kind = it.kind ?? "item";
          if (kind === "sep") return h3("div", { className: "ix-menu-sep", key: i, role: "separator" });
          if (kind === "label") return h3("div", { className: "ix-menu-label", key: i }, it.label);
          return h3(
            "button",
            {
              key: i,
              type: "button",
              role: it.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              className: "ix-menu-item ix-hit",
              "aria-checked": it.checked === void 0 ? void 0 : it.checked,
              "data-danger": it.danger ? "1" : void 0,
              disabled: it.disabled,
              onClick: () => {
                it.onSelect?.();
                setOpen(false);
              }
            },
            it.icon ?? null,
            h3("span", null, it.label),
            it.shortcut ? h3("span", { className: "ix-menu-key" }, it.shortcut) : null
          );
        })
      ) : null
    );
  }
  function Stage({ children }) {
    return h3("div", { className: "ix-stage" }, children);
  }
  function Dialog({
    open,
    onClose,
    title,
    body,
    actions = [],
    danger
  }) {
    const id = useId();
    useEffect(() => {
      if (!open) return;
      const onKey = (e) => e.key === "Escape" && onClose?.();
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);
    if (!open) return null;
    return h3(
      Stage,
      null,
      h3(
        "div",
        {
          className: "ix-scrim",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": id,
          onClick: (e) => e.target === e.currentTarget && onClose?.()
        },
        h3(
          "div",
          { className: "ix-dialog" },
          h3("h2", { id }, title),
          body ? h3("p", null, body) : null,
          h3(
            "div",
            { className: "ix-dialog-actions" },
            actions.map(
              (a, i) => houseButton(
                {
                  key: i,
                  variant: a.variant ?? (a.danger ? "danger" : i === 0 ? "primary" : "glass"),
                  size: i === 0 ? "lg" : "md",
                  onClick: () => {
                    a.onClick?.();
                    onClose?.();
                  }
                },
                a.label
              )
            )
          )
        )
      )
    );
  }
  function Sheet({
    open,
    onClose,
    title,
    sub,
    side = "bottom",
    children
  }) {
    useEffect(() => {
      if (!open) return;
      const onKey = (e) => e.key === "Escape" && onClose?.();
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);
    if (!open) return null;
    return h3(
      Stage,
      null,
      h3(
        "div",
        { className: "ix-scrim", onClick: (e) => e.target === e.currentTarget && onClose?.() },
        h3(
          "div",
          { className: "ix-sheet", "data-side": side === "end" ? "end" : "bottom", role: "dialog", "aria-modal": "true" },
          side === "bottom" ? h3("div", { className: "ix-sheet-grip", "aria-hidden": "true" }) : null,
          title ? h3("h2", { className: "ix-sheet-title" }, title) : null,
          sub ? h3("p", { className: "ix-sheet-sub" }, sub) : null,
          h3("div", { className: "ix-sheet-body" }, children)
        )
      )
    );
  }
  function Snackbar({
    text,
    tone = "accent",
    action,
    onAction
  }) {
    return h3(
      "div",
      { className: "ix-snack", "data-tone": tone, role: "status", "aria-live": "polite" },
      h3("span", { className: "ix-snack-dot", "aria-hidden": "true" }),
      h3("span", { className: "ix-snack-text" }, text),
      action ? h3("button", { type: "button", className: "ix-snack-action ix-hit", onClick: onAction }, action) : null
    );
  }
  function Badge({
    children,
    count,
    dot,
    tone = "accent",
    max = 99
  }) {
    const label = dot ? "" : String(Math.min(count ?? 0, max)) + ((count ?? 0) > max ? "+" : "");
    return h3(
      "span",
      { className: "ix-badge-host" },
      children,
      h3(
        "span",
        {
          className: "ix-badge",
          "data-tone": tone,
          "data-dot": dot ? "1" : void 0,
          "aria-hidden": dot || !count ? "true" : void 0
        },
        label
      ),
      dot || !count ? null : h3("span", { className: "ix-visually-hidden" }, `${count} new`)
    );
  }
  function Slider({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    unit,
    format
  }) {
    const [inner, setInner] = useState(value ?? min);
    const now = value ?? inner;
    const pct = (now - min) / (max - min) * 100;
    const shown = format ? format(now) : `${now}${unit ? " " + unit : ""}`;
    return h3(
      "label",
      { className: "ix-slider" },
      h3(
        "span",
        { className: "ix-slider-top" },
        label ? h3("span", { className: "ix-slider-label" }, label) : h3("span", null),
        h3("span", { className: "ix-slider-value" }, shown)
      ),
      h3("input", {
        type: "range",
        min,
        max,
        step,
        value: now,
        "aria-label": label ?? "Value",
        style: { ["--ix-fill"]: pct + "%" },
        onChange: (e) => {
          const v = Number(e.target.value);
          setInner(v);
          onChange?.(v);
        }
      })
    );
  }
  function TextArea({
    label,
    value,
    onChange,
    placeholder,
    rows = 3,
    maxLength
  }) {
    const id = useId();
    return h3(
      "div",
      { className: "ix-field" },
      label ? h3("label", { className: "ix-field-label", htmlFor: id }, label) : null,
      h3("textarea", {
        id,
        className: "ix-area",
        rows,
        value,
        placeholder,
        maxLength,
        onChange: (e) => onChange?.(e.target.value)
      })
    );
  }
  function Select({
    label,
    value,
    onChange,
    options
  }) {
    const id = useId();
    const list = options.map((o) => typeof o === "string" ? { value: o, label: o } : o);
    return h3(
      "div",
      { className: "ix-field" },
      label ? h3("label", { className: "ix-field-label", htmlFor: id }, label) : null,
      h3(
        "select",
        { id, className: "ix-select", value, onChange: (e) => onChange?.(e.target.value) },
        list.map((o) => h3("option", { key: o.value, value: o.value }, o.label))
      )
    );
  }
  function SearchField({
    value,
    onChange,
    placeholder = "Search",
    busy,
    children
  }) {
    const [focus, setFocus] = useState(false);
    return h3(
      "div",
      { className: "ix-search-field" },
      h3(
        "div",
        { className: "ix-search", "data-focus": focus ? "1" : "0" },
        h3("span", { className: "ix-search-glass", "aria-hidden": "true" }, "\u2315"),
        h3("input", {
          type: "search",
          value,
          placeholder,
          "aria-label": placeholder,
          onFocus: () => setFocus(true),
          onBlur: () => setFocus(false),
          onChange: (e) => onChange?.(e.target.value)
        }),
        busy ? h3("span", { className: "ix-spin", role: "status", "aria-label": "Searching" }) : null,
        value ? h3(
          "button",
          {
            type: "button",
            className: "ix-search-clear ix-hit",
            "aria-label": "Clear",
            onClick: () => onChange?.("")
          },
          "\xD7"
        ) : null
      ),
      children ? h3("div", { className: "ix-results" }, children) : null
    );
  }
  function Tabs({
    items,
    active = 0,
    onSelect
  }) {
    const host = useRef(null);
    const [ink, setInk] = useState({ left: 0, width: 0 });
    useEffect(() => {
      const nodes = Array.from(host.current?.querySelectorAll(".ix-tab") ?? []);
      const el = nodes[active];
      if (el) setInk({ left: el.offsetLeft, width: el.offsetWidth });
    }, [active, items.join("|")]);
    return h3(
      "div",
      { className: "ix-tabs", role: "tablist", ref: host },
      items.map(
        (label, i) => h3(
          "button",
          {
            key: label,
            type: "button",
            role: "tab",
            className: "ix-tab",
            "aria-selected": i === active,
            tabIndex: i === active ? 0 : -1,
            onClick: () => onSelect?.(i),
            onKeyDown: (e) => {
              if (e.key === "ArrowRight") onSelect?.(Math.min(i + 1, items.length - 1));
              if (e.key === "ArrowLeft") onSelect?.(Math.max(i - 1, 0));
            }
          },
          label
        )
      ),
      h3("span", { className: "ix-tab-ink", "aria-hidden": "true", style: { transform: `translateX(${ink.left}px)`, width: ink.width + "px" } })
    );
  }
  function Steps({ items, active = 0 }) {
    return h3(
      "div",
      { className: "ix-steps-wrap" },
      h3(
        "ol",
        { className: "ix-steps" },
        items.map(
          (label, i) => h3(
            "li",
            {
              key: label,
              className: "ix-step",
              "data-state": i < active ? "done" : i === active ? "now" : "next",
              "aria-current": i === active ? "step" : void 0
            },
            h3("span", { className: "ix-step-dot" }, i < active ? "\u2713" : String(i + 1)),
            h3("span", { className: "ix-step-label" }, label),
            i < items.length - 1 ? h3("span", { className: "ix-step-line", "data-done": i < active ? "1" : "0" }) : null
          )
        )
      )
    );
  }
  function EmptyState({
    title,
    line,
    action,
    icon: icon2,
    children
  }) {
    const Icon = window.IrisUi?.Icon;
    return h3(
      "div",
      { className: "ix-empty" },
      icon2 && Icon ? h3("span", { className: "ix-empty-icon", "aria-hidden": "true" }, h3(Icon, { name: icon2, size: 22 })) : null,
      h3("span", { className: "ix-empty-title" }, title),
      line ? h3("span", { className: "ix-empty-line" }, line) : null,
      action || children ? h3("div", { className: "ix-empty-actions" }, action ? houseButton({ variant: "glass", size: "sm", onClick: action.onClick }, action.label) : children) : null
    );
  }
  function Divider({ label, inset }) {
    if (!label) return h3("hr", { className: "ix-divider", "data-inset": inset ? "1" : void 0 });
    return h3(
      "div",
      { className: "ix-divider", role: "separator", "aria-label": label, "data-label": label, "data-inset": inset ? "1" : void 0 },
      h3("span", null, label)
    );
  }
  function Toolbar({
    items = [],
    title,
    variant = "docked",
    trailing
  }) {
    const host = useRef(null);
    const onKey = (e) => {
      const nodes = Array.from(host.current?.querySelectorAll("button:not([disabled])") ?? []);
      const at = nodes.indexOf(document.activeElement);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nodes[Math.min(at + 1, nodes.length - 1)]?.focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        nodes[Math.max(at - 1, 0)]?.focus();
      }
    };
    return h3(
      "div",
      {
        className: "ix-toolbar",
        "data-variant": variant,
        role: "toolbar",
        "aria-label": title ?? "Actions",
        ref: host,
        onKeyDown: onKey
      },
      title ? h3("span", { className: "ix-toolbar-title" }, title) : null,
      items.map(
        (it) => h3(
          "button",
          {
            key: it.label,
            type: "button",
            className: "ix-toolbar-btn ix-hit",
            "aria-pressed": it.active === void 0 ? void 0 : it.active,
            "data-active": it.active ? "1" : void 0,
            "data-danger": it.danger ? "1" : void 0,
            disabled: it.disabled,
            onClick: it.onSelect
          },
          it.icon ?? null,
          h3("span", null, it.label)
        )
      ),
      trailing ? h3("span", { className: "ix-toolbar-trailing" }, trailing) : null
    );
  }
  var DAYS = ["mo", "tu", "we", "th", "fr", "sa", "su"];
  var MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  function monthGrid(year, month) {
    const first = new Date(Date.UTC(year, month, 1));
    const lead = (first.getUTCDay() + 6) % 7;
    const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    const cells = Array(lead).fill(null);
    for (let d = 1; d <= days; d++) cells.push(d);
    while (cells.length % 7) cells.push(null);
    return cells;
  }
  var dayName = (day) => {
    const d = /* @__PURE__ */ new Date(`${day}T00:00:00Z`);
    return `${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()].slice(0, 3)}`;
  };
  var iso = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  function DatePicker({
    value,
    onChange,
    year,
    month,
    min,
    max,
    label,
    showToday = true
  }) {
    const today = /* @__PURE__ */ new Date();
    const selected = value ? /* @__PURE__ */ new Date(`${value}T00:00:00Z`) : null;
    const start = selected ?? today;
    const [view, setView] = useState({
      y: year ?? start.getUTCFullYear?.() ?? start.getFullYear(),
      m: month ?? start.getMonth()
    });
    const step = (by) => {
      const next = new Date(Date.UTC(view.y, view.m + by, 1));
      setView({ y: next.getUTCFullYear(), m: next.getUTCMonth() });
    };
    const todayIso = iso(today.getFullYear(), today.getMonth(), today.getDate());
    const cells = monthGrid(view.y, view.m);
    return h3(
      "div",
      { className: "ix-datepicker", role: "group", "aria-label": label ?? "Pick a day" },
      h3(
        "div",
        { className: "ix-dp-head" },
        h3(
          "button",
          { type: "button", className: "ix-dp-nav ix-hit", "aria-label": "Previous month", onClick: () => step(-1) },
          "\u2039"
        ),
        h3("span", { className: "ix-dp-month" }, `${MONTHS[view.m]} ${view.y}`),
        h3(
          "button",
          { type: "button", className: "ix-dp-nav ix-hit", "aria-label": "Next month", onClick: () => step(1) },
          "\u203A"
        )
      ),
      h3(
        "div",
        { className: "ix-dp-week", "aria-hidden": "true" },
        DAYS.map((d) => h3("span", { key: d }, d))
      ),
      h3(
        "div",
        { className: "ix-dp-grid", role: "grid" },
        cells.map((d, i) => {
          if (d === null) return h3("span", { key: `e${i}`, className: "ix-dp-empty" });
          const day = iso(view.y, view.m, d);
          const off = min && day < min || max && day > max;
          return h3(
            "button",
            {
              key: day,
              type: "button",
              role: "gridcell",
              className: "ix-dp-day ix-hit",
              "data-selected": value === day ? "1" : void 0,
              "data-today": day === todayIso ? "1" : void 0,
              "aria-selected": value === day,
              "aria-current": day === todayIso ? "date" : void 0,
              "aria-label": `${d} ${MONTHS[view.m]} ${view.y}`,
              disabled: !!off,
              onClick: () => onChange?.(day)
            },
            String(d)
          );
        })
      ),
      showToday ? h3(
        "div",
        { className: "ix-dp-foot" },
        houseButton({ variant: "glass", size: "sm", onClick: () => onChange?.(todayIso) }, "Today"),
        h3("span", { className: "ix-dp-hint" }, value ? dayName(value) : "No day chosen")
      ) : null
    );
  }
  function TimePicker({
    value = "09:00",
    onChange,
    step = 5,
    label
  }) {
    const [hour, minute] = value.split(":").map((x) => Number(x));
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);
    const two = (n) => String(n).padStart(2, "0");
    const set = (nh, nm) => onChange?.(`${two(nh)}:${two(nm)}`);
    return h3(
      "div",
      { className: "ix-timepicker", role: "group", "aria-label": label ?? "Pick a time" },
      h3("span", { className: "ix-tp-value", "aria-live": "polite" }, `${two(hour)}:${two(minute)}`),
      h3(
        "div",
        { className: "ix-tp-row" },
        h3("span", { className: "ix-tp-label" }, "hour"),
        h3(
          "div",
          { className: "ix-tp-strip" },
          hours.map(
            (x) => h3(
              "button",
              {
                key: x,
                type: "button",
                className: "ix-tp-chip ix-hit",
                "data-on": x === hour ? "1" : void 0,
                "aria-pressed": x === hour,
                onClick: () => set(x, minute)
              },
              two(x)
            )
          )
        )
      ),
      h3(
        "div",
        { className: "ix-tp-row" },
        h3("span", { className: "ix-tp-label" }, "minute"),
        h3(
          "div",
          { className: "ix-tp-strip" },
          minutes.map(
            (x) => h3(
              "button",
              {
                key: x,
                type: "button",
                className: "ix-tp-chip ix-hit",
                "data-on": x === minute ? "1" : void 0,
                "aria-pressed": x === minute,
                onClick: () => set(hour, x)
              },
              two(x)
            )
          )
        )
      ),
      h3(
        "div",
        { className: "ix-tp-foot" },
        houseButton(
          {
            variant: "glass",
            size: "sm",
            onClick: () => {
              const now = /* @__PURE__ */ new Date();
              set(now.getHours(), Math.round(now.getMinutes() / step) * step % 60);
            }
          },
          "Now"
        ),
        h3("span", { className: "ix-dp-hint" }, step === 1 ? "every minute" : `every ${step} minutes`)
      )
    );
  }
  function AppBar({
    title,
    sub,
    leading,
    actions,
    variant = "small",
    children
  }) {
    return h3(
      "header",
      { className: "ix-appbar", "data-variant": variant },
      h3(
        "div",
        { className: "ix-appbar-row" },
        leading ? h3("span", { className: "ix-appbar-leading" }, leading) : null,
        variant === "small" ? h3("div", { className: "ix-appbar-text" }, h3("h2", { className: "ix-appbar-title" }, title), sub ? h3("p", { className: "ix-appbar-sub" }, sub) : null) : h3("span", null),
        h3("span", { className: "ix-appbar-actions" }, actions)
      ),
      variant === "large" ? h3("h2", { className: "ix-appbar-large" }, title) : null,
      variant === "large" && sub ? h3("p", { className: "ix-appbar-sub" }, sub) : null,
      children ? h3("div", { className: "ix-appbar-body" }, children) : null
    );
  }
  function NavRail({
    items = [],
    collapsed,
    onToggle,
    trailing,
    label = "Sections"
  }) {
    const [shrunk, setShrunk] = useState(!!collapsed);
    const now = onToggle ? !!collapsed : shrunk;
    const toggle = () => {
      setShrunk((v) => !v);
      onToggle?.();
    };
    return h3(
      "nav",
      { className: "ix-rail", "data-collapsed": now ? "1" : void 0, "aria-label": label },
      h3(
        "ul",
        { className: "ix-rail-list" },
        items.map(
          (it) => h3(
            "li",
            { key: it.label },
            h3(
              "button",
              {
                type: "button",
                className: "ix-rail-item ix-hit",
                "aria-current": it.active ? "page" : void 0,
                "aria-label": now ? it.label : void 0,
                onClick: it.onSelect
              },
              h3("span", { className: "ix-rail-icon", "aria-hidden": "true" }, it.icon ?? "\u2022"),
              now ? null : h3("span", { className: "ix-rail-label" }, it.label)
            )
          )
        )
      ),
      h3(
        "div",
        { className: "ix-rail-foot" },
        trailing ?? null,
        h3(
          "button",
          {
            type: "button",
            className: "ix-rail-item ix-hit ix-rail-toggle",
            "aria-expanded": !now,
            onClick: toggle
          },
          h3("span", { className: "ix-rail-icon", "aria-hidden": "true" }, now ? "\xBB" : "\xAB"),
          now ? null : h3("span", { className: "ix-rail-label" }, "Collapse")
        )
      )
    );
  }
  function SplitButton({
    children,
    onSelect,
    items,
    variant = "primary",
    size = "md"
  }) {
    return h3(
      "span",
      { className: "ix-split" },
      houseButton({ variant, size, onClick: onSelect }, children),
      h3(
        "span",
        { className: "ix-split-caret" },
        h3(Menu, {
          label: "More actions",
          align: "end",
          items,
          // The caret wears the house button's own classes, so both halves share one fill, one height, one shape.
          trigger: h3("span", { className: `ix-split-btn iris-btn iris-btn-${variant} iris-btn-${size}`, "aria-hidden": "true" }, "\u2304")
        })
      )
    );
  }
  function Carousel({
    children,
    gap = 12,
    snap = "start",
    arrows = false,
    label = "Items"
  }) {
    const track = useRef(null);
    const slides = Array.isArray(children) ? children.filter(Boolean) : children ? [children] : [];
    const [at, setAt] = useState(0);
    const onScroll = () => {
      const el = track.current;
      if (!el) return;
      const width = el.clientWidth;
      const index = Math.round(el.scrollLeft / Math.max(1, width));
      setAt(Math.min(index, slides.length - 1));
    };
    const go = (by) => {
      const el = track.current;
      if (!el) return;
      el.scrollBy({ left: by * el.clientWidth, behavior: "smooth" });
    };
    return h3(
      "div",
      { className: "ix-carousel", role: "group", "aria-label": label },
      h3(
        "div",
        {
          className: "ix-carousel-track",
          ref: track,
          onScroll,
          style: { gap: `${gap}px`, scrollSnapType: `x mandatory`, scrollPaddingLeft: "0" }
        },
        slides.map(
          (slide, i) => h3("div", { className: "ix-carousel-slide", key: i, style: { scrollSnapAlign: snap } }, slide)
        )
      ),
      h3(
        "div",
        { className: "ix-carousel-foot" },
        arrows ? h3(
          "button",
          { type: "button", className: "ix-carousel-arrow ix-hit", "aria-label": "Previous", onClick: () => go(-1) },
          "\u2039"
        ) : null,
        h3(
          "div",
          { className: "ix-carousel-dots" },
          slides.map(
            (_, i) => h3("button", {
              key: i,
              type: "button",
              className: "ix-carousel-dot",
              "data-on": i === at ? "1" : void 0,
              "aria-label": `Slide ${i + 1}`,
              "aria-current": i === at ? "true" : void 0,
              onClick: () => {
                const el = track.current;
                if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
              }
            })
          )
        ),
        arrows ? h3("button", { type: "button", className: "ix-carousel-arrow ix-hit", "aria-label": "Next", onClick: () => go(1) }, "\u203A") : null
      )
    );
  }
  var YOU = 3;
  function bubbleArc(i) {
    const at = (deg) => {
      const a = (deg - 90) * Math.PI / 180;
      return `${(17 + 15 * Math.cos(a)).toFixed(2)} ${(17 + 15 * Math.sin(a)).toFixed(2)}`;
    };
    return `M ${at(i * 60 + 7)} A 15 15 0 0 1 ${at((i + 1) * 60 - 7)}`;
  }
  function LoopBubble({ title, step = 0, size = 34 }) {
    const design = window.IrisUi?.design ?? {};
    const colours = design.PHASE_COLOURS ?? [];
    const phases = design.PHASES ?? [];
    const now = Math.max(0, Math.min(5, Math.round(step)));
    return h3(
      "span",
      { className: "ix-bubble", role: "img", "aria-label": `${title}, ${phases[now] ?? ""}`, style: { width: size, height: size } },
      h3(
        "svg",
        { viewBox: "0 0 34 34", width: size, height: size, "aria-hidden": "true" },
        h3("circle", { className: "ix-bubble-disc", cx: 17, cy: 17, r: 14 }),
        [0, 1, 2, 3, 4, 5].map(
          (i) => h3("path", {
            key: i,
            d: bubbleArc(i),
            pathLength: 1,
            className: "ix-bubble-arc",
            "data-state": i === now ? now === YOU ? "you" : "now" : i < now ? "done" : "next",
            style: { "--arc": colours[i], animationDelay: `${i * 70}ms` }
          })
        ),
        h3("text", { className: "ix-bubble-letter", x: 17, y: 17 }, title.slice(0, 1).toUpperCase())
      )
    );
  }
  var waits = (c) => (c.loops ?? []).some((l) => l.step === YOU);
  function CircleStack({
    items,
    open: openProp,
    onOpenChange,
    onSelect
  }) {
    const [openState, setOpenState] = useState(false);
    const open = openProp ?? openState;
    const setOpen = (o) => {
      setOpenState(o);
      onOpenChange && onOpenChange(o);
    };
    const rank = (c) => waits(c) ? 0 : (c.unread ?? 0) > 0 ? 1 : 2;
    const circles = items.map((c, i) => ({ c, i })).sort((a, b) => rank(a.c) - rank(b.c) || a.i - b.i).slice(0, 6).map((x) => x.c);
    if (!circles.length) return null;
    if (!open)
      return h3(
        "button",
        { type: "button", className: "ix-circles-edges ix-focus", onClick: () => setOpen(true), "aria-label": `${circles.length} conversations`, "aria-expanded": "false" },
        circles.slice(0, 2).map((c, i) => h3("i", { key: c.id, "data-depth": i })),
        h3("span", { className: "ix-circles-count" }, `+${circles.length}`)
      );
    return h3(
      "ul",
      {
        className: "ix-circles",
        "aria-label": "Conversations",
        onKeyDown: (e) => {
          if (e.key === "Escape") setOpen(false);
        }
      },
      [...circles].reverse().map((c) => {
        const loops = c.loops ?? [];
        const you = waits(c);
        return h3(
          "li",
          { key: c.id },
          h3(
            "button",
            {
              type: "button",
              className: "ix-circle ix-hit",
              onClick: () => {
                setOpen(false);
                onSelect && onSelect(c.id);
              }
            },
            h3(
              "span",
              { className: "ix-circle-text" },
              h3("span", { className: "ix-circle-title" }, c.title),
              h3("span", { className: "ix-circle-line", "data-you": you ? "1" : void 0 }, c.line)
            ),
            loops.length ? h3("span", { className: "ix-circle-loops" }, loops.slice(0, 3).map((l, i) => h3(LoopBubble, { key: i, title: l.title, step: l.step, size: 26 }))) : null,
            loops.length > 3 ? h3("span", { className: "ix-circle-more" }, `+${loops.length - 3}`) : null,
            (c.unread ?? 0) > 0 ? h3("span", { className: "ix-circle-unread" }, h3("span", { className: "ix-visually-hidden" }, "unread")) : null
          )
        );
      })
    );
  }
  var topicVars = (topic) => topic ? window.IrisUi?.design?.topicStyle?.(topic) : void 0;
  var tokenOf = (el, name) => getComputedStyle(el).getPropertyValue(name).trim();
  function rgbOf(colour) {
    const c = document.createElement("canvas").getContext("2d");
    c.fillStyle = colour;
    c.fillRect(0, 0, 1, 1);
    return Array.from(c.getImageData(0, 0, 1, 1).data.slice(0, 3));
  }
  var smooth = (a, b, x) => {
    const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  var stillMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  function canvasOf(w, h4) {
    return Object.assign(document.createElement("canvas"), { width: w, height: h4 });
  }
  var PHOTO_WIDTH = 720;
  function grey(ctx, z) {
    const v = Math.round(z * 255);
    ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;
  }
  function sceneOf(el, W, H) {
    const photo = canvasOf(W, H), depth = canvasOf(W, H);
    const p = photo.getContext("2d"), d = depth.getContext("2d");
    const bg = tokenOf(el, "--bg"), k = tokenOf(el, "--k") || tokenOf(el, "--accent"), k2 = tokenOf(el, "--k2") || tokenOf(el, "--violet");
    const sky = p.createLinearGradient(0, 0, 0, H * 0.75);
    sky.addColorStop(0, bg);
    sky.addColorStop(1, k2);
    p.fillStyle = sky;
    p.fillRect(0, 0, W, H);
    grey(d, 0.04);
    d.fillRect(0, 0, W, H);
    p.fillStyle = tokenOf(el, "--wait");
    p.beginPath();
    p.arc(W * 0.72, H * 0.3, W * 0.07, 0, 7);
    p.fill();
    const ridge = (base, amp, freq, tint, z) => {
      const path = new Path2D();
      path.moveTo(0, H);
      for (let x = 0; x <= W; x += 8) path.lineTo(x, H * base - Math.sin(x / W * Math.PI * freq + base * 9) * H * amp);
      path.lineTo(W, H);
      p.fillStyle = bg;
      p.fill(path);
      p.globalAlpha = tint;
      p.fillStyle = k;
      p.fill(path);
      p.globalAlpha = 1;
      grey(d, z);
      d.fill(path);
    };
    ridge(0.58, 0.05, 3, 0.35, 0.22);
    ridge(0.74, 0.04, 2, 0.18, 0.4);
    const figure = new Path2D();
    figure.arc(W * 0.34, H * 0.5, H * 0.1, 0, 7);
    figure.ellipse(W * 0.34, H * 0.98, W * 0.19, H * 0.32, 0, 0, 7);
    const lit = p.createLinearGradient(W * 0.18, 0, W * 0.5, 0);
    lit.addColorStop(0, bg);
    lit.addColorStop(1, tokenOf(el, "--dim"));
    p.fillStyle = lit;
    p.fill(figure);
    grey(d, 0.88);
    d.fill(figure);
    return { photo, depth };
  }
  function load(src) {
    return new Promise((ok, fail) => {
      const i = new Image();
      i.crossOrigin = "anonymous";
      i.onload = () => ok(i);
      i.onerror = fail;
      i.src = src;
    });
  }
  async function pairOf(el, src, depthSrc, ratio2) {
    if (!src) return sceneOf(el, PHOTO_WIDTH, Math.round(PHOTO_WIDTH / ratio2));
    const img = await load(src);
    const W = PHOTO_WIDTH, H = Math.round(W * img.height / img.width);
    const photo = canvasOf(W, H), depth = canvasOf(W, H);
    photo.getContext("2d").drawImage(img, 0, 0, W, H);
    const d = depth.getContext("2d");
    if (depthSrc) d.drawImage(await load(depthSrc), 0, 0, W, H);
    else {
      const down = d.createLinearGradient(0, 0, 0, H);
      down.addColorStop(0, "rgb(20, 20, 20)");
      down.addColorStop(1, "rgb(170, 170, 170)");
      d.fillStyle = down;
      d.fillRect(0, 0, W, H);
      const mid = d.createRadialGradient(W / 2, H * 0.6, 0, W / 2, H * 0.6, W * 0.45);
      mid.addColorStop(0, "rgb(90, 90, 90)");
      mid.addColorStop(1, "rgb(0, 0, 0)");
      d.globalCompositeOperation = "lighter";
      d.fillStyle = mid;
      d.fillRect(0, 0, W, H);
    }
    return { photo, depth };
  }
  var pixelsOf = (c) => c.getContext("2d").getImageData(0, 0, c.width, c.height);
  function nearOf({ photo, depth }, threshold) {
    const f = pixelsOf(photo), z = pixelsOf(depth).data, alpha = new Float32Array(photo.width * photo.height);
    for (let i = 0; i < alpha.length; i++) {
      alpha[i] = smooth(threshold - 0.035, threshold + 0.035, z[i * 4] / 255);
      f.data[i * 4 + 3] = 255 * alpha[i];
    }
    const near = canvasOf(photo.width, photo.height);
    near.getContext("2d").putImageData(f, 0, 0);
    return { near, alpha };
  }
  function placeWord(word, font, alpha, W, H) {
    const m = canvasOf(W / 4, H / 4), mc = m.getContext("2d", { willReadFrequently: true });
    let px = W * 0.26;
    mc.font = font(px / 4);
    while (mc.measureText(word).width > m.width * 0.9 && px > 20) {
      px *= 0.94;
      mc.font = font(px / 4);
    }
    let best = { y: 0.4, px, hidden: 0, score: Infinity };
    for (const size of [1, 0.86, 0.74]) {
      if (best.hidden <= 0.35 && best.score < Infinity) break;
      for (let y = 0.14; y <= 0.8; y += 0.02) {
        mc.clearRect(0, 0, m.width, m.height);
        mc.font = font(px * size / 4);
        mc.textAlign = "center";
        mc.textBaseline = "middle";
        mc.fillStyle = "#fff";
        mc.fillText(word, m.width / 2, m.height * y);
        const t = mc.getImageData(0, 0, m.width, m.height).data;
        let all = 0, gone = 0;
        for (let yy = 0; yy < m.height; yy++)
          for (let xx = 0; xx < m.width; xx++) {
            const a = t[(yy * m.width + xx) * 4 + 3] / 255;
            if (!a) continue;
            all += a;
            gone += a * alpha[yy * 4 * W + xx * 4];
          }
        const hidden = all ? gone / all : 0;
        const score = (hidden > 0.35 ? 10 + hidden : Math.abs(hidden - 0.25)) + (1 - size) * 0.3;
        if (score < best.score) best = { y, px: px * size, hidden, score };
      }
    }
    return best;
  }
  function paintPhoto(el, pair, kind, word, threshold) {
    const { photo } = pair, W = photo.width, H = photo.height;
    if (kind === "parallax") {
      return [0, 0.18, 0.4, 0.7].map((limit, i) => {
        const layer = i ? nearOf(pair, limit).near : photo;
        layer.style.setProperty("--z", String(i / 3));
        return layer;
      });
    }
    const out = canvasOf(W, H), ctx = out.getContext("2d");
    if (kind === "duotone") {
      const f = pixelsOf(photo), a = rgbOf(tokenOf(el, "--kd") || tokenOf(el, "--bg")), b = rgbOf(tokenOf(el, "--k") || tokenOf(el, "--accent"));
      for (let i = 0; i < f.data.length; i += 4) {
        const L = smooth(0.05, 0.95, (0.2126 * f.data[i] + 0.7152 * f.data[i + 1] + 0.0722 * f.data[i + 2]) / 255);
        for (let c = 0; c < 3; c++) f.data[i + c] = a[c] + (b[c] - a[c]) * L;
      }
      ctx.putImageData(f, 0, 0);
      return [out];
    }
    const { near, alpha } = nearOf(pair, threshold);
    const family = tokenOf(el, "--font-display") || "system-ui";
    const font = (px) => `900 ${px}px ${family}`;
    const spot = placeWord(word, font, alpha, W, H), y = H * spot.y;
    ctx.drawImage(photo, 0, 0);
    ctx.font = font(spot.px);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const ink = ctx.createLinearGradient(0, y - spot.px / 2, 0, y + spot.px / 2);
    ink.addColorStop(0, tokenOf(el, "--k") || tokenOf(el, "--fg"));
    ink.addColorStop(1, tokenOf(el, "--k2") || tokenOf(el, "--accent"));
    ctx.fillStyle = ink;
    ctx.fillText(word, W / 2, y);
    ctx.drawImage(near, 0, 0);
    return [out];
  }
  function Photo({
    src,
    depth,
    alt,
    kind = "parallax",
    word = "",
    threshold = 0.5,
    topic,
    ratio: ratio2 = 4 / 3,
    motion = "pointer"
  }) {
    const host = useRef(null);
    useEffect(() => {
      const el = host.current;
      if (!el) return;
      let gone = false;
      pairOf(el, src, depth, ratio2).then((pair) => {
        if (gone) return;
        el.style.aspectRatio = `${pair.photo.width} / ${pair.photo.height}`;
        el.replaceChildren(...paintPhoto(el, pair, kind, word, Math.max(0.05, Math.min(0.9, threshold))));
      }).catch(() => {
      });
      return () => {
        gone = true;
      };
    }, [src, depth, kind, word, threshold, topic, ratio2]);
    useEffect(() => {
      const el = host.current;
      if (!el || kind !== "parallax" || stillMotion()) return;
      const set = (x, y) => {
        el.style.setProperty("--px", Math.max(-1, Math.min(1, x)).toFixed(3));
        el.style.setProperty("--py", Math.max(-1, Math.min(1, y)).toFixed(3));
      };
      if (motion === "scroll") {
        const on = () => {
          const r = el.getBoundingClientRect();
          set(0, ((r.top + r.height / 2) / innerHeight - 0.5) * 2);
        };
        on();
        addEventListener("scroll", on, { passive: true });
        return () => removeEventListener("scroll", on);
      }
      const move = (e) => {
        const r = el.getBoundingClientRect();
        set(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2);
      };
      const leave = () => set(0, 0);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    }, [kind, motion]);
    return h3("div", {
      ref: host,
      className: "ix-photo",
      "data-kind": kind,
      role: "img",
      "aria-label": word && kind === "back" ? `${alt}, with the word ${word}` : alt,
      style: { ...topicVars(topic), aspectRatio: String(ratio2) }
    });
  }
  function edgeOf(W, H, R, IN) {
    const w = W - 2 * IN, h4 = H - 2 * IN, r = Math.max(1e-3, Math.min(R - IN, w / 2, h4 / 2));
    const arc = Math.PI * r / 2, x0 = IN, y0 = IN, x1 = IN + w, y1 = IN + h4;
    const legs = [w / 2 - r, arc, h4 - 2 * r, arc, w - 2 * r, arc, h4 - 2 * r, arc, w / 2 - r];
    const on = [
      (t) => [W / 2 + t, y0],
      (t) => [x1 - r + r * Math.cos(-Math.PI / 2 + t / r), y0 + r + r * Math.sin(-Math.PI / 2 + t / r)],
      (t) => [x1, y0 + r + t],
      (t) => [x1 - r + r * Math.cos(t / r), y1 - r + r * Math.sin(t / r)],
      (t) => [x1 - r - t, y1],
      (t) => [x0 + r + r * Math.cos(Math.PI / 2 + t / r), y1 - r + r * Math.sin(Math.PI / 2 + t / r)],
      (t) => [x0, y1 - r - t],
      (t) => [x0 + r + r * Math.cos(Math.PI + t / r), y0 + r + r * Math.sin(Math.PI + t / r)],
      (t) => [x0 + r + t, y0]
    ];
    const length = legs.reduce((a, b) => a + b, 0);
    return {
      length,
      at: (u) => {
        let d = (u % 1 + 1) % 1 * length;
        for (let i = 0; i < 9; i++) {
          if (d <= legs[i]) return on[i](d);
          d -= legs[i];
        }
        return [W / 2, y0];
      }
    };
  }
  function stretch(p, a, b, colour, width, glow = 8) {
    if (b < a) [a, b] = [b, a];
    const { c } = p, n = Math.max(2, Math.ceil((b - a) * p.length / 2));
    c.beginPath();
    for (let i = 0; i <= n; i++) {
      const [x, y] = p.at(a + (b - a) * i / n);
      i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.strokeStyle = colour;
    c.lineWidth = width;
    c.lineCap = "round";
    c.shadowColor = colour;
    c.shadowBlur = glow;
    c.stroke();
  }
  var easeOut = (f) => 1 - Math.pow(1 - f, 3);
  var hairline = (p, o = 0.18) => {
    p.c.globalAlpha = o;
    stretch(p, 0, 1, p.violet, 1.5, 0);
    p.c.globalAlpha = 1;
  };
  var BORDER_PATTERNS = {
    // Refreshing: two comets from the top run down both sides and meet at the bottom.
    comet(p, t) {
      hairline(p);
      for (const [v, colour] of [[0, p.violet], [0.5, p.ice]]) {
        const k = 0.5 * easeOut((t / 1.3 + v) % 1);
        stretch(p, k, Math.max(0, k - 0.09), colour, 3);
        stretch(p, 1 - k, 1 - Math.max(0, k - 0.09), colour, 3);
      }
    },
    // Listening: the whole rim breathes in and out.
    breathe(p, t) {
      const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 2.4));
      p.c.globalAlpha = a;
      stretch(p, 0, 1, p.violet, 2.5, 18 * a);
      p.c.globalAlpha = 1;
    },
    // Thinking: one light goes round with a fading tail.
    orbit(p, t) {
      hairline(p);
      const k = t / 2.2 % 1;
      for (let i = 0; i < 14; i++) {
        p.c.globalAlpha = 1 - i / 14;
        stretch(p, k - i * 0.012, k - (i + 1) * 0.012, i < 3 ? p.ice : p.violet, 3);
      }
      p.c.globalAlpha = 1;
    },
    // Working on a loop: sparks drift round and flicker.
    sparks(p, t) {
      for (let i = 0; i < 26; i++) {
        const [x, y] = p.at((i / 26 + t * 0.12) % 1), f = 0.5 + 0.5 * Math.sin(t * 5 + i * 1.7);
        p.c.beginPath();
        p.c.arc(x, y, 1.2 + 1.3 * f, 0, 7);
        p.c.fillStyle = p.c.shadowColor = i % 3 ? p.violet : p.ice;
        p.c.shadowBlur = 8;
        p.c.globalAlpha = 0.35 + 0.65 * f;
        p.c.fill();
      }
      p.c.globalAlpha = 1;
    },
    // She speaks: a wave of thickness travels round.
    wave(p, t) {
      const n = 120;
      for (let i = 0; i < n; i++) {
        const u = i / n, g = 0.5 + 0.5 * Math.sin(u * Math.PI * 8 - t * 4);
        stretch(p, u, u + 1 / n + 2e-3, g > 0.6 ? p.ice : p.violet, 0.8 + 3.2 * g, 6 * g);
      }
    },
    // A question waits on you: the three colours stream round.
    stream(p, t) {
      const n = 90;
      for (let i = 0; i < n; i++) {
        const u = i / n, k = (u + t * 0.25) % 1;
        stretch(p, u, u + 1 / n + 3e-3, k < 1 / 3 ? p.violet : k < 2 / 3 ? p.ice : p.you, 2.4, 10);
      }
    },
    // A new loop or a notification: two quick beats, then rest.
    heartbeat(p, t) {
      hairline(p, 0.12);
      const f = t % 1.8 / 1.8;
      for (const [start, colour] of [[0, p.violet], [0.18, p.ice]]) {
        const g = (f - start) / 0.5;
        if (g <= 0 || g >= 1) continue;
        const k = 0.5 * easeOut(g);
        p.c.globalAlpha = 1 - g * 0.6;
        stretch(p, k, Math.max(0, k - 0.12), colour, 3);
        stretch(p, 1 - k, 1 - Math.max(0, k - 0.12), colour, 3);
      }
      p.c.globalAlpha = 1;
    },
    // Saving or sending: the rim zips closed from the top and opens again.
    zip(p, t) {
      const f = t % 2.4 / 2.4, fill2 = f < 0.5 ? easeOut(f * 2) : 1 - easeOut((f - 0.5) * 2);
      stretch(p, 0, fill2 * 0.5, p.violet, 2.6, 10);
      stretch(p, 1, 1 - fill2 * 0.5, p.ice, 2.6, 10);
    }
  };
  function BorderPattern({
    pattern = "comet",
    radius,
    label,
    children
  }) {
    const box = useRef(null);
    const paper = useRef(null);
    useEffect(() => {
      const el = box.current, cv = paper.current;
      if (!el || !cv) return;
      const draw = BORDER_PATTERNS[pattern] ?? BORDER_PATTERNS.comet;
      const still = stillMotion();
      let pen = null, frame = 0;
      const size = () => {
        const dpr = Math.min(2, devicePixelRatio || 1), W = el.clientWidth, H = el.clientHeight;
        cv.width = W * dpr;
        cv.height = H * dpr;
        const c = cv.getContext("2d");
        c.scale(dpr, dpr);
        const R = radius ?? (parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0);
        pen = { c, ...edgeOf(W, H, R, 3), violet: tokenOf(el, "--violet"), ice: tokenOf(el, "--accent"), you: tokenOf(el, "--phase-you") };
      };
      const paint = (ms) => {
        if (pen) {
          pen.c.clearRect(0, 0, cv.width, cv.height);
          draw(pen, still ? 0.6 : ms / 1e3);
        }
        if (!still) frame = requestAnimationFrame(paint);
      };
      const watch = new ResizeObserver(() => {
        size();
        if (still) paint(0);
      });
      watch.observe(el);
      size();
      frame = requestAnimationFrame(paint);
      return () => {
        watch.disconnect();
        cancelAnimationFrame(frame);
      };
    }, [pattern, radius]);
    return h3(
      "div",
      { ref: box, className: "ix-border", "data-pattern": pattern, style: radius != null ? { borderRadius: radius } : void 0 },
      h3("canvas", { ref: paper, className: "ix-border-rim", "aria-hidden": "true" }),
      label ? h3("span", { className: "ix-visually-hidden", role: "status" }, label) : null,
      children
    );
  }
  function ChatStack({
    items,
    fanned: fannedAtStart = false,
    current: currentAtStart = null,
    onSelect
  }) {
    const [fanned, setFanned] = useState(fannedAtStart);
    const [current, setCurrent] = useState(currentAtStart);
    const design = window.IrisUi?.design ?? {};
    const urgency = (c) => waits(c) ? 0 : 1;
    const circles = items.map((c, i) => ({ c, i })).sort((a, b) => urgency(a.c) - urgency(b.c) || a.i - b.i).map((x) => x.c);
    if (!circles.length) return null;
    const pick = (id) => {
      setCurrent(id);
      onSelect && onSelect(id);
    };
    const open = circles.find((c) => c.id === current);
    if (open) {
      const loops = open.loops ?? [];
      const lead = loops.find((l) => l.step === YOU) ?? loops[0];
      return h3(
        "section",
        {
          className: "ix-chat-open",
          style: topicVars(open.topic),
          "aria-label": open.title,
          onKeyDown: (e) => e.key === "Escape" && pick(null)
        },
        circles.filter((c) => c !== open).slice(0, 2).map((c, i) => h3("i", { key: c.id, className: "ix-chat-peek", "data-depth": i, style: topicVars(c.topic) })),
        h3(
          "div",
          { className: "ix-chat-sheet" },
          h3(
            "div",
            { className: "ix-chat-head" },
            lead ? h3(LoopBubble, { title: lead.title, step: lead.step, size: 28 }) : null,
            h3(
              "span",
              { className: "ix-chat-text" },
              open.eyebrow ? h3("span", { className: "ix-chat-eyebrow" }, open.eyebrow) : null,
              h3("span", { className: "ix-chat-title" }, open.title)
            )
          ),
          open.message ? h3("p", { className: "ix-chat-message" }, open.message) : null,
          loops.length ? h3("span", { className: "ix-chat-section" }, "Loops") : null,
          loops.length ? h3(
            "ul",
            { className: "ix-chat-loops" },
            loops.map(
              (l, i) => h3(
                "li",
                { key: i, className: "ix-chat-loop", "data-you": l.step === YOU ? "1" : void 0 },
                h3(LoopBubble, { title: l.title, step: l.step, size: 24 }),
                h3(
                  "span",
                  { className: "ix-chat-text" },
                  h3("span", { className: "ix-chat-loop-title" }, l.title),
                  h3(
                    "span",
                    { className: "ix-chat-line" },
                    h3("span", { className: "ix-chat-phase", style: { color: design.PHASE_COLOURS?.[l.step ?? 0] } }, design.PHASES?.[l.step ?? 0] ?? ""),
                    l.line ? `, ${l.line}` : ""
                  )
                )
              )
            )
          ) : null,
          h3(
            "div",
            { className: "ix-chat-actions" },
            (open.actions ?? []).map(
              (a, i) => houseButton({ key: i, variant: a.primary ? "primary" : "glass", size: "sm", topic: open.topic, onClick: a.onClick }, a.label)
            ),
            houseButton({ key: "back", variant: "ghost", size: "sm", onClick: () => pick(null) }, "Back")
          )
        )
      );
    }
    return h3(
      "div",
      {
        className: "ix-chats",
        "data-fanned": fanned ? "1" : void 0,
        style: { "--n": fanned ? circles.length : Math.min(3, circles.length) },
        onKeyDown: (e) => e.key === "Escape" && setFanned(false)
      },
      circles.map((c, i) => {
        const live = fanned || i === 0;
        const loops = c.loops ?? [];
        return h3(
          "button",
          {
            key: c.id,
            type: "button",
            className: "ix-chat ix-focus",
            style: { ...topicVars(c.topic), "--i": i, zIndex: circles.length - i },
            "data-far": !fanned && i > 2 ? "1" : void 0,
            tabIndex: live ? 0 : -1,
            "aria-hidden": live ? void 0 : "true",
            "aria-expanded": fanned ? void 0 : "false",
            "aria-label": fanned || circles.length < 2 ? void 0 : `${c.title}, and ${circles.length - 1} more`,
            onClick: () => fanned ? pick(c.id) : setFanned(true)
          },
          h3(
            "span",
            { className: "ix-chat-text" },
            c.eyebrow ? h3("span", { className: "ix-chat-eyebrow" }, c.eyebrow) : null,
            h3("span", { className: "ix-chat-title" }, c.title),
            h3("span", { className: "ix-chat-line", "data-you": waits(c) ? "1" : void 0 }, c.line)
          ),
          loops.length ? h3("span", { className: "ix-circle-loops" }, loops.slice(0, 3).map((l, j) => h3(LoopBubble, { key: j, title: l.title, step: l.step, size: 24 }))) : null,
          loops.length > 3 ? h3("span", { className: "ix-circle-more" }, `+${loops.length - 3}`) : null
        );
      }),
      !fanned && circles.length > 1 ? h3("span", { className: "ix-circles-count ix-chats-count", "aria-hidden": "true" }, `+${circles.length - 1}`) : null
    );
  }
  var EDGE_COLORS = {
    comet: ["#8B5CF6", "#22D3EE"],
    zip: ["#22D3EE", "#8B5CF6"],
    orbit: ["#7dd3fc", "#ffffff"],
    sparks: ["#8B5CF6", "#22D3EE", "#C026D3"],
    flow: ["#8B5CF6", "#3B82F6", "#C026D3"],
    party: ["#F43F5E", "#FACC15", "#22D3EE"],
    wave: ["#8B5CF6", "#22D3EE"],
    breathe: ["#8B5CF6"],
    heartbeat: ["#F43F5E", "#FDA4AF"],
    aurora: ["#22D3EE", "#34D399", "#A78BFA"]
  };
  var THINKING = ["comet", "zip", "orbit", "sparks", "flow", "party"];
  var hexRgb = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  var mixColor = (cs, t) => {
    if (cs.length < 2) return cs[0];
    const x = Math.min(1, Math.max(0, t)) * (cs.length - 1), i = Math.min(cs.length - 2, Math.floor(x)), f = x - i, a = hexRgb(cs[i]), b = hexRgb(cs[i + 1]);
    return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(",")})`;
  };
  function edgePath(shape, w, ht, r, inset, d, M = 480) {
    if (d) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), p2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      svg.setAttribute("style", "position:absolute;width:0;height:0;visibility:hidden");
      p2.setAttribute("d", d);
      svg.append(p2);
      document.body.append(svg);
      const b = p2.getBBox(), L2 = p2.getTotalLength(), k = Math.min((w - inset * 2) / (b.width || 1), (ht - inset * 2) / (b.height || 1));
      const ox = (w - b.width * k) / 2 - b.x * k, oy = (ht - b.height * k) / 2 - b.y * k, n = Math.max(M, Math.round(L2 * k / 1.5));
      const P = Array.from({ length: n + 1 }, (_, i2) => {
        const q = p2.getPointAtLength(L2 * i2 / n);
        return [ox + q.x * k, oy + q.y * k];
      });
      svg.remove();
      return P;
    }
    if (shape === "ring") {
      const cx = w / 2, cy = ht / 2, rr = Math.min(w, ht) / 2 - inset;
      return Array.from({ length: M + 1 }, (_, k) => {
        const a = Math.PI / 2 + 2 * Math.PI * k / M;
        return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
      });
    }
    const i = inset, p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", `M${w / 2},${ht - i} L${r},${ht - i} A${r - i},${r - i} 0 0 1 ${i},${ht - r} L${i},${r} A${r - i},${r - i} 0 0 1 ${r},${i} L${w - r},${i} A${r - i},${r - i} 0 0 1 ${w - i},${r} L${w - i},${ht - r} A${r - i},${r - i} 0 0 1 ${w - r},${ht - i} Z`);
    const L = p.getTotalLength();
    return Array.from({ length: M + 1 }, (_, k) => {
      const q = p.getPointAtLength(L * k / M);
      return [q.x, q.y];
    });
  }
  function drawEdge(ctx, P, name, cols, stroke, t, round) {
    const M = P.length - 1, color = (i) => cols[i % cols.length], phase = t / round;
    const seg = (a, b) => {
      if (a > b) [a, b] = [b, a];
      if (b - a >= 1) {
        a = 0;
        b = 1;
      }
      const v = Math.floor(a);
      a -= v;
      b -= v;
      const out = [];
      for (let k = Math.round(a * M); k <= Math.round(b * M); k++) out.push(P[k % M]);
      return out;
    };
    const gap = Math.max(12, 3 * Math.hypot(P[1][0] - P[0][0], P[1][1] - P[0][1]));
    const line = (pts, col, w, glow = 6, alpha = 1) => {
      if (pts.length < 2) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.strokeStyle = ctx.shadowColor = col;
      ctx.lineWidth = w;
      ctx.lineCap = ctx.lineJoin = "round";
      ctx.shadowBlur = glow * 2;
      ctx.beginPath();
      pts.forEach(([x, y], k) => k && Math.hypot(x - pts[k - 1][0], y - pts[k - 1][1]) < gap ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
      ctx.stroke();
      ctx.restore();
    };
    if (["comet", "orbit", "heartbeat"].includes(name)) line(P, color(0), stroke * 0.6, 0, 0.18);
    if (name === "breathe") {
      const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(phase * 2 * Math.PI));
      line(P, color(0), stroke * 0.85, 14 * a, a);
    } else if (name === "orbit") {
      const k = 0.5 + phase % 1;
      for (let i = 0; i < 14; i++) line(seg(k - i * 0.012, k - (i + 1) * 0.012), i < 3 ? color(1) : color(0), stroke, 6, 1 - i / 14);
    } else if (name === "sparks") for (let i = 0; i < 28; i++) {
      const u = (i / 28 + phase * 0.15) % 1, f = 0.5 + 0.5 * Math.sin(t * 5 + i * 1.7), [x, y] = P[Math.round(u * M)];
      ctx.save();
      ctx.globalAlpha = 0.35 + 0.65 * f;
      ctx.fillStyle = ctx.shadowColor = color(i);
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(x, y, stroke * (0.5 + 0.6 * f), 0, 7);
      ctx.fill();
      ctx.restore();
    }
    else if (name === "wave") for (let i = 0; i < 120; i++) {
      const u = i / 120, g = 0.5 + 0.5 * Math.sin(u * Math.PI * 8 - phase * 2 * Math.PI);
      line(seg(u, u + 1 / 120 + 2e-3), g > 0.6 ? color(1) : color(0), stroke * (0.3 + 1.1 * g), 6 * g);
    }
    else if (name === "flow") for (let i = 0; i < 90; i++) {
      const u = i / 90, hh = (u + phase * 0.25) % 1;
      line(seg(u, u + 1 / 90 + 3e-3), color(Math.floor(hh * cols.length)), stroke * 0.8, 8);
    }
    else if (name === "heartbeat") {
      const f = phase % 1;
      [0, 0.18].forEach((st, j) => {
        const g = (f - st) / 0.5;
        if (g <= 0 || g >= 1) return;
        const k = 0.5 * easeOut(g), s0 = Math.max(0, k - 0.12);
        line(seg(0.5 - k, 0.5 - s0), color(j), stroke, 6, 1 - g * 0.6);
        line(seg(0.5 + s0, 0.5 + k), color(j), stroke, 6, 1 - g * 0.6);
      });
    } else if (name === "zip") {
      const f = phase % 1, fill2 = f < 0.5 ? easeOut(f * 2) : 1 - easeOut((f - 0.5) * 2);
      line(seg(0.5 - fill2 * 0.5, 0.5), color(0), stroke * 0.85, 8);
      line(seg(0.5, 0.5 + fill2 * 0.5), color(1), stroke * 0.85, 8);
    } else if (name === "aurora") for (let i = 0; i < 96; i++) {
      const u = i / 96, g = 0.5 + 0.5 * Math.sin(u * Math.PI * 6 + phase * 1.3) * Math.cos(u * Math.PI * 2.3 - phase * 0.7);
      line(seg(u, u + 1 / 96 + 3e-3), mixColor(cols, g), stroke * (0.5 + 1.2 * g), 10 * g, 0.45 + 0.55 * g);
    }
    else if (name === "party") {
      const burst = 0.6 + 0.4 * Math.pow(Math.max(0, Math.sin(t * 2 * Math.PI * 2)), 4);
      for (let i = 0; i < 96; i++) {
        const u = i / 96, hh = (u * 3 + phase * 1.5) % 1;
        line(seg(u, u + 1 / 96 + 3e-3), mixColor(cols, hh), stroke * (0.8 + 0.6 * burst), 12 * burst, burst);
      }
    } else {
      const n = cols.length;
      for (let i = 0; i < n; i++) {
        const k = 0.5 * easeOut((phase + i / n) % 1), s0 = Math.max(0, k - 0.09);
        line(seg(0.5 - k, 0.5 - s0), color(i), stroke);
        line(seg(0.5 + s0, 0.5 + k), color(i), stroke);
      }
    }
  }
  function Edge({ pattern = "comet", colors, shape = "ring", path, width = 140, height, radius = 28, stroke = 2.5, speed = 1, round = 1.3 }) {
    const ref = useRef(null);
    const ht = height ?? width, pad = 36;
    const key = [pattern, (colors ?? []).join(), shape, path, width, ht, radius, stroke, speed, round].join("|");
    useEffect(() => {
      const c = ref.current;
      if (!c) return;
      const dpr = Math.min(3, window.devicePixelRatio || 1), W = width + pad * 2, H = ht + pad * 2;
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, pad * dpr, pad * dpr);
      const P = edgePath(shape, width, ht, radius, stroke, path), cols = colors?.length ? colors : EDGE_COLORS[pattern] ?? EDGE_COLORS.comet;
      const still = matchMedia("(prefers-reduced-motion: reduce)").matches, t0 = performance.now();
      let raf = 0, seen = true;
      const frame = (ms) => {
        raf = 0;
        if (!seen) return;
        ctx.clearRect(-pad, -pad, W, H);
        drawEdge(ctx, P, pattern, cols, stroke, still ? 0.6 : Math.max(0, (ms - t0) / 1e3) * speed, round);
        if (!still) raf = requestAnimationFrame(frame);
      };
      const io = new IntersectionObserver(([e]) => {
        seen = e.isIntersecting;
        if (seen && !raf) raf = requestAnimationFrame(frame);
      });
      io.observe(c);
      raf = requestAnimationFrame(frame);
      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
      };
    }, [key]);
    return h3("canvas", { ref, className: "ix-edge", "aria-hidden": "true", style: { width: width + pad * 2, height: ht + pad * 2, margin: -pad } });
  }
  function EdgeText({ text, pattern = "comet", colors, size = 64, weight = 800, speed = 1 }) {
    const ref = useRef(null);
    const [box, setBox] = useState([0, 0, size * text.length * 0.62, size * 1.2]);
    useEffect(() => {
      const b = ref.current?.getBBox();
      if (b) setBox([b.x - 8, b.y - 8, b.width + 16, b.height + 16]);
    }, [text, size, weight]);
    const cols = colors?.length ? colors : EDGE_COLORS[pattern] ?? EDGE_COLORS.comet;
    const t = { x: 0, y: size, fontSize: size, fontWeight: weight, style: { fontFamily: "var(--font-display)" } };
    const dur = `${1.3 / speed}s`;
    return h3(
      "svg",
      {
        className: `ix-edgetext ix-edgetext-${pattern}`,
        viewBox: box.join(" "),
        width: box[2],
        height: box[3],
        role: "img",
        "aria-label": text,
        style: { "--u": `${size / 64}px`, filter: `drop-shadow(0 0 ${size / 16}px ${cols[0]}aa)` }
      },
      h3("text", { ...t, ref, className: "ix-edgetext-tube" }, text),
      cols.slice(0, 3).map((c, i) => h3("text", {
        ...t,
        key: i,
        className: "ix-edgetext-light",
        stroke: c,
        style: { ...t.style, animationDuration: dur, animationDelay: `${-1.3 / speed * (i / cols.length)}s` }
      }, text))
    );
  }
  function thinksWith(Base, ring, fallback) {
    if (!Base) return void 0;
    return Object.assign(function Thinks(props) {
      const { thinking, ...rest } = props;
      const on = props.state === "thinking", size = props.size ?? fallback;
      const [pick, setPick] = useState(() => THINKING[Math.floor(Math.random() * THINKING.length)]);
      const was = useRef(on);
      useEffect(() => {
        if (on && !was.current) setPick(THINKING[Math.floor(Math.random() * THINKING.length)]);
        was.current = on;
      }, [on]);
      return h3(
        "span",
        { className: "ix-thinks" + (on ? " ix-thinks-on" : "") },
        h3(Base, rest),
        on ? h3("span", { className: "ix-thinks-edge" }, h3(Edge, { pattern: thinking ?? pick, width: Math.round(size * ring), stroke: Math.max(1.5, size / 48) })) : null
      );
    }, Base);
  }
  var TalkOrbThinks = thinksWith(window.IrisUi?.TalkOrb, 70 / 60, 66);
  var Orb3DThinks = thinksWith(window.IrisUi?.Orb3D, 0.72, 220);
  function Toggle({ on = false, onChange, label, disabled }) {
    const [own, setOwn] = useState(on);
    const value = onChange ? on : own;
    return h3(
      "button",
      {
        type: "button",
        className: "iris-toggle" + (value ? " on" : ""),
        role: "switch",
        "aria-checked": value,
        "aria-label": label,
        disabled,
        onClick: () => onChange ? onChange(!value) : setOwn(!value)
      },
      h3("i")
    );
  }
  for (const C of [window.WebGL2RenderingContext, window.WebGLRenderingContext]) {
    const shaderSource = C?.prototype?.shaderSource;
    if (!shaderSource || shaderSource.irisFixed) continue;
    const fixed = function(shader, src) {
      return shaderSource.call(this, shader, /float round\(float u\)/.test(src) ? src.replace(/\bround\(/g, "irisRound(") : src);
    };
    fixed.irisFixed = true;
    C.prototype.shaderSource = fixed;
  }
  var SHIPPED = {
    Photo,
    BorderPattern,
    ChatStack,
    LoopBubble,
    CircleStack,
    Tooltip,
    Menu,
    Dialog,
    Sheet,
    Snackbar,
    Badge,
    Slider,
    TextArea,
    Select,
    SearchField,
    Tabs,
    Steps,
    EmptyState,
    Divider,
    Toolbar,
    DatePicker,
    TimePicker,
    AppBar,
    NavRail,
    SplitButton,
    Carousel,
    IrisApp,
    checkApp,
    costOf,
    depthOf,
    Mark,
    Edge,
    EdgeText,
    THINKING,
    Toggle,
    ...TalkOrbThinks ? { TalkOrb: TalkOrbThinks } : {},
    ...Orb3DThinks ? { Orb3D: Orb3DThinks } : {}
  };
  window.IrisUi = Object.assign(window.IrisUi ?? {}, SHIPPED);
  var ext_default = SHIPPED;
})();
