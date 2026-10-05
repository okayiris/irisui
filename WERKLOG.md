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
Aanvulling: web-app, Mac-instellingen en Chrome-zijpaneel draaien nu helemaal op `IrisApp` (`spec.rail` = NavRail links, sheets van rechts, `onState`). Commits 103acb6 (`public/examples/web/index.html`), 2353e9a (mac), f3c684e (chrome). Eén spec in plaats van handwerk, `checkApp` toetst ze live. Screenshot: ![Web op IrisApp](.playwright/screenshots/werklog/2026-10-01-web-op-irisapp.png)
Aanvulling: commit 4ede6ad (`public/examples/web/index.html`, `public/examples/chrome/index.html`). Zoeken op "What Iris did" is terug (`IrisApp` each + filter/where uit 83ce3e1). In het Chrome-zijpaneel staat Stop (daarna Close) rechtsboven als top-actie. Verstuurde berichten: een bericht geeft eerst "Iris is thinking." en na 1,5 s haar antwoord, via Field `on` + `later:` in `IrisApp` (commit a33830c, `public/examples/web/index.html`). Screenshot: ![Web zoeken](.playwright/screenshots/werklog/2026-10-01-web-zoeken.png)
Aanvulling: de voorbeelden gebruiken nu de nieuwe echte componenten (9f55cea) in plaats van eigen nabouw. Mac f762e7d: pill is `MacPill`. Web 258504e: What Iris did is `TableApp`. Vault 6e28b60: Mac vraagt met `VaultAsk`, kluisvenster is NavRail + `TableApp` met Add. Chrome 9157789: wachtwoord bewaren is `VaultAsk`. Screenshot: ![Vault met TableApp](.playwright/screenshots/werklog/2026-10-01-vault-tableapp.png)
Opgelost in 38f1015 (componentfix, nagekeken op web en vault): `TableApp` knipte de titel, het zoekveld stak uit en de sheet bedekte niet het hele venster. Stappen lopen nu door op een volgende regel.
Aanvulling: de vault op de telefoon vraagt nu met de house `VaultAsk` in zijn `IrisApp`-sheet (commit 0b6ef2d, `public/examples/vault/index.html`). Kon doordat `IrisApp` in 935dfdf elke `onX`-prop als actie-tekst begrijpt. Screenshot: ![Vault telefoon met VaultAsk](.playwright/screenshots/werklog/2026-10-01-vault-telefoon-vaultask.png)
Gecontroleerd: party (koraal, 0981c54) op telefoon Neon, Chats en TV-foto leest goed. `Explain` komt in geen voorbeeld voor.
Opgelost in c1c0e7d (componentfix, nagekeken, canvas weer 358px breed): het grote woord "Party" op Neon tekende niets sinds 74d4791 (`Word` kreeg een `.ix-word`-omhulsel dat in de hero 0 breed werd).
Open: TV-foto is nog de `Photo`-placeholder (de kleur leest goed, maar er is geen echte foto met dieptekaart in de repo).
Aanvulling Android (`public/examples/index.html`, commit 54047b2): statusbalk toont "5G", een batterijvorm en "80%" in plaats van losse tekens. De tabbalk staat op Android op een dichte strook met de gesture-balk erin, ruim 10px vrij van de labels en de orb. Terug op detailschermen werkte al via `IrisApp`. Screenshot: ![Android-statusbalk](.playwright/screenshots/werklog/2026-10-01-android-statusbalk.png)

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

## 2026-10-01 IrisApp als venster

**Wat**
`spec.rail` geeft een NavRail links, de pagina ernaast (max 760 breed), sheets schuiven van rechts in en dialogen staan gecentreerd. `tab:i` schakelt de rail. Commit c3f0d3f.
Joris koos ook: topic-kleuren verschuiven, Word zonder doos, MacPill, TableApp en VaultAsk als echte componenten (agents bezig).
Commit 178e249 (`src/ds/app.tsx`): een tekstveld voert na Enter zijn actie uit, met de verstuurde tekst erbij. `set:key=` zet een lege tekst in plaats van 0. Zo kan het web-voorbeeld na versturen een antwoord krijgen; de voorbeeldagent zette zoeken en Stop/Close terug in 4ede6ad.
Commit 935dfdf (`src/ds/app.tsx`): elke `onIets`-prop met een actietekst wordt in IrisApp een echte handler. Zo kan VaultAsk (onAllow/onDeny/onAlways) binnen een app-spec acties uitvoeren; de vault op de telefoon kon daardoor niet op VaultAsk. Joris koos ook: explain wordt zachtgeel, party koraalroze (componentagent bezig).
Commit 83ce3e1: lijsten filteren op zoektekst of veld (`each` + `filter`/`where`), `later:ms:actie` voert een actie na een wachttijd uit, `top:` zet één actie rechtsboven in de kop, een lege lijst telt als onwaar.

