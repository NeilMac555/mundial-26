// steam-app.jsx — SteamWatch-style World Cup companion
// Dark navy + mint accent, mono numerics, sparklines, percent chips.

const { useState: sUS, useMemo: sUM } = React;

const STEAM_THEMES = {
  steam: {
    label: 'Trophy Gold',
    '--bg':       '#0b0f17',
    '--surface':  '#11161f',
    '--surface2': '#171e2a',
    '--surface3': '#222b3b',
    '--border':   '#1f2733',
    '--border-2': '#2c3647',
    '--text':     '#ece4cf',
    '--text-2':   '#a89d82',
    '--text-3':   '#6c6450',
    '--mint':     '#e8b94a',
    '--mint-2':   '#f5d27a',
    '--mint-d':   '#5a4318',
    '--red':      '#e25d6f',
    '--red-d':    '#5a1f2c',
    '--amber':    '#e8b14a',
    '--violet':   '#c89a4a',
    '--font-display': '"Inter", "Inter Tight", system-ui, sans-serif',
    '--font-body':    '"Inter", system-ui, sans-serif',
    '--font-mono':    '"JetBrains Mono", "IBM Plex Mono", monospace',
  },
  pitch: {
    label: 'Champagne (light gold)',
    '--bg':       '#0c0d10',
    '--surface':  '#13151a',
    '--surface2': '#1c1f26',
    '--surface3': '#262a34',
    '--border':   '#222631',
    '--border-2': '#2f3543',
    '--text':     '#f3ecd6',
    '--text-2':   '#b3a786',
    '--text-3':   '#73694f',
    '--mint':     '#f0c668',
    '--mint-2':   '#f8dc94',
    '--mint-d':   '#5e451a',
    '--red':      '#e25d6f',
    '--red-d':    '#5a1f2c',
    '--amber':    '#e8b14a',
    '--violet':   '#c89a4a',
    '--font-display': '"Inter", system-ui, sans-serif',
    '--font-body':    '"Inter", system-ui, sans-serif',
    '--font-mono':    '"JetBrains Mono", monospace',
  },
  obsidian: {
    label: 'Bullion (deep gold)',
    '--bg':       '#08090c',
    '--surface':  '#0e1014',
    '--surface2': '#16181f',
    '--surface3': '#21242d',
    '--border':   '#1d2028',
    '--border-2': '#2b2f3a',
    '--text':     '#ece4cf',
    '--text-2':   '#a39777',
    '--text-3':   '#6a6147',
    '--mint':     '#d4a235',
    '--mint-2':   '#e8b94a',
    '--mint-d':   '#4a3611',
    '--red':      '#e25d6f',
    '--red-d':    '#5a1f2c',
    '--amber':    '#e8b14a',
    '--violet':   '#c89a4a',
    '--font-display': '"Inter", system-ui, sans-serif',
    '--font-body':    '"Inter", system-ui, sans-serif',
    '--font-mono':    '"JetBrains Mono", monospace',
  },
};

// ─── Atoms ──────────────────────────────────────────────────
function SLogo({ size = 22 }) {
  // World Cup trophy silhouette in gold
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="trophyG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--mint-2)" />
            <stop offset="100%" stopColor="var(--mint)" />
          </linearGradient>
        </defs>
        {/* Globe / cup of trophy — two curved swooping arms holding a sphere */}
        <g fill="url(#trophyG)" stroke="var(--mint-d)" strokeWidth="0.4">
          {/* base */}
          <rect x="8" y="20.2" width="8" height="2.2" rx="0.4" />
          <rect x="9" y="18.4" width="6" height="1.8" rx="0.3" />
          {/* stem */}
          <path d="M10.6 18.4 L13.4 18.4 L13.1 14.5 L10.9 14.5 Z" />
          {/* twin curved arms cradling the globe */}
          <path d="M7 8 C 7 5, 9 3.5, 11 3.5 L 11 5 C 9.6 5, 8.5 6.2, 8.5 8 C 8.5 11.5, 10.5 14, 12 14.6 L 11.2 15.5 C 9.5 14.7, 7 12, 7 8 Z" />
          <path d="M17 8 C 17 5, 15 3.5, 13 3.5 L 13 5 C 14.4 5, 15.5 6.2, 15.5 8 C 15.5 11.5, 13.5 14, 12 14.6 L 12.8 15.5 C 14.5 14.7, 17 12, 17 8 Z" />
          {/* globe at top */}
          <circle cx="12" cy="6.4" r="2.4" />
        </g>
        {/* highlight on globe */}
        <ellipse cx="11.2" cy="5.8" rx="0.6" ry="0.9" fill="rgba(255,255,255,0.35)" />
      </svg>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700,
        color: 'var(--text)', letterSpacing: '-0.005em',
      }}>WorldCup<span style={{ color: 'var(--mint)' }}>Watch</span><span style={{ color: 'var(--text-3)', fontWeight: 400 }}>.io</span></span>
    </div>
  );
}

