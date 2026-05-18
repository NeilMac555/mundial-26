// Bracket Simulator engine — builds and propagates winners through the FIFA 2026 knockout tree.
// Ported from the standalone wc2026 simulator. Pure logic; no React, no DOM.

import type { BracketTeam } from '../data/bracketTeams';
import { computeThirdPlaceMapping } from '../data/bracketMappings';

export interface GroupResult {
  group: string;
  first: BracketTeam;
  second: BracketTeam;
  third: BracketTeam;
  fourth: BracketTeam;
}

/** A team slotted into a knockout match, tagged with where they came from ("1A", "2B", "3E"…). */
export interface BracketTeamSlot {
  team: BracketTeam;
  source: string;
}

export interface MatchSlot {
  id: string;
  team1: BracketTeamSlot | null;
  team2: BracketTeamSlot | null;
  winner: BracketTeamSlot | null;
}

interface R32Seed {
  id: string;
  team1Source: string;
  team2Source: string;
  venue: string;
  date: string;
}

// R32 seeding — FIFA M73-M88, using internal IDs r32_1 … r32_16 ordered
// top-to-bottom in the bracket image (M74 sits at the top of the published
// printable bracket even though M73 is the chronologically first match).
//
// For each 1st-place-vs-3rd-place match the team2Source uses slot label
// `3_1X` where X is the SAME group letter as team1Source. The slot label
// "1X" therefore reads as "the 3rd-placer paired with Group X's winner";
// this convention matches FIFA's allowed-source-group constraint table
// (see bracketMappings.ts SLOT_ALLOWED_SOURCES).
const R32_SEEDS: R32Seed[] = [
  // Top half — Quarter 1 (feeds QF1)
  { id: 'r32_1',  team1Source: '1E', team2Source: '3_1E', venue: 'Foxborough',     date: 'June 29' },  // M74
  { id: 'r32_2',  team1Source: '1I', team2Source: '3_1I', venue: 'East Rutherford', date: 'June 30' }, // M77
  { id: 'r32_3',  team1Source: '2A', team2Source: '2B',   venue: 'Inglewood',       date: 'June 28' }, // M73
  { id: 'r32_4',  team1Source: '1F', team2Source: '2C',   venue: 'Guadalajara',     date: 'June 29' }, // M75
  // Top half — Quarter 2 (feeds QF2)
  { id: 'r32_5',  team1Source: '2K', team2Source: '2L',   venue: 'Toronto',         date: 'July 2' },  // M83
  { id: 'r32_6',  team1Source: '1H', team2Source: '2J',   venue: 'Inglewood',       date: 'July 2' },  // M84
  { id: 'r32_7',  team1Source: '1D', team2Source: '3_1D', venue: 'Santa Clara',     date: 'July 1' },  // M81
  { id: 'r32_8',  team1Source: '1G', team2Source: '3_1G', venue: 'Seattle',         date: 'July 1' },  // M82
  // Bottom half — Quarter 3 (feeds QF3)
  { id: 'r32_9',  team1Source: '1C', team2Source: '2F',   venue: 'Houston',         date: 'June 29' }, // M76
  { id: 'r32_10', team1Source: '2E', team2Source: '2I',   venue: 'Arlington',       date: 'June 30' }, // M78
  { id: 'r32_11', team1Source: '1A', team2Source: '3_1A', venue: 'Mexico City',     date: 'June 30' }, // M79
  { id: 'r32_12', team1Source: '1L', team2Source: '3_1L', venue: 'Atlanta',         date: 'July 1' },  // M80
  // Bottom half — Quarter 4 (feeds QF4)
  { id: 'r32_13', team1Source: '1J', team2Source: '2H',   venue: 'Miami Gardens',   date: 'July 3' },  // M86
  { id: 'r32_14', team1Source: '2D', team2Source: '2G',   venue: 'Arlington',       date: 'July 3' },  // M88
  { id: 'r32_15', team1Source: '1B', team2Source: '3_1B', venue: 'Vancouver',       date: 'July 2' },  // M85
  { id: 'r32_16', team1Source: '1K', team2Source: '3_1K', venue: 'Kansas City',     date: 'July 3' },  // M87
];

