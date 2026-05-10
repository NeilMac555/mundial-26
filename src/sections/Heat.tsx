import { useState } from 'react';
import { Markdown } from '../components/Markdown';
import { Flag } from '../components/Flag';
import { TLabel, TMono, TPill, TCaption, TCaptionItem, type PillTone } from '../components/terminal/atoms';
import heatMd from '../content/heat.md?raw';

export function Heat() {
  return (
    <div>
      <TCaption>
        <TCaptionItem label="Window" value="June 2026 — host-month conditions" />
        <TCaptionItem label="El Niño" value="85% emergence (NOAA, summer 2026)" />
        <TCaptionItem label="US drought" value="61% in moderate+ — 45 states" />
        <TCaptionItem label="Hydration breaks" value="22′ + 67′ mandatory" />
      </TCaption>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <HeroStats />
        <MatchAngles />
        <VulnerabilityTiers />
        <AdaptedTiers />
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
              <SourceNote path="src/content/heat.md" />
              <Markdown source={heatMd} />
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
      <span style={{ fontSize: 12, color: 'var(--color-text-3)' }}>· edit the markdown to update the section</span>
    </div>
  );
}

/* ============================================================
   HERO STATS — three big callouts
   ============================================================ */

const HERO_STATS = [
  {
    value: '85%',
    label: 'El Niño emergence',
    sub: 'NOAA Climate Prediction Center, summer 2026 — up from 62% three weeks earlier',
  },
  {
    value: '61%',
    label: 'US in moderate+ drought',
    sub: '45 states affected. Dry soil radiates, amplifying heat at inland venues',
  },
  {
    value: '15–20%',
    label: 'Heat-edge attenuation',
    sub: 'From mandatory 22′ + 67′ hydration breaks — softens but does not eliminate',
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
   MATCH ANGLES — five cards
   ============================================================ */

type Severity = 'CLEANEST' | 'REAL' | 'VARIABLE' | 'DILUTED' | 'MARGINAL';

interface MatchAngle {
  rank: number;
  teamA: string;
  teamB: string;
  venue: string;
  kickoff: string;
  severity: Severity;
  summary: string;
  markets: string[];
}

const MATCH_ANGLES: MatchAngle[] = [
  {
    rank: 1,
    teamA: 'Germany',
    teamB: 'Curaçao',
    venue: 'NRG Stadium · Houston',
    kickoff: 'June 14 · 12:00 local',
    severity: 'CLEANEST',
    summary:
      "Houston mid-June 33–34°C, peak sun, open air, El Niño signal. Nagelsmann's pressing system is the most heat-exposed in UEFA — this mutes Germany's defensive identity.",
    markets: [
      'Under 2.5 goals at attractive prices',
      'Germany -1.5 / -2 handicap as a fade rather than a back',
      'Second-half goals under',
    ],
  },
  {
    rank: 2,
    teamA: 'Netherlands',
    teamB: 'Sweden',
    venue: 'NRG Stadium · Houston',
    kickoff: 'June 20 · 12:00 local',
    severity: 'DILUTED',
    summary:
      "Same noon Houston cauldron — but the original Netherlands-fade angle weakens because Sweden are equally cool-climate (Potter's side, Scandinavian). Heat doesn't differentiate, so the angle shifts from \"fade Netherlands\" to \"both struggle\" — totals over the result.",
    markets: [
      'Total goals under — both XIs heat-suppressed',
      'First-half / full-time double — early intensity capped',
      'Under on shots/corners markets if available',
    ],
  },
  {
    rank: 3,
    teamA: 'Scotland',
    teamB: 'Brazil',
    venue: 'Hard Rock Stadium · Miami',
    kickoff: 'June 24 · 18:00 local',
    severity: 'REAL',
    summary:
      "Miami humidity is the highest physiological challenge of any venue. 31–32°C with 75%+ humidity at 6pm. Scotland's Atlanta/Philly acclimatisation doesn't transfer to Miami air.",
    markets: ['Brazil +AH on the line they would price without heat', 'Scotland team-totals under', 'First-half draw at price'],
  },
  {
    rank: 4,
    teamA: 'Tunisia',
    teamB: 'Netherlands',
    venue: 'Arrowhead · Kansas City',
    kickoff: 'June 25 · 18:00 local',
    severity: 'VARIABLE',
    summary:
      "Netherlands' third hot venue in three games. Tunisia heat-adapted from years of North African football. If Koeman rotates after qualification, real upset spot.",
    markets: ['Tunisia draw-no-bet at Netherlands-favoured prices', 'Total goals under', 'Netherlands starting XI prop markets'],
  },
  {
    rank: 5,
    teamA: 'Austria',
    teamB: 'Algeria',
    venue: 'Arrowhead · Kansas City',
    kickoff: 'June 27 · 21:00 local',
    severity: 'MARGINAL',
    summary:
      "9pm kickoff softens the heat factor materially (KC at 9pm typically 26–28°C). Rangnick's high-press still vulnerable but the hydration breaks weaken this angle most.",
    markets: ['Algeria +AH at attractive prices', 'Total goals under (smaller stake)'],
  },
];

const SEVERITY_TONE: Record<Severity, PillTone> = {
  CLEANEST: 'red',
  REAL: 'red',
  VARIABLE: 'gold',
  DILUTED: 'mute',
  MARGINAL: 'outline',
};

function MatchAngles() {
  return (
    <div>
      <SectionHeader title="Five ranked match angles" subtitle="In pricing-edge order" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 12 }}>
        {MATCH_ANGLES.map((m) => <MatchCard key={m.rank} m={m} />)}
      </div>
    </div>
  );
}

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

