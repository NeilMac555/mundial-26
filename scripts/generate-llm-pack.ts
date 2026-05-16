#!/usr/bin/env tsx
// Generates LLM_PACK.md — a single markdown file containing every piece of
// research data in the project, organized by group. Designed to be handed to
// another LLM that's composing group-stage previews.
//
// Run with:   npm run generate-llm-pack
// Output:     <repo root>/LLM_PACK.md

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { BRACKET_TEAMS, BRACKET_GROUPS, bracketTeamsByGroup, fifaCodeForNation } from '../src/data/bracketTeams';
import { MANAGERS, managerByNation, formatTenure, eloNameForNation } from '../src/data/managers';
import { ELO_TEAMS, ELO_SNAPSHOT_DATE } from '../src/data/elo';
import { SQUAD_VALUES, SQUAD_VALUE_SOURCE, squadValueByNation } from '../src/data/squadValues';
import { SOS, SOS_AS_OF, sosByNation } from '../src/data/sos';
import { PERFORMANCE, PERFORMANCE_AS_OF, PERFORMANCE_NOTE, performanceByNation } from '../src/data/performance';
import { teamXgByNation, aggregate } from '../src/data/qualifyingXg';
import { LINEUPS, lineupForNation } from '../src/data/lineups';
import { getBracketOdds, ODDS_LIVE_AS_OF } from '../src/data/bracketOdds';
import { TOP_SCORERS } from '../src/data/bracketTopScorers';
import { VENUES } from '../src/data/venues';
import { TOURNAMENTS as AMERICAS_TOURNAMENTS } from '../src/data/americas';
import { MATCHES, matchesForGroup, FIXTURE_CITIES, FIXTURES_SOURCE } from '../src/data/fixtures';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '..', 'LLM_PACK.md');

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function num(n: number | null | undefined, decimals = 0): string {
  if (n == null || Number.isNaN(n)) return '—';
  return n.toFixed(decimals);
}

function signed(n: number | null | undefined, decimals = 2): string {
  if (n == null || Number.isNaN(n)) return '—';
  return (n > 0 ? '+' : '') + n.toFixed(decimals);
}

const GROUP_NARRATIVES: Record<string, string> = {
  A: 'Host Mexico headlines, opener at Azteca (altitude 2,240m). South Korea\'s European-based core + Czechia\'s post-Schick generation as challengers; South Africa qualified without star power but defensively organised.',
  B: 'Host Canada with full Davies + Buchanan generation peaking. Switzerland the technical pick; Bosnia a wildcard via play-off; Qatar bottom-seeded by every metric.',
  C: 'Brazil headlining — Ancelotti era still finding feet (10-match sample). Morocco the African banker post-2022 SF run. Scotland\'s tournament debut for a generation. Haiti the long shot, qualified amid civil unrest.',
  D: 'Host USA needs Pochettino to find form fast. Paraguay rescued qualifying late. Australia recovered under Popovic. Türkiye with the Aktürkoğlu/Yıldız generation.',
  E: 'Germany returning after Euro 2024 QF exit. Ecuador defensively miserly. Ivory Coast post-AFCON 2024 champions. Curaçao the dark horse fairy tale.',
  F: 'Netherlands talent-rich but execution-iffy. Japan the AFC banker. Sweden under Potter post-Forsberg-era. Tunisia under Lamouchi tiny sample.',
  G: 'Belgium starting over under Garcia. Egypt Salah-dependent. Iran the structured AFC test. New Zealand qualified by default (OFC pathway).',
  H: 'Spain reigning Euro champion — De la Fuente\'s elite-tier record. Uruguay under Bielsa volatile. Cabo Verde squad-ceiling-limited despite CAF Coach of the Year. Saudi Arabia in upheaval with a 5-week-pre-WC appointment.',
  I: 'France\'s final Deschamps tournament. Senegal post-AFCON forfeit drama. Norway via Haaland/Ødegaard binary. Iraq via Arnold\'s WC pedigree (1.50 PPM at 2022).',
  J: 'Argentina defending champ + settled. Austria upward trajectory under Rangnick. Algeria pragmatic under Petković. Jordan tournament-week side post-Asian Cup final.',
  K: 'Portugal Ronaldo-dependency caveat. DR Congo via inter-confederation play-off. Colombia under Lorenzo strongest CONMEBOL not named Brazil/Argentina. Uzbekistan late Cannavaro appointment.',
  L: 'England 12-match Tuchel sample. Croatia tournament overperformers historically. Ghana under Queiroz (1.00 PPM career WC). Panama upward 24m trajectory.',
};

