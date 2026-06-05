import { useState } from 'react';
import { Flag } from '../components/Flag';
import { TLabel, TMono, TPill, TCaption, TCaptionItem, type PillTone } from '../components/terminal/atoms';
import { AmiupPill } from '../components/AmiupLink';

export function GoldenBoot() {
  return (
    <div>
      <TCaption>
        <TCaptionItem label="Sample" value="11 tournaments · 1982–2022" />
        <TCaptionItem label="Mode goals" value="6" />
        <TCaptionItem label="Range" value="5–8" />
        <TCaptionItem label="Floor" value="QF or further (100%)" />
      </TCaption>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Explainer />
        <HeroStats />
        <HistoricalWinners />
        <KeyPatterns />
        <AnytimePicks />
        <Candidates />
      </div>
    </div>
  );
}

/* ============================================================
   ANYTIME'S PICKS — sourced from his Substack write-up
   ============================================================ */

const ANYTIME_SUBSTACK_URL = 'https://anytimegoalscorers.substack.com/p/mega-post-one-main-bet-five-outsiders';
const ANYTIME_SUBSTACK_HOME = 'https://anytimegoalscorers.substack.com/';

interface AnytimePick {
  player: string;
  nation: string;
  odds: string;
  stake: string;
  role: 'MAIN BET' | 'OUTSIDER';
  rationale: string;
}

const ANYTIME_PICKS: AnytimePick[] = [
  {
    player: 'Kylian Mbappé',
    nation: 'France',
    odds: '6/1 (7.00)',
    stake: '2 units',
    role: 'MAIN BET',
    rationale:
      'Ticks every box: penalty taker, peak age, France in moderate Group I, plays Iraq in Game 2 and could run up the score. 0.86 goals per 90 lifetime at World Cups. He has the same WC goal tally as Pelé — a strong tournament makes him the all-time leader. Boring chalk pick, but the boxes are all ticked.',
  },
  {
    player: 'Raphinha',
    nation: 'Brazil',
    odds: '40/1',
    stake: '1 unit',
    role: 'OUTSIDER',
    rationale:
      'Brazil\'s qualifying mess was the dugout (Tite → 3 caretakers → Ancelotti), not the squad. Penalty taker, top scorer in qualifying, the closest thing Brazil has to a leader since Neymar. Crucially, Brazil play Haiti in Game 2 — no rotation risk. Market still pricing the qualifying chaos.',
  },
  {
    player: 'Matheus Cunha',
    nation: 'Brazil',
    odds: '100/1',
    stake: '0.5 units',
    role: 'OUTSIDER',
    rationale:
      'The sprinkle. Likely starting #9 for Brazil, coming off a strong end to the season at Man United. Hasn\'t been prolific for the NT but if the team clicks under Ancelotti, he\'s in the right shirt at the right time at a price that pays.',
  },
  {
    player: 'Cody Gakpo',
    nation: 'Netherlands',
    odds: '50/1',
    stake: '0.5 units',
    role: 'OUTSIDER',
    rationale:
      'Locked-in LW starter while everyone around him rotates (Malen, Brobbey, Weghorst, Depay). 6 goals across the last WC + Euros at 0.51 per 90. Scored 3 pens in qualifying. Netherlands pushed Argentina to the wire in Qatar — go deep again and Gakpo is among the goals.',
  },
  {
    player: 'Patrik Schick',
    nation: 'Czechia',
    odds: '150/1',
    stake: '0.25 units',
    role: 'OUTSIDER',
    rationale:
      'Massive long-shot but the Czechs are a wildcard team. Friendly group (host Mexico, declining South Korea, South Africa). Penalty taker, nailed-on CF, 25 goals in 52 caps — only he and Souček have double-digit NT returns from the prelist. History of upsetting odds (Italia 90, Euro 96, Euro 2004, Euro 2020).',
  },
  {
    player: 'Brahim Díaz',
    nation: 'Morocco',
    odds: '150/1',
    stake: '0.25 units',
    role: 'OUTSIDER',
    rationale:
      '13 goals in 24 NT appearances and on pens. Morocco have a sacrificial lamb in Haiti and can hold their own against Brazil + Scotland. Squad value €450m — higher than Japan, Croatia, Colombia, Switzerland, Uruguay, USA. They ground to the semis in 2022; this squad is arguably better.',
  },
];

const ANYTIME_FADED: { player: string; reason: string }[] = [
  { player: 'Harry Kane (7/1)', reason: 'Age 32 + grueling season + group lacks a whipping boy.' },
  { player: 'Lionel Messi (14/1)', reason: 'Penalty share with Lautaro/Álvarez + Jordan game is Argentina\'s last (rotation risk).' },
  { player: 'Erling Haaland (14/1)', reason: 'Norway\'s ceiling = R32/R16. Heat disadvantage vs South Americans + Africans.' },
  { player: 'Lamine Yamal (16/1)', reason: 'Injury rush risk + not on pens + low xG ceiling.' },
  { player: 'Oyarzabal (16/1)', reason: 'Will share minutes with Ferran Torres. Wants 40/1+ to be interested.' },
  { player: 'Cristiano Ronaldo (25/1)', reason: '7 goals below xG for Portugal. Zero at the Euros, one (pen) at Qatar 22.' },
  { player: 'Dembélé (33/1)', reason: 'Can\'t back him in a side with Mbappé. 7 goals in 58 caps. Never scored at a WC or Euros.' },
  { player: 'Vinícius Jr (33/1)', reason: '8 goals in 47 NT caps — criminal for a player of his level. Never delivered on the international stage.' },
  { player: 'Lukaku (33/1)', reason: 'Out of shape, Napoli letting him go, 80 mins of club football this season.' },
];

