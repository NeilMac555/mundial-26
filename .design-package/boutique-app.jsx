// boutique-app.jsx — Boutique sportsbook view
// Dark editorial: deep green felt, cream, gold. Refined serifs + grotesque.

const { useState: bUS, useMemo: bUM } = React;

// ────────────────────────────────────────────────────────────
// Theme tokens (boutique). Variants for Tweaks.
// ────────────────────────────────────────────────────────────
const BOUTIQUE_THEMES = {
  emerald: {
    label: 'Emerald felt',
    '--bg':       '#0b1612',     // deep green-black
    '--surface':  '#0f1d18',
    '--surface2': '#16302a',
    '--surface3': '#1d4036',
    '--cream':    '#efe6d0',
    '--cream-d':  '#c9bfa5',
    '--cream-mu': '#8c8470',
    '--gold':     '#c9a24a',
    '--gold-2':   '#e8c875',
    '--rule':     '#2b4a40',
    '--rule-2':   '#3e6258',
    '--accent-r': '#c14d3b',     // muted brick (loss)
    '--accent-g': '#7fb27c',     // sage (win)
    '--live':     '#e8c875',
    '--font-display': '"Fraunces", "Cormorant Garamond", "Times New Roman", serif',
    '--font-body':    '"Inter Tight", "Inter", system-ui, sans-serif',
    '--font-mono':    '"JetBrains Mono", "IBM Plex Mono", monospace',
    '--felt-on':  1,
  },
  midnight: {
    label: 'Midnight oak',
    '--bg':       '#0e1014',
    '--surface':  '#13161c',
    '--surface2': '#1c2029',
    '--surface3': '#262b36',
    '--cream':    '#ece4d4',
    '--cream-d':  '#bdb39d',
    '--cream-mu': '#857d6a',
    '--gold':     '#c0a060',
    '--gold-2':   '#dec384',
    '--rule':     '#2a2f3a',
    '--rule-2':   '#3d4453',
    '--accent-r': '#c25c4b',
    '--accent-g': '#86b27d',
    '--live':     '#dec384',
    '--font-display': '"Fraunces", "Cormorant Garamond", serif',
    '--font-body':    '"Inter Tight", "Inter", system-ui, sans-serif',
    '--font-mono':    '"JetBrains Mono", monospace',
    '--felt-on':  0,
  },
  oxblood: {
    label: 'Oxblood library',
    '--bg':       '#150b0d',
    '--surface':  '#1d1112',
    '--surface2': '#2a181a',
    '--surface3': '#3a2125',
    '--cream':    '#efe5d1',
    '--cream-d':  '#c8bda8',
    '--cream-mu': '#8e8474',
    '--gold':     '#c9a24a',
    '--gold-2':   '#e8c875',
    '--rule':     '#3d2326',
    '--rule-2':   '#562f33',
    '--accent-r': '#d36b59',
    '--accent-g': '#a4b870',
    '--live':     '#e8c875',
    '--font-display': '"Fraunces", "Cormorant Garamond", serif',
    '--font-body':    '"Inter Tight", "Inter", system-ui, sans-serif',
    '--font-mono':    '"JetBrains Mono", monospace',
    '--felt-on':  0,
  },
};

// ────────────────────────────────────────────────────────────
// Atoms
// ────────────────────────────────────────────────────────────
function BMonogram() {
  return (
    <div style={{
      width: 38, height: 38, position: 'relative',
      border: '1px solid var(--gold)', borderRadius: 2,
      display: 'grid', placeItems: 'center', flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold)',
        fontStyle: 'italic', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em',
      }}>M</span>
      <div style={{
        position: 'absolute', inset: 3, border: '1px solid var(--gold)',
        opacity: 0.35, borderRadius: 1,
      }} />
    </div>
  );
}

function BLabel({ children, color }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 9.5,
      letterSpacing: '0.16em', textTransform: 'uppercase',
      color: color || 'var(--cream-mu)',
    }}>{children}</span>
  );
}

