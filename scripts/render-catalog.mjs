import { readFileSync, writeFileSync } from 'node:fs';

const catalog = JSON.parse(readFileSync(new URL('../data/course-catalog.json', import.meta.url), 'utf8'));
const path = new URL('../courses.html', import.meta.url);
const html = readFileSync(path, 'utf8');
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const descriptions = {
  general: 'Arts, science, commerce, journalism and library studies.',
  engineering: 'Diploma, bachelor’s and master’s level engineering subjects.',
  management: 'Business and management programs with listed specializations.',
  agriculture: 'Agriculture programs from diploma to postgraduate study.',
  paramedical: 'Nursing, allied health, technician and pharmacy pathways.',
  computer: 'Computer application study from diploma to postgraduate level.',
  law: 'Undergraduate and postgraduate law pathways.',
  certificates: 'Focused options across wellness, safety, environment and industry.',
};

const sections = catalog.map(({ key, title, page, entries }) => {
  const levels = new Map();
  entries.forEach((entry, index) => {
    if (!levels.has(entry.level)) levels.set(entry.level, []);
    levels.get(entry.level).push({ ...entry, index });
  });
  const hasSubgroups = levels.size > 1;
  const renderCard = ({ name, level, image, index }) => {
    const id = `${key}-course-${index + 1}`;
    const subject = entries.filter((entry) => entry.name === name).length > 1 ? `${name} — ${level}` : name;
    const href = `./contact.html?course=${encodeURIComponent(title)}&subject=${encodeURIComponent(subject)}#enquiry-form`;
    const heading = hasSubgroups ? 'h5' : 'h4';
    return `          <article class="detail-course reveal" id="${id}" data-search="${escape(`${title} ${level} ${name}`)}">
            <div class="detail-course__media"><img class="detail-course__image" src="./${escape(image)}" alt="Illustrative learning scene for ${escape(name)}" width="960" height="640" loading="lazy" decoding="async"></div>
            <div class="detail-course__body">${hasSubgroups ? '' : `<p class="detail-course__level">${escape(level)}</p>`}<${heading}>${escape(name)}</${heading}><a class="detail-course__enquire" href="${escape(href)}" aria-label="Enquire about ${escape(subject)}">Enquire about this course <span aria-hidden="true">↗</span></a></div>
          </article>`;
  };
  const cards = hasSubgroups
    ? [...levels].map(([level, levelEntries], index) => {
      const id = `${key}-subgroup-${index + 1}`;
      return `          <section class="catalog-subgroup" aria-labelledby="${id}">
            <div class="catalog-subgroup__heading"><h4 id="${id}">${escape(level)}</h4><p>${levelEntries.length} listed ${levelEntries.length === 1 ? 'option' : 'options'}</p></div>
            <div class="detail-grid">\n${levelEntries.map(renderCard).join('\n')}\n            </div>
          </section>`;
    }).join('\n')
    : `          <div class="detail-grid">\n${entries.map((entry, index) => renderCard({ ...entry, index })).join('\n')}\n          </div>`;
  return `        <section class="catalog-section" id="${key}" data-group="${key}" aria-labelledby="${key}-heading">
          <div class="catalog-section__heading"><div><p class="eyebrow">${entries.length} listed ${entries.length === 1 ? 'option' : 'options'}</p><h3 id="${key}-heading">${escape(title)}</h3><p>${escape(descriptions[key])}</p></div><a class="catalog-section__overview" href="./${page}">About this course area <span aria-hidden="true">↗</span></a></div>
${cards}${key === 'management' ? '\n          <p class="catalog-section__footnote">Other specializations: contact IKONSOL for details.</p>' : ''}
        </section>`;
}).join('\n');

const hotel = `        <section class="catalog-section" id="hotel" data-group="hotel" aria-labelledby="hotel-heading">
          <div class="catalog-section__heading"><div><p class="eyebrow">Course area</p><h3 id="hotel-heading">Hotel management</h3><p>IKONSOL highlights hotel management without naming individual programs on the reference site.</p></div><a class="catalog-section__overview" href="./courses/hotel-management.html">About this course area <span aria-hidden="true">↗</span></a></div>
          <div class="catalog-section__notice"><img src="./assets/hotel-management.webp" alt="Hotel reception setting" width="1204" height="800" loading="lazy"><div><h4>Ask about current programs</h4><p>Contact IKONSOL for the latest hotel management options, eligibility and admission details.</p><a class="detail-course__enquire" href="./contact.html?course=Hotel%20management#enquiry-form">Enquire about hotel management <span aria-hidden="true">↗</span></a></div></div>
        </section>`;
const replacement = `      <div class="catalog-list" id="catalog-list">\n${sections}\n${hotel}\n      </div>\n`;
const pattern = /      <div class="catalog-list" id="catalog-list">[\s\S]*?(?=      <div class="no-results")/;
if (!pattern.test(html)) throw new Error('Catalog container not found');
writeFileSync(path, html.replace(pattern, replacement));
console.log(`Rendered ${catalog.reduce((total, group) => total + group.entries.length, 0)} course entries across ${catalog.length + 1} sections`);
