// Builds the npm package @okayiris/ui from the design system in public/ds:
//
//   public/ds/{bundle,ext}.js + css + fonts  ->  pkg/  (then `npm publish pkg --access public`)
//
// The bundle is a classic script that reads React from the page and lands on window.IrisUi. The package keeps
// it that way: react-global.js puts the app's own React on globalThis first, then the two scripts run as
// side-effect imports, and index.js re-exports every name they put on window.IrisUi.

import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DS = join(ROOT, "public/ds");
const OUT = join(ROOT, "pkg");
const root = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

for (const f of ["bundle.js", "ext.js", "tokens.css", "bundle.css", "ext.css", "extra.css", "tokens.json", "fonts"])
  cpSync(join(DS, f), join(OUT, f), { recursive: true });
for (const f of ["LICENSE", "THIRD-PARTY-NOTICES.md"]) cpSync(join(ROOT, f), join(OUT, f));

// The names, read from the scripts themselves: run them once against a bare window and list what landed.
const React = createRequire(import.meta.url)("react");
const win = { React };
const ctx = vm.createContext({ React, window: win, console });
for (const f of ["bundle.js", "ext.js"]) vm.runInContext(readFileSync(join(DS, f), "utf8"), ctx);
const names = Object.keys(win.IrisUi);

writeFileSync(join(OUT, "react-global.js"), `import React from "react";\nglobalThis.React ??= React;\n`);
writeFileSync(
  join(OUT, "index.js"),
  `import "./react-global.js";\nimport "./bundle.js";\nimport "./ext.js";\n\n` +
    `const IrisUi = globalThis.IrisUi;\nexport const {\n${names.map((n) => `  ${n},`).join("\n")}\n} = IrisUi;\nexport default IrisUi;\n`,
);
writeFileSync(join(OUT, "styles.css"), ["tokens", "bundle", "ext", "extra"].map((n) => `@import "./${n}.css";`).join("\n") + "\n");

// Types: the release's own index.d.ts for the core, declarations generated from src/ds/ext.tsx for the additions,
// and `any` for the few helpers neither one types.
const core = readFileSync(join(DS, "index.d.ts"), "utf8");
writeFileSync(join(OUT, "core.d.ts"), `import type * as React from 'react';\n${core}`);
execFileSync(
  join(ROOT, "node_modules/.bin/tsc"),
  ["src/ds/ext.tsx", "--declaration", "--emitDeclarationOnly", "--jsx", "react", "--esModuleInterop", "--skipLibCheck", "--outDir", OUT],
  { cwd: ROOT, stdio: "inherit" },
);
const typed = new Set(
  [...(core + readFileSync(join(OUT, "ext.d.ts"), "utf8")).matchAll(/export declare function (\w+)/g)].map((m) => m[1]),
);
const untyped = names.filter((n) => !typed.has(n));
writeFileSync(
  join(OUT, "index.d.ts"),
  `export * from "./core";\nexport * from "./ext";\n` +
    untyped.map((n) => `export declare const ${n}: any;\n`).join("") +
    `declare const IrisUi: typeof import("./core") & typeof import("./ext") & { ${untyped.map((n) => `${n}: any`).join("; ")} };\nexport default IrisUi;\n`,
);

const pkg = {
  name: "@okayiris/ui",
  version: root.version,
  description: "The Iris design system: React components, tokens and styles. Docs at ui.okayiris.com",
  license: root.license,
  homepage: "https://ui.okayiris.com",
  type: "module",
  main: "./index.js",
  types: "./index.d.ts",
  exports: {
    ".": { types: "./index.d.ts", default: "./index.js" },
    // css.d.ts is empty: it only tells TypeScript the side-effect import resolves.
    "./styles.css": { types: "./css.d.ts", default: "./styles.css" },
    "./tokens.css": { types: "./css.d.ts", default: "./tokens.css" },
    "./tokens.json": "./tokens.json",
    "./*": "./*",
  },
  sideEffects: ["*.css", "./react-global.js", "./bundle.js", "./ext.js", "./index.js"],
  peerDependencies: { react: "^18.2.0" },
  keywords: ["iris", "design-system", "react", "components", "tokens"],
};
writeFileSync(join(OUT, "package.json"), JSON.stringify(pkg, null, 2) + "\n");
writeFileSync(join(OUT, "css.d.ts"), "export {};\n");
writeFileSync(
  join(OUT, "README.md"),
  `# @okayiris/ui

The Iris design system: ${names.length} React components, the tokens and the styles. Every part, with a live
example, is on https://ui.okayiris.com.

\`\`\`bash
pnpm add @okayiris/ui
\`\`\`

\`\`\`tsx
import "@okayiris/ui/styles.css";
import { Card, Row, Toggle, Button } from "@okayiris/ui";

export function Settings() {
  return (
    <Card>
      <Row title="On the road" subtitle="Listens and talks through this iPhone." trailing={<Toggle on />} />
      <Button variant="primary">Agree and continue</Button>
    </Card>
  );
}
\`\`\`

Dark only: give the page \`background: var(--bg)\`, \`color: var(--fg)\` and \`font-family: var(--font-text)\`. The tokens are CSS variables in
\`@okayiris/ui/tokens.css\` and as data in \`@okayiris/ui/tokens.json\`.

The components run in the browser. They need React 18, and they use your app's own copy. In a server-rendered app
(Next.js, Remix) import them only in client code.
`,
);

console.log(`@okayiris/ui ${pkg.version}: ${names.length} components (${untyped.length} untyped: ${untyped.join(", ")}) -> ${OUT}`);
