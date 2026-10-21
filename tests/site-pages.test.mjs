import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const base = 'https://cloudempiretech.github.io/ikonsol/';
const coursePages = readdirSync(resolve(root, 'courses')).filter((name) => name.endsWith('.html')).map((name) => `courses/${name}`);
const pages = ['index.html', 'about.html', 'courses.html', 'contact.html', ...coursePages];

function sitePath(url) {
  assert.equal(url.origin, new URL(base).origin);
  assert.ok(url.pathname.startsWith('/ikonsol/'), `${url} stays within the GitHub Pages site`);
  return decodeURIComponent(url.pathname.slice('/ikonsol/'.length)) || 'index.html';
}

test('every page has working relative links, assets, unique metadata and one heading', () => {
  assert.equal(coursePages.length, 9);
  const titles = new Set();
  for (const page of pages) {
    const content = readFileSync(resolve(root, page), 'utf8');
    assert.ok(content.includes('Ikonsol Edutech Pvt. Limited'), `${page} uses the current company name`);
    assert.ok(!/IKONSOL College of Education/i.test(content), `${page} omits the former company name`);
    assert.match(content, /assets\/brand-logo\.svg/, `${page} uses the current logo`);
    assert.match(content, /assets\/brand-mark\.svg/, `${page} uses the current favicon`);
    const pageUrl = new URL(page === 'index.html' ? '' : page, base);
    const title = content.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `${page} has a title`);
    assert.ok(!titles.has(title), `${page} has a unique title`);
    titles.add(title);
    assert.equal([...content.matchAll(/<h1\b/g)].length, 1, `${page} has one h1`);
    assert.ok(content.includes(`<link rel="canonical" href="${pageUrl}"`));
    for (const route of ['index.html', 'about.html', 'courses.html', 'contact.html']) {
      assert.ok([...content.matchAll(/\bhref="([^"]+)"/g)].some(([, href]) => {
        if (/^(https?:|tel:|mailto:)/.test(href)) return false;
        return sitePath(new URL(href, pageUrl)) === route;
      }), `${page} links to ${route}`);
    }
    for (const [, attribute, value] of content.matchAll(/\b(href|src|poster)="([^"]+)"/g)) {
      if (/^(https?:|tel:|mailto:|data:)/.test(value)) continue;
      const url = new URL(value, pageUrl);
      const target = sitePath(url);
      assert.ok(existsSync(resolve(root, target)), `${page} ${attribute}=${value} exists`);
      if (url.hash && url.pathname === pageUrl.pathname) {
        assert.ok(content.includes(`id="${url.hash.slice(1)}"`), `${page} -> ${value} anchor exists`);
      }
    }
  }
});

test('catalog shows every verified course directly with a distinct image and enquiry', () => {
  const catalog = readFileSync(resolve(root, 'courses.html'), 'utf8');
  const groups = JSON.parse(readFileSync(resolve(root, 'data/course-catalog.json'), 'utf8'));
  const entries = groups.flatMap((group) => group.entries);
  assert.equal(entries.length, 80);
  assert.equal(new Set(entries.map((entry) => entry.image)).size, entries.length);
  assert.equal(new Set(entries.map((entry) => createHash('sha256').update(readFileSync(resolve(root, entry.image))).digest('hex'))).size, entries.length, 'every course image has distinct content');
  assert.equal([...catalog.matchAll(/<section class="catalog-section"/g)].length, 9);
  assert.equal([...catalog.matchAll(/<article class="detail-course reveal"/g)].length, entries.length);
  assert.equal([...catalog.matchAll(/class="detail-course__media"/g)].length, entries.length);
  assert.equal([...catalog.matchAll(/class="detail-course__image"/g)].length, entries.length);
  assert.match(catalog, /data-search="[^"]*Cyber Security/);
  assert.doesNotMatch(catalog, /<(?:ul|li|details)\b/);
  for (const group of groups) {
    assert.ok(catalog.includes(`data-group="${group.key}"`));
    const detail = readFileSync(resolve(root, group.page), 'utf8');
    for (const entry of group.entries) {
      assert.match(catalog, new RegExp(`<h[45]>${entry.name.replaceAll('&', '&amp;').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</h[45]>`), `${entry.name} shown in catalog`);
      assert.ok(detail.includes(`<li>${entry.name.replaceAll('&', '&amp;')}</li>`), `${entry.name} verified on detail page`);
      assert.ok(existsSync(resolve(root, entry.image)), `${entry.image} exists`);
    }
  }
  for (const page of coursePages) {
    assert.ok(catalog.includes(`href="./${page}"`), `catalog links ${page}`);
    const content = readFileSync(resolve(root, page), 'utf8');
    assert.match(content, /href="\.\.\/contact\.html\?course=/, `${page} provides a course enquiry`);
    assert.match(content, /class="course-page__cover"/, `${page} has a course image`);
    assert.match(content, /href="\.\.\/courses\.css"/, `${page} uses the course design`);
  }
});

test('source course levels appear as visible catalog subgroups', () => {
  const catalog = readFileSync(resolve(root, 'courses.html'), 'utf8');
  const groups = JSON.parse(readFileSync(resolve(root, 'data/course-catalog.json'), 'utf8'));
  const expected = {
    engineering: ['Polytechnic / Diploma Engineering', 'Bachelor of Engineering (B.Tech.)', 'Masters of Technology (M.Tech)'],
    management: ['Programs', 'Listed specializations'],
    paramedical: ['Nursing & allied health', 'Pharmacy'],
  };
  for (const [key, levels] of Object.entries(expected)) {
    const entries = groups.find((group) => group.key === key).entries;
    for (const [index, level] of levels.entries()) {
      const id = `${key}-subgroup-${index + 1}`;
      const start = catalog.indexOf(`<section class="catalog-subgroup" aria-labelledby="${id}">`);
      const end = catalog.indexOf('</section>', start);
      assert.ok(start >= 0 && end > start, `${key}: ${level} has its own section`);
      const markup = catalog.slice(start, end);
      assert.ok(markup.includes(`<h4 id="${id}">${level.replaceAll('&', '&amp;')}</h4>`));
      const expectedEntries = entries.filter((entry) => entry.level === level);
      assert.equal([...markup.matchAll(/<article class="detail-course reveal"/g)].length, expectedEntries.length);
      for (const entry of expectedEntries) {
        assert.ok(markup.includes(`<h5>${entry.name.replaceAll('&', '&amp;')}</h5>`), `${entry.name} grouped under ${level}`);
      }
    }
  }
  assert.ok(catalog.includes('subject=Civil%20Engineering%20%E2%80%94%20Polytechnic%20%2F%20Diploma%20Engineering'));
  assert.ok(catalog.includes('subject=Civil%20Engineering%20%E2%80%94%20Bachelor%20of%20Engineering%20(B.Tech.)'));
});

test('sitemap and robots list GitHub Pages routes', () => {
  const sitemap = readFileSync(resolve(root, 'sitemap.xml'), 'utf8');
  const robots = readFileSync(resolve(root, 'robots.txt'), 'utf8');
  for (const page of pages) {
    const url = new URL(page === 'index.html' ? '' : page, base);
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), `${page} appears in sitemap`);
  }
  assert.ok(robots.includes(`Sitemap: ${new URL('sitemap.xml', base)}`));
  assert.equal(sitemap, readFileSync(resolve(root, 'public/sitemap.xml'), 'utf8'));
  assert.equal(robots, readFileSync(resolve(root, 'public/robots.txt'), 'utf8'));
});
