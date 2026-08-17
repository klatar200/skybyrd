import { R, P } from './_placeholder.js';

// Sourced from the business profile supplied 17 Aug 2026. That document is the
// authority for anything marked R() below — it supersedes the public-listing
// values used in the first pass, most importantly the contact email.

export const business = {
  name: R('Skybyrd Photography', 'business profile'),
  shortName: R('Skybyrd', 'business profile'),
  tagline: R('Celebrate life and make our time stand still', 'business profile'),
  positioning: R('Boutique portrait photography in Plainfield, Illinois', 'business profile'),
  metaTitle: R(
    'Skybyrd Photography | Family, Senior & Pet Photography in Plainfield, IL',
    'business profile — SEO section'
  ),
  metaDescription: R(
    'Professional boutique photography in Plainfield, IL. Specializing in Family, Senior, Personal Branding, and Pet photography. Celebrate life and make our time stand still.',
    'business profile — SEO section'
  ),

  contact: {
    phone: R('(815) 715-8647', 'business profile'),
    phoneHref: R('tel:+18157158647', 'business profile'),
    email: R('info@skybyrdphotography.com', 'business profile'),
    domain: R('skybyrdphotography.com', 'business profile'),
    address: R('5700 Caton Farm Rd Suite 101, Plainfield, IL 60586', 'business profile'),
    street: R('5700 Caton Farm Rd Suite 101', 'business profile'),
    city: R('Plainfield', 'business profile'),
    state: R('IL', 'business profile'),
    zip: R('60586', 'business profile'),
  },

  social: {
    instagram: R('@skybyrdphotography', 'business profile'),
    instagramUrl: R('https://instagram.com/skybyrdphotography', 'business profile'),
    facebookUrl: R('https://facebook.com/skybyrdphotography', 'business profile'),
  },

  founded: R('2014', 'business profile — resolves the 2014/2016 contradiction in round one'),
  yearsShooting: R('12', 'business profile — 2014 to 2026'),
  responseTime: R('within 24 hours', 'business profile — contact section'),
  priceRange: R('$', 'business profile — SEO section'),

  // ── Still unconfirmed ───────────────────────────────────────────────────
  sessionsDelivered: P('300+', 'Not in the profile. Roughly how many sessions have you photographed?'),
  rating: P('5.0', 'The three testimonials supplied are all five stars, but that is not a real average. What does Google actually show?'),
  reviewCount: P('3', 'Only three reviews were supplied. How many do you have across Google, Facebook and Yelp?'),
  bookingWindow: P('about two months out', 'Not in the profile. How far ahead are you taking bookings?'),
  insured: P(true, 'Not in the profile. Are you insured? Worth stating plainly if so.'),
};

// Real career timeline. This is new material the first round had nothing like,
// and it does the "credentials and track record" job better than a stat bar.
export const milestones = R(
  [
    { year: '2014', title: 'Started photography', body: 'Picked up her first DSLR and fell in love with capturing the world through a lens.' },
    { year: '2018', title: 'First studio', body: 'Opened a small home studio and began offering professional portrait sessions to local families.' },
    { year: '2021', title: 'The Skybyrd brand', body: 'Rebranded as Skybyrd Photography, expanding into seniors, personal branding and pet photography.' },
    { year: '2023', title: 'The Plainfield studio', body: 'Moved into the current studio space, with natural light and modern backdrops.' },
  ],
  'business profile — career timeline'
);

export const coreValues = R(
  [
    { title: 'Authentic moments', body: 'The most powerful images come from genuine emotion and unscripted joy. The focus is on real connection, not forced poses.' },
    { title: 'Personal connection', body: 'Every session begins with getting to know you. Understanding your story is what makes the images reflect who you actually are.' },
    { title: 'Artistic vision', body: 'A keen eye for light, composition and detail — turning everyday moments into something you will want on the wall.' },
  ],
  'business profile — core values'
);

export const serviceArea = {
  primary: R('Plainfield', 'business profile'),
  radius: R('30 miles', 'business profile — FAQ: travels within 30 miles at no extra charge'),
  travelNote: R(
    'Travel within 30 miles of Plainfield is included. Beyond that, a small travel fee applies.',
    'business profile — FAQ'
  ),
  // The radius is confirmed; the town list is the obvious reading of it rather
  // than a list Shawna gave us.
  towns: P(
    ['Plainfield', 'Naperville', 'Joliet', 'Oswego', 'Shorewood', 'Yorkville', 'Romeoville', 'Bolingbrook'],
    'These are the towns inside your confirmed 30-mile radius. Are they the right ones to name, and is any missing?'
  ),
  blurb: P(
    'Based in Plainfield and photographing across the southwest suburbs — Naperville, Joliet, Oswego, Shorewood and the towns in between.',
    'Draft copy built around your confirmed travel radius. Rewrite it in your own words.'
  ),
};

// Every place named here appears in a real portfolio gallery in the profile.
// The one-line descriptions are ours.
export const locations = P(
  [
    { name: "Settler's Park", blurb: 'Old trees and wide paths, and lovely in autumn. Easy with strollers and grandparents.', season: 'Year round', subject: 'family' },
    { name: 'Downtown Plainfield', blurb: 'Brick-lined alleys and a sunlit rooftop. Golden hour here is hard to beat for seniors.', season: 'Year round', subject: 'seniors' },
    { name: 'The botanic garden', blurb: 'Room for three generations to spread out, and something in bloom most of the year.', season: 'April – October', subject: 'family' },
    { name: 'The dog park', blurb: 'Pure chaos, in the best way. Where the pet sessions come alive.', season: 'Year round', subject: 'pets' },
    { name: 'The studio', blurb: 'Natural light and modern backdrops. No weather, no wind, and pet-safe.', season: 'Year round', subject: 'branding' },
    { name: 'Your own home', blurb: 'The rooms you actually live in — window perches, favourite chairs, real life.', season: 'Year round', subject: 'pets' },
  ],
  'The places are taken from your real portfolio galleries. The one-line descriptions are our drafts — correct anything that is wrong.'
);
