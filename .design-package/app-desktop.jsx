// app-desktop.jsx — Mundial '26 Bettors Companion (desktop view)
// Original retro-themed design. No real brand UI replicated.

const { useState, useMemo } = React;

// ────────────────────────────────────────────────────────────
// Theme tokens — three retro variants, swapped via CSS vars
// ────────────────────────────────────────────────────────────
const THEMES = {
  panini78: {
    label: "Panini '78",
    '--bg':       '#e9e1cf',
    '--paper':    '#f4ecd6',
    '--paper2':   '#ede2c4',
    '--ink':      '#23201a',
    '--ink2':     '#5a4c34',
    '--rule':     '#1f1c16',
    '--accent':   '#c5491f',  // terracotta
    '--accent2':  '#d8a02c',  // mustard
    '--accent3':  '#3a6b3c',  // forest
    '--accent4':  '#7a3a1f',  // burnt sienna
    '--live':     '#c5491f',
    '--win':      '#3a6b3c',
    '--draw':     '#a98640',
    '--lose':     '#8b3a2e',
    '--font-display': '"Bungee", "Bungee Inline", sans-serif',
    '--font-serif':   '"Roboto Slab", Georgia, serif',
    '--font-mono':    '"JetBrains Mono", "IBM Plex Mono", monospace',
    '--grain':    '0.55',
    '--scanlines': '0',
  },
  broadcast94: {
    label: "Broadcast '94",
    '--bg':       '#0e1410',
    '--paper':    '#16201a',
    '--paper2':   '#0a120e',
    '--ink':      '#e8d9a4',
    '--ink2':     '#a89a72',
    '--rule':     '#3a4a3e',
    '--accent':   '#e8a02e',
    '--accent2':  '#d54a23',
    '--accent3':  '#7fc66c',
    '--accent4':  '#e8d9a4',
    '--live':     '#e8a02e',
    '--win':      '#7fc66c',
    '--draw':     '#e8a02e',
    '--lose':     '#d54a23',
    '--font-display': '"Bungee", "Bungee Inline", sans-serif',
    '--font-serif':   '"Roboto Slab", Georgia, serif',
    '--font-mono':    '"JetBrains Mono", monospace',
    '--grain':    '0.15',
    '--scanlines': '0.7',
  },
  newsprint: {
    label: "Newsprint",
    '--bg':       '#e8e1d0',
    '--paper':    '#efe9d8',
    '--paper2':   '#e0d8c2',
    '--ink':      '#1a1a18',
    '--ink2':     '#4a4438',
    '--rule':     '#1a1a18',
    '--accent':   '#8a2418',
    '--accent2':  '#7a5a28',
    '--accent3':  '#3a4a32',
    '--accent4':  '#5a3a18',
    '--live':     '#8a2418',
    '--win':      '#3a4a32',
    '--draw':     '#7a5a28',
    '--lose':     '#8a2418',
    '--font-display': '"DM Serif Display", "Playfair Display", serif',
    '--font-serif':   '"Roboto Slab", Georgia, serif',
    '--font-mono':    '"JetBrains Mono", monospace',
    '--grain':    '0.7',
    '--scanlines': '0',
  },
};

// ────────────────────────────────────────────────────────────
// Stamps & decorative bits
// ────────────────────────────────────────────────────────────
function Stamp({ children, rotate = -4, color }) {
  return (
    <span style={{
      display: 'inline-block',
      transform: `rotate(${rotate}deg)`,
      border: `2.5px solid ${color || 'var(--accent)'}`,
      color: color || 'var(--accent)',
      fontFamily: 'var(--font-display)',
      padding: '3px 8px 2px',
      fontSize: 10,
      letterSpacing: '0.08em',
      borderRadius: 3,
      background: 'transparent',
    }}>{children}</span>
  );
}

