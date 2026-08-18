#!/usr/bin/env node
// Renders every architecture × palette combination into one review canvas.
//
//   node build.js
//
// Three architectures are rendered ONCE each; the four palettes are applied as
// CSS custom-property sets swapped by a data attribute. That is the whole
// argument for the system — twelve combinations cost three renders, and a
// content edit reaches all twelve at once.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { business, serviceArea, locations, milestones, coreValues } from './src/content/business.js';
import { sessions, deliverables, products, galleries, miniSession } from './src/content/sessions.js';
import { testimonials, reviewGaps, socialPosts, socialSummary } from './src/content/social-proof.js';
import { shawna, process as processSteps, faq, rightNow } from './src/content/experience.js';
import { voices } from './src/content/voice.js';
import { collectPlaceholders } from './src/content/_placeholder.js';
import { palettes, paletteList, paletteCss } from './src/tokens/palettes.js';
import { architectures } from './src/architectures.js';
import { sections } from './src/sections/index.js';
import { renderIntake } from './src/intake.js';
import { schemaScript, buildSchema } from './src/schema.js';
import { renderLanding, landingCss } from './src/landing.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(__dirname, p), 'utf8');

const content = {
  business, serviceArea, locations, milestones, coreValues,
  sessions, deliverables, products, galleries, miniSession,
  testimonials, reviewGaps, socialPosts, socialSummary, shawna, process: processSteps, faq, rightNow,
};

/* ── render one architecture ─────────────────────────────────────────────── */
function renderArchitecture(arch) {
  const voice = voices[arch.id];
  // idp namespaces every in-page id: all three architectures share one document.
  const opts = { idp: `${arch.id}-`, variant: arch.heroVariant };
  return arch.bands
    .map((band) => {
      const fn = sections[band];
      if (!fn) throw new Error(`Unknown band "${band}" in architecture "${arch.id}"`);
      return fn(content, voice, opts);
    })
    .join('\n');
}

/* ── placeholder report ──────────────────────────────────────────────────── */
const placeholders = collectPlaceholders(content).concat(
  collectPlaceholders(voices).map((p) => ({ ...p, path: 'voice.' + p.path }))
);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const short = (val) => {
  const s = Array.isArray(val) ? val.map((x) => (typeof x === 'object' ? x.name || x.q || x.stat || '…' : x)).join(', ')
    : typeof val === 'object' && val !== null ? JSON.stringify(val).slice(0, 90)
    : String(val);
  return s.length > 110 ? s.slice(0, 110) + '…' : s;
};

const reportRows = placeholders
  .map((p) => `<tr><td class="rp-path">${esc(p.path)}</td><td class="rp-val">${esc(short(p.value))}</td><td class="rp-note">${esc(p.note || '')}</td></tr>`)
  .join('');

/* ── assemble ────────────────────────────────────────────────────────────── */
const pageCss = read('src/styles/page.css');
const chromeCss = read('src/styles/chrome.css');

const paletteBlocks = paletteList
  .map((p) => paletteCss(p, `[data-palette="${p.id}"]`))
  .join('\n');

/* Human labels for the band keys, used by the compare view's order strip. The
   whole point of compare mode is seeing WHERE each architecture puts things, so
   the key decision bands are marked and the rest stay quiet. */
const BAND_LABELS = {
  nav: 'Nav', hero: 'Hero', trustBar: 'Trust bar', meetShawna: 'Meet Shawna',
  sessionTypes: 'Sessions + pricing', gallery: 'Gallery', whatYouReceive: 'What you receive',
  howItWorks: 'How it works', reviews: 'Reviews', whereIShoot: 'Where I shoot',
  rightNow: 'Availability', faq: 'FAQ', prints: 'Prints', enquiry: 'Enquiry',
  instagram: 'Instagram', footer: 'Footer',
};
const KEY_BANDS = new Set(['sessionTypes', 'gallery', 'meetShawna', 'reviews']);

const bandStrip = (arch) =>
  arch.bands
    .map((b, i) => `<li class="bandchip${KEY_BANDS.has(b) ? ' bandchip-key' : ''}"><span>${String(i + 1).padStart(2, '0')}</span>${esc(BAND_LABELS[b] || b)}</li>`)
    .join('');

const pages = architectures
  .map((a) => `<div class="arch-col" data-arch="${a.id}"${a.id === architectures[0].id ? '' : ' hidden'}>
  <div class="col-head">
    <h3>${esc(a.label)}</h3>
    <p>${esc(voices[a.id].voiceName)}</p>
    <ol class="bandstrip">${bandStrip(a)}</ol>
  </div>
  <div class="page page-body">${renderArchitecture(a)}</div>
</div>`)
  .join('\n');

const archButtons = architectures
  .map((a, i) => `<button class="seg ${i === 0 ? 'on' : ''}" data-set="arch" data-val="${a.id}" type="button">
    <span class="seg-t">${esc(a.label)}</span><span class="seg-s">${esc(a.bands.length)} bands</span></button>`)
  .join('');

