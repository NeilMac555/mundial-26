import { useMemo, useState } from 'react';
import { SQUAD_VALUES, formatSquadValue, SQUAD_VALUE_SOURCE, type SquadValue } from '../data/squadValues';
import { managerByNation, type Confederation } from '../data/managers';
import { Flag } from '../components/Flag';
import { TCaption, TCaptionItem, TPill, TSortHead, TMono, TLabel, type PillTone } from '../components/terminal/atoms';

type SortKey = 'globalRank' | 'totalM' | 'nation';
type ConfFilter = 'all' | Confederation;

const CONF_OPTIONS: ConfFilter[] = ['all', 'UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'];

interface Row extends SquadValue {
  confederation: Confederation | null;
  group: string | null;
}

export function SquadValue() {
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'totalM', dir: 'desc' });
  const [conf, setConf] = useState<ConfFilter>('all');
  const [query, setQuery] = useState('');

  const enriched: Row[] = useMemo(() => {
    return SQUAD_VALUES.map((s) => {
      const m = managerByNation(s.nation);
      return { ...s, confederation: m?.confederation ?? null, group: m?.group ?? null };
    });
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: enriched.length };
    for (const t of enriched) {
      const k = t.confederation ?? 'OTHER';
      c[k] = (c[k] ?? 0) + 1;
    }
    return c;
  }, [enriched]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = enriched.filter((t) => {
      if (conf !== 'all' && t.confederation !== conf) return false;
      if (q && !t.nation.toLowerCase().includes(q)) return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [enriched, sort, conf, query]);

  const toggle = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'nation' ? 'asc' : 'desc' }));

  const totalValue = useMemo(() => enriched.reduce((s, t) => s + t.totalM, 0), [enriched]);
  const topThree = useMemo(() => [...enriched].sort((a, b) => b.totalM - a.totalM).slice(0, 3), [enriched]);

  return (
    <div>
      <TCaption>
        <TCaptionItem label="Snapshot" value={SQUAD_VALUE_SOURCE.asOf} />
        <TCaptionItem
          label="Source"
          value={
            <a href={SQUAD_VALUE_SOURCE.url} target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold)' }}>
              Transfermarkt
            </a>
          }
        />
        <TCaptionItem label="Sides" value={`${enriched.length} qualifiers`} />
        <TCaptionItem label="Pool" value={formatSquadValue(totalValue)} />
        <TCaptionItem
          label="Top three"
          value={topThree.map((t, i) => `${i > 0 ? ' · ' : ''}${t.nation} ${formatSquadValue(t.totalM)}`).join('')}
        />
      </TCaption>

      <Explainer />

      <FilterRow conf={conf} onConfChange={setConf} counts={counts} query={query} onQueryChange={setQuery} />

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
              <TSortHead label="World Rank" align="right" active={sort.key === 'globalRank'} dir={sort.dir} onClick={() => toggle('globalRank')} />
              <TSortHead label="Team" align="left" active={sort.key === 'nation'} dir={sort.dir} onClick={() => toggle('nation')} />
              <TSortHead label="Conf" align="left" active={false} />
              <TSortHead label="Group" align="left" active={false} />
              <TSortHead label="Squad Value" align="right" active={sort.key === 'totalM'} dir={sort.dir} onClick={() => toggle('totalM')} />
              <TSortHead label="Tier" align="left" active={false} />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => <RowCmp key={r.nation} r={r} i={i} last={i === rows.length - 1} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   EXPLAINER — what is squad value + the bands that matter
   ============================================================ */

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
        What "squad market value" actually measures
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-2)', margin: '0 0 12px' }}>
        Each team's total reflects what Transfermarkt estimates the entire squad would fetch on the open transfer
        market today. It's an aggregate of 26 individual player valuations driven by recent form, age, contract
        length, recent transfer fees of similar players, and league/club context.{' '}
        <strong style={{ color: 'var(--color-gold)' }}>It's the cleanest single proxy for raw talent on the pitch</strong>.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-2)', margin: '0 0 16px' }}>
        Caveat: it captures{' '}
        <em style={{ color: 'var(--color-text)', fontStyle: 'normal', fontWeight: 600 }}>individual quality</em>, not
        chemistry, manager fit, system effectiveness, or recent form. A €1bn squad with a new manager and weak cohesion
        can lose to a €200m squad that's been training together for years. Cross-reference with the{' '}
        <strong style={{ color: 'var(--color-gold)' }}>Manager tier</strong> and{' '}
        <strong style={{ color: 'var(--color-gold)' }}>Qualifying xG</strong> sections — squad value alone overrates
        teams in transition.
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
          <TLabel color="var(--color-gold)">€800m+</TLabel>
          <div style={{ marginTop: 4, fontSize: 12, color: 'var(--color-text-2)' }}>World-class. ~6 sides this WC</div>
        </div>
        <div>
          <TLabel color="var(--color-gold)">€300m – €800m</TLabel>
          <div style={{ marginTop: 4, fontSize: 12, color: 'var(--color-text-2)' }}>Serious contender / dark horse</div>
        </div>
        <div>
          <TLabel color="var(--color-gold)">&lt; €100m</TLabel>
          <div style={{ marginTop: 4, fontSize: 12, color: 'var(--color-text-2)' }}>Talent gap is real — beating quality requires structure + variance</div>
        </div>
      </div>
    </div>
  );
}

