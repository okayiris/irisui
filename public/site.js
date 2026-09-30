// The only script the browser runs on this site. Plain, small, no framework.

(() => {
  const q = (s, r = document) => r.querySelector(s);
  const base = document.body.dataset.base ?? "";
  const qa = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---- code behind every demo -------------------------------------------------
  for (const btn of qa("[data-code]")) {
    const pre = document.getElementById(btn.dataset.code);
    if (!pre) continue;
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => {
      const open = pre.hidden;
      pre.hidden = !open;
      btn.setAttribute("aria-pressed", String(open));
      btn.textContent = open ? "hide code" : "code";
    });
  }

  // ---- the menu on a phone ----------------------------------------------------
  const menuBtn = q("[data-menu]");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = document.body.dataset.menu === "open";
      document.body.dataset.menu = open ? "" : "open";
      menuBtn.setAttribute("aria-expanded", String(!open));
    });
  }

  // ---- search -----------------------------------------------------------------
  const input = q("[data-search]");
  const panel = q("[data-search-panel]");
  if (input && panel) {
    let index = null;
    let hits = [];
    let active = 0;

    const load = async () => {
      if (index) return index;
      try {
        index = await (await fetch(base + "/api/site.json")).json();
      } catch {
        index = [];
      }
      return index;
    };

    const score = (item, words) => {
      const hay = (item.title + " " + (item.description || "") + " " + (item.headings || []).join(" ")).toLowerCase();
      const path = item.path.toLowerCase();
      let s = 0;
      for (const w of words) {
        if (!hay.includes(w) && !path.includes(w)) return 0;
        if (item.title.toLowerCase().startsWith(w)) s += 6;
        else if (item.title.toLowerCase().includes(w)) s += 4;
        if (path.includes("/" + w)) s += 3;
        s += 1;
      }
      return s;
    };

    const render = () => {
      if (!hits.length) {
        panel.innerHTML = '<p class="search-empty">Nothing by that name. Try "glass", "topic", "ring".</p>';
        panel.hidden = false;
        return;
      }
      panel.innerHTML = hits
        .map(
          (h, i) =>
            `<a class="search-hit${i === active ? " is-active" : ""}" href="${h.path}"><b>${h.title}</b><span>${(
              h.description || h.path
            )
              .replace(/</g, "&lt;")
              .slice(0, 120)}</span></a>`,
        )
        .join("");
      panel.hidden = false;
    };

    const run = async () => {
      const words = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      if (!words.length) {
        panel.hidden = true;
        return;
      }
      const idx = await load();
      hits = idx
        .map((item) => ({ item, s: score(item, words) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 9)
        .map((x) => x.item);
      active = 0;
      render();
    };

    input.addEventListener("input", run);
    input.addEventListener("focus", () => input.value.trim() && run());
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" && hits.length) {
        active = (active + 1) % hits.length;
        render();
        e.preventDefault();
      } else if (e.key === "ArrowUp" && hits.length) {
        active = (active - 1 + hits.length) % hits.length;
        render();
        e.preventDefault();
      } else if (e.key === "Enter" && hits[active]) {
        location.href = hits[active].path;
      } else if (e.key === "Escape") {
        input.value = "";
        panel.hidden = true;
      }
    });

    document.addEventListener("click", (e) => {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== input) panel.hidden = true;
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
      }
    });
  }

  // ---- the rail marks where you are -------------------------------------------
  const railLinks = qa(".rail-link");
  if (railLinks.length && "IntersectionObserver" in window) {
    const map = new Map(railLinks.map((a) => [a.getAttribute("href").slice(1), a]));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          for (const a of railLinks) a.style.color = "";
          const a = map.get(en.target.id);
          if (a) a.style.color = "var(--accent)";
        }
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    for (const id of map.keys()) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
  }
})();
