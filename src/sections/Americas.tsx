import { useState } from 'react';
import {
  TOURNAMENTS, HEADLINE, STAGE_LABEL, STAGE_SHORT, SOURCE,
  summariseTournament, rollup,
  type AmericasTournament, type AmericasFinish, type AmericasStage,
  type ConfSummary,
} from '../data/americas';
import { Flag } from '../components/Flag';
import { TLabel, TMono, TPill, TCaption, TCaptionItem, type PillTone } from '../components/terminal/atoms';

export function Americas() {
  return (
    <div>
      <TCaption>
        <TCaptionItem label="Sample" value="5 Americas-host World Cups (1970–2014)" />
        <TCaptionItem label="Sources" value="Per-tournament Wikipedia final standings" />
        <TCaptionItem label="Scraped" value={SOURCE.asOf} />
      </TCaption>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Explainer />
        <HeroStats />
        <ConfRollupTable />
        <TournamentCards />
        <Bettor2026 />
      </div>
    </div>
  );
}

/* ============================================================
   EXPLAINER
   ============================================================ */

function Explainer() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        padding: '18px 20px',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--color-gold)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        The "Americas-Host Effect" — why the venue matters more than the bookmakers price in
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-2)', margin: '0 0 12px' }}>
        Five World Cups have been played in the Americas since 1970:{' '}
        <strong style={{ color: 'var(--color-gold)' }}>Mexico '70, Argentina '78, Mexico '86, USA '94, and Brazil 2014</strong>. The pattern is
        one of the most durable in international football and yet it stays under-priced by markets every cycle.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-2)', margin: '0 0 12px' }}>
        Of those five, <strong style={{ color: 'var(--color-gold)' }}>CONMEBOL won four</strong> (Brazil '70, Argentina '78,
        Argentina '86, Brazil '94). Only Germany 2014 broke the streak — and they did so by beating a CONMEBOL side in the
        semi-final and another in the final.{' '}
        <strong style={{ color: 'var(--color-gold)' }}>A South American team has reached the final in every Americas-host World Cup ever played</strong>.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-2)', margin: 0 }}>
        Compare that to the 9 World Cups played outside the Americas since 1970: CONMEBOL won just 2 (Brazil 2002 in
        Korea/Japan, Argentina 2022 in Qatar). UEFA dominates Europe, Asia, and Africa hosts — but loses its grip the
        moment the tournament returns to American soil. Heat, humidity, altitude in Mexico, time-zone advantage,
        travelling fans, and{' '}
        <em style={{ color: 'var(--color-text)', fontStyle: 'italic' }}>familiarity with the conditions</em> all stack the same direction.
      </p>
    </div>
  );
}

/* ============================================================
   HERO STATS
   ============================================================ */

function HeroStats() {
  const conmebolPct = Math.round((HEADLINE.conmebolWinsAmericas / HEADLINE.americasTournaments) * 100);
  const conmebolNonPct = Math.round((HEADLINE.conmebolWinsNonAmericas / HEADLINE.nonAmericasSince1970) * 100);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
      <Hero
        value={`${HEADLINE.conmebolWinsAmericas}/${HEADLINE.americasTournaments}`}
        label="CONMEBOL wins · Americas hosts"
        sub={`${conmebolPct}% win rate. Brazil '70, Argentina '78, Argentina '86, Brazil '94.`}
        strong
      />
      <Hero
        value={`${HEADLINE.conmebolWinsNonAmericas}/${HEADLINE.nonAmericasSince1970}`}
        label="CONMEBOL wins · non-Americas hosts"
        sub={`${conmebolNonPct}% win rate. Brazil 2002 (KOR/JPN), Argentina 2022 (Qatar). Massive home-continent multiplier.`}
        strong={false}
      />
      <Hero
        value={`${HEADLINE.americasWithConmebolInFinal}/${HEADLINE.americasTournaments}`}
        label="CONMEBOL in the final"
        sub="Every single Americas-host World Cup has had a South American side in the final. Often two."
        strong
      />
      <Hero
        value={`${HEADLINE.uefaWinsAmericas}/${HEADLINE.americasTournaments}`}
        label="UEFA wins · Americas hosts"
        sub="Germany 2014 only. Even then, they beat 2 CONMEBOL sides in a row to do it."
        strong={false}
      />
    </div>
  );
}