function BPill({ tone, children }) {
  const tones = {
    live:  { bg: 'rgba(232,200,117,0.12)', fg: 'var(--live)', bd: 'rgba(232,200,117,0.4)' },
    up:    { bg: 'rgba(127,178,124,0.12)', fg: 'var(--accent-g)', bd: 'rgba(127,178,124,0.4)' },
    down:  { bg: 'rgba(193,77,59,0.12)', fg: 'var(--accent-r)', bd: 'rgba(193,77,59,0.4)' },
    gold:  { bg: 'rgba(201,162,74,0.10)', fg: 'var(--gold)', bd: 'rgba(201,162,74,0.4)' },
    cream: { bg: 'rgba(239,230,208,0.06)', fg: 'var(--cream-d)', bd: 'rgba(239,230,208,0.18)' },
  }[tone] || { bg: 'transparent', fg: 'var(--cream-d)', bd: 'rgba(239,230,208,0.18)' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2.5px 7px', borderRadius: 999,
      background: tones.bg, color: tones.fg,
      border: `0.5px solid ${tones.bd}`,
      fontFamily: 'var(--font-mono)', fontSize: 9.5,
      letterSpacing: '0.1em', textTransform: 'uppercase',
    }}>{children}</span>
  );
}

function BFormDot({ r }) {
  const map = { W: 'var(--accent-g)', D: 'var(--gold)', L: 'var(--accent-r)' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 16, height: 16, borderRadius: '50%',
      background: 'transparent', color: map[r],
      border: `1px solid ${map[r]}`,
      fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600,
    }}>{r}</span>
  );
}

function BOdds({ value, selected, onClick, size = 'md' }) {
  const pad = size === 'sm' ? '5px 10px' : '8px 12px';
  const fs = size === 'sm' ? 12 : 14;
  return (
    <button
      onClick={onClick}
      style={{
        appearance: 'none', cursor: 'pointer',
        background: selected ? 'var(--gold)' : 'transparent',
        color: selected ? 'var(--bg)' : 'var(--cream)',
        border: `0.5px solid ${selected ? 'var(--gold)' : 'var(--rule-2)'}`,
        padding: pad, borderRadius: 2,
        fontFamily: 'var(--font-mono)', fontSize: fs, fontWeight: 600,
        letterSpacing: '0.02em', minWidth: 64,
        transition: 'all .12s ease',
      }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.borderColor = 'var(--gold)'; }}
      onMouseLeave={(e) => { if (!selected) e.currentTarget.style.borderColor = 'var(--rule-2)'; }}
    >{value.toFixed(2)}</button>
  );
}

// ────────────────────────────────────────────────────────────
// Header / nav
// ────────────────────────────────────────────────────────────
function BHeader({ tab, setTab }) {
  const tabs = ['Lobby', 'Groups', 'Bracket', 'Teams', 'Wire'];
  return (
    <header style={{
      borderBottom: '0.5px solid var(--rule)',
      background: 'var(--surface)',
      position: 'sticky', top: 0, zIndex: 20,
      backdropFilter: 'blur(20px)',
    }}>
      {/* Top meta */}
      <div style={{
        padding: '8px 28px', borderBottom: '0.5px solid var(--rule)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <BLabel>Mundial 2026 · Matchday 3 · Sun 14 Jun</BLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <BLabel>USD · Decimal</BLabel>
          <BPill tone="live">● 2 Live</BPill>
          <BLabel>Member · A. Cole</BLabel>
        </div>
      </div>

      {/* Brand row */}
      <div style={{
        padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 18,
      }}>
        <BMonogram />
        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--cream)',
            fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.005em', lineHeight: 1,
          }}>
            Mundial<span style={{ color: 'var(--gold)' }}>·</span>House
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cream-mu)',
            letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 2,
          }}>A Bettor's Companion · Est. 1930</div>
        </div>

        <nav style={{ marginLeft: 36, display: 'flex', gap: 4 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              appearance: 'none', background: 'transparent',
              border: 'none', cursor: 'pointer',
              color: tab === t ? 'var(--cream)' : 'var(--cream-mu)',
              fontFamily: 'var(--font-body)', fontSize: 14,
              fontWeight: tab === t ? 500 : 400,
              padding: '6px 14px', borderRadius: 999,
              position: 'relative',
              transition: 'color .12s',
            }}>
              {t}
              {tab === t && <span style={{
                position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50%)',
                width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)',
              }} />}
            </button>
          ))}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <button style={{
            appearance: 'none', background: 'transparent',
            border: '0.5px solid var(--rule-2)', color: 'var(--cream-d)',
            padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: 12.5,
          }}>Search</button>
          <button style={{
            appearance: 'none', background: 'var(--gold)',
            border: '0.5px solid var(--gold)', color: 'var(--bg)',
            padding: '7px 14px', borderRadius: 999, cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: 12.5, fontWeight: 600,
          }}>Slip · 0</button>
        </div>
      </div>
    </header>
  );
}

