import { useMemo, useState } from 'react';
import { ELO_TEAMS, type EloTeam } from '../data/elo';
import {
  MANAGERS,
  TIER_DISPLAY,
  eloNameForNation,
  managerByNation,
  formatTenure,
  MANAGER_SOURCE,
  type ManagerRecord,
  type Tier,
} from '../data/managers';
import {
  squadValueByNation,
  formatSquadValue,
  SQUAD_VALUE_SOURCE,
  type SquadValue,
} from '../data/squadValues';
import { sosByNation, type SosRecord } from '../data/sos';
import { performanceByNation, type PerformanceRecord } from '../data/performance';
import { teamXgByNation, aggregate, type TeamXg, type XgAggregate } from '../data/qualifyingXg';
import { Flag } from '../components/Flag';
import { flagEmoji } from '../data/flags';
import { TLabel, TMono, TPill, type PillTone } from '../components/terminal/atoms';
import { fifaCodeForNation } from '../data/bracketTeams';
import { getBracketOdds, type BracketOdds } from '../data/bracketOdds';
import { lineupForNation, type Lineup } from '../data/lineups';
import { Pitch } from '../components/Pitch';

export function Compare() {
  const [aNation, setANation] = useState('Argentina');
  const [bNation, setBNation] = useState('Brazil');

  const a = useMemo(() => buildTeam(aNation), [aNation]);
  const b = useMemo(() => buildTeam(bNation), [bNation]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center' }}>
        <NationPicker value={aNation} onChange={setANation} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            textAlign: 'center',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-2)',
          }}
        >
          vs
        </span>
        <NationPicker value={bNation} onChange={setBNation} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 16 }}>
        <TeamCard t={a} />
        <TeamCard t={b} />
      </div>

      <Verdict a={a} b={b} />

      <div style={{ fontSize: 11, color: 'var(--color-text-3)', lineHeight: 1.55 }}>
        Manager + squad value sourced from{' '}
        <a href={MANAGER_SOURCE.url} target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold)' }}>
          Transfermarkt
        </a>
        , last updated {SQUAD_VALUE_SOURCE.asOf}. Tier badges use per-confederation thresholds; managers with fewer
        than 20 matches in charge are flagged as small sample and excluded from tier and PPM verdicts.
      </div>
    </div>
  );
}

interface TeamView {
  nation: string;
  manager: ManagerRecord | null;
  elo: EloTeam | null;
  squad: SquadValue | null;
  sos: SosRecord | null;
  perf: PerformanceRecord | null;
  xg: TeamXg | null;
  xgAgg: XgAggregate | null;
  odds: BracketOdds | null;
  lineup: Lineup | null;
}

function buildTeam(nation: string): TeamView {
  const manager = managerByNation(nation) ?? null;
  const eloName = eloNameForNation(nation);
  const elo = ELO_TEAMS.find((t) => t.name === eloName) ?? null;
  const squad = squadValueByNation(nation) ?? null;
  const sos = sosByNation(nation) ?? null;
  const perf = performanceByNation(nation) ?? null;
  const xg = teamXgByNation(nation) ?? null;
  const xgAgg = xg ? aggregate(xg) : null;
  const fifa = fifaCodeForNation(nation);
  const odds = fifa ? getBracketOdds(fifa) ?? null : null;
  const lineup = lineupForNation(nation);
  return { nation, manager, elo, squad, sos, perf, xg, xgAgg, odds, lineup };
}

function NationPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text)',
        padding: '8px 12px',
        borderRadius: 4,
        fontSize: 13,
        fontFamily: 'var(--font-mono)',
      }}
    >
      {MANAGERS.map((m) => {
        const emoji = flagEmoji(m.nation);
        return (
          <option key={m.nation} value={m.nation}>
            {emoji ? emoji + '  ' : ''}{m.nation} · Group {m.group}
          </option>
        );
      })}
    </select>
  );
}

