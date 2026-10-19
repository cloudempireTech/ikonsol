# IKONSOL College of Education

A responsive, framework-free website for IKONSOL College of Education. It uses semantic HTML, CSS and vanilla JavaScript, with Vite only for development and production asset packaging. The site uses IKONSOL branding throughout; CloudEmpire is credited only in the footer.

## Start locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. `npm run build` writes the static site to `dist/`; `npm run preview` serves that build.

## Pages

The site has 13 directly addressable pages:

- `/` — home, hero video, top courses and an introduction to IKONSOL.
- `/about.html` — educational aims and background.
- `/courses.html` — all 80 named programs and specializations shown directly as individual image cards, grouped by category, with category filters and live search. Hotel management remains an enquiry area because the reference does not name a program.
- `/contact.html` — contact information, map and WhatsApp enquiry form.
- `/courses/*.html` — one supporting overview page for each of the nine catalog areas, with the verified listings and a category enquiry link.

`vite.config.mjs` includes every page in the static build. Each page has its own title, description, canonical URL and social preview metadata. The canonical and sitemap URLs currently point to `https://cloudempiretech.github.io/ikonsol/`.

## Configuration

Edit [`site-config.mjs`](site-config.mjs) for the phone number, WhatsApp number, public email address and office addresses. The default number and email match the reference site: `+91 8981729353` / `feedback.eduhub@gmail.com`. The old `wa.link/zygeav` redirect was checked and resolves to WhatsApp number `918981729353`.

The Contact page enquiry form validates the visitor's name, at least one reply method, course and message, then prepares a WhatsApp deep link to the configured business number. Each catalog card preselects its area and writes the selected course into the message. The message includes the entered details. The visitor must review it and tap **Send** in WhatsApp; opening the link does not deliver a message by itself. A visible Open WhatsApp link remains on the page if the automatic new tab is blocked.

No email API key or serverless function is required. The form includes a honeypot and timing check to reduce automated link creation, while WhatsApp itself requires the visitor to send the message. The user-provided video is compressed to `assets/hero.mp4` with its audio removed; the poster is an extracted frame from that same file. `?motion=reduce` is a browser QA override that exercises the same static fallback used by `prefers-reduced-motion`.

## Test

```sh
npm run lint
npm test
npm run build
```

`docs/test-results.md` records the completed browser checks. Test the form in a browser by submitting sample details and checking the generated WhatsApp URL before sending anything.

## Deploy

The live GitHub Pages site is [cloudempiretech.github.io/ikonsol](https://cloudempiretech.github.io/ikonsol/). The existing [Pages workflow](.github/workflows/static.yml) uploads the repository root on pushes to `main`; in repository settings choose **Pages → Build and deployment → GitHub Actions**. GitHub Pages serves the checked-in HTML, CSS, JavaScript and `assets/` directly. All local links are relative so the pages also work under the `/ikonsol/` path. `.nojekyll` keeps the static files unchanged.

For another static host, run `npm run build` and deploy `dist/`. [`netlify.toml`](netlify.toml) already configures this for Netlify. Vite's relative base allows the build to run under a project subpath. Verify that WhatsApp opens with the configured number and prefilled details; a human must tap **Send** to deliver an enquiry. If the public domain changes, update canonical and social URLs in the HTML, both copies of the sitemap and robots files, and this README.

The reference audit, course and asset inventory, and content uncertainties are in [`docs/reference-inventory.md`](docs/reference-inventory.md). The exact catalog entries and paths to their distinct generated visuals are in [`data/course-catalog.json`](data/course-catalog.json); the image generation prompt set is in [`docs/generated-course-images.md`](docs/generated-course-images.md). Run `node scripts/render-catalog.mjs` after editing the data to refresh the static catalog HTML. All course visuals are illustrative, not photographs of IKONSOL facilities. Source imagery is stored in `assets/` rather than hotlinked. No unsupported enrollment, placement or student statistics are shown.