function MatchCard({ m }: { m: MatchAngle }) {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              flexShrink: 0,
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1px solid rgba(232,185,74,0.40)',
              background: 'rgba(232,185,74,0.10)',
              color: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {m.rank}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>
            <Flag nation={m.teamA} size={20} /> {m.teamA}
            <TLabel>vs</TLabel>
            <Flag nation={m.teamB} size={20} /> {m.teamB}
          </div>
        </div>
        <TPill tone={SEVERITY_TONE[m.severity]} size="sm">{m.severity}</TPill>
      </header>
      <div style={{ marginBottom: 10, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 12px', fontSize: 11, color: 'var(--color-text-3)' }}>
        <span>{m.venue}</span>
        <span style={{ color: 'var(--color-text-4)' }}>·</span>
        <TMono size={11} color="var(--color-gold-2)">{m.kickoff}</TMono>
      </div>
      <p style={{ marginBottom: 12, fontSize: 13, lineHeight: 1.55, color: 'var(--color-text-2)', margin: '0 0 12px' }}>{m.summary}</p>
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
        <ul style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--color-border)', listStyle: 'none', padding: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
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
   VULNERABILITY TIERS — three columns
   ============================================================ */

interface TierTeam { nation: string; note: string }
interface VulnTier { tier: 1 | 2 | 3; label: string; tone: PillTone; teams: TierTeam[] }

const VULN_TIERS: VulnTier[] = [
  {
    tier: 1,
    label: 'High vulnerability',
    tone: 'red',
    teams: [
      { nation: 'Norway', note: 'Scandinavian winter qualifying. Haaland/Ødegaard load-bearing.' },
      { nation: 'Scotland', note: "Clarke's pragmatic 4-2-3-1 depends on second-half intensity." },
    ],
  },
  {
    tier: 2,
    label: 'Moderate vulnerability',
    tone: 'gold',
    teams: [
      { nation: 'Netherlands', note: 'Two of three group games at hot open-air venues.' },
      { nation: 'Germany', note: 'High-press, high-line — most heat-exposed tactical setup in UEFA.' },
      { nation: 'England', note: 'Squad depth + Spain prep camps. Toronto/Atlanta(roof)/MetLife — lighter.' },
      { nation: 'Belgium', note: 'Garcia setup unknown. Atlanta enclosed + Inglewood semi-enclosed.' },
      { nation: 'Austria', note: 'Rangnick pressing same vulnerability as Germany. KC evening exposure.' },
      { nation: 'Switzerland', note: 'SoFi semi-enclosed + BC Place enclosed — best-protected European.' },
      { nation: 'Croatia', note: 'AT&T enclosed + MetLife evening + Philly evening. Mild exposure.' },
    ],
  },
  {
    tier: 3,
    label: 'Worth monitoring',
    tone: 'mute',
    teams: [
      { nation: 'New Zealand', note: 'Biggest temperature shock. But two matches at BC Place enclosed.' },
      { nation: 'Canada', note: 'Vancouver + Toronto for two of three. LA mild. Minimal exposure.' },
    ],
  },
];

function VulnerabilityTiers() {
  return (
    <div>
      <SectionHeader title="Vulnerability tiers" subtitle="Cold-climate teams ranked by exposure" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
        {VULN_TIERS.map((t) => <TierCard key={t.tier} t={t} />)}
      </div>
    </div>
  );
}

/* ============================================================
   HEAT-ADAPTED TEAMS
   ============================================================ */

interface AdaptedTier { label: string; sub: string; tone: PillTone; teams: TierTeam[] }

const ADAPTED_TIERS: AdaptedTier[] = [
  {
    label: 'Built for it',
    sub: 'Year-round heat training + a vulnerable cool-climate opponent in the group',
    tone: 'green',
    teams: [
      { nation: 'Curaçao', note: 'Caribbean origin vs Germany at Houston noon — biggest single heat edge in the tournament.' },
      { nation: 'Tunisia', note: 'North African heat regulars. Faces a rotated Netherlands in Kansas City evening (June 25).' },
      { nation: 'Algeria', note: 'North African. Faces Rangnick-press Austria in Kansas City evening (June 27) — angle softened by 21:00 KO.' },
      { nation: 'Brazil', note: 'Tropical training. Faces Scotland in Miami humidity (June 24, 18:00) — Brazil thrive here.' },
      { nation: 'Senegal', note: 'West African heat-adapted. Faces Norway at MetLife evening (June 22) — Norway most cold-climate side in tournament.' },
    ],
  },
  {
    label: 'Heat-comfortable',
    sub: 'Warm-climate football culture — heat is a non-issue across their group games',
    tone: 'green',
    teams: [
      { nation: 'Saudi Arabia', note: 'Gulf summers regularly hit 45°C+. Heat is home turf.' },
      { nation: 'Iran', note: 'Persian Gulf summer matches in domestic football. No heat concern.' },
      { nation: 'Egypt', note: 'Cairo summer football conditions identical to US southern venues.' },
      { nation: 'Morocco', note: 'Year-round warmth. 2022 SF run partly built on conditioning.' },
      { nation: 'Argentina', note: 'CONMEBOL matches across all climates. No heat exposure to worry about.' },
      { nation: 'Colombia', note: 'Tropical and altitude football culture. Comfortable everywhere.' },
      { nation: 'Ecuador', note: 'Coastal training in Guayaquil heat. No vulnerability.' },
      { nation: 'Uruguay', note: 'Summer football tradition. Facing Spain in Zapopan but heat unlikely a factor.' },
      { nation: 'Mexico', note: 'Host. Two of three group games at Azteca (cool altitude); Akron mild.' },
      { nation: 'Haiti', note: 'Caribbean heat regular. Group C with Brazil/Morocco — all heat-comfortable.' },
      { nation: 'Iraq', note: 'Baghdad summer football. Faces Norway in Group I — heat edge if KO is afternoon.' },
      { nation: 'Jordan', note: 'Amman summer training. No heat concern.' },
      { nation: 'Cabo Verde', note: 'Tropical island training. Group H with Spain/Uruguay/SA — all heat-fine.' },
      { nation: "Côte d'Ivoire", note: 'Tropical West African. Group E with Ecuador/Curaçao/Germany.' },
      { nation: 'Ghana', note: 'Tropical West African. Group L with England/Croatia/Panama — heat varies.' },
    ],
  },
];

function AdaptedTiers() {
  return (
    <div>
      <SectionHeader title="Heat-adapted teams" subtitle="Where heat is an edge, not a problem" color="var(--color-green)" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 12 }}>
        {ADAPTED_TIERS.map((t) => <AdaptedCard key={t.label} t={t} />)}
      </div>
    </div>
  );
}

function AdaptedCard({ t }: { t: AdaptedTier }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        padding: 18,
      }}
    >
      <header style={{ marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <TPill tone={t.tone} size="sm">{t.label}</TPill>
        </div>
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
  );
}

function TierCard({ t }: { t: VulnTier }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        padding: 18,
      }}
    >
      <header style={{ marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <TLabel color="var(--color-text-2)">Tier {t.tier}</TLabel>
        <TPill tone={t.tone} size="sm">{t.label}</TPill>
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
  );
}
