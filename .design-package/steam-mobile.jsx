// steam-mobile.jsx — Mobile companion (SteamWatch theme)

const { useState: smUS } = React;

function SMobileApp() {
  const [tab, setTab] = smUS('Now');
  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-body)', color: 'var(--text)',
      overflow: 'hidden',
    }}>
      {/* Top bar */}
      <div style={{
        background: 'var(--bg)', borderBottom: '1px solid var(--border)',
        padding: '12px 14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <window.SLogo />
          <span style={{ marginLeft: 'auto' }}><window.SChip tone="mint" size="sm">● LIVE</window.SChip></span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {tab === 'Now' && <SMNow />}
        {tab === 'Groups' && <SMGroups />}
        {tab === 'Trophy' && <SMTrophy />}
        {tab === 'Wire' && <SMWire />}
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid var(--border)', background: 'var(--surface)',
        paddingBottom: 22,
      }}>
        {['Now', 'Groups', 'Trophy', 'Wire'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            appearance: 'none', background: 'transparent', border: 'none', cursor: 'pointer',
            color: tab === t ? 'var(--mint)' : 'var(--text-2)',
            padding: '12px 0', position: 'relative',
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            {t}
            {tab === t && <span style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: 28, height: 2, background: 'var(--mint)',
            }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

function SMNow() {
  const live = window.FIXTURES.filter(f => f.status.startsWith('LIVE'));
  const up = window.FIXTURES.filter(f => !f.status.startsWith('LIVE') && f.status !== 'FT');
  return (
    <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {live.length > 0 && <window.SLabel>● Live now</window.SLabel>}
      {live.map(f => {
        const series = window.genSeries(f.id * 13, 18, 2.5);
        return (
          <div key={f.id} style={{
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
            padding: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <window.SChip tone="mint" size="sm">● {f.status}</window.SChip>
              <window.SLabel>WC · GRP {f.group}</window.SLabel>
              <span style={{ marginLeft: 'auto' }}><window.SDelta value={-12.4} size="sm" /></span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <window.FlagSwatch code={f.home} w={18} h={12} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
                    {window.GROUPS[f.group].find(t => t.code === f.home)?.name || f.home}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <window.FlagSwatch code={f.away} w={18} h={12} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
                    {window.GROUPS[f.group].find(t => t.code === f.away)?.name || f.away}
                  </span>
                </div>
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--mint)',
              }}>{f.hs ?? 1}–{f.as ?? 0}</div>
            </div>
            <div style={{
              marginTop: 10, background: 'var(--bg)', borderRadius: 4, padding: '6px 8px',
              border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <window.SLabel>Trend</window.SLabel>
              <div style={{ flex: 1 }}><window.Spark data={series} w={140} h={22} /></div>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <window.SOdds value={f.odds.h} trend="up" size="sm" />
              <window.SOdds value={f.odds.d} trend="down" size="sm" />
              <window.SOdds value={f.odds.a} trend="up" size="sm" />
            </div>
          </div>
        );
      })}
      <window.SLabel>Upcoming</window.SLabel>
      {up.map(f => (
        <div key={f.id} style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
          padding: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <window.SLabel>{f.date} · {f.time}</window.SLabel>
            <span style={{ marginLeft: 'auto' }}><window.SLabel>GRP {f.group}</window.SLabel></span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <window.FlagSwatch code={f.home} w={18} h={12} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600 }}>{f.home}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>VS</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600 }}>{f.away}</span>
              <window.FlagSwatch code={f.away} w={18} h={12} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
            <window.SOdds value={f.odds.h} trend="up" size="sm" />
            <window.SOdds value={f.odds.d} trend="down" size="sm" />
            <window.SOdds value={f.odds.a} trend="up" size="sm" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SMGroups() {
  return (
    <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {Object.keys(window.GROUPS).slice(0, 4).map(g => {
        const sorted = [...window.GROUPS[g]].sort((a, b) => b.pts - a.pts);
        return (
          <div key={g} style={{
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '10px 12px', borderBottom: '1px solid var(--border)',
              background: 'var(--surface2)', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 14, height: 10, background: window.GROUP_COLORS[g], borderRadius: 1 }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.04em' }}>
                GROUP {g}
              </span>
            </div>
            {sorted.map((t, i, a) => (
              <div key={t.code} style={{
                display: 'grid', gridTemplateColumns: '20px 22px 1fr auto auto',
                padding: '10px 12px', alignItems: 'center', gap: 8,
                opacity: i < 2 ? 1 : 0.6,
                borderBottom: i < a.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                  color: i < 2 ? 'var(--mint)' : 'var(--text-3)',
                }}>{i + 1}</span>
                <window.FlagSwatch code={t.code} w={18} h={12} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--text)' }}>{t.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.gf - t.ga >= 0 ? 'var(--mint)' : 'var(--red)' }}>
                  {t.gf - t.ga > 0 ? '+' : ''}{t.gf - t.ga}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)', minWidth: 18, textAlign: 'right' }}>{t.pts}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function SMTrophy() {
  const list = [
    { c: 'BRA', o: 4.20, d: 18.5, n: 'Brazil' },
    { c: 'ARG', o: 5.50, d: -8.2, n: 'Argentina' },
    { c: 'FRA', o: 6.00, d: 12.1, n: 'France' },
    { c: 'ESP', o: 7.50, d: 4.4,  n: 'Spain' },
    { c: 'ENG', o: 8.50, d: -5.6, n: 'England' },
    { c: 'GER', o: 11.0, d: 22.0, n: 'Germany' },
    { c: 'POR', o: 13.0, d: -3.1, n: 'Portugal' },
    { c: 'NED', o: 16.0, d: 7.8,  n: 'Netherlands' },
  ];
  return (
    <div style={{ padding: 12 }}>
      <window.SLabel>Lift the trophy</window.SLabel>
      <div style={{
        marginTop: 8,
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
      }}>
        {list.map((t, i, a) => {
          const series = window.genSeries(t.c.charCodeAt(0), 22, t.o * 0.9);
          return (
            <div key={t.c} style={{
              padding: '12px 14px',
              borderBottom: i < a.length - 1 ? '1px solid var(--border)' : 'none',
              display: 'grid', gridTemplateColumns: '20px 22px 1fr 70px auto auto',
              alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', fontWeight: 700 }}>
                {(i + 1).toString().padStart(2, '0')}
              </span>
              <window.FlagSwatch code={t.c} w={18} h={12} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{t.n}</span>
              <window.Spark data={t.d > 0 ? series : [...series].reverse()} color={t.d > 0 ? 'var(--mint)' : 'var(--red)'} w={70} h={20} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{t.o.toFixed(2)}</span>
              <window.SDelta value={t.d} size="sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SMWire() {
  const tones = { INJURY: 'red', LINEUP: 'mint', ODDS: 'amber', TRANSFER: 'mute', TACTICS: 'mint', PRESSER: 'mute', WEATHER: 'amber' };
  return (
    <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {window.NEWS.slice(0, 7).map(n => (
        <div key={n.id} style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
          padding: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <window.SChip tone={tones[n.tag] || 'mute'} size="sm">{n.tag}</window.SChip>
            {n.team !== '—' && <window.FlagSwatch code={n.team} w={14} h={9} />}
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)' }}>{n.time} ago</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1.35 }}>
            {n.headline}
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { SMobileApp });