// ────────────────────────────────────────────────────────────
// Lobby (dashboard)
// ────────────────────────────────────────────────────────────
function BLobby({ picks, setPicks, setTab, setTeam }) {
  const live = window.FIXTURES.filter(f => f.status.startsWith('LIVE'));
  const today = window.FIXTURES.slice(0, 6);

  return (
    <div style={{ padding: '32px 28px 60px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }}>
      <div>
        {/* Editorial title */}
        <div style={{ marginBottom: 28 }}>
          <BLabel color="var(--gold)">No. 03 · The Sunday Card</BLabel>
          <h1 style={{
            margin: '6px 0 8px', fontFamily: 'var(--font-display)',
            fontSize: 44, fontWeight: 400, fontStyle: 'italic',
            color: 'var(--cream)', letterSpacing: '-0.018em', lineHeight: 1.02,
          }}>The closing day of the group stage,<br/>
            <span style={{ fontStyle: 'normal', color: 'var(--cream-d)' }}>priced &amp; previewed.</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55,
            color: 'var(--cream-mu)', maxWidth: 640, margin: 0,
          }}>
            Six fixtures decide the final knockout berths. Brazil and Argentina are through; Spain
            still need a draw; the United States must beat Belgium and hope. Prices below.
          </p>
        </div>

        {/* Live */}
        {live.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <BSectionHead kicker="In play" title="Live now" right={`${live.length} matches`} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {live.map(f => <BLiveCard key={f.id} f={f} />)}
            </div>
          </section>
        )}

        {/* Today's card */}
        <section>
          <BSectionHead kicker="Today's card" title="Sunday's fixtures" right="Prices · Mundial House" />
          <div style={{
            border: '0.5px solid var(--rule)', borderRadius: 4,
            background: 'var(--surface)', overflow: 'hidden',
          }}>
            {/* head */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '70px 1fr 56px 1fr 76px 220px',
              padding: '10px 16px', borderBottom: '0.5px solid var(--rule)',
              background: 'var(--surface2)',
            }}>
              <BLabel>Time</BLabel>
              <BLabel>Home</BLabel>
              <BLabel>{''}</BLabel>
              <BLabel>Away</BLabel>
              <BLabel>Venue</BLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                <BLabel>1</BLabel><BLabel>X</BLabel><BLabel>2</BLabel>
              </div>
            </div>
            {today.map(f => (
              <BFixtureRow key={f.id} f={f}
                selected={picks[f.id]}
                onPick={(id, k) => setPicks(p => ({ ...p, [id]: p[id] === k ? null : k }))} />
            ))}
          </div>
        </section>
      </div>

      {/* Right rail */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <BOutright />
        <BBoot />
        <BWireTease setTab={setTab} />
      </aside>
    </div>
  );
}

function BSectionHead({ kicker, title, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
      <BLabel color="var(--gold)">{kicker}</BLabel>
      <h2 style={{
        margin: 0, fontFamily: 'var(--font-display)', fontSize: 22,
        fontWeight: 400, fontStyle: 'italic', color: 'var(--cream)',
        letterSpacing: '-0.01em', flex: 1,
      }}>{title}</h2>
      {right && <BLabel>{right}</BLabel>}
    </div>
  );
}