function TeamCard({ t }: { t: TeamView }) {
  const { nation, manager, elo, squad, sos, perf, xg, xgAgg, odds, lineup } = t;
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        padding: 18,
      }}
    >
      <header
        style={{
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <Flag nation={nation} size={48} />
        <div>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: 'var(--color-text)', letterSpacing: '-0.01em' }}>{nation}</h3>
          {manager && (
            <div style={{ marginTop: 4 }}>
              <TLabel>{manager.confederation} · Group {manager.group}</TLabel>
            </div>
          )}
        </div>
      </header>

      <Section label="Global Rank">
        {elo ? (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <TMono size={28} color="var(--color-text)" weight={600}>#{elo.rank}</TMono>
            <TMono size={11} color="var(--color-text-3)">Elo {elo.rating}</TMono>
            <ChChip ch1y={elo.ch1y} />
          </div>
        ) : (
          <Empty>No Elo record found</Empty>
        )}
      </Section>

      <Section label="Squad Value">
        {squad ? (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <TMono size={24} color="var(--color-text)" weight={600}>{formatSquadValue(squad.totalM)}</TMono>
            <TMono size={11} color="var(--color-text-3)">
              {squad.globalRank ? `world #${squad.globalRank}` : 'rank 100+'}
            </TMono>
          </div>
        ) : (
          <Empty>No squad value record</Empty>
        )}
      </Section>

      <Section
        label="Outright Market"
        info={
          <>
            <div style={{ marginBottom: 8 }}>
              <strong style={{ color: 'var(--color-gold)' }}>Median</strong> — middle decimal price across the
              bookmakers reporting (live: 9 books across Pinnacle / Betfair Exchange / DraftKings / FanDuel / Unibet /
              William Hill / BetRivers / TAB).
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong style={{ color: 'var(--color-gold)' }}>Best</strong> — longest decimal price available right now.
              That's the book to actually place the bet at.
            </div>
            <div>
              <strong style={{ color: 'var(--color-gold)' }}>Implied</strong> — bookmaker-implied probability the team
              wins the trophy outright. Sums to &gt;100% across all 48 teams (the overround) — comparing two teams
              against each other is fine, comparing absolute values isn't.
            </div>
          </>
        }
      >
        <OutrightBlock odds={odds} />
      </Section>

      <Section
        label="Qualifying Path"
        info={
          <>
            <div style={{ marginBottom: 8 }}>
              <strong style={{ color: 'var(--color-gold)' }}>SOS Rank</strong> — how hard this team's qualifying schedule was, ranked
              against all 48 qualifiers. <strong>1 = hardest, 48 = easiest.</strong> CONMEBOL teams sweep the top because
              every match is brutal; top CONCACAF / AFC sides feast on minnows so their schedules score easier.
            </div>
            <div>
              <strong style={{ color: 'var(--color-gold)' }}>Δ vs own Elo</strong> — points-per-match{' '}
              <em style={{ fontStyle: 'italic' }}>over (or under) what this team's own Elo predicted</em>. Positive = overperformed expectation, negative
              = underperformed. Top-100 opponents only — qualifying blowouts vs minnows excluded so the signal isn't
              flattered.
            </div>
          </>
        }
      >
        <QualifyingBlock sos={sos} perf={perf} />
      </Section>

      <Section
        label="Qualifying xG"
        info={
          <>
            <div style={{ marginBottom: 8 }}>
              <strong style={{ color: 'var(--color-gold)' }}>Δ Finishing</strong> — total goals scored minus expected goals (xG)
              across qualifying. <strong>Positive = clinical</strong> (converted more than chance quality predicted),
              negative = wasteful. Big positive numbers vs weak opposition often inflate (Japan, Korea); the genuine
              edge is consistency vs quality.
            </div>
            <div>
              <strong style={{ color: 'var(--color-gold)' }}>Δ Defending</strong> — expected goals against (xGA) minus actual goals
              conceded. <strong>Positive = solid</strong> (defended better than the chances allowed warranted),
              negative = leaky. Big positives across small samples vs minnows tend to revert at WC quality.
            </div>
          </>
        }
      >
        {xg && xgAgg ? <XgBlock xg={xg} a={xgAgg} /> : <Empty>No qualifying xG data loaded</Empty>}
      </Section>

      <Section label="Likely XI">
        {lineup ? (
          <Pitch lineup={lineup} />
        ) : (
          <Empty>Lineup not yet plotted — coming soon</Empty>
        )}
      </Section>

      <Section label="Manager">
        {manager ? <ManagerBlock m={manager} /> : <Empty>No manager record</Empty>}
      </Section>

      <Section label="Notes">
        {manager?.notes ? (
          <p style={{ margin: 0, fontSize: 13, fontStyle: 'italic', lineHeight: 1.55, color: 'var(--color-text-3)' }}>{manager.notes}</p>
        ) : (
          <Empty>—</Empty>
        )}
      </Section>
    </div>
  );
}

