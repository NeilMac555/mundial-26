import { useMemo } from 'react';
import {
  type BracketData,
  type BracketTeamSlot,
  type MatchSlot,
  completionStats,
  getMatchMeta,
  propagateWinner,
} from '../../lib/bracketEngine';
import { flagUrl } from '../../data/bracketTeams';
import { TLabel, TMono, TPill } from '../../components/terminal/atoms';

interface Props {
  bracket: BracketData;
  onChange: (bracket: BracketData) => void;
  onContinue: () => void;
  onBack: () => void;
}

const COLUMNS: Array<{ key: 'r32' | 'r16' | 'qf' | 'sf' | 'final'; label: string; short: string }> = [
  { key: 'r32',   label: 'Round of 32',     short: 'R32' },
  { key: 'r16',   label: 'Round of 16',     short: 'R16' },
  { key: 'qf',    label: 'Quarter-finals',  short: 'QF' },
  { key: 'sf',    label: 'Semi-finals',     short: 'SF' },
  { key: 'final', label: 'Final',           short: 'Final' },
];

const MATCH_HEIGHT = 88;
const SLOT_HEIGHT_R32 = 110;
const COL_WIDTH = 200;
const COL_GAP = 44;
const HEADER_HEIGHT = 36;
const TOTAL_HEIGHT = 16 * SLOT_HEIGHT_R32;
const LINE_DIM = 'rgba(95,106,125,0.40)';
const LINE_LIVE = 'rgba(232,185,74,0.65)';

