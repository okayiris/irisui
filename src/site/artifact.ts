// The parts this project added, in the shape the Design System artifact wants them: one README.md and one
// preview.html per part under components/<Name>/, plus the manifest entries that list them.
//
//   node scripts/build-artifact.mjs          -> artifact/
//
// A preview here follows the convention the shipped previews use: a @dsCard header, one root div, a script
// that fills window.__dsPreview with one entry per variant, and the loop that mounts them as labelled cells.
// The artifact's own harness supplies tokens.css, bundle.css and bundle.js; these previews also need ext.css
// and ext.js beside them, which the header comment says.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { EXT_COMPONENTS } from "./ext-components";
import { ROOT } from "./parse";

/** Every part a preview's variant code may name, so the preview can destructure them all. */
const IN_SCOPE = [
  "Icon",
  "SectionLabel",
  "Card",
  "Row",
  "Toggle",
  "Button",
  "ButtonGroup",
  "Chip",
  "Field",
  "Segmented",
  "CheckList",
  "Progress",
  "Stat",
  "Skeleton",
  "Orb",
  "TalkOrb",
  "Orb3D",
  "THINKING",
  "StatusPill",
  "TabBar",
  "Topic",
  "Widget",
  ...EXT_COMPONENTS.map((c) => c.name),
];

function previewHtml(name: string, group: string, height: number, variants: { label: string; code: string }[]) {
  const entries = variants
    .map((v) => `    ${JSON.stringify(v.label)}: () => ${v.code.replace(/^\(\)\s*=>\s*/, "")},`)
    .join("\n");

  return `<!-- @dsCard group="${group}" height=${height} -->
<!-- IrisUi additions: this preview needs ext.css and ext.js beside tokens.css, bundle.css and bundle.js. -->
<div id="root" style="background:var(--bg);color:var(--fg);padding:16px;display:grid;gap:20px;font-family:var(--font-text)"></div>
<script>
(() => {
  const h = React.createElement;
  const { ${IN_SCOPE.join(", ")} } = window.IrisUi;
  window.__dsPreview = {
${entries}
  };
})();

(() => {
  const h = React.createElement, P = window.__dsPreview, root = document.getElementById("root");
  for (const k of Object.keys(P)) {
    const cel = document.createElement("div");
    cel.innerHTML = '<div style="font:500 10px var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--faint);margin:0 0 8px 2px">' + k + '</div><div></div>';
    root.appendChild(cel);
    ReactDOM.createRoot(cel.lastChild).render(h(window.IrisUi.PreviewI18nProvider, null, h(P[k])));
  }
})();
</script>
`;
}

export function buildArtifact(out = join(ROOT, "artifact")) {
  const written: string[] = [];

  for (const c of EXT_COMPONENTS) {
    const dir = join(out, "components", c.name);
    mkdirSync(dir, { recursive: true });
    const readme = join(dir, "README.md");
    writeFileSync(readme, c.readme.endsWith("\n") ? c.readme : c.readme + "\n");
    const preview = join(dir, "preview.html");
    writeFileSync(preview, previewHtml(c.name, c.group, c.height, c.variants));
    written.push(`components/${c.name}/README.md`, `components/${c.name}/preview.html`);
  }

  writeFileSync(
    join(out, "manifest.json"),
    JSON.stringify(
      {
        note: "The parts this project added, in the shape the Design System artifact wants: publish components/ into the release's project/components/.",
        libraries: [
          { name: "react", version: "18", global: "React" },
          { name: "react-dom", version: "18", global: "ReactDOM" },
        ],
        extraFiles: ["project/components/ext.js", "project/components/ext.css"],
        components: EXT_COMPONENTS.map((c) => ({
          name: c.name,
          group: c.group,
          summary: c.summary,
          reads: `components/${c.name}/README.md`,
          preview: `components/${c.name}/preview.html`,
        })),
      },
      null,
      2,
    ) + "\n",
  );

  writeFileSync(
    join(out, "README.md"),
    `# The added parts, in the artifact's shape

${EXT_COMPONENTS.length} parts this project added to the Iris design system, ready to publish into the Design
System artifact as \`project/components/<Name>/\`:

${EXT_COMPONENTS.map((c) => `- **${c.name}** (${c.group}) — ${c.summary}`).join("\n")}

Each folder holds a \`README.md\` in the system's own voice and a \`preview.html\` with one cell per variant.
The previews need \`ext.css\` and \`ext.js\` (from \`public/ds/\`) beside the release's \`bundle.css\` and
\`bundle.js\`; the values the parts introduced are in the header comment of \`src/ds/ext.css\`.

\`manifest.json\` here lists them for whoever publishes; the release's own index
(\`project/design-system.json\`) is written by the artifact, not by this script.
`,
  );
  written.push("manifest.json", "README.md");

  return { out, parts: EXT_COMPONENTS.length, files: written.length };
}