function difficultyToTone(difficulty: string): PillTone {
  const d = difficulty.toLowerCase();
  if (d.includes('extremely') || d.includes('very')) return 'red';
  if (d.startsWith('difficult') || d.includes('above')) return 'gold';
  if (d.includes('host')) return 'mute';
  return 'mute';
}

function verdictToTone(verdict: string): PillTone {
  const v = verdict.toLowerCase();
  if (v.includes('massive over') || v.includes('clear over') || v.includes('overperform')) return 'green';
  if (v.includes('massive under') || v.includes('clear under') || v.includes('underperform')) return 'red';
  return 'mute';
}

function deltaTextColor(verdict: string): string {
  const v = verdict.toLowerCase();
  if (v.includes('massive over') || v.includes('clear over') || v.includes('overperform')) return 'var(--color-green)';
  if (v.includes('massive under') || v.includes('clear under') || v.includes('underperform')) return 'var(--color-red)';
  return 'var(--color-text-2)';
}

function QualifyingBlock({ sos, perf }: { sos: SosRecord | null; perf: PerformanceRecord | null }) {
  if (!sos && !perf) return <Empty>No qualifying record (likely host)</Empty>;
  if (sos && sos.sosRank == null) {
    return (
      <div
        style={{
          background: 'var(--color-bg-2)',
          padding: '8px 12px',
          fontSize: 13,
          color: 'var(--color-text-3)',
          borderRadius: 4,
        }}
      >
        Host — no qualifying matches played.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {sos && (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 8 }}>
          <TMono size={18} color="var(--color-text)" weight={600}>SOS #{sos.sosRank}</TMono>
          <TPill tone={difficultyToTone(sos.difficulty)} size="sm">{sos.difficulty}</TPill>
          <TMono size={10} color="var(--color-text-3)">
            avg opp Elo {sos.avgOppElo} · {sos.gamesPlayed} GP
          </TMono>
        </div>
      )}
      {perf && perf.deltaElo != null && (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 8 }}>
          <TMono size={15} color={deltaTextColor(perf.eloVerdict)} weight={500}>
            {perf.deltaElo > 0 ? '+' : ''}{perf.deltaElo.toFixed(3)}
          </TMono>
          <TPill tone={verdictToTone(perf.eloVerdict)} size="sm">{perf.eloVerdict}</TPill>
          {perf.smallSample && <TPill tone="red" size="sm">⚠ n&lt;4</TPill>}
          <TLabel>vs own Elo</TLabel>
        </div>
      )}
    </div>
  );
}

