import { useMemo, useState } from 'react';
import {
  GROUPS, GROUP_KEYS, MATCHES, FIXTURES_SOURCE, FIXTURE_CITIES, STAGE_LABEL,
  matchesForGroup,
  type FixtureMatch, type GroupKey, type KnockoutStage,
} from '../data/fixtures';
import { Flag } from '../components/Flag';
import { TLabel, TMono, TPill, TCaption, TCaptionItem, type PillTone } from '../components/terminal/atoms';

type StageFilter = 'all' | 'GROUP' | 'KO';
type GroupFilter = 'all' | GroupKey;

export function Fixtures() {
  return (
    <div>
      <TCaption>
        <TCaptionItem label="Teams" value="48 across 12 groups of 4" />
        <TCaptionItem label="Matches" value={String(MATCHES.length)} />
        <TCaptionItem label="Window" value={`${MATCHES[0].date} → ${MATCHES[MATCHES.length - 1].date}`} />
        <TCaptionItem
          label="Source"
          value={
            <a href={FIXTURES_SOURCE.url} target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold)' }}>
              en.wikipedia.org · 2026 FIFA World Cup
            </a>
          }
        />
        <TCaptionItem label="Scraped" value={FIXTURES_SOURCE.asOf} />
      </TCaption>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Explainer />
        <HeroStats />
        <GroupCards />
        <FixtureTable />
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
        Group draw &amp; full schedule — the joining table for every other section
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-2)', margin: '0 0 12px' }}>
        48 teams across 12 groups of 4. Top two from each group plus the eight best third-placers reach the
        Round of 32 — the first time the World Cup adds a 32-team knockout round before the traditional
        R16. That's <strong style={{ color: 'var(--color-text)' }}>8 group games per team minimum, 7 knockout rounds to win it</strong>,
        and the third group game becomes the new <em style={{ color: 'var(--color-text)', fontStyle: 'italic', fontWeight: 600 }}>"rotation trap"</em> for already-qualified
        favourites (see the Golden Boot pattern).
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-2)', margin: 0 }}>
        Use this as the index. Cross-reference any match here with the relevant team's{' '}
        <strong style={{ color: 'var(--color-gold)' }}>Elo</strong>,{' '}
        <strong style={{ color: 'var(--color-gold)' }}>squad value</strong>,{' '}
        <strong style={{ color: 'var(--color-gold)' }}>manager tier</strong>,{' '}
        <strong style={{ color: 'var(--color-gold)' }}>qualifying xG</strong>, and the venue's{' '}
        <strong style={{ color: 'var(--color-gold)' }}>heat / altitude</strong> profile.
      </p>
    </div>
  );
}

/* ============================================================
   HERO STATS
   ============================================================ */

function HeroStats() {
  const groupGames = MATCHES.filter((m) => m.stage === 'GROUP').length;
  const koGames = MATCHES.length - groupGames;
  const firstDate = MATCHES[0].date;
  const lastDate = MATCHES[MATCHES.length - 1].date;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
      <Hero value="48" label="Teams" sub="12 groups of 4 — first 48-team World Cup" />
      <Hero value={String(MATCHES.length)} label="Matches" sub={`${groupGames} group · ${koGames} knockout`} />
      <Hero value="39" label="Days" sub={`${firstDate} → ${lastDate}`} />
      <Hero value="16" label="Host cities" sub="11 USA · 3 Mexico · 2 Canada" />
    </div>
  );
}

function Hero({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        padding: 18,
      }}
    >
      <TMono size={26} color="var(--color-text)" weight={500}>{value}</TMono>
      <div style={{ marginTop: 6 }}>
        <TLabel color="var(--color-text-2)">{label}</TLabel>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.5, color: 'var(--color-text-3)' }}>{sub}</div>
    </div>
  );
}

/* ============================================================
   GROUP CARDS
   ============================================================ */