function Hero({ value, label, sub, strong }: { value: string; label: string; sub: string; strong: boolean }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        padding: 18,
      }}
    >
      <TMono size={26} color={strong ? 'var(--color-gold)' : 'var(--color-text)'} weight={500}>{value}</TMono>
      <div style={{ marginTop: 6 }}>
        <TLabel color="var(--color-text-2)">{label}</TLabel>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.5, color: 'var(--color-text-3)' }}>{sub}</div>
    </div>
  );
}

/* ============================================================
   ROLLUP TABLE
   ============================================================ */

function ConfRollupTable() {
  const rows = rollup();
  const totalEntries = rows.reduce((s, r) => s + r.entries, 0);
  return (
    <div>
      <SectionHeader
        title="By the numbers — every team across all 5 tournaments"
        subtitle={`${totalEntries} team-entries · 1970–2014`}
      />
      <div
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: 6,
          overflow: 'hidden',
          background: 'var(--color-surface)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <ThHead label="Confederation" align="left" />
              <ThHead label="Entries" align="right" />
              <ThHead label="Champions" align="right" />
              <ThHead label="Finalists" align="right" />
              <ThHead label="Semi-finalists" align="right" />
              <ThHead label="QF or better" align="right" />
              <ThHead label="Survived group" align="right" />
              <ThHead label="Survival %" align="right" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const surv = Math.round((r.knockoutQual / r.entries) * 100);
              return (
                <tr
                  key={r.conf}
                  style={{
                    borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--color-border)',
                    background: i % 2 ? 'var(--color-bg-2)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '11px 14px', fontSize: 13, color: 'var(--color-text)', fontWeight: 500 }}>{r.conf}</td>
                  <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                    <TMono size={12} color="var(--color-text-2)">{r.entries}</TMono>
                  </td>
                  <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                    <TMono size={13} color="var(--color-gold)" weight={600}>{r.champions}</TMono>
                  </td>
                  <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                    <TMono size={12} color="var(--color-text)">{r.finalists}</TMono>
                  </td>
                  <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                    <TMono size={12} color="var(--color-text)">{r.semifinalists}</TMono>
                  </td>
                  <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                    <TMono size={12} color="var(--color-text-2)">{r.quarterfinalists}</TMono>
                  </td>
                  <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                    <TMono size={12} color="var(--color-text-2)">{r.knockoutQual}</TMono>
                  </td>
                  <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                    <TMono size={12} color={survivalColor(surv)} weight={600}>{surv}%</TMono>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: 12, fontSize: 12, lineHeight: 1.55, color: 'var(--color-text-3)' }}>
        UEFA gets the most entries by miles — but per-team, CONMEBOL converts at a far higher rate. They win
        more, reach more semis, and survive the group stage at the highest %. That's the entire angle.
      </p>
    </div>
  );
}

function survivalColor(pct: number): string {
  if (pct >= 70) return 'var(--color-green)';
  if (pct >= 50) return 'var(--color-gold)';
  if (pct >= 30) return 'var(--color-text-2)';
  return 'var(--color-red)';
}

function ThHead({ label, align = 'left' }: { label: string; align?: 'left' | 'right' | 'center' }) {
  return (
    <th
      style={{
        textAlign: align,
        padding: '11px 14px',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10.5,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-text-3)',
        }}
      >
        {label}
      </span>
    </th>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 12, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
      <h3
        style={{
          margin: 0,
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--color-gold)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </h3>
      {subtitle && <TLabel>{subtitle}</TLabel>}
    </div>
  );
}

/* ============================================================
   PER-TOURNAMENT CARDS
   ============================================================ */

