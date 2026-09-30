// The parts the design system was missing beyond the core: a menu, a dialog, a sheet, a snackbar, a tooltip,
// a badge, a slider, a text area, a select, a search field, tabs, steps, an empty state and a divider.
//
// They are built exactly like the rest of Iris: tokens only, glass, pills, 150/200ms, a focus ring, dark only,
// and every control answers the hand. They stand on the React the page already has and take the house Button
// from window.IrisUi, so a screen mixes them with the shipped parts without a seam.

import React, { useCallback, useEffect, useId, useRef, useState } from "react";

/** The house createElement: the bundle is a classic script, so the source takes React as a value. */
const h = React.createElement as Any;

type Any = any;

/** The house Button, taken from the shipped bundle at call time: these parts never re-implement a control. */
function houseButton(props: Any, children: Any): Any {
  const B = (window as Any).IrisUi?.Button;
  if (B) return h(B, props, children);
  return h("button", { type: "button", className: "ix-hit ix-menu-trigger", ...props }, children);
}

/* ---------------------------------------------------------------- Tooltip */

export function Tooltip({ label, children, delay = 320 }: { label: string; children: Any; delay?: number }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<Any>(null);
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

  return h(
    "span",
    {
      className: "ix-tip",
      "data-open": open ? "1" : "0",
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
    },
    h("span", { className: "ix-tip-anchor", "aria-describedby": open ? id : undefined }, children),
    h("span", { className: "ix-tip-body", role: "tooltip", id }, label),
  );
}

/* ------------------------------------------------------------------- Menu */

export type MenuItem = {
  label?: string;
  icon?: Any;
  shortcut?: string;
  checked?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  /** "label" is a group heading, "sep" a separator: neither is focusable. */
  kind?: "item" | "label" | "sep";
};

export function Menu({
  items,
  label = "More",
  side = "start",
  trigger,
  align,
}: {
  items: MenuItem[];
  label?: string;
  side?: "start" | "end";
  trigger?: Any;
  align?: "start" | "end";
}) {
  const [open, setOpen] = useState(false);
  const host = useRef<Any>(null);
  const list = useRef<Any>(null);
  const rows = (items ?? []).filter((it) => (it.kind ?? "item") === "item" && !it.disabled);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!host.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open) list.current?.querySelector('[role="menuitem"]')?.focus();
  }, [open]);

  const onKey = (e: Any) => {
    const nodes = Array.from(list.current?.querySelectorAll('[role="menuitem"]') ?? []) as Any[];
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

  return h(
    "span",
    { className: "ix-menu-host", ref: host },
    trigger
      ? h("span", { className: "ix-menu-trigger", onClick: () => setOpen((v) => !v), "aria-haspopup": "menu", "aria-expanded": open, tabIndex: 0, onKeyDown: (e: Any) => e.key === "Enter" && setOpen((v) => !v) }, trigger)
      : houseButton(
          {
            variant: "glass",
            size: "sm",
            onClick: () => setOpen((v) => !v),
            "aria-haspopup": "menu",
            "aria-expanded": open,
          },
          h("span", { className: "ix-menu-trigger-inner" }, label, h("span", { "aria-hidden": "true" }, "⌄")),
        ),
    open
      ? h(
          "div",
          {
            className: "ix-menu",
            role: "menu",
            ref: list,
            "data-side": (align ?? side) === "end" ? "end" : "start",
            onKeyDown: onKey,
          },
          (items ?? []).map((it, i) => {
            const kind = it.kind ?? "item";
            if (kind === "sep") return h("div", { className: "ix-menu-sep", key: i, role: "separator" });
            if (kind === "label") return h("div", { className: "ix-menu-label", key: i }, it.label);
            return h(
              "button",
              {
                key: i,
                type: "button",
                role: it.checked === undefined ? "menuitem" : "menuitemcheckbox",
                className: "ix-menu-item ix-hit",
                "aria-checked": it.checked === undefined ? undefined : it.checked,
                "data-danger": it.danger ? "1" : undefined,
                disabled: it.disabled,
                onClick: () => {
                  it.onSelect?.();
                  setOpen(false);
                },
              },
              it.icon ?? null,
              h("span", null, it.label),
              it.shortcut ? h("span", { className: "ix-menu-key" }, it.shortcut) : null,
            );
          }),
        )
      : null,
  );
}

