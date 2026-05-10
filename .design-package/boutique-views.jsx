// boutique-views.jsx — Groups, Bracket, Team profile, Wire (boutique theme)

const { useState: bV } = React;

// ────────────────────────────────────────────────────────────
// GROUPS
// ────────────────────────────────────────────────────────────
function BGroupsView({ setTeam, setTab }) {
  const [filter, setFilter] = bV('ALL');
  const keys = Object.keys(window.GROUPS);
  const visible = filter === 'ALL' ? keys : [filter];
  return (
    <div style={{ padding: '32px 28px 60px' }}>
      <window.BSectionHead kicker="Stage one" title="Group standings" right="After matchday 3" />

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22, alignItems: 'center' }}>
        <window.BLabel>Filter</window.BLabel>
        {['ALL', ...keys].map(k => (
          <button key={k} onClick={() => setFilter(k)} style={{
            appearance: 'none', cursor: 'pointer',
            background: filter === k ? 'var(--cream)' : 'transparent',
            color: filter === k ? 'var(--bg)' : 'var(--cream-d)',
            border: `0.5px solid ${filter === k ? 'var(--cream)' : 'var(--rule-2)'}`,
            padding: '5px 12px', borderRadius: 999,
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
          }}>{k === 'ALL' ? 'All groups' : `Group ${k}`}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {visible.map(g => <BGroupCard key={g} id={g} teams={window.GROUPS[g]} onTeam={(c) => { setTeam(c); setTab('Teams'); }} />)}
      </div>
    </div>
  );
}

function BGroupCard({ id, teams, onTeam }) {
  const sorted = [...teams].sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
  return (
    <div style={{
      border: '0.5px solid var(--rule)', borderRadius: 4,
      background: 'var(--surface)', overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 18px', borderBottom: '0.5px solid var(--rule)',
        background: 'var(--surface2)',
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      }}>
        <div>
          <window.BLabel color="var(--gold)">Group {id}</window.BLabel>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--cream)', marginTop: 2 }}>
            {sorted[0].name} &amp; {sorted[1].name}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--cream-mu)', marginTop: 2 }}>
            advance to the Round of 16
          </div>
        </div>
        <window.BPill tone="gold">Settled</window.BPill>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '20px 1fr 26px 26px 26px 36px 50px',
        padding: '8px 16px', borderBottom: '0.5px solid var(--rule)',
        background: 'var(--surface)',
      }}>
        <window.BLabel>#</window.BLabel><window.BLabel>Team</window.BLabel>
        <window.BLabel>W</window.BLabel><window.BLabel>D</window.BLabel><window.BLabel>L</window.BLabel>
        <window.BLabel>+/-</window.BLabel><window.BLabel>Pts</window.BLabel>
      </div>
      {sorted.map((t, i) => {
        const adv = i < 2;
        return (
          <div key={t.code} onClick={() => onTeam && onTeam(t.code)} style={{
            display: 'grid', gridTemplateColumns: '20px 1fr 26px 26px 26px 36px 50px',
            padding: '11px 16px', alignItems: 'center', gap: 4,
            borderBottom: i < sorted.length - 1 ? '0.5px solid var(--rule)' : 'none',
            opacity: adv ? 1 : 0.55, cursor: 'pointer',
            position: 'relative',
          }}>
            {adv && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'var(--gold)' }} />}
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontStyle: 'italic', color: adv ? 'var(--gold)' : 'var(--cream-mu)' }}>{i + 1}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <window.FlagSwatch code={t.code} w={22} h={14} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--cream)' }}>{t.name}</span>
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cream-d)' }}>{t.w}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cream-d)' }}>{t.d}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cream-d)' }}>{t.l}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cream-mu)' }}>{t.gf - t.ga >= 0 ? '+' : ''}{t.gf - t.ga}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--cream)', fontStyle: 'italic' }}>{t.pts}</span>
          </div>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BRACKET