function BLiveCard({ f }) {
  return (
    <div style={{
      border: '0.5px solid var(--rule)', borderRadius: 4,
      background: 'linear-gradient(180deg, var(--surface2) 0%, var(--surface) 100%)',
      padding: 18, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, height: 2, width: '100%',
        background: 'linear-gradient(90deg, var(--gold) 0%, transparent 60%)',
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
        <BPill tone="live">● {f.status}</BPill>
        <BLabel>Group {f.group} · {f.venue}</BLabel>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 14 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontStyle: 'italic', color: 'var(--cream)' }}>{f.home}</span>
            <window.FlagSwatch code={f.home} w={28} h={18} />
          </div>
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 400,
          color: 'var(--gold)', textAlign: 'center', minWidth: 90, lineHeight: 1,
        }}>{f.hs ?? 0} <span style={{ color: 'var(--cream-mu)', fontSize: 28 }}>:</span> {f.as ?? 0}</div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <window.FlagSwatch code={f.away} w={28} h={18} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontStyle: 'italic', color: 'var(--cream)' }}>{f.away}</span>
          </div>
        </div>
      </div>
      <div style={{
        marginTop: 14, paddingTop: 12, borderTop: '0.5px dashed var(--rule)',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <BLabel>xG · {f.id === 3 ? '1.84 / 0.62' : '0.91 / 0.34'}</BLabel>
        <BLabel>Poss · {f.id === 3 ? '58 / 42' : '63 / 37'}</BLabel>
        <BLabel>Shots · {f.id === 3 ? '14 / 6' : '8 / 3'}</BLabel>
      </div>
    </div>
  );
}

function BFixtureRow({ f, selected, onPick }) {
  const isLive = f.status.startsWith('LIVE');
  const isFT = f.status === 'FT';
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '70px 1fr 56px 1fr 76px 220px',
      padding: '14px 16px', borderBottom: '0.5px solid var(--rule)',
      alignItems: 'center', gap: 0,
    }}>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cream)' }}>{f.time}</div>
        {isLive && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--live)' }}>{f.status}</div>}
        {isFT && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--cream-mu)' }}>FT</div>}
        {!isLive && !isFT && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--cream-mu)' }}>{f.date}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <window.FlagSwatch code={f.home} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontStyle: 'italic', color: 'var(--cream)' }}>
          {(window.GROUPS[f.group].find(t => t.code === f.home) || {}).name || f.home}
        </span>
      </div>
      <div style={{ textAlign: 'center' }}>
        {isFT || isLive ? (
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 22,
            color: isLive ? 'var(--gold)' : 'var(--cream)', fontWeight: 400,
          }}>{f.hs ?? 0}–{f.as ?? 0}</span>
        ) : (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cream-mu)' }}>vs</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <window.FlagSwatch code={f.away} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontStyle: 'italic', color: 'var(--cream)' }}>
          {(window.GROUPS[f.group].find(t => t.code === f.away) || {}).name || f.away}
        </span>
      </div>
      <BLabel>{f.venue}</BLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {['h', 'd', 'a'].map(k => (
          <BOdds key={k} value={f.odds[k]}
            selected={selected === k}
            onClick={() => onPick(f.id, k)} />
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Right-rail cards
// ────────────────────────────────────────────────────────────
function BCard({ kicker, title, children, action }) {
  return (
    <div style={{
      border: '0.5px solid var(--rule)', borderRadius: 4,
      background: 'var(--surface)', overflow: 'hidden',
    }}>
      <div style={{ padding: '14px 16px 10px', borderBottom: '0.5px solid var(--rule)', background: 'var(--surface2)' }}>
        <BLabel color="var(--gold)">{kicker}</BLabel>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic',
          color: 'var(--cream)', marginTop: 2, fontWeight: 400,
        }}>{title}</div>
      </div>
      <div>{children}</div>
      {action && (
        <div style={{ padding: '10px 16px', borderTop: '0.5px solid var(--rule)' }}>{action}</div>
      )}
    </div>
  );
}

function BOutright() {
  const odds = [
    { team: 'BRA', name: 'Brazil',     o: 4.20, mv: 'flat' },
    { team: 'FRA', name: 'France',     o: 4.50, mv: 'down' },
    { team: 'ARG', name: 'Argentina',  o: 5.50, mv: 'flat' },
    { team: 'ESP', name: 'Spain',      o: 8.00, mv: 'up' },
    { team: 'ENG', name: 'England',    o: 9.00, mv: 'down' },
    { team: 'GER', name: 'Germany',    o: 12.0, mv: 'up' },
    { team: 'POR', name: 'Portugal',   o: 14.0, mv: 'flat' },
  ];
  return (
    <BCard kicker="Outright" title="To win the Cup">
      {odds.map((o, i) => (
        <div key={o.team} style={{
          display: 'grid', gridTemplateColumns: '24px 1fr 36px 60px',
          padding: '10px 16px', alignItems: 'center', gap: 10,
          borderBottom: i < odds.length - 1 ? '0.5px solid var(--rule)' : 'none',
        }}>
          <window.FlagSwatch code={o.team} w={20} h={13} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream)' }}>{o.name}</span>
          <span style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11,
            color: o.mv === 'up' ? 'var(--accent-g)' : o.mv === 'down' ? 'var(--accent-r)' : 'var(--cream-mu)' }}>
            {o.mv === 'up' ? '↑' : o.mv === 'down' ? '↓' : '·'}
          </span>
          <BOdds value={o.o} size="sm" />
        </div>
      ))}
    </BCard>
  );
}