**Waarom**
Web, Mac-instellingen, vault en Chrome bouwden dezelfde schil vier keer. Joris koos voor een vensterschil.
De voorbeeldagent zette web (103acb6), Mac-instellingen (2353e9a) en het Chrome-paneel (f3c684e) volledig op het venster en verloor daarbij zoeken, het antwoord na versturen en een knop boven de vouw. Dat is nu terug. Android-fixes: 54047b2.

**Bestanden**
`src/ds/app.tsx`, `src/ds/ext.css` (`.ia-win`).

![IrisUI](.playwright/screenshots/werklog/2026-10-01-irisapp-window.png)

## 2026-10-01 Keuzes van de eigenaar uitgevoerd: topic-kleuren en drie nieuwe componenten

**Wat**
Topic-kleuren aangepast: mail blauwgrijs, sport oranje, tasks teal. Violet blijft alleen voor aan en de ring, rood alleen voor vernietigend. Word heeft geen getint vlak meer achter het woord (74d4791).
Drie nieuwe componenten, elk met eigen pagina, uitleg en werkende demo (9f55cea): MacPill (orb, uitschuivende balk, statusregel met de weg terug, badge), VaultAsk (wie, vanaf waar, waarom, wat het doet, hoe ver het reikt, toestaan of nee), TableApp (zoeken, filterknoppen, rijen, telregel, rij opent zijpaneel).
Commit 78e1956: de eigenaar besliste dat het magenta voor "wacht op jou" in ChatStack en CircleStack blijft. Een fasekleur mag buiten de ring staan als hij een fase van een loop aangeeft (vastgelegd in `src/site/content/foundations-meaning.ts`). De omzetting naar de wachtkleur is teruggedraaid in `src/ds/ext.css` en `src/ds/ext.tsx`.
Widget: het vinkje voor "klaar" krijgt de kleur van het topic in plaats van violet. De kop "MONDAY" in WidgetPagesApp is gedimd in plaats van rood (`public/demos.css`).
De tabel "Which Iris, how big" is documentatie, dus meerdere orbs naast elkaar mogen daar. Eén zin hierover in `src/site/ext-docs.ts`.
Commit 0981c54: de eigenaar besloot ook explain en party om te kleuren. explain gaat van violet naar koel, zacht geel (#ede98a), duidelijk anders dan de wachtkleur zodat een topic nooit leest als "wacht". party gaat van magenta naar koraalroze (#fdab9f), net niet rood. Contrast boven 9:1 op de achtergrond en op de eigen ondergrond. BorderPattern "wacht op jou" gebruikt nu de wachtkleur in plaats van magenta.
TableApp in een IrisApp-venster (38f1015): examplesfix zag vier fouten op de webpagina "What Iris did".
- De titel was afgeknipt ("oday"): de AppBar kreeg de negatieve marge van het scherm. Hij lijnt nu uit met de rand van het scherm.
- Het zoekveld groeide tijdens het typen. Het heeft nu een vaste breedte van 240px.
- Het detailpaneel opent nu vanaf de zijkant van het hele venster, niet alleen boven de lijst. Nieuwe prop `onOpen(row)` laat een pagina een rij zelf openen.
- Een lange stap in een detail loopt door op de volgende regel in plaats van af te breken met "...".
Commit c1c0e7d: het neon-woord "Party" op het Neon-scherm van de voorbeeld-app was leeg. Word had eerder een omhulsel gekregen (om het getinte vlak weg te halen). In een rooster dat de inhoud centreert kromp dat omhulsel tot 0px breed, dus het woord kon niet tekenen. Het omhulsel neemt nu altijd de volle breedte, overal waar een Word in zo'n rooster staat (`src/ds/ext.css`).

**Waarom**
Vervolg op de audit: de topic-kleuren botsten met de kleurregels. De eigenaar koos de verschuiving, Word zonder doos en de drie componenten.

**Bestanden**
`src/ds/ext.tsx`, `src/ds/ext.css`, `src/site/ext-components.ts`, `src/site/ext-docs.ts`, `src/site/content.ts`, `src/site/content/overrides-apps.ts`, `src/site/content/foundations-a.ts`, `src/site/content/foundations-meaning.ts`, `src/site/content/overrides-brand.ts`, `public/demos.css`.

Stand: alle agents klaar, alles lokaal gecommit, niets gepusht. Het neon-woord "Party" op het telefoonvoorbeeld bleef leeg sinds Word een wrapper kreeg (74d4791); opgelost in c1c0e7d en nagekeken op screenshot: het woord staat er in koraal, zonder doos. Eerder open, nu opgelost (zie blok "Frost F5 en home in warm zand"): eigen kleur voor het home-topic en welke Frost (F1-F6 in Ringlab) naar het weerscherm gaat.

## 2026-10-01 Frost F5 en home in warm zand

**Wat**
Commit b296186 (`src/ds/ext.tsx`, `src/ds/ext.css`): ThemeWord "frozen" is nu Ringlabs F5. IJsvarens groeien vanuit de onderhoeken naar een schoon ijswit woord, zonder doos. Een tik laat ze opnieuw groeien.
Het home-topic is warm zand (#e6c79c) in plaats van het wachtgeel.

**Waarom**
Joris koos vanochtend F5 uit de zes nieuwe Frost-varianten. Geel moet alleen nog "wachten" betekenen. De open vragen over Frost en home-kleur in eerdere blokken van vandaag zijn hiermee opgelost.

**Bestanden**
`src/ds/ext.tsx`, `src/ds/ext.css`.

![IrisUI](.playwright/screenshots/werklog/2026-10-01-frost-f5.png)

## 2026-10-01 Dev-server herlaadde zichzelf eindeloos

**Wat**
`scripts/dev.mjs` (poort 4173) herlaadde de browser elke ~3 seconden. De watcher negeert nu `public/ds/ext.(js|css)`. Wijzigingen in `src/ds/ext.*` triggeren nog gewoon een rebuild. Server herstart, 10s op `/__dev` geluisterd: geen builds meer.

**Waarom**
`scripts/build-ext.mjs` schrijft `public/ds/ext.js` en `public/ds/ext.css`, en `public/` werd bewaakt. Elke build triggerde dus de volgende.

**Bestanden**
`scripts/dev.mjs`.

## 2026-10-01 Zijmenu blijft staan bij klikken

**Wat**
`.side` sprong bij elke klik op een menulink terug naar boven (elke link is een volledige paginalading). `public/site.js` slaat nu `scrollTop` van `.side` op in `sessionStorage` (`irisui:side`) bij `pagehide` en zet hem bij laden terug. Getest in Chrome op `http://localhost:4173/components/select`: menu op 900px, klik op Select, nieuwe pagina staat op 900px met Select gemarkeerd.

**Waarom**
Volledige paginalading start altijd bovenaan, dus het menu verloor zijn plek.

**Bestanden**
`public/site.js`.

## 2026-10-01 Buurregels in Meaning en een Picture-onderdeel

**Wat**
Meaning krijgt de sectie "Neighbours": N1 een 'nu' per scherm, N2 een woord herhaalt zijn lijst niet, N3 een drukke tegel per rij, N4 rustige buren voor de theme-widget, N5 patroon alleen achter een paneel, N6 een getal zegt wat het telt. `checkApp` toetst ze (commit 2bd687d).
IrisApp krijgt het onderdeel Picture: een foto als inhoud met bijschrift.

**Waarom**
Regels voor wat naast elkaar mag, uit het Ringlab-werk, horen in het ontwerpsysteem. Foto's als inhoud ontbraken.

**Bestanden**
`src/site/content/foundations-meaning.ts`, `src/ds/app.tsx`, `src/ds/ext.css`.

## 2026-10-01 Vegen tussen tabbladen

**Wat**
In IrisApp wissel je met horizontaal vegen van tabblad: eerst de eigen Tabs van het scherm (Today/All), anders de tabbalk op een tab-hoofdscherm. De pil van de tabbalk volgt de vinger (TabBar progress). Vegen dat begint in een rail, pagina's, carousel, veld of sheet blijft daar (commit f749f22). Getest: Today -> Calls -> Camera en terug.

**Waarom**
Joris merkte dat tabs nog niet met gebaren werkten.

**Bestanden**
`src/ds/app.tsx`.

## 2026-10-01 Light en dark mode voor Iris

**Wat**
Iris heeft light en dark: volgt `prefers-color-scheme`, `data-mode="light|dark"` op `<html>` overrulet (besluit Joris, was "dark only"). Light tokens en `light-dark()`-helften voor de vaste donkere kleuren van de release in `src/ds/ext.css`. Lichte topic- en fasekleuren (`TOPIC_LIGHT`, >= 4.5:1) in `src/ds/ext.tsx`, wisselen live mee.
Site: Auto/Light/Dark-schakelaar in de header (`Shell.tsx`, localStorage `iris-mode`); `site.css`, `demos.css`, demo-frames en examples volgen mee.
Gate (`scripts/check.mjs`) meet contrast in de browser in light en dark; lokale Ringlab-pagina's (`/lab/*`, theme-lab) overgeslagen omdat ze hangen.
Docs: AGENTS.md regel 4, `docs/HANDOVER-examples-meaning.md`, Colour-hoofdstuk met beide waarden.
Commits: e43ba5e, b1cebf7, 6093c65, d6d708a, 8adcf46.
Open: PhaseRing-track en device-mockups van de release blijven donker; topic-accenten in light halen 4.5:1, niet de 6:1 huisnorm.

**Waarom**
Joris wilde een lichte variant naast de donkere. De gate moest die ook bewaken, anders kruipt slecht contrast erin.

**Bestanden**
`src/ds/ext.css`, `src/ds/ext.tsx`, `src/site/Shell.tsx`, `src/site/site.css`, `src/site/demos.css`, `scripts/check.mjs`, `AGENTS.md`, `docs/HANDOVER-examples-meaning.md`, `src/site/content/foundations-a.ts`.

## 2026-10-01 Release v33

**Wat**
IrisUI v33 gepubliceerd naar https://okayiris.github.io/irisui/ (gh-pages), gebouwd uit een schone worktree zonder Ringlab-modules (`IRISUI_INTERNAL` leeg); tag v33 lokaal. Versie 33.0.0, release notes "Release v33" (`src/site/content/resources.ts`, `nav.ts`, `package.json`, README).
Gate eerst 14 fouten, opgelost: dode links naar labs (Labs-link uit de publieke voorbeeldbalk, `public/examples/nav.js`), dubbele h1/main (IrisApp is nu een section met h2-titel in `src/ds/app.tsx`, root van overzicht en web is main), orbmaten (chrome 16, tv TalkOrb). Meaning en `site.css` noemen geen Ringlab meer.
Gate: 118 pagina's en 160 demo-frames schoon; live site toont v33 en geen Ringlab.
Commits: 6301ecd, 8886d40, bd9e6fa, d94b6eb, 91b48e9.
Niet gedaan: main niet naar GitHub gepusht, npm-pakket `@okayiris/ui` niet gepubliceerd (was nooit); ongecommitte wijzigingen van een andere sessie (`public/site.js`, `scripts/dev.mjs`) niet meegenomen.

**Waarom**
Joris: "Kan je de ui kit even release, v+1 ... je moet niet de lab releasen, die blijft alleen van ons."

**Bestanden**
`src/site/content/resources.ts`, `src/site/content/nav.ts`, `package.json`, `README.md`, `public/examples/nav.js`, `src/ds/app.tsx`, `src/site/site.css`.

## 2026-10-01 Release v34: Card met topic

**Wat**
- `Card` krijgt `topic`: stille onderwerp-ondergrond zoals een Widget, eerste label in de onderwerpkleur, geen beweging of drukte. `IrisApp` geeft `topic` door. Docs, preview en types bijgewerkt, release-notes "Release v34".
- Check groen (118 pagina's, 161 demo's). Commit 000464a, tag v34. Site gepubliceerd vanuit schone worktree op v34: okayiris.github.io/irisui, geen Ringlab.
- Pakket `iris-ui` 34.0.0 in de pluginwinkel; testhuis tthc8 bijgewerkt.

**Waarom**
- De Plugins-kaarten in de app misten een categoriekleur. Regel van Joris: een ontbrekend onderdeel bouwen we direct in de kit.

**Bestanden**
- `Card`-component, `src/ds/app.tsx`, docs, preview, types, `src/site/content/resources.ts`, `package.json`.
