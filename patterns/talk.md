# Talking and voice

Voice is a surface. The orb shows the state, the talk button is the mic, and every state has one word and one look.

## The talk button is the mic

There is no mic icon: the orb is the mic. TalkOrb is a dark disc with the turning Iris ring inside, and it is the middle of the tab bar on iPhone. It is 66pt in the tab bar, standing 14pt above it, and the ring inside is 22/60 of the disc.

- The orb is always drawn above everything in its row: tabs, the conversation strip, the page.
- Its effects stay close to the button and never cross the screen.
- Hold to talk. Swipe up to lock, swipe left for a note, swipe right to open the tab bar.

## The states of the orb

| State | What it looks like | What it means |
| --- | --- | --- |
| rest | The ring turns slowly, one turn in 30 s. Nothing else moves. | She is here and not busy. |
| listening | Three ice-blue echoes run out to 1.35x the disc and fade. Always on while it is locked. | The mic is open and she hears you. |
| thinking | A neon arc (#2ee6d6) races round the disc and the ring pulses. | She has your words and is working. |
| talking | The spectrogram of the voice: 48 pitches from 90 Hz to 7 kHz, mirrored, one fixed colour per pitch, a bar as long as that pitch is loud. | Sound is going in or coming out. |
| muted | The ring steps back, 20% smaller, and a struck-through mic draws itself in front. Still, so it costs nothing. | Her voice is off. |
| away | Grey and still. | There is no connection. |
| expression | The bars dance by themselves in waves and turning colours. | A called-for moment, for a few seconds. |

> rule: expression is called for a big moment, for a few seconds, and is never the look of normal talking. On the web the bars rest low without an analyser, and the real voice drives them when one is passed.

> warn: These are the talk orb's states. The app's Orb has its own smaller set: idle, listening, busy, talking, away. The two sets do not mix; name the one for the component you are using.

## One word of state

StatusPill sits at the top left of every screen: the orb and one word of what she is doing, or an accent pill with an action. Its states are idle, listening, busy, talking and away. Nothing to report leaves only the orb.

- One word, from the state itself: busy shows "busy", listening shows "listening".
- An action pill carries a sentence: "Continue here" when another device holds her voice.
- On the web the word sits beside the small ring and grows out of it when it changes, with blur and slide, in .42s.
- On the Mac the state word is one word in mono capitals: LISTENING, THINKING, WORKING, MUTED, CONNECTION LOST, WATCHING. Nothing while she talks, because the ring already says so.
- A state word is never a sentence and never a number: what she is doing, in one word, then stop.

## The talk button in the tab bar

- The tab bar is a frosted capsule with the talk orb in the middle. The release has four tabs, Iris, Loops, Camera and You; the app since 29 September has three, Iris on the left and Camera and You on the right, and the loops moved to the `CircleStack` above the strip.
- Collapsed, at rest only the orb shows: the glass shrinks into it and the tabs fold toward it.
- It opens on a page swipe, or on a swipe right on the orb, and folds back in after 2.5 s without touch.
- The orb is always on top: the pill slides under it and its effects fall over the tabs.
- The bar sits low, 22pt into the bottom safe area, with the home indicator still free.
- The active tab is --accent on a faint blue pill. The orb keeps the ring, and the tab colour never recolours it.

## The Mac pill

- The pill is only her orb: a 60pt TalkOrb floating above every window, with a glass bar of buttons that grows out from behind it. The bar is 44pt high, glass over blur with a 1px --edge.
- Mouse on the orb: the bar opens after 180 ms, so passing over it does nothing. Off: it stays 700 ms, then folds back into the orb.
- Under it, one word of state in mono capitals: LISTENING, THINKING, WORKING, MUTED, CONNECTION LOST, WATCHING. Nothing while she talks.
- While she works through steps, a dotted ice-blue ring (#7dd3fc, 70pt) turns slowly round it, and the line above says a dot, "6 steps" and a chip that opens the overview.
- MUTED: click the word to turn sound back on.
- The badge on the orb's rim is magenta with white digits, never red, and gone at zero.

## Muted and away

- muted: the ring steps back 20% and the struck-through mic draws itself in front. Her voice is off, and the state is still, so it costs no motion.
- Inside a muted state the person can still type, and the surface says which state it is in one word.
- away: grey and still, with no connection. The disc keeps a faint inset edge so the button is still visible on --bg.
- On the web the mic button is glass with a strike through it while muted, and the ring lives in the small pill and the orb.

## Interruption

- While she works, the person can stop her: the web input bar keeps a small stop button beside the field.
- Clicking the orb on the Mac opens a field to type to her; a right-click opens typing, status, the steps, notifications, mute, replay and quit.
- A waiting question shows itself: the strip loses its --edge and takes a 2pt border in the ring's colours, turning 90 degrees a second. Her own question edge pattern beats that default.
- Interrupting never loses what was said: what is already in the conversation stays there.

> rule: One light at a time on a screen. The thinking arc and the listening echoes are two states of one orb and never run together, and her neon never lands on a button or a toggle.

## While she thinks

- The orb says thinking and the status word says busy. Two names for one moment, each on its own component.
- On the web the orb uses a teal arc (#2ee6d6, conic, .69s a turn).
- A screen she builds is already on the page while she works: your words, the line "Iris is building this screen..." and a skeleton in the shape it will get. When it is ready it fills in place, without a reload.
- A long job with steps shows them, and the Mac pill opens the overview from its chip.
- When she has nothing to say, the state word goes and only the orb stays. Quiet is a state, not a failure.

> llm: When you build a voice surface, use the state names of the component in front of you, one word of state beside the orb, and one light. Never invent a state name, and never show two states at once.
