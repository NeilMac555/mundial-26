// Americas-Host Effect — every WC ever played in the Americas (1970, 1978, 1986, 1994, 2014).
// We use these 5 tournaments as the prior for what happens to teams from each confederation
// when the WC is played west of the Atlantic. (1962 Chile dropped — 16-team era, dataset thin.)

export type AmericasStage = 'CHAMPION' | 'FINALIST' | 'SF' | 'QF' | 'R16' | 'GS';
export type AmericasConfederation = 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC';

export interface AmericasFinish {
  pos: number;
  team: string;
  host: boolean;
  stage: AmericasStage;
  conf: AmericasConfederation;
}

export interface AmericasTournament {
  year: number;
  hostNation: string;
  hostConf: AmericasConfederation;
  totalTeams: number;
  formatNote: string;
  champion: string;
  championConf: AmericasConfederation;
  hostFinish: { pos: number; stage: AmericasStage };
  teams: AmericasFinish[];
}

// Confederation lookup. Period-aware where it matters: Israel was AFC in 1970,
// Australia was OFC pre-2006 (n/a here — they didn't qualify for any of these),
// East Germany / West Germany / USSR / Czechoslovakia all UEFA.
const CONF: Record<string, AmericasConfederation> = {
  // CONMEBOL
  Argentina: 'CONMEBOL', Brazil: 'CONMEBOL', Uruguay: 'CONMEBOL', Colombia: 'CONMEBOL',
  Chile: 'CONMEBOL', Ecuador: 'CONMEBOL', Paraguay: 'CONMEBOL', Peru: 'CONMEBOL', Bolivia: 'CONMEBOL',
  // CONCACAF
  Mexico: 'CONCACAF', 'Costa Rica': 'CONCACAF', 'United States': 'CONCACAF',
  Honduras: 'CONCACAF', Canada: 'CONCACAF', 'El Salvador': 'CONCACAF',
  // UEFA
  Germany: 'UEFA', 'West Germany': 'UEFA', Italy: 'UEFA', Netherlands: 'UEFA', Spain: 'UEFA',
  France: 'UEFA', Portugal: 'UEFA', Belgium: 'UEFA', England: 'UEFA', Croatia: 'UEFA',
  Switzerland: 'UEFA', Austria: 'UEFA', Norway: 'UEFA', Sweden: 'UEFA', Denmark: 'UEFA',
  Poland: 'UEFA', Hungary: 'UEFA', Russia: 'UEFA', 'Soviet Union': 'UEFA',
  Greece: 'UEFA', Czechoslovakia: 'UEFA', Romania: 'UEFA', Bulgaria: 'UEFA',
  Scotland: 'UEFA', 'Northern Ireland': 'UEFA', 'Republic of Ireland': 'UEFA',
  'Bosnia and Herzegovina': 'UEFA',
  // CAF
  Algeria: 'CAF', Tunisia: 'CAF', Morocco: 'CAF', Cameroon: 'CAF', Nigeria: 'CAF',
  Ghana: 'CAF', 'Ivory Coast': 'CAF',
  // AFC
  Iran: 'AFC', 'Saudi Arabia': 'AFC', 'South Korea': 'AFC', Japan: 'AFC',
  Iraq: 'AFC', Australia: 'AFC',
  Israel: 'AFC', // 1970 — Israel was AFC then; moved to UEFA in 1994
};

// Build a single team finish entry, looking up confederation.
function f(pos: number, team: string, stage: AmericasStage, host = false): AmericasFinish {
  return { pos, team, host, stage, conf: CONF[team] ?? 'UEFA' };
}

// ============================================================
// 5 tournaments — final standings extracted from Wikipedia.
// ============================================================

