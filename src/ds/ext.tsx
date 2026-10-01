// The parts the design system was missing beyond the core: a menu, a dialog, a sheet, a snackbar, a tooltip,
// a badge, a slider, a text area, a select, a search field, tabs, steps, an empty state and a divider.
//
// They are built exactly like the rest of Iris: tokens only, glass, pills, 150/200ms, a focus ring, dark only,
// and every control answers the hand. They stand on the React the page already has and take the house Button
// from window.IrisUi, so a screen mixes them with the shipped parts without a seam.

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { IrisApp, checkApp, costOf, depthOf } from "./app";

/** The house createElement: the bundle is a classic script, so the source takes React as a value. */
const h = React.createElement as Any;

type Any = any;

/** The house Button, taken from the shipped bundle at call time: these parts never re-implement a control. */
function houseButton(props: Any, children: Any): Any {
  const B = (window as Any).IrisUi?.Button;
  if (B) return h(B, props, children);
  return h("button", { type: "button", className: "ix-hit ix-menu-trigger", ...props }, children);
}

/* ------------------------------------------------------------------- Mark */

/** Where ext.js was loaded from, so the mark's images resolve under any base path. */
const DS_BASE = ((document.currentScript as HTMLScriptElement | null)?.src ?? "").replace(/ext\.js(\?.*)?$/, "");

/**
 * Her ring as a still, sharp mark: the brand kit's own render (1024px, with its glow), not the CSS Orb. For a
 * logo, a lock screen, an empty page. For her state (listening, busy) take the Orb, which moves.
 */
export function Mark({ size = 64, label = "Iris" }: { size?: number; label?: string }) {
  // The image is the ring plus its glow, cut from the brand kit's 1024px render with the kit's pale backdrop
  // taken out. The ring is 70% of it: draw it at size / 0.7, centred, and the glow spills over as light does.
  const px = Math.round(size / 0.7);
  return h(
    "span",
    { className: "ix-mark", style: { width: size, height: size }, role: "img", "aria-label": label },
    h("img", {
      src: `${DS_BASE}mark/iris-mark-512.png`,
      srcSet: `${DS_BASE}mark/iris-mark-128.png 128w, ${DS_BASE}mark/iris-mark-256.png 256w, ${DS_BASE}mark/iris-mark-512.png 512w`,
      sizes: `${px}px`,
      width: px,
      height: px,
      alt: "",
      draggable: false,
    }),
  );
}

/* ---------------------------------------------------------------- Tooltip */

export function Tooltip({ label, children, delay = 320, open: shown }: { label: string; children: Any; delay?: number; open?: boolean }) {
  const [hovered, setOpen] = useState(false);
  /** `open` holds the tooltip out, for a screenshot or a guide; without it hover and focus decide. */
  const open = shown ?? hovered;
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
  defaultOpen = false,
}: {
  items: MenuItem[];
  label?: string;
  side?: "start" | "end";
  trigger?: Any;
  align?: "start" | "end";
  /** Starts open, for a guide or a screenshot. Focus moves into it only when a hand opens it. */
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const handOpened = useRef(false);
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
    if (open && handOpened.current) list.current?.querySelector('[role="menuitem"], [role="menuitemcheckbox"]')?.focus();
    handOpened.current = true;
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
      ? h("span", { className: "ix-menu-trigger", role: "button", "aria-label": label || undefined, onClick: () => setOpen((v) => !v), "aria-haspopup": "menu", "aria-expanded": open, tabIndex: 0, onKeyDown: (e: Any) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen((v) => !v)) }, trigger)
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
  children?: Any;
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
  // The wrap is a size container: on a phone only the current step keeps its word, the others keep their dot.
  return h(
    "div",
    { className: "ix-steps-wrap" },
    h(
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
    ),
  );
}

/* ------------------------------------------------- Empty state, divider */

export function EmptyState({
  title,
  line,
  action,
  icon,
  children,
}: {
  title: string;
  line?: string;
  action?: { label: string; onClick?: () => void };
  /** What this place holds, as a house icon name ("phone"). Never a circle: a circle reads as her orb. */
  icon?: string;
  children?: Any;
}) {
  const Icon = (window as Any).IrisUi?.Icon;
  return h(
    "div",
    { className: "ix-empty" },
    icon && Icon ? h("span", { className: "ix-empty-icon", "aria-hidden": "true" }, h(Icon, { name: icon, size: 22 })) : null,
    h("span", { className: "ix-empty-title" }, title),
    line ? h("span", { className: "ix-empty-line" }, line) : null,
    action || children ? h("div", { className: "ix-empty-actions" }, action ? houseButton({ variant: "glass", size: "sm", onClick: action.onClick }, action.label) : children) : null,
  );
}

export function Divider({ label, inset }: { label?: string; inset?: boolean }) {
  // An hr cannot hold text, so a labelled divider is a separator with the label between two lines.
  if (!label) return h("hr", { className: "ix-divider", "data-inset": inset ? "1" : undefined });
  return h(
    "div",
    { className: "ix-divider", role: "separator", "aria-label": label, "data-label": label, "data-inset": inset ? "1" : undefined },
    h("span", null, label),
  );
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

/** "2026-10-01" as people say it: "Thu 1 Oct". */
const dayName = (day: string) => {
  const d = new Date(`${day}T00:00:00Z`);
  return `${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()].slice(0, 3)}`;
};

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
          h("span", { className: "ix-dp-hint" }, value ? dayName(value) : "No day chosen"),
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
      variant === "small"
        ? h("div", { className: "ix-appbar-text" }, h("h2", { className: "ix-appbar-title" }, title), sub ? h("p", { className: "ix-appbar-sub" }, sub) : null)
        : h("span", null),
      h("span", { className: "ix-appbar-actions" }, actions),
    ),
    variant === "large" ? h("h2", { className: "ix-appbar-large" }, title) : null,
    variant === "large" && sub ? h("p", { className: "ix-appbar-sub" }, sub) : null,
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
        label: "More actions",
        align: "end",
        items,
        // The caret wears the house button's own classes, so both halves share one fill, one height, one shape.
        trigger: h("span", { className: `ix-split-btn iris-btn iris-btn-${variant} iris-btn-${size}`, "aria-hidden": "true" }, "⌄"),
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

/* ------------------------------------------------------------ LoopBubble */

// One loop, small: a disc with the loop's first letter and six short arcs round it, one per phase. Phases already
// done stay lit, the current one is lit full (with a glow when the loop waits on you), the rest are a hairline.
// The iPhone app's LoopBubble, designed at 34px; the colours are the release's own PHASE_COLOURS.

const YOU = 3;

function bubbleArc(i: number) {
  const at = (deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return `${(17 + 15 * Math.cos(a)).toFixed(2)} ${(17 + 15 * Math.sin(a)).toFixed(2)}`;
  };
  return `M ${at(i * 60 + 7)} A 15 15 0 0 1 ${at((i + 1) * 60 - 7)}`;
}

export function LoopBubble({ title, step = 0, size = 34 }: { title: string; step?: number; size?: number }) {
  const design = (window as Any).IrisUi?.design ?? {};
  const colours: string[] = design.PHASE_COLOURS ?? [];
  const phases: string[] = design.PHASES ?? [];
  const now = Math.max(0, Math.min(5, Math.round(step)));
  return h(
    "span",
    { className: "ix-bubble", role: "img", "aria-label": `${title}, ${phases[now] ?? ""}`, style: { width: size, height: size } },
    h(
      "svg",
      { viewBox: "0 0 34 34", width: size, height: size, "aria-hidden": "true" },
      h("circle", { className: "ix-bubble-disc", cx: 17, cy: 17, r: 14 }),
      [0, 1, 2, 3, 4, 5].map((i) =>
        h("path", {
          key: i,
          d: bubbleArc(i),
          pathLength: 1,
          className: "ix-bubble-arc",
          "data-state": i === now ? (now === YOU ? "you" : "now") : i < now ? "done" : "next",
          style: { "--arc": colours[i], animationDelay: `${i * 70}ms` },
        }),
      ),
      h("text", { className: "ix-bubble-letter", x: 17, y: 17 }, title.slice(0, 1).toUpperCase()),
    ),
  );
}