/* --------------------------------------------------------------- Overlays */

/** What a dialog and a sheet sit in: they cover their own box, never the whole page. */
function Stage({ children }: { children: Any }) {
  return h("div", { className: "ix-stage" }, children);
}

export function Dialog({
  open,
  onClose,
  title,
  body,
  actions = [],
  danger,
}: {
  open: boolean;
  onClose?: () => void;
  title: string;
  body?: string;
  actions?: { label: string; variant?: string; onClick?: () => void; danger?: boolean }[];
  danger?: boolean;
}) {
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return h(
    Stage,
    null,
    h(
      "div",
      {
        className: "ix-scrim",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": id,
        onClick: (e: Any) => e.target === e.currentTarget && onClose?.(),
      },
      h(
        "div",
        { className: "ix-dialog" },
        h("h2", { id }, title),
        body ? h("p", null, body) : null,
        h(
          "div",
          { className: "ix-dialog-actions" },
          actions.map((a, i) =>
            houseButton(
              {
                key: i,
                variant: a.variant ?? (a.danger ? "danger" : i === 0 ? "primary" : "glass"),
                size: i === 0 ? "lg" : "md",
                onClick: () => {
                  a.onClick?.();
                  onClose?.();
                },
              },
              a.label,
            ),
          ),
        ),
      ),
    ),
  );
}

export function Sheet({
  open,
  onClose,
  title,
  sub,
  side = "bottom",
  children,
}: {
  open: boolean;
  onClose?: () => void;
  title?: string;
  sub?: string;
  side?: "bottom" | "end";
  children?: Any;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return h(
    Stage,
    null,
    h(
      "div",
      { className: "ix-scrim", onClick: (e: Any) => e.target === e.currentTarget && onClose?.() },
      h(
        "div",
        { className: "ix-sheet", "data-side": side === "end" ? "end" : "bottom", role: "dialog", "aria-modal": "true" },
        side === "bottom" ? h("div", { className: "ix-sheet-grip", "aria-hidden": "true" }) : null,
        title ? h("h2", { className: "ix-sheet-title" }, title) : null,
        sub ? h("p", { className: "ix-sheet-sub" }, sub) : null,
        h("div", { className: "ix-sheet-body" }, children),
      ),
    ),
  );
}

/* -------------------------------------------------------------- Snackbar */

export function Snackbar({
  text,
  tone = "accent",
  action,
  onAction,
}: {
  text: string;
  tone?: "accent" | "ok" | "wait" | "error";
  action?: string;
  onAction?: () => void;
}) {
  return h(
    "div",
    { className: "ix-snack", "data-tone": tone, role: "status", "aria-live": "polite" },
    h("span", { className: "ix-snack-dot", "aria-hidden": "true" }),
    h("span", { className: "ix-snack-text" }, text),
    action ? h("button", { type: "button", className: "ix-snack-action ix-hit", onClick: onAction }, action) : null,
  );
}

/* ------------------------------------------------------------------ Badge */

export function Badge({
  children,
  count,
  dot,
  tone = "accent",
  max = 99,
}: {
  children: Any;
  count?: number;
  dot?: boolean;
  tone?: "accent" | "violet" | "error";
  max?: number;
}) {
  const label = dot ? "" : String(Math.min(count ?? 0, max)) + ((count ?? 0) > max ? "+" : "");
  return h(
    "span",
    { className: "ix-badge-host" },
    children,
    h(
      "span",
      {
        className: "ix-badge",
        "data-tone": tone,
        "data-dot": dot ? "1" : undefined,
        "aria-hidden": dot || !count ? "true" : undefined,
      },
      label,
    ),
    dot || !count ? null : h("span", { className: "ix-visually-hidden" }, `${count} new`),
  );
}

/* ----------------------------------------------------------------- Slider */

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  unit,
  format,
}: {
  value?: number;
  onChange?: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  unit?: string;
  format?: (v: number) => string;
}) {
  const [inner, setInner] = useState(value ?? min);
  const now = value ?? inner;
  const pct = ((now - min) / (max - min)) * 100;
  const shown = format ? format(now) : `${now}${unit ? " " + unit : ""}`;

  return h(
    "label",
    { className: "ix-slider" },
    h(
      "span",
      { className: "ix-slider-top" },
      label ? h("span", { className: "ix-slider-label" }, label) : h("span", null),
      h("span", { className: "ix-slider-value" }, shown),
    ),
    h("input", {
      type: "range",
      min,
      max,
      step,
      value: now,
      "aria-label": label ?? "Value",
      style: { ["--ix-fill" as Any]: pct + "%" },
      onChange: (e: Any) => {
        const v = Number(e.target.value);
        setInner(v);
        onChange?.(v);
      },
    }),
  );
}

