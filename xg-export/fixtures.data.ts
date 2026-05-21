// Mundial 26 — Fixtures + Groups data (self-contained portable export)
//
// All 104 World Cup 2026 matches: 72 group-stage + 16 R32 + 8 R16 + 4 QF +
// 2 SF + 1 3rd-place + 1 Final. Includes per-group 4-team rosters.
//
// No imports / no external dependencies. Drop straight into any TS project.
//
// Source: Wikipedia 2026 FIFA World Cup article, captured 2026-05-03.

// Inlined from fixtures.json (self-contained for portability)
const fixturesJson: any = {
  "source": {
    "url": "https://en.wikipedia.org/wiki/2026_FIFA_World_Cup",
    "asOf": "2026-05-03"
  },
  "groups": {
    "A": ["Mexico", "South Africa", "South Korea", "Czech Republic"],
    "B": ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
    "C": ["Brazil", "Morocco", "Haiti", "Scotland"],
    "D": ["United States", "Paraguay", "Australia", "Turkey"],
    "E": ["Germany", "Curaçao", "Ivory Coast", "Ecuador"],
    "F": ["Netherlands", "Japan", "Sweden", "Tunisia"],
    "G": ["Belgium", "Egypt", "Iran", "New Zealand"],
    "H": ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
    "I": ["France", "Senegal", "Iraq", "Norway"],
    "J": ["Argentina", "Algeria", "Austria", "Jordan"],
    "K": ["Portugal", "DR Congo", "Uzbekistan", "Colombia"],
    "L": ["England", "Croatia", "Ghana", "Panama"]
  },
  "matches": [
    {"no":1,"date":"June 11, 2026","kickoff":"1:00 p.m.","utc":"-6","home":"Mexico","away":"South Africa","venue":"Estadio Azteca, Mexico City"},
    {"no":2,"date":"June 11, 2026","kickoff":"8:00 p.m.","utc":"-6","home":"South Korea","away":"Czech Republic","venue":"Estadio Akron, Zapopan"},
    {"no":3,"date":"June 12, 2026","kickoff":"3:00 p.m.","utc":"-4","home":"Canada","away":"Bosnia and Herzegovina","venue":"BMO Field, Toronto"},
    {"no":4,"date":"June 12, 2026","kickoff":"6:00 p.m.","utc":"-7","home":"United States","away":"Paraguay","venue":"SoFi Stadium, Inglewood"},
    {"no":5,"date":"June 13, 2026","kickoff":"9:00 p.m.","utc":"-4","home":"Haiti","away":"Scotland","venue":"Gillette Stadium, Foxborough"},
    {"no":6,"date":"June 13, 2026","kickoff":"9:00 p.m.","utc":"-7","home":"Australia","away":"Turkey","venue":"BC Place, Vancouver"},
    {"no":7,"date":"June 13, 2026","kickoff":"6:00 p.m.","utc":"-4","home":"Brazil","away":"Morocco","venue":"MetLife Stadium, East Rutherford"},
    {"no":8,"date":"June 13, 2026","kickoff":"12:00 p.m.","utc":"-7","home":"Qatar","away":"Switzerland","venue":"Levi's Stadium, Santa Clara"},
    {"no":9,"date":"June 14, 2026","kickoff":"7:00 p.m.","utc":"-4","home":"Ivory Coast","away":"Ecuador","venue":"Lincoln Financial Field, Philadelphia"},
    {"no":10,"date":"June 14, 2026","kickoff":"12:00 p.m.","utc":"-5","home":"Germany","away":"Curaçao","venue":"NRG Stadium, Houston"},
    {"no":11,"date":"June 14, 2026","kickoff":"3:00 p.m.","utc":"-5","home":"Netherlands","away":"Japan","venue":"AT&T Stadium, Arlington"},
    {"no":12,"date":"June 14, 2026","kickoff":"8:00 p.m.","utc":"-6","home":"Sweden","away":"Tunisia","venue":"Estadio BBVA, Guadalupe"},
    {"no":13,"date":"June 15, 2026","kickoff":"6:00 p.m.","utc":"-4","home":"Saudi Arabia","away":"Uruguay","venue":"Hard Rock Stadium, Miami Gardens"},
    {"no":14,"date":"June 15, 2026","kickoff":"12:00 p.m.","utc":"-4","home":"Spain","away":"Cape Verde","venue":"Mercedes-Benz Stadium, Atlanta"},
    {"no":15,"date":"June 15, 2026","kickoff":"6:00 p.m.","utc":"-7","home":"Iran","away":"New Zealand","venue":"SoFi Stadium, Inglewood"},
    {"no":16,"date":"June 15, 2026","kickoff":"12:00 p.m.","utc":"-7","home":"Belgium","away":"Egypt","venue":"Lumen Field, Seattle"},
    {"no":17,"date":"June 16, 2026","kickoff":"3:00 p.m.","utc":"-4","home":"France","away":"Senegal","venue":"MetLife Stadium, East Rutherford"},
    {"no":18,"date":"June 16, 2026","kickoff":"6:00 p.m.","utc":"-4","home":"Iraq","away":"Norway","venue":"Gillette Stadium, Foxborough"},
    {"no":19,"date":"June 16, 2026","kickoff":"8:00 p.m.","utc":"-5","home":"Argentina","away":"Algeria","venue":"Arrowhead Stadium, Kansas City"},
    {"no":20,"date":"June 16, 2026","kickoff":"9:00 p.m.","utc":"-7","home":"Austria","away":"Jordan","venue":"Levi's Stadium, Santa Clara"},
    {"no":21,"date":"June 17, 2026","kickoff":"7:00 p.m.","utc":"-4","home":"Ghana","away":"Panama","venue":"BMO Field, Toronto"},
    {"no":22,"date":"June 17, 2026","kickoff":"3:00 p.m.","utc":"-5","home":"England","away":"Croatia","venue":"AT&T Stadium, Arlington"},
    {"no":23,"date":"June 17, 2026","kickoff":"12:00 p.m.","utc":"-5","home":"Portugal","away":"DR Congo","venue":"NRG Stadium, Houston"},
    {"no":24,"date":"June 17, 2026","kickoff":"8:00 p.m.","utc":"-6","home":"Uzbekistan","away":"Colombia","venue":"Estadio Azteca, Mexico City"},
    {"no":25,"date":"June 18, 2026","kickoff":"12:00 p.m.","utc":"-4","home":"Czech Republic","away":"South Africa","venue":"Mercedes-Benz Stadium, Atlanta"},
    {"no":26,"date":"June 18, 2026","kickoff":"12:00 p.m.","utc":"-7","home":"Switzerland","away":"Bosnia and Herzegovina","venue":"SoFi Stadium, Inglewood"},
    {"no":27,"date":"June 18, 2026","kickoff":"3:00 p.m.","utc":"-7","home":"Canada","away":"Qatar","venue":"BC Place, Vancouver"},
    {"no":28,"date":"June 18, 2026","kickoff":"7:00 p.m.","utc":"-6","home":"Mexico","away":"South Korea","venue":"Estadio Akron, Zapopan"},
    {"no":29,"date":"June 19, 2026","kickoff":"8:30 p.m.","utc":"-4","home":"Brazil","away":"Haiti","venue":"Lincoln Financial Field, Philadelphia"},
    {"no":30,"date":"June 19, 2026","kickoff":"6:00 p.m.","utc":"-4","home":"Scotland","away":"Morocco","venue":"Gillette Stadium, Foxborough"},
    {"no":31,"date":"June 19, 2026","kickoff":"8:00 p.m.","utc":"-7","home":"Turkey","away":"Paraguay","venue":"Levi's Stadium, Santa Clara"},
    {"no":32,"date":"June 19, 2026","kickoff":"12:00 p.m.","utc":"-7","home":"United States","away":"Australia","venue":"Lumen Field, Seattle"},
    {"no":33,"date":"June 20, 2026","kickoff":"4:00 p.m.","utc":"-4","home":"Germany","away":"Ivory Coast","venue":"BMO Field, Toronto"},
    {"no":34,"date":"June 20, 2026","kickoff":"7:00 p.m.","utc":"-5","home":"Ecuador","away":"Curaçao","venue":"Arrowhead Stadium, Kansas City"},
    {"no":35,"date":"June 20, 2026","kickoff":"12:00 p.m.","utc":"-5","home":"Netherlands","away":"Sweden","venue":"NRG Stadium, Houston"},
    {"no":36,"date":"June 20, 2026","kickoff":"10:00 p.m.","utc":"-6","home":"Tunisia","away":"Japan","venue":"Estadio BBVA, Guadalupe"},
    {"no":37,"date":"June 21, 2026","kickoff":"6:00 p.m.","utc":"-4","home":"Uruguay","away":"Cape Verde","venue":"Hard Rock Stadium, Miami Gardens"},
    {"no":38,"date":"June 21, 2026","kickoff":"12:00 p.m.","utc":"-4","home":"Spain","away":"Saudi Arabia","venue":"Mercedes-Benz Stadium, Atlanta"},
    {"no":39,"date":"June 21, 2026","kickoff":"12:00 p.m.","utc":"-7","home":"Belgium","away":"Iran","venue":"SoFi Stadium, Inglewood"},
    {"no":40,"date":"June 21, 2026","kickoff":"6:00 p.m.","utc":"-7","home":"New Zealand","away":"Egypt","venue":"BC Place, Vancouver"},
    {"no":41,"date":"June 22, 2026","kickoff":"8:00 p.m.","utc":"-4","home":"Norway","away":"Senegal","venue":"MetLife Stadium, East Rutherford"},
    {"no":42,"date":"June 22, 2026","kickoff":"5:00 p.m.","utc":"-4","home":"France","away":"Iraq","venue":"Lincoln Financial Field, Philadelphia"},
    {"no":43,"date":"June 22, 2026","kickoff":"12:00 p.m.","utc":"-5","home":"Argentina","away":"Austria","venue":"AT&T Stadium, Arlington"},
    {"no":44,"date":"June 22, 2026","kickoff":"8:00 p.m.","utc":"-7","home":"Jordan","away":"Algeria","venue":"Levi's Stadium, Santa Clara"},
    {"no":45,"date":"June 23, 2026","kickoff":"4:00 p.m.","utc":"-4","home":"England","away":"Ghana","venue":"Gillette Stadium, Foxborough"},
    {"no":46,"date":"June 23, 2026","kickoff":"7:00 p.m.","utc":"-4","home":"Panama","away":"Croatia","venue":"BMO Field, Toronto"},
    {"no":47,"date":"June 23, 2026","kickoff":"12:00 p.m.","utc":"-5","home":"Portugal","away":"Uzbekistan","venue":"NRG Stadium, Houston"},
    {"no":48,"date":"June 23, 2026","kickoff":"8:00 p.m.","utc":"-6","home":"Colombia","away":"DR Congo","venue":"Estadio Akron, Zapopan"},
    {"no":49,"date":"June 24, 2026","kickoff":"6:00 p.m.","utc":"-4","home":"Scotland","away":"Brazil","venue":"Hard Rock Stadium, Miami Gardens"},
    {"no":50,"date":"June 24, 2026","kickoff":"6:00 p.m.","utc":"-4","home":"Morocco","away":"Haiti","venue":"Mercedes-Benz Stadium, Atlanta"},
    {"no":51,"date":"June 24, 2026","kickoff":"12:00 p.m.","utc":"-7","home":"Switzerland","away":"Canada","venue":"BC Place, Vancouver"},
    {"no":52,"date":"June 24, 2026","kickoff":"12:00 p.m.","utc":"-7","home":"Bosnia and Herzegovina","away":"Qatar","venue":"Lumen Field, Seattle"},
    {"no":53,"date":"June 24, 2026","kickoff":"7:00 p.m.","utc":"-6","home":"Czech Republic","away":"Mexico","venue":"Estadio Azteca, Mexico City"},
    {"no":54,"date":"June 24, 2026","kickoff":"7:00 p.m.","utc":"-6","home":"South Africa","away":"South Korea","venue":"Estadio BBVA, Guadalupe"},
    {"no":55,"date":"June 25, 2026","kickoff":"4:00 p.m.","utc":"-4","home":"Curaçao","away":"Ivory Coast","venue":"Lincoln Financial Field, Philadelphia"},
    {"no":56,"date":"June 25, 2026","kickoff":"4:00 p.m.","utc":"-4","home":"Ecuador","away":"Germany","venue":"MetLife Stadium, East Rutherford"},
    {"no":57,"date":"June 25, 2026","kickoff":"6:00 p.m.","utc":"-5","home":"Japan","away":"Sweden","venue":"AT&T Stadium, Arlington"},
    {"no":58,"date":"June 25, 2026","kickoff":"6:00 p.m.","utc":"-5","home":"Tunisia","away":"Netherlands","venue":"Arrowhead Stadium, Kansas City"},
    {"no":59,"date":"June 25, 2026","kickoff":"7:00 p.m.","utc":"-7","home":"Turkey","away":"United States","venue":"SoFi Stadium, Inglewood"},
    {"no":60,"date":"June 25, 2026","kickoff":"7:00 p.m.","utc":"-7","home":"Paraguay","away":"Australia","venue":"Levi's Stadium, Santa Clara"},
    {"no":61,"date":"June 26, 2026","kickoff":"3:00 p.m.","utc":"-4","home":"Norway","away":"France","venue":"Gillette Stadium, Foxborough"},
    {"no":62,"date":"June 26, 2026","kickoff":"3:00 p.m.","utc":"-4","home":"Senegal","away":"Iraq","venue":"BMO Field, Toronto"},
    {"no":63,"date":"June 26, 2026","kickoff":"8:00 p.m.","utc":"-7","home":"Egypt","away":"Iran","venue":"Lumen Field, Seattle"},
    {"no":64,"date":"June 26, 2026","kickoff":"8:00 p.m.","utc":"-7","home":"New Zealand","away":"Belgium","venue":"BC Place, Vancouver"},
    {"no":65,"date":"June 26, 2026","kickoff":"7:00 p.m.","utc":"-5","home":"Cape Verde","away":"Saudi Arabia","venue":"NRG Stadium, Houston"},
    {"no":66,"date":"June 26, 2026","kickoff":"6:00 p.m.","utc":"-6","home":"Uruguay","away":"Spain","venue":"Estadio Akron, Zapopan"},
    {"no":67,"date":"June 27, 2026","kickoff":"5:00 p.m.","utc":"-4","home":"Panama","away":"England","venue":"MetLife Stadium, East Rutherford"},
    {"no":68,"date":"June 27, 2026","kickoff":"5:00 p.m.","utc":"-4","home":"Croatia","away":"Ghana","venue":"Lincoln Financial Field, Philadelphia"},
    {"no":69,"date":"June 27, 2026","kickoff":"9:00 p.m.","utc":"-5","home":"Algeria","away":"Austria","venue":"Arrowhead Stadium, Kansas City"},
    {"no":70,"date":"June 27, 2026","kickoff":"9:00 p.m.","utc":"-5","home":"Jordan","away":"Argentina","venue":"AT&T Stadium, Arlington"},
    {"no":71,"date":"June 27, 2026","kickoff":"7:30 p.m.","utc":"-4","home":"Colombia","away":"Portugal","venue":"Hard Rock Stadium, Miami Gardens"},
    {"no":72,"date":"June 27, 2026","kickoff":"7:30 p.m.","utc":"-4","home":"DR Congo","away":"Uzbekistan","venue":"Mercedes-Benz Stadium, Atlanta"},
    {"no":73,"date":"June 28, 2026","kickoff":"12:00 p.m.","utc":"-7","home":"Runner-up Group A","away":"Runner-up Group B","venue":"SoFi Stadium, Inglewood","stage":"R32"},
    {"no":74,"date":"June 29, 2026","kickoff":"4:30 p.m.","utc":"-4","home":"Winner Group E","away":"3rd Group A/B/C/D/F","venue":"Gillette Stadium, Foxborough","stage":"R32"},
    {"no":75,"date":"June 29, 2026","kickoff":"7:00 p.m.","utc":"-6","home":"Winner Group F","away":"Runner-up Group C","venue":"Estadio BBVA, Guadalupe","stage":"R32"},
    {"no":76,"date":"June 29, 2026","kickoff":"12:00 p.m.","utc":"-5","home":"Winner Group C","away":"Runner-up Group F","venue":"NRG Stadium, Houston","stage":"R32"},
    {"no":77,"date":"June 30, 2026","kickoff":"5:00 p.m.","utc":"-4","home":"Winner Group I","away":"3rd Group C/D/F/G/H","venue":"MetLife Stadium, East Rutherford","stage":"R32"},
    {"no":78,"date":"June 30, 2026","kickoff":"12:00 p.m.","utc":"-5","home":"Runner-up Group E","away":"Runner-up Group I","venue":"AT&T Stadium, Arlington","stage":"R32"},
    {"no":79,"date":"June 30, 2026","kickoff":"7:00 p.m.","utc":"-6","home":"Winner Group A","away":"3rd Group C/E/F/H/I","venue":"Estadio Azteca, Mexico City","stage":"R32"},
    {"no":80,"date":"July 1, 2026","kickoff":"12:00 p.m.","utc":"-4","home":"Winner Group L","away":"3rd Group E/H/I/J/K","venue":"Mercedes-Benz Stadium, Atlanta","stage":"R32"},
    {"no":81,"date":"July 1, 2026","kickoff":"5:00 p.m.","utc":"-7","home":"Winner Group D","away":"3rd Group B/E/F/I/J","venue":"Levi's Stadium, Santa Clara","stage":"R32"},
    {"no":82,"date":"July 1, 2026","kickoff":"1:00 p.m.","utc":"-7","home":"Winner Group G","away":"3rd Group A/E/H/I/J","venue":"Lumen Field, Seattle","stage":"R32"},
    {"no":83,"date":"July 2, 2026","kickoff":"7:00 p.m.","utc":"-4","home":"Runner-up Group K","away":"Runner-up Group L","venue":"BMO Field, Toronto","stage":"R32"},
    {"no":84,"date":"July 2, 2026","kickoff":"12:00 p.m.","utc":"-7","home":"Winner Group H","away":"Runner-up Group J","venue":"SoFi Stadium, Inglewood","stage":"R32"},
    {"no":85,"date":"July 2, 2026","kickoff":"8:00 p.m.","utc":"-7","home":"Winner Group B","away":"3rd Group E/F/G/I/J","venue":"BC Place, Vancouver","stage":"R32"},
    {"no":86,"date":"July 3, 2026","kickoff":"6:00 p.m.","utc":"-4","home":"Winner Group J","away":"Runner-up Group H","venue":"Hard Rock Stadium, Miami Gardens","stage":"R32"},
    {"no":87,"date":"July 3, 2026","kickoff":"8:30 p.m.","utc":"-5","home":"Winner Group K","away":"3rd Group D/E/I/J/L","venue":"Arrowhead Stadium, Kansas City","stage":"R32"},
    {"no":88,"date":"July 3, 2026","kickoff":"1:00 p.m.","utc":"-5","home":"Runner-up Group D","away":"Runner-up Group G","venue":"AT&T Stadium, Arlington","stage":"R32"},
    {"no":89,"date":"July 4, 2026","kickoff":"5:00 p.m.","utc":"-4","home":"Winner Match 74","away":"Winner Match 77","venue":"Lincoln Financial Field, Philadelphia","stage":"R16"},
    {"no":90,"date":"July 4, 2026","kickoff":"12:00 p.m.","utc":"-5","home":"Winner Match 73","away":"Winner Match 75","venue":"NRG Stadium, Houston","stage":"R16"},
    {"no":91,"date":"July 5, 2026","kickoff":"4:00 p.m.","utc":"-4","home":"Winner Match 76","away":"Winner Match 78","venue":"MetLife Stadium, East Rutherford","stage":"R16"},
    {"no":92,"date":"July 5, 2026","kickoff":"6:00 p.m.","utc":"-6","home":"Winner Match 79","away":"Winner Match 80","venue":"Estadio Azteca, Mexico City","stage":"R16"},
    {"no":93,"date":"July 6, 2026","kickoff":"2:00 p.m.","utc":"-5","home":"Winner Match 83","away":"Winner Match 84","venue":"AT&T Stadium, Arlington","stage":"R16"},
    {"no":94,"date":"July 6, 2026","kickoff":"5:00 p.m.","utc":"-7","home":"Winner Match 81","away":"Winner Match 82","venue":"Lumen Field, Seattle","stage":"R16"},
    {"no":95,"date":"July 7, 2026","kickoff":"12:00 p.m.","utc":"-4","home":"Winner Match 86","away":"Winner Match 88","venue":"Mercedes-Benz Stadium, Atlanta","stage":"R16"},
    {"no":96,"date":"July 7, 2026","kickoff":"1:00 p.m.","utc":"-7","home":"Winner Match 85","away":"Winner Match 87","venue":"BC Place, Vancouver","stage":"R16"},
    {"no":97,"date":"July 9, 2026","kickoff":"4:00 p.m.","utc":"-4","home":"Winner Match 89","away":"Winner Match 90","venue":"Gillette Stadium, Foxborough","stage":"QF"},
    {"no":98,"date":"July 10, 2026","kickoff":"12:00 p.m.","utc":"-7","home":"Winner Match 93","away":"Winner Match 94","venue":"SoFi Stadium, Inglewood","stage":"QF"},
    {"no":99,"date":"July 11, 2026","kickoff":"5:00 p.m.","utc":"-4","home":"Winner Match 91","away":"Winner Match 92","venue":"Hard Rock Stadium, Miami Gardens","stage":"QF"},
    {"no":100,"date":"July 11, 2026","kickoff":"8:00 p.m.","utc":"-5","home":"Winner Match 95","away":"Winner Match 96","venue":"Arrowhead Stadium, Kansas City","stage":"QF"},
    {"no":101,"date":"July 14, 2026","kickoff":"2:00 p.m.","utc":"-5","home":"Winner Match 97","away":"Winner Match 98","venue":"AT&T Stadium, Arlington","stage":"SF"},
    {"no":102,"date":"July 15, 2026","kickoff":"3:00 p.m.","utc":"-4","home":"Winner Match 99","away":"Winner Match 100","venue":"Mercedes-Benz Stadium, Atlanta","stage":"SF"},
    {"no":103,"date":"July 18, 2026","kickoff":"5:00 p.m.","utc":"-4","home":"Loser Match 101","away":"Loser Match 102","venue":"Hard Rock Stadium, Miami Gardens","stage":"3RD"},
    {"no":104,"date":"July 19, 2026","kickoff":"3:00 p.m.","utc":"-4","home":"Winner Match 101","away":"Winner Match 102","venue":"MetLife Stadium, East Rutherford","stage":"FINAL"}
  ]
};

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
