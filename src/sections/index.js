// The fifteen bands from the audit's recommended homepage order.
//
// Each is a pure function of (content, voice, palette) returning HTML. An
// architecture is just a list of these in an order, so reordering the page or
// dropping a band is a config change. Nothing here knows about colour — that
// all comes through CSS custom properties.

import { esc, f, t, phWrap, photo, heading, btn } from './_helpers.js';
import { v } from '../content/_placeholder.js';
import { quoteFor } from '../content/social-proof.js';

/* All three architectures render into one document, so every in-page id is
   namespaced by architecture. Without this the ids collide three ways and a nav
   link can scroll to a hidden copy of the section. */
const A = (o, name) => `${o.idp || ''}${name}`;
const H = (o, name) => `#${A(o, name)}`;

/* ── 01 ─ Sticky nav ───────────────────────────────────────────────────── */
export function nav(c, voice, o = {}) {
  const links = [['Work', 'work'], ['Sessions', 'sessions'], ['About', 'about'], ['Reviews', 'reviews'], ['FAQ', 'faq']];
  return `<header class="nav">
  <a class="nav-brand" href="${H(o, 'top')}">
    <span class="nav-mark" aria-hidden="true"></span>
    <span class="nav-name">${t(c.business.shortName)}</span>
  </a>
  <nav class="nav-links" aria-label="Main">
    ${links.map(([label, id]) => `<a href="${H(o, id)}">${esc(label)}</a>`).join('')}
  </nav>
  <div class="nav-actions">
    <a class="nav-phone" href="${v(c.business.contact.phoneHref)}">${t(c.business.contact.phone)}</a>
    ${btn(v(voice.ctaSecondary), { primary: true, href: H(o, 'enquire') })}
  </div>
</header>`;
}

/* ── 02 ─ Hero ─────────────────────────────────────────────────────────── */
export function hero(c, voice, o = {}) {
  const variant = o.variant || 'centered';
  const inner = `
    <p class="eyebrow hero-eyebrow">${t(voice.eyebrow)}</p>
    <h1 class="hero-h1">${t(voice.headline)}</h1>
    <p class="hero-sub">${t(voice.sub)}</p>
    <div class="hero-cta">
      ${btn(v(voice.ctaPrimary), { primary: true, href: H(o, 'work') })}
      ${btn(v(voice.ctaSecondary), { primary: false, href: H(o, 'enquire') })}
    </div>`;

  if (variant === 'split') {
    return `<section id="${A(o, 'top')}" class="band hero hero-split">
      <div class="hero-copy">${inner}</div>
      <div class="hero-art">${photo('family', { ratio: '4/5', label: 'Hero image — family, golden hour', seed: 1 })}</div>
    </section>`;
  }
  if (variant === 'letter') {
    return `<section id="${A(o, 'top')}" class="band hero hero-letter">
      <div class="hero-copy">${inner}</div>
      ${photo('family', { ratio: '21/9', label: 'Hero image — wide, on location', seed: 2, cls: 'hero-wide' })}
    </section>`;
  }
  return `<section id="${A(o, 'top')}" class="band hero hero-centered">
    <div class="hero-copy">${inner}</div>
    ${photo('family', { ratio: '16/7', label: 'Hero image — wide, on location', seed: 3, cls: 'hero-wide' })}
  </section>`;
}

/* ── 03 ─ Trust bar ────────────────────────────────────────────────────── */
export function trustBar(c) {
  const b = c.business;
  const items = [
    { n: t(b.rating) + ' ★', l: `${v(b.reviewCount)} reviews` },
    { n: t(b.yearsShooting) + ' yrs', l: 'Photographing families' },
    { n: t(b.sessionsDelivered), l: 'Sessions delivered' },
    { n: 'Chicago', l: 'Southwest suburbs' },
  ];
  return `<section class="band trustbar">
    <div class="trustbar-inner">
      ${items.map((i) => `<div class="trust-item"><span class="trust-n">${i.n}</span><span class="trust-l">${esc(i.l)}</span></div>`).join('')}
    </div>
  </section>`;
}

