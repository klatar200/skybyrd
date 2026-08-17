// Three architectures. Each uses ALL fifteen bands — the difference is the
// order, which is the thing that actually changes how the page sells.
//
// Round one's problem was five concepts sharing one order and differing only in
// colour. Here the order IS the concept, and colour is a separate control.

export const architectures = [
  {
    id: 'gallery',
    label: 'Gallery Led',
    lineage: 'Evolved from concepts 01–05, which all shared this shape.',
    thesis: 'The work sells itself. Photographs land before any argument does, and the practical detail follows once someone is already interested.',
    bestFor: 'Visitors arriving from Instagram who want to see whether they like the pictures.',
    heroVariant: 'centered',
    bands: [
      'nav', 'hero', 'trustBar', 'gallery', 'meetShawna', 'sessionTypes',
      'whatYouReceive', 'howItWorks', 'reviews', 'whereIShoot', 'rightNow',
      'faq', 'prints', 'enquiry', 'instagram', 'footer',
    ],
  },
  {
    id: 'booking',
    label: 'Booking Led',
    lineage: 'Evolved from concept 07, the strongest single concept in round one.',
    thesis: 'The homepage is the enquiry. Sessions, prices and availability come first; proof and portfolio come after, for anyone still deciding.',
    bestFor: 'Visitors who already know they want photos and are comparing photographers on price and dates.',
    heroVariant: 'split',
    bands: [
      'nav', 'hero', 'trustBar', 'sessionTypes', 'rightNow', 'howItWorks',
      'whatYouReceive', 'reviews', 'gallery', 'whereIShoot', 'faq',
      'meetShawna', 'prints', 'enquiry', 'instagram', 'footer',
    ],
  },
  {
    id: 'story',
    label: 'Story Led',
    lineage: 'Evolved from concepts 08, 09 and 10 — the letter voice, with the specificity of the magazine.',
    thesis: 'Trust first, gallery last. Shawna introduces herself, explains what a session feels like, and only then shows the work.',
    bestFor: 'Visitors who are nervous about being photographed — which, by Shawna’s own account, is most of them.',
    heroVariant: 'letter',
    bands: [
      'nav', 'hero', 'meetShawna', 'howItWorks', 'trustBar', 'reviews',
      'whereIShoot', 'sessionTypes', 'whatYouReceive', 'gallery', 'rightNow',
      'faq', 'prints', 'enquiry', 'instagram', 'footer',
    ],
  },
];