const palButtons = paletteList
  .map((p, i) => `<button class="seg seg-pal ${i === 0 ? 'on' : ''}" data-set="palette" data-val="${p.id}" type="button">
    <span class="sw" style="background:${p.tokens.accent};border-color:${p.tokens.rule_strong || p.tokens.ruleStrong || p.tokens.accent}"></span>
    <span class="seg-t">${esc(p.name)}</span></button>`)
  .join('');

const archNotes = architectures
  .map((a) => `<div class="arch-note" data-arch="${a.id}"${a.id === architectures[0].id ? '' : ' hidden'}>
    <p class="an-thesis">${esc(a.thesis)}</p>
    <dl class="an-meta">
      <div><dt>Voice</dt><dd>${esc(voices[a.id].voiceName)}</dd></div>
      <div><dt>Best for</dt><dd>${esc(a.bestFor)}</dd></div>
      <div><dt>Lineage</dt><dd>${esc(a.lineage)}</dd></div>
    </dl>
  </div>`)
  .join('');

const schema = buildSchema(content);

const html = `<title>Skybyrd Mockup Studio</title>
${schemaScript(content)}
<style>
${chromeCss}
${pageCss}
${paletteBlocks}
</style>

<div class="chrome">
  <div class="chrome-bar">
    <div class="ch-brand">
      <span class="ch-dot"></span>
      <div><strong>Skybyrd</strong><span>Mockup studio · round two</span></div>
    </div>

    <div class="ch-group" id="archGroup">
      <span class="ch-label">Architecture</span>
      <div class="segs">${archButtons}</div>
    </div>

    <div class="ch-group">
      <span class="ch-label">Palette</span>
      <div class="segs">${palButtons}</div>
    </div>

    <div class="ch-group">
      <span class="ch-label">View</span>
      <div class="segs">
        <button class="seg on" data-set="frame" data-val="desktop" type="button"><span class="seg-t">Desktop</span></button>
        <button class="seg" data-set="frame" data-val="mobile" type="button"><span class="seg-t">Phone</span></button>
        <button class="seg" data-set="frame" data-val="compare" type="button"><span class="seg-t">Compare all three</span></button>
      </div>
    </div>

    <div class="ch-group ch-toggles">
      <label class="tog"><input type="checkbox" id="phToggle" checked><span>Mark placeholders</span></label>
      <button class="ch-link" id="openReport" type="button">Needs Shawna (${placeholders.length})</button>
    </div>
  </div>

  <div class="chrome-notes">
    ${archNotes}
    <div class="arch-note" id="compareHint" hidden>
      <p class="an-thesis">All three side by side, same palette. The numbered strip above each column is its band order — the highlighted bands are the ones that move, and where they sit is the whole difference between these three.</p>
      <dl class="an-meta">
        <div><dt>Scroll</dt><dd>All three columns scroll together</dd></div>
        <div><dt>Palette</dt><dd>Still applies to all three at once</dd></div>
      </dl>
    </div>
  </div>
</div>

<div class="stage">
  <div class="frame show-ph" id="frame" data-palette="${paletteList[0].id}">
    ${pages}
  </div>
</div>

<dialog class="report" id="report">
  <div class="rp-head">
    <div>
      <h2>Needs Shawna</h2>
      <p>Every invented fact in the mockups, in one place. Each row is a single edit in <code>src/content/</code> that updates all twelve combinations at once.</p>
    </div>
    <button class="ch-link" id="closeReport" type="button">Close</button>
  </div>
  <div class="rp-wrap">
    <table class="rp-table">
      <thead><tr><th>Field</th><th>Current placeholder</th><th>What’s needed</th></tr></thead>
      <tbody>${reportRows}</tbody>
    </table>
  </div>
</dialog>

<script>
(function () {
  var frame = document.getElementById('frame');
  var state = { arch: '${architectures[0].id}', palette: '${paletteList[0].id}', frame: 'desktop' };

  function apply() {
    var comparing = state.frame === 'compare';
    frame.setAttribute('data-palette', state.palette);
    frame.classList.toggle('frame-mobile', state.frame === 'mobile');
    frame.classList.toggle('frame-compare', comparing);

    // Compare shows all three at once, so the architecture picker has nothing
    // to switch — dim it rather than leaving a dead control.
    document.querySelectorAll('.arch-col').forEach(function (el) {
      el.hidden = !comparing && el.getAttribute('data-arch') !== state.arch;
    });
    document.querySelectorAll('.arch-note').forEach(function (el) {
      el.hidden = comparing || el.getAttribute('data-arch') !== state.arch;
    });
    document.getElementById('archGroup').classList.toggle('ch-dim', comparing);
    document.getElementById('compareHint').hidden = !comparing;
  }

  document.querySelectorAll('.seg').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var set = btn.getAttribute('data-set');
      state[set] = btn.getAttribute('data-val');
      btn.parentElement.querySelectorAll('.seg').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
      apply();
    });
  });

  document.getElementById('phToggle').addEventListener('change', function (e) {
    frame.classList.toggle('show-ph', e.target.checked);
  });

  // Gallery filters looked interactive and did nothing. Make them work — the
  // point of building mockups in code is that the behaviour is real.
  document.querySelectorAll('.gal-filters').forEach(function (bar) {
    var grid = bar.parentElement.querySelector('.gal-grid');
    if (!grid) return;
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.gal-f');
      if (!btn) return;
      var cat = btn.getAttribute('data-cat');
      bar.querySelectorAll('.gal-f').forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', String(on));
      });
      grid.querySelectorAll('.gal-item').forEach(function (tile) {
        tile.hidden = cat !== 'all' && tile.getAttribute('data-cat') !== cat;
      });
    });
  });

  var dlg = document.getElementById('report');
  document.getElementById('openReport').addEventListener('click', function () { dlg.showModal(); });
  document.getElementById('closeReport').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  apply();
})();
</script>
`;

