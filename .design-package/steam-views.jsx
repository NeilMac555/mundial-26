// steam-views.jsx — SteamWatch-style page views

const { useState: svUS, useMemo: svUM } = React;

// ─── Overview card (match card with sparkline + odds) ──────────
function OverviewCard({ f }) {
  const isLive = f.status.startsWith('LIVE');
  const seedH = f.id * 13 + 1;
  const seedA = f.id * 13 + 7;
  const homeSpark = window.genSeries(seedH, 22, 2.4);
  const trendDelta = (homeSpark[homeSpark.length - 1] - homeSpark[0]) / homeSpark[0] * 100;
  const positiveTrend = trendDelta > 0;
  // headline % change for top-right of card
  const headline = (() => {
    const dir = ['H', 'A', 'D'][f.id % 3];
    const v = ((f.id * 7) % 80 - 30) / 1.4;
    return { dir, v: Math.round(v * 10) / 10 };
  })();
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 8, padding: 16,
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <window.FlagSwatch code={f.home} w={20} h={13} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em' }}>WC · GRP {f.group}</span>
        </div>
        <window.SDelta value={headline.v} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
            {window.GROUPS[f.group].find(t => t.code === f.home)?.name || f.home}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
            {window.GROUPS[f.group].find(t => t.code === f.away)?.name || f.away}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          {isLive ? (
            <>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--mint)', fontWeight: 700 }}>
                {f.hs ?? Math.floor(f.id / 3)}–{f.as ?? Math.floor(f.id / 5)}
              </div>
              <window.SChip tone="mint" size="sm">● {f.status}</window.SChip>
            </>
          ) : f.status === 'FT' ? (
            <>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--text)', fontWeight: 700 }}>
                {f.hs}–{f.as}
              </div>
              <window.SLabel>FT</window.SLabel>
            </>
          ) : (
            <>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--text-2)', fontWeight: 600 }}>
                {f.time}
              </div>
              <window.SLabel>{f.date}</window.SLabel>
            </>
          )}
        </div>
      </div>
      <div style={{
        background: 'var(--bg)', borderRadius: 4, padding: '8px 10px',
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <window.SLabel>Home trend</window.SLabel>
        <div style={{ flex: 1 }}>
          <window.Spark
            data={homeSpark}
            color={positiveTrend ? 'var(--mint)' : 'var(--red)'}
            w={160} h={26}
          />
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
          color: positiveTrend ? 'var(--mint)' : 'var(--red)',
        }}>
          {positiveTrend ? '↑' : '↓'} {Math.abs(trendDelta).toFixed(1)}pp
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.1em' }}>1 · X · 2</span>
        <div style={{ flex: 1 }} />
        <window.SOdds value={f.odds.h} trend={f.id % 2 ? 'up' : 'down'} size="sm" />
        <window.SOdds value={f.odds.d} trend={f.id % 3 ? 'down' : 'up'} size="sm" />
        <window.SOdds value={f.odds.a} trend={f.id % 2 ? 'down' : 'up'} size="sm" />
      </div>
    </div>
  );
}

