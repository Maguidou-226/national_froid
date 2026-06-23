# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**National Froid GNF** is a static HTML website for an HVAC/refrigeration service company based in Paris and serving Île-de-France. There is no build system, package manager, or deployment pipeline—all files are served directly as static HTML.

## Development & Preview

To preview changes, open any `.html` file directly in a browser. The site uses ES5 vanilla JavaScript with no external dependencies, so changes to HTML, CSS, or JavaScript are immediately reflected on page reload.

```bash
# Open index.html in your default browser (from terminal)
start index.html

# Or manually open any HTML file with your browser
```

## Architecture & Design System

### Pages

The site is a **single-page application** (one-page) with in-page anchors. All marketing content lives in `index.html`; the former standalone pages are now thin redirect stubs kept for SEO/bookmarks.

- **index.html** — The whole site: hero (`#accueil`), services overview (`#services`), then detailed sections `#installation`, `#depannage` (dark), `#entretien`, `#ventes`, plus `#pourquoi`, certifications, `#zones`, `#avis` (testimonials), and `#contact` (combined contact + devis form + map). Navigation links and the footer use `#anchor` hrefs.
- **mentions-legales.html** — Legal disclaimers (real standalone page; nav/footer link back to `index.html#…`)
- **merci.html** — Post-form thank-you page (FormSubmit `_next` target)
- **installation.html · depannage.html · entretien.html · ventes.html · contact.html · devis.html** — Redirect stubs (`meta refresh` + `location.replace` + canonical) pointing to the matching `index.html#anchor`. Don't add content here; edit the corresponding section in `index.html`.

### Design System: "Éditorial Parisien"

The site uses a cohesive design system defined in `css/style.css` (lines 1–31):

**Color Tokens:**
- `--paper` / `--paper-2` / `--paper-3` — warm cream/beige backgrounds
- `--ink` / `--ink-2` / `--ink-soft` — deep cool dark text
- `--frost` / `--frost-bright` — deep glacier blue (cold theme)
- `--ember` / `--ember-soft` — warm terracotta (heat theme)
- `--line` / `--line-soft` — subtle borders

**Typography:**
- `--display` — Fraunces (serif, editorial display headings)
- `--sans` — Hanken Grotesk (sans-serif, body text)

Both fonts are imported from Google Fonts in each HTML file's `<head>`.

**Layout:**
- `--wrap` — 1240px max container width
- `--gut` — responsive horizontal padding (1.25rem–2.5rem)
- `--block` — responsive vertical spacing (4.5rem–9rem)

### JavaScript (js/main.js)

Pure ES5 vanilla JavaScript:

1. **Mobile navigation toggle** — `.nav-toggle` element toggles `.nav-links` visibility; closes on link click
2. **Scroll reveal** — Elements with class `.reveal` fade in when scrolled into view (IntersectionObserver, fallback for older browsers)
3. **Broken image fallback** — Images in `.media` that fail to load are hidden, revealing the CSS background gradient
4. **Contact form** — The `#contact` form POSTs to FormSubmit (https://formsubmit.co/nationalfroid@gmail.com); main.js fills the hidden `_next` field so visitors are redirected to merci.html after submission
5. **Scrollspy** — `.nav-anchor` links get `aria-current="page"` as their section scrolls into view (IntersectionObserver)
6. **Reading progress + back-to-top** — `.scroll-progress` bar tracks scroll; `.to-top` button appears past 600px

Anchors account for the sticky header via `scroll-margin-top` on `[id]` (driven by the `--nav-h` token in `css/style.css`). If the header height changes, update `--nav-h`.

## Common Edits

### Update contact info or metadata
- Phone, email, hours, address, VAT ID are in `<script type="application/ld+json">` (structured data for SEO) in every HTML file's `<head>`
- Email in forms: check the `action="https://formsubmit.co/..."` attribute in contact.html and devis.html

### Add or modify a service page
1. Copy an existing page (e.g., installation.html) as template
2. Update the `<title>`, meta description, and heading content
3. Keep the same header/footer/nav structure
4. Add `.reveal` class to sections for scroll animation
5. Link it in the navigation (`<nav class="nav-links">`) in all pages

### Modify colors or spacing
- Edit CSS custom properties at the top of `css/style.css` (`:root { ... }`)
- These propagate to all pages automatically

## Notes

- No build step, linting, or tests—changes go live on file save
- All pages must manually maintain consistent navigation and meta tags
- The site is responsive via CSS (media queries and `clamp()` functions); test at multiple viewport sizes
- Structured data (JSON-LD) is used for SEO; update it when contact info changes