function SLabel({ children, style }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 10,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: 'var(--text-3)', ...style,
    }}>{children}</span>
  );
}

function SChip({ tone = 'mint', children, size = 'md' }) {
  const tones = {
    mint: { bg: 'rgba(63,209,163,0.12)', fg: 'var(--mint)', bd: 'rgba(63,209,163,0.28)' },
    red:  { bg: 'rgba(226,93,111,0.12)', fg: 'var(--red)',  bd: 'rgba(226,93,111,0.28)' },
    amber:{ bg: 'rgba(232,177,74,0.10)', fg: 'var(--amber)',bd: 'rgba(232,177,74,0.28)' },
    mute: { bg: 'rgba(143,163,184,0.08)', fg: 'var(--text-2)', bd: 'rgba(143,163,184,0.18)' },
  }[tone];
  const fs = size === 'sm' ? 10 : 11;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 7px', borderRadius: 4,
      background: tones.bg, color: tones.fg, border: `0.5px solid ${tones.bd}`,
      fontFamily: 'var(--font-mono)', fontSize: fs, fontWeight: 600,
      letterSpacing: '0.02em',
    }}>{children}</span>
  );
}

function SDelta({ value, format = 'pct', size = 'md' }) {
  const positive = value > 0;
  const tone = positive ? 'mint' : 'red';
  const arrow = positive ? '↑' : '↓';
  const txt = format === 'pct' ? `${Math.abs(value).toFixed(1)}%` : Math.abs(value).toFixed(2);
  return <SChip tone={tone} size={size}>{arrow} {txt}</SChip>;
}

