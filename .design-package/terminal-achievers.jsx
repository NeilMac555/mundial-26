// terminal-achievers.jsx — Over/Under-Achievers (canonical page)

const { useState: aUS, useMemo: aUM } = React;

// 5-step heatmap cell: red → grey → gold gradient
function TierCell({ delta }) {
  const tier = window.tierFor(delta);
  const colors = window.TIER_COLORS;
  const sign = delta > 0 ? '+' : delta < 0 ? '−' : '';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
        color: tier.step === 2 ? 'var(--text-2)' : tier.step >= 3 ? 'var(--gold)' : 'var(--red)',
        fontVariantNumeric: 'tabular-nums',
        minWidth: 56, textAlign: 'right',
      }}>{sign}{Math.abs(delta).toFixed(2)}</span>
      <div style={{ display: 'flex', gap: 2 }}>
        {colors.map((c, i) => (
          <div key={i} style={{
            width: 8, height: 16, borderRadius: 1,
            background: i === tier.step ? c : 'transparent',
            border: i === tier.step ? 'none' : `1px solid ${c}33`,
            opacity: i === tier.step ? 1 : 0.45,
          }} />
        ))}
      </div>
    </div>
  );
}

// Tier legend strip
function TierLegend() {
  const labels = ['Massive under', 'Clear under', 'Met', 'Clear over', 'Massive over'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      <window.TLabel>Tier scale</window.TLabel>
      {window.TIER_COLORS.map((c, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: c, opacity: 0.95 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-2)', letterSpacing: '0.04em' }}>
            {labels[i]}
          </span>
        </div>
      ))}
    </div>
  );
}

// Mini distribution histogram for the page header
function DistroBars() {
  const buckets = [0, 0, 0, 0, 0];
  window.T_TEAMS.forEach(t => {
    const d = t.actualPts - t.expPts;
    buckets[window.tierFor(d).step] += 1;
  });
  const max = Math.max(...buckets);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40 }}>
      {buckets.map((v, i) => (
        <div key={i} title={`${v} sides`} style={{
          width: 14, height: `${(v / max) * 100}%`, minHeight: 2,
          background: window.TIER_COLORS[i], borderRadius: 1, opacity: 0.95,
        }} />
      ))}
    </div>
  );
}

