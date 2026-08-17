// JSON-LD for the real site. The profile asks for LocalBusiness + Person, and
// we now have enough verified data to emit it truthfully.
//
// Emitted once per document rather than once per architecture — it describes
// the business, not the layout. Only R() values are used: structured data that
// tells search engines something we invented would be worse than none at all.

import { v } from './content/_placeholder.js';

export function buildSchema(c) {
  const b = c.business;
  const url = `https://${v(b.contact.domain)}`;

  const offers = c.sessions.map((s) => ({
    '@type': 'Offer',
    name: v(s.name),
    description: v(s.blurb),
    price: String(v(s.price)).replace('$', ''),
    priceCurrency: 'USD',
  }));

  const business = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#business`,
    name: v(b.name),
    description: v(b.metaDescription),
    slogan: v(b.tagline),
    url,
    telephone: v(b.contact.phone),
    email: v(b.contact.email),
    priceRange: v(b.priceRange),
    foundingDate: v(b.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: v(b.contact.street),
      addressLocality: v(b.contact.city),
      addressRegion: v(b.contact.state),
      postalCode: v(b.contact.zip),
      addressCountry: 'US',
    },
    areaServed: { '@type': 'GeoCircle', geoRadius: '48280', description: v(c.serviceArea.radius) },
    sameAs: [v(b.social.instagramUrl), v(b.social.facebookUrl)],
    makesOffer: offers,
    founder: {
      '@type': 'Person',
      name: v(c.shawna.name),
      jobTitle: v(c.shawna.role),
      description: v(c.shawna.bio)[0],
    },
  };

  // Only the questions answered from the profile go in — a FAQPage carrying
  // our drafts would be publishing guesses as fact.
  const realFaqs = c.faq.filter((q) => !q.q.placeholder && !q.a.placeholder);
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: realFaqs.map((q) => ({
      '@type': 'Question',
      name: v(q.q),
      acceptedAnswer: { '@type': 'Answer', text: v(q.a) },
    })),
  };

  return { business, faqPage, realFaqCount: realFaqs.length };
}

export function schemaScript(c) {
  const { business, faqPage } = buildSchema(c);
  const json = JSON.stringify([business, faqPage], null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}
