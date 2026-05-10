import { useState } from 'react';
import { TOP_SCORERS, topScorersByTier } from '../../data/bracketTopScorers';
import { flagUrl } from '../../data/bracketTeams';
import { TLabel, TPill } from '../../components/terminal/atoms';

interface Props {
  topScorerName: string | null;
  onChange: (name: string | null) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function TopScorerStep({ topScorerName, onChange, onContinue, onBack }: Props) {
  const [query, setQuery] = useState('');
  const tiers = topScorersByTier();
  const q = query.trim().toLowerCase();

  const filtered = q
    ? TOP_SCORERS.filter(
        (p) => p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q),
      )
    : null;

  const selected = topScorerName ? TOP_SCORERS.find((p) => p.name === topScorerName) ?? null : null;

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--color-text)', letterSpacing: '-0.012em' }}>
            Pick the Golden Boot
          </h3>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-text-2)' }}>
            Who tops the goalscoring chart? Tiers are sorted by Pinnacle pre-tournament odds.
          </p>
        </div>
        {selected && (
          <TPill tone="gold" size="md">
            {selected.name} · {selected.country}
          </TPill>
        )}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 18 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search player or country…"
          style={{
            width: '100%',
            maxWidth: 320,
            padding: '8px 12px',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 4,
            color: 'var(--color-text)',
            fontSize: 13,
            fontFamily: 'var(--font-mono)',
            outline: 'none',
          }}
        />
      </div>

      {filtered ? (
        <PlayerGrid players={filtered} selected={topScorerName} onSelect={onChange} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {tiers.map((tier) => (
            <div key={tier.label}>
              <div style={{ marginBottom: 8 }}>
                <TLabel>{tier.label}</TLabel>
              </div>
              <PlayerGrid players={tier.players} selected={topScorerName} onSelect={onChange} />
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={onBack}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: 4,
            color: 'var(--color-text-2)',
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '-0.005em',
          }}
        >
          ← Back to bracket
        </button>
        <button
          onClick={onContinue}
          disabled={!selected}
          style={{
            padding: '10px 22px',
            borderRadius: 4,
            border: '1px solid ' + (selected ? 'var(--color-gold)' : 'var(--color-border)'),
            background: selected ? 'var(--color-gold)' : 'var(--color-surface)',
            color: selected ? 'var(--color-bg)' : 'var(--color-text-3)',
            fontSize: 13,
            fontWeight: 600,
            cursor: selected ? 'pointer' : 'not-allowed',
            letterSpacing: '-0.005em',
          }}
        >
          {selected ? 'Continue → Results' : 'Pick a player'}
        </button>
      </div>
    </div>
  );
}

function PlayerGrid({
  players, selected, onSelect,
}: {
  players: ReturnType<typeof topScorersByTier>[number]['players'];
  selected: string | null;
  onSelect: (name: string | null) => void;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 8 }}>
      {players.map((p) => {
        const isSelected = selected === p.name;
        const url = flagUrl(p.flag, 40);
        return (
          <button
            key={p.name}
            onClick={() => onSelect(isSelected ? null : p.name)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              background: isSelected ? 'rgba(232,185,74,0.10)' : 'var(--color-surface)',
              border: '1px solid ' + (isSelected ? 'var(--color-gold)' : 'var(--color-border)'),
              borderRadius: 4,
              cursor: 'pointer',
              color: 'var(--color-text)',
              fontSize: 13,
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.005em',
              textAlign: 'left',
              transition: 'border-color 0.12s, background 0.12s',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-border-2)';
            }}
            onMouseLeave={(e) => {
              if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
          >
            {url ? (
              <img src={url} alt={p.country} width={20} height={14} style={{ borderRadius: 1, flexShrink: 0 }} />
            ) : (
              <div style={{ width: 20, height: 14, borderRadius: 1, background: 'var(--color-surface-3)', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: isSelected ? 'var(--color-gold)' : 'var(--color-text)', fontWeight: isSelected ? 600 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {p.name}
              </div>
              <div style={{ fontSize: 10, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
                {p.country}
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: isSelected ? 'var(--color-gold)' : 'var(--color-text-3)' }}>
              {p.odds}
            </span>
          </button>
        );
      })}
    </div>
  );
}
