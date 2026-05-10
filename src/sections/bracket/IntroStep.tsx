import { TLabel } from '../../components/terminal/atoms';

interface Props {
  hasProgress: boolean;
  onStart: () => void;
  onResume: () => void;
  onReset: () => void;
}

export function IntroStep({ hasProgress, onStart, onResume, onReset }: Props) {
  return (
    <div>
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 6,
          padding: '32px 28px',
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 500,
            color: 'var(--color-text)',
            letterSpacing: '-0.018em',
            lineHeight: 1.2,
          }}
        >
          Build the bracket your way
        </h3>
        <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.55, color: 'var(--color-text-2)', maxWidth: 660 }}>
          Pick the standings in every group, choose which 8 of the 12 third-placers qualify, then
          click your way through the Round of 32, R16, quarter-finals, semis, and final. We'll
          show you Pinnacle's outright odds for your champion + flag any group-winner picks
          where the market disagrees with you.
        </p>

        <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {hasProgress ? (
            <>
              <button
                onClick={onResume}
                style={{
                  padding: '11px 22px',
                  borderRadius: 4,
                  border: '1px solid var(--color-gold)',
                  background: 'var(--color-gold)',
                  color: 'var(--color-bg)',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '-0.005em',
                }}
              >
                Resume
              </button>
              <button
                onClick={onReset}
                style={{
                  padding: '11px 22px',
                  borderRadius: 4,
                  border: '1px solid var(--color-border-2)',
                  background: 'transparent',
                  color: 'var(--color-text-2)',
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '-0.005em',
                }}
              >
                Start over
              </button>
            </>
          ) : (
            <button
              onClick={onStart}
              style={{
                padding: '11px 24px',
                borderRadius: 4,
                border: '1px solid var(--color-gold)',
                background: 'var(--color-gold)',
                color: 'var(--color-bg)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '-0.005em',
              }}
            >
              Start picking →
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        <FlowStep n={1} title="Groups" desc="Rank 1st / 2nd / 3rd / 4th in all 12 groups." />
        <FlowStep n={2} title="3rd-place" desc="Choose which 8 of 12 third-placers qualify for the R32." />
        <FlowStep n={3} title="Knockouts" desc="Click winners through R32 → R16 → QF → SF → Final." />
        <FlowStep n={4} title="Top scorer" desc="Pick the Golden Boot — 130+ candidates with Pinnacle odds." />
        <FlowStep n={5} title="Results" desc="Champion locked, with value plays and final-matchup angles." />
      </div>

      <div style={{ marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Picks persist across reloads · Pinnacle odds snapshot 2026-04-14
      </div>
    </div>
  );
}

function FlowStep({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 4,
        padding: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span
          style={{
            display: 'inline-grid',
            placeItems: 'center',
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: 'rgba(232,185,74,0.10)',
            border: '1px solid rgba(232,185,74,0.30)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--color-gold)',
            fontWeight: 600,
          }}
        >
          {n}
        </span>
        <TLabel color="var(--color-text)">{title}</TLabel>
      </div>
      <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: 'var(--color-text-2)' }}>{desc}</p>
    </div>
  );
}
