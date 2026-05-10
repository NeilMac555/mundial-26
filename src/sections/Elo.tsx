import { useMemo, useState } from 'react';
import { ELO_TEAMS, ELO_SNAPSHOT_DATE, ELO_SOURCE_URL, CONFEDERATION, type EloTeam } from '../data/elo';
import { MANAGERS, eloNameForNation } from '../data/managers';
import { Flag } from '../components/Flag';
import { TCaption, TCaptionItem, TPill, TSortHead, TMono, TDelta } from '../components/terminal/atoms';

const QUALIFIER_ELO_NAMES: Set<string> = new Set(MANAGERS.map((m) => eloNameForNation(m.nation)));
const WC_TEAMS: EloTeam[] = ELO_TEAMS.filter((t) => QUALIFIER_ELO_NAMES.has(t.name));

type SortKey = 'rank' | 'rating' | 'ch1y' | 'matches' | 'name';
type Conf = 'all' | 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC';

const CONF_OPTIONS: Conf[] = ['all', 'UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'];

export function Elo() {
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'rank', dir: 'asc' });
  const [conf, setConf] = useState<Conf>('all');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(50);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: WC_TEAMS.length };
    for (const t of WC_TEAMS) {
      const k = CONFEDERATION[t.code] ?? 'OTHER';
      c[k] = (c[k] ?? 0) + 1;
    }
    return c;
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = WC_TEAMS.filter((t) => {
      if (conf !== 'all' && CONFEDERATION[t.code] !== conf) return false;
      if (q && !t.name.toLowerCase().includes(q) && !t.code.toLowerCase().includes(q)) return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [sort, conf, query]);

  const visible = rows.slice(0, limit);
  const toggle = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'rank' || key === 'name' ? 'asc' : 'desc' }));

  const meanElo = Math.round(WC_TEAMS.reduce((s, t) => s + t.rating, 0) / WC_TEAMS.length);
  const top = WC_TEAMS.reduce((a, b) => (a.rating > b.rating ? a : b));
  const bottom = WC_TEAMS.reduce((a, b) => (a.rating < b.rating ? a : b));

  return (
    <div>
      <TCaption>
        <TCaptionItem label="Snapshot" value={ELO_SNAPSHOT_DATE} />
        <TCaptionItem label="Source" value={<a href={ELO_SOURCE_URL} target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold)' }}>eloratings.net</a>} />
        <TCaptionItem label="Sides" value={`${WC_TEAMS.length} qualifiers`} />
        <TCaptionItem label="Mean Elo" value={meanElo.toLocaleString()} />
        <TCaptionItem label="Spread" value={`${top.code} ${top.rating} → ${bottom.code} ${bottom.rating}`} />
      </TCaption>

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
              <TSortHead label="Rank"  align="right" active={sort.key === 'rank'}    dir={sort.dir} onClick={() => toggle('rank')} />
              <TSortHead label="Team"  align="left"  active={sort.key === 'name'}    dir={sort.dir} onClick={() => toggle('name')} />
              <TSortHead label="Conf"  align="left"  active={false} />
              <TSortHead label="Elo"   align="right" active={sort.key === 'rating'}  dir={sort.dir} onClick={() => toggle('rating')} />
              <TSortHead label="1Y Δ"  align="right" active={sort.key === 'ch1y'}    dir={sort.dir} onClick={() => toggle('ch1y')} />
              <TSortHead label="Matches" align="right" active={sort.key === 'matches'} dir={sort.dir} onClick={() => toggle('matches')} />
            </tr>
          </thead>
          <tbody>
            {visible.map((t, i) => <Row key={t.code} t={t} i={i} last={i === visible.length - 1} />)}
          </tbody>
        </table>
      </div>

      {rows.length > limit && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
          <button
            onClick={() => setLimit((l) => l + 50)}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-2)',
              color: 'var(--color-text-2)',
              padding: '8px 18px',
              borderRadius: 4,
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
            }}
          >
            Show {Math.min(50, rows.length - limit)} more · {rows.length - limit} hidden
          </button>
        </div>
      )}
    </div>
  );
}

function FilterRow({
  conf, onConfChange, counts, query, onQueryChange,
}: {
  conf: Conf;
  onConfChange: (c: Conf) => void;
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
        placeholder="Search team or code…"
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

function Row({ t, i, last }: { t: EloTeam; i: number; last: boolean }) {
  const conf = CONFEDERATION[t.code] ?? 'OTHER';
  return (
    <tr
      style={{
        borderBottom: last ? 'none' : '1px solid var(--color-border)',
        background: i % 2 ? 'var(--color-bg-2)' : 'transparent',
      }}
    >
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={12} color="var(--color-text-3)">{t.rank}</TMono>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Flag nation={t.name} size={20} />
          <span style={{ fontSize: 13, color: 'var(--color-text)', fontWeight: 500 }}>{t.name}</span>
          <TMono size={11} color="var(--color-text-3)">{t.code}</TMono>
        </span>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <TPill tone="mute" size="sm">{conf}</TPill>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={13} color="var(--color-text)" weight={600}>{t.rating}</TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        {t.ch1y === 0
          ? <TMono size={11} color="var(--color-text-4)">·</TMono>
          : <TDelta value={t.ch1y} format="num" precision={0} />
        }
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={12} color="var(--color-text-3)">{t.matches}</TMono>
      </td>
    </tr>
  );
}
