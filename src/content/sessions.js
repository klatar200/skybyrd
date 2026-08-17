import { R, P } from './_placeholder.js';

// Round one showed these as four cards with a one-line quip. A buyer deciding
// on senior portraits needs a block, not eight words — so each type now carries
// who it suits, what is included, duration, price and its own call to action.
//
// ALL PRICING IS INVENTED. It came from concepts 07 and 10 and was presented
// there as fact. Shawna will read it as a proposal, so it is flagged
// everywhere it renders until she confirms real figures.

export const sessions = [
  {
    id: 'family',
    name: R('Family', 'services list'),
    tag: R('The one people put off for years', ''),
    forWhom: P('Growing families, extended families, grandparents visiting, anyone overdue for a decent photo together.', 'Draft.'),
    blurb: P(
      'Everyone in one frame, nobody performing. We walk, we talk, and I photograph what happens in between the bits you think of as the photo.',
      'Draft — closest to concept 03’s voice, which read best.'
    ),
    duration: P('90 minutes', 'From concept 07.'),
    groupSize: P('Up to 8 people', 'From concept 07.'),
    locations: P('One location of your choosing', 'Confirm.'),
    imageCount: P('40+ edited images', 'From concept 07.'),
    price: P('$450', 'INVENTED in concept 07. Needs Shawna’s real pricing.'),
    priceNote: P('Additional people $25 each', 'Invented. Does she charge for larger groups?'),
    includes: P(
      ['Pre-session call and wardrobe guidance', '90 minutes on location', '40+ edited high-resolution images', 'Private online gallery within two weeks', 'Print release for personal use'],
      'Draft inclusions — confirm each line.'
    ),
    popular: true,
  },
  {
    id: 'seniors',
    name: R('Seniors', 'services list'),
    tag: R('One last year at home', ''),
    forWhom: P('High school seniors and their parents, usually booked the summer before senior year.', 'Draft.'),
    blurb: P(
      'The year they became themselves, photographed before it goes by. Two locations, three outfits, and enough time that nobody feels rushed.',
      'Draft.'
    ),
    duration: P('2 hours', 'From concept 07.'),
    groupSize: P('The senior, plus family for a few frames', 'Confirm.'),
    locations: P('Two locations', 'From concept 07.'),
    imageCount: P('50+ edited images', 'Invented.'),
    price: P('$525', 'INVENTED in concept 07. Needs real pricing.'),
    priceNote: P('Cap and gown add-on available', 'Invented — does she offer this?'),
    includes: P(
      ['Planning call with the senior, not just the parents', 'Two locations, three outfit changes', '50+ edited high-resolution images', 'Private gallery within two weeks', 'Graduation announcement files sized and ready'],
      'Draft inclusions.'
    ),
    popular: false,
  },
  {
    id: 'branding',
    name: R('Personal Branding', 'services list'),
    tag: R('Headshots that don’t look like headshots', ''),
    forWhom: P('Small business owners, realtors, therapists, coaches — anyone whose face is part of the offer.', 'Draft.'),
    blurb: P(
      'A library of images that sound like the person running the business. Not one stiff headshot, but a year of things to post.',
      'Draft.'
    ),
    duration: P('Half day', 'From concept 07.'),
    groupSize: P('One person, or small teams by arrangement', 'Confirm team pricing.'),
    locations: P('Your workplace, the studio, or both', 'Confirm.'),
    imageCount: P('60+ edited images', 'Invented.'),
    price: P('$680', 'INVENTED in concept 07. Needs real pricing.'),
    priceNote: P('Team rates available', 'Invented — does she shoot teams?'),
    includes: P(
      ['Strategy call about how you will actually use the images', 'Half day of shooting', '60+ edited images in web and print sizes', 'Cropped variants for LinkedIn, Instagram and your website', 'Commercial usage rights'],
      'Draft inclusions — commercial rights in particular needs confirming.'
    ),
    popular: false,
  },
  {
    id: 'pets',
    name: R('Pets', 'services list'),
    tag: R('Members of the family, obviously', ''),
    forWhom: P('Dogs mostly, but she has photographed cats, horses and one very patient rabbit.', 'INVENTED detail — is this true? It is a lovely line if so.'),
    blurb: P(
      'Treats allowed, chaos expected. Studio or your favourite trail, and we work at their pace rather than mine.',
      'Draft — this line survives from round one.'
    ),
    duration: P('45 minutes', 'From concept 07.'),
    groupSize: P('Up to 2 pets, humans welcome', 'Confirm.'),
    locations: P('Studio or a trail of your choosing', 'Confirm.'),
    imageCount: P('25+ edited images', 'Invented.'),
    price: P('$275', 'INVENTED in concept 07. Needs real pricing.'),
    priceNote: P('Add your people for $75', 'Invented.'),
    includes: P(
      ['A short chat about what makes them comfortable', '45 minutes, at their pace', '25+ edited images', 'Private gallery within two weeks', 'Treats provided, and used shamelessly'],
      'Draft inclusions.'
    ),
    popular: false,
  },
];

// What the money actually buys. Round one said this nowhere except a passing
// line in concept 10 — and it was the most reassuring content in that concept.
export const deliverables = P(
  [
    { stat: '2 weeks', label: 'Gallery delivery', detail: 'Often sooner. You will get a private link by email.' },
    { stat: '40+', label: 'Edited images', detail: 'Colour graded and retouched by hand. No batch presets.' },
    { stat: '10 years', label: 'Archived', detail: 'Re-download any time. People lose phones; I keep backups.' },
    { stat: 'Included', label: 'Print release', detail: 'Print them anywhere you like, at any size, forever.' },
  ],
  'All four figures invented from concept 10. Confirm delivery time, image counts, archive policy and print rights.'
);

export const products = P(
  [
    { name: 'Framed prints', blurb: 'Chosen from your gallery and delivered ready to hang.', from: 'from $85' },
    { name: 'Albums', blurb: 'A hand-bound book of the whole session. The thing people actually keep.', from: 'from $340' },
    { name: 'Canvases', blurb: 'For the wall you have been meaning to do something with.', from: 'from $190' },
    { name: 'Gift certificates', blurb: 'A session for someone else — new babies, new homes, big birthdays.', from: 'any amount' },
  ],
  'Entirely invented. Does Shawna sell prints and albums, and at what prices? This is where studio revenue per client usually comes from.'
);
