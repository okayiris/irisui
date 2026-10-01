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
              "One Iris per place. One orb per screen, fixed top left, showing the true state of whoever speaks or works; the talk button does not count. Rows and roles she carries get a StatusPill (\"Iris\", \"speaking\", \"working\", \"waiting\"), never a second orb (AGI docs/merge-decisions.md, 01-10).",
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
                "Ringlab form (a /orbs recipe)",
                "The personality of one of her roles in a team room",
                "only on that role's own screen or the governance screen, as one Orb3D per screen",
                "in the rail, the chat or the canvas, as the role's avatar",
              ],
              [
                "Other lab rings, forms and patterns",
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
        title: "You: what you chose, and what she thinks of you",
        blocks: [
          {
            kind: "p",
            text:
              "Iris learns who someone is: their roles, what matters to them, how they feel. A screen about the person keeps three things apart that look alike: what they said, what she guesses, and what she advises.",
          },
          {
            kind: "table",
            head: ["Thing", "Show it as", "Never"],
            rows: [
              ["Something you chose", "a filled Chip or a Toggle that is on", "a tick circle: a tick means done"],
              ["Several things you are (roles, parts of your life)", "a Row with a Toggle per item", "a CheckList: a ticked row reads as finished and is struck through"],
              ["What she guesses about you", "her words (I think), the reason beside it, and one tap for Right and one for Different", "the same look as something you said yourself"],
              ["How sure she is", "the evidence in words: 4 of the last 4 times; beside it a neutral arc showing that count, never the orb ring or its gradient", "a percentage on its own"],
              ["A score you gave (how it goes, how much it matters)", "your number, plain; she points at the gap between the two, in words", "green for good, red for bad"],
              ["A feeling", "the word you picked", "a colour or a face for a mood; red only ever means destroy"],
              ["Who does it", "a StatusPill \"Iris\" on what she carries, a name on what someone else carries, nothing on your own", "violet or the ring gradient as the fill of her share"],
              ["Her advice", "the word Advice on one option, and why, in words", "that option already selected: the person taps"],
              ["A question she asks on her own (how are you, is this still important)", "a card with the question, one-tap answers and Not now; at most three a day, never at a client or in a focus block", "a Dialog; a question with no way past it"],
              ["A private area (sexuality, faith)", "off until the person opens it", "a question from her about it"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "She learns who you are, not who you should be. When what you say and what you do differ, she asks which is true; she never decides it for you.",
          },
          {
            kind: "note",
            tone: "llm",
            text:
              "Building a screen about the person: mark every guess of hers as a guess with its reason, keep feelings and scores uncoloured, and give each question a Not now. A role or a part of life is a word, not a colour: one topic per screen still holds.",
          },
        ],
      },
      {
        title: "Many of her: roles in a team room",
        blocks: [
          {
            kind: "p",
            text:
              "A team room is Iris working as several roles at once (Keeper, Scout, Maker, Checker, Designer). The room is her; the members are her roles. So the room shows her one orb in the app bar, and each role a StatusPill, under these rules.",
          },
          {
            kind: "ul",
            items: [
              "The name is always 'Iris · Scout', never 'Scout' alone: in the member list, above every message, on a cursor.",
              "A role speaks in the first person as Iris. Roles may address each other and disagree in the open ('Iris · Checker → Maker: that fails on Outlook'): Iris thinking out loud with named hats.",
              "One flat Orb, 22 or 28, in the app bar, with the true state of whoever speaks or works; each role a StatusPill. The role is told apart by its word, never by its own colour or ring gradient.",
              "One orb per screen, in the app bar, with the true state of whoever speaks or works. Working and speaking roles get a StatusPill; a resting role shows its word only.",
              "Who is not Iris never gets an orb: a human team member or an outside agent gets an initial in a phase ring.",
              "A role's personality (its Ringlab recipe) shows only on its own role screen or the governance screen, as the one Orb3D of that screen.",
              "Cursor colours are a neutral, low-chroma set that means nothing: never ice blue, violet, red or the ring gradient, never a fill, always with a name flag.",
            ],
          },
          {
            kind: "table",
            head: ["Team room, desktop", "Where"],
            rows: [
              ["The room's name, her orb, the StatusPill", "the app bar, top left"],
              ["The members ('4 roles')", "in the app bar beside her orb, a menu; not a second rail"],
              ["What happened since you left", "one sentence as the lede; the details in the canvas"],
              ["Decisions (3)", "one button top right; it opens the sheet from the right"],
              ["The canvas", "content only, no hero"],
              ["Snackbar", "above the composer"],
              ["Composer, talk", "bottom centre"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "What she may do on her own has one source: the initiative setting (asks, guesses, does) is the default, and the tap list holds exceptions per action, loosened only by the owner's tap and always visible. Anything that leaves under the owner's name stays a signed tap, whatever the initiative: that is security, a separate layer.",
          },
        ],
      },
      {
        title: "Where each thing lives",
        blocks: [
          {
            kind: "p",
            text:
              "Every part has a home. A person learns where to look once, and then finds it there on every screen. Put a thing somewhere else only when this table has no row for it.",
          },
          {
            kind: "table",
            head: ["Part", "Phone", "Window and wide", "Never"],
            rows: [
              ["Her orb (presence)", "top left, in the app bar or the status pill", "top left, beside the app name", "on a card, below the fold, twice"],
              ["StatusPill", "top left, beside her orb", "top left, beside her orb", "in the content, at the bottom"],
              ["TalkOrb", "bottom centre, in the tab bar", "the Mac pill; bottom centre of the talk screen", "in the content, in a card"],
              ["Her words (what she says about this screen)", "the lede under the title, above the fold", "the lede under the title", "in a card further down, repeated in a card"],
              ["The one action", "top right in the header, or a full-width button in thumb reach at the bottom", "top right in the header", "below the fold, two primaries"],
              ["Search", "top, under the title or in the app bar", "top right in the app bar", "halfway down the page"],
              ["Hero moment (Word, Orb3D, emphasis block)", "the first screen, right under the title", "the first row", "below the fold: then it is not the hero"],
              ["Anchor", "within 24px of the thing it is about", "same", "on its own, in a corner"],
              ["Badge", "top right on the thing it counts", "same", "loose in a row"],
              ["Dialog", "centred, or a sheet from the bottom", "centred over the window", "anywhere else"],
              ["Sheet", "from the bottom", "from the right side", "from the top"],
              ["Snackbar", "bottom, above the tab bar", "bottom, near what it is about", "top, over her orb"],
              ["Tab bar, NavRail", "bottom", "a rail on the left", "both at once"],
              ["Settings danger (delete, unpair)", "the last row, at the bottom", "same", "near the top, next to a normal action"],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Above the fold: on a phone the first 600px under the status bar. Her presence, her words, the hero and the one action live there. What scrolls is the content, never her.",
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
              "Scroll to the top of a phone screen. Can you see her, what she says and the one action without scrolling? If not, move them up.",
              "Count the orbs. More than one per screen (the talk button aside): one too many.",
            ],
          },
        ],
      },
    ],
  },
};
