// Generates the intake sheet from the SAME placeholder data the mockups use, so
// the questions can never drift from what is actually unconfirmed on the page.
// Answering a row here is one edit in src/content/ that reaches all twelve
// mockups at once.

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const EFFORT = {
  quick:  { label: 'Five minutes',      note: 'You already know these — just write them down.' },
  think:  { label: 'Needs a think',     note: 'Worth sitting with for ten minutes.' },
  gather: { label: 'Needs looking up',  note: 'You may need a supplier, or a look at your reviews.' },
  review: { label: 'Just check it',     note: 'We drafted these. Tell us what is wrong.' },
};

// Ordered by what unblocks the most. Pricing first — it is the single most
// commonly asked question and the placeholder most likely to be misread.
const GROUPS = [
  { key: 'sessions', title: 'Your sessions and pricing', effort: 'quick',
    intro: 'The longest group, but most of it you can answer without thinking — durations, group sizes, image counts. The four prices are the ones that matter most: every figure currently on the page was invented, and price is the first thing your visitors look for. If a number is not settled yet, “starts at” is fine. Hiding price altogether costs more enquiries than a rough figure does.' },
  { key: 'shawna', title: 'About you', effort: 'think',
    intro: 'This block matters more than anything else on the page — people hire a person, not a studio. We drafted something from your public bio, but it should be in your words. A photograph of you is the single most valuable missing asset on the whole site.' },
  { key: 'business', title: 'The business facts', effort: 'quick',
    intro: 'Contact details are already correct and verified. These are the numbers around them. Note the first question — the earlier mockups contradicted themselves on this.' },
  { key: 'deliverables', title: 'What clients get', effort: 'quick',
    intro: 'What the money actually buys. This was almost entirely missing from the first round, and it is one of the most reassuring things you can put on the page.' },
  { key: 'rightNow', title: 'Availability and seasons', effort: 'quick',
    intro: 'Portrait work runs on deadlines and the site should use them. Only put a specific number of remaining slots on the page if it is genuinely true.' },
  { key: 'serviceArea', title: 'Where you work', effort: 'quick',
    intro: 'The biggest change from the first round. Every earlier mockup said “Plainfield” and stopped, which means nobody searching in Naperville or Joliet would ever find you.' },
  { key: 'locations', title: 'Your favourite places to shoot', effort: 'think',
    intro: 'Named places are more persuasive than adjectives — they help people picture their own session, and they bring in searches nobody else is competing for. Four to six real ones is plenty.' },
  { key: 'process', title: 'How a session goes', effort: 'review',
    intro: 'Drafted from your own descriptions in the earlier round. This was the best writing in the whole set, so we kept it — but check the timings are right.' },
  { key: 'faq', title: 'Common questions', effort: 'review',
    intro: 'Ten questions drafted from what people usually ask. This block quietly does more work than any other: it removes the hesitation that stops bookings, and it is what Google and AI assistants quote back to people. Correct any answer that is not how you actually work.' },
  { key: 'testimonials', title: 'Reviews', effort: 'gather',
    intro: 'You have real reviews on Google, Facebook and Yelp, and the mockups are currently running invented ones instead. Real ones with a platform badge are worth several times a nice anonymous quote.' },
  { key: 'products', title: 'Prints and products', effort: 'gather',
    intro: 'Entirely invented, because we do not know what you sell. This is usually where studio revenue per client comes from, so it is worth filling in even roughly.' },
  { key: 'voice', title: 'Headlines and wording', effort: 'review',
    intro: 'Lowest priority — read these once you have picked a direction. Each of the three layouts has its own voice, so you can choose how the site sounds separately from how it looks.' },
];

const prettify = (seg) =>
  seg.replace(/([A-Z])/g, ' $1').replace(/^./, (m) => m.toUpperCase()).trim();

/** Turn `sessions.0.price` into `Family · Price`. */
function label(path, content) {
  const parts = path.split('.');
  if (parts[0] === 'sessions' && /^\d+$/.test(parts[1])) {
    const s = content.sessions[Number(parts[1])];
    const name = s && s.name ? s.name.value : `Session ${parts[1]}`;
    return `${name} · ${prettify(parts.slice(2).join(' '))}`;
  }
  if (parts[0] === 'voice' && parts.length > 2) {
    return `${prettify(parts[1])} · ${prettify(parts.slice(2).join(' '))}`;
  }
  return parts.slice(1).map(prettify).join(' · ') || prettify(parts[0]);
}