function FilterRow({
  conf, onConfChange, counts, query, onQueryChange,
}: {
  conf: ConfFilter;
  onConfChange: (c: ConfFilter) => void;
  counts: Record<string, number>;
  query: string;
  onQueryChange: (q: string) => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 18, alignItems: 'center', flexWrap: 'wrap' }}>
      {CONF_OPTIONS.map((c) => (
        <button
          key={c}
          onClick={() => onConfChange(c)}
          style={{
            background: conf === c ? 'var(--color-surface-2)' : 'transparent',
            border: '1px solid ' + (conf === c ? 'var(--color-gold)' : 'var(--color-border)'),
            color: conf === c ? 'var(--color-text)' : 'var(--color-text-2)',
            padding: '6px 12px',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          {c === 'all' ? 'All' : c}
          <span
            style={{
              marginLeft: 6,
              fontFamily: 'var(--font-mono)',
              color: conf === c ? 'var(--color-gold)' : 'var(--color-text-3)',
              fontSize: 11,
            }}
          >
            {counts[c === 'all' ? 'all' : c] ?? 0}
          </span>
        </button>
      ))}
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search team…"
        style={{
          marginLeft: 'auto',
          width: 200,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text)',
          padding: '6px 10px',
          borderRadius: 4,
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
        }}
      />
    </div>
  );
}

interface TierLabel { label: string; tone: PillTone }
function valueTier(totalM: number): TierLabel {
  if (totalM >= 800) return { label: 'World class', tone: 'gold' };
  if (totalM >= 300) return { label: 'Contender', tone: 'gold' };
  if (totalM >= 100) return { label: 'Solid', tone: 'mute' };
  if (totalM >= 30) return { label: 'Light', tone: 'outline' };
  return { label: 'Minnow', tone: 'outline' };
}

function RowCmp({ r, i, last }: { r: Row; i: number; last: boolean }) {
  const tier = valueTier(r.totalM);
  return (
    <tr
      style={{
        borderBottom: last ? 'none' : '1px solid var(--color-border)',
        background: i % 2 ? 'var(--color-bg-2)' : 'transparent',
      }}
    >
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        {r.globalRank ? (
          <TMono size={12} color="var(--color-text-3)">#{r.globalRank}</TMono>
        ) : (
          <TMono size={11} color="var(--color-text-4)">100+</TMono>
        )}
      </td>
      <td style={{ padding: '11px 14px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Flag nation={r.nation} size={20} />
          <span style={{ fontSize: 13, color: 'var(--color-text)', fontWeight: 500 }}>{r.nation}</span>
        </span>
      </td>
      <td style={{ padding: '11px 14px' }}>
        {r.confederation && <TPill tone="mute" size="sm">{r.confederation}</TPill>}
      </td>
      <td style={{ padding: '11px 14px' }}>
        <TMono size={12} color="var(--color-text-3)">{r.group ?? '—'}</TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={13} color="var(--color-text)" weight={600}>{formatSquadValue(r.totalM)}</TMono>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <TPill tone={tier.tone} size="sm">{tier.label}</TPill>
      </td>
    </tr>
  );
}
