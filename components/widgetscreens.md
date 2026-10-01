# WidgetScreens

A showcase: widgets in use, as the widget lab has them, with scrolling and pictures.

Group: Showcases. Export: `window.IrisUi.WidgetScreens`.

## Guidelines

- Do: Tapping an item ticks it off, and the counter, the dots and the ring follow.
- Do: A photo is duotone in two colours of the topic; things themselves are flat drawings in trip style.
- Do: Colour is state: the lamp that is on is warm, energy made is green, a low battery is amber, today is red.

## Specs

- Phone frame: `392px wide, radius 36px, padding 16px`
- Scrollers: `gap 12px, scroll-snap-type x mandatory / y mandatory, no scrollbar`
- Vertical window: `height 376px`
- Dots: `6px, current stretches to 18px (x) or 18px tall (y)`
- Groceries head: `title 20px with the date beside it`
- Week rows: `padding 12px 0, border-top 1px #1f2630, tick 24px`

## Accessibility

- A page of widgets needs its dots as labelled buttons; the colour of a dot is not the label.
- Ticking an item must be a checkbox-like control, so the done state is announced.
- The patterns and photos are decoration; the number and the word carry the meaning.

## The system's own words

# WidgetScreens

Widgets in use, as the widget lab has them: horizontal scrolling with page dots in the topic colour and vertical scrolling with the app's side pointer, widgets with pictures (real photos in duotone, two colours of the topic, and flat drawings in trip style for the things themselves), the full Groceries screen in three looks where tapping an item ticks it off and the counter, dots and ring follow.

A showcase page; the four looks in every size are in `WidgetGallery`, the demo data in `WidgetData`. Demo photos are macOS wallpapers in this system's asset store.

