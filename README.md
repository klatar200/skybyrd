# SkyByrd Photography — homepage mockups, round two

Twelve homepage mockups generated from one content system: **3 architectures ×
4 palettes**, each in desktop and phone views.

```bash
npm run build      # → dist/review.html + dist/intake.html
npm run check      # WCAG AA contrast check across all four palettes
```

`check` also runs before every build, so a palette that fails contrast cannot
ship. `dist/local/` holds standalone copies of both pages for opening straight
off disk; the files in `dist/` are fragments, because the publish target
supplies its own document skeleton.

**`dist/review.html`** — the mockups. Switch architecture, palette and viewport
from the control bar, toggle **Show placeholders** to highlight every invented
fact in place, or open **Needs Shawna** for the full list.

**Compare all three** puts the architectures side by side under one palette,
each with its band order above it. The highlighted chips are the bands that
move — where those sit is the entire difference between the three.

**`dist/intake.html`** — the questions for Shawna, generated from the same
placeholder data so it cannot drift from what is actually unconfirmed on the
page. Grouped by how long each takes to answer, ordered by how much it unblocks.
Readable on screen or printable.

## Why it is built this way

Round one was ten hand-drawn concepts. Measured, they came to 248 words per
homepage, five of the ten shared a single layout, and the set contradicted
itself on the founding year and carried a fake phone number. That is what
happens without a single source of truth — see [`docs/mockup-audit.md`](docs/mockup-audit.md).

Here, content and design are separate inputs:

| | |
| --- | --- |
| `src/content/` | Every word, price and figure — the only place facts live |
| `src/tokens/palettes.js` | Four skins as CSS custom properties |
| `src/sections/` | Fifteen bands, each referencing tokens only, never literal colours |
| `check.js` | Enforces the contrast contract the palettes promise |
| `src/architectures.js` | Three orderings of those bands |
| `build.js` | Renders each architecture once; palettes swap by data attribute |

The accent is deliberately two-tier: `--accent` for fills and large text
(3:1), `--accent-ink` for anything smaller (4.5:1). Sections pick the right one,
and `check.js` fails the build if a palette breaks the contract.

Three consequences worth the setup:

- **Palette is independent of layout.** "Concept 2's layout with concept 4's
  colours" is a click, not a rebuild. Twelve combinations cost three renders.
- **Facts cannot drift.** A price lives in one place and reaches all twelve
  mockups. The contradictions in round one are structurally impossible here.
- **Placeholders cannot be forgotten.** Every field is wrapped in `R()` (real,
  verified) or `P()` (placeholder, with a note). The build refuses to lose track
  of them and prints a report.

## Replacing a placeholder

Find the field, swap the wrapper, rebuild:

```js
// before
price: P('$450', 'INVENTED in concept 07. Needs Shawna’s real pricing.'),
// after
price: R('$395', 'confirmed by Shawna, Aug 2026'),
```

The marker disappears everywhere and the "Needs Shawna" count drops by one.

## Current state

- **16 bands** per page (round one averaged 6)
- **~1,680 words** per page (round one averaged 248)
- **78 placeholders** outstanding across 12 groups — listed in the canvas
  report and as questions in `dist/intake.html`

Contact details, the business name, the tagline and the service positioning are
**real**, verified against public listings. Everything else is a placeholder
pending Shawna's input.

## Photography

The mockups use CSS-drawn photo placeholders that name their subject rather than
unrelated stock. A mockup full of somebody else's photographs flatters the design
and misleads the reviewer; a labelled frame shows what belongs there. Swapping in
Shawna's real images is the next step once she picks a direction.
