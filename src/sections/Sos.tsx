import { useMemo, useState } from 'react';
import { SOS, SOS_AS_OF, type SosRecord } from '../data/sos';
import { Flag } from '../components/Flag';
import { TCaption, TCaptionItem, TPill, TSortHead, TMono, TLabel, type PillTone } from '../components/terminal/atoms';
import { usePaywall } from '../paywall/PaywallContext';

const FREE_ROW_LIMIT = 5;

type SortKey = 'sosRank' | 'team' | 'gamesPlayed' | 'teamElo' | 'avgOppElo' | 'sosScore';

export function Sos() {
  const { hasPro, openUnlock } = usePaywall();
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'sosRank', dir: 'asc' });

  const rows = useMemo(() => {
    return [...SOS].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      // Push nulls (hosts) to the bottom regardless of dir
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [sort]);

  const toggle = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'team' ? 'asc' : 'asc' }));

  return (
    <div>
      <TCaption>
        <TCaptionItem label="Snapshot" value={SOS_AS_OF} />
        <TCaptionItem label="Coverage" value="All qualifying rounds" />
        <TCaptionItem label="Hosts" value="Excluded — no qualifying matches" />
      </TCaption>

      <Explainer />

      <div
        style={{
          marginTop: 18,
          border: '1px solid var(--color-border)',
          borderRadius: 6,
          overflow: 'hidden',
          background: 'var(--color-surface)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <TSortHead label="SOS Rank" align="right" active={sort.key === 'sosRank'} dir={sort.dir} onClick={() => toggle('sosRank')} />
              <TSortHead label="Team" align="left" active={sort.key === 'team'} dir={sort.dir} onClick={() => toggle('team')} />
              <TSortHead label="Conf" align="left" active={false} />
              <TSortHead label="GP" align="right" active={sort.key === 'gamesPlayed'} dir={sort.dir} onClick={() => toggle('gamesPlayed')} />
              <TSortHead label="Team Elo" align="right" active={sort.key === 'teamElo'} dir={sort.dir} onClick={() => toggle('teamElo')} />
              <TSortHead label="Avg Opp Elo" align="right" active={sort.key === 'avgOppElo'} dir={sort.dir} onClick={() => toggle('avgOppElo')} />
              <TSortHead label="SOS Score" align="right" active={sort.key === 'sosScore'} dir={sort.dir} onClick={() => toggle('sosScore')} />
              <TSortHead label="Difficulty" align="left" active={false} />
            </tr>
          </thead>
          <tbody>
            {(hasPro ? rows : rows.slice(0, FREE_ROW_LIMIT)).map((r, i, arr) => (
              <Row key={r.team} r={r} i={i} last={i === arr.length - 1} />
            ))}
            {!hasPro && (
              <tr>
                <td colSpan={8} style={{ padding: 0 }}>
                  <SosLockRow remaining={rows.length - FREE_ROW_LIMIT} onUnlock={openUnlock} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SosLockRow({ remaining, onUnlock }: { remaining: number; onUnlock: () => void }) {
  return (
    <div
      style={{
        padding: '18px 20px',
        background: 'linear-gradient(180deg, rgba(232,185,74,0.04), rgba(232,185,74,0.10))',
        borderTop: '1px solid rgba(232,185,74,0.30)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
        flexWrap: 'wrap',
      }}
    >
      <div>
        <div
          style={{
            fontSize: 14,
            color: 'var(--color-text)',
            fontWeight: 500,
            letterSpacing: '-0.005em',
            marginBottom: 4,
          }}
        >
          + {remaining} more teams ranked
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-text-3)', lineHeight: 1.5 }}>
          Unlock the full SOS table — sortable across all 48 qualifiers.
        </div>
      </div>
      <button
        onClick={onUnlock}
        style={{
          padding: '9px 18px',
          background: 'var(--color-gold)',
          color: 'var(--color-bg)',
          border: 'none',
          borderRadius: 4,
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '-0.005em',
          flexShrink: 0,
        }}
      >
        Unlock · £14.99
      </button>
    </div>
  );
}

function Explainer() {
  return (
    <div
      style={{
        marginTop: 18,
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
        What is Strength of Schedule?
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-2)', margin: '0 0 12px' }}>
        A measure of how hard each team's qualifying campaign was. The score answers a simple question:{' '}
        <em style={{ color: 'var(--color-text)', fontStyle: 'italic' }}>"If you replaced this team with an average World Cup side (Elo 1775), how often would they win against the same opponents?"</em>{' '}
        Lower score = brutal schedule. Higher score = walkover.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-2)', margin: '0 0 16px' }}>
        Why it matters: a strong qualifying record against tough opposition (CONMEBOL teams sweep the top of this table)
        is more impressive than the same record against weak opposition (top CONCACAF / AFC sides feast on minnows).
        Cross-reference with the <strong style={{ color: 'var(--color-gold)' }}>Over/Under-Achievers</strong> section to see who
        actually exceeded what their schedule predicted.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          borderTop: '1px solid var(--color-border)',
          paddingTop: 12,
        }}
      >
        <div>
          <TLabel color="var(--color-gold)">SOS Rank</TLabel>
          <div style={{ marginTop: 4, fontSize: 12, color: 'var(--color-text-2)' }}>1 = hardest schedule, 48 = easiest</div>
        </div>
        <div>
          <TLabel color="var(--color-gold)">SOS Score</TLabel>
          <div style={{ marginTop: 4, fontSize: 12, color: 'var(--color-text-2)' }}>0 = avg WC team loses every match · 1 = wins every match · 0.5 = coin flip</div>
        </div>
        <div>
          <TLabel color="var(--color-gold)">Avg Opp Elo</TLabel>
          <div style={{ marginTop: 4, fontSize: 12, color: 'var(--color-text-2)' }}>Average Elo of every opponent faced in qualifying</div>
        </div>
      </div>
    </div>
  );
}

function difficultyToTone(difficulty: string): PillTone {
  const d = difficulty.toLowerCase();
  if (d.includes('extremely')) return 'red';
  if (d.includes('very')) return 'red';
  if (d.startsWith('difficult')) return 'gold';
  if (d.includes('above')) return 'gold';
  if (d.includes('host')) return 'mute';
  return 'mute';
}

function Row({ r, i, last }: { r: SosRecord; i: number; last: boolean }) {
  const isHost = r.sosRank == null;
  return (
    <tr
      style={{
        borderBottom: last ? 'none' : '1px solid var(--color-border)',
        background: isHost ? 'rgba(232,185,74,0.04)' : i % 2 ? 'var(--color-bg-2)' : 'transparent',
      }}
    >
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={12} color="var(--color-text-3)">{r.sosRank ?? '—'}</TMono>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Flag nation={r.team} size={20} />
          <span style={{ fontSize: 13, color: 'var(--color-text)', fontWeight: 500 }}>{r.team}</span>
        </span>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <TPill tone="mute" size="sm">{r.confederation}</TPill>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={12} color="var(--color-text-3)">{r.gamesPlayed ?? '—'}</TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={12} color="var(--color-text-2)">{r.teamElo ?? '—'}</TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={12} color="var(--color-text-2)">{r.avgOppElo ?? '—'}</TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={13} color="var(--color-text)" weight={600}>{r.sosScore != null ? r.sosScore.toFixed(3) : '—'}</TMono>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <TPill tone={difficultyToTone(r.difficulty)} size="sm">{r.difficulty}</TPill>
      </td>
    </tr>
  );
}
