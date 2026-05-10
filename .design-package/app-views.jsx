// app-views.jsx — view containers (dashboard, groups, bracket, team, news)

const { useState: uS } = React;

// ────────────────────────────────────────────────────────────
// DASHBOARD
// ────────────────────────────────────────────────────────────
function DashboardView({ oddsFormat, picks, setPicks, setTab, setTeam }) {
  const today = window.FIXTURES.slice(0, 6);
  const live = window.FIXTURES.filter(f => f.status.startsWith('LIVE'));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, padding: 24 }}>
      <div>
        {/* Live strip */}
        {live.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <window.SectionHead kicker="ON THE AIR" title="LIVE NOW" right={`${live.length} MATCHES IN PROGRESS`} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {live.map(f => <LiveCard key={f.id} f={f} />)}
            </div>
          </div>
        )}

        {/* Today's fixtures */}
        <window.SectionHead kicker="MATCHDAY 3" title="TODAY'S FIXTURES" right="ODDS BY OOH+" />
        <div style={{ border: '2px solid var(--rule)', background: 'var(--paper)' }}>
          {today.map(f => (
            <window.FixtureRow key={f.id} f={f} oddsFormat={oddsFormat}
              selected={picks[f.id]}
              onPick={(id, k) => setPicks(p => ({ ...p, [id]: p[id] === k ? null : k }))} />
          ))}
        </div>
      </div>

      {/* Right rail */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <OutrightCard />
        <TopScorerCard />
        <NewsTeaserCard onAll={() => setTab('NEWS')} />
      </aside>
    </div>
  );
}

function LiveCard({ f }) {
  return (
    <div style={{
      border: '2px solid var(--rule)',
      background: 'var(--paper)',
      padding: 12, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--live)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--live)', animation: 'pulse 1.4s infinite' }} />
          <span style={{ letterSpacing: '0.12em' }}>{f.status}</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', letterSpacing: '0.1em' }}>
          GROUP {f.group} · {f.venue}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'center', gap: 10 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24 }}>{f.home}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)' }}>HOME</div>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, textAlign: 'center', color: 'var(--accent)' }}>
          {f.hs ?? 0}–{f.as ?? 0}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24 }}>{f.away}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)' }}>AWAY</div>
        </div>
      </div>
      <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--rule)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)' }}>
        <span>xG {f.id === 3 ? '1.84 — 0.62' : '0.91 — 0.34'}</span>
        <span>POSS {f.id === 3 ? '58 / 42' : '63 / 37'}</span>
        <span>SHOTS {f.id === 3 ? '14 / 6' : '8 / 3'}</span>
      </div>
    </div>
  );
}