// ─────────────────────────────────────────────────────────────────────────────
// Section builders
// ─────────────────────────────────────────────────────────────────────────────

function buildPreamble(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `# Mundial '26 — Complete Data Pack

> **Generated:** ${today}
> **Project:** Mundial '26 — the bettor's terminal for the 2026 FIFA World Cup
> **Live site:** https://mundial-26-production.up.railway.app
> **Purpose:** Hand this file to another LLM to compose group-stage previews. Every piece of structured research in the project is included below, organised by group.

## Tournament Format (2026)

- **48 teams, 12 groups of 4** — first WC under the expanded format
- **Top 2 + 8 best 3rd-placers** advance to a 32-team Round of 32 knockout
- **Hosts:** USA (11 venues), Mexico (3), Canada (2) — 16 venues total
- **Final:** 19 July 2026, MetLife Stadium (New York/New Jersey)
- **Tournament dates:** 11 June – 19 July 2026

## Snapshot dates (be aware data has minor staleness)

- Elo: ${ELO_SNAPSHOT_DATE}
- Squad values: ${SQUAD_VALUE_SOURCE.asOf} (source: Transfermarkt)
- Strength of Schedule: ${SOS_AS_OF}
- Performance (over/under-achievers): ${PERFORMANCE_AS_OF}
- Live outrights: ${ODDS_LIVE_AS_OF}
- Fixtures: ${FIXTURES_SOURCE.asOf}
`;
}

function buildVenuesSection(): string {
  let out = `\n## The 16 Host Venues\n\n`;
  out += `| Country | City | Stadium | Altitude (m) | June Avg High (°C) | Humidity | Roof |\n`;
  out += `|---|---|---|---:|---:|---:|---|\n`;
  for (const v of VENUES) {
    out += `| ${v.country} | ${v.city} | ${v.stadium} | ${v.altitudeM} | ${v.juneAvgHighC} | ${v.juneAvgHumidity}% | ${v.roof} |\n`;
  }
  out += `\n**Climate-load flags:**\n`;
  const hot = VENUES.filter((v) => v.juneAvgHighC >= 32).map((v) => v.city);
  const altitude = VENUES.filter((v) => v.altitudeM >= 1000).map((v) => `${v.city} (${v.altitudeM}m)`);
  const open = VENUES.filter((v) => v.roof === 'open').map((v) => v.city);
  out += `- **Hottest venues (June high ≥ 32°C):** ${hot.join(', ')}\n`;
  out += `- **Altitude venues (≥ 1,000m):** ${altitude.join(', ')}\n`;
  out += `- **Open-roof venues (no climate control):** ${open.join(', ')}\n`;
  out += `- **Closed/retractable roof venues:** ${VENUES.filter((v) => v.roof !== 'open').map((v) => v.city).join(', ')}\n`;
  return out;
}

function buildAmericasNarrative(): string {
  let out = `\n## Strategic Narrative: The Americas-Host Effect\n\n`;
  out += `5 prior World Cups hosted in the Americas. Confederation outcomes:\n\n`;
  out += `| Year | Host | Champion | Champion Conf | Host Finish |\n`;
  out += `|---|---|---|---|---|\n`;
  for (const t of AMERICAS_TOURNAMENTS) {
    out += `| ${t.year} | ${t.hostNation} | ${t.champion} | ${t.championConf} | ${t.hostFinish.stage} (#${t.hostFinish.pos}) |\n`;
  }
  const conmebolWins = AMERICAS_TOURNAMENTS.filter((t) => t.championConf === 'CONMEBOL').length;
  out += `\n**Key fact:** CONMEBOL has won ${conmebolWins} of 5 Americas-hosted World Cups. UEFA dominates Europe/Asia/Africa hosts and loses its grip when the tournament comes home — the implication for 2026 outrights is that the bookmakers' UEFA-heavy boards may be priced for the wrong continent.\n`;
  return out;
}

