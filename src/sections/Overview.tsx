import { useMemo, useState } from 'react';
import { VENUES, type Venue } from '../data/venues';
import { TCaption, TCaptionItem, TPill, TSortHead, TMono } from '../components/terminal/atoms';

type SortKey = 'city' | 'country' | 'altitudeM' | 'juneAvgHighC' | 'juneAvgHumidity';

export function Overview() {
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'altitudeM', dir: 'desc' });
  const [filter, setFilter] = useState<'all' | 'USA' | 'Mexico' | 'Canada'>('all');

  const rows = useMemo(() => {
    const filtered = filter === 'all' ? VENUES : VENUES.filter((v) => v.country === filter);
    return [...filtered].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [sort, filter]);

  const toggle = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' }));

  const flaggedCount = VENUES.filter((v) => v.altitudeM >= 1500 || v.juneAvgHighC >= 32).length;
  const maxAlt = Math.max(...VENUES.map((v) => v.altitudeM));
  const maxHeat = Math.max(...VENUES.map((v) => v.juneAvgHighC));

  return (
    <div>
      <TCaption>
        <TCaptionItem label="Snapshot" value="MAY 06 2026" />
        <TCaptionItem label="Sources" value="Stadium databases · NOAA climate normals" />
        <TCaptionItem label="Window" value="June average — host-month conditions" />
        <TCaptionItem label="Flagged venues" value={`${flaggedCount} of ${VENUES.length}`} />
        <TCaptionItem label="Highest" value={`${maxAlt.toLocaleString()} m · ${maxHeat}°C`} />
      </TCaption>

      <FilterRow value={filter} onChange={setFilter} />

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
              <TSortHead label="City"      align="left"  active={sort.key === 'city'}            dir={sort.dir} onClick={() => toggle('city')} />
              <TSortHead label="Stadium"   align="left"  active={false} mono />
              <TSortHead label="Country"   align="left"  active={sort.key === 'country'}         dir={sort.dir} onClick={() => toggle('country')} />
              <TSortHead label="Altitude (m)"  align="right" active={sort.key === 'altitudeM'}       dir={sort.dir} onClick={() => toggle('altitudeM')} />
              <TSortHead label="June high (°C)" align="right" active={sort.key === 'juneAvgHighC'}    dir={sort.dir} onClick={() => toggle('juneAvgHighC')} />
              <TSortHead label="Humidity (%)" align="right" active={sort.key === 'juneAvgHumidity'} dir={sort.dir} onClick={() => toggle('juneAvgHumidity')} />
              <TSortHead label="Roof"      align="left"  active={false} />
            </tr>
          </thead>
          <tbody>
            {rows.map((v, i) => (
              <Row key={v.city} v={v} i={i} last={i === rows.length - 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterRow({
  value, onChange,
}: {
  value: 'all' | 'USA' | 'Mexico' | 'Canada';
  onChange: (v: 'all' | 'USA' | 'Mexico' | 'Canada') => void;
}) {
  const opts: Array<{ key: 'all' | 'USA' | 'Mexico' | 'Canada'; label: string; count: number }> = [
    { key: 'all',    label: 'All',    count: VENUES.length },
    { key: 'USA',    label: 'USA',    count: VENUES.filter((v) => v.country === 'USA').length },
    { key: 'Mexico', label: 'Mexico', count: VENUES.filter((v) => v.country === 'Mexico').length },
    { key: 'Canada', label: 'Canada', count: VENUES.filter((v) => v.country === 'Canada').length },
  ];
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        marginTop: 18,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {opts.map((o) => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          style={{
            background: value === o.key ? 'var(--color-surface-2)' : 'transparent',
            border: '1px solid ' + (value === o.key ? 'var(--color-gold)' : 'var(--color-border)'),
            color: value === o.key ? 'var(--color-text)' : 'var(--color-text-2)',
            padding: '6px 12px',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            letterSpacing: '-0.005em',
          }}
        >
          {o.label}
          <span
            style={{
              marginLeft: 6,
              fontFamily: 'var(--font-mono)',
              color: value === o.key ? 'var(--color-gold)' : 'var(--color-text-3)',
              fontSize: 11,
            }}
          >
            {o.count}
          </span>
        </button>
      ))}
      <span
        style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: 10.5,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-text-3)',
        }}
      >
        Tip · Click headers to sort · Highlighted rows = altitude ≥ 1500m or June high ≥ 32°C · 🔥 ≥ 32°C heat · 💦 ≥ 75% humidity · faded emoji = roof can mitigate
      </span>
    </div>
  );
}

// Climate-load thresholds — open-roof venues get the strictest treatment because
// closed/retractable can be mitigated on the day.
function heatHumidityIcons(v: Venue): string {
  const fire = v.juneAvgHighC >= 32 ? '🔥' : '';
  const sweat = v.juneAvgHumidity >= 75 ? '💦' : '';
  return fire + sweat;
}

function Row({ v, i, last }: { v: Venue; i: number; last: boolean }) {
  const heatFlag = v.juneAvgHighC >= 32;
  const humidFlag = v.juneAvgHumidity >= 75;
  const altFlag = v.altitudeM >= 1500;
  const flagged = heatFlag || humidFlag || altFlag;
  const icons = heatHumidityIcons(v);
  // Open-roof venues with brutal heat/humidity get the strongest visual flag —
  // closed/retractable venues can be climate-controlled on the day.
  const openRoofBrutal = v.roof === 'open' && (heatFlag || humidFlag);

  return (
    <tr
      style={{
        borderBottom: last ? 'none' : '1px solid var(--color-border)',
        background: flagged ? 'rgba(232,185,74,0.04)' : i % 2 ? 'var(--color-bg-2)' : 'transparent',
      }}
    >
      <td style={{ padding: '11px 14px', fontSize: 13, color: 'var(--color-text)', fontWeight: 500 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {v.city}
          {icons && (
            <span
              aria-label={
                heatFlag && humidFlag
                  ? 'High heat and humidity'
                  : heatFlag
                  ? 'High heat'
                  : 'High humidity'
              }
              title={
                heatFlag && humidFlag
                  ? `High heat (${v.juneAvgHighC}°C) + humidity (${v.juneAvgHumidity}%)${openRoofBrutal ? ' · open roof' : ''}`
                  : heatFlag
                  ? `High heat (${v.juneAvgHighC}°C)`
                  : `High humidity (${v.juneAvgHumidity}%)`
              }
              style={{ fontSize: 13, lineHeight: 1, opacity: openRoofBrutal ? 1 : 0.7 }}
            >
              {icons}
            </span>
          )}
        </span>
      </td>
      <td style={{ padding: '11px 14px', fontSize: 13, color: 'var(--color-text-2)' }}>
        {v.stadium}
      </td>
      <td style={{ padding: '11px 14px' }}>
        <TPill tone="mute" size="sm">{v.country}</TPill>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={13} color={altFlag ? 'var(--color-gold)' : 'var(--color-text)'} weight={altFlag ? 600 : 500}>
          {v.altitudeM.toLocaleString()}
        </TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={13} color={heatFlag ? 'var(--color-gold)' : 'var(--color-text)'} weight={heatFlag ? 600 : 500}>
          {v.juneAvgHighC}
        </TMono>
      </td>
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={13} color={humidFlag ? 'var(--color-gold)' : 'var(--color-text-2)'} weight={humidFlag ? 600 : 500}>
          {v.juneAvgHumidity}
        </TMono>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <TPill tone={v.roof === 'closed' || v.roof === 'retractable' ? 'gold' : 'outline'} size="sm">
          {v.roof}
        </TPill>
      </td>
    </tr>
  );
}