// ────────────────────────────────────────────────────────────
function BBracketView() {
  const ko16 = [
    { a: 'MEX', b: 'NED', ao: 2.40, bo: 2.85 },
    { a: 'ARG', b: 'POR', ao: 1.60, bo: 5.00 },
    { a: 'FRA', b: 'ENG', ao: 2.10, bo: 3.50 },
    { a: 'BRA', b: 'CRO', ao: 1.55, bo: 5.50 },
    { a: 'ESP', b: 'COL', ao: 1.85, bo: 4.20 },
    { a: 'BEL', b: 'GER', ao: 3.10, bo: 2.30 },
    { a: 'ITA', b: 'DEN', ao: 1.90, bo: 4.00 },
    { a: 'POL', b: 'SUI', ao: 2.20, bo: 3.30 },
  ];
  return (
    <div style={{ padding: '32px 28px 60px', overflowX: 'auto' }}>
      <window.BSectionHead kicker="Stage two" title="The knockout draw" right="Round of 16 set" />
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 28, alignItems: 'stretch', minWidth: 1180,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <BRoundLabel label="Round of 16" date="Jun 19–22" />
          {ko16.map((m, i) => <BBracketMatch key={i} m={m} />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'space-around' }}>
          <BRoundLabel label="Quarter-finals" date="Jun 26–28" />
          {[1,2,3,4].map(i => <BBracketMatch key={i} m={{ a: 'TBD', b: 'TBD', ao: '—', bo: '—' }} dim />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'space-around' }}>
          <BRoundLabel label="Semi-finals" date="Jul 4–5" />
          {[1,2].map(i => <BBracketMatch key={i} m={{ a: 'TBD', b: 'TBD', ao: '—', bo: '—' }} dim />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'space-around' }}>
          <BRoundLabel label="3rd place" date="Jul 12" />
          <BBracketMatch m={{ a: 'TBD', b: 'TBD', ao: '—', bo: '—' }} dim />
          <div style={{
            border: '0.5px solid var(--gold)', borderRadius: 4,
            padding: 18, textAlign: 'center', marginTop: 10, background: 'var(--surface)',
          }}>
            <window.BLabel color="var(--gold)">The Cup</window.BLabel>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--gold)', margin: '6px 0', lineHeight: 1.1 }}>
              Lifted at MetLife
            </div>
            <window.BLabel>Sun · Jul 13 · 15:00 ET</window.BLabel>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'space-around' }}>
          <BRoundLabel label="The Final" date="Jul 13" gold />
          <div style={{
            border: '0.5px solid var(--gold)', borderRadius: 4,
            background: 'linear-gradient(180deg, var(--surface2), var(--surface))',
            padding: 22, textAlign: 'center',
          }}>
            <window.BLabel color="var(--gold)">15:00 · MetLife</window.BLabel>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 24, fontStyle: 'italic',
              color: 'var(--cream-mu)', margin: '14px 0', lineHeight: 1.1,
            }}>TBD</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cream-mu)' }}>vs</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 24, fontStyle: 'italic',
              color: 'var(--cream-mu)', margin: '14px 0', lineHeight: 1.1,
            }}>TBD</div>
            <window.BPill tone="gold">Outright leader · BRA 4.20</window.BPill>
          </div>
        </div>
      </div>
    </div>
  );
}

function BRoundLabel({ label, date, gold }) {
  return (
    <div style={{ paddingBottom: 6, borderBottom: '0.5px solid var(--rule)' }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic',
        color: gold ? 'var(--gold)' : 'var(--cream)', fontWeight: 400,
      }}>{label}</div>
      <window.BLabel>{date}</window.BLabel>
    </div>
  );
}

function BBracketMatch({ m, dim }) {
  return (
    <div style={{
      border: '0.5px solid var(--rule)', borderRadius: 3,
      background: 'var(--surface)', opacity: dim ? 0.45 : 1,
    }}>
      <BBRow code={m.a} odds={m.ao} fav={m.ao !== '—' && m.ao < m.bo} />
      <div style={{ borderTop: '0.5px dashed var(--rule)' }} />
      <BBRow code={m.b} odds={m.bo} fav={m.bo !== '—' && m.bo < m.ao} />
    </div>
  );
}

