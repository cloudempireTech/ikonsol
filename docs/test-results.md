# Test results — 18–20 October 2026

## Expanded Home page — 20 October 2026

| Check | Result |
| --- | --- |
| Content | General, Computer applications, Law and Certificate cards link to the corresponding catalog anchors. Hotel management points to its enquiry-only overview. Ikonsol Edutech Pvt. Limited mission cards use the reference's stated aims. |
| Desktop, tablet and mobile | Browser checks at 1440, 768 and 390 px confirm the abstract cards, mission cards and enquiry steps reflow without horizontal overflow. No browser console errors or failed local assets occurred. |
| Interaction and motion | Computer applications card opens the correct catalog section. Scroll reveal activates for the new cards; `?motion=reduce` removes transitions. The Home page includes a no-JavaScript reveal fallback. |
| Automated checks | `npm run lint`, `npm test` (7 tests), and `npm run build` pass. |

## Home top courses catalog link — 20 October 2026

The “Explore top courses” section includes a fifth, full-width “View all courses” image card linking to `/courses.html`. Its image is a local copy of the reference site's General courses photo. The card uses a dark overlay to keep its heading readable. Browser checks at 1440, 768 and 390 px confirmed the image loads, the text and arrow stay within the card, the link opens the catalog, and there is no horizontal overflow or console error. `npm run lint`, `npm test` (7 tests), and `npm run build` pass.

## Course subgroup layout — 20 October 2026

| Check | Result |
| --- | --- |
| Source headings | Pass: Engineering Diploma (5), B.Tech (6), and M.Tech (7) appear as separate card groups using the source's headings. Management and Paramedical entries are grouped by their listed program types. |
| Search and filters | Pass in desktop and mobile browsers: Engineering shows 18 cards; “Bachelor of Engineering” shows six B.Tech cards; “Cyber Security” shows only the M.Tech group; “Pharmacy” shows three cards and hides the other Paramedical group. |
| Course enquiries | Pass: repeated Engineering subjects include their degree level in the enquiry link so Diploma and B.Tech Civil Engineering are distinguishable. |
| Mobile layout | Pass at 390 px: one-column cards, loaded images, working menu, and no horizontal overflow. |
| Errors and checks | No browser console errors or failed local asset requests. `npm run lint`, `npm test` (7 tests), and `npm run build` pass. |

## Course card scroll motion — 20 October 2026

| Check | Result |
| --- | --- |
| Desktop scroll reveal | Pass: offscreen cards begin unrevealed; entering the viewport activates the card, image, and copy animations. Three-column rows use 0, 90, and 180 ms staggered starts. |
| Mobile layout | Pass at 390 px: one-column cards animate without stagger, and the page has no horizontal overflow. |
| Reduced motion | Pass with `?motion=reduce`: all 80 cards appear immediately with `animation: none`, full opacity, and no transform. |
| Static fallback | The Courses page includes a no-JavaScript style that leaves its reveal content visible. |
| Automated checks | `npm run lint`, `npm test` (6 tests), and `npm run build` pass. |

## Individual course catalog — 19 October 2026

| Check | Result |
| --- | --- |
| Catalog completeness | Pass: all 80 named reference entries appear directly on `/courses.html` in nine category sections. Each has a unique generated WebP asset, verified by file hash. Management specializations retain their label. Hotel management remains an enquiry area without an invented program. |
| Desktop visual review | Pass at 1440 px: Engineering shows 18 image cards in a three-column grid with responsive image proportions and no horizontal overflow. |
| Mobile visual review | Pass at 390 px: one-column cards, scrollable category filters, visible search and no page-level horizontal overflow. The mobile menu opens with all five links. |
| Search and filters | Pass in browser: Engineering shows 18 entries; `Cyber Security` narrows it to one; an unmatched query shows the empty state; Clear restores 80; Hotel management shows its enquiry panel. |
| Course enquiry | Pass in browser: Cyber Security opens Contact with Engineering selected and the course named in the message. Empty submission shows name and reply-method errors. |
| Assets and console | Pass: first visible generated cards load at natural width 960; no broken images or console errors in the fresh checked page. Static route tests verify every asset path. |
| Automated checks | `npm run lint`, `npm test` (6 tests), and `npm run build` pass. |

The image files in `assets/course-images/` are web-optimized illustrative scenes. They are not photographs of Ikonsol Edutech Pvt. Limited facilities. The source content and exact asset mapping are documented in `reference-inventory.md`, `generated-course-images.md`, and `data/course-catalog.json`.

The GitHub Pages workflows for commit `17e8cc0936ef1f51e2b789fcad91d34e2300fddd` completed successfully. On the live `/ikonsol/courses.html` page, all 80 cards and nine sections rendered. The Engineering filter showed 18 entries, `Cyber Security` search showed one, the enquiry URL included the selected category and subject, the checked images loaded, and the browser reported no console errors.

