// app-team-news.jsx — Team profile (with tabs) and News feed views

const { useState: uS2 } = React;

// ────────────────────────────────────────────────────────────
// TEAM PROFILE — tabbed (Squad / Form / News)
// ────────────────────────────────────────────────────────────
function TeamView({ team, setTeam }) {
  const [tab, setTab] = uS2('SQUAD');
  // For prototype we always show Brazil's full data; team picker switches the header.
  const data = window.GROUPS.D.find(t => t.code === team) || window.GROUPS.D[0];

  return (
    <div style={{ padding: 24 }}>
      {/* Team picker chip row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)', letterSpacing: '0.12em', marginRight: 4 }}>VIEWING ▸</span>
        {['BRA', 'ARG', 'FRA', 'ENG', 'ESP', 'GER', 'ITA', 'POR', 'NED', 'BEL'].map(code => (
          <button key={code} onClick={() => setTeam(code)} style={{
            appearance: 'none',
            border: team === code ? '2px solid var(--accent)' : '1.5px solid var(--rule)',
            background: team === code ? 'var(--accent)' : 'var(--paper)',
            color: team === code ? 'var(--paper)' : 'var(--ink)',
            fontFamily: 'var(--font-display)', fontSize: 11, padding: '5px 10px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <window.FlagSwatch code={code} w={16} h={11} />{code}
          </button>
        ))}
      </div>

      {/* Hero card */}
      <div style={{
        background: 'var(--paper)', border: '2px solid var(--rule)',
        display: 'grid', gridTemplateColumns: '160px 1fr 280px', position: 'relative',
        marginBottom: 0,
      }}>
        {/* crest panel */}
        <div style={{
          background: window.GROUP_COLORS[data?.code === 'BRA' ? 'D' : 'A'] || 'var(--accent)',
          borderRight: '2px solid var(--rule)',
          display: 'grid', placeItems: 'center', position: 'relative', minHeight: 160,
        }}>
          <window.FlagSwatch code={team} w={80} h={54} />
          <div style={{
            position: 'absolute', bottom: 8, left: 0, right: 0, textAlign: 'center',
            fontFamily: 'var(--font-display)', fontSize: 32, color: '#f4ecd6',
            letterSpacing: '0.04em', textShadow: '2px 2px 0 rgba(0,0,0,0.2)',
          }}>{team}</div>
        </div>

        {/* Center info */}
        <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)', letterSpacing: '0.16em', marginBottom: 4 }}>
              GROUP D · 1ST PLACE · QUALIFIED FOR R16
            </div>
            <h1 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontSize: 42, lineHeight: 1,
              color: 'var(--ink)', letterSpacing: '0.005em', textTransform: 'uppercase',
            }}>{teamName(team)}</h1>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, fontStyle: 'italic', color: 'var(--ink2)', marginTop: 4 }}>
              Coach: Dorival Júnior · Captain: Marquinhos · FIFA Rank #4
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {(window.BRA_FORM).slice(0, 5).reverse().map((m, i) => <window.FormDot key={i} r={m.result} />)}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)', alignSelf: 'center', marginLeft: 4, letterSpacing: '0.1em' }}>
              LAST 5 · 4W 1D
            </span>
          </div>
        </div>

        {/* Right odds card */}
        <div style={{ borderLeft: '2px solid var(--rule)', padding: '14px 16px', background: 'var(--paper2)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', letterSpacing: '0.16em', marginBottom: 6 }}>OUTRIGHT WINNER</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--accent)', lineHeight: 1 }}>4.20</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)', marginTop: 4 }}>WAS 4.50 · ↓ 7%</div>

          <div style={{ borderTop: '1px dashed var(--rule)', margin: '10px 0', paddingTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Stat l="TO REACH FINAL" v="2.10" />
            <Stat l="TOP SCORER" v="VINI 6.00" />
            <Stat l="GG TOURNAMENT" v="1.45" />
            <Stat l="OVER 2.5 AVG" v="1.72" />
          </div>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ display: 'flex', borderLeft: '2px solid var(--rule)', borderRight: '2px solid var(--rule)' }}>
        {['SQUAD', 'FORM', 'NEWS'].map((t, i) => (
          <button key={t} onClick={() => setTab(t)} style={{
            appearance: 'none', flex: 1,
            border: 'none', borderBottom: '2px solid var(--rule)',
            borderRight: i < 2 ? '1.5px solid var(--rule)' : 'none',
            background: tab === t ? 'var(--ink)' : 'var(--paper2)',
            color: tab === t ? 'var(--paper)' : 'var(--ink)',
            fontFamily: 'var(--font-display)', fontSize: 13,
            padding: '12px 0', cursor: 'pointer', letterSpacing: '0.1em',
          }}>{t}</button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{
        border: '2px solid var(--rule)', borderTop: 'none',
        background: 'var(--paper)', minHeight: 360,
      }}>
        {tab === 'SQUAD' && <SquadTab />}
        {tab === 'FORM' && <FormTab />}
        {tab === 'NEWS' && <TeamNewsTab team={team} />}
      </div>
    </div>
  );
}

