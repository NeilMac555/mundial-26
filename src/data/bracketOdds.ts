// Live + static odds for the bracket simulator's Results step.
//
// • Outrights come live from The Odds API via `npm run fetch-odds` (median +
//   best price across 9 bookmakers, written to `oddsLive.json`).
// • Group-winner odds + a static fallback for outrights stay below as a
//   2026-04-14 Pinnacle snapshot — covers any team the live feed drops.

import oddsLive from './oddsLive.json';

export interface BracketOdds {
  code: string;
  /** Fractional string for display — derived from live decimal when available, else from static snapshot. */
  outrightOdds: string;
  /** Decimal price (median across bookmakers when live; converted from fractional when static). */
  outrightDecimal: number;
  /** Best (longest) decimal price across bookmakers — only set when live. */
  outrightBest?: number;
  /** Number of bookmakers reporting — only set when live. */
  outrightSamples?: number;
  /** 'live' = from oddsLive.json, 'static' = from the April 14 Pinnacle snapshot below. */
  outrightSource: 'live' | 'static';
  /** Group-winner fractional — always from static (Odds API doesn't ship group-winner markets). */
  groupWinnerOdds: string;
}

interface LiveOutrightTeam {
  code: string | null;
  name: string;
  best: number;
  median: number;
  samples: number;
  bookmakers: string[];
}
interface OddsLiveFile {
  generatedAt: string;
  outrights: { teams: LiveOutrightTeam[]; asOf: string };
}

const live = oddsLive as OddsLiveFile;
export const ODDS_LIVE_AS_OF = live.generatedAt;

const LIVE_BY_CODE: Map<string, LiveOutrightTeam> = (() => {
  const m = new Map<string, LiveOutrightTeam>();
  for (const t of live.outrights.teams) {
    if (t.code) m.set(t.code, t);
  }
  return m;
})();

