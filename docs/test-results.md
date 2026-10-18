# Test results — 18 October 2026

## Automated checks

| Check | Result |
| --- | --- |
| `npm ci` | Pass after stopping the Vite process that held Rollup's native binary open on Windows. |
| `npm run lint` | Pass: ESLint and HTML Validate. |
| `npm test` | Pass: 3 tests for the verified WhatsApp destination, encoded enquiry details, and optional contact fields. |
| `npm run build` | Pass: Vite production build, with the hero MP4 and all public assets copied to `dist/`. |
| Internal asset path audit | Pass: all 9 static image/icon paths in the HTML/CSS exist; the dynamic hero MP4 loaded in-browser. |

## Browser checks

Tests used the built site served locally with `npm run preview`. The WhatsApp form was tested with sample details; no message was sent to IKONSOL.

| Feature | Observed result |
| --- | --- |
| Navigation | Hero courses link reaches `#courses`; catalog enquiry reaches `#contact` and preselects the correct course; all internal hash targets exist. |
| Search and discovery | Searching `Cyber Security` shows one Engineering area and opens its details; Management filter shows one area; clear and All courses restore the full catalog. |
| WhatsApp | Header/contact/floating links use `wa.me/918981729353` and an encoded IKONSOL course message. The reference short link redirects to the same number. |
| Enquiry form | Empty submit shows field-specific errors. A valid sample enquiry prepares `wa.me/918981729353` with name, course, phone, and message; the page states that the visitor must tap Send in WhatsApp. A visible Open WhatsApp link remains available. Editing the message clears the prepared link and status. |
| Hero media | Video loaded with `readyState=4`, plays muted and inline, and remained playing after a duration plus 11 seconds (loop observed). Desktop and 390 px mobile framing was inspected. |
| Reduced motion | `?motion=reduce` browser override exercised the same fallback branch as `prefers-reduced-motion`: video hidden, no video source set, poster image visible, reveal elements fully visible. The CSS also contains a native `prefers-reduced-motion` rule. |
| Responsive | Desktop default, 820 px tablet, and 390 px mobile inspected; no document horizontal overflow at these sizes. The revised form remains readable at 390 px and shows field errors in place. Mobile floating WhatsApp button and menu visible; menu opens and closes after navigation. |
| Accessibility | Skip link receives keyboard focus with a visible 3 px outline; images have descriptive alt text; form controls are labeled; catalog details and filters are native keyboard controls; reduced motion path verified. |
| Links/assets/console | No broken internal anchors; non-lazy images loaded; CloudEmpire, WhatsApp and Google Maps links returned HTTP 200; browser console reported no errors. |

## Limits

- A WhatsApp deep link can prepare the enquiry, but only the visitor can deliver it by tapping **Send** in WhatsApp. No live business message was sent during testing.
- Mobile playback was checked in a 390 px Chrome viewport, not on a physical iOS or Android device.
- The reduced-motion browser check used the documented URL override. Actual OS-level motion preference was not changed on the user's computer.
- The source site's Florida footer address and incomplete Hotel Management/Council Members information remain flagged in `reference-inventory.md` rather than guessed.
