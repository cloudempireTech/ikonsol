import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = process.cwd();
const pages = ['index.html', 'about.html', 'courses.html', 'contact.html',
  ...readdirSync(resolve(root, 'courses')).filter((file) => file.endsWith('.html')).map((file) => `courses/${file}`)];

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page, resolve(root, page)])),
    },
  },
});
