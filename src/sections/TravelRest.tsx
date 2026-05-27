import { useMemo, useState } from 'react';
import { Flag } from '../components/Flag';
import {
  TLabel, TMono, TPill, TCaption, TCaptionItem, TSortHead, type PillTone,
} from '../components/terminal/atoms';
import { baseCampByNation, haversineKm } from '../data/baseCamps';
import { MATCHES, GROUPS, GROUP_KEYS, type GroupKey, type FixtureMatch } from '../data/fixtures';
import { VENUES, type Venue } from '../data/venues';

/* ============================================================
   STADIUM → VENUE LOOKUP
   Fixtures list stadium + city in venueRaw ("Estadio Azteca, Mexico City").
   VENUES uses canonical city names (e.g. "Los Angeles" not "Inglewood") so we
   map stadium-name → Venue for accurate lat/lng lookup.
   ============================================================ */

const STADIUM_TO_VENUE = new Map<string, Venue>(VENUES.map((v) => [v.stadium, v]));
function venueForMatch(m: FixtureMatch): Venue | undefined {
  return STADIUM_TO_VENUE.get(m.stadium);
}

/* ============================================================
   PER-TEAM TRAVEL DERIVATIONS
   ============================================================ */

interface Leg {
  fromLabel: string;     // "Base camp · Chattanooga" or stadium name
  toLabel: string;
  km: number;
  /** When the *match after* the leg is played. Used to gate rest-days display. */
  matchIso?: string;
  match?: FixtureMatch;
}

interface TeamTravel {
  nation: string;
  group: GroupKey;
  base: ReturnType<typeof baseCampByNation>;
  matches: FixtureMatch[];
  legs: Leg[];             // length = matches.length (base → m1, m1 → m2, ...)
  restDays: number[];      // length = matches.length - 1
  totalKm: number;
  minRest: number | null;  // null when only 1 fixture identified
  avgRest: number | null;
  worstLegKm: number;
  /** Distinct host cities visited during group stage (incl. base-camp city only when it shares a host venue). */
  citiesVisited: number;
}

function findGroup(nation: string): GroupKey | null {
  for (const k of GROUP_KEYS) {
    if (GROUPS[k].includes(nation)) return k;
  }
  return null;
}

function teamGroupFixtures(nation: string): FixtureMatch[] {
  return MATCHES
    .filter((m) => m.stage === 'GROUP' && (m.home === nation || m.away === nation))
    .sort((a, b) => a.iso.localeCompare(b.iso));
}

function daysBetween(isoA: string, isoB: string): number {
  const a = new Date(isoA + 'T00:00:00Z').getTime();
  const b = new Date(isoB + 'T00:00:00Z').getTime();
  return Math.round((b - a) / 86_400_000);
}

function buildTeamTravel(nation: string): TeamTravel | null {
  const group = findGroup(nation);
  if (!group) return null;
  const base = baseCampByNation(nation);
  const matches = teamGroupFixtures(nation);

  const legs: Leg[] = [];
  let prevPoint = base ? { lat: base.lat, lng: base.lng } : null;
  let prevLabel = base ? `Base · ${base.city}` : 'Base camp · TBC';

  for (const m of matches) {
    const v = venueForMatch(m);
    if (!v || !prevPoint) continue;
    const km = haversineKm(prevPoint, { lat: v.lat, lng: v.lng });
    legs.push({ fromLabel: prevLabel, toLabel: v.stadium, km, matchIso: m.iso, match: m });
    prevPoint = { lat: v.lat, lng: v.lng };
    prevLabel = v.stadium;
  }

  const restDays: number[] = [];
  for (let i = 1; i < matches.length; i++) {
    restDays.push(daysBetween(matches[i - 1].iso, matches[i].iso));
  }

  const totalKm = legs.reduce((s, l) => s + l.km, 0);
  const worstLegKm = legs.reduce((m, l) => Math.max(m, l.km), 0);
  const minRest = restDays.length ? Math.min(...restDays) : null;
  const avgRest = restDays.length ? restDays.reduce((s, r) => s + r, 0) / restDays.length : null;

  // Distinct cities the team plays in (the base-camp city counts only if it's a host).
  const cities = new Set<string>();
  for (const l of legs) cities.add(l.toLabel);

  return {
    nation, group, base, matches, legs, restDays,
    totalKm, minRest, avgRest, worstLegKm,
    citiesVisited: cities.size,
  };
}

