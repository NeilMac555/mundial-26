// scripts/fetch-odds.mjs
//
// Pulls live World Cup 2026 odds from The Odds API and writes them to
// src/data/oddsLive.json. Runs from the command line via `npm run fetch-odds`.
//
// API key is read from .env.local (ODDS_API_KEY=...) — never bundled into the
// browser. The output JSON is committed so the site has data without needing
// the key at build time. Re-run whenever you want fresh prices.
//
// Usage:
//   npm run fetch-odds            # fetch outrights + matches
//   npm run fetch-odds -- --skip-matches   # outrights only (saves credits)
//
// Free-tier Odds API costs: 1 credit per region per market per call.
// We hit 5 regions × 1 market × 2 sport keys = ~10 credits per full fetch.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ---------- read key from .env.local ----------
function loadApiKey() {
  let raw;
  try {
    raw = readFileSync(resolve(ROOT, '.env.local'), 'utf8');
  } catch {
    throw new Error('Could not read .env.local. Put ODDS_API_KEY=... in it.');
  }
  const m = raw.match(/^ODDS_API_KEY\s*=\s*(.+?)\s*$/m);
  if (!m) throw new Error('ODDS_API_KEY not found in .env.local');
  return m[1].trim();
}

// ---------- team name → FIFA code mapping ----------
// The Odds API returns full team names; our bracket data is keyed by FIFA codes.
// This map covers every quirk we've hit (Türkiye/Turkey, Czechia/Czech Republic, etc.).
const NAME_TO_CODE = {
  'Mexico': 'MEX',
  'South Africa': 'RSA',
  'South Korea': 'KOR',
  'Korea Republic': 'KOR',
  'Czechia': 'CZE',
  'Czech Republic': 'CZE',

  'Canada': 'CAN',
  'Bosnia': 'BIH',
  'Bosnia & Herzegovina': 'BIH',
  'Bosnia and Herzegovina': 'BIH',
  'Qatar': 'QAT',
  'Switzerland': 'SUI',

  'Brazil': 'BRA',
  'Morocco': 'MAR',
  'Haiti': 'HAI',
  'Scotland': 'SCO',

  'United States': 'USA',
  'USA': 'USA',
  'Paraguay': 'PAR',
  'Australia': 'AUS',
  'Turkey': 'TUR',
  'Türkiye': 'TUR',
  'Turkiye': 'TUR',

  'Germany': 'GER',
  'Curacao': 'CUR',
  'Curaçao': 'CUR',
  'Ivory Coast': 'CIV',
  'Cote d\'Ivoire': 'CIV',
  "Côte d'Ivoire": 'CIV',
  'Ecuador': 'ECU',

  'Netherlands': 'NED',
  'Japan': 'JPN',
  'Sweden': 'SWE',
  'Tunisia': 'TUN',

  'Belgium': 'BEL',
  'Egypt': 'EGY',
  'Iran': 'IRN',
  'IR Iran': 'IRN',
  'New Zealand': 'NZL',

  'Spain': 'ESP',
  'Cape Verde': 'CPV',
  'Cabo Verde': 'CPV',
  'Saudi Arabia': 'KSA',
  'Uruguay': 'URU',

  'France': 'FRA',
  'Senegal': 'SEN',
  'Iraq': 'IRQ',
  'Norway': 'NOR',

  'Argentina': 'ARG',
  'Algeria': 'ALG',
  'Austria': 'AUT',
  'Jordan': 'JOR',

  'Portugal': 'POR',
  'DR Congo': 'COD',
  'Congo DR': 'COD',
  'Democratic Republic of the Congo': 'COD',
  'Uzbekistan': 'UZB',
  'Colombia': 'COL',

  'England': 'ENG',
  'Croatia': 'CRO',
  'Ghana': 'GHA',
  'Panama': 'PAN',
};

function teamCode(name) {
  return NAME_TO_CODE[name] ?? null;
}

// ---------- fetch helpers ----------
const API_KEY = loadApiKey();
const BASE = 'https://api.the-odds-api.com/v4';
const REGIONS = 'us,us2,uk,eu,au';

