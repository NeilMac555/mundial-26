// data.jsx — Mundial '26 fixture/team data (fictional)
// Original content; team names are real public domain national sides.

const GROUPS = {
  A: [
    { code: 'MEX', name: 'Mexico',       p: 3, w: 2, d: 1, l: 0, gf: 5, ga: 1, pts: 7, form: 'WWD' },
    { code: 'POR', name: 'Portugal',     p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 2, pts: 6, form: 'WLW' },
    { code: 'KOR', name: 'South Korea',  p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 4, pts: 3, form: 'LWL' },
    { code: 'GHA', name: 'Ghana',        p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 5, pts: 1, form: 'LDL' },
  ],
  B: [
    { code: 'ARG', name: 'Argentina',    p: 3, w: 3, d: 0, l: 0, gf: 7, ga: 1, pts: 9, form: 'WWW' },
    { code: 'NED', name: 'Netherlands',  p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, pts: 6, form: 'WWL' },
    { code: 'CRC', name: 'Costa Rica',   p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 5, pts: 3, form: 'LWL' },
    { code: 'AUS', name: 'Australia',    p: 3, w: 0, d: 0, l: 3, gf: 1, ga: 6, pts: 0, form: 'LLL' },
  ],
  C: [
    { code: 'FRA', name: 'France',       p: 3, w: 2, d: 1, l: 0, gf: 6, ga: 2, pts: 7, form: 'WDW' },
    { code: 'CRO', name: 'Croatia',      p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 3, pts: 6, form: 'WLW' },
    { code: 'NGA', name: 'Nigeria',      p: 3, w: 1, d: 1, l: 1, gf: 3, ga: 3, pts: 4, form: 'DWL' },
    { code: 'JPN', name: 'Japan',        p: 3, w: 0, d: 0, l: 3, gf: 1, ga: 6, pts: 0, form: 'LLL' },
  ],
  D: [
    { code: 'BRA', name: 'Brazil',       p: 3, w: 3, d: 0, l: 0, gf: 8, ga: 2, pts: 9, form: 'WWW' },
    { code: 'ENG', name: 'England',      p: 3, w: 2, d: 1, l: 0, gf: 5, ga: 1, pts: 7, form: 'WDW' },
    { code: 'SEN', name: 'Senegal',      p: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, pts: 3, form: 'WLL' },
    { code: 'CAN', name: 'Canada',       p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 4, pts: 1, form: 'LDL' },
  ],
  E: [
    { code: 'ESP', name: 'Spain',        p: 3, w: 2, d: 1, l: 0, gf: 6, ga: 2, pts: 7, form: 'WWD' },
    { code: 'GER', name: 'Germany',      p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, pts: 6, form: 'LWW' },
    { code: 'URU', name: 'Uruguay',      p: 3, w: 1, d: 1, l: 1, gf: 3, ga: 3, pts: 4, form: 'WDL' },
    { code: 'MAR', name: 'Morocco',      p: 3, w: 0, d: 0, l: 3, gf: 1, ga: 7, pts: 0, form: 'LLL' },
  ],
  F: [
    { code: 'BEL', name: 'Belgium',      p: 3, w: 2, d: 1, l: 0, gf: 4, ga: 1, pts: 7, form: 'WDW' },
    { code: 'COL', name: 'Colombia',     p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 2, pts: 6, form: 'WWL' },
    { code: 'EGY', name: 'Egypt',        p: 3, w: 1, d: 1, l: 1, gf: 2, ga: 3, pts: 4, form: 'DWL' },
    { code: 'USA', name: 'United States', p: 3, w: 0, d: 0, l: 3, gf: 1, ga: 6, pts: 0, form: 'LLL' },
  ],
  G: [
    { code: 'ITA', name: 'Italy',        p: 3, w: 3, d: 0, l: 0, gf: 6, ga: 1, pts: 9, form: 'WWW' },
    { code: 'SUI', name: 'Switzerland',  p: 3, w: 1, d: 1, l: 1, gf: 3, ga: 3, pts: 4, form: 'WDL' },
    { code: 'CMR', name: 'Cameroon',     p: 3, w: 1, d: 1, l: 1, gf: 2, ga: 3, pts: 4, form: 'DLW' },
    { code: 'ECU', name: 'Ecuador',      p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 5, pts: 1, form: 'LDL' },
  ],
  H: [
    { code: 'POL', name: 'Poland',       p: 3, w: 2, d: 1, l: 0, gf: 4, ga: 1, pts: 7, form: 'DWW' },
    { code: 'DEN', name: 'Denmark',      p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 2, pts: 6, form: 'WLW' },
    { code: 'SRB', name: 'Serbia',       p: 3, w: 1, d: 0, l: 2, gf: 3, ga: 4, pts: 3, form: 'WLL' },
    { code: 'TUN', name: 'Tunisia',      p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 5, pts: 1, form: 'LDL' },
  ],
};

