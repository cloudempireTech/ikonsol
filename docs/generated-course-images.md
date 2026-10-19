# Generated course visuals

The 80 catalog card visuals were created with the built-in image generation tool and optimized as unique 960 × 640 WebP files. [`data/course-catalog.json`](../data/course-catalog.json) maps each verified course entry to its own asset. The source PNG files are retained by the image generation service; the web-ready copies are stored in `assets/course-images/`.

## Prompt set

The first six General courses used this prompt template, with the exact course name, category and level substituted for each call:

> Use case: photorealistic-natural. Generate one original premium editorial website catalog photograph illustrating [course] in [category] ([level]). Show a specific hands-on learning or professional scene that makes this subject recognizable: adult learners in India, relevant tools, books, equipment or workspace. Make this composition visually distinct from every other course card. Warm natural light, refined earth and forest color palette, authentic documentary realism, horizontal 3:2 framing with safe crop margins. This is a generic illustrative setting, not the actual IKONSOL campus. No logos, text, watermarks, diplomas, or legible writing.

The first Engineering diploma Civil Engineering visual used this prompt:

> Use case: photorealistic-natural. Create a single editorial website card photograph for a Civil Engineering diploma course. Generic adult students in India carefully using a surveying tripod at an outdoor practice site, professional modest clothing, warm natural daylight, authentic documentary photography, refined muted palette, crisp subject, wide 3:2 horizontal composition with safe crop margins. No identifiable campus, no IKONSOL branding, no text, no watermark.

The remaining entries used this prompt template, with course name, category, level and a subject-specific scene inserted in each individual image generation call:

> Use case: photorealistic-natural. Create one original premium editorial website catalog photograph for the IKONSOL course listing "[course]" within [category], [level]. Depict [subject-specific scene]. Give this course its own distinctive scene, subjects, viewpoint and focal detail; vary composition from other course images. Adults in India where people are shown. Warm natural light, refined earth and forest palette, authentic documentary realism, horizontal 3:2 framing with safe crop margins. Generic illustrative location, not the actual IKONSOL campus. No logos, text, watermarks, diplomas or legible writing.

The scene changes with the subject: for example, surveying equipment for Civil Engineering, a mechanical workshop for Mechanical Engineering, a nursing simulation for Nursing, a reporting workshop for Journalism, a legal studies setting for Law and a fire safety exercise for Fire Safety. These are generic illustrations, not photographs of IKONSOL programs or facilities.
