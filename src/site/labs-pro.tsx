// Iris Labs Pro: the sales page, in English and Dutch. The designs on it are drawn live by iris-labs itself, in frames
// (public/labs-pro/frame.html, specs from the design lab in samples.json). The form POSTs to the gate's checkout,
// which starts the neopay subscription; the address never travels in a URL. IrisUI stays free and MIT.

import type { Page } from "./ssr";

const CHECKOUT = "https://try.okayiris.com/labs/checkout";

const T = {
  en: {
    eyebrow: "Iris Labs Pro",
    title: "Iris Labs Pro, 99 euro a year",
    lede: "The design labs behind Iris, for your own projects. Look at them first. The designs below are drawn with the package itself.",
    other: { href: "/resources/labs-pro/nl", label: "Nederlands" },
    reel1: "One salon, three looks",
    reel1Sub: "Same data, three designs from the design lab. Swipe.",
    reel1Frames: ["Quiet", "Rich", "Loud"],
    booking: "Booking app, pastel",
    reel2: "Whole apps",
    reel2Sub: "Four families of work, each with its own app design. The text is placeholder: the design is the product.",
    apps: ["Beauty", "Legal", "Hospitality", "Care"],
    getH: "What you get",
    get: [
      { t: "Looks from the design lab", b: "Pick a look and your page wears it. Colour, type, shape and motion move together." },
      { t: "Five styles", b: "Five complete styles to start from. Each one works in light and dark." },
      { t: "Patterns", b: "Borders, backgrounds and rhythm, straight from the labs. Never hand-drawn copies." },
      { t: "Whole app designs", b: "Describe an app in a few lines. renderApp draws the sidebar, tabs, board, flow or table." },
      { t: "A year of updates", b: "Every version released in your year is yours. Also after it ends." },
      { t: "Your own page, same look", b: "Already built a page with IrisUI? One line each (houseLook and wearLook) gives it a look." },
    ],
    freeH: "What stays free",
    free: "IrisUI, the base kit, stays free and MIT. Every part, token and foundation. Iris customers get Labs Pro with their subscription. That does not change.",
    termsH: "The terms in short",
    terms: ["One licence per developer. Any number of your own projects.", "Ship it inside your products. Do not resell or share the package or your key.", "After your year you keep what came out while it ran."],
    buyH: "Order",
    emailLabel: "Email address for your licence key",
    buy: "Buy for 99 euro a year",
    fine: "You pay through neopay. The key arrives by mail within minutes, once. It renews every year. Stop any time.",
  },
  nl: {
    eyebrow: "Iris Labs Pro",
    title: "Iris Labs Pro, 99 euro per jaar",
    lede: "De designlabs achter Iris, voor je eigen projecten. Kijk eerst. De ontwerpen hieronder zijn met het pakket zelf getekend.",
    other: { href: "/resources/labs-pro", label: "English" },
    reel1: "Een salon, drie looks",
    reel1Sub: "Dezelfde gegevens, drie ontwerpen uit het designlab. Swipe.",
    reel1Frames: ["Rustig", "Rijk", "Luid"],
    booking: "Boekingsapp, pastel",
    reel2: "Hele apps",
    reel2Sub: "Vier soorten werk, elk met een eigen appontwerp. De tekst is voorbeeldtekst: het ontwerp is het product.",
    apps: ["Beauty", "Juridisch", "Horeca", "Zorg"],
    getH: "Wat je krijgt",
    get: [
      { t: "Looks uit het designlab", b: "Kies een look en je pagina draagt hem. Kleur, letter, vorm en beweging gaan samen." },
      { t: "Vijf stijlen", b: "Vijf complete stijlen om mee te beginnen. Elk werkt in licht en donker." },
      { t: "Patronen", b: "Randen, achtergronden en ritme, rechtstreeks uit de labs. Nooit met de hand nagetekend." },
      { t: "Hele app-ontwerpen", b: "Beschrijf een app in een paar regels. renderApp tekent de zijbalk, tabs, het bord, de stroom of de tabel." },
      { t: "Een jaar updates", b: "Elke versie die in jouw jaar uitkomt is van jou. Ook als het jaar voorbij is." },
      { t: "Je eigen pagina, dezelfde look", b: "Al een pagina met IrisUI gebouwd? Met een regel code (houseLook en wearLook) krijgt hij een look." },
    ],
    freeH: "Wat gratis blijft",
    free: "IrisUI, de basiskit, blijft gratis en MIT. Elk onderdeel, elke token en elke basis. Iris-klanten krijgen Labs Pro bij hun abonnement. Dat verandert niet.",
    termsH: "De voorwaarden kort",
    terms: ["Een licentie per ontwikkelaar. Zoveel eigen projecten als je wilt.", "Lever het mee in je producten. Verkoop of deel het pakket en je sleutel niet door.", "Na je jaar houd je wat in die tijd is uitgekomen."],
    buyH: "Bestellen",
    emailLabel: "E-mailadres voor je licentiesleutel",
    buy: "Koop voor 99 euro per jaar",
    fine: "Je betaalt via neopay. De sleutel komt binnen enkele minuten per mail, eenmalig. Hij verlengt elk jaar. Stop wanneer je wilt.",
  },
} as const;