// Group colors for the retro feel
const GROUP_COLORS = {
  A: '#C84B31', B: '#D89A2E', C: '#3F6F3A', D: '#8B3A2E',
  E: '#4A6B7C', F: '#C76428', G: '#6B4226', H: '#2E5840',
};

// Fixtures with odds (decimal). Mix of completed + upcoming.
const FIXTURES = [
  { id: 1, group: 'B', date: 'JUN 13', time: '15:00', stage: 'GS-MD3', venue: 'AZTECA',
    home: 'ARG', away: 'AUS', hs: 3, as: 0, status: 'FT',
    odds: { h: 1.45, d: 4.20, a: 7.50 } },
  { id: 2, group: 'D', date: 'JUN 13', time: '18:00', stage: 'GS-MD3', venue: 'METLIFE',
    home: 'BRA', away: 'CAN', hs: 4, as: 1, status: 'FT',
    odds: { h: 1.30, d: 5.50, a: 9.00 } },
  { id: 3, group: 'A', date: 'JUN 14', time: '12:00', stage: 'GS-MD3', venue: 'SOFI',
    home: 'MEX', away: 'GHA', hs: null, as: null, status: 'LIVE 67\'',
    odds: { h: 1.60, d: 3.80, a: 5.20 } },
  { id: 4, group: 'C', date: 'JUN 14', time: '15:00', stage: 'GS-MD3', venue: 'ARROWHEAD',
    home: 'FRA', away: 'JPN', hs: null, as: null, status: 'LIVE 23\'',
    odds: { h: 1.40, d: 4.50, a: 7.00 } },
  { id: 5, group: 'E', date: 'JUN 14', time: '18:00', stage: 'GS-MD3', venue: 'GILLETTE',
    home: 'ESP', away: 'MAR', hs: null, as: null, status: '',
    odds: { h: 1.55, d: 4.00, a: 5.80 } },
  { id: 6, group: 'F', date: 'JUN 15', time: '12:00', stage: 'GS-MD3', venue: 'LEVI\'S',
    home: 'BEL', away: 'USA', hs: null, as: null, status: '',
    odds: { h: 1.85, d: 3.50, a: 4.20 } },
  { id: 7, group: 'G', date: 'JUN 15', time: '15:00', stage: 'GS-MD3', venue: 'HARD ROCK',
    home: 'ITA', away: 'ECU', hs: null, as: null, status: '',
    odds: { h: 1.50, d: 4.10, a: 6.20 } },
  { id: 8, group: 'H', date: 'JUN 15', time: '18:00', stage: 'GS-MD3', venue: 'NRG',
    home: 'POL', away: 'TUN', hs: null, as: null, status: '',
    odds: { h: 1.65, d: 3.90, a: 5.00 } },
];

