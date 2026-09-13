# GAM — client presentation demo

A bilingual, responsive concept for Grupo António Mosquito, redesigned around the supplied PESCO references. React, TypeScript, Vite, React Router and GSAP.

## Run

```sh
npm install
npm run dev
```

For a production preview:

```sh
npm run build
npm run preview
```

The production website is generated in `dist/`. Serve it over HTTP; opening `index.html` as a local file does not support client-side routing.

## Included

- Home: full-screen video, editorial introduction, desktop scroll-controlled typographic scene with GAM cut-outs, statistics, sector links, interactive company showcase and responsibility section.
- Group: overview, leadership portrait and institutional motto, statistics and values.
- Companies: nine supplied company logos, category filters and individual preview profiles.
- Sectors: expandable information for seven established sectors and oil exploration.
- Sustainability: institutional commitments and a preview of future impact content.
- Contact: published phone/address/email details; form validates and prepares a `mailto:` message in the visitor’s email application. There is no backend and the demo does not claim to send messages.
- News and Careers: designed “Em breve / Coming soon” pages.
- Portuguese/English toggle on every page, persisted locally; translated navigation, page content, form labels, accessibility labels and titles.
- Keyboard navigation, menu focus handling, video pause/play, mobile company arrows, reduced-motion support and a 404 page.

## Files

- `src/redesign/Home.tsx`: homepage and showcase interaction.
- `src/redesign/Pages.tsx`: supporting pages.
- `src/redesign/ui.tsx`: shared header, footer and UI.
- `src/redesign/content.ts`: supplied asset mapping and bilingual portfolio data.
- `src/redesign/context.tsx`, `useLanguage.ts`: language provider.
- `src/App.tsx`: routes and page titles.
- `src/index.css`: responsive visual system.
- `src/assets/`: existing supplied images, logos, cut-outs and video.
- `public/fonts/`: locally hosted Poppins and Zilla Slab, with SIL Open Font License files. Zilla Slab is the open-source slab-serif alternative to the reference’s Mokoko.
- `docs/`: verification notes and visual previews.

## Content and imagery

Sources checked on 13 September 2026:

- https://www.gam.ao/index.php/quem-somos
- Supplied GAM brief, screenshots and repository assets.
- Design reference: https://www.pesco-holding.com/en and the user’s PESCO screenshots.

Figures preserve the source’s qualifiers: approximately 20 companies, approximately US$120 million annual turnover, and over 1,300 employees. These are published institutional figures, not independently verified current financial data.

The chairman’s panel labels the quotation as the **institutional motto**, not a newly attributed personal statement. Journey dates were supplied by the client; no historical event descriptions, certifications, project achievements or job openings have been invented. Extended profiles, impact initiatives, news and opportunities remain explicitly “coming soon”. The food-company display name follows the supplied **Ammil** logo; the earlier prompt calls it GAMIL and should be reconciled with the client before production.

Existing scene images illustrate sectors; their provenance as actual company facilities has not been independently established. Keep them as demo imagery until the client validates the media library. No PESCO branding or image assets have been imported.

## Presentation / deployment

Portuguese is the default language. Start at `/`, scroll through the large-type sequence on desktop, try company tabs and explore `/grupo` and `/empresas`. The typographic scene uses scroll-controlled horizontal text on desktop and phones, with a stationary bus at the bottom. Reduced-motion preferences receive a static composition. All fonts and images load from the site itself.

The existing `vercel.json` handles SPA route fallbacks. The default build targets the domain root. A different static host must serve `index.html` for application routes. For subdirectory deployment, configure Vite’s `base` and the host’s SPA fallback. React Router reads the configured base path.

This is a local, presentation-ready concept, not a published official GAM website. `noindex, nofollow` and the discreet demo footer are retained. Source repository: https://github.com/rlgbt1/gam-demo-website. GitHub Pages deployment is pending; no email backend is configured.

## Presentation refinements

- The hero cycles through five clips: agriculture, transport, Oil & Gas, the original Luanda clip (labelled Construção civil), and Mbakassy cars (labelled Indústria), with manual chapter controls and pause/play. Agriculture plays first.
- All nine companies can be selected from the homepage showcase, with previous/next arrows, sector video playback on selection, and pause/play.
- All eight images in the supplied `animation-icons` folder are included. CSS frames their transparent bounds; original files are untouched. The scene spans the viewport width and scrolls on mobile as well as desktop.
- Three animated gold hexagons assemble into the GAM symbol on the Group page. Reduced-motion users see the completed mark.
- The Group journey includes the user-supplied dates 1974, 1980, 1990, 2000, 2010 and 2026, without invented historical descriptions. The three supplied photographs are sector illustrations, not asserted to be archival images from those dates.
- Teko’s wordmark links to https://rlgbt1.github.io/teko-website-/; the closing project CTA links to WhatsApp +244 922 096 472.
- Home appears in header and footer; Oil & Gas is used as the sector label in both languages.

## Scroll composition

Six sequential scroll chapters: buses, sky, steel blocks, crane, industry, and solar panels. The bus fades before the sky enters. Fades alternate with directional entrances, while the steel blocks and solar rows assemble as the user scrolls and reverse when scrolling back. Sky and industry images retain natural proportions inside wide cropped frames. The stage works on mobile and desktop; reduced-motion preferences are respected. The sectors CTA sits below the statistics.

## Latest details

- Company backgrounds use dedicated CCL, Microcenter, Mbakassy, SyOil, Ammil and waste-management clips, separate from the hero playlist.
- The founder portrait has a GAM-inspired frame and a bilingual link to `/fundador`, a coming-soon page.
- Teko contact links include its website, WhatsApp and `tekoo.aip@gmail.com`.
- Build and lint pass; mobile and desktop browser checks cover scroll sequences, assembly reversal, proportional image cropping and company playback.
