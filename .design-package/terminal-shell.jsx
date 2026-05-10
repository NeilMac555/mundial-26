// terminal-shell.jsx — chrome (sidebar, top bar, atoms) for the analytics terminal

const { useState: tUS, useMemo: tUM } = React;

const T_THEME = {
  '--bg':       '#0b0f17',
  '--bg-2':     '#0d121b',
  '--surface':  '#10151e',
  '--surface2': '#151c27',
  '--surface3': '#1c2532',
  '--border':   '#1d2531',
  '--border-2': '#2a3243',
  '--row-hov':  '#131925',
  '--text':     '#e6eaf2',
  '--text-2':   '#9aa4b6',
  '--text-3':   '#5f6a7d',
  '--text-4':   '#3e4757',
  '--gold':     '#e8b94a',
  '--gold-2':   '#f3cf76',
  '--gold-d':   '#5a4318',
  '--gold-bg':  'rgba(232,185,74,0.10)',
  '--red':      '#d65a6c',
  '--red-2':    '#a64a55',
  '--red-d':    '#7a2535',
  '--green':    '#5ec88a', // for legitimate up-deltas where gold would conflict
  '--font':     '"Inter", "Geist", system-ui, sans-serif',
  '--font-mono':'"JetBrains Mono", "IBM Plex Mono", monospace',
};

// ─── Logo ───────────────────────────────────────────────────
function TLogo({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="tlg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="var(--gold-2)" />
          <stop offset="100%" stopColor="var(--gold)"  />
        </linearGradient>
      </defs>
      <g fill="url(#tlg)" stroke="var(--gold-d)" strokeWidth="0.4">
        <rect x="8"  y="20.2" width="8" height="2.2" rx="0.4" />
        <rect x="9"  y="18.4" width="6" height="1.8" rx="0.3" />
        <path d="M10.6 18.4 L13.4 18.4 L13.1 14.5 L10.9 14.5 Z" />
        <path d="M7 8 C 7 5, 9 3.5, 11 3.5 L 11 5 C 9.6 5, 8.5 6.2, 8.5 8 C 8.5 11.5, 10.5 14, 12 14.6 L 11.2 15.5 C 9.5 14.7, 7 12, 7 8 Z" />
        <path d="M17 8 C 17 5, 15 3.5, 13 3.5 L 13 5 C 14.4 5, 15.5 6.2, 15.5 8 C 15.5 11.5, 13.5 14, 12 14.6 L 12.8 15.5 C 14.5 14.7, 17 12, 17 8 Z" />
        <circle cx="12" cy="6.4" r="2.4" />
      </g>
      <ellipse cx="11.3" cy="5.7" rx="0.7" ry="0.4" fill="rgba(255,255,255,0.45)" />
    </svg>
  );
}

// ─── Atoms ──────────────────────────────────────────────────
function TEyebrow({ children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-2)',
      letterSpacing: '0.14em', textTransform: 'uppercase',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
      {children}
    </div>
  );
}

function TMono({ children, size = 12, color = 'var(--text-2)', weight = 500, style }) {
  return <span style={{
    fontFamily: 'var(--font-mono)', fontSize: size, color, fontWeight: weight,
    fontVariantNumeric: 'tabular-nums', ...style,
  }}>{children}</span>;
}

function TLabel({ children, color = 'var(--text-3)' }) {
  return <span style={{
    fontFamily: 'var(--font-mono)', fontSize: 10, color,
    letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
  }}>{children}</span>;
}