function Section({ label, info, children }: { label: string; info?: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <section style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-2)',
          }}
        >
          {label}
        </span>
        {info && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Hide explanation' : 'Show explanation'}
            style={{
              borderRadius: '50%',
              border: '1px solid rgba(232,185,74,0.3)',
              padding: '0 6px',
              fontSize: 9,
              fontWeight: 700,
              fontStyle: 'italic',
              lineHeight: 1.2,
              color: 'var(--color-gold-2)',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {open ? '×' : 'i'}
          </button>
        )}
      </div>
      {info && open && (
        <div
          style={{
            marginBottom: 8,
            background: 'rgba(232,185,74,0.04)',
            border: '1px solid rgba(232,185,74,0.20)',
            padding: 12,
            fontSize: 12,
            lineHeight: 1.55,
            color: 'var(--color-text-2)',
            borderRadius: 4,
          }}
        >
          {info}
        </div>
      )}
      {children}
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 13, color: 'var(--color-text-4)' }}>{children}</div>;
}

function ChChip({ ch1y }: { ch1y: number }) {
  if (ch1y === 0) return <TMono size={11} color="var(--color-text-3)">±0 / yr</TMono>;
  const pos = ch1y > 0;
  return (
    <TMono size={11} color={pos ? 'var(--color-green)' : 'var(--color-red)'}>
      {pos ? '+' : ''}{ch1y} / yr
    </TMono>
  );
}

function OutrightBlock({ odds }: { odds: BracketOdds | null }) {
  if (!odds) return <Empty>No outright market data</Empty>;
  const implied = (1 / odds.outrightDecimal) * 100;
  const isLive = odds.outrightSource === 'live';
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <TMono size={24} color="var(--color-text)" weight={600}>{odds.outrightOdds}</TMono>
        <TMono size={11} color="var(--color-text-3)">
          {odds.outrightDecimal.toFixed(2)} dec · {implied.toFixed(1)}% implied
        </TMono>
        {isLive ? (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: '2px 7px',
              borderRadius: 3,
              background: 'rgba(94,200,138,0.10)',
              border: '1px solid rgba(94,200,138,0.28)',
              color: 'var(--color-green)',
              fontFamily: 'var(--font-mono)',
              fontSize: 9.5,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'var(--color-green)',
                boxShadow: '0 0 0 2px rgba(94,200,138,0.20)',
              }}
            />
            Live
          </span>
        ) : (
          <TPill tone="mute" size="sm">Static · 14 Apr</TPill>
        )}
      </div>
      {isLive && odds.outrightBest !== undefined && (
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
          <TLabel>Best</TLabel>
          <TMono size={13} color="var(--color-gold)" weight={600}>
            {odds.outrightBest.toFixed(2)}
          </TMono>
          {odds.outrightSamples !== undefined && (
            <TMono size={10} color="var(--color-text-4)">
              {odds.outrightSamples} books
            </TMono>
          )}
        </div>
      )}
    </div>
  );
}

const XG_FIN_TONE: Record<XgAggregate['finishingTier'], { label: string; tone: PillTone }> = {
  CLINICAL: { label: 'Clinical', tone: 'green' },
  MET: { label: 'Met', tone: 'mute' },
  WASTEFUL: { label: 'Wasteful', tone: 'red' },
};

const XG_DEF_TONE: Record<XgAggregate['defendingTier'], { label: string; tone: PillTone }> = {
  SOLID: { label: 'Solid', tone: 'green' },
  MET: { label: 'On expectations', tone: 'mute' },
  LEAKY: { label: 'Leaky', tone: 'red' },
};

function XgBlock({ xg, a }: { xg: TeamXg; a: XgAggregate }) {
  const fin = XG_FIN_TONE[a.finishingTier];
  const def = XG_DEF_TONE[a.defendingTier];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 8 }}>
        <TLabel>Δ Finishing</TLabel>
        <TMono size={15} color="var(--color-text)" weight={600}>
          {a.finishing > 0 ? '+' : ''}{a.finishing.toFixed(2)}
        </TMono>
        <TPill tone={fin.tone} size="sm">{fin.label}</TPill>
        <TMono size={10} color="var(--color-text-3)">{a.xgPer.toFixed(2)} xG/m</TMono>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 8 }}>
        <TLabel>Δ Defending</TLabel>
        <TMono size={15} color="var(--color-text)" weight={600}>
          {a.defending > 0 ? '+' : ''}{a.defending.toFixed(2)}
        </TMono>
        <TPill tone={def.tone} size="sm">{def.label}</TPill>
        <TMono size={10} color="var(--color-text-3)">{a.xgaPer.toFixed(2)} xGA/m</TMono>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, color: 'var(--color-text-3)' }}>
        <TMono size={10} color="var(--color-text-3)">n={a.matches}</TMono>
        <span>·</span>
        <TMono size={10} color="var(--color-text-3)">{a.cleanSheets} CS</TMono>
        {xg.note && <span style={{ color: 'var(--color-red)' }}>⚠ {xg.note.slice(0, 80)}…</span>}
      </div>
    </div>
  );
}

