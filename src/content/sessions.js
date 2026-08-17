import { R, P } from './_placeholder.js';

// Real pricing and inclusions, from the business profile supplied 17 Aug 2026.
// This replaces the invented $450/$525/$680/$275 carried over from round one —
// the actual prices are materially lower, so any earlier mockup shown to a
// client would have misrepresented the business.
//
// One thing to settle: the profile gives each package both a "duration" range
// and a shorter "session" length in its inclusions (Family is 1–2 hours, but
// includes a 60-minute session). We read the range as the time to set aside and
// the shorter figure as time actually shooting, and render both. Flagged below.

export const sessions = [
  {
    id: 'family',
    name: R('Family', 'business profile'),
    tag: R('Cherished moments with the people who matter most', 'business profile — specialties'),
    blurb: R(
      'Capture the love and connection of your family in a relaxed, fun session. Whether at the studio or your favourite outdoor location, we’ll create timeless memories you’ll cherish forever.',
      'business profile — package description'
    ),
    duration: R('1–2 hours', 'business profile'),
    sessionLength: P('60 minutes shooting', 'The profile lists Family as 1–2 hours but includes a 60-minute session. Is the longer figure the time to set aside, and 60 minutes the shooting time?'),
    groupSize: P('Families of any size', 'Not in the profile. Is there a limit, or a charge above a certain number?'),
    locations: R('Studio or an outdoor location of your choosing', 'business profile'),
    imageCount: R('25+ edited digital images', 'business profile'),
    price: R('$299', 'business profile'),
    priceNote: R('Print release included', 'business profile'),
    forWhom: P('Growing families, extended families, grandparents visiting, anyone overdue for a decent photo together.', 'Draft — not in the profile.'),
    includes: R(
      ['60-minute session', '25+ edited digital images', 'Online gallery for sharing', 'Print release included', 'Location scouting assistance'],
      'business profile'
    ),
    popular: true,
  },
  {
    id: 'seniors',
    name: R('Senior Portraits', 'business profile'),
    tag: R('Portraits that capture your personality and confidence', 'business profile — specialties'),
    blurb: R(
      'Celebrate this milestone with portraits that capture your unique personality. Multiple outfit changes, creative locations, and a session that’s all about you.',
      'business profile — package description'
    ),
    duration: R('1–1.5 hours', 'business profile'),
    sessionLength: P('45 minutes shooting', 'Same question as Family — 1–1.5 hours listed, 45-minute session included.'),
    groupSize: R('The senior, with family for a few frames', 'business profile — implied by package'),
    locations: R('Creative locations of your choosing', 'business profile'),
    imageCount: R('20+ edited digital images', 'business profile'),
    price: R('$249', 'business profile'),
    priceNote: R('Yearbook-ready crop included', 'business profile'),
    forWhom: P('High school seniors and their parents, usually booked the summer before senior year.', 'Draft — not in the profile.'),
    includes: R(
      ['45-minute session', '20+ edited digital images', '2 outfit changes', 'Online gallery for sharing', 'Yearbook-ready crop included'],
      'business profile'
    ),
    popular: false,
  },
  {
    id: 'branding',
    name: R('Personal Branding', 'business profile'),
    tag: R('Authentic imagery that tells your story', 'business profile — specialties'),
    blurb: R(
      'Elevate your brand with professional imagery that tells your story. Perfect for entrepreneurs, creatives and professionals who want to stand out.',
      'business profile — package description'
    ),
    duration: R('2–3 hours', 'business profile'),
    sessionLength: P('90 minutes shooting', 'Same question — 2–3 hours listed, 90-minute session included.'),
    groupSize: P('One person', 'Not in the profile. Do you shoot teams, and at what rate?'),
    locations: R('Studio or on location', 'business profile'),
    imageCount: R('40+ edited digital images', 'business profile'),
    price: R('$399', 'business profile'),
    priceNote: R('Brand consultation call included', 'business profile'),
    forWhom: P('Small business owners, realtors, therapists, coaches — anyone whose face is part of the offer.', 'Draft — not in the profile.'),
    includes: R(
      ['90-minute session', '40+ edited digital images', '3 outfit and scene changes', 'Social-media optimised crops', 'Brand consultation call'],
      'business profile'
    ),
    popular: false,
  },
  {
    id: 'pets',
    name: R('Pet Photography', 'business profile'),
    tag: R('Your furry family members deserve the spotlight too', 'business profile — specialties'),
    blurb: R(
      'Your furry, feathered or scaled family members deserve the spotlight too. Playful, heartwarming portraits that capture their unique personality.',
      'business profile — package description'
    ),
    duration: R('45 minutes – 1 hour', 'business profile'),
    sessionLength: P('30 minutes shooting', 'Same question — 45–60 minutes listed, 30-minute session included.'),
    groupSize: P('One or two pets', 'Not in the profile. Is there a limit, and can their people join?'),
    locations: R('Pet-safe studio, or on location', 'business profile'),
    imageCount: R('15+ edited digital images', 'business profile'),
    price: R('$199', 'business profile'),
    priceNote: R('Treats and toys provided', 'business profile'),
    forWhom: P('Dogs mostly, though cats are very welcome — there is a rescue cat in the portfolio.', 'Drafted from your Luna gallery. Have you photographed anything beyond cats and dogs?'),
    includes: R(
      ['30-minute session', '15+ edited digital images', 'Pet-safe studio environment', 'Treats and toys provided', 'Online gallery for sharing'],
      'business profile'
    ),
    popular: false,
  },
];

