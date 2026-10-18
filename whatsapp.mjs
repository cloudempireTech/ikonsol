import { siteConfig } from './site-config.mjs';

export function whatsappUrl(course = '') {
  const message = course
    ? `Hello IKONSOL, I am interested in ${course}. Please share the course details and how to enquire.`
    : 'Hello IKONSOL, I would like to know more about your courses. Please contact me.';
  return `https://wa.me/${siteConfig.whatsappE164}?text=${encodeURIComponent(message)}`;
}

export function enquiryWhatsappUrl({ name, phone, email, course, message }) {
  const lines = [
    'Hello IKONSOL, I would like to enquire about a course.',
    `Name: ${name.trim()}`,
    `Course of interest: ${course.trim()}`,
    ...(phone.trim() ? [`Phone: ${phone.trim()}`] : []),
    ...(email.trim() ? [`Email: ${email.trim()}`] : []),
    `Message: ${message.trim()}`,
  ];
  return `https://wa.me/${siteConfig.whatsappE164}?text=${encodeURIComponent(lines.join('\n'))}`;
}
