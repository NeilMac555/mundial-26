import { useMemo, useState } from 'react';
import { PERFORMANCE, PERFORMANCE_NOTE, PERFORMANCE_AS_OF, type PerformanceRecord } from '../data/performance';
import { Flag } from '../components/Flag';
import { TCaption, TCaptionItem, TPill, TSortHead, TMono, type PillTone } from '../components/terminal/atoms';

type SortKey = 'team' | 'teamElo' | 'gp' | 'actualPctTop100' | 'deltaSchedule' | 'deltaElo';

export function History() {
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'deltaElo', dir: 'desc' });

  const rows = useMemo(() => {
    return [...PERFORMANCE].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [sort]);

  const toggle = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'team' ? 'asc' : 'desc' }));

  return (
    <div>
      <TCaption>
        <TCaptionItem label="Snapshot" value={PERFORMANCE_AS_OF} />
        <TCaptionItem label="Note" value={PERFORMANCE_NOTE} />
        <TCaptionItem label="Filter" value="GP = matches vs top-100 Elo opponents only" />
        <TCaptionItem label="Flag" value="⚠ = small sample (n < 4)" />
      </TCaption>

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
              <TSortHead label="Team" align="left" active={sort.key === 'team'} dir={sort.dir} onClick={() => toggle('team')} />
              <TSortHead label="Conf" align="left" active={false} />
              <TSortHead label="Elo" align="right" active={sort.key === 'teamElo'} dir={sort.dir} onClick={() => toggle('teamElo')} />
              <TSortHead label="GP*" align="right" active={sort.key === 'gp'} dir={sort.dir} onClick={() => toggle('gp')} />
              <TSortHead label="Pts %" align="right" active={sort.key === 'actualPctTop100'} dir={sort.dir} onClick={() => toggle('actualPctTop100')} />
              <TSortHead label="Δ Schedule" align="right" active={sort.key === 'deltaSchedule'} dir={sort.dir} onClick={() => toggle('deltaSchedule')} />
              <TSortHead label="Schedule Verdict" align="left" active={false} />
              <TSortHead label="Δ Elo" align="right" active={sort.key === 'deltaElo'} dir={sort.dir} onClick={() => toggle('deltaElo')} />
              <TSortHead label="Elo Verdict" align="left" active={false} />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => <Row key={r.team} r={r} i={i} last={i === rows.length - 1} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
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

function Row({ r, i, last }: { r: PerformanceRecord; i: number; last: boolean }) {
  const sTone = verdictToTone(r.scheduleVerdict);
  const eTone = verdictToTone(r.eloVerdict);
  const fmtSigned = (n: number | null) => (n == null ? '—' : (n > 0 ? '+' : '') + n.toFixed(3));

  return (
    <tr
      style={{
        borderBottom: last ? 'none' : '1px solid var(--color-border)',
        background: i % 2 ? 'var(--color-bg-2)' : 'transparent',
      }}
    >
      <td style={{ padding: '11px 14px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Flag nation={r.team} size={20} />
          <span style={{ fontSize: 13, color: 'var(--color-text)', fontWeight: 500 }}>{r.team}</span>
          {r.smallSample && <span style={{ fontSize: 11, color: 'var(--color-red)' }}>⚠</span>}
        </span>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <TPill tone="mute" size="sm">{r.confederation}</TPill>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={12} color="var(--color-text-2)">{r.teamElo ?? '—'}</TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={12} color="var(--color-text-3)">{r.gp}</TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={12} color="var(--color-text-2)">{r.actualPctTop100 != null ? (r.actualPctTop100 * 100).toFixed(0) + '%' : '—'}</TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={12} color={deltaTextColor(r.scheduleVerdict)}>{fmtSigned(r.deltaSchedule)}</TMono>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <TPill tone={sTone} size="sm">{r.scheduleVerdict}</TPill>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={13} color={deltaTextColor(r.eloVerdict)} weight={600}>{fmtSigned(r.deltaElo)}</TMono>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <TPill tone={eTone} size="sm">{r.eloVerdict}</TPill>
      </td>
    </tr>
  );
}