// April 14 Pinnacle snapshot — fallback for any team the live feed drops, plus
// the only source for `groupWinnerOdds`. Smaller shape than `BracketOdds`
// because it doesn't carry decimal/best/samples/source — those are added by
// `getBracketOdds()` when the static is used.
interface BracketOddsStaticEntry {
  code: string;
  outrightOdds: string;
  groupWinnerOdds: string;
}
const BRACKET_ODDS_STATIC: Record<string, BracketOddsStaticEntry> = {
  // Group A
  MEX: { code: "MEX", outrightOdds: "66/1",   groupWinnerOdds: "Evens" },
  RSA: { code: "RSA", outrightOdds: "1000/1", groupWinnerOdds: "12/1" },
  KOR: { code: "KOR", outrightOdds: "400/1",  groupWinnerOdds: "4/1" },
  CZE: { code: "CZE", outrightOdds: "300/1",  groupWinnerOdds: "5/2" },

  // Group B
  CAN: { code: "CAN", outrightOdds: "150/1",  groupWinnerOdds: "3/1" },
  BIH: { code: "BIH", outrightOdds: "250/1",  groupWinnerOdds: "5/1" },
  QAT: { code: "QAT", outrightOdds: "1000/1", groupWinnerOdds: "16/1" },
  SUI: { code: "SUI", outrightOdds: "80/1",   groupWinnerOdds: "8/11" },

  // Group C
  BRA: { code: "BRA", outrightOdds: "17/2",   groupWinnerOdds: "1/3" },
  MAR: { code: "MAR", outrightOdds: "50/1",   groupWinnerOdds: "5/2" },
  HAI: { code: "HAI", outrightOdds: "5000/1", groupWinnerOdds: "100/1" },
  SCO: { code: "SCO", outrightOdds: "250/1",  groupWinnerOdds: "12/1" },

  // Group D
  USA: { code: "USA", outrightOdds: "66/1",   groupWinnerOdds: "Evens" },
  PAR: { code: "PAR", outrightOdds: "200/1",  groupWinnerOdds: "3/1" },
  AUS: { code: "AUS", outrightOdds: "500/1",  groupWinnerOdds: "15/2" },
  TUR: { code: "TUR", outrightOdds: "100/1",  groupWinnerOdds: "6/4" },

  // Group E
  GER: { code: "GER", outrightOdds: "16/1",   groupWinnerOdds: "2/7" },
  CUR: { code: "CUR", outrightOdds: "5000/1", groupWinnerOdds: "150/1" },
  CIV: { code: "CIV", outrightOdds: "400/1",  groupWinnerOdds: "6/1" },
  ECU: { code: "ECU", outrightOdds: "80/1",   groupWinnerOdds: "7/2" },

  // Group F
  NED: { code: "NED", outrightOdds: "25/1",   groupWinnerOdds: "8/11" },
  JPN: { code: "JPN", outrightOdds: "50/1",   groupWinnerOdds: "6/4" },
  SWE: { code: "SWE", outrightOdds: "100/1",  groupWinnerOdds: "4/1" },
  TUN: { code: "TUN", outrightOdds: "500/1",  groupWinnerOdds: "16/1" },

  // Group G
  BEL: { code: "BEL", outrightOdds: "40/1",   groupWinnerOdds: "1/3" },
  EGY: { code: "EGY", outrightOdds: "300/1",  groupWinnerOdds: "9/2" },
  IRN: { code: "IRN", outrightOdds: "750/1",  groupWinnerOdds: "14/1" },
  NZL: { code: "NZL", outrightOdds: "1500/1", groupWinnerOdds: "33/1" },

  // Group H
  ESP: { code: "ESP", outrightOdds: "9/2",    groupWinnerOdds: "1/3" },
  CPV: { code: "CPV", outrightOdds: "2000/1", groupWinnerOdds: "66/1" },
  KSA: { code: "KSA", outrightOdds: "1000/1", groupWinnerOdds: "25/1" },
  URU: { code: "URU", outrightOdds: "66/1",   groupWinnerOdds: "3/1" },

  // Group I
  FRA: { code: "FRA", outrightOdds: "5/1",    groupWinnerOdds: "8/15" },
  SEN: { code: "SEN", outrightOdds: "100/1",  groupWinnerOdds: "12/1" },
  IRQ: { code: "IRQ", outrightOdds: "1000/1", groupWinnerOdds: "100/1" },
  NOR: { code: "NOR", outrightOdds: "30/1",   groupWinnerOdds: "7/4" },

  // Group J
  ARG: { code: "ARG", outrightOdds: "9/1",    groupWinnerOdds: "1/3" },
  ALG: { code: "ALG", outrightOdds: "400/1",  groupWinnerOdds: "10/1" },
  AUT: { code: "AUT", outrightOdds: "150/1",  groupWinnerOdds: "9/2" },
  JOR: { code: "JOR", outrightOdds: "2500/1", groupWinnerOdds: "80/1" },

  // Group K
  POR: { code: "POR", outrightOdds: "11/1",   groupWinnerOdds: "8/11" },
  COD: { code: "COD", outrightOdds: "750/1",  groupWinnerOdds: "20/1" },
  UZB: { code: "UZB", outrightOdds: "2000/1", groupWinnerOdds: "66/1" },
  COL: { code: "COL", outrightOdds: "40/1",   groupWinnerOdds: "7/4" },

  // Group L
  ENG: { code: "ENG", outrightOdds: "7/1",    groupWinnerOdds: "4/9" },
  CRO: { code: "CRO", outrightOdds: "100/1",  groupWinnerOdds: "11/4" },
  GHA: { code: "GHA", outrightOdds: "400/1",  groupWinnerOdds: "12/1" },
  PAN: { code: "PAN", outrightOdds: "1500/1", groupWinnerOdds: "50/1" },
};

export const BRACKET_ODDS_AS_OF = "2026-04-14";

/**
 * Fetch outright + group-winner odds for a team.
 *
 * Outright price prefers the live feed in `oddsLive.json` (median across 9
 * bookmakers). Falls back to the April 14 static snapshot if the live feed
 * doesn't have the team. Group-winner price is always from the static snapshot
 * because The Odds API doesn't expose group-winner markets.
 */