/* ============================================================
   ROOT
   ============================================================ */

type SortKey = 'nation' | 'group' | 'totalKm' | 'minRest' | 'worstLegKm';
type GroupFilter = 'all' | GroupKey;

export function TravelRest() {
  const teams = useMemo(() => {
    const out: TeamTravel[] = [];
    for (const k of GROUP_KEYS) {
      for (const nation of GROUPS[k]) {
        const t = buildTeamTravel(nation);
        if (t) out.push(t);
      }
    }
    return out;
  }, []);

  const aggregates = useMemo(() => {
    const sorted = [...teams].sort((a, b) => b.totalKm - a.totalKm);
    const longestLegTeam = teams.reduce((m, t) => (t.worstLegKm > m.worstLegKm ? t : m), teams[0]);
    const shortestRestTeam = teams
      .filter((t) => t.minRest !== null)
      .reduce(
        (m, t) => (t.minRest! < m.minRest! ? t : m),
        teams.find((t) => t.minRest !== null) ?? teams[0],
      );
    const lowest = sorted[sorted.length - 1];
    const highest = sorted[0];
    const totalAvg =
      teams.reduce((s, t) => s + t.totalKm, 0) / Math.max(1, teams.length);
    return { highest, lowest, longestLegTeam, shortestRestTeam, totalAvg };
  }, [teams]);

  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({
    key: 'totalKm', dir: 'desc',
  });
  const [filter, setFilter] = useState<GroupFilter>('all');
  const [openNation, setOpenNation] = useState<string | null>(null);

  const rows = useMemo(() => {
    const filtered = filter === 'all' ? teams : teams.filter((t) => t.group === filter);
    return [...filtered].sort((a, b) => {
      let cmp: number;
      switch (sort.key) {
        case 'nation':     cmp = a.nation.localeCompare(b.nation); break;
        case 'group':      cmp = a.group.localeCompare(b.group); break;
        case 'totalKm':    cmp = a.totalKm - b.totalKm; break;
        case 'minRest':    cmp = (a.minRest ?? 99) - (b.minRest ?? 99); break;
        case 'worstLegKm': cmp = a.worstLegKm - b.worstLegKm; break;
      }
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [teams, filter, sort]);

  const toggle = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' }));

  return (
    <div>
      <TCaption>
        <TCaptionItem label="Source" value="FIFA-confirmed base camps · 2026-05-27 (Iran → Tijuana)" />
        <TCaptionItem label="Distance" value="Great-circle (haversine) km, base → match 1 → 2 → 3" />
        <TCaptionItem label="Rest" value="Calendar days between consecutive group fixtures" />
        <TCaptionItem
          label="Tournament avg travel"
          value={`${Math.round(aggregates.totalAvg).toLocaleString()} km`}
        />
      </TCaption>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <HeroStats agg={aggregates} />
        <BackgroundCallout />

        <GroupFilterRow value={filter} onChange={setFilter} />

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
                <TSortHead label="Team"        align="left"  active={sort.key === 'nation'}     dir={sort.dir} onClick={() => toggle('nation')} />
                <TSortHead label="Group"       align="left"  active={sort.key === 'group'}      dir={sort.dir} onClick={() => toggle('group')} />
                <TSortHead label="Base camp"   align="left"  active={false} mono />
                <TSortHead label="Total km"    align="right" active={sort.key === 'totalKm'}    dir={sort.dir} onClick={() => toggle('totalKm')} />
                <TSortHead label="Worst leg"   align="right" active={sort.key === 'worstLegKm'} dir={sort.dir} onClick={() => toggle('worstLegKm')} />
                <TSortHead label="Min rest"    align="right" active={sort.key === 'minRest'}    dir={sort.dir} onClick={() => toggle('minRest')} />
                <TSortHead label="Legs"        align="left"  active={false} />
                <th style={{ width: 32 }} />
              </tr>
            </thead>
            <tbody>
              {rows.map((t, i) => (
                <TravelRow
                  key={t.nation}
                  t={t}
                  i={i}
                  open={openNation === t.nation}
                  onToggle={() => setOpenNation((n) => (n === t.nation ? null : t.nation))}
                />
              ))}
            </tbody>
          </table>
        </div>

        <Methodology />
      </div>
    </div>
  );
}

/* ============================================================
   HERO STATS
   ============================================================ */

function HeroStats({ agg }: { agg: { highest: TeamTravel; lowest: TeamTravel; longestLegTeam: TeamTravel; shortestRestTeam: TeamTravel; totalAvg: number } }) {
  const tiles = [
    {
      eyebrow: 'Most-travelled side',
      value: `${Math.round(agg.highest.totalKm).toLocaleString()} km`,
      sub: `${agg.highest.nation} · Group ${agg.highest.group}. Base camp + three group venues.`,
      flag: agg.highest.nation,
    },
    {
      eyebrow: 'Worst single leg',
      value: `${Math.round(agg.longestLegTeam.worstLegKm).toLocaleString()} km`,
      sub: `${agg.longestLegTeam.nation}'s longest hop between consecutive matches. Tournament-wide outlier.`,
      flag: agg.longestLegTeam.nation,
    },
    {
      eyebrow: 'Tightest turnaround',
      value: `${agg.shortestRestTeam.minRest} days`,
      sub: `${agg.shortestRestTeam.nation} have the shortest gap between group fixtures.`,
      flag: agg.shortestRestTeam.nation,
    },
    {
      eyebrow: 'Lowest-travel side',
      value: `${Math.round(agg.lowest.totalKm).toLocaleString()} km`,
      sub: `${agg.lowest.nation} · Group ${agg.lowest.group}. Closest to a single-host setup.`,
      flag: agg.lowest.nation,
    },
  ];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 12,
      }}
    >
      {tiles.map((t) => (
        <div
          key={t.eyebrow}
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 6,
            padding: 18,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Flag nation={t.flag} size={20} />
            <TLabel>{t.eyebrow}</TLabel>
          </div>
          <TMono size={26} color="var(--color-text)" weight={500}>{t.value}</TMono>
          <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.5, color: 'var(--color-text-3)' }}>{t.sub}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   BACKGROUND
   ============================================================ */

function BackgroundCallout() {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(232,185,74,0.04), rgba(232,185,74,0.10))',
        border: '1px solid rgba(232,185,74,0.40)',
        borderRadius: 8,
        padding: '20px 22px',
      }}
    >
      <div style={{ marginBottom: 6 }}>
        <TLabel color="var(--color-gold)">Why this matters · physiology + scheduling</TLabel>
      </div>
      <h3
        style={{
          margin: '4px 0 12px',
          fontSize: 19,
          fontWeight: 500,
          color: 'var(--color-text)',
          letterSpacing: '-0.012em',
        }}
      >
        A 3-host World Cup makes travel a first-order variable
      </h3>
      <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.55, color: 'var(--color-text-2)' }}>
        Cross-country flights pile on time-zone shifts, dehydration risk and disturbed sleep — all of
        which suppress recovery between fixtures. Combined with FIFA's mostly 3- and 4-day group
        turnarounds, sides forced into the longest hops between matches are running a steeper
        physiological deficit by matchday 3 than the bracket itself implies.
      </p>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--color-text-2)' }}>
        Each team's distance is calculated from their Wikipedia-listed base camp to match 1, then between
        each subsequent group venue. Big regional differences emerge: Mexico-grouped sides and Pacific
        Northwest sides travel a fraction of what cross-continental groups (D, H, K) face.
      </p>
    </div>
  );
}

