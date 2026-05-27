import { useState } from 'react';
import { Markdown } from '../components/Markdown';
import { Flag } from '../components/Flag';
import { TLabel, TMono, TPill, TCaption, TCaptionItem, type PillTone } from '../components/terminal/atoms';
import altitudeMd from '../content/altitude.md?raw';

export function Altitude() {
  return (
    <div>
      <TCaption>
        <TCaptionItem label="Headline venue" value="Estadio Azteca · 2,200m" />
        <TCaptionItem label="Azteca matches" value="5 (3 group + R32 + QF)" />
        <TCaptionItem label="Acclimatised teams" value="Mexico · Colombia · Ecuador" />
      </TCaption>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <HeroStats />
        <WhyAltitudeMatters />
        <VenueOverview />
        <AdaptedTeams />
        <KeyMatches />
        <WastedAdvantage />
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 24 }}>
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
              Read the full analysis ▾
            </summary>
            <div style={{ marginTop: 16 }}>
              <SourceNote path="src/content/altitude.md" />
              <Markdown source={altitudeMd} />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

function SourceNote({ path }: { path: string }) {
  return (
    <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          background: 'var(--color-surface-3)',
          padding: '2px 8px',
          borderRadius: 3,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--color-text-3)',
        }}
      >
        {path}
      </span>
      <span style={{ fontSize: 12, color: 'var(--color-text-3)' }}>· edit the markdown to update the deep-dive</span>
    </div>
  );
}

/* ============================================================
   HERO STATS
   ============================================================ */

const HERO_STATS = [
  {
    value: '2,200m',
    label: 'Estadio Azteca altitude',
    sub: '~20% less oxygen than sea level. Ball travels faster through thinner air. Famous fortress for Mexico.',
  },
  {
    value: '5',
    label: 'Matches at Azteca',
    sub: '3 group stage + 1 R32 + 1 QF. Every match is a high-altitude exposure for the visiting side.',
  },
  {
    value: '3',
    label: 'Fully acclimatised teams',
    sub: 'Mexico, Colombia, Ecuador. All play domestic football regularly above 1,500m.',
  },
];

function HeroStats() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 12,
      }}
    >
      {HERO_STATS.map((s) => (
        <div
          key={s.label}
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 6,
            padding: 18,
          }}
        >
          <TMono size={28} color="var(--color-text)" weight={500}>{s.value}</TMono>
          <div style={{ marginTop: 6 }}>
            <TLabel color="var(--color-text-2)">{s.label}</TLabel>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.5, color: 'var(--color-text-3)' }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   VENUE OVERVIEW
   ============================================================ */

interface Venue { name: string; city: string; altitude: number; impact: string; tone: PillTone; tier: string }

const VENUES: Venue[] = [
  {
    name: 'Estadio Azteca',
    city: 'Mexico City',
    altitude: 2200,
    impact: 'EXTREME. ~20% less oxygen. Stamina, ball trajectory, and pressing intensity all materially altered. Home edge for Mexico is enormous.',
    tone: 'red',
    tier: 'Extreme',
  },
  {
    name: 'Estadio Akron',
    city: 'Zapopan / Guadalajara',
    altitude: 1566,
    impact: 'MODERATE. Above the 1,500m threshold where physiological effects begin. Noticeable second-half fatigue for unacclimatised sides.',
    tone: 'gold',
    tier: 'Moderate',
  },
  {
    name: 'Estadio BBVA',
    city: 'Monterrey',
    altitude: 540,
    impact: 'NEGLIGIBLE. Effectively sea level. No altitude factor — group with US/Canada venues.',
    tone: 'mute',
    tier: 'None',
  },
];