function teamName(code) {
  const all = Object.values(window.GROUPS).flat();
  return (all.find(t => t.code === code) || { name: code }).name.toUpperCase();
}

function Stat({ l, v }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--ink2)', letterSpacing: '0.12em' }}>{l}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--ink)', marginTop: 1 }}>{v}</div>
    </div>
  );
}

// ─── Squad sub-tab ──────────────────────────────────────────
function SquadTab() {
  const sections = [
    { k: 'GK',  label: 'GOALKEEPERS', color: 'var(--accent4)' },
    { k: 'DEF', label: 'DEFENDERS',   color: 'var(--accent3)' },
    { k: 'MID', label: 'MIDFIELDERS', color: 'var(--accent2)' },
    { k: 'FWD', label: 'FORWARDS',    color: 'var(--accent)' },
  ];
  return (
    <div style={{ padding: 18 }}>
      {sections.map(s => (
        <div key={s.k} style={{ marginBottom: 18 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
            paddingBottom: 4, borderBottom: '1.5px solid var(--rule)',
          }}>
            <span style={{
              background: s.color, color: '#f4ecd6',
              fontFamily: 'var(--font-display)', fontSize: 11,
              padding: '3px 8px', letterSpacing: '0.08em',
            }}>{s.k}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.06em', color: 'var(--ink)' }}>{s.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)', marginLeft: 'auto', letterSpacing: '0.1em' }}>
              {window.BRA_SQUAD[s.k].length} PLAYERS
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--rule)' }}>
            {window.BRA_SQUAD[s.k].map((p, i, arr) => (
              <div key={p.n} style={{
                display: 'grid', gridTemplateColumns: '40px 1fr 50px',
                padding: '8px 10px', alignItems: 'center', gap: 8,
                borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--rule)' : 'none',
                borderBottom: i < arr.length - (arr.length % 3 || 3) ? '1px solid var(--rule)' : 'none',
                background: 'var(--paper2)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 22,
                  color: s.color, textAlign: 'center', lineHeight: 1,
                }}>{p.n}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.02em', color: 'var(--ink)' }}>{p.name}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', letterSpacing: '0.06em' }}>
                    {p.club} · AGE {p.age}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink)' }}>{p.caps}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--ink2)', letterSpacing: '0.1em' }}>CAPS</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Form sub-tab ───────────────────────────────────────────
