import { BRACKET_GROUPS, bracketTeamByCode, flagUrl } from '../../data/bracketTeams';
import type { GroupRanking } from './state';
import { TLabel, TPill } from '../../components/terminal/atoms';

interface Props {
  groupResults: Record<string, GroupRanking>;
  qualifyingThirds: string[];
  onChange: (qualifyingThirds: string[]) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function ThirdPlaceStep({ groupResults, qualifyingThirds, onChange, onContinue, onBack }: Props) {
  const allFull = qualifyingThirds.length === 8;

  const toggle = (group: string) => {
    if (qualifyingThirds.includes(group)) {
      onChange(qualifyingThirds.filter((g) => g !== group));
    } else if (qualifyingThirds.length < 8) {
      onChange([...qualifyingThirds, group]);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--color-text)', letterSpacing: '-0.012em' }}>
            Pick 8 of 12 third-placers
          </h3>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-text-2)' }}>
            FIFA's 32-team Round of 32 promotes the eight best third-place finishers. Tap which 8 you think will qualify.
          </p>
        </div>
        <TPill tone={allFull ? 'green' : 'gold'} size="md">
          {qualifyingThirds.length} / 8 selected
        </TPill>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
        {BRACKET_GROUPS.map((g) => {
          const r = groupResults[g];
          if (!r) return null;
          const team = bracketTeamByCode(r.third)!;
          const isSelected = qualifyingThirds.includes(g);
          const isDisabled = !isSelected && qualifyingThirds.length >= 8;
          const url = flagUrl(team.flag, 40);

          return (
            <button
              key={g}
              onClick={() => toggle(g)}
              disabled={isDisabled}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                background: isSelected ? 'rgba(232,185,74,0.10)' : 'var(--color-surface)',
                border: '1px solid ' + (isSelected ? 'var(--color-gold)' : 'var(--color-border)'),
                borderRadius: 4,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.4 : 1,
                color: 'var(--color-text)',
                fontSize: 13,
                textAlign: 'left',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '-0.005em',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: '1.5px solid ' + (isSelected ? 'var(--color-gold)' : 'var(--color-border-2)'),
                  background: isSelected ? 'var(--color-gold)' : 'transparent',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                  transition: 'background 0.12s, border-color 0.12s',
                }}
              >
                {isSelected && (
                  <svg width="10" height="10" viewBox="0 0 20 20" fill="var(--color-bg)">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <TLabel color={isSelected ? 'var(--color-gold)' : 'var(--color-text-3)'}>{g}</TLabel>
              {url ? (
                <img src={url} alt={team.name} width={20} height={14} style={{ borderRadius: 1, flexShrink: 0 }} />
              ) : (
                <div style={{ width: 20, height: 14, borderRadius: 1, background: 'var(--color-surface-3)', flexShrink: 0 }} />
              )}
              <span style={{ flex: 1 }}>{team.name}</span>
            </button>
          );
        })}
      </div>

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
          ← Back to groups
        </button>
        <button
          onClick={onContinue}
          disabled={!allFull}
          style={{
            padding: '10px 22px',
            borderRadius: 4,
            border: '1px solid ' + (allFull ? 'var(--color-gold)' : 'var(--color-border)'),
            background: allFull ? 'var(--color-gold)' : 'var(--color-surface)',
            color: allFull ? 'var(--color-bg)' : 'var(--color-text-3)',
            fontSize: 13,
            fontWeight: 600,
            cursor: allFull ? 'pointer' : 'not-allowed',
            letterSpacing: '-0.005em',
          }}
        >
          {allFull ? 'Continue → Knockouts' : `Pick ${8 - qualifyingThirds.length} more`}
        </button>
      </div>
    </div>
  );
}
