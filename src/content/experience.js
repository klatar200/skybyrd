import { R, P } from './_placeholder.js';

// Shawna's bio. Round one showed her face in zero of ten concepts and invented
// a generic origin story. The real material is better: mom, wife, Nonna — which
// is precisely why family photography is the thing she does.
export const shawna = {
  name: R('Shawna Latarewicz', 'public listings'),
  role: R('Photographer and owner', ''),
  portrait: P(null, 'NEEDED: a real photograph of you. This is the highest-value missing asset on the whole site.'),
  bio: P(
    [
      'I’m Shawna. I’ve been photographing families around Plainfield since 2014, and before that I was just the person at every gathering with a camera nobody asked her to bring.',
      'I’m a mom, a wife, and a Nonna, which is most of why I do this work. I know how fast it goes. I know the year you keep meaning to book and don’t, and then the kids are taller.',
      'Most people who write to me open with some version of *I hate having my picture taken*. That’s fine. We start there, and then we go for a walk.',
    ],
    'Drafted from your public bio. It needs to be in your own words — this block carries more weight than anything else on the page.'
  ),
  signature: P('— Shawna', 'How you want to sign off. First name, or something else?'),
};

// The five-step walkthrough. Concepts 07, 08 and 10 had the best writing in the
// whole set here; seven concepts had none of it. Now standard everywhere.
export const process = P(
  [
    { n: '01', title: 'You send a date', body: 'No payment, no forms. Just a note about who’s coming and roughly when. I reply within a day.' },
    { n: '02', title: 'We talk it through', body: 'Ten minutes on the phone. Location, what to wear, how to handle the toddler who won’t sit still.' },
    { n: '03', title: 'The first ten minutes are throwaways', body: 'On purpose. Everyone arrives stiff. I keep shooting anyway and it wears off faster than you’d think.' },
    { n: '04', title: 'Mostly walking, very little posing', body: 'I’ll put you somewhere with good light and then largely get out of the way. No forced smiles.' },
    { n: '05', title: 'Your gallery, two weeks later', body: 'A private link that’s yours to keep. Order prints straight from it, or don’t — the files are the point.' },
  ],
  'Steps 03 and 04 survive from concept 08 and are the strongest writing in the set. Confirm the response time and delivery window are accurate.'
);

// Only concept 07 had an FAQ, with three questions. This is the highest-leverage
// block on the page: it removes booking friction, cuts Shawna's inbox, and is
// what search engines and AI assistants quote back to people.
export const faq = P(
  [
    { q: 'I’m not photogenic. Really.', a: 'Nobody thinks they are — it is genuinely the most common thing people say to me. That is why the first ten minutes are throwaway frames and why we spend them talking. You will forget the camera is there sooner than you expect.' },
    { q: 'What should we wear?', a: 'I send a short guide once you book, with examples. The short version: coordinate rather than match, avoid big logos, and wear something you would actually choose. I am happy to look at photos of the options beforehand.' },
    { q: 'How long does a session take?', a: 'Family sessions run about 90 minutes, seniors about two hours, pets around 45 minutes, and branding is a half day. None of it is spent standing still.' },
    { q: 'What if the kids melt down?', a: 'They will, briefly. It is fine, it is built into the time, and those frames are usually the keepers.' },
    { q: 'What happens if it rains?', a: 'We reschedule, at no cost. Overcast is actually lovely light, so I will only move a session for real weather.' },
    { q: 'How far do you travel?', a: 'Across the southwest suburbs as standard — Naperville, Joliet, Oswego, Shorewood and the towns between. Further is usually possible, just ask.' },
    { q: 'Do I need to pay a deposit to enquire?', a: 'No. Sending a date costs nothing and commits you to nothing. We only talk about payment once you have decided.' },
    { q: 'How many photos do we get, and how soon?', a: 'Forty or more edited images for a family session, in a private gallery within two weeks. Usually sooner.' },
    { q: 'Can we include grandparents or extended family?', a: 'Please do. Extended family sessions are some of my favourite work, and they are frequently the reason people book in the first place.' },
    { q: 'Can we order prints, or just download the files?', a: 'Both. Prints, albums and canvases can be ordered straight from your gallery, and you also get a print release to use the files anywhere you like.' },
  ],
  'Ten questions drafted from common enquiries. Every answer needs your confirmation — particularly the rain policy, travel radius, deposit terms and delivery times.'
);

// Portrait work is deadline-driven and round one used that exactly once
// (concept 07's "3 dates left in May").
export const rightNow = {
  headline: P('Autumn dates are open', 'Should reflect the real season and real availability.'),
  body: P(
    'Autumn family sessions book up first, and holiday card orders need to be placed by the first week of December to arrive in time. If you are thinking about it, now is the moment to send a date.',
    'Draft. Rewrite each season, or wire to a real calendar.'
  ),
  urgency: P('4 weekend slots left in October', 'INVENTED. Only show a number like this if it is true.'),
  deadline: P('Holiday card orders close 5 December', 'Invented deadline — confirm.'),
};