function BBRow({ code, odds, fav }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '24px 1fr 50px',
      padding: '10px 12px', alignItems: 'center', gap: 10,
    }}>
      {code !== 'TBD' ? <window.FlagSwatch code={code} w={20} h={13} /> : <span />}
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: fav ? 'var(--cream)' : 'var(--cream-d)', fontWeight: fav ? 500 : 400 }}>{code}</span>
      <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: fav ? 'var(--gold)' : 'var(--cream-mu)' }}>
        {odds === '—' ? '—' : odds.toFixed(2)}
      </span>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// TEAM PROFILE
// ────────────────────────────────────────────────────────────
function BTeamView({ team, setTeam }) {
  const [tab, setTab] = bV('Squad');
  const all = Object.values(window.GROUPS).flat();
  const t = all.find(x => x.code === team) || all[0];
  return (
    <div style={{ padding: '32px 28px 60px' }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22, alignItems: 'center' }}>
        <window.BLabel>Viewing</window.BLabel>
        {['BRA','ARG','FRA','ENG','ESP','GER','ITA','POR','NED','BEL'].map(c => (
          <button key={c} onClick={() => setTeam(c)} style={{
            appearance: 'none', cursor: 'pointer',
            background: team === c ? 'var(--gold)' : 'transparent',
            color: team === c ? 'var(--bg)' : 'var(--cream-d)',
            border: `0.5px solid ${team === c ? 'var(--gold)' : 'var(--rule-2)'}`,
            padding: '5px 12px', borderRadius: 999,
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <window.FlagSwatch code={c} w={16} h={11} />{c}
          </button>
        ))}
      </div>

      {/* Hero */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 320px',
        border: '0.5px solid var(--rule)', borderRadius: 4,
        background: 'linear-gradient(180deg, var(--surface2), var(--surface))',
        overflow: 'hidden', marginBottom: 0,
      }}>
        <div style={{ padding: '32px 32px 28px', position: 'relative' }}>
          <window.BLabel color="var(--gold)">Group D · 1st place · Qualified for R16</window.BLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 10 }}>
            <window.FlagSwatch code={team} w={56} h={36} />
            <h1 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 400,
              fontStyle: 'italic', color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1,
            }}>{t.name}</h1>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55,
            color: 'var(--cream-mu)', marginTop: 14, maxWidth: 540,
          }}>
            Coach <span style={{ color: 'var(--cream-d)' }}>Dorival Júnior</span>.
            Captain <span style={{ color: 'var(--cream-d)' }}>Marquinhos</span>.
            FIFA Rank <span style={{ color: 'var(--cream-d)' }}>#4</span>.
            Last five: 4 wins, 1 draw — strongest attack of the tournament so far.
          </p>
          <div style={{ display: 'flex', gap: 6, marginTop: 16, alignItems: 'center' }}>
            {window.BRA_FORM.slice(0, 5).reverse().map((m, i) => <window.BFormDot key={i} r={m.result} />)}
            <window.BLabel>Last 5</window.BLabel>
          </div>
        </div>
        <div style={{ borderLeft: '0.5px solid var(--rule)', padding: 24, background: 'var(--surface)' }}>
          <window.BLabel color="var(--gold)">To win the Cup</window.BLabel>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 60, fontStyle: 'italic',
            color: 'var(--gold)', lineHeight: 1, margin: '6px 0',
          }}>4.20</div>
          <window.BPill tone="down">↓ from 4.50 · 7%</window.BPill>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 18 }}>
            <BMicroStat l="Reach Final" v="2.10" />
            <BMicroStat l="Top scorer · Vini" v="6.00" />
            <BMicroStat l="GG tournament" v="1.45" />
            <BMicroStat l="Over 2.5 avg" v="1.72" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', borderLeft: '0.5px solid var(--rule)', borderRight: '0.5px solid var(--rule)',
        borderBottom: '0.5px solid var(--rule)', background: 'var(--surface)',
      }}>
        {['Squad', 'Form', 'Wire'].map((x) => (
          <button key={x} onClick={() => setTab(x)} style={{
            appearance: 'none', flex: 1, cursor: 'pointer',
            background: 'transparent', border: 'none',
            color: tab === x ? 'var(--cream)' : 'var(--cream-mu)',
            padding: '14px 0',
            fontFamily: 'var(--font-display)', fontSize: 15, fontStyle: 'italic',
            position: 'relative',
          }}>
            {x}
            {tab === x && <span style={{
              position: 'absolute', bottom: -1, left: '50%', transform: 'translateX(-50%)',
              width: 32, height: 2, background: 'var(--gold)',
            }} />}
          </button>
        ))}
      </div>

      <div style={{
        border: '0.5px solid var(--rule)', borderTop: 'none',
        background: 'var(--surface)', minHeight: 360, borderRadius: '0 0 4px 4px',
      }}>
        {tab === 'Squad' && <BSquad />}
        {tab === 'Form' && <BForm />}
        {tab === 'Wire' && <BTeamWire />}
      </div>
    </div>
  );
}