function TPill({ children, tone = 'mute', size = 'md' }) {
  const tones = {
    mute:  { bg: 'rgba(154,164,182,0.08)', fg: 'var(--text-2)', bd: 'rgba(154,164,182,0.18)' },
    gold:  { bg: 'var(--gold-bg)',         fg: 'var(--gold)',   bd: 'rgba(232,185,74,0.25)' },
    red:   { bg: 'rgba(214,90,108,0.10)',  fg: 'var(--red)',    bd: 'rgba(214,90,108,0.25)' },
    green: { bg: 'rgba(94,200,138,0.10)',  fg: 'var(--green)',  bd: 'rgba(94,200,138,0.25)' },
  }[tone];
  const fs = size === 'sm' ? 10 : 11;
  const pd = size === 'sm' ? '2px 6px' : '3px 8px';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4, padding: pd, borderRadius: 3,
      background: tones.bg, color: tones.fg, border: `1px solid ${tones.bd}`,
      fontFamily: 'var(--font-mono)', fontSize: fs, fontWeight: 500, letterSpacing: '0.04em',
    }}>{children}</span>
  );
}

// Drift chip — small rounded rect with arrow + delta
function TDelta({ value, format = 'num', precision = 2, suffix = '' }) {
  const positive = value > 0;
  const tone = positive ? 'gold' : 'red';
  const arrow = positive ? '↑' : '↓';
  const txt = format === 'pct'
    ? `${Math.abs(value).toFixed(precision)}%`
    : `${Math.abs(value).toFixed(precision)}${suffix}`;
  return <TPill tone={tone} size="sm">{arrow} {txt}</TPill>;
}