/* ── 04 ─ Meet Shawna ──────────────────────────────────────────────────── */
export function meetShawna(c, voice, o = {}) {
  const s = c.shawna;
  const paras = v(s.bio).map((p) => `<p>${esc(p).replace(/\*(.+?)\*/g, '<em>$1</em>')}</p>`).join('');
  return `<section id="${A(o, 'about')}" class="band meet">
    <div class="meet-art">
      ${photo('portrait', { ratio: '4/5', label: 'Portrait of Shawna — needed', seed: 4 })}
      <p class="meet-caption" data-ph="1" title="Placeholder — a real portrait of Shawna is the highest-value missing asset">Highest-value missing asset: a real photograph of Shawna.</p>
    </div>
    <div class="meet-copy">
      ${heading(voice.sectionTitles.meet, { eyebrow: 'About' })}
      ${phWrap(s.bio, `<div class="prose">${paras}</div>`)}
      <p class="meet-sig">${t(s.signature)}</p>
    </div>
  </section>`;
}

/* ── 05 ─ Session types ────────────────────────────────────────────────── */
export function sessionTypes(c, voice, o = {}) {
  const layout = o.layout || 'blocks';
  const cards = c.sessions
    .map((s, i) => {
      const quote = quoteFor(s.id, v(c.testimonials));
      const inc = v(s.includes).map((x) => `<li>${esc(x)}</li>`).join('');
      return `<article class="sess ${s.popular ? 'sess-pop' : ''}">
      <div class="sess-art">${photo(s.id, { ratio: '3/2', label: `${v(s.name)} — sample`, seed: 10 + i })}</div>
      <div class="sess-body">
        <div class="sess-top">
          <h3>${t(s.name)}</h3>
          ${s.popular ? '<span class="pill">Most booked</span>' : ''}
        </div>
        <p class="sess-tag">${t(s.tag)}</p>
        <p class="sess-blurb">${t(s.blurb)}</p>
        <p class="sess-for"><span>Who it suits</span> ${t(s.forWhom)}</p>
        <dl class="sess-facts">
          <div><dt>Length</dt><dd>${t(s.duration)}</dd></div>
          <div><dt>Who</dt><dd>${t(s.groupSize)}</dd></div>
          <div><dt>Images</dt><dd>${t(s.imageCount)}</dd></div>
          <div><dt>Where</dt><dd>${t(s.locations)}</dd></div>
        </dl>
        <ul class="sess-inc">${inc}</ul>
        <blockquote class="sess-quote">${esc(quote.quote)}<cite>${esc(quote.name)} · ${esc(quote.town)}</cite></blockquote>
        <div class="sess-foot">
          <span class="sess-price">${t(s.price)}<small>${t(s.priceNote)}</small></span>
          ${btn('Book ' + v(s.name), { primary: true, href: H(o, 'enquire') })}
        </div>
      </div>
    </article>`;
    })
    .join('');
  return `<section id="${A(o, 'sessions')}" class="band sessions sessions-${layout}">
    ${heading(voice.sectionTitles.sessions, { eyebrow: 'Sessions' })}
    <p class="band-lede">Every session includes a planning call, a private gallery and a print release. Prices below are placeholders until confirmed.</p>
    <div class="sess-grid">${cards}</div>
  </section>`;
}

/* ── 06 ─ Featured gallery ─────────────────────────────────────────────── */
export function gallery(c, voice, o = {}) {
  const cats = ['All', 'Family', 'Seniors', 'Branding', 'Pets'];
  const tiles = [
    ['family', '4/5'], ['seniors', '1/1'], ['pets', '4/5'], ['branding', '1/1'],
    ['family', '1/1'], ['seniors', '4/5'], ['family', '1/1'], ['pets', '1/1'],
  ]
    .map(([s, r], i) => photo(s, { ratio: r, label: s, seed: 20 + i, cat: s }))
    .join('');
  return `<section id="${A(o, 'work')}" class="band gallery">
    ${heading(voice.sectionTitles.gallery, { eyebrow: 'Portfolio' })}
    <div class="gal-filters">${cats.map((x, i) => `<button class="gal-f ${i === 0 ? 'on' : ''}" type="button" data-cat="${esc(x.toLowerCase())}" aria-pressed="${i === 0}">${esc(x)}</button>`).join('')}</div>
    <div class="gal-grid">${tiles}</div>
    <div class="band-foot">${btn('See the full portfolio', { primary: false, href: H(o, 'work') })}</div>
  </section>`;
}

/* ── 07 ─ What you receive ─────────────────────────────────────────────── */
export function whatYouReceive(c, voice) {
  const items = v(c.deliverables)
    .map((d) => `<div class="recv"><span class="recv-n">${esc(d.stat)}</span><span class="recv-l">${esc(d.label)}</span><p>${esc(d.detail)}</p></div>`)
    .join('');
  return `<section class="band receive">
    ${heading(voice.sectionTitles.receive, { eyebrow: 'Included' })}
    ${phWrap(c.deliverables, `<div class="recv-grid">${items}</div>`)}
  </section>`;
}