function BMicroStat({ l, v }) {
  return (
    <div>
      <window.BLabel>{l}</window.BLabel>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--cream)', fontStyle: 'italic', marginTop: 2 }}>{v}</div>
    </div>
  );
}

function BSquad() {
  const sects = [
    { k: 'GK',  label: 'Goalkeepers' },
    { k: 'DEF', label: 'Defenders' },
    { k: 'MID', label: 'Midfielders' },
    { k: 'FWD', label: 'Forwards' },
  ];
  return (
    <div style={{ padding: 24 }}>
      {sects.map(s => (
        <div key={s.k} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10, paddingBottom: 6, borderBottom: '0.5px solid var(--rule)' }}>
            <window.BLabel color="var(--gold)">{s.k}</window.BLabel>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--cream)' }}>{s.label}</span>
            <span style={{ marginLeft: 'auto' }}><window.BLabel>{window.BRA_SQUAD[s.k].length} players</window.BLabel></span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {window.BRA_SQUAD[s.k].map(p => (
              <div key={p.n} style={{
                display: 'grid', gridTemplateColumns: '36px 1fr 50px',
                padding: '12px 14px', alignItems: 'center', gap: 10,
                background: 'var(--surface2)', borderRadius: 4,
                border: '0.5px solid var(--rule)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic',
                  color: 'var(--gold)', lineHeight: 1,
                }}>{p.n}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--cream)', fontWeight: 500 }}>
                    {p.name.split(' ').map(w => w[0] + w.slice(1).toLowerCase()).join(' ')}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--cream-mu)', letterSpacing: '0.06em' }}>
                    {p.club} · {p.age}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--cream-d)' }}>{p.caps}</div>
                  <window.BLabel>caps</window.BLabel>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BForm() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <window.BLabel color="var(--gold)">Last 5 results</window.BLabel>
        <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column' }}>
          {window.BRA_FORM.map((m, i, a) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '90px 110px 1fr 60px 90px 36px',
              padding: '14px 0', alignItems: 'center', gap: 12,
              borderBottom: i < a.length - 1 ? '0.5px solid var(--rule)' : 'none',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cream-d)' }}>{m.date}</span>
              <window.BLabel>{m.comp}</window.BLabel>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <window.FlagSwatch code={m.opp} w={22} h={14} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--cream)' }}>
                  {(Object.values(window.GROUPS).flat().find(t => t.code === m.opp) || { name: m.opp }).name}
                </span>
                <window.BLabel>{m.venue === 'H' ? 'home' : 'away'}</window.BLabel>
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--cream)' }}>{m.score}</span>
              <window.BLabel>Highlights →</window.BLabel>
              <window.BFormDot r={m.result} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
        <BBar label="Goals / match" val={2.4} max={3} />
        <BBar label="xG / match" val={2.1} max={3} />
        <BBar label="Possession" val={62} max={100} unit="%" />
        <BBar label="Pass accuracy" val={89} max={100} unit="%" />
        <BBar label="Shots / 90" val={16.4} max={20} />
        <BBar label="Clean sheets · 5" val={3} max={5} />
      </div>
    </div>
  );
}

function BBar({ label, val, max, unit = '' }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <window.BLabel>{label}</window.BLabel>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--gold)' }}>{val}{unit}</span>
      </div>
      <div style={{ height: 6, background: 'var(--surface3)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(val/max)*100}%`, background: 'linear-gradient(90deg, var(--gold) 0%, var(--gold-2) 100%)' }} />
      </div>
    </div>
  );
}

