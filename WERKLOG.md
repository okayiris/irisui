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

## 2026-10-01 Voorbeelden aangevuld: alle onderdelen in een echt scherm

**Wat**
31 onderdelen uit de Iris UI zaten in geen enkel voorbeeld; nu staat elk minstens een keer in een echt scherm.
Telefoon (`public/examples/index.html`): nieuwe schermen Weather (ThemeWord, Stat, Carousel), Loops (AppBar, PhaseRing, LoopBubble), One loop (LoopScreen), Chats (ChatStack), Remind me (Steps, TextArea, DatePicker, TimePicker). Verder CircleStack op Today, Sheet met Slider/Select/Divider op You, Edge langs het ladende blok.
Web (`web/index.html`): SplitButton, Stat, Pattern, BorderPattern, Tabs, SearchField, Toolbar, Menu, Tooltip, Badge. Mac (`mac/index.html`): Settings-zijbalk is NavRail. TV (`tv/index.html`): EdgeText, Orb3D, Photo met PageDots.
Niet toegevoegd: MacPill (zit niet in de bundle), App layouts en Showcases (docs-demo's). Gate: examples schoon; 111 site-fouten "iframe zonder title" komen uit ander werk. Commit a10258e, niet gepusht.

**Waarom**
De voorbeelden testen het systeem; onderdelen zonder voorbeeld waren nooit in een echt scherm geprobeerd.

**Bestanden**
`public/examples/index.html`, `public/examples/web/index.html`, `public/examples/mac/index.html`, `public/examples/tv/index.html`. Screenshot: ![Voorbeelden aangevuld](.playwright/screenshots/werklog/2026-10-01-examples-aangevuld.png)

## 2026-10-01 Interactieregels voor Iris UI

**Wat**
Nieuwe foundation-pagina "Interaction" (`/foundations/interaction`) met regels voor indrukken, openen en terug, sheets, vegen over rijen, lijsten die veranderen, het klaar-moment, haptics (iOS en Android), springs alleen na een vinger en zuinig bewegen. Bron: de audit van de micro-interacties in de iPhone- en Android-app van 1 oktober.
Motion-pagina (`foundations-b.ts`): een uitzondering op "no springs", alleen waar een vinger loslaat en zonder doorschieten.
`pages.tsx`: helper `ink()` toont backticks in geschreven content nu als code. Voorheen stonden ze op de hele site letterlijk in beeld.
Commit bf94d30, niet gepusht, niet gepubliceerd.

**Waarom**
Joris vroeg om interactieregels. De audit liet zien dat de apps op dit vlak van elkaar afweken, dus de regels staan nu op een plek.

**Bestanden**
`src/site/content/foundations-interaction.ts` (nieuw), `src/site/content.ts`, `src/site/nav.ts`, `src/site/content/foundations-b.ts`, `src/site/pages.tsx`. Screenshot: ![Interactieregels](.playwright/screenshots/werklog/2026-10-01-interaction.png)

## 2026-10-01 IrisApp: hele app uit een JSON-spec

**Wat**
`IrisApp` (`src/ds/app.tsx`) tekent een hele app uit een JSON-spec met de echte componenten: navigatiestapel, sheet, dialoog (4 tot 5 lagen) en Rail, Pages, Bento en Meter om te swipen. `checkApp` toetst de Meaning-regels als code.
Telefoonvoorbeelden (`public/examples/index.html`) herbouwd als een spec, alles klikbaar, met live regelcheck per scherm.
Componentfixes in `src/ds/ext.css` en `ext.tsx`: Row in Card zonder eigen glas, LoopScreen zonder tweede frame, AppBar-sub, EmptyState zonder nep-orb, Stat krimpt mee.
Commits d30ecb6, 751ceba. Aanvulling: commit 0521a7b, IrisApp vult nu `{state}` in teksten van sheets en dialogen, in de tweede knop en in snackbar-meldingen (voorheen stond er "Call at {retry}"). Op een breed scherm staat de snackbar rechtsonder. Gevonden door de agent die de voorbeelden voor de andere platformen fixt.
Aanvulling: commit d4dfa65, `IrisApp` meldt zijn stand aan de pagina eromheen (`onState`) en een sheet kan na de primaire knop extra knoppen dragen (`actions[]`). Nodig voor de voorbeelden die web, Mac, Chrome, TV en vault herbouwden (9da954c, 7dfe009, eb8a684, 2c20b89, ea205b8, c4d0280, eb72709).

**Waarom**
Voorbeelden en layout-generator waren statisch en liepen achter op de componenten. Joris wees 8 fouten aan: 2 orbs, dozen in dozen, LoopScreen-frame, AppBar, demo-schakelaars.

**Bestanden**
`src/ds/app.tsx`, `src/ds/ext.css`, `src/ds/ext.tsx`, `public/examples/index.html`.

![IrisUI](.playwright/screenshots/werklog/2026-10-01-irisapp-voorbeelden.png)

## 2026-10-01 Voorbeelden web, Mac, Chrome, TV en vault met echte componenten

**Wat**
Voorbeeldpagina's web, Mac, Chrome, TV en vault herbouwd na een harde audit (51 punten). Nagebouwde lookalikes vervangen door echte house-componenten: NavRail, AppBar, StatusPill, Menu, Sheet, Dialog, Row, SearchField. Paneel- en telefoonachtige delen (Mac calls/vault, TV scherm kiezen, vault telefoon) draaien op `IrisApp` met een JSON-spec.
`nav.js`: de balk loopt nu van rand tot rand, ook op de labs.
Commits 9da954c, 7dfe009, 2c20b89, ea205b8, c4d0280, eb72709.
Aanvulling: het Mac-voorbeeld toont "Call at {retry}" weer ingevuld, nu `IrisApp` sheet-tekst en snacks invult (commit eb8a684, `public/examples/mac/index.html`).
Open: `MacPill`, `DashboardApp`, `TableApp` e.d. bestaan niet als component. Android-punten zitten in `index.html` en zijn niet aangeraakt.

**Waarom**
Meaning-regels afdwingen: een orb per oppervlak, rood alleen voor verwijderen, violet alleen voor aan en haar ring, haar aanwezigheid linksboven, een primaire actie. Elke knop doet iets echts, demo-knoppen staan niet meer in de app.

**Bestanden**
`public/examples/{web,mac,chrome,tv,vault}/index.html`, `public/examples/scenes.js`, `public/examples/nav.js`. Screenshot (web, `?s=groceries`, 1440x900): ![Voorbeelden met echte componenten](.playwright/screenshots/werklog/2026-10-01-voorbeelden-echte-componenten.png)

## 2026-10-01 Componentbevindingen uit de strenge audit opgelost

**Wat**
Live frames krijgen de hoogte van hun inhoud (`public/site.js`). Op 390 en 1400 breed loopt geen frame meer over (`src/site/demos.ts`, `public/demos.css`).
Orb3D tekent weer (shaderfout). Toggle schakelt zelf en heeft een naam. SplitButton is een vorm. Divider toont zijn label. DatePicker en TimePicker passen op een telefoon (`src/ds/ext.tsx`, `src/ds/ext.css`).
Debugregels ("Chosen: ...") onder componenten weg, demo-knoppen doen iets.
Overrides kunnen release-previews vervangen door eigen demo's (`src/site/content.ts`, `overrides-core.ts`, `overrides-brand.ts`, `ext-components.ts`).
Commits 41dc700, 5eb4562, ec02d1c, ea40ed3, ed17540, 4b81521.
Open smaakvragen voor Joris: topic-kleuren (mail violet, sport rood, tasks magenta), het doosje van Word, de kwaliteit van ThemeWord, de magenta "you"-fasekleur in ChatStack.

**Waarom**
Demo's liepen over op 390 breed, frames hadden vaste hoogtes, demo-knoppen deden niets, er stonden debugregels onder componenten en kleur- en copyregels werden gebroken.

**Bestanden**
`public/site.js`, `public/demos.css`, `src/site/{demos,content,overrides-core,overrides-brand,ext-components}.ts`, `src/ds/ext.tsx`, `src/ds/ext.css`.
