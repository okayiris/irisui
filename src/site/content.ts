// Written content: the foundations, the patterns, the resource pages and the per-component overrides
// (guidelines, specs, accessibility). The chapters and the component READMEs come from src/content/.

import { loadChapters, loadComponents, type Component } from "./parse";
import { EXT_COMPONENTS } from "./ext-components";
import { GROUPS, groupOf } from "./nav";
import { FOUNDATIONS_A } from "./content/foundations-a";
import { FOUNDATIONS_B } from "./content/foundations-b";
import { FOUNDATIONS_C } from "./content/foundations-c";
import { PATTERNS_A } from "./content/patterns-a";
import { PATTERNS_B } from "./content/patterns-b";
import { OVERRIDES_CORE } from "./content/overrides-core";
import { OVERRIDES_BRAND } from "./content/overrides-brand";
import { OVERRIDES_APPS } from "./content/overrides-apps";
import { RESOURCE_DOCS_EXT } from "./content/resources";

/** The published system plus the parts this project added, in the sidebar's own order. */
export const components: Component[] = [...loadComponents(), ...EXT_COMPONENTS].sort((a, b) => {
  const at = GROUPS.findIndex((g) => g.key === groupOf(a));
  const bt = GROUPS.findIndex((g) => g.key === groupOf(b));
  return at - bt || a.name.localeCompare(b.name);
});
export const chapters = loadChapters();

export type Block =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "code"; lang?: string; text: string }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "note"; tone: "rule" | "warn" | "llm"; text: string }
  | { kind: "swatches"; tokens: string[] }
  | { kind: "specimen"; token: string; label: string; sample: string };

export type Section = { title: string; blocks: Block[] };
export type Doc = { id: string; label: string; lede: string; sections: Section[] };

/** A component's own extra guidance, kept next to the code it describes. */
export type Override = {
  when?: string;
  parts?: { name: string; what: string }[];
  rules?: { do: string; dont?: string }[];
  specs?: { label: string; value: string }[];
  a11y?: string[];
  related?: string[];
};

export const OVERRIDES: Record<string, Override> = {
  ...OVERRIDES_CORE,
  ...OVERRIDES_BRAND,
  ...OVERRIDES_APPS,
};

export const FOUNDATION_DOCS: Record<string, Doc> = {
  ...FOUNDATIONS_A,
  ...FOUNDATIONS_B,
  ...FOUNDATIONS_C,
};

export const PATTERN_DOCS: Record<string, Doc> = {
  ...PATTERNS_A,
  ...PATTERNS_B,
};

export const RESOURCE_DOCS: Record<string, Doc> = { ...RESOURCE_DOCS_EXT };

/** Where a part name lives: a component page, a pattern, a foundation or a chapter. Null: no page. */
export function pageForPart(name: string): { path: string; kind: string } | null {
  const id = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const c = components.find((x) => x.id === id || x.name.toLowerCase() === id);
  if (c) return { path: `/components/${c.id}`, kind: c.group };
  if (PATTERN_DOCS[id] || PATTERN_DOCS[name]) return { path: `/patterns/${PATTERN_DOCS[id] ? id : name}`, kind: "Pattern" };
  if (FOUNDATION_DOCS[id]) return { path: `/foundations/${id}`, kind: "Foundation" };
  const ch = chapters.find((x) => x.id === id);
  if (ch) return { path: `/chapters/${ch.id}`, kind: "Chapter" };
  return null;
}

export function componentById(id: string): Component | undefined {
  return components.find((c) => c.id === id);
}
