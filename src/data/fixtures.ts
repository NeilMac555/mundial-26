import fixturesJson from './fixtures.json';

export type GroupKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L';
export type KnockoutStage = 'GROUP' | 'R32' | 'R16' | 'QF' | 'SF' | '3RD' | 'FINAL';

export interface FixtureMatchRaw {
  no: number;
  date: string;
  kickoff: string;
  utc: string;
  home: string;
  away: string;
  venue: string;
  stage?: 'R32' | 'R16' | 'QF' | 'SF' | '3RD' | 'FINAL';
}

export interface FixtureMatch {
  no: number;
  date: string;       // "June 11, 2026"
  iso: string;        // "2026-06-11"
  kickoff: string;    // "1:00 p.m."
  utc: string;        // "-6"
  home: string;       // canonical (managers) nation OR placeholder string
  away: string;
  homeRaw: string;    // wiki spelling — kept for placeholders ("Winner Group A")
  awayRaw: string;
  homeIsTeam: boolean;
  awayIsTeam: boolean;
  stadium: string;    // "Estadio Azteca"
  city: string;       // "Mexico City"
  venueRaw: string;   // "Estadio Azteca, Mexico City"
  stage: KnockoutStage;
  group: GroupKey | null;
}

export type Groups = Record<GroupKey, string[]>;

export const FIXTURES_SOURCE = fixturesJson.source as { url: string; asOf: string };

// Wiki team-name → canonical managers nation key. Other sections use the canonical key,
// so renaming on entry keeps Flag, manager lookup, Elo, etc. all consistent.
const WIKI_TO_CANON: Record<string, string> = {
  'Czech Republic': 'Czechia',
  'Cape Verde': 'Cabo Verde',
  'Turkey': 'Türkiye',
  'Ivory Coast': "Côte d'Ivoire",
};

export function canonicalNation(wikiName: string): string {
  return WIKI_TO_CANON[wikiName] ?? wikiName;
}

// Set of every WC qualifier name (canonical). Used to tell teams from placeholders.
const QUALIFIER_SET = new Set<string>(
  Object.values(fixturesJson.groups as Record<string, string[]>).flat().map(canonicalNation),
);

// Apply the same canonical rename to group rosters.
export const GROUPS: Groups = Object.fromEntries(
  Object.entries(fixturesJson.groups as Record<string, string[]>).map(([k, names]) => [
    k,
    names.map(canonicalNation),
  ]),
) as Groups;

export const GROUP_KEYS: GroupKey[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const MONTHS: Record<string, string> = {
  January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
  July: '07', August: '08', September: '09', October: '10', November: '11', December: '12',
};

function parseIsoDate(date: string): string {
  // "June 11, 2026" → "2026-06-11"
  const m = date.match(/^(\w+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (!m) return '0000-00-00';
  const month = MONTHS[m[1]] ?? '00';
  return `${m[3]}-${month}-${m[2].padStart(2, '0')}`;
}

function splitVenue(venue: string): { stadium: string; city: string } {
  const idx = venue.lastIndexOf(',');
  if (idx === -1) return { stadium: venue.trim(), city: '' };
  return { stadium: venue.slice(0, idx).trim(), city: venue.slice(idx + 1).trim() };
}

function deriveStage(no: number, raw?: string): KnockoutStage {
  if (raw) return raw as KnockoutStage;
  if (no <= 72) return 'GROUP';
  if (no <= 88) return 'R32';
  if (no <= 96) return 'R16';
  if (no <= 100) return 'QF';
  if (no <= 102) return 'SF';
  if (no === 103) return '3RD';
  return 'FINAL';
}

function groupOfTeam(team: string): GroupKey | null {
  for (const k of GROUP_KEYS) {
    if (GROUPS[k].includes(team)) return k;
  }
  return null;
}

export const MATCHES: FixtureMatch[] = (fixturesJson.matches as FixtureMatchRaw[]).map((m) => {
  const home = canonicalNation(m.home);
  const away = canonicalNation(m.away);
  const homeIsTeam = QUALIFIER_SET.has(home);
  const awayIsTeam = QUALIFIER_SET.has(away);
  const { stadium, city } = splitVenue(m.venue);
  const stage = deriveStage(m.no, m.stage);
  const group = stage === 'GROUP' ? (homeIsTeam ? groupOfTeam(home) : null) : null;
  return {
    no: m.no,
    date: m.date,
    iso: parseIsoDate(m.date),
    kickoff: m.kickoff,
    utc: m.utc,
    home, away, homeRaw: m.home, awayRaw: m.away,
    homeIsTeam, awayIsTeam,
    stadium, city, venueRaw: m.venue,
    stage, group,
  };
});

// Convenience: the unique set of city names that appear in fixtures.
export const FIXTURE_CITIES: string[] = Array.from(
  new Set(MATCHES.map((m) => m.city).filter(Boolean)),
).sort();

// Per-group match list, in fixture order.
export function matchesForGroup(group: GroupKey): FixtureMatch[] {
  return MATCHES.filter((m) => m.group === group);
}

export const STAGE_LABEL: Record<KnockoutStage, string> = {
  GROUP: 'Group stage',
  R32: 'Round of 32',
  R16: 'Round of 16',
  QF: 'Quarter-final',
  SF: 'Semi-final',
  '3RD': '3rd-place play-off',
  FINAL: 'Final',
};

export const STAGE_SHORT: Record<KnockoutStage, string> = {
  GROUP: 'GS',
  R32: 'R32',
  R16: 'R16',
  QF: 'QF',
  SF: 'SF',
  '3RD': '3rd',
  FINAL: 'F',
};
