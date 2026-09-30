// Publish the built site to the GitHub Pages branch, with the prefix that address needs.
//
//   node scripts/publish-pages.mjs                  -> the copy under /<repo>/ (what gh-pages needs today)
//   node scripts/publish-pages.mjs --prefix=/        -> no prefix, for a host that serves the site at its root
//
// The site is built into dist/ and then pushed as the gh-pages branch, whose content IS the site (no build on
// the server). The repository's own checkout is left alone: the copy is made in a temporary directory.
//
// Publishing needs a token that may push: `gh auth token` is used, so log in with gh first.

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REPO = process.env.IRISUI_REPO ?? "okayiris/irisui";
/** A working git: on this machine /usr/bin/git is the Xcode shim and refuses without the licence. */
const GIT = (() => {
  if (process.env.IRISUI_GIT) return process.env.IRISUI_GIT;
  const candidates = ["git", "/Library/Developer/CommandLineTools/usr/bin/git", "/opt/homebrew/bin/git", "/usr/local/bin/git"];
  for (const c of candidates) {
    try {
      execFileSync(c, ["--version"], { stdio: "ignore" });
      return c;
    } catch {
      /* try the next one */
    }
  }
  throw new Error("no working git found; set IRISUI_GIT");
})();

const prefixArg = process.argv.find((a) => a.startsWith("--prefix="));
const PREFIX = prefixArg ? prefixArg.slice("--prefix=".length) : `/${REPO.split("/")[1]}`;
// Where this copy answers (canonical, sitemap, og:url). Once the custom domain is live:
//   pnpm publish:pages --prefix=/ --canonical=https://ui.okayiris.com
const canonArg = process.argv.find((a) => a.startsWith("--canonical="));
const CANONICAL = canonArg
  ? canonArg.slice("--canonical=".length)
  : `https://${REPO.split("/")[0]}.github.io/${REPO.split("/")[1]}`;

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { cwd: ROOT, stdio: "inherit", ...opts });
const runOut = (cmd, args) => execFileSync(cmd, args, { cwd: ROOT, encoding: "utf8" }).trim();

console.log(`irisui: building the site for ${PREFIX || "/"} …`);
run(process.execPath, [join(ROOT, "scripts/build.mjs")], {
  env: { ...process.env, IRISUI_BASE_PATH: PREFIX, IRISUI_CANONICAL: CANONICAL, IRISUI_INTERNAL: "" },
});
// Ringlab is internal: refuse to publish if any of it reached the build.
for (const p of ["lab", "examples/labs"]) {
  if (existsSync(join(ROOT, "dist", p))) throw new Error(`dist/${p} is internal and must never be published`);
}

const token = process.env.GH_TOKEN ?? runOut("gh", ["auth", "token"]);
// The token rides an HTTP header, never the command line: a URL with a token in it shows up in `ps` and in
// git's own error output.
const authHeader = `Authorization: Basic ${Buffer.from(`x-access-token:${token}`).toString("base64")}`;
const staging = join(tmpdir(), `irisui-pages-${Date.now()}`);
rmSync(staging, { recursive: true, force: true });
mkdirSync(staging, { recursive: true });
cpSync(join(ROOT, "dist"), staging, { recursive: true });
writeFileSync(join(staging, ".nojekyll"), "");

const git = (...args) => run(GIT, args, { cwd: staging });
git("init", "-q");
git("add", "-A");
git(
  "-c",
  "user.name=Okayiris.com",
  "-c",
  "user.email=hello@okayiris.com",
  "commit",
  "-q",
  "-m",
  `The site as built${PREFIX ? ` for ${PREFIX}` : ""}`,
);
git(
  "-c",
  `http.extraHeader=${authHeader}`,
  "push",
  "-f",
  `https://github.com/${REPO}.git`,
  "HEAD:gh-pages",
);

rmSync(staging, { recursive: true, force: true });

// Leave dist/ as the local site needs it: at the root, which is what `pnpm dev` serves.
console.log("irisui: rebuilding dist/ for the root, so your dev server keeps working …");
run(process.execPath, [join(ROOT, "scripts/build.mjs")], { env: { ...process.env, IRISUI_BASE_PATH: "" } });

const where = CANONICAL.endsWith(PREFIX) || PREFIX === "/" || !PREFIX ? CANONICAL : CANONICAL + PREFIX;
console.log(`irisui: published to ${where}/`);
