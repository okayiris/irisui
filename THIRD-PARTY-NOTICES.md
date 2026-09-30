# Third-party notices

This repo ships code, icon geometry, a font and a few images that did not come from us. Their licences are below,
with the copyright notices those licences require. Nothing else in the repo is third-party.

## Icons (part of Lucide)

The line icons in the demo previews (`src/content/components/*/preview.html`) use path geometry from
[Lucide](https://lucide.dev), which is a fork of Feather. Lucide is ISC; the Feather portions are MIT.

```
ISC License

Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT).
All other copyright (c) for Lucide are held by Lucide Contributors 2022.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby
granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING
ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL,
DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION
WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

```
MIT License (Feather portions)

Copyright (c) 2013-2022 Cole Bemis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
```

## Handwriting font (Caveat)

`public/ds/fonts/Caveat-700.woff2` is Caveat, Copyright 2014 The Caveat Project Authors
(<https://github.com/googlefonts/caveat>), licensed under the SIL Open Font License, Version 1.1. The full OFL
text is at <https://scripts.sil.org/OFL> and ships with the font file in the release. The font is used as
declared: not sold on its own, and any derivative keeps a different name.

## React

`public/ds/vendor/react.js` and `public/ds/vendor/react-dom.js` are React and ReactDOM, Copyright (c) Meta
Platforms, Inc. and affiliates, MIT. Their own licence headers travel inside those files.

## Fonts we do NOT ship

No Apple font is redistributed here. The system uses the platform's own text face through
`-apple-system, "SF Pro Text", "SF Pro Display"` (and `ui-monospace, "SF Mono"` for mono) with Inter and the
generic families as fallbacks, and ships no font file for any of them. Apple's SF licence covers use on Apple
platforms only; it does not cover redistribution, so no SF file belongs in a public repo or on a public site.

## Images

This release ships no image file at all. Every picture on the site is drawn by the site itself (the canvas
pattern labs and the word labs), so there is no stock photo, no third-party wallpaper, no camera file and
nothing of a real person's data in it. `public/blobs/SOURCES.md` records why the images that used to sit in
`public/blobs/` were removed; that file stays in the repo and is not served on the site.