function TAchievers() {
  const [sort, setSort] = aUS({ key: 'delta', dir: 'desc' });
  const [conf, setConf] = aUS('ALL');

  const rows = aUM(() => {
    const enriched = window.T_TEAMS.map(t => ({
      ...t,
      delta: +(t.actualPts - t.expPts).toFixed(3),
      ptsPct: t.actualPts / 3,
      eloDir: t.eloDelta >= 0 ? 'up' : 'down',
    }));
    const filtered = conf === 'ALL' ? enriched : enriched.filter(t => t.conf === conf);
    const k = sort.key;
    return [...filtered].sort((a, b) => {
      const av = a[k], bv = b[k];
      if (typeof av === 'string') return sort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return sort.dir === 'asc' ? av - bv : bv - av;
    });
  }, [sort, conf]);

  const head = (key, label, align = 'right') => (
    <window.TSortHead
      label={label}
      align={align}
      active={sort.key === key}
      dir={sort.dir}
      onClick={() => setSort(s => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }))}
    />
  );

  const confs = ['ALL', 'UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'];

  // KPIs
  const overs   = rows.filter(t => t.delta >=  0.10).length;
  const unders  = rows.filter(t => t.delta <= -0.10).length;
  const biggest = [...rows].sort((a, b) => b.delta - a.delta)[0];
  const worst   = [...rows].sort((a, b) => a.delta - b.delta)[0];

  return (
    <div>
      <window.TPageHeader
        title="Over / Under-Achievers"
        lede="Sides whose qualifying points-per-match diverged most from pre-cycle ELO expectation. Positive Δ = banked more points than the bookmaker would have implied at first whistle of the cycle. Filter by confederation, sort any column."
        kpis={[
          { label: 'Sides covered',      value: rows.length,                             unit: '/ 32' },
          { label: 'Outperformed',       value: overs,                                   unit: 'Δ ≥ +0.10' },
          { label: 'Underperformed',     value: unders,                                  unit: 'Δ ≤ −0.10' },
          { label: 'Biggest over',       value: `${biggest.code} +${biggest.delta.toFixed(2)}` },
          { label: 'Biggest under',      value: `${worst.code} ${worst.delta.toFixed(2)}` },
        ]}
      />

      <window.TCaption>
        <window.TCaptionItem label="Snapshot"    value={window.T_META.snapshot} />
        <window.TCaptionItem label="Window"      value={window.T_META.scope} />
        <window.TCaptionItem label="Sources"     value={window.T_META.source} />
        <window.TCaptionItem label="Methodology" value={window.T_META.methodology} />
      </window.TCaption>

      <div style={{
        padding: '16px 28px', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
        background: 'var(--bg)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <window.TLabel>Confederation</window.TLabel>
          <div style={{ display: 'flex', gap: 2, background: 'var(--surface)', padding: 2, borderRadius: 4, border: '1px solid var(--border)' }}>
            {confs.map(c => (
              <button key={c} onClick={() => setConf(c)} style={{
                appearance: 'none', cursor: 'pointer',
                background: conf === c ? 'var(--surface3)' : 'transparent',
                color: conf === c ? 'var(--text)' : 'var(--text-2)',
                border: 'none', padding: '5px 10px', borderRadius: 3,
                fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 500, letterSpacing: '0.06em',
              }}>{c}</button>
            ))}
          </div>
        </div>
        <span style={{ width: 1, height: 18, background: 'var(--border)' }} />
        <TierLegend />
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <window.TLabel>Distribution</window.TLabel>
          <DistroBars />
          <window.TMono size={11} color="var(--text-3)">N = {rows.length}</window.TMono>
        </div>
      </div>

      <div style={{ padding: '0 28px', background: 'var(--bg)' }}>
        <div style={{
          margin: '18px 0', border: '1px solid var(--border)', borderRadius: 6,
          overflow: 'hidden', background: 'var(--surface)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {head('name',       'Team',         'left')}
                {head('conf',       'Conf',         'left')}
                {head('elo',        'ELO')}
                {head('eloDelta',   'ELO Δ')}
                {head('gp',         'GP')}
                {head('actualPts',  'Pts/G')}
                {head('expPts',     'xPts/G')}
                {head('delta',      'Δ vs xPts')}
                {head('ptsPct',     'Pts %')}
              </tr>
            </thead>
            <tbody>
              {rows.map((t, i) => (
                <tr key={t.code} style={{
                  borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                  background: i % 2 ? 'var(--bg-2)' : 'transparent',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--row-hov)'}
                onMouseLeave={(e) => e.currentTarget.style.background = i % 2 ? 'var(--bg-2)' : 'transparent'}
                >
                  <td style={{ padding: '12px 14px', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <window.FlagSwatch code={t.code} w={18} h={12} />
                      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                        <span style={{
                          fontFamily: 'var(--font)', fontSize: 13, fontWeight: 500,
                          color: 'var(--text)', letterSpacing: '-0.005em',
                        }}>{t.name}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--text-3)', letterSpacing: '0.06em' }}>
                          {t.code} · {t.pop.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <window.TPill tone="mute" size="sm">{t.conf}</window.TPill>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <window.TMono size={12.5} color="var(--text)" weight={500}>{t.elo}</window.TMono>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
                      color: t.eloDelta > 0 ? 'var(--gold)' : t.eloDelta < 0 ? 'var(--red)' : 'var(--text-2)',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {t.eloDelta > 0 ? '+' : ''}{t.eloDelta}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <window.TMono size={12} color="var(--text-2)">{t.gp}</window.TMono>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <window.TMono size={12.5} color="var(--text)" weight={500}>{t.actualPts.toFixed(2)}</window.TMono>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <window.TMono size={12} color="var(--text-3)">{t.expPts.toFixed(2)}</window.TMono>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <TierCell delta={t.delta} />
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    {/* Slim horizontal bar for points% */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 60, height: 4, background: 'var(--surface3)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{
                          width: `${t.ptsPct * 100}%`, height: '100%',
                          background: t.delta > 0 ? 'var(--gold)' : 'var(--text-3)',
                        }} />
                      </div>
                      <window.TMono size={11.5} color="var(--text-2)">{(t.ptsPct * 100).toFixed(0)}%</window.TMono>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{
          padding: '14px 16px', marginBottom: 28,
          border: '1px solid var(--border)', borderRadius: 6,
          background: 'var(--bg-2)', display: 'flex', gap: 18, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: 4,
            background: 'var(--gold-bg)', color: 'var(--gold)',
            border: '1px solid rgba(232,185,74,0.25)',
            display: 'grid', placeItems: 'center', flexShrink: 0,
            fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
          }}>i</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <window.TLabel color="var(--text-2)">Reading the table</window.TLabel>
            <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.55, maxWidth: 820 }}>
              Δ is the per-match points residual after controlling for ELO-implied opposition strength across the qualifying window.
              The 5-step bar encodes magnitude only — read the signed number for direction. Pts % is observed points as a share of available (3 × GP);
              gold fill on the bar indicates a positive Δ. ELO Δ is the rating shift over the same window. Confederation is shown muted because
              it is metadata, not a ranking dimension.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TAchievers });
