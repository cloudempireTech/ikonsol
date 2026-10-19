# Test results — 18–19 October 2026

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

Tests used the built site served locally with `npm run preview`. The WhatsApp form was tested with sample details; no message was sent to IKONSOL.

| Feature | Observed result |
| --- | --- |
| Navigation | Home → Courses → Engineering detail → Contact works. The course link preselects Engineering. All four primary navigation routes and nine detail routes exist. |
| Search and discovery | Searching `Cyber Security` shows one Engineering area; its title opens the dedicated detail page with the verified Diploma, B.Tech and M.Tech listings. The earlier catalog filter and clear checks remain covered by the unchanged catalog controls. |
| WhatsApp | Header/contact/floating links use `wa.me/918981729353` and an encoded IKONSOL course message. The reference short link redirects to the same number. |
| Enquiry form | Empty submit shows field-specific errors. A valid sample enquiry prepares `wa.me/918981729353` with name, course, phone, and message; the page states that the visitor must tap Send in WhatsApp. A visible Open WhatsApp link remains available. Editing the message clears the prepared link and status. |
| Hero media | On the final multipage Home, video loaded with `readyState=4`, playing muted and inline, with a 10-second duration and loop enabled. A full loop and desktop/mobile framing were checked in the earlier build; the video asset and hero styling are unchanged. |
| Reduced motion | On the final Home, `?motion=reduce` hides and pauses the video, removes its source, retains the poster, and displays reveal elements. The CSS also contains a native `prefers-reduced-motion` rule. |
| Responsive | At 390 px, Courses, Engineering, About and Contact fit without horizontal overflow; course listings and the enquiry form remain readable. The mobile menu opens, navigates to About, and closes after navigation. Tablet and desktop layouts were inspected in the earlier build. |
| Accessibility | Skip link receives keyboard focus with a visible 3 px outline; images have descriptive alt text; form controls are labeled; catalog details and filters are native keyboard controls; reduced motion path verified. |
| Links/assets/console | The route test finds no broken local links or anchors. All built HTML routes return HTTP 200. The browsed pages reported no console errors. External CloudEmpire, WhatsApp and Google Maps links were checked in the earlier build. |

## Limits

- A WhatsApp deep link can prepare the enquiry, but only the visitor can deliver it by tapping **Send** in WhatsApp. No live business message was sent during testing.
- Mobile playback was checked in a 390 px Chrome viewport, not on a physical iOS or Android device.
- The reduced-motion browser check used the documented URL override. Actual OS-level motion preference was not changed on the user's computer.
- The source site's Florida footer address and incomplete Hotel Management/Council Members information remain flagged in `reference-inventory.md` rather than guessed.