function FormDot({ r }) {
  const map = { W: 'var(--win)', D: 'var(--draw)', L: 'var(--lose)' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 18, height: 18, borderRadius: '50%',
      background: map[r], color: '#f4ecd6',
      fontFamily: 'var(--font-display)', fontSize: 9,
    }}>{r}</span>
  );
}

function OddsCell({ value, onClick, selected }) {
  return (
    <button
      onClick={onClick}
      style={{
        appearance: 'none',
        border: selected ? '2px solid var(--accent)' : '1.5px solid var(--rule)',
        background: selected ? 'var(--accent)' : 'var(--paper)',
        color: selected ? 'var(--paper)' : 'var(--ink)',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        fontWeight: 700,
        padding: '6px 0',
        minWidth: 56,
        cursor: 'pointer',
        letterSpacing: '0.02em',
        transition: 'transform .08s',
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
      onMouseUp={(e) => e.currentTarget.style.transform = ''}
      onMouseLeave={(e) => e.currentTarget.style.transform = ''}
    >{value.toFixed(2)}</button>
  );
}

// Big section header — chunky display type with rule
function SectionHead({ kicker, title, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, paddingBottom: 8, borderBottom: '2px solid var(--rule)', marginBottom: 14 }}>
      {kicker && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em',
          color: 'var(--accent)', textTransform: 'uppercase',
          background: 'var(--paper2)', padding: '2px 6px', border: '1px solid var(--rule)',
        }}>{kicker}</span>
      )}
      <h2 style={{
        margin: 0, fontFamily: 'var(--font-display)', fontSize: 22,
        letterSpacing: '0.01em', color: 'var(--ink)', textTransform: 'uppercase',
        flex: 1,
      }}>{title}</h2>
      {right && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink2)' }}>{right}</div>}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MASTHEAD
// ────────────────────────────────────────────────────────────
function Masthead({ tab, setTab, oddsFormat }) {
  const tabs = ['DASHBOARD', 'GROUPS', 'BRACKET', 'TEAMS', 'NEWS'];
  return (
    <header style={{
      borderBottom: '3px solid var(--rule)',
      background: 'var(--paper)',
      position: 'relative',
    }}>
      {/* Top strip */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 24px', borderBottom: '1px solid var(--rule)',
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em',
        color: 'var(--ink2)', textTransform: 'uppercase',
      }}>
        <span>VOL. XXIII · No. 04 · MATCHDAY 3</span>
        <span style={{ display: 'flex', gap: 16 }}>
          <span>SUNDAY · JUN 14 · 2026</span>
          <span>USA · CAN · MEX</span>
          <span>OOH+ {oddsFormat.toUpperCase()}</span>
        </span>
      </div>

      {/* Title row */}
      <div style={{ padding: '14px 24px 10px', display: 'flex', alignItems: 'center', gap: 18 }}>
        {/* Left mark */}
        <div style={{
          width: 64, height: 64, border: '3px solid var(--rule)',
          background: 'var(--accent)',
          display: 'grid', placeItems: 'center',
          position: 'relative', flexShrink: 0,
        }}>
          <div style={{ fontFamily: 'var(--font-display)', color: 'var(--paper)', fontSize: 28, lineHeight: 1 }}>26</div>
          <div style={{
            position: 'absolute', inset: -7, border: '1.5px dashed var(--rule)', pointerEvents: 'none',
          }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, lineHeight: 0.95, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.005em' }}>
            MUNDIAL <span style={{ color: 'var(--accent)' }}>·</span> COMPANION
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, fontStyle: 'italic', color: 'var(--ink2)', marginTop: 2 }}>
            Stats, squads &amp; bookmaker prices for the ’26 World Cup — for the bettor who reads the sports page first.
          </div>
        </div>
        {/* Right ornament */}
        <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)', letterSpacing: '0.1em' }}>
          <div>EDITION</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, color: 'var(--ink)', lineHeight: 1 }}>03</div>
          <div>JUN 14</div>
        </div>
      </div>

      {/* Nav strip */}
      <nav style={{
        display: 'flex', borderTop: '1.5px solid var(--rule)', background: 'var(--paper2)',
      }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setTab(t)} style={{
            appearance: 'none', border: 'none',
            borderRight: i < tabs.length - 1 ? '1px solid var(--rule)' : 'none',
            background: tab === t ? 'var(--ink)' : 'transparent',
            color: tab === t ? 'var(--paper)' : 'var(--ink)',
            fontFamily: 'var(--font-display)',
            fontSize: 12, letterSpacing: '0.08em',
            padding: '10px 20px', cursor: 'pointer', textTransform: 'uppercase',
          }}>{t}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{
          padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--ink2)', borderLeft: '1px solid var(--rule)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--live)', boxShadow: '0 0 0 2px rgba(197,73,31,.25)', animation: 'pulse 1.4s infinite' }} />
          <span>2 LIVE NOW</span>
        </div>
      </nav>
    </header>
  );
}

