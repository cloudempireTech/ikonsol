import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const coursePages = readdirSync(resolve(root, 'courses')).filter((name) => name.endsWith('.html')).map((name) => `courses/${name}`);
const pages = ['index.html', 'about.html', 'courses.html', 'contact.html', ...coursePages];

test('every page has a working local route, unique title and page heading', () => {
  assert.equal(coursePages.length, 9);
  const titles = new Set();
  for (const page of pages) {
    const content = readFileSync(resolve(root, page), 'utf8');
    const title = content.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `${page} has a title`);
    assert.ok(!titles.has(title), `${page} has a unique title`);
    titles.add(title);
    assert.equal([...content.matchAll(/<h1\b/g)].length, 1, `${page} has one h1`);
    assert.match(content, /<link rel="canonical" href="https:\/\/ikonsol\.co\.in\//);
    for (const route of ['/', '/about.html', '/courses.html', '/contact.html']) {
      assert.ok(content.includes(`href="${route}"`), `${page} links to ${route}`);
    }
    for (const [, href] of content.matchAll(/\bhref="([^"]+)"/g)) {
      if (/^(https?:|tel:|mailto:)/.test(href)) continue;
      const url = new URL(href, `https://ikonsol.co.in/${page === 'index.html' ? '' : page}`);
      const target = url.pathname === '/' ? 'index.html' : url.pathname.startsWith('/assets/') ? `public${decodeURIComponent(url.pathname)}` : decodeURIComponent(url.pathname).slice(1);
      assert.ok(existsSync(resolve(root, target)), `${page} -> ${href} exists`);
      if (url.hash && url.pathname === `/${page === 'index.html' ? '' : page}`) {
        assert.ok(content.includes(`id="${url.hash.slice(1)}"`), `${page} -> ${href} anchor exists`);
      }
    }
  }
});

test('catalog links every verified course area to a detail page and contact', () => {
  const catalog = readFileSync(resolve(root, 'courses.html'), 'utf8');
  for (const page of coursePages) {
    assert.ok(catalog.includes(`href="/${page}"`), `catalog links ${page}`);
    const content = readFileSync(resolve(root, page), 'utf8');
    assert.match(content, /href="\/contact\.html\?course=/, `${page} provides a course enquiry`);
  }
});

test('sitemap lists each page in the production build', () => {
  const sitemap = readFileSync(resolve(root, 'public/sitemap.xml'), 'utf8');
  for (const page of pages) {
    const path = page === 'index.html' ? '/' : `/${page}`;
    assert.ok(sitemap.includes(`<loc>https://ikonsol.co.in${path}</loc>`), `${page} appears in sitemap`);
  }
});