function SectionHeader({ title, subtitle, color }: { title: string; subtitle?: string; color?: string }) {
  return (
    <div style={{ marginBottom: 12, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
      <h3
        style={{
          margin: 0,
          fontSize: 14,
          fontWeight: 500,
          color: color ?? 'var(--color-gold)',
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
   WHY ALTITUDE MATTERS — physiology distilled for bettors
   ============================================================ */

function WhyAltitudeMatters() {
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
        <TLabel color="var(--color-gold)">Why altitude matters · the physiology</TLabel>
      </div>
      <h3
        style={{
          margin: '4px 0 14px',
          fontSize: 19,
          fontWeight: 500,
          color: 'var(--color-text)',
          letterSpacing: '-0.012em',
        }}
      >
        VO₂ max drops 8–11% for every 1,000m above 1,600m
      </h3>
      <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.55, color: 'var(--color-text-2)' }}>
        Air at altitude isn't <em>thinner</em> in oxygen content — the percentage stays the same (~21%).
        What changes is air <strong style={{ color: 'var(--color-text)' }}>density</strong>: the lower
        atmospheric pressure means less oxygen diffuses from lungs into blood. The body delivers less
        O₂ to working muscles, so every burst, sprint and recovery costs more.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
          marginBottom: 14,
        }}
      >
        <PhysFact
          headline="Reduced O₂ pressure"
          body="Lower partial pressure of oxygen means less of it diffuses from lungs into the bloodstream — even though the air is still 21% O₂."
        />
        <PhysFact
          headline="Lower blood oxygen"
          body="Less O₂ in the bloodstream → less O₂ delivered to working muscles. Sprints feel heavier, recovery between them slows."
        />
        <PhysFact
          headline="Decreased cardiac output"
          body="Plasma volume drops to compensate, which lowers max heart rate + stroke volume. The aerobic ceiling shrinks."
        />
      </div>

      <div
        style={{
          padding: '12px 14px',
          background: 'var(--color-bg-2)',
          border: '1px solid var(--color-border)',
          borderRadius: 6,
          fontSize: 13,
          lineHeight: 1.55,
          color: 'var(--color-text-2)',
        }}
      >
        <strong style={{ color: 'var(--color-gold)' }}>Azteca-applied:</strong> at 2,240m, that's 640m
        above the 1,600m threshold — roughly <strong style={{ color: 'var(--color-text)' }}>5–7% lower VO₂ max</strong>{' '}
        for any non-acclimatised player from kick-off. Acclimatised sides (Mexico, Colombia, Ecuador) start
        from baseline. Sea-level European teams pay the full tax for ~10–14 days of the tournament.
      </div>
    </div>
  );
}

function PhysFact({ headline, body }: { headline: string; body: string }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        padding: '12px 14px',
      }}
    >
      <div style={{ marginBottom: 6 }}>
        <TLabel color="var(--color-gold-2)">{headline}</TLabel>
      </div>
      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--color-text-2)' }}>{body}</p>
    </div>
  );
}

