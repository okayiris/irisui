# Werklog

## 2026-09-30 Controle standalone IrisUI (design system v32)

**Wat**
Alleen gecontroleerd, geen code gewijzigd. `pnpm test` groen (100 pagina's, 136 demo-frames, 21 artifact-previews), typecheck schoon, geen console-fouten. Geen verwijzingen naar AGI/iris-1, geen geheimen gevonden; `dist` en `.build` staan in `.gitignore`.
Open punten: repo heeft nog geen commits en geen remote; 113 em/en-dashes in teksten; README noemt `pnpm weigh` maar dat script ontbreekt in `package.json`; logo "Iris UI" breekt op mobiel naar twee regels; `package.json` heeft `"private": false`; `/usr/bin/git` geblokkeerd door niet-geaccepteerde Xcode-licentie.

**Waarom**
Vooraf nagaan of de losse IrisUI-map schoon en zelfstandig is, voordat hij een eerste commit en remote krijgt.

**Bestanden**
Geen gewijzigd. Em/en-dashes zitten in `artifact/README.md`, `src/site/ssr.tsx`, `src/content/README.md`, `README.md` en `package.json`.

## 2026-09-30 npm-pakket @okayiris/ui

**Wat**
Pakket `@okayiris/ui` (v32.0.0) toegevoegd: `pnpm build:npm` (`scripts/build-npm.mjs`) bouwt uit `public/ds` naar `pkg/` (gitignored). ESM-wrapper zet de React van de app op `globalThis`, laadt `bundle.js` en `ext.js` en exporteert alle 52 onderdelen; `styles.css`, tokens, fonts en types (core plus gegenereerd uit `src/ds/ext.tsx`) zitten erbij.
Root `package.json` nu `"private": true` (site-pakket kan niet per ongeluk naar npm) plus script `build:npm`. `Badge` children optioneel gemaakt in `src/ds/ext.tsx`.
Getest als gebruiker: tarball in los testproject, `tsc` schoon (skipLibCheck false), esbuild-bundel rendert in Chromium.
Nog niet gepubliceerd: npm-login en org `okayiris` ontbreken. Geen UI-wijziging aan de site.

**Waarom**
Design system bruikbaar maken in andere projecten via `pnpm add @okayiris/ui`.

**Bestanden**
`scripts/build-npm.mjs` (nieuw), `package.json`, `src/ds/ext.tsx`, `.gitignore` (pkg/).

## 2026-09-30 Voorbeeldpagina /examples/: klikbare Iris-app

**Wat**
Nieuwe pagina `/examples/`: klikbare Iris-app in een telefoonkader, 10 schermen (Today, Groceries, Loops, One loop, Talking, You, Permission, Loading, Empty, Error), gebouwd uit `window.IrisUi`, plus overzicht "All screens". Per scherm een regelpaneel: busy-score, regels die het houdt (groen) en open vragen (geel).
Navlink "Examples: the app" in `Shell.tsx`, homeknop "See it as an app" in `pages.tsx`. Gate groen (101 pagina's). Commit 2eab7e2, niet gepubliceerd.
Twee systeemfouten gevonden: `Dialog`/`Sheet` zitten in een demo-`Stage` (gestippeld kader), dus in een echt scherm landt de dialoog onder de lijst (omzeild met CSS op de voorbeeldpagina; echte fix hoort in `src/ds/ext.tsx`); `Anchor` telt één per pagina in plaats van per scherm.

**Waarom**
Site was veel tekst, weinig voorbeelden. Joris wil het als echte app kunnen testen en de regels (busy budget, anchor, pen, hero) aanscherpen.

**Bestanden**
`public/examples/index.html` (nieuw), `src/site/Shell.tsx`, `src/site/pages.tsx`. Draait op http://localhost:4173/examples/ , screenshot (boodschappenscherm): ![Boodschappenscherm](.playwright/screenshots/werklog/2026-09-30-examples-app.png)

## 2026-09-30 Design system zonder Loops-tab: CircleStack en LoopBubble

**Wat**
Design system bijgewerkt naar de iPhone-app zonder Loops-tab (sinds 29-09). Twee nieuwe onderdelen, nagebouwd uit `Nova/Sources/Views/CirkelStapel.swift` en `LoopClock.swift` in AGI: `CircleStack` (gesprekken met hun loops gestapeld achter de strook, waaiert uit tot kaarten) en `LoopBubble` (een loop klein: letter plus zes fasebogen). Nieuwe tokens `--bubble-disc` en `--phase-you`.
Release (`bundle.js`, `src/content`) bewust niet aangepast; het verschil staat in de sitetekst (TabBar-uitleg, twee patroonpagina's). `artifact/` herbouwd (23 onderdelen).
`pnpm test` groen (102 pagina's, 139 frames, 23 artifact-previews). Pakket `@okayiris/ui` nu 54 onderdelen. npm-token opgeslagen als `NPM_OKAYIRIS_TOKEN`, nog niet gepubliceerd. Niet gecommit.

**Waarom**
Het design system beschreef nog de oude Loops-tab.

**Bestanden**
`src/ds/ext.tsx`, `src/ds/ext.css`, `src/site/ext-components.ts`, `src/site/ext-docs.ts`, `src/site/content/{overrides-brand,patterns-a,patterns-b,resources}.ts`, `artifact/` (herbouwd).

## 2026-09-30 Voorbeelden uitgebreid: Calls, web, Android, macOS

**Wat**
Vervolg op `/examples/`. Loops is uit het product: de Loops-schermen zijn weg, tab twee heet nu Calls. Nieuw neon-scherm (Word neon + Pen neon = busy 5/5).
Web-app voorbeeld in `examples/web/`: talk page, abonnementspagina (plan bovenaan, plantegels, codeveld pas bij klik met de fout naast het veld, Awake met uitleg), boodschappen en "What Iris did" (1 regel per taak).
Alles verbonden met een gedeelde balk (`examples/nav.js`): iOS, Android, macOS, Web, overal dezelfde dag van Alex. Android = dezelfde app in een Android-toestel met 4 open vragen (geen Android-hoofdstuk). macOS (`examples/mac/`) = MacPill op het bureaublad met panelen Calls/Chats/Settings/Vault en Spotlight-typveld.
Mac en web staan in een eigen map omdat de gate alleen `index.html` test; gate nu 105 pagina's schoon. Commits 1fbf047 en 05c7a6e, niet gepubliceerd.

**Waarom**
De voorbeelden moesten de nieuwe app (zonder Loops) volgen en alle platforms als één samenhangend verhaal laten zien.

**Bestanden**
`examples/nav.js`, `examples/web/`, `examples/mac/`, Android- en Calls-schermen in de voorbeelden. Screenshot: ![Platformen](.playwright/screenshots/werklog/2026-09-30-examples-platforms.png)

## 2026-09-30 Photo, BorderPattern en ChatStack uit de Ringlab-labs

**Wat**
Drie nieuwe onderdelen in het design system, overgenomen uit de Ringlab-labs: `Photo` (foto met dieptekaart: woord achter de persoon, duotone, parallax), `BorderPattern` (8 animerende randpatronen) en `ChatStack` (chats als gestapelde kaarten in topic-kleur, waaiert uit en opent). Met tokens, focusring en reduced-motion. Geen foto meegeleverd: `Photo` tekent zelf een neutrale scène met bijpassende dieptekaart. Elk onderdeel heeft een eigen pagina.
Checks groen: typecheck, build, check, check:artifact. Commit e87e3eb, alleen eigen blokken (een andere sessie had ongecommit werk in dezelfde bestanden).

**Waarom**
De labs waren losse schetsen. Nu zijn het echte onderdelen die je kunt hergebruiken.

**Bestanden**
`src/ds/ext.tsx`, `src/ds/ext.css`, `src/site/ext-components.ts`, `src/site/ext-docs.ts`, `artifact/components/{Photo,BorderPattern,ChatStack}/`. Screenshot: ![ChatStack](.playwright/screenshots/werklog/2026-09-30-photo-border-chatstack.png)