const T1970: AmericasTournament = {
  year: 1970, hostNation: 'Mexico', hostConf: 'CONCACAF', totalTeams: 16,
  formatNote: '4 groups of 4 → 8 to QF → SF → Final',
  champion: 'Brazil', championConf: 'CONMEBOL',
  hostFinish: { pos: 6, stage: 'QF' },
  teams: [
    f(1, 'Brazil', 'CHAMPION'), f(2, 'Italy', 'FINALIST'), f(3, 'West Germany', 'SF'), f(4, 'Uruguay', 'SF'),
    f(5, 'Soviet Union', 'QF'), f(6, 'Mexico', 'QF', true), f(7, 'Peru', 'QF'), f(8, 'England', 'QF'),
    f(9, 'Sweden', 'GS'), f(10, 'Belgium', 'GS'), f(11, 'Romania', 'GS'), f(12, 'Israel', 'GS'),
    f(13, 'Bulgaria', 'GS'), f(14, 'Morocco', 'GS'), f(15, 'Czechoslovakia', 'GS'), f(16, 'El Salvador', 'GS'),
  ],
};

const T1978: AmericasTournament = {
  year: 1978, hostNation: 'Argentina', hostConf: 'CONMEBOL', totalTeams: 16,
  formatNote: '4 groups of 4 → 2 second-round groups of 4 → Final / 3rd-place playoff',
  champion: 'Argentina', championConf: 'CONMEBOL',
  hostFinish: { pos: 1, stage: 'CHAMPION' },
  teams: [
    f(1, 'Argentina', 'CHAMPION', true), f(2, 'Netherlands', 'FINALIST'), f(3, 'Brazil', 'SF'), f(4, 'Italy', 'SF'),
    f(5, 'Poland', 'QF'), f(6, 'West Germany', 'QF'), f(7, 'Austria', 'QF'), f(8, 'Peru', 'QF'),
    f(9, 'Tunisia', 'GS'), f(10, 'Spain', 'GS'), f(11, 'Scotland', 'GS'), f(12, 'France', 'GS'),
    f(13, 'Sweden', 'GS'), f(14, 'Iran', 'GS'), f(15, 'Hungary', 'GS'), f(16, 'Mexico', 'GS'),
  ],
};

const T1986: AmericasTournament = {
  year: 1986, hostNation: 'Mexico', hostConf: 'CONCACAF', totalTeams: 24,
  formatNote: '6 groups of 4 → 16 to R16 → standard knockout',
  champion: 'Argentina', championConf: 'CONMEBOL',
  hostFinish: { pos: 6, stage: 'QF' },
  teams: [
    f(1, 'Argentina', 'CHAMPION'), f(2, 'West Germany', 'FINALIST'), f(3, 'France', 'SF'), f(4, 'Belgium', 'SF'),
    f(5, 'Brazil', 'QF'), f(6, 'Mexico', 'QF', true), f(7, 'Spain', 'QF'), f(8, 'England', 'QF'),
    f(9, 'Denmark', 'R16'), f(10, 'Soviet Union', 'R16'), f(11, 'Morocco', 'R16'), f(12, 'Italy', 'R16'),
    f(13, 'Paraguay', 'R16'), f(14, 'Poland', 'R16'), f(15, 'Bulgaria', 'R16'), f(16, 'Uruguay', 'R16'),
    f(17, 'Portugal', 'GS'), f(18, 'Hungary', 'GS'), f(19, 'Scotland', 'GS'), f(20, 'South Korea', 'GS'),
    f(21, 'Northern Ireland', 'GS'), f(22, 'Algeria', 'GS'), f(23, 'Iraq', 'GS'), f(24, 'Canada', 'GS'),
  ],
};