function VenueOverview() {
  return (
    <div>
      <SectionHeader title="Mexican venues by altitude" subtitle="All other tournament venues = sea level" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
        {VENUES.map((v) => (
          <div
            key={v.name}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              padding: 18,
            }}
          >
            <header
              style={{
                marginBottom: 10,
                paddingBottom: 10,
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{v.name}</div>
                <div style={{ fontSize: 11, color: 'var(--color-text-3)', marginTop: 2 }}>{v.city}</div>
              </div>
              <TMono size={20} color="var(--color-text)" weight={500}>{v.altitude.toLocaleString()}m</TMono>
            </header>
            <div style={{ marginBottom: 10 }}>
              <TPill tone={v.tone} size="sm">{v.tier}</TPill>
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--color-text-2)' }}>{v.impact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   ACCLIMATISED TEAMS
   ============================================================ */

interface AdaptedTier { label: string; sub: string; tone: PillTone; teams: { nation: string; note: string }[] }

const ADAPTED_TIERS: AdaptedTier[] = [
  {
    label: 'Fully acclimatised',
    sub: 'Domestic football regularly played above 1,500m — the altitude is home turf',
    tone: 'green',
    teams: [
      { nation: 'Mexico', note: 'Mexico City 2,240m, Toluca 2,660m, Puebla 2,160m. Two Azteca group games + potential R32 + QF — biggest single venue edge in the tournament.' },
      { nation: 'Colombia', note: 'Bogotá 2,640m. Plays Akron and Azteca in their first two group games before dropping to Miami.' },
      { nation: 'Ecuador', note: 'Quito 2,850m — most altitude-hardened side in the WC. But all three group games at US sea-level venues. Edge wasted.' },
    ],
  },
  {
    label: 'Partial exposure',
    sub: 'Some domestic / regional altitude experience but not at extreme levels',
    tone: 'gold',
    teams: [
      { nation: 'South Africa', note: 'Johannesburg 1,750m. Some adaptation. Faces Mexico at Azteca on opening day — minor mitigation but still uphill.' },
      { nation: 'Iran', note: 'Tehran ~1,200m. Baseline adaptation. Group G in USA — no altitude matches.' },
      { nation: 'Uzbekistan', note: 'Tashkent ~450m + some Central Asian away matches at moderate altitude. Faces Colombia at Azteca — partial buffer at best.' },
    ],
  },
];

function AdaptedTeams() {
  return (
    <div>
      <SectionHeader title="Altitude-acclimatised teams" subtitle="Everyone else has zero competitive 1,500m+ experience" color="var(--color-green)" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 12 }}>
        {ADAPTED_TIERS.map((t) => (
          <div
            key={t.label}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              padding: 18,
            }}
          >
            <header style={{ marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid var(--color-border)' }}>
              <TPill tone={t.tone} size="sm">{t.label}</TPill>
              <div style={{ marginTop: 6, fontSize: 11, lineHeight: 1.4, color: 'var(--color-text-3)' }}>{t.sub}</div>
            </header>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {t.teams.map((tm) => (
                <li key={tm.nation} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Flag nation={tm.nation} size={20} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text)' }}>{tm.nation}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.4, color: 'var(--color-text-3)' }}>{tm.note}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   KEY ALTITUDE MATCHES
   ============================================================ */

type Severity = 'EXTREME' | 'CLEAR' | 'MODERATE' | 'MINIMAL';

interface AltMatch {
  match: string;
  acclimatised: string;
  visitor: string;
  venue: string;
  altitude: number;
  kickoff: string;
  severity: Severity;
  edge: string;
  summary: string;
  markets: string[];
}

const KEY_MATCHES: AltMatch[] = [
  {
    match: 'Match 1',
    acclimatised: 'Mexico',
    visitor: 'South Africa',
    venue: 'Azteca · Mexico City',
    altitude: 2200,
    kickoff: 'June 11 · 13:00 local · Tournament opener',
    severity: 'EXTREME',
    edge: 'Mexico',
    summary:
      'Mexico fully acclimatised + home crowd + tournament opener. South Africa have Johannesburg exposure but nothing like 2,200m. Expect strong Mexico performance throughout, South Africa fading second half.',
    markets: [
      'Back Mexico — handicap viable',
      'Second-half goals over (SA fatigue compounds)',
      'Mexico to score in 2H',
    ],
  },
  {
    match: 'Match 24',
    acclimatised: 'Colombia',
    visitor: 'Uzbekistan',
    venue: 'Azteca · Mexico City',
    altitude: 2200,
    kickoff: 'June 17 · 20:00 local',
    severity: 'EXTREME',
    edge: 'Colombia',
    summary:
      'Double whammy for Uzbekistan — already underdogs on quality (Elo gap ~270) and now playing at 2,200m vs a side that thrives in thin air. Colombia comfortable, Uzbekistan likely to sit deep and try to survive.',
    markets: [
      'Back Colombia at any price',
      'Total goals under if Uzbekistan park the bus',
      'Colombia clean sheet',
    ],
  },
  {
    match: 'Match 53',
    acclimatised: 'Mexico',
    visitor: 'Czechia',
    venue: 'Azteca · Mexico City',
    altitude: 2200,
    kickoff: 'June 24 · 19:00 local',
    severity: 'EXTREME',
    edge: 'Mexico',
    summary:
      'Czechia have zero altitude experience — all their domestic football is central European at sea level. Mexico at the Azteca with two weeks of acclimatisation = nightmare draw. European pressing systems collapse fastest in thin air.',
    markets: [
      'Mexico -1 handicap',
      'Czechia second-half goals under',
      'Czechia tired-legs late goal conceded',
    ],
  },
  {
    match: 'Match 79 (R32)',
    acclimatised: 'Mexico (likely)',
    visitor: '3rd-place qualifier',
    venue: 'Azteca · Mexico City',
    altitude: 2200,
    kickoff: 'June 30 · 19:00 local',
    severity: 'EXTREME',
    edge: 'Mexico (if Group A winner)',
    summary:
      'Knockout match at 2,200m. Opponent comes from a 3rd-place finisher who will have spent group stage at US sea-level venues. No time to acclimatise. If Mexico are here (likely), the home altitude advantage is amplified by knockout pressure.',
    markets: [
      'Mexico to advance (if priced at fade)',
      'Total goals under',
      'Late Mexico goal markets',
    ],
  },
  {
    match: 'Match 92 (QF)',
    acclimatised: 'Mexico or Colombia (potentially)',
    visitor: 'Winner of Match 80 (Atlanta)',
    venue: 'Azteca · Mexico City',
    altitude: 2200,
    kickoff: 'July 5 · 18:00 local',
    severity: 'EXTREME',
    edge: 'Acclimatised side (if present)',
    summary:
      'A QUARTER-FINAL at 2,200m. Opponent travels from sea-level Atlanta. Banana-skin spot for any European or Asian side that gets drawn into this bracket — particularly if they have to play extra time. This is the altitude angle the market is least likely to price.',
    markets: [
      'Acclimatised team to advance',
      'Total goals under',
      'ET / pens markets if available (sea-level side will be cooked)',
    ],
  },
  {
    match: 'Match 28',
    acclimatised: 'Mexico',
    visitor: 'South Korea',
    venue: 'Akron · Zapopan',
    altitude: 1566,
    kickoff: 'June 18 · 19:00 local',
    severity: 'CLEAR',
    edge: 'Mexico',
    summary:
      'Mexico still acclimatised, South Korea have no altitude background. Akron is lower than Azteca but still above the 1,500m threshold. Mexico edge is real but smaller than the home crowd / quality factors.',
    markets: ['Mexico match handicap', 'Total goals under', 'Korea second-half fade'],
  },
  {
    match: 'Match 48',
    acclimatised: 'Colombia',
    visitor: 'DR Congo',
    venue: 'Akron · Zapopan',
    altitude: 1566,
    kickoff: 'June 23 · 20:00 local',
    severity: 'CLEAR',
    edge: 'Colombia',
    summary:
      'Colombia fully acclimatised. DR Congo (Kinshasa, sea level) have no meaningful altitude experience. Adds to Colombia advantage on quality alone.',
    markets: ['Colombia handicap value', 'Colombia -1', 'DR Congo unders'],
  },
  {
    match: 'Match 66',
    acclimatised: 'Uruguay (slight)',
    visitor: 'Spain',
    venue: 'Akron · Zapopan',
    altitude: 1566,
    kickoff: 'June 26 · 18:00 local',
    severity: 'MINIMAL',
    edge: 'Uruguay (marginal)',
    summary:
      'Neither team is altitude-acclimatised, but Uruguay play CONMEBOL qualifiers at Quito (2,850m) and La Paz (3,640m) so have more recent exposure than Spain. Marginal factor in a high-stakes match between two strong sides.',
    markets: ['Slight Uruguay edge on AH lines', 'Late goals if tied'],
  },
];

const SEVERITY_TONE: Record<Severity, PillTone> = {
  EXTREME: 'red',
  CLEAR: 'gold',
  MODERATE: 'gold',
  MINIMAL: 'mute',
};

function KeyMatches() {
  return (
    <div>
      <SectionHeader title="Key altitude match-ups" subtitle="Acclimatised vs sea-level matches with a real edge" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 12 }}>
        {KEY_MATCHES.map((m) => <MatchCard key={m.match} m={m} />)}
      </div>
    </div>
  );
}

function MatchCard({ m }: { m: AltMatch }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        padding: 16,
      }}
    >
      <header style={{ marginBottom: 12, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>
          <Flag nation={m.acclimatised.split(' ')[0]} size={20} /> {m.acclimatised}
          <TLabel>vs</TLabel>
          <Flag nation={m.visitor.split(' ')[0]} size={20} /> {m.visitor}
        </div>
        <TPill tone={SEVERITY_TONE[m.severity]} size="sm">{m.severity}</TPill>
      </header>
      <div style={{ marginBottom: 10, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 12px', fontSize: 11, color: 'var(--color-text-3)' }}>
        <TPill tone="outline" size="sm">{m.match}</TPill>
        <span>{m.venue}</span>
        <span style={{ color: 'var(--color-text-4)' }}>·</span>
        <TMono size={11} color="var(--color-gold-2)">{m.altitude.toLocaleString()}m</TMono>
        <span style={{ color: 'var(--color-text-4)' }}>·</span>
        <TMono size={11} color="var(--color-text-2)">{m.kickoff}</TMono>
      </div>
      <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <TLabel>Edge</TLabel>
        <TPill tone="green" size="sm">{m.edge}</TPill>
      </div>
      <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.55, color: 'var(--color-text-2)' }}>{m.summary}</p>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-gold-2)',
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {open ? '× Hide markets' : 'Show market angles ▾'}
      </button>
      {open && (
        <ul
          style={{
            marginTop: 8,
            paddingTop: 8,
            borderTop: '1px solid var(--color-border)',
            listStyle: 'none',
            padding: '8px 0 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {m.markets.map((mk) => (
            <li key={mk} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--color-text-2)' }}>
              <span style={{ color: 'var(--color-gold-3)' }}>·</span>
              <span>{mk}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ============================================================
   WASTED ADVANTAGE
   ============================================================ */

function WastedAdvantage() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid rgba(214,90,108,0.30)',
        borderRadius: 6,
        padding: '14px 18px',
      }}
    >
      <div style={{ marginBottom: 8 }}>
        <TPill tone="red" size="sm">⚠ Wasted advantage</TPill>
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--color-text-2)' }}>
        <strong style={{ color: 'var(--color-text)' }}>Ecuador</strong> are the most altitude-hardened side in the tournament
        (Quito sits at 2,850m — they've built their entire CONMEBOL qualifying around it) but the draw gave them all
        three group games at US sea-level venues:{' '}
        <span style={{ color: 'var(--color-text)' }}>Lincoln Financial (Philadelphia), Arrowhead (Kansas City), MetLife (East Rutherford)</span>.
        Their structural edge is completely neutralised. Don't price Ecuador up assuming an altitude factor — it's
        not in play for any of their group matches.
      </p>
    </div>
  );
}
