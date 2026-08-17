import { v } from '../content/_placeholder.js';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Render a content field. If it is a placeholder, wrap it so the review canvas
 * can outline it on demand — this is what makes "mark every invented fact"
 * impossible to forget rather than a manual pass.
 */
export function f(field, { tag = 'span', cls = '', attrs = '' } = {}) {
  const value = v(field);
  const isPh = field && typeof field === 'object' && field.placeholder;
  const phAttr = isPh ? ` data-ph="1" title="Placeholder — ${esc(field.note || 'needs Shawna')}"` : '';
  const c = cls ? ` class="${cls}"` : '';
  return `<${tag}${c}${phAttr}${attrs ? ' ' + attrs : ''}>${esc(value)}</${tag}>`;
}

/** Raw placeholder-aware value, for use inside larger strings. */
export function t(field) {
  const value = v(field);
  const isPh = field && typeof field === 'object' && field.placeholder;
  return isPh
    ? `<span data-ph="1" title="Placeholder — ${esc(field.note || 'needs Shawna')}">${esc(value)}</span>`
    : esc(value);
}

/** Mark a whole block as placeholder-derived. */
export function phWrap(field, html) {
  const isPh = field && typeof field === 'object' && field.placeholder;
  return isPh
    ? `<div data-ph="1" data-ph-block="1" title="Placeholder — ${esc(field.note || 'needs Shawna')}">${html}</div>`
    : html;
}

/**
 * Photo placeholder. The artifact CSP blocks external images and embedding a
 * real library would balloon the file, so these are CSS-drawn stand-ins that
 * name their subject. Deliberately readable as placeholders — a mockup full of
 * unrelated stock is worse than one that says what belongs there.
 */
export function photo(subject, { ratio = '4/3', label = '', cls = '', seed = 0 } = {}) {
  const angle = 120 + ((seed * 37) % 90);
  const shift = 8 + ((seed * 13) % 22);
  return `<figure class="ph-photo ${cls}" style="aspect-ratio:${ratio};--a:${angle}deg;--s:${shift}%">
  <span class="ph-photo-tag">${esc(label || subject)}</span>
</figure>`;
}

export const sectionOpen = (id, cls = '') => `<section id="${id}" class="band ${cls}">`;
export const sectionClose = () => `</section>`;

export const heading = (text, { eyebrow = '', cls = '' } = {}) => `
  <div class="band-head ${cls}">
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h2>${esc(text)}</h2>
  </div>`;

export const btn = (label, { primary = true, href = '#enquire' } = {}) =>
  `<a class="btn ${primary ? 'btn-primary' : 'btn-ghost'}" href="${href}">${esc(label)}</a>`;