function buildTopScorersSection(): string {
  let out = `\n## Golden Boot Market (Bracket Simulator candidate list)\n\n`;
  out += `| Player | Country | Odds |\n`;
  out += `|---|---|---|\n`;
  for (const p of TOP_SCORERS) {
    out += `| ${p.name} | ${p.country} | ${p.odds} |\n`;
  }
  out += `\n**Historical pattern (1982–2022):** Every Golden Boot winner since 1982 reached at least the quarter-finals. 6 goals is the most common winning tally. Modern winners lean increasingly on penalties.\n`;
  return out;
}

function buildAllTeamsCoverageNote(): string {
  return `\n## Coverage Status Per Section\n
- **Manager data:** all 48 teams ✓
- **Elo:** all 48 teams ✓
- **Squad value:** all 48 teams ✓
- **Strength of Schedule:** all qualifiers (hosts excluded — no qualifying matches)
- **Over/Under-Achievers (Performance):** ${PERFORMANCE.length} teams
- **Qualifying xG:** UEFA + CAF + CONMEBOL well-covered; AFC + CONCACAF sparser
- **Likely XI (pitch view):** all 48 teams ✓
- **Outright odds:** live across 9 bookmakers, all 48 teams ✓
- **Group winner odds:** all teams (Pinnacle snapshot, static)
`;
}

function buildGroupHeader(group: string): string {
  const teams = bracketTeamsByGroup(group);
  const teamList = teams.map((t) => t.name).join(' · ');
  const narrative = GROUP_NARRATIVES[group] ?? '';
  let out = `\n---\n\n## Group ${group}: ${teamList}\n\n`;
  if (narrative) out += `> **Strategic angle:** ${narrative}\n\n`;

  // Venues used by this group
  const groupCities = Array.from(new Set(
    matchesForGroup(group as 'A')
      .map((m) => m.city)
      .filter((c) => c)
  )) as string[];
  if (groupCities.length) {
    out += `**Host cities for this group's matches:** ${groupCities.join(', ')}\n\n`;
  }

  // Fixtures
  const fx = matchesForGroup(group as 'A');
  if (fx.length) {
    out += `**Fixtures:**\n`;
    for (const m of fx) {
      const teamsLabel = `${m.home} vs ${m.away}`;
      const venue = m.city ? `· ${m.stadium}, ${m.city}` : '';
      out += `- ${m.date} ${m.kickoff} (UTC${m.utc}) — ${teamsLabel} ${venue}\n`;
    }
    out += `\n`;
  }
  return out;
}