// ────────────────────────────────────────────────────────────
// FIXTURES TABLE — used on dashboard + groups
// ────────────────────────────────────────────────────────────
function FixtureRow({ f, oddsFormat, selected, onPick }) {
  const home = (window.GROUPS[f.group] || []).find(t => t.code === f.home);
  const away = (window.GROUPS[f.group] || []).find(t => t.code === f.away);
  const isLive = f.status.startsWith('LIVE');
  const isFT = f.status === 'FT';

  const fmt = (v) => {
    if (oddsFormat === 'decimal') return v.toFixed(2);
    if (oddsFormat === 'american') {
      const n = v >= 2 ? Math.round((v - 1) * 100) : Math.round(-100 / (v - 1));
      return n > 0 ? `+${n}` : `${n}`;
    }
    // fractional approx
    const num = Math.round((v - 1) * 10);
    const denom = 10;
    const g = (a, b) => b ? g(b, a % b) : a;
    const G = g(num, denom);
    return `${num/G}/${denom/G}`;
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '52px 90px 1fr 1fr 1fr 80px 200px',
      alignItems: 'center', gap: 0,
      padding: '10px 12px',
      borderBottom: '1px solid var(--rule)',
      background: 'var(--paper)',
      fontFamily: 'var(--font-serif)',
    }}>
      {/* Group chip */}
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 13,
        background: window.GROUP_COLORS[f.group], color: '#f4ecd6',
        width: 32, height: 32, display: 'grid', placeItems: 'center',
        border: '1.5px solid var(--rule)',
      }}>{f.group}</div>

      {/* Time / status */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink2)' }}>
        <div style={{ color: 'var(--ink)' }}>{f.date}</div>
        <div>{f.time}</div>
      </div>

      {/* Home */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700 }}>
        <window.FlagSwatch code={f.home} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.02em' }}>{f.home}</span>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 12, color: 'var(--ink2)', fontWeight: 400 }}>{home?.name}</span>
      </div>

      {/* Score */}
      <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 22, color: isLive ? 'var(--live)' : 'var(--ink)' }}>
        {isFT || isLive ? `${f.hs ?? 0}–${f.as ?? 0}` : <span style={{ color: 'var(--ink2)', fontSize: 12 }}>vs</span>}
        {isLive && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--live)', letterSpacing: '0.1em' }}>{f.status}</div>}
        {isFT && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', letterSpacing: '0.1em' }}>FULL TIME</div>}
      </div>

      {/* Away */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, justifyContent: 'flex-end' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 12, color: 'var(--ink2)', fontWeight: 400 }}>{away?.name}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.02em' }}>{f.away}</span>
        <window.FlagSwatch code={f.away} />
      </div>

      {/* Venue */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)', textAlign: 'center', letterSpacing: '0.06em' }}>
        {f.venue}
      </div>

      {/* Odds */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
        {['h', 'd', 'a'].map((k) => (
          <div key={k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--ink2)', letterSpacing: '0.1em' }}>
              {k === 'h' ? '1' : k === 'd' ? 'X' : '2'}
            </div>
            <button
              onClick={() => onPick(f.id, k)}
              style={{
                appearance: 'none',
                border: selected === k ? '2px solid var(--accent)' : '1.5px solid var(--rule)',
                background: selected === k ? 'var(--accent)' : 'var(--paper2)',
                color: selected === k ? 'var(--paper)' : 'var(--ink)',
                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                padding: '4px 0', width: '100%', cursor: 'pointer',
              }}
            >{fmt(f.odds[k])}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// GROUPS GRID
// ────────────────────────────────────────────────────────────
function GroupCard({ id, teams, onTeam }) {
  const sorted = [...teams].sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
  return (
    <div style={{
      background: 'var(--paper)',
      border: '2px solid var(--rule)',
      position: 'relative',
    }}>
      {/* Group label tab */}
      <div style={{
        display: 'flex', alignItems: 'stretch',
        borderBottom: '2px solid var(--rule)',
      }}>
        <div style={{
          background: window.GROUP_COLORS[id],
          color: '#f4ecd6',
          fontFamily: 'var(--font-display)', fontSize: 28,
          padding: '6px 14px',
          borderRight: '2px solid var(--rule)',
          minWidth: 60, textAlign: 'center',
        }}>{id}</div>
        <div style={{ flex: 1, padding: '6px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', letterSpacing: '0.16em' }}>GROUP {id}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--ink)', letterSpacing: '0.02em' }}>
            {sorted.slice(0, 2).map(t => t.code).join(' · ')} ADVANCING
          </div>
        </div>
      </div>

      {/* Standings */}
      <div>
        {/* head */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '20px 1fr 24px 24px 24px 36px 48px',
          fontFamily: 'var(--font-mono)', fontSize: 9,
          color: 'var(--ink2)', letterSpacing: '0.1em',
          padding: '4px 10px', borderBottom: '1px solid var(--rule)',
          background: 'var(--paper2)', textTransform: 'uppercase', alignItems: 'center',
        }}>
          <span>#</span><span>TEAM</span>
          <span style={{ textAlign: 'right' }}>W</span>
          <span style={{ textAlign: 'right' }}>D</span>
          <span style={{ textAlign: 'right' }}>L</span>
          <span style={{ textAlign: 'right' }}>+/-</span>
          <span style={{ textAlign: 'right' }}>PTS</span>
        </div>
        {sorted.map((t, i) => {
          const advancing = i < 2;
          return (
            <div key={t.code}
              onClick={() => onTeam && onTeam(t.code)}
              style={{
                display: 'grid',
                gridTemplateColumns: '20px 1fr 24px 24px 24px 36px 48px',
                fontFamily: 'var(--font-serif)', fontSize: 13,
                padding: '7px 10px',
                borderBottom: i < sorted.length - 1 ? '1px solid var(--rule)' : 'none',
                background: advancing ? 'transparent' : 'var(--paper2)',
                color: advancing ? 'var(--ink)' : 'var(--ink2)',
                alignItems: 'center', cursor: 'pointer',
                position: 'relative',
              }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 11,
                color: advancing ? 'var(--accent)' : 'var(--ink2)',
              }}>{i + 1}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <window.FlagSwatch code={t.code} w={20} h={13} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 12 }}>{t.code}</span>
                <span style={{ fontWeight: 400 }}>{t.name}</span>
              </span>
              <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{t.w}</span>
              <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{t.d}</span>
              <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{t.l}</span>
              <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{t.gf - t.ga > 0 ? '+' : ''}{t.gf - t.ga}</span>
              <span style={{ textAlign: 'right', fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--ink)' }}>{t.pts}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { THEMES, Stamp, FormDot, OddsCell, SectionHead, Masthead, FixtureRow, GroupCard });