export const deliverables = R(
  [
    { stat: '2–3 weeks', label: 'Gallery delivery', detail: 'You’ll get a link to view, download and share your images.' },
    { stat: '48 hours', label: 'Rush available', detail: 'Need them sooner? Rush delivery is a $75 add-on.' },
    { stat: 'Included', label: 'Print release', detail: 'Print your images wherever you like, at any size.' },
    { stat: 'Online', label: 'Gallery for sharing', detail: 'Private, and easy to send to family.' },
  ],
  'business profile — FAQ and package inclusions'
);

// Real add-on menu. Replaces the invented print and album pricing.
export const products = R(
  [
    { name: 'Wall art prints', blurb: 'Museum-quality prints, ready to hang.', from: 'from $50' },
    { name: 'Album design', blurb: 'A custom-designed photo album, twenty pages.', from: '$150' },
    { name: 'Rush delivery', blurb: 'Your gallery within 48 hours of the session.', from: '$75' },
    { name: 'Extra edits', blurb: 'Additional retouched images beyond your package.', from: '$25 each' },
  ],
  'business profile — add-on services'
);

// Real portfolio work. Round one used generic category tiles; these are actual
// sessions with names, locations and image counts.
export const galleries = R(
  [
    { title: 'The Johnson Family Session', cat: 'family', count: 18, blurb: 'A beautiful autumn afternoon in Settler’s Park. The Johnsons brought their signature energy and warmth to every frame.' },
    { title: 'Emma’s Senior Portraits', cat: 'seniors', count: 14, blurb: 'A downtown golden-hour session. From brick-lined alleys to a sunlit rooftop, every shot captures her personality.' },
    { title: 'Elevated Brand: Sarah Chen', cat: 'branding', count: 12, blurb: 'Headshots and lifestyle branding for the founder of a boutique wellness studio. Clean, confident, modern.' },
    { title: 'Cooper & Friends', cat: 'pets', count: 16, blurb: 'An energetic session at the dog park with Cooper the golden retriever and his best furry friends.' },
    { title: 'The Martinez Family', cat: 'family', count: 20, blurb: 'A lively session at the botanic garden. Three generations, endless laughter, unforgettable moments.' },
    { title: 'Jake’s Graduation', cat: 'seniors', count: 15, blurb: 'From the football field to the forest trail — an adventurous outdoor session marking the end of high school.' },
    { title: 'Luna the Rescue Cat', cat: 'pets', count: 10, blurb: 'An in-home session capturing Luna’s quirks, from window perches to cardboard-box adventures.' },
  ],
  'business profile — portfolio galleries'
);

// A real fifth offering that only appeared in an Instagram post, not the
// services list. Worth surfacing properly: a short, cheap, low-commitment
// option is the strongest thing you can put in front of someone who has been
// putting off booking — which by Shawna's own account is most people.
export const miniSession = {
  name: R('Mini sessions', 'business profile — Instagram post ig-10'),
  blurb: R(
    'Twenty minutes, two outfit changes and fifteen edited photos. A shorter, lighter option for when a full session is more than you need.',
    'business profile — Instagram post ig-10'
  ),
  duration: R('20 minutes', 'business profile — Instagram post'),
  imageCount: R('15 edited photos', 'business profile — Instagram post'),
  outfits: R('2 outfit changes', 'business profile — Instagram post'),
  price: P(null, 'No price was given for mini sessions. What do they cost, and are they seasonal or always available?'),
  seasonal: P('Spring', 'The post said “back for spring”. Do you run these year round, or only at certain times?'),
};
