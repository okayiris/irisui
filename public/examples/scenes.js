// The frame every example page shares: scenes on the left, the stage in the middle, the rules on the right.
// A page hands in its scenes ({ id, name, ok, ask } or { sep }), the rules for the whole surface and a stage.
window.exampleScenes = ({ title, scenes, all, stage }) => {
  const h = React.createElement;
  const real = scenes.filter((s) => s.id);
  function App() {
    const [id, setId] = React.useState(new URLSearchParams(location.search).get("s") || real[0].id);
    const scene = real.find((s) => s.id === id) ?? real[0];
    const go = (next) => { setId(next); const u = new URL(location.href); u.searchParams.set("s", next); history.replaceState(null, "", u); };
    return h("div", { className: "ex" },
      h("nav", { className: "list", "aria-label": "Scenes" },
        h("p", { className: "lab" }, title),
        scenes.map((s) => s.sep ? h("p", { key: s.sep, className: "lab sep" }, s.sep)
          : h("button", { key: s.id, "aria-current": s.id === scene.id ? "true" : "false", onClick: () => go(s.id) }, s.name))),
      h(stage, { key: scene.id, scene, go }),
      h("aside", { className: "rules", "aria-label": "Rules" },
        h("p", { className: "lab" }, scene.name),
        h("ul", { className: "checks" }, scene.ok.map((t) => h("li", { key: t }, t)), scene.ask.map((t) => h("li", { key: t, className: "q" }, t))),
        all.items.length ? h("p", { className: "lab" }, all.label) : null,
        h("ul", { className: "checks" }, all.items.map((t) => h("li", { key: t, className: "q" }, t)))));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(h(window.IrisUi.PreviewI18nProvider, null, h(App)));
};