const TIER_TONE: Record<Tier, PillTone> = {
  ELITE: 'gold',
  STRONG: 'gold',
  SOLID: 'mute',
  BELOW_PAR: 'red',
};

function ManagerBlock({ m }: { m: ManagerRecord }) {
  const noSample = m.matches === 0 || m.ppm === null;
  const tier = TIER_DISPLAY[m.tier];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{m.manager}</span>
        <TMono size={11} color="var(--color-text-3)">{formatTenure(m.manager_appointed)}</TMono>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
        {noSample ? (
          <>
            <TMono size={18} color="var(--color-text-4)">—</TMono>
            <TPill tone="red" size="sm">⚠ No sample (n={m.matches})</TPill>
          </>
        ) : m.small_sample ? (
          <>
            <TMono size={18} color="var(--color-text)" weight={600}>{m.ppm?.toFixed(2)}</TMono>
            <TLabel>PPM</TLabel>
            <TPill tone="red" size="sm">⚠ Small sample (n={m.matches})</TPill>
          </>
        ) : (
          <>
            <TMono size={18} color="var(--color-text)" weight={600}>{m.ppm?.toFixed(2)}</TMono>
            <TLabel>PPM</TLabel>
            <TPill tone={TIER_TONE[m.tier]} size="sm">{tier.label}</TPill>
            <TMono size={10} color="var(--color-text-4)">n={m.matches}</TMono>
          </>
        )}
      </div>
    </div>
  );
}