const T1994: AmericasTournament = {
  year: 1994, hostNation: 'United States', hostConf: 'CONCACAF', totalTeams: 24,
  formatNote: '6 groups of 4 → 16 to R16 → standard knockout',
  champion: 'Brazil', championConf: 'CONMEBOL',
  hostFinish: { pos: 14, stage: 'R16' },
  teams: [
    f(1, 'Brazil', 'CHAMPION'), f(2, 'Italy', 'FINALIST'), f(3, 'Sweden', 'SF'), f(4, 'Bulgaria', 'SF'),
    f(5, 'Germany', 'QF'), f(6, 'Romania', 'QF'), f(7, 'Netherlands', 'QF'), f(8, 'Spain', 'QF'),
    f(9, 'Nigeria', 'R16'), f(10, 'Argentina', 'R16'), f(11, 'Belgium', 'R16'), f(12, 'Saudi Arabia', 'R16'),
    f(13, 'Mexico', 'R16'), f(14, 'United States', 'R16', true), f(15, 'Switzerland', 'R16'), f(16, 'Republic of Ireland', 'R16'),
    f(17, 'Norway', 'GS'), f(18, 'Russia', 'GS'), f(19, 'Colombia', 'GS'), f(20, 'Cameroon', 'GS'),
    f(21, 'Bolivia', 'GS'), f(22, 'South Korea', 'GS'), f(23, 'Morocco', 'GS'), f(24, 'Greece', 'GS'),
  ],
};

const T2014: AmericasTournament = {
  year: 2014, hostNation: 'Brazil', hostConf: 'CONMEBOL', totalTeams: 32,
  formatNote: '8 groups of 4 → 16 to R16 → standard knockout',
  champion: 'Germany', championConf: 'UEFA',
  hostFinish: { pos: 4, stage: 'SF' },
  teams: [
    f(1, 'Germany', 'CHAMPION'), f(2, 'Argentina', 'FINALIST'), f(3, 'Netherlands', 'SF'), f(4, 'Brazil', 'SF', true),
    f(5, 'Colombia', 'QF'), f(6, 'Belgium', 'QF'), f(7, 'France', 'QF'), f(8, 'Costa Rica', 'QF'),
    f(9, 'Chile', 'R16'), f(10, 'Mexico', 'R16'), f(11, 'Switzerland', 'R16'), f(12, 'Uruguay', 'R16'),
    f(13, 'Greece', 'R16'), f(14, 'Algeria', 'R16'), f(15, 'United States', 'R16'), f(16, 'Nigeria', 'R16'),
    f(17, 'Ecuador', 'GS'), f(18, 'Portugal', 'GS'), f(19, 'Croatia', 'GS'), f(20, 'Bosnia and Herzegovina', 'GS'),
    f(21, 'Ivory Coast', 'GS'), f(22, 'Italy', 'GS'), f(23, 'Spain', 'GS'), f(24, 'Russia', 'GS'),
    f(25, 'Ghana', 'GS'), f(26, 'England', 'GS'), f(27, 'South Korea', 'GS'), f(28, 'Iran', 'GS'),
    f(29, 'Japan', 'GS'), f(30, 'Australia', 'GS'), f(31, 'Honduras', 'GS'), f(32, 'Cameroon', 'GS'),
  ],
};

export const TOURNAMENTS: AmericasTournament[] = [T1970, T1978, T1986, T1994, T2014];

// ============================================================
// Aggregations
// ============================================================

export const STAGE_LABEL: Record<AmericasStage, string> = {
  CHAMPION: 'Champion',
  FINALIST: 'Final',
  SF: 'Semi-final',
  QF: 'Quarter-final',
  R16: 'Round of 16',
  GS: 'Group stage exit',
};

export const STAGE_SHORT: Record<AmericasStage, string> = {
  CHAMPION: 'W', FINALIST: 'F', SF: 'SF', QF: 'QF', R16: 'R16', GS: 'GS',
};

// Stage rank (lower = better) — useful for sorting / colour scaling.
export const STAGE_RANK: Record<AmericasStage, number> = {
  CHAMPION: 0, FINALIST: 1, SF: 2, QF: 3, R16: 4, GS: 5,
};

export interface ConfSummary {
  conf: AmericasConfederation;
  entries: number;          // teams from this conf entered the tournament
  champions: number;
  finalists: number;        // includes champion
  semifinalists: number;    // includes champion + finalist
  quarterfinalists: number; // teams that reached QF or better
  knockoutQual: number;     // teams that survived group stage (R16+ in 24/32-team tournaments, QF+ in 16-team)
}

function inKnockout(stage: AmericasStage, totalTeams: number): boolean {
  if (stage === 'GS') return false;
  if (totalTeams >= 24) return true; // R16 counts as knockout
  // 16-team format: knockout = QF onward
  return stage !== 'R16';
}

