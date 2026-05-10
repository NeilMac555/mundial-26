// boutique-mobile.jsx — Mobile companion (boutique theme)

const { useState: bM } = React;

function BMobileApp() {
  const [tab, setTab] = bM('Today');
  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-body)', color: 'var(--cream)',
      overflow: 'hidden',
    }}>
      {/* Mast */}
      <div style={{
        background: 'var(--surface)', borderBottom: '0.5px solid var(--rule)',
        padding: '12px 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <window.BMonogram />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontStyle: 'italic', color: 'var(--cream)', letterSpacing: '-0.005em', lineHeight: 1 }}>
              Mundial<span style={{ color: 'var(--gold)' }}>·</span>House
            </div>
            <window.BLabel>Matchday 3 · Sun 14 Jun</window.BLabel>
          </div>
          <window.BPill tone="live">● 2 Live</window.BPill>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: 'auto', background: 'var(--bg)' }}>
        {tab === 'Today' && <BMTodayTab />}
        {tab === 'Groups' && <BMGroupsTab />}
        {tab === 'Team' && <BMTeamTab />}
        {tab === 'Wire' && <BMWireTab />}
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '0.5px solid var(--rule)', background: 'var(--surface)',
        paddingBottom: 22,
      }}>
        {['Today', 'Groups', 'Team', 'Wire'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            appearance: 'none', background: 'transparent', border: 'none', cursor: 'pointer',
            color: tab === t ? 'var(--cream)' : 'var(--cream-mu)',
            padding: '14px 0', position: 'relative',
            fontFamily: 'var(--font-display)', fontSize: 14, fontStyle: 'italic',
          }}>
            {t}
            {tab === t && <span style={{
              position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
              width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)',
            }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

function BMTodayTab() {
  const live = window.FIXTURES.filter(f => f.status.startsWith('LIVE'));
  const up = window.FIXTURES.filter(f => !f.status.startsWith('LIVE') && f.status !== 'FT');
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {live.length > 0 && <window.BLabel color="var(--gold)">In play</window.BLabel>}
      {live.map(f => (
        <div key={f.id} style={{
          border: '0.5px solid var(--rule)', borderRadius: 4,
          background: 'linear-gradient(180deg, var(--surface2), var(--surface))', padding: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <window.BPill tone="live">● {f.status}</window.BPill>
            <window.BLabel>Group {f.group}</window.BLabel>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <window.FlagSwatch code={f.home} w={22} h={14} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontStyle: 'italic' }}>{f.home}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontStyle: 'italic', color: 'var(--gold)', textAlign: 'center' }}>
              {f.hs ?? 0}–{f.as ?? 0}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontStyle: 'italic' }}>{f.away}</span>
              <window.FlagSwatch code={f.away} w={22} h={14} />
            </div>
          </div>
        </div>
      ))}

      <window.BLabel>Upcoming</window.BLabel>
      {up.map(f => (
        <div key={f.id} style={{
          border: '0.5px solid var(--rule)', borderRadius: 4,
          background: 'var(--surface)', padding: 14,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <window.BLabel>{f.date} · {f.time}</window.BLabel>
            <window.BLabel>Group {f.group}</window.BLabel>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <window.FlagSwatch code={f.home} w={22} h={14} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic' }}>{f.home}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cream-mu)' }}>vs</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic' }}>{f.away}</span>
              <window.FlagSwatch code={f.away} w={22} h={14} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {['h', 'd', 'a'].map(k => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <window.BLabel>{k === 'h' ? '1' : k === 'd' ? 'X' : '2'}</window.BLabel>
                <window.BOdds value={f.odds[k]} size="sm" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BMGroupsTab() {
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {Object.keys(window.GROUPS).slice(0, 4).map(g => {
        const sorted = [...window.GROUPS[g]].sort((a, b) => b.pts - a.pts);
        return (
          <div key={g} style={{
            border: '0.5px solid var(--rule)', borderRadius: 4,
            background: 'var(--surface)', overflow: 'hidden',
          }}>
            <div style={{ padding: '12px 14px', borderBottom: '0.5px solid var(--rule)', background: 'var(--surface2)' }}>
              <window.BLabel color="var(--gold)">Group {g}</window.BLabel>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic' }}>
                {sorted[0].name} &amp; {sorted[1].name}
              </div>
            </div>
            {sorted.map((t, i, a) => (
              <div key={t.code} style={{
                display: 'grid', gridTemplateColumns: '20px 24px 1fr 30px',
                padding: '9px 14px', alignItems: 'center', gap: 8,
                opacity: i < 2 ? 1 : 0.5,
                borderBottom: i < a.length - 1 ? '0.5px solid var(--rule)' : 'none',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontStyle: 'italic', color: i < 2 ? 'var(--gold)' : 'var(--cream-mu)' }}>{i + 1}</span>
                <window.FlagSwatch code={t.code} w={20} h={13} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13 }}>{t.name}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontStyle: 'italic', color: 'var(--cream)', textAlign: 'right' }}>{t.pts}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function BMTeamTab() {
  return (
    <div style={{ padding: 14 }}>
      <div style={{
        border: '0.5px solid var(--rule)', borderRadius: 4,
        background: 'linear-gradient(180deg, var(--surface2), var(--surface))',
        padding: 16, marginBottom: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <window.FlagSwatch code="BRA" w={36} h={24} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic' }}>Brazil</div>
            <window.BLabel>Group D · 1st · Qualified</window.BLabel>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--gold)' }}>4.20</div>
            <window.BLabel>Outright</window.BLabel>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 5, paddingTop: 10, borderTop: '0.5px dashed var(--rule)', alignItems: 'center' }}>
          {window.BRA_FORM.slice(0, 5).reverse().map((m, i) => <window.BFormDot key={i} r={m.result} />)}
          <span style={{ marginLeft: 6 }}><window.BLabel>Last 5</window.BLabel></span>
        </div>
      </div>
      <window.BLabel color="var(--gold)">Squad · forwards</window.BLabel>
      <div style={{ marginTop: 6, border: '0.5px solid var(--rule)', borderRadius: 4, background: 'var(--surface)' }}>
        {window.BRA_SQUAD.FWD.map((p, i, a) => (
          <div key={p.n} style={{
            display: 'grid', gridTemplateColumns: '32px 1fr 32px',
            padding: '11px 14px', alignItems: 'center', gap: 10,
            borderBottom: i < a.length - 1 ? '0.5px solid var(--rule)' : 'none',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--gold)' }}>{p.n}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream)' }}>
                {p.name.split(' ').map(w => w[0] + w.slice(1).toLowerCase()).join(' ')}
              </div>
              <window.BLabel>{p.club}</window.BLabel>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cream-d)', textAlign: 'right' }}>{p.caps}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BMWireTab() {
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {window.NEWS.slice(0, 6).map(n => {
        const tone = n.tag === 'INJURY' ? 'down' : n.tag === 'ODDS' ? 'gold' : 'cream';
        return (
          <div key={n.id} style={{
            border: '0.5px solid var(--rule)', borderRadius: 4,
            background: 'var(--surface)', padding: 14,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <window.BPill tone={tone}>{n.tag}</window.BPill>
              {n.team !== '—' && <window.FlagSwatch code={n.team} w={14} h={9} />}
              <window.BLabel>{n.time} ago</window.BLabel>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.25 }}>{n.headline}</div>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { BMobileApp });