mkdirSync(join(__dirname, 'dist'), { recursive: true });
writeFileSync(join(__dirname, 'dist/review.html'), html);

/* The published artifact supplies its own <!doctype>/<head>/<body> skeleton, so
   the canonical files are fragments. Opened straight off disk that puts the
   browser in quirks mode, so we also emit proper standalone documents for local
   viewing. Same bytes, valid wrapper, and a lang attribute for screen readers. */
const standalone = (title, body, extraHead = '') =>
  `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n` +
  `<meta name="viewport" content="width=device-width, initial-scale=1">\n` +
  `<title>${title}</title>\n${extraHead}</head>\n<body>\n${body}\n</body>\n</html>\n`;

// These are drafts on a public URL. Keeping them out of search protects the
// real site from competing with its own mockup.
const NOINDEX = '<meta name="robots" content="noindex, nofollow">\n';

/* ── intake sheet ────────────────────────────────────────────────────────── */
const groupsUsed = new Set(placeholders.map((p) => p.path.split('.')[0]));
const intake = renderIntake(placeholders, content, {
  count: placeholders.length,
  groups: groupsUsed.size,
});
writeFileSync(join(__dirname, 'dist/intake.html'), intake);

mkdirSync(join(__dirname, 'dist/local'), { recursive: true });
writeFileSync(join(__dirname, 'dist/local/review.html'), standalone('Skybyrd Mockup Studio', html, NOINDEX));
writeFileSync(join(__dirname, 'dist/local/intake.html'), standalone('Skybyrd Intake Sheet', intake, NOINDEX));

/* ── docs/ — what GitHub Pages serves ────────────────────────────────────────
   Pages can serve main:/docs with no build step and no Action, so enabling it
   is two clicks in Settings and every later push republishes automatically. */
const landing = standalone(
  'Skybyrd — website drafts',
  renderLanding({
    combos: architectures.length * paletteList.length,
    bands: architectures[0].bands.length,
    words: '2,100',
    open: placeholders.length,
  }),
  NOINDEX + `<style>${landingCss}</style>\n`
);
mkdirSync(join(__dirname, 'docs'), { recursive: true });
writeFileSync(join(__dirname, 'docs/index.html'), landing);
writeFileSync(join(__dirname, 'docs/review.html'), standalone('Skybyrd Mockup Studio', html, NOINDEX));
writeFileSync(join(__dirname, 'docs/intake.html'), standalone('Skybyrd Intake Sheet', intake, NOINDEX));
writeFileSync(join(__dirname, 'docs/.nojekyll'), '');

/* ── console summary ─────────────────────────────────────────────────────── */
const combos = architectures.length * paletteList.length;
console.log(`\n  SkyByrd mockups built`);
console.log(`  ${architectures.length} architectures × ${paletteList.length} palettes = ${combos} combinations (× 2 viewports)`);
console.log(`  ${architectures[0].bands.length} bands per page`);
console.log(`  ${(html.length / 1024).toFixed(0)} KB → dist/review.html`);
console.log(`  ${(intake.length / 1024).toFixed(0)} KB → dist/intake.html`);
console.log(`  standalone copies for local viewing → dist/local/`);
console.log(`  public site (GitHub Pages, noindex) → docs/index.html + review + intake`);
console.log(`  LocalBusiness + Person + FAQPage schema emitted (${schema.realFaqCount} verified Q&As)\n`);
console.log(`  ${placeholders.length} placeholders awaiting Shawna:`);
for (const p of placeholders.slice(0, 8)) console.log(`    · ${p.path}`);
if (placeholders.length > 8) console.log(`    · …and ${placeholders.length - 8} more (see the report in the canvas)`);
console.log('');