function renderValue(val) {
  if (Array.isArray(val)) {
    if (val.length && typeof val[0] === 'object' && val[0] !== null) {
      return `<ol class="v-list">${val
        .map((o) => {
          const head = o.q || o.name || o.title || o.stat || o.quote || '';
          const body = o.a || o.blurb || o.body || o.detail || o.from || '';
          return `<li><strong>${esc(head)}</strong>${body ? `<span>${esc(body)}</span>` : ''}</li>`;
        })
        .join('')}</ol>`;
    }
    return `<p class="v-plain">${esc(val.join(' · '))}</p>`;
  }
  if (val === null) return `<p class="v-plain v-none">— nothing yet —</p>`;
  if (typeof val === 'boolean') return `<p class="v-plain">${val ? 'Yes' : 'No'}</p>`;
  return `<p class="v-plain">${esc(String(val))}</p>`;
}

export function renderIntake(placeholders, content, meta) {
  const byGroup = new Map(GROUPS.map((g) => [g.key, []]));
  const orphans = [];
  for (const p of placeholders) {
    const root = p.path.split('.')[0];
    if (byGroup.has(root)) byGroup.get(root).push(p);
    else orphans.push(p);
  }

  const groupHtml = GROUPS.filter((g) => byGroup.get(g.key).length)
    .map((g, gi) => {
      const rows = byGroup
        .get(g.key)
        .map(
          (p) => `<div class="row">
        <div class="row-q">
          <h4>${esc(label(p.path, content))}</h4>
          ${p.note ? `<p class="ask">${esc(p.note)}</p>` : ''}
          <code>${esc(p.path)}</code>
        </div>
        <div class="row-a">
          <p class="assumed-l">We currently show</p>
          <div class="assumed">${renderValue(p.value)}</div>
          <p class="answer-l">Correct or confirm</p>
          <div class="answer"></div>
        </div>
      </div>`
        )
        .join('');
      return `<section class="group">
      <div class="group-head">
        <div class="group-n">${String(gi + 1).padStart(2, '0')}</div>
        <div class="group-title">
          <h2>${esc(g.title)}</h2>
          <div class="badges">
            <span class="badge badge-${g.effort}">${esc(EFFORT[g.effort].label)}</span>
            <span class="count">${byGroup.get(g.key).length} ${byGroup.get(g.key).length === 1 ? 'item' : 'items'}</span>
          </div>
        </div>
      </div>
      <p class="group-intro">${esc(g.intro)}</p>
      <div class="rows">${rows}</div>
    </section>`;
    })
    .join('');

  const orphanHtml = orphans.length
    ? `<section class="group"><div class="group-head"><div class="group-n">··</div>
        <div class="group-title"><h2>Everything else</h2></div></div>
      <div class="rows">${orphans
        .map((p) => `<div class="row"><div class="row-q"><h4>${esc(label(p.path, content))}</h4><code>${esc(p.path)}</code></div>
        <div class="row-a"><p class="assumed-l">We currently show</p><div class="assumed">${renderValue(p.value)}</div>
        <p class="answer-l">Correct or confirm</p><div class="answer"></div></div></div>`)
        .join('')}</div></section>`
    : '';

  const tally = GROUPS.filter((g) => byGroup.get(g.key).length)
    .map((g) => `<li><span class="t-dot t-${g.effort}"></span>${esc(g.title)}<b>${byGroup.get(g.key).length}</b></li>`)
    .join('');

  return `<title>SkyByrd Intake Sheet</title>
<style>
:root{
  --paper:#FBF8F3; --card:#FFFFFF; --ink:#241F19; --ink2:#4A4239; --muted:#8A7F70;
  --rule:#E4DCCF; --rule2:#CFC4B2; --accent:#B0722F; --accent-soft:#F5EADB;
  --quick:#4A7C59; --think:#B0722F; --gather:#8C5A7D; --review:#5B7590;
  --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;
  --sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--paper);color:var(--ink);font-family:var(--sans);font-size:15.5px;line-height:1.6;-webkit-font-smoothing:antialiased;padding:0 20px 90px}
.wrap{max-width:940px;margin:0 auto}
h1,h2,h3{font-family:var(--serif);font-weight:600;letter-spacing:-.012em;text-wrap:balance}
a{color:var(--accent)}

header.top{padding:60px 0 34px;border-bottom:2px solid var(--ink);display:flex;flex-direction:column;gap:18px}
.kicker{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
h1{font-size:clamp(32px,5vw,48px);line-height:1.05}
.lede{font-size:18px;color:var(--ink2);max-width:62ch;line-height:1.65}

.summary{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:34px;padding:30px 0;border-bottom:1px solid var(--rule);margin-bottom:8px}
.summary h3{font-size:17px;margin-bottom:10px}
.summary p{font-size:15px;color:var(--ink2);max-width:52ch}
.tally{list-style:none;display:flex;flex-direction:column;gap:7px;font-size:14px}
.tally li{display:flex;align-items:center;gap:9px;color:var(--ink2)}
.tally b{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--ink);font-family:var(--mono);font-size:13px}
.t-dot{width:8px;height:8px;border-radius:50%;flex:none}
.t-quick{background:var(--quick)}.t-think{background:var(--think)}.t-gather{background:var(--gather)}.t-review{background:var(--review)}

.group{margin-top:56px;page-break-inside:auto}
.group-head{display:flex;gap:16px;align-items:baseline;border-top:1px solid var(--ink);padding-top:16px}
.group-n{font-family:var(--mono);font-size:13px;color:var(--muted);padding-top:5px}
.group-title{display:flex;flex-direction:column;gap:7px;flex:1}
.group-title h2{font-size:clamp(21px,2.6vw,27px)}
.badges{display:flex;gap:9px;align-items:center;flex-wrap:wrap}
.badge{font-family:var(--mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;padding:3px 8px;border-radius:2px;color:#fff}
.badge-quick{background:var(--quick)}.badge-think{background:var(--think)}
.badge-gather{background:var(--gather)}.badge-review{background:var(--review)}
.count{font-family:var(--mono);font-size:11px;color:var(--muted)}
.group-intro{margin:14px 0 22px;color:var(--ink2);max-width:66ch;font-size:15.5px}

.rows{display:flex;flex-direction:column;gap:14px}
.row{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);gap:26px;background:var(--card);border:1px solid var(--rule);border-radius:3px;padding:20px 22px;page-break-inside:avoid}
.row-q{display:flex;flex-direction:column;gap:7px}
.row-q h4{font-size:16px;font-weight:700;letter-spacing:0;font-family:var(--sans)}
.ask{font-size:14px;color:var(--ink2);line-height:1.55}
.row-q code{font-family:var(--mono);font-size:10.5px;color:var(--muted);margin-top:auto;padding-top:6px}
.row-a{display:flex;flex-direction:column;gap:6px}
.assumed-l,.answer-l{font-family:var(--mono);font-size:9.5px;letter-spacing:.11em;text-transform:uppercase;color:var(--muted)}
.answer-l{margin-top:12px;color:var(--accent)}
.assumed{background:var(--accent-soft);border-left:2px solid var(--accent);padding:10px 13px;border-radius:2px}
.v-plain{font-size:14.5px;color:var(--ink2)}
.v-none{font-style:italic;color:var(--muted)}
.v-list{margin:0;padding-left:19px;display:flex;flex-direction:column;gap:7px;font-size:14px}
.v-list li{color:var(--ink2)}
.v-list strong{display:block;color:var(--ink);font-weight:650}
.v-list span{display:block;color:var(--muted);font-size:13.5px;line-height:1.5}
.answer{min-height:66px;border:1px dashed var(--rule2);border-radius:2px;background:repeating-linear-gradient(transparent 0 27px,var(--rule) 27px 28px)}

footer.end{margin-top:70px;padding-top:22px;border-top:1px solid var(--rule);font-size:13.5px;color:var(--muted);line-height:1.7}
footer.end b{color:var(--ink2)}

@media(max-width:760px){.summary,.row{grid-template-columns:1fr}}
@media print{
  body{background:#fff;padding:0;font-size:11pt}
  .row{border-color:#bbb;break-inside:avoid}
  .answer{min-height:60px}
  header.top{padding-top:0}
  .group{margin-top:34px}
}
</style>

<div class="wrap">
<header class="top">
  <p class="kicker">SkyByrd Photography · website round two</p>
  <h1>What we need from you, Shawna</h1>
  <p class="lede">The mockups are built and they work — but ${meta.count} details in them are our best guess rather than your actual business. This sheet lists every one, grouped by how long it takes to answer. Print it and write on it, or reply to any of it by email; either is fine.</p>
</header>

<div class="summary">
  <div>
    <h3>How to use this</h3>
    <p>Start at the top — the groups are ordered by how much they unblock. <strong>Pricing first</strong>, because every figure currently on the page was invented and it is the first thing your visitors will look for.</p>
    <p style="margin-top:12px">You do not need to answer everything before we go further. The first three groups alone would make the mockups honest enough to show anyone.</p>
    <p style="margin-top:12px">Contact details, your business name, your tagline and your service positioning are <strong>already correct</strong> — we verified those, and they are not in this list.</p>
  </div>
  <div>
    <h3>What is in here</h3>
    <ul class="tally">${tally}</ul>
  </div>
</div>

${groupHtml}
${orphanHtml}

<footer class="end">
  <p><b>${meta.count} items across ${meta.groups} groups.</b> Generated from the same content files that build the mockups, so this sheet cannot drift out of step with what is actually on the page.</p>
  <p style="margin-top:8px">Each answer is a single edit that updates all twelve mockups at once — three layouts, four colour schemes, desktop and phone.</p>
</footer>
</div>
`;
}

export { GROUPS };