// ─── OVERVIEW PAGE ──────────────────────────────────────────
function SOverview({ group }) {
  const fixtures = group === 'ALL' ? window.FIXTURES : window.FIXTURES.filter(f => f.group === group);
  return (
    <div>
      <window.SPageHead icon="◊" title="Overview" sub={`'26 World Cup · Group Stage MD3 · ${fixtures.length} matches in window`} />
      <div style={{ padding: '0 28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {fixtures.map(f => <OverviewCard key={f.id} f={f} />)}
        </div>
      </div>
    </div>
  );
}

// ─── DRIFTERS / Closing-line style strip ────────────────────
function SDrifters() {
  // Three horizontal cards: HOME / DRAW / AWAY for the featured match
  const f = window.FIXTURES.find(x => x.status.startsWith('LIVE')) || window.FIXTURES[0];
  const items = [
    { lbl: 'HOME · ' + f.home, val: 3.30, open: 2.63, openPp: 30.0, d: 25.5, dir: 'up',   color: 'var(--mint)' },
    { lbl: 'DRAW',              val: 4.37, open: 3.62, openPp: 22.9, d: 20.7, dir: 'up',   color: 'var(--mint)' },
    { lbl: 'AWAY · ' + f.away,  val: 2.00, open: 2.48, openPp: 50.0, d: 19.4, dir: 'down', color: 'var(--red)' },
  ];
  return (
    <div style={{ padding: '0 28px 16px' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
      }}>
        {items.map((it, i) => {
          const series = window.genSeries(i * 17 + 3, 18, it.val * 0.9);
          return (
            <div key={i} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 8, padding: 16,
              display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, alignItems: 'center',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <span style={{ width: 6, height: 6, background: it.color, borderRadius: '50%' }} />
                  <window.SLabel>{it.lbl}</window.SLabel>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {it.val.toFixed(2)}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 4, letterSpacing: '0.04em' }}>
                  Open {it.open.toFixed(2)} · {it.openPp.toFixed(1)}%
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <window.SDelta value={it.dir === 'up' ? it.d : -it.d} />
                <div style={{ background: it.dir === 'up' ? 'rgba(63,209,163,0.06)' : 'rgba(226,93,111,0.06)', borderRadius: 4, padding: '2px 4px' }}>
                  <window.Spark data={it.dir === 'down' ? [...series].reverse() : series} color={it.color} w={84} h={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ODDS MOVEMENT BIG CHART (for overview) ─────────────────
function SMovementChart() {
  const [tab, setTab] = svUS('odds');
  const [range, setRange] = svUS('ALL');
  const ranges = ['1H', '2H', '6H', '12H', '24H', 'ALL'];
  const series = {
    HOME: window.genSeries(11, 38, 2.7),
    DRAW: window.genSeries(22, 38, 3.6),
    AWAY: window.genSeries(33, 38, 2.6),
  };
  const colors = { HOME: 'var(--mint)', DRAW: 'var(--amber)', AWAY: 'var(--red)' };
  const W = 1100, H = 280, pad = 40;
  const all = [...series.HOME, ...series.DRAW, ...series.AWAY];
  const min = Math.min(...all) - 0.05, max = Math.max(...all) + 0.05;
  const span = max - min;
  const toY = v => H - pad - ((v - min) / span) * (H - pad * 2);
  const toX = (i, n) => pad + (i / (n - 1)) * (W - pad * 2);
  const yticks = 5;
  const xLabels = ['16/3 09:54','17/3','18/3','19/3','20/3','21/3','22/3','23/3','24/3','25/3','26/3','27/3','28/3','29/3','30/3','31/3','1/4','3/4','4/4 16:1'];
  return (
    <div style={{ padding: '0 28px 24px' }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
        padding: '18px 18px 14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>
            Odds Movement
          </h3>
          <span style={{ marginLeft: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.04em' }}>
            Dotted = opening
          </span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, background: 'var(--surface2)', padding: 3, borderRadius: 5 }}>
            {ranges.map(r => (
              <button key={r} onClick={() => setRange(r)} style={{
                appearance: 'none', cursor: 'pointer',
                background: range === r ? 'var(--mint)' : 'transparent',
                color: range === r ? 'var(--bg)' : 'var(--text-2)',
                border: 'none', padding: '4px 10px', borderRadius: 3,
                fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
              }}>{r}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {['ODDS', '% CHG', 'IMPLIED'].map(t => (
              <button key={t} onClick={() => setTab(t.toLowerCase())} style={{
                appearance: 'none', cursor: 'pointer',
                background: tab === t.toLowerCase() ? 'var(--surface3)' : 'transparent',
                color: tab === t.toLowerCase() ? 'var(--mint)' : 'var(--text-2)',
                border: tab === t.toLowerCase() ? '1px solid var(--mint-d)' : '1px solid transparent',
                padding: '5px 11px', borderRadius: 4,
                fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
              }}>{t}</button>
            ))}
          </div>
          <div style={{ marginLeft: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
            {Object.entries(series).map(([k]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors[k] }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)' }}>
                  {k === 'HOME' ? 'Mexico' : k === 'DRAW' ? 'Draw' : 'Ghana'}
                </span>
              </div>
            ))}
          </div>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>
            Click again for all
          </span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 280 }}>
          {[...Array(yticks)].map((_, i) => {
            const y = pad + (i / (yticks - 1)) * (H - pad * 2);
            const v = max - (i / (yticks - 1)) * span;
            return (
              <g key={i}>
                <line x1={pad} x2={W - pad} y1={y} y2={y} stroke="var(--border)" strokeDasharray="2,3" strokeWidth="0.5" />
                <text x={pad - 6} y={y + 4} fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-3)" textAnchor="end">
                  {v.toFixed(2)}
                </text>
              </g>
            );
          })}
          {Object.entries(series).map(([k, vals]) => {
            const path = vals.map((v, i) => `${i ? 'L' : 'M'}${toX(i, vals.length).toFixed(1)},${toY(v).toFixed(1)}`).join(' ');
            // dotted opening line
            const opening = vals[0];
            return (
              <g key={k}>
                <line x1={pad} x2={W - pad} y1={toY(opening)} y2={toY(opening)} stroke={colors[k]} strokeOpacity="0.3" strokeDasharray="2,3" strokeWidth="1" />
                <path d={path} fill="none" stroke={colors[k]} strokeWidth="1.6" strokeLinejoin="round" />
              </g>
            );
          })}
          {/* x labels */}
          {xLabels.filter((_, i) => i % 2 === 0).map((lbl, i, arr) => {
            const x = pad + (i / (arr.length - 1)) * (W - pad * 2);
            return (
              <text key={i} x={x} y={H - 12} fontFamily="var(--font-mono)" fontSize="9" fill="var(--text-3)" textAnchor="middle">
                {lbl}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ─── GROUPS ─────────────────────────────────────────────────
function SGroups() {
  return (
    <div>
      <window.SPageHead icon="▦" title="Groups" sub={`'26 World Cup · 8 groups · 32 sides · top 2 advance`} />
      <div style={{ padding: '0 28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {Object.keys(window.GROUPS).map(g => {
            const teams = [...window.GROUPS[g]].sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
            return (
              <div key={g} style={{
                background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
                overflow: 'hidden',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', borderBottom: '1px solid var(--border)',
                  background: 'var(--surface2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 16, height: 12, background: window.GROUP_COLORS[g], borderRadius: 1 }} />
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.04em' }}>GROUP {g}</span>
                  </div>
                  <window.SLabel>MD 3 · COMPLETE</window.SLabel>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface)' }}>
                      {['#', 'TEAM', 'P', 'W', 'D', 'L', 'GD', 'PTS'].map((h, i) => (
                        <th key={h} style={{
                          textAlign: i < 2 ? 'left' : 'right',
                          padding: i === 1 ? '10px 14px 10px 6px' : '10px 14px',
                          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
                          color: 'var(--text-3)', letterSpacing: '0.1em', borderBottom: '1px solid var(--border)',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((t, i) => (
                      <tr key={t.code} style={{
                        borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                        opacity: i < 2 ? 1 : 0.65,
                      }}>
                        <td style={{ padding: '10px 14px', fontSize: 12, color: i < 2 ? 'var(--mint)' : 'var(--text-3)', fontWeight: 600 }}>
                          {i + 1}
                        </td>
                        <td style={{ padding: '10px 14px 10px 6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <window.FlagSwatch code={t.code} w={18} h={12} />
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{t.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontSize: 12, color: 'var(--text-2)' }}>{t.p}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontSize: 12, color: 'var(--text-2)' }}>{t.w}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontSize: 12, color: 'var(--text-2)' }}>{t.d}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontSize: 12, color: 'var(--text-2)' }}>{t.l}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontSize: 12, color: t.gf - t.ga >= 0 ? 'var(--mint)' : 'var(--red)' }}>
                          {t.gf - t.ga > 0 ? '+' : ''}{t.gf - t.ga}
                        </td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: i < 2 ? 'var(--text)' : 'var(--text-2)' }}>{t.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── TEAM P/L ───────────────────────────────────────────────
function STeamPL() {
  const [dir, setDir] = svUS('on');
  // Simulated P/L per team from a £50/match flat-bet on each side to win
  const teams = svUM(() => {
    const r = (n) => ((Math.sin(n * 9.7) + 1) / 2);
    return Object.values(window.GROUPS).flat().map(t => {
      const matches = 16 + Math.floor(r(t.code.charCodeAt(0)) * 20);
      const winRate = 0.20 + r(t.code.charCodeAt(1) || 65) * 0.55;
      const wins = Math.round(matches * winRate);
      const stake = matches * 50;
      const ret = wins * 50 * (1.5 + r(t.code.charCodeAt(2) || 65) * 1.6);
      const pl = Math.round(ret - stake);
      return { ...t, matches, wins, pl, retPct: (pl / stake) * 100 };
    }).sort((a, b) => b.pl - a.pl);
  }, []);
  return (
    <div>
      <window.SPageHead icon="📈" title="Team P/L" sub="'25/26 WORLD CUP · £50 PER MATCH · BET ON EACH TEAM TO WIN" />
      <div style={{ padding: '0 28px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6,
          padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ color: 'var(--text-2)', fontSize: 12 }}>ⓘ</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.06em' }}>
            HOW TO READ THIS TABLE
          </span>
          <span style={{ marginLeft: 'auto', color: 'var(--text-3)', fontSize: 14 }}>⌄</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px 1fr', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <window.SLabel>League</window.SLabel>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 5,
              padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--text)',
            }}>
              <span>World Cup '26</span>
              <span style={{ color: 'var(--text-3)' }}>⌄</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <window.SLabel>Bet direction</window.SLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              <button onClick={() => setDir('on')} style={{
                appearance: 'none', cursor: 'pointer',
                background: dir === 'on' ? 'var(--mint-d)' : 'var(--surface)',
                border: `1px solid ${dir === 'on' ? 'var(--mint)' : 'var(--border)'}`,
                color: dir === 'on' ? 'var(--mint-2)' : 'var(--text-2)',
                padding: '8px 12px', borderRadius: 5,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em' }}>BET ON</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, opacity: 0.8 }}>team wins</span>
              </button>
              <button onClick={() => setDir('against')} style={{
                appearance: 'none', cursor: 'pointer',
                background: dir === 'against' ? 'var(--red-d)' : 'var(--surface)',
                border: `1px solid ${dir === 'against' ? 'var(--red)' : 'var(--border)'}`,
                color: dir === 'against' ? 'var(--red)' : 'var(--text-2)',
                padding: '8px 12px', borderRadius: 5,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em' }}>BET AGAINST</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, opacity: 0.8 }}>team doesn't win</span>
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <window.SLabel>Venue</window.SLabel>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 5,
              padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--text)',
            }}>
              <span>All matches</span>
              <span style={{ color: 'var(--text-3)' }}>⌄</span>
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 6, overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface2)' }}>
                {['TEAM ↕', 'MATCHES ↕', 'WINS ↕', 'PROFIT / LOSS ↕', 'RETURN % ▼'].map((h, i) => (
                  <th key={h} style={{
                    textAlign: i === 0 ? 'left' : 'right',
                    padding: '12px 18px',
                    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
                    color: 'var(--text-3)', letterSpacing: '0.1em',
                    borderBottom: '1px solid var(--border)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teams.slice(0, 14).map((t, i, a) => (
                <tr key={t.code} style={{ borderBottom: i < a.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <window.FlagSwatch code={t.code} w={20} h={13} />
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, color: 'var(--text)', fontWeight: 500 }}>{t.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)' }}>{t.matches}</td>
                  <td style={{ padding: '14px 18px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)' }}>{t.wins}</td>
                  <td style={{
                    padding: '14px 18px', textAlign: 'right',
                    fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
                    color: t.pl > 0 ? 'var(--mint)' : 'var(--red)',
                  }}>{t.pl > 0 ? '+' : ''}£{Math.abs(t.pl)}</td>
                  <td style={{
                    padding: '14px 18px', textAlign: 'right',
                    fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
                    color: t.retPct > 0 ? 'var(--mint)' : 'var(--red)',
                  }}>{t.retPct > 0 ? '+' : ''}{t.retPct.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── BRACKET (compressed ko stage) ──────────────────────────
function SBracket() {
  const r16 = [
    ['ARG', 'POR'], ['ESP', 'BEL'], ['ITA', 'KOR'], ['POL', 'CRO'],
    ['BRA', 'SEN'], ['FRA', 'DEN'], ['ENG', 'EGY'], ['GER', 'NED'],
  ];
  const Cell = ({ a, b, win }) => (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 6, padding: '10px 12px', minWidth: 180,
    }}>
      {[a, b].map(c => (
        <div key={c} style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0',
          opacity: win === c ? 1 : 0.55,
        }}>
          <window.FlagSwatch code={c} w={16} h={11} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{c}</span>
          {win === c && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--mint)' }}>●</span>}
        </div>
      ))}
    </div>
  );
  return (
    <div>
      <window.SPageHead icon="⌬" title="Bracket" sub="Knockout phase · projected paths · live re-pricing" />
      <div style={{ padding: '0 28px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 20 }}>
        <div>
          <window.SLabel>Round of 16</window.SLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
            {r16.map(([a, b], i) => <Cell key={i} a={a} b={b} win={i % 2 ? a : b} />)}
          </div>
        </div>
        <div style={{ paddingTop: 36 }}>
          <window.SLabel>Quarter-finals</window.SLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 60, marginTop: 8 }}>
            <Cell a="POR" b="ESP" win="ESP" />
            <Cell a="ITA" b="POL" win="ITA" />
            <Cell a="SEN" b="FRA" win="FRA" />
            <Cell a="EGY" b="GER" win="GER" />
          </div>
        </div>
        <div style={{ paddingTop: 110 }}>
          <window.SLabel>Semi-finals</window.SLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 180, marginTop: 8 }}>
            <Cell a="ESP" b="ITA" win="ESP" />
            <Cell a="FRA" b="GER" win="FRA" />
          </div>
        </div>
        <div style={{ paddingTop: 250 }}>
          <window.SLabel color="var(--mint)">Final · MetLife · Jul 19</window.SLabel>
          <div style={{ marginTop: 8 }}>
            <div style={{
              background: 'var(--surface)',
              border: '1.5px solid var(--mint)',
              borderRadius: 6, padding: '12px 14px',
              boxShadow: '0 0 0 4px rgba(63,209,163,0.06)',
            }}>
              {[['ESP', 4.50], ['FRA', 3.80]].map(([c, o]) => (
                <div key={c} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0',
                  borderBottom: c === 'ESP' ? '1px dashed var(--border)' : 'none',
                }}>
                  <window.FlagSwatch code={c} w={20} h={13} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
                    {window.GROUPS[Object.keys(window.GROUPS).find(g => window.GROUPS[g].some(t => t.code === c))]?.find(t => t.code === c)?.name || c}
                  </span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--mint)' }}>{o.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 14, background: 'var(--surface2)', borderRadius: 6, padding: 12,
              border: '1px solid var(--border)',
            }}>
              <window.SLabel>Lift the trophy · Top 5</window.SLabel>
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[['BRA', 4.20, 18.5], ['ARG', 5.50, -8.2], ['FRA', 6.00, 12.1], ['ESP', 7.50, 4.4], ['ENG', 8.50, -5.6]].map(([c, o, d]) => (
                  <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <window.FlagSwatch code={c} w={16} h={11} />
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--text)', fontWeight: 500, flex: 1 }}>{c}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{o.toFixed(2)}</span>
                    <window.SDelta value={d} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── WIRE ───────────────────────────────────────────────────
function SWire() {
  const tones = { INJURY: 'red', LINEUP: 'mint', ODDS: 'amber', TRANSFER: 'mute', TACTICS: 'mint', PRESSER: 'mute', WEATHER: 'amber' };
  return (
    <div>
      <window.SPageHead icon="◎" title="Wire" sub="Real-time intelligence · 38 sources · auto-refresh 30s" />
      <div style={{ padding: '0 28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {window.NEWS.map(n => (
            <div key={n.id} style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
              padding: 16, display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <window.SChip tone={tones[n.tag] || 'mute'} size="sm">{n.tag}</window.SChip>
                {n.team !== '—' && <window.FlagSwatch code={n.team} w={16} h={11} />}
                <window.SLabel>{n.source}</window.SLabel>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>{n.time} ago</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14.5, fontWeight: 500, color: 'var(--text)', lineHeight: 1.35, letterSpacing: '-0.005em' }}>
                {n.headline}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SOverview, SDrifters, SMovementChart, SGroups, STeamPL, SBracket, SWire });