const R16_PAIRINGS = [
  { id: 'r16_1', match1: 'r32_1',  match2: 'r32_2',  venue: 'Philadelphia',     date: 'July 4' },
  { id: 'r16_2', match1: 'r32_3',  match2: 'r32_4',  venue: 'Houston',          date: 'July 4' },
  { id: 'r16_3', match1: 'r32_5',  match2: 'r32_6',  venue: 'Arlington',        date: 'July 6' },
  { id: 'r16_4', match1: 'r32_7',  match2: 'r32_8',  venue: 'Seattle',          date: 'July 6' },
  { id: 'r16_5', match1: 'r32_9',  match2: 'r32_10', venue: 'East Rutherford',  date: 'July 5' },
  { id: 'r16_6', match1: 'r32_11', match2: 'r32_12', venue: 'Mexico City',      date: 'July 5' },
  { id: 'r16_7', match1: 'r32_13', match2: 'r32_14', venue: 'Atlanta',          date: 'July 7' },
  { id: 'r16_8', match1: 'r32_15', match2: 'r32_16', venue: 'Vancouver',        date: 'July 7' },
];

const QF_PAIRINGS = [
  { id: 'qf_1', match1: 'r16_1', match2: 'r16_2', venue: 'Foxborough',     date: 'July 9' },
  { id: 'qf_2', match1: 'r16_3', match2: 'r16_4', venue: 'Inglewood',      date: 'July 10' },
  { id: 'qf_3', match1: 'r16_5', match2: 'r16_6', venue: 'Miami Gardens',  date: 'July 11' },
  { id: 'qf_4', match1: 'r16_7', match2: 'r16_8', venue: 'Kansas City',    date: 'July 11' },
];

const SF_PAIRINGS = [
  { id: 'sf_1', match1: 'qf_1', match2: 'qf_2', venue: 'Arlington', date: 'July 14' },
  { id: 'sf_2', match1: 'qf_3', match2: 'qf_4', venue: 'Atlanta',   date: 'July 15' },
];

const FINAL_PAIRING = {
  id: 'final', match1: 'sf_1', match2: 'sf_2', venue: 'East Rutherford', date: 'July 19',
};

export interface BracketData {
  r32: MatchSlot[];
  r16: MatchSlot[];
  qf: MatchSlot[];
  sf: MatchSlot[];
  final: MatchSlot;
}

export interface KnockoutMatchMeta {
  id: string;
  venue: string;
  date: string;
}

/**
 * Build the full bracket tree from finalised group results + 8 qualifying-third-place groups.
 * Falls back to alphabetical slotting if the picked combo isn't in the FIFA lookup table.
 */
export function buildBracket(
  groupResults: GroupResult[],
  qualifyingThirdGroups: string[],
): BracketData {
  // Resolve the 8 qualifying 3rd-placers into the 8 R32 slots using FIFA's
  // per-slot allowed-source-group constraints. This covers all C(12,8) = 495
  // possible combinations (the old hard-coded table only had 18) and prevents
  // same-group rematches by construction.
  const thirdPlaceMapping = computeThirdPlaceMapping(qualifyingThirdGroups);

  const groupMap = new Map<string, GroupResult>();
  groupResults.forEach((gr) => groupMap.set(gr.group, gr));

  function resolveTeam(source: string): BracketTeamSlot {
    if (source.startsWith('3_')) {
      const slot = source.replace('3_', '') as keyof typeof thirdPlaceMapping;
      const thirdSource = thirdPlaceMapping[slot];
      const group = thirdSource.replace('3', '');
      const gr = groupMap.get(group)!;
      return { team: gr.third, source: `3${group}` };
    }
    const position = source[0];
    const group = source[1];
    const gr = groupMap.get(group)!;
    return position === '1'
      ? { team: gr.first, source: `1${group}` }
      : { team: gr.second, source: `2${group}` };
  }

  const r32: MatchSlot[] = R32_SEEDS.map((seed) => ({
    id: seed.id,
    team1: resolveTeam(seed.team1Source),
    team2: resolveTeam(seed.team2Source),
    winner: null,
  }));
  const r16: MatchSlot[] = R16_PAIRINGS.map((p) => ({ id: p.id, team1: null, team2: null, winner: null }));
  const qf: MatchSlot[]  = QF_PAIRINGS.map((p) => ({ id: p.id, team1: null, team2: null, winner: null }));
  const sf: MatchSlot[]  = SF_PAIRINGS.map((p) => ({ id: p.id, team1: null, team2: null, winner: null }));
  const final: MatchSlot = { id: 'final', team1: null, team2: null, winner: null };

  return { r32, r16, qf, sf, final };
}