function TournamentCards() {
  return (
    <div>
      <SectionHeader title="Tournament-by-tournament — what actually happened" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 12 }}>
        {TOURNAMENTS.map((t) => (
          <TournamentCard key={t.year} t={t} />
        ))}
      </div>
    </div>
  );
}

function TournamentCard({ t }: { t: AmericasTournament }) {
  const [expanded, setExpanded] = useState(false);
  const summary = summariseTournament(t);
  const top4 = t.teams.slice(0, 4);
  const championWasHostConf = t.championConf === t.hostConf;
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        padding: 16,
      }}
    >
      <header
        style={{
          marginBottom: 12,
          paddingBottom: 12,
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: 'var(--color-text)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.02em',
            }}
          >
            {t.year} · {t.hostNation}
          </div>
          <div style={{ marginTop: 2 }}>
            <TLabel>{t.totalTeams} teams · {t.formatNote}</TLabel>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <TLabel color="var(--color-gold)">Champion</TLabel>
          <div style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--color-text)' }}>
            <Flag nation={t.champion} size={20} />
            {t.champion}
          </div>
          <div style={{ marginTop: 2 }}>
            <TLabel color={championWasHostConf ? 'var(--color-gold)' : undefined}>
              {t.championConf}{championWasHostConf ? ' · home continent' : ''}
            </TLabel>
          </div>
        </div>
      </header>

      <div>
        <TLabel>Top 4</TLabel>
        <div style={{ marginTop: 6, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {top4.map((team) => (
            <Top4Cell key={team.pos} team={team} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <TLabel>By confederation</TLabel>
        <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {summary.map((s) => (
            <ConfRow key={s.conf} s={s} totalTeams={t.totalTeams} />
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          background: 'rgba(232,185,74,0.04)',
          border: '1px solid rgba(232,185,74,0.20)',
          borderRadius: 4,
          padding: 10,
        }}
      >
        <TLabel color="var(--color-gold)">Host nation finish</TLabel>
        <div style={{ marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <Flag nation={t.hostNation === 'United States' ? 'United States' : t.hostNation} size={20} />
          <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>{t.hostNation}</span>
          <span style={{ color: 'var(--color-text-3)' }}>·</span>
          <span style={{ color: 'var(--color-text-2)' }}>{STAGE_LABEL[t.hostFinish.stage]}</span>
          <TMono size={11} color="var(--color-text-3)">(pos {t.hostFinish.pos})</TMono>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          marginTop: 14,
          width: '100%',
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border-2)',
          color: 'var(--color-text-2)',
          padding: '7px 12px',
          borderRadius: 4,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-mono)',
          cursor: 'pointer',
        }}
      >
        {expanded ? 'Hide full standings ▴' : `Show all ${t.totalTeams} teams ▾`}
      </button>
      {expanded && (
        <div
          style={{
            marginTop: 12,
            maxHeight: 280,
            overflowY: 'auto',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-2)',
            borderRadius: 4,
            padding: 8,
          }}
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {t.teams.map((team) => (
              <FullStandingsRow key={team.pos} team={team} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const STAGE_TONE: Record<AmericasStage, PillTone> = {
  CHAMPION: 'gold',
  FINALIST: 'gold',
  SF: 'gold',
  QF: 'mute',
  R16: 'outline',
  GS: 'red',
};

function Top4Cell({ team }: { team: AmericasFinish }) {
  return (
    <div
      style={{
        background: 'var(--color-bg-2)',
        border: '1px solid var(--color-border)',
        borderRadius: 4,
        padding: 8,
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TPill tone={STAGE_TONE[team.stage]} size="sm">{STAGE_SHORT[team.stage]}</TPill>
      </div>
      <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center' }}>
        <Flag nation={team.team} size={20} />
      </div>
      <div
        style={{
          marginTop: 4,
          fontSize: 11,
          fontWeight: 500,
          color: 'var(--color-text)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {team.team}
      </div>
      <div style={{ marginTop: 2 }}>
        <TLabel>{team.conf}</TLabel>
      </div>
    </div>
  );
}

function ConfRow({ s, totalTeams }: { s: ConfSummary; totalTeams: number }) {
  const surv = Math.round((s.knockoutQual / s.entries) * 100);
  const bits: string[] = [];
  if (s.semifinalists > 0) bits.push(`${s.semifinalists} SF+`);
  if (s.quarterfinalists - s.semifinalists > 0) bits.push(`${s.quarterfinalists - s.semifinalists} QF`);
  const r16Count = s.knockoutQual - s.quarterfinalists;
  if (r16Count > 0 && totalTeams >= 24) bits.push(`${r16Count} R16`);
  if (bits.length === 0) bits.push('all out in groups');
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, fontSize: 12 }}>
      <span
        style={{
          width: 80,
          fontWeight: 500,
          color: s.conf === 'CONMEBOL' ? 'var(--color-gold)' : 'var(--color-text-2)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
        }}
      >
        {s.conf}
      </span>
      <span style={{ color: 'var(--color-text-3)' }}>{s.entries} in</span>
      <span style={{ flex: 1, color: 'var(--color-text-2)' }}>{bits.join(' · ')}</span>
      <TMono size={12} color={survivalColor(surv)}>{surv}%</TMono>
    </div>
  );
}

function FullStandingsRow({ team }: { team: AmericasFinish }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 6px', fontSize: 12 }}>
      <TMono size={11} color="var(--color-text-3)" style={{ width: 24, textAlign: 'right' }}>{team.pos}</TMono>
      <Flag nation={team.team} size={16} />
      <span style={{ flex: 1, color: 'var(--color-text)' }}>
        {team.team}{team.host ? <span style={{ marginLeft: 4, color: 'var(--color-gold)' }}>(H)</span> : null}
      </span>
      <span style={{ width: 64, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-3)' }}>{team.conf}</span>
      <TPill tone={STAGE_TONE[team.stage]} size="sm">{STAGE_SHORT[team.stage]}</TPill>
    </li>
  );
}

/* ============================================================
   2026 ANGLES
   ============================================================ */

function Bettor2026() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        padding: '18px 20px',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--color-gold)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        What this means for 2026 — three angles bookmakers usually under-price
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
        <Angle
          tag="Outright"
          title="CONMEBOL 1-X-2 vs UEFA"
          body="Argentina (holders, Messi-era squad still intact) and Brazil (the deepest attacking pool in the world) both fit the historical profile of an Americas-host CONMEBOL champion. Compare their outright prices to France/Spain/England — the market still over-weights European pedigree in a tournament where European pedigree historically tanks."
        />
        <Angle
          tag="Group"
          title="The host bonus is real but small"
          body="Mexico made QF in '70 and '86 — never further. USA's ceiling at home was R16 in '94. Brazil 2014 reached SF (4th) but lost 7-1 in the semi. Don't pay 'host favourite' premium on USA / Mexico / Canada — they're squeezed by top-3 finishers limited by their own ceiling, not their conditions."
        />
        <Angle
          tag="Stage betting"
          title="South-American-in-the-final is essentially priced wrong"
          body="It has happened in 5/5 Americas-host WCs. Bookmakers will offer 'Argentina to reach final', 'Brazil to reach final', 'a CONMEBOL team in the final' as separate markets — the implied combined probability frequently underprices the historical prior."
        />
      </div>
    </div>
  );
}

function Angle({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <div
      style={{
        background: 'var(--color-bg-2)',
        border: '1px solid var(--color-border)',
        borderRadius: 4,
        padding: 12,
      }}
    >
      <TLabel color="var(--color-gold)">{tag}</TLabel>
      <div style={{ marginTop: 4, fontSize: 13, fontWeight: 500, color: 'var(--color-text)', letterSpacing: '0.02em' }}>{title}</div>
      <p style={{ margin: '6px 0 0', fontSize: 12, lineHeight: 1.55, color: 'var(--color-text-2)' }}>{body}</p>
    </div>
  );
}
