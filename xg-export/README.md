# Qualifying xG — portable export

A self-contained version of the Mundial '26 Qualifying xG section, ready to drop into another React/TypeScript project (e.g. SteamWatch).

## Files

| File | Purpose |
|---|---|
| `qualifying-xg.tsx` | The component. Inlined helpers (Flag, atoms, types). Imports the data file alongside. |
| `qualifying-xg.data.ts` | All Wyscout-sourced per-team match data. ~900 lines, no UI dependencies. |
| `README.md` | This file. |

**Total dependency footprint:** React (already in your project). No other packages.

## Drop-in steps (SteamWatch / SharpCheck)

1. Copy both `.ts` / `.tsx` files into your SharpCheck project, e.g.:
   ```
   src/app/tools/qualifying-xg/
     ├── qualifying-xg.tsx
     └── qualifying-xg.data.ts
   ```

2. In your route / page file:
   ```tsx
   'use client';
   import { QualifyingXg } from './qualifying-xg';

   export default function Page() {
     return (
       <main className="min-h-screen bg-stone-950 px-6 py-10">
         <QualifyingXg />
       </main>
     );
   }
   ```

3. Done. It will render with sensible dark-theme defaults out of the box (all colors are CSS variables with hex fallbacks).

## Optional — theming

The component reads these CSS custom properties if defined. To match SharpCheck's existing palette, set them in your global stylesheet (`globals.css` or similar):

```css
:root {
  --color-bg:         #0b0d10;
  --color-bg-2:       #0e1114;
  --color-surface:    #141719;
  --color-surface-2:  #1a1d20;
  --color-surface-3:  #1f2226;
  --color-border:     #2a2d31;
  --color-border-2:   #3a3d41;
  --color-text:       #e8e6e3;
  --color-text-2:     #c2c0bd;
  --color-text-3:     #8c8a87;
  --color-text-4:     #6e6c6a;
  --color-gold:       #e8b94a;
  --color-green:      #5ec88a;
  --color-red:        #dc5050;
  --font-sans:        'Inter', system-ui, sans-serif;
  --font-mono:        'JetBrains Mono', ui-monospace, monospace;
}
```

You can change any of these to match SteamWatch's existing theme — the component will pick them up automatically.

## API

```tsx
<QualifyingXg />                           // confederation tabs + team picker + full UI
<QualifyingXg team="Argentina" />          // pre-selects a team
<QualifyingXg team="Argentina" hideTeamPicker />  // single-team view, no picker
```

## Adding more teams

When you load new Wyscout exports, append them to the `QUAL_XG` array in `qualifying-xg.data.ts`. The shape per match:

```ts
{
  date: 'YYYY-MM-DD',
  opponent: 'Team Name',     // must match a nation key (see below for confederation map)
  venue: 'H' | 'A',
  gf: number, ga: number,
  xg: number, xga: number,
  shots: number, shotsOn: number,
  oppShots: number, oppShotsOn: number,
}
```

If you add a team whose nation isn't already in the confederation lookup, also add an entry to the `NATION_CONFEDERATION` map at the top of `qualifying-xg.tsx`. Same for `FLAG_CODES` (uses [flagcdn.com](https://flagcdn.com/) — same ISO 2-letter codes).

## Data freshness

The data was captured **2026-05-02** from Wyscout. To refresh, you have two options:

1. Pull fresh xG numbers and update `qualifying-xg.data.ts` directly
2. Or move data fetching server-side in SteamWatch (e.g. Supabase) and pass `QUAL_XG` in as a prop

Source: https://www.wyscout.com/

## What's included visually

- Confederation tabs (CONMEBOL / UEFA / CAF / AFC / CONCACAF / OFC) with team counts
- Team selector buttons (filtered by active confederation)
- Per-team summary card: Attacking xG/match, Goals/match, Conversion %, Δ Finishing with tier badge
- Per-team summary card: Defending xGA/match, GA/match, Clean sheets, Δ Defending with tier badge
- Match table with date, opponent, H/A, score, xG, xGA
- "xG dominance bar" — bidirectional sparkline visualising xG - xGA per match
- Optional `note` field per team (renders as a red caveat banner)

## License / attribution

Source data is Neil's Wyscout subscription extract; the component is project-internal code transplanted from Mundial '26. Internal use only — credit Wyscout when displaying the data publicly.
