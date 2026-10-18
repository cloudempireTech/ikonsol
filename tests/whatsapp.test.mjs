import test from 'node:test';
import assert from 'node:assert/strict';
import { whatsappUrl, enquiryWhatsappUrl } from '../whatsapp.mjs';
import { siteConfig } from '../site-config.mjs';

test('general WhatsApp link targets the verified business number', () => {
  const url = new URL(whatsappUrl());
  assert.equal(url.host, 'wa.me');
  assert.equal(url.pathname, `/${siteConfig.whatsappE164}`);
  assert.match(url.searchParams.get('text'), /Hello IKONSOL/);
});

test('course enquiry link includes contact details and message', () => {
  const url = new URL(enquiryWhatsappUrl({ name: '  Student Name  ', phone: '+91 90000 00000', email: 'student@example.com', course: 'Engineering', message: '  Please send course details.  ' }));
  assert.equal(url.pathname, `/${siteConfig.whatsappE164}`);
  assert.equal(url.searchParams.get('text'), 'Hello IKONSOL, I would like to enquire about a course.\nName: Student Name\nCourse of interest: Engineering\nPhone: +91 90000 00000\nEmail: student@example.com\nMessage: Please send course details.');
});

test('optional contact fields are omitted from the prefilled message', () => {
  const url = new URL(enquiryWhatsappUrl({ name: 'Student', phone: '', email: 'student@example.com', course: 'Law', message: 'I would like more information.' }));
  assert.doesNotMatch(url.searchParams.get('text'), /Phone:/);
  assert.match(url.searchParams.get('text'), /Email: student@example.com/);
});