// Brazil squad (sample team for profile)
const BRA_SQUAD = {
  GK: [
    { n: 1,  name: 'ALISSON',     club: 'LIVERPOOL',     age: 33, caps: 76, goals: 0 },
    { n: 12, name: 'EDERSON',     club: 'MAN CITY',      age: 32, caps: 31, goals: 0 },
    { n: 23, name: 'BENTO',       club: 'AL-NASSR',      age: 26, caps: 9,  goals: 0 },
  ],
  DEF: [
    { n: 2,  name: 'DANILO',      club: 'JUVENTUS',      age: 34, caps: 60, goals: 1 },
    { n: 3,  name: 'MARQUINHOS',  club: 'PSG',           age: 31, caps: 88, goals: 7 },
    { n: 4,  name: 'GABRIEL',     club: 'ARSENAL',       age: 28, caps: 24, goals: 1 },
    { n: 6,  name: 'WENDELL',     club: 'PORTO',         age: 32, caps: 11, goals: 0 },
    { n: 13, name: 'MILITÃO',     club: 'REAL MADRID',   age: 28, caps: 27, goals: 1 },
    { n: 14, name: 'BREMER',      club: 'JUVENTUS',      age: 28, caps: 13, goals: 0 },
  ],
  MID: [
    { n: 5,  name: 'CASEMIRO',    club: 'MAN UNITED',    age: 34, caps: 78, goals: 8 },
    { n: 8,  name: 'BRUNO G.',    club: 'NEWCASTLE',     age: 30, caps: 31, goals: 0 },
    { n: 15, name: 'ANDRÉ',       club: 'WOLVES',        age: 24, caps: 9,  goals: 0 },
    { n: 17, name: 'PAQUETÁ',     club: 'WEST HAM',      age: 28, caps: 47, goals: 11 },
    { n: 18, name: 'JOÃO GOMES',  club: 'WOLVES',        age: 24, caps: 6,  goals: 0 },
  ],
  FWD: [
    { n: 7,  name: 'VINI JR.',    club: 'REAL MADRID',   age: 25, caps: 38, goals: 6 },
    { n: 9,  name: 'ENDRICK',     club: 'REAL MADRID',   age: 19, caps: 14, goals: 4 },
    { n: 10, name: 'RODRYGO',     club: 'REAL MADRID',   age: 25, caps: 33, goals: 7 },
    { n: 11, name: 'RAPHINHA',    club: 'BARCELONA',     age: 29, caps: 30, goals: 6 },
    { n: 19, name: 'MARTINELLI',  club: 'ARSENAL',       age: 24, caps: 17, goals: 1 },
  ],
};

const BRA_FORM = [
  { date: 'JUN 11', opp: 'SEN', venue: 'H', score: '3-1', result: 'W', comp: 'WC GS' },
  { date: 'JUN 7',  opp: 'CAN', venue: 'A', score: '2-0', result: 'W', comp: 'WC GS' },
  { date: 'JUN 1',  opp: 'ENG', venue: 'A', score: '3-1', result: 'W', comp: 'WC GS' },
  { date: 'MAR 26', opp: 'ESP', venue: 'A', score: '3-3', result: 'D', comp: 'FRIENDLY' },
  { date: 'MAR 22', opp: 'ENG', venue: 'A', score: '1-0', result: 'W', comp: 'FRIENDLY' },
];

const NEWS = [
  { id: 1, tag: 'INJURY',    team: 'ARG', headline: 'Lisandro Martínez doubtful for Round of 16, scan tomorrow', time: '14m', source: 'ALBICELESTE WIRE' },
  { id: 2, tag: 'LINEUP',    team: 'BRA', headline: 'Dorival rotates: Endrick to start, Vini benched for rest', time: '38m', source: 'GLOBO ESPORTE' },
  { id: 3, tag: 'ODDS',      team: 'FRA', headline: 'France shorten to 4.50 outright after Mbappé hat-trick', time: '1h',  source: 'MARCA ODDS' },
  { id: 4, tag: 'TRANSFER',  team: 'ENG', headline: 'Bellingham father confirms post-tournament club talks paused', time: '2h',  source: 'THE TIMES' },
  { id: 5, tag: 'TACTICS',   team: 'GER', headline: 'Nagelsmann hints at back-three switch vs. Spain', time: '3h',  source: 'KICKER' },
  { id: 6, tag: 'PRESSER',   team: 'POR', headline: 'Ronaldo: "This is my last dance, but we are far from done"', time: '4h',  source: 'A BOLA' },
  { id: 7, tag: 'WEATHER',   team: '—',   headline: 'Heat advisory issued for Dallas, KO times under review', time: '5h',  source: 'FIFA OPS' },
  { id: 8, tag: 'INJURY',    team: 'NED', headline: 'De Jong returns to full training, available vs. Costa Rica', time: '6h',  source: 'AD' },
];