async function get(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${body.slice(0, 200)}`);
  }
  // Surface remaining-quota header
  const remaining = res.headers.get('x-requests-remaining');
  const used = res.headers.get('x-requests-used');
  return { data: await res.json(), remaining, used };
}

// ---------- aggregator: best + median across bookmakers ----------
function aggregate(prices) {
  if (prices.length === 0) return null;
  const sorted = [...prices].sort((a, b) => a - b);
  const best = sorted[sorted.length - 1]; // highest decimal = longest price = best for bettor
  const median = sorted.length % 2
    ? sorted[(sorted.length - 1) / 2]
    : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  return {
    best: Number(best.toFixed(2)),
    median: Number(median.toFixed(2)),
    samples: prices.length,
  };
}

// ---------- outrights ----------
async function fetchOutrights() {
  console.log('▸ Fetching outright winner odds…');
  const url = `${BASE}/sports/soccer_fifa_world_cup_winner/odds/?apiKey=${API_KEY}&regions=${REGIONS}&markets=outrights&oddsFormat=decimal`;
  const { data, remaining, used } = await get(url);
  console.log(`  · ${data.length} outright event(s), ${data[0]?.bookmakers.length ?? 0} bookmakers`);
  console.log(`  · API quota: used=${used}, remaining=${remaining}`);

  // Aggregate per-team across bookmakers
  const byTeam = new Map(); // teamName → { prices: [], books: Set }
  for (const event of data) {
    for (const bm of event.bookmakers) {
      for (const market of bm.markets) {
        if (market.key !== 'outrights') continue;
        for (const outcome of market.outcomes) {
          if (typeof outcome.price !== 'number') continue;
          const entry = byTeam.get(outcome.name) ?? { prices: [], books: new Set() };
          entry.prices.push(outcome.price);
          entry.books.add(bm.title);
          byTeam.set(outcome.name, entry);
        }
      }
    }
  }

  const teams = [];
  const unmapped = [];
  for (const [name, { prices, books }] of byTeam) {
    const code = teamCode(name);
    if (!code) unmapped.push(name);
    teams.push({
      code,
      name,
      ...aggregate(prices),
      bookmakers: Array.from(books),
    });
  }
  teams.sort((a, b) => (a.median ?? 999) - (b.median ?? 999));

  if (unmapped.length) {
    console.warn(`  ⚠ Unmapped team names (no FIFA code): ${unmapped.join(', ')}`);
  }
  return { teams, asOf: new Date().toISOString() };
}

// ---------- match h2h ----------
async function fetchMatches() {
  console.log('▸ Fetching match h2h odds…');
  const url = `${BASE}/sports/soccer_fifa_world_cup/odds/?apiKey=${API_KEY}&regions=${REGIONS}&markets=h2h&oddsFormat=decimal`;
  const { data, remaining, used } = await get(url);
  console.log(`  · ${data.length} match(es), avg ${Math.round(data.reduce((s, e) => s + e.bookmakers.length, 0) / Math.max(data.length, 1))} bookmakers`);
  console.log(`  · API quota: used=${used}, remaining=${remaining}`);

  const matches = data.map((event) => {
    // Aggregate H/D/A across bookmakers
    const buckets = { home: [], draw: [], away: [] };
    for (const bm of event.bookmakers) {
      for (const market of bm.markets) {
        if (market.key !== 'h2h') continue;
        for (const outcome of market.outcomes) {
          if (typeof outcome.price !== 'number') continue;
          if (outcome.name === event.home_team) buckets.home.push(outcome.price);
          else if (outcome.name === event.away_team) buckets.away.push(outcome.price);
          else buckets.draw.push(outcome.price);
        }
      }
    }
    return {
      id: event.id,
      commenceTime: event.commence_time,
      home: { name: event.home_team, code: teamCode(event.home_team), ...aggregate(buckets.home) },
      away: { name: event.away_team, code: teamCode(event.away_team), ...aggregate(buckets.away) },
      draw: aggregate(buckets.draw),
      bookmakerCount: event.bookmakers.length,
    };
  });

  matches.sort((a, b) => a.commenceTime.localeCompare(b.commenceTime));
  return { matches, asOf: new Date().toISOString() };
}

// ---------- main ----------
const skipMatches = process.argv.includes('--skip-matches');

const result = {
  generatedAt: new Date().toISOString(),
  source: 'the-odds-api.com',
  regions: REGIONS,
  outrights: await fetchOutrights(),
  matches: skipMatches ? null : await fetchMatches(),
};

const outPath = resolve(ROOT, 'src/data/oddsLive.json');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(result, null, 2));

const sizeKb = (JSON.stringify(result).length / 1024).toFixed(1);
console.log('');
console.log(`✓ Wrote ${outPath} (${sizeKb} KB)`);
console.log(`  · ${result.outrights.teams.length} outright teams`);
if (result.matches) console.log(`  · ${result.matches.matches.length} matches priced`);