/* ----------------------------------------------------------- CircleStack */

// Circles: every chat with its own loops is one circle, stacked with depth behind the strip (the live conversation
// at the bottom of the iPhone app, which replaced the Loops tab). Closed, only the top edges of the next two peek
// out, with a count; a tap fans the stack upward into cards, the most urgent nearest the strip. A tap on a card
// opens that chat. Waiting on you first, then unread, then the order given; at most six.

export type CircleLoop = { title: string; step?: number };
export type Circle = { id: string; title: string; line: string; unread?: number; loops?: CircleLoop[] };

const waits = (c: Circle) => (c.loops ?? []).some((l) => l.step === YOU);

export function CircleStack({
  items,
  open: openProp,
  onOpenChange,
  onSelect,
}: {
  items: Circle[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (id: string) => void;
}) {
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;
  const setOpen = (o: boolean) => {
    setOpenState(o);
    onOpenChange && onOpenChange(o);
  };
  const rank = (c: Circle) => (waits(c) ? 0 : (c.unread ?? 0) > 0 ? 1 : 2);
  const circles = items
    .map((c, i) => ({ c, i }))
    .sort((a, b) => rank(a.c) - rank(b.c) || a.i - b.i)
    .slice(0, 6)
    .map((x) => x.c);
  if (!circles.length) return null;

  if (!open)
    return h(
      "button",
      { type: "button", className: "ix-circles-edges ix-focus", onClick: () => setOpen(true), "aria-label": `${circles.length} conversations`, "aria-expanded": "false" },
      circles.slice(0, 2).map((c, i) => h("i", { key: c.id, "data-depth": i })),
      h("span", { className: "ix-circles-count" }, `+${circles.length}`),
    );

  return h(
    "ul",
    {
      className: "ix-circles",
      "aria-label": "Conversations",
      onKeyDown: (e: Any) => {
        if (e.key === "Escape") setOpen(false);
      },
    },
    [...circles].reverse().map((c) => {
      const loops = c.loops ?? [];
      const you = waits(c);
      return h(
        "li",
        { key: c.id },
        h(
        "button",
        {
          type: "button",
          className: "ix-circle ix-hit",
          onClick: () => {
            setOpen(false);
            onSelect && onSelect(c.id);
          },
        },
        h(
          "span",
          { className: "ix-circle-text" },
          h("span", { className: "ix-circle-title" }, c.title),
          h("span", { className: "ix-circle-line", "data-you": you ? "1" : undefined }, c.line),
        ),
        loops.length
          ? h("span", { className: "ix-circle-loops" }, loops.slice(0, 3).map((l, i) => h(LoopBubble, { key: i, title: l.title, step: l.step, size: 26 })))
          : null,
        loops.length > 3 ? h("span", { className: "ix-circle-more" }, `+${loops.length - 3}`) : null,
        (c.unread ?? 0) > 0
          ? h("span", { className: "ix-circle-unread" }, h("span", { className: "ix-visually-hidden" }, "unread"))
          : null,
        ),
      );
    }),
  );
}

/* ------------------------------------------------------ shared for the labs */

/** A topic's colours as CSS variables (--k, --k2, --kd), from the release, so these parts colour like Button. */
const topicVars = (topic?: string): Any => (topic ? (window as Any).IrisUi?.design?.topicStyle?.(topic) : undefined);

/** A token's value, read off the element: a topic on the element or a parent is honoured. */
const tokenOf = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

/** Any CSS colour as [r, g, b]: the canvas parses it, so a token may be a hex, an rgb() or an oklch(). */
function rgbOf(colour: string): number[] {
  const c = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D;
  c.fillStyle = colour;
  c.fillRect(0, 0, 1, 1);
  return Array.from(c.getImageData(0, 0, 1, 1).data.slice(0, 3));
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const stillMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

function canvasOf(w: number, h: number) {
  return Object.assign(document.createElement("canvas"), { width: w, height: h });
}

/* ------------------------------------------------------------------ Photo */

// A photo with a depth map: a grey image of the same size where white is near and black is far. From the Photos
// lab: the word behind the person (photo, then the word, then only the near part on top again), duotone in the
// topic's ground and accent, and parallax in four depth layers that move with the hand or the scroll.
//
// No photo ships with the system. Without `src` the part paints its own neutral scene (sky, sun, two ridges and a
// figure) in the tokens, with a depth map that matches it. With a `src` but no `depth`, the depth is derived: far
// at the top, near at the bottom and in the middle. A real depth map (Depth Pro) does far better.

type Pair = { photo: HTMLCanvasElement; depth: HTMLCanvasElement };

const PHOTO_WIDTH = 720; // ponytail: one working size, crisp at 360 css px on a 2x screen; size from the box if a hero needs more

function grey(ctx: CanvasRenderingContext2D, z: number) {
  const v = Math.round(z * 255);
  ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;
}

function sceneOf(el: Element, W: number, H: number): Pair {
  const photo = canvasOf(W, H), depth = canvasOf(W, H);
  const p = photo.getContext("2d") as CanvasRenderingContext2D, d = depth.getContext("2d") as CanvasRenderingContext2D;
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
  // Two ridges, far then near: the ground, then the tint at a share, so the scene stays inside the tokens.
  const ridge = (base: number, amp: number, freq: number, tint: number, z: number) => {
    const path = new Path2D();
    path.moveTo(0, H);
    for (let x = 0; x <= W; x += 8) path.lineTo(x, H * base - Math.sin((x / W) * Math.PI * freq + base * 9) * H * amp);
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
  // The figure: a head and shoulders, lit from the sun's side.
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

function load(src: string) {
  return new Promise<HTMLImageElement>((ok, fail) => {
    const i = new Image();
    i.crossOrigin = "anonymous"; // the pixels are read back: a photo from another origin must allow it
    i.onload = () => ok(i);
    i.onerror = fail;
    i.src = src;
  });
}

async function pairOf(el: Element, src: string | undefined, depthSrc: string | undefined, ratio: number): Promise<Pair> {
  if (!src) return sceneOf(el, PHOTO_WIDTH, Math.round(PHOTO_WIDTH / ratio));
  const img = await load(src);
  const W = PHOTO_WIDTH, H = Math.round((W * img.height) / img.width);
  const photo = canvasOf(W, H), depth = canvasOf(W, H);
  (photo.getContext("2d") as CanvasRenderingContext2D).drawImage(img, 0, 0, W, H);
  const d = depth.getContext("2d") as CanvasRenderingContext2D;
  if (depthSrc) d.drawImage(await load(depthSrc), 0, 0, W, H);
  else {
    // ponytail: a guessed depth (lower and central is nearer); a real depth map is the upgrade
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

const pixelsOf = (c: HTMLCanvasElement) => (c.getContext("2d") as CanvasRenderingContext2D).getImageData(0, 0, c.width, c.height);

/** The near part only: the photo with every pixel beyond the threshold made clear, softly over 0.07 of depth. */
function nearOf({ photo, depth }: Pair, threshold: number) {
  const f = pixelsOf(photo), z = pixelsOf(depth).data, alpha = new Float32Array(photo.width * photo.height);
  for (let i = 0; i < alpha.length; i++) {
    alpha[i] = smooth(threshold - 0.035, threshold + 0.035, z[i * 4] / 255);
    f.data[i * 4 + 3] = 255 * alpha[i];
  }
  const near = canvasOf(photo.width, photo.height);
  (near.getContext("2d") as CanvasRenderingContext2D).putImageData(f, 0, 0);
  return { near, alpha };
}

/** Where the word goes: the height (and failing that a smaller size) where about a quarter of it is behind the
 *  near part and never more than 35%, so at least 65% stays readable. Measured at a quarter of the size. */
function placeWord(word: string, font: (px: number) => string, alpha: Float32Array, W: number, H: number) {
  const m = canvasOf(W / 4, H / 4), mc = m.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
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
      mc.font = font((px * size) / 4);
      mc.textAlign = "center";
      mc.textBaseline = "middle";
      mc.fillStyle = "#fff"; // only the alpha is read
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

function paintPhoto(el: HTMLElement, pair: Pair, kind: string, word: string, threshold: number): HTMLCanvasElement[] {
  const { photo } = pair, W = photo.width, H = photo.height;
  if (kind === "parallax") {
    // Four layers, far to near; each holds everything from its depth on, so a near layer moving never opens a hole.
    return [0, 0.18, 0.4, 0.7].map((limit, i) => {
      const layer = i ? nearOf(pair, limit).near : photo;
      layer.style.setProperty("--z", String(i / 3));
      return layer;
    });
  }
  const out = canvasOf(W, H), ctx = out.getContext("2d") as CanvasRenderingContext2D;
  if (kind === "duotone") {
    const f = pixelsOf(photo), a = rgbOf(tokenOf(el, "--kd") || tokenOf(el, "--bg")), b = rgbOf(tokenOf(el, "--k") || tokenOf(el, "--accent"));
    for (let i = 0; i < f.data.length; i += 4) {
      const L = smooth(0.05, 0.95, (0.2126 * f.data[i] + 0.7152 * f.data[i + 1] + 0.0722 * f.data[i + 2]) / 255);
      for (let c = 0; c < 3; c++) f.data[i + c] = a[c] + (b[c] - a[c]) * L;
    }
    ctx.putImageData(f, 0, 0);
    return [out];
  }
  // back: the photo, the word, then the near part again on top.
  const { near, alpha } = nearOf(pair, threshold);
  const family = tokenOf(el, "--font-display") || "system-ui";
  const font = (px: number) => `900 ${px}px ${family}`;
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

export function Photo({
  src,
  depth,
  alt,
  kind = "parallax",
  word = "",
  threshold = 0.5,
  topic,
  ratio = 4 / 3,
  motion = "pointer",
}: {
  src?: string;
  depth?: string;
  alt: string;
  kind?: "back" | "duotone" | "parallax";
  word?: string;
  threshold?: number;
  topic?: string;
  ratio?: number;
  motion?: "pointer" | "scroll";
}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let gone = false;
    pairOf(el, src, depth, ratio)
      .then((pair) => {
        if (gone) return;
        el.style.aspectRatio = `${pair.photo.width} / ${pair.photo.height}`;
        el.replaceChildren(...paintPhoto(el, pair, kind, word, Math.max(0.05, Math.min(0.9, threshold))));
      })
      .catch(() => {
        // A photo that does not load, or one from an origin that forbids reading it back, leaves the frame empty.
      });
    return () => {
      gone = true;
    };
  }, [src, depth, kind, word, threshold, topic, ratio]);

  useEffect(() => {
    const el = host.current;
    if (!el || kind !== "parallax" || stillMotion()) return;
    const set = (x: number, y: number) => {
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
    const move = (e: PointerEvent) => {
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

  return h("div", {
    ref: host,
    className: "ix-photo",
    "data-kind": kind,
    role: "img",
    "aria-label": word && kind === "back" ? `${alt}, with the word ${word}` : alt,
    style: { ...topicVars(topic), aspectRatio: String(ratio) },
  });
}

/* ---------------------------------------------------------- BorderPattern */

// A pattern that runs along a rounded edge: what the phone's rim does while Iris refreshes, listens, thinks,
// works, speaks, waits on you, brings news or saves. From the border lab; eight patterns, each for one moment.
// Violet, the accent and the "you" pink only: the rim is the ring's family, not a new colour.

type Edge = (u: number) => [number, number];
type Pen = { c: CanvasRenderingContext2D; at: Edge; length: number; violet: string; ice: string; you: string };

function edgeOf(W: number, H: number, R: number, IN: number): { at: Edge; length: number } {
  const w = W - 2 * IN, h = H - 2 * IN, r = Math.max(0.001, Math.min(R - IN, w / 2, h / 2));
  const arc = (Math.PI * r) / 2, x0 = IN, y0 = IN, x1 = IN + w, y1 = IN + h;
  const legs = [w / 2 - r, arc, h - 2 * r, arc, w - 2 * r, arc, h - 2 * r, arc, w / 2 - r];
  const on: ((t: number) => [number, number])[] = [
    (t) => [W / 2 + t, y0],
    (t) => [x1 - r + r * Math.cos(-Math.PI / 2 + t / r), y0 + r + r * Math.sin(-Math.PI / 2 + t / r)],
    (t) => [x1, y0 + r + t],
    (t) => [x1 - r + r * Math.cos(t / r), y1 - r + r * Math.sin(t / r)],
    (t) => [x1 - r - t, y1],
    (t) => [x0 + r + r * Math.cos(Math.PI / 2 + t / r), y1 - r + r * Math.sin(Math.PI / 2 + t / r)],
    (t) => [x0, y1 - r - t],
    (t) => [x0 + r + r * Math.cos(Math.PI + t / r), y0 + r + r * Math.sin(Math.PI + t / r)],
    (t) => [x0 + r + t, y0],
  ];
  const length = legs.reduce((a, b) => a + b, 0);
  return {
    length,
    at: (u) => {
      let d = ((((u % 1) + 1) % 1) * length);
      for (let i = 0; i < 9; i++) {
        if (d <= legs[i]) return on[i](d);
        d -= legs[i];
      }
      return [W / 2, y0];
    },
  };
}

/** A stretch of the edge from a to b (0..1, clockwise from the top middle), stroked with a glow of its own colour. */
function stretch(p: Pen, a: number, b: number, colour: string, width: number, glow = 8) {
  if (b < a) [a, b] = [b, a];
  const { c } = p, n = Math.max(2, Math.ceil(((b - a) * p.length) / 2));
  c.beginPath();
  for (let i = 0; i <= n; i++) {
    const [x, y] = p.at(a + ((b - a) * i) / n);
    i ? c.lineTo(x, y) : c.moveTo(x, y);
  }
  c.strokeStyle = colour;
  c.lineWidth = width;
  c.lineCap = "round";
  c.shadowColor = colour;
  c.shadowBlur = glow;
  c.stroke();
}

const easeOut = (f: number) => 1 - Math.pow(1 - f, 3);
const hairline = (p: Pen, o = 0.18) => {
  p.c.globalAlpha = o;
  stretch(p, 0, 1, p.violet, 1.5, 0);
  p.c.globalAlpha = 1;
};

const BORDER_PATTERNS: Record<string, (p: Pen, t: number) => void> = {
  // Refreshing: two comets from the top run down both sides and meet at the bottom.
  comet(p, t) {
    hairline(p);
    for (const [v, colour] of [[0, p.violet], [0.5, p.ice]] as [number, string][]) {
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
    const k = (t / 2.2) % 1;
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
      stretch(p, u, u + 1 / n + 0.002, g > 0.6 ? p.ice : p.violet, 0.8 + 3.2 * g, 6 * g);
    }
  },
  // A question waits on you: the three colours stream round.
  stream(p, t) {
    const n = 90;
    for (let i = 0; i < n; i++) {
      const u = i / n, k = (u + t * 0.25) % 1;
      stretch(p, u, u + 1 / n + 0.003, k < 1 / 3 ? p.violet : k < 2 / 3 ? p.ice : p.you, 2.4, 10);
    }
  },
  // A new loop or a notification: two quick beats, then rest.
  heartbeat(p, t) {
    hairline(p, 0.12);
    const f = (t % 1.8) / 1.8;
    for (const [start, colour] of [[0, p.violet], [0.18, p.ice]] as [number, string][]) {
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
    const f = (t % 2.4) / 2.4, fill = f < 0.5 ? easeOut(f * 2) : 1 - easeOut((f - 0.5) * 2);
    stretch(p, 0, fill * 0.5, p.violet, 2.6, 10);
    stretch(p, 1, 1 - fill * 0.5, p.ice, 2.6, 10);
  },
};

export type BorderPatternName = "comet" | "breathe" | "orbit" | "sparks" | "wave" | "stream" | "heartbeat" | "zip";

export function BorderPattern({
  pattern = "comet",
  radius,
  label,
  children,
}: {
  pattern?: BorderPatternName;
  radius?: number;
  label?: string;
  children?: Any;
}) {
  const box = useRef<HTMLDivElement>(null);
  const paper = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = box.current, cv = paper.current;
    if (!el || !cv) return;
    const draw = BORDER_PATTERNS[pattern] ?? BORDER_PATTERNS.comet;
    const still = stillMotion();
    let pen: Pen | null = null, frame = 0;
    const size = () => {
      const dpr = Math.min(2, devicePixelRatio || 1), W = el.clientWidth, H = el.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      const c = cv.getContext("2d") as CanvasRenderingContext2D;
      c.scale(dpr, dpr);
      const R = radius ?? (parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0);
      pen = { c, ...edgeOf(W, H, R, 3), violet: tokenOf(el, "--violet"), ice: tokenOf(el, "--accent"), you: tokenOf(el, "--wait") };
    };
    const paint = (ms: number) => {
      if (pen) {
        pen.c.clearRect(0, 0, cv.width, cv.height);
        draw(pen, still ? 0.6 : ms / 1000);
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

  return h(
    "div",
    { ref: box, className: "ix-border", "data-pattern": pattern, style: radius != null ? { borderRadius: radius } : undefined },
    h("canvas", { ref: paper, className: "ix-border-rim", "aria-hidden": "true" }),
    label ? h("span", { className: "ix-visually-hidden", role: "status" }, label) : null,
    children,
  );
}

/* -------------------------------------------------------------- ChatStack */

// The chat-stack sketch: every chat with its loops is a card in its topic's colour, and the cards lie in a stack
// with depth (each one further back is smaller, dimmer and softer). A tap fans the stack upward; a tap on a card
// opens that chat on its own sheet, the rest reduced to two edges behind it. CircleStack is the plain, compact
// cousin for the strip; this is the one with the topic colours and the open chat.

export type ChatLoop = CircleLoop & { line?: string };
export type ChatCircle = {
  id: string;
  title: string;
  line: string;
  topic?: string;
  eyebrow?: string;
  loops?: ChatLoop[];
  message?: string;
  actions?: { label: string; primary?: boolean; onClick?: () => void }[];
};

export function ChatStack({
  items,
  fanned: fannedAtStart = false,
  current: currentAtStart = null,
  onSelect,
}: {
  items: ChatCircle[];
  fanned?: boolean;
  current?: string | null;
  onSelect?: (id: string | null) => void;
}) {
  const [fanned, setFanned] = useState(fannedAtStart);
  const [current, setCurrent] = useState<string | null>(currentAtStart);
  const design = (window as Any).IrisUi?.design ?? {};
  const urgency = (c: ChatCircle) => (waits(c) ? 0 : 1);
  const circles = items
    .map((c, i) => ({ c, i }))
    .sort((a, b) => urgency(a.c) - urgency(b.c) || a.i - b.i)
    .map((x) => x.c);
  if (!circles.length) return null;
  const pick = (id: string | null) => {
    setCurrent(id);
    onSelect && onSelect(id);
  };
  const open = circles.find((c) => c.id === current);

  if (open) {
    const loops = open.loops ?? [];
    const lead = loops.find((l) => l.step === YOU) ?? loops[0];
    return h(
      "section",
      {
        className: "ix-chat-open",
        style: topicVars(open.topic),
        "aria-label": open.title,
        onKeyDown: (e: Any) => e.key === "Escape" && pick(null),
      },
      circles
        .filter((c) => c !== open)
        .slice(0, 2)
        .map((c, i) => h("i", { key: c.id, className: "ix-chat-peek", "data-depth": i, style: topicVars(c.topic) })),
      h(
        "div",
        { className: "ix-chat-sheet" },
        h(
          "div",
          { className: "ix-chat-head" },
          lead ? h(LoopBubble, { title: lead.title, step: lead.step, size: 28 }) : null,
          h(
            "span",
            { className: "ix-chat-text" },
            open.eyebrow ? h("span", { className: "ix-chat-eyebrow" }, open.eyebrow) : null,
            h("span", { className: "ix-chat-title" }, open.title),
          ),
        ),
        open.message ? h("p", { className: "ix-chat-message" }, open.message) : null,
        loops.length ? h("span", { className: "ix-chat-section" }, "Loops") : null,
        loops.length
          ? h(
              "ul",
              { className: "ix-chat-loops" },
              loops.map((l, i) =>
                h(
                  "li",
                  { key: i, className: "ix-chat-loop", "data-you": l.step === YOU ? "1" : undefined },
                  h(LoopBubble, { title: l.title, step: l.step, size: 24 }),
                  h(
                    "span",
                    { className: "ix-chat-text" },
                    h("span", { className: "ix-chat-loop-title" }, l.title),
                    h(
                      "span",
                      { className: "ix-chat-line" },
                      h("span", { className: "ix-chat-phase", style: { color: design.PHASE_COLOURS?.[l.step ?? 0] } }, design.PHASES?.[l.step ?? 0] ?? ""),
                      l.line ? `, ${l.line}` : "",
                    ),
                  ),
                ),
              ),
            )
          : null,
        h(
          "div",
          { className: "ix-chat-actions" },
          (open.actions ?? []).map((a, i) =>
            houseButton({ key: i, variant: a.primary ? "primary" : "glass", size: "sm", topic: open.topic, onClick: a.onClick }, a.label),
          ),
          houseButton({ key: "back", variant: "ghost", size: "sm", onClick: () => pick(null) }, "Back"),
        ),
      ),
    );
  }

  return h(
    "div",
    {
      className: "ix-chats",
      "data-fanned": fanned ? "1" : undefined,
      style: { "--n": fanned ? circles.length : Math.min(3, circles.length) },
      onKeyDown: (e: Any) => e.key === "Escape" && setFanned(false),
    },
    circles.map((c, i) => {
      const live = fanned || i === 0;
      const loops = c.loops ?? [];
      return h(
        "button",
        {
          key: c.id,
          type: "button",
          className: "ix-chat ix-focus",
          style: { ...topicVars(c.topic), "--i": i, zIndex: circles.length - i },
          "data-far": !fanned && i > 2 ? "1" : undefined,
          tabIndex: live ? 0 : -1,
          "aria-hidden": live ? undefined : "true",
          "aria-expanded": fanned ? undefined : "false",
          "aria-label": fanned || circles.length < 2 ? undefined : `${c.title}, and ${circles.length - 1} more`,
          onClick: () => (fanned ? pick(c.id) : setFanned(true)),
        },
        h(
          "span",
          { className: "ix-chat-text" },
          c.eyebrow ? h("span", { className: "ix-chat-eyebrow" }, c.eyebrow) : null,
          h("span", { className: "ix-chat-title" }, c.title),
          h("span", { className: "ix-chat-line", "data-you": waits(c) ? "1" : undefined }, c.line),
        ),
        loops.length
          ? h("span", { className: "ix-circle-loops" }, loops.slice(0, 3).map((l, j) => h(LoopBubble, { key: j, title: l.title, step: l.step, size: 24 })))
          : null,
        loops.length > 3 ? h("span", { className: "ix-circle-more" }, `+${loops.length - 3}`) : null,
      );
    }),
    !fanned && circles.length > 1 ? h("span", { className: "ix-circles-count ix-chats-count", "aria-hidden": "true" }, `+${circles.length - 1}`) : null,
  );
}

/* ------------------------------------------------------------------- Edge */

/**
 * The apps' edge drawing (Rand.swift), ported: a light pattern along a ring or a rounded rectangle. 0 is the
 * bottom middle, 0.5 the top middle, so the both-ways patterns start at the bottom and meet at the top.
 */
const EDGE_COLORS: Record<string, string[]> = {
  comet: ["#8B5CF6", "#22D3EE"], zip: ["#22D3EE", "#8B5CF6"], orbit: ["#7dd3fc", "#ffffff"], sparks: ["#8B5CF6", "#22D3EE", "#C026D3"],
  flow: ["#8B5CF6", "#3B82F6", "#C026D3"], party: ["#F43F5E", "#FACC15", "#22D3EE"], wave: ["#8B5CF6", "#22D3EE"], breathe: ["#8B5CF6"],
  heartbeat: ["#F43F5E", "#FDA4AF"], aurora: ["#22D3EE", "#34D399", "#A78BFA"],
};
/** What she thinks with: a different one each turn, and all of them cheerful. */
export const THINKING = ["comet", "zip", "orbit", "sparks", "flow", "party"];

const hexRgb = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const mixColor = (cs: string[], t: number) => {
  if (cs.length < 2) return cs[0];
  const x = Math.min(1, Math.max(0, t)) * (cs.length - 1), i = Math.min(cs.length - 2, Math.floor(x)), f = x - i, a = hexRgb(cs[i]), b = hexRgb(cs[i + 1]);
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(",")})`;
};

function edgePath(shape: string, w: number, ht: number, r: number, inset: number, d?: string, M = 480): number[][] {
  if (d) {
    // Any SVG path, fitted into the box. Its own size comes from a hidden svg, as getBBox needs the page.
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.setAttribute("style", "position:absolute;width:0;height:0;visibility:hidden"); p.setAttribute("d", d); svg.append(p); document.body.append(svg);
    const b = p.getBBox(), L = p.getTotalLength(), k = Math.min((w - inset * 2) / (b.width || 1), (ht - inset * 2) / (b.height || 1));
    const ox = (w - b.width * k) / 2 - b.x * k, oy = (ht - b.height * k) / 2 - b.y * k, n = Math.max(M, Math.round(L * k / 1.5));
    const P = Array.from({ length: n + 1 }, (_, i) => { const q = p.getPointAtLength((L * i) / n); return [ox + q.x * k, oy + q.y * k]; });
    svg.remove();
    return P;
  }
  if (shape === "ring") {
    const cx = w / 2, cy = ht / 2, rr = Math.min(w, ht) / 2 - inset;
    return Array.from({ length: M + 1 }, (_, k) => { const a = Math.PI / 2 + (2 * Math.PI * k) / M; return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]; });
  }
  const i = inset, p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", `M${w / 2},${ht - i} L${r},${ht - i} A${r - i},${r - i} 0 0 1 ${i},${ht - r} L${i},${r} A${r - i},${r - i} 0 0 1 ${r},${i} L${w - r},${i} A${r - i},${r - i} 0 0 1 ${w - i},${r} L${w - i},${ht - r} A${r - i},${r - i} 0 0 1 ${w - r},${ht - i} Z`);
  const L = p.getTotalLength();
  return Array.from({ length: M + 1 }, (_, k) => { const q = p.getPointAtLength((L * k) / M); return [q.x, q.y]; });
}

/** One frame of a pattern at time t (seconds). */
function drawEdge(ctx: CanvasRenderingContext2D, P: number[][], name: string, cols: string[], stroke: number, t: number, round: number) {
  const M = P.length - 1, color = (i: number) => cols[i % cols.length], phase = t / round;
  const seg = (a: number, b: number) => {
    if (a > b) [a, b] = [b, a];
    if (b - a >= 1) { a = 0; b = 1; }
    const v = Math.floor(a); a -= v; b -= v;
    const out: number[][] = [];
    for (let k = Math.round(a * M); k <= Math.round(b * M); k++) out.push(P[k % M]);
    return out;
  };
  // A path made of several pieces (an icon, letters) jumps between them: lift the pen there, never draw across.
  const gap = Math.max(12, 3 * Math.hypot(P[1][0] - P[0][0], P[1][1] - P[0][1]));
  const line = (pts: number[][], col: string, w: number, glow = 6, alpha = 1) => {
    if (pts.length < 2) return;
    ctx.save(); ctx.globalAlpha = Math.max(0, alpha); ctx.strokeStyle = ctx.shadowColor = col; ctx.lineWidth = w; ctx.lineCap = ctx.lineJoin = "round";
    ctx.shadowBlur = glow * 2; ctx.beginPath();
    pts.forEach(([x, y], k) => (k && Math.hypot(x - pts[k - 1][0], y - pts[k - 1][1]) < gap ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke(); ctx.restore();
  };
  if (["comet", "orbit", "heartbeat"].includes(name)) line(P, color(0), stroke * 0.6, 0, 0.18);
  if (name === "breathe") { const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(phase * 2 * Math.PI)); line(P, color(0), stroke * 0.85, 14 * a, a); }
  else if (name === "orbit") { const k = 0.5 + (phase % 1); for (let i = 0; i < 14; i++) line(seg(k - i * 0.012, k - (i + 1) * 0.012), i < 3 ? color(1) : color(0), stroke, 6, 1 - i / 14); }
  else if (name === "sparks") for (let i = 0; i < 28; i++) {
    const u = (i / 28 + phase * 0.15) % 1, f = 0.5 + 0.5 * Math.sin(t * 5 + i * 1.7), [x, y] = P[Math.round(u * M)];
    ctx.save(); ctx.globalAlpha = 0.35 + 0.65 * f; ctx.fillStyle = ctx.shadowColor = color(i); ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(x, y, stroke * (0.5 + 0.6 * f), 0, 7); ctx.fill(); ctx.restore();
  }
  else if (name === "wave") for (let i = 0; i < 120; i++) { const u = i / 120, g = 0.5 + 0.5 * Math.sin(u * Math.PI * 8 - phase * 2 * Math.PI); line(seg(u, u + 1 / 120 + 0.002), g > 0.6 ? color(1) : color(0), stroke * (0.3 + 1.1 * g), 6 * g); }
  else if (name === "flow") for (let i = 0; i < 90; i++) { const u = i / 90, hh = (u + phase * 0.25) % 1; line(seg(u, u + 1 / 90 + 0.003), color(Math.floor(hh * cols.length)), stroke * 0.8, 8); }
  else if (name === "heartbeat") { const f = phase % 1; [0, 0.18].forEach((st, j) => { const g = (f - st) / 0.5; if (g <= 0 || g >= 1) return; const k = 0.5 * easeOut(g), s0 = Math.max(0, k - 0.12);
    line(seg(0.5 - k, 0.5 - s0), color(j), stroke, 6, 1 - g * 0.6); line(seg(0.5 + s0, 0.5 + k), color(j), stroke, 6, 1 - g * 0.6); }); }
  else if (name === "zip") { const f = phase % 1, fill = f < 0.5 ? easeOut(f * 2) : 1 - easeOut((f - 0.5) * 2); line(seg(0.5 - fill * 0.5, 0.5), color(0), stroke * 0.85, 8); line(seg(0.5, 0.5 + fill * 0.5), color(1), stroke * 0.85, 8); }
  else if (name === "aurora") for (let i = 0; i < 96; i++) { const u = i / 96, g = 0.5 + 0.5 * Math.sin(u * Math.PI * 6 + phase * 1.3) * Math.cos(u * Math.PI * 2.3 - phase * 0.7); line(seg(u, u + 1 / 96 + 0.003), mixColor(cols, g), stroke * (0.5 + 1.2 * g), 10 * g, 0.45 + 0.55 * g); }
  else if (name === "party") { const burst = 0.6 + 0.4 * Math.pow(Math.max(0, Math.sin(t * 2 * Math.PI * 2)), 4); for (let i = 0; i < 96; i++) { const u = i / 96, hh = (u * 3 + phase * 1.5) % 1; line(seg(u, u + 1 / 96 + 0.003), mixColor(cols, hh), stroke * (0.8 + 0.6 * burst), 12 * burst, burst); } }
  else { const n = cols.length; for (let i = 0; i < n; i++) { const k = 0.5 * easeOut((phase + i / n) % 1), s0 = Math.max(0, k - 0.09); line(seg(0.5 - k, 0.5 - s0), color(i), stroke); line(seg(0.5 + s0, 0.5 + k), color(i), stroke); } }
}

/**
 * A light pattern along an edge: round her orb while she thinks, or along a screen's rounded edge while it
 * reloads. `width` is the line's box; the glow spills out past it, as light does.
 */
export function Edge({ pattern = "comet", colors, shape = "ring", path, width = 140, height, radius = 28, stroke = 2.5, speed = 1, round = 1.3 }: Any) {
  const ref = useRef<HTMLCanvasElement>(null);
  // Room for the widest glow (party, storm: blur 36px): the canvas never cuts its own light off.
  const ht = height ?? width, pad = 36;
  const key = [pattern, (colors ?? []).join(), shape, path, width, ht, radius, stroke, speed, round].join("|");
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const dpr = Math.min(3, window.devicePixelRatio || 1), W = width + pad * 2, H = ht + pad * 2;
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, pad * dpr, pad * dpr);
    const P = edgePath(shape, width, ht, radius, stroke, path), cols = colors?.length ? colors : EDGE_COLORS[pattern] ?? EDGE_COLORS.comet;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches, t0 = performance.now();
    // Out of sight it stops: an orb scrolled away, a card below the fold, costs nothing.
    let raf = 0, seen = true;
    const frame = (ms: number) => {
      raf = 0;
      if (!seen) return;
      ctx.clearRect(-pad, -pad, W, H);
      drawEdge(ctx, P, pattern, cols, stroke, still ? 0.6 : Math.max(0, (ms - t0) / 1000) * speed, round);
      if (!still) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; if (seen && !raf) raf = requestAnimationFrame(frame); });
    io.observe(c);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [key]);
  return h("canvas", { ref, className: "ix-edge", "aria-hidden": "true", style: { width: width + pad * 2, height: ht + pad * 2, margin: -pad } });
}

/**
 * A word as a neon sign: the light runs along the outline of every letter. SVG and CSS only (a moving dash on
 * the letters' stroke), so it costs next to nothing. Patterns: comet, sparks, zip, party.
 */
export function EdgeText({ text, pattern = "comet", colors, size = 64, weight = 800, speed = 1 }: Any) {
  const ref = useRef<SVGTextElement>(null);
  const [box, setBox] = useState<[number, number, number, number]>([0, 0, size * text.length * 0.62, size * 1.2]);
  useEffect(() => { const b = ref.current?.getBBox(); if (b) setBox([b.x - 8, b.y - 8, b.width + 16, b.height + 16]); }, [text, size, weight]);
  const cols = colors?.length ? colors : EDGE_COLORS[pattern] ?? EDGE_COLORS.comet;
  const t = { x: 0, y: size, fontSize: size, fontWeight: weight, style: { fontFamily: "var(--font-display)" } };
  const dur = `${1.3 / speed}s`;
  return h("svg", { className: `ix-edgetext ix-edgetext-${pattern}`, viewBox: box.join(" "), width: box[2], height: box[3], role: "img", "aria-label": text,
      style: { "--u": `${size / 64}px`, filter: `drop-shadow(0 0 ${size / 16}px ${cols[0]}aa)` } },
    h("text", { ...t, ref, className: "ix-edgetext-tube" }, text),
    cols.slice(0, 3).map((c: string, i: number) => h("text", { ...t, key: i, className: "ix-edgetext-light", stroke: c,
      style: { ...t.style, animationDuration: dur, animationDelay: `${(-1.3 / speed) * (i / cols.length)}s` } }, text)));
}

/**
 * The shipped TalkOrb and Orb3D, with thinking drawn by Edge: a different cheerful pattern each time she starts
 * to think, or the one named by `thinking`. The release's single cyan arc is hidden. Goes upstream.
 */
function thinksWith(Base: Any, ring: number, fallback: number) {
  if (!Base) return undefined;
  // Base's own statics (Orb3D.rings, Orb3D.makeRenderer, ...) come along.
  return Object.assign(function Thinks(props: Any) {
    const { thinking, ...rest } = props;
    const on = props.state === "thinking", size = props.size ?? fallback;
    const [pick, setPick] = useState(() => THINKING[Math.floor(Math.random() * THINKING.length)]);
    const was = useRef(on);
    useEffect(() => { if (on && !was.current) setPick(THINKING[Math.floor(Math.random() * THINKING.length)]); was.current = on; }, [on]);
    return h("span", { className: "ix-thinks" + (on ? " ix-thinks-on" : "") },
      h(Base, rest),
      on ? h("span", { className: "ix-thinks-edge" }, h(Edge, { pattern: thinking ?? pick, width: Math.round(size * ring), stroke: Math.max(1.5, size / 48) })) : null);
  }, Base);
}
const TalkOrbThinks = thinksWith((window as Any).IrisUi?.TalkOrb, 70 / 60, 66);
const Orb3DThinks = thinksWith((window as Any).IrisUi?.Orb3D, 0.72, 220);

/* ---------------------------------------------------------------- MacPill */

export type PillAction = { key?: string; label: string; icon: string; active?: boolean; onSelect?: () => void };

/**
 * Iris on the Mac desktop: only her orb, and a bar of buttons that grows out from behind it when the hand rests
 * on it. Her words stand above the orb, one state line under it with the way back beside it, a badge counts what
 * is new. The orb is the TalkOrb: a press talks to her.
 */
export function MacPill({
  state = "rest",
  onPress,
  left = [],
  right = [],
  open,
  badge,
  words,
  status,
  back,
  working,
  size = 60,
}: {
  state?: string;
  onPress?: () => void;
  left?: PillAction[];
  right?: PillAction[];
  /** Holds the bar out. Without it the bar grows on hover and focus and folds away after a moment. */
  open?: boolean;
  badge?: number;
  words?: string;
  status?: string;
  back?: { label: string; onClick?: () => void; variant?: "text" | "glass" };
  working?: boolean;
  size?: number;
}) {
  const UI = (window as Any).IrisUi ?? {};
  const [hand, setHand] = useState(false);
  const [out, setOut] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setOut(hand), hand ? 180 : 700);
    return () => window.clearTimeout(t);
  }, [hand]);
  const shown = open ?? (out || state === "listening");
  const slot = 46; // a house icon button is 44px, and 2px between
  const l = left.length * slot, r = right.length * slot, gap = size + 8, width = 8 + l + gap + r;
  const button = (a: PillAction, i: number) =>
    h(
      "span",
      { key: a.key ?? a.label + i, className: "ix-pill-btn", "data-on": a.active ? "1" : undefined },
      h(Tooltip, { label: a.label }, houseButton({ variant: "icon", label: a.label, icon: UI.Icon ? h(UI.Icon, { name: a.icon, size: 16 }) : null, onClick: a.onSelect }, null)),
    );
  const orb = UI.TalkOrb ? h(UI.TalkOrb, { state, size, onPress }) : null;
  return h(
    "div",
    { className: "ix-macpill", style: { "--pill-orb": size + "px" } },
    words ? h("p", { className: "ix-pill-words", "aria-live": "polite" }, "“" + words + "”") : null,
    h(
      "div",
      {
        className: "ix-pill-stage",
        onMouseEnter: () => setHand(true),
        onMouseLeave: () => setHand(false),
        onFocus: () => setHand(true),
        onBlur: () => setHand(false),
      },
      left.length || right.length
        ? h(
            "div",
            { className: "ix-pill-bar", "data-open": shown ? "1" : "0", style: { width, left: size / 2 - width / 2 + (r - l) / 2 } },
            h("div", { className: "ix-pill-side", style: { width: l, justifyContent: "flex-end" } }, left.map(button)),
            h("div", { style: { width: gap, flex: "none" } }),
            h("div", { className: "ix-pill-side", style: { width: r } }, right.map(button)),
          )
        : null,
      working ? h("span", { className: "ix-pill-work", "aria-hidden": "true" }, h(Edge, { pattern: "comet", shape: "ring", width: size + 10, stroke: 2 })) : null,
      h("div", { className: "ix-pill-orb" }, badge ? h(Badge, { count: badge }, orb) : orb),
    ),
    status
      ? h(
          "div",
          { className: "ix-pill-status", role: "status" },
          h("span", null, status),
          back ? houseButton({ variant: back.variant ?? "text", size: "sm", onClick: back.onClick }, back.label) : null,
        )
      : null,
  );
}

/* ---------------------------------------------------------------- VaultAsk */

const VAULT_SCOPE = {
  names: "Only the names are read. No value leaves the vault.",
  use: "One value is used for this, and never shown to Iris.",
  store: "A new secret is stored in your vault.",
};

/**
 * The vault's question, the same on every device: who asks, from where, why, what it does and how far it reaches,
 * then allow or deny. A line nobody filled in is said out loud, never left blank.
 */
export function VaultAsk({
  title,
  who,
  from,
  why,
  does,
  scope = "use",
  biometric = "Face ID",
  onAllow,
  onAlways,
  onDeny,
  allowLabel,
  denyLabel = "No",
}: {
  title: string;
  who: string;
  from: string;
  why?: string | null;
  does?: string | null;
  scope?: "names" | "use" | "store";
  /** How the person confirms: "Face ID" on a phone, "Touch ID" on a Mac. */
  biometric?: string;
  onAllow?: () => void;
  /** Offers "Always for this site" next to allow; only for a use with a reason. */
  onAlways?: () => void;
  onDeny?: () => void;
  allowLabel?: string;
  denyLabel?: string;
}) {
  const id = useId();
  const unsaid = "the asker did not say";
  const yes = allowLabel ?? (scope === "store" ? "Save with " : "Allow once with ") + biometric;
  const facts: [string, string | null | undefined][] = [["Who", who], ["From", from], ["Why", why], ["Does", does]];
  return h(
    "section",
    { className: "ix-vaultask", "aria-labelledby": id },
    h("h2", { className: "ix-vaultask-title", id }, title),
    h(
      "dl",
      { className: "ix-vaultask-facts" },
      facts.map(([k, v]) => h("div", { key: k, className: "ix-vaultask-fact" }, h("dt", null, k), h("dd", { "data-unsaid": v ? undefined : "1" }, v || unsaid))),
    ),
    h("p", { className: "ix-vaultask-scope" }, VAULT_SCOPE[scope]),
    why ? null : h("p", { className: "ix-vaultask-note" }, "Nobody said why. Ask Iris first, or say no."),
    h(
      "div",
      { className: "ix-vaultask-actions" },
      houseButton({ variant: "primary", size: "lg", onClick: onAllow }, yes),
      onAlways && scope === "use" && why ? houseButton({ variant: "glass", onClick: onAlways }, "Always for this site") : null,
      houseButton({ variant: "text", onClick: onDeny }, denyLabel),
    ),
  );
}

/* ---------------------------------------------------------------- TableApp */

export type TableRow = {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: string;
  /** The filter chips this row belongs to, besides "All". */
  tags?: string[];
  /** What the sheet shows when the row opens. Without it the row does not open. */
  detail?: Any;
};

/**
 * A list you can search, filter and open: search in the AppBar, filter chips under it, the rows on one Card, a
 * count line, and a row that opens its detail in a Sheet from the side.
 */
export function TableApp({
  title,
  rows = [],
  filters = [],
  search = true,
  placeholder,
  noun = "items",
  actions,
  empty,
  topic,
  onOpen,
}: {
  title: string;
  rows?: TableRow[];
  filters?: string[];
  search?: boolean;
  placeholder?: string;
  /** The word the count line uses: "4 of 12 invoices". */
  noun?: string;
  actions?: Any;
  empty?: string;
  topic?: string;
  /** Opens a row yourself (your own screen, your own sheet). Without it a row with detail opens the Sheet. */
  onOpen?: (row: TableRow) => void;
}) {
  const UI = (window as Any).IrisUi ?? {};
  const host = useRef<Any>(null);
  // Inside an IrisApp the sheet covers the whole window, not just this list: it goes into the app's own box.
  const [app, setApp] = useState<Any>(null);
  useEffect(() => setApp(host.current?.closest(".ia-app") ?? null), []);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = rows
    .map((row, i) => ({ row, i }))
    .filter(({ row }) => filter === "All" || (row.tags ?? []).includes(filter))
    .filter(({ row }) => (row.title + " " + (row.subtitle ?? "")).toLowerCase().includes(q.trim().toLowerCase()));
  const it = open === null ? null : rows[open];
  const chips = filters.length ? ["All", ...filters] : [];
  return h(
    "div",
    { className: "ix-table", ref: host },
    h(AppBar, {
      title,
      actions: h(
        React.Fragment,
        null,
        search ? h("div", { className: "ix-table-search" }, h(SearchField, { value: q, onChange: setQ, placeholder: placeholder ?? `Search ${title.charAt(0).toLowerCase()}${title.slice(1)}` })) : null,
        actions ?? null,
      ),
    }),
    h(
      "div",
      { className: "ix-table-body" },
      chips.length && UI.Chip
        ? h("div", { className: "ix-table-chips", role: "group", "aria-label": "Show" }, chips.map((c) => h(UI.Chip, { key: c, on: c === filter, topic, onClick: () => setFilter(c) }, c)))
        : null,
      shown.length && UI.Card && UI.Row
        ? h(
            UI.Card,
            { padding: 0 },
            shown.map(({ row, i }) =>
              h(UI.Row, {
                key: row.id ?? row.title + i,
                title: row.title,
                subtitle: row.subtitle,
                icon: row.icon && UI.Icon ? h(UI.Icon, { name: row.icon }) : undefined,
                chevron: !!(onOpen || row.detail),
                onClick: onOpen ? () => onOpen(row) : row.detail ? () => setOpen(i) : undefined,
              }),
            ),
          )
        : h("p", { className: "ix-table-empty" }, q ? `Nothing in ${title.toLowerCase()} matches “${q}”.` : empty ?? "Nothing here yet."),
      h("p", { className: "ix-table-count", "aria-live": "polite" }, `${shown.length} of ${rows.length} ${noun}`),
    ),
    it
      ? ((layer: Any) => (app && (window as Any).ReactDOM?.createPortal ? (window as Any).ReactDOM.createPortal(layer, app) : layer))(
          h("div", { className: "ia-layer" }, h(Sheet, { open: true, side: "end", title: it.title, sub: it.subtitle, onClose: () => setOpen(null) }, it.detail)),
        )
      : null,
  );
}

// Five topic colours of the release broke the colour rules: mail was violet (violet means on and the ring), sport
// was red (red means destructive), tasks magenta (the ring's colour). The release keeps its topics in one table on
// IrisUi.design; the colours are changed in place, so every part that asks for a topic later gets the new ones.
// Each accent stays above 7:1 on --bg.
const TOPIC_FIX: Record<string, string[]> = {
  mail: ["#94a3b8", "#cbd5e1", "#121821"],
  sport: ["#fb923c", "#fdba74", "#26140a"],
  tasks: ["#2dd4bf", "#99f6e4", "#05211f"],
  // explain was violet, party magenta. Explain is a cool soft yellow, kept apart from --wait (#fde68a) so a topic
  // never reads as waiting; party is coral pink, short of red.
  explain: ["#ede98a", "#fef9c3", "#1c1b08"],
  party: ["#fdab9f", "#fed7cf", "#2a1210"],
  // home was the waiting yellow (#fde68a): warm sand, so yellow only ever means waiting.
  home: ["#e6c79c", "#f3e3c8", "#211a10"],
};
{
  const topics = (window as Any).IrisUi?.design?.TOPIC;
  if (topics) for (const [name, colours] of Object.entries(TOPIC_FIX)) if (topics[name]) topics[name].splice(0, 3, ...colours);
}

// Word: the release paints the topic's dark ground as a tinted box behind the word. The word now stands on the page:
// the full-size ground fill that starts every frame becomes a clear, everything drawn after it stays. The letters
// were already lightened to read on that ground, which is as dark as the page, so they still read.
const BaseWord = (window as Any).IrisUi?.Word;
function Word(props: Any) {
  const host = useRef<Any>(null);
  useEffect(() => {
    const cv = host.current?.querySelector("canvas");
    const ctx = cv?.getContext("2d");
    if (!ctx || ctx.irisNoGround) return;
    const fill = ctx.fillRect;
    ctx.fillRect = function (this: Any, x: number, y: number, w: number, hh: number) {
      const t = this.getTransform();
      if (x === 0 && y === 0 && w * t.a >= this.canvas.width - 2 && hh * t.d >= this.canvas.height - 2) return this.clearRect(x, y, w, hh);
      return fill.call(this, x, y, w, hh);
    };
    ctx.irisNoGround = true;
  });
  return h("div", { ref: host, className: "ix-word" }, h(BaseWord, props));
}

// ThemeWord "frozen": the release drew icicles in a navy box, which read cheap. This is Ringlab's F5 (frost ferns,
// picked by the owner 01-10): ferns grow in from the bottom corners toward a clean ice-white word, on the page itself.
// A tap lets them grow again. The other themes keep the release drawing, without the box (the Word above).
function fern(c: CanvasRenderingContext2D, x: number, y: number, a: number, len: number, depth: number): void {
  if (!depth || len < 3) return;
  const ex = x + Math.cos(a) * len, ey = y + Math.sin(a) * len, mx = (x + ex) / 2, my = (y + ey) / 2;
  c.beginPath(); c.moveTo(x, y); c.lineTo(ex, ey); c.stroke();
  fern(c, ex, ey, a - 0.06, len * 0.82, depth - 1);
  fern(c, mx, my, a - 0.9, len * 0.45, depth - 1);
  fern(c, mx, my, a + 0.9, len * 0.45, depth - 1);
}
function FrostWord({ text, height = 120 }: { text: string; height?: number }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const [run, setRun] = useState(0);
  useEffect(() => {
    const el = cv.current;
    if (!el) return;
    let raf = 0, t0 = 0;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = (g: number) => {
      const dpr = devicePixelRatio || 1, W = el.clientWidth, H = height;
      if (!W) return;
      el.width = W * dpr; el.height = H * dpr;
      const c = el.getContext("2d")!;
      c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, W, H);
      // The ferns reach about two thirds up, whatever the height (the lab drew them at 400px).
      c.strokeStyle = "#bfe6ff"; c.globalAlpha = 0.55; c.lineWidth = 1;
      fern(c, 0, H, -0.75, H * 0.2 * g, 7); fern(c, W, H, -2.4, H * 0.2 * g, 7);
      c.globalAlpha = 1;
      let size = H * 0.62;
      const font = (n: number) => `900 ${n}px -apple-system, "SF Pro Display", system-ui, sans-serif`;
      c.font = font(size); while (c.measureText(text).width > W * 0.76 && size > 10) { size *= 0.95; c.font = font(size); }
      const gr = c.createLinearGradient(0, H / 2 - size * 0.4, 0, H / 2 + size * 0.4); gr.addColorStop(0, "#ffffff"); gr.addColorStop(1, "#cfeeff");
      c.fillStyle = gr; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(text, W / 2, H / 2);
    };
    if (still) { draw(1); return; }
    const step = (ms: number) => { t0 ||= ms; const g = Math.min(1, (ms - t0) / 3000); draw(g); if (g < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    const ro = new ResizeObserver(() => draw(1)); ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [text, height, run]);
  return h("div", { className: "ix-word ix-frost", role: "img", "aria-label": text, onClick: () => setRun((r) => r + 1) },
    h("canvas", { ref: cv, style: { display: "block", width: "100%", height } }));
}
const BaseThemeWord = (window as Any).IrisUi?.ThemeWord;
function ThemeWord(props: Any) {
  return props.theme === "frozen" || !props.theme ? h(FrostWord, { text: props.text, height: props.height }) : h(Word, { text: props.text, theme: props.theme, height: props.height });
}

// The shipped Toggle only moves when a parent hands it onChange, and it has no name: alone it is a dead switch a
// screen reader calls "switch". This one keeps its own state when nobody controls it, and takes `label`.
function Toggle({ on = false, onChange, label, disabled }: { on?: boolean; onChange?: (on: boolean) => void; label?: string; disabled?: boolean }) {
  const [own, setOwn] = useState(on);
  const value = onChange ? on : own;
  return h(
    "button",
    {
      type: "button",
      className: "iris-toggle" + (value ? " on" : ""),
      role: "switch",
      "aria-checked": value,
      "aria-label": label,
      disabled,
      onClick: () => (onChange ? onChange(!value) : setOwn(!value)),
    },
    h("i"),
  );
}

// The shipped Orb3D shader declares its own round(); GLSL ES 3.00 already has one, so the compile fails and the
// orb draws nothing. Until the release renames it, the source is renamed on its way to the GPU.
for (const C of [(window as Any).WebGL2RenderingContext, (window as Any).WebGLRenderingContext]) {
  const shaderSource = C?.prototype?.shaderSource;
  if (!shaderSource || shaderSource.irisFixed) continue;
  const fixed = function (this: Any, shader: Any, src: string) {
    return shaderSource.call(this, shader, /float round\(float u\)/.test(src) ? src.replace(/\bround\(/g, "irisRound(") : src);
  };
  (fixed as Any).irisFixed = true;
  C.prototype.shaderSource = fixed;
}

const SHIPPED = {
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
  MacPill,
  VaultAsk,
  TableApp,
  ...(BaseWord ? { Word } : {}),
  ...(BaseThemeWord && BaseWord ? { ThemeWord } : {}),
  ...(TalkOrbThinks ? { TalkOrb: TalkOrbThinks } : {}),
  ...(Orb3DThinks ? { Orb3D: Orb3DThinks } : {}),
};

(window as Any).IrisUi = Object.assign((window as Any).IrisUi ?? {}, SHIPPED);

export default SHIPPED;
