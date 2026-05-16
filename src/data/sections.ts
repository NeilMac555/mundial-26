export type SectionGroup = 'Performance' | 'Conditions' | 'Markets' | 'Reference';

export interface SectionMeta {
  id: string;
  title: string;
  /** Short label for tight nav contexts — defaults to `title` when omitted. */
  navLabel?: string;
  blurb: string;
  /** Long-form lede shown under the page H1 — paragraph-length. */
  lede?: string;
  group: SectionGroup;
  status: 'live' | 'stub';
}

// Order matches the Mundial Terminal sidebar layout: Performance → Conditions → Markets → Reference.
export const SECTIONS: SectionMeta[] = [
  // ── PERFORMANCE ──────────────────────────────────────────
  {
    id: 'overview', group: 'Performance',
    title: 'Tournament Overview',
    blurb: 'Host cities, venues, climate, altitude.',
    lede: 'High-level read of the 16 host venues. Climate, altitude, and roof status — the structural conditions that shape every match before a ball is kicked.',
    status: 'live',
  },
  {
    id: 'history', group: 'Performance',
    title: 'Over/Under-Achievers', navLabel: 'Over/Under-Achievers',
    blurb: 'Performance vs Elo expectation in qualifying.',
    lede: 'Sides whose qualifying points-per-match diverged most from pre-cycle Elo expectation. Positive Δ = banked more points than the bookmaker would have implied. Filter by confederation, sort any column.',
    status: 'live',
  },
  {
    id: 'elo', group: 'Performance',
    title: 'International Elo',
    blurb: 'Sortable rankings, 1-year movement, confederation filter.',
    lede: 'Live Elo ratings for every World Cup qualifier. Elo translates directly to win probability — a 100-point edge is roughly a 64% favourite. Bookmaker prices track this closely; the FIFA ranking does not.',
    status: 'live',
  },
  {
    id: 'sos', group: 'Performance',
    title: 'Strength of Schedule',
    blurb: 'Qualifying schedule difficulty per team, ranked.',
    lede: 'How hard each qualifying campaign was. SOS score answers: if you replaced this team with an average WC side, how often would they win against the same opponents? Lower score = brutal schedule.',
    status: 'live',
  },
  {
    id: 'qual-xg', group: 'Performance',
    title: 'Qualifying xG',
    blurb: 'Per-team Wyscout xG / xGA with match-by-match dominance.',
    lede: 'Per-team Wyscout xG / xGA breakdown across the qualifying cycle. Tier classifications for finishing (clinical / met / wasteful) and defending (solid / met / leaky) — the two strongest predictors of WC over- or under-performance.',
    status: 'live',
  },
  {
    id: 'squad-value', group: 'Performance',
    title: 'Squad Market Value',
    blurb: 'Transfermarkt totals per qualifier.',
    lede: 'Aggregate Transfermarkt squad valuations. The cleanest single proxy for raw talent — but blind to chemistry, manager fit, and recent form. Cross-reference with manager tier and qualifying xG.',
    status: 'live',
  },

  // ── CONDITIONS ───────────────────────────────────────────
  {
    id: 'heat-travel', group: 'Conditions',
    title: 'Heat Vulnerability',
    blurb: 'El Niño 2026, hydration breaks, in-match patterns.',
    lede: 'Heat-load profile across host venues + per-team vulnerability. El Niño 2026 amplification, hydration-break recalibration, and the in-match patterns that move totals lines.',
    status: 'live',
  },
  {
    id: 'altitude', group: 'Conditions',
    title: 'Altitude Exposure',
    blurb: 'Mexican venue effects, acclimatised teams, key Azteca matches.',
    lede: 'Three Mexican venues sit above sea level — Azteca at 2,240m is a fortress. Acclimatised teams (Mexico, Colombia, Ecuador) get a measurable edge; sea-level European sides face material aerobic cost.',
    status: 'live',
  },
  {
    id: 'americas', group: 'Conditions',
    title: 'Americas-Host Effect',
    blurb: 'Confederation skew when the WC is hosted in the Americas.',
    lede: '5 Americas-host World Cups since 1970. CONMEBOL has won 4 of 5 and reached the final in every one. UEFA dominates Europe / Asia / Africa hosts and loses its grip when the tournament comes home.',
    status: 'live',
  },

  // ── MARKETS ──────────────────────────────────────────────
  {
    id: 'golden-boot', group: 'Markets',
    title: 'Golden Boot Forecast',
    blurb: 'Historical pattern (1982–2022) + 2026 candidates.',
    lede: 'Every Golden Boot winner since 1982 reached at least the QF. Six goals is the most common winning tally. Modern winners lean increasingly on penalties. We map the live odds list to the historical pattern.',
    status: 'live',
  },
  {
    id: 'compare', group: 'Markets',
    title: 'Team Compare',
    blurb: 'Two-team side-by-side: Elo, value, manager, xG, notes.',
    lede: 'Pick any two qualifiers. The compare card surfaces every cross-section signal — global Elo rank, squad value, qualifying form, manager tier, qualifying xG — and auto-flags structural edges.',
    status: 'live',
  },
  {
    id: 'bracket-sim', group: 'Markets',
    title: 'Bracket Simulator',
    blurb: 'Pick the groups, the 3rd-placers, every knockout match, and the Golden Boot.',
    lede: 'Build your own 2026 World Cup. Rank all 12 groups, pick which 8 third-placers qualify for the R32, then click your way through every knockout to a champion. Picks persist across reloads; final results show your champion against Pinnacle outright odds and flag value group-winner plays.',
    status: 'live',
  },

  // ── REFERENCE ────────────────────────────────────────────
  {
    id: 'fixtures', group: 'Reference',
    title: 'Group Draw & Fixtures', navLabel: 'Group Draw & Fixtures',
    blurb: '12 groups · 104 matches · venue & kick-off.',
    lede: '48 teams across 12 groups of 4. Top two plus the eight best third-placers reach a Round of 32. The full match list is the joining table for every other section — cross-reference any fixture against Elo, value, xG, and venue conditions.',
    status: 'live',
  },
  {
    id: 'rules', group: 'Reference',
    title: 'New FIFA 2026 Rules', navLabel: 'New FIFA 2026 Rules',
    blurb: 'IFAB changes, hydration breaks, betting market implications.',
    lede: 'Every IFAB change in force for the 2026 cycle, the FIFA-specific hydration-break protocol, and the betting-market implications of each — scoring rate, card volume, and total-time effects.',
    status: 'live',
  },
];

export const SECTION_GROUPS: SectionGroup[] = ['Performance', 'Conditions', 'Markets', 'Reference'];

export function sectionsByGroup(): Record<SectionGroup, SectionMeta[]> {
  const out: Record<SectionGroup, SectionMeta[]> = {
    Performance: [], Conditions: [], Markets: [], Reference: [],
  };
  for (const s of SECTIONS) out[s.group].push(s);
  return out;
}
