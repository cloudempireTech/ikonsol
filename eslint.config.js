export default [
  {
    files: ['*.js', '*.mjs', 'netlify/functions/*.mjs', 'tests/*.mjs'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: { window: 'readonly', document: 'readonly', navigator: 'readonly', IntersectionObserver: 'readonly', fetch: 'readonly', URL: 'readonly', FormData: 'readonly', HTMLElement: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly', process: 'readonly', console: 'readonly' } },
    rules: { 'no-unused-vars': 'error', 'no-undef': 'error', 'no-constant-condition': 'error' }
  }
];
