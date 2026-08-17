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

import { business, serviceArea, locations } from './src/content/business.js';
import { sessions, deliverables, products } from './src/content/sessions.js';
import { testimonials } from './src/content/social-proof.js';
import { shawna, process as processSteps, faq, rightNow } from './src/content/experience.js';
import { voices } from './src/content/voice.js';
import { collectPlaceholders } from './src/content/_placeholder.js';
import { palettes, paletteList, paletteCss } from './src/tokens/palettes.js';
import { architectures } from './src/architectures.js';
import { sections } from './src/sections/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(__dirname, p), 'utf8');

const content = {
  business, serviceArea, locations, sessions, deliverables, products,
  testimonials, shawna, process: processSteps, faq, rightNow,
};

/* ── render one architecture ─────────────────────────────────────────────── */
function renderArchitecture(arch) {
  const voice = voices[arch.id];
  return arch.bands
    .map((band) => {
      const fn = sections[band];
      if (!fn) throw new Error(`Unknown band "${band}" in architecture "${arch.id}"`);
      if (band === 'hero') return fn(content, voice, { variant: arch.heroVariant });
      return fn(content, voice);
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

const pages = architectures
  .map((a) => `<div class="page page-body" data-arch="${a.id}"${a.id === architectures[0].id ? '' : ' hidden'}>${renderArchitecture(a)}</div>`)
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

const html = `<title>SkyByrd Mockup Studio</title>
<style>
${chromeCss}
${pageCss}
${paletteBlocks}
</style>

<div class="chrome">
  <div class="chrome-bar">
    <div class="ch-brand">
      <span class="ch-dot"></span>
      <div><strong>SkyByrd</strong><span>Mockup studio · round two</span></div>
    </div>

    <div class="ch-group">
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
      </div>
    </div>

    <div class="ch-group ch-toggles">
      <label class="tog"><input type="checkbox" id="phToggle"><span>Show placeholders</span></label>
      <button class="ch-link" id="openReport" type="button">Needs Shawna (${placeholders.length})</button>
    </div>
  </div>

  <div class="chrome-notes">${archNotes}</div>
</div>

<div class="stage">
  <div class="frame" id="frame" data-palette="${paletteList[0].id}">
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
    frame.setAttribute('data-palette', state.palette);
    frame.classList.toggle('frame-mobile', state.frame === 'mobile');
    document.querySelectorAll('.page-body').forEach(function (el) {
      el.hidden = el.getAttribute('data-arch') !== state.arch;
    });
    document.querySelectorAll('.arch-note').forEach(function (el) {
      el.hidden = el.getAttribute('data-arch') !== state.arch;
    });
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

/* ── console summary ─────────────────────────────────────────────────────── */
const combos = architectures.length * paletteList.length;
console.log(`\n  SkyByrd mockups built`);
console.log(`  ${architectures.length} architectures × ${paletteList.length} palettes = ${combos} combinations (× 2 viewports)`);
console.log(`  ${architectures[0].bands.length} bands per page`);
console.log(`  ${(html.length / 1024).toFixed(0)} KB → dist/review.html\n`);
console.log(`  ${placeholders.length} placeholders awaiting Shawna:`);
for (const p of placeholders.slice(0, 8)) console.log(`    · ${p.path}`);
if (placeholders.length > 8) console.log(`    · …and ${placeholders.length - 8} more (see the report in the canvas)`);
console.log('');
