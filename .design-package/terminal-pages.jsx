// terminal-pages.jsx — remaining pages applying the same system

const { useState: pUS, useMemo: pUM } = React;

// ─── 1. Tournament Overview ────────────────────────────────────
function TOverview() {
  const teams = window.T_TEAMS;
  const meanElo = Math.round(teams.reduce((s, t) => s + t.elo, 0) / teams.length);
  const totalMv = teams.reduce((s, t) => s + t.mvEur, 0);
  return (
    <div>
      <window.TPageHeader
        title="Tournament overview"
        lede="High-level read of the 32-side field heading into the group stage. Strength, valuation, qualifying form, and host-confederation skew."
        kpis={[
          { label: 'Sides',          value: 32 },
          { label: 'Mean ELO',       value: meanElo,                       unit: 'pre-tournament' },
          { label: 'Field market value', value: `€${(totalMv / 1000).toFixed(2)}b` },
          { label: 'Hosts',          value: '3',                           unit: 'USA · CAN · MEX' },
          { label: 'Days to KO',     value: '37' },
        ]}
      />
      <window.TCaption>
        <window.TCaptionItem label="Source" value="Composite (FBref · ELO · TM)" />
        <window.TCaptionItem label="Confidence" value="MEDIUM-HIGH (qualifying complete, friendlies thin)" />
      </window.TCaption>
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 20 }}>
          <window.TLabel>ELO distribution · 32 sides</window.TLabel>
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'flex-end', gap: 3, height: 140 }}>
            {[...teams].sort((a, b) => b.elo - a.elo).map(t => {
              const min = 1450, max = 2120, h = ((t.elo - min) / (max - min)) * 100;
              return (
                <div key={t.code} title={`${t.name} · ${t.elo}`} style={{
                  flex: 1, height: `${h}%`, minHeight: 4,
                  background: t.elo > 1900 ? 'var(--gold)' : t.elo > 1750 ? 'var(--text-2)' : 'var(--text-4)',
                  borderRadius: '1px 1px 0 0',
                }} />
              );
            })}
          </div>
          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
            <window.TMono size={10} color="var(--text-3)">1450</window.TMono>
            <window.TMono size={10} color="var(--text-3)">2120</window.TMono>
          </div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 20 }}>
          <window.TLabel>Top market value</window.TLabel>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[...teams].sort((a, b) => b.mvEur - a.mvEur).slice(0, 6).map(t => {
              const w = t.mvEur / 1342 * 100;
              return (
                <div key={t.code}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <window.FlagSwatch code={t.code} w={14} h={9} />
                    <span style={{ fontSize: 12, color: 'var(--text)', flex: 1 }}>{t.name}</span>
                    <window.TMono size={11.5} color="var(--text-2)">€{t.mvEur}m</window.TMono>
                  </div>
                  <div style={{ height: 3, background: 'var(--surface3)', borderRadius: 2 }}>
                    <div style={{ width: `${w}%`, height: '100%', background: 'var(--gold)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 2. Strength of Schedule ───────────────────────────────────
function TSos() {
  const groups = ['A','B','C','D','E','F','G','H'];
  const sosByGroup = groups.map(g => {
    // Group g teams: pick by index
    const inGroup = window.T_TEAMS.slice(groups.indexOf(g) * 4, groups.indexOf(g) * 4 + 4);
    const avgElo = Math.round(inGroup.reduce((s, t) => s + t.elo, 0) / 4);
    return { g, teams: inGroup, avgElo };
  }).sort((a, b) => b.avgElo - a.avgElo);
  return (
    <div>
      <window.TPageHeader
        title="Strength of schedule"
        lede="Group-stage opposition difficulty by mean ELO of the other three sides each team faces."
        kpis={[
          { label: 'Hardest group', value: sosByGroup[0].g,        unit: `mean ELO ${sosByGroup[0].avgElo}` },
          { label: 'Easiest group', value: sosByGroup[7].g,        unit: `mean ELO ${sosByGroup[7].avgElo}` },
          { label: 'Spread',        value: `${sosByGroup[0].avgElo - sosByGroup[7].avgElo}` },
        ]}
      />
      <window.TCaption>
        <window.TCaptionItem label="Snapshot" value={window.T_META.snapshot} />
        <window.TCaptionItem label="Method"   value="Mean opp. ELO over remaining 3 GS fixtures" />
      </window.TCaption>
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {sosByGroup.map(({ g, teams, avgElo }) => {
          const min = 1450, max = 2120;
          const norm = (avgElo - min) / (max - min);
          return (
            <div key={g} style={{ border: '1px solid var(--border)', borderRadius: 6, background: 'var(--surface)', padding: '14px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <window.TLabel color="var(--gold)">GROUP {g}</window.TLabel>
                  <window.TMono size={11} color="var(--text-3)">mean ELO</window.TMono>
                  <window.TMono size={13} color="var(--text)" weight={600}>{avgElo}</window.TMono>
                </div>
                <window.TPill tone={norm > 0.7 ? 'gold' : norm > 0.4 ? 'mute' : 'green'} size="sm">
                  {norm > 0.7 ? 'Group of death' : norm > 0.4 ? 'Balanced' : 'Open'}
                </window.TPill>
              </div>
              <div style={{ height: 4, background: 'var(--surface3)', borderRadius: 2, marginBottom: 12 }}>
                <div style={{ width: `${norm * 100}%`, height: '100%', background: 'var(--gold)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {teams.map(t => (
                  <div key={t.code} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <window.FlagSwatch code={t.code} w={14} h={9} />
                    <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{t.code}</span>
                    <window.TMono size={10} color="var(--text-3)" style={{ marginLeft: 'auto' }}>{t.elo}</window.TMono>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 3. Generic conditions table (heat / altitude / americas) ──
function TConditions({ title, lede, key, unit }) {
  const [sort, setSort] = pUS({ key, dir: 'desc' });
  const rows = pUM(() => {
    return [...window.T_TEAMS].sort((a, b) => sort.dir === 'desc' ? b[sort.key] - a[sort.key] : a[sort.key] - b[sort.key]);
  }, [sort]);
  return (
    <div>
      <window.TPageHeader title={title} lede={lede} kpis={[
        { label: 'Highest',      value: rows[0].code,            unit: `${rows[0][key]} ${unit}` },
        { label: 'Lowest',       value: rows[rows.length - 1].code, unit: `${rows[rows.length - 1][key]} ${unit}` },
        { label: 'Mean',         value: Math.round(rows.reduce((s, t) => s + t[key], 0) / rows.length) },
      ]} />
      <window.TCaption>
        <window.TCaptionItem label="Snapshot" value={window.T_META.snapshot} />
        <window.TCaptionItem label="Index"    value="0–100, higher = more affected" />
      </window.TCaption>
      <div style={{ padding: 28 }}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', background: 'var(--surface)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <window.TSortHead label="Team"  align="left"  active={sort.key === 'name'} dir={sort.dir} onClick={() => setSort(s => ({ key: 'name',  dir: s.key === 'name'  && s.dir === 'asc' ? 'desc' : 'asc'  }))} />
                <window.TSortHead label="Conf"  align="left"  active={false} />
                <window.TSortHead label="Index" align="right" active={sort.key === key}    dir={sort.dir} onClick={() => setSort(s => ({ key,             dir: s.key === key     && s.dir === 'desc' ? 'asc'  : 'desc' }))} />
                <window.TSortHead label="Distribution" align="left" active={false} />
                <window.TSortHead label="Tier"  align="right" active={false} />
              </tr>
            </thead>
            <tbody>
              {rows.map((t, i) => {
                const v = t[key];
                const tier = v > 80 ? { label: 'High',     tone: 'gold' }
                           : v > 50 ? { label: 'Moderate', tone: 'mute' }
                           :          { label: 'Low',      tone: 'green' };
                return (
                  <tr key={t.code} style={{
                    borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                    background: i % 2 ? 'var(--bg-2)' : 'transparent',
                  }}>
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <window.FlagSwatch code={t.code} w={18} h={12} />
                        <span style={{ fontSize: 13, color: 'var(--text)' }}>{t.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '11px 14px' }}>
                      <window.TPill tone="mute" size="sm">{t.conf}</window.TPill>
                    </td>
                    <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                      <window.TMono size={13} color="var(--text)" weight={600}>{v}</window.TMono>
                    </td>
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ width: 220, height: 4, background: 'var(--surface3)', borderRadius: 2 }}>
                        <div style={{ width: `${v}%`, height: '100%', background: v > 80 ? 'var(--gold)' : v > 50 ? 'var(--text-2)' : 'var(--text-4)' }} />
                      </div>
                    </td>
                    <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                      <window.TPill tone={tier.tone} size="sm">{tier.label}</window.TPill>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Qualifying xG ──────────────────────────────────────────
function TQxg() {
  const rows = pUM(() => [...window.T_TEAMS].sort((a, b) => (b.xgFor - b.xgAg) - (a.xgFor - a.xgAg)), []);
  return (
    <div>
      <window.TPageHeader
        title="Qualifying xG"
        lede="Per-match expected goals for and against across the qualifying cycle. Net xG is the right-most signal — bar fill encodes magnitude."
        kpis={[
          { label: 'Best net',  value: `${rows[0].code} +${(rows[0].xgFor - rows[0].xgAg).toFixed(2)}` },
          { label: 'Worst net', value: `${rows[rows.length-1].code} ${(rows[rows.length-1].xgFor - rows[rows.length-1].xgAg).toFixed(2)}` },
        ]}
      />
      <window.TCaption>
        <window.TCaptionItem label="Snapshot" value={window.T_META.snapshot} />
        <window.TCaptionItem label="Source"   value="FBref shot-level model" />
      </window.TCaption>
      <div style={{ padding: 28 }}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', background: 'var(--surface)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <window.TSortHead label="Team"     align="left" active={false} />
                <window.TSortHead label="GP"       align="right" active={false} />
                <window.TSortHead label="xG/G"     align="right" active />
                <window.TSortHead label="xGA/G"    align="right" active={false} />
                <window.TSortHead label="Net xG"   align="right" active={false} />
                <window.TSortHead label="Distribution" align="left" active={false} />
              </tr>
            </thead>
            <tbody>
              {rows.map((t, i) => {
                const net = t.xgFor - t.xgAg;
                const w = ((net + 1.6) / 3.2) * 100;
                return (
                  <tr key={t.code} style={{
                    borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                    background: i % 2 ? 'var(--bg-2)' : 'transparent',
                  }}>
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <window.FlagSwatch code={t.code} w={18} h={12} />
                        <span style={{ fontSize: 13, color: 'var(--text)' }}>{t.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '11px 14px', textAlign: 'right' }}><window.TMono size={12} color="var(--text-2)">{t.gp}</window.TMono></td>
                    <td style={{ padding: '11px 14px', textAlign: 'right' }}><window.TMono size={13} color="var(--text)" weight={500}>{t.xgFor.toFixed(2)}</window.TMono></td>
                    <td style={{ padding: '11px 14px', textAlign: 'right' }}><window.TMono size={13} color="var(--text-2)">{t.xgAg.toFixed(2)}</window.TMono></td>
                    <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                      <window.TMono size={13} color={net > 0 ? 'var(--gold)' : 'var(--red)'} weight={600}>
                        {net > 0 ? '+' : ''}{net.toFixed(2)}
                      </window.TMono>
                    </td>
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ width: 240, height: 4, background: 'var(--surface3)', borderRadius: 2, position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '50%', top: -2, height: 8, width: 1, background: 'var(--text-4)' }} />
                        <div style={{
                          position: 'absolute',
                          left: net > 0 ? '50%' : `${w}%`,
                          width: net > 0 ? `${w - 50}%` : `${50 - w}%`,
                          height: '100%',
                          background: net > 0 ? 'var(--gold)' : 'var(--red)',
                        }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── 5. Squad Market Value ─────────────────────────────────────
function TMv() {
  const rows = pUM(() => [...window.T_TEAMS].sort((a, b) => b.mvEur - a.mvEur), []);
  return (
    <div>
      <window.TPageHeader
        title="Squad market value"
        lede="Aggregate Transfermarkt valuation of the most-likely 26-man tournament squad, in EUR millions."
        kpis={[
          { label: 'Field total', value: `€${(rows.reduce((s, t) => s + t.mvEur, 0) / 1000).toFixed(2)}b` },
          { label: 'Top',         value: `${rows[0].code} €${rows[0].mvEur}m` },
          { label: 'Median',      value: `€${rows[Math.floor(rows.length / 2)].mvEur}m` },
        ]}
      />
      <window.TCaption>
        <window.TCaptionItem label="Snapshot" value={window.T_META.snapshot} />
        <window.TCaptionItem label="Source"   value="Transfermarkt provisional 26-man" />
      </window.TCaption>
      <div style={{ padding: 28 }}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', background: 'var(--surface)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <window.TSortHead label="#"       align="right" active={false} />
                <window.TSortHead label="Team"    align="left"  active={false} />
                <window.TSortHead label="Conf"    align="left"  active={false} />
                <window.TSortHead label="Value"   align="right" active />
                <window.TSortHead label="Distribution" align="left" active={false} />
              </tr>
            </thead>
            <tbody>
              {rows.map((t, i) => (
                <tr key={t.code} style={{
                  borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                  background: i % 2 ? 'var(--bg-2)' : 'transparent',
                }}>
                  <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                    <window.TMono size={11} color="var(--text-3)">{(i + 1).toString().padStart(2, '0')}</window.TMono>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <window.FlagSwatch code={t.code} w={18} h={12} />
                      <span style={{ fontSize: 13, color: 'var(--text)' }}>{t.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '11px 14px' }}><window.TPill tone="mute" size="sm">{t.conf}</window.TPill></td>
                  <td style={{ padding: '11px 14px', textAlign: 'right' }}>
                    <window.TMono size={13} color="var(--text)" weight={600}>€{t.mvEur}m</window.TMono>
                  </td>
                  <td style={{ padding: '11px 14px' }}>
                    <div style={{ width: 240, height: 4, background: 'var(--surface3)', borderRadius: 2 }}>
                      <div style={{ width: `${(t.mvEur / 1342) * 100}%`, height: '100%', background: 'var(--gold)' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── 6. Golden Boot Forecast ──────────────────────────────────
function TGoldenBoot() {
  const rows = [
    { rk: 1, name: 'Kylian Mbappé',    team: 'FRA', age: 27, exp: 6.4, ipr: 38.0, odds: 5.50 },
    { rk: 2, name: 'Erling Haaland',   team: 'NOR', age: 25, exp: 5.8, ipr: 21.4, odds: 6.50, ineligible: true },
    { rk: 3, name: 'Harry Kane',       team: 'ENG', age: 32, exp: 5.6, ipr: 25.6, odds: 7.50 },
    { rk: 4, name: 'Vinícius Jr.',     team: 'BRA', age: 25, exp: 5.2, ipr: 18.2, odds: 9.00 },
    { rk: 5, name: 'Lautaro Martínez', team: 'ARG', age: 28, exp: 5.0, ipr: 17.4, odds: 10.0 },
    { rk: 6, name: 'Jude Bellingham',  team: 'ENG', age: 22, exp: 4.6, ipr: 12.1, odds: 13.0 },
    { rk: 7, name: 'Lamine Yamal',     team: 'ESP', age: 18, exp: 4.4, ipr: 11.8, odds: 14.0 },
    { rk: 8, name: 'Endrick',          team: 'BRA', age: 19, exp: 4.2, ipr: 10.4, odds: 15.0 },
    { rk: 9, name: 'Bukayo Saka',      team: 'ENG', age: 24, exp: 4.0, ipr:  9.6, odds: 17.0 },
    { rk:10, name: 'Rafael Leão',      team: 'POR', age: 26, exp: 3.9, ipr:  8.8, odds: 19.0 },
  ].filter(r => !r.ineligible);
  return (
    <div>
      <window.TPageHeader
        title="Golden Boot forecast"
        lede="Top scorer market: median expected goals from a 5-match KO run, implied probability, and current outright price."
        kpis={[
          { label: 'Favourite', value: `${rows[0].name.split(' ').pop()} @ ${rows[0].odds.toFixed(2)}` },
          { label: 'Field IPR', value: `${rows.reduce((s, r) => s + r.ipr, 0).toFixed(1)}%` },
          { label: 'Median exp goals', value: rows[Math.floor(rows.length/2)].exp.toFixed(1) },
        ]}
      />
      <window.TCaption>
        <window.TCaptionItem label="Snapshot" value={window.T_META.snapshot} />
        <window.TCaptionItem label="Model"    value="Poisson · qualifying xG + KO simulation (10k runs)" />
        <window.TCaptionItem label="Book"     value="Pinnacle · de-vigged" />
      </window.TCaption>
      <div style={{ padding: 28 }}>
        <div style={{ border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', background: 'var(--surface)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <window.TSortHead label="#"        align="right" active={false} />
                <window.TSortHead label="Player"   align="left"  active={false} />
                <window.TSortHead label="Team"     align="left"  active={false} />
                <window.TSortHead label="Age"      align="right" active={false} />
                <window.TSortHead label="Exp G"    align="right" active />
                <window.TSortHead label="Implied" align="right" active={false} />
                <window.TSortHead label="Odds"     align="right" active={false} />
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.name} style={{
                  borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                  background: i % 2 ? 'var(--bg-2)' : 'transparent',
                }}>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <window.TMono size={11} color="var(--text-3)">{r.rk.toString().padStart(2, '0')}</window.TMono>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: 13, color: 'var(--text)' }}>{r.name}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <window.FlagSwatch code={r.team} w={14} h={9} />
                      <window.TMono size={11} color="var(--text-2)">{r.team}</window.TMono>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}><window.TMono size={12} color="var(--text-2)">{r.age}</window.TMono></td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}><window.TMono size={13} color="var(--text)" weight={600}>{r.exp.toFixed(2)}</window.TMono></td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}><window.TMono size={12} color="var(--text-2)">{r.ipr.toFixed(1)}%</window.TMono></td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <span style={{
                      display: 'inline-block', padding: '4px 10px',
                      background: 'var(--surface3)', border: '1px solid var(--border-2)', borderRadius: 3,
                      fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 600, color: 'var(--text)',
                      fontVariantNumeric: 'tabular-nums',
                    }}>{r.odds.toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── 7. Team Compare ───────────────────────────────────────────
function TCompare() {
  const [a, setA] = pUS('BRA');
  const [b, setB] = pUS('ENG');
  const ta = window.T_TEAMS.find(t => t.code === a);
  const tb = window.T_TEAMS.find(t => t.code === b);
  const metrics = [
    { k: 'elo',       label: 'ELO rating' },
    { k: 'actualPts', label: 'Pts/game (qualifying)' },
    { k: 'xgFor',     label: 'xG for / game' },
    { k: 'xgAg',      label: 'xG against / game', invert: true },
    { k: 'mvEur',     label: 'Squad value (€m)' },
    { k: 'qXg',       label: 'Qualifying xG composite' },
  ];
  const Picker = ({ value, set }) => (
    <select value={value} onChange={e => set(e.target.value)} style={{
      appearance: 'none', background: 'var(--surface)', color: 'var(--text)',
      border: '1px solid var(--border-2)', borderRadius: 4, padding: '8px 14px',
      fontFamily: 'var(--font)', fontSize: 14, fontWeight: 500, minWidth: 200,
    }}>
      {window.T_TEAMS.map(t => <option key={t.code} value={t.code}>{t.name}</option>)}
    </select>
  );
  return (
    <div>
      <window.TPageHeader
        title="Team compare"
        lede="Side-by-side on the metrics that move markets. Values normalised against the field; gold marks the winner of each row."
      />
      <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', background: 'var(--bg)', display: 'flex', gap: 14, alignItems: 'center' }}>
        <window.TLabel>Compare</window.TLabel>
        <Picker value={a} set={setA} />
        <window.TMono size={13} color="var(--text-3)">vs</window.TMono>
        <Picker value={b} set={setB} />
      </div>
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {[ta, tb].map((t, idx) => (
          <div key={t.code} style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 18, background: 'var(--surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <window.FlagSwatch code={t.code} w={32} h={20} />
              <div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font)', fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>{t.name}</h3>
                <window.TMono size={11} color="var(--text-3)">{t.conf} · {t.pop}</window.TMono>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {metrics.map(m => {
                const va = ta[m.k], vb = tb[m.k];
                const mine = idx === 0 ? va : vb;
                const other = idx === 0 ? vb : va;
                const wins = m.invert ? mine < other : mine > other;
                const max = Math.max(va, vb);
                const w = (mine / max) * 100;
                return (
                  <div key={m.k}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
                      <window.TLabel>{m.label}</window.TLabel>
                      <window.TMono size={13} color={wins ? 'var(--gold)' : 'var(--text-2)'} weight={wins ? 600 : 500}>
                        {typeof mine === 'number' && mine > 100 ? mine.toLocaleString() : mine.toFixed(2)}
                      </window.TMono>
                    </div>
                    <div style={{ height: 4, background: 'var(--surface3)', borderRadius: 2 }}>
                      <div style={{ width: `${w}%`, height: '100%', background: wins ? 'var(--gold)' : 'var(--text-3)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 8. Group Draw & Fixtures ──────────────────────────────────
function TFixtures() {
  const groups = ['A','B','C','D','E','F','G','H'];
  return (
    <div>
      <window.TPageHeader
        title="Group draw & fixtures"
        lede="Reference layout of the 8 groups, hosts in italic. Match-day calendar will populate as kick-off times are confirmed."
      />
      <window.TCaption>
        <window.TCaptionItem label="Status" value="DRAW COMPLETE · MD1 IN 37 DAYS" />
      </window.TCaption>
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {groups.map((g, gi) => {
          const teams = window.T_TEAMS.slice(gi * 4, gi * 4 + 4);
          return (
            <div key={g} style={{ border: '1px solid var(--border)', borderRadius: 6, background: 'var(--surface)' }}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                <window.TLabel color="var(--gold)">GROUP {g}</window.TLabel>
                <window.TMono size={10} color="var(--text-3)">N {gi % 2 ? 'WEST' : 'EAST'}</window.TMono>
              </div>
              <div>
                {teams.map((t, i) => (
                  <div key={t.code} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                    borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                  }}>
                    <window.TMono size={10} color="var(--text-3)">A{i + 1}</window.TMono>
                    <window.FlagSwatch code={t.code} w={16} h={11} />
                    <span style={{
                      fontSize: 13, color: 'var(--text)',
                      fontStyle: t.host ? 'italic' : 'normal',
                    }}>{t.name}</span>
                    <window.TMono size={10} color="var(--text-3)" style={{ marginLeft: 'auto' }}>{t.elo}</window.TMono>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 9. Rules ──────────────────────────────────────────────────
function TRules() {
  const rules = [
    { id: '01', title: '48 sides, 12 groups of 4',     body: 'Top two from each group plus eight best third-placed sides advance to a 32-team Round of 32. Tournament expands from 64 to 104 matches.', tag: 'STRUCTURE' },
    { id: '02', title: 'Round of 32 introduced',       body: 'New first knockout round inserts before R16. Adds one extra fixture for advancing sides — fitness/squad-depth premium.', tag: 'STRUCTURE' },
    { id: '03', title: '5 substitutions retained',     body: 'Five subs per match across three windows. Concussion sub remains additional. Squad size 26 confirmed by FIFA Council Mar 2026.', tag: 'IN-PLAY' },
    { id: '04', title: 'Semi-automated offside',       body: 'SAOT live in all 16 venues. Average decision time projected at 24s (vs 70s in 2022). Cooling break threshold raised to 32°C WBGT.', tag: 'OFFICIATING' },
    { id: '05', title: 'Cooling-break protocol',       body: 'Mandatory 3-min break at 30\' and 75\' if pitch-side WBGT exceeds 32°C. Affects ~14 venues based on June climate norms.', tag: 'CONDITIONS' },
    { id: '06', title: 'Three-host travel allowance',  body: 'Group-stage groups locked to a single host country to limit travel; KO rounds may cross borders. Mexico altitude games scheduled outside back-to-back blocks.', tag: 'LOGISTICS' },
  ];
  return (
    <div>
      <window.TPageHeader
        title="New FIFA 2026 rules"
        lede="The structural and in-play changes that meaningfully affect modelling — squad fatigue, KO depth premium, condition triggers."
      />
      <window.TCaption>
        <window.TCaptionItem label="Last revision" value="MAR 14 2026 · FIFA COUNCIL" />
      </window.TCaption>
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {rules.map(r => (
          <div key={r.id} style={{ border: '1px solid var(--border)', borderRadius: 6, padding: '16px 18px', background: 'var(--surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <window.TMono size={11} color="var(--gold)" weight={600}>{r.id}</window.TMono>
              <window.TPill tone="mute" size="sm">{r.tag}</window.TPill>
            </div>
            <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font)', fontSize: 15, fontWeight: 500, color: 'var(--text)', letterSpacing: '-0.005em' }}>{r.title}</h3>
            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: 'var(--text-2)' }}>{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { TOverview, TSos, TConditions, TQxg, TMv, TGoldenBoot, TCompare, TFixtures, TRules });
