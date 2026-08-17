import { R, P } from './_placeholder.js';

// Bio now comes from the business profile rather than a draft. Note we dropped
// the "mom, wife, Nonna" line used in the first pass: it came from a public
// listing, not the profile, and the profile's own language is stronger. If it
// is true and she likes it, it is worth putting back — it is a real
// differentiator for a family photographer.
export const shawna = {
  name: R('Shawna', 'business profile'),
  role: R('Artist and photographer', 'business profile'),
  portrait: P(null, 'NEEDED: a real photograph of you. This is now the single biggest gap left in the mockups.'),
  quote: R(
    'My goal is to celebrate life and make our time stand still, even if, just for a moment.',
    'business profile'
  ),
  bio: R(
    [
      'I’m Shawna, the artist and photographer behind Skybyrd, based in Plainfield, Illinois.',
      'I’ve been passionate about photography since 2014, when I first discovered the magic of freezing a fleeting moment in time. What started as a hobby quickly became a calling — a way to help people see the beauty in their everyday lives.',
      'I specialise in family, senior, personal branding and pet photography. Every session is a collaboration: I bring the technical skill and the creative eye, and you bring the authentic moments that make your story yours.',
    ],
    'business profile — About section'
  ),
  signature: P('— Shawna', 'How you want to sign off. First name, or something else?'),
};

// Partly real now: the profile confirms the booking form, the 24-hour response
// and the 2–3 week delivery. The middle step is still our description of how a
// session actually runs.
export const process = P(
  [
    { n: '01', title: 'Send the form', body: 'Name, email, which session you’re after and roughly when. The message box is the only long bit, and a couple of sentences is plenty.' },
    { n: '02', title: 'I reply within a day', body: 'Always within 24 hours. We’ll talk through location, timing and what to wear.' },
    { n: '03', title: 'A style guide arrives', body: 'Once you book, I send a detailed guide on what to wear and how to prepare.' },
    { n: '04', title: 'The session itself', body: 'Anywhere from 30 minutes for a pet up to three hours for branding. Relaxed and unscripted, built around real moments rather than poses.' },
    { n: '05', title: 'Your gallery, 2–3 weeks later', body: 'A private online link to view, download and share. Rush delivery within 48 hours is available if you need it sooner.' },
  ],
  'Steps 01, 02, 03 and 05 come straight from your profile. Step 04 is our description of how a session runs — does it match how you’d put it?'
);

// The first five are verbatim from the profile. The rest are still ours, kept
// because they answer common hesitations, and flagged accordingly.
export const faq = [
  {
    q: R('What should I wear to my session?', 'business profile'),
    a: R('Coordinated outfits in solid colours or subtle patterns photograph best. Avoid large logos or neon colours — earthy tones, pastels and classic neutrals work well. I send a detailed style guide once you book.', 'business profile'),
  },
  {
    q: R('How long does a typical session last?', 'business profile'),
    a: R('Sessions range from 30 minutes for pets up to two or three hours for personal branding. Most family and senior sessions run about 60 to 90 minutes — enough time to relax, have fun, and capture genuine moments.', 'business profile'),
  },
  {
    q: R('When will I receive my photos?', 'business profile'),
    a: R('Your online gallery will be ready within two to three weeks. Rush delivery within 48 hours is available as an add-on. You’ll get a link to view, download and share your images.', 'business profile'),
  },
  {
    q: R('Do you travel for sessions?', 'business profile'),
    a: R('Yes. Based in Plainfield, I travel within 30 miles at no extra charge. For locations beyond that, a small travel fee applies.', 'business profile'),
  },
  {
    q: R('What happens if it rains on our outdoor session?', 'business profile'),
    a: R('If rain is in the forecast we reschedule at no charge. I watch the weather closely and will reach out 24 hours beforehand to talk through options. Indoor studio sessions are always available too.', 'business profile'),
  },
  {
    q: P('I’m not photogenic. Really.', 'Not in the profile — but it is the most common hesitation in portrait photography, and worth answering in your words.'),
    a: P('Nobody thinks they are. That is exactly why every session starts with getting to know you rather than posing you — you will forget the camera is there sooner than you expect.', 'Draft, written around your “authentic moments” value.'),
  },
  {
    q: P('Do I need to pay a deposit to enquire?', 'Not in the profile. What are your deposit and cancellation terms?'),
    a: P('No. Sending the form costs nothing and commits you to nothing.', 'Draft — confirm before this goes live.'),
  },
  {
    q: P('Can we include grandparents or extended family?', 'Not in the profile. Is there a group-size limit or an extra charge?'),
    a: P('Please do. Extended family sessions are frequently the reason people book in the first place.', 'Draft — confirm.'),
  },
];

// Nothing in the profile covers seasonal availability. The mini-session detail
// below comes from a real Instagram post, not from the services list.
export const rightNow = {
  headline: P('Mini sessions are back', 'From an Instagram post, not your services list. Is this running now?'),
  body: P(
    'Twenty minutes, two outfit changes and fifteen edited photos — a shorter, lighter option for when a full session is more than you need.',
    'Drafted from your mini-session Instagram post. Is this an ongoing offering, and what does it cost?'
  ),
  urgency: P('Now booking', 'Only show a specific number of remaining slots if it is genuinely true.'),
  deadline: P('Outdoor sessions rescheduled free if it rains', 'Using your real rain policy as the reassurance line. Is there a seasonal deadline that matters more?'),
};
