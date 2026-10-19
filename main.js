import { siteConfig } from './site-config.mjs';
import { whatsappUrl, enquiryWhatsappUrl } from './whatsapp.mjs';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
// A URL override exercises the same fallback in browser QA without changing OS preferences.
const motionOverride = new URL(window.location.href).searchParams.get('motion') === 'reduce';
const lessMotion = () => reduceMotion.matches || motionOverride;
const heroVideoUrl = new URL('./assets/hero.mp4', import.meta.url).href;
document.documentElement.classList.toggle('motion-reduced', lessMotion());

function applyContactConfig() {
  $$('[data-phone-link]').forEach((link) => { link.href = `tel:+${siteConfig.phoneE164}`; });
  $$('[data-phone-display]').forEach((item) => { item.textContent = siteConfig.phoneDisplay; });
  $$('[data-email-link]').forEach((link) => { link.href = `mailto:${siteConfig.email}`; });
  $$('[data-email-display]').forEach((item) => { item.textContent = siteConfig.email; });
  if ($('[data-city-office]')) $('[data-city-office]').textContent = siteConfig.cityOffice;
  if ($('[data-branch-office]')) $('[data-branch-office]').textContent = siteConfig.branchOffice;
  $$('[data-whatsapp]').forEach((link) => { link.href = whatsappUrl(); });
  if ($('[data-map-link]')) $('[data-map-link]').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapQuery)}`;
  if ($('[data-map-frame]')) $('[data-map-frame]').src = `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&t=m&z=12&output=embed&iwloc=near`;
}

function setupVideo() {
  const video = $('#hero-video');
  if (!video) return;
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
        source.src = heroVideoUrl;
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
  if (!input) return;
  const clear = $('#clear-search');
  const sections = $$('.catalog-section');
  const filters = $$('.filter');
  let active = 'all';
  const render = () => {
    const query = input.value.trim().toLocaleLowerCase();
    let count = 0;
    let hotelVisible = false;
    sections.forEach((section) => {
      const groupMatch = active === 'all' || section.dataset.group === active;
      const cards = [...section.querySelectorAll('.detail-course')];
      if (!cards.length) {
        hotelVisible = groupMatch && (!query || section.textContent.toLocaleLowerCase().includes(query));
        section.hidden = !hotelVisible;
        return;
      }
      let sectionCount = 0;
      cards.forEach((card) => {
        const visible = groupMatch && (!query || card.dataset.search.toLocaleLowerCase().includes(query));
        card.hidden = !visible;
        if (visible) sectionCount++;
      });
      section.hidden = sectionCount === 0;
      count += sectionCount;
    });
    $('#result-count').textContent = `${count} listed ${count === 1 ? 'option' : 'options'} shown${hotelVisible ? ' · Hotel management enquiries available' : ''}`;
    $('#no-results').hidden = count !== 0 || hotelVisible;
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
  if (!form) return;
  const status = $('#form-status');
  const readyLink = $('#whatsapp-ready-link');
  const fields = ['name', 'phone', 'email', 'course', 'message'];
  const started = $('#enquiry-started');
  started.value = String(Date.now());
  const requestedCourse = new URL(window.location.href).searchParams.get('course');
  if (requestedCourse && [...form.elements.course.options].some((option) => option.value === requestedCourse)) {
    form.elements.course.value = requestedCourse;
  }
  const requestedSubject = new URL(window.location.href).searchParams.get('subject');
  if (requestedSubject && requestedSubject.length <= 140 && !form.elements.message.value) {
    form.elements.message.value = `I would like to enquire about ${requestedSubject}. Please share the current details.`;
  }
  const resetPrepared = () => {
    readyLink.hidden = true;
    readyLink.href = '#enquiry-form';
    status.className = 'form-status';
    status.textContent = '';
  };
  fields.forEach((name) => form.elements[name].addEventListener('input', resetPrepared));
  form.elements.course.addEventListener('change', resetPrepared);
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
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    resetPrepared();
    const data = validate();
    if (!data) return;
    const elapsed = Date.now() - Number(data.startedAt);
    if (data.website || !Number.isFinite(elapsed) || elapsed < 2000) {
      status.classList.add('is-error');
      status.textContent = 'Please wait a moment, then try again.';
      return;
    }
    readyLink.href = enquiryWhatsappUrl(data);
    readyLink.hidden = false;
    status.classList.add('is-success');
    status.textContent = 'Your enquiry is ready. Review it in WhatsApp and tap Send there.';
    readyLink.click();
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
