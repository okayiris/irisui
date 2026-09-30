/* @ds-bundle: {"format": 4, "namespace": "IrisUi", "components": [{"name": "Orb"}, {"name": "Button"}, {"name": "Toggle"}, {"name": "Skeleton"}, {"name": "StatusPill"}, {"name": "TalkOrb"}, {"name": "TabBar"}, {"name": "Card"}, {"name": "Row"}, {"name": "Orb3D"}, {"name": "Topic"}, {"name": "Widget"}, {"name": "PhaseRing"}, {"name": "LoopScreen"}, {"name": "Pen"}, {"name": "Anchor"}, {"name": "Word"}, {"name": "ThemeWord"}, {"name": "Pattern"}, {"name": "ButtonGroup"}, {"name": "PageDots"}, {"name": "Chip"}, {"name": "Progress"}, {"name": "Stat"}, {"name": "CheckList"}, {"name": "Segmented"}, {"name": "Field"}]} */
// The Iris app is SwiftUI; these are faithful web versions of its parts, for design work.
// Every value comes from the app's theme and the views that use it. Needs React on the page first;
// lands on window.IrisUi.
(() => {
  const h = React.createElement;
  const cx = (...xs) => xs.filter(Boolean).join(" ");

  // Line icons like the app's SF Symbols (24x24, stroke 1.75, round caps).
  const PATHS = {
    sparkles: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6",
    loop: "M4 12a8 8 0 0 1 13.7-5.6L20 9M20 4v5h-5M20 12a8 8 0 0 1-13.7 5.6L4 15M4 20v-5h5",
    camera: "M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    person: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1.5-4 4.5-6 8-6s6.5 2 8 6",
    mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3",
    speaker: "M4 9h4l5-4v14l-5-4H4zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11",
    chevron: "M9 5l7 7-7 7",
    external: "M7 17L17 7M9 7h8v8",
    car: "M5 11l1.6-4.2A2 2 0 0 1 8.5 5.5h7a2 2 0 0 1 1.9 1.3L19 11M4 11h16v6H4zM6 17v2M18 17v2M7.5 14h.01M16.5 14h.01",
    phone: "M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2",
    shield: "M12 3l7 3v6c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6z",
    globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18",
    wave: "M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4",
    trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  };
  function Icon({ name, size = 20 }) {
    return h("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
      strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, h("path", { d: PATHS[name] || "" }));
  }

  // A frosted card: the one surface of the app. Radius 18, --glass fill, 1px --edge stroke, padding 14.
  function Card({ children, className, style, padding = 14 }) {
    return h("div", { className: cx("iris-card", className), style: { padding, ...style } }, children);
  }

  // A settings row on the "You" page: icon, title, a grey line under it, and something on the right
  // (a toggle, a menu value, or a chevron / external-link arrow).
  function Row({ icon, title, subtitle, trailing, chevron, external, danger, onClick }) {
    const right = trailing ?? (chevron ? h("span", { className: "iris-row-arrow" }, h(Icon, { name: "chevron", size: 14 }))
      : external ? h("span", { className: "iris-row-arrow" }, h(Icon, { name: "external", size: 14 })) : null);
    return h(Card, { className: cx("iris-row", onClick && "iris-press") },
      h("div", { className: "iris-row-inner", onClick },
        icon ? h("span", { className: cx("iris-row-icon", danger && "iris-danger") }, icon) : null,
        h("div", { className: "iris-row-text" },
          h("div", { className: cx("iris-row-title", danger && "iris-danger") }, title),
          subtitle ? h("div", { className: "iris-row-sub" }, subtitle) : null),
        right ? h("div", { className: "iris-row-trailing" }, right) : null));
  }

  // The iOS switch as the app draws it: violet when on, grey glass when off.
  function Toggle({ on = false, onChange }) {
    return h("button", { className: cx("iris-toggle", on && "on"), role: "switch", "aria-checked": on,
      onClick: () => onChange && onChange(!on) }, h("i"));
  }

  // Buttons. "primary" is the light pill ("Agree and continue"), "glass" the frosted one, "accent" the
  // ice-blue pill ("Continue here"), "ghost" plain text, "danger" red text.
  // text = a link-like action in the accent; icon = a square icon button (give it a label); busy = spinner, not clickable.
  // `topic` (or a <Topic>/<ButtonGroup> around it) turns primary into the topic accent at oklch .82/.12 with dark ink.
  function Button({ variant = "glass", size = "md", icon, children, onClick, disabled, busy, topic, label }) {
    const d = window.IrisUi && window.IrisUi.design, iconOnly = variant === "icon";
    return h("button", { className: cx("iris-btn", iconOnly ? "iris-btn-icon-only" : `iris-btn-${variant}`, `iris-btn-${size}`, disabled && !busy && "iris-btn-off"),
      style: topic && d ? d.topicStyle(topic) : undefined, onClick, disabled: disabled || busy, "aria-busy": busy ? "true" : undefined, "aria-label": label },
      busy ? h("span", { className: "iris-spin", "aria-hidden": "true" }) : icon ? h("span", { className: "iris-btn-icon" }, icon) : null, iconOnly ? null : children);
  }

  // Her orb: a ring with a turning violet-blue-pink gradient and a soft glow. `state` changes the light:
  // idle, listening (with an echo ring), busy, talking; "away" is grey and still.
  function Orb({ size = 22, state = "idle" }) {
    return h("span", { className: cx("iris-orb", `iris-orb-${state}`), style: { width: size, height: size, "--k": size / 22 } },
      h("i", { className: "glow" }), h("i", { className: "ring" }), state === "listening" ? h("i", { className: "echo" }) : null);
  }

  // The status next to the orb at the top: one word, or a pill with an action ("Continue here").
  function StatusPill({ state = "idle", label, action, onAction }) {
    return h("div", { className: "iris-status" },
      h(Orb, { state, size: 22 }),
      label ? h("span", { className: "iris-status-label" }, label) : null,
      action ? h(Button, { variant: "accent", size: "sm", icon: h(Icon, { name: "speaker", size: 14 }), onClick: onAction }, action) : null);
  }

  // The ring around the talk orb. Two modes:
  // spectrogram: measured. 48 pitches from 90 Hz to 7 kHz, mirrored: low at the bottom, up both sides to
  //   high at the top, so there is no seam; each pitch has a fixed colour (low ice blue, via violet, to high magenta); a bar is
  //   as long as that pitch is loud, jumping up at once and settling slowly, like a meter. Pass `analyser` (a
  //   WebAudio AnalyserNode on the voice); without one the bars rest low.
  // expression: the bars wave by themselves in turning colours. Only when she calls it for a big moment.
  const STOPS = [[46,230,214],[56,189,248],[139,92,246],[192,38,211],[139,92,246],[56,189,248],[46,230,214]];
  const hash = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const colour = u => { const x = ((((u % 1) + 1) % 1)) * 6, k = Math.floor(x), f = x - k;
    return `rgb(${STOPS[k].map((v, j) => Math.round(v + (STOPS[k + 1][j] - v) * f))})`; };
  function bandsFrom(analyser, data, keep) {
    analyser.getFloatFrequencyData(data);
    const binHz = analyser.context.sampleRate / analyser.fftSize;
    for (let b = 0; b < 48; b++) {
      const lo = 90 * Math.pow(7000 / 90, b / 48), hi = 90 * Math.pow(7000 / 90, (b + 1) / 48);
      const k0 = Math.max(1, Math.floor(lo / binHz)), k1 = Math.max(k0, Math.floor(hi / binHz));
      let s = 0; for (let k = k0; k <= k1; k++) s += data[k]; const db = s / (k1 - k0 + 1);
      keep[b] = Math.max(Math.min(1, Math.max(0, (db + 90) / 60)), keep[b] * 0.8);   // up at once, down slowly
    }
    return keep;
  }
  function Spectrum({ size, mode = "spectrogram", analyser }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const cv = ref.current, dpr = window.devicePixelRatio || 1, box = size * 1.9;
      cv.width = cv.height = box * dpr;
      const ctx = cv.getContext("2d"), keep = new Array(48).fill(0);
      const data = analyser ? new Float32Array(analyser.frequencyBinCount) : null; let raf;
      const draw = now => {
        const t = now / 1000, r0 = size * 0.55, fr = t * 24, f0 = Math.floor(fr), fp = fr - f0;
        const bands = analyser ? bandsFrom(analyser, data, keep) : null;
        ctx.setTransform(dpr, 0, 0, dpr, box * dpr / 2, box * dpr / 2); ctx.clearRect(-box, -box, box * 2, box * 2);
        ctx.lineCap = "round"; ctx.lineWidth = Math.max(1, size * 0.04);
        for (let i = 0; i < 96; i++) {
          const u = i / 96;
          let th, len, c;
          if (mode === "spectrogram") {
            // Mirrored: low at the bottom, up both sides at once to high at the top, so high and low never meet.
            th = Math.PI / 2 + u * Math.PI * 2;
            const tone = u < 0.5 ? u * 2 : (1 - u) * 2, p = tone * 47, k = Math.floor(p), f = p - k;
            const v = bands ? bands[k] * (1 - f) + bands[Math.min(47, k + 1)] * f : 0.08 + 0.04 * Math.sin(t * 2 + tone * 9);
            len = size * 0.03 + size * 0.2 * v; c = colour(tone * 0.5);
          } else {
            th = u * Math.PI * 2 - Math.PI / 2;
            const band = 0.45 + 0.55 * Math.pow(0.5 + 0.5 * Math.sin(th * 3 + t * 1.3), 1.5);
            const n0 = hash(i * 31 + f0 * 7), n1 = hash(i * 31 + (f0 + 1) * 7);
            const flick = 0.25 + 0.75 * (n0 + (n1 - n0) * (1 - Math.pow(1 - fp, 3)));
            len = size * 0.035 + size * 0.15 * band * flick * (hash(i + 200) > 0.86 ? 1.5 : 1); c = colour(u + t * 0.04);
          }
          ctx.strokeStyle = c; ctx.beginPath();
          ctx.moveTo(Math.cos(th) * r0, Math.sin(th) * r0); ctx.lineTo(Math.cos(th) * (r0 + len), Math.sin(th) * (r0 + len)); ctx.stroke();
        }
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(raf);
    }, [size, mode, analyser]);
    return h("canvas", { ref, className: "iris-talkorb-spectrum", style: { width: size * 1.9, height: size * 1.9 } });
  }

  // Her orb as the talk button (the orb is the mic): a dark disc
  // with the turning Iris ring inside. rest: turns slowly. talking: the measured spectrogram of the voice (yours
  // while you hold it, hers while she speaks). expression: the bars dance by themselves, only when she calls
  // it for a big moment. muted: the ring steps back behind a struck-through mic. listening: ice-blue echoes close
  // to the disc. thinking: a neon
  // arc races round and the ring pulses. away: grey and still. Always drawn above everything around it.
  function TalkOrb({ size = 66, state = "rest", analyser, onPress }) {
    const inner = size * 22 / 60;
    return h("button", { className: cx("iris-talkorb", `iris-talkorb-${state}`), onClick: onPress, "aria-label": "Hold to talk",
      style: { width: size, height: size, "--s": size + "px" } },
      state === "talking" || state === "expression" ? h(Spectrum, { size, analyser, mode: state === "talking" ? "spectrogram" : "expression" }) : null,
      state === "listening" ? [0, 1, 2].map(i => h("i", { key: i, className: "iris-talkorb-echo", style: { animationDelay: `${i * 0.45}s` } })) : null,
      state === "thinking" ? h("i", { className: "iris-talkorb-arc" }) : null,
      h("span", { className: "iris-talkorb-disc" }),
      h("span", { className: "iris-talkorb-core" }, h(Orb, { size: inner, state: state === "away" ? "away" : "idle" })),
      // muted: her voice is off. The ring steps back and a struck-through mic draws itself in front.
      state === "muted" ? h("svg", { className: "iris-talkorb-muted-mic", width: size * 0.34, height: size * 0.34, viewBox: "0 0 24 24", "aria-hidden": true },
        h("rect", { x: 8.5, y: 2.5, width: 7, height: 12, rx: 3.5, fill: "currentColor" }),
        h("path", { d: "M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" }),
        h("path", { className: "gap", d: "M4 3l16 18", stroke: "#11151b", strokeWidth: 5, strokeLinecap: "round" }),
        h("path", { className: "line", d: "M4 3l16 18", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" })) : null);
  }

  // The tab bar: four tabs with her TalkOrb in the middle. `collapsed`: only the orb shows;
  // the glass and the tabs fold into it (the app does this when idle, and opens on a page swipe or a swipe
  // right on the orb). `progress` -1...1: a page swipe in flight; the light pill sits between two tabs that
  // far and stretches halfway, like a drop flowing over.
  function TabBar({ tabs = ["Iris", "Loops", "Camera", "You"], active = 0, icons = ["sparkles", "loop", "camera", "person"],
    collapsed = false, progress = 0, talk = "rest", analyser, onSelect, onTalk }) {
    const to = Math.max(0, Math.min(3, active + Math.sign(progress))), a = Math.abs(progress), stretch = Math.sin(Math.PI * a);
    const w = "((100% - 84px) / 4)", c = i => `calc(5px + ${w} * ${i + 0.5}${i >= 2 ? " + 74px" : ""})`;
    // Liquid: the front runs ahead, the back lets go later, and a neck between them thins as it stretches.
    // Blur plus an alpha threshold (the goo filter below) melts the blobs into one drop (metaball).
    const at = t => `calc(${c(active)} + (${c(to)} - ${c(active)}) * ${t})`;
    const blob = (t, k) => ({ left: at(t), width: `calc(${w} * ${k})`, height: 54 * (1 - 0.15 * stretch) });
    const front = blob(1 - (1 - a) * (1 - a), 1 - 0.2 * stretch), back = blob(a * a, 1 - 0.4 * stretch);
    const neck = { left: `calc(${at(a * a)} + (${at(1 - (1 - a) * (1 - a))} - ${at(a * a)}) / 2)`,
      width: `calc(${c(Math.max(to, active))} - ${c(Math.min(to, active))})`, height: 54 * (1 - 0.62 * stretch),
      transform: `translate(-50%, -50%) scaleX(${Math.abs((1 - (1 - a) * (1 - a)) - a * a)})` };
    const tab = (name, i) => h("button", { key: name, className: cx("iris-tab", i === active && "on", i < 2 ? "left" : "right"), onClick: () => onSelect && onSelect(i) },
      h("span", { className: "iris-tab-icon" }, h(Icon, { name: icons[i], size: 26 })), h("span", null, name));
    return h("nav", { className: cx("iris-tabbar", collapsed && "collapsed") },
      h("i", { className: "iris-tabbar-glass" }),
      h("svg", { width: 0, height: 0, style: { position: "absolute" }, "aria-hidden": true },
        h("filter", { id: "iris-goo" }, h("feGaussianBlur", { stdDeviation: 5 }),
          h("feColorMatrix", { values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11" }))),
      h("span", { className: "iris-tabbar-pill" },
        h("i", { style: back }), h("i", { style: front }), a > 0 ? h("i", { style: neck }) : null),
      tabs.slice(0, 2).map(tab),
      h("span", { className: "iris-tabbar-talk" }, h(TalkOrb, { size: 66, state: talk, analyser, onPress: onTalk })),
      tabs.slice(2).map((n, j) => tab(n, j + 2)));
  }

  // ---- Orb3D: her orb in 3D. A glass ball with a light ring round it, drawn in WebGL2 with bloom,
  // tone mapping and grain; the ring is a small GLSL function `ring(p, back, front)`. What sits behind the
  // ball bends through the glass. The TalkOrb states drive it: the voice (measured with `analyser`, or a
  // made-up one) feeds the ring as textures. The helper names inside the shader (polar, glow, line, round,
  // band, level, pulse ...) are the ring API.
  const RINGS = {"deepsea": {"name": "Deepsea spiral", "glsl": "// Add up every turn on its own (not just the nearest one): otherwise the glow jumps where the spiral starts and ends.\nvoid ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float rho = q.x;\n  float s = round(q.y);\n  float pulseV = 1.0 + 0.45 * pulse;\n\n  vec2 pr = rot(-t * 0.045) * p;\n  float psi = atan(pr.y, pr.x);\n  psi = psi < 0.0 ? psi + TAU : psi;\n\n  float phiMax = TAU * 2.0;\n  float r0 = 51.0 + 2.5 * s + 1.5 * level;\n  float rE = 68.0 + 5.0 * s + 2.0 * level;\n  float k = (rE - r0) / phiMax;\n\n  for (int m = 0; m < 3; m++) {\n    float ph = psi + TAU * float(m);\n    if (ph >= phiMax) continue;\n    float u = ph / phiMax;\n\n    // main line: tapered glowing core with a short halo\n    float r = r0 + k * ph;\n    float e = k / max(r, 20.0);\n    float dH = abs(rho - r) / sqrt(1.0 + e * e);\n    float envH = smoothstep(0.0, 0.18, u) * smoothstep(1.0, 0.82, u);\n    float depth = 0.70 + 0.30 * sin(ph + t * 0.22);\n    float thickness = (1.30 + 2.4 * s) * (0.65 + 0.70 * (1.0 - u));\n    float coreW = 0.32 + thickness * 0.24;\n    vec3 kH = mix(iris(psi / TAU + 0.05 * u), vec3(0.38, 0.80, 1.0), 0.55);\n    front += kH * (line(dH, coreW) * 1.25 + glow(dH, thickness * 0.85 + 0.45) * 0.32) * envH * depth * (0.58 + 1.05 * s) * pulseV;\n\n    // echo: much weaker, ice-blue-violet accent\n    float rB = r0 + 6.5 + k * 1.01 * ph;\n    float eB = k * 1.01 / max(rB, 20.0);\n    float dB = abs(rho - rB) / sqrt(1.0 + eB * eB);\n    float envB = smoothstep(0.0, 0.22, u) * smoothstep(1.0, 0.76, u);\n    float echo = spec(u, 0.45) * (0.55 + 0.7 * band(0.35));\n    float thicknessB = 0.45 + 1.1 * echo;\n    vec3 kB = mix(iris(psi / TAU + 0.33), vec3(0.58, 0.40, 1.0), 0.55);\n    front += kB * (line(dB, 0.28 + thicknessB * 0.22) * 0.75 + glow(dB, thicknessB * 0.8 + 0.4) * 0.16) * envB * (0.44 + 0.85 * echo);\n  }\n}", "look": {"size": 1, "glow": 1.1, "lighting": 1.05, "grain": 0.25, "chroma": 0.3, "hueShift": 0.12, "saturation": 1.15, "sphere": "glass", "spin": 0.35134604716171836}}, "fieldlines": {"name": "Field lines", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  float s  = round(0.35);\n  float s2 = round(0.72);\n  float breath = 0.5 + 0.5*sin(t*0.45);\n  float lvl = 0.62 + 0.22*breath + 0.45*s + 0.55*level + 0.55*pulse;\n\n  // loop 1: ice blue, widely tilted\n  float k1 = 1.16 + 0.10*sin(t*0.11);\n  vec3 r1 = tiltedRing(p, R0 + 15.0 + 3.5*s2, k1, 0.30 + t*0.032);\n  float circumference1 = r1.y*TAU + t*0.20;\n  float a1 = 0.5 + 0.5*cos(circumference1*2.0);\n  float pool1 = pow(a1, 3.4);\n  float core1 = line(r1.x, 0.35 + 1.1*pool1) * (0.55 + 2.6*pool1) * lvl;\n  float halo1 = glow(r1.x, 0.9 + 3.6*pool1) * (0.14 + 1.0*pool1) * lvl;\n  vec3 color1 = iris(r1.y + 0.06 + t*0.02);\n  vec3 light1 = color1 * (core1 + halo1);\n\n  // loop 2: violet accent, steeper\n  float k2 = 0.62 + 0.10*cos(t*0.09);\n  vec3 r2 = tiltedRing(p, R0 + 4.0 + 2.2*s, k2, 2.15 - t*0.024);\n  float circumference2 = r2.y*TAU + t*0.17;\n  float a2 = 0.5 + 0.5*cos(circumference2*2.0 + 1.0);\n  float pool2 = pow(a2, 3.4);\n  float core2 = line(r2.x, 0.32 + 0.95*pool2) * (0.5 + 2.2*pool2) * lvl * 0.9;\n  float halo2 = glow(r2.x, 0.85 + 3.0*pool2) * (0.13 + 0.85*pool2) * lvl * 0.9;\n  vec3 color2 = iris(r2.y + 0.55 + t*0.02);\n  vec3 light2 = color2 * (core2 + halo2);\n\n  if (r1.z > 0.0) front += light1; else behind += light1;\n  if (r2.z > 0.0) front += light2; else behind += light2;\n}", "look": {"size": 1.05, "glow": 1.1, "lighting": 1.05, "grain": 0.18, "chroma": 0.3, "hueShift": 0.1, "saturation": 1.15, "sphere": "glass", "spin": 0.11649906518792341}}, "precession": {"name": "Precession", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  float size = 1.0 + 0.035 * sin(t * 0.17);\n  float R = 68.0 * size;\n\n  vec3 a = tiltedRing(p, R, 0.72, t * 0.10);\n  vec3 b = tiltedRing(p, R, 0.72, t * 0.10 + 1.57);\n\n  float ta = 0.35 + 0.65 * (0.5 + 0.5 * sin(a.y * TAU + t * 0.30));\n  float tb = 0.35 + 0.65 * (0.5 + 0.5 * sin(b.y * TAU - t * 0.30 + 1.9));\n\n  float sa = round(a.y);\n  float sb = round(b.y);\n\n  float thickA = (1.0 + 2.0 * sa) * ta;\n  float thickB = (1.0 + 2.0 * sb) * tb;\n\n  vec3 lightA = iris(a.y + t * 0.03) * (line(a.x, thickA * 0.35) * 1.3 + glow(a.x, thickA * 0.80) * (0.12 + 0.42 * sa)) * ta;\n  vec3 lightB = iris(b.y + t * 0.03 + 0.45) * (line(b.x, thickB * 0.35) * 1.3 + glow(b.x, thickB * 0.80) * (0.12 + 0.42 * sb)) * tb;\n\n  if (a.z > 0.0) front += lightA; else behind += lightA;\n  if (b.z > 0.0) front += lightB; else behind += lightB;\n\n  vec3 c = tiltedRing(p, R - 9.0, 0.72, t * 0.10 + 0.8);\n  float sc = round(c.y + 0.5);\n  float thickC = 0.7 + 1.4 * sc;\n  vec3 fine = iris(c.y + 0.5 + t * 0.04) * (line(c.x, thickC * 0.3) * 1.1 + glow(c.x, thickC * 0.7) * 0.12) * 0.35;\n  if (c.z > 0.0) front += fine; else behind += fine;\n\n  behind += iris(a.y + 0.7) * glow(a.x, 1.5) * pulse * 0.05;\n  behind += iris(b.y + 0.2) * glow(b.x, 1.5) * pulse * 0.05;\n}\n", "look": {"size": 1.05, "glow": 0.9, "lighting": 1, "grain": 0.35, "chroma": 0.25, "hueShift": 0.1, "saturation": 1.1, "sphere": "glass", "spin": 0.890818969871808}}, "paper-fan": {"name": "Paper fan", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float u = q.y;\n  float s = round(u);\n\n  float N = 36.0;\n  float fu = u * N;\n  float f = fract(fu);\n  float par = mod(floor(fu), 2.0);\n  float dir = par * 2.0 - 1.0;\n  float zig = abs(f - 0.5) * 2.0;\n\n  float Rin  = R0 + 2.0 + 3.0 * s;\n  float Rout = R0 + 26.0 + 24.0 * s + 14.0 * level + 4.0 * pulse;\n  Rout += 10.0 * (1.0 - zig);\n\n  float x = q.x;\n  float w = max(Rout - Rin, 1.0);\n  float rad = clamp((x - Rin) / w, 0.0, 1.0);\n\n  float inBand = smoothstep(Rin - 1.5, Rin + 1.5, x) * smoothstep(Rout + 1.5, Rout - 1.5, x);\n\n  float tilt = (f - 0.5) * dir;\n  float shade = 0.35 + 1.1 * tilt;\n  float z = dir * (1.0 - zig) * 0.5;\n  float crease = smoothstep(0.72, 1.0, zig);\n\n  float edgeLight = line(x - Rout, 1.2) + line(x - Rin, 1.0) * 0.5;\n\n  vec3 paper = mix(vec3(0.98, 0.97, 0.99), iris(u + t * 0.02), 0.5);\n  vec3 col = paper * 0.18;\n  col += paper * max(shade, 0.0) * 0.85;\n  col *= 0.60 + 0.85 * (1.0 - rad);\n  col += vec3(1.0, 0.99, 0.98) * crease * (0.45 + 1.4 * s + 1.8 * pulse);\n  col += paper * edgeLight * 1.1;\n\n  float amt = inBand * (0.55 + 1.5 * s + 1.2 * level + 1.0 * pulse);\n\n  float halo = glow(x - Rout, 3.0) * 0.35 + glow(x - Rin, 2.5) * 0.20;\n  vec3 light = col * amt + paper * halo * (0.30 + 1.2 * s);\n\n  if (z > 0.0) front += light; else behind += light;\n}", "look": {"glow": 1, "lighting": 1.15, "grain": 0.25, "chroma": 0.15, "hueShift": 0, "saturation": 0.95, "sphere": "pearl"}}, "firefly-ribbon": {"name": "Firefly ribbon", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec3 R = tiltedRing(p, 78.0, 1.08, 0.35 + 0.08 * sin(t * 0.23));\n  float u = R.y;\n\n  // soft glass ribbon: almost invisible, carries the fireflies\n  float ribbon = glow(R.x, 3.4) * (0.10 + 0.45 * round(u));\n  vec3 ribbonC = iris(u + t * 0.03) * ribbon * (0.7 + 1.0 * level);\n  if (R.z > 0.0) front += ribbonC; else behind += ribbonC;\n\n  // fourteen fireflies along the ribbon\n  const int N = 14;\n  for (int i = 0; i < N; i++) {\n    float fi = float(i);\n    float u_i = (fi + 0.15 + 0.7 * hash(vec2(fi, 1.3))) / float(N);\n    float du = u - u_i;\n    du -= floor(du + 0.5);\n    float dalong = du * TAU * 78.0;\n    float drad  = R.x - 6.0 * (hash(vec2(fi, 5.5)) - 0.5);\n    float v = round(u_i);\n    float phase = hash(vec2(fi, 9.1)) * TAU;\n    // slow breathing, no flicker\n    float beat = 0.65 + 0.35 * sin(t * (0.5 + 0.7 * hash(vec2(fi, 3.7))) + phase);\n    float sp = v * (0.6 + 1.2 * level) + 1.1 * pulse * v;\n    sp = min(sp, 1.8);\n    float bri = beat * (0.55 + 0.95 * sp);\n    float d = length(vec2(drad, dalong * 0.62));\n    float spot = glow(d, 1.25) * 0.95 + line(d, 0.55) * 0.55;\n    vec3 c = iris(u_i + t * 0.04 + 0.03 * hash(vec2(fi, 2.7))) * spot * bri;\n    float side = sin(TAU * u_i + 0.5);\n    if (side > 0.0) front += c; else behind += c;\n  }\n\n  // fine haze that sways along\n  float n = fbm(vec2(u * 5.0, R.x * 0.05 - t * 0.2));\n  float haze = n * glow(R.x - 3.0, 9.0) * (0.06 + 0.35 * round(u) + 0.30 * level);\n  vec3 hazeC = iris(u + 0.2 + t * 0.02) * haze;\n  if (R.z > 0.0) front += hazeC; else behind += hazeC;\n}\n", "look": {"glow": 1.45, "lighting": 1.05, "grain": 0.42, "chroma": 0.32, "hueShift": 0.15, "saturation": 1.15, "sphere": "glass"}}, "glass-lava": {"name": "Glass lava", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float s = round(q.y);\n  float n = fbm(vec2(q.y * 5.0 - t * 0.15, q.x * 0.04));\n\n  vec3 acc = vec3(0.0);\n\n  // three coil lava streams on their own lanes\n  for (int i = 0; i < 3; i++) {\n    float fi = float(i);\n    float R = R0 + 10.0 + fi * 15.0 + 22.0 * s;\n    float wob = 4.5 * fbm(vec2(q.y * 4.0 + fi * 7.3, t * 0.12));\n    float d = q.x - (R + wob);\n    float wd = 1.0 + 0.5 * fi + 2.6 * s;\n    float core = line(d, wd * 0.55);\n    float gl = glow(d, wd * 2.3);\n    float m = core * 1.15 + gl * (0.22 + 0.85 * s);\n    vec3 c = iris(q.y * 0.6 + fi * 0.22 + t * 0.04);\n    // hot core cools out towards the edges: magenta-white at the heart\n    vec3 hot = mix(c, vec3(1.0, 0.72, 0.95), 0.45 * core);\n    acc += hot * m;\n  }\n\n  // molten drops that turn slowly and drip after her voice\n  vec3 dcol = vec3(0.0);\n  for (int i = 0; i < 9; i++) {\n    float fi = float(i);\n    float a0 = fi / 9.0;\n    float ph = hash(vec2(fi, 3.0));\n    float R = R0 + 6.0 + 24.0 * fract(a0 * 4.3 + ph);\n    float ang = a0 * TAU + t * (0.12 + 0.08 * ph);\n    vec2 pos = vec2(cos(ang), sin(ang)) * R;\n    float dist = length(p - pos);\n    float r = 1.3 + 2.4 * spec(a0, 0.35) + 1.4 * pulse * spec(a0, 0.7);\n    float core = line(dist, r * 0.5);\n    float gl = glow(dist, r * 1.9);\n    vec3 c = iris(a0 + 0.35 + t * 0.02);\n    dcol += mix(c, vec3(1.0, 0.8, 1.0), 0.5 * core) * (core * 0.9 + gl * (0.3 + 0.5 * s));\n  }\n  acc += dcol;\n\n  // passing above the sphere goes behind, passing below comes to the front\n  float back = smoothstep(-32.0, 32.0, p.y);\n  behind += acc * back;\n  front += acc * (1.0 - back) * 0.9;\n\n  // weak heat glow just outside the sphere, breathes with the volume\n  behind += iris(0.55) * glow(q.x - BAL, 4.0) * (0.12 + 0.35 * level) * (0.5 + 0.5 * n);\n}", "look": {"glow": 1.25, "lighting": 1.1, "grain": 0.35, "chroma": 0.35, "hueShift": 0.1, "saturation": 1.2, "sphere": "glass"}}, "holographic-grid": {"name": "Holographic grid", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float r = q.x;\n  float u = q.y;\n\n  float s = round(u);\n  float sOld = spec(u, 0.35);\n\n  // only around the ring, and far away nothing at all\n  float mask = smoothstep(BAL - 6.0, R0 + 2.0, r) * (1.0 - smoothstep(92.0, 116.0, r));\n\n  // two virtual wave sources turn slowly around the sphere\n  float a1 = t * 0.10;\n  float a2 = -t * 0.13 + 2.2 + 0.4 * sin(t * 0.21);\n  vec2 A = 58.0 * vec2(cos(a1), sin(a1));\n  vec2 B = 58.0 * vec2(cos(a2), sin(a2));\n\n  float k = 0.38 + 0.12 * level + 0.15 * tone;\n\n  float dA = length(p - A);\n  float dB = length(p - B);\n  float fr = (dA - dB) * k;\n\n  // interference: thin hyperbola fringes\n  float I = 0.5 + 0.5 * cos(fr + 2.5 * s + 1.4 * pulse);\n  // slow echo of the pattern from a moment ago\n  float Ie = 0.5 + 0.5 * cos(fr * 1.09 - 1.1);\n  // second, finer wave gives the moire-like hologram\n  float J = 0.5 + 0.5 * cos((dA + dB) * 0.21 - t * 0.25);\n\n  float core = pow(I, 9.0);\n  float haze = pow(I, 2.2) * 0.18;\n  float echo = pow(Ie, 11.0) * sOld * 0.55;\n  float moire = pow(J, 6.0) * 0.22 * (0.5 + 0.9 * s);\n\n  float light = core + haze + echo + moire;\n  // holographic grain on the plate\n  light *= 0.72 + 0.55 * noise(p * 0.9 + vec2(t * 0.13, -t * 0.09));\n\n  vec3 col = iris(u + t * 0.02 + 0.07 * cos(fr));\n\n  float strength = mask * (0.30 + 1.2 * s + 0.4 * pulse) * (0.80 + 0.40 * level);\n  vec3 L = col * light * strength;\n\n  // inside the sphere we project the hologram onto the glass, around it, it falls behind\n  float onSphere = 1.0 - smoothstep(BAL - 5.0, BAL + 4.0, r);\n  behind += L * (1.0 - onSphere);\n  front += L * onSphere * 0.9;\n\n  // weak glow where the light touches the sphere\n  behind += iris(u + 0.1) * glow(r - (R0 + 4.0), 9.0) * 0.06 * (0.4 + s);\n}", "look": {"glow": 1.1, "lighting": 1, "grain": 0.5, "chroma": 0.35, "hueShift": 0.2, "saturation": 1.1, "sphere": "glass"}}, "three-ink-lanes": {"name": "Three ink lanes", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float s = round(q.y);\n  float b = band(tone);\n  \n  vec3 c_hoek = vec3(cos(q.y * TAU), sin(q.y * TAU), 0.0);\n  \n  vec3 ink = vec3(0.0);\n  float core = 0.0;\n  \n  for (int i = 0; i < 3; i++) {\n    float fi = float(i);\n    float start = fi * 0.3333 + t * 0.016 * (1.0 + fi * 0.4);\n    float w = 0.24 + 0.09 * sin(t * 0.19 + fi * 1.9);\n    float aa = fract(q.y - start);\n    float u = aa / w;\n    float present = smoothstep(0.0, 0.12, u) * smoothstep(1.15, 0.75, u);\n    \n    float bump = fbm(c_hoek * 2.0 + vec3(0.0, 0.0, u * 3.0 + fi * 13.0 + t * 0.08));\n    float r = R0 + 3.0 + u * (30.0 + 20.0 * s + 8.0 * b) + (bump - 0.5) * 14.0;\n    float thickness = (1.5 + 4.5 * s + 1.5 * b) * (0.4 + 0.9 * sin(min(u, 1.0) * PI));\n    float fil = fbm(c_hoek * 8.0 + vec3(0.0, 0.0, u * 10.0 + fi * 7.0 - t * 0.35));\n    float d = abs(q.x - r) + (fil - 0.5) * 2.0;\n    \n    float soft = glow(d, thickness * (0.7 + 0.7 * fil));\n    float hard = line(d, 0.7 + 1.6 * s) * (0.3 + 0.6 * fil);\n    \n    vec3 color = iris(q.y * 0.55 + u * 0.35 + t * 0.03 + fi * 0.15);\n    ink += color * soft * present * (0.15 + 0.9 * s);\n    core += hard * present * (0.3 + 1.2 * s);\n  }\n  \n  behind += ink;\n  behind += iris(q.y + t * 0.04) * core * 0.7;\n  behind += iris(0.55) * glow(q.x - BAL - 3.0, 4.0) * 0.1 * (0.2 + level);\n}", "look": {"glow": 1.15, "lighting": 1, "grain": 0.35, "chroma": 0.3, "hueShift": 0.1, "saturation": 1.1, "sphere": "glass"}}, "grain-vortex": {"name": "Grain vortex", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float s = round(q.y);\n  float sB = band(tone);\n  float tilt = 1.12 + 0.06 * sin(t * 0.18);\n  float spin = t * 0.04;\n\n  // thick grain disc around the sphere\n  float Rm = R0 + 11.0 + 7.0 * s + 5.0 * pulse;\n  vec3 r1 = tiltedRing(p, Rm, tilt, spin);\n  float thickness = 13.0 + 7.0 * s;\n  float mask = smoothstep(thickness, thickness - 7.0, abs(r1.x));\n  float korA = fbm(vec2(r1.y * 64.0, r1.x * 0.7 - t * 0.25));\n  float korB = noise(vec3(r1.y * 180.0, r1.x * 1.3, t * 0.22));\n  float grains = smoothstep(0.50, 0.88, korA) * smoothstep(0.55, 0.92, korB);\n  float bright1 = mask * (0.05 + 0.30 * korA) + grains * mask * (0.7 + 1.6 * s + 1.4 * sB);\n  vec3 c1 = iris(r1.y + t * 0.015) * bright1;\n  if (r1.z > 0.0) front += c1; else behind += c1;\n\n  // bright grainy bottom edge, close to the sphere\n  float Rr = R0 + 2.5 + 3.5 * s + 2.0 * pulse;\n  vec3 r2 = tiltedRing(p, Rr, tilt, spin);\n  float korC = noise(vec3(r2.y * 240.0, r2.x * 1.0, t * 0.2));\n  float edgeMask = line(r2.x, 1.3) * (0.35 + 0.65 * korC);\n  vec3 c2 = iris(r2.y + t * 0.02 + 0.1) * edgeMask * (0.9 + 2.2 * s);\n  if (r2.z > 0.0) front += c2; else behind += c2;\n\n  // soft grain haze just outside the disc\n  behind += iris(q.y + 0.2) * glow(abs(r1.x) - thickness, 7.0) * 0.05 * (0.3 + s);\n}", "look": {"glow": 1.1, "lighting": 1, "grain": 0.5, "chroma": 0.15, "hueShift": 0, "saturation": 1, "sphere": "glass"}}, "firefly-spiral": {"name": "Firefly spiral", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  // soft shell around the sphere: the nest breathes with her voice\n  vec2 e = vec2(p.x, p.y / 0.42);\n  float shell = glow(length(e) - 60.0, 14.0);\n  behind += iris(0.5 + t * 0.02) * shell * (0.04 + 0.16 * level);\n\n  for (int k = 0; k < 3; k++) {\n    for (int i = 0; i < 7; i++) {\n      float fi = float(i);\n      float fk = float(k);\n      float a = t * 0.22 + fk * TAU / 3.0 + fi * 0.62;\n      float R = 56.0 + 3.4 * fi;\n      vec2 pos = vec2(R * cos(a), R * 0.42 * sin(a));\n      pos.y += 15.0 * sin(a * 1.3 + t * 0.5 + fk * 2.1);\n      pos = rot(0.07 * sin(t * 0.13)) * pos;\n\n      float d = length(p - pos);\n      float u = fract(a / TAU);\n      float v = round(u);\n      float old = spec(u, 0.25);\n      float breath = 0.5 + 0.5 * sin(t * (1.1 + 0.35 * fk) + fi * 2.3 + fk * 1.4);\n      float strong = (0.30 + 0.75 * breath) * (1.0 + 1.6 * v) + 0.8 * old + 1.2 * pulse * v + 0.5 * level;\n      float s1 = min(strong, 3.0);\n\n      vec3 color = iris(u + 0.08 * fk + 0.02 * fi + t * 0.02);\n      vec3 light = color * (line(d, 1.2) * (0.7 + 0.8 * s1) + glow(d, 5.5) * (0.05 + 0.11 * strong));\n\n      if (-sin(a) > 0.0 || length(pos) > BAL) front += light;\n      else behind += light;\n    }\n  }\n}", "look": {"glow": 1.1, "lighting": 1, "grain": 0.3, "chroma": 0.35, "hueShift": 0.1, "saturation": 1.1, "sphere": "glass"}}, "afterglow": {"name": "Afterglow", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec3 cool = vec3(0.30, 0.68, 1.0);\n  vec3 accent = vec3(0.82, 0.32, 0.95);\n  float breath = 0.88 + 0.12 * sin(t * 0.42);\n  for (int i = 0; i < 8; i++) {\n    float fi = float(i);\n    float half = mod(fi, 4.0);\n    float side = fi < 4.0 ? 0.0 : PI;\n    float u0 = (half + 0.5) / 4.0;\n    float a = u0 * TAU + side + t * 0.02 + 0.10 * sin(half * 2.3 + t * 0.13);\n    float rr = R0 + 6.0 + 16.0 * (0.5 + 0.5 * sin(half * 1.7 + t * 0.08 + 1.3));\n    float st = round(u0);\n    float thickness = 1.1 + 1.3 * st + 1.4 * pulse;\n    float halfL = 8.0 + 6.0 * st + 2.0 * sin(half * 5.3 + t * 0.13);\n    vec2 m = rr * vec2(cos(a), sin(a));\n    float th = 0.6 * sin(half * 3.1 + t * 0.10);\n    vec2 dir = rot(th) * vec2(-sin(a), cos(a));\n    vec2 perp = vec2(-dir.y, dir.x);\n    vec2 rel = p - m;\n    float s = dot(rel, dir);\n    float n = dot(rel, perp);\n    float fade = smoothstep(halfL, halfL * 0.42, abs(s));\n    float core = line(n, thickness * 0.42) * (1.7 + 1.3 * pulse);\n    float halo = glow(n, thickness * 1.7) * (0.75 + 0.85 * st);\n    float v = (core + halo) * fade * (0.95 + 0.9 * st) * breath;\n    float ak = fract(sin(half * 12.9898 + 4.1) * 43758.5453);\n    vec3 c = mix(cool, accent, step(0.82, ak) * 0.9);\n    behind += c * v;\n  }\n}", "look": {"size": 1, "glow": 1, "lighting": 1.1, "grain": 0.25, "chroma": 0.3, "hueShift": 0.05, "saturation": 1.1, "sphere": "glass", "spin": 0.633977727820335}}, "deep-stroke": {"name": "Deep stroke", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float u = q.y;\n  float voice = round(u);\n  float alive = 0.5 * level + 0.5 * voice;\n\n  // slow shape noise around the circle: 2 lobes, small amplitude\n  float n = noiseRound(q, 2.0, 0.09);\n  // slow lane motion: 1 lobe, slow\n  float lane = sin(u * TAU - t * 0.45);\n\n  float R = R0 + 4.2 + 2.0 * (n - 0.5) * 2.0 + 1.3 * lane + 2.0 * alive;\n\n  // two symmetric light arcs, left and right, balanced around the sphere\n  float gateL = smoothstep(0.06, 0.22, u) * smoothstep(0.44, 0.28, u);\n  float gateR = smoothstep(0.56, 0.72, u) * smoothstep(0.94, 0.78, u);\n  float gate = gateL + gateR;\n\n  // thickness lives along the stroke, symmetric in u\n  float profile = 0.45 + 0.55 * sin(u * TAU * 2.0 + t * 0.5 + 1.3);\n  float thickness = (1.3 + 2.0 * profile) * (0.85 + 0.7 * alive);\n\n  float d = q.x - R;\n  float core = line(d, max(thickness * 0.34, 0.6));\n  float halo = glow(d, thickness * 1.25);\n\n  // fine secondary layer: thin glowing trace that follows the voice with a delay\n  float echo = spec(u, 0.28);\n  float d2 = q.x - (R - 4.5 - 2.0 * echo);\n  float fil = line(d2, 0.7 + 0.7 * echo) * (0.10 + 0.45 * echo);\n\n  vec3 base = mix(iris(0.58), iris(u + t * 0.02), 0.45);\n  vec3 warm  = iris(u + 0.33 + t * 0.03);\n\n  float bright = 0.95 + 0.85 * alive + 0.65 * pulse;\n\n  vec3 light = base * halo * 0.15 + mix(base, warm, 0.30) * core * 1.25;\n  light *= gate * bright;\n  behind += light;\n  behind += mix(base, warm, 0.5) * fil * gate * (0.06 + 0.30 * alive);\n}", "look": {"size": 1.05, "glow": 1.1, "lighting": 1, "grain": 0.28, "chroma": 0.25, "hueShift": 0.55, "saturation": 1.05, "sphere": "glass", "spin": 0.20702803823268778}}, "comet-orbit": {"name": "Comet orbit", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float u = q.y;\n  float th = u * TAU;\n  float s = round(u);\n  float n = noiseRound(q, 2.0, 0.22);\n\n  // elliptical lane: focus in the middle, head at the bottom right\n  float ch = cos(TAU * (u - 0.13));\n  float R = 62.0 / (1.0 + 0.16 * ch);\n  R += 5.0 * (n - 0.5) + 2.5 * s;\n\n  // head = hot knot, tail fades out slowly\n  float prof = exp(-3.0 * (1.0 - ch));\n  prof *= 1.0 + 0.25 * sin(th - 0.7);\n  float amp = 0.55 + 0.70 * prof + 0.90 * pulse * prof;\n  float thickness = 1.0 + 2.6 * prof + 2.8 * s;\n\n  vec3 cold = iris(0.03 + 0.10 * sin(th));\n  vec3 warm = iris(0.56);\n  vec3 color = mix(cold, warm, clamp(prof * 0.75, 0.0, 1.0));\n\n  float d = q.x - R;\n  vec3 light = color * (line(d, thickness * 0.42) * amp * 1.35\n                     + glow(d, thickness * 0.55) * amp * 0.30);\n\n  // fine dust tail, slightly outside the lane: only a thin line, no haze\n  float ch2 = cos(TAU * (u - 0.20));\n  float R2 = R + 5.0 + 2.0 * sin(th * 2.0 + 0.8);\n  float amp2 = 0.10 + 0.28 * exp(-3.6 * (1.0 - ch2)) + 0.30 * s;\n  float d2 = q.x - R2;\n  light += iris(0.12 + 0.05 * sin(th)) * (line(d2, 0.8) * amp2 * 1.0\n                                        + glow(d2, 1.4) * amp2 * 0.18);\n\n  float depth = sin(th - 0.4);\n  float frontM = smoothstep(-0.15, 0.15, depth);\n  behind += light * (1.0 - frontM);\n  front += light * frontM;\n}", "look": {"size": 1.05, "glow": 0.9, "lighting": 0.95, "grain": 0.25, "chroma": 0.35, "hueShift": 0.1, "saturation": 1, "sphere": "glass", "spin": 0.022747636759080758}}, "caustic-orbit": {"name": "Caustic orbit", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float u = q.y;\n\n  // voice around the circle + slow trace of the voice\n  float s  = round(u);\n  float sp = spec(u, 0.22);\n\n  // slow caustic coil: the lane sinks and rises\n  float n1 = noiseRound(q, 2.0, 0.10);\n  float n2 = noiseRound(q, 3.0, 0.16);\n  float R  = R0 + 10.0 + 7.0 * (n1 - 0.5) + 3.0 * sin(u * TAU + t * 0.21);\n  float thick = 0.5 + 0.5 * cos((u - 0.22) * TAU);   // one thick spot, in balance\n\n  float d = q.x - R;\n\n  // main shape: hot thin core in a narrow cool halo\n  float wk   = 1.1 + 1.6 * s + 0.9 * thick;\n  float core = line(d, wk * 0.55) * 1.6;\n  float halo = glow(d, 1.6 + 2.6 * s + 1.8 * thick);\n\n  // fast glint only on the pulse\n  float glint = 1.0 + 1.1 * pulse * (0.5 + 0.5 * sin(u * TAU * 7.0 + t * 3.0));\n  float breath = 1.0 + 0.10 * sin(t * 0.6);\n\n  float lk = (0.55 + 1.30 * s + 0.40 * sp) * glint * breath;\n  float lh = 0.10 + 0.42 * s + 0.14 * sp;\n\n  vec3 color = iris(u + t * 0.02);\n  color = mix(color, iris(0.70), 0.18 * thick * (0.5 + 0.5 * s));\n\n  // second, fine layer: thin caustic wire beside the lane\n  float R2  = R + 6.0 + 3.5 * (n2 - 0.5) * 2.0;\n  float d2  = q.x - R2;\n  float fine = line(d2, 0.55) * (0.14 + 0.55 * s) + glow(d2, 1.4) * (0.03 + 0.10 * s);\n\n  // dark field around the sphere, soft fade-out outwards\n  float inner = smoothstep(49.0, 57.0, q.x);\n  float outside = 1.0 - smoothstep(72.0, 86.0, q.x);\n  float fade = inner * outside;\n\n  vec3 light = color * (core * lk + halo * lh) + iris(u + 0.35) * fine;\n\n  behind += light * fade;\n}", "look": {"size": 1.05, "glow": 1, "lighting": 1.05, "grain": 0.25, "chroma": 0.32, "hueShift": 0.12, "saturation": 1.05, "sphere": "glass", "spin": 0.983558703813058}}, "drop-wave": {"name": "Drop wave", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float s  = round(q.y);\n  float sd = spec(q.y, 0.55);\n  float n  = noiseRound(q, 2.0, 0.20);\n\n  // drop shape: wide at the bottom, pointed tip at the top\n  float R = 58.0 + 7.0 * cos(TAU * q.y) + 3.0 * n + 1.5 * sin(t * 0.21 + TAU * q.y);\n\n  // thickness: thin at the bottom, thick towards the tip, centre of mass in the middle\n  float thick = 0.8 + 3.4 * s + 1.8 * (0.5 - 0.5 * cos(TAU * q.y));\n\n  float d = q.x - R;\n  float core = line(d, thick * 0.26 + 0.25);\n  float halo = glow(d, thick * 0.85 + 1.1);\n\n  vec3 col = iris(q.y + t * 0.025);\n  behind += col * (core * (1.4 + 2.2 * pulse) + halo * (0.08 + 0.55 * s));\n\n  // echo ripple just outside the drop, carried by the voice from a moment ago\n  float Re = R + 7.5 + 2.5 * (1.0 - sd);\n  float de = q.x - Re;\n  float rib = line(de, 0.55) * 0.55 + glow(de, 1.9) * 0.07;\n  behind += iris(q.y + 0.5 + t * 0.02) * rib * (0.05 + 0.85 * sd);\n}\n", "look": {"size": 0.95, "glow": 0.9, "lighting": 1, "grain": 0.25, "chroma": 0.18, "hueShift": 0.08, "saturation": 1.1, "sphere": "glass", "spin": 0.12928688438220648}}, "caustic-streaks": {"name": "Caustic streaks", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float N = 27.0;\n  float cell = q.y * N;\n  float id = floor(cell);\n  float f = fract(cell) - 0.5;\n  float h1 = hash(vec2(id, 3.1));\n  float h2 = hash(vec2(id, 9.7));\n  float h3 = hash(vec2(id, 17.3));\n\n  float s = round(q.y);\n  float breath = 1.0 + 0.04 * sin(t * 0.37);\n\n  float Rk = 62.0 * breath\n           + 3.0 * sin(q.y * TAU * 3.0 + t * 0.22)\n           + 2.0 * sin(q.y * TAU * 1.0 - t * 0.14)\n           + 2.5 * (noiseRound(q, 1.6, 0.10) - 0.5)\n           + (h1 - 0.5) * 2.0\n           + 2.5 * level;\n\n  float len = (0.15 + 0.12 * h2) * (1.0 + 0.28 * s + 0.25 * level);\n  float thickness = (1.5 + 2.0 * h3) * (1.0 + 1.1 * s) + 2.0 * level;\n  float u = abs(f) / max(len, 0.001);\n  float taper = smoothstep(1.0, 0.40, u);\n\n  float d = q.x - Rk;\n  float w = thickness * (0.35 + 0.65 * taper);\n  float core = line(d, max(0.40, w * 0.32)) * taper;\n  float halo = glow(d, w * 0.8 + 3.0) * taper;\n\n  vec3 col = iris(q.y + t * 0.025);\n  vec3 acc = iris(q.y + 0.42 + t * 0.025);\n\n  float bright = (0.62 + 0.45 * h2) * (0.80 + 0.45 * s + 1.5 * pulse);\n  vec3 light = mix(col, acc, 0.22 * h3) * core * bright;\n  light += col * halo * (0.28 + 0.42 * s);\n\n  float Rt = 62.0 + 4.0 * sin(q.y * TAU * 2.0 - t * 0.17 + 0.9)\n                  + 2.5 * sin(q.y * TAU * 5.0 + t * 0.11);\n  float thin = line(q.x - Rt, 0.45) * (0.38 + 0.28 * s);\n  thin *= 0.50 + 0.50 * (0.5 + 0.5 * sin(q.y * TAU * 3.0 + t * 0.40));\n  light += iris(q.y + 0.10 + t * 0.02) * thin * 0.65;\n\n  behind += light;\n}", "look": {"size": 1, "glow": 1.1, "lighting": 1, "grain": 0.25, "chroma": 0.35, "hueShift": 0, "saturation": 1, "sphere": "glass", "spin": 0.5723129061024201}}, "long-teardrop-orbit": {"name": "Long teardrop orbit", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float u = q.y;\n\n  // drop-shaped lane: one lobe, slightly asymmetric, slowly swaying\n  float rui = noiseRound(q, 2.2, 0.22);\n  float R = 64.0\n          + 8.0 * cos(TAU * u + 1.1)\n          + 2.5 * cos(TAU * 2.0 * u - 0.4)\n          + 2.0 * rui\n          + 1.2 * sin(TAU * u - t * 0.35);\n\n  float s = round(u);\n  float v = spec(u, 0.30);\n\n  // long exposure: hot head with a long fading tail\n  float head = fract(t * 0.045);\n  float d = fract(head - u);\n  float tail = exp(-d * 3.4);\n  float spot = exp(-d * 30.0);\n\n  float glowL = 0.40 + 0.85 * tail;\n  float thickness = (1.0 + 1.8 * s + 1.2 * pulse) * (0.8 + 0.5 * d);\n\n  float dist = q.x - R;\n  float core = line(dist, thickness);\n  float halo = glow(dist, 1.05 + 0.45 * thickness);\n\n  // much darker: small halo, only a thin hot core\n  float light = core * (0.6 + 1.4 * glowL + 2.2 * spot)\n              + halo * (0.05 + 0.16 * glowL + 0.22 * spot);\n\n  vec3 base  = iris(u + t * 0.02);\n  vec3 accent = iris(u + 0.68 + t * 0.02);\n  vec3 c = mix(base, accent, 0.14 + 0.22 * spot);\n\n  // fine second exposure: razor-thin afterglowing hair, only with voice\n  float R2 = R + 6.0 + 2.2 * sin(TAU * u + 0.8);\n  float hair = line(q.x - R2, 0.45) * (0.05 + 0.65 * v + 0.30 * s);\n  vec3 c2 = iris(u + 0.35 + t * 0.02);\n\n  vec3 L = c * light + c2 * hair;\n  L *= smoothstep(47.0, 50.5, q.x);\n  front += L;\n}", "look": {"size": 1, "glow": 1.2, "lighting": 1.1, "grain": 0.25, "chroma": 0.35, "hueShift": 0.1, "saturation": 1.05, "sphere": "glass", "spin": 0.30253632001151476}}, "angular-discharge": {"name": "Angular discharge", "glsl": "float segDist(vec2 p, vec2 a, vec2 b) {\n  vec2 ab = b - a;\n  float h = clamp(dot(p - a, ab) / max(dot(ab, ab), 1e-3), 0.0, 1.0);\n  return length(p - a - ab * h);\n}\n\nvoid ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float s = round(q.y);\n\n  vec3 ice = mix(iris(0.55), vec3(0.34, 0.76, 1.10), 0.6);\n  vec3 violet = mix(iris(0.90), vec3(0.85, 0.40, 1.25), 0.5);\n\n  float breath = 0.5 + 0.5 * sin(t * 0.85);\n  float spin = 0.35 + t * 0.02 + 0.06 * sin(t * 0.21);\n\n  float d1 = 1e3;\n  float d2 = 1e3;\n  for (int i = 0; i < 6; i++) {\n    float f0 = float(i) / 6.0;\n    float f1 = (float(i) + 1.0) / 6.0;\n    float a0 = mod(float(i), 2.0);\n    float a1 = 1.0 - a0;\n    float wob = 2.5 * sin(f0 * TAU * 2.0 + t * 0.35) * (0.5 + 0.5 * breath);\n    float wob1 = 2.5 * sin(f1 * TAU * 2.0 + t * 0.35) * (0.5 + 0.5 * breath);\n    float r0 = 63.0 + 5.0 * a0 + wob  + 7.0 * round(f0);\n    float r1 = 63.0 + 5.0 * a1 + wob1 + 7.0 * round(f1);\n    vec2 v0 = vec2(cos(f0 * TAU + spin), sin(f0 * TAU + spin)) * r0;\n    vec2 v1 = vec2(cos(f1 * TAU + spin), sin(f1 * TAU + spin)) * r1;\n    d1 = min(d1, segDist(p, v0, v1));\n    d2 = min(d2, segDist(p, v0 - normalize(v0) * 3.5, v1 - normalize(v1) * 3.5));\n  }\n\n  float n = noiseRound(q, 3.0, 0.05);\n  float on = mix(0.55, 1.0, n);\n  float taper = 0.70 + 0.35 * sin(q.y * TAU * 2.0 + 1.3);\n\n  float wide = (1.3 + 1.5 * s) * (1.0 + 0.8 * pulse);\n  float core = line(d1, wide * 0.6) * on * taper;\n  float halo = glow(d1, wide * 1.2 + 2.5) * on * taper;\n\n  float rest = 0.55 + 0.45 * breath;\n  float lev = rest * (0.62 + 0.55 * s + 0.35 * pulse);\n\n  behind += ice * halo * 0.55 * lev;\n  behind += mix(ice, violet, 0.18 + 0.5 * s) * core * (1.35 + 1.4 * s + 0.6 * pulse);\n\n  float n2 = noiseRound(q, 5.0, 0.07);\n  float on2 = mix(0.5, 1.0, n2) * (0.55 + 0.6 * s);\n  behind += violet * (line(d2, 0.5) * 0.95 + glow(d2, 2.2) * 0.18) * on2;\n}", "look": {"size": 1.05, "glow": 1.1, "lighting": 1.05, "grain": 0.25, "chroma": 0.35, "hueShift": 0.1, "saturation": 1.05, "sphere": "glass", "spin": 0.6257875365232357}}, "particle-spiral": {"name": "Particle spiral", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(rot(t * 0.08) * p);\n  float u = q.y;\n  float s = round(u);\n  float n = noiseRound(q, 3.0, 0.30);\n  float n2 = noiseRound(q, 5.0, 0.20);\n\n  float A = 20.0 + 6.0 * s;\n  float ri = R0 + A * u + (n - 0.5) * 5.0;\n  float env = smoothstep(0.0, 0.20, u) * smoothstep(1.0, 0.78, u);\n  float flood = 0.52 + 0.48 * sin(TAU * (u * 6.0 - t * 0.20));\n\n  float d = abs(q.x - ri);\n  float thickness = 1.6 + 5.0 * s + 2.5 * level;\n  float core = line(d, thickness * 0.30) * 1.15;\n  float halo = glow(d, thickness * 1.30) * (0.35 + 0.55 * s);\n  float bright = min(env * flood * (0.55 + 0.70 * s + 0.35 * level) * (1.0 + 0.45 * pulse), 1.7);\n  behind += iris(u + 0.08 + t * 0.012) * (core + halo) * bright * 0.8;\n\n  float ri2 = 51.0 + A * 0.70 * u + (n2 - 0.5) * 4.0;\n  float env2 = smoothstep(0.05, 0.28, u) * smoothstep(1.0, 0.82, u);\n  float d2 = abs(q.x - ri2);\n  float thickness2 = 0.7 + 1.6 * s;\n  behind += iris(u + 0.55 + t * 0.010) * (line(d2, thickness2) * 0.9 + glow(d2, thickness2 * 1.8) * 0.35) * env2 * flood * (0.40 + 0.90 * s);\n}", "look": {"size": 1, "glow": 1.1, "lighting": 1, "grain": 0.25, "chroma": 0.25, "hueShift": 0, "saturation": 1.1, "sphere": "glass", "spin": 0.739246411720217}}, "mercury-strands": {"name": "Mercury strands", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float w = q.y * TAU;\n  float s = round(q.y);\n  float nz = noiseRound(q, 2.0, 0.11) - 0.5;\n  float breath = 0.5 + 0.5 * sin(t * 0.23);\n\n  vec3 cool = iris(0.0);\n  vec3 accent = iris(0.62);\n\n  vec3 light = vec3(0.0);\n\n  for (int i = 0; i < 4; i++) {\n    float fi = float(i);\n    float phase = fi * 1.7;\n\n    // broken strands: every turn has dark holes -> lots of emptiness\n    float seg = pow(0.5 + 0.5 * cos(w * 2.0 + phase + t * 0.09), 3.2);\n    float bump = pow(0.5 + 0.5 * cos((q.y - t * 0.05 - fi * 0.11) * TAU), 8.0);\n    float hot = 0.30 * bump + 1.6 * pulse * bump;\n\n    float R = 58.0 + fi * 5.0\n            + 2.5 * cos(w + phase + t * 0.13)\n            + 1.2 * sin(w * 3.0 - phase + t * 0.21)\n            + 1.5 * nz\n            + 1.4 * s;\n\n    float thickness = 0.55 + 0.9 * (0.5 + 0.5 * sin(w * 2.0 + phase + t * 0.42));\n    thickness *= 1.0 + 1.0 * s + 0.5 * hot;\n\n    float d = q.x - R;\n    float core = line(d, thickness * 0.6);\n    float halo = glow(d, thickness * 1.25);\n\n    vec3 c = mix(cool, accent, 0.10 + 0.16 * (0.5 + 0.5 * sin(w + phase + t * 0.25)));\n\n    float bright = (0.30 + 0.95 * s) * (0.85 + 0.25 * breath) * (1.0 + 1.4 * hot);\n\n    light += (c * 0.26 * halo + (c * 1.55 + 0.08 * accent) * core) * bright * seg;\n  }\n\n  behind += light;\n\n  float sf = spec(q.y, 0.3);\n  float Rf = 76.0 + 2.0 * cos(w * 2.0 + t * 0.11) + 3.0 * sf;\n  float df = q.x - Rf;\n  vec3 cf = mix(accent, iris(0.82), 0.4);\n  float segf = pow(0.5 + 0.5 * cos(w * 3.0 + 1.3 + t * 0.07), 3.5);\n  behind += cf * (glow(df, 1.1) * 0.09 + line(df, 0.5) * 0.70) * (0.22 + 0.75 * sf + 0.35 * level) * segf;\n}", "look": {"size": 1, "glow": 0.9, "lighting": 1.15, "grain": 0.22, "chroma": 0.4, "hueShift": 0.06, "saturation": 1.05, "sphere": "glass", "spin": 0.2003670215910267}}, "open-shock-arc": {"name": "Open shock arc", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n\n  float s   = round(q.y);\n  float lay = spec(q.y, 0.40);\n  float lvl = level;\n\n  // full ring, paired in opposition so the centre of mass stays in the middle\n  float lobe = 0.62 + 0.38 * cos(q.y * TAU * 2.0 + 0.30 * sin(t * 0.23));\n\n  // slow, flowing shape noise\n  float ripple = 2.2 * (noiseRound(q, 1.5, 0.10) - 0.5)\n               + 1.3 * (noiseRound(q, 3.0, 0.06) - 0.5);\n\n  // shock front\n  float Rs = R0 + 6.0 + 11.0 * lvl + 3.0 * s + 2.6 * pulse + ripple\n           + 1.1 * sin(t * 0.42);\n  float d    = q.x - Rs;\n  float thick  = 0.95 + 0.95 * s;\n  float core = line(d, thick);\n  float halo = glow(d, 5.0 + 4.5 * s);\n\n  vec3 tint = iris(q.y + t * 0.02 + 0.52);\n  vec3 acc  = iris(q.y + t * 0.02 + 0.90);\n  vec3 hot = mix(tint, vec3(0.78, 0.92, 1.0), 0.5);\n\n  // rest: clearly visible, breathes along slowly\n  float breath = 0.86 + 0.14 * sin(t * 0.33 + q.y * TAU);\n  float strong = (0.90 + 0.70 * s) * (1.0 + 0.70 * pulse) * lobe * breath;\n\n  vec3 light = tint * (core * 1.15 + halo * 0.42) * strong;\n  light += hot * line(d, thick * 0.45) * strong * 0.72;\n  light += acc * glow(d - 3.0, 1.8) * (0.16 + 0.34 * s) * lobe;\n  behind += light;\n\n  // pressure wave: cool trace that follows the voice with a delay\n  float Rw = Rs - 5.0 - 2.5 * (noiseRound(q, 2.0, 0.08) - 0.5);\n  float dw = q.x - Rw;\n  float wk = (0.40 + 0.90 * lay + 0.55 * pulse) * lobe;\n  front += acc * (glow(dw, 3.6) * 0.26 + line(dw, 0.7) * 0.52) * wk;\n}\n", "look": {"size": 1, "glow": 1, "lighting": 1.1, "grain": 0.25, "chroma": 0.25, "hueShift": 0, "saturation": 1.05, "sphere": "glass", "spin": 0.4319468771336421}}, "glass-shards": {"name": "Glass shards", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float spin = t * 0.02;\n  float N = 26.0;\n\n  // main dash: short dashes with a taper at both ends\n  float u = fract(q.y * N + spin);\n  float cd = min(u, 1.0 - u) * 2.0;\n  float id = floor(q.y * N + spin);\n  float rid = hash(vec2(id, 2.3));\n  float rid2 = hash(vec2(id, 7.1));\n\n  float s = round(q.y);\n  float b = band(0.3);\n  float pu = pulse;\n\n  float n = noiseRound(q, 2.5, 0.10);\n  float R = R0 + 8.0 + 10.0 * n + 6.0 * b + 6.0 * s;\n\n  float thickness = (0.6 + 3.0 * rid) * (1.0 + 2.5 * s);\n  float off = (rid2 - 0.5) * 6.0;\n  float dr = q.x - R - off;\n\n  float profile = smoothstep(0.02, 0.40, cd) * (1.0 - smoothstep(0.60, 0.98, cd));\n  float bright = profile * (0.6 + 1.4 * s + 0.5 * pu);\n\n  float core = line(dr, max(0.5, thickness * 0.24));\n  float halo = glow(dr, thickness * 0.9);\n\n  vec3 tint = iris(q.y + t * 0.012);\n  vec3 hot = vec3(0.72, 0.95, 1.10);\n\n  vec3 light = tint * halo * 0.40 * bright\n             + (tint * 0.7 + hot) * core * 1.6 * bright;\n\n  behind += light;\n\n  // secondary: fine violet ghost dashes slightly inwards, shifted\n  float u2 = fract(q.y * N + spin + 0.5);\n  float cd2 = min(u2, 1.0 - u2) * 2.0;\n  float R2 = R - 5.0 - 3.0 * b;\n  float prof2 = smoothstep(0.10, 0.45, cd2) * (1.0 - smoothstep(0.55, 0.95, cd2));\n  float dr2 = q.x - R2;\n  vec3 tint2 = iris(q.y + 0.45 + t * 0.018);\n  tint2 = mix(tint2, vec3(0.80, 0.50, 1.20), 0.45);\n  behind += tint2 * glow(dr2, 1.4) * 0.20 * prof2 * (0.5 + 1.2 * s);\n}\n", "look": {"size": 1.15, "glow": 1, "lighting": 1, "grain": 0.35, "chroma": 0.5, "hueShift": 0.1, "saturation": 1.1, "sphere": "glass", "spin": 0.5823735722802824}}, "smoke-spiral": {"name": "Smoke spiral", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float u = fract(q.y + 0.5 + t * 0.012);\n  float s = round(u);\n  float n  = noiseRound(q, 2.0, 0.22);\n  float n2 = noiseRound(q, 3.0, 0.16);\n\n  float r = 55.0 + (19.0 + 3.0 * s) * u + 4.0 * (n - 0.5) + 1.5 * (n2 - 0.5);\n  float end = smoothstep(0.0, 0.25, u) * (1.0 - smoothstep(0.76, 1.0, u));\n  float d = q.x - r;\n\n  float thickness = 0.6 + 1.8 * (0.35 + 0.65 * sin(u * PI)) * (0.45 + 0.9 * n);\n  thickness *= 0.8 + 1.2 * s;\n\n  float core = line(d, thickness * 0.32);\n  float halo = glow(d, thickness * 1.3);\n  vec3 col = mix(iris(u + t * 0.02), iris(u + 0.5), 0.22);\n  float lev = 0.6 + 1.0 * s;\n\n  front += col * end * (core * 1.5 + halo * (0.25 + 0.5 * s)) * lev;\n\n  float su = max(s * 0.45, spec(u, 0.4));\n  float r2 = r + 4.5 + 3.0 * sin(u * TAU + t * 0.25) + 1.5 * (n2 - 0.5);\n  float d2 = q.x - r2;\n  float f2 = line(d2, 0.55) * 1.3 + glow(d2, 3.2) * 0.22;\n  vec3 violet = mix(iris(u + 0.55), iris(u + 0.75), 0.5);\n  front += violet * f2 * end * (0.10 + 0.85 * su);\n}", "look": {"size": 1.05, "glow": 1, "lighting": 1, "grain": 0.25, "chroma": 0.22, "hueShift": 0.12, "saturation": 1.05, "sphere": "glass", "spin": 0.5627975233950684}}, "angular-teardrop": {"name": "Angular teardrop", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float s = round(q.y);\n  float breath = 0.5 + 0.5 * sin(t * 0.42);\n\n  // angular drop: circle at the bottom, cone upwards, slowly swaying\n  float al = TAU * (q.y - 0.5);\n  al += 0.14 * sin(t * 0.13) + 0.05 * sin(t * 0.31);\n  float w = 1.45 + 0.20 * sin(t * 0.09 + 2.0);\n  float keg = max(0.0, 1.0 - abs(al) / w);\n  float shape = pow(keg, 0.8);\n\n  float size = R0 + 3.5 + 4.0 * s + 1.2 * breath;\n  float height = 6.0 + 8.0 * s + 1.0 * breath;\n  float r = size + height * shape;\n\n  float thickness = (1.1 + 3.2 * s) * (0.55 + 0.55 * breath);\n  float d = q.x - r;\n  float taper = 0.55 + 0.45 * sin(TAU * q.y * 2.0 + t * 0.33);\n  float core = line(d, thickness * 0.6) * (1.1 + 1.0 * s);\n  float halo = glow(d, thickness * 2.5 + 3.0) * (0.18 + 0.60 * s);\n  vec3 dim = mix(iris(0.52), iris(0.66), 0.5 + 0.5 * sin(TAU * q.y + t * 0.07));\n  float shine = 1.0 + 0.6 * pulse * (0.5 + 0.5 * sin(TAU * q.y * 3.0));\n  behind += dim * (core + halo) * taper * shine;\n\n  // fine innermost wire: echo of the voice, with a delay\n  float so = spec(q.y, 0.38);\n  float r2 = r - 3.5 - 2.5 * so;\n  float d2 = q.x - r2;\n  float fil = line(d2, 0.7 + 0.6 * so) * (0.25 + 1.1 * so);\n  behind += iris(0.86) * fil * (0.7 + 0.3 * sin(TAU * q.y + 1.0));\n\n  // soft glow along the cone\n  behind += dim * glow(d, 1.5 + 4.0 * shape) * 0.22 * shape;\n}\n", "look": {"size": 1.05, "glow": 1.1, "lighting": 1, "grain": 0.25, "chroma": 0.25, "hueShift": 0.12, "saturation": 1.05, "sphere": "glass", "spin": 0.5924133532731614}}, "water-light-lane": {"name": "Water light lane", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float u = q.y;\n  float s = round(u);\n  float sOld = spec(u, 0.4);\n  float n1 = noiseRound(q, 2.0, 0.11);\n  float n2 = noiseRound(q, 4.0, 0.19);\n  float n3 = noiseRound(q, 1.0, 0.06);\n\n  float fade = smoothstep(0.0, 0.18, u) * (1.0 - smoothstep(0.82, 1.0, u));\n\n  // main shape: one thin caustic streak that winds slowly\n  float R = R0 + 8.0 + 9.0 * s + 9.0 * (n1 - 0.5) + 3.0 * (n3 - 0.5);\n  float d = q.x - R;\n  float wide = 1.0 + 2.2 * s + 1.0 * n2;\n  float lane = glow(d, wide);\n  float core = line(d, 0.9 + 1.1 * s);\n  float bump = 0.65 + 0.55 * n3;\n\n  vec3 ice     = vec3(0.34, 0.72, 1.00);\n  vec3 violet  = vec3(0.55, 0.35, 1.00);\n  vec3 magenta = vec3(1.00, 0.36, 0.72);\n  float accent = 0.5 + 0.5 * sin(u * TAU + t * 0.13);\n  vec3 col = mix(ice, violet, 0.22 * accent);\n\n  behind += col * (lane * bump * (0.10 + 0.55 * s) + core * (0.85 + 2.0 * s)) * fade;\n\n  // secondary: one fine wire that follows the voice with a delay\n  float R2 = R0 + 6.0 + 0.6 * (R - R0 - 6.0) - 4.5 * sOld;\n  float d2 = q.x - R2;\n  float wire = line(d2, 0.65) * 1.4 + glow(d2, 1.1) * 0.14;\n  vec3 col2 = mix(violet, magenta, 0.5 + 0.5 * sin(u * TAU - t * 0.21));\n  behind += col2 * wire * (0.20 + 1.3 * sOld) * fade;\n}\n", "look": {"size": 1, "glow": 0.9, "lighting": 1, "grain": 0.25, "chroma": 0.35, "hueShift": 0.15, "saturation": 1.05, "sphere": "glass", "spin": 0.46801537270982885}}, "silk-wave": {"name": "Silk wave", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float u = q.y;\n\n  float s    = round(u);\n  float echo = spec(u, 0.35);\n\n  float n1 = noiseRound(q, 2.0, 0.15);\n  float n2 = noiseRound(q, 3.0, 0.24);\n  float n3 = noiseRound(q, 1.0, 0.08);\n\n  // heart of the silk: slowly coil band\n  float rc = 60.0 + 2.5 * n1 + 2.0 * n3\n           + 2.0 * sin(u * TAU + t * 0.5)\n           + 6.0 * s + 2.0 * pulse;\n\n  // volumetric thickness: waves along, never blocky\n  float h = 2.5 + 1.2 * n2 + 3.0 * s\n          + 1.8 * abs(sin(u * TAU * 2.0 - t * 0.35))\n          + 0.7 * pulse;\n\n  float d = q.x - rc;\n  float x = d / h;\n\n  // soft body with a long halo + hot thin core\n  float body = exp(-x * x * 1.5) * 0.9 + glow(d, h * 2.4) * 0.08;\n  float core    = line(d, 0.9 + 1.1 * s + 0.5 * n2);\n\n  // fades softly in and out along the length\n  float env = 0.15 + 0.85 * (0.5 + 0.5 * sin(u * TAU - 1.1));\n\n  vec3 ice    = mix(iris(u + 0.04 + t * 0.015), vec3(0.30, 0.72, 1.00), 0.55);\n  vec3 violet = mix(iris(u + 0.42 + t * 0.015), vec3(0.72, 0.30, 1.00), 0.55);\n  vec3 color  = mix(ice, violet, 0.10 + 0.10 * n2);\n\n  vec3 light = color * body * (0.40 + 0.70 * s) * env;\n  light += mix(color, vec3(0.62, 0.90, 1.0), 0.45) * core * (0.85 + 1.30 * s);\n\n  // depth: the band tilts around the sphere, the front half sharper than the back\n  float deep = sin(u * TAU);\n  light *= 0.58 + 0.42 * smoothstep(-0.35, 0.35, deep);\n  if (deep > 0.0) front += light; else behind += light;\n\n  // fine second trace: follows her voice with a delay, opposite depth\n  float rc2 = rc + h * 0.6 + 2.5;\n  float d2  = q.x - rc2;\n  float core2 = line(d2, 0.7 + 0.8 * echo);\n\n  float e2   = 0.5 + 0.5 * sin(u * TAU + 2.3 - t * 0.12);\n  float env2 = smoothstep(0.02, 0.40, e2) * (1.0 - smoothstep(0.60, 0.98, e2));\n\n  vec3 light2 = violet * core2 * (0.35 + 1.70 * echo) * env2;\n  float deep2 = sin(u * TAU + 1.5);\n  light2 *= 0.60 + 0.40 * smoothstep(-0.40, 0.40, deep2);\n  if (deep2 > 0.0) front += light2; else behind += light2;\n}", "look": {"size": 1.05, "glow": 1.2, "lighting": 1.1, "grain": 0.25, "chroma": 0.2, "hueShift": 0.1, "saturation": 1.05, "sphere": "glass", "spin": 0.13259492801213413}}, "broken-top-orbit": {"name": "Broken top orbit", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float n = noiseRound(q, 2.5, 0.22);\n  float s = round(q.y);\n\n  // seven straight facets: no blob but real corners\n  float N = 7.0;\n  float f = q.y * N;\n  float seg = floor(f);\n  float ca = (seg + 0.5) / N;\n  float local = (f - seg - 0.5) * TAU / N;\n  float w = abs(local) * 2.0 * N / TAU;\n\n  float ss = round(ca);\n  float sd = spec(ca, 0.6);\n\n  // precession: every facet tilts inwards and outwards over time\n  float prec = t * 0.5;\n  float apot = 59.0 + 3.0 * n + 12.0 * ss + (2.0 + 4.0 * level) * cos(ca * TAU - prec);\n  float segfade = 1.0 - smoothstep(0.62, 1.0, w);\n\n  float d = q.x * cos(local) - apot;\n  float thickness = 0.8 + 0.5 * cos(local * 4.0 + seg * 1.7) + 1.0 * ss;\n  float core = line(d, thickness * 0.6) * (0.5 + 1.0 * ss + 0.5 * s + 0.7 * pulse);\n  float halo = glow(d, 3.0 + 5.0 * ss + 3.0 * s) * (0.3 + 0.5 * ss);\n\n  vec3 color = iris(ca + 0.05 * sin(t * 0.07) + 0.03);\n  front += color * (core + halo) * segfade;\n  front += vec3(0.5, 0.75, 1.0) * core * segfade * 0.25;\n\n  // fine violet filament that follows the voice with a delay\n  float apot2 = 59.0 + 3.0 * n + 8.0 * ss - 7.0 + (2.0 + 3.0 * level) * cos(ca * TAU - prec - 0.3);\n  float d2 = q.x * cos(local) - apot2;\n  float f2 = 1.0 - smoothstep(0.5, 1.0, w);\n  front += iris(0.85) * line(d2, 0.75) * (0.15 + 0.85 * sd) * f2;\n}", "look": {"size": 1.05, "glow": 1.1, "lighting": 1, "grain": 0.25, "chroma": 0.25, "hueShift": 0.12, "saturation": 1.1, "sphere": "glass", "spin": 0.6321236968012919}}, "ripple-lane": {"name": "Ripple lane", "glsl": "void ring(vec2 p, out vec3 behind, out vec3 front) {\n  vec2 q = polar(p);\n  float s = round(q.y);\n  float n = noiseRound(q, 2.0, 0.22);\n\n  // three slow lobes, seamlessly around the circle\n  float phase = q.y * TAU * 3.0 + t * 0.22 + 1.3 * n;\n  float amp = 3.5 + 2.0 * n + 6.5 * s;\n  float edge = R0 + 7.0 + amp * sin(phase);\n  float d = q.x - edge;\n\n  float thickness = 1.6 + 1.0 * n + 4.5 * s;\n\n  // dark spots: light only comes where the noise is high\n  float bright = smoothstep(0.18, 0.72, noiseRound(q, 2.0, 0.15) + 0.22 * s);\n\n  // hot thin core\n  float core = line(d, thickness * 0.28) * (1.4 + 1.0 * pulse + 0.9 * s) * bright;\n  // narrow, cooler halo (no haze)\n  float halo = glow(d, thickness * 1.1) * (0.20 + 0.7 * s) * bright;\n\n  vec3 color = iris(q.y + t * 0.02);\n  behind += color * (core + halo);\n\n  // fine echo wire that follows the voice with a delay\n  float e = spec(q.y, 0.35);\n  float edge2 = R0 + 4.0 + amp * 0.55 * sin(phase - 0.9);\n  float d2 = q.x - edge2;\n  float bright2 = smoothstep(0.40, 0.88, noiseRound(q, 1.0, 0.10));\n  float wire = line(d2, 0.7) * (0.20 + 1.2 * e) * bright2;\n  behind += iris(q.y + 0.45 + t * 0.01) * wire;\n}", "look": {"size": 1, "glow": 1.1, "lighting": 1.1, "grain": 0.25, "chroma": 0.3, "hueShift": 0, "saturation": 1.1, "sphere": "glass", "spin": 0.09191997908952132}}};
  const NB = 32, HIST = 64, TAU = Math.PI * 2;
  const fold = u => { u = ((u % 1) + 1) % 1; return u < 0.5 ? u * 2 : (1 - u) * 2; };

  // One voice: `source()` returns an AnalyserNode (measured), "fake" (made-up talking, own rhythm) or null (silence).
  function makeVoice(source) {
    const r = Math.random, R = { tempo: 2.5 + r() * 4, phase: r() * 100, pause: 0.3 + r() * 0.5, sway: 0.6 + r() * 1.6, high: 0.1 + r() * 0.35, flow: r() };
    const v = { bands: new Float32Array(NB), shape: new Float32Array(128), level: 0, pitch: 0.3, pulse: 0,
      hist: new Uint8Array(NB * HIST), waveBytes: new Uint8Array(128) };
    const raw = new Float32Array(NB);
    let prev = 0, prevLevel = 0, lastOnset = 0, lvl = 0, spec, wave;
    v.update = t => {
      const dt = Math.min(0.05, Math.max(0, t - prev)); prev = t;
      const src = source();
      if (src && src !== "fake") {
        if (!spec || spec.length !== src.frequencyBinCount) { spec = new Uint8Array(src.frequencyBinCount); wave = new Float32Array(src.fftSize); }
        src.getByteFrequencyData(spec); src.getFloatTimeDomainData(wave);
        let sum = 0; for (const x of wave) sum += x * x;
        lvl = Math.min(1, Math.sqrt(sum / wave.length) * 5);
        const hz = src.context.sampleRate / src.fftSize;
        for (let i = 0; i < NB; i++) {
          const lo = 90 * Math.pow(7000 / 90, i / NB), hi = 90 * Math.pow(7000 / 90, (i + 1) / NB);
          let m = 0, n = 0; for (let b = Math.floor(lo / hz); b <= Math.ceil(hi / hz); b++) { m += spec[b] || 0; n++; }
          raw[i] = Math.min(1, Math.max(0, (m / n / 255 - 0.3) / 0.6) * (1 + i / NB));
        }
        for (let i = 0; i < 128; i++) v.shape[i] += (Math.max(-1, Math.min(1, (wave[i * 16] || 0) * 4)) - v.shape[i]) * 0.5;
      } else if (src === "fake") {
        const tt = t + R.phase;
        const talks = Math.sin(tt * R.pause) + 0.6 * Math.sin(tt * R.pause * 3.1 + 1) > -0.5 ? 1 : 0;
        lvl = talks * Math.pow(Math.max(0, Math.sin(tt * TAU * R.tempo + Math.sin(tt * R.sway) * 2)), 0.3 + R.flow * 0.9) * (0.7 + 0.3 * Math.sin(tt * 0.9));
        const f1 = R.high + 0.07 * Math.sin(tt * 3.1), f2 = R.high + 0.28 + 0.14 * Math.sin(tt * 2.3 + 1);
        for (let i = 0; i < NB; i++) { const x = i / (NB - 1); raw[i] = Math.min(1, lvl * (Math.exp(-(((x - f1) / 0.09) ** 2)) + 0.7 * Math.exp(-(((x - f2) / 0.13) ** 2)) + 0.1 * r())); }
        for (let i = 0; i < 128; i++) v.shape[i] += (lvl * (0.6 * Math.sin(i / 128 * TAU * 3 + t * 20) + 0.3 * Math.sin(i / 128 * TAU * 7 - t * 31)) - v.shape[i]) * 0.5;
      } else { lvl = 0; raw.fill(0); for (let i = 0; i < 128; i++) v.shape[i] *= 0.9; }
      // Meter-like: up at once, settling slowly.
      for (let i = 0; i < NB; i++) v.bands[i] += (raw[i] - v.bands[i]) * (raw[i] > v.bands[i] ? 0.35 : 0.08);
      v.level += (lvl - v.level) * (lvl > v.level ? 0.3 : 0.06);
      let a = 0, w = 0; for (let i = 0; i < NB; i++) { a += v.bands[i] * i; w += v.bands[i]; }
      if (w > 0.05) v.pitch += (a / w / (NB - 1) - v.pitch) * 0.1;
      const onset = lvl > 0.35 && prevLevel <= 0.35 && t - lastOnset > 0.12;
      if (onset) lastOnset = t;
      v.pulse = onset ? 1 : v.pulse * Math.exp(-dt * 5);
      prevLevel = lvl;
      // Textures: history shifts one row (row 0 = now), waveform 0..255.
      v.hist.copyWithin(NB, 0, NB * (HIST - 1));
      for (let i = 0; i < NB; i++) v.hist[i] = Math.round(Math.min(1, v.bands[i]) * 255);
      for (let i = 0; i < 128; i++) v.waveBytes[i] = Math.round((Math.max(-1, Math.min(1, v.shape[i])) * 0.5 + 0.5) * 255);
    };
    return v;
  }

  const VS = `#version 300 es
out vec2 vUv;
void main() { vec2 q = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = q; gl_Position = vec4(q * 2.0 - 1.0, 0.0, 1.0); }`;
  // The ring API: what a ring may use. Units: the canvas is 230 across, the ball has radius 44 (BAL), the ring sits near 54 (R0).
  const PRE = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform float uTime, uLevel, uPitch, uPulse, uPx, uHue, uSat, uBallStyle, uRingGain, uSpin, uSize, uParticles;
// Particle controls: how many, how many lines, size, trail, how much the voice moves them, sprite, their own clock, colours.
uniform float uPCount, uPLines, uPSize, uPTrail, uPReact, uPSprite, uPTime, uPColorMode, uPMinSize, uPMaxSize, uPMaxLight;
uniform vec3 uPC0, uPC1, uPC2;
uniform sampler2D uSpec, uWave;
#define PI 3.14159265
#define TAU 6.28318531
#define BAL 44.0
#define R0 54.0
float t, level, tone, pulse, px;
const vec3 IRIS[8] = vec3[8](vec3(0.49, 0.83, 0.99), vec3(0.26, 0.84, 0.98), vec3(0.22, 0.62, 0.97), vec3(0.49, 0.83, 0.99),
  vec3(0.40, 0.50, 0.98), vec3(0.55, 0.36, 0.96), vec3(0.75, 0.20, 0.86), vec3(0.40, 0.50, 0.98));
vec3 iris(float u) {
  u = fract(u + uHue) * 8.0;
  int i = int(floor(u));
  vec3 c = mix(IRIS[i], IRIS[(i + 1) % 8], smoothstep(0.0, 1.0, fract(u)));
  float l = dot(c, vec3(0.3, 0.59, 0.11));
  return max(mix(vec3(l), c, uSat), 0.0);
}
float mirrorU(float u) { u = fract(u); return u < 0.5 ? u * 2.0 : (1.0 - u) * 2.0; }
float band(float x) { return 0.22 + 0.78 * texture(uSpec, vec2(clamp(x, 0.0, 1.0) * (31.0 / 32.0) + 0.5 / 32.0, 0.5 / 64.0)).r; }
float spec(float x, float old) { return 0.22 + 0.78 * texture(uSpec, vec2(clamp(x, 0.0, 1.0) * (31.0 / 32.0) + 0.5 / 32.0, clamp(old, 0.0, 1.0) * (63.0 / 64.0) + 0.5 / 64.0)).r; }
float round(float u) { return band(mirrorU(u)); }
float wave(float x) { return texture(uWave, vec2(fract(x), 0.5)).r * 2.0 - 1.0; }
vec2 polar(vec2 p) { return vec2(length(p), fract(atan(p.x, -p.y) / TAU)); }
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float hash3(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float noise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }
float noise(vec3 p) { vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash3(i), hash3(i + vec3(1.0, 0.0, 0.0)), f.x), mix(hash3(i + vec3(0.0, 1.0, 0.0)), hash3(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
             mix(mix(hash3(i + vec3(0.0, 0.0, 1.0)), hash3(i + vec3(1.0, 0.0, 1.0)), f.x), mix(hash3(i + vec3(0.0, 1.0, 1.0)), hash3(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z); }
float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; } return s / 0.97; }
float fbm(vec3 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { s += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; } return s / 0.94; }
float noiseRound(vec2 q, float freq, float speed) { float a = q.y * TAU; return fbm(vec3(cos(a) * freq, sin(a) * freq, q.x * 0.035 - t * speed)); }
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
float glow(float d, float w) { return w / (abs(d) + w); }
float line(float d, float thickness) { return smoothstep(thickness + px, thickness - px, abs(d)); }
vec3 tiltedRing(vec2 p, float R, float tilt, float spin) {
  p = rot(-spin) * p;
  float c = max(cos(tilt), 0.05);
  float a = atan(p.y / c, p.x);
  vec2 e = vec2(cos(a), sin(a) * c) * R;
  return vec3(length(p - e), fract(a / TAU), sin(a) < 0.0 ? 1.0 : -1.0);
}
#define COUNT int(uPCount)
#define LINES max(1.0, floor(uPLines))
// Split the motes over LINES strands: x = which strand, y = 0..1 along it.
vec2 strand(float i) { float per = ceil(float(COUNT) / LINES); return vec2(floor(i / per), mod(i, per) / per); }
// Turn a flat shape in 3D: round the vertical axis at speed, tipped a little towards you.
vec3 spin(vec3 q, float speed) { q.xz = rot(t * speed) * q.xz; q.yz = rot(0.4) * q.yz; return q; }
vec3 project(vec3 q) { float s = 300.0 / (300.0 + q.z); return vec3(q.xy * s, s); }
float safeStep(float a, float b, float x) { return a < b ? smoothstep(a, b, x) : 1.0 - smoothstep(b, a, x); }
vec2 safeStep(float a, float b, vec2 x) { return a < b ? smoothstep(a, b, x) : 1.0 - smoothstep(b, a, x); }
vec3 safeStep(float a, float b, vec3 x) { return a < b ? smoothstep(a, b, x) : 1.0 - smoothstep(b, a, x); }
vec4 safeStep(float a, float b, vec4 x) { return a < b ? smoothstep(a, b, x) : 1.0 - smoothstep(b, a, x); }
vec2 safeStep(vec2 a, vec2 b, vec2 x) { vec2 s = smoothstep(min(a, b), max(a, b), x); return mix(s, 1.0 - s, step(b, a)); }
vec3 safeStep(vec3 a, vec3 b, vec3 x) { vec3 s = smoothstep(min(a, b), max(a, b), x); return mix(s, 1.0 - s, step(b, a)); }
#define smoothstep(a, b, x) safeStep(a, b, x)
#define pow(a, b) pow(abs(a), b)
`;
  // After the ring: colour lock to the Iris band, breathing with the voice, the fixed light band, the glass ball.
  const POST = `
#ifndef DEPTH
#define DEPTH BAL
#endif
vec3 colorLock(vec3 c) {
  float mx = max(c.r, max(c.g, c.b)), mn = min(c.r, min(c.g, c.b)), d = mx - mn;
  if (d < 1e-4) return c;
  float h = mx == c.r ? mod((c.g - c.b) / d, 6.0) : mx == c.g ? (c.b - c.r) / d + 2.0 : (c.r - c.g) / d + 4.0;
  h /= 6.0;
  float lo = 0.54, hi = 0.86;
  if (h < lo || h > hi) h = (h < lo && h > 0.2) ? lo : (h > hi || h < 0.07) ? hi : lo;
  vec3 k = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return mn + k * d;
}
float breath() { return (1.0 + 0.11 * level + 0.06 * pulse + 0.015 * sin(t * 1.25)) * uSize; }
void ringInBand(vec2 p, out vec3 behind, out vec3 front) {
  behind = vec3(0.0); front = vec3(0.0);
  ring(rot(uSpin * TAU) * p / breath(), behind, front);
  float r = length(p);
  behind *= smoothstep(0.03, 0.2, dot(max(behind, 0.0), vec3(0.2126, 0.7152, 0.0722)));
  front *= smoothstep(0.03, 0.2, dot(max(front, 0.0), vec3(0.2126, 0.7152, 0.0722)));
  float band = smoothstep(min(108.0, 96.0 * uSize), min(94.0, 80.0 * uSize), r) * smoothstep(1.0, 7.0, max(body(p), 0.0) + (body(p) < 0.0 ? 7.0 : 0.0));
  float g = uRingGain * (0.8 + 0.7 * level + 0.3 * pulse) * band;
  behind = colorLock(max(behind, 0.0)) * g; front = colorLock(max(front, 0.0)) * g;
}
vec3 ballColor(vec2 p) {
  // The body's surface from its distance function: flat in the middle, bending away over DEPTH towards the edge.
  // For the sphere this is exactly the sphere's normal.
  float deep = clamp(-body(p) / DEPTH, 0.0, 1.0);
  vec2 gr = vec2(body(p + vec2(0.5, 0.0)) - body(p - vec2(0.5, 0.0)), body(p + vec2(0.0, 0.5)) - body(p - vec2(0.0, 0.5)));
  vec2 q = (dot(gr, gr) > 1e-8 ? normalize(gr) : vec2(0.0)) * (1.0 - deep);
  float z = sqrt(max(0.0, 1.0 - dot(q, q))); vec3 n = vec3(q, z);
  vec3 L = normalize(vec3(-0.45, 0.6, 0.75));
  float dif = max(dot(n, L), 0.0), k = 1.0 - z;
  vec3 base = mix(vec3(0.012, 0.016, 0.035), vec3(0.05, 0.05, 0.11), dif);
  vec2 bq = p + n.xy * 6.0;
  vec3 a1, v1, a2, v2, a3, v3;
  ringInBand(bq * (1.26 + 0.55 * k), a1, v1);
  ringInBand(bq * (1.28 + 0.56 * k), a2, v2);
  ringInBand(bq * (1.30 + 0.57 * k), a3, v3);
  vec3 refraction = vec3((a1 + v1).r, (a2 + v2).g, (a3 + v3).b) * (0.22 + 0.6 * k * k);
  float fres = pow(k, 3.0);
  vec3 edge = (vec3(0.45, 0.75, 1.0) * 0.2 + (a2 + v2) * 3.0) * fres * (0.8 + 1.0 * level + 0.4 * pulse);
  edge += (a1 + v1 + vec3(0.2, 0.35, 0.7) * 0.15) * 0.5 * smoothstep(-0.1, -0.95, q.y) * pow(k, 1.5);
  vec3 R = reflect(vec3(0.0, 0.0, -1.0), n);
  vec2 d = rot(0.55) * (R.xy - vec2(-0.38, 0.46));
  vec2 e = d / vec2(0.13, 0.035);
  float strip = exp(-dot(e, e)) * 0.5 + exp(-dot(d, d) / 0.0012) * 0.3;
  float nev = fbm(vec3(q * 1.6, t * 0.1));
  vec3 core = iris(nev * 0.4 + 0.2) * 0.03 * nev;
  // Ball finish: 0 glass (the original), 1 matte, 2 pearl, 3 plasma, 4 chrome, 5 hologram.
  if (uBallStyle < 0.5) return base + refraction + edge + strip * vec3(0.85, 0.93, 1.0) + core;
  if (uBallStyle < 1.5) return base * 1.3 + refraction * 0.5 + edge * 0.6 + strip * 0.12 + core;
  if (uBallStyle < 2.5) {
    vec3 irid = iris(dot(n, vec3(0.6, 0.4, 0.2)) * 0.8 + 0.1) * 0.07 * (0.5 + dif);
    return base + irid + refraction * 0.8 + edge * 0.8 + strip * 0.55;
  }
  if (uBallStyle < 3.5) {   // plasma: a glowing swirl inside that flares with the voice
    float w = fbm(vec3(q * 3.0 + fbm(vec3(q * 2.0, t * 0.3)) * 1.5, t * 0.45));
    vec3 plasma = iris(w * 1.2 + t * 0.05) * pow(w, 2.2) * (0.5 + 1.6 * level + 0.8 * pulse) * (0.3 + 0.7 * z);
    return base * 0.6 + plasma + refraction * 0.35 + edge * 0.8 + strip * 0.35;
  }
  if (uBallStyle < 4.5) {   // chrome: a mirror of the ring round it
    vec3 ra, rv; ringInBand(R.xy * 95.0, ra, rv);
    vec3 env = mix(vec3(0.015, 0.02, 0.035), vec3(0.14, 0.16, 0.22), smoothstep(-0.3, 0.9, R.y));
    return env + (ra + rv) * (0.6 + 1.2 * k) + edge * 0.6 + strip * 1.1;
  }
  float scan = 0.5 + 0.5 * sin(p.y * 1.7 - t * 5.0);   // hologram: scan lines and a bright rim
  vec3 holo = iris(q.y * 0.5 + t * 0.08) * (pow(k, 1.4) * 1.3 + 0.14 * scan * (0.4 + level));
  return base * 0.5 + holo + refraction * 0.5 + edge * 0.5;
}
// Particles: COUNT motes. Where each one is comes from one small GLSL function (a shape, see SHAPES):
// vec3 particle(float i, vec3 h, out vec3 color, out float size) returns its 3D position (ball units, +z towards
// you), with h three fixed random numbers for that mote. Then: the voice pushes and pumps it (uPReact), it is
// drawn as a sprite (dot, star, blob, square, ring or streak), coloured, and hidden where the glass is in front.
vec3 colorGradient(float x) { x = clamp(x, 0.0, 1.0); return x < 0.5 ? mix(uPC0, uPC1, x * 2.0) : mix(uPC1, uPC2, x * 2.0 - 1.0); }
void particles(vec2 p, inout vec3 behind, inout vec3 front) {
  float t0 = t, lift = max(level - 0.25, 0.0) / 0.75;   // 0 in silence .. 1 loud
  for (int i = 0; i < 512; i++) {
    if (i >= COUNT) break;
    float f = float(i);
    vec3 hh = vec3(fract(sin(f * 12.9898) * 43758.5453), fract(sin(f * 78.233) * 43758.5453), fract(sin(f * 39.425) * 43758.5453));
    vec3 color = vec3(0.0), k2; float scale = 0.0, g2;
    t = uPTime;
    vec3 q = particle(f, hh, color, scale), q0 = q;
    // A streak runs from where the mote was a moment ago (longer with more trail) to where it is.
    if (uPSprite > 4.5) { t = uPTime - 0.03 - 0.25 * uPTrail; q0 = particle(f, hh, k2, g2); }
    t = t0;
    if (scale <= 0.0) continue;
    float push = 1.0 + uPReact * (0.05 * lift + 0.10 * pulse);
    q *= push; q0 *= push;
    scale *= uPSize * (1.0 + uPReact * (0.25 * lift + 0.45 * pulse));
    float pump = 1.0 + uPReact * (0.5 * lift + 0.5 * pulse);
    // Limits: however hard the voice pumps, a mote never gets brighter than uPMaxLight.
    float light = min(max(color.r, max(color.g, color.b)) * pump, uPMaxLight);
    color *= pump; color *= min(1.0, uPMaxLight / max(max(color.r, max(color.g, color.b)), 1e-4));
    // Colour: the shape's own, or start/mid/end along the line, by the voice, by depth, or cycling in time.
    if (uPColorMode > 0.5) {
      float x = uPColorMode < 1.5 ? f / float(COUNT)
              : uPColorMode < 2.5 ? (band(hh.y) - 0.22) / 0.78 * (0.4 + 0.6 * lift) + 0.3 * pulse
              : uPColorMode < 3.5 ? q.z / 160.0 + 0.5
              : fract(f / float(COUNT) + uPTime * 0.12);
      color = colorGradient(uPColorMode > 3.5 ? 1.0 - abs(x * 2.0 - 1.0) : x) * light;
    }
    vec3 pr = project(vec3(q.xy, -q.z));
    // Never smaller or bigger than the limits; a blob is three times a dot, so that goes in before the limit.
    float sz = clamp(scale * pr.z * (uPSprite > 1.5 && uPSprite < 2.5 ? 3.0 : 1.0), max(uPMinSize, 1.3 * px), max(uPMaxSize, 1.3 * px));
    vec2 d = p - pr.xy;
    float glow;
    if (uPSprite < 0.5) {            // dot
      float r2 = dot(d, d) / (sz * sz); if (r2 > 196.0) continue;
      glow = exp(-r2) * 2.4 + exp(-sqrt(r2) * 0.5) * 0.22;
    } else if (uPSprite < 1.5) {     // star: four thin points, slowly turning
      vec2 a = abs(rot(t * 0.4 + f) * d) / sz; if (a.x + a.y > 30.0) continue;
      glow = exp(-dot(a, a)) * 2.0 + (exp(-a.x * 4.0) * exp(-a.y * 0.4) + exp(-a.y * 4.0) * exp(-a.x * 0.4)) * 1.3;
    } else if (uPSprite < 2.5) {     // blob: big and soft
      float r2 = dot(d, d) / (sz * sz); if (r2 > 16.0) continue;
      glow = exp(-r2) * 0.9 + exp(-sqrt(r2)) * 0.15;
    } else if (uPSprite < 3.5) {     // square
      vec2 a = abs(rot(f * 0.7 + t * 0.3) * d) / sz; float m = max(a.x, a.y); if (m > 14.0) continue;
      glow = smoothstep(1.1, 0.85, m) * 1.8 + exp(-m * 0.5) * 0.2;
    } else if (uPSprite < 4.5) {     // ring
      float r = length(d) / sz; if (r > 14.0) continue;
      glow = exp(-(r - 1.6) * (r - 1.6) * 6.0) * 1.8 + exp(-r * 0.5) * 0.12;
    } else {                         // streak, bright at the head
      vec3 pr0 = project(vec3(q0.xy, -q0.z));
      vec2 ab = pr.xy - pr0.xy; float along = clamp(dot(p - pr0.xy, ab) / max(dot(ab, ab), 1e-4), 0.0, 1.0);
      float dd = length(p - pr0.xy - ab * along) / (sz * 0.7); if (dd > 14.0) continue;
      glow = (exp(-dd * dd) * 2.2 + exp(-dd * 0.5) * 0.18) * (0.15 + 0.85 * along * along);
    }
    vec3 c = max(color, 0.0) * glow * uParticles * uRingGain;
    // In front only where it is really outside the glass: above the body's surface at that spot (for the sphere
    // sqrt(BAL^2 - r^2)). Inside or behind the body it goes behind and the glass covers it.
    float deep = clamp(-body(q.xy) / DEPTH, 0.0, 1.0);
    if (q.z > DEPTH * sqrt(max(0.0, 1.0 - (1.0 - deep) * (1.0 - deep)))) front += c; else behind += c;
  }
  t = t0;
}
void main() {
  t = uTime; level = 0.25 + 0.75 * uLevel; tone = uPitch; pulse = uPulse; px = uPx;
  vec2 p = (vUv - 0.5) * 230.0;
  vec3 behind, front;
  ringInBand(p, behind, front);
  if (uParticles > 0.0) particles(p, behind, front);
  float m = smoothstep(px, -px, body(p));
  vec3 col = m > 0.0 ? mix(behind, ballColor(p), m) + front : behind + front;
  if (any(isnan(col)) || any(isinf(col))) col = vec3(0.0);
  fragColor = vec4(clamp(col, 0.0, 16.0), m);   // alpha: where the body is, for the finish
}`;
  const FS_DOWN = `#version 300 es
precision highp float; in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uTexel;
void main() { vec2 d = uTexel; vec4 c = 0.25 * (texture(uTex, vUv + vec2(-d.x, -d.y)) + texture(uTex, vUv + vec2(d.x, -d.y)) + texture(uTex, vUv + vec2(-d.x, d.y)) + texture(uTex, vUv + vec2(d.x, d.y)));
  float L = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722)); o = c * smoothstep(0.3, 0.9, L); }`;
  const FS_BLUR = `#version 300 es
precision highp float; in vec2 vUv; out vec4 o; uniform sampler2D uTex; uniform vec2 uDir;
void main() { const float w[5] = float[5](0.227, 0.195, 0.122, 0.054, 0.016);
  vec4 s = texture(uTex, vUv) * w[0];
  for (int i = 1; i < 5; i++) { s += texture(uTex, vUv + uDir * float(i)) * w[i]; s += texture(uTex, vUv - uDir * float(i)) * w[i]; }
  o = s; }`;
  // Finish: chroma, bloom, tone mapping on brightness (bright light stays cyan or violet instead of white),
  // a round fade at the edge, grain.
  const FS_FINISH = `#version 300 es
precision highp float; in vec2 vUv; out vec4 o;
uniform sampler2D uScene, uBloom1, uBloom2; uniform float uGlow, uLighting, uGrain, uChroma, uTime, uTone;
// ponytail: 0.55 by eye; raise for more white add. Tone down (uTone) takes it away with the rest.
#define WHITE (0.55 * (1.0 - uTone))
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
void main() {
  vec2 d = (vUv - 0.5) * uChroma * 0.005;
  vec3 c = vec3(texture(uScene, vUv + d).r, texture(uScene, vUv).g, texture(uScene, vUv - d).b);
  c += (texture(uBloom1, vUv).rgb * 0.35 + texture(uBloom2, vUv).rgb * 0.35) * uGlow;
  c *= uLighting;
  float L = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c *= aces(vec3(L)).r / max(L, 1e-4);
  // White is capped, not removed: bright light is scaled (not clipped, clipping all three channels made white
  // blobs), then only the hottest cores add white, at most WHITE of the way. A white glint here and there, no blobs.
  float mx = max(c.r, max(c.g, c.b));
  c /= max(1.0, mx);
  c = mix(c, vec3(1.0), smoothstep(1.0, 2.4, mx) * WHITE);
  c *= 1.0 - 0.3 * uTone;
  float r = length(vUv - 0.5);
  c *= 1.0 - smoothstep(0.34, 0.5, r);
  // Transparent, premultiplied: light is as opaque as it is bright, the glass ball is solid. So it sits on any
  // surface (the page, the pill's glass bar, a desktop) instead of on a dark square.
  float a = max(clamp(max(c.r, max(c.g, c.b)) * 1.25, 0.0, 1.0), texture(uScene, vUv).a);
  c = max(c + (hash(gl_FragCoord.xy + fract(uTime * 7.0) * 311.0) - 0.5) * (1.5 / 255.0 + uGrain * 0.012) * a, 0.0);
  o = vec4(min(c, vec3(a)), a);
}`;

  // Particle shapes. Each is the particle() function above; t, level (loudness), pulse (onset), band(x) (pitch band
  // 0 low .. 1 high), iris(u), rot(), spin(), COUNT, LINES, strand(i) and uPTrail are there to use.
  // STYLE gives each its starting controls (count, lines, sprite ...); every control can be changed after.
  const SHAPES = {
    // The first one, as it was: motes on tilted orbits, each riding a pitch band. LINES > 1 puts them in lanes.
    orbit: `vec3 particle(float i, vec3 h, out vec3 color, out float size) {
  float g = LINES > 1.0 ? (floor(h.x * LINES) + 0.5) / LINES : h.x;
  float r = 52.0 + 38.0 * h.x + 10.0 * level * band(h.y) + 18.0 * pulse * h.z;
  float a = h.y * TAU + t * (0.06 + 0.22 * h.z) * (g > 0.5 ? 1.0 : -1.0);
  float k = LINES > 1.0 ? 0.6 + 0.9 * fract(g * 7.31) : 0.8 + 0.6 * h.z;
  vec3 q = vec3(cos(a) * r, sin(a) * r * cos(k), sin(a) * r * sin(k));
  q.xy = rot(g * TAU) * q.xy;
  color = iris(h.x * 0.6 + 0.15 + t * 0.02) * (0.55 + 0.45 * sin(t * (1.5 + 3.0 * h.x) + i * 1.7)) * (0.5 + 0.9 * band(h.y));
  size = 0.9 + 1.3 * h.y;
  return q;
}`,
    // LINES comets on tilted orbits, each a bright head and a fading tail; trail sets the tail, an onset stretches it.
    comets: `vec3 particle(float i, vec3 h, out vec3 color, out float size) {
  vec2 s = strand(i); float c = s.x, j = s.y;   // j: 0 is the head
  float s1 = fract(sin(c * 17.3 + 1.0) * 43758.5), s2 = fract(sin(c * 91.7 + 2.0) * 43758.5), dir = mod(c, 2.0) < 1.0 ? 1.0 : -1.0;
  float r = 60.0 + 24.0 * s1 + 8.0 * level * band(s2);
  float a = s2 * TAU + dir * (t * (0.35 + 0.25 * s1) - j * (0.4 + 2.0 * uPTrail) * (1.0 + 0.8 * pulse));
  float k = 0.5 + 0.9 * s1;
  vec3 q = vec3(cos(a) * r, sin(a) * r * cos(k), sin(a) * r * sin(k));
  q.xy = rot(s2 * TAU + c * 1.7) * q.xy;
  float fade = pow(1.0 - j, 2.2);
  color = mix(iris(s1 * 0.7 + 0.1 + t * 0.02), vec3(1.0), 0.4 * pow(1.0 - j, 10.0)) * fade * (0.7 + 0.8 * band(s2));
  size = (0.5 + 1.7 * fade) * (1.0 + 0.3 * pulse);
  return q;
}`,
    // Embers born on the ring that fly outward and die; the voice makes them fly further. LINES > 1: that many jets.
    sparks: `vec3 particle(float i, vec3 h, out vec3 color, out float size) {
  float life = fract(t * (0.25 + 0.35 * h.x) + h.y);
  float a = LINES > 1.0 ? (floor(h.z * LINES) + 0.5) / LINES * TAU + (h.x - 0.5) * 0.25 : h.z * TAU + 0.3 * sin(t * 0.2 + h.x * 6.0);
  float r = 56.0 + life * (16.0 + 30.0 * band(h.z) * level + 20.0 * pulse);
  vec3 q = vec3(cos(a) * r, sin(a) * r, (h.x - 0.5) * 50.0 * (1.0 - 0.5 * life));
  color = iris(h.z * 0.5 + life * 0.3 + 0.1) * pow(1.0 - life, 1.6) * (0.4 + 1.2 * band(h.z));
  size = (0.5 + 0.9 * h.y) * (1.0 - 0.6 * life);
  return q;
}`,
    // A thin disc of dust, like Saturn's rings: inner specks turn faster. LINES > 1: that many ringlets.
    dust: `vec3 particle(float i, vec3 h, out vec3 color, out float size) {
  float r = LINES > 1.0 ? 56.0 + 36.0 * (floor(h.x * LINES) + 0.5) / LINES + (h.z - 0.5) * 2.5 : 54.0 + 40.0 * pow(h.x, 0.7);
  float a = h.y * TAU + t * 0.3 * pow(54.0 / r, 1.5);
  vec3 q = vec3(cos(a) * r, (h.z - 0.5) * 3.0, sin(a) * r);
  q.yz = rot(1.15) * q.yz;
  q.xy = rot(0.35 + 0.1 * sin(t * 0.1)) * q.xy;
  color = iris(h.x * 0.5 + 0.3) * (0.25 + 0.5 * h.z + 0.8 * band(h.x) * level);
  size = 0.5 + 0.6 * h.y;
  return q;
}`,
    // Fireflies wandering round the ball, each blinking on its own. LINES > 1: they gather in that many swarms.
    swarm: `vec3 particle(float i, vec3 h, out vec3 color, out float size) {
  vec3 drift = vec3(noise(vec2(i * 1.3, t * 0.25)), noise(vec2(i * 1.3 + 40.0, t * 0.25)), noise(vec2(i * 1.3 + 80.0, t * 0.25))) - 0.5;
  vec3 dir = h - 0.5 + drift * 1.2;
  if (LINES > 1.0) { float g = floor(h.x * LINES); dir = mix(dir, vec3(sin(g * 2.4 + t * 0.2), cos(g * 3.1), sin(g * 1.7 - t * 0.15)), 0.75); }
  vec3 q = normalize(dir) * (60.0 + 24.0 * h.z + 12.0 * level * band(h.x) + 10.0 * pulse * h.y);
  float blink = pow(0.5 + 0.5 * sin(t * (1.2 + 2.5 * h.y) + i * 2.1), 4.0);
  color = iris(h.z * 0.6 + 0.15) * (0.15 + 1.1 * blink);
  size = 1.0 + 1.2 * h.x * (0.5 + blink);
  return q;
}`,
    // Shapes. LINES > 1: that many copies, each turned a little further round.
    circle: `vec3 particle(float i, vec3 h, out vec3 color, out float size) {
  vec2 s = strand(i); float u = s.y, a = u * TAU + t * 0.2, b = band(mirrorU(u));
  color = iris(u + t * 0.03) * (0.5 + 0.8 * b);
  size = 1.0 + 1.2 * b + 1.5 * pulse * h.x;
  vec3 q = vec3(cos(a), sin(a), 0.0) * (72.0 + 12.0 * b * level);
  q.yz = rot(s.x / LINES * PI) * q.yz;
  return spin(q, 0.35);
}`,
    square: `vec3 particle(float i, vec3 h, out vec3 color, out float size) {
  vec2 st = strand(i); float u = st.y, b = band(mirrorU(u));
  // Evenly along the edge: four straight sides, each ending in a quarter circle.
  float s = 58.0 + 10.0 * b * level, rc = 16.0, L = 2.0 * (s - rc), per = L + PI * 0.5 * rc;
  float k = floor(fract(u + t * 0.03) * 4.0), x = fract(fract(u + t * 0.03) * 4.0) * per;
  vec2 v = x < L ? vec2(s, rc - s + x) : vec2(s - rc) + rc * vec2(cos((x - L) / rc), sin((x - L) / rc));
  color = iris(u + t * 0.03) * (0.5 + 0.8 * b);
  size = 1.0 + 1.2 * b + 1.5 * pulse * h.x;
  vec3 q = vec3(rot(k * PI * 0.5) * v, 0.0);
  q.yz = rot(st.x / LINES * PI) * q.yz;
  return spin(q, 0.35);
}`,
    triangle: `vec3 particle(float i, vec3 h, out vec3 color, out float size) {
  vec2 st = strand(i); float u = fract(st.y + t * 0.03), b = band(mirrorU(u));
  float k = floor(u * 3.0), f = fract(u * 3.0), a0 = k * TAU / 3.0 + PI * 0.5;
  vec2 v = mix(vec2(cos(a0), sin(a0)), vec2(cos(a0 + TAU / 3.0), sin(a0 + TAU / 3.0)), f);
  color = iris(u + t * 0.03) * (0.5 + 0.8 * b);
  size = 1.0 + 1.2 * b + 1.5 * pulse * h.x;
  vec3 q = vec3(v * (88.0 + 12.0 * b * level), 0.0);
  q.yz = rot(st.x / LINES * PI) * q.yz;
  return spin(q, 0.35);
}`,
    // A trefoil wound round a torus, always outside the glass. LINES > 1: that many strands side by side.
    knot: `vec3 particle(float i, vec3 h, out vec3 color, out float size) {
  vec2 s = strand(i); float u = s.y, a = u * TAU + t * 0.15, b = band(mirrorU(u));
  float r = 64.0 + 14.0 * cos(3.0 * a) + 8.0 * b * level + (s.x - (LINES - 1.0) * 0.5) * 5.0;
  vec3 k = vec3(r * cos(2.0 * a), r * sin(2.0 * a), 26.0 * sin(3.0 * a));
  color = iris(u + t * 0.03) * (0.5 + 0.8 * b);
  size = 1.4 + 1.2 * b + 1.5 * pulse * h.x;
  return spin(k, 0.3);
}`,
  };
  const SPRITES = ["dot", "star", "blob", "square", "ring", "streak"];
  const COLOR_MODES = ["preset", "along", "voice", "depth", "cycle"];
  const MATERIALS = ["glass", "matte", "pearl", "plasma", "chrome", "hologram"];
  const PSTYLE = { count: 64, lines: 1, size: 1, trail: 0.3, react: 1, speed: 1, sprite: "dot",
    colors: ["#7dd3fc", "#8b5cf6", "#c026d3"], colorMode: "preset", minSize: 0, maxSize: 6, maxLight: 1.6 };
  const STYLE = {
    orbit: { count: 48 }, comets: { count: 96, lines: 4, trail: 0.5 }, sparks: { count: 140, sprite: "streak", trail: 0.4 },
    dust: { count: 260, size: 0.8 }, swarm: { count: 72, sprite: "star", size: 0.8 },
    circle: { count: 128 }, square: { count: 128 }, triangle: { count: 128 }, knot: { count: 160 },
  };
  const hex = c => { const n = parseInt(String(c).replace("#", ""), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };

  // Body shapes: float body(vec2 p) is the signed distance to the body's edge (negative inside, ball units:
  // the canvas is 230 across). Optional #define DEPTH sets how far in from the edge the glass bends (default 44).
  const BODIES = {
    sphere: `float body(vec2 p) { return length(p) - BAL; }`,
    cube: `float body(vec2 p) {   // a square with round corners
  vec2 d = abs(p) - vec2(28.0);
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - 12.0;
}`,
    triangle: `float body(vec2 p) {   // a triangle with round corners
  const float k = 1.7320508;
  float r = 34.0;
  p.x = abs(p.x) - r; p.y = p.y + r / k + 6.0;
  if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
  p.x -= clamp(p.x, -2.0 * r, 0.0);
  return -length(p) * sign(p.y) - 9.0;
}`,
    donut: `#define DEPTH 14.0
float body(vec2 p) { return abs(length(p) - 30.0) - 14.0; }   // a ring: the light shows through the hole`,
    gem: `float body(vec2 p) {   // a hexagon with soft corners
  const vec3 k = vec3(-0.8660254, 0.5, 0.5773503);
  p = abs(rot(t * 0.1) * p);
  p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
  p -= vec2(clamp(p.x, -k.z * 36.0, k.z * 36.0), 36.0);
  return length(p) * sign(p.y) - 6.0;
}`,
  };
  const NO_RING = "void ring(vec2 p, out vec3 behind, out vec3 front) { behind = vec3(0.0); front = vec3(0.0); }";

  const LOOK = { size: [0.85, 1.3, 1], glow: [0, 2, 1], lighting: [0.6, 2, 1], grain: [0, 0.4, 0.15], chroma: [0, 1, 0.2], hueShift: [0, 1, 0], saturation: [0, 1.5, 1] };
  function lookFrom(l = {}) {
    const out = {};
    for (const [k, [lo, hi, st]] of Object.entries(LOOK)) { const v = Number(l[k]); out[k] = Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : st; }
    out.sphere = { glass: 0, matte: 1, pearl: 2 }[l.sphere] ?? 0;
    out.spin = Number.isFinite(l.spin) ? l.spin : 0;
    return out;
  }

  const particleUniforms = (P, time) => ({ uPCount: Math.max(1, Math.min(512, Math.round(P.count))), uPLines: P.lines, uPSize: P.size,
    uPTrail: P.trail, uPReact: P.react, uPSprite: Math.max(0, SPRITES.indexOf(P.sprite)), uPTime: time,
    uPColorMode: Math.max(0, COLOR_MODES.indexOf(P.colorMode)), uPMinSize: P.minSize, uPMaxSize: P.maxSize, uPMaxLight: P.maxLight, uPC0: hex(P.colors[0]), uPC1: hex(P.colors[1]), uPC2: hex(P.colors[2]) });

  function makeRenderer(canvas) {
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: true, premultipliedAlpha: true });
    if (!gl) throw new Error("no WebGL2");
    const float = !!gl.getExtension("EXT_color_buffer_float");
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    const shader = (type, src) => {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    const vs = shader(gl.VERTEX_SHADER, VS);
    // Compiling is started here and never waited on: with KHR_parallel_shader_compile the driver compiles in the
    // background and ready() only peeks, so a page with many orbs stays usable while they load. Without the
    // extension the first ready() waits, like before.
    const par = gl.getExtension("KHR_parallel_shader_compile");
    const program = src => {
      const fs = gl.createShader(gl.FRAGMENT_SHADER); gl.shaderSource(fs, src); gl.compileShader(fs);
      const p = gl.createProgram(); gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p);
      return { p, fs, u: null };
    };
    const ready = prog => {
      if (prog.u) return true;
      if (prog.err) throw prog.err;
      if (par && !gl.getProgramParameter(prog.p, par.COMPLETION_STATUS_KHR)) return false;
      if (!gl.getProgramParameter(prog.p, gl.LINK_STATUS)) { prog.err = new Error(gl.getShaderInfoLog(prog.fs) || gl.getProgramInfoLog(prog.p)); throw prog.err; }
      const u = {}; const n = gl.getProgramParameter(prog.p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) { const nm = gl.getActiveUniform(prog.p, i).name; u[nm.replace("[0]", "")] = gl.getUniformLocation(prog.p, nm); }
      prog.u = u; return true;
    };
    // One context can draw many rings: each ring's program (and its exposure) is kept by its GLSL.
    const rings = new Map();
    // ponytail: every version stays compiled (an edited shape makes one per change); fine for a page, clear it if it ever lives long.
    const ringFor = glsl => { let r = rings.get(glsl); if (!r) {
      r = { prog: program(PRE + glsl + (/\bparticle\s*\(/.test(glsl) ? "" : "\n" + SHAPES.orbit)
        + (/\bbody\s*\(/.test(glsl) ? "" : "\n" + BODIES.sphere) + POST), gain: 1, frame: 0 }; rings.set(glsl, r); } return r; };
    const down = program(FS_DOWN), blur = program(FS_BLUR), finish = program(FS_FINISH);
    const tex = (w, hh, intern, fmt, type) => {
      const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, intern, w, hh, 0, fmt, type, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return t;
    };
    const specTex = tex(NB, HIST, gl.R8, gl.RED, gl.UNSIGNED_BYTE), waveTex = tex(128, 1, gl.R8, gl.RED, gl.UNSIGNED_BYTE);
    gl.bindTexture(gl.TEXTURE_2D, waveTex); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    const target = (w, hh) => {
      const t = float ? tex(w, hh, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT) : tex(w, hh, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE);
      const fb = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      return { t, fb, w, h: hh };
    };
    let T = null, dims = "";
    const fit = (w, hh) => {
      if (dims === `${w}x${hh}`) return;
      if (T) for (const d of Object.values(T)) { gl.deleteTexture(d.t); gl.deleteFramebuffer(d.fb); }
      const q = [Math.max(1, w >> 2), Math.max(1, hh >> 2)], e = [Math.max(1, w >> 3), Math.max(1, hh >> 3)];
      T = { scene: target(w, hh), a1: target(...q), b1: target(...q), a2: target(...e), b2: target(...e) };
      dims = `${w}x${hh}`;
    };
    const pass = (d, prog, uniforms, texs) => {
      // Unbind all units first, or a target can still be bound as a source (feedback loop) and Chrome skips the pass.
      for (let i = 0; i < 4; i++) { gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, null); }
      gl.bindFramebuffer(gl.FRAMEBUFFER, d ? d.fb : null);
      gl.viewport(0, 0, d ? d.w : canvas.width, d ? d.h : canvas.height);
      gl.useProgram(prog.p);
      for (const [k, v] of Object.entries(uniforms)) { const l = prog.u[k]; if (!l) continue;
        !Array.isArray(v) ? gl.uniform1f(l, v) : v.length === 3 ? gl.uniform3f(l, v[0], v[1], v[2]) : gl.uniform2f(l, v[0], v[1]); }
      (texs || []).forEach(([name, t], i) => { gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, t); if (prog.u[name]) gl.uniform1i(prog.u[name], i); });
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    return {
      compile(glsl) { ringFor(glsl); },
      // true when compiled, false while still compiling, throws the compile error.
      status(glsl) { return ready(ringFor(glsl).prog); },
      // Draws and returns true; returns false (drawing nothing) while the shaders are still compiling.
      draw(glsl, voice, t, lk, dim = 1) {
        const G = ringFor(glsl), ring = G.prog;
        if (!ready(ring) || !ready(down) || !ready(blur) || !ready(finish)) return false;
        const w = canvas.width, hh = canvas.height;
        fit(w, hh);
        gl.bindTexture(gl.TEXTURE_2D, specTex); gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, NB, HIST, gl.RED, gl.UNSIGNED_BYTE, voice.hist);
        gl.bindTexture(gl.TEXTURE_2D, waveTex); gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 128, 1, gl.RED, gl.UNSIGNED_BYTE, voice.waveBytes);
        pass(T.scene, ring, { uTime: t, uLevel: voice.level, uPitch: voice.pitch, uPulse: voice.pulse, uPx: 230 / hh,
          uHue: lk.hueShift, uSat: lk.saturation, uBallStyle: lk.sphere, uRingGain: lk.lighting * G.gain * dim, uSpin: lk.spin, uSize: lk.size, uParticles: lk.particles || 0, ...particleUniforms(lk.pstyle || PSTYLE, lk.ptime ?? t) },
          [["uSpec", specTex], ["uWave", waveTex]]);
        pass(T.a1, down, { uTexel: [0.5 / w, 0.5 / hh] }, [["uTex", T.scene.t]]);
        pass(T.b1, blur, { uDir: [1 / T.a1.w, 0] }, [["uTex", T.a1.t]]);
        pass(T.a1, blur, { uDir: [0, 1 / T.a1.h] }, [["uTex", T.b1.t]]);
        pass(T.a2, down, { uTexel: [0.5 / T.a1.w, 0.5 / T.a1.h] }, [["uTex", T.a1.t]]);
        pass(T.b2, blur, { uDir: [2 / T.a2.w, 0] }, [["uTex", T.a2.t]]);
        pass(T.a2, blur, { uDir: [0, 2 / T.a2.h] }, [["uTex", T.b2.t]]);
        // Auto exposure: measure the light in the smallest bloom layer and turn down when it is too bright.
        // ponytail: targets by eye (mean 0.07, max 12% bright).
        if (G.frame++ % 6 === 0 && dim === 1) {
          const n = T.a2.w * T.a2.h, buf = float ? new Float32Array(n * 4) : new Uint8Array(n * 4);
          gl.bindFramebuffer(gl.FRAMEBUFFER, T.a2.fb);
          gl.readPixels(0, 0, T.a2.w, T.a2.h, gl.RGBA, float ? gl.FLOAT : gl.UNSIGNED_BYTE, buf);
          const k = float ? 1 : 1 / 255; let sum = 0, hot = 0;
          for (let i = 0; i < buf.length; i += 4) { const L = (0.2126 * buf[i] + 0.7152 * buf[i + 1] + 0.0722 * buf[i + 2]) * k; sum += L; if (L > 0.6) hot++; }
          const mean = sum / n, part = hot / n;
          // Tone down lowers what auto exposure aims for, so it does not simply turn the light back up.
          const tn = 1 - 0.6 * Math.max(0, Math.min(1, lk.tone || 0)), aim = 0.07 * tn, cap = 0.12 * tn;
          const goal = Math.min(1.1, aim / Math.max(mean, 1e-4), part > cap ? G.gain * cap / part : 9);
          G.gain += (Math.max(0.12, goal) - G.gain) * (G.frame < 30 ? 0.6 : 0.15);
        }
        // Tone down: one knob for the whole orb, less exposure, less bloom, less white.
        const tone = Math.max(0, Math.min(1, lk.tone || 0));
        pass(null, finish, { uTone: tone, uGlow: lk.glow * (1 - 0.6 * tone), uLighting: 1 - 0.45 * tone, uGrain: lk.grain, uChroma: lk.chroma, uTime: t },
          [["uScene", T.scene.t], ["uBloom1", T.a1.t], ["uBloom2", T.a2.t]]);
        return true;
      },
      // Browsers keep only about 16 WebGL contexts; give this one back at once.
      lose() { gl.getExtension("WEBGL_lose_context")?.loseContext(); },
    };
  }

  // How each TalkOrb state drives the scene: which voice, how fast time runs, how much colour and light.
  const ORB3D_STATES = {
    rest:       { voice: "silent", speed: 1 },
    talking:    { voice: "measured", speed: 1 },
    expression: { voice: "fake", speed: 1.6, hueDrift: 0.06, glow: 1.4 },
    listening:  { voice: "silent", speed: 1 },
    thinking:   { voice: "silent", speed: 3 },
    muted:      { voice: "silent", speed: 0.4, sat: 0.25, dim: 0.35 },
    away:       { voice: "silent", speed: 0, sat: 0, dim: 0.4 },
  };

  // Her orb in 3D: a glass ball and a shader ring, with the TalkOrb states. `particles` 0..1 adds motes round
  // the ball in 3D, riding the voice; `shape` is where they go: a name from Orb3D.shapes or your own particle() GLSL.
  // `particleStyle` { count, lines, size, trail, react, speed, sprite, colors: [start, mid, end], colorMode } tunes them;
  // each shape starts from its own (Orb3D.shapeStyle); minSize/maxSize/maxLight cap each mote. `tone` 0..1 turns the
  // whole orb down (exposure, bloom, white). `material` is the body's surface: glass (default), matte,
  // pearl, plasma, chrome, hologram.
  // `body` is the glass body: a name from Orb3D.bodies (sphere, cube, triangle, donut, gem) or your own body() GLSL.
  // `ring: "none"` leaves only the ball and the particles. `onError(message|null)` hears when your GLSL does not compile. `ring` is a name from
  // Orb3D.rings (the 28 shader rings that ship in the bundle) or your own GLSL `void ring(vec2 p, out vec3 behind, out vec3 front)`. `analyser` feeds
  // "talking"; without one she talks with a made-up voice. Falls back to the flat Orb without WebGL2.
  // The shader source for a ring, particle shape and body (names or your own GLSL), with the ring's look.
  function source({ ring = "deepsea", shape = "orbit", body = "sphere", material, look, particleStyle } = {}) {
    const preset = RINGS[ring], lk = lookFrom({ ...(preset ? preset.look : {}), ...look });
    if (material) lk.sphere = Math.max(0, MATERIALS.indexOf(material));
    return { src: [ring === "none" ? NO_RING : preset ? preset.glsl : ring, SHAPES[shape] || shape, BODIES[body] || body].join("\n"),
      look: lk, pstyle: { ...PSTYLE, ...STYLE[shape], ...particleStyle } };
  }

  function Orb3D({ size = 160, state = "rest", ring = "deepsea", particles = 0, shape = "orbit", body = "sphere", material, particleStyle, tone = 0, look, analyser, onPress, onError }) {
    const ref = React.useRef(null), live = React.useRef({});
    const [flat, setFlat] = React.useState(false);
    const { src, look: lk, pstyle } = source({ ring, shape, body, material, look, particleStyle });
    live.current = { src, onError, cfg: ORB3D_STATES[state] || ORB3D_STATES.rest, analyser, lk: { ...lk, particles, pstyle, tone } };
    React.useEffect(() => {
      const cv = ref.current, px = Math.round(size * Math.min(2, window.devicePixelRatio || 1));
      cv.width = cv.height = px;
      // The context and shaders are only made once the orb is in view.
      let R = null, good = null, failed = null;
      const voice = makeVoice(() => { const L = live.current; return L.cfg.voice === "measured" ? (L.analyser || "fake") : L.cfg.voice === "fake" ? "fake" : null; });
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let raf, prev = 0, clock = 0, pclock = 0, visible = false;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(cv);
      const frame = ms => {
        raf = requestAnimationFrame(frame);
        if (!visible) return;
        if (!R) { try { R = makeRenderer(cv); } catch (e) { console.warn("Orb3D:", e.message); cancelAnimationFrame(raf); setFlat(true); return; } }
        const now = ms / 1000, dt = Math.min(0.05, now - prev); prev = now;
        const { cfg, lk, src, onError } = live.current;
        // A new ring or shape compiles on the fly; one that does not compile keeps the last good one and reports why.
        if (src !== good && src !== failed) {
          try { if (R.status(src)) { good = src; onError && onError(null); } } catch (e) { failed = src;
            // Line numbers counted from the top of that formula (particle or body), not the whole shader.
            const lines = (PRE + src).split("\n"), starts = [];
            lines.forEach((l, i) => { if (/^\s*(vec3 particle|float body|#define DEPTH|void ring)\b/.test(l)) starts.push(i); });
            onError && onError(String(e.message).replace(/ERROR: 0:(\d+):/g, (_, n) => {
              const s0 = starts.filter(x => x < n).pop() ?? 0; return "line " + (n - s0) + ":"; })); }
        }
        clock += dt * cfg.speed * (still ? 0.15 : 1);
        pclock += dt * cfg.speed * lk.pstyle.speed * (still ? 0.15 : 1);
        voice.update(now);
        if (good) R.draw(good, voice, clock, { ...lk,
          saturation: cfg.sat ?? lk.saturation,
          hueShift: lk.hueShift + (cfg.hueDrift || 0) * clock,
          glow: lk.glow * (cfg.glow || 1), ptime: pclock }, cfg.dim || 1);
      };
      raf = requestAnimationFrame(frame);
      return () => { cancelAnimationFrame(raf); io.disconnect(); R && R.lose(); };
    }, [size]);
    const Tag = onPress ? "button" : "div";
    return h(Tag, { className: cx("iris-orb3d", `iris-orb3d-${state}`), onClick: onPress, "aria-label": onPress ? "Hold to talk" : "Iris",
      style: { width: size, height: size, "--s": size + "px" } },
      flat ? h(Orb, { size: size * 0.45, state: state === "away" ? "away" : "idle" }) : h("canvas", { ref, className: "iris-orb3d-canvas" }),
      state === "listening" ? [0, 1, 2].map(i => h("i", { key: i, className: "iris-orb3d-echo", style: { animationDelay: `${i * 0.45}s` } })) : null,
      state === "thinking" ? h("i", { className: "iris-orb3d-arc" }) : null,
      state === "muted" ? h("svg", { className: "iris-talkorb-muted-mic", width: size * 0.2, height: size * 0.2, viewBox: "0 0 24 24", "aria-hidden": true },
        h("rect", { x: 8.5, y: 2.5, width: 7, height: 12, rx: 3.5, fill: "currentColor" }),
        h("path", { d: "M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" }),
        h("path", { className: "gap", d: "M4 3l16 18", stroke: "#0a0d14", strokeWidth: 5, strokeLinecap: "round" }),
        h("path", { className: "line", d: "M4 3l16 18", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" })) : null);
  }
  Orb3D.rings = Object.keys(RINGS);
  Orb3D.shapes = Object.keys(SHAPES);
  Orb3D.shapeGlsl = key => SHAPES[key];
  Orb3D.shapeStyle = key => ({ ...PSTYLE, ...STYLE[key] });
  Orb3D.sprites = SPRITES; Orb3D.colorModes = COLOR_MODES; Orb3D.materials = MATERIALS;
  Orb3D.bodies = Object.keys(BODIES);
  Orb3D.bodyGlsl = key => BODIES[key];
  Orb3D.source = source;
  Orb3D.ringName = key => RINGS[key] && RINGS[key].name;
  Orb3D.ringGlsl = key => RINGS[key] && RINGS[key].glsl;
  // For a page that shows many rings at once: one context draws them all, copied into 2D canvases.
  Orb3D.makeRenderer = makeRenderer; Orb3D.makeVoice = makeVoice; Orb3D.look = key => lookFrom(RINGS[key] ? RINGS[key].look : {});

  // A placeholder while something comes from the house: a glass block with a sheen, same shape as the
  // real card. `screen` gives the whole-screen version (title line, big card, two rows).
  function Skeleton({ height = 64, width, screen }) {
    if (screen) return h("div", { className: "iris-skeleton-screen" },
      h(Skeleton, { height: 26, width: "55%" }), h(Skeleton, { height: 150 }), h(Skeleton, null), h(Skeleton, null));
    return h("div", { className: "iris-skeleton", style: { height, width } });
  }

  // Section header on a page: small mono caps, wide tracking, faint.
  function SectionLabel({ children }) { return h("div", { className: "iris-section" }, children); }

  // Preview wrapper: the app's near-black background and system font.
  function PreviewI18nProvider({ children }) { return h("div", { className: "iris-root" }, children); }

  window.IrisUi = { Icon, Card, Row, Toggle, Button, Orb, StatusPill, TalkOrb, Orb3D, TabBar, Skeleton, SectionLabel, PreviewI18nProvider };
})();

// The screen design system, as React parts:
// topic colours, widgets, the phase ring of a loop, pen marks with pressure, the handwritten anchor, lettering
// that keeps its contrast, the button set and page dots. Values are the live code's; the rules are the golden key.
(() => {
  const h = React.createElement;
  const { useRef, useEffect, useLayoutEffect, useState } = React;
  const cx = (...xs) => xs.filter(Boolean).join(" ");
  const TAU = Math.PI * 2;
  const still = () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const warn = (m) => console.warn("[IrisUi] " + m);

  // ---------- Topic colours: k = accent and pen, k2 = second tint, kd = dark ground ----------
  const TOPIC = {
    groceries: ["#4ade80", "#38bdf8", "#04241f"], agenda: ["#7dd3fc", "#e8f2f7", "#08183a"], mail: ["#a78bfa", "#8b5cf6", "#18123c"],
    parcel: ["#fbbf24", "#fde68a", "#221a0e"], weather: ["#38bdf8", "#e8f2f7", "#081a34"], tasks: ["#f0abfc", "#c026d3", "#2c0b26"],
    sport: ["#fb7185", "#f0abfc", "#2a0f18"], money: ["#a7f3d0", "#4ade80", "#062016"], travel: ["#2ee6d6", "#7dd3fc", "#052331"],
    health: ["#2ee6d6", "#7dd3fc", "#052331"], home: ["#fde68a", "#fbbf24", "#1f1a0e"], music: ["#c4b5fd", "#8b5cf6", "#161433"],
    loop: ["#7dd3fc", "#4ade80", "#08183a"], explain: ["#a78bfa", "#7dd3fc", "#18123c"], party: ["#f0abfc", "#8b5cf6", "#2c0b26"],
  };
  const topicOf = (name) => {
    if (!name) return null;
    const n = String(name).toLowerCase(), k = TOPIC[n];
    if (!k) warn(`topic "${name}" does not exist: ${Object.keys(TOPIC).join(", ")}`);
    return k || null;
  };
  // The primary button: the accent at a fixed lightness and chroma (oklch .82 / .12), dark ink on it.
  const RELATIVE = typeof CSS !== "undefined" && CSS.supports && CSS.supports("color", "oklch(from red .82 .12 h)");
  const buttonOf = (k) => (RELATIVE ? `oklch(from ${k} .82 .12 h)` : k);
  const varsOf = (k) => (k ? { "--k": k[0], "--k2": k[1], "--kd": k[2], "--k-button": buttonOf(k[0]) } : undefined);
  const topicStyle = (name) => varsOf(topicOf(name));

  // A part inside <Topic> takes its colours; `topic` on the part itself wins.
  function Topic({ name, children }) { return h("div", { className: "iris-topic", style: topicStyle(name) }, children); }

  // ---------- Contrast: lettering on a dark ground is lightened until it reads (WCAG 4.5) ----------
  const rgb = (x) => { const n = parseInt(x.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const hex = (a) => "#" + a.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
  const lum = (x) => { const c = rgb(x).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const contrast = (x, y) => { const a = lum(x), b = lum(y); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05); };
  const readable = (colour, ground) => { let k = colour; for (let i = 0; i < 12 && contrast(k, ground) < 4.5; i++) k = hex(rgb(k).map((v) => v + (255 - v) * 0.15)); return k; };
  const ground = (kd) => { const a = rgb(kd), b = [7, 9, 12], w = a[0] > a[2] + 10 ? 0.45 : 0.85; return hex(a.map((v, i) => b[i] + (v - b[i]) * w)); };

  // ---------- One of a kind per screen (pen, anchor): the second one is drawn plain ----------
  const firstOfKind = (el, kind) => {
    const root = (el && el.closest && el.closest(".iris-screen, .iris-root")) || document.body;
    const all = [...root.querySelectorAll(`[data-one="${kind}"]`)];
    if (all[0] === el) return true;
    warn(`a screen holds one ${kind}; this one is drawn plain. Keep the one that matters most.`);
    return false;
  };

  // ---------- A canvas that draws every frame; still (reduced motion) = the end state, drawn once ----------
  function useCanvas(draw, deps) {
    const ref = useRef(null);
    useEffect(() => {
      const cv = ref.current; if (!cv) return;
      const ctx = cv.getContext("2d"), dpr = Math.min(3, window.devicePixelRatio || 1);
      let W = 0, H = 0, raf = 0;
      const size = () => { const b = cv.getBoundingClientRect(); W = b.width; H = b.height; cv.width = W * dpr; cv.height = H * dpr; };
      const frame = (ms) => { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw(ctx, W, H, still() ? 0.6 : ms / 1000); if (!still()) raf = requestAnimationFrame(frame); };
      size(); raf = requestAnimationFrame(frame);
      const ro = new ResizeObserver(() => { size(); if (still()) frame(0); }); ro.observe(cv);
      return () => { cancelAnimationFrame(raf); ro.disconnect(); };
    }, deps);
    return ref;
  }

  // ---------- Patterns behind a widget: slow, in the topic's two tints ----------
  const PATTERNS = ["lanes", "grid", "bubbles", "band", "rain", "drift"];
  const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const drawPattern = (ctx, w, hh, kind, palette, t) => {
    ctx.clearRect(0, 0, w, hh);
    const pill = (x, y, l, d, c, a) => { ctx.globalAlpha = a; ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(x - l / 2, y - d / 2, l, d, d / 2); ctx.fill(); };
    if (kind === "lanes") {
      const rows = Math.max(2, Math.round(hh / 28));
      for (let l = 0; l < rows; l++) for (let j = 0; j < 3; j++) {
        const step = (w + 120) / 3, x = ((j / 3 + (l % 2 ? 1 : -1) * t * 0.04 * (1 + (l % 3) * 0.4)) % 1 + 1) % 1 * (w + 120) - 60;
        pill(x, (l + 0.5) * hh / rows, step * (0.35 + 0.25 * hash(l * 9 + j)), 11, palette[(l + j) % 2], 0.3);
      }
    } else if (kind === "grid") {
      const sp = 30, beat = Math.floor(t / 0.48);
      for (let r = 0; r < Math.ceil(hh / sp); r++) for (let q = 0; q < Math.ceil(w / sp); q++) {
        const i = r * 50 + q, on = hash(i + beat * 7) < 0.1 ? Math.exp(-(t - beat * 0.48) * 4) : 0;
        ctx.globalAlpha = 0.16 + 0.45 * on; ctx.strokeStyle = ctx.fillStyle = palette[i % 2]; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.roundRect(q * sp + 5, r * sp + 5, sp - 10, sp - 10, 5); on > 0.2 ? ctx.fill() : ctx.stroke();
      }
    } else if (kind === "bubbles" || kind === "rain") {
      const n = kind === "rain" ? 26 : 16;
      for (let i = 0; i < n; i++) {
        ctx.globalAlpha = 0.3; ctx.strokeStyle = palette[i % 2]; ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.beginPath();
        if (kind === "rain") { const x = ((i * 0.618) % 1) * w, y = ((hash(i) + t * (0.5 + hash(i + 2) * 0.3)) % 1) * (hh + 30) - 15; ctx.moveTo(x, y); ctx.lineTo(x - 3, y + 12); }
        else { const y = hh + 20 - ((hash(i) + t * (0.05 + hash(i + 3) * 0.05)) % 1) * (hh + 40), x = ((i * 0.618) % 1) * w + Math.sin(t + i) * 6; ctx.arc(x, y, 5 + hash(i + 7) * 9, 0, TAU); }
        ctx.stroke();
      }
    } else if (kind === "band") {
      const step = Math.floor(t / 0.96) + Math.min(1, ((t / 0.96) % 1) / 0.35), rows = Math.max(2, Math.round(hh / 80));
      for (let r = 0; r < rows; r++) for (let i = 0; i < 6; i++) {
        const x = ((i * 70 - step * 70 * (r % 2 ? -1 : 1)) % 420 + 420) % 420 - 50, y = (r + 0.5) * hh / rows;
        ctx.globalAlpha = 0.28; ctx.strokeStyle = palette[(i + r) % 2]; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(x - 26, y - 17, 52, 34, 8); ctx.stroke();
      }
    } else {
      for (let i = 0; i < 9; i++) {
        const u = Math.sqrt((i + 0.5) / 9), a = i * 2.39996 + t * 0.08, x = w / 2 + Math.cos(a) * u * w * 0.55, y = hh / 2 + Math.sin(a) * u * hh * 0.55;
        ctx.globalAlpha = 0.3; ctx.fillStyle = ctx.strokeStyle = palette[i % 2]; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(x, y, 4 + hash(i) * 7, 0, TAU); i % 3 ? ctx.stroke() : ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  };
  function Pattern({ kind, palette }) {
    const ref = useCanvas((ctx, w, hh, t) => drawPattern(ctx, w, hh, kind, palette, t), [kind, palette.join()]);
    return h("canvas", { ref, className: "iris-fill", "aria-hidden": "true" });
  }

  // ---------- Anchor: the one handwritten note per screen, in the topic's pen colour ----------
  function Anchor({ children }) {
    const ref = useRef(null);
    const [plain, setPlain] = useState(false);
    useLayoutEffect(() => { if (!firstOfKind(ref.current, "anchor")) setPlain(true); }, []);
    return h("span", { ref, className: plain ? "iris-anchor-plain" : "iris-anchor", "data-one": "anchor" }, children);
  }

  // ---------- Widget: glass, pattern, ring or list, in four sizes ----------
  const LOOKS = ["glass", "pattern", "ring", "list"];
  const SIZES = ["small", "wide", "tall", "large"];
  const rowsOf = (items, done, max, tick) => {
    const a = (Array.isArray(items) ? items : []).map((x) => (Array.isArray(x) ? x : [null, x]));
    const d = Math.max(0, Math.min(a.length, Number(done) || 0)), open = a.slice(d, d + max);
    return h("ul", { className: cx("iris-rows", tick && "tick") },
      d > 0 ? h("li", { className: "folded" }, h("span", null, `${d} done`)) : null,
      open.map(([left, right], i) => h("li", { key: i }, left != null ? h("b", null, String(left)) : null, h("span", null, String(right == null ? "" : right)))));
  };
  function Ring({ progress, value, unit, size = 120 }) {
    const r = size / 2 - 8, circumference = TAU * r, v = Math.max(0, Math.min(1, Number(progress) || 0));
    return h("div", { className: "iris-ring", style: { width: size, height: size } },
      h("svg", { viewBox: `0 0 ${size} ${size}`, "aria-hidden": "true" },
        h("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: "var(--iris-track)", strokeWidth: 8 }),
        h("circle", { cx: size / 2, cy: size / 2, r, fill: "none", stroke: "var(--k, var(--accent))", strokeWidth: 8, strokeLinecap: "round",
          strokeDasharray: `${circumference * v} ${circumference}`, transform: `rotate(-90 ${size / 2} ${size / 2})` })),
      h("div", { className: "iris-mid" }, h("b", { className: "iris-wvalue", style: String(value == null ? "" : value).length > 3 ? { fontSize: 24 } : undefined }, value), unit ? h("span", null, unit) : null));
  }
  function Widget({ topic, look = "glass", size = "small", label, value, unit, items, done, progress, pattern = "lanes", note, bleed }) {
    const own = topicOf(topic), k = own || ["#7dd3fc", "#e8f2f7", "#08183a"];
    if (!LOOKS.includes(look)) warn(`Widget look "${look}" does not exist: ${LOOKS.join(", ")}`);
    if (!SIZES.includes(size)) warn(`Widget size "${size}" does not exist: ${SIZES.join(", ")}`);
    const big = size === "wide" || size === "large", tall = size === "tall" || size === "large";
    const inHead = look === "ring" || look === "list";
    const head = h("div", { className: "iris-whead" }, label ? h("span", null, label) : null, inHead && note ? h(Anchor, null, note) : null);
    let body;
    if (look === "ring") body = [head, h(Ring, { progress, value, unit, size: tall ? 150 : big ? 118 : 104 }), tall && items ? rowsOf(items, done, 3) : null];
    else if (look === "list") body = [head, h("div", { className: "iris-wbig" }, value, unit ? h("span", null, ` ${unit}`) : null), rowsOf(items, done, tall ? 6 : big ? 3 : 2, true)];
    else body = [look === "pattern" ? h(Pattern, { kind: pattern, palette: [k[0], k[1]] }) : null, head, h("div", { className: "iris-push" }),
      h("div", { className: "iris-wvalue" }, value), unit || note ? h("div", { className: "iris-wunit" }, unit, note ? h(Anchor, null, note) : null) : null,
      tall && items ? h("div", { className: "iris-wpanel" }, rowsOf(items, done, 4)) : null];
    return h("div", { className: cx("iris-widget", `iris-look-${look}`, `iris-w-${size}`, bleed && "iris-bleed"), style: varsOf(own),
      "data-busy": look === "pattern" ? 2 : look === "ring" ? 1 : 0 }, ...body.map((x, i) => x && React.cloneElement(x, { key: i })));
  }

  // ---------- PhaseRing: a loop as six phases, each its own colour; the current one runs as an hourglass ----------
  const PHASES = ["recognised", "planned", "busy", "you", "check", "done"];
  const PHASE_COLOURS = ["#a78bfa", "#7dd3fc", "#2ee6d6", "#f0abfc", "#fbbf24", "#4ade80"];
  const phaseOf = (p) => {
    if (typeof p === "number") return Math.max(0, Math.min(5, Math.round(p)));
    const s = String(p == null ? "" : p).toLowerCase(), i = PHASES.indexOf(s === "seen" ? "recognised" : s);
    if (i < 0) warn(`PhaseRing phase "${p}" does not exist: ${PHASES.join(", ")} (or 0-5)`);
    return Math.max(0, i);
  };
  const drawRing = (ctx, W, now, progress, t, rr = 0.4) => {
    const c = W / 2, R = W * rr, gap = 0.09, all = now === 5 && progress >= 1;
    ctx.clearRect(0, 0, W, W); ctx.lineCap = "round";
    for (let i = 0; i < 6; i++) {
      const a0 = -Math.PI / 2 + (i / 6) * TAU + gap, a1 = -Math.PI / 2 + ((i + 1) / 6) * TAU - gap, col = PHASE_COLOURS[i];
      ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      if (i === now && !all) {
        // The hourglass: sand piles up at the END of the phase and grows back toward its start; the grain falls from the start.
        const v = Math.max(0.04, Math.min(1, progress)), av = a1 - (a1 - a0) * v;
        ctx.strokeStyle = "#1e2a3a"; ctx.lineWidth = W * 0.05; ctx.beginPath(); ctx.arc(c, c, R, a0, a1); ctx.stroke();
        ctx.strokeStyle = col; ctx.shadowColor = col; ctx.shadowBlur = W * (0.05 + 0.03 * Math.sin(t * 2.4));
        ctx.beginPath(); ctx.arc(c, c, R, av, a1); ctx.stroke();
        const u = (t * 0.5) % 1, ak = a0 + (av - a0) * u * u;
        ctx.shadowBlur = W * 0.03; ctx.fillStyle = "#e0f2fe"; ctx.globalAlpha = still() ? 0 : 0.9 * Math.sin(u * Math.PI);
        ctx.beginPath(); ctx.arc(c + Math.cos(ak) * R, c + Math.sin(ak) * R, W * 0.012, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
        ctx.shadowBlur = 0; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(c + Math.cos(av) * R, c + Math.sin(av) * R, W * 0.02, 0, TAU); ctx.fill();
      } else if (i < now || all) {
        ctx.strokeStyle = col; ctx.globalAlpha = all ? 1 : 0.8; ctx.lineWidth = W * 0.04;
        if (all) { ctx.shadowColor = col; ctx.shadowBlur = W * (0.03 + 0.02 * Math.sin(t * 2 + i)); }
        ctx.beginPath(); ctx.arc(c, c, R, a0, a1); ctx.stroke();
      } else { ctx.strokeStyle = "#2a323d"; ctx.lineWidth = W * 0.03; ctx.beginPath(); ctx.arc(c, c, R, a0, a1); ctx.stroke(); }
    }
  };
  // The middle of the ring: none (text only), glass (a frosted disc), pattern (lanes in the disc), word (a ThemeWord in the disc).
  const CENTERS = ["none", "glass", "pattern", "word"];
  const drawCenter = (ctx, W, kind, word, palette, t, rr = 0.4) => {
    ctx.clearRect(0, 0, W, W);
    if (kind === "none") return;
    const c = W / 2, r = W * Math.max(0.255, rr - 0.07); // as big as the ring allows, clear of its stroke
    ctx.save(); ctx.beginPath(); ctx.arc(c, c, r, 0, TAU); ctx.clip();
    if (kind === "word") { ctx.translate(c - r, c - r); drawTheme(ctx, r * 2, r * 2, word, THEMES[palette] ? palette : "frozen", t); }
    else {
      const g = ctx.createRadialGradient(c, c - W * 0.07, W * 0.045, c, c, r * 1.05); g.addColorStop(0, "#16202c"); g.addColorStop(1, "#0b1017");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, W);
      if (kind === "pattern") {
        // the lanes stay quiet and fade out under the text, so the title always reads
        ctx.save(); ctx.globalAlpha = 0.5; ctx.translate(c - r, c - r); drawPattern(ctx, r * 2, r * 2, "lanes", ["#4ade80", "#6b7686"], t); ctx.restore();
        const s = ctx.createRadialGradient(c, c, 0, c, c, r); s.addColorStop(0, "#0b1017f2"); s.addColorStop(0.55, "#0b1017cc"); s.addColorStop(1, "#0b101700");
        ctx.fillStyle = s; ctx.fillRect(0, 0, W, W);
      }
    }
    ctx.restore();
    ctx.strokeStyle = "#ffffff14"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(c, c, r, 0, TAU); ctx.stroke();
  };
  // labels: the six phase names around the ring (the ring then sits at 29% so they fit); pen: a hand-drawn circle
  // round the current label (it is the screen's one pen mark); center: what fills the middle.
  function PhaseRing({ phase, progress = 0.35, eyebrow, title, sub, size = 220, labels, pen, center = "none", word, theme = "frozen" }) {
    const now = phaseOf(phase), v = Number(progress) || 0, rr = labels ? 0.29 : 0.4;
    if (!CENTERS.includes(center)) warn(`PhaseRing center "${center}" does not exist: ${CENTERS.join(", ")}`);
    const ref = useCanvas((ctx, W, H, t) => drawRing(ctx, Math.min(W, H), now, v, t, rr), [now, v, rr]);
    const mid = useCanvas((ctx, W, H, t) => drawCenter(ctx, Math.min(W, H), center, word || title || "", theme, t, rr), [center, word, title, theme, rr]);
    const names = PHASES, w = names[now];
    return h("div", { className: cx("iris-phase", labels && "labelled"), style: { width: size, height: size, "--phase": PHASE_COLOURS[now] }, "data-busy": 2,
      role: "img", "aria-label": `${title || ""} ${w}` },
      h("canvas", { ref, className: "iris-fill", "aria-hidden": "true" }),
      h("canvas", { ref: mid, className: "iris-fill", "aria-hidden": "true" }),
      labels ? names.map((n, i) => {
        const a = -Math.PI / 2 + ((i + 0.5) / 6) * TAU, d = size * 0.29 + size * 0.134;
        const lab = h("span", { className: cx("iris-phase-label", i === now && "now"), style: { left: size / 2 + Math.cos(a) * d, top: size / 2 + Math.sin(a) * d } },
          i === now && pen ? h(Pen, { kind: "circle" }, n) : n);
        return React.cloneElement(lab, { key: n });
      }) : null,
      center === "word" ? null : h("div", { className: "iris-mid" },
        h("span", { className: "iris-phase-word" }, eyebrow || w),
        title ? h("b", { className: labels ? "iris-gradient" : undefined }, title) : null, sub ? h("span", { className: "iris-phase-sub" }, sub) : null));
  }

  // ---------- LoopScreen: one loop in detail (the loop-detail pattern, loop screen 29-09) ----------
  // The PhaseRing with labels and the pen circle, a glass NOW card with a dot per phase, page dots in the phase colour,
  // Done and In Loops, and confetti once when it reaches done.
  const confetti = (cv) => {
    const ctx = cv.getContext("2d"), b = cv.getBoundingClientRect(), W = (cv.width = b.width), H = (cv.height = b.height), P = ["#7dd3fc", "#4ade80", "#8b5cf6", "#f0abfc", "#fbbf24"], st = [], t0 = performance.now();
    for (let i = 0; i < 40; i++) { const a = Math.random() * TAU, v = 150 + Math.random() * 250; st.push({ x: W / 2, y: H * 0.3, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 150, r: Math.random() * 6, k: P[i % 5] }); }
    const f = (ms) => {
      const a = (ms - t0) / 1600, dt = 1 / 60; ctx.clearRect(0, 0, W, H); if (a > 1) return;
      for (const p of st) { p.vy += 600 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += 0.2; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = 1 - a; ctx.fillStyle = p.k; ctx.fillRect(-3, -1.5, 6, 3); ctx.restore(); }
      requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  };
  function LoopScreen({ title, when, sub, phase = "planned", progress = 0.35, now: nowText, center = "none", pen = true, onDone, onLoops, doneLabel = "Done", loopsLabel = "In Loops" }) {
    const i = phaseOf(phase), cref = useRef(null), col = PHASE_COLOURS[i], next = PHASE_COLOURS[Math.min(5, i + 1)];
    useEffect(() => { if (i === 5 && !still() && cref.current) confetti(cref.current); }, [i]);
    return h("div", { className: "iris-loop iris-screen", style: { "--k": col, "--k2": next } },
      h(PhaseRing, { phase: i, progress: i === 5 ? 1 : progress, eyebrow: when, title, sub, size: 268, labels: true, pen, center, word: title }),
      h("div", { className: "iris-nowcard" },
        h("span", { className: "iris-nowcard-head" }, "Now"), h("b", null, PHASES[i]),
        nowText ? h("span", { className: "iris-nowcard-text" }, nowText) : null,
        h("span", { className: "iris-nowcard-dots" }, PHASES.map((p, j) => h("i", { key: p, className: j < i || i === 5 ? "done" : undefined })))),
      h("div", { className: "iris-btngroup" }, h(window.IrisUi.Button, { variant: "glass", onClick: onDone }, doneLabel), h(window.IrisUi.Button, { variant: "ghost", onClick: onLoops }, loopsLabel)),
      h("div", { className: "iris-loop-dots" }, h(PageDots, { count: 6, active: i, vertical: true })),
      h("canvas", { ref: cref, className: "iris-fill", "aria-hidden": "true" }));
  }

  // ThemeWord: a Word in one of the three themes, as the loop screen's word middle uses it.
  function ThemeWord({ text, theme = "frozen", height }) { return h(Word, { text, theme, height }); }

  // ---------- Pen: marks with pressure. smoothness .45, open .14, tilt -4 degrees by default ----------
  const NS = "http://www.w3.org/2000/svg";
  const LOOK = { pen: { w: 2.1, rough: 1, glow: 0, alpha: 1, press: 0.6, busy: 1 }, clean: { w: 2, rough: 0, glow: 0, alpha: 1, busy: 0 },
    neon: { w: 2.2, rough: 0.35, glow: 1, alpha: 1, press: 0.3, busy: 2 }, marker: { w: 9, rough: 0.7, glow: 0, alpha: 0.45, busy: 1 } };
  const seeded = (seed) => { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };
  const smooth = (pts) => {
    const P = [pts[0], ...pts, pts[pts.length - 1]], f = (v) => v.toFixed(1);
    let d = `M${f(P[1][0])},${f(P[1][1])}`;
    for (let i = 1; i < P.length - 2; i++) {
      const p0 = P[i - 1], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2];
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
    }
    return d;
  };
  const line = (a, b, rough, r, bow = 0.04) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, pts = [];
    for (let i = 0; i <= 6; i++) { const u = i / 6, j = (r() - 0.5) * 2.4 * rough, bo = Math.sin(u * Math.PI) * L * bow * rough; pts.push([a[0] + dx * u + nx * (j + bo), a[1] + dy * u + ny * (j + bo)]); }
    return smooth(pts);
  };
  const el = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };
  let maskNr = 0;
  // A stroke that swells where the hand presses and thins at both ends; drawn in by a mask along its middle.
  const stroke = (g, d, s, colour, times = 1) => {
    const mid = el("path", { d, fill: "none" }); g.append(mid);
    if (!s.press || s.alpha < 1) {
      mid.setAttribute("stroke", colour); mid.setAttribute("stroke-width", s.w * times); mid.setAttribute("stroke-linecap", "round"); mid.setAttribute("opacity", s.alpha);
      if (s.alpha < 1) mid.style.mixBlendMode = "screen";
      if (s.glow) mid.style.filter = `drop-shadow(0 0 3px ${colour}) drop-shadow(0 0 8px ${colour})`;
      return mid;
    }
    const L = mid.getTotalLength(), n = Math.max(12, Math.round(L / 3)), pts = [];
    for (let i = 0; i <= n; i++) { const q = mid.getPointAtLength((L * i) / n); pts.push([q.x, q.y]); }
    const r = seeded(Math.round(L)), peak = 0.2 + r() * 0.4, hard = s.press * (0.7 + r() * 0.6), base = s.w * times;
    const wid = pts.map((_, i) => { const u = i / n; return base * (0.35 + 0.65 * Math.min(1, u / 0.08) * Math.pow(Math.min(1, (1 - u) / 0.35), 0.8)) * (1 + hard * Math.exp(-(((u - peak) / 0.35) ** 2)) * 0.9); });
    const left = [], right = [];
    pts.forEach((q, i) => { const v = pts[Math.min(n, i + 1)], w = pts[Math.max(0, i - 1)], dx = v[0] - w[0], dy = v[1] - w[1], l = Math.hypot(dx, dy) || 1, hw = wid[i] / 2;
      left.push([q[0] - (dy / l) * hw, q[1] + (dx / l) * hw]); right.push([q[0] + (dy / l) * hw, q[1] - (dx / l) * hw]); });
    const shape = el("path", { d: `${smooth(left)} L${right.reverse().map((q) => q.map((v) => v.toFixed(1)).join(",")).join(" L")} Z`, fill: colour });
    if (s.glow) shape.style.filter = `drop-shadow(0 0 3px ${colour}) drop-shadow(0 0 8px ${colour})`;
    const id = `iris-press-${++maskNr}`, mask = el("mask", { id, maskUnits: "userSpaceOnUse", x: -400, y: -400, width: 1600, height: 1600 });
    mid.setAttribute("stroke", "#fff"); mid.setAttribute("stroke-width", Math.max(...wid) * 2 + 4); mid.setAttribute("stroke-linecap", "round"); mid.setAttribute("stroke-linejoin", "round");
    mask.append(mid); g.append(mask); shape.setAttribute("mask", `url(#${id})`); g.append(shape);
    return mid;
  };
  const fade = (node, delay) => node.animate([{ opacity: 0 }, { opacity: 1 }], { duration: still() ? 1 : 400, delay: still() ? 0 : delay, fill: "both" });
  // Each kind gets the box of the marked text (x, y, w, h in the layer) and returns the paths to draw in.
  const KINDS = {
    circle: (g, b, s, c, r) => {
      const cxx = b.x + b.w / 2 + 2, cy = b.y + b.h / 2, rx = b.w / 2 + 10, ry = b.h / 2 + 7, tilt = (s.tilt * Math.PI) / 180, a0 = -2.4 + r() * 0.4, pts = [];
      for (let i = 0; i <= 24; i++) { const u = i / 24, a = a0 + u * TAU * 1.12, k = 1 + (r() - 0.5) * 0.06 * s.rough + (u - 0.5) * s.open, px = Math.cos(a) * rx * k, py = Math.sin(a) * ry * k;
        pts.push([cxx + px * Math.cos(tilt) - py * Math.sin(tilt), cy + px * Math.sin(tilt) + py * Math.cos(tilt)]); }
      return [stroke(g, smooth(pts), s, c)];
    },
    check: (g, b, s, c) => {
      const x = b.x - 30, y = b.y + b.h / 2 - 12, d0 = [x + 9, y + 20], a = [d0[0] - 8, d0[1] - 8], end = [d0[0] + Math.cos(-1.05) * 26, d0[1] + Math.sin(-1.05) * 26];
      return [stroke(g, smooth([a, [(a[0] + d0[0]) / 2, (a[1] + d0[1]) / 2 + 1], d0, [(d0[0] + end[0]) / 2, (d0[1] + end[1]) / 2], end]), s, c, 1.4)];
    },
    strike: (g, b, s, c, r) => [stroke(g, line([b.x - 4, b.y + b.h / 2 + 1], [b.x + b.w + 5, b.y + b.h / 2 - 1], Math.max(s.rough, 0.25), r), s, c)],
    underline: (g, b, s, c, r) => [stroke(g, line([b.x - 2, b.y + b.h + 1], [b.x + b.w + 6, b.y + b.h + 2], s.rough, r, 0.08), s, c),
      stroke(g, line([b.x + 6, b.y + b.h + 5], [b.x + b.w, b.y + b.h + 6], s.rough, r), s, c, 0.7)],
    // On the baseline, half the text height, 3px before the first letter (the round cap counts).
    mark: (g, b, s, c) => { const w = b.h * 0.5, y = b.y + b.h * 0.66; return [stroke(g, `M${b.x - 3 + w / 2},${y} L${b.x + b.w + 3 - w / 2},${y}`, { ...LOOK.marker, rough: 0 }, c, w / LOOK.marker.w)]; },
    arrow: (g, b, s, c) => {
      const tx = b.x + b.w + 8, ty = b.y + b.h / 2, sx = tx + 46, sy = ty + 26, hd = Math.atan2(ty - (ty + 6), tx + 4 - (sx + 6)), l = 9;
      return [stroke(g, `M${sx},${sy} Q${sx + 6},${ty + 6} ${tx + 4},${ty}`, s, c),
        stroke(g, `M${tx + 4 + Math.cos(hd + 2.6) * l},${ty + Math.sin(hd + 2.6) * l} L${tx + 4},${ty} L${tx + 4 + Math.cos(hd - 2.6) * l},${ty + Math.sin(hd - 2.6) * l}`, s, c)];
    },
    // A curly bracket to the right, over the full height of what it groups.
    bracket: (g, b, s, c) => {
      const x = b.x + b.w + 12, y0 = b.y + 2, y1 = b.y + b.h - 2, m = (y0 + y1) / 2;
      return [stroke(g, smooth([[x - 8, y0], [x - 2, y0 + 4], [x - 2, m - 6], [x + 4, m], [x - 2, m + 6], [x - 2, y1 - 4], [x - 8, y1]]), s, c)];
    },
    box: (g, b, s, c, r) => {
      const x0 = b.x - 8, y0 = b.y - 3, x1 = b.x + b.w + 8, y1 = b.y + b.h + 3, k = s.rough ? 2 : 8;
      const d = s.rough ? [line([x0 + k, y0], [x1 - k, y0 + 1], s.rough, r), line([x1, y0 + k], [x1 + 1, y1 - k], s.rough, r), line([x1 - k, y1], [x0 + k, y1 + 1], s.rough, r), line([x0, y1 - k], [x0 - 1, y0 + k], s.rough, r)]
        : [`M${x0 + k},${y0} H${x1 - k} Q${x1},${y0} ${x1},${y0 + k} V${y1 - k} Q${x1},${y1} ${x1 - k},${y1} H${x0 + k} Q${x0},${y1} ${x0},${y1 - k} V${y0 + k} Q${x0},${y0} ${x0 + k},${y0}`];
      return d.map((p) => stroke(g, p, s, c));
    },
    // Dims everything around the mark inside its card (the card clips it), with a thin frame in the pen colour.
    spotlight: (g, b, s, c) => {
      g.append(el("rect", { x: b.x - 10, y: b.y - 4, width: b.w + 20, height: b.h + 8, rx: 12, fill: "none", stroke: c, "stroke-opacity": 0.5 }));
      g.closest(".iris-pen").classList.add("iris-pen-spot"); fade(g, 0); return [];
    },
    // Three rings that keep widening from the start of the mark (a checkbox, a dot): look here.
    pulse: (g, b, s, c) => {
      const cxx = b.x - 16, cy = b.y + b.h / 2;
      for (let i = 0; i < 3; i++) {
        const ci = el("circle", { cx: cxx, cy, r: 8, fill: "none", stroke: c, "stroke-width": 2 }); g.append(ci);
        ci.style.transformOrigin = `${cxx}px ${cy}px`; ci.style.transformBox = "view-box";
        if (!still()) ci.animate([{ transform: "scale(1)", opacity: 0.9 }, { transform: "scale(2.6)", opacity: 0 }], { duration: 1500, delay: i * 500, iterations: Infinity, easing: "ease-out" });
      }
      return [];
    },
    star: (g, b, s, c, r) => {
      const cxx = b.x + b.w + 14, cy = b.y + b.h / 2 - 1, out = [];
      for (let i = 0; i < 7; i++) { const a = (i / 7) * TAU - Math.PI / 2, r1 = i % 2 ? 7 : 10; out.push(stroke(g, line([cxx + Math.cos(a) * 3, cy + Math.sin(a) * 3], [cxx + Math.cos(a) * r1, cy + Math.sin(a) * r1], s.rough * 0.3, r), s, c)); }
      return out;
    },
    // A hand-drawn circle with a number to the right: the order of steps.
    number: (g, b, s, c, r, n) => {
      const cxx = b.x + b.w + 20, cy = b.y + b.h / 2, pts = [];
      for (let k = 0; k <= 14; k++) { const a = -1.2 + (k / 14) * Math.PI * 2.1; pts.push([cxx + Math.cos(a) * 11 * (1 + (r() - 0.5) * 0.08 * s.rough), cy + Math.sin(a) * 11]); }
      const t = el("text", { x: cxx, y: cy + 4.5, "text-anchor": "middle", "font-size": 13, "font-weight": 700, "font-family": "-apple-system, system-ui, sans-serif", fill: c });
      t.textContent = String(n); g.append(t); fade(t, 250);
      return [stroke(g, smooth(pts), s, c, 0.65)];
    },
  };
  const drawIn = (paths) => {
    let t = 0;
    for (const p of paths) {
      const L = p.getTotalLength(), ms = 520 * Math.min(1.4, Math.max(0.35, L / 260));
      p.style.strokeDasharray = `${L} ${L}`; p.style.strokeDashoffset = L;
      p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: still() ? 1 : ms, delay: still() ? 0 : t + 250, easing: "cubic-bezier(.35,.1,.25,1)", fill: "forwards" });
      t += ms * 0.9;
    }
  };
  // <Pen kind="circle">14:00</Pen>. One per screen; a second one is drawn plain.
  function Pen({ kind = "circle", look = "pen", smoothness = 0.45, open = 0.14, tilt = -4, n = 1, children }) {
    const ref = useRef(null);
    if (!KINDS[kind]) warn(`Pen kind "${kind}" does not exist: ${Object.keys(KINDS).join(", ")}`);
    if (!LOOK[look]) warn(`Pen look "${look}" does not exist: ${Object.keys(LOOK).join(", ")}`);
    useEffect(() => {
      const root = ref.current; if (!root || !KINDS[kind] || !firstOfKind(root, "pen")) return;
      const s = { ...LOOK[LOOK[look] ? look : "pen"] };
      const clean = look === "clean";
      s.rough *= 1 - Math.max(0, Math.min(1, smoothness));
      s.open = clean ? 0 : open; s.tilt = clean ? 0 : tilt;
      const svg = el("svg", { class: "iris-pen-layer", "aria-hidden": "true" }); root.append(svg);
      const g = el("g", {}); svg.append(g);
      const box = root.getBoundingClientRect(), txt = root.querySelector(".iris-pen-text").getBoundingClientRect();
      const colour = getComputedStyle(root).getPropertyValue("--k").trim() || getComputedStyle(root).getPropertyValue("--accent").trim() || "#7dd3fc";
      drawIn(KINDS[kind](g, { x: txt.left - box.left, y: txt.top - box.top, w: txt.width, h: txt.height }, s, colour, seeded(7), n));
      return () => { svg.remove(); root.classList.remove("iris-pen-spot"); };
    }, [kind, look, smoothness, open, tilt, n]);
    return h("span", { ref, className: "iris-pen", "data-one": "pen", "data-busy": LOOK[look] ? LOOK[look].busy : 1 }, h("span", { className: "iris-pen-text" }, children));
  }

  // ---------- Word: one big word with an effect or theme, its colours always readable on its ground ----------
  const EFFECTS = ["gradient", "pop", "wave", "shine", "neon", "echo", "fill", "split", "lanes", "tiles", "stretch", "outline", "long-shadow", "stamp"];
  // Letters that need their own layer (lanes cut through them, the stamp eats holes): drawn apart, then laid on the ground.
  let layerCv = null;
  const layerOf = (ctx) => {
    const c = ctx.canvas; if (!layerCv || layerCv.width !== c.width || layerCv.height !== c.height) layerCv = Object.assign(document.createElement("canvas"), { width: c.width, height: c.height });
    const o = layerCv.getContext("2d"); o.setTransform(1, 0, 0, 1, 0, 0); o.clearRect(0, 0, c.width, c.height); o.setTransform(ctx.getTransform()); o.font = ctx.font; return o;
  };
  const THEMES = { frozen: { ground: "#081a34", stops: ["#ffffff", "#bae6fd", "#38bdf8"] }, fire: { ground: "#1c0d0b", stops: ["#fde68a", "#fb923c", "#dc2626"] },
    autumn: { ground: "#1f140a", stops: ["#fbbf24", "#c2410c"] } };
  const BEAT = 60 / 125;
  const fontOf = (px, wt) => `${wt} ${px}px -apple-system, "SF Pro Display", system-ui, sans-serif`;
  const fitFont = (ctx, text, W, px, wt, share) => { ctx.font = fontOf(px, wt); while (ctx.measureText(text).width > W * share && px > 12) { px *= 0.95; ctx.font = fontOf(px, wt); } return px; };
  const drawTheme = (ctx, W, H, text, name, t) => {
    const th = THEMES[name], stops = th.stops.map((c) => readable(c, th.ground));
    ctx.fillStyle = th.ground; ctx.fillRect(0, 0, W, H);
    const s = fitFont(ctx, text, W, H * 0.5, 900, 0.8), x = W / 2, y = H / 2, bw = ctx.measureText(text).width, r = seeded(name.length);
    ctx.save(); ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const g = ctx.createLinearGradient(0, y - s / 2, 0, y + s / 2); stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c));
    if (name === "autumn") for (let i = 0; i < 6; i++) {
      const f = (t * (0.06 + r() * 0.06) + r()) % 1, bx = x - bw / 2 - 20 + r() * (bw + 40) + Math.sin(t * 1.5 + i) * s * 0.2, by = -20 + f * (y - s * 0.4 + 20);
      ctx.save(); ctx.translate(bx, by); ctx.rotate(t * (1 + r()) + i); ctx.scale(1, 0.55 + 0.45 * Math.sin(t * 3 + i)); ctx.fillStyle = ["#f59e0b", "#ea580c", "#b91c1c", "#facc15"][i % 4];
      ctx.beginPath(); ctx.ellipse(0, 0, s * 0.11, s * 0.055, 0, 0, TAU); ctx.fill(); ctx.restore();
    }
    if (name === "fire") {
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < 40; i++) { const u = (t * 0.6 + hash(i)) % 1, px = x - bw / 2 + hash(i + 9) * bw + Math.sin(t * 3 + i) * 3, py = y - s * 0.42 - u * s * 0.9;
        const color = u < 0.3 ? "255,220,120" : u < 0.6 ? "251,146,60" : "220,38,38"; ctx.fillStyle = `rgba(${color},${(1 - u) * 0.3})`; ctx.beginPath(); ctx.arc(px, py, s * (0.09 + hash(i + 3) * 0.08) * (1 - u * 0.5), 0, TAU); ctx.fill(); }
      ctx.globalCompositeOperation = "source-over"; ctx.shadowColor = "#fb923c"; ctx.shadowBlur = s * (0.3 + 0.1 * Math.sin(t * 13) * Math.sin(t * 7));
    }
    if (name === "frozen") { ctx.shadowColor = "#7dd3fc"; ctx.shadowBlur = s * 0.2; }
    ctx.fillStyle = g; ctx.fillText(text, x, y); ctx.shadowBlur = 0;
    if (name === "frozen") {
      ctx.strokeStyle = "#ffffffcc"; ctx.lineWidth = Math.max(1, s * 0.02);
      for (let i = 0; i < 12; i++) { const cxx = x - bw / 2 + r() * bw, cy = y - s * 0.35 + r() * s * 0.25, k = s * (0.05 + r() * 0.05) * (0.7 + 0.3 * Math.sin(t * 2 + i));
        for (let a = 0; a < 3; a++) { const hh = (a * Math.PI) / 3; ctx.beginPath(); ctx.moveTo(cxx - Math.cos(hh) * k, cy - Math.sin(hh) * k); ctx.lineTo(cxx + Math.cos(hh) * k, cy + Math.sin(hh) * k); ctx.stroke(); } }
      ctx.fillStyle = "#bae6fdcc";
      for (let i = 0; i < 9; i++) { const cxx = x - bw * 0.42 + (i / 8) * bw * 0.84 + (r() - 0.5) * 8, len = s * (0.1 + r() * 0.2) * (0.9 + 0.1 * Math.sin(t + i)), top = y + s * 0.34;
        ctx.beginPath(); ctx.moveTo(cxx - s * 0.03, top); ctx.lineTo(cxx + s * 0.03, top); ctx.lineTo(cxx, top + len); ctx.closePath(); ctx.fill(); }
    }
    ctx.restore();
  };
  const drawWord = (ctx, W, H, text, effect, k, level, t) => {
    if (effect === "tiles") text = text.toUpperCase();
    const main = ctx, own = effect === "lanes" || effect === "stamp", sc = W / 720;
    const kd = ground(k[2]), a = readable(k[0], kd), b = readable(k[1], kd), beat = Math.floor(t / BEAT), p = Math.exp(-(t - beat * BEAT) * 6) * 0.5;
    ctx.fillStyle = kd; ctx.fillRect(0, 0, W, H);
    const px = effect === "tiles" ? fitFont(ctx, text, W / (1 + 0.5), H * 0.5, 800, 0.84) : fitFont(ctx, text, W, H * 0.62, effect === "stretch" ? 900 : 800, effect === "stretch" ? 0.84 / 0.8 : 0.84);
    if (own) ctx = layerOf(main);
    const total = ctx.measureText(text).width, letters = []; let x = -total / 2;
    for (const ch of text) { const w = ctx.measureText(ch).width; letters.push({ ch, x: x + w / 2 }); x += w; }
    if (effect === "tiles") { const gap = px * 0.5; letters.forEach((l, i) => { l.x = (i - (letters.length - 1) / 2) * (px * 0.86 + gap * 0.3); }); }
    ctx.save(); ctx.translate(W / 2, H / 2); ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const grad = () => { const g = ctx.createLinearGradient(0, -px / 2, 0, px / 2); g.addColorStop(0, a); g.addColorStop(1, b); return g; };
    const each = (fn) => letters.forEach(fn);
    if (effect === "pop") { const cyc = t % (BEAT * 16); each((l, i) => { const u = (cyc - i * 0.08) / 0.45, q = Math.max(0, Math.min(1, u)) - 1, s = u < 0 || u > 1 ? 1 : 1 + 2.70158 * q ** 3 + 1.70158 * q ** 2;
      ctx.save(); ctx.translate(l.x, 0); ctx.scale(s, s); ctx.fillStyle = grad(); ctx.fillText(l.ch, 0, 0); ctx.restore(); }); }
    else if (effect === "echo") { for (let j = 3; j >= 1; j--) { ctx.globalAlpha = 0.22 - j * 0.04; ctx.strokeStyle = b; ctx.lineWidth = 1.6; const d = j * (5 + 2 * p); each((l) => ctx.strokeText(l.ch, l.x + d, d)); }
      ctx.globalAlpha = 1; ctx.fillStyle = grad(); each((l) => ctx.fillText(l.ch, l.x, 0)); }
    else if (effect === "wave") { for (let lay = 1; lay >= 0; lay--) each((l, i) => { ctx.globalAlpha = lay ? 0.18 : 1; ctx.fillStyle = lay ? b : grad(); ctx.fillText(l.ch, l.x, Math.sin(t * 3 - i * 0.5 - lay * 0.35) * px * 0.06 + lay * 5); }); ctx.globalAlpha = 1; }
    else if (effect === "shine") { ctx.fillStyle = grad(); each((l) => ctx.fillText(l.ch, l.x, 0)); const sx = ((t / (BEAT * 8)) % 1) * (total + 400) - total / 2 - 200;
      ctx.globalCompositeOperation = "source-atop"; const gl = ctx.createLinearGradient(sx - 50, 0, sx + 50, 0); gl.addColorStop(0, "#fff0"); gl.addColorStop(0.5, "#ffffffc0"); gl.addColorStop(1, "#fff0");
      ctx.fillStyle = gl; ctx.fillRect(-W, -H, W * 2, H * 2); ctx.globalCompositeOperation = "source-over"; }
    else if (effect === "neon") { ctx.shadowColor = a; ctx.shadowBlur = 22; ctx.strokeStyle = a; ctx.lineWidth = 4; each((l) => ctx.strokeText(l.ch, l.x, 0));
      ctx.shadowBlur = 0; ctx.strokeStyle = "#ffffffd0"; ctx.lineWidth = 1.4; each((l) => ctx.strokeText(l.ch, l.x, 0)); }
    else if (effect === "fill") { const top = px * 0.42 - level * px * 0.9; ctx.globalAlpha = 0.25; ctx.fillStyle = b; each((l) => ctx.fillText(l.ch, l.x, 0)); ctx.globalAlpha = 1;
      ctx.save(); ctx.beginPath(); ctx.moveTo(-total, px); for (let xx = -total / 2 - 20; xx <= total / 2 + 20; xx += 8) ctx.lineTo(xx, top + Math.sin(xx / 40 + t * 3) * 5);
      ctx.lineTo(total, px); ctx.closePath(); ctx.clip(); ctx.fillStyle = grad(); each((l) => ctx.fillText(l.ch, l.x, 0)); ctx.restore(); }
    else if (effect === "split") { const sh = 1 + p * 3; ctx.save(); ctx.beginPath(); ctx.rect(-W, -H, W * 2, H); ctx.clip(); ctx.fillStyle = a; each((l) => ctx.fillText(l.ch, l.x - sh, 0)); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.rect(-W, 0, W * 2, H); ctx.clip(); ctx.fillStyle = b; each((l) => ctx.fillText(l.ch, l.x + sh, 0)); ctx.restore(); }
    else if (effect === "lanes") { ctx.fillStyle = grad(); each((l) => ctx.fillText(l.ch, l.x, 0));
      ctx.globalCompositeOperation = "source-atop"; ctx.fillStyle = kd; ctx.globalAlpha = 0.55;
      for (let r = 0; r < 9; r++) for (let q = 0; q < 4; q++) {
        const yy = -px * 0.5 + r * px * 0.13, xx = ((((q / 4) + (r % 2 ? 1 : -1) * t * 0.06) % 1 + 1) % 1) * (total + 200 * sc) - total / 2 - 100 * sc, len = (50 + ((r * 7 + q * 13) % 5) * 20) * sc;
        ctx.beginPath(); ctx.roundRect(xx - len / 2, yy - 5 * sc, len, 10 * sc, 5 * sc); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over"; ctx.globalAlpha = 1; }
    else if (effect === "tiles") { const n = letters.length, m = px * 0.86;
      each((l, i) => { if (l.ch === " ") return; const on = beat % n === i ? p * 2 : 0, lift = on * 6 * sc;
        ctx.fillStyle = on > 0.1 ? b : kd; ctx.strokeStyle = a; ctx.lineWidth = 3 * sc; ctx.beginPath(); ctx.roundRect(l.x - m / 2, -m / 2 - lift, m, m, m * 0.22); ctx.fill(); ctx.stroke();
        ctx.save(); ctx.font = ctx.font.replace(/[\d.]+px/, px * 0.7 + "px"); ctx.fillStyle = on > 0.1 ? kd : a; ctx.fillText(l.ch, l.x, -lift + 2 * sc); ctx.restore(); }); }
    else if (effect === "stretch") { ctx.scale(0.8, 1.25 * (1 + 0.06 * p)); ctx.fillStyle = grad(); each((l) => ctx.fillText(l.ch, l.x, 0)); }
    else if (effect === "outline") { ctx.strokeStyle = a; ctx.lineWidth = Math.max(1.5, 2 * sc * 2); each((l) => ctx.strokeText(l.ch, l.x, 0)); ctx.fillStyle = b + "33"; each((l) => ctx.fillText(l.ch, l.x, 0)); }
    else if (effect === "long-shadow") { ctx.fillStyle = b; ctx.globalAlpha = 0.1; for (let j = 4; j >= 1; j--) each((l) => ctx.fillText(l.ch, l.x + j * 2.4 * sc, j * 2.4 * sc));
      ctx.globalAlpha = 1; ctx.fillStyle = a; each((l) => ctx.fillText(l.ch, l.x, 0)); }
    else if (effect === "stamp") { let sd = 7 + (beat % 2); const r = () => ((sd = (sd * 16807) % 2147483647) / 2147483647);
      ctx.rotate(-0.03); ctx.fillStyle = a;
      for (let j = 0; j < 5; j++) { ctx.globalAlpha = 0.28; each((l) => ctx.fillText(l.ch, l.x + (r() - 0.5) * 3, (r() - 0.5) * 3)); }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = "destination-out"; for (let j = 0; j < 260; j++) ctx.fillRect((r() - 0.5) * total, (r() - 0.5) * px, 2, 2);
      ctx.globalCompositeOperation = "source-over"; }
    else { ctx.fillStyle = grad(); each((l) => ctx.fillText(l.ch, l.x, 0)); }
    ctx.restore();
    if (own) { main.save(); main.setTransform(1, 0, 0, 1, 0, 0); main.drawImage(ctx.canvas, 0, 0); main.restore(); }
  };
  // <Word text="Done" effect="pop" topic="party" /> or theme="frozen" | "fire" | "autumn". Costs 3 of the screen's 5.
  function Word({ text, effect: fx = "gradient", theme: th, topic, level = 0.5, height = 120 }) {
    let effect = fx, theme = th;
    if (!theme && THEMES[effect]) { theme = effect; effect = "gradient"; }
    if (theme && !THEMES[theme]) warn(`Word theme "${theme}" does not exist: ${Object.keys(THEMES).join(", ")}`);
    if (!theme && !EFFECTS.includes(effect)) warn(`Word effect "${effect}" does not exist: ${EFFECTS.join(", ")}`);
    const k = topicOf(topic) || TOPIC.loop, s = String(text == null ? "" : text);
    const ref = useCanvas((ctx, W, H, t) => (THEMES[theme] ? drawTheme(ctx, W, H, s, theme, t) : drawWord(ctx, W, H, s, effect, k, Number(level) || 0, t)), [s, effect, theme, k.join(), level]);
    return h("div", { className: "iris-word", style: { ...varsOf(k), height }, "data-busy": 3, role: "img", "aria-label": s }, h("canvas", { ref, className: "iris-fill" }));
  }

  // ---------- ButtonGroup: the button set of one screen, in its topic ----------
  // Primary flat accent (oklch .82/.12, dark ink), secondary glass; the rest as the app has them.
  function ButtonGroup({ topic, stack, children }) {
    return h("div", { className: cx("iris-btngroup", stack && "stack"), style: topicStyle(topic) }, children);
  }

  // ---------- PageDots: dots in the topic colour, the active one a duotone streak ----------
  function PageDots({ count = 3, active = 0, topic, labels, onSelect, dark, vertical }) {
    return h("div", { className: cx("iris-dots", dark && "dark", vertical && "vertical"), style: topicStyle(topic), role: "tablist" },
      Array.from({ length: count }, (_, i) => h("button", { key: i, className: cx("iris-dot", i === active && "on"), role: "tab", "aria-selected": i === active,
        "aria-label": labels && labels[i] ? labels[i] : `${i + 1} / ${count}`, onClick: () => onSelect && onSelect(i) }, h("i"))));
  }

  Object.assign(window.IrisUi, { Topic, Widget, PhaseRing, LoopScreen, ThemeWord, Pen, Anchor, Word, ButtonGroup, PageDots,
    design: { TOPIC, PHASES, PHASE_COLOURS, PATTERNS, drawPattern, LOOKS, SIZES, EFFECTS, THEMES: Object.keys(THEMES), PEN_KINDS: Object.keys(KINDS), PEN_LOOKS: Object.keys(LOOK),
      CENTERS, BUDGET: 5, readable, contrast, ground, topicOf, topicStyle } });
})();

// Web UI parts in the topic palette: the same --k / --kd a Topic sets for widgets colours chips, bars, rings,
// ticks, tabs and fields, so a groceries card in a window matches the groceries widget on the phone.
// Every part takes an optional `topic` (it wins over a surrounding Topic); without either it is the ice accent.
(() => {
  const h = React.createElement, { topicStyle } = window.IrisUi.design;
  const tint = (topic, style) => topic ? { ...topicStyle(topic), ...style } : style;
  const isDone = (done, i) => Array.isArray(done) ? done.includes(i) : i < (done || 0);

  function Chip({ on, topic, children, onClick }) {
    return h("button", { type: "button", className: "iris-chip" + (on ? " on" : ""), style: tint(topic), "aria-pressed": !!on, onClick }, children);
  }

  // value 0..1. ring: a circle with `centre` in the middle and `caption` under it; else a bar.
  function Progress({ value = 0, ring, size = 126, centre, caption, topic }) {
    const v = Math.max(0, Math.min(1, value));
    if (!ring) return h("div", { className: "iris-bar", style: tint(topic), role: "progressbar", "aria-valuenow": Math.round(v * 100) }, h("i", { style: { width: v * 100 + "%" } }));
    const r = size / 2 - 8, circumference = 2 * Math.PI * r, c = size / 2;
    // Long values (16:00, 5,2 km) smaller so they fit the ring.
    const len = String(centre ?? "").length, base = Math.min(40, size * 0.28);
    return h("div", { className: "iris-pring", style: tint(topic, { width: size, height: size }), role: "progressbar", "aria-valuenow": Math.round(v * 100) },
      h("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}` },
        h("circle", { cx: c, cy: c, r, fill: "none", stroke: "color-mix(in srgb, var(--k, var(--accent)) 18%, #0b0f0d)", strokeWidth: 8 }),
        h("circle", { cx: c, cy: c, r, fill: "none", stroke: "var(--k, var(--accent))", strokeWidth: 8, strokeLinecap: "round", strokeDasharray: `${circumference * v} ${circumference}`, transform: `rotate(-90 ${c} ${c})` })),
      h("div", { className: "mid" },
        centre != null && h("b", { style: { fontSize: Math.round(base * Math.min(1, 3.2 / Math.max(3, len))) } }, centre),
        caption && h("span", null, caption)));
  }

  function Stat({ value, label, topic }) {
    return h("div", { className: "iris-stat", style: tint(topic) }, h("b", null, value), h("span", null, label));
  }

  // items: strings, or [time, text] pairs (then no tick circles). done: a count (the first n) or an array of indexes.
  function CheckList({ items = [], done, max, onToggle, topic }) {
    const timed = items.some(Array.isArray), list = max ? items.slice(0, max) : items;
    return h("ul", { className: "iris-check" + (timed ? " timed" : ""), style: tint(topic) }, list.map((it, i) => {
      const inner = [h("span", { className: "box", key: "b" }), Array.isArray(it) && h("span", { className: "time", key: "t" }, it[0]),
        h("span", { className: "txt", key: "x" }, Array.isArray(it) ? it[1] : it)];
      return h("li", { key: i, className: isDone(done, i) ? "done" : "" },
        onToggle ? h("button", { type: "button", onClick: () => onToggle(i), "aria-pressed": isDone(done, i) }, inner) : inner);
    }));
  }

  function Segmented({ items = [], active = 0, onSelect, topic }) {
    return h("div", { className: "iris-seg", style: tint(topic), role: "tablist" }, items.map((t, i) =>
      h("button", { key: i, type: "button", role: "tab", "aria-selected": i === active, className: i === active ? "on" : "", onClick: () => onSelect && onSelect(i) }, t)));
  }

  function Field({ topic, style, ...rest }) { return h("input", { className: "iris-field", style: tint(topic, style), ...rest }); }

  Object.assign(window.IrisUi, { Chip, Progress, Stat, CheckList, Segmented, Field });
})();
// Pattern: a moving pattern fill. Two motors:
// - `kind` (lanes, grid, bubbles, band, rain, drift): the widget motor, the topic's two tints at about .3, for cards and bands.
// - `recipe`: the full PatternsLab motor, 13 layouts, 9 shapes, camera, depth and
//   confetti on the big beat, drawn in a 1920 x 1080 world and scaled to the box (keep it 16:9). The recipe is clamped on the way in.
(() => {
  const h = React.createElement, { useRef, useEffect } = React, D = window.IrisUi.design;
  const still = () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  // ================= Engine (trip style): everything is a function of the time t and the tick =================
  const W = 1920, H = 1080, OX = 960, OY = 540, TAU = Math.PI * 2, TICK = 60 / 125.02;   // house, 125 bpm
  const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const h2 = (a, b) => hash(a * 71.3 + b * 13.7);
  const cl = (x, a, b) => Math.max(a, Math.min(b, x));
  const frac = x => x - Math.floor(x);
  const lerp = (a, b, u) => a + (b - a) * u;
  const backOut = u => { u = cl(u, 0, 1) - 1; return 1 + 2.70158 * u * u * u + 1.70158 * u * u; };
  const ease = u => u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
  const PATTERN_SHAPES = ['circle', 'ring', 'capsule', 'triangle', 'plus', 'half', 'square', 'arc', 'dot'];
  const PATTERN_LAYOUTS = ['lanes', 'grid', 'lanes-round', 'bubbles', 'rain', 'keys', 'band', 'scan', 'drift', 'eq', 'spiral', 'swarm', 'wave'];

  // Colour helpers and guard rails: background dark enough, palette bright enough (the shapes have to stay readable).
  const hexRgb = h => { const m = /^#?([0-9a-f]{6})$/i.exec(String(h || '').trim()); if (!m) return null; const n = parseInt(m[1], 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const rgbHex = c => '#' + c.map(v => Math.round(cl(v, 0, 255)).toString(16).padStart(2, '0')).join('');
  const lum = c => (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
  const mixHex = (a, b, u) => { const x = hexRgb(a), y = hexRgb(b); return rgbHex(x.map((v, i) => lerp(v, y[i], u))); };

  // Read the recipe: everything clamped, unknown values get a clean default.
  function recipeData(r) {
    const n = (v, lo, hi, st) => { v = Number(v); return Number.isFinite(v) ? cl(v, lo, hi) : st; };
    let bg = hexRgb(r.background) || [8, 24, 58];
    for (let i = 0; i < 20 && lum(bg) > 0.09; i++) bg = bg.map(v => v * 0.85);
    let palette = (Array.isArray(r.palette) ? r.palette : []).map(hexRgb).filter(Boolean).slice(0, 5);
    if (palette.length < 2) palette = [[125, 211, 252], [139, 92, 246], [46, 230, 214]];
    palette = palette.map(c => { for (let i = 0; i < 12 && lum(c) < 0.32; i++) c = c.map(v => v + (255 - v) * 0.15); return rgbHex(c); });
    const shapes = (Array.isArray(r.shapes) ? r.shapes : []).filter(v => PATTERN_SHAPES.includes(v)).slice(0, 4);
    const cam = r.camera || {};
    const c4 = (a, st) => Array.isArray(a) && a.length >= 4 ? [n(a[0], -140, 140, 0), n(a[1], -140, 140, 0), n(a[2], 0.9, 1.25, 1), n(a[3], -6, 6, 0)] : st;
    return {
      ...r, bg: rgbHex(bg), palette, shapes: shapes.length ? shapes : ['circle', 'capsule'],
      layout: PATTERN_LAYOUTS.includes(r.layout) ? r.layout : 'drift',
      density: n(r.density, 0, 1, 0.5), scale: n(r.scale, 0, 1, 0.5), speed: n(r.speed, 0, 1, 0.5), pop: n(r.pop, 0, 1, 0.5),
      fill: n(r.fill, 0, 1, 0.6), rotate: n(r.rotate, 0, 1, 0.3), depth: n(r.depth, 0, 1, 0.5), variation: n(r.variation, 0, 1, 0.5),
      confetti: n(r.confetti, 0, 1, 0.2), cam: [c4(cam.from, [0, 0, 1, 0]), c4(cam.to, [30, -20, 1.06, 1.5])],
    };
  }

  // One shape, drawn in a box of 100 (like the trip's shapes.jsx), s = size in px.
  function shape(ctx, k, c, x, y, s, r, op, filled) {
    if (s <= 0.5 || op <= 0.01) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(s / 100, s / 100); ctx.globalAlpha = op;
    ctx.fillStyle = c; ctx.strokeStyle = c; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const rr = (x0, y0, w, h, ra) => { ctx.beginPath(); ctx.roundRect(x0, y0, w, h, ra); };
    const paint = () => filled ? ctx.fill() : (ctx.lineWidth = 12, ctx.stroke());
    switch (k) {
      case 'circle': ctx.beginPath(); ctx.arc(0, 0, filled ? 50 : 44, 0, TAU); paint(); break;
      case 'ring': ctx.beginPath(); ctx.arc(0, 0, 38, 0, TAU); ctx.lineWidth = filled ? 22 : 10; ctx.stroke(); break;
      case 'capsule': rr(-50, -19, 100, 38, 19); paint(); break;
      case 'triangle': ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(38, 28); ctx.lineTo(-38, 28); ctx.closePath(); ctx.lineWidth = filled ? 16 : 12; filled && ctx.fill(); ctx.stroke(); break;
      case 'plus': if (filled) { rr(-48, -15, 96, 30, 10); ctx.fill(); rr(-15, -48, 30, 96, 10); ctx.fill(); } else { ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(40, 0); ctx.moveTo(0, -40); ctx.lineTo(0, 40); ctx.stroke(); } break;
      case 'half': ctx.beginPath(); ctx.arc(0, 0, 50, 0, Math.PI); ctx.closePath(); paint(); break;
      case 'square': rr(-40, -40, 80, 80, 20); paint(); break;
      case 'arc': ctx.beginPath(); ctx.arc(0, 10, 46, Math.PI * 1.15, Math.PI * 1.85); ctx.lineWidth = 24; ctx.stroke(); break;
      default: ctx.beginPath(); ctx.arc(0, 0, 50, 0, TAU); ctx.fill();   // dot
    }
    ctx.restore();
  }

  // Evenly spread places (sunflower pattern) out to the edge: never two shapes in the same place, and a margin along the edge. Place j is fixed, so a shape can come back to it without colliding.
  const PLACE = { inner: 70, rx: 820, ry: 430 };
  function place(j, n, spin = 0) {
    const u = Math.sqrt((j + 0.5) / n), a = j * 2.39996323 + spin;
    const rin = PLACE.inner / PLACE.ry;   // small free zone in the middle, as part of the radius
    const r = rin + (1 - rin) * u;
    return [OX + Math.cos(a) * r * PLACE.rx, OY + Math.sin(a) * r * PLACE.ry];
  }
  // The world per layout: returns a list of shapes {k, c, x, y, s, r, op, filled, z}. z = depth 0 (far) .. 1 (close).
  function world(R, t, tick, p, p2, life) {
    const E = [], P = R.palette, K = R.shapes, D = R.density, G = 0.6 + R.scale * 0.9, V = 0.25 + R.speed * 1.3, VAR = R.variation;
    const color = i => P[i % P.length], shapeAt = i => K[i % K.length], filled = i => h2(i, 77) < R.fill;
    const depthAt = i => R.depth > 0 ? h2(i, 55) : 0.6;
    const bounce = (i) => 1 + R.pop * 0.35 * (i % 2 === tick % 2 ? p : p * 0.3);
    const size = (i, base) => base * 1.6 * G * (1 - VAR * 0.6 + VAR * 1.2 * h2(i, 9));
    const spin = (i) => R.rotate * (h2(i, 3) - 0.5) * 4 * t + h2(i, 4) * TAU * R.rotate;
    const L = i => life(i);
    const push = (i, x, y, base, extra = {}) => E.push({ k: shapeAt(i), c: color(i), x, y, s: size(i, base) * bounce(i) * L(i), r: spin(i), op: 0.9, filled: filled(i), z: depthAt(i), ...extra });
    switch (R.layout) {
      case 'lanes': {
        // Lanes over the full height; per lane capsules at a fixed distance (never overlapping), opaque, with a shape in every gap.
        const rows = 4 + Math.round(D * 4), height = 1080 / rows;
        for (let l = 0; l < rows; l++) {
          const y = (l + 0.5) * height, dir = l % 2 ? 1 : -1, n = 3 + Math.round(D * 3) + (l % 2), step = 2400 / n;
          const thick = Math.min(height * 0.42, 64) * G, sp = V * (0.035 + 0.02 * (l % 3));
          for (let j = 0; j < n; j++) {
            const i = l * 20 + j, length = step * (0.38 + 0.3 * h2(l, j)), x = frac(j / n + dir * t * sp) * 2400 - 240;
            E.push({ k: 'pill', c: color(l + j), x, y, w: length * L(i), h: thick * bounce(i) * L(i), r: 0, op: 1, filled: filled(i), z: 0.3 + 0.7 * (l % 2) });
            // In the gap between this capsule and the next one: one small shape.
            const longFollow = step * (0.38 + 0.3 * h2(l, (j + 1) % n)), gap = step - length / 2 - longFollow / 2;
            if ((j + l) % 2 === 0 && gap > thick * 1.4) push(i + 7, x + length / 2 + gap / 2, y, Math.min(thick * 0.7, gap * 0.5) / 1.6, { z: 0.8, op: 1 });
          }
        }
        break;
      }
      case 'grid': {
        const col = 8 + Math.round(D * 8), sp = 1920 / col, rows = Math.ceil(1080 / sp) + 1, waveTick = Math.floor(tick / 8) * 8;
        const gt = (t - waveTick * TICK);
        for (let r = 0; r < rows; r++) for (let q = 0; q < col + 1; q++) {
          const i = r * 40 + q, x = (q + 0.5) * sp, y = (r + 0.5) * sp - (rows * sp - 1080) / 2;
          const on = h2(i, tick) < 0.08 ? p : 0, dist = Math.hypot(x - OX, y - OY), wave = Math.exp(-(((gt * 1300) - dist) ** 2) / 30000);
          E.push({ k: 'square', c: color(i + (on > 0.1 ? 1 : 0)), x, y, s: sp * 0.72 * L(i * 0.2), r: 0, op: 0.35 + 0.6 * Math.max(on, wave), filled: on + wave > 0.3 || h2(i, 5) < R.fill * 0.2, z: 0.5 });
        }
        break;
      }
      case 'lanes-round': {
        const n = 3 + Math.round(D * 3);
        for (let k = 0; k < n; k++) {
          const r = 220 + k * 110, e = L(k * 3);
          E.push({ k: 'ellipse', c: color(k), x: OX, y: OY, rx: r * 1.4 * e, ry: r * e, r: t * 0.1 * (k % 2 ? 1 : -1) * V, op: 0.45, z: 0.4 });
          for (let j = 0; j < 2 + Math.round(D * 2); j++) {
            const nj = 2 + Math.round(D * 2), a = j / nj * TAU + k * 0.9 + t * (0.5 - k * 0.06) * (k % 2 ? 1 : -1) * V, rot = t * 0.1 * (k % 2 ? 1 : -1) * V;
            const px = Math.cos(a) * r * 1.4, py = Math.sin(a) * r;
            push(k * 10 + j, OX + px * Math.cos(rot) - py * Math.sin(rot), OY + px * Math.sin(rot) + py * Math.cos(rot), 46, { z: 0.4 + 0.15 * k });
          }
        }
        break;
      }
      case 'bubbles': case 'rain': {
        const n = 14 + Math.round(D * 40), op = R.layout === 'bubbles' ? -1 : 1;
        for (let i = 0; i < n; i++) {
          const sp = (0.05 + h2(i, 1) * 0.08) * V, y = op < 0 ? 1200 - frac(h2(i, 2) + t * sp) * 1400 : frac(h2(i, 2) + t * sp) * 1400 - 150;
          const col = (i * 0.6180339887) % 1;   // golden ratio: columns spread evenly
          push(i, 80 + col * 1760 + Math.sin(t * 1.3 + i) * 24, y, i % 6 === 0 ? 70 : 28 + h2(i, 4) * 26);
        }
        break;
      }
      case 'keys': {
        const n = 30 + Math.round(D * 50);
        for (let i = 0; i < n; i++) {
          const cx = -60 + (i % 14) * 150, y = frac(h2(i, 2) + t * (0.08 + h2(i, 1) * 0.06) * V) * 1300 - 110;
          const flash = h2(i, tick) < 0.12 ? p : 0;
          E.push({ k: 'square', c: flash > 0.2 ? '#e8f2f7' : color(i), x: cx, y, s: (46 + h2(i, 3) * 26) * G * L(i * 0.3), r: 0, op: 0.7 + 0.3 * flash, filled: flash > 0.2 || filled(i), z: depthAt(i) });
        }
        break;
      }
      case 'band': {
        const step = Math.floor(tick / 2) + backOut(((t / TICK) % 2) / 0.8);
        for (let row = 0; row < 2; row++) for (let i = 0; i < 9; i++) {
          const x = ((i * 300 - step * 300 * (row ? -1 : 1)) % 2700 + 2700) % 2700 - 390, y = row ? 880 : 200;
          E.push({ k: 'card', c: color(i + row), x, y, s: G * L(i + row * 6), r: 0, op: 0.85, z: 0.5, u: frac(i * 0.37 + step * 0.2) });
        }
        break;
      }
      case 'scan': {
        for (let k = 0; k < 3; k++) E.push({ k: 'line', c: color(k), x: 0, y: frac(t * 0.3 * V + k / 3) * 1300 - 110, s: 1, r: 0, op: 0.6, z: 0.5 });
        for (let i = 0; i < 4 + Math.round(D * 6); i++) {
          const nv = 4 + Math.round(D * 6), w = (180 + h2(i, 1) * 120) * G, [px, py] = place(i, nv, 0.8);
          E.push({ k: 'window', c: color(i), x: px + Math.sin(t + i) * 16, y: py, s: w * L(i), r: 0, op: 0.8, z: depthAt(i), u: 0.5 + 0.5 * Math.sin(t * 3 + i) });
        }
        break;
      }
      case 'eq': {
        const n = 24 + Math.round(D * 30), w = 1920 / n;
        for (let i = 0; i < n; i++) {
          const band = 0.35 + 0.65 * Math.abs(Math.sin(i * 0.37 + t * 2.3 * V)), hgt = (40 + 300 * band * (0.5 + 0.5 * p) + 60 * p2) * G * L(i * 0.4);
          E.push({ k: 'bar', c: color(i >> 2), x: (i + 0.5) * w, y: 1080, w: w * 0.55, h: hgt, r: 0, op: 0.9, z: 0.6 });
          E.push({ k: 'bar', c: color((i >> 2) + 1), x: (i + 0.5) * w, y: 0, w: w * 0.55, h: -hgt * 0.6, r: 0, op: 0.55, z: 0.4 });
        }
        break;
      }
      case 'spiral': {
        // Every arm one shape and one colour, shapes grow outwards: that is how you read the spiral.
        const arms = 2 + Math.round(D * 2), n = 7 + Math.round(D * 6);
        for (let a = 0; a < arms; a++) for (let j = 0; j < n; j++) {
          const u = j / (n - 1), ang = a / arms * TAU + u * 3.2 - t * 0.35 * V, rad = 60 + u * 640, i = a * 50 + j;
          E.push({ k: shapeAt(a), c: color(a), x: OX + Math.cos(ang) * rad * 1.35, y: OY + Math.sin(ang) * rad * 0.72,
            s: (24 + u * 70) * G * bounce(i) * L(i), r: ang + Math.PI / 2, op: 0.55 + 0.4 * u, filled: filled(a), z: u });
        }
        break;
      }
      case 'swarm': {
        const n = 22 + Math.round(D * 34);
        for (let i = 0; i < n; i++) {
          // A swarm that flies a loop through the frame as a whole, every member with its own place in the cloud.
          const f = t * 0.22 * V - h2(i, 1) * 1.6, x = OX + Math.sin(f * 1.3) * 560 + (h2(i, 2) - 0.5) * 520 + Math.sin(f * 3.1 + i) * 40, y = OY + Math.sin(f * 2.6) * 260 + (h2(i, 5) - 0.5) * 300 + Math.cos(f * 2.7 + i) * 30;
          push(i, x, y, 18 + h2(i, 3) * 26);
        }
        break;
      }
      case 'wave': {
        const col = 14 + Math.round(D * 12), rows = 7;
        for (let r = 0; r < rows; r++) for (let q = 0; q < col; q++) {
          const i = r * 40 + q, x = (q + 0.5) * (1920 / col), y0 = (r + 0.5) * (1080 / rows), ph = q * 0.45 - t * 2.2 * V + r * 0.6;
          push(i, x, y0 + Math.sin(ph) * 38 * G, 22 + 18 * (0.5 + 0.5 * Math.sin(ph)), { r: 0 });
        }
        break;
      }
      default: {   // drift: shapes that appear on a tick, stay for six ticks and pop away (FlatBg from the trip)
        const N = 16 + Math.round(D * 30);
        for (let i = 0; i < N; i++) {
          const slot = i % 8, n = Math.floor((tick - slot) / 8); if (tick < slot) continue;
          const k0 = slot + 8 * n, t0 = k0 * TICK, t1 = (k0 + 6) * TICK, seed = i * 31 + n * 17;
          // Every shape its own fixed place (slot i), so never two on top of each other; large shapes only on the outermost places.
          const CORNER = [[-1, -1], [1, 1], [1, -1]], large = i < 3;
          const [px, py] = large ? [OX + CORNER[i][0] * 740, OY + CORNER[i][1] * 330] : place(i - 3, N - 3, 0.3);
          const inScale = backOut((t - t0) / 0.42), outFade = 1 - cl((t - (t1 - 0.35)) / 0.35, 0, 1);
          const m = large ? 170 : i % 5 === 0 ? 90 : 38 + h2(seed, 3) * 26;   // size rhythm: large, medium, many small
          E.push({ k: shapeAt(seed), c: color(seed), x: px + (t - t0) * 14 * (h2(seed, 4) - 0.5), y: py - (t - t0) * 8,
            s: m * G * inScale * outFade * bounce(i), r: h2(seed, 7) * TAU + (t - t0) * (h2(seed, 8) - 0.5) * 2 * R.rotate, op: large ? 0.45 : 0.92, filled: filled(seed), z: large ? 0.1 : 0.4 + 0.6 * h2(seed, 9) });
        }
      }
    }
    return E;
  }

  // Special shapes of some layouts.
  function draw(ctx, e) {
    if (e.k === 'ellipse') { ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(e.r); ctx.globalAlpha = e.op; ctx.strokeStyle = e.c; ctx.lineWidth = 4; ctx.setLineDash([4, 18]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.ellipse(0, 0, Math.max(1, e.rx), Math.max(1, e.ry), 0, 0, TAU); ctx.stroke(); ctx.restore(); return; }
    if (e.k === 'bar') { ctx.globalAlpha = e.op; ctx.fillStyle = e.c; ctx.beginPath(); ctx.roundRect(e.x - e.w / 2, e.h > 0 ? e.y - e.h : e.y - 40, e.w, Math.abs(e.h) + 40, e.w / 2); ctx.fill(); ctx.globalAlpha = 1; return; }
    if (e.k === 'line') { ctx.globalAlpha = e.op; ctx.fillStyle = e.c; ctx.fillRect(-300, e.y, 2520, 6); ctx.globalAlpha = 0.08; ctx.fillRect(-300, e.y - 60, 2520, 60); ctx.globalAlpha = 1; return; }
    if (e.k === 'card' || e.k === 'window') {
      if (e.s <= 0.01) return;
      const w = e.k === 'card' ? 240 * e.s : e.s, h = w * 0.64;
      ctx.save(); ctx.translate(e.x, e.y); ctx.globalAlpha = e.op; ctx.strokeStyle = e.c; ctx.fillStyle = e.c; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, w * 0.12); ctx.stroke();
      ctx.beginPath(); ctx.roundRect(-w / 2 + w * 0.12, -h / 2 + h * 0.18, w * 0.3, h * 0.08, h * 0.04); ctx.fill();
      ctx.globalAlpha = e.op * 0.7; ctx.beginPath(); ctx.roundRect(-w / 2 + w * 0.12, h * 0.05, w * 0.62 * e.u, h * 0.1, h * 0.05); ctx.fill();
      ctx.restore(); return;
    }
    if (e.k === 'pill') {
      if (e.w <= 1 || e.h <= 1) return;
      ctx.globalAlpha = e.op; ctx.beginPath(); ctx.roundRect(e.x - e.w / 2, e.y - e.h / 2, e.w, e.h, e.h / 2);
      if (e.filled) { ctx.fillStyle = e.c; ctx.fill(); } else { ctx.strokeStyle = e.c; ctx.lineWidth = Math.max(4, e.h * 0.16); ctx.stroke(); }
      ctx.globalAlpha = 1; return;
    }
    if (e.sx) { ctx.save(); ctx.translate(e.x, e.y); ctx.scale(e.s / 100, e.s / 100 / e.sx * 0.9); shape(ctx, e.k, e.c, 0, 0, 100, 0, e.op, e.filled); ctx.restore(); return; }
    shape(ctx, e.k, e.c, e.x, e.y, e.s, e.r, e.op, e.filled);
  }

  // One frame: background (colour + slow discs, pulse on every 4th tick), world with depth and camera, confetti.
  function render(ctx, R, t, start) {
    const tick = Math.floor(t / TICK), p = Math.exp(-(t - tick * TICK) * 6), p4 = tick % 4 === 0 ? p : 0, p2 = tick % 2 === 0 ? p : 0;
    ctx.setTransform(ctx.canvas.width / W, 0, 0, ctx.canvas.height / H, 0, 0);
    ctx.globalAlpha = 1; ctx.fillStyle = R.bg; ctx.fillRect(0, 0, W, H);
    const light = mixHex(R.bg, '#ffffff', 0.05 + 0.03 * p4), light2 = mixHex(R.bg, R.palette[0], 0.08);
    [[180, 180, 520, 0.05, 0], [1780, 900, 620, 0.04, 2], [1650, 90, 360, 0.07, 4]].forEach(([x, y, r, f, ph], i) => {
      ctx.fillStyle = i === 1 ? light2 : light; ctx.beginPath();
      ctx.arc(x + Math.sin(t * f * TAU + ph) * 90, y + Math.cos(t * f * TAU + ph) * 60, r * (1 + 0.03 * p4), 0, TAU); ctx.fill();
    });
    // Camera: back and forth between from and to (16 ticks), far away moves along less than close by.
    const u = ease(1 - Math.abs(frac(t / (TICK * 16)) * 2 - 1));
    const cam = R.cam[0].map((v, i) => lerp(v, R.cam[1][i], u));
    const life = i => backOut((t - start - 0.05 - (i % 40) * 0.02) / 0.45);
    const els = world(R, t, tick, p, p2, life).sort((a, b) => a.z - b.z);
    for (const e of els) {
      const par = 0.55 + 0.45 * e.z, scale = 1 + (cam[2] - 1) * par;
      ctx.save();
      ctx.translate(OX + cam[0] * par, OY + cam[1] * par); ctx.rotate(cam[3] * Math.PI / 180 * par); ctx.scale(scale, scale); ctx.translate(-OX, -OY);
      if (R.depth > 0.05) { ctx.globalAlpha = 1; e.op *= 0.55 + 0.45 * (1 - R.depth + R.depth * e.z); }
      draw(ctx, e);
      ctx.restore();
    }
    // Confetti on the big tick (every 16 ticks), if the recipe asks for confetti.
    const large = Math.floor(tick / 16) * 16, ug = (t - large * TICK) / 1.2;
    if (R.confetti > 0.25 && ug >= 0 && ug < 1 && h2(large, 1) < R.confetti + 0.2) {
      const n = 10 + Math.round(R.confetti * 16);
      for (let i = 0; i < n; i++) {
        const a = i / n * TAU + h2(large, i) * 0.4, d = (1 - (1 - ug) ** 3) * (220 + h2(large + 9, i) * 420);
        shape(ctx, PATTERN_SHAPES[i % PATTERN_SHAPES.length], R.palette[i % R.palette.length], OX + Math.cos(a) * d * 1.25, OY + Math.sin(a) * d, (18 + h2(large + 3, i) * 24) * (1 - ug * 0.4), ug * 6 * (h2(large, i + 5) - 0.5), 1 - cl((ug - 0.65) / 0.35, 0, 1), true);
      }
    }
    // Edge fades softly into the app background.
    const v = ctx.createRadialGradient(OX, OY, 520, OX, OY, 1150); v.addColorStop(0, '#07090c00'); v.addColorStop(1, '#07090cb0');
    ctx.globalAlpha = 1; ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  }

  const LAYOUTS = PATTERN_LAYOUTS, SHAPES = PATTERN_SHAPES;
  function Pattern({ kind = "lanes", topic, colors, recipe, height = 160, children }) {
    const ref = useRef(null), k = D.topicOf(topic) || D.TOPIC.loop, palette = colors || [k[0], k[1]];
    const R = recipe ? recipeData(recipe) : null;
    if (recipe && !LAYOUTS.includes(recipe.layout)) console.warn(`[IrisUi] Pattern layout "${recipe.layout}" does not exist: ${LAYOUTS.join(", ")}`);
    if (!recipe && !D.PATTERNS.includes(kind)) console.warn(`[IrisUi] Pattern kind "${kind}" does not exist: ${D.PATTERNS.join(", ")}`);
    const key = recipe ? JSON.stringify(recipe) : kind + palette.join();
    useEffect(() => {
      const cv = ref.current; if (!cv) return;
      const ctx = cv.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1); let raf = 0, Wd = 0, Hd = 0;
      const size = () => { const b = cv.getBoundingClientRect(); Wd = b.width; Hd = b.height; cv.width = Wd * dpr; cv.height = Hd * dpr; };
      // Still = one calm frame, drawn once (widget motor at t .6; the full motor well after its shapes have come in).
      const frame = (ms) => {
        const t = still() ? (R ? 9 * TICK : 0.6) : ms / 1000;
        if (R) render(ctx, R, t, 0);
        else { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); D.drawPattern(ctx, Wd, Hd, kind, palette, t); }
        if (!still()) raf = requestAnimationFrame(frame);
      };
      size(); raf = requestAnimationFrame(frame);
      const ro = new ResizeObserver(() => { size(); if (still()) frame(0); }); ro.observe(cv);
      return () => { cancelAnimationFrame(raf); ro.disconnect(); };
    }, [key]);
    return h("div", { className: "iris-pattern" + (R ? " iris-pattern-world" : ""), style: { ...D.topicStyle(topic), ...(R ? { aspectRatio: "16 / 9" } : { height }) }, "data-busy": 2 },
      h("canvas", { ref, className: "iris-fill", "aria-hidden": "true" }), children ? h("div", { className: "iris-pattern-panel" }, children) : null);
  }
  Pattern.layouts = LAYOUTS; Pattern.shapes = SHAPES; Pattern.recipe = recipeData;
  window.IrisUi.Pattern = Pattern;
})();
