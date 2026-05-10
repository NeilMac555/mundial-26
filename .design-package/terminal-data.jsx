// terminal-data.jsx — analytics-terminal data layer
// Over/Under-Achievers, ELO, market value, conditions, etc.

// 32 confirmed sides for '26. Mix of qualified + projected.
const T_TEAMS = [
  // Group A (host)
  { code: 'MEX', name: 'Mexico',          conf: 'CONCACAF', host: true,  pop: 'Mexico City',     elo: 1742, eloDelta: -34, gp: 16, w: 9, d: 4, l: 3, gf: 28, ga: 14,
    expPts: 1.78, actualPts: 1.94, mvEur: 412,  xgFor: 1.62, xgAg: 0.95, qXg: 1.55, heatIdx: 78, altIdx: 92, americasIdx: 96 },
  { code: 'POR', name: 'Portugal',        conf: 'UEFA',     host: false, pop: 'Lisbon',          elo: 1989, eloDelta:  18, gp: 18, w: 13, d: 3, l: 2, gf: 41, ga: 12,
    expPts: 2.21, actualPts: 2.33, mvEur: 1110, xgFor: 2.31, xgAg: 0.78, qXg: 2.42, heatIdx: 58, altIdx: 41, americasIdx: 38 },
  { code: 'KOR', name: 'South Korea',     conf: 'AFC',      host: false, pop: 'Seoul',           elo: 1622, eloDelta:  -8, gp: 14, w: 8, d: 3, l: 3, gf: 22, ga: 11,
    expPts: 1.71, actualPts: 1.93, mvEur: 198,  xgFor: 1.48, xgAg: 0.82, qXg: 1.61, heatIdx: 62, altIdx: 28, americasIdx: 22 },
  { code: 'GHA', name: 'Ghana',           conf: 'CAF',      host: false, pop: 'Accra',           elo: 1538, eloDelta:  21, gp: 12, w: 6, d: 4, l: 2, gf: 16, ga: 9,
    expPts: 1.45, actualPts: 1.83, mvEur:  84,  xgFor: 1.18, xgAg: 0.91, qXg: 1.34, heatIdx: 88, altIdx: 18, americasIdx: 12 },
  // B
  { code: 'ARG', name: 'Argentina',       conf: 'CONMEBOL', host: false, pop: 'Buenos Aires',    elo: 2068, eloDelta:  12, gp: 18, w: 14, d: 3, l: 1, gf: 39, ga: 9,
    expPts: 2.42, actualPts: 2.50, mvEur: 894,  xgFor: 2.14, xgAg: 0.61, qXg: 2.36, heatIdx: 71, altIdx: 64, americasIdx: 88 },
  { code: 'NED', name: 'Netherlands',     conf: 'UEFA',     host: false, pop: 'Amsterdam',       elo: 1934, eloDelta:  -4, gp: 14, w: 9, d: 3, l: 2, gf: 28, ga: 12,
    expPts: 2.07, actualPts: 2.14, mvEur: 762,  xgFor: 1.89, xgAg: 0.92, qXg: 1.94, heatIdx: 52, altIdx: 32, americasIdx: 36 },
  { code: 'CRC', name: 'Costa Rica',      conf: 'CONCACAF', host: false, pop: 'San José',        elo: 1488, eloDelta: -22, gp: 14, w: 5, d: 4, l: 5, gf: 14, ga: 14,
    expPts: 1.51, actualPts: 1.36, mvEur:  46,  xgFor: 1.04, xgAg: 1.18, qXg: 1.18, heatIdx: 84, altIdx: 51, americasIdx: 92 },
  { code: 'AUS', name: 'Australia',       conf: 'AFC',      host: false, pop: 'Sydney',          elo: 1523, eloDelta: -16, gp: 16, w: 7, d: 4, l: 5, gf: 19, ga: 16,
    expPts: 1.52, actualPts: 1.56, mvEur: 152,  xgFor: 1.18, xgAg: 1.02, qXg: 1.31, heatIdx: 64, altIdx: 22, americasIdx: 18 },
  // C
  { code: 'FRA', name: 'France',          conf: 'UEFA',     host: false, pop: 'Paris',           elo: 2086, eloDelta:  24, gp: 16, w: 12, d: 3, l: 1, gf: 38, ga: 8,
    expPts: 2.32, actualPts: 2.44, mvEur: 1284, xgFor: 2.22, xgAg: 0.58, qXg: 2.38, heatIdx: 56, altIdx: 28, americasIdx: 41 },
  { code: 'CRO', name: 'Croatia',         conf: 'UEFA',     host: false, pop: 'Zagreb',          elo: 1871, eloDelta: -12, gp: 14, w: 8, d: 4, l: 2, gf: 22, ga: 11,
    expPts: 1.91, actualPts: 2.00, mvEur: 388,  xgFor: 1.66, xgAg: 0.91, qXg: 1.71, heatIdx: 48, altIdx: 36, americasIdx: 28 },
  { code: 'NGA', name: 'Nigeria',         conf: 'CAF',      host: false, pop: 'Lagos',           elo: 1644, eloDelta:  10, gp: 12, w: 6, d: 4, l: 2, gf: 18, ga: 10,
    expPts: 1.63, actualPts: 1.83, mvEur: 198,  xgFor: 1.42, xgAg: 0.96, qXg: 1.48, heatIdx: 86, altIdx: 14, americasIdx: 14 },
  { code: 'JPN', name: 'Japan',           conf: 'AFC',      host: false, pop: 'Tokyo',           elo: 1758, eloDelta:  14, gp: 14, w: 11, d: 2, l: 1, gf: 32, ga: 7,
    expPts: 2.22, actualPts: 2.50, mvEur: 264,  xgFor: 1.94, xgAg: 0.62, qXg: 2.08, heatIdx: 58, altIdx: 22, americasIdx: 24 },
  // D
  { code: 'BRA', name: 'Brazil',          conf: 'CONMEBOL', host: false, pop: 'Rio de Janeiro',  elo: 2042, eloDelta:  -8, gp: 18, w: 13, d: 3, l: 2, gf: 36, ga: 11,
    expPts: 2.31, actualPts: 2.33, mvEur: 988,  xgFor: 2.09, xgAg: 0.71, qXg: 2.18, heatIdx: 78, altIdx: 58, americasIdx: 84 },
  { code: 'ENG', name: 'England',         conf: 'UEFA',     host: false, pop: 'London',          elo: 1971, eloDelta:   6, gp: 14, w: 10, d: 3, l: 1, gf: 28, ga: 8,
    expPts: 2.18, actualPts: 2.36, mvEur: 1342, xgFor: 1.92, xgAg: 0.66, qXg: 2.06, heatIdx: 49, altIdx: 28, americasIdx: 38 },
  { code: 'SEN', name: 'Senegal',         conf: 'CAF',      host: false, pop: 'Dakar',           elo: 1696, eloDelta: -18, gp: 12, w: 6, d: 3, l: 3, gf: 16, ga: 11,
    expPts: 1.74, actualPts: 1.75, mvEur: 168,  xgFor: 1.31, xgAg: 0.94, qXg: 1.42, heatIdx: 89, altIdx: 14, americasIdx: 12 },
  { code: 'CAN', name: 'Canada',          conf: 'CONCACAF', host: true,  pop: 'Toronto',         elo: 1574, eloDelta:  16, gp: 16, w: 7, d: 5, l: 4, gf: 22, ga: 16,
    expPts: 1.46, actualPts: 1.63, mvEur: 188,  xgFor: 1.32, xgAg: 1.08, qXg: 1.41, heatIdx: 38, altIdx: 22, americasIdx: 92 },
  // E
  { code: 'ESP', name: 'Spain',           conf: 'UEFA',     host: false, pop: 'Madrid',          elo: 2014, eloDelta:  18, gp: 14, w: 11, d: 2, l: 1, gf: 31, ga: 8,
    expPts: 2.18, actualPts: 2.50, mvEur: 1184, xgFor: 2.03, xgAg: 0.62, qXg: 2.18, heatIdx: 64, altIdx: 38, americasIdx: 32 },
  { code: 'GER', name: 'Germany',         conf: 'UEFA',     host: false, pop: 'Berlin',          elo: 1893, eloDelta: -28, gp: 14, w: 8, d: 3, l: 3, gf: 24, ga: 14,
    expPts: 2.04, actualPts: 1.93, mvEur: 988,  xgFor: 1.78, xgAg: 0.94, qXg: 1.76, heatIdx: 52, altIdx: 32, americasIdx: 32 },
  { code: 'URU', name: 'Uruguay',         conf: 'CONMEBOL', host: false, pop: 'Montevideo',      elo: 1812, eloDelta:   2, gp: 18, w: 9, d: 5, l: 4, gf: 24, ga: 17,
    expPts: 1.83, actualPts: 1.78, mvEur: 354,  xgFor: 1.51, xgAg: 1.04, qXg: 1.62, heatIdx: 62, altIdx: 36, americasIdx: 84 },
  { code: 'MAR', name: 'Morocco',         conf: 'CAF',      host: false, pop: 'Rabat',           elo: 1786, eloDelta:  32, gp: 12, w: 9, d: 2, l: 1, gf: 22, ga: 6,
    expPts: 1.92, actualPts: 2.42, mvEur: 312,  xgFor: 1.67, xgAg: 0.62, qXg: 1.81, heatIdx: 76, altIdx: 41, americasIdx: 22 },
  // F
  { code: 'BEL', name: 'Belgium',         conf: 'UEFA',     host: false, pop: 'Brussels',        elo: 1873, eloDelta:  -6, gp: 14, w: 8, d: 4, l: 2, gf: 24, ga: 12,
    expPts: 1.97, actualPts: 2.00, mvEur: 624,  xgFor: 1.81, xgAg: 0.96, qXg: 1.84, heatIdx: 48, altIdx: 28, americasIdx: 32 },
  { code: 'COL', name: 'Colombia',        conf: 'CONMEBOL', host: false, pop: 'Bogotá',          elo: 1846, eloDelta:  22, gp: 18, w: 10, d: 5, l: 3, gf: 26, ga: 14,
    expPts: 1.93, actualPts: 1.94, mvEur: 412,  xgFor: 1.62, xgAg: 0.92, qXg: 1.71, heatIdx: 71, altIdx: 86, americasIdx: 78 },
  { code: 'EGY', name: 'Egypt',           conf: 'CAF',      host: false, pop: 'Cairo',           elo: 1592, eloDelta: -12, gp: 12, w: 5, d: 4, l: 3, gf: 14, ga: 10,
    expPts: 1.61, actualPts: 1.58, mvEur: 124,  xgFor: 1.21, xgAg: 1.02, qXg: 1.31, heatIdx: 92, altIdx: 21, americasIdx: 12 },
  { code: 'USA', name: 'United States',   conf: 'CONCACAF', host: true,  pop: 'Multiple',        elo: 1714, eloDelta:  18, gp: 18, w: 10, d: 5, l: 3, gf: 28, ga: 14,
    expPts: 1.66, actualPts: 1.94, mvEur: 482,  xgFor: 1.58, xgAg: 0.96, qXg: 1.71, heatIdx: 56, altIdx: 32, americasIdx: 100 },
  // G
  { code: 'ITA', name: 'Italy',           conf: 'UEFA',     host: false, pop: 'Rome',            elo: 1924, eloDelta:  14, gp: 14, w: 10, d: 3, l: 1, gf: 28, ga: 8,
    expPts: 2.07, actualPts: 2.36, mvEur: 712,  xgFor: 1.84, xgAg: 0.74, qXg: 1.92, heatIdx: 52, altIdx: 32, americasIdx: 36 },
  { code: 'SUI', name: 'Switzerland',     conf: 'UEFA',     host: false, pop: 'Zurich',          elo: 1781, eloDelta: -10, gp: 14, w: 7, d: 4, l: 3, gf: 19, ga: 12,
    expPts: 1.81, actualPts: 1.79, mvEur: 246,  xgFor: 1.42, xgAg: 0.98, qXg: 1.48, heatIdx: 46, altIdx: 64, americasIdx: 28 },
  { code: 'CMR', name: 'Cameroon',        conf: 'CAF',      host: false, pop: 'Yaoundé',         elo: 1604, eloDelta:  -8, gp: 12, w: 6, d: 3, l: 3, gf: 16, ga: 12,
    expPts: 1.61, actualPts: 1.75, mvEur: 96,   xgFor: 1.28, xgAg: 0.98, qXg: 1.31, heatIdx: 86, altIdx: 31, americasIdx: 18 },
  { code: 'ECU', name: 'Ecuador',         conf: 'CONMEBOL', host: false, pop: 'Quito',           elo: 1714, eloDelta:  10, gp: 18, w: 8, d: 5, l: 5, gf: 21, ga: 17,
    expPts: 1.74, actualPts: 1.61, mvEur: 224,  xgFor: 1.41, xgAg: 1.04, qXg: 1.46, heatIdx: 71, altIdx: 96, americasIdx: 76 },
  // H
  { code: 'POL', name: 'Poland',          conf: 'UEFA',     host: false, pop: 'Warsaw',          elo: 1738, eloDelta:  -2, gp: 14, w: 8, d: 4, l: 2, gf: 22, ga: 11,
    expPts: 1.84, actualPts: 2.00, mvEur: 312,  xgFor: 1.58, xgAg: 0.92, qXg: 1.62, heatIdx: 48, altIdx: 22, americasIdx: 24 },
  { code: 'DEN', name: 'Denmark',         conf: 'UEFA',     host: false, pop: 'Copenhagen',      elo: 1804, eloDelta:   8, gp: 14, w: 8, d: 4, l: 2, gf: 22, ga: 9,
    expPts: 1.91, actualPts: 2.00, mvEur: 348,  xgFor: 1.62, xgAg: 0.81, qXg: 1.71, heatIdx: 42, altIdx: 22, americasIdx: 28 },
  { code: 'SRB', name: 'Serbia',          conf: 'UEFA',     host: false, pop: 'Belgrade',        elo: 1721, eloDelta: -14, gp: 14, w: 6, d: 4, l: 4, gf: 18, ga: 14,
    expPts: 1.84, actualPts: 1.57, mvEur: 218,  xgFor: 1.41, xgAg: 1.04, qXg: 1.42, heatIdx: 52, altIdx: 36, americasIdx: 22 },
  { code: 'TUN', name: 'Tunisia',         conf: 'CAF',      host: false, pop: 'Tunis',           elo: 1582, eloDelta:   2, gp: 12, w: 5, d: 4, l: 3, gf: 12, ga: 9,
    expPts: 1.62, actualPts: 1.58, mvEur:  84,  xgFor: 1.16, xgAg: 0.94, qXg: 1.24, heatIdx: 88, altIdx: 26, americasIdx: 14 },
];