export function getBracketOdds(code: string): BracketOdds | undefined {
  const staticEntry = BRACKET_ODDS_STATIC[code];
  const liveEntry = LIVE_BY_CODE.get(code);

  if (liveEntry) {
    return {
      code,
      outrightOdds: decimalToFractional(liveEntry.median),
      outrightDecimal: liveEntry.median,
      outrightBest: liveEntry.best,
      outrightSamples: liveEntry.samples,
      outrightSource: 'live',
      groupWinnerOdds: staticEntry?.groupWinnerOdds ?? '—',
    };
  }
  if (staticEntry) {
    return {
      code,
      outrightOdds: staticEntry.outrightOdds,
      outrightDecimal: oddsToDecimal(staticEntry.outrightOdds),
      outrightSource: 'static',
      groupWinnerOdds: staticEntry.groupWinnerOdds,
    };
  }
  return undefined;
}

/** Convert fractional/Evens to decimal probability-friendly form. */
export function oddsToDecimal(odds: string): number {
  if (odds === "Evens") return 2.0;
  const [num, den] = odds.split("/").map((s) => parseInt(s, 10));
  if (!num || !den) return NaN;
  return num / den + 1;
}

/** Convert decimal back to a tidy fractional string for display.
 * Snaps to the bookmaker grid (10/1, 9/1, …, 6/4, 5/4, 11/10, Evens, 4/5, …) so
 * the live "5.62" doesn't render as "231/50". */
export function decimalToFractional(decimal: number): string {
  if (!isFinite(decimal) || decimal <= 1) return '—';
  if (Math.abs(decimal - 2) < 0.05) return 'Evens';

  const offset = decimal - 1;
  // Standard bookmaker fractional grid + a few common in-betweens.
  const grid: Array<[number, string]> = [
    [0.10, '1/10'], [0.20, '1/5'], [0.25, '1/4'], [0.33, '1/3'],
    [0.36, '4/11'], [0.40, '2/5'], [0.44, '4/9'], [0.50, '1/2'],
    [0.57, '4/7'], [0.62, '8/13'], [0.66, '4/6'], [0.72, '8/11'],
    [0.80, '4/5'], [0.83, '5/6'], [0.91, '10/11'], [1.00, 'Evens'],
    [1.10, '11/10'], [1.20, '6/5'], [1.25, '5/4'], [1.33, '11/8'],
    [1.40, '7/5'], [1.50, '6/4'], [1.62, '13/8'], [1.75, '7/4'],
    [1.85, '15/8'], [2.00, '2/1'], [2.20, '11/5'], [2.25, '9/4'],
    [2.37, '19/8'], [2.50, '5/2'], [2.75, '11/4'], [3.00, '3/1'],
    [3.25, '13/4'], [3.50, '7/2'], [4.00, '4/1'], [4.50, '9/2'],
    [5.00, '5/1'], [5.50, '11/2'], [6.00, '6/1'], [6.50, '13/2'],
    [7.00, '7/1'], [7.50, '15/2'], [8.00, '8/1'], [9.00, '9/1'],
    [10.00, '10/1'], [11.00, '11/1'], [12.00, '12/1'], [14.00, '14/1'],
    [16.00, '16/1'], [18.00, '18/1'], [20.00, '20/1'], [25.00, '25/1'],
    [28.00, '28/1'], [33.00, '33/1'], [40.00, '40/1'], [50.00, '50/1'],
    [66.00, '66/1'], [80.00, '80/1'], [100.00, '100/1'],
  ];
  // Find the closest grid value
  let best = grid[0];
  let bestDist = Math.abs(offset - best[0]);
  for (const g of grid) {
    const d = Math.abs(offset - g[0]);
    if (d < bestDist) { best = g; bestDist = d; }
  }
  return best[1];
}

/** Decimal odds ≥ 3.0 = a price the market thinks is well against your pick — flag as "value play". */
export function isValuePlay(odds: string): boolean {
  return oddsToDecimal(odds) >= 3.0;
}
