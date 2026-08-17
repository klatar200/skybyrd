import { P } from './_placeholder.js';

// Round one used the same H1 in every concept, so Shawna had no way to react to
// the writing — every response would have been about colour. Each architecture
// now has its own voice: headline, sub-headline, CTA wording and section
// titles. She can pick a voice and a look independently.
//
// The tagline "Celebrate life and make our time stand still." is hers and stays
// on all three — but it moves position depending on the voice.

export const voices = {
  // ── A ── Warm and plain-spoken. Evolved from concepts 01–05.
  gallery: {
    label: 'Gallery Led',
    voiceName: 'Warm and plain-spoken',
    voiceNote: 'Talks the way you would to a neighbour. Photographs lead, words stay out of the way.',
    eyebrow: P('Portrait studio · Plainfield, Illinois', 'Small line above the headline. Should it name the towns more widely?'),
    headline: P('Celebrate life and make our time stand still.', 'Shawna’s own tagline, used as the headline.'),
    sub: P('Family, seniors, personal branding and pets — photographed the way you actually are, in the light of an ordinary, beautiful afternoon.', 'Draft, from concept 01.'),
    ctaPrimary: P('View Portfolio', 'Wording on the main button. Does this sound like you?'),
    ctaSecondary: P('Book a Session', 'Wording on the second button. “Book” or something softer like “Get in touch”?'),
    sectionTitles: {
      meet: 'The person behind the camera',
      sessions: 'Four ways to sit for a portrait',
      gallery: 'Featured work',
      receive: 'What you get back',
      process: 'How a session goes',
      reviews: 'What people say afterwards',
      where: 'Where we shoot',
      now: 'Booking now',
      faq: 'Questions people ask',
      products: 'Prints, albums and gift cards',
      enquire: 'Let’s put this season of your life somewhere safe.',
    },
    closingLine: P('Sessions run about 90 minutes. Bring the dog, bring the grandparents, bring whoever makes it feel like yours.', 'From concept 01 — the best closing line in round one.'),
  },

  // ── B ── Direct and practical. Evolved from concept 07.
  booking: {
    label: 'Booking Led',
    voiceName: 'Direct and practical',
    voiceNote: 'Answers the money and logistics questions first. For the visitor who is ready and just wants to know how.',
    eyebrow: P('Now booking · Plainfield, Illinois', 'Small line above the headline. Only use “now booking” if it is always true.'),
    headline: P('Never done this before? Most of my clients haven’t either.', 'Draft, expanded from concept 07’s sub-heading — the most disarming line in round one.'),
    sub: P('Pick a session, send me a date, and I’ll walk you through the rest. No deposit to ask, and I reply within a day.', 'Draft, from concept 07.'),
    ctaPrimary: P('Check Availability', 'Wording on the main button. Does this sound like you?'),
    ctaSecondary: P('See the Work', 'Wording on the second button. Does this sound like you?'),
    sectionTitles: {
      meet: 'Who you’ll be working with',
      sessions: 'Choose your session',
      gallery: 'Recent sessions',
      receive: 'What’s included',
      process: 'What happens next',
      reviews: 'From people who booked',
      where: 'Where I shoot',
      now: 'Current availability',
      faq: 'Before you book',
      products: 'Prints and gift cards',
      enquire: 'Send me a date.',
    },
    closingLine: P('No deposit to ask. Tell me who’s coming and roughly when, and I’ll send times that work.', 'From concept 07.'),
  },

  // ── C ── Documentary and specific. Evolved from concepts 08, 09 and 10.
  story: {
    label: 'Story Led',
    voiceName: 'Documentary and specific',
    voiceNote: 'Reads as a letter from Shawna. Names real places and real moments; trust first, gallery last.',
    eyebrow: P('Plainfield, Illinois · since 2014', 'Year needs confirming.'),
    headline: P('Hi, I’m the artist behind SkyByrd.', 'From concept 08.'),
    sub: P('I photograph families, seniors, small businesses and very good dogs around the southwest suburbs. Nothing stiff. We keep the outtakes — those are usually the ones you love.', 'Draft, merging concepts 03 and 08.'),
    ctaPrimary: P('Write to Me', 'Wording on the main button. Warmer than “Book” — is that right for you?'),
    ctaSecondary: P('View Portfolio', 'Wording on the second button. Does this sound like you?'),
    sectionTitles: {
      meet: 'Before you write to me',
      sessions: 'The four kinds of session',
      gallery: 'From the album',
      receive: 'What you get back',
      process: 'The day itself',
      reviews: 'What people said afterwards',
      where: 'The places I keep going back to',
      now: 'This season',
      faq: 'Things people ask me',
      products: 'Prints, albums and gift cards',
      enquire: 'Tell me who’s coming.',
    },
    closingLine: P('If any of this sounds like what you’ve been meaning to do, write to me. Tell me who’s coming — that’s the whole ask.', 'From concept 08.'),
  },
};