function BBoot() {
  const list = [
    { p: 'Harry Kane',         team: 'ENG', g: 4, o: 5.50 },
    { p: 'Kylian Mbappé',      team: 'FRA', g: 4, o: 4.50 },
    { p: 'Vinícius Jr.',       team: 'BRA', g: 3, o: 6.00 },
    { p: 'L. Martínez',        team: 'ARG', g: 3, o: 8.00 },
    { p: 'R. Lukaku',          team: 'BEL', g: 3, o: 12.0 },
  ];
  return (
    <BCard kicker="Top Scorer" title="The Golden Boot race">
      {list.map((p, i) => (
        <div key={p.p} style={{
          display: 'grid', gridTemplateColumns: '14px 24px 1fr 36px 60px',
          padding: '10px 16px', alignItems: 'center', gap: 10,
          borderBottom: i < list.length - 1 ? '0.5px solid var(--rule)' : 'none',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--gold)' }}>{i + 1}</span>
          <window.FlagSwatch code={p.team} w={20} h={13} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream)' }}>{p.p}</span>
          <BLabel>{p.g} G</BLabel>
          <BOdds value={p.o} size="sm" />
        </div>
      ))}
    </BCard>
  );
}

function BWireTease({ setTab }) {
  return (
    <BCard kicker="From the wire" title="This morning's notes"
      action={<button onClick={() => setTab('Wire')} style={{
        appearance: 'none', background: 'transparent',
        border: '0.5px solid var(--rule-2)', color: 'var(--cream)',
        padding: '6px 12px', borderRadius: 999, cursor: 'pointer', width: '100%',
        fontFamily: 'var(--font-body)', fontSize: 12,
      }}>Read all →</button>}
    >
      {window.NEWS.slice(0, 3).map((n, i) => (
        <div key={n.id} style={{
          padding: '12px 16px',
          borderBottom: i < 2 ? '0.5px solid var(--rule)' : 'none',
        }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
            <BPill tone={n.tag === 'INJURY' ? 'down' : n.tag === 'ODDS' ? 'gold' : 'cream'}>{n.tag}</BPill>
            <BLabel>{n.team} · {n.time} ago</BLabel>
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 14, lineHeight: 1.3,
            color: 'var(--cream)', fontStyle: 'italic', fontWeight: 400,
          }}>{n.headline}</div>
        </div>
      ))}
    </BCard>
  );
}

Object.assign(window, {
  BOUTIQUE_THEMES, BMonogram, BLabel, BPill, BFormDot, BOdds,
  BHeader, BLobby, BSectionHead, BLiveCard, BFixtureRow, BCard,
  BOutright, BBoot, BWireTease,
});