/* -------------------------------------------------- Text area, select, search */

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  maxLength,
}: {
  label?: string;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}) {
  const id = useId();
  return h(
    "div",
    { className: "ix-field" },
    label ? h("label", { className: "ix-field-label", htmlFor: id }, label) : null,
    h("textarea", {
      id,
      className: "ix-area",
      rows,
      value,
      placeholder,
      maxLength,
      onChange: (e: Any) => onChange?.(e.target.value),
    }),
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
}: {
  label?: string;
  value?: string;
  onChange?: (v: string) => void;
  options: (string | { value: string; label: string })[];
}) {
  const id = useId();
  const list = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return h(
    "div",
    { className: "ix-field" },
    label ? h("label", { className: "ix-field-label", htmlFor: id }, label) : null,
    h(
      "select",
      { id, className: "ix-select", value, onChange: (e: Any) => onChange?.(e.target.value) },
      list.map((o) => h("option", { key: o.value, value: o.value }, o.label)),
    ),
  );
}

export function SearchField({
  value,
  onChange,
  placeholder = "Search",
  busy,
  children,
}: {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  busy?: boolean;
  children?: Any;
}) {
  const [focus, setFocus] = useState(false);
  return h(
    "div",
    { className: "ix-search-field" },
    h(
      "div",
      { className: "ix-search", "data-focus": focus ? "1" : "0" },
      h("span", { className: "ix-search-glass", "aria-hidden": "true" }, "⌕"),
      h("input", {
        type: "search",
        value,
        placeholder,
        "aria-label": placeholder,
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
        onChange: (e: Any) => onChange?.(e.target.value),
      }),
      busy ? h("span", { className: "ix-spin", role: "status", "aria-label": "Searching" }) : null,
      value
        ? h(
            "button",
            {
              type: "button",
              className: "ix-search-clear ix-hit",
              "aria-label": "Clear",
              onClick: () => onChange?.(""),
            },
            "×",
          )
        : null,
    ),
    children ? h("div", { className: "ix-results" }, children) : null,
  );
}

/* ------------------------------------------------------------------- Tabs */

