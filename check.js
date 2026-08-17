#!/usr/bin/env node
// Verifies the contrast contract documented in src/tokens/palettes.js.
// Run with `npm run check`. Exits non-zero on any failure so a new palette
// cannot quietly ship text nobody can read.

import { paletteList } from './src/tokens/palettes.js';

const hex = (h) => { h = h.replace('#', ''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
const lum = (c) => {
  const [r, g, b] = c.map((val) => { val /= 255; return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const l1 = lum(hex(a)), l2 = lum(hex(b));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

const AA = 4.5;   // text below 18px / 14px bold
const AA_LG = 3;  // large text, and non-text boundaries

let failures = 0;
console.log('\n  Contrast check — WCAG AA\n');

for (const p of paletteList) {
  const t = p.tokens;
  const cases = [
    ['body text on ground',        t.inkSoft,   t.ground,    AA],
    ['body text on surface',       t.inkSoft,   t.surface,   AA],
    ['muted text on ground',       t.muted,     t.ground,    AA],
    ['muted text on surface',      t.muted,     t.surface,   AA],
    ['muted text on surfaceAlt',   t.muted,     t.surfaceAlt, AA],
    ['accent-ink text on ground',  t.accentInk, t.ground,    AA],
    ['accent-ink text on surface', t.accentInk, t.surface,   AA],
    ['accent-ink on accentSoft',   t.accentInk, t.accentSoft, AA],
    ['button label on accent',     t.onAccent,  t.accent,    AA],
    ['accent fill on ground',      t.accent,    t.ground,    AA_LG],
  ];
  const bad = cases.filter(([, fg, bg, min]) => ratio(fg, bg) < min);
  const mark = bad.length ? '✗' : '✓';
  console.log(`  ${mark} ${p.name}`);
  for (const [name, fg, bg, min] of bad) {
    console.log(`      ${name.padEnd(28)} ${fg} on ${bg}  ${ratio(fg, bg).toFixed(2)} < ${min}`);
    failures++;
  }
}

console.log(failures ? `\n  ${failures} contrast failure(s)\n` : '\n  All palettes pass.\n');
process.exit(failures ? 1 : 0);
