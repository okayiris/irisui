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

  // ---- a demo as a picture: zoom onto what it draws ---------------------------
  // A demo draws in a 640-wide page, often small and top left. Measure the drawn parts (leaves, svg,
  // canvas, img) and scale that box to fill the frame. Same origin, so the parent can look inside.
  const W = 640, H = 480;
  const fit = (f) => {
    const box = f.parentElement.getBoundingClientRect();
    let doc;
    try { doc = f.contentDocument; } catch { return; }
    if (!doc?.body || !box.width) return;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const el of doc.body.querySelectorAll("*")) {
      const t = el.tagName;
      if (t === "SCRIPT" || t === "STYLE") continue;
      if (el.children.length && !/^(svg|CANVAS|IMG|VIDEO)$/.test(t)) continue;
      if (el.closest("svg") && t !== "svg") continue;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1 || r.width >= W - 1) continue;
      x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top);
      x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom);
    }
    if (!isFinite(x0)) { x0 = 0; y0 = 0; x1 = W; y1 = H; }
    const pad = 12;
    x0 -= pad; y0 -= pad; x1 += pad; y1 += pad;
    const s = Math.min(box.width / (x1 - x0), box.height / (y1 - y0), 1.6);
    const dx = (box.width - (x1 - x0) * s) / 2 - x0 * s;
    const dy = (box.height - (y1 - y0) * s) / 2 - y0 * s;
    f.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
  };
  const watch = (f) => {
    const again = () => [0, 400, 1500].forEach((ms) => setTimeout(() => fit(f), ms));
    f.addEventListener("load", again);
    again();
  };
  // The gallery loads its frames three at a time, only once they near the screen: 70 live pages at once
  // would each pull React and the bundle and choke the tab.
  const wait = [];
  let busy = 0;
  const next = () => {
    while (busy < 3 && wait.length) {
      const f = wait.shift();
      busy++;
      const done = () => { busy--; next(); };
      f.addEventListener("load", done, { once: true });
      setTimeout(() => f.dispatchEvent(new Event("load")), 8000); // ponytail: a stuck frame frees its slot
      watch(f);
      f.src = f.dataset.src;
    }
  };
  const near = new IntersectionObserver((es) => {
    for (const e of es) {
      if (!e.isIntersecting) continue;
      near.unobserve(e.target);
      wait.push(e.target);
    }
    next();
  }, { rootMargin: "300px" });
  for (const f of qa(".gal-shot iframe[data-src]")) near.observe(f);

  // ---- the menu shows what a part looks like ---------------------------------
  // One frame, reused: hovering a component link loads its first live demo beside the menu.
  const peek = document.createElement("div");
  peek.className = "peek";
  peek.hidden = true;
  peek.innerHTML = '<span class="gal-shot"><iframe tabindex="-1" aria-hidden="true"></iframe></span><b></b>';
  document.body.append(peek);
  const frame = peek.querySelector("iframe");
  watch(frame);
  let timer = 0;
  const show = (a) => {
    const m = /\/components\/([^/?#]+)$/.exec(a.getAttribute("href"));
    if (!m || !matchMedia("(hover: hover) and (min-width: 900px)").matches) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      peek.hidden = false;
      const src = a.getAttribute("href").replace(/components\/([^/?#]+)$/, "demos/$1/0.html");
      if (frame.getAttribute("src") !== src) frame.setAttribute("src", src);
      peek.lastChild.textContent = a.textContent.replace(/\d+$/, "").trim();
      const r = a.getBoundingClientRect();
      peek.style.left = r.right + 12 + "px";
      peek.style.top = Math.max(8, Math.min(r.top - 20, innerHeight - 260)) + "px";
      peek.hidden = false;
    }, 120);
  };
  const hide = () => {
    clearTimeout(timer);
    peek.hidden = true;
  };
  for (const a of qa(".side .nav-link")) {
    a.addEventListener("mouseenter", () => show(a));
    a.addEventListener("focus", () => show(a));
    a.addEventListener("mouseleave", hide);
    a.addEventListener("blur", hide);
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
