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

  // src/ds/ext.tsx
  var h2 = react_shim_default.createElement;
  function houseButton(props, children) {
    const B = window.IrisUi?.Button;
    if (B) return h2(B, props, children);
    return h2("button", { type: "button", className: "ix-hit ix-menu-trigger", ...props }, children);
  }
  var DS_BASE = (document.currentScript?.src ?? "").replace(/ext\.js(\?.*)?$/, "");
  function Mark({ size = 64, label = "Iris" }) {
    const px = Math.round(size / 0.7);
    return h2(
      "span",
      { className: "ix-mark", style: { width: size, height: size }, role: "img", "aria-label": label },
      h2("img", {
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
  function Tooltip({ label, children, delay = 320 }) {
    const [open, setOpen] = useState(false);
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
    return h2(
      "span",
      {
        className: "ix-tip",
        "data-open": open ? "1" : "0",
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide
      },
      h2("span", { className: "ix-tip-anchor", "aria-describedby": open ? id : void 0 }, children),
      h2("span", { className: "ix-tip-body", role: "tooltip", id }, label)
    );
  }
  function Menu({
    items,
    label = "More",
    side = "start",
    trigger,
    align
  }) {
    const [open, setOpen] = useState(false);
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
      if (open) list.current?.querySelector('[role="menuitem"]')?.focus();
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
    return h2(
      "span",
      { className: "ix-menu-host", ref: host },
      trigger ? h2("span", { className: "ix-menu-trigger", onClick: () => setOpen((v) => !v), "aria-haspopup": "menu", "aria-expanded": open, tabIndex: 0, onKeyDown: (e) => e.key === "Enter" && setOpen((v) => !v) }, trigger) : houseButton(
        {
          variant: "glass",
          size: "sm",
          onClick: () => setOpen((v) => !v),
          "aria-haspopup": "menu",
          "aria-expanded": open
        },
        h2("span", { className: "ix-menu-trigger-inner" }, label, h2("span", { "aria-hidden": "true" }, "\u2304"))
      ),
      open ? h2(
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
          if (kind === "sep") return h2("div", { className: "ix-menu-sep", key: i, role: "separator" });
          if (kind === "label") return h2("div", { className: "ix-menu-label", key: i }, it.label);
          return h2(
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
            h2("span", null, it.label),
            it.shortcut ? h2("span", { className: "ix-menu-key" }, it.shortcut) : null
          );
        })
      ) : null
    );
  }
  function Stage({ children }) {
    return h2("div", { className: "ix-stage" }, children);
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
    return h2(
      Stage,
      null,
      h2(
        "div",
        {
          className: "ix-scrim",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": id,
          onClick: (e) => e.target === e.currentTarget && onClose?.()
        },
        h2(
          "div",
          { className: "ix-dialog" },
          h2("h2", { id }, title),
          body ? h2("p", null, body) : null,
          h2(
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
    return h2(
      Stage,
      null,
      h2(
        "div",
        { className: "ix-scrim", onClick: (e) => e.target === e.currentTarget && onClose?.() },
        h2(
          "div",
          { className: "ix-sheet", "data-side": side === "end" ? "end" : "bottom", role: "dialog", "aria-modal": "true" },
          side === "bottom" ? h2("div", { className: "ix-sheet-grip", "aria-hidden": "true" }) : null,
          title ? h2("h2", { className: "ix-sheet-title" }, title) : null,
          sub ? h2("p", { className: "ix-sheet-sub" }, sub) : null,
          h2("div", { className: "ix-sheet-body" }, children)
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
    return h2(
      "div",
      { className: "ix-snack", "data-tone": tone, role: "status", "aria-live": "polite" },
      h2("span", { className: "ix-snack-dot", "aria-hidden": "true" }),
      h2("span", { className: "ix-snack-text" }, text),
      action ? h2("button", { type: "button", className: "ix-snack-action ix-hit", onClick: onAction }, action) : null
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
    return h2(
      "span",
      { className: "ix-badge-host" },
      children,
      h2(
        "span",
        {
          className: "ix-badge",
          "data-tone": tone,
          "data-dot": dot ? "1" : void 0,
          "aria-hidden": dot || !count ? "true" : void 0
        },
        label
      ),
      dot || !count ? null : h2("span", { className: "ix-visually-hidden" }, `${count} new`)
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
    return h2(
      "label",
      { className: "ix-slider" },
      h2(
        "span",
        { className: "ix-slider-top" },
        label ? h2("span", { className: "ix-slider-label" }, label) : h2("span", null),
        h2("span", { className: "ix-slider-value" }, shown)
      ),
      h2("input", {
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
    return h2(
      "div",
      { className: "ix-field" },
      label ? h2("label", { className: "ix-field-label", htmlFor: id }, label) : null,
      h2("textarea", {
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
    return h2(
      "div",
      { className: "ix-field" },
      label ? h2("label", { className: "ix-field-label", htmlFor: id }, label) : null,
      h2(
        "select",
        { id, className: "ix-select", value, onChange: (e) => onChange?.(e.target.value) },
        list.map((o) => h2("option", { key: o.value, value: o.value }, o.label))
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
    return h2(
      "div",
      { className: "ix-search-field" },
      h2(
        "div",
        { className: "ix-search", "data-focus": focus ? "1" : "0" },
        h2("span", { className: "ix-search-glass", "aria-hidden": "true" }, "\u2315"),
        h2("input", {
          type: "search",
          value,
          placeholder,
          "aria-label": placeholder,
          onFocus: () => setFocus(true),
          onBlur: () => setFocus(false),
          onChange: (e) => onChange?.(e.target.value)
        }),
        busy ? h2("span", { className: "ix-spin", role: "status", "aria-label": "Searching" }) : null,
        value ? h2(
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
      children ? h2("div", { className: "ix-results" }, children) : null
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
    return h2(
      "div",
      { className: "ix-tabs", role: "tablist", ref: host },
      items.map(
        (label, i) => h2(
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
      h2("span", { className: "ix-tab-ink", "aria-hidden": "true", style: { transform: `translateX(${ink.left}px)`, width: ink.width + "px" } })
    );
  }
  function Steps({ items, active = 0 }) {
    return h2(
      "ol",
      { className: "ix-steps" },
      items.map(
        (label, i) => h2(
          "li",
          {
            key: label,
            className: "ix-step",
            "data-state": i < active ? "done" : i === active ? "now" : "next",
            "aria-current": i === active ? "step" : void 0
          },
          h2("span", { className: "ix-step-dot" }, i < active ? "\u2713" : String(i + 1)),
          h2("span", { className: "ix-step-label" }, label),
          i < items.length - 1 ? h2("span", { className: "ix-step-line", "data-done": i < active ? "1" : "0" }) : null
        )
      )
    );
  }
  function EmptyState({
    title,
    line,
    action,
    children
  }) {
    return h2(
      "div",
      { className: "ix-empty" },
      h2("span", { className: "ix-empty-icon", "aria-hidden": "true" }, "\u25CB"),
      h2("span", { className: "ix-empty-title" }, title),
      line ? h2("span", { className: "ix-empty-line" }, line) : null,
      action || children ? h2("div", { className: "ix-empty-actions" }, action ? houseButton({ variant: "glass", size: "sm", onClick: action.onClick }, action.label) : children) : null
    );
  }
  function Divider({ label, inset }) {
    return h2("hr", { className: "ix-divider", "data-label": label ?? "", "data-inset": inset ? "1" : void 0 });
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
    return h2(
      "div",
      {
        className: "ix-toolbar",
        "data-variant": variant,
        role: "toolbar",
        "aria-label": title ?? "Actions",
        ref: host,
        onKeyDown: onKey
      },
      title ? h2("span", { className: "ix-toolbar-title" }, title) : null,
      items.map(
        (it) => h2(
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
          h2("span", null, it.label)
        )
      ),
      trailing ? h2("span", { className: "ix-toolbar-trailing" }, trailing) : null
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
    return h2(
      "div",
      { className: "ix-datepicker", role: "group", "aria-label": label ?? "Pick a day" },
      h2(
        "div",
        { className: "ix-dp-head" },
        h2(
          "button",
          { type: "button", className: "ix-dp-nav ix-hit", "aria-label": "Previous month", onClick: () => step(-1) },
          "\u2039"
        ),
        h2("span", { className: "ix-dp-month" }, `${MONTHS[view.m]} ${view.y}`),
        h2(
          "button",
          { type: "button", className: "ix-dp-nav ix-hit", "aria-label": "Next month", onClick: () => step(1) },
          "\u203A"
        )
      ),
      h2(
        "div",
        { className: "ix-dp-week", "aria-hidden": "true" },
        DAYS.map((d) => h2("span", { key: d }, d))
      ),
      h2(
        "div",
        { className: "ix-dp-grid", role: "grid" },
        cells.map((d, i) => {
          if (d === null) return h2("span", { key: `e${i}`, className: "ix-dp-empty" });
          const day = iso(view.y, view.m, d);
          const off = min && day < min || max && day > max;
          return h2(
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
      showToday ? h2(
        "div",
        { className: "ix-dp-foot" },
        houseButton({ variant: "glass", size: "sm", onClick: () => onChange?.(todayIso) }, "Today"),
        h2("span", { className: "ix-dp-hint" }, value ? `Chosen: ${value}` : "No day chosen")
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
    return h2(
      "div",
      { className: "ix-timepicker", role: "group", "aria-label": label ?? "Pick a time" },
      h2("span", { className: "ix-tp-value", "aria-live": "polite" }, `${two(hour)}:${two(minute)}`),
      h2(
        "div",
        { className: "ix-tp-row" },
        h2("span", { className: "ix-tp-label" }, "hour"),
        h2(
          "div",
          { className: "ix-tp-strip" },
          hours.map(
            (x) => h2(
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
      h2(
        "div",
        { className: "ix-tp-row" },
        h2("span", { className: "ix-tp-label" }, "minute"),
        h2(
          "div",
          { className: "ix-tp-strip" },
          minutes.map(
            (x) => h2(
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
      h2(
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
        h2("span", { className: "ix-dp-hint" }, step === 1 ? "every minute" : `every ${step} minutes`)
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
    return h2(
      "header",
      { className: "ix-appbar", "data-variant": variant },
      h2(
        "div",
        { className: "ix-appbar-row" },
        leading ? h2("span", { className: "ix-appbar-leading" }, leading) : null,
        variant === "small" ? h2("h2", { className: "ix-appbar-title" }, title) : h2("span", null),
        h2("span", { className: "ix-appbar-actions" }, actions)
      ),
      variant === "large" ? h2("h2", { className: "ix-appbar-large" }, title) : null,
      sub ? h2("p", { className: "ix-appbar-sub" }, sub) : null,
      children ? h2("div", { className: "ix-appbar-body" }, children) : null
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
    return h2(
      "nav",
      { className: "ix-rail", "data-collapsed": now ? "1" : void 0, "aria-label": label },
      h2(
        "ul",
        { className: "ix-rail-list" },
        items.map(
          (it) => h2(
            "li",
            { key: it.label },
            h2(
              "button",
              {
                type: "button",
                className: "ix-rail-item ix-hit",
                "aria-current": it.active ? "page" : void 0,
                "aria-label": now ? it.label : void 0,
                onClick: it.onSelect
              },
              h2("span", { className: "ix-rail-icon", "aria-hidden": "true" }, it.icon ?? "\u2022"),
              now ? null : h2("span", { className: "ix-rail-label" }, it.label)
            )
          )
        )
      ),
      h2(
        "div",
        { className: "ix-rail-foot" },
        trailing ?? null,
        h2(
          "button",
          {
            type: "button",
            className: "ix-rail-item ix-hit ix-rail-toggle",
            "aria-expanded": !now,
            onClick: toggle
          },
          h2("span", { className: "ix-rail-icon", "aria-hidden": "true" }, now ? "\xBB" : "\xAB"),
          now ? null : h2("span", { className: "ix-rail-label" }, "Collapse")
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
    return h2(
      "span",
      { className: "ix-split" },
      houseButton({ variant, size, onClick: onSelect }, children),
      h2(
        "span",
        { className: "ix-split-caret" },
        h2(Menu, {
          label: "",
          align: "end",
          items,
          trigger: h2(
            "span",
            { className: "ix-split-btn", role: "button", tabIndex: 0, "aria-label": "More actions" },
            h2("span", { "aria-hidden": "true" }, "\u2304")
          )
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
    return h2(
      "div",
      { className: "ix-carousel", role: "group", "aria-label": label },
      h2(
        "div",
        {
          className: "ix-carousel-track",
          ref: track,
          onScroll,
          style: { gap: `${gap}px`, scrollSnapType: `x mandatory`, scrollPaddingLeft: "0" }
        },
        slides.map(
          (slide, i) => h2("div", { className: "ix-carousel-slide", key: i, style: { scrollSnapAlign: snap } }, slide)
        )
      ),
      h2(
        "div",
        { className: "ix-carousel-foot" },
        arrows ? h2(
          "button",
          { type: "button", className: "ix-carousel-arrow ix-hit", "aria-label": "Previous", onClick: () => go(-1) },
          "\u2039"
        ) : null,
        h2(
          "div",
          { className: "ix-carousel-dots" },
          slides.map(
            (_, i) => h2("button", {
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
        arrows ? h2("button", { type: "button", className: "ix-carousel-arrow ix-hit", "aria-label": "Next", onClick: () => go(1) }, "\u203A") : null
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
    return h2(
      "span",
      { className: "ix-bubble", role: "img", "aria-label": `${title}, ${phases[now] ?? ""}`, style: { width: size, height: size } },
      h2(
        "svg",
        { viewBox: "0 0 34 34", width: size, height: size, "aria-hidden": "true" },
        h2("circle", { className: "ix-bubble-disc", cx: 17, cy: 17, r: 14 }),
        [0, 1, 2, 3, 4, 5].map(
          (i) => h2("path", {
            key: i,
            d: bubbleArc(i),
            pathLength: 1,
            className: "ix-bubble-arc",
            "data-state": i === now ? now === YOU ? "you" : "now" : i < now ? "done" : "next",
            style: { "--arc": colours[i], animationDelay: `${i * 70}ms` }
          })
        ),
        h2("text", { className: "ix-bubble-letter", x: 17, y: 17 }, title.slice(0, 1).toUpperCase())
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
      return h2(
        "button",
        { type: "button", className: "ix-circles-edges ix-focus", onClick: () => setOpen(true), "aria-label": `${circles.length} conversations`, "aria-expanded": "false" },
        circles.slice(0, 2).map((c, i) => h2("i", { key: c.id, "data-depth": i })),
        h2("span", { className: "ix-circles-count" }, `+${circles.length}`)
      );
    return h2(
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
        return h2(
          "li",
          { key: c.id },
          h2(
            "button",
            {
              type: "button",
              className: "ix-circle ix-hit",
              onClick: () => {
                setOpen(false);
                onSelect && onSelect(c.id);
              }
            },
            h2(
              "span",
              { className: "ix-circle-text" },
              h2("span", { className: "ix-circle-title" }, c.title),
              h2("span", { className: "ix-circle-line", "data-you": you ? "1" : void 0 }, c.line)
            ),
            loops.length ? h2("span", { className: "ix-circle-loops" }, loops.slice(0, 3).map((l, i) => h2(LoopBubble, { key: i, title: l.title, step: l.step, size: 26 }))) : null,
            loops.length > 3 ? h2("span", { className: "ix-circle-more" }, `+${loops.length - 3}`) : null,
            (c.unread ?? 0) > 0 ? h2("span", { className: "ix-circle-unread" }, h2("span", { className: "ix-visually-hidden" }, "unread")) : null
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
  function canvasOf(w, h3) {
    return Object.assign(document.createElement("canvas"), { width: w, height: h3 });
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
  async function pairOf(el, src, depthSrc, ratio) {
    if (!src) return sceneOf(el, PHOTO_WIDTH, Math.round(PHOTO_WIDTH / ratio));
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
    ratio = 4 / 3,
    motion = "pointer"
  }) {
    const host = useRef(null);
    useEffect(() => {
      const el = host.current;
      if (!el) return;
      let gone = false;
      pairOf(el, src, depth, ratio).then((pair) => {
        if (gone) return;
        el.style.aspectRatio = `${pair.photo.width} / ${pair.photo.height}`;
        el.replaceChildren(...paintPhoto(el, pair, kind, word, Math.max(0.05, Math.min(0.9, threshold))));
      }).catch(() => {
      });
      return () => {
        gone = true;
      };
    }, [src, depth, kind, word, threshold, topic, ratio]);
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
    return h2("div", {
      ref: host,
      className: "ix-photo",
      "data-kind": kind,
      role: "img",
      "aria-label": word && kind === "back" ? `${alt}, with the word ${word}` : alt,
      style: { ...topicVars(topic), aspectRatio: String(ratio) }
    });
  }
  function edgeOf(W, H, R, IN) {
    const w = W - 2 * IN, h3 = H - 2 * IN, r = Math.max(1e-3, Math.min(R - IN, w / 2, h3 / 2));
    const arc = Math.PI * r / 2, x0 = IN, y0 = IN, x1 = IN + w, y1 = IN + h3;
    const legs = [w / 2 - r, arc, h3 - 2 * r, arc, w - 2 * r, arc, h3 - 2 * r, arc, w / 2 - r];
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
      const f = t % 2.4 / 2.4, fill = f < 0.5 ? easeOut(f * 2) : 1 - easeOut((f - 0.5) * 2);
      stretch(p, 0, fill * 0.5, p.violet, 2.6, 10);
      stretch(p, 1, 1 - fill * 0.5, p.ice, 2.6, 10);
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
    return h2(
      "div",
      { ref: box, className: "ix-border", "data-pattern": pattern, style: radius != null ? { borderRadius: radius } : void 0 },
      h2("canvas", { ref: paper, className: "ix-border-rim", "aria-hidden": "true" }),
      label ? h2("span", { className: "ix-visually-hidden", role: "status" }, label) : null,
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
      return h2(
        "section",
        {
          className: "ix-chat-open",
          style: topicVars(open.topic),
          "aria-label": open.title,
          onKeyDown: (e) => e.key === "Escape" && pick(null)
        },
        circles.filter((c) => c !== open).slice(0, 2).map((c, i) => h2("i", { key: c.id, className: "ix-chat-peek", "data-depth": i, style: topicVars(c.topic) })),
        h2(
          "div",
          { className: "ix-chat-sheet" },
          h2(
            "div",
            { className: "ix-chat-head" },
            lead ? h2(LoopBubble, { title: lead.title, step: lead.step, size: 28 }) : null,
            h2(
              "span",
              { className: "ix-chat-text" },
              open.eyebrow ? h2("span", { className: "ix-chat-eyebrow" }, open.eyebrow) : null,
              h2("span", { className: "ix-chat-title" }, open.title)
            )
          ),
          open.message ? h2("p", { className: "ix-chat-message" }, open.message) : null,
          loops.length ? h2("span", { className: "ix-chat-section" }, "Loops") : null,
          loops.length ? h2(
            "ul",
            { className: "ix-chat-loops" },
            loops.map(
              (l, i) => h2(
                "li",
                { key: i, className: "ix-chat-loop", "data-you": l.step === YOU ? "1" : void 0 },
                h2(LoopBubble, { title: l.title, step: l.step, size: 24 }),
                h2(
                  "span",
                  { className: "ix-chat-text" },
                  h2("span", { className: "ix-chat-loop-title" }, l.title),
                  h2(
                    "span",
                    { className: "ix-chat-line" },
                    h2("span", { className: "ix-chat-phase", style: { color: design.PHASE_COLOURS?.[l.step ?? 0] } }, design.PHASES?.[l.step ?? 0] ?? ""),
                    l.line ? `, ${l.line}` : ""
                  )
                )
              )
            )
          ) : null,
          h2(
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
    return h2(
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
        return h2(
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
          h2(
            "span",
            { className: "ix-chat-text" },
            c.eyebrow ? h2("span", { className: "ix-chat-eyebrow" }, c.eyebrow) : null,
            h2("span", { className: "ix-chat-title" }, c.title),
            h2("span", { className: "ix-chat-line", "data-you": waits(c) ? "1" : void 0 }, c.line)
          ),
          loops.length ? h2("span", { className: "ix-circle-loops" }, loops.slice(0, 3).map((l, j) => h2(LoopBubble, { key: j, title: l.title, step: l.step, size: 24 }))) : null,
          loops.length > 3 ? h2("span", { className: "ix-circle-more" }, `+${loops.length - 3}`) : null
        );
      }),
      !fanned && circles.length > 1 ? h2("span", { className: "ix-circles-count ix-chats-count", "aria-hidden": "true" }, `+${circles.length - 1}`) : null
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
      const f = phase % 1, fill = f < 0.5 ? easeOut(f * 2) : 1 - easeOut((f - 0.5) * 2);
      line(seg(0.5 - fill * 0.5, 0.5), color(0), stroke * 0.85, 8);
      line(seg(0.5, 0.5 + fill * 0.5), color(1), stroke * 0.85, 8);
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
    return h2("canvas", { ref, className: "ix-edge", "aria-hidden": "true", style: { width: width + pad * 2, height: ht + pad * 2, margin: -pad } });
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
    return h2(
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
      h2("text", { ...t, ref, className: "ix-edgetext-tube" }, text),
      cols.slice(0, 3).map((c, i) => h2("text", {
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
      return h2(
        "span",
        { className: "ix-thinks" + (on ? " ix-thinks-on" : "") },
        h2(Base, rest),
        on ? h2("span", { className: "ix-thinks-edge" }, h2(Edge, { pattern: thinking ?? pick, width: Math.round(size * ring), stroke: Math.max(1.5, size / 48) })) : null
      );
    }, Base);
  }
  var TalkOrbThinks = thinksWith(window.IrisUi?.TalkOrb, 70 / 60, 66);
  var Orb3DThinks = thinksWith(window.IrisUi?.Orb3D, 0.72, 220);
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
    Mark,
    Edge,
    EdgeText,
    THINKING,
    ...TalkOrbThinks ? { TalkOrb: TalkOrbThinks } : {},
    ...Orb3DThinks ? { Orb3D: Orb3DThinks } : {}
  };
  window.IrisUi = Object.assign(window.IrisUi ?? {}, SHIPPED);
  var ext_default = SHIPPED;
})();
