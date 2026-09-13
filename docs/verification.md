# Demo verification — 13 September 2026

- TypeScript production build: passed.
- Oxlint: passed with no warnings.
- Chromium at 1440 × 900 and mobile 390 × 844: no horizontal page overflow on the tested routes.
- Home, Group, Companies, Sectors, Sustainability, News, Careers, Contact, company profile and unknown-route fallback rendered.
- Checked Portuguese/English switching and preference persistence across navigation.
- Company category filtering, profile navigation, keyboard tabs and mobile previous/next controls passed.
- Menu navigation and Escape closing passed; menu traps focus and restores scrolling.
- Contact required fields and email validation exercised; the valid form prepares an email and presents accurate feedback. No message was sent.
- Referenced images loaded; one H1 per tested page; no JavaScript page errors.
- Reduced-motion mode disables pinned scrolling and video autoplay.
- Desktop and mobile screenshots were visually inspected.
- Additional English checks passed at 320, 768, 1024 and 1920px; locally hosted fonts rendered with external requests blocked.
- Desktop scroll animation and the final SyOil company tab passed.

Remaining production work: client approval of copy and assets, current statistics, full company profiles, real news and careers data, impact content, privacy/legal copy if data collection is added, and deployment to the approved host. Safari and physical-device testing are still recommended before public launch.

## Requested refinements

Checked the agriculture-first four-clip cycle, company playback and arrows through all nine companies, Falcon Oil video mapping, all six journey dates, three animated honeycomb pieces, eight framed animation assets, bottom-anchored bus, and the Teko website/WhatsApp destinations. Desktop and mobile scroll text movement is verified. PT/EN layouts were checked at 320, 390, 768, 1024 and 1440px. Reduced-motion fallbacks remain static. No WhatsApp message was sent.

### Simplified scene check

Verified all five scroll chapters at 1440px and 390px: exactly the opening pair, then one image at a time; correct order; no visible image intersects the headline’s bounds. Confirmed removal of barrels, pipes and stage copy, sector CTA below statistics, and desktop honeycomb under the homepage Group label.