// Tiny SVG flag-stripes by country (NOT real flags — abstracted retro stripes)
function FlagSwatch({ code, w = 28, h = 18 }) {
  const palettes = {
    MEX: ['#006847', '#FFFFFF', '#CE1126'],
    POR: ['#006600', '#006600', '#FF0000'],
    KOR: ['#FFFFFF', '#CD2E3A', '#0047A0'],
    GHA: ['#CE1126', '#FCD116', '#006B3F'],
    ARG: ['#74ACDF', '#FFFFFF', '#74ACDF'],
    NED: ['#AE1C28', '#FFFFFF', '#21468B'],
    CRC: ['#002B7F', '#FFFFFF', '#CE1126'],
    AUS: ['#012169', '#FFFFFF', '#E4002B'],
    FRA: ['#0055A4', '#FFFFFF', '#EF4135'],
    CRO: ['#FF0000', '#FFFFFF', '#171796'],
    NGA: ['#008751', '#FFFFFF', '#008751'],
    JPN: ['#FFFFFF', '#BC002D', '#FFFFFF'],
    BRA: ['#FEDF00', '#009C3B', '#002776'],
    ENG: ['#FFFFFF', '#CE1124', '#FFFFFF'],
    SEN: ['#00853F', '#FDEF42', '#E31B23'],
    CAN: ['#FF0000', '#FFFFFF', '#FF0000'],
    ESP: ['#AA151B', '#F1BF00', '#AA151B'],
    GER: ['#000000', '#DD0000', '#FFCE00'],
    URU: ['#7B96D4', '#FFFFFF', '#7B96D4'],
    MAR: ['#C1272D', '#006233', '#C1272D'],
    BEL: ['#000000', '#FFD90C', '#EF3340'],
    COL: ['#FCD116', '#003893', '#CE1126'],
    EGY: ['#CE1126', '#FFFFFF', '#000000'],
    USA: ['#3C3B6E', '#FFFFFF', '#B22234'],
    ITA: ['#008C45', '#F4F5F0', '#CD212A'],
    SUI: ['#D52B1E', '#FFFFFF', '#D52B1E'],
    CMR: ['#007A5E', '#CE1126', '#FCD116'],
    ECU: ['#FFD100', '#0072CE', '#EF3340'],
    POL: ['#FFFFFF', '#DC143C', '#FFFFFF'],
    DEN: ['#C8102E', '#FFFFFF', '#C8102E'],
    SRB: ['#C6363C', '#0C4076', '#FFFFFF'],
    TUN: ['#E70013', '#FFFFFF', '#E70013'],
  };
  const p = palettes[code] || ['#888', '#aaa', '#666'];
  return (
    <svg width={w} height={h} viewBox="0 0 30 20" style={{ display: 'block', borderRadius: 1, border: '1px solid rgba(0,0,0,.15)' }}>
      <rect x="0" y="0" width="10" height="20" fill={p[0]} />
      <rect x="10" y="0" width="10" height="20" fill={p[1]} />
      <rect x="20" y="0" width="10" height="20" fill={p[2]} />
    </svg>
  );
}

Object.assign(window, { GROUPS, GROUP_COLORS, FIXTURES, BRA_SQUAD, BRA_FORM, NEWS, FlagSwatch });
