import { R, P } from './_placeholder.js';

// Contact details are REAL — verified against public listings. The round-one
// mockups carried a fake 555 number and the wrong email domain; that is the
// single most important correction in here.
export const business = {
  name: R('SkyByrd Photography', 'public listings'),
  shortName: R('SkyByrd', 'public listings'),
  tagline: R('Celebrate life and make our time stand still.', 'round-one mockups — Shawna approved wording'),
  positioning: R(
    'Boutique lifestyle photography for the Chicago suburbs',
    'public listing description'
  ),

  contact: {
    phone: R('815.715.8647', 'public listings'),
    phoneHref: R('tel:+18157158647', 'public listings'),
    email: R('ShawnaL@SkyByrdPhotography.com', 'public listings'),
    domain: R('skybyrdphotography.com', 'public listings'),
    address: R('5700 Caton Farm Rd, Plainfield, IL 60586', 'public listings'),
    city: R('Plainfield', 'public listings'),
    state: R('Illinois', 'public listings'),
  },

  social: {
    instagram: R('@skybyrdphotography', 'public listings'),
    facebook: R('SkyByrdphotography', 'public listings'),
  },

  // ── Needs Shawna ────────────────────────────────────────────────────────
  // Round one contradicted itself: "since 2016" in concept 03 against
  // "since 2014" in 08/09/10. Using 2014 until confirmed.
  founded: P('2014', 'Concepts disagreed — 03 said 2016, 08/09/10 said 2014. Which is right?'),
  yearsShooting: P('11', 'Derived from founded year. Recalculates once the year is settled.'),
  sessionsDelivered: P('300+', 'Invented in concept 04. Real number?'),
  rating: P('5.0', 'Pull the real average from Google once reviews are connected.'),
  reviewCount: P('40+', 'Real count across Google, Facebook and Yelp?'),
  responseTime: P('within a day, usually the same evening', 'From concept 07. Is this accurate?'),
  bookingWindow: P('about two months out', 'From concepts 05 and 09. Still true?'),
  insured: P(true, 'Confirm — worth stating plainly if so.'),
};

// The biggest search miss in round one: every concept said "Plainfield" and
// stopped, when the business actually serves the wider suburbs.
export const serviceArea = {
  primary: R('Plainfield', 'public listings'),
  towns: P(
    ['Plainfield', 'Naperville', 'Joliet', 'Oswego', 'Shorewood', 'Yorkville', 'Romeoville', 'Bolingbrook'],
    'Towns chosen by proximity. Which does Shawna actually travel to, and how far will she go?'
  ),
  radius: P('30 miles', 'Confirm travel radius and whether there is a fee beyond it.'),
  blurb: P(
    'Based in Plainfield and shooting across the southwest suburbs — Naperville, Joliet, Oswego, Shorewood and the towns in between. Travel further afield is usually possible; just ask.',
    'Draft copy. Rewrite in Shawna’s voice.'
  ),
};

export const locations = P(
  [
    { name: 'The DuPage River', blurb: 'Water, long grass and a low sun. Best in the hour before sunset.', season: 'May – October', subject: 'family' },
    { name: 'Downtown Plainfield', blurb: 'Brick, storefronts and shade. Good for branding and seniors who want an urban feel.', season: 'Year round', subject: 'branding' },
    { name: 'Lake Renwick Preserve', blurb: 'Open prairie and big sky. Room for dogs to be dogs.', season: 'April – November', subject: 'pets' },
    { name: 'Settlers’ Park', blurb: 'Old trees and wide paths. Easy with strollers and grandparents.', season: 'Year round', subject: 'family' },
    { name: 'The studio', blurb: 'Controlled light, no weather, no wind. Best for headshots and newborns.', season: 'Year round', subject: 'branding' },
    { name: 'Your own home', blurb: 'The rooms you actually live in. Quietly the most sentimental option.', season: 'Year round', subject: 'family' },
  ],
  'All six invented. Replace with the locations Shawna genuinely uses and loves.'
);