export function Tabs({
  items,
  active = 0,
  onSelect,
}: {
  items: string[];
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const host = useRef<Any>(null);
  const [ink, setInk] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const nodes = Array.from(host.current?.querySelectorAll(".ix-tab") ?? []) as Any[];
    const el = nodes[active];
    if (el) setInk({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active, items.join("|")]);

  return h(
    "div",
    { className: "ix-tabs", role: "tablist", ref: host },
    items.map((label, i) =>
      h(
        "button",
        {
          key: label,
          type: "button",
          role: "tab",
          className: "ix-tab",
          "aria-selected": i === active,
          tabIndex: i === active ? 0 : -1,
          onClick: () => onSelect?.(i),
          onKeyDown: (e: Any) => {
            if (e.key === "ArrowRight") onSelect?.(Math.min(i + 1, items.length - 1));
            if (e.key === "ArrowLeft") onSelect?.(Math.max(i - 1, 0));
          },
        },
        label,
      ),
    ),
    h("span", { className: "ix-tab-ink", "aria-hidden": "true", style: { transform: `translateX(${ink.left}px)`, width: ink.width + "px" } }),
  );
}

/* ------------------------------------------------------------------ Steps */

export function Steps({ items, active = 0 }: { items: string[]; active?: number }) {
  return h(
    "ol",
    { className: "ix-steps" },
    items.map((label, i) =>
      h(
        "li",
        {
          key: label,
          className: "ix-step",
          "data-state": i < active ? "done" : i === active ? "now" : "next",
          "aria-current": i === active ? "step" : undefined,
        },
        h("span", { className: "ix-step-dot" }, i < active ? "✓" : String(i + 1)),
        h("span", { className: "ix-step-label" }, label),
        i < items.length - 1 ? h("span", { className: "ix-step-line", "data-done": i < active ? "1" : "0" }) : null,
      ),
    ),
  );
}

/* ------------------------------------------------- Empty state, divider */

export function EmptyState({
  title,
  line,
  action,
  children,
}: {
  title: string;
  line?: string;
  action?: { label: string; onClick?: () => void };
  children?: Any;
}) {
  return h(
    "div",
    { className: "ix-empty" },
    h("span", { className: "ix-empty-icon", "aria-hidden": "true" }, "○"),
    h("span", { className: "ix-empty-title" }, title),
    line ? h("span", { className: "ix-empty-line" }, line) : null,
    action || children ? h("div", { className: "ix-empty-actions" }, action ? houseButton({ variant: "glass", size: "sm", onClick: action.onClick }, action.label) : children) : null,
  );
}

export function Divider({ label, inset }: { label?: string; inset?: boolean }) {
  return h("hr", { className: "ix-divider", "data-label": label ?? "", "data-inset": inset ? "1" : undefined });
}



/* --------------------------------------------------------------- Toolbar */

export type ToolbarItem = {
  label: string;
  icon?: Any;
  active?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
};

export function Toolbar({
  items = [],
  title,
  variant = "docked",
  trailing,
}: {
  items?: ToolbarItem[];
  title?: string;
  variant?: "docked" | "floating";
  trailing?: Any;
}) {
  const host = useRef<Any>(null);

  const onKey = (e: Any) => {
    const nodes = Array.from(host.current?.querySelectorAll("button:not([disabled])") ?? []) as Any[];
    const at = nodes.indexOf(document.activeElement);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nodes[Math.min(at + 1, nodes.length - 1)]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nodes[Math.max(at - 1, 0)]?.focus();
    }
  };

  return h(
    "div",
    {
      className: "ix-toolbar",
      "data-variant": variant,
      role: "toolbar",
      "aria-label": title ?? "Actions",
      ref: host,
      onKeyDown: onKey,
    },
    title ? h("span", { className: "ix-toolbar-title" }, title) : null,
    items.map((it) =>
      h(
        "button",
        {
          key: it.label,
          type: "button",
          className: "ix-toolbar-btn ix-hit",
          "aria-pressed": it.active === undefined ? undefined : it.active,
          "data-active": it.active ? "1" : undefined,
          "data-danger": it.danger ? "1" : undefined,
          disabled: it.disabled,
          onClick: it.onSelect,
        },
        it.icon ?? null,
        h("span", null, it.label),
      ),
    ),
    trailing ? h("span", { className: "ix-toolbar-trailing" }, trailing) : null,
  );
}