/** Round metadata so the UI can label venues + dates per match. */
export function getMatchMeta(matchId: string): KnockoutMatchMeta | null {
  const r32 = R32_SEEDS.find((s) => s.id === matchId);
  if (r32) return { id: r32.id, venue: r32.venue, date: r32.date };
  const r16 = R16_PAIRINGS.find((p) => p.id === matchId);
  if (r16) return { id: r16.id, venue: r16.venue, date: r16.date };
  const qf = QF_PAIRINGS.find((p) => p.id === matchId);
  if (qf) return { id: qf.id, venue: qf.venue, date: qf.date };
  const sf = SF_PAIRINGS.find((p) => p.id === matchId);
  if (sf) return { id: sf.id, venue: sf.venue, date: sf.date };
  if (matchId === 'final') return { id: 'final', venue: FINAL_PAIRING.venue, date: FINAL_PAIRING.date };
  return null;
}

export function getPairings() {
  return { r16: R16_PAIRINGS, qf: QF_PAIRINGS, sf: SF_PAIRINGS, final: FINAL_PAIRING };
}

/**
 * Set a winner for a match, then re-cascade later rounds. If a winner is replaced
 * by re-clicking earlier in the tree, downstream picks that no longer make sense
 * are cleared.
 */
export function propagateWinner(
  bracket: BracketData,
  matchId: string,
  winner: BracketTeamSlot,
): BracketData {
  const next = JSON.parse(JSON.stringify(bracket)) as BracketData;
  const all = [
    ...next.r32, ...next.r16, ...next.qf, ...next.sf, next.final,
  ];
  const m = all.find((x) => x.id === matchId);
  if (m) m.winner = winner;

  for (const p of R16_PAIRINGS) {
    const r16 = next.r16.find((x) => x.id === p.id)!;
    const a = next.r32.find((x) => x.id === p.match1);
    const b = next.r32.find((x) => x.id === p.match2);
    r16.team1 = a?.winner ?? null;
    r16.team2 = b?.winner ?? null;
    if (
      r16.winner &&
      r16.team1?.team.code !== r16.winner.team.code &&
      r16.team2?.team.code !== r16.winner.team.code
    ) {
      r16.winner = null;
    }
  }
  for (const p of QF_PAIRINGS) {
    const qf = next.qf.find((x) => x.id === p.id)!;
    const a = next.r16.find((x) => x.id === p.match1);
    const b = next.r16.find((x) => x.id === p.match2);
    qf.team1 = a?.winner ?? null;
    qf.team2 = b?.winner ?? null;
    if (
      qf.winner &&
      qf.team1?.team.code !== qf.winner.team.code &&
      qf.team2?.team.code !== qf.winner.team.code
    ) {
      qf.winner = null;
    }
  }
  for (const p of SF_PAIRINGS) {
    const sf = next.sf.find((x) => x.id === p.id)!;
    const a = next.qf.find((x) => x.id === p.match1);
    const b = next.qf.find((x) => x.id === p.match2);
    sf.team1 = a?.winner ?? null;
    sf.team2 = b?.winner ?? null;
    if (
      sf.winner &&
      sf.team1?.team.code !== sf.winner.team.code &&
      sf.team2?.team.code !== sf.winner.team.code
    ) {
      sf.winner = null;
    }
  }
  const fin = next.final;
  const sa = next.sf.find((x) => x.id === FINAL_PAIRING.match1);
  const sb = next.sf.find((x) => x.id === FINAL_PAIRING.match2);
  fin.team1 = sa?.winner ?? null;
  fin.team2 = sb?.winner ?? null;
  if (
    fin.winner &&
    fin.team1?.team.code !== fin.winner.team.code &&
    fin.team2?.team.code !== fin.winner.team.code
  ) {
    fin.winner = null;
  }

  return next;
}

export interface BracketCompletion {
  total: number; // 31 (16 R32 + 8 R16 + 4 QF + 2 SF + 1 final)
  done: number;
}

export function completionStats(b: BracketData): BracketCompletion {
  const done =
    b.r32.filter((m) => m.winner).length +
    b.r16.filter((m) => m.winner).length +
    b.qf.filter((m) => m.winner).length +
    b.sf.filter((m) => m.winner).length +
    (b.final.winner ? 1 : 0);
  return { total: 31, done };
}
