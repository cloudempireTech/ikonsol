import { siteConfig } from './site-config.mjs';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
// A URL override exercises the same fallback in browser QA without changing OS preferences.
const motionOverride = new URL(window.location.href).searchParams.get('motion') === 'reduce';
const lessMotion = () => reduceMotion.matches || motionOverride;
document.documentElement.classList.toggle('motion-reduced', lessMotion());

function whatsappUrl(course = '') {
  const message = course
    ? `Hello IKONSOL, I am interested in ${course}. Please share the course details and how to enquire.`
    : 'Hello IKONSOL, I would like to know more about your courses. Please contact me.';
  return `https://wa.me/${siteConfig.whatsappE164}?text=${encodeURIComponent(message)}`;
}

function applyContactConfig() {
  $$('[data-phone-link]').forEach((link) => { link.href = `tel:+${siteConfig.phoneE164}`; });
  $$('[data-phone-display]').forEach((item) => { item.textContent = siteConfig.phoneDisplay; });
  $$('[data-email-link]').forEach((link) => { link.href = `mailto:${siteConfig.email}`; });
  $$('[data-email-display]').forEach((item) => { item.textContent = siteConfig.email; });
  $('[data-city-office]').textContent = siteConfig.cityOffice;
  $('[data-branch-office]').textContent = siteConfig.branchOffice;
  $$('[data-whatsapp]').forEach((link) => { link.href = whatsappUrl(); });
  $('[data-map-link]').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapQuery)}`;
  $('[data-map-frame]').src = `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&t=m&z=12&output=embed&iwloc=near`;
}

function setupVideo() {
  const video = $('#hero-video');
  const source = video.querySelector('source');
  const update = () => {
    document.documentElement.classList.toggle('motion-reduced', lessMotion());
    if (lessMotion()) {
      video.pause();
      source.removeAttribute('src');
      video.load();
      video.hidden = true;
    } else {
      video.hidden = false;
      if (!source.src) {
        source.src = '/assets/hero.mp4';
        video.load();
      }
      video.play().catch(() => { video.hidden = true; });
    }
  };
  update();
  reduceMotion.addEventListener('change', update);
  video.addEventListener('error', () => { video.hidden = true; });
}

function setupMenu() {
  const button = $('#menu-button');
  const menu = $('#mobile-nav');
  const close = () => { button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-label', 'Open menu'); menu.hidden = true; };
  button.addEventListener('click', () => {
    const opening = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(opening));
    button.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
    menu.hidden = !opening;
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !menu.hidden) { close(); button.focus(); } });
  window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => { if (event.matches) close(); });
}

function setupCatalog() {
  const input = $('#course-search');
  const clear = $('#clear-search');
  const courses = $$('.course');
  const filters = $$('.filter');
  let active = 'all';
  const render = () => {
    const query = input.value.trim().toLocaleLowerCase();
    let count = 0;
    courses.forEach((course) => {
      const groupMatch = active === 'all' || course.dataset.group === active;
      const queryMatch = !query || course.textContent.toLocaleLowerCase().includes(query);
      const visible = groupMatch && queryMatch;
      course.hidden = !visible;
      if (visible) count++;
      const details = course.querySelector('details');
      if (details && query && visible) {
        const intro = course.querySelector('.course__main > p:not(.course__eyebrow)')?.textContent.toLocaleLowerCase() || '';
        const title = course.querySelector('h3').textContent.toLocaleLowerCase();
        if (!intro.includes(query) && !title.includes(query)) {
          details.open = true;
          details.dataset.searchOpen = 'true';
        }
      } else if (details?.dataset.searchOpen === 'true') {
        details.open = false;
        delete details.dataset.searchOpen;
      }
    });
    $('#result-count').textContent = `${count} course ${count === 1 ? 'area' : 'areas'} shown`;
    $('#no-results').hidden = count !== 0;
    clear.hidden = !query;
  };
  input.addEventListener('input', render);
  clear.addEventListener('click', () => { input.value = ''; input.focus(); render(); });
  filters.forEach((button) => button.addEventListener('click', () => {
    active = button.dataset.filter;
    filters.forEach((item) => { const selected = item === button; item.classList.toggle('is-active', selected); item.setAttribute('aria-pressed', String(selected)); });
    render();
  }));
  render();
}

function setupEnquiry() {
  const form = $('#enquiry-form');
  const status = $('#form-status');
  const submit = form.querySelector('button[type=submit]');
  const fields = ['name', 'phone', 'email', 'course', 'message'];
  const started = $('#enquiry-started');
  started.value = String(Date.now());
  $$('[data-course]').forEach((link) => link.addEventListener('click', () => { form.elements.course.value = link.dataset.course; }));
  const setError = (name, message) => {
    const field = form.elements[name];
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    $(`#${name}-error`).textContent = message;
  };
  const validate = () => {
    fields.forEach((name) => setError(name, ''));
    const data = Object.fromEntries(new FormData(form));
    const errors = {};
    if (data.name.trim().length < 2) errors.name = 'Please enter your name.';
    if (!data.phone.trim() && !data.email.trim()) errors.phone = 'Add a phone number or email address.';
    if (data.phone.trim() && !/^[+\d\s()-]{7,20}$/.test(data.phone.trim())) errors.phone = 'Enter a valid phone number.';
    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Enter a valid email address.';
    if (!data.course) errors.course = 'Choose a course area.';
    if (data.message.trim().length < 10) errors.message = 'Please add a message of at least 10 characters.';
    Object.entries(errors).forEach(([name, message]) => setError(name, message));
    if (Object.keys(errors).length) form.elements[Object.keys(errors)[0]].focus();
    return Object.keys(errors).length ? null : data;
  };
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.className = 'form-status';
    status.textContent = '';
    const data = validate();
    if (!data) return;
    submit.disabled = true;
    submit.firstChild.textContent = 'Sending… ';
    try {
      const response = await fetch(siteConfig.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json().catch(() => ({ ok: false, message: 'Online enquiries are temporarily unavailable.' }));
      if (!response.ok || !result.ok) throw new Error(result.message || 'The enquiry could not be sent.');
      status.classList.add('is-success');
      status.textContent = 'Thank you. Your enquiry has been sent to IKONSOL.';
      form.reset();
      started.value = String(Date.now());
    } catch (error) {
      status.classList.add('is-error');
      status.textContent = `${error.message} You can also call or WhatsApp us.`;
    } finally {
      submit.disabled = false;
      submit.firstChild.textContent = 'Send enquiry ';
    }
  });
}

function setupReveal() {
  if (lessMotion() || !('IntersectionObserver' in window)) {
    $$('.reveal').forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { rootMargin: '0px 0px -40px 0px', threshold: .08 });
  $$('.reveal').forEach((item) => observer.observe(item));
}

applyContactConfig();
setupVideo();
setupMenu();
setupCatalog();
setupEnquiry();
setupReveal();
$('#year').textContent = String(new Date().getFullYear());

export { whatsappUrl };
