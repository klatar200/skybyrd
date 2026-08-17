import { R, P } from './_placeholder.js';

// Three real testimonials from the business profile, replacing the eight
// invented ones. Fewer, but real — which is worth more.
//
// Three is still thin for the reviews band, which was built to hold six to
// twelve. It renders honestly at this size, but pulling the rest from Google
// and Facebook is the highest-value remaining content job after the photographs.
//
// Session type is inferred from what each reviewer describes. Towns were not
// supplied, so the band omits them rather than inventing any.

export const testimonials = R(
  [
    {
      quote: 'The most amazing photography experience we’ve ever had. Every photo tells a story and captures the love in our family perfectly.',
      name: 'Jane D.', town: null, session: 'family', stars: 5, source: null,
    },
    {
      quote: 'Best pet photos we’ve ever had! She captured our dog’s personality in every single shot. We couldn’t be happier!',
      name: 'Mike R.', town: null, session: 'pets', stars: 5, source: null,
    },
    {
      quote: 'Our family photos are absolutely stunning! The attention to detail and ability to capture genuine moments is incredible.',
      name: 'Sarah L.', town: null, session: 'family', stars: 5, source: null,
    },
  ],
  'business profile — client testimonials'
);

// Flagged separately so it shows up as a question without casting doubt on the
// three real quotes above.
export const reviewGaps = P(
  'Three reviews supplied; the band is built for six to twelve.',
  'Can you pull more reviews from Google and Facebook? Also worth capturing the town and session type for each, and setting the platform so the source badge renders. No senior or branding client is quoted yet.'
);

/** One quote per session type, for the inline slot in each session block. */
export function quoteFor(sessionId, list) {
  return list.find((t) => t.session === sessionId) || list[0];
}