function AnytimePicks() {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(232,185,74,0.04), rgba(232,185,74,0.10))',
        border: '1px solid rgba(232,185,74,0.40)',
        borderRadius: 8,
        padding: '20px 22px',
      }}
    >
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 6,
        }}
      >
        <div>
          <div style={{ marginBottom: 4 }}>
            <TLabel color="var(--color-gold)">Editor's picks · Anytime Goalscorers</TLabel>
          </div>
          <h3
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 500,
              color: 'var(--color-text)',
              letterSpacing: '-0.012em',
            }}
          >
            One main bet · five outsiders
          </h3>
        </div>
        <a
          href={ANYTIME_SUBSTACK_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: '8px 16px',
            background: 'var(--color-gold)',
            color: 'var(--color-bg)',
            border: 'none',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Read full write-up on Substack ↗
        </a>
      </header>

      <p
        style={{
          margin: '8px 0 16px',
          fontSize: 13,
          color: 'var(--color-text-3)',
          lineHeight: 1.55,
        }}
      >
        Six backed picks from{' '}
        <a href={ANYTIME_SUBSTACK_HOME} target="_blank" rel="noreferrer" style={{ color: 'var(--color-gold)' }}>
          Anytime's Substack
        </a>
        . Stakes shown are author-stated. Prices are best-of-market at publish; verify before betting.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
        {ANYTIME_PICKS.map((p) => <AnytimePickCard key={p.player} pick={p} />)}
      </div>

      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: '1px solid rgba(232,185,74,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: 12, color: 'var(--color-text-3)', lineHeight: 1.5 }}>
          Backing any of these? Log them so you can see the result without doing the spreadsheet bit.
        </span>
        <AmiupPill source="goldenboot-anytime" label="Track these picks" />
      </div>

      <details style={{ marginTop: 16 }}>
        <summary
          style={{
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-2)',
            fontFamily: 'var(--font-mono)',
            padding: '4px 0',
          }}
        >
          Faded — names he considered but passed on ({ANYTIME_FADED.length})
        </summary>
        <ul
          style={{
            marginTop: 10,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {ANYTIME_FADED.map((f) => (
            <li
              key={f.player}
              style={{
                fontSize: 12,
                color: 'var(--color-text-2)',
                lineHeight: 1.5,
                paddingLeft: 14,
                position: 'relative',
              }}
            >
              <span style={{ position: 'absolute', left: 0, color: 'var(--color-red)' }}>−</span>
              <strong style={{ color: 'var(--color-text)' }}>{f.player}</strong>{' '}
              <span style={{ color: 'var(--color-text-3)' }}>· {f.reason}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function AnytimePickCard({ pick }: { pick: AnytimePick }) {
  const isMain = pick.role === 'MAIN BET';
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: isMain
          ? '1px solid rgba(232,185,74,0.55)'
          : '1px solid var(--color-border)',
        borderRadius: 6,
        padding: 14,
        boxShadow: isMain ? '0 0 12px rgba(232,185,74,0.10)' : undefined,
      }}
    >
      <header style={{ marginBottom: 8, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Flag nation={pick.nation} size={20} />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{pick.player}</span>
          </div>
          <div style={{ marginTop: 3 }}>
            <TMono size={11} color="var(--color-text-3)">{pick.nation.toUpperCase()}</TMono>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
          <TPill tone={isMain ? 'gold' : 'mute'} size="sm">{pick.role}</TPill>
          <TMono size={13} color="var(--color-text)" weight={600}>{pick.odds}</TMono>
          <TMono size={10} color="var(--color-gold-2)">{pick.stake}</TMono>
        </div>
      </header>
      <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--color-text-2)' }}>{pick.rationale}</p>
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
        The Golden Boot pattern (1982–2022)
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-2)', margin: '0 0 12px' }}>
        The Golden Boot is one of the highest-volume player markets at every World Cup, and the history is unusually
        readable. <strong style={{ color: 'var(--color-gold)' }}>Since 1982, every winner has come from a team that reached at
        least the quarter-final.</strong> Six goals is the most common winning tally, and you need ~5+ matches to
        get there. Teams eliminated in the group stage play 3; round of 32 gives you 4. The QF is the floor — full
        stop.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-text-2)', margin: 0 }}>
        Working backwards: bet players whose teams have a credible path to at least the QF, with a clear set-piece /
        penalty role and a track record of high shot volume. Salenko 1994 is the only stat-line that breaks the rule
        (5 goals in a single match vs Cameroon — a farce, dismissed from this analysis).
      </p>
    </div>
  );
}

/* ============================================================
   HERO STATS
   ============================================================ */

const HERO_STATS = [
  {
    value: '6',
    label: 'Most common winning tally',
    sub: '7 of 11 Golden Boot winners since 1982 scored exactly 6 goals. The range is 5–8.',
  },
  {
    value: '100%',
    label: 'Reach the QF or further',
    sub: 'Every winner since 1982 advanced to at least the quarter-final. The QF is the absolute floor.',
  },
  {
    value: '64%',
    label: 'Reach the semi-final',
    sub: '7 of 11 went to the last 4. SF qualification is the strongest single predictor.',
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
   HISTORICAL WINNERS
   ============================================================ */

interface Winner {
  year: number;
  player: string;
  nation: string;
  goals: number;
  pens: number;
  stage: 'Won' | 'Final' | 'SF' | 'QF' | 'R16' | 'Group';
  finish: string;
  pos: string;
  note?: string;
}

const WINNERS: Winner[] = [
  { year: 2022, player: 'Kylian Mbappé',       nation: 'France',   goals: 8, pens: 2, stage: 'Final', finish: 'Final (RU)', pos: 'FW',    note: 'Hat-trick in the final (2 pens + 1 open play in ET).' },
  { year: 2018, player: 'Harry Kane',          nation: 'England',  goals: 6, pens: 3, stage: 'SF',    finish: '4th',         pos: 'FW',    note: '3 of 6 from pens (Tunisia, Panama, Colombia). Only 1 open-play goal from open-play moves.' },
  { year: 2014, player: 'James Rodríguez',     nation: 'Colombia', goals: 6, pens: 1, stage: 'QF',    finish: 'QF',          pos: 'MF',    note: '5 from open play incl. Puskás-winning volley vs Uruguay; 1 pen vs Brazil in QF loss.' },
  { year: 2010, player: 'Thomas Müller',       nation: 'Germany',  goals: 5, pens: 0, stage: 'SF',    finish: '3rd',         pos: 'MF/FW', note: 'All open play. Won boot on assists tiebreak (5 G + 3 A).' },
  { year: 2006, player: 'Miroslav Klose',      nation: 'Germany',  goals: 5, pens: 0, stage: 'SF',    finish: '3rd',         pos: 'FW',    note: 'All open play. Pure striker — Ballack / Lahm took Germany pens.' },
  { year: 2002, player: 'Ronaldo',             nation: 'Brazil',   goals: 8, pens: 0, stage: 'Won',   finish: 'Won',         pos: 'FW',    note: 'All 8 from open play. Brace in the final.' },
  { year: 1998, player: 'Davor Šuker',         nation: 'Croatia',  goals: 6, pens: 1, stage: 'SF',    finish: '3rd',         pos: 'FW',    note: '5 open play (incl. winners vs Germany QF, France SF, Netherlands 3rd) + 1 pen vs Romania R16.' },
  { year: 1994, player: 'Hristo Stoichkov',    nation: 'Bulgaria', goals: 6, pens: 3, stage: 'SF',    finish: '4th',         pos: 'FW/MF', note: '2 pens vs Greece + 1 pen vs Italy. Bulgaria\'s shock SF run. (Joint with Salenko — dismissed.)' },
  { year: 1990, player: 'Salvatore Schillaci', nation: 'Italy',    goals: 6, pens: 1, stage: 'SF',    finish: '3rd',         pos: 'FW',    note: '5 open play + 1 pen (winner vs England in 3rd place). Came off the bench early.' },
  { year: 1986, player: 'Gary Lineker',        nation: 'England',  goals: 6, pens: 0, stage: 'QF',    finish: 'QF',          pos: 'FW',    note: 'All 6 from open play. Hat-trick vs Poland, brace vs Paraguay, header vs Argentina.' },
  { year: 1982, player: 'Paolo Rossi',         nation: 'Italy',    goals: 6, pens: 0, stage: 'Won',   finish: 'Won',         pos: 'FW',    note: 'All 6 from open play. Hat-trick vs Brazil, brace vs Poland in SF.' },
];

const STAGE_TONE: Record<Winner['stage'], PillTone> = {
  Won: 'gold',
  Final: 'gold',
  SF: 'gold',
  QF: 'mute',
  R16: 'outline',
  Group: 'red',
};

function HistoricalWinners() {
  return (
    <div>
      <SectionHeader title="Golden Boot winners since 1982" subtitle="11 tournaments · Salenko 1994 dismissed (farce)" />
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
              <ThHead label="Year" align="left" />
              <ThHead label="Player" align="left" />
              <ThHead label="Nation" align="left" />
              <ThHead label="Goals" align="right" />
              <ThHead label="Pens" align="right" />
              <ThHead label="Team finish" align="left" />
              <ThHead label="Notes" align="left" />
            </tr>
          </thead>
          <tbody>
            {WINNERS.map((w, i) => {
              const penColor = w.pens === 0 ? 'var(--color-text-4)' : w.pens >= 3 ? 'var(--color-gold)' : 'var(--color-gold-2)';
              return (
                <tr
                  key={`${w.year}-${w.player}`}
                  style={{
                    borderBottom: i === WINNERS.length - 1 ? 'none' : '1px solid var(--color-border)',
                    background: i % 2 ? 'var(--color-bg-2)' : 'transparent',
                  }}
                >
                  <td style={{ padding: '11px 14px' }}>
                    <TMono size={12} color="var(--color-text-3)">{w.year}</TMono>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{ fontSize: 13, color: 'var(--color-text)', fontWeight: 500 }}>{w.player}</span>
                    <span style={{ marginLeft: 8 }}>
                      <TLabel>{w.pos}</TLabel>
                    </span>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                      <Flag nation={w.nation} size={20} />
                      <span style={{ fontSize: 13, color: 'var(--color-text-2)' }}>{w.nation}</span>
                    </span>
                  </td>
                  <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                    <TMono size={13} color="var(--color-text)" weight={600}>{w.goals}</TMono>
                  </td>
                  <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                    <TMono size={12} color={penColor} weight={w.pens >= 3 ? 600 : 500}>{w.pens}</TMono>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <TPill tone={STAGE_TONE[w.stage]} size="sm">{w.finish}</TPill>
                  </td>
                  <td style={{ padding: '11px 14px', fontSize: 12, fontStyle: 'italic', color: 'var(--color-text-3)' }}>{w.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: 'var(--color-text-3)' }}>
        Aggregate: 11 of 68 winning goals (~16%) came from the penalty spot. <strong style={{ color: 'var(--color-text-2)' }}>5 of 11 winners scored zero pens</strong> — but the
        modern era (Kane 2018, Mbappé 2022) is much more pen-reliant than the 80s/90s generation.
      </div>
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
   KEY PATTERNS
   ============================================================ */

const PATTERNS = [
  {
    title: 'The QF Floor',
    body: 'Every Golden Boot winner since 1982 reached at least the QF. Don\'t bet a player whose team\'s expected best finish is R16 or earlier — they simply won\'t play enough matches to score 6+ goals. There are no exceptions in the modern dataset.',
  },
  {
    title: 'Six is the Magic Number',
    body: '7 of 11 winners scored exactly 6 goals. The full range is 5–8. A player who hits 4 in the group stage is already two-thirds of the way to the most likely winning total — a ferocious group-stage start is the strongest in-tournament signal.',
  },
  {
    title: 'Penalty Takers — Helpful, Not Required',
    body: 'The data is bimodal. Kane (3 of 6, 2018), Stoichkov (3 of 6, 1994) and Mbappé (2 of 8, 2022) leaned hard on the spot. But Rossi, Lineker, Ronaldo, Klose and Müller all won with zero pens. The trend is increasingly pen-friendly (last 3 winners all had pens), but a player who isn\'t the designated taker can still win — they just need higher open-play volume.',
  },
  {
    title: 'Hot-Tournament Outliers',
    body: 'Schillaci 1990 (Italy 3rd), Stoichkov 1994 (Bulgaria SF), Šuker 1998 (Croatia 3rd) — none were pre-tournament favourites. Their teams overperformed and they happened to be the focal point. Watch for a "dark-horse SF run" candidate at long odds.',
  },
  {
    title: 'The Age Cap (Under 30)',
    body: 'Every Golden Boot winner since 1982 was 30 or younger. Šuker 1998 was the oldest at 30 years 5 months. Most winners were 22–28. The pattern reflects elite finishing rate + acceleration capacity over a 5–7 match tournament — players over 30 rarely sustain the volume. This is a real flag against Kane (32) and Messi (38) in 2026.',
  },
  {
    title: 'Game 1–2 Feast Window',
    body: 'Strong teams that secure qualification early rotate their Game 3 starting XI. Top scorers need to feast in Games 1 and 2 vs the group\'s weakest opponents. Mbappé scored 5 of his 8 in Games 1–3 (incl. R16) before Argentina shut him down in QF/SF. Kane scored 5 of his 6 across his first 2 group games (Tunisia + Panama). Plan candidates around the early rotation matches.',
  },
];

function KeyPatterns() {
  return (
    <div>
      <SectionHeader title="Patterns that hold" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 12 }}>
        {PATTERNS.map((p) => (
          <div
            key={p.title}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              padding: 18,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-gold)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              {p.title}
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'var(--color-text-2)' }}>{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   2026 CANDIDATES
   ============================================================ */

type Tier = 'PRIME' | 'SOLID' | 'WILDCARD';

interface Candidate {
  player: string;
  nation: string;
  group: string;
  age: number;
  odds: number;
  tier: Tier;
  pathScore: string;
  penaltyTaker?: boolean;
  fitsPattern: string[];
  redFlags: string[];
  summary: string;
}

const CANDIDATES: Candidate[] = [
  { player: 'Kylian Mbappé', nation: 'France', group: 'I', age: 27, odds: 7.00, tier: 'PRIME', penaltyTaker: true, pathScore: 'Likely QF / SF', fitsPattern: ['Defending Golden Boot winner (2022, 8 goals)', 'Penalty taker', 'France in moderate Group I (Senegal, Norway, Iraq)', 'Real Madrid form — peak career years'], redFlags: ['Shortest price in the market — limited value', 'Haaland in same group could split goals at the top', 'Deschamps may rotate in dead rubbers'], summary: 'Textbook pattern fit + role + path. The chalk pick — hard to argue against, but priced like everyone agrees.' },
  { player: 'Harry Kane', nation: 'England', group: 'C', age: 32, odds: 8.00, tier: 'SOLID', penaltyTaker: true, pathScore: 'Likely QF / SF', fitsPattern: ['2018 Golden Boot winner (6 goals, 3 from pens)', 'Designated penalty taker', 'Bayern goalscoring rate elite', 'England never concede in qualifying (Tuchel era 8/8 CS)'], redFlags: ['⚠ Age 32 — outside the historical winner pattern (Šuker 30 is the cap)', 'Group C with Brazil + Scotland likely means tough R16 / QF draw', 'Tuchel\'s defensive setup may suppress Kane\'s goal share', 'Chalk price — needs to outscore Mbappé/Messi/Yamal to win'], summary: 'Already done it but age is the new flag. Penalty role + scoring profile keep him in the conversation, but no winner has been older than 30 since 1982. Demoted from PRIME on the age data.' },
  { player: 'Lionel Messi', nation: 'Argentina', group: 'J', age: 38, odds: 13.00, tier: 'WILDCARD', penaltyTaker: true, pathScore: 'Likely SF / Final', fitsPattern: ['Defending champions, deepest tournament path', 'Direct free-kick + penalty taker', 'Won Golden Ball in 2022 (7 goals)', 'Scaloni 8 years tenure, settled side'], redFlags: ['⚠ Age 38 — far outside the historical pattern. No winner has been older than 30 since 1982', 'Lautaro takes the central FW scoring role', 'Minute management likely — won\'t play 7 full matches', 'Final WC emotional weight, but body limits the volume'], summary: 'The price (13.00) reflects the legend more than the data. Age 38 + role-share with Lautaro = pattern-breaker. Bet only if you\'re paying for the narrative, not the numbers.' },
  { player: 'Lamine Yamal', nation: 'Spain', group: 'H', age: 18, odds: 15.00, tier: 'SOLID', pathScore: 'Likely SF', fitsPattern: ['Spain Δ Finishing CLINICAL +1.52, 3.5 goals/m in qualifying', 'Reigning Euro champions, settled XI', 'Wide / inside-forward (Müller / Mbappé profile)'], redFlags: ['Spain spreads goals (Oyarzabal, Olmo, Ferran Torres all in same market 17–51)', 'At 18, never been a tournament focal point at WC level', 'De la Fuente rotates wide forwards'], summary: 'Breakout talent on an elite path. The cap is dilution — Spain shares scoring across the front line.' },
  { player: 'Erling Haaland', nation: 'Norway', group: 'I', age: 26, odds: 15.00, tier: 'WILDCARD', penaltyTaker: true, pathScore: 'R16 / QF if upsets', fitsPattern: ['Best pure goalscorer of his generation', 'Norway over-performed both ends in qualifying (Δ Finishing +11.71)', 'Penalty taker, set-piece role', 'Hot vs anyone — see Manchester City output'], redFlags: ['Norway in Group I with France — likely 2nd at best', 'Heat-vulnerable side (Tier 1) — could fade in hot venues', 'Norway never won a knockout WC match in history', 'If Norway exit R16, the bet is dead'], summary: 'Pure-volume play. If Norway upset and reach SF, the field doesn\'t catch him. Team-progression risk is the betting cap — this is the trade-off at 15.00.' },
  { player: 'Mikel Oyarzabal', nation: 'Spain', group: 'H', age: 28, odds: 17.00, tier: 'SOLID', penaltyTaker: true, pathScore: 'Likely SF', fitsPattern: ['Euro 2024 final winner — knockout big-game pedigree', 'Spain Δ Finishing CLINICAL +1.52 in qualifying', 'Real Sociedad central striker — age 28, squarely in winner band', 'Plays the central #9 role Yamal feeds'], redFlags: ['Spain spreads goals — Yamal, Olmo, Ferran all in the same scoring market', 'Wide / inverted-CF role rotates with Joselu / Ferran', 'Not Spain\'s primary set-piece taker'], summary: 'Best Spain candidate by tournament pedigree — won the Euro for them in \'24 from this exact role. Cap is the same as every Spain bet: they win as a system, not through one striker.' },
  { player: 'Cristiano Ronaldo', nation: 'Portugal', group: 'K', age: 41, odds: 21.00, tier: 'WILDCARD', penaltyTaker: true, pathScore: 'Likely QF / SF', fitsPattern: ['Designated penalty taker + free-kick option', 'Portugal in Group K (DR Congo, Uzbekistan, Colombia) — winnable', 'All-time leading international goalscorer — volume pedigree unmatched'], redFlags: ['⚠ Age 41 — unprecedented. No winner has been older than 30 since 1982', 'Reduced minutes vs prime — Martínez may rotate vs lesser opponents', 'Bruno Fernandes / Bernardo / João Félix / Leão all in same scoring market', 'Al-Nassr club intensity ≠ tournament intensity'], summary: 'Pure narrative bet at 21.00. Age + reduced role + share-of-shots all argue against the data. Bet only for the legacy moment.' },
  { player: 'Ousmane Dembélé', nation: 'France', group: 'I', age: 28, odds: 21.00, tier: 'SOLID', pathScore: 'Likely QF / SF', fitsPattern: ['Ballon d\'Or 2025 — peak career form', 'PSG attacker scoring at career-high rate', 'France in moderate Group I (Senegal, Norway, Iraq)', 'Age 28 — squarely in the historical winner band'], redFlags: ['Mbappé takes France pens — hard to displace', 'Same team as Mbappé means goal share split with the chalk pick', 'Wide forward — historically lower box presence than central FW winners'], summary: 'Best price in the market on a Ballon d\'Or-form attacker. The cap is shared scoring with Mbappé — bet if you think Dembélé out-scores the chalk.' },
  { player: 'Lautaro Martínez', nation: 'Argentina', group: 'J', age: 28, odds: 26.00, tier: 'PRIME', pathScore: 'Likely SF / Final', fitsPattern: ['Defending champions, deepest tournament path', 'Topped Copa América 2024 scoring (5 in 6)', 'Argentina\'s central penalty-box presence', 'Inter Milan finishing rate elite'], redFlags: ['Messi steals direct free-kicks + pens', 'Argentina averaged ~1.7 goals/m in qualifying — moderate volume'], summary: 'Cleanest pattern fit at a value price. PRIME tier candidate at 26.00 — Argentina\'s likely deep run + Lautaro\'s central role makes this a textbook overlay.' },
  { player: 'Vinícius Jr', nation: 'Brazil', group: 'C', age: 25, odds: 26.00, tier: 'SOLID', pathScore: 'Likely QF / SF', fitsPattern: ['Real Madrid star, peak years', 'Brazil expected to advance deep', 'Wide forward profile (Mbappé / Müller pattern)'], redFlags: ['Brazil shares minutes — Raphinha, Rodrygo, Joao Pedro, Igor Thiago all in same market', 'Δ Finishing -0.89 in qualifying (MET only) — not the clinical option', 'Ancelotti rotation patterns unknown over a 7-match span'], summary: 'High talent, but Brazil\'s attacking depth dilutes any single player\'s share. Goals will spread — bet only at strong price.' },
  { player: 'Bukayo Saka', nation: 'England', group: 'C', age: 24, odds: 34.00, tier: 'SOLID', pathScore: 'Likely QF / SF', fitsPattern: ['Arsenal RW, elite goal+assist contribution', 'England likely deep run (Tuchel side)', 'Age 24 — peak band for Golden Boot winner'], redFlags: ['Kane takes England pens', 'Wide forward — competes with Foden, Bellingham, Bowen for goal share', 'Group C draw vs Brazil makes early KO opponents harder'], summary: 'Right age + path, but England spreads goals across a deep front line. Needs Kane to come off injured or rested for the share to spike.' },
  { player: 'Raphinha', nation: 'Brazil', group: 'C', age: 29, odds: 34.00, tier: 'SOLID', penaltyTaker: true, pathScore: 'Likely QF / SF', fitsPattern: ['Barcelona LW — top-5 Ballon d\'Or contender 2025', 'Brazil\'s creative + goal hub, captain candidate', 'Brazil deep run likely', 'Age 29 — fits the historical winner band'], redFlags: ['Brazil shares minutes — Vinícius, Rodrygo, Joao Pedro all in same market', 'Wide LW — needs central penetration to top open-play volume', 'Brazil only MET xG in qualifying — not running hot'], summary: 'Brazil\'s most reliable goal threat. Trade-off is the deepest squad in the field — every starter has 5-game volume risk.' },
  { player: 'Luis Suárez', nation: 'Colombia', group: 'K', age: 29, odds: 34.00, tier: 'WILDCARD', pathScore: 'R16 / QF', fitsPattern: ['Age 29 — squarely inside the historical winner pattern', 'Sporting CP central striker on hot form', 'Colombia\'s primary penalty-box FW (separate to James Rodríguez creative role)'], redFlags: ['Colombia drawn into Group K with Portugal — path likely caps at QF', 'Colombia Δ Finishing -1.62 (MET only) — team isn\'t flying offensively', 'Shares attacking minutes with James Rodríguez and Luis Díaz', 'No prior major-tournament Golden-Boot pedigree'], summary: 'Long-shot value at 34.00. Age fits, role fits, team progression is the cap — Colombia winning Group K + R16 unlocks the price. Bet only if you back Colombia\'s deeper run.' },
  { player: 'Romelu Lukaku', nation: 'Belgium', group: 'G', age: 32, odds: 34.00, tier: 'WILDCARD', pathScore: 'R16 / QF', fitsPattern: ['Belgium\'s clear central #9 — no role competition', 'Top scorer in Belgium qualifying', 'Group G with Egypt, Iran, NZ — soft early matches'], redFlags: ['⚠ Age 32 — outside the Šuker 30 cap', 'De Bruyne takes Belgium pens', 'Belgium\'s realistic ceiling is QF — limits volume runway'], summary: 'Soft group + role lock-in is the appeal at 34.00. Cap is age + Belgium\'s probable QF exit. Front-load goals in Games 1–2.' },
  { player: 'Joao Pedro', nation: 'Brazil', group: 'C', age: 24, odds: 34.00, tier: 'WILDCARD', pathScore: 'Likely QF / SF', fitsPattern: ['Chelsea central striker on form', 'Brazil deep run expected', 'Age 24 — fits the winner band'], redFlags: ['Brazil rotates Vinícius, Raphinha, Richarlison, Endrick, Rodrygo at the front line — heavy dilution', 'Not the first-choice ST', 'Δ Finishing -0.89 — Brazil only MET expectation in qualifying'], summary: 'Dark-horse only if Brazil install him as the central 9. Long-shot at 34.00 — bet only with conviction on the depth chart.' },
  { player: 'Richarlison', nation: 'Brazil', group: 'C', age: 28, odds: 34.00, tier: 'WILDCARD', pathScore: 'Likely QF / SF', fitsPattern: ['Tottenham central striker — Brazil\'s natural #9 option', 'Scored 3 in 2022 WC, has tournament pedigree', 'Age 28 — fits winner band'], redFlags: ['Tottenham injuries / form inconsistent', 'Brazil rotates strikers — Endrick / João Pedro compete', 'Wide forwards (Vinícius, Raphinha) carry more set-piece + dead-ball share'], summary: 'Pure depth-chart bet. Has the central role if fit and selected, but Brazil\'s ST competition is brutal.' },
  { player: 'Julián Álvarez', nation: 'Argentina', group: 'J', age: 25, odds: 41.00, tier: 'SOLID', pathScore: 'Likely SF / Final', fitsPattern: ['4 goals in 2022 WC, including SF brace vs Croatia', 'Atlético Madrid central striker — career-high goal rate', 'Age 25 — squarely in the historical winner band', 'Defending champions, deepest tournament path'], redFlags: ['Lautaro is the first-choice central FW — minutes split', 'Messi takes pens + direct free-kicks', 'Often deployed as second striker — suppresses box-volume'], summary: 'Argentina depth-chart play at proper value. 4 goals at 2022 in a similar role proves the volume is real, but Lautaro and Messi take the higher-leverage shots. Bet if you back the squad-rotation thesis.' },
  { player: 'Cody Gakpo', nation: 'Netherlands', group: 'F', age: 26, odds: 41.00, tier: 'WILDCARD', pathScore: 'QF', fitsPattern: ['Liverpool LW + ST hybrid, scoring rate up', 'Netherlands\' first-choice attacker', 'Age 26 — fits band', 'Scored 3 in 2022 WC group stage — proven WC volume'], redFlags: ['Group F (Japan, Sweden, Tunisia) — only one banker', 'Memphis takes Netherlands pens when fit', 'Koeman rotates wide attackers'], summary: 'Proven WC scorer at value price. Cap is the Dutch path — Group F second + likely QF means 5 matches floor only.' },
  { player: 'Bruno Fernandes', nation: 'Portugal', group: 'K', age: 31, odds: 41.00, tier: 'WILDCARD', pathScore: 'Likely QF / SF', fitsPattern: ['Manchester United captain — takes club pens (elite converter)', 'Portugal\'s primary creator — high xA tournament profile', 'Group K (Colombia, DR Congo, Uzbekistan) — winnable'], redFlags: ['⚠ Age 31 — outside the Šuker 30 cap', 'Ronaldo takes Portugal pens — Fernandes is backup at best', 'Midfielder — lower box-presence than wide / central FWs', 'Goal share competes with Ronaldo, Leão, Bernardo, João Félix'], summary: 'Captain-level creator role, but the data flags age + role-share. Long-shot only if Ronaldo is benched or injured.' },
  { player: 'Michael Olise', nation: 'France', group: 'I', age: 24, odds: 41.00, tier: 'WILDCARD', pathScore: 'Likely QF / SF', fitsPattern: ['Bayern Munich RW — career-best Bundesliga season', 'Age 24 — peak winner band', 'France in moderate Group I (Senegal, Norway, Iraq)'], redFlags: ['Mbappé takes France pens', 'Same team as Mbappé + Dembélé — three-way goal share split', 'Wide forward — historically lower box-presence than central FWs', 'No prior major-tournament Golden-Boot pedigree'], summary: 'Long-shot only — France\'s attack is too crowded. Olise needs Mbappé or Dembélé to miss multiple games for the share to spike.' },
  { player: 'Alexander Isak', nation: 'Sweden', group: 'F', age: 26, odds: 51.00, tier: 'WILDCARD', penaltyTaker: true, pathScore: 'R16 / QF if upsets', fitsPattern: ['Newcastle / Liverpool elite striker — Premier League goalscoring track record', 'Sweden\'s clear central #9 — no role competition', 'Pen taker for club, likely first taker for Sweden', 'Age 26 — peak winner band'], redFlags: ['Sweden\'s realistic ceiling is R16 — limits volume runway', 'Group F (Netherlands, Japan, Tunisia) — won\'t top the group', 'Sweden didn\'t qualify in 2022 — no recent WC pedigree', 'No prior major-tournament Golden-Boot pedigree'], summary: 'Pure quality bet on a path that probably ends in R16. Isak has the finishing ability; Sweden need to overachieve massively to give him the matches required.' },
  { player: 'Memphis Depay', nation: 'Netherlands', group: 'F', age: 32, odds: 51.00, tier: 'WILDCARD', penaltyTaker: true, pathScore: 'QF', fitsPattern: ['Netherlands captain — designated penalty taker', 'Most international goals in Dutch history', 'Set-piece + free-kick option', 'Group F winner likely (vs Japan, Sweden, Tunisia)'], redFlags: ['⚠ Age 32 — outside the Šuker 30 cap', 'Corinthians club football — match-fitness vs PSG / Real Madrid attackers questionable', 'Netherlands ceiling realistically QF', 'Cody Gakpo competes for goalscoring share'], summary: 'Captain + pen-taker role is the appeal at 51.00. Cap is age + Brazilian-league match-fitness. Long-shot on a team that probably exits at QF.' },
  { player: 'Christian Pulisic', nation: 'United States', group: 'D', age: 27, odds: 81.00, tier: 'WILDCARD', penaltyTaker: true, pathScore: 'R16 / QF if upsets', fitsPattern: ['USA captain — primary penalty taker + creative outlet', 'AC Milan attacking core — best season of his career', 'Host nation — every group game in front of home crowd', 'Age 27 — peak winner band', 'Group D moderate (Paraguay, Australia, Turkey) — winnable'], redFlags: ['USA\'s realistic ceiling is QF — limits volume runway', 'No prior major-tournament Golden-Boot pedigree', 'Wide / inverted-LW role — rotates with Reyna / Aaronson', 'CONCACAF qualifying volume mediocre — USA averaged ~1.6 goals/m'], summary: 'Host-nation captain × home crowd × pen-taker role × age fits. Cap is the path — USA won\'t sustain enough matches unless they stage the best WC of their history.' },
  { player: 'Viktor Gyökeres', nation: 'Sweden', group: 'F', age: 27, odds: 101.00, tier: 'WILDCARD', pathScore: 'R16 if Sweden upset', fitsPattern: ['Arsenal central striker — top of the Premier League scoring charts post-move', 'Sweden\'s alternate / partner #9 alongside Isak', 'Age 27 — peak winner band', 'Pure box-presence striker, set-piece option'], redFlags: ['Sweden\'s realistic ceiling is R16 — won\'t top Group F', 'Isak is the first-choice pen taker + focal point — minutes split', 'Sweden didn\'t qualify in 2022 — no recent WC pedigree', 'Limited service from a Sweden midfield without elite creators'], summary: 'Same Sweden cap as Isak but with worse role-share. Bet only if you think Sweden top Group F or Isak goes off — both unlikely at the same time.' },
  { player: 'Jonathan David', nation: 'Canada', group: 'B', age: 26, odds: 101.00, tier: 'WILDCARD', penaltyTaker: true, pathScore: 'R16 / QF if upsets', fitsPattern: ['Canada captain candidate — primary penalty taker', 'Juventus striker — elite Lille / Serie A goalscoring rate', 'Host nation — easy travel + home support', 'Age 26 — peak winner band'], redFlags: ['Canada\'s realistic ceiling is R16 — limits volume runway', 'Group B with Switzerland (Elo favourite), Bosnia, Qatar — won\'t top the group', 'Canada exited 2022 group stage — no tournament pedigree', 'Service is thin without Davies + Buchanan firing'], summary: 'Host-nation captain-striker at proper long odds. Canada need to upset Switzerland to unlock the volume. David has the finishing rate; the team is the cap.' },
];

const TIER_TONE: Record<Tier, PillTone> = {
  PRIME: 'gold',
  SOLID: 'mute',
  WILDCARD: 'red',
};

function Candidates() {
  return (
    <div>
      <SectionHeader title="2026 candidates that fit the pattern" subtitle="Odds: decimal · pre-tournament market" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 12 }}>
        {CANDIDATES.map((c) => <CandidateCard key={c.player} c={c} />)}
      </div>
    </div>
  );
}

function CandidateCard({ c }: { c: Candidate }) {
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
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <Flag nation={c.nation} size={20} />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{c.player}</span>
            {c.penaltyTaker && (
              <TPill tone="gold" size="sm">Pen taker</TPill>
            )}
          </div>
          <div style={{ marginTop: 4, fontSize: 11, color: 'var(--color-text-3)' }}>
            {c.nation} · Group {c.group} ·{' '}
            <span style={{ color: c.age > 30 ? 'var(--color-red)' : 'var(--color-text-3)', fontWeight: c.age > 30 ? 600 : 400 }}>
              age {c.age}{c.age > 30 ? ' ⚠' : ''}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', flexShrink: 0, flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <TMono size={18} color="var(--color-text)" weight={600}>{c.odds.toFixed(2)}</TMono>
          <TPill tone={TIER_TONE[c.tier]} size="sm">{c.tier}</TPill>
        </div>
      </header>
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        <TLabel>Path</TLabel>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-2)' }}>{c.pathScore}</span>
      </div>
      <p style={{ margin: '0 0 12px', fontSize: 13, lineHeight: 1.55, color: 'var(--color-text-2)' }}>{c.summary}</p>
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
        {open ? '× Hide pattern fit' : 'Show pattern fit + flags ▾'}
      </button>
      {open && (
        <div
          style={{
            marginTop: 8,
            paddingTop: 12,
            borderTop: '1px solid var(--color-border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
          }}
        >
          <div>
            <div style={{ marginBottom: 6 }}>
              <TLabel color="var(--color-green)">Fits the pattern</TLabel>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--color-text-2)' }}>
              {c.fitsPattern.map((p) => (
                <li key={p} style={{ display: 'flex', gap: 6 }}>
                  <span style={{ color: 'var(--color-green)' }}>+</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ marginBottom: 6 }}>
              <TLabel color="var(--color-red)">Red flags</TLabel>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--color-text-2)' }}>
              {c.redFlags.map((p) => (
                <li key={p} style={{ display: 'flex', gap: 6 }}>
                  <span style={{ color: 'var(--color-red)' }}>−</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
