// Foundations: meaning. What each of her drawings stands for, and so where it may and may not go.
// The sizes live in the Mark doc ("Which Iris, how big"); this page is about what a drawing says.

import type { Doc } from "../content";

export const FOUNDATIONS_MEANING: Record<string, Doc> = {
  meaning: {
    id: "meaning",
    label: "Meaning: what may go where",
    lede:
      "An orb is Iris. Where one stands, she is there, and its state says what she is doing. It is never a picture to fill a corner.",
    sections: [
      {
        title: "The five rules",
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
        title: "Quick test",
        blocks: [
          {
            kind: "ul",
            items: [
              "Cover the orb. Is something missing about what Iris does? Then it belongs. Nothing missing? Take it out.",
              "Ask what she is doing there, in one verb. No verb: no orb.",
              "Count the orbs that move. More than one outside a list of her own tasks: one too many.",
            ],
          },
        ],
      },
    ],
  },
};