/** One design, drawn with iris-labs on our side and shown as a picture (1x and 2x): the package itself is not published. */
function Phone({ id, label, alt }: { id: string; label: string; alt: string }) {
  return (
    <figure className="ph">
      <img src={`/labs-pro/${id}-1x.webp`} srcSet={`/labs-pro/${id}-1x.webp 1x, /labs-pro/${id}-2x.webp 2x`} width={390} height={760} alt={alt} loading="lazy" decoding="async" />
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function View({ lang }: { lang: "en" | "nl" }) {
  const t = T[lang];
  return (
    <div lang={lang}>
      <header className="hero-head">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="lede">{t.lede}</p>
        <div className="hero-actions">
          <a className="btn-primary" href="#buy">{t.buy}</a>
          <a className="btn-ghost" href={t.other.href} hrefLang={lang === "en" ? "nl" : "en"}>{t.other.label}</a>
        </div>
      </header>
      <section className="sec">
        <h2 id="salon">{t.reel1}</h2>
        <p className="foot-dim">{t.reel1Sub}</p>
        <div className="reel" role="region" aria-label={t.reel1} tabIndex={0}>
          {t.reel1Frames.map((n, i) => <Phone key={n} id={`salon-${i}`} label={n} alt={`${t.reel1}: ${n}`} />)}
          <Phone id="booking" label={t.booking} alt={t.booking} />
        </div>
      </section>
      <section className="sec">
        <h2 id="get">{t.getH}</h2>
        <div className="cards">
          {t.get.map((c) => (
            <div className="card" key={c.t}>
              <h3>{c.t}</h3>
              <p>{c.b}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="sec">
        <h2 id="apps">{t.reel2}</h2>
        <p className="foot-dim">{t.reel2Sub}</p>
        <div className="reel" role="region" aria-label={t.reel2} tabIndex={0}>
          {t.apps.map((n, i) => <Phone key={n} id={`app-${i}`} label={n} alt={`${t.reel2}: ${n}`} />)}
        </div>
      </section>
      <section className="sec">
        <h2 id="free">{t.freeH}</h2>
        <p>{t.free}</p>
      </section>
      <section className="sec">
        <h2 id="terms">{t.termsH}</h2>
        <ul>{t.terms.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>
      <section className="sec">
        <h2 id="buy">{t.buyH}</h2>
        <form className="buy" action={CHECKOUT} method="post">
          <input type="hidden" name="lang" value={lang} />
          <label htmlFor="labs-email">{t.emailLabel}</label>
          <div className="hero-actions">
            <input id="labs-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
            <button className="btn-primary" type="submit">{t.buy}</button>
          </div>
        </form>
        <p className="foot-dim">{t.fine}</p>
      </section>
    </div>
  );
}

export function labsProPages(): Page[] {
  return (["en", "nl"] as const).map((lang) => ({
    path: lang === "en" ? "/resources/labs-pro" : "/resources/labs-pro/nl",
    title: T[lang].title,
    description: T[lang].lede,
    headings: [],
    content: <View lang={lang} />,
    md: `# ${T[lang].title}\n\n${T[lang].lede}\n\n${T[lang].get.map((c) => `- ${c.t}: ${c.b}`).join("\n")}\n\n${T[lang].free}\n`,
  }));
}
