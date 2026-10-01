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
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function useModalFocus(open, panel, onClose) {
    const close = useRef(onClose);
    close.current = onClose;
    useEffect(() => {
      if (!open) return;
      const before = document.activeElement;
      if (document.hasFocus()) panel.current?.focus({ preventScroll: true });
      const onKey = (e) => {
        if (e.key === "Escape") {
          close.current?.();
        } else if (e.key === "Tab" && panel.current) {
          const nodes = Array.from(panel.current.querySelectorAll(FOCUSABLE));
          const first = nodes[0] ?? panel.current;
          const last = nodes[nodes.length - 1] ?? panel.current;
          const at = document.activeElement;
          if (!panel.current.contains(at)) {
            e.preventDefault();
            first.focus();
          } else if (e.shiftKey && (at === first || at === panel.current)) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && at === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("keydown", onKey);
        const now = document.activeElement;
        const lost = !now || now === document.body || panel.current?.contains(now);
        if (lost && before?.isConnected && before !== document.body) before.focus({ preventScroll: true });
      };
    }, [open]);
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
    const panel = useRef(null);
    useModalFocus(open, panel, onClose);
    if (!open) return null;
    return h2(
      Stage,
      null,
      h2(
        "div",
        { className: "ix-scrim", onClick: (e) => e.target === e.currentTarget && onClose?.() },
        h2(
          "div",
          {
            className: "ix-dialog",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": id,
            tabIndex: -1,
            ref: panel
          },
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
    const id = useId();
    const panel = useRef(null);
    useModalFocus(open, panel, onClose);
    if (!open) return null;
    return h2(
      Stage,
      null,
      h2(
        "div",
        { className: "ix-scrim", onClick: (e) => e.target === e.currentTarget && onClose?.() },
        h2(
          "div",
          {
            className: "ix-sheet",
            "data-side": side === "end" ? "end" : "bottom",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": title ? id : void 0,
            "aria-label": title ? void 0 : sub,
            tabIndex: -1,
            ref: panel
          },
          side === "bottom" ? h2("div", { className: "ix-sheet-grip", "aria-hidden": "true" }) : null,
          title ? h2("h2", { className: "ix-sheet-title", id }, title) : null,
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
            key: i,
            type: "button",
            role: "tab",
            className: "ix-tab",
            "aria-selected": i === active,
            tabIndex: i === active ? 0 : -1,
            onClick: () => onSelect?.(i),
            onKeyDown: (e) => {
              const to = e.key === "ArrowRight" ? Math.min(i + 1, items.length - 1) : e.key === "ArrowLeft" ? Math.max(i - 1, 0) : e.key === "Home" ? 0 : e.key === "End" ? items.length - 1 : -1;
              if (to < 0) return;
              e.preventDefault();
              onSelect?.(to);
              host.current?.querySelectorAll(".ix-tab")[to]?.focus();
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
  var SHIPPED = {
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
    Carousel
  };
  window.IrisUi = Object.assign(window.IrisUi ?? {}, SHIPPED);
  var ext_default = SHIPPED;
})();