/* ============================================================
   GROUP FILTER
   ============================================================ */

function GroupFilterRow({
  value, onChange,
}: { value: GroupFilter; onChange: (v: GroupFilter) => void }) {
  const opts: { key: GroupFilter; label: string }[] = [
    { key: 'all', label: 'All groups' },
    ...GROUP_KEYS.map((k) => ({ key: k as GroupFilter, label: `Group ${k}` })),
  ];
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
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
        Tip · Click a row to expand the per-fixture breakdown · Click headers to sort
      </span>
    </div>
  );
}

/* ============================================================
   ROW
   ============================================================ */

function totalTone(km: number): PillTone {
  if (km >= 6000) return 'red';
  if (km >= 3500) return 'gold';
  if (km >= 1500) return 'mute';
  return 'green';
}
function legTone(km: number): PillTone {
  if (km >= 2500) return 'red';
  if (km >= 1500) return 'gold';
  return 'mute';
}
function restTone(days: number | null): PillTone {
  if (days === null) return 'mute';
  if (days <= 3) return 'red';
  if (days <= 4) return 'gold';
  return 'green';
}

function TravelRow({
  t, i, open, onToggle,
}: { t: TeamTravel; i: number; open: boolean; onToggle: () => void }) {
  const totalTo = totalTone(t.totalKm);
  const worstTo = legTone(t.worstLegKm);
  const restTo  = restTone(t.minRest);
  const altRow = i % 2 ? 'var(--color-bg-2)' : 'transparent';

  return (
    <>
      <tr
        onClick={onToggle}
        style={{
          borderBottom: '1px solid var(--color-border)',
          background: open ? 'rgba(232,185,74,0.05)' : altRow,
          cursor: 'pointer',
        }}
      >
        <td style={{ padding: '11px 14px', fontSize: 13, color: 'var(--color-text)', fontWeight: 500 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Flag nation={t.nation} size={20} />
            {t.nation}
          </span>
        </td>
        <td style={{ padding: '11px 14px' }}>
          <TPill tone="outline" size="sm">{t.group}</TPill>
        </td>
        <td style={{ padding: '11px 14px', fontSize: 12.5, color: 'var(--color-text-2)' }}>
          {t.base ? `${t.base.city}, ${t.base.region}` : '—'}
        </td>
        <td style={{ padding: '11px 14px', textAlign: 'right' }}>
          <TPill tone={totalTo} size="sm">
            <TMono size={11} color="inherit" weight={600}>{Math.round(t.totalKm).toLocaleString()}</TMono> km
          </TPill>
        </td>
        <td style={{ padding: '11px 14px', textAlign: 'right' }}>
          <TPill tone={worstTo} size="sm">
            <TMono size={11} color="inherit" weight={600}>{Math.round(t.worstLegKm).toLocaleString()}</TMono> km
          </TPill>
        </td>
        <td style={{ padding: '11px 14px', textAlign: 'right' }}>
          <TPill tone={restTo} size="sm">
            <TMono size={11} color="inherit" weight={600}>{t.minRest ?? '—'}</TMono> d
          </TPill>
        </td>
        <td style={{ padding: '11px 14px' }}>
          <LegBar legs={t.legs} />
        </td>
        <td style={{ padding: '11px 14px', color: 'var(--color-text-3)', fontSize: 14, textAlign: 'center' }}>
          {open ? '▾' : '▸'}
        </td>
      </tr>
      {open && (
        <tr style={{ background: 'var(--color-bg-2)', borderBottom: '1px solid var(--color-border)' }}>
          <td colSpan={8} style={{ padding: '16px 18px' }}>
            <TravelDetail t={t} />
          </td>
        </tr>
      )}
    </>
  );
}

function LegBar({ legs }: { legs: Leg[] }) {
  const max = Math.max(...legs.map((l) => l.km), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 20 }}>
      {legs.map((l, i) => {
        const pct = Math.max(8, (l.km / max) * 100);
        const tone = legTone(l.km);
        const color =
          tone === 'red' ? 'var(--color-red)' :
          tone === 'gold' ? 'var(--color-gold)' :
          'var(--color-text-4)';
        return (
          <div
            key={i}
            title={`${l.fromLabel} → ${l.toLabel}: ${Math.round(l.km).toLocaleString()} km`}
            style={{
              width: 10,
              height: `${pct}%`,
              background: color,
              borderRadius: 2,
              opacity: 0.85,
            }}
          />
        );
      })}
    </div>
  );
}