// Sortable column header
function TSortHead({ label, align = 'right', active, dir, onClick, mono = true }) {
  return (
    <th onClick={onClick} style={{
      textAlign: align, padding: '11px 14px', cursor: 'pointer',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
      position: 'sticky', top: 0, zIndex: 5,
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font)',
        fontSize: 10.5, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: active ? 'var(--text)' : 'var(--text-3)',
      }}>
        {label}
        <span style={{
          fontSize: 9, color: active ? 'var(--gold)' : 'var(--text-4)',
          transform: active && dir === 'asc' ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.15s',
        }}>▾</span>
      </span>
    </th>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────
function TSidebar({ active, setActive, collapsed }) {
  const w = collapsed ? 64 : 232;
  return (
    <aside style={{
      width: w, minWidth: w, height: '100%',
      background: 'var(--bg-2)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.18s',
    }}>
      <div style={{
        padding: collapsed ? '18px 0' : '18px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 10,
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        <TLogo size={22} />
        {!collapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontFamily: 'var(--font)', fontSize: 13, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.005em' }}>
              Mundial<span style={{ color: 'var(--gold)' }}>·</span>Terminal
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--text-3)', letterSpacing: '0.1em', marginTop: 2 }}>
              v 0.4 · '26 EDITION
            </span>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, overflow: 'auto', padding: '10px 0' }}>
        {window.T_NAV.map(group => (
          <div key={group.section} style={{ marginBottom: 14 }}>
            {!collapsed && (
              <div style={{
                padding: '8px 18px 4px',
                fontFamily: 'var(--font-mono)', fontSize: 9.5,
                color: 'var(--text-4)', letterSpacing: '0.16em',
                textTransform: 'uppercase', fontWeight: 600,
              }}>{group.section}</div>
            )}
            {group.items.map(it => {
              const isActive = active === it.id;
              return (
                <button key={it.id} onClick={() => setActive(it.id)} style={{
                  appearance: 'none', cursor: 'pointer',
                  display: 'block', width: '100%', textAlign: 'left',
                  background: isActive ? 'var(--surface2)' : 'transparent',
                  borderLeft: `2px solid ${isActive ? 'var(--gold)' : 'transparent'}`,
                  border: 'none',
                  borderLeftWidth: 2, borderLeftStyle: 'solid', borderLeftColor: isActive ? 'var(--gold)' : 'transparent',
                  padding: collapsed ? '8px 0' : '8px 16px 8px 18px',
                  fontFamily: 'var(--font)', fontSize: 13,
                  color: isActive ? 'var(--text)' : 'var(--text-2)',
                  fontWeight: isActive ? 500 : 400, letterSpacing: '-0.005em',
                  transition: 'background 0.12s, color 0.12s',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--row-hov)'; e.currentTarget.style.color = 'var(--text)'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isActive ? 'var(--text)' : 'var(--text-2)'; }}
                >
                  {collapsed ? it.label.slice(0, 2).toUpperCase() : it.label}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div style={{
          padding: '12px 16px', borderTop: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          <TLabel>Snapshot</TLabel>
          <TMono size={11} color="var(--text-2)">{window.T_META.snapshot}</TMono>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 0 3px rgba(94,200,138,0.18)' }} />
            <TMono size={10} color="var(--text-3)">FEED · LIVE</TMono>
          </div>
        </div>
      )}
    </aside>
  );
}

// ─── Top bar ─────────────────────────────────────────────────
function TTopbar({ active }) {
  const item = window.T_NAV.flatMap(g => g.items).find(i => i.id === active);
  const section = window.T_NAV.find(g => g.items.some(i => i.id === active))?.section;
  return (
    <header style={{
      height: 56, padding: '0 24px',
      background: 'var(--bg)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', gap: 16,
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <TEyebrow>FIFA WORLD CUP 2026 · USA · CANADA · MEXICO</TEyebrow>
      <span style={{ width: 1, height: 18, background: 'var(--border)', margin: '0 6px' }} />
      <TMono size={11} color="var(--text-3)">{section}</TMono>
      <span style={{ color: 'var(--text-4)', fontSize: 11 }}>›</span>
      <TMono size={11} color="var(--text)">{item?.label || ''}</TMono>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 10px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 4,
          color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: 11,
          minWidth: 220,
        }}>
          <span>⌕</span>
          <span style={{ flex: 1 }}>Search teams, players, markets</span>
          <span style={{ padding: '1px 5px', background: 'var(--surface3)', borderRadius: 2, fontSize: 9.5, color: 'var(--text-2)' }}>⌘K</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
          <TMono size={10} color="var(--text-2)">PINNACLE · LIVE</TMono>
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'var(--surface2)', border: '1px solid var(--border-2)',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font)', fontSize: 11, fontWeight: 600, color: 'var(--text-2)',
        }}>F</div>
      </div>
    </header>
  );
}

// ─── Page header (h1 + meta line) ─────────────────────────────
function TPageHeader({ title, lede, kpis }) {
  return (
    <div style={{ padding: '28px 28px 14px', borderBottom: '1px solid var(--border)' }}>
      <h1 style={{
        margin: 0, fontFamily: 'var(--font)', fontSize: 32, fontWeight: 500,
        color: 'var(--text)', letterSpacing: '-0.018em', lineHeight: 1.1,
      }}>{title}</h1>
      {lede && (
        <p style={{
          margin: '8px 0 0', fontSize: 14, lineHeight: 1.5, color: 'var(--text-2)',
          maxWidth: 760, fontWeight: 400,
        }}>{lede}</p>
      )}
      {kpis && (
        <div style={{ display: 'flex', gap: 28, marginTop: 18 }}>
          {kpis.map((k, i) => (
            <div key={i}>
              <TLabel>{k.label}</TLabel>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 500,
                  color: 'var(--text)', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums',
                }}>{k.value}</span>
                {k.delta != null && <TDelta value={k.delta} format="num" precision={2} />}
                {k.unit && <TMono size={11} color="var(--text-3)">{k.unit}</TMono>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Data caption block — methodology / snapshot
function TCaption({ children }) {
  return (
    <div style={{
      padding: '14px 28px', display: 'flex', flexWrap: 'wrap', gap: 24,
      borderBottom: '1px solid var(--border)', background: 'var(--bg-2)',
    }}>{children}</div>
  );
}

function TCaptionItem({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TLabel>{label}</TLabel>
      <TMono size={11} color="var(--text-2)">{value}</TMono>
    </div>
  );
}

Object.assign(window, {
  T_THEME, TLogo, TEyebrow, TMono, TLabel, TPill, TDelta,
  TSortHead, TSidebar, TTopbar, TPageHeader, TCaption, TCaptionItem,
});
