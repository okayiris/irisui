// The site's navigation: Foundations / Styles / Components / Patterns / Resources, filled with what
// Iris actually has.

import type { Component } from "./parse";

export const SITE = {
  name: "Iris UI",
  host: "ui.okayiris.com",
  tagline: "The design system behind Iris",
  description:
    "Every Iris part, foundation and layout, with live previews, exact tokens and the rules that hold them. For people and for LLMs.",
  repo: "https://github.com/okayiris/irisui",
  version: "v34",
  released: "30 september 2026",
};

/** Reading order of the component groups, with the label the sidebar shows. */
export const GROUPS: { key: string; label: string; blurb: string }[] = [
  { key: "brand", label: "Brand", blurb: "Her ring, flat and in three dimensions." },
  { key: "controls", label: "Controls", blurb: "What a hand acts on." },
  { key: "surfaces", label: "Surfaces", blurb: "What holds content." },
  { key: "overlays", label: "Overlays", blurb: "What covers the screen for a moment: a decision, a sheet." },
  { key: "navigation", label: "Navigation", blurb: "Where you are and where you go." },
  { key: "feedback", label: "Feedback", blurb: "What she tells you while she works." },
  { key: "screen parts", label: "Screen parts", blurb: "The pieces of the screens she builds for someone." },
  { key: "app layouts", label: "App layouts", blurb: "Whole apps she builds: sidebar, tabs, board, flow, table." },
  { key: "showcases", label: "Showcases", blurb: "Everything together, at size." },
  { key: "other", label: "Other", blurb: "Parts of the system that do not sit in a group yet." },
];

export function groupOf(c: Component): string {
  const g = (c.group || "other").toLowerCase().replace(/[^a-z ]/g, "").trim();
  if (GROUPS.some((x) => x.key === g)) return g;
  if (g.includes("brand")) return "brand";
  if (g.includes("control")) return "controls";
  if (g.includes("surface")) return "surfaces";
  if (g.includes("overlay") || g.includes("dialog") || g.includes("sheet")) return "overlays";
  if (g.includes("nav")) return "navigation";
  if (g.includes("feed")) return "feedback";
  if (g.includes("screen")) return "screen parts";
  if (g.includes("app")) return "app layouts";
  if (g.includes("show")) return "showcases";
  return "other";
}

export const FOUNDATIONS: { id: string; label: string; blurb: string }[] = [
  { id: "meaning", label: "Meaning: what may go where", blurb: "Every drawing says something: an orb is Iris, light is work, her hand is personal." },
  { id: "colour", label: "Colour", blurb: "Near-black, one accent, fifteen topics." },
  { id: "type", label: "Type", blurb: "The system stack, eight named sizes, mono for labels." },
  { id: "shape", label: "Shape", blurb: "Glass, 18px cards, pills." },
  { id: "elevation", label: "Elevation", blurb: "No shadows: light on the edge." },
  { id: "motion", label: "Motion", blurb: "Two durations, one curve, her ring." },
  { id: "interaction", label: "Interaction", blurb: "Press, swipe, sheets, the done moment, haptics: every hand gets an answer." },
  { id: "state", label: "State", blurb: "Hover, press, focus, disabled, busy." },
  { id: "spacing", label: "Spacing", blurb: "12 and 16, 8 inside." },
  { id: "layout", label: "Layout", blurb: "Phone, window, wide: what changes." },
  { id: "icons", label: "Icons", blurb: "Line icons, 24px, from the system." },
  { id: "accessibility", label: "Accessibility: what it holds, and what it owes", blurb: "Contrast, targets, motion, language." },
];

export const PATTERNS: { id: string; label: string; blurb: string }[] = [
  { id: "phone", label: "A phone screen", blurb: "One answer, one accent, one mark." },
  { id: "window", label: "A window she opens", blurb: "Her window in the web app." },
  { id: "loop", label: "A loop", blurb: "One thing that comes back, in phases." },
  { id: "apps", label: "An app she builds", blurb: "Sidebar, tabs, list-detail, board, flow, document, table." },
  { id: "search", label: "Search and finding", blurb: "Where it sits, what it does while it waits." },
  { id: "settings", label: "Settings and the You page", blurb: "Rows, values, danger at the bottom." },
  { id: "loading", label: "Loading and empty", blurb: "Never an empty black screen." },
  { id: "errors", label: "Errors and refusal", blurb: "Say what happened, next to the thing." },
  { id: "onboarding", label: "Onboarding and permission", blurb: "Ask once, say what for." },
  { id: "talk", label: "Talking and voice", blurb: "Listening, thinking, talking, muted." },
];

export const RESOURCES: { id: string; label: string; blurb: string }[] = [
  { id: "llms", label: "For LLMs", blurb: "llms.txt, the JSON API, the prompt that works." },
  { id: "tokens", label: "Tokens", blurb: "Every value, with a picker's eye." },
  { id: "bundle", label: "Install and bundle", blurb: "bundle.js, bundle.css, index.d.ts." },
  { id: "changelog", label: "Release notes", blurb: "What changed, and when." },
  { id: "labs-pro", label: "Iris Labs Pro", blurb: "The design labs for your own projects, 99 euro a year." },
  { id: "contribute", label: "Contribute", blurb: "Add a part, change a token, ship a release." },
];
