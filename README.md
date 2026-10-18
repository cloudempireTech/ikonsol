# IKONSOL College of Education

A responsive, framework-free website for IKONSOL College of Education. It uses semantic HTML, CSS and vanilla JavaScript, with Vite only for development and production asset packaging. The site uses IKONSOL branding throughout; CloudEmpire is credited only in the footer.

## Start locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. `npm run build` writes the static site to `dist/`; `npm run preview` serves that build.

## Configuration

Edit [`site-config.mjs`](site-config.mjs) for the phone number, WhatsApp number, public email address and office addresses. The default number and email match the reference site: `+91 8981729353` / `feedback.eduhub@gmail.com`. The old `wa.link/zygeav` redirect was checked and resolves to WhatsApp number `918981729353`.

The enquiry form validates the visitor's name, at least one reply method, course and message, then prepares a WhatsApp deep link to the configured business number. The message includes the entered details. The visitor must review it and tap **Send** in WhatsApp; opening the link does not deliver a message by itself. A visible Open WhatsApp link remains on the page if the automatic new tab is blocked.

No email API key or serverless function is required. The form includes a honeypot and timing check to reduce automated link creation, while WhatsApp itself requires the visitor to send the message. The user-provided video is compressed to `public/assets/hero.mp4` with its audio removed; the poster is an extracted frame from that same file. `?motion=reduce` is a browser QA override that exercises the same static fallback used by `prefers-reduced-motion`.

## Test

```sh
npm run lint
npm test
npm run build
```

`docs/test-results.md` records the completed browser checks. Test the form in a browser by submitting sample details and checking the generated WhatsApp URL before sending anything.

## Deploy

1. Connect this repository to Netlify or any static host. [`netlify.toml`](netlify.toml) sets `npm run build` and `dist/` for Netlify.
2. Deploy, then verify that the WhatsApp enquiry opens with the right number and prefilled details on desktop and mobile. A human must tap **Send** in WhatsApp to complete the enquiry.
3. Point `ikonsol.co.in` to the deployment when approved. The Open Graph URL and image in `index.html` already target that domain; update them if publishing elsewhere.

The reference audit, course and asset inventory, and content uncertainties are in [`docs/reference-inventory.md`](docs/reference-inventory.md). Source imagery is stored in `public/assets/` rather than hotlinked. No unsupported enrollment, placement or student statistics are shown.