export function summariseTournament(t: AmericasTournament): ConfSummary[] {
  const map = new Map<AmericasConfederation, ConfSummary>();
  for (const team of t.teams) {
    const s = map.get(team.conf) ?? {
      conf: team.conf, entries: 0, champions: 0, finalists: 0,
      semifinalists: 0, quarterfinalists: 0, knockoutQual: 0,
    };
    s.entries += 1;
    if (team.stage === 'CHAMPION') s.champions += 1;
    if (STAGE_RANK[team.stage] <= STAGE_RANK.FINALIST) s.finalists += 1;
    if (STAGE_RANK[team.stage] <= STAGE_RANK.SF) s.semifinalists += 1;
    if (STAGE_RANK[team.stage] <= STAGE_RANK.QF) s.quarterfinalists += 1;
    if (inKnockout(team.stage, t.totalTeams)) s.knockoutQual += 1;
    map.set(team.conf, s);
  }
  return Array.from(map.values()).sort((a, b) => b.semifinalists - a.semifinalists || b.entries - a.entries);
}

// ============================================================
// Cross-tournament headline numbers
// ============================================================

export interface ConfRollup {
  conf: AmericasConfederation;
  entries: number;
  champions: number;
  finalists: number;
  semifinalists: number;
  quarterfinalists: number;
  knockoutQual: number;
}

export function rollup(): ConfRollup[] {
  const map = new Map<AmericasConfederation, ConfRollup>();
  for (const t of TOURNAMENTS) {
    for (const team of t.teams) {
      const r = map.get(team.conf) ?? {
        conf: team.conf, entries: 0, champions: 0, finalists: 0,
        semifinalists: 0, quarterfinalists: 0, knockoutQual: 0,
      };
      r.entries += 1;
      if (team.stage === 'CHAMPION') r.champions += 1;
      if (STAGE_RANK[team.stage] <= STAGE_RANK.FINALIST) r.finalists += 1;
      if (STAGE_RANK[team.stage] <= STAGE_RANK.SF) r.semifinalists += 1;
      if (STAGE_RANK[team.stage] <= STAGE_RANK.QF) r.quarterfinalists += 1;
      if (inKnockout(team.stage, t.totalTeams)) r.knockoutQual += 1;
      map.set(team.conf, r);
    }
  }
  return Array.from(map.values()).sort((a, b) => b.champions - a.champions || b.semifinalists - a.semifinalists);
}

// ============================================================
// Headline facts pre-computed for the explainer
// ============================================================

// Of all 5 Americas-host WCs, how many were won by CONMEBOL? 4/5 = 80%.
// For comparison, of the 9 non-Americas WCs since 1970 (1974, 1982, 1990, 1998, 2002, 2006, 2010, 2018, 2022),
// CONMEBOL won 2 (Brazil 2002, Argentina 2022) = ~22%.
export const HEADLINE = {
  americasTournaments: TOURNAMENTS.length,
  conmebolWinsAmericas: TOURNAMENTS.filter((t) => t.championConf === 'CONMEBOL').length,
  uefaWinsAmericas: TOURNAMENTS.filter((t) => t.championConf === 'UEFA').length,
  // Reference: WCs played outside the Americas since 1970.
  nonAmericasSince1970: 9, // 1974, 1982, 1990, 1998, 2002, 2006, 2010, 2018, 2022
  conmebolWinsNonAmericas: 2, // 2002 Brazil, 2022 Argentina
  uefaWinsNonAmericas: 7,
  // Every Americas-host WC since 1970 has had ≥1 CONMEBOL team in the final.
  americasWithConmebolInFinal: TOURNAMENTS.filter((t) =>
    t.teams.some((x) => x.conf === 'CONMEBOL' && (x.stage === 'CHAMPION' || x.stage === 'FINALIST')),
  ).length,
};

export const SOURCE = {
  url: 'https://en.wikipedia.org/wiki/FIFA_World_Cup',
  asOf: '2026-05-03',
};