// Snapshot meta (top-of-table caption)
const T_META = {
  snapshot: 'MAY 06 2026 · 09:54 UTC',
  source: 'EloRatings.net · FBref · Transfermarkt · Pinnacle',
  scope: 'Qualifying cycle — Sep 2024 → Mar 2026',
  methodology: 'Δ vs. expected pts/match given pre-qualifying ELO opponents. Tier breakpoints: ±0.10 met, ±0.25 clear, ±0.40 massive.',
};

// Sidebar nav structure
const T_NAV = [
  {
    section: 'Performance',
    items: [
      { id: 'overview',     label: 'Tournament Overview' },
      { id: 'achievers',    label: 'Over/Under-Achievers', primary: true },
      { id: 'sos',          label: 'Strength of Schedule' },
      { id: 'qxg',          label: 'Qualifying xG' },
      { id: 'mv',           label: 'Squad Market Value' },
    ],
  },
  {
    section: 'Conditions',
    items: [
      { id: 'heat',         label: 'Heat Vulnerability' },
      { id: 'altitude',     label: 'Altitude Exposure' },
      { id: 'americas',     label: 'Americas-Host Effect' },
    ],
  },
  {
    section: 'Markets',
    items: [
      { id: 'goldenboot',   label: 'Golden Boot Forecast' },
      { id: 'compare',      label: 'Team Compare' },
    ],
  },
  {
    section: 'Reference',
    items: [
      { id: 'fixtures',     label: 'Group Draw & Fixtures' },
      { id: 'rules',        label: 'New FIFA 2026 Rules' },
    ],
  },
];

// Tier classifier shared by Over/Under-Achievers
function tierFor(delta) {
  if (delta <= -0.40) return { key: 'massive-under', label: 'Massive under', step: 0 };
  if (delta <= -0.10) return { key: 'clear-under',   label: 'Clear under',   step: 1 };
  if (delta <   0.10) return { key: 'met',           label: 'Met',           step: 2 };
  if (delta <   0.40) return { key: 'clear-over',    label: 'Clear over',    step: 3 };
  return                       { key: 'massive-over', label: 'Massive over', step: 4 };
}

// Heatmap colours: red → neutral grey → gold (5 stops)
const TIER_COLORS = [
  '#7a2535', // massive under
  '#a64a55', // clear under
  '#3a4150', // met / neutral
  '#c89a3e', // clear over
  '#e8b94a', // massive over
];

Object.assign(window, { T_TEAMS, T_META, T_NAV, tierFor, TIER_COLORS });