function buildTeamBlock(nation: string): string {
  const mgr = managerByNation(nation);
  const eloName = eloNameForNation(nation);
  const elo = ELO_TEAMS.find((t) => t.name === eloName);
  const sv = squadValueByNation(nation);
  const sos = sosByNation(nation);
  const perf = performanceByNation(nation);
  const xg = teamXgByNation(nation);
  const xgAgg = xg ? aggregate(xg) : null;
  const fifa = fifaCodeForNation(nation);
  const odds = fifa ? getBracketOdds(fifa) : null;
  const lineup = lineupForNation(nation);

  let out = `\n### ${nation}\n\n`;
  out += `- **Confederation / Group:** ${mgr ? mgr.confederation : '?'} / Group ${mgr?.group ?? '?'}\n`;

  // Manager
  if (mgr) {
    const tier = mgr.tier;
    const ppm = mgr.ppm == null ? 'n/a' : mgr.ppm.toFixed(2);
    const sample = mgr.small_sample ? ' (small sample — flagged)' : '';
    out += `- **Manager:** ${mgr.manager} · ${formatTenure(mgr.manager_appointed)} · ${mgr.matches} matches · ${ppm} PPM · tier ${tier}${sample}\n`;
    if (mgr.notes) out += `  - **Manager note:** ${mgr.notes}\n`;
  } else {
    out += `- **Manager:** (no record)\n`;
  }

  // Elo
  if (elo) {
    out += `- **Elo:** ${elo.rating} (rank #${elo.rank}, ${signed(elo.ch1y, 0)} / yr, ${elo.matches} matches all-time)\n`;
  }

  // Squad value
  if (sv) {
    out += `- **Squad market value:** €${sv.totalM.toFixed(1)}m${sv.globalRank ? ` (world #${sv.globalRank})` : ''}\n`;
  }

  // Strength of Schedule
  if (sos) {
    if (sos.sosRank == null) {
      out += `- **Strength of Schedule:** HOST — no qualifying matches\n`;
    } else {
      out += `- **Strength of Schedule:** rank #${sos.sosRank} (${sos.difficulty}) — avg opp Elo ${sos.avgOppElo}, SOS score ${sos.sosScore?.toFixed(3)}, ${sos.gamesPlayed} GP\n`;
    }
  }

  // Over/Under-achievement (Δ Elo verdict is the clearest single signal)
  if (perf) {
    if (perf.deltaElo == null) {
      out += `- **Performance vs Elo expectation:** insufficient data\n`;
    } else {
      out += `- **Performance vs Elo expectation:** Δ Elo ${signed(perf.deltaElo, 3)} (${perf.eloVerdict})${perf.smallSample ? ' [small sample]' : ''}\n`;
      if (perf.deltaSchedule != null) {
        out += `  - vs schedule (against ranked-top-100 opposition only): Δ ${signed(perf.deltaSchedule, 3)} (${perf.scheduleVerdict})\n`;
      }
    }
  }

  // Qualifying xG
  if (xgAgg) {
    out += `- **Qualifying xG (${xgAgg.matches} matches):**\n`;
    out += `  - Δ Finishing: ${signed(xgAgg.finishing, 2)} (${xgAgg.finishingTier}) — ${xgAgg.xgPer.toFixed(2)} xG/match\n`;
    out += `  - Δ Defending: ${signed(xgAgg.defending, 2)} (${xgAgg.defendingTier}) — ${xgAgg.xgaPer.toFixed(2)} xGA/match\n`;
    out += `  - Clean sheets: ${xgAgg.cleanSheets}\n`;
  }

  // Outright odds
  if (odds) {
    const implied = (100 / odds.outrightDecimal).toFixed(1);
    out += `- **Outright odds:** ${odds.outrightOdds} (${odds.outrightDecimal.toFixed(2)} dec, ${implied}% implied)`;
    if (odds.outrightBest) out += ` · best ${odds.outrightBest.toFixed(2)}`;
    if (odds.outrightSamples) out += ` · ${odds.outrightSamples} books`;
    out += ` · source: ${odds.outrightSource}\n`;
    if (odds.groupWinnerOdds) {
      out += `- **Group winner odds (Pinnacle snapshot):** ${odds.groupWinnerOdds}\n`;
    }
  }

  // Likely XI
  if (lineup) {
    out += `- **Likely XI (${lineup.formation}):**\n`;
    for (const row of lineup.rows) {
      const slots = row.map((s) => {
        const base = `${s.pos ?? '?'}: ${s.name}`;
        return s.backup ? `${base} (backup: ${s.backup})` : base;
      }).join(' · ');
      out += `  - ${slots}\n`;
    }
    if (lineup.bench && lineup.bench.length) {
      out += `  - **Bench:** ${lineup.bench.join(', ')}\n`;
    }
    if (lineup.source) out += `  - **Lineup source:** ${lineup.source} (as of ${lineup.asOf ?? '?'})\n`;
  }

  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Compose
// ─────────────────────────────────────────────────────────────────────────────

let md = '';
md += buildPreamble();
md += buildAllTeamsCoverageNote();
md += buildVenuesSection();
md += buildAmericasNarrative();
md += buildTopScorersSection();

md += `\n---\n\n# Group-by-Group Pack\n\n`;
md += `*Each group below contains: strategic angle, fixtures, then one block per team with manager, Elo, squad value, SOS, qualifying xG, over/under-achievement, outright odds, and the likely XI.*\n`;

for (const group of BRACKET_GROUPS) {
  md += buildGroupHeader(group);
  for (const team of bracketTeamsByGroup(group)) {
    md += buildTeamBlock(team.name);
  }
}

md += `\n---\n\n## End of Pack\n\nGenerated by \`npm run generate-llm-pack\` from the Mundial '26 project data layer. Re-run anytime to capture fresh data (especially live odds — refresh via \`npm run fetch-odds\` first).\n`;

writeFileSync(OUT_PATH, md, 'utf8');
const sizeKb = (Buffer.byteLength(md, 'utf8') / 1024).toFixed(1);
console.log(`[generate-llm-pack] wrote ${OUT_PATH}`);
console.log(`[generate-llm-pack] ${md.split('\n').length} lines · ${sizeKb} KB`);
