# Mundial '26 — portable data exports

Self-contained data + UI exports from the Mundial '26 project, ready to drop into another React/TypeScript project (e.g. SteamWatch).

## Files

| File | Purpose | Lines |
|---|---|---:|
| `qualifying-xg.tsx` | React component with conf tabs, team picker, summary cards, match table. Inlined helpers (Flag, atoms, types). | 666 |
| `qualifying-xg.data.ts` | All Wyscout-sourced per-team xG match data + types + aggregate(). | 908 |
| `groups.data.ts` | All 48 qualifiers across 12 groups (A–L). FIFA codes, ISO flag codes, helpers (`bracketTeamsByGroup`, `bracketTeamByCode`, `fifaCodeForNation`, `flagUrl`). | 126 |
| `venues.data.ts` | All 16 host venues — country, lat/lng, altitude, June climate, roof type. | 35 |
| `fixtures.data.ts` | All 104 World Cup 2026 matches (group + knockouts), fixture timing, venue, derived stage/group. Inlined JSON, no external deps. | 290 |
| `README.md` | This file. |

**Total dependency footprint:** React only (already in your project) for the .tsx component. The four `.data.ts` files are pure data + helpers with zero imports.

## Drop-in steps (SteamWatch / SharpCheck)

1. Copy the files you want into your SharpCheck project, e.g.:
   ```
   src/app/tools/wc-2026/
     ├── qualifying-xg.tsx        # only needed if you want the xG UI
     ├── qualifying-xg.data.ts    # xG data + aggregate()
     ├── groups.data.ts           # 48 teams across 12 groups
     ├── venues.data.ts           # 16 host venues
     └── fixtures.data.ts         # 104 matches with derived stage/group
   ```

   Each `.data.ts` file is independent — you can take just one, just two, or all five.

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

## groups.data.ts API

```ts
import {
  BRACKET_TEAMS,        // all 48 teams: { name, code, flag, group }
  BRACKET_GROUPS,       // ['A','B','C','D','E','F','G','H','I','J','K','L']
  bracketTeamsByGroup,  // (group: string) => BracketTeam[]
  bracketTeamByCode,    // (code: string) => BracketTeam | undefined  (FIFA 3-letter code)
  fifaCodeForNation,    // (name: string) => string | null  (handles aliases like 'Türkiye' → TUR)
  flagUrl,              // (flag: string, width?: 20|40|80|160) => string | null  (flagcdn.com URL)
} from './groups.data';

// Example: list all of Group C
bracketTeamsByGroup('C');
// → [{ name:'Brazil', code:'BRA', flag:'br', group:'C' }, ...]

// Example: build a flag image src for England
flagUrl('gb-eng', 40);  // → 'https://flagcdn.com/w40/gb-eng.png'
```

## venues.data.ts API

```ts
import { VENUES, type Venue } from './venues.data';

VENUES.length;                                    // 16
VENUES.filter(v => v.country === 'Mexico');       // 3 Mexican venues
VENUES.filter(v => v.altitudeM >= 1000);          // altitude venues
VENUES.filter(v => v.juneAvgHighC >= 32);         // hottest venues
```

Each `Venue` has: `city`, `stadium`, `country` ('USA' | 'Mexico' | 'Canada'), `lat`, `lng`, `altitudeM`, `juneAvgHighC`, `juneAvgHumidity`, `roof` ('open' | 'closed' | 'retractable'), optional `notes`.

## fixtures.data.ts API

```ts
import {
  MATCHES,              // FixtureMatch[] — all 104 matches in fixture order
  GROUPS,               // Record<'A'..'L', string[]>  (4 teams per group)
  GROUP_KEYS,           // ['A','B','C','D','E','F','G','H','I','J','K','L']
  matchesForGroup,      // (group: 'A'..'L') => FixtureMatch[]
  canonicalNation,      // (wikiName: string) => string  (e.g. 'Czech Republic' → 'Czechia')
  STAGE_LABEL,          // { GROUP: 'Group stage', R32: 'Round of 32', ... }
  STAGE_SHORT,          // { GROUP: 'GS', R32: 'R32', ... }
  FIXTURES_SOURCE,      // { url, asOf }
} from './fixtures.data';

// Each FixtureMatch has:
//   no:        1..104
//   date:      "June 11, 2026"
//   iso:       "2026-06-11"
//   kickoff:   "1:00 p.m."
//   utc:       "-6"
//   home, away: canonical nation names OR placeholders ("Winner Group A")
//   homeIsTeam, awayIsTeam: true once group stage resolves
//   stadium, city, venueRaw
//   stage:     'GROUP'|'R32'|'R16'|'QF'|'SF'|'3RD'|'FINAL'
//   group:     'A'..'L' | null  (null for knockout matches)

// Examples
matchesForGroup('C').length;                        // 6 (4-team round-robin = C(4,2))
MATCHES.filter(m => m.stage === 'R32').length;      // 16
MATCHES.filter(m => m.stage === 'FINAL')[0];        // the final at MetLife
```

## License / attribution

Source data is Neil's Wyscout subscription extract (xG only); group/fixture/venue data is from Wikipedia (CC-BY-SA). The component is project-internal code transplanted from Mundial '26. Credit Wyscout + Wikipedia when displaying the data publicly.
