// The one bar on top of every example: the four places Iris lives, the same day of the same person on each.
(() => {
  const here = document.body.dataset.platform;
  const base = new URL("./", document.currentScript.src).pathname;
  const PLATFORMS = [
    ["ios", "iOS", "?p=ios"],
    ["android", "Android", "?p=android"],
    ["macos", "macOS", "mac/"],
    ["web", "Web", "web/"],
  ];
  const style = document.createElement("style");
  style.textContent = `
    .plat { position: relative; z-index: 60; display: flex; align-items: center; gap: 16px; padding: 12px 20px;
            border-bottom: 1px solid var(--line); background: var(--bg); }
    .plat a { white-space: nowrap; color: var(--dim); text-decoration: none; font: var(--text-body); border-radius: 8px; }
    .plat a:hover { color: var(--fg); }
    .plat a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    .plat .name { font: var(--text-row-title); font-weight: 600; color: var(--fg); margin: 0 8px 0 0; }
    .plat nav { display: flex; gap: 4px; padding: 3px; border-radius: 999px; background: var(--glass); box-shadow: inset 0 0 0 1px var(--edge); }
    .plat nav a { padding: 6px 14px; border-radius: 999px; }
    .plat nav a[aria-current="page"] { background: var(--accent); color: var(--accent-ink); font-weight: 600; }
    .plat .story { margin-left: auto; color: var(--label); font: var(--text-sub); }
    @media (max-width: 640px) { .plat { flex-wrap: wrap; gap: 10px; padding: 10px 16px; } .plat .story { display: none; } }
  `;
  document.head.appendChild(style);
  const bar = document.createElement("header");
  bar.className = "plat";
  bar.innerHTML =
    `<a href="${base}../">‹ Iris UI</a><h1 class="name">Examples</h1>` +
    `<nav aria-label="Platform">${PLATFORMS.map(([id, label, href]) =>
      `<a href="${base}${href}"${id === here ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav>` +
    `<span class="story">One day of Alex, on every device: the dentist moved, Sam's party on Saturday.</span>`;
  document.body.prepend(bar);
})();