/* ── 08 ─ How it works ─────────────────────────────────────────────────── */
export function howItWorks(c, voice) {
  const steps = v(c.process)
    .map((s) => `<li class="step"><span class="step-n">${esc(s.n)}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></div></li>`)
    .join('');
  return `<section class="band process">
    ${heading(voice.sectionTitles.process, { eyebrow: 'The process' })}
    ${phWrap(c.process, `<ol class="steps">${steps}</ol>`)}
  </section>`;
}

/* ── 09 ─ Reviews ──────────────────────────────────────────────────────── */
export function reviews(c, voice, o = {}) {
  const list = v(c.testimonials);
  const cards = list
    .map((r) => `<figure class="rev">
      <div class="rev-stars" aria-label="5 out of 5">★★★★★</div>
      <blockquote>${esc(r.quote)}</blockquote>
      <figcaption>${esc(r.name)} <span>· ${esc(r.town)} · ${esc(r.session)}</span>${r.source ? `<span class="rev-src">${esc(r.source)}</span>` : '<span class="rev-src rev-src-missing">source pending</span>'}</figcaption>
    </figure>`)
    .join('');
  return `<section id="${A(o, 'reviews')}" class="band reviews">
    ${heading(voice.sectionTitles.reviews, { eyebrow: 'Reviews' })}
    <p class="band-lede">${t(c.business.rating)} average across ${t(c.business.reviewCount)} reviews on Google, Facebook and Yelp.</p>
    ${phWrap(c.testimonials, `<div class="rev-grid">${cards}</div>`)}
  </section>`;
}

/* ── 10 ─ Where I shoot ────────────────────────────────────────────────── */
export function whereIShoot(c, voice, o = {}) {
  const locs = v(c.locations)
    .map((l, i) => `<article class="loc">
      ${photo(l.subject, { ratio: '3/2', label: l.name, seed: 30 + i })}
      <h3>${esc(l.name)}</h3>
      <p>${esc(l.blurb)}</p>
      <span class="loc-season">${esc(l.season)}</span>
    </article>`)
    .join('');
  const towns = v(c.serviceArea.towns).map((x) => `<li>${esc(x)}</li>`).join('');
  return `<section class="band where">
    ${heading(voice.sectionTitles.where, { eyebrow: 'Service area' })}
    <p class="band-lede">${t(c.serviceArea.blurb)}</p>
    ${phWrap(c.serviceArea.towns, `<ul class="towns">${towns}</ul>`)}
    <p class="where-note">Travelling up to ${t(c.serviceArea.radius)} as standard${v(c.business.insured) ? ', fully insured' : ''}. Further afield is usually possible — just ask.</p>
    ${phWrap(c.locations, `<div class="loc-grid">${locs}</div>`)}
  </section>`;
}

/* ── 11 ─ Right now ────────────────────────────────────────────────────── */
export function rightNow(c, voice, o = {}) {
  const r = c.rightNow;
  return `<section class="band now">
    <div class="now-inner">
      <div>
        <p class="eyebrow">${esc(voice.sectionTitles.now)}</p>
        <h2>${t(r.headline)}</h2>
        <p class="now-body">${t(r.body)}</p>
      </div>
      <div class="now-side">
        <p class="now-urgent">${t(r.urgency)}</p>
        <p class="now-deadline">${t(r.deadline)}</p>
        ${btn(v(voice.ctaPrimary), { primary: true, href: H(o, 'enquire') })}
      </div>
    </div>
  </section>`;
}

/* ── 12 ─ FAQ ──────────────────────────────────────────────────────────── */
export function faq(c, voice, o = {}) {
  const items = v(c.faq)
    .map((q, i) => `<details class="qa"${i === 0 ? ' open' : ''}>
      <summary>${esc(q.q)}</summary>
      <p>${esc(q.a)}</p>
    </details>`)
    .join('');
  return `<section id="${A(o, 'faq')}" class="band faq">
    ${heading(voice.sectionTitles.faq, { eyebrow: 'Questions' })}
    ${phWrap(c.faq, `<div class="qa-list">${items}</div>`)}
  </section>`;
}

/* ── 13 ─ Prints and gift cards ────────────────────────────────────────── */
export function prints(c, voice, o = {}) {
  const items = v(c.products)
    .map((p, i) => `<article class="prod">
      ${photo('product', { ratio: '1/1', label: p.name, seed: 40 + i })}
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.blurb)}</p>
      <span class="prod-from">${esc(p.from)}</span>
    </article>`)
    .join('');
  return `<section class="band prints">
    ${heading(voice.sectionTitles.products, { eyebrow: 'After the session' })}
    <p class="band-lede">The gallery is yours to keep, but the things people live with are printed.</p>
    ${phWrap(c.products, `<div class="prod-grid">${items}</div>`)}
  </section>`;
}

