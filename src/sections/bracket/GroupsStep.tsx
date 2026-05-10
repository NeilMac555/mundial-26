import { useMemo, useState } from 'react';
import { BRACKET_GROUPS, bracketTeamsByGroup, flagUrl, type BracketTeam } from '../../data/bracketTeams';
import type { GroupRanking } from './state';
import { TLabel, TMono, TPill } from '../../components/terminal/atoms';

interface Props {
  groupResults: Record<string, GroupRanking>;
  onChange: (groupResults: Record<string, GroupRanking>) => void;
  onContinue: () => void;
}

export function GroupsStep({ groupResults, onChange, onContinue }: Props) {
  const [active, setActive] = useState<string>(() => {
    // Auto-pick the first incomplete group on mount
    return BRACKET_GROUPS.find((g) => !groupResults[g]) ?? 'A';
  });

  const completedCount = Object.keys(groupResults).length;
  const allDone = completedCount === 12;

  const handleGroupComplete = (group: string, ranking: GroupRanking) => {
    const next = { ...groupResults, [group]: ranking };
    onChange(next);
    // Auto-advance to next incomplete group
    const idx = BRACKET_GROUPS.indexOf(group as (typeof BRACKET_GROUPS)[number]);
    for (let i = 1; i <= 12; i++) {
      const candidate = BRACKET_GROUPS[(idx + i) % 12];
      if (!next[candidate] && candidate !== group) {
        setActive(candidate);
        break;
      }
    }
  };

  const handleResetGroup = (group: string) => {
    const next = { ...groupResults };
    delete next[group];
    onChange(next);
    setActive(group);
  };

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--color-text)', letterSpacing: '-0.012em' }}>
            Predict the group stage
          </h3>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-text-2)' }}>
            Tap to rank each group. Top two advance automatically. Pick which 8 of the 12 third-placers qualify in the next step.
          </p>
        </div>
        <TPill tone={allDone ? 'green' : 'gold'} size="md">
          {completedCount} / 12 done
        </TPill>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
        {BRACKET_GROUPS.map((g) => (
          <GroupCard
            key={g}
            group={g}
            teams={bracketTeamsByGroup(g)}
            ranking={groupResults[g] ?? null}
            isActive={active === g}
            onActivate={() => setActive(g)}
            onComplete={(r) => handleGroupComplete(g, r)}
            onReset={() => handleResetGroup(g)}
          />
        ))}
      </div>

      <div style={{ marginTop: 28, textAlign: 'center' }}>
        <button
          onClick={onContinue}
          disabled={!allDone}
          style={{
            padding: '10px 22px',
            borderRadius: 4,
            border: '1px solid ' + (allDone ? 'var(--color-gold)' : 'var(--color-border)'),
            background: allDone ? 'var(--color-gold)' : 'var(--color-surface)',
            color: allDone ? 'var(--color-bg)' : 'var(--color-text-3)',
            fontSize: 13,
            fontWeight: 600,
            cursor: allDone ? 'pointer' : 'not-allowed',
            letterSpacing: '-0.005em',
          }}
        >
          {allDone ? 'Continue → 3rd-place picks' : `${12 - completedCount} group${12 - completedCount === 1 ? '' : 's'} left`}
        </button>
      </div>
    </div>
  );
}

