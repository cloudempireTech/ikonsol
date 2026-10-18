# Reference feature and asset inventory

Audited `https://ikonsol.co.in/` on 18 October 2026 using its rendered page, HTML and the Elementor stylesheet. The original is a single-page WordPress/Elementor site.

## Sections and interactions

| Reference | Findings | New site |
| --- | --- | --- |
| Top strip/header | Phone `+91 8981729353`; IKONSOL logo; Home, About Us, Our Courses, Contact Us. Mobile menu includes the same four items and a site search. | The four items lead to distinct Home, About, Courses and Contact pages; mobile menu; course-specific search on Courses. |
| Hero | Student image background, “IKONSOL COLLEGE OF EDUCATION” headline, Contact Us button to `https://wa.link/zygeav`. | Supplied classroom video, matching video poster/static fallback, courses and contact calls to action. |
| Our Top Courses | Engineering, Management, Paramedical, Agriculture, each with the same presentation icon. | Four illustrated cards linking to dedicated course-area pages. |
| About Us | Mission statement about inclusive education, teacher training, higher learning/research and a knowledge society; Contact Us goes to the WhatsApp short link. | Edited for readability while keeping those claims and the IKONSOL identity. |
| Course accordion | General, Engineering, Management, Agriculture, Paramedical, Computer Application and Law categories with the program lists below. | Searchable, filterable, keyboard-accessible `<details>` entries with every listed program on Courses, plus a detail page for each area. |
| Certificate Course | Eight listed certificate courses. | Dedicated catalog entry and detail page. |
| “Council Members” | A heading, but no names or member information; below it are six feature cards: Engineering Courses, Hotel Management, Agricultural Courses, Paramedical Courses, Law Courses, Computer Application Courses. Each Contact Us button uses the same WhatsApp link. | Six areas remain discoverable in the catalog/contact flow. No council members were invented. Hotel Management is enquiry-only because no program list is supplied. |
| “Find your district” | Embedded Google map for the city office; city and branch addresses, email and phone/fax. | City-office map, map link, both addresses, email and call/WhatsApp links plus enquiry form. |
| Footer | Short About text, four quick links, address/phone/email, copyright. | IKONSOL information and navigation, with required “Designed by CloudEmpire” footer link. |

The reference has no enquiry form. The new form is an added feature that prepares a WhatsApp message for the verified number; the visitor sends it in WhatsApp. The reference has no verified statistics, so animated counters were intentionally omitted.

## Page inventory

The redesign has 13 static routes: Home (`/`), About (`/about.html`), Courses (`/courses.html`), Contact (`/contact.html`), and nine pages under `/courses/` for General courses, Engineering, Management, Agriculture, Paramedical, Computer applications, Law, Certificate courses, and Hotel management. The catalog retains all verified listings and links to those pages. Course enquiry links open Contact with the relevant area selected.

## Course inventory

The new catalog preserves these reference listings. Spelling and capitalization are lightly normalized in display text; subjects were not added.

| Category | Reference listings |
| --- | --- |
| General (regular and distance) | B.A.; B.Sc.; B.Com.; M.A.; M.Sc.; M.Com.; B.J.M.C.; M.J.M.C.; D.Lib.; B.Lib.; M.Lib. |
| Engineering: Polytechnic / Diploma | Civil; Mechanical; Electrical; Computer Science; Electronics & Telecommunication Engineering. |
| Engineering: B.Tech | Civil; Mechanical; Electrical & Electronics; Computer Science; Electronics & Communication; Information Technology. |
| Engineering: M.Tech | Computer Science; Digital Communication; Power System; Thermal; Structural; Cyber Security; Computer Technology & Application. |
| Management (regular and distance) | BBA; MBA. Specializations: Human Resource; Financial Planning & Analysis; Finance; Operation & Production; International Marketing; Health Care; Banking; Mass Communication; Disaster Management; Digital Marketing; Fashion Designing; Interior Designing; International Business; Hospitality & Tourism; Supply Chain; E-Commerce; Information Technology; Business Analytics & Intelligence; “Other Specializations.” The source repeats Digital Marketing; the new list shows it once. |
| Agriculture | Diploma in Agriculture; B.Sc. in Agriculture; M.Sc. in Agriculture. |
| Paramedical | GNM; Post Basic B.Sc. Nursing; B.Sc. Nursing; M.Sc. Nursing; DMLT; BMLT; OT Technician; Diploma in Anesthesia Technician; Dialysis Technician; D.Pharm.; B.Pharm.; M.Pharm. |
| Computer Application | DCA; PGDCA; BCA; MCA. |
| Law | BALLB; BBALLB; LLB; LLM. |
| Certificate | Yoga; Fire Safety; Industrial Safety; Disaster Management; Environment Management; Painter; Aviation Management; Retail Management. |
| Hotel Management | Feature card only; no specific program names published. |