function FormTab() {
  return (
    <div style={{ padding: 18 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.06em', marginBottom: 10, paddingBottom: 4, borderBottom: '1.5px solid var(--rule)' }}>
        LAST 5 RESULTS
      </div>
      <table style={{
        width: '100%', borderCollapse: 'collapse',
        fontFamily: 'var(--font-serif)', fontSize: 13,
      }}>
        <thead>
          <tr style={{ background: 'var(--paper2)' }}>
            {['DATE', 'COMP', 'OPP', 'V', 'SCORE', 'RES', ''].map(h => (
              <th key={h} style={{
                padding: '8px 10px', textAlign: 'left',
                borderBottom: '1.5px solid var(--rule)',
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: 'var(--ink2)', letterSpacing: '0.12em',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {window.BRA_FORM.map((m, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--rule)' }}>
              <td style={{ padding: '10px', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{m.date}</td>
              <td style={{ padding: '10px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)', letterSpacing: '0.1em' }}>{m.comp}</td>
              <td style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <window.FlagSwatch code={m.opp} w={20} h={13} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 12 }}>{m.opp}</span>
              </td>
              <td style={{ padding: '10px', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{m.venue}</td>
              <td style={{ padding: '10px', fontFamily: 'var(--font-display)', fontSize: 16 }}>{m.score}</td>
              <td style={{ padding: '10px' }}><window.FormDot r={m.result} /></td>
              <td style={{ padding: '10px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)' }}>HIGHLIGHTS →</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Stats bars */}
      <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Bar label="GOALS PER MATCH" val={2.4} max={3} unit="" />
        <Bar label="xG PER MATCH" val={2.1} max={3} unit="" />
        <Bar label="POSSESSION" val={62} max={100} unit="%" />
        <Bar label="PASS ACC." val={89} max={100} unit="%" />
        <Bar label="SHOTS / 90" val={16.4} max={20} unit="" />
        <Bar label="CLEAN SHEETS (5)" val={3} max={5} unit="" />
      </div>
    </div>
  );
}

function Bar({ label, val, max, unit }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)', letterSpacing: '0.12em' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--accent)' }}>{val}{unit}</span>
      </div>
      <div style={{
        height: 12, border: '1.5px solid var(--rule)', background: 'var(--paper2)',
        marginTop: 4, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          width: `${(val / max) * 100}%`,
          background: `repeating-linear-gradient(45deg, var(--accent) 0 6px, var(--accent4) 6px 12px)`,
        }} />
      </div>
    </div>
  );
}

// ─── Team news sub-tab ──────────────────────────────────────
function TeamNewsTab({ team }) {
  const teamNews = window.NEWS.filter(n => n.team === team || n.team === 'BRA');
  return (
    <div style={{ padding: 18 }}>
      {teamNews.length === 0 && (
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--ink2)', fontStyle: 'italic' }}>
          No team-specific stories on the wire. Try the main NEWS tab.
        </div>
      )}
      {teamNews.map(n => <NewsCard key={n.id} n={n} />)}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// NEWS VIEW
// ────────────────────────────────────────────────────────────
function NewsView() {
  const [filter, setFilter] = uS2('ALL');
  const tags = ['ALL', 'INJURY', 'LINEUP', 'ODDS', 'TRANSFER', 'TACTICS', 'PRESSER'];
  const visible = filter === 'ALL' ? window.NEWS : window.NEWS.filter(n => n.tag === filter);

  // Lead headline
  const lead = window.NEWS[0];
  const rest = visible.slice(filter === 'ALL' ? 1 : 0);

  return (
    <div style={{ padding: 24 }}>
      <window.SectionHead kicker="WIRE" title="NEWS &amp; NOTES" right="UPDATED 14m AGO" />

      {/* Filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)', letterSpacing: '0.12em' }}>FILTER ▸</span>
        {tags.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            appearance: 'none',
            border: '1.5px solid var(--rule)',
            background: filter === t ? 'var(--ink)' : 'var(--paper)',
            color: filter === t ? 'var(--paper)' : 'var(--ink)',
            fontFamily: 'var(--font-display)', fontSize: 11,
            padding: '5px 10px', cursor: 'pointer', letterSpacing: '0.06em',
          }}>{t}</button>
        ))}
      </div>

      {/* Lead */}
      {filter === 'ALL' && (
        <div style={{
          border: '2px solid var(--rule)', background: 'var(--paper)',
          padding: 22, marginBottom: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22,
        }}>
          <div style={{
            background: `repeating-linear-gradient(135deg, var(--paper2) 0 8px, var(--paper) 8px 16px)`,
            border: '1.5px solid var(--rule)',
            display: 'grid', placeItems: 'center', minHeight: 200, position: 'relative',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)', letterSpacing: '0.16em', textAlign: 'center' }}>
              [ TRAINING GROUND PHOTO ]<br/>L. MARTÍNEZ EXITS SESSION
            </div>
            <window.Stamp rotate={-8} color="var(--lose)">EXCLUSIVE</window.Stamp>
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--lose)',
              letterSpacing: '0.16em', marginBottom: 8,
            }}>
              {lead.tag} · {lead.team} · {lead.time} AGO
            </div>
            <h2 style={{
              margin: 0, fontFamily: 'var(--font-display)', fontSize: 30, lineHeight: 1.05,
              color: 'var(--ink)', letterSpacing: '0.005em',
            }}>{lead.headline}</h2>
            <p style={{
              fontFamily: 'var(--font-serif)', fontSize: 13, lineHeight: 1.55,
              color: 'var(--ink2)', marginTop: 12,
            }}>
              The Albiceleste centre-back left Tuesday's session in the final 20 minutes after a heavy challenge in a possession drill, prompting concern ahead of Saturday's Round of 16 fixture. A scan is scheduled for Wednesday morning; sources close to the camp described the issue as "muscular, not ligament."
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink2)' }}>
              <span>{lead.source}</span><span>·</span><span>BUENOS AIRES</span>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {rest.map(n => <NewsCard key={n.id} n={n} />)}
      </div>
    </div>
  );
}

function NewsCard({ n }) {
  const tagColor = {
    INJURY: 'var(--lose)', LINEUP: 'var(--accent3)', ODDS: 'var(--accent)',
    TRANSFER: 'var(--accent4)', TACTICS: 'var(--accent2)', PRESSER: 'var(--ink2)',
    WEATHER: 'var(--ink2)',
  };
  return (
    <div style={{
      border: '1.5px solid var(--rule)', background: 'var(--paper)',
      padding: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{
          background: tagColor[n.tag] || 'var(--ink2)', color: '#f4ecd6',
          fontFamily: 'var(--font-display)', fontSize: 9,
          padding: '2px 6px', letterSpacing: '0.1em',
        }}>{n.tag}</span>
        {n.team !== '—' && <window.FlagSwatch code={n.team} w={16} h={11} />}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink2)' }}>{n.team !== '—' ? n.team : 'GENERAL'} · {n.time} ago</span>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, lineHeight: 1.2, color: 'var(--ink)', letterSpacing: '0.005em' }}>
        {n.headline}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink2)', marginTop: 10, letterSpacing: '0.1em', borderTop: '1px dashed var(--rule)', paddingTop: 8 }}>
        VIA {n.source}
      </div>
    </div>
  );
}

Object.assign(window, { TeamView, NewsView });
