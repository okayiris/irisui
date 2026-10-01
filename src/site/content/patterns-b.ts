import type { Doc } from "../content";

// Patterns B: the surfaces a person lives in. Settings, loading, errors, onboarding and talk.
// Every value and every state name here is read from src/content and the tokens; nothing is invented.

export const PATTERNS_B: Record<string, Doc> = {
  settings: {
    id: "settings",
    label: "Settings and the You page",
    lede:
      "The You page is the reference for every settings surface: one column of glass rows, the value on the right, and danger last.",
    sections: [
      {
        title: "The You page is the reference",
        blocks: [
          {
            kind: "p",
            text:
              "Settings in the app are the You page. One column of rows, each row a Card on --bg, rows 12px apart, card radius 18 and padding 14. Spacing and rhythm come from that page and nowhere else.",
          },
          {
            kind: "ol",
            items: [
              "The person first: name, picture, plan.",
              "What Iris may see: mail, calendar, home, location, as switches with one line of explanation each.",
              "Voice and language.",
              "This device: blocks, voice, notifications, and how she talks here.",
              "Account, and danger last.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Top to bottom is person, then what she may see, then how she sounds, then this device, then danger. A row the person cannot act on sits below the rows they can.",
          },
        ],
      },
      {
        title: "A row",
        blocks: [
          {
            kind: "p",
            text:
              "A row is a 24px icon at 80% --fg, a 17pt title, a 12pt --dim line under it, and one thing on the right.",
          },
          {
            kind: "table",
            head: ["Part", "What goes there"],
            rows: [
              ["icon", "a line icon from the system, 24px, never a photo or an emoji"],
              ["title", "17pt, sentence case, the name of the setting"],
              ["subtitle", "12pt --dim, one short line of what it does or what it will change"],
              ["trailing", "a Toggle (51x31, violet when on), a menu value, a chevron, or an external arrow"],
              ["chevron", "true when the row opens something inside the app"],
              ["external", "true when the row leaves the app, instead of a chevron"],
              ["danger", "true for a destructive row: the label takes --error"],
            ],
          },
          {
            kind: "ul",
            items: [
              "One control per row. A toggle and a chevron on one row means the row is two things.",
              "The subtitle is a sentence with the effect in it: \"Blocks, voice, notifications and how she talks here.\"",
              "A menu value shows the current choice, in the person's words, never a blank and never a code.",
              "A value is the shortest true form: a name, a unit, a count. The unit lives in the value, not in the title.",
            ],
          },
        ],
      },
      {
        title: "What a setting may never do without saying so",
        blocks: [
          {
            kind: "ol",
            items: [
              "Change what Iris may see without the subtitle naming what she sees and what for.",
              "Turn something on for the whole house from one device without the subtitle saying it is shared.",
              "Spend money, send a mail or start a loop without the action named in the row.",
              "Run in the background, on a schedule or over a network, without the subtitle saying when it runs.",
              "Hide a second effect behind one switch.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "If the subtitle cannot say the effect in one line, the setting is two settings. A switch is a promise about the whole app, not about this screen.",
          },
        ],
      },
      {
        title: "Where danger sits",
        blocks: [
          {
            kind: "p",
            text:
              "Danger is one row, at the bottom, alone. Never first, never in the middle of the list, never beside a switch.",
          },
          {
            kind: "ul",
            items: [
              "The label takes the danger variant: the text in --error, no toggle, no chevron on its own.",
              "The label says what goes, in words: \"Delete account\", not \"Remove\".",
              "The row opens a dialog before anything happens, and the dialog names the thing once more.",
              "--error is red for destructive only. Nothing else on the page is red, and no badge is.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The system has the danger variant of Row and foundation rule 3 (red for destructive only), but no written rule about the position. This page sets the position for the app: bottom, alone. Move it into the foundations when it ships.",
          },
        ],
      },
      {
        title: "A value that is still loading",
        blocks: [
          {
            kind: "p",
            text:
              "The row stays and only the value waits. The value slot holds a short Skeleton at the width and height the value will take: glass with a 1.4s sheen, from Skeleton's own height and width props.",
          },
          {
            kind: "ul",
            items: [
              "Never a spinner inside a row. A skeleton is the shape of the thing that is coming.",
              "Never an empty right side: an empty right side reads as off, and off reads as broken.",
              "The row stays tappable only if it does not need the value to work.",
              "A value that cannot be fetched becomes a sentence, not a skeleton that never ends.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The system has no token for the delay before a skeleton appears. Until that token lands, pair the skeleton with the motion tokens below.",
          },
        ],
      },
      {
        title: "States and tokens you may use",
        blocks: [
          {
            kind: "table",
            head: ["Token", "Value", "Where it shows"],
            rows: [
              ["--state-hover", "rgba(180,225,255,.07)", "a row under the hand"],
              ["--state-press", "rgba(180,225,255,.12)", "the moment of the press"],
              ["--state-selected", "rgba(125,211,252,.12)", "the chosen item in a menu"],
              ["--state-disabled", "0.38", "a control that cannot be used"],
              ["--focus-ring", "0 0 0 2px var(--bg), 0 0 0 4px var(--accent)", "keyboard focus, on glass"],
              ["--radius-menu", "14px", "a menu opened from a value"],
              ["--sheet-bg, --scrim", "rgba(10,13,18,.92), rgba(4,6,9,.62)", "a sheet or a dialog over the page"],
              ["--motion-fast / --motion-base / --motion-slow", "0.14s / 0.2s / 0.32s", "every answer to the hand"],
              ["--ease-house", "cubic-bezier(0.2, 0.9, 0.25, 1)", "every answer to the hand"],
            ],
          },
          {
            kind: "p",
            text:
              "Under prefers-reduced-motion the three durations become 0.001s and the state stays visible, so a hover or a press still changes the surface without moving.",
          },
          {
            kind: "note",
            tone: "llm",
            text:
              "When you write a settings page, mirror the You page: 12px between rows, the value on the right, the person's words in the title, danger last. Use these tokens; invent none.",
          },
        ],
      },
    ],
  },

  loading: {
    id: "loading",
    label: "Loading and empty",
    lede:
      "A wait is never an empty black screen. Iris shows the shape of what is coming, then one line of what she is doing, then the thing.",
    sections: [
      {
        title: "The beats",
        blocks: [
          {
            kind: "ol",
            items: [
              "Under 200ms, nothing shows. Nothing is the same length as --motion-base (0.2s), so a faster answer appears with no state at all.",
              "A Skeleton in the shape of what is coming.",
              "One line of what she is doing, where the thing will be.",
              "The thing itself, filled in place, without a reload.",
            ],
          },
          {
            kind: "p",
            text:
              "A card that is already on the screen does not blink. While she builds a screen the card is there with your own words on it, and under it the line \"Iris is building this screen...\" with a skeleton in the shape it will get.",
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Never an empty black screen (foundation rule 5). If something takes long enough to notice, it takes a skeleton, a line, or progress. Silence is the one answer the person cannot read.",
          },
        ],
      },
      {
        title: "A skeleton",
        blocks: [
          {
            kind: "p",
            text:
              "Skeleton is glass blocks with a sheen, in the shape of the real content. Props: height, width and screen. screen draws a whole window: a title line, one big card, two rows.",
          },
          {
            kind: "ul",
            items: [
              "The shape tells the truth: the same count of blocks, the same heights, the same place as the thing that is coming.",
              "The sheen runs 1.4s and stops under prefers-reduced-motion; the block then stays still and the shape still carries the meaning.",
              "A still frame (a screenshot, a thumbnail, reduced motion) shows the end state of everything else and a still skeleton, never a half-drawn thing.",
              "A skeleton is for content from the house. It is never used to fake an answer that has not arrived.",
            ],
          },
        ],
      },
      {
        title: "What a skeleton may not be",
        blocks: [
          {
            kind: "ul",
            items: [
              "Not one grey block for a whole screen.",
              "Not a spinner on an empty black screen.",
              "Not a bar that grows to nowhere: where the end is known, the bar is Progress.",
              "Not a lie about size: a one line block for a five line card teaches the person to distrust the screen.",
              "Not endless. Every skeleton has a moment where it becomes the thing, or becomes a sentence with a retry.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "A skeleton may not move faster than the real thing arrives. The sheen is the only motion; the blocks never pulse, never scale and never slide.",
          },
        ],
      },
      {
        title: "Progress, for work with a real end",
        blocks: [
          {
            kind: "p",
            text:
              "Progress is a thin bar or a ring in the topic colour. Props: value 0 to 1, ring, size, centre, caption, topic.",
          },
          {
            kind: "ul",
            items: [
              "A ring means progress and nothing else (golden key rule 1), so it holds a value, not a mood.",
              "A ring carries a centre value and the caption under it: one number and one word.",
              "Use progress when the end is known and countable. When it is not, use the skeleton and a line of what she is doing.",
              "Long work made of steps shows its steps. The Mac pill shows a dot, the count and a chip that opens the overview of the steps.",
            ],
          },
        ],
      },
      {
        title: "A busy button",
        blocks: [
          {
            kind: "p",
            text:
              "A button that has been pressed shows busy: a spinner, aria-busy, and it is not clickable again. The label stays, so the button never changes size.",
          },
          {
            kind: "ul",
            items: [
              "In the web kit a busy button shows its spinner while its promise runs, or about 700ms after a sentence is sent.",
              "One busy button per view: the one primary action. One primary per screen.",
              "The rest of the screen stays usable. A wait never takes away a thing the person may still do.",
              "Disabled is not busy: disabled is --state-disabled, 38%, for something that cannot be used at all, and it is not a loading state.",
            ],
          },
        ],
      },
      {
        title: "When it takes long",
        blocks: [
          {
            kind: "ul",
            items: [
              "Past a few seconds, add one line of what is happening, not another spinner.",
              "One word of state, next to her ring: the status pill on the app, the status word on the web, and the mono capitals on the Mac pill: LISTENING, THINKING, WORKING, MUTED, CONNECTION LOST, WATCHING.",
              "When a screen she builds fails, she gets the error first and tries again before the person sees an empty screen.",
              "If it still is not there, say so in one sentence next to the thing, with retry as the first action. See Errors.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Long is not the same as broken. Never turn a slow answer into an error, and never promise a time the system cannot keep.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The system names no threshold where a short wait becomes a long one, and no copy beyond \"Iris is building this screen...\". Say the line you can source, or leave the wait silent under 200ms.",
          },
        ],
      },
    ],
  },

  errors: {
    id: "errors",
    label: "Errors and refusal",
    lede:
      "Say what happened next to the thing that failed, in one sentence, with retry first. A refusal is not an error.",
    sections: [
      {
        title: "Next to the thing that failed",
        blocks: [
          {
            kind: "p",
            text:
              "The sentence goes where the thing was: in the card, the row or the field that failed. An error shows \"That didn't work. Try again in a moment.\" next to the thing that failed, and goes to Iris on her own with the request, so she can fix it before the person notices.",
          },
          {
            kind: "ul",
            items: [
              "Same place as the thing: never a corner, never a toast for a failure the person is looking at.",
              "One sentence, then the action. The action sits under the sentence it belongs to.",
              "The same shape every time: what happened, then what to do. No stack traces, no codes, no server words.",
              "The rest of the screen stays: the other rows, the other cards, the things that still work.",
            ],
          },
        ],
      },
      {
        title: "One sentence shape",
        blocks: [
          {
            kind: "table",
            head: ["Situation", "What is said", "Action"],
            rows: [
              [
                "A request fails",
                "\"That didn't work. Try again in a moment.\" (apps.md, the error trap of 29-09)",
                "Try again, first",
              ],
              [
                "A list, table or board is empty",
                "A sentence that says what goes there and how to add the first one",
                "The first action the empty state offers",
              ],
              [
                "Work she is doing fails",
                "Nothing on screen yet: she gets the error first and tries again before the person sees an empty screen",
                "None until her own retry has failed",
              ],
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "Only the request sentence and the empty state rule are written in the system. The rest of the copy is open: write it in this shape, one sentence plus one action, and keep it in the same words everywhere.",
          },
        ],
      },
      {
        title: "Retry is the first action",
        blocks: [
          {
            kind: "ul",
            items: [
              "Retry comes first, in a house button, not as a link inside the sentence.",
              "Retry repeats the same request. It never quietly starts something else.",
              "A second retry is allowed; the wording does not promise it will work this time.",
              "A second action beside retry is quiet, and danger only when it destroys something.",
              "Never a retry that needs the person to remember what they typed.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "The first action after a failure is the one that costs nothing: the same request again. Anything that deletes, discards or leaves is beside it and quiet.",
          },
        ],
      },
      {
        title: "Refusal is its own case",
        blocks: [
          {
            kind: "p",
            text:
              "When she will not do something, nothing failed. There is no error and no retry: there is a sentence in her voice, where the question was asked, in the conversation.",
          },
          {
            kind: "ul",
            items: [
              "Refusal is not red. Red is destructive only.",
              "It is not a toast, not a corner of the screen and not a log line.",
              "Shape: what she will not do, then what she can do instead.",
              "She says it once, plainly, in the person's language, and does not answer a different question.",
              "A refusal never looks like a fault: no broken icon, no blame, no apology loop.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The system has no refusal copy yet and no component for it. The shape above is decided here; the words are not written anywhere. Write them with the assistant's own name, one or two sentences, with a way forward.",
          },
        ],
      },
      {
        title: "Red is only for destructive",
        blocks: [
          {
            kind: "ul",
            items: [
              "--error is the destructive colour: a delete, an account that goes, a thing that cannot be undone.",
              "A failed request is not red. It is a sentence and a retry in the ordinary text colours.",
              "A warning is --wait, a finished thing is --ok. The snackbar dot carries the tone.",
              "No badge is red. The Mac pill badge is magenta (badge colour #c026d3) with white digits, because red means destructive only.",
              "A required field is explained in --dim, not shouted in red.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Before painting anything red, name the thing it destroys. If nothing is destroyed, it is not red (foundation rule 3).",
          },
        ],
      },
      {
        title: "What is never logged or shown",
        blocks: [
          {
            kind: "ul",
            items: [
              "No secrets: no keys, no tokens, no credential values, in the message, the log or the screenshot.",
              "No personal content in what the person sees: no mail body, no calendar entry, no location, no name that came from a real account.",
              "No raw request or response body in the interface, and demo content only in any shot or mock.",
              "What goes to Iris is the request and the failure, enough to fix it, and nothing more about the person than the fix needs.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "One sentence for the person, one record for her. They are never the same string, and neither carries a secret.",
          },
        ],
      },
      {
        title: "The one place an error may interrupt",
        blocks: [
          {
            kind: "p",
            text:
              "A dialog is the one place an error may stop the person, and only when there is a choice for them to make. The overlays are one at a time, and they wear --sheet-bg over the --scrim.",
          },
          {
            kind: "table",
            head: ["A dialog may appear when", "It may not appear when"],
            rows: [
              [
                "The action destroys something and must be confirmed first",
                "A load, a refresh or a call failed: that is a sentence beside the thing, with retry",
              ],
              [
                "The account or the session cannot continue at all",
                "Work she runs in the background fails: say it in the conversation, not over the screen",
              ],
              [
                "Nothing else can be done and the person has to decide",
                "The same failure has already been shown: a dialog may not repeat it",
              ],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "A dialog asks something. If there is nothing to ask, it is not a dialog. When in doubt, keep the person in the place they were and put the sentence next to the thing that failed.",
          },
        ],
      },
    ],
  },

  onboarding: {
    id: "onboarding",
    label: "Onboarding and permission",
    lede:
      "The first minutes ask once, say what for, and take one permission at a time. A refusal never disables the app.",
    sections: [
      {
        title: "The first minutes",
        blocks: [
          {
            kind: "p",
            text:
              "The first minutes have one job: get the person to the thing Iris is for, with what she needs and nothing more. Nothing is explained twice, and nothing is asked before it is useful.",
          },
          {
            kind: "ol",
            items: [
              "Who she is: the assistant has a name of her own per house, the product is Iris.",
              "What she may see: one permission at a time, each with one line of what for.",
              "Voice: how she sounds and how you talk to her.",
              "The first thing she does for you, with the answer on screen, not a promise of one.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Every screen in the first minutes ends with a way forward, and the way past is always visible. A person who wants to look around first is not a problem to solve.",
          },
        ],
      },
      {
        title: "Ask once, and say what for",
        blocks: [
          {
            kind: "p",
            text:
              "The You page is the model: \"What Iris may see\" as switches, each with one line of explanation, mail, calendar, home, location, top to bottom.",
          },
          {
            kind: "ul",
            items: [
              "One line, sentence case, no jargon and no \"for a better experience\".",
              "Name what she sees and what she does with it, in the person's terms.",
              "Name the limit where there is one: what she does not see, what she does not keep.",
              "Say what for before the system dialog appears, never after it.",
              "A permission the person did not ask for is not asked for.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "The permission dialog comes from the system and comes once. If the person says no, the system dialog never returns, so the asking screen has to carry the reason before it opens.",
          },
        ],
      },
      {
        title: "One permission at a time",
        blocks: [
          {
            kind: "ul",
            items: [
              "One card, one question, one line of what for.",
              "Two ways forward on the same screen: the ask, and a quiet way past it.",
              "The result of a yes is described on the same screen, in one sentence.",
              "A second question waits until the first is answered. Two system dialogs in a row reads as a form.",
              "Afterwards the same choice stays in the You page as a switch, so the person can change their mind there.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The system has no onboarding component: the first-minutes screens are not built yet. The switch, the card and the row exist; the asking screen does not.",
          },
        ],
      },
      {
        title: "While a permission is pending",
        blocks: [
          {
            kind: "ul",
            items: [
              "The screen says what it is waiting for, and the rest of the app keeps working without it.",
              "On our side the button shows busy: a spinner and aria-busy, with its label still in place, so nothing moves around it.",
              "A skeleton is for content from the house, never for an answer from the person.",
              "While the system dialog is open, nothing else on our screens changes underneath it.",
              "When the answer comes back no, the screen changes to the refused state, not to an error state.",
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "The pending state is not written anywhere. The only thing the system names is busy on a button, so that is all this page can promise until a screen for it exists.",
          },
        ],
      },
      {
        title: "The order of the first screens",
        blocks: [
          {
            kind: "p",
            text:
              "What the sources do cover, and what this page decides on top of them.",
          },
          {
            kind: "table",
            head: ["Step", "Where it comes from"],
            rows: [
              [
                "Who she is",
                "The assistant's own name per house; the product is Iris",
              ],
              [
                "What she may see",
                "The You page: mail, calendar, home, location, as switches with one line of explanation",
              ],
              ["Voice and language", "The You page puts voice and language rows after the permissions"],
              [
                "The first result",
                "The gate pages are a flow: one question in a column, buttons full width below 40rem",
              ],
            ],
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "Decided here, written nowhere else: the order is who she is, then permissions, then voice, then the first result. What is still open: whether the first minutes are a Flow layout, a set of sheets, or screens of their own, and the exact copy on each of them.",
          },
        ],
      },
      {
        title: "What is never asked twice",
        blocks: [
          {
            kind: "ul",
            items: [
              "A permission the person already answered. The system dialog cannot come back, so a second ask is a row in the You page, in her words, with the reason.",
              "The person's name, mail or language.",
              "Anything she can find herself, once she may see it.",
              "A choice the person already made on another device of the same house.",
              "Anything a second time in the same session: the first answer stands until the person changes it.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "A second ask is allowed only when the thing changed, or when the person turns it on themselves.",
          },
        ],
      },
      {
        title: "When a permission is refused",
        blocks: [
          {
            kind: "ul",
            items: [
              "The app is never disabled by a refusal. Every screen still opens.",
              "Every screen that wanted the permission shows what she can still do without it.",
              "The way forward stays in sight: the switch in the You page, named in the sentence.",
              "A refusal is not an error: no red, no warning icon, no counting down.",
              "The refusal is remembered. The app does not ask again on the next launch.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "Never disabled, always a way forward. The refusal is a state of the app, not a state of the person.",
          },
          {
            kind: "note",
            tone: "llm",
            text:
              "When you write a screen that needs something she may not see, write the without-it sentence first. That sentence is the screen; the permission is only the shortcut.",
          },
        ],
      },
    ],
  },

  talk: {
    id: "talk",
    label: "Talking and voice",
    lede:
      "Voice is a surface. The orb shows the state, the talk button is the mic, and every state has one word and one look.",
    sections: [
      {
        title: "The talk button is the mic",
        blocks: [
          {
            kind: "p",
            text:
              "There is no mic icon: the orb is the mic. TalkOrb is a dark disc with the turning Iris ring inside, and it is the middle of the tab bar on iPhone. It is 66pt in the tab bar, standing 14pt above it, and the ring inside is 22/60 of the disc.",
          },
          {
            kind: "ul",
            items: [
              "The orb is always drawn above everything in its row: tabs, the conversation strip, the page.",
              "Its effects stay close to the button and never cross the screen.",
              "Hold to talk. Swipe up to lock, swipe left for a note, swipe right to open the tab bar.",
            ],
          },
        ],
      },
      {
        title: "The states of the orb",
        blocks: [
          {
            kind: "table",
            head: ["State", "What it looks like", "What it means"],
            rows: [
              [
                "rest",
                "The ring turns slowly, one turn in 30 s. Nothing else moves.",
                "She is here and not busy.",
              ],
              [
                "listening",
                "Three ice-blue echoes run out to 1.35x the disc and fade. Always on while it is locked.",
                "The mic is open and she hears you.",
              ],
              [
                "thinking",
                "A neon arc (#2ee6d6) races round the disc and the ring pulses.",
                "She has your words and is working.",
              ],
              [
                "talking",
                "The spectrogram of the voice: 48 pitches from 90 Hz to 7 kHz, mirrored, one fixed colour per pitch, a bar as long as that pitch is loud.",
                "Sound is going in or coming out.",
              ],
              [
                "muted",
                "The ring steps back, 20% smaller, and a struck-through mic draws itself in front. Still, so it costs nothing.",
                "Her voice is off.",
              ],
              [
                "away",
                "Grey and still.",
                "There is no connection.",
              ],
              [
                "expression",
                "The bars dance by themselves in waves and turning colours.",
                "A called-for moment, for a few seconds.",
              ],
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "expression is called for a big moment, for a few seconds, and is never the look of normal talking. On the web the bars rest low without an analyser, and the real voice drives them when one is passed.",
          },
          {
            kind: "note",
            tone: "warn",
            text:
              "These are the talk orb's states. The app's Orb has its own smaller set: idle, listening, busy, talking, away. The two sets do not mix; name the one for the component you are using.",
          },
        ],
      },
      {
        title: "One word of state",
        blocks: [
          {
            kind: "p",
            text:
              "StatusPill sits at the top left of every screen: the orb and one word of what she is doing, or an accent pill with an action. Its states are idle, listening, busy, talking and away. Nothing to report leaves only the orb.",
          },
          {
            kind: "ul",
            items: [
              "One word, from the state itself: busy shows \"busy\", listening shows \"listening\".",
              "An action pill carries a sentence: \"Continue here\" when another device holds her voice.",
              "On the web the word sits beside the small ring and grows out of it when it changes, with blur and slide, in .42s.",
              "On the Mac the state word is one word in mono capitals: LISTENING, THINKING, WORKING, MUTED, CONNECTION LOST, WATCHING. Nothing while she talks, because the ring already says so.",
              "A state word is never a sentence and never a number: what she is doing, in one word, then stop.",
            ],
          },
        ],
      },
      {
        title: "The talk button in the tab bar",
        blocks: [
          {
            kind: "ul",
            items: [
              "The tab bar is a frosted capsule with the talk orb in the middle. The release has four tabs, Iris, Loops, Camera and You; the app since 29 September has three, Iris on the left and Camera and You on the right, and the loops moved to the `CircleStack` above the strip.",
              "Collapsed, at rest only the orb shows: the glass shrinks into it and the tabs fold toward it.",
              "It opens on a page swipe, or on a swipe right on the orb, and folds back in after 2.5 s without touch.",
              "The orb is always on top: the pill slides under it and its effects fall over the tabs.",
              "The bar sits low, 22pt into the bottom safe area, with the home indicator still free.",
              "The active tab is --accent on a faint blue pill. The orb keeps the ring, and the tab colour never recolours it.",
            ],
          },
        ],
      },
      {
        title: "The Mac pill",
        blocks: [
          {
            kind: "ul",
            items: [
              "The pill is only her orb: a 60pt TalkOrb floating above every window, with a glass bar of buttons that grows out from behind it. The bar is 44pt high, glass over blur with a 1px --edge.",
              "Mouse on the orb: the bar opens after 180 ms, so passing over it does nothing. Off: it stays 700 ms, then folds back into the orb.",
              "Under it, one word of state in mono capitals: LISTENING, THINKING, WORKING, MUTED, CONNECTION LOST, WATCHING. Nothing while she talks.",
              "While she works through steps, a dotted ice-blue ring (#7dd3fc, 70pt) turns slowly round it, and the line above says a dot, \"6 steps\" and a chip that opens the overview.",
              "MUTED: click the word to turn sound back on.",
              "The badge on the orb's rim is magenta with white digits, never red, and gone at zero.",
            ],
          },
        ],
      },
      {
        title: "Muted and away",
        blocks: [
          {
            kind: "ul",
            items: [
              "muted: the ring steps back 20% and the struck-through mic draws itself in front. Her voice is off, and the state is still, so it costs no motion.",
              "Inside a muted state the person can still type, and the surface says which state it is in one word.",
              "away: grey and still, with no connection. The disc keeps a faint inset edge so the button is still visible on --bg.",
              "On the web the mic button is glass with a strike through it while muted, and the ring lives in the small pill and the orb.",
            ],
          },
        ],
      },
      {
        title: "Interruption",
        blocks: [
          {
            kind: "ul",
            items: [
              "While she works, the person can stop her: the web input bar keeps a small stop button beside the field.",
              "Clicking the orb on the Mac opens a field to type to her; a right-click opens typing, status, the steps, notifications, mute, replay and quit.",
              "A waiting question shows itself: the strip loses its --edge and takes a 2pt border in the ring's colours, turning 90 degrees a second. Her own question edge pattern beats that default.",
              "Interrupting never loses what was said: what is already in the conversation stays there.",
            ],
          },
          {
            kind: "note",
            tone: "rule",
            text:
              "One light at a time on a screen. The thinking arc and the listening echoes are two states of one orb and never run together, and her neon never lands on a button or a toggle.",
          },
        ],
      },
      {
        title: "While she thinks",
        blocks: [
          {
            kind: "ul",
            items: [
              "The orb says thinking and the status word says busy. Two names for one moment, each on its own component.",
              "On the web the orb uses a teal arc (#2ee6d6, conic, .69s a turn).",
              "A screen she builds is already on the page while she works: your words, the line \"Iris is building this screen...\" and a skeleton in the shape it will get. When it is ready it fills in place, without a reload.",
              "A long job with steps shows them, and the Mac pill opens the overview from its chip.",
              "When she has nothing to say, the state word goes and only the orb stays. Quiet is a state, not a failure.",
            ],
          },
          {
            kind: "note",
            tone: "llm",
            text:
              "When you build a voice surface, use the state names of the component in front of you, one word of state beside the orb, and one light. Never invent a state name, and never show two states at once.",
          },
        ],
      },
    ],
  },
};