function OutrightCard() {
  const odds = [
    { team: 'BRA', name: 'Brazil',   o: 4.20, mv: '−' },
    { team: 'FRA', name: 'France',   o: 4.50, mv: '↓' },
    { team: 'ARG', name: 'Argentina',o: 5.50, mv: '−' },
    { team: 'ESP', name: 'Spain',    o: 8.00, mv: '↑' },
    { team: 'ENG', name: 'England',  o: 9.00, mv: '↓' },
    { team: 'GER', name: 'Germany',  o: 12.0, mv: '↑' },
    { team: 'POR', name: 'Portugal', o: 14.0, mv: '−' },
  ];
  return (
    <div style={{ border: '2px solid var(--rule)', background: 'var(--paper)' }}>
      <div style={{ padding: '8px 12px', borderBottom: '2px solid var(--rule)', background: 'var(--ink)', color: 'var(--paper)', fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.06em' }}>
        OUTRIGHT · WINNER ’26
      </div>
      <div>
        {odds.map((o, i) => (
          <div key={o.team} style={{
            display: 'grid', gridTemplateColumns: '24px 1fr 28px 50px',
            padding: '7px 12px', alignItems: 'center', gap: 8,
            borderBottom: i < odds.length - 1 ? '1px solid var(--rule)' : 'none',
            fontFamily: 'var(--font-serif)', fontSize: 13,
          }}>
            <window.FlagSwatch code={o.team} w={20} h={13} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 12 }}>{o.team} <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink2)', fontWeight: 400 }}>{o.name}</span></span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: o.mv === '↑' ? 'var(--win)' : o.mv === '↓' ? 'var(--lose)' : 'var(--ink2)', textAlign: 'center' }}>{o.mv}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, textAlign: 'right' }}>{o.o.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopScorerCard() {
  const list = [
    { p: 'KANE',     team: 'ENG', g: 4, o: 5.50 },
    { p: 'MBAPPÉ',   team: 'FRA', g: 4, o: 4.50 },
    { p: 'VINI JR.', team: 'BRA', g: 3, o: 6.00 },
    { p: 'L. MARTÍNEZ', team: 'ARG', g: 3, o: 8.00 },
    { p: 'LUKAKU',   team: 'BEL', g: 3, o: 12.0 },
  ];
  return (
    <div style={{ border: '2px solid var(--rule)', background: 'var(--paper)' }}>
      <div style={{ padding: '8px 12px', borderBottom: '2px solid var(--rule)', background: 'var(--accent2)', color: 'var(--ink)', fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.06em' }}>
        GOLDEN BOOT RACE
      </div>
      {list.map((p, i) => (
        <div key={p.p} style={{
          display: 'grid', gridTemplateColumns: '14px 24px 1fr 32px 50px',
          padding: '7px 12px', alignItems: 'center', gap: 8,
          borderBottom: i < list.length - 1 ? '1px solid var(--rule)' : 'none',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--accent)' }}>{i + 1}</span>
          <window.FlagSwatch code={p.team} w={20} h={13} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 12 }}>{p.p}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink2)', textAlign: 'right' }}>{p.g} G</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, textAlign: 'right' }}>{p.o.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}

function NewsTeaserCard({ onAll }) {
  return (
    <div style={{ border: '2px solid var(--rule)', background: 'var(--paper2)', padding: 14 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 8 }}>
        FROM THE WIRE
      </div>
      {window.NEWS.slice(0, 3).map(n => (
        <div key={n.id} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: '1px dashed var(--rule)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', letterSpacing: '0.1em', marginBottom: 3 }}>
            {n.tag} · {n.team} · {n.time} ago
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, lineHeight: 1.35 }}>{n.headline}</div>
        </div>
      ))}
      <button onClick={onAll} style={{
        appearance: 'none', border: '1.5px solid var(--rule)', background: 'transparent',
        fontFamily: 'var(--font-display)', fontSize: 11, padding: '6px 10px',
        color: 'var(--ink)', cursor: 'pointer', letterSpacing: '0.06em', width: '100%',
      }}>READ ALL NEWS →</button>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// GROUPS VIEW
// ────────────────────────────────────────────────────────────
function GroupsView({ setTeam, setTab }) {
  const [filter, setFilter] = uS('ALL');
  const groupKeys = Object.keys(window.GROUPS);
  const visible = filter === 'ALL' ? groupKeys : [filter];

  return (
    <div style={{ padding: 24 }}>
      <window.SectionHead kicker="STAGE 1" title="GROUP STAGE STANDINGS" right="POST-MATCHDAY 3" />

      {/* Filter row */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 18, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)', letterSpacing: '0.12em', marginRight: 6 }}>FILTER ▸</span>
        {['ALL', ...groupKeys].map(k => (
          <button key={k} onClick={() => setFilter(k)} style={{
            appearance: 'none',
            border: filter === k ? '2px solid var(--rule)' : '1.5px solid var(--rule)',
            background: filter === k ? 'var(--ink)' : 'var(--paper)',
            color: filter === k ? 'var(--paper)' : 'var(--ink)',
            fontFamily: 'var(--font-display)', fontSize: 11,
            padding: '5px 10px', cursor: 'pointer', letterSpacing: '0.06em',
          }}>{k === 'ALL' ? 'ALL GROUPS' : `GROUP ${k}`}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {visible.map(g => (
          <window.GroupCard key={g} id={g} teams={window.GROUPS[g]}
            onTeam={(code) => { setTeam(code); setTab('TEAMS'); }} />
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// BRACKET VIEW (Round of 32 → Final)
// ────────────────────────────────────────────────────────────
function BracketView() {
  // Top 2 of each group qualify, simplified pairings.
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
    <div style={{ padding: 24, overflowX: 'auto' }}>
      <window.SectionHead kicker="STAGE 2" title="KNOCKOUT BRACKET" right="ROUND OF 16" />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 28, alignItems: 'stretch', minWidth: 1180,
      }}>
        {/* Round of 16 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <RoundLabel label="ROUND OF 16" date="JUN 19–22" />
          {ko16.map((m, i) => <BracketMatch key={i} m={m} />)}
        </div>

        {/* QF */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'space-around' }}>
          <RoundLabel label="QUARTER" date="JUN 26–28" />
          {[1,2,3,4].map(i => <BracketMatch key={i} m={{ a: 'TBD', b: 'TBD', ao: '—', bo: '—' }} dim />)}
        </div>

        {/* SF */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'space-around' }}>
          <RoundLabel label="SEMI-FINALS" date="JUL 4–5" />
          {[1,2].map(i => <BracketMatch key={i} m={{ a: 'TBD', b: 'TBD', ao: '—', bo: '—' }} dim />)}
        </div>

        {/* 3rd */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'space-around' }}>
          <RoundLabel label="3RD PLACE" date="JUL 12" />
          <BracketMatch m={{ a: 'TBD', b: 'TBD', ao: '—', bo: '—' }} dim />

          {/* Trophy decoration */}
          <div style={{
            border: '2px solid var(--rule)', background: 'var(--paper2)',
            padding: 14, textAlign: 'center', marginTop: 12,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', letterSpacing: '0.16em' }}>WINNER LIFTS</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--accent)', margin: '4px 0' }}>★ THE CUP ★</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', letterSpacing: '0.1em' }}>METLIFE · JUL 13</div>
          </div>
        </div>

        {/* Final */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'space-around' }}>
          <RoundLabel label="FINAL" date="JUL 13" accent />
          <div style={{
            border: '3px solid var(--accent)', background: 'var(--paper)',
            padding: 14, textAlign: 'center', position: 'relative',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--accent)', letterSpacing: '0.1em' }}>THE FINAL</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', margin: '6px 0', letterSpacing: '0.12em' }}>15:00 · METLIFE</div>
            <div style={{ borderTop: '1px dashed var(--rule)', paddingTop: 8, marginTop: 4 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink2)' }}>TBD</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink2)', margin: '4px 0' }}>VS</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ink2)' }}>TBD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoundLabel({ label, date, accent }) {
  return (
    <div style={{
      borderBottom: '2px solid var(--rule)', paddingBottom: 6,
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 13,
        color: accent ? 'var(--accent)' : 'var(--ink)',
        letterSpacing: '0.06em',
      }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', letterSpacing: '0.12em' }}>{date}</div>
    </div>
  );
}

function BracketMatch({ m, dim }) {
  return (
    <div style={{
      border: '1.5px solid var(--rule)', background: 'var(--paper)',
      opacity: dim ? 0.5 : 1,
    }}>
      <Row code={m.a} odds={m.ao} fav={m.ao !== '—' && m.ao < m.bo} />
      <div style={{ borderTop: '1px dashed var(--rule)' }} />
      <Row code={m.b} odds={m.bo} fav={m.bo !== '—' && m.bo < m.ao} />
    </div>
  );
}

function Row({ code, odds, fav }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '24px 1fr 50px',
      padding: '8px 10px', alignItems: 'center', gap: 8,
      background: fav ? 'var(--paper2)' : 'transparent',
    }}>
      {code !== 'TBD' ? <window.FlagSwatch code={code} w={20} h={13} /> : <span />}
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: fav ? 'var(--ink)' : 'var(--ink)' }}>{code}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, textAlign: 'right', color: fav ? 'var(--accent)' : 'var(--ink2)' }}>{odds === '—' ? '—' : odds.toFixed(2)}</span>
    </div>
  );
}

Object.assign(window, { DashboardView, GroupsView, BracketView });
