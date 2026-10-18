# Test results — 18 October 2026

## Automated checks

| Check | Result |
| --- | --- |
| `npm ci` | Pass after stopping the Vite process that held Rollup's native binary open on Windows. |
| `npm run lint` | Pass: ESLint and HTML Validate. |
| `npm test` | Pass: 3 server-side tests covering validated delivery payload to `feedback.eduhub@gmail.com`, spam/invalid input rejection, and provider failure. Provider calls are mocked. |
| `npm run build` | Pass: Vite production build, with the hero MP4 and all public assets copied to `dist/`. |
| Internal asset path audit | Pass: all 9 static image/icon paths in the HTML/CSS exist; the dynamic hero MP4 loaded in-browser. |

## Browser checks

Tests used the built site and a local fixture that routes the form endpoint to the Netlify handler with a mock email provider. The fixture logged `MOCK DELIVERY to=feedback.eduhub@gmail.com subject=IKONSOL enquiry: Engineering`.

| Feature | Observed result |
| --- | --- |
| Navigation | Hero courses link reaches `#courses`; catalog enquiry reaches `#contact` and preselects the correct course; all internal hash targets exist. |
| Search and discovery | Searching `Cyber Security` shows one Engineering area and opens its details; Management filter shows one area; clear and All courses restore the full catalog. |
| WhatsApp | Header/contact/floating links use `wa.me/918981729353` and an encoded IKONSOL course message. The URL resolves to WhatsApp; the reference short link redirects to the same number. |
| Form | Empty submit shows field-specific errors; a valid form shows success against the mock provider; unavailable endpoint shows a clear error and phone/WhatsApp alternative. |
| Hero media | Video loaded with `readyState=4`, plays muted and inline, and remained playing after a duration plus 11 seconds (loop observed). Desktop and 390 px mobile framing was inspected. |
| Reduced motion | `?motion=reduce` browser override exercised the same fallback branch as `prefers-reduced-motion`: video hidden, no video source set, poster image visible, reveal elements fully visible. The CSS also contains a native `prefers-reduced-motion` rule. |
| Responsive | Desktop default, 820 px tablet, and 390 px mobile inspected; no document horizontal overflow at these sizes. Mobile floating WhatsApp button and menu visible; menu opens and closes after navigation. |
| Accessibility | Skip link receives keyboard focus with a visible 3 px outline; images have descriptive alt text; form controls are labeled; catalog details and filters are native keyboard controls; reduced motion path verified. |
| Links/assets/console | No broken internal anchors; non-lazy images loaded; CloudEmpire, WhatsApp and Google Maps links returned HTTP 200; browser console reported no errors. |

## Deployment limits

- No live Resend credentials or verified sending-domain value were provided. The destination is configured and the entire local submission flow was tested with a provider fixture, but actual email arrival cannot be claimed until the site is deployed with `RESEND_API_KEY` and `RESEND_FROM_EMAIL` and a real test message is received.
- Mobile playback was checked in a 390 px Chrome viewport, not on a physical iOS or Android device.
- The reduced-motion browser check used the documented URL override. Actual OS-level motion preference was not changed on the user's computer.
- The source site's Florida footer address and incomplete Hotel Management/Council Members information remain flagged in `reference-inventory.md` rather than guessed.
