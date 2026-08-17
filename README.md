# SkyByrd Photography — homepage mockups, round two

Twelve homepage mockups generated from one content system: **3 architectures ×
4 palettes**, each in desktop and phone views.

```bash
node build.js      # → dist/review.html
```

Open `dist/review.html` and use the control bar to switch architecture, palette
and viewport, or toggle **Show placeholders** to highlight every invented fact.

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
| `src/architectures.js` | Three orderings of those bands |
| `build.js` | Renders each architecture once; palettes swap by data attribute |

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
- **78 placeholders** outstanding — every one listed in the canvas report

Contact details, the business name, the tagline and the service positioning are
**real**, verified against public listings. Everything else is a placeholder
pending Shawna's input.

## Photography

The mockups use CSS-drawn photo placeholders that name their subject rather than
unrelated stock. A mockup full of somebody else's photographs flatters the design
and misleads the reviewer; a labelled frame shows what belongs there. Swapping in
Shawna's real images is the next step once she picks a direction.