## Earlier course page redesign — 19 October 2026

| Check | Result |
| --- | --- |
| Desktop visual review | Pass at 1440 px: warm-background category pills, prominent search, serif heading, and three-column photo cards with aligned Explore and Enquire actions. |
| Mobile visual review | Pass at 390 px: single-column cards, horizontally scrollable category pills, visible search, and no page-level horizontal overflow. |
| Search and filters | Pass in browser: `Cyber Security` returns Engineering; Clear restores all nine cards; Law filter shows only Law. |
| Detail pages | Pass in browser: Law detail image loads, four verified course names appear as plain tiles with no bullet marks, and the enquiry link remains present. |
| Assets and console | Pass: visible card/detail images loaded and no browser console errors appeared in the checked pages. |
| Automated checks | `npm run lint`, `npm test` (6 tests), and `npm run build` pass. |

The catalog keeps verified subjects in its search index, with the complete listings on the nine detail pages. The photos come from the Ikonsol Edutech Pvt. Limited source asset inventory; The Divine page supplied layout inspiration only.

The GitHub Pages deployment of commit `854a706` succeeded. On the live `/ikonsol/courses.html` page, all nine cards and both stylesheets loaded; the desktop grid had three columns and no horizontal overflow. Live search for `Cyber Security` returned Engineering, and its detail page showed 18 plain course tiles with computed `list-style: none` and no `::before` marker. The checked live pages had no console errors.

## GitHub Pages path repair — 19 October 2026

The first GitHub Pages deployment at `/ikonsol/` displayed unstyled HTML and broken images because root-relative URLs requested files from the domain root. The source pages now use relative links; `assets/` is at the repository root so branch-based Pages can serve it. Canonical and sitemap URLs target the current Pages address.

| Check | Result |
| --- | --- |
| `npm run lint` | Pass across JavaScript and all 13 HTML pages. |
| `npm test` | Pass: 6 tests, including every local link, image, script, stylesheet, page route, and GitHub Pages sitemap URL. |
| `npm run build` | Pass: Vite includes all 13 pages, hashed images and the 815 KB hero video with relative asset paths. |
| Raw branch at `/ikonsol/` | Pass in local browser: styled Home, loaded images and looping muted video (`readyState=4`); no horizontal overflow. |
| Catalog and navigation | Pass at 390 px: mobile menu opens and navigates to Courses; `Cyber Security` search finds Engineering; detail page and prefilled Contact link work. |
| Contact and reduced motion | Pass: blank form shows required-field errors; `?motion=reduce` pauses and hides video, removes its source, and retains the poster. |
| Built site under a nested URL | Pass in local browser: page styling, images, hero video and navigation resolve under `/ikonsol/dist/`. |

The live GitHub Pages deployment for commit `53b34bd` completed successfully. In the live browser, Home is styled; the logo and visible images load; the muted, looping hero video loads from `/ikonsol/assets/hero.mp4` with `readyState=4`; and primary links stay within `/ikonsol/`. At 390 px, Courses and Engineering show no horizontal overflow. Searching `Cyber Security` finds Engineering, its detail link opens, and its enquiry link opens Contact with Engineering selected. WhatsApp links target `wa.me/918981729353`; no browser console errors were reported on the checked pages.

## Automated checks

| Check | Result |
| --- | --- |
| `npm ci` | Pass after stopping the Vite process that held Rollup's native binary open on Windows. |
| `npm run lint` | Pass: ESLint and HTML Validate across all 13 HTML pages. |
| `npm test` | Pass: 6 tests covering all local routes and anchors, unique page titles/headings, course links, sitemap entries, and WhatsApp URL construction. |
| `npm run build` | Pass: Vite production build generated all 13 pages and copied the hero MP4 and public assets to `dist/`. |
| Local HTTP audit | Pass: all 13 built HTML routes returned HTTP 200 from `npm run preview`. |

## Browser checks

Tests used the built site served locally with `npm run preview`. The WhatsApp form was tested with sample details; no message was sent to Ikonsol Edutech Pvt. Limited.