function BTeamWire({ team }) {
  const news = window.NEWS.slice(0, 4);
  return (
    <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      {news.map(n => <BNewsCard key={n.id} n={n} />)}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// WIRE
// ────────────────────────────────────────────────────────────
function BWireView() {
  const [filter, setFilter] = bV('ALL');
  const tags = ['ALL', 'INJURY', 'LINEUP', 'ODDS', 'TRANSFER', 'TACTICS', 'PRESSER'];
  const visible = filter === 'ALL' ? window.NEWS : window.NEWS.filter(n => n.tag === filter);
  const lead = window.NEWS[0];
  const rest = filter === 'ALL' ? visible.slice(1) : visible;
  return (
    <div style={{ padding: '32px 28px 60px' }}>
      <window.BSectionHead kicker="The wire" title="Notes &amp; intelligence" right="Updated 14m ago" />

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22, alignItems: 'center' }}>
        <window.BLabel>Filter</window.BLabel>
        {tags.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            appearance: 'none', cursor: 'pointer',
            background: filter === t ? 'var(--cream)' : 'transparent',
            color: filter === t ? 'var(--bg)' : 'var(--cream-d)',
            border: `0.5px solid ${filter === t ? 'var(--cream)' : 'var(--rule-2)'}`,
            padding: '5px 12px', borderRadius: 999,
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
          }}>{t}</button>
        ))}
      </div>

      {filter === 'ALL' && (
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22,
          padding: 22, marginBottom: 22,
          border: '0.5px solid var(--rule)', borderRadius: 4,
          background: 'linear-gradient(180deg, var(--surface2), var(--surface))',
        }}>
          <div style={{
            background: `repeating-linear-gradient(135deg, var(--surface2) 0 8px, var(--surface3) 8px 16px)`,
            border: '0.5px solid var(--rule-2)', borderRadius: 4,
            display: 'grid', placeItems: 'center', minHeight: 220, position: 'relative',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--cream-mu)', letterSpacing: '0.16em', textAlign: 'center', textTransform: 'uppercase' }}>
              [ Training ground photo ]<br/>L. Martínez exits session
            </span>
          </div>
          <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
              <window.BPill tone="down">{lead.tag}</window.BPill>
              <window.FlagSwatch code={lead.team} w={20} h={13} />
              <window.BLabel>{lead.team} · {lead.time} ago</window.BLabel>
            </div>
            <h2 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontSize: 32, fontStyle: 'italic',
              fontWeight: 400, color: 'var(--cream)', letterSpacing: '-0.01em', lineHeight: 1.1,
            }}>{lead.headline}</h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6,
              color: 'var(--cream-mu)', marginTop: 16,
            }}>
              The Albiceleste centre-back left Tuesday's session in the final 20 minutes after a heavy
              challenge in a possession drill, prompting concern ahead of Saturday's Round of 16 fixture.
              A scan is scheduled for Wednesday morning; sources close to the camp described the issue
              as "muscular, not ligament."
            </p>
            <div style={{ marginTop: 16 }}>
              <window.BLabel>Via {lead.source} · Buenos Aires</window.BLabel>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {rest.map(n => <BNewsCard key={n.id} n={n} />)}
      </div>
    </div>
  );
}

function BNewsCard({ n }) {
  const tone = n.tag === 'INJURY' ? 'down' : n.tag === 'ODDS' ? 'gold' : n.tag === 'LINEUP' ? 'up' : 'cream';
  return (
    <div style={{
      border: '0.5px solid var(--rule)', borderRadius: 4,
      background: 'var(--surface)', padding: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <window.BPill tone={tone}>{n.tag}</window.BPill>
        {n.team !== '—' && <window.FlagSwatch code={n.team} w={16} h={11} />}
        <window.BLabel>{n.team !== '—' ? n.team : 'General'} · {n.time} ago</window.BLabel>
      </div>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 16, lineHeight: 1.25,
        color: 'var(--cream)', fontStyle: 'italic', fontWeight: 400,
      }}>{n.headline}</div>
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: '0.5px dashed var(--rule)' }}>
        <window.BLabel>via {n.source}</window.BLabel>
      </div>
    </div>
  );
}

Object.assign(window, {
  BGroupsView, BBracketView, BTeamView, BWireView, BNewsCard,
});
