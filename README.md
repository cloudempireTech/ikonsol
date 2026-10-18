# IKONSOL College of Education

A responsive, framework-free website for IKONSOL College of Education. It uses semantic HTML, CSS and vanilla JavaScript, with Vite only for development and production asset packaging. The site uses IKONSOL branding throughout; CloudEmpire is credited only in the footer.

## Start locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. `npm run build` writes the static site to `dist/`; `npm run preview` serves that build. The Vite development server does not run the Netlify enquiry function, so valid submissions there show the clear unavailable state.

## Configuration

Edit [`site-config.mjs`](site-config.mjs) for the phone number, WhatsApp number, recipient email, office addresses and form endpoint. The default number and email match the reference site: `+91 8981729353` / `feedback.eduhub@gmail.com`. The old `wa.link/zygeav` redirect was checked and resolves to WhatsApp number `918981729353`.

The enquiry endpoint is a small Netlify Function in `netlify/functions/enquiry.mjs`. It validates on the server, uses a honeypot and minimum completion time, and applies a best-effort in-memory rate limit. The handler sends plain-text email with the Resend API, using the recipient from `site-config.mjs`.

Set these **server-side** environment variables in Netlify before accepting live enquiries:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | An API key with email-send access. |
| `RESEND_FROM_EMAIL` | A sender on a domain verified in the same Resend account, for example `IKONSOL <enquiries@your-verified-domain>`. |

Do not commit either secret. A missing key or sender returns an error to visitors and points them to phone/WhatsApp; the form never claims a failed submission succeeded. The rate limit is best effort per warm function instance. For higher traffic or sustained abuse, add a shared rate-limit store and a managed bot challenge. The user-provided video is compressed to `public/assets/hero.mp4` with its audio removed; the poster is an extracted frame from that same file. `?motion=reduce` is a browser QA override that exercises the same static fallback used by `prefers-reduced-motion`.

## Test

```sh
npm run lint
npm test
npm run build
node tests/fixture-server.mjs
```

Open `http://127.0.0.1:4174/` to test a complete form submission against a **mock** email provider. The fixture prints the destination to its terminal and never sends real mail. `docs/test-results.md` records the completed browser checks and deployment limits.

## Deploy

1. Connect this repository to Netlify. [`netlify.toml`](netlify.toml) sets `npm run build`, `dist/` and the function directory.
2. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`; verify the sender domain in Resend.
3. Deploy, then send a real test enquiry and confirm it arrives at `feedback.eduhub@gmail.com` before promoting the site. Live delivery could not be verified without those credentials.
4. Point `ikonsol.co.in` to the deployment when approved. The Open Graph URL and image in `index.html` already target that domain; update them if publishing elsewhere.

The reference audit, course and asset inventory, and content uncertainties are in [`docs/reference-inventory.md`](docs/reference-inventory.md). Source imagery is stored in `public/assets/` rather than hotlinked. No unsupported enrollment, placement or student statistics are shown.