## Contact and links

- Phone: `+91 8981729353` in the header, contact section and footer.
- WhatsApp: all eight reference Contact Us buttons lead to `https://wa.link/zygeav`, which redirects to `https://api.whatsapp.com/send?phone=918981729353` with a course-enquiry message. The redesign links directly to `wa.me/918981729353` with a relevant prefilled message.
- Email: `feedback.eduhub@gmail.com`, linked with `mailto:` in the footer.
- City office: `34/F/1, Vivekananda Road, Dunlop, Beside Suraksha Diagonostics, Kolkata - 700035` (source spelling preserved in configuration).
- Branch office: `Bagbazar, Chandannagar, Near CC Club, Hooghly-712136`.
- Google Maps embed: city-office query from the reference. The redesign also provides an open-map link.
- Header/footer links are in-page links; there are no separate course detail pages on the reference. A footer `#` social/icon link has no destination and was omitted.

## Asset inventory

Every unique image referenced by the source HTML and its page stylesheet was downloaded to `public/assets/`. The `*.webp` files are optimized copies used by the redesign.

| Original file | Reference use | New use |
| --- | --- | --- |
| `cropped-logo.png` | Header logo | Header/footer logo; source for favicon and touch icon. |
| `presentation.png` | Four top-course icons | Preserved source asset; redesigned cards use photographs. |
| `istockphoto-1272815911-612x612-1.jpg` | Hero background | Preserved source asset; supplied video replaces hero imagery. |
| `Bulk-SMS-Service-for-Coaching-Institutes.jpg` | Council/feature card image | `management.webp`, `about-classroom.webp`. |
| `b716d34d0297386d6b04961c7aa775a1.jpg` | Engineering and paramedical feature cards | `engineering.webp`. |
| `Hotel-Manager-1.jpg` | Hotel Management feature card | Preserved original; course remains in catalog. |
| `2020_2largeimg_755075284.jpg` | Agricultural feature card | `agriculture.webp`. |
| `istockphoto-538235237-612x612-2.jpg` | Law feature card | Preserved original. |
| `office-463284_1280.jpg` | Computer Application feature card | `paramedical.webp` (generic classroom image, no false clinical claim). |
| `081-university-1.png` | Decorative education icon | Preserved original. |
| `pattern-1.png` | Elementor section background | Preserved original. |
| User-supplied `gemini_generated_video_d5442046.mp4` | Not on reference | `hero.mp4`, H.264 silent fast-start encode; `hero-poster.jpg` extracted at 2 seconds. |

The source did not provide a favicon. `favicon.png` and `apple-touch-icon.png` are cropped from its logo.

## Uncertain or conflicting source details

- The footer includes `4050 Smithfield Avenue, Amarillo, FL 79013` immediately after the Kolkata city-office address. It conflicts with the two offices shown in the contact section, so it is excluded from the redesign.
- “Suraksha Diagonostics” is spelled that way on the source site. The exact landmark name should be confirmed with IKONSOL before editing it.
- The “Council Members” heading has no members. The Hotel Management card has no specific programs. Neither was filled with guessed content.
- The reference states regular/distance mode only for General and Management; no mode was inferred for other categories.
- No verifiable numerical statistics, accreditation claims, admission dates or fees are published in the reference. None were invented.
