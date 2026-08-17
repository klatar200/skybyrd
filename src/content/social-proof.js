import { P } from './_placeholder.js';

// Round one ran five invented testimonials across ten pages — Megan R. appeared
// in three concepts, Tasha & Rob in three more. Meanwhile the real reviews on
// Google, Facebook and Yelp went unused.
//
// These eight are placeholders shaped to show the layout at proper volume. Each
// carries the fields the design needs, so swapping in real reviews is a data
// edit rather than a redesign. Attach `source` once they are real, and the
// platform badge renders automatically.

export const testimonials = P(
  [
    {
      quote: 'She got my two-year-old laughing within a minute. The photos on our wall are the first thing people mention, and they’re the first thing I look at every morning.',
      name: 'Megan R.', town: 'Plainfield', session: 'family', source: null, featured: true,
    },
    {
      quote: 'We booked for the kids and ended up with the first good picture of my parents in ten years. I cried in the parking lot.',
      name: 'Tasha & Rob', town: 'Shorewood', session: 'family', source: null, featured: true,
    },
    {
      quote: 'I’ve never liked a photo of myself. I have eleven of these framed.',
      name: 'Daniel K.', town: 'Naperville', session: 'branding', source: null, featured: true,
    },
    {
      quote: 'My senior photos actually look like me. My mom cried. My friends all rebooked.',
      name: 'Ava M.', town: 'Oswego', session: 'seniors', source: null, featured: false,
    },
    {
      quote: 'Shawna made it feel like a walk with a friend who happened to have a camera. Every single image feels like us.',
      name: 'Priya S.', town: 'Joliet', session: 'family', source: null, featured: false,
    },
    {
      quote: 'Our dog is genuinely feral in front of a camera. She got twenty frames we love. I still don’t know how.',
      name: 'Colin B.', town: 'Romeoville', session: 'pets', source: null, featured: false,
    },
    {
      quote: 'I put off booking headshots for three years. The hardest part was sending the email.',
      name: 'Renée T.', town: 'Plainfield', session: 'branding', source: null, featured: false,
    },
    {
      quote: 'Third year running now. It has quietly become the thing we measure the year by.',
      name: 'The Whitmores', town: 'Yorkville', session: 'family', source: null, featured: false,
    },
  ],
  'All eight invented — five carried over from round one, three written to show the layout at volume. Replace with real reviews from Google, Facebook and Yelp, and set `source` so the platform badge renders.'
);

/** One quote per session type, for the inline slot in each session block. */
export function quoteFor(sessionId, list) {
  return list.find((t) => t.session === sessionId) || list[0];
}
