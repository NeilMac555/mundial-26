// app-mobile.jsx — Mobile companion view (matches desktop themes)

const { useState: uM } = React;

function MobileApp() {
  const [tab, setTab] = uM('TODAY');
  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-serif)', color: 'var(--ink)',
      overflow: 'hidden',
    }}>
      {/* Status bar spacer handled by ios frame */}

      {/* Mast */}
      <div style={{
        background: 'var(--paper)', borderBottom: '2px solid var(--rule)',
        padding: '10px 14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: 'var(--accent)',
            border: '2px solid var(--rule)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'var(--font-display)', fontSize: 14,
            color: 'var(--paper)',
          }}>26</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, lineHeight: 1, letterSpacing: '0.02em' }}>
              MUNDIAL · COMPANION
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--ink2)', letterSpacing: '0.14em', marginTop: 2 }}>
              MATCHDAY 3 · JUN 14
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--live)', letterSpacing: '0.1em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--live)', animation: 'pulse 1.4s infinite' }} />
            2 LIVE
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: 'auto', background: 'var(--bg)' }}>
        {tab === 'TODAY' && <MTodayTab />}
        {tab === 'GROUPS' && <MGroupsTab />}
        {tab === 'TEAM' && <MTeamTab />}
        {tab === 'NEWS' && <MNewsTab />}
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '2px solid var(--rule)', background: 'var(--paper)',
        paddingBottom: 22,  // home indicator space
      }}>
        {['TODAY', 'GROUPS', 'TEAM', 'NEWS'].map((t, i) => (
          <button key={t} onClick={() => setTab(t)} style={{
            appearance: 'none',
            border: 'none', borderRight: i < 3 ? '1px solid var(--rule)' : 'none',
            background: tab === t ? 'var(--ink)' : 'transparent',
            color: tab === t ? 'var(--paper)' : 'var(--ink)',
            fontFamily: 'var(--font-display)', fontSize: 11,
            padding: '12px 0', cursor: 'pointer', letterSpacing: '0.08em',
          }}>{t}</button>
        ))}
      </div>
    </div>
  );
}

function MTodayTab() {
  const live = window.FIXTURES.filter(f => f.status.startsWith('LIVE'));
  const upcoming = window.FIXTURES.filter(f => !f.status.startsWith('LIVE') && f.status !== 'FT');
  return (
    <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.1em' }}>
        LIVE NOW
      </div>
      {live.map(f => (
        <div key={f.id} style={{ border: '1.5px solid var(--rule)', background: 'var(--paper)', padding: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--live)', letterSpacing: '0.1em', marginBottom: 6 }}>
            <span>● {f.status}</span><span style={{ color: 'var(--ink2)' }}>GROUP {f.group}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 50px 1fr', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <window.FlagSwatch code={f.home} w={20} h={13} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>{f.home}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--accent)', textAlign: 'center' }}>{f.hs ?? 0}–{f.as ?? 0}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>{f.away}</span>
              <window.FlagSwatch code={f.away} w={20} h={13} />
            </div>
          </div>
        </div>
      ))}

      <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--ink)', letterSpacing: '0.1em', marginTop: 6 }}>
        UPCOMING
      </div>
      {upcoming.map(f => (
        <div key={f.id} style={{ border: '1.5px solid var(--rule)', background: 'var(--paper)', padding: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', letterSpacing: '0.1em', marginBottom: 6 }}>
            <span>{f.date} · {f.time}</span><span>GROUP {f.group}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <window.FlagSwatch code={f.home} w={20} h={13} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>{f.home}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)' }}>vs</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>{f.away}</span>
              <window.FlagSwatch code={f.away} w={20} h={13} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
            {['h', 'd', 'a'].map(k => (
              <button key={k} style={{
                appearance: 'none', border: '1.5px solid var(--rule)', background: 'var(--paper2)',
                padding: '6px 0', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                color: 'var(--ink)', cursor: 'pointer',
              }}>
                <div style={{ fontSize: 8, color: 'var(--ink2)', letterSpacing: '0.1em' }}>{k === 'h' ? '1' : k === 'd' ? 'X' : '2'}</div>
                {f.odds[k].toFixed(2)}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MGroupsTab() {
  return (
    <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Object.keys(window.GROUPS).slice(0, 4).map(g => (
        <window.GroupCard key={g} id={g} teams={window.GROUPS[g]} />
      ))}
    </div>
  );
}

function MTeamTab() {
  return (
    <div style={{ padding: 12 }}>
      <div style={{
        background: 'var(--paper)', border: '1.5px solid var(--rule)',
        padding: 14, marginBottom: 10, position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <window.FlagSwatch code="BRA" w={36} h={24} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1 }}>BRAZIL</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', letterSpacing: '0.12em' }}>GROUP D · 1ST · QUALIFIED</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--accent)', lineHeight: 1 }}>4.20</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--ink2)', letterSpacing: '0.1em' }}>OUTRIGHT</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 5, paddingTop: 8, borderTop: '1px dashed var(--rule)' }}>
          {window.BRA_FORM.slice(0, 5).reverse().map((m, i) => <window.FormDot key={i} r={m.result} />)}
        </div>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 6 }}>SQUAD · FORWARDS</div>
      <div style={{ border: '1.5px solid var(--rule)', background: 'var(--paper)' }}>
        {window.BRA_SQUAD.FWD.map((p, i, a) => (
          <div key={p.n} style={{
            display: 'grid', gridTemplateColumns: '36px 1fr 36px',
            padding: '8px 10px', alignItems: 'center', gap: 8,
            borderBottom: i < a.length - 1 ? '1px solid var(--rule)' : 'none',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--accent)', textAlign: 'center' }}>{p.n}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 12 }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)' }}>{p.club}</div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textAlign: 'right' }}>{p.caps}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MNewsTab() {
  return (
    <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {window.NEWS.slice(0, 5).map(n => (
        <div key={n.id} style={{ border: '1.5px solid var(--rule)', background: 'var(--paper)', padding: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{
              background: 'var(--accent)', color: 'var(--paper)',
              fontFamily: 'var(--font-display)', fontSize: 8,
              padding: '2px 5px', letterSpacing: '0.1em',
            }}>{n.tag}</span>
            {n.team !== '—' && <window.FlagSwatch code={n.team} w={14} h={9} />}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)' }}>{n.time} ago</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, lineHeight: 1.2 }}>{n.headline}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { MobileApp });