/* ------------------------------------------------------------ DatePicker */

const DAYS = ["mo", "tu", "we", "th", "fr", "sa", "su"];
const MONTHS = [
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
  "December",
];

/** A day in a month grid: 0 = Monday, the way the system writes weeks. */
function monthGrid(year: number, month: number) {
  const first = new Date(Date.UTC(year, month, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (number | null)[] = Array(lead).fill(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);
  return cells;
}

const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export function DatePicker({
  value,
  onChange,
  year,
  month,
  min,
  max,
  label,
  showToday = true,
}: {
  value?: string;
  onChange?: (day: string) => void;
  year?: number;
  month?: number;
  min?: string;
  max?: string;
  label?: string;
  showToday?: boolean;
}) {
  const today = new Date();
  const selected = value ? new Date(`${value}T00:00:00Z`) : null;
  const start = selected ?? today;
  const [view, setView] = useState({
    y: year ?? start.getUTCFullYear?.() ?? start.getFullYear(),
    m: month ?? start.getMonth(),
  });

  const step = (by: number) => {
    const next = new Date(Date.UTC(view.y, view.m + by, 1));
    setView({ y: next.getUTCFullYear(), m: next.getUTCMonth() });
  };

  const todayIso = iso(today.getFullYear(), today.getMonth(), today.getDate());
  const cells = monthGrid(view.y, view.m);

  return h(
    "div",
    { className: "ix-datepicker", role: "group", "aria-label": label ?? "Pick a day" },
    h(
      "div",
      { className: "ix-dp-head" },
      h(
        "button",
        { type: "button", className: "ix-dp-nav ix-hit", "aria-label": "Previous month", onClick: () => step(-1) },
        "‹",
      ),
      h("span", { className: "ix-dp-month" }, `${MONTHS[view.m]} ${view.y}`),
      h(
        "button",
        { type: "button", className: "ix-dp-nav ix-hit", "aria-label": "Next month", onClick: () => step(1) },
        "›",
      ),
    ),
    h(
      "div",
      { className: "ix-dp-week", "aria-hidden": "true" },
      DAYS.map((d) => h("span", { key: d }, d)),
    ),
    h(
      "div",
      { className: "ix-dp-grid", role: "grid" },
      cells.map((d, i) => {
        if (d === null) return h("span", { key: `e${i}`, className: "ix-dp-empty" });
        const day = iso(view.y, view.m, d);
        const off = (min && day < min) || (max && day > max);
        return h(
          "button",
          {
            key: day,
            type: "button",
            role: "gridcell",
            className: "ix-dp-day ix-hit",
            "data-selected": value === day ? "1" : undefined,
            "data-today": day === todayIso ? "1" : undefined,
            "aria-selected": value === day,
            "aria-current": day === todayIso ? "date" : undefined,
            "aria-label": `${d} ${MONTHS[view.m]} ${view.y}`,
            disabled: !!off,
            onClick: () => onChange?.(day),
          },
          String(d),
        );
      }),
    ),
    showToday
      ? h(
          "div",
          { className: "ix-dp-foot" },
          houseButton({ variant: "glass", size: "sm", onClick: () => onChange?.(todayIso) }, "Today"),
          h("span", { className: "ix-dp-hint" }, value ? `Chosen: ${value}` : "No day chosen"),
        )
      : null,
  );
}

/* ------------------------------------------------------------ TimePicker */

export function TimePicker({
  value = "09:00",
  onChange,
  step = 5,
  label,
}: {
  value?: string;
  onChange?: (time: string) => void;
  step?: number;
  label?: string;
}) {
  // Named hour and minute on purpose: `h` is createElement in this file, and shadowing it broke the part.
  const [hour, minute] = value.split(":").map((x) => Number(x));
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);
  const two = (n: number) => String(n).padStart(2, "0");
  const set = (nh: number, nm: number) => onChange?.(`${two(nh)}:${two(nm)}`);

  return h(
    "div",
    { className: "ix-timepicker", role: "group", "aria-label": label ?? "Pick a time" },
    h("span", { className: "ix-tp-value", "aria-live": "polite" }, `${two(hour)}:${two(minute)}`),
    h(
      "div",
      { className: "ix-tp-row" },
      h("span", { className: "ix-tp-label" }, "hour"),
      h(
        "div",
        { className: "ix-tp-strip" },
        hours.map((x) =>
          h(
            "button",
            {
              key: x,
              type: "button",
              className: "ix-tp-chip ix-hit",
              "data-on": x === hour ? "1" : undefined,
              "aria-pressed": x === hour,
              onClick: () => set(x, minute),
            },
            two(x),
          ),
        ),
      ),
    ),
    h(
      "div",
      { className: "ix-tp-row" },
      h("span", { className: "ix-tp-label" }, "minute"),
      h(
        "div",
        { className: "ix-tp-strip" },
        minutes.map((x) =>
          h(
            "button",
            {
              key: x,
              type: "button",
              className: "ix-tp-chip ix-hit",
              "data-on": x === minute ? "1" : undefined,
              "aria-pressed": x === minute,
              onClick: () => set(hour, x),
            },
            two(x),
          ),
        ),
      ),
    ),
    h(
      "div",
      { className: "ix-tp-foot" },
      houseButton(
        {
          variant: "glass",
          size: "sm",
          onClick: () => {
            const now = new Date();
            set(now.getHours(), (Math.round(now.getMinutes() / step) * step) % 60);
          },
        },
        "Now",
      ),
      h("span", { className: "ix-dp-hint" }, step === 1 ? "every minute" : `every ${step} minutes`),
    ),
  );
}



/* ----------------------------------------------------------------- AppBar */

export function AppBar({
  title,
  sub,
  leading,
  actions,
  variant = "small",
  children,
}: {
  title: string;
  sub?: string;
  leading?: Any;
  actions?: Any;
  variant?: "small" | "large";
  children?: Any;
}) {
  return h(
    "header",
    { className: "ix-appbar", "data-variant": variant },
    h(
      "div",
      { className: "ix-appbar-row" },
      leading ? h("span", { className: "ix-appbar-leading" }, leading) : null,
      variant === "small" ? h("h2", { className: "ix-appbar-title" }, title) : h("span", null),
      h("span", { className: "ix-appbar-actions" }, actions),
    ),
    variant === "large" ? h("h2", { className: "ix-appbar-large" }, title) : null,
    sub ? h("p", { className: "ix-appbar-sub" }, sub) : null,
    children ? h("div", { className: "ix-appbar-body" }, children) : null,
  );
}

/* ---------------------------------------------------------------- NavRail */

export type RailItem = { label: string; icon?: Any; active?: boolean; onSelect?: () => void };

export function NavRail({
  items = [],
  collapsed,
  onToggle,
  trailing,
  label = "Sections",
}: {
  items?: RailItem[];
  collapsed?: boolean;
  onToggle?: () => void;
  trailing?: Any;
  label?: string;
}) {
  const [shrunk, setShrunk] = useState(!!collapsed);
  const now = onToggle ? !!collapsed : shrunk;
  const toggle = () => {
    setShrunk((v) => !v);
    onToggle?.();
  };

  return h(
    "nav",
    { className: "ix-rail", "data-collapsed": now ? "1" : undefined, "aria-label": label },
    h(
      "ul",
      { className: "ix-rail-list" },
      items.map((it) =>
        h(
          "li",
          { key: it.label },
          h(
            "button",
            {
              type: "button",
              className: "ix-rail-item ix-hit",
              "aria-current": it.active ? "page" : undefined,
              "aria-label": now ? it.label : undefined,
              onClick: it.onSelect,
            },
            h("span", { className: "ix-rail-icon", "aria-hidden": "true" }, it.icon ?? "•"),
            now ? null : h("span", { className: "ix-rail-label" }, it.label),
          ),
        ),
      ),
    ),
    h(
      "div",
      { className: "ix-rail-foot" },
      trailing ?? null,
      h(
        "button",
        {
          type: "button",
          className: "ix-rail-item ix-hit ix-rail-toggle",
          "aria-expanded": !now,
          onClick: toggle,
        },
        h("span", { className: "ix-rail-icon", "aria-hidden": "true" }, now ? "»" : "«"),
        now ? null : h("span", { className: "ix-rail-label" }, "Collapse"),
      ),
    ),
  );
}

/* ------------------------------------------------------------- SplitButton */

export function SplitButton({
  children,
  onSelect,
  items,
  variant = "primary",
  size = "md",
}: {
  children: Any;
  onSelect?: () => void;
  items: MenuItem[];
  variant?: "primary" | "accent" | "glass";
  size?: "sm" | "md" | "lg";
}) {
  return h(
    "span",
    { className: "ix-split" },
    houseButton({ variant, size, onClick: onSelect }, children),
    h(
      "span",
      { className: "ix-split-caret" },
      h(Menu, {
        label: "",
        align: "end",
        items,
        trigger: h(
          "span",
          { className: "ix-split-btn", role: "button", tabIndex: 0, "aria-label": "More actions" },
          h("span", { "aria-hidden": "true" }, "⌄"),
        ),
      }),
    ),
  );
}

/* --------------------------------------------------------------- Carousel */

export function Carousel({
  children,
  gap = 12,
  snap = "start",
  arrows = false,
  label = "Items",
}: {
  children: Any;
  gap?: number;
  snap?: "start" | "center";
  arrows?: boolean;
  label?: string;
}) {
  const track = useRef<Any>(null);
  const slides = Array.isArray(children) ? children.filter(Boolean) : children ? [children] : [];
  const [at, setAt] = useState(0);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const width = el.clientWidth;
    const index = Math.round(el.scrollLeft / Math.max(1, width));
    setAt(Math.min(index, slides.length - 1));
  };

  const go = (by: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: by * el.clientWidth, behavior: "smooth" });
  };

  return h(
    "div",
    { className: "ix-carousel", role: "group", "aria-label": label },
    h(
      "div",
      {
        className: "ix-carousel-track",
        ref: track,
        onScroll,
        style: { gap: `${gap}px`, scrollSnapType: `x mandatory`, scrollPaddingLeft: "0" },
      },
      slides.map((slide, i) =>
        h("div", { className: "ix-carousel-slide", key: i, style: { scrollSnapAlign: snap } }, slide),
      ),
    ),
    h(
      "div",
      { className: "ix-carousel-foot" },
      arrows
        ? h(
            "button",
            { type: "button", className: "ix-carousel-arrow ix-hit", "aria-label": "Previous", onClick: () => go(-1) },
            "‹",
          )
        : null,
      h(
        "div",
        { className: "ix-carousel-dots" },
        slides.map((_, i) =>
          h("button", {
            key: i,
            type: "button",
            className: "ix-carousel-dot",
            "data-on": i === at ? "1" : undefined,
            "aria-label": `Slide ${i + 1}`,
            "aria-current": i === at ? "true" : undefined,
            onClick: () => {
              const el = track.current;
              if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
            },
          }),
        ),
      ),
      arrows
        ? h("button", { type: "button", className: "ix-carousel-arrow ix-hit", "aria-label": "Next", onClick: () => go(1) }, "›")
        : null,
    ),
  );
}

/* --------------------------------------------------------------- register */

const SHIPPED = {
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
};

(window as Any).IrisUi = Object.assign((window as Any).IrisUi ?? {}, SHIPPED);

export default SHIPPED;
