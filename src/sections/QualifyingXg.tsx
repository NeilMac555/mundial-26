import { useMemo, useState } from 'react';
import { QUAL_XG, QUAL_XG_SOURCE, aggregate, type TeamXg, type XgAggregate, type XgMatch } from '../data/qualifyingXg';
import { managerByNation, type Confederation } from '../data/managers';
import { Flag } from '../components/Flag';
import { TCaption, TCaptionItem, TPill, TMono, TLabel, type PillTone } from '../components/terminal/atoms';

const CONFEDERATIONS: Confederation[] = ['CONMEBOL', 'UEFA', 'CAF', 'AFC', 'CONCACAF', 'OFC'];

const COVERAGE_NOTE = 'Wyscout exports loaded · more added as data arrives';

export function QualifyingXg() {
  const [team, setTeam] = useState(QUAL_XG[0]?.team ?? '');
  const current = QUAL_XG.find((t) => t.team === team);

  return (
    <div>
      <TCaption>
        <TCaptionItem label="Coverage" value={`${QUAL_XG.length} teams · ${COVERAGE_NOTE}`} />
        <TCaptionItem
          label="Source"
          value={
            <a href={QUAL_XG_SOURCE.url} target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold)' }}>
              wyscout.com
            </a>
          }
        />
      </TCaption>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Header team={team} setTeam={setTeam} />
        {current ? <TeamPanel t={current} /> : <EmptyState />}
      </div>
    </div>
  );
}