function GroupCards() {
  const [open, setOpen] = useState<GroupKey | null>(null);
  return (
    <div>
      <SectionHeader title="The 12 groups" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
        {GROUP_KEYS.map((g) => (
          <GroupCard key={g} groupKey={g} expanded={open === g} onToggle={() => setOpen(open === g ? null : g)} />
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
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
    </div>
  );
}

function GroupCard({ groupKey, expanded, onToggle }: { groupKey: GroupKey; expanded: boolean; onToggle: () => void }) {
  const teams = GROUPS[groupKey];
  const matches = matchesForGroup(groupKey);
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 12,
          padding: '10px 14px',
          textAlign: 'left',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid var(--color-border)',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--color-gold)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Group {groupKey}
        </span>
        <TLabel>
          {matches.length} matches · {expanded ? 'hide' : 'show fixtures'}
        </TLabel>
      </button>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {teams.map((t, i) => (
          <li
            key={t}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 14px',
              borderBottom: i === teams.length - 1 ? 'none' : '1px solid var(--color-border)',
            }}
          >
            <Flag nation={t} size={20} />
            <span style={{ fontSize: 13, color: 'var(--color-text)' }}>{t}</span>
          </li>
        ))}
      </ul>
      {expanded && (
        <div style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-2)', padding: '12px 14px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {matches.map((m) => (
              <li key={m.no} style={{ fontSize: 12 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: 8,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-3)',
                  }}
                >
                  <span>{shortDate(m.iso)}</span>
                  <span>·</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'right' }}>{m.city}</span>
                </div>
                <div style={{ marginTop: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Flag nation={m.home} size={16} />
                  <span style={{ color: 'var(--color-text)' }}>{m.home}</span>
                  <span style={{ color: 'var(--color-text-3)' }}>v</span>
                  <Flag nation={m.away} size={16} />
                  <span style={{ color: 'var(--color-text)' }}>{m.away}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   FIXTURE TABLE
   ============================================================ */

function FixtureTable() {
  const [stage, setStage] = useState<StageFilter>('all');
  const [group, setGroup] = useState<GroupFilter>('all');
  const [city, setCity] = useState<string>('all');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MATCHES.filter((m) => {
      if (stage === 'GROUP' && m.stage !== 'GROUP') return false;
      if (stage === 'KO' && m.stage === 'GROUP') return false;
      if (group !== 'all' && m.group !== group) return false;
      if (city !== 'all' && m.city !== city) return false;
      if (q) {
        const hay = `${m.home} ${m.away} ${m.homeRaw} ${m.awayRaw} ${m.stadium} ${m.city}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [stage, group, city, query]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
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
          Full schedule
        </h3>
        <TLabel>{rows.length} of {MATCHES.length}</TLabel>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        <FilterButton label="All" active={stage === 'all'} onClick={() => setStage('all')} />
        <FilterButton label="Group stage" active={stage === 'GROUP'} onClick={() => setStage('GROUP')} />
        <FilterButton label="Knockouts" active={stage === 'KO'} onClick={() => setStage('KO')} />

        <span style={{ margin: '0 4px', color: 'var(--color-text-4)' }}>·</span>

        <select
          value={group}
          onChange={(e) => setGroup(e.target.value as GroupFilter)}
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            padding: '6px 10px',
            borderRadius: 4,
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
          }}
        >
          <option value="all">All groups</option>
          {GROUP_KEYS.map((g) => (
            <option key={g} value={g}>Group {g}</option>
          ))}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            padding: '6px 10px',
            borderRadius: 4,
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
          }}
        >
          <option value="all">All cities</option>
          {FIXTURE_CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search team or venue…"
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
              <ThHead label="#" align="right" />
              <ThHead label="Date" align="left" />
              <ThHead label="KO (local)" align="left" />
              <ThHead label="Stage" align="left" />
              <ThHead label="Match" align="left" />
              <ThHead label="Venue" align="left" />
            </tr>
          </thead>
          <tbody>
            {rows.map((m, i) => (
              <Row key={m.no} m={m} i={i} last={i === rows.length - 1} />
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            padding: 24,
            textAlign: 'center',
            fontSize: 13,
            color: 'var(--color-text-3)',
            borderRadius: 6,
          }}
        >
          No matches match those filters.
        </div>
      )}
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

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? 'var(--color-surface-2)' : 'transparent',
        border: '1px solid ' + (active ? 'var(--color-gold)' : 'var(--color-border)'),
        color: active ? 'var(--color-text)' : 'var(--color-text-2)',
        padding: '6px 12px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

function Row({ m, i, last }: { m: FixtureMatch; i: number; last: boolean }) {
  return (
    <tr
      style={{
        borderBottom: last ? 'none' : '1px solid var(--color-border)',
        background: i % 2 ? 'var(--color-bg-2)' : 'transparent',
      }}
    >
      <td style={{ padding: '11px 14px', textAlign: 'right' }}>
        <TMono size={11} color="var(--color-text-3)">{m.no}</TMono>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <TMono size={12} color="var(--color-text)">{shortDate(m.iso)}</TMono>
        <div style={{ marginTop: 2 }}>
          <TLabel>{weekday(m.iso)}</TLabel>
        </div>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <TMono size={12} color="var(--color-text-2)">
          {m.kickoff} <span style={{ color: 'var(--color-text-3)' }}>UTC{m.utc}</span>
        </TMono>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <StageChip stage={m.stage} group={m.group} />
      </td>
      <td style={{ padding: '11px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TeamCell team={m.home} raw={m.homeRaw} isTeam={m.homeIsTeam} align="right" />
          <span style={{ fontSize: 11, color: 'var(--color-text-3)' }}>v</span>
          <TeamCell team={m.away} raw={m.awayRaw} isTeam={m.awayIsTeam} align="left" />
        </div>
      </td>
      <td style={{ padding: '11px 14px' }}>
        <div style={{ fontSize: 12, color: 'var(--color-text)' }}>{m.stadium}</div>
        <div style={{ marginTop: 2 }}>
          <TLabel>{m.city}</TLabel>
        </div>
      </td>
    </tr>
  );
}

function TeamCell({ team, raw, isTeam, align }: { team: string; raw: string; isTeam: boolean; align: 'left' | 'right' }) {
  if (!isTeam) {
    return (
      <span
        style={{
          flex: 1,
          fontSize: 12,
          fontStyle: 'italic',
          color: 'var(--color-text-3)',
          textAlign: align,
        }}
      >
        {raw}
      </span>
    );
  }
  return (
    <span
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      {align === 'right' && <span style={{ fontSize: 13, color: 'var(--color-text)' }}>{team}</span>}
      <Flag nation={team} size={20} />
      {align === 'left' && <span style={{ fontSize: 13, color: 'var(--color-text)' }}>{team}</span>}
    </span>
  );
}

const STAGE_TONE: Record<KnockoutStage, PillTone> = {
  GROUP: 'mute',
  R32: 'outline',
  R16: 'gold',
  QF: 'gold',
  SF: 'gold',
  '3RD': 'mute',
  FINAL: 'gold',
};

function StageChip({ stage, group }: { stage: KnockoutStage; group: GroupKey | null }) {
  const label = stage === 'GROUP' && group ? `Group ${group}` : STAGE_LABEL[stage];
  return <TPill tone={STAGE_TONE[stage]} size="sm">{label}</TPill>;
}

/* ============================================================
   DATE HELPERS
   ============================================================ */

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function isoToDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function shortDate(iso: string): string {
  const d = isoToDate(iso);
  return `${SHORT_MONTHS[d.getMonth()]} ${d.getDate()}`;
}

function weekday(iso: string): string {
  const d = isoToDate(iso);
  return WEEKDAYS[d.getDay()];
}