/* ============================================================
   EXPANDED DETAIL
   ============================================================ */

function TravelDetail({ t }: { t: TeamTravel }) {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      {t.base && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
          <TLabel>Base camp</TLabel>
          <span style={{ fontSize: 13, color: 'var(--color-text)' }}>{t.base.hotel}</span>
          <span style={{ fontSize: 12, color: 'var(--color-text-3)' }}>
            · {t.base.city}, {t.base.region}
          </span>
          <span style={{ fontSize: 12, color: 'var(--color-text-3)' }}>
            · training: {t.base.training}
          </span>
        </div>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
        <thead>
          <tr style={{ color: 'var(--color-text-3)', textAlign: 'left' }}>
            <th style={{ padding: '6px 8px', fontWeight: 500 }}>Match</th>
            <th style={{ padding: '6px 8px', fontWeight: 500 }}>Date</th>
            <th style={{ padding: '6px 8px', fontWeight: 500 }}>Opponent</th>
            <th style={{ padding: '6px 8px', fontWeight: 500 }}>Venue</th>
            <th style={{ padding: '6px 8px', fontWeight: 500, textAlign: 'right' }}>Travel-in</th>
            <th style={{ padding: '6px 8px', fontWeight: 500, textAlign: 'right' }}>Rest before</th>
          </tr>
        </thead>
        <tbody>
          {t.matches.map((m, idx) => {
            const opp = m.home === t.nation ? m.away : m.home;
            const isHome = m.home === t.nation;
            const leg = t.legs[idx];
            const rest = idx === 0 ? null : t.restDays[idx - 1];
            return (
              <tr key={m.no} style={{ borderTop: '1px solid var(--color-border)' }}>
                <td style={{ padding: '8px 8px', color: 'var(--color-text-2)' }}>
                  <TPill tone="outline" size="sm">MD{idx + 1}</TPill>
                </td>
                <td style={{ padding: '8px 8px', color: 'var(--color-text-2)' }}>{m.date}</td>
                <td style={{ padding: '8px 8px', color: 'var(--color-text)' }}>
                  <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: 'var(--color-text-3)' }}>{isHome ? 'vs' : '@'}</span>
                    <Flag nation={opp} size={16} />
                    {opp}
                  </span>
                </td>
                <td style={{ padding: '8px 8px', color: 'var(--color-text-2)' }}>
                  {m.stadium} · <span style={{ color: 'var(--color-text-3)' }}>{m.city}</span>
                </td>
                <td style={{ padding: '8px 8px', textAlign: 'right' }}>
                  {leg ? (
                    <TPill tone={legTone(leg.km)} size="sm">
                      <TMono size={11} color="inherit" weight={500}>{Math.round(leg.km).toLocaleString()}</TMono> km
                    </TPill>
                  ) : '—'}
                </td>
                <td style={{ padding: '8px 8px', textAlign: 'right' }}>
                  {rest !== null ? (
                    <TPill tone={restTone(rest)} size="sm">
                      <TMono size={11} color="inherit" weight={500}>{rest}</TMono> d
                    </TPill>
                  ) : <span style={{ color: 'var(--color-text-4)', fontSize: 11 }}>opener</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================
   METHODOLOGY
   ============================================================ */

function Methodology() {
  return (
    <details>
      <summary
        style={{
          cursor: 'pointer',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        Methodology + caveats ▾
      </summary>
      <div
        style={{
          marginTop: 12,
          padding: '14px 16px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 6,
          fontSize: 12.5,
          lineHeight: 1.6,
          color: 'var(--color-text-2)',
        }}
      >
        <p style={{ margin: '0 0 10px' }}>
          <strong style={{ color: 'var(--color-gold)' }}>Distance:</strong> great-circle (haversine) km
          between centroid coordinates of the base-camp city and each subsequent host stadium. Real
          flight paths are slightly longer; ground transfers add a few more km. This is a lower-bound
          proxy for relative travel load — not an exact mileage figure.
        </p>
        <p style={{ margin: '0 0 10px' }}>
          <strong style={{ color: 'var(--color-gold)' }}>Rest days:</strong> calendar-day delta between
          consecutive group fixtures (kick-off date to kick-off date). A "3-day" rest typically means
          the team plays again on the third day after the previous match.
        </p>
        <p style={{ margin: '0 0 10px' }}>
          <strong style={{ color: 'var(--color-gold)' }}>Base-camp assumption:</strong> Wikipedia entries
          for "Team base camps" are FIFA-coordinated bookings. We treat the camp as the team's start
          point and assume they don't relocate during the group stage. In practice some teams use a
          single camp; others fly to the venue, train locally and fly back. Both patterns are captured
          by the same total km.
        </p>
        <p style={{ margin: 0 }}>
          <strong style={{ color: 'var(--color-gold)' }}>Knockout stages:</strong> currently this view
          covers the group stage only — knockout venues depend on group-finishing positions and aren't
          resolved until matchday 3.
        </p>
      </div>
    </details>
  );
}