function GroupCard({
  group, teams, ranking, isActive, onActivate, onComplete, onReset,
}: {
  group: string;
  teams: BracketTeam[];
  ranking: GroupRanking | null;
  isActive: boolean;
  onActivate: () => void;
  onComplete: (r: GroupRanking) => void;
  onReset: () => void;
}) {
  const isComplete = !!ranking;

  // Local state for in-progress picks (resets when ranking is null again)
  const [picks, setPicks] = useState<string[]>(() => {
    if (!ranking) return [];
    return [ranking.first, ranking.second, ranking.third, ranking.fourth];
  });
  // Sync from props when ranking changes externally (reset / load)
  useMemo(() => {
    if (ranking) {
      setPicks([ranking.first, ranking.second, ranking.third, ranking.fourth]);
    } else if (picks.length > 0) {
      setPicks([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ranking]);

  const POSITION_LABELS = ['1st', '2nd', '3rd'];

  const handlePick = (team: BracketTeam) => {
    if (!isActive || isComplete) return;
    const next = [...picks, team.code];
    if (next.length === 3) {
      // Auto-fill 4th
      const fourth = teams.find((t) => !next.includes(t.code))!;
      const final = [...next, fourth.code];
      setPicks(final);
      onComplete({
        first:  final[0],
        second: final[1],
        third:  final[2],
        fourth: final[3],
      });
    } else {
      setPicks(next);
    }
  };

  const unranked = teams.filter((t) => !picks.includes(t.code));
  const currentPosition = picks.length;

  return (
    <div
      onClick={!isActive && !isComplete ? onActivate : undefined}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid ' + (
          isActive
            ? 'var(--color-gold)'
            : isComplete
            ? 'rgba(94,200,138,0.30)'
            : 'var(--color-border)'
        ),
        borderRadius: 6,
        overflow: 'hidden',
        cursor: !isActive && !isComplete ? 'pointer' : 'default',
        transition: 'border-color 0.15s',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <TLabel>Group</TLabel>
          <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)' }}>{group}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isComplete && <TPill tone="green" size="sm">Done</TPill>}
          {isComplete && isActive && (
            <button
              onClick={(e) => { e.stopPropagation(); onReset(); }}
              style={{
                padding: '3px 8px',
                background: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: 3,
                color: 'var(--color-text-3)',
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 12 }}>
        {isActive && !isComplete && (
          <div style={{
            marginBottom: 10,
            padding: '6px 10px',
            background: 'rgba(232,185,74,0.06)',
            border: '1px solid rgba(232,185,74,0.20)',
            borderRadius: 3,
            fontSize: 11,
            color: 'var(--color-gold)',
            textAlign: 'center',
            letterSpacing: '-0.005em',
          }}>
            Tap who finishes <span style={{ fontWeight: 600 }}>{POSITION_LABELS[currentPosition]}</span>
          </div>
        )}

        {/* Ranked teams */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {picks.map((code, i) => {
            const team = teams.find((t) => t.code === code)!;
            return <TeamRow key={code} team={team} rank={i + 1} faded={i >= 3} />;
          })}
        </div>

        {/* Unranked options */}
        {isActive && !isComplete && unranked.length > 0 && (
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {unranked.map((t) => (
              <TeamRow
                key={t.code}
                team={t}
                onClick={() => handlePick(t)}
                interactive
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TeamRow({
  team, rank, faded, interactive, onClick,
}: {
  team: BracketTeam;
  rank?: number;
  faded?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}) {
  const url = flagUrl(team.flag, 40);
  const isWinning = rank !== undefined && rank <= 2;
  return (
    <button
      onClick={onClick}
      disabled={!interactive}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '7px 10px',
        background: isWinning
          ? 'rgba(232,185,74,0.06)'
          : faded
          ? 'transparent'
          : interactive
          ? 'var(--color-bg-2)'
          : 'transparent',
        border: '1px solid ' + (isWinning ? 'rgba(232,185,74,0.25)' : 'var(--color-border)'),
        borderRadius: 4,
        color: faded ? 'var(--color-text-3)' : 'var(--color-text)',
        fontSize: 13,
        cursor: interactive ? 'pointer' : 'default',
        letterSpacing: '-0.005em',
        textAlign: 'left',
        fontFamily: 'var(--font-sans)',
        transition: 'background 0.12s, border-color 0.12s',
      }}
      onMouseEnter={(e) => {
        if (interactive) {
          e.currentTarget.style.borderColor = 'var(--color-gold)';
        }
      }}
      onMouseLeave={(e) => {
        if (interactive) {
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }
      }}
    >
      {rank !== undefined && (
        <span
          className="num"
          style={{
            width: 20,
            display: 'inline-block',
            color: isWinning ? 'var(--color-gold)' : 'var(--color-text-3)',
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {rank}
        </span>
      )}
      {url ? (
        <img
          src={url}
          alt={team.name}
          width={20}
          height={14}
          style={{ borderRadius: 1, flexShrink: 0 }}
        />
      ) : (
        <div style={{
          width: 20, height: 14, borderRadius: 1,
          background: 'var(--color-surface-3)',
          flexShrink: 0,
        }} />
      )}
      <span style={{ flex: 1 }}>{team.name}</span>
      <TMono size={10} color={isWinning ? 'var(--color-gold)' : 'var(--color-text-3)'}>
        {team.code}
      </TMono>
    </button>
  );
}
