# Motion graphics (video)

How Iris moves in video: the showreel, ads and any animated explainer. Colours, type and the ring
follow the rest of this guide (the app look: `--bg` `#07090c`, ice blue `--accent` `#7dd3fc`, SF Pro,
the gradient only inside the ring). This section adds how things move, when they move and what the
viewer should be looking at.

Sources are the video kit's own files: the showreel (HTML and GSAP, one scene per capability), the
renderer (frame by frame, with Chrome), the timeline/voice/mix script, and the assembly and screens
scripts for the 15s ad (AI clips plus overlays).

## The feel, in six rules

1. **Music first, then the cut.** Pick the track, measure its beats, then place every cut and every
   entrance on a beat. Never cut between beats. The drop is where Iris first shows what she does.
2. **Something to look at, always.** Every scene is a real object that comes alive: a calendar, a
   receipt, a departure board, an inbox. A big number on an empty background is not a scene.
3. **Show the doing, not the claim.** The appointment slides from Tuesday to Thursday, the total
   counts up, the badge disappears when the assistant has replied. Motion shows what changed.
4. **A voice from the first second.** Iris speaks in the opening. Four seconds of words appearing
   with no voice feels like waiting.
5. **One highlight per scene.** Either the ring lands on the thing that matters, or the thing itself
   lights up. Not both, and never a ring on top of a filled shape (the ring disappears).
6. **Say only true things.** Every number, plugin count and feature is checked against the product
   before it goes on screen.

## Timing

| What | Value |
|---|---|
| Ease | `cubic-bezier(.22,.8,.24,1)`: fast off, long settle. Used for almost everything |
| Pop-in (chips, bubbles) | `back.out(2)`, 0.3 to 0.4s |
| Entrance of a scene object | 60px up plus fade, 0.5s, `power3.out` |
| Text in | scale 96% to 100% plus 14px up, 0.25 to 0.45s |
| Stagger | 60 to 80ms between siblings (list rows, calendar days 18ms) |
| Big title ("slam") | scale 115% to 100% in 0.15s on the beat, then a slow push of 1.5% per second |
| Beat pulse | the glow behind the scene scales 7% on every beat and decays over about 0.15s |
| Scene length | the voice line plus 0.25s, rounded up to the next beat |
| End | 0.8 to 1s fade to `--bg` |

At 117.5 bpm a beat is 0.512s. Shots in the 15s ad: 0.5 to 2s, 11 to 14 shots.

## Layout of a scene

From top to bottom, the same on every scene so the eye knows where to look:

1. **Voice label**: a pill with the speaker's name, a dot that lights while the assistant speaks and a live
   waveform from the real recording. Keep at least 6% of the height above it.
2. **Title**: one or two words (`Mail`, `Weather`, `The vault`) or the key value (`Tue, Oct 14`,
   `€1,249.50`). It shrinks when long so it never touches the edges.
3. **The object**: centred, one card, one border. Never a card inside a card.
4. **Subtitle**: fixed low position, small, no bar behind it, a soft shadow. Words light up one by
   one in sync with the voice (spoken: white, speaking now: accent, not yet: 45% white). Text that
   is not spoken (a title, "One tap.") is fully white at once and does not light up.

Portrait (9:16) keeps the same order; objects scale down rather than stack into a column that runs
off screen.

## The ring in motion

- It turns continuously (about 120 degrees per second). Rotate the circle inside the SVG, never the
  element with CSS `rotate` (that rotates around the corner of the screen once GSAP moves it).
- Opening: it draws itself (stroke from 0 to 100%) on the first beat, words orbit it, and it bursts
  outward on the drop.
- As a pointer it lands on the one thing that matters (day 14, platform 5) at the moment the voice
  says it. Only where it lands on text, not on shapes.
- The corner logo (ring plus "iris") has a small drop shadow so it stays readable on bright video,
  and is hidden on the end card, where the big ring already is.

## Voices and words

- A line in a language uses a voice of that same language only; a British or American voice speaking
  Dutch, say, has an accent. Other languages use a native voice (French: `fr-manon`).
- Write numbers the way people say them: "quarter to five" (the board still shows 16:45),
  "twelve hundred and forty-nine euros fifty".
- Abbreviations are spoken as letters: `VAT` goes to the voice as "vee ay tee" (the subtitle keeps
  `VAT`). The brand as it comes out of TTS: "okay iris dot com" (Chatterbox) or "oh-kay iris dot com" (app voice).
- Check every line with speech recognition before it goes in (faster-whisper on the GPU box). Short
  words fail most ("Done" came out as "Dunn").
- Keep one file per line. An old recording with the same name in another format silently wins in
  the mix (it happened with `.mp3` versus `.wav`).

## Scenes that exist

| Scene | Object | What moves |
|---|---|---|
| Date | month grid | days cascade in, the ring lands on the date |
| Amount | receipt | lines slide in, the total counts up, an accent fill behind the total |
| Train | departure board | split-flap letters settle, the ring lands on the platform when it is said |
| Weather | sun and cloud | sun rises, cloud leaves, rain stops, temperature counts up |
| Mail | three mails | they fly in, the urgent one gets a glowing badge on the word "urgent" |
| Parcel | time axis | the delivery window grows, a van drives to it |
| Dentist | work week | the appointment slides to Thursday, a dashed outline stays behind, a check draws itself |
| Calls | incoming call | rings pulse, Iris answers, the call timer runs |
| Messages | chat list on a phone | unread badges pop away one by one, read ticks appear |
| Group chats | group chat | a flood of messages, the unread count climbs, then one summary card |
| The vault | checkout, Face ID, vault | Face ID approves, a line runs from the vault to the card field around Iris, Iris only sees dots |
| Plugins | 52 tiles | tiles pop in, the web shop tile lights up, an order notification, "Open source (MIT)" |
| Your house | house in a ring of 12 stars | stars pop in, chips: own house, server in Europe, bring your own key |
| Languages | speech bubble | the word flips language, the language pill moves |
| End card | ring and address | capability chips orbit the ring and flash through all 51 site languages (formatted by `Intl`, no hand translation) |

## Do and don't

- Do: music with a beat and a drop, cuts on the beat, a voice from the first second.
- Do: one object per scene that visibly does something, real numbers, demo content only.
- Don't: static title cards, a caption box covering the app screen, subtitles that light up when
  nothing is said.
- Don't: a ring on top of a filled shape, overlapping cards, cards cut off at the edge, a jump cut
  between two shots of the same person in the same place.
- Don't: AI actors talking to camera with mouths that do not move; show them talking to the phone,
  in profile, or re-render with lip movement.