export function KnockoutStep({ bracket, onChange, onContinue, onBack }: Props) {
  const totalWidth = COLUMNS.length * COL_WIDTH + (COLUMNS.length - 1) * COL_GAP;
  const stats = useMemo(() => completionStats(bracket), [bracket]);

  const handleSelect = (matchId: string, winner: BracketTeamSlot) => {
    const next = propagateWinner(bracket, matchId, winner);
    onChange(next);
  };

  // Build column data
  const columnData = COLUMNS.map((col) => {
    const matches: MatchSlot[] =
      col.key === 'final' ? [bracket.final] : bracket[col.key];
    return { ...col, matches };
  });

  // Find next match needing a pick
  const nextMatchId = (() => {
    for (const col of columnData) {
      for (const m of col.matches) {
        if (!m.winner && m.team1 && m.team2) return m.id;
      }
    }
    return null;
  })();

  const championship = bracket.final.winner;

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: 'var(--color-text)', letterSpacing: '-0.012em' }}>
            Build your bracket
          </h3>
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--color-text-2)' }}>
            Click a team to advance them. Picks cascade through later rounds.
            {championship && (
              <span> Champion locked: <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{championship.team.name}</span>.</span>
            )}
          </p>
        </div>
        <TPill tone={championship ? 'green' : 'gold'} size="md">
          {stats.done} / {stats.total} matches
        </TPill>
      </div>

      <div
        style={{
          overflowX: 'auto',
          padding: '0 0 24px',
          marginLeft: -28,
          marginRight: -28,
          paddingLeft: 28,
          paddingRight: 28,
        }}
      >
        <div
          style={{
            position: 'relative',
            margin: '0 auto',
            width: totalWidth,
            height: TOTAL_HEIGHT + HEADER_HEIGHT + 16,
          }}
        >
          {columnData.map((col, colIdx) => {
            const count = col.matches.length;
            const slotHeight = TOTAL_HEIGHT / count;
            const colLeft = colIdx * (COL_WIDTH + COL_GAP);
            const isLastCol = colIdx === columnData.length - 1;

            return (
              <div key={col.key}>
                {/* Round header */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: colLeft,
                    width: COL_WIDTH,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      border: '1px solid var(--color-border)',
                      borderRadius: 3,
                      background: 'var(--color-surface)',
                    }}
                  >
                    <TLabel>{col.short}</TLabel>
                  </div>
                </div>

                {col.matches.map((m, i) => {
                  const cardTop = HEADER_HEIGHT + 8 + i * slotHeight + slotHeight / 2 - MATCH_HEIGHT / 2;
                  const cardCenter = cardTop + MATCH_HEIGHT / 2;
                  const isTopOfPair = i % 2 === 0;
                  const bothPresent = m.team1 && m.team2;
                  const hasWinner = !!m.winner;
                  const isNext = m.id === nextMatchId;
                  const connectorColor = hasWinner ? LINE_LIVE : LINE_DIM;
                  const meta = getMatchMeta(m.id);

                  return (
                    <div key={m.id}>
                      {/* Match card */}
                      <div
                        style={{
                          position: 'absolute',
                          top: cardTop,
                          left: colLeft,
                          width: COL_WIDTH,
                        }}
                      >
                        <MatchupCard
                          match={m}
                          onSelect={(winner) => handleSelect(m.id, winner)}
                          isFinal={col.key === 'final'}
                          isNext={isNext}
                          venue={meta?.venue}
                          date={meta?.date}
                        />
                      </div>

                      {/* Connectors */}
                      {!isLastCol && bothPresent && (
                        <>
                          <div
                            style={{
                              position: 'absolute',
                              top: cardCenter - 0.5,
                              left: colLeft + COL_WIDTH,
                              width: COL_GAP / 2,
                              height: 1,
                              background: connectorColor,
                            }}
                          />
                          {isTopOfPair && (
                            <>
                              <div
                                style={{
                                  position: 'absolute',
                                  top: cardCenter,
                                  left: colLeft + COL_WIDTH + COL_GAP / 2 - 0.5,
                                  width: 1,
                                  height: slotHeight,
                                  background: LINE_DIM,
                                }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  top: cardCenter + slotHeight / 2 - 0.5,
                                  left: colLeft + COL_WIDTH + COL_GAP / 2,
                                  width: COL_GAP / 2,
                                  height: 1,
                                  background: LINE_DIM,
                                }}
                              />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
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
          ← Back to 3rd-place picks
        </button>
        <button
          onClick={onContinue}
          disabled={!championship}
          style={{
            padding: '10px 22px',
            borderRadius: 4,
            border: '1px solid ' + (championship ? 'var(--color-gold)' : 'var(--color-border)'),
            background: championship ? 'var(--color-gold)' : 'var(--color-surface)',
            color: championship ? 'var(--color-bg)' : 'var(--color-text-3)',
            fontSize: 13,
            fontWeight: 600,
            cursor: championship ? 'pointer' : 'not-allowed',
            letterSpacing: '-0.005em',
          }}
        >
          {championship ? `Continue → Top Scorer` : `Finish to the final to continue`}
        </button>
      </div>
    </div>
  );
}

function MatchupCard({
  match, onSelect, isFinal, isNext, venue, date,
}: {
  match: MatchSlot;
  onSelect: (winner: BracketTeamSlot) => void;
  isFinal: boolean;
  isNext: boolean;
  venue?: string;
  date?: string;
}) {
  const { team1, team2, winner } = match;
  const canSelect = team1 && team2;

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--color-surface)',
        border: '1px solid ' + (
          isFinal ? 'var(--color-gold)' :
          isNext ? 'rgba(232,185,74,0.50)' :
          'var(--color-border)'
        ),
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: isNext ? '0 0 0 2px rgba(232,185,74,0.10)' : 'none',
      }}
    >
      {(isFinal || (venue && date)) && (
        <div
          style={{
            padding: '3px 8px',
            background: isFinal ? 'rgba(232,185,74,0.10)' : 'var(--color-bg-2)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 6,
          }}
        >
          <TMono size={9} color={isFinal ? 'var(--color-gold)' : 'var(--color-text-4)'}>
            {isFinal ? 'FINAL' : (venue ?? '').toUpperCase()}
          </TMono>
          {!isFinal && date && <TMono size={9} color="var(--color-text-4)">{date}</TMono>}
        </div>
      )}

      <TeamRow
        team={team1}
        isWinner={winner?.team.code === team1?.team.code}
        isLoser={!!winner && winner.team.code !== team1?.team.code}
        onClick={canSelect && team1 ? () => onSelect(team1) : undefined}
      />
      <div style={{ height: 1, background: 'var(--color-border)' }} />
      <TeamRow
        team={team2}
        isWinner={winner?.team.code === team2?.team.code}
        isLoser={!!winner && winner.team.code !== team2?.team.code}
        onClick={canSelect && team2 ? () => onSelect(team2) : undefined}
      />
    </div>
  );
}

function TeamRow({
  team, isWinner, isLoser, onClick,
}: {
  team: BracketTeamSlot | null;
  isWinner: boolean;
  isLoser: boolean;
  onClick?: () => void;
}) {
  if (!team) {
    return (
      <div style={{
        padding: '6px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'transparent',
      }}>
        <div style={{ width: 16, height: 11, borderRadius: 1, background: 'var(--color-surface-3)' }} />
        <span style={{ fontSize: 11, fontStyle: 'italic', color: 'var(--color-text-4)' }}>TBD</span>
      </div>
    );
  }

  const url = flagUrl(team.team.flag, 40);
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: '7px 10px',
        background: isWinner
          ? 'rgba(232,185,74,0.10)'
          : isLoser
          ? 'rgba(95,106,125,0.04)'
          : 'transparent',
        border: 'none',
        borderLeft: '2px solid ' + (isWinner ? 'var(--color-gold)' : 'transparent'),
        opacity: isLoser ? 0.45 : 1,
        cursor: onClick ? 'pointer' : 'default',
        textAlign: 'left',
        fontFamily: 'var(--font-sans)',
        transition: 'background 0.12s',
      }}
      onMouseEnter={(e) => {
        if (onClick && !isWinner) {
          e.currentTarget.style.background = 'var(--color-row-hov)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick && !isWinner) {
          e.currentTarget.style.background = isLoser ? 'rgba(95,106,125,0.04)' : 'transparent';
        }
      }}
    >
      {url ? (
        <img src={url} alt={team.team.name} width={18} height={12} style={{ borderRadius: 1, flexShrink: 0 }} />
      ) : (
        <div style={{ width: 18, height: 12, borderRadius: 1, background: 'var(--color-surface-3)', flexShrink: 0 }} />
      )}
      <span
        style={{
          flex: 1,
          fontSize: 12,
          fontWeight: isWinner ? 600 : 400,
          color: isWinner ? 'var(--color-gold)' : isLoser ? 'var(--color-text-3)' : 'var(--color-text)',
          letterSpacing: '-0.005em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {team.team.name}
      </span>
      <TMono size={9} color={isWinner ? 'var(--color-gold)' : 'var(--color-text-4)'}>
        {team.source}
      </TMono>
    </button>
  );
}
