# What Is Your Evidence — site

Static site for [whatisyourevidence.com](https://whatisyourevidence.com/).

## Deploy

Drop-in replacement for the previous repo. To deploy on GitHub Pages, replace the contents of the existing repo with the contents of this folder and push. The `CNAME` file is preserved.

```
.
├── index.html
├── aboutus.html
├── resources.html
├── variants.html
├── shop.html
├── bookus.html
├── supportus.html
├── assets/
│   ├── style.css      ← all design tokens & layout
│   ├── main.js        ← nav, scroll-reveal, carousel, tabs
│   ├── logo.svg       ← full wordmark
│   └── favicon.svg    ← favicon
├── featured/          ← homepage carousel images (preserved)
├── sources/           ← downloadable PDFs (preserved)
├── quran variants/    ← variant plate images (preserved)
└── CNAME              ← preserved
```

## Design system

- **Palette**: ink `#0F1115`, parchment `#F4EAD5`, oxblood `#8B1A1A`. Manuscript-gold `#B89455` accent.
- **Type**: Fraunces (display serif, variable), Manrope (body), JetBrains Mono (small caps / labels). Loaded from Google Fonts.
- **Tone**: editorial / juridical / scholarly. Dark hero sections punctuate paper-warm body sections. No cartoon, no generic Tailwind. CSS variables make recolouring easy.

## Logo

The logo is rendered inline as SVG in the header and footer of each page (so it inherits `currentColor` and looks right on dark or paper backgrounds). The standalone files are in `assets/logo.svg` and `assets/favicon.svg`.

If you ever want a PNG export of the logo, open `assets/logo.svg` in any modern browser and screenshot, or run it through Figma / Inkscape.

## Editing pages

Each page is plain HTML with the same header/footer markup. To add a new page:

1. Copy `shop.html` as a template.
2. Update the `<title>`, `<meta name="description">`, the `<h1>`, and the `is-active` nav link.
3. Replace the body section.

To restyle, only `assets/style.css` needs touching — all design tokens are at the top in `:root`.
