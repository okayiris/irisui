# AI within the framework

How to ask an AI for something unique without leaving the Iris look. The split is fixed: **the framework is the base, the AI only tunes it.** The AI never writes a page, a component or CSS. It returns one small recipe (JSON) or, for rings, one small GLSL function. Everything around it (drawing, motion, contrast, budget, grain, glass) is ours and cannot be broken by a bad answer. The recipe fields per system: `systems.md`.

## The loop

1. **Seed.** Every request gets a different starting point, so parallel requests do not all land on the same idea: a theme from a list (rings: 30 themes such as "caustics on a pool floor", "aurora curtain", "a single line that draws and fades again"), a shape type (10, from "an open arc" to "broken segments with corners"), a layout that was not used in the last 6, a topic. The last 14 themes are not drawn again.
2. **Ask.** A system prompt with the style, the taste rules and the exact JSON shape; a user prompt with the seed, the taste memory and what was just made ("just made, so not again"). Temperature 1.0, JSON mode. Up to 3 attempts when the answer is not valid JSON or misses a field.
3. **Clamp.** The recipe is read through a normaliser: every number clamped to its range, unknown names replaced by a safe default, grounds darkened and palettes lightened until they read. A recipe can be dull; it can never be broken.
4. **Inspect.** Measured, not judged: contrast (text 4.5:1, the Word guard), the busy budget (5 per screen; over it the pen turns clean, then confetti goes), and per system its own checks (rings: light share 5 to 42%, no seam, balance within 22 units, still at least 20% of talking, voice visible at least 25%).
5. **Repair.** A failed inspection goes back to the AI with the reason in plain words ("the band is lit too much: less fill and mist."), same idea, fix only that. Max 2 repairs, then the recipe is dropped. A shader that does not compile goes back with the compiler's line numbers.
6. **Critic.** For a set (a system's first version, a new rule), an independent critic scores screenshots on beautiful, functional, expressive, unique and personal, harsh and in numbers. Its findings become rules in the normaliser or the prompt, not one-off fixes. Those scores come from an internal review, not from a published benchmark.
7. **Taste memory.** The person swipes: right = beautiful (kept), left = boo (thrown out). The last 10 to 12 likes and 12 to 15 boos go into every next prompt as "the owner finds this beautiful (go that way, but do not copy)" and "finds this weak (avoid)", by name and one-line idea.

So three hands steer the taste: the **person** swipes (what they like), the **critic** scores (what works), the **inspection** measures (what may). The AI only proposes.

## Rules for prompts

- Give the AI the whole allowed vocabulary (fields, enums, ranges) and ask for JSON only. Name the style in words and colours (hex), not in adjectives alone.
- Say what is forbidden as concretely as what is wanted ("no recognisable objects: no butterflies, flowers, lace").
- Ask for one clear idea and a true name ("call it facets and you see straight segments").
- Never let the AI pick text colours, sizes or spacing: those are tokens.
- Write the prompts in English; the recipe keys stay as the engine reads them.

## Prompt templates

Fill the `{...}` parts. The engine adds the seed, the taste memory and the recent list.

**Pattern**
```text
You design a moving background pattern for Iris in the style of the trip videos: flat, rounded shapes on the beat (125 bpm), no gradients, no text, no orb in the middle. Topic: {topic}. Layout: {layout} (stick to it).
A dark saturated background and 3-4 bright Iris colours (ice blue #7dd3fc, violet #8b5cf6, neon #2ee6d6, magenta #c026d3, pink #f0abfc, lilac #c4b5fd, blue #38bdf8; one colour of its own may be added per topic).
Taste: one clear idea, density mostly 0.3-0.6, a rhythm you feel but that is never hectic.
Answer with JSON ONLY: {"name": "<2-3 words>", "idea": "<one sentence>", "layout": "...", "shapes": ["circle|ring|capsule|triangle|plus|half|square|arc|dot", ...1-3], "background": "#...", "palette": ["#...", ...3-4], "density": 0.5, "scale": 0.5, "speed": 0.5, "pop": 0.5, "fill": 0.5, "rotate": 0.3, "depth": 0.5, "variation": 0.5, "confetti": 0.2, "camera": {"from": [0, 0, 1, 0], "to": [40, -20, 1.08, 2]}}
```

**Word**
```text
Pick a letter style for the word "{word}" on a screen about {topic}. Less is more: one effect, at most one decoration beside it.
Rules: words longer than 8 characters never tiles, outlined or mono; echo and long shadow only short words in capitals; serif only with gradient, shine or neon, lower case; themes (frozen, fire, autumn) always sans 900 without an edge.
Answer with JSON ONLY: {"effect": "gradient|pop|wave|shine|neon|echo|fill|split|frozen|fire|autumn", "palette": "<a name from: green and blue, pink and violet, amber and ice, ice and white, magenta and ice, neon and lilac, mint and green, white and violet, blue and green, butter and pink, violet and neon, ice and pink, green and amber, lilac and ice>", "letter": "sans|mono|serif|round", "weight": 600-900, "uppercase": false, "edge": "none|thin|glow|corners", "background": "flat|radial|dots", "rhythm": 0.3-1}
```

**Widget**
```text
Pick the look of a widget for Iris. Topic: {topic}. Content: {content}. The hero shows the answer itself: a ring only when it is progress, a list only when it is a list.
Answer with JSON ONLY: {"topic": "groceries|agenda|mail|parcel|weather|tasks|sport|money|travel|health|home|music|loop|explain|party", "look": "glass|pattern|ring|list", "size": "small|wide|tall|large", "label": "<short, no emoji>", "value": "...", "unit": "...", "progress": 0-1, "pattern": "lanes|grid|bubbles|band|rain|drift", "note": "<at most 3 words, personal, no fact that is already somewhere else>"}
```

**Pen mark**
```text
Iris says: "{sentence}". Pick one hint that shows her sentence on the lines {lines}. Never over a label, strike only in a tick list.
Answer with JSON ONLY: {"kind": "circle|check|strike|underline|mark|arrow|bracket|box|spotlight|pulse|star|number", "look": "pen|clean|neon|marker", "lines": [1], "smoothness": 0.45, "open": 0.14, "tilt": -4, "speed": 160-700}
```

**Photo**
```text
Turn photo {photo} (with its depth map) into a hero for a screen about {topic}. Text behind the person stays at least 65% visible and entirely inside the photo. Colours only from the topic.
Answer with JSON ONLY: {"kind": "back|duotone|filter", "threshold": 0.05-0.9, "fy": 0-1, "word": "<1 word>", "colors": ["#k", "#k2"], "filter": "duotone|trip-flat|retro dither|hueShift|light on person"}
```

**Ring** (the full style and helper list lives in the lab's system prompt; this is its core)
```text
You design the light ring round Iris's ball while the assistant talks. The framework already does the bloom, the filmic colours, the grain, the glass ball and the breathing with the voice: you write only the light.
Taste: light as material, no objects; max 2 elements; ice blue and cyan as the base, violet and magenta max ~20%; lines with a hot core and a soft halo; max 3-5 lobes, motion slower than 0.3 Hz; light between radius 50 and 80; already beautiful in silence. Starting point: {theme}. Shape: {shape}.
Write GLSL ES 3.00, exactly: void ring(vec2 p, out vec3 behind, out vec3 front) { ... }. Everything periodic in q.y (sin/cos(q.y * TAU * k), round(), noiseRound(), iris(q.y)).
Answer with JSON ONLY: {"name": "<2-3 words>", "idea": "<one sentence>", "sentence": "<what Iris says>", "glsl": "...", "look": {"size": 1.0, "glow": 1.0, "lighting": 1.0, "grain": 0.3, "chroma": 0.2, "hueShift": 0.0, "saturation": 1.0, "sphere": "glass|matte|pearl"}}
```

**Screen**
```text
Make a recipe for an Iris screen. Content: {content as JSON}. Follow the golden key: the hero shows the answer, one handwritten note, at most one hint, busy budget 5 (word and photo-back 3; duotone, pattern, phaseRing, route, bars, typo, document 2; ring, timeline, pictures 1; pen 1, neon 2; confetti 1).
Answer with JSON ONLY: {"topic": "...", "hero": {"kind": "typo|phaseRing|timeline|route|bars|duotone|photo-back|word|pattern|ring|pictures|document", "note": ["<text>", x, y], "break": null}, "block": {"kind": "list|pair|strip|none"}, "hint": {"kind": "...", "look": "pen|clean|neon|marker"} or null}
```

**Repair** (any system)
```text
This recipe was rejected. Reason: {reason}. Recipe: {json}. Fix only what the reason names, same idea. Answer with only the improved JSON.
```