/* ── 14 ─ Enquiry ──────────────────────────────────────────────────────── */
export function enquiry(c, voice, o = {}) {
  const opts = c.sessions.map((s) => `<option>${esc(v(s.name))}</option>`).join('');
  return `<section id="${A(o, 'enquire')}" class="band enquire">
    <div class="enq-copy">
      <h2>${esc(voice.sectionTitles.enquire)}</h2>
      <p class="enq-lede">${t(voice.closingLine)}</p>
      <ul class="enq-assure">
        <li>No deposit to enquire</li>
        <li>Reply ${t(c.business.responseTime)}</li>
        <li>Booking ${t(c.business.bookingWindow)}</li>
      </ul>
      <p class="enq-alt">Prefer to talk? <a href="${v(c.business.contact.phoneHref)}">${t(c.business.contact.phone)}</a></p>
    </div>
    <form class="enq-form" onsubmit="return false">
      <label>Your name<input type="text" placeholder="Jane Whitmore"></label>
      <label>Email<input type="email" placeholder="jane@example.com"></label>
      <label>Session type<select>${opts}</select></label>
      <label>Rough date<input type="text" placeholder="Mid-October, a weekend if possible"></label>
      <label>Who’s coming?<textarea rows="3" placeholder="Two adults, three kids, and a golden retriever who does not listen."></textarea></label>
      <button class="btn btn-primary" type="submit">Send my date</button>
      <p class="enq-fine">No payment, no commitment. Just a note.</p>
    </form>
    <div class="enq-capture">
      <p><strong>Not ready yet?</strong> Sessions open ${t(c.business.bookingWindow)}. I’ll email you when the next dates go up.</p>
      <div class="enq-capture-row"><input type="email" placeholder="you@example.com"><button class="btn btn-ghost" type="button">Notify me</button></div>
    </div>
  </section>`;
}

/* ── Instagram — one row of six, below the CTA ─────────────────────────── */
export function instagram(c) {
  const tiles = Array.from({ length: 6 }, (_, i) => photo('feed', { ratio: '1/1', label: '', seed: 50 + i })).join('');
  return `<section class="band insta">
    <div class="insta-head">
      <p class="eyebrow">Lately on Instagram</p>
      <a href="#">${t(c.business.social.instagram)}</a>
    </div>
    <div class="insta-row">${tiles}</div>
  </section>`;
}

/* ── 15 ─ Footer ───────────────────────────────────────────────────────── */
export function footer(c, voice, o = {}) {
  const b = c.business;
  const towns = v(c.serviceArea.towns).join(' · ');
  return `<footer class="foot">
    <div class="foot-brand">
      <span class="nav-name">${t(b.name)}</span>
      <p class="foot-tag">“${t(b.tagline)}”</p>
      <p class="foot-pos">${t(b.positioning)}</p>
    </div>
    <div class="foot-col"><h3>Sessions</h3>${c.sessions.map((s) => `<a href="${H(o, 'sessions')}">${esc(v(s.name))}</a>`).join('')}</div>
    <div class="foot-col"><h3>Studio</h3><a href="${H(o, 'about')}">About Shawna</a><a href="${H(o, 'sessions')}">Pricing</a><a href="${H(o, 'faq')}">FAQ</a><a href="#" data-ph="1" title="Placeholder — does Shawna use a client gallery service (Pixieset, ShootProof)? Remove this link if not.">Client gallery login</a></div>
    <div class="foot-col"><h3>Contact</h3>
      <a href="${v(b.contact.phoneHref)}">${t(b.contact.phone)}</a>
      <a href="mailto:${v(b.contact.email)}">${t(b.contact.email)}</a>
      <span>${t(b.contact.address)}</span>
      <a href="#">${t(b.social.instagram)}</a>
    </div>
    <div class="foot-area"><h3>Serving</h3><p>${esc(towns)}</p></div>
    <div class="foot-fine"><span>© ${new Date().getFullYear()} ${esc(v(b.name))}</span><span>${t(b.contact.domain)}</span></div>
  </footer>`;
}

export const sections = {
  nav, hero, trustBar, meetShawna, sessionTypes, gallery, whatYouReceive,
  howItWorks, reviews, whereIShoot, rightNow, faq, prints, enquiry, instagram, footer,
};
