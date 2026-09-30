// Foundations: meaning. What each of her drawings stands for, and so where it may and may not go.
// The sizes live in the Mark doc ("Which Iris, how big"); this page is about what a drawing says.

import type { Doc } from "../content";

export const FOUNDATIONS_MEANING: Record<string, Doc> = {
  meaning: {
    id: "meaning",
    label: "Meaning: what may go where",
    lede:
      "Every drawing in Iris says something. An orb is Iris, light means she is working, her hand means something personal, a colour means a kind of thing. Nothing is a picture to fill a corner.",
    sections: [
      {
        title: "One rule over all of it",
        blocks: [
          {
            kind: "p",
            text:
              "Show a thing only when what it says is true, and take it away the moment it stops being true. The only drawings allowed to just look nice are listed under Decoration, and they still count toward the busy budget.",
          },
        ],
      },
      {
        title: "Orbs: the five rules",
        blocks: [
          {
            kind: "ol",
            items: [
              "An orb is always her. What is not Iris never gets an orb: not a person, not another app, not a feature.",
              "The state tells the truth. Busy only while she works on it, listening only while the mic is open, thinking only while she thinks. Never motion for show.",
              "One Iris per place. One orb per surface that speaks for her; in a list, only the rows she is handling right now carry one.",
              "Never decoration: no orb as a bullet, a divider, a background, an illustration, an avatar or a spinner for work that is not hers.",
              "A new drawing needs a meaning first. A ring, form or pattern from the lab stays in the lab until this page says what it stands for.",
            ],
          },
          {
            kind: "note",
            tone: "llm",
            text:
              "Building a screen: place an orb only where Iris acts, speaks or waits for someone, and give it the state that is true at that moment. If you cannot name what she is doing there, leave the orb out.",
          },
        ],
      },
      {
        title: "Each drawing, what it means",
        blocks: [
          {
            kind: "table",
            head: ["Drawing", "It means", "It may go", "Never"],
            rows: [
              [
                "Orb (flat ring)",
                "She is here, in this state",
                "beside her words, on a task she runs, in a status line, in the pill",
                "as a bullet, a logo, a loading spinner for other work, next to a person's message",
              ],
              [
                "TalkOrb",
                "You can talk with her, now",
                "the talk button, the talk screen, the phone tab bar, the Mac pill",
                "as a still picture, anywhere a tap does not start talking",
              ],
              [
                "Orb3D",
                "A big moment: she arrives, or finishes something that matters",
                "onboarding, a hero, the Mac pill, a result she is proud of; one, at most two per screen",
                "as a background ornament, a wall of them, in a list",
              ],
              [
                "Mark",
                "The brand: this is Iris, the product",
                "app icon, splash, sign-in, lock screen, marketing, the site header",
                "as her state: the Mark never listens, thinks or talks",
              ],
              [
                "Edge (light along an edge)",
                "She is working on exactly this",
                "round her orb while she thinks, round a screen or card while she rebuilds it",
                "after she is done, as a hover effect, as a frame for a person's content",
              ],
              [
                "EdgeText (a lit word)",
                "One word she wants you to see",
                "a single big moment, one per screen",
                "as a heading style, in running text, twice on one screen",
              ],
              [
                "Lab rings, forms and patterns",
                "Nothing yet",
                "the lab",
                "in a product screen, until a row is added here",
              ],
            ],
          },
        ],
      },
      {
        title: "Each state, when it is true",
        blocks: [
          {
            kind: "table",
            head: ["State", "True when", "Also say it"],
            rows: [
              ["idle / rest", "she is present and free", "nothing, or her name"],
              ["listening", "the mic is open and she hears you", "Listening"],
              ["thinking", "she has your question and works out the answer", "Thinking"],
              ["busy", "she carries out a task in the background", "what she is doing: Booking the table"],
              ["talking / expression", "her voice is playing", "the words, as captions"],
              ["muted", "you turned her voice or mic off", "Muted"],
              ["away", "she cannot reach her house: offline, locked vault", "why, and what brings her back"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "The orb alone says nothing to a screen reader or to someone who does not know her yet: a state a person must understand also stands in words beside it.",
          },
        ],
      },
      {
        title: "Colour: what each one says",
        blocks: [
          {
            kind: "table",
            head: ["Colour", "It says", "Never"],
            rows: [
              ["Ice blue (--accent)", "this is active: the tab you are on, a link, the one action", "as a second accent beside a topic colour"],
              ["Violet (--violet)", "on: a toggle that is on, and her ring", "anywhere else: not a button, a header, a chart"],
              ["The ring gradient (violet, sky, magenta)", "Iris herself", "as the fill of anything that is not her orb or her talk button"],
              ["Red (--error)", "this destroys something: delete, unpair", "for a warning, a count, a mood or a brand touch"],
              ["The topic colour (--k)", "this screen is about this subject; what matters inside it", "two topics on one screen, or body text in it"],
              ["Phase colours", "which phase of a loop", "following the topic: they are fixed"],
              ["Grey (--dim)", "later, less, or not yet", "for anything a person must read to decide"],
            ],
          },
        ],
      },
      {
        title: "Light: she is working on it",
        blocks: [
          {
            kind: "table",
            head: ["Drawing", "It means", "Never"],
            rows: [
              ["Edge", "she is working on exactly this orb, card or screen", "left on after she is done, as a hover effect"],
              ["BorderPattern", "one moment each: refreshing, listening, thinking, working, speaking, a question waiting, news, saving", "a pattern for a moment that is not happening, two at once"],
              ["EdgeText", "one word she wants you to see", "a heading style, twice on one screen"],
              ["Pointing, the tour ring", "look here, she is showing you", "without her saying what and why"],
            ],
          },
        ],
      },
      {
        title: "Her hand: something personal",
        blocks: [
          {
            kind: "table",
            head: ["Drawing", "It means", "Never"],
            rows: [
              ["Anchor", "her one personal note on a screen she built for someone: home-baked, for the neighbour", "a fact that is already on the screen, more than one per screen"],
              ["Pen", "this one piece of text matters, as a hand would circle, underline or tick it", "two marks on one screen, over a label"],
            ],
          },
          { kind: "note", tone: "rule", text: "Handwriting is her voice, never a font for facts. If it is data, it is set in type." },
        ],
      },
      {
        title: "Big words: a moment",
        blocks: [
          {
            kind: "table",
            head: ["Drawing", "It means", "Never"],
            rows: [
              ["Word", "a moment: done, a number, a name", "a heading, two big words on one screen"],
              ["ThemeWord", "one element or season, or the middle of a loop", "mixing themes on one screen"],
              ["Cover", "the title of a set, chapter or share image", "inside an app screen"],
            ],
          },
        ],
      },
      {
        title: "Status: what is going on",
        blocks: [
          {
            kind: "table",
            head: ["Part", "It means", "Never"],
            rows: [
              ["StatusPill", "she is doing something, or has exactly one action for you", "a second status line; a pill with nothing to report (then only the orb shows)"],
              ["Badge", "a count or news on the thing it sits on", "a count of nothing new, a badge on its own"],
              ["Progress", "how far a real thing is", "a bar that moves without work behind it"],
              ["Skeleton", "something is coming from the house, in this shape", "a fake wait, an empty black screen instead"],
              ["PhaseRing, LoopBubble", "a loop: where it is in its six phases", "a ring round something that is not a loop"],
              ["Steps, PageDots", "where you are in a flow, or among pages", "when the count does not matter to the person"],
            ],
          },
        ],
      },
      {
        title: "Interrupting: how loud",
        blocks: [
          {
            kind: "table",
            head: ["Part", "It means", "Never"],
            rows: [
              ["Dialog", "a decision that cannot wait; the only way she interrupts", "news, a tip, a question that can wait"],
              ["Snackbar", "what just happened, next to where it happened", "an error that needs a decision"],
              ["Tooltip", "the name of a thing that is only an icon", "information you need to act"],
            ],
          },
        ],
      },
      {
        title: "Decoration: the only things allowed to just look nice",
        blocks: [
          {
            kind: "ul",
            items: [
              "Pattern: a moving fill in the topic's two tints, one per screen, counts 2. Never under text that must be read, never the only signal of anything.",
              "Photo effects: duotone, a word behind a person, parallax. The photo is the subject; the effect is the frame.",
              "The busy budget is 5 per screen: Word and ThemeWord count 3, Pattern and PhaseRing 2. Over budget, the extras draw plain.",
            ],
          },
        ],
      },
      {
        title: "Quick test",
        blocks: [
          {
            kind: "ul",
            items: [
              "Cover the thing. Is something missing? Then it belongs. Nothing missing? Take it out.",
              "Say what it means here, in one short sentence. No sentence: leave it out.",
              "For an orb: what is she doing there, in one verb? No verb: no orb.",
              "Count the orbs that move. More than one outside a list of her own tasks: one too many.",
            ],
          },
        ],
      },
    ],
  },
};