| Feature | Observed result |
| --- | --- |
| Navigation | Home → Courses → Engineering detail → Contact works. The course link preselects Engineering. All four primary navigation routes and nine detail routes exist. |
| Search and discovery | Searching `Cyber Security` shows one Engineering area; its title opens the dedicated detail page with the verified Diploma, B.Tech and M.Tech listings. |
| WhatsApp | Header/contact/floating links use `wa.me/918981729353` and an encoded Ikonsol Edutech Pvt. Limited course message. The reference short link redirects to the same number. |
| Enquiry form | Empty submit shows field-specific errors. A valid sample enquiry prepares `wa.me/918981729353` with name, course, phone, and message; the page states that the visitor must tap Send in WhatsApp. A visible Open WhatsApp link remains available. Editing the message clears the prepared link and status. |
| Hero media | On the final multipage Home, video loaded with `readyState=4`, playing muted and inline, with a 10-second duration and loop enabled. A full loop and desktop/mobile framing were checked in the earlier build; the video asset and hero styling are unchanged. |
| Reduced motion | On the final Home, `?motion=reduce` hides and pauses the video, removes its source, retains the poster, and displays reveal elements. The CSS also contains a native `prefers-reduced-motion` rule. |
| Responsive | At 390 px, Courses, Engineering, About and Contact fit without horizontal overflow; course listings and the enquiry form remain readable. The mobile menu opens, navigates to About, and closes after navigation. Tablet and desktop layouts were inspected in the earlier build. |
| Accessibility | Skip link receives keyboard focus with a visible 3 px outline; images have descriptive alt text; form controls are labeled; category filters are native keyboard controls; reduced motion path verified. |
| Links/assets/console | The route test finds no broken local links or anchors. All built HTML routes return HTTP 200. The browsed pages reported no console errors. External CloudEmpire, WhatsApp and Google Maps links were checked in the earlier build. |

## Limits

- A WhatsApp deep link can prepare the enquiry, but only the visitor can deliver it by tapping **Send** in WhatsApp. No live business message was sent during testing.
- Mobile playback was checked in a 390 px Chrome viewport, not on a physical iOS or Android device.
- The reduced-motion browser check used the documented URL override. Actual OS-level motion preference was not changed on the user's computer.
- The source site's Florida footer address and incomplete Hotel Management/Council Members information remain flagged in `reference-inventory.md` rather than guessed.

## Parallax update — 20 October 2026

| Check | Result |
| --- | --- |
| Static checks | `npm run lint`, `npm test` (7 tests), and `npm run build` pass. |
| All page routes | At 1440 px and 390 px, all 13 pages show a changing scroll offset on hero media or decorative backgrounds. No horizontal overflow or browser console errors. |
| Course imagery | The visible catalog card image changes its offset while scrolling at both widths. Search still finds `computer science` courses. |
| Motion preferences | Native `prefers-reduced-motion: reduce` and `?motion=reduce` hold offsets at `0px`. The native preference hides the video and shows its poster. |
| Hero playback | At 390 px in Chrome, the hero video loaded and played muted, inline and on loop. |

These checks ran in headless Chrome against the local Vite site. Screen captures of the desktop and mobile hero and a course card were inspected for readable text, intact image framing and clipping. Physical mobile devices were not used.

## Company name update — 21 October 2026

The live site copy, page titles and descriptions, accessibility labels, WhatsApp greeting, logo, favicon, and Apple touch icon now use **Ikonsol Edutech Pvt. Limited**. The source audit retains its original wording as a historical record. Automated checks pass with `npm run lint`, `npm test` (7 tests), and `npm run build`. Browser checks covered all 13 pages at 1440, 768, and 390 px: the new logo and favicon loaded, the previous company name was absent from visible page copy, and no horizontal overflow or console errors appeared. Desktop and mobile header and About screenshots were reviewed. WhatsApp links included the new company name in the prepared message.

## Courses page layout — 21 October 2026

The catalog opens with General courses selected, while **All courses** still reveals every listing on the same page. The existing course names, descriptions, categories, subgroup labels, images and enquiry links were kept. Search automatically spans all categories. A category fragment such as `#law` opens the matching section. The page uses a shorter hero, a compact search and filter panel, and lighter course cards with simpler title typography.

`npm run lint`, `npm test` (7 tests), and `npm run build` pass. Browser checks at 1440, 768, and 390 px confirmed the initial 11 General cards, 18 Engineering cards on selection, all 80 cards via **All courses**, Cyber Security search, Hotel management enquiry, direct category fragments, image loading while scrolling, and no horizontal overflow or console errors. Desktop and mobile screenshots were visually reviewed.

## Original logo and favicon restoration — 21 October 2026

The header and footer use the earlier `cropped-logo.png`; browser icons use the earlier `favicon.png` and `apple-touch-icon.png`. These are exact assets from the pre-rebrand repository commit. The artwork itself contains the former company wording; page copy retains **Ikonsol Edutech Pvt. Limited**. All 13 pages were checked for the restored image paths and accessible labels. The static checks and desktop/mobile visual review were repeated after the change.

## Logo wordmark update — 21 October 2026

The header and footer now use `ikonsol-logo.svg`, which embeds the exact original book crest and places the current company name beside it. The previous favicon and Apple touch icon remain in place. The original `cropped-logo.png` is retained as the source asset. The new wordmark was visually checked at desktop and mobile sizes; all page references, image loading, and static checks were verified.