// Sparkline
function Spark({ data, color = 'var(--mint)', w = 120, h = 28, area = true }) {
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / span) * (h - 4) - 2;
    return [x, y];
  });
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const areaPath = `${path} L${w},${h} L0,${h} Z`;
  const id = 'g' + Math.random().toString(36).slice(2, 7);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      {area && (
        <>
          <defs>
            <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${id})`} />
        </>
      )}
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function rand(seed) {
  let x = seed;
  return () => { x = (x * 9301 + 49297) % 233280; return x / 233280; };
}
function genSeries(seed, n = 18, base = 2.5) {
  const r = rand(seed);
  let v = base;
  const out = [];
  for (let i = 0; i < n; i++) { v += (r() - 0.5) * 0.3; out.push(Math.max(1.1, v)); }
  return out;
}

function SOdds({ value, trend, selected, onClick, size = 'md' }) {
  const isUp = trend === 'up', isDn = trend === 'down';
  const fs = size === 'sm' ? 11 : 13;
  return (
    <button onClick={onClick} style={{
      appearance: 'none', cursor: 'pointer',
      background: selected ? 'var(--mint)' : 'var(--surface2)',
      color: selected ? 'var(--bg)' : 'var(--text)',
      border: `1px solid ${selected ? 'var(--mint)' : 'var(--border)'}`,
      padding: size === 'sm' ? '5px 8px' : '6px 10px', borderRadius: 4,
      fontFamily: 'var(--font-mono)', fontSize: fs, fontWeight: 600,
      letterSpacing: '0.01em', display: 'inline-flex', alignItems: 'center', gap: 4,
    }}>
      <span>{value.toFixed(2)}</span>
      {!selected && (isUp || isDn) && (
        <span style={{ fontSize: 9, color: isUp ? 'var(--mint)' : 'var(--red)' }}>{isUp ? '↑' : '↓'}</span>
      )}
    </button>
  );
}

// ─── Header ─────────────────────────────────────────────────
function SHeader({ tab, setTab, group, setGroup }) {
  const tabs = ['OVERVIEW', 'GROUPS', 'BRACKET', 'TEAM P/L', 'WIRE', 'TOOLS'];
  const groupKeys = ['ALL', ...Object.keys(window.GROUPS)];
  return (
    <header style={{
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 20,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 24,
        padding: '14px 28px',
      }}>
        <SLogo />
        <nav style={{ display: 'flex', gap: 26, marginLeft: 24 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              appearance: 'none', background: 'transparent', border: 'none', cursor: 'pointer',
              color: tab === t ? 'var(--text)' : 'var(--text-2)',
              fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.12em',
              fontWeight: 500, padding: '4px 0', position: 'relative',
            }}>
              {t}
              {tab === t && <span style={{
                position: 'absolute', bottom: -16, left: 0, right: 0, height: 2,
                background: 'var(--mint)',
              }} />}
            </button>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <SChip tone="mint">● LIVE · PINNACLE</SChip>
          <div style={{
            background: 'var(--mint)', color: 'var(--bg)',
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
            padding: '4px 8px', borderRadius: 3, letterSpacing: '0.06em',
          }}>F · PRO</div>
        </div>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 28px', borderTop: '1px solid var(--border)',
      }}>
        <SLabel style={{ marginRight: 6 }}>Groups</SLabel>
        {groupKeys.map(g => (
          <button key={g} onClick={() => setGroup(g)} style={{
            appearance: 'none', cursor: 'pointer',
            background: group === g ? 'var(--surface2)' : 'transparent',
            color: group === g ? 'var(--text)' : 'var(--text-2)',
            border: 'none', padding: '5px 10px', borderRadius: 4,
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 6,
            position: 'relative',
          }}>
            {g !== 'ALL' && (
              <span style={{
                width: 14, height: 10, background: window.GROUP_COLORS[g], borderRadius: 1,
                display: 'inline-block',
              }} />
            )}
            {g === 'ALL' ? 'ALL' : `GRP ${g}`}
            {group === g && <span style={{
              position: 'absolute', bottom: -11, left: 0, right: 0, height: 2,
              background: 'var(--mint)',
            }} />}
          </button>
        ))}
      </div>
    </header>
  );
}

// Live ticker strip (like SteamWatch's running odds)
function STicker() {
  const items = [
    { lg: 'WC', m: 'MEX-GHA', n: 1, v: 1.60, d: -34.6 },
    { lg: 'WC', m: 'FRA-JPN', n: 2, v: 4.50, d: -32.4 },
    { lg: 'WC', m: 'ESP-MAR', n: 1, v: 1.55, d: -28.0 },
    { lg: 'WC', m: 'BEL-USA', n: 'X', v: 3.50, d: -22.6 },
    { lg: 'WC', m: 'ITA-ECU', n: 1, v: 1.50, d: -20.6 },
    { lg: 'WC', m: 'POL-TUN', n: 1, v: 1.65, d: -18.2 },
    { lg: 'WC', m: 'BRA-CRO', n: 1, v: 1.55, d: -15.4 },
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 0,
      padding: '8px 28px', borderBottom: '1px solid var(--border)',
      background: 'var(--surface)', overflow: 'hidden',
    }}>
      <SChip tone="mint" size="sm" style={{ marginRight: 16 }}>● LIVE</SChip>
      <div style={{ display: 'flex', gap: 22, overflow: 'hidden' }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em' }}>{it.lg}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text)', fontWeight: 600 }}>{it.m}</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)',
              background: 'var(--surface3)', padding: '1px 5px', borderRadius: 2,
            }}>{it.n}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{it.v.toFixed(2)}</span>
            <SDelta value={it.d} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page header (like Team P/L title block) ────────────────
function SPageHead({ icon, title, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '24px 28px 18px' }}>
      <div style={{ width: 3, alignSelf: 'stretch', background: 'var(--mint)', borderRadius: 1 }} />
      <div style={{
        width: 36, height: 36, borderRadius: 6,
        background: 'var(--surface2)', border: '1px solid var(--border-2)',
        display: 'grid', placeItems: 'center', color: 'var(--violet)', fontSize: 16,
      }}>{icon}</div>
      <div>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>{title}</h1>
        <SLabel>{sub}</SLabel>
      </div>
    </div>
  );
}

Object.assign(window, {
  STEAM_THEMES, SLogo, SLabel, SChip, SDelta, Spark, genSeries,
  SOdds, SHeader, STicker, SPageHead,
});