function Header({ team, setTeam }: { team: string; setTeam: (t: string) => void }) {
  const teamsByConf = useMemo(() => {
    const map = new Map<Confederation, string[]>();
    for (const c of CONFEDERATIONS) map.set(c, []);
    for (const t of QUAL_XG) {
      const conf = managerByNation(t.team)?.confederation;
      if (conf && map.has(conf)) map.get(conf)!.push(t.team);
    }
    for (const list of map.values()) list.sort((a, b) => a.localeCompare(b));
    return map;
  }, []);

  const teamConf = managerByNation(team)?.confederation ?? 'CONMEBOL';
  const [activeConf, setActiveConf] = useState<Confederation>(teamConf);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        {CONFEDERATIONS.map((c) => {
          const count = teamsByConf.get(c)?.length ?? 0;
          const active = activeConf === c;
          return (
            <button
              key={c}
              onClick={() => setActiveConf(c)}
              style={{
                background: active ? 'var(--color-surface-2)' : 'transparent',
                border: '1px solid ' + (active ? 'var(--color-gold)' : 'var(--color-border)'),
                color: active ? 'var(--color-text)' : 'var(--color-text-2)',
                padding: '6px 12px',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {c}
              <span
                style={{
                  marginLeft: 6,
                  fontFamily: 'var(--font-mono)',
                  color: active ? 'var(--color-gold)' : 'var(--color-text-3)',
                  fontSize: 11,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {teamsByConf.get(activeConf)?.map((t) => {
          const selected = team === t;
          return (
            <button
              key={t}
              onClick={() => setTeam(t)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: selected ? 'var(--color-surface-2)' : 'transparent',
                border: '1px solid ' + (selected ? 'var(--color-gold)' : 'var(--color-border)'),
                color: selected ? 'var(--color-text)' : 'var(--color-text-2)',
                padding: '5px 10px',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <Flag nation={t} size={16} />
              <span>{t}</span>
            </button>
          );
        })}
        {(teamsByConf.get(activeConf)?.length ?? 0) === 0 && (
          <span style={{ fontSize: 12, color: 'var(--color-text-3)' }}>No teams loaded for this confederation yet.</span>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        border: '1px dashed var(--color-border-2)',
        background: 'var(--color-surface)',
        padding: 32,
        textAlign: 'center',
        fontSize: 13,
        color: 'var(--color-text-3)',
        borderRadius: 6,
      }}
    >
      No team data loaded yet. Pick a team once Wyscout exports arrive.
    </div>
  );
}

function TeamPanel({ t }: { t: TeamXg }) {
  const a = useMemo(() => aggregate(t), [t]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {t.note && (
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid rgba(214,90,108,0.40)',
            borderRadius: 6,
            padding: 14,
            fontSize: 13,
            lineHeight: 1.55,
            color: 'var(--color-red)',
          }}
        >
          <span style={{ marginRight: 8, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: 11 }}>⚠ Caveat</span>
          {t.note}
        </div>
      )}
      <SummaryBlock team={t.team} a={a} />
      <MatchTable matches={t.matches} />
    </div>
  );
}

const FIN_TIER: Record<XgAggregate['finishingTier'], { label: string; tone: PillTone }> = {
  CLINICAL: { label: 'Clinical finishers', tone: 'green' },
  MET: { label: 'Met expectations', tone: 'mute' },
  WASTEFUL: { label: 'Wasteful finishers', tone: 'red' },
};

const DEF_TIER: Record<XgAggregate['defendingTier'], { label: string; tone: PillTone }> = {
  SOLID: { label: 'Solid defending', tone: 'green' },
  MET: { label: 'On expectations', tone: 'mute' },
  LEAKY: { label: 'Leaky / unlucky', tone: 'red' },
};

function SummaryBlock({ team, a }: { team: string; a: XgAggregate }) {
  const conv = a.shots ? (a.goalsFor / a.shots) * 100 : 0;
  const fin = FIN_TIER[a.finishingTier];
  const def = DEF_TIER[a.defendingTier];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 12 }}>
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 6, padding: 18 }}>
        <header
          style={{
            marginBottom: 14,
            paddingBottom: 12,
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Flag nation={team} size={32} />
          <div>
            <TLabel color="var(--color-gold)">Attacking · {a.matches} matches</TLabel>
            <div style={{ fontSize: 11, color: 'var(--color-text-3)', marginTop: 2 }}>{a.fromDate} → {a.toDate}</div>
          </div>
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <Stat label="xG / match" value={a.xgPer.toFixed(2)} />
          <Stat label="Goals / match" value={a.goalsPer.toFixed(2)} />
          <Stat label="Conversion" value={conv.toFixed(1) + '%'} />
        </div>
        <DeltaRow label="Δ Finishing" value={a.finishing} tone={fin.tone} chipLabel={fin.label} hint="Goals scored vs xG predicted" />
      </div>

      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 6, padding: 18 }}>
        <header
          style={{
            marginBottom: 14,
            paddingBottom: 12,
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Flag nation={team} size={32} />
          <div>
            <TLabel color="var(--color-gold)">Defending · {a.matches} matches</TLabel>
            <div style={{ fontSize: 11, color: 'var(--color-text-3)', marginTop: 2 }}>Lower xGA = higher quality block</div>
          </div>
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <Stat label="xGA / match" value={a.xgaPer.toFixed(2)} />
          <Stat label="GA / match" value={a.goalsAgainstPer.toFixed(2)} />
          <Stat label="Clean sheets" value={String(a.cleanSheets)} />
        </div>
        <DeltaRow label="Δ Defending" value={a.defending} tone={def.tone} chipLabel={def.label} hint="xGA expected vs goals actually conceded" />
      </div>
    </div>
  );
}

function Stat({ label, value, placeholder }: { label: string; value: string; placeholder?: boolean }) {
  return (
    <div>
      <TMono size={placeholder ? 22 : 26} color={placeholder ? 'var(--color-text-4)' : 'var(--color-text)'} weight={500}>
        {placeholder ? '—' : value}
      </TMono>
      <div style={{ marginTop: 4 }}>
        <TLabel>{label}</TLabel>
      </div>
    </div>
  );
}

function DeltaRow({
  label, value, tone, chipLabel, hint,
}: {
  label: string;
  value: number;
  tone: PillTone;
  chipLabel: string;
  hint: string;
}) {
  const sign = value > 0 ? '+' : '';
  return (
    <div
      style={{
        marginTop: 16,
        paddingTop: 12,
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        gap: 12,
      }}
    >
      <TLabel>{label}</TLabel>
      <TMono size={16} color="var(--color-text)" weight={600}>{sign}{value.toFixed(2)}</TMono>
      <TPill tone={tone} size="sm">{chipLabel}</TPill>
      <TMono size={10} color="var(--color-text-3)" style={{ marginLeft: 'auto' }}>{hint}</TMono>
    </div>
  );
}

/* ============================================================
   MATCH TABLE
   ============================================================ */

function MatchTable({ matches }: { matches: XgMatch[] }) {
  const maxAbs = Math.max(...matches.map((m) => Math.abs(m.xg - m.xga)));
  return (
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
            <ThHead label="Date" align="left" />
            <ThHead label="Opponent" align="left" />
            <ThHead label="H/A" align="center" />
            <ThHead label="Score" align="center" />
            <ThHead label="xG" align="right" />
            <ThHead label="xGA" align="right" />
            <ThHead label="xG dominance" align="left" />
          </tr>
        </thead>
        <tbody>
          {matches.map((m, i) => <MatchRow key={m.date + m.opponent} m={m} maxAbs={maxAbs} i={i} last={i === matches.length - 1} />)}
        </tbody>
      </table>
    </div>
  );
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

function MatchRow({ m, maxAbs, i, last }: { m: XgMatch; maxAbs: number; i: number; last: boolean }) {
  const diff = m.xg - m.xga;
  const won = m.gf > m.ga;
  const drew = m.gf === m.ga;
  const scoreColor = won ? 'var(--color-green)' : drew ? 'var(--color-text-2)' : 'var(--color-red)';
  return (
    <tr
      style={{
        borderBottom: last ? 'none' : '1px solid var(--color-border)',
        background: i % 2 ? 'var(--color-bg-2)' : 'transparent',
      }}
    >
      <td style={{ padding: '11px 14px' }}>
        <TMono size={12} color="var(--color-text-3)">{m.date}</TMono>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Flag nation={m.opponent} size={20} />
          <span style={{ fontSize: 13, color: 'var(--color-text)', fontWeight: 500 }}>{m.opponent}</span>
        </span>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'center' }}>
        <TMono size={11} color="var(--color-text-3)">{m.venue}</TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'center' }}>
        <TMono size={13} color={scoreColor} weight={500}>{m.gf}-{m.ga}</TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={12} color="var(--color-text-2)">{m.xg.toFixed(2)}</TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={12} color="var(--color-text-2)">{m.xga.toFixed(2)}</TMono>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <DominanceBar diff={diff} maxAbs={maxAbs} />
      </td>
    </tr>
  );
}

function DominanceBar({ diff, maxAbs }: { diff: number; maxAbs: number }) {
  const pct = maxAbs > 0 ? Math.min(100, (Math.abs(diff) / maxAbs) * 100) : 0;
  const positive = diff >= 0;
  return (
    <div style={{ position: 'relative', height: 12, width: '100%', overflow: 'hidden', background: 'var(--color-surface-3)', borderRadius: 2 }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', width: 1, background: 'var(--color-border-2)' }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          height: '100%',
          background: positive ? 'var(--color-green)' : 'var(--color-red)',
          opacity: 0.7,
          ...(positive
            ? { left: '50%', width: `${pct / 2}%` }
            : { right: '50%', width: `${pct / 2}%` }),
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          padding: '0 6px',
          fontSize: 10,
          fontWeight: 500,
          fontFamily: 'var(--font-mono)',
          color: positive ? 'var(--color-green)' : 'var(--color-red)',
          ...(positive ? { left: '51%' } : { right: '51%' }),
        }}
      >
        {positive ? '+' : ''}{diff.toFixed(2)}
      </div>
    </div>
  );
}
