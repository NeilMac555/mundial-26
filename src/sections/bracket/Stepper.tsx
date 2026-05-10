// Stepper — Terminal-skinned progress indicator for the Bracket Simulator.
// Reads completion state for each step and lets the user click back to revisit.

import type { BracketStep } from './state';

const STEPS: Array<{ key: BracketStep; label: string; short: string }> = [
  { key: 'intro',     label: 'Intro',     short: 'Intro' },
  { key: 'groups',    label: 'Groups',    short: 'Groups' },
  { key: 'thirds',    label: '3rd Place', short: '3rd' },
  { key: 'knockouts', label: 'Knockouts', short: 'KO' },
  { key: 'topscorer', label: 'Top Scorer', short: 'Boot' },
  { key: 'results',   label: 'Results',    short: 'Done' },
];

export function Stepper({
  active, completed, onJump, progress,
}: {
  active: BracketStep;
  completed: Record<BracketStep, boolean>;
  onJump: (step: BracketStep) => void;
  /** Optional 0–100 sub-step progress for the active step (e.g. 8/12 groups done). */
  progress?: number;
}) {
  const activeIdx = STEPS.findIndex((s) => s.key === active);
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {STEPS.map((s, i) => {
          const isActive = s.key === active;
          const isDone = completed[s.key];
          // Steps later than the active one are not yet reachable unless their
          // prerequisites are completed; but we let click-to-jump for any step
          // already started. Simpler: only allow clicks on completed steps + active.
          const canJump = isDone || i <= activeIdx;
          return (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <button
                onClick={() => canJump && onJump(s.key)}
                disabled={!canJump}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  background: 'transparent',
                  border: 'none',
                  cursor: canJump ? 'pointer' : 'not-allowed',
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 11,
                    fontWeight: 600,
                    background: isActive
                      ? 'var(--color-gold)'
                      : isDone
                      ? 'rgba(94,200,138,0.18)'
                      : 'var(--color-surface-2)',
                    color: isActive
                      ? 'var(--color-bg)'
                      : isDone
                      ? 'var(--color-green)'
                      : 'var(--color-text-3)',
                    border: '1px solid ' + (isActive ? 'var(--color-gold)' : isDone ? 'rgba(94,200,138,0.30)' : 'var(--color-border)'),
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  {isDone && !isActive ? (
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 9.5,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: isActive
                      ? 'var(--color-gold)'
                      : isDone
                      ? 'var(--color-text-2)'
                      : 'var(--color-text-4)',
                  }}
                >
                  {s.short}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: i < activeIdx
                      ? 'rgba(94,200,138,0.30)'
                      : 'var(--color-border)',
                    margin: '0 8px',
                    marginBottom: 18, // align with the dot, not the label
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {progress !== undefined && (
        <div
          style={{
            marginTop: 12,
            height: 2,
            background: 'var(--color-surface-3)',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.max(0, Math.min(100, progress))}%`,
              height: '100%',
              background: 'var(--color-gold)',
              transition: 'width 0.25s ease-out',
            }}
          />
        </div>
      )}
    </div>
  );
}
