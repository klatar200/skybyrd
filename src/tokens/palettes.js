// Four skins, carried over from the round-one concepts Shawna reacted to.
//
// The whole point of this file: palette is a variable, not a layout. Any of the
// four can be applied to any of the three architectures, which is what makes
// "concept 2's layout with concept 4's colours" a one-line change instead of a
// rebuild. Round one had to redraw the page to answer that question.
//
// Every skin defines the SAME token names. Sections only ever reference tokens,
// never literal colours — so adding a fifth palette needs no section changes.
//
// The accent comes in two tiers, and the split is a contrast contract:
//   --accent      fills, rules, and text at 18px+ / 14px+ bold  (needs 3:1)
//   --accent-ink  ANY accent-coloured text below that           (needs 4.5:1)
// A new palette must satisfy both against --ground and --surface, and
// --on-accent must clear 4.5:1 against --accent since it is the button label.
// `npm run check` verifies this.

const shared = {
  radius: '2px',
  radiusLg: '4px',
  maxWidth: '1200px',
  measure: '68ch',
};

export const palettes = {
  linen: {
    id: 'linen',
    name: 'Warm Linen',
    note: 'From concept 01 “Golden Afternoon”. Classic editorial — warm paper, generous whitespace, like a printed photo book.',
    dark: false,
    tokens: {
      ...shared,
      ground: '#FAF6F0',
      surface: '#FFFFFF',
      surfaceAlt: '#F2EBE1',
      ink: '#2A241D',
      inkSoft: '#544A3E',
      muted: '#73685B',
      rule: 'rgba(42,36,29,.13)',
      ruleStrong: 'rgba(42,36,29,.26)',
      accent: '#9E662E',
      accentInk: '#8A5520',
      accentSoft: '#F6E9D8',
      onAccent: '#FFFBF5',
      displayFont: '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
      bodyFont: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      labelFont: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      displayWeight: '600',
      labelSpacing: '.16em',
      heroCase: 'none',
    },
  },

  studio: {
    id: 'studio',
    name: 'Midnight Studio',
    note: 'From concept 02. Dark, cinematic, premium — the photographs glow against near-black.',
    dark: true,
    tokens: {
      ...shared,
      ground: '#0C0C0D',
      surface: '#141416',
      surfaceAlt: '#1C1C1F',
      ink: '#F4F2EF',
      inkSoft: '#C3BFB8',
      muted: '#8A857D',
      rule: 'rgba(255,255,255,.12)',
      ruleStrong: 'rgba(255,255,255,.26)',
      accent: '#C9A227',
      accentInk: '#E3C765',
      accentSoft: '#231F12',
      onAccent: '#14120A',
      displayFont: '"Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif',
      bodyFont: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      labelFont: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      displayWeight: '800',
      labelSpacing: '.22em',
      heroCase: 'none',
    },
  },

  modern: {
    id: 'modern',
    name: 'Bright & Modern',
    note: 'From concept 04. Clean and energetic — ivory ground, garden green, marigold accents.',
    dark: false,
    tokens: {
      ...shared,
      ground: '#FDFCF7',
      surface: '#FFFFFF',
      surfaceAlt: '#EFF2E9',
      ink: '#1B2419',
      inkSoft: '#3F4A3C',
      muted: '#677062',
      rule: 'rgba(27,36,25,.12)',
      ruleStrong: 'rgba(27,36,25,.24)',
      accent: '#3F6B3A',
      accentInk: '#2C4C28',
      accentSoft: '#E6EEE2',
      onAccent: '#FDFCF7',
      displayFont: '"Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif',
      bodyFont: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      labelFont: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      displayWeight: '800',
      labelSpacing: '.12em',
      heroCase: 'none',
    },
  },

  airy: {
    id: 'airy',
    name: 'Soft & Airy',
    note: 'From concept 05. Gentle and unhurried — pale blush and sage, lots of air, trust-first.',
    dark: false,
    tokens: {
      ...shared,
      ground: '#FBF8F6',
      surface: '#FFFFFF',
      surfaceAlt: '#F1EAE6',
      ink: '#3B3330',
      inkSoft: '#5E5450',
      muted: '#726863',
      rule: 'rgba(59,51,48,.11)',
      ruleStrong: 'rgba(59,51,48,.22)',
      accent: '#8B6F63',
      accentInk: '#7A5D51',
      accentSoft: '#F3E9E4',
      onAccent: '#FFFFFF',
      displayFont: '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
      bodyFont: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      labelFont: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      displayWeight: '500',
      labelSpacing: '.2em',
      heroCase: 'none',
    },
  },
};

/** Emit a palette as CSS custom properties, scoped to a selector. */
export function paletteCss(palette, selector = ':root') {
  const lines = Object.entries(palette.tokens)
    .map(([k, val]) => `  --${k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}: ${val};`)
    .join('\n');
  return `${selector} {\n${lines}\n}`;
}

export const paletteList = Object.values(palettes);