function Verdict({ a, b }: { a: TeamView; b: TeamView }) {
  const edges: { side: 'A' | 'B'; label: string }[] = [];

  if (a.elo && b.elo) {
    const diff = a.elo.rating - b.elo.rating;
    if (Math.abs(diff) >= 25) {
      edges.push({ side: diff > 0 ? 'A' : 'B', label: `Elo +${Math.abs(diff)}` });
    }
  }

  if (a.odds && b.odds) {
    const impliedA = (1 / a.odds.outrightDecimal) * 100;
    const impliedB = (1 / b.odds.outrightDecimal) * 100;
    const diff = impliedA - impliedB;
    // Surface the market edge if implied-probability gap is ≥ 1.5pp
    // (sub-1pp gaps are noise given bookmaker overround).
    if (Math.abs(diff) >= 1.5) {
      const liveTag = a.odds.outrightSource === 'live' && b.odds.outrightSource === 'live' ? ' (live)' : '';
      edges.push({
        side: diff > 0 ? 'A' : 'B',
        label: `Outright +${Math.abs(diff).toFixed(1)}pp${liveTag}`,
      });
    }
  }

  if (a.xgAgg && b.xgAgg && a.xgAgg.matches >= 6 && b.xgAgg.matches >= 6) {
    const finDiff = a.xgAgg.finishing / a.xgAgg.matches - b.xgAgg.finishing / b.xgAgg.matches;
    if (Math.abs(finDiff) >= 0.20) {
      edges.push({ side: finDiff > 0 ? 'A' : 'B', label: `Δ Finishing +${Math.abs(finDiff).toFixed(2)}/m` });
    }
    const defDiff = a.xgAgg.defending / a.xgAgg.matches - b.xgAgg.defending / b.xgAgg.matches;
    if (Math.abs(defDiff) >= 0.20) {
      edges.push({ side: defDiff > 0 ? 'A' : 'B', label: `Δ Defending +${Math.abs(defDiff).toFixed(2)}/m` });
    }
  }

  if (a.squad && b.squad) {
    const ratio = a.squad.totalM / b.squad.totalM;
    const diff = Math.abs(a.squad.totalM - b.squad.totalM);
    if ((ratio >= 1.3 || ratio <= 1 / 1.3) && diff >= 50) {
      const stronger = ratio >= 1 ? a.squad : b.squad;
      const weaker = ratio >= 1 ? b.squad : a.squad;
      const mult = stronger.totalM / weaker.totalM;
      edges.push({
        side: ratio >= 1 ? 'A' : 'B',
        label: mult >= 2 ? `Squad value ${mult.toFixed(1)}×` : `Squad value +${formatSquadValue(diff)}`,
      });
    }
  }

  if (
    a.manager?.ppm != null &&
    b.manager?.ppm != null &&
    !a.manager.small_sample &&
    !b.manager.small_sample
  ) {
    const diff = a.manager.ppm - b.manager.ppm;
    if (Math.abs(diff) >= 0.2) {
      edges.push({ side: diff > 0 ? 'A' : 'B', label: `PPM +${Math.abs(diff).toFixed(2)}` });
    }
  }

  if (a.manager && b.manager) {
    const yearsA = yearsInPost(a.manager.manager_appointed);
    const yearsB = yearsInPost(b.manager.manager_appointed);
    const diff = yearsA - yearsB;
    if (Math.abs(diff) >= 1.5) {
      edges.push({ side: diff > 0 ? 'A' : 'B', label: `Tenure ${Math.abs(diff).toFixed(1)}y longer` });
    }
  }

  if (a.manager && b.manager && !a.manager.small_sample && !b.manager.small_sample) {
    const order: Record<string, number> = { BELOW_PAR: 0, SOLID: 1, STRONG: 2, ELITE: 3 };
    const diff = order[a.manager.tier] - order[b.manager.tier];
    if (Math.abs(diff) >= 2) {
      const ahead = diff > 0 ? a.manager.tier : b.manager.tier;
      const behind = diff > 0 ? b.manager.tier : a.manager.tier;
      edges.push({
        side: diff > 0 ? 'A' : 'B',
        label: `${TIER_DISPLAY[ahead].label} vs ${TIER_DISPLAY[behind].label}`,
      });
    }
  }

  if (edges.length === 0) {
    return (
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          padding: '14px 18px',
          textAlign: 'center',
          fontSize: 13,
          color: 'var(--color-text-3)',
          borderRadius: 6,
        }}
      >
        No meaningful edges across the metrics shown — close on quality, manager, and trajectory.
      </div>
    );
  }

  const groupedA = edges.filter((e) => e.side === 'A');
  const groupedB = edges.filter((e) => e.side === 'B');

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid rgba(232,185,74,0.30)',
        borderRadius: 6,
        padding: 16,
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-2)',
          }}
        >
          Verdict
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        <EdgeList nation={a.nation} edges={groupedA} />
        <EdgeList nation={b.nation} edges={groupedB} />
      </div>
    </div>
  );
}

function EdgeList({ nation, edges }: { nation: string; edges: { label: string }[] }) {
  return (
    <div>
      <div style={{ marginBottom: 6, fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{nation} edges</div>
      {edges.length === 0 ? (
        <div style={{ fontSize: 12, color: 'var(--color-text-4)' }}>—</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {edges.map((e) => (
            <li key={e.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--color-text-2)' }}>
              <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: 'var(--color-gold-2)' }} />
              {e.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function yearsInPost(appointed: string): number {
  const [y, m] = appointed.split('-').map(Number);
  if (!y || !m) return 0;
  const start = new Date(y, m - 1, 1);
  return (Date.now() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
}
