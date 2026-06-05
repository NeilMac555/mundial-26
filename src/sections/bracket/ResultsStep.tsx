import { BRACKET_GROUPS, bracketTeamByCode, flagUrl } from '../../data/bracketTeams';
import { getBracketOdds, isValuePlay, oddsToDecimal } from '../../data/bracketOdds';
import { TOP_SCORERS } from '../../data/bracketTopScorers';
import type { BracketData } from '../../lib/bracketEngine';
import type { GroupRanking } from './state';
import { TLabel, TMono, TPill } from '../../components/terminal/atoms';
import { AmiupCallout } from '../../components/AmiupLink';

interface Props {
  bracket: BracketData;
  groupResults: Record<string, GroupRanking>;
  topScorerName: string | null;
  onBack: () => void;
  onReset: () => void;
}

export function ResultsStep({ bracket, groupResults, topScorerName, onBack, onReset }: Props) {
  const winner = bracket.final.winner?.team;
  const finalist1 = bracket.final.team1?.team;
  const finalist2 = bracket.final.team2?.team;
  const winnerOdds = winner ? getBracketOdds(winner.code) : null;
  const topScorer = topScorerName
    ? TOP_SCORERS.find((p) => p.name === topScorerName) ?? null
    : null;

  // Group winner picks with odds
  const groupWinnerPicks = BRACKET_GROUPS.map((g) => {
    const code = groupResults[g]?.first;
    const team = code ? bracketTeamByCode(code) : undefined;
    const odds = code ? getBracketOdds(code) : undefined;
    return { group: g, team, odds };
  });
  const valuePlays = groupWinnerPicks
    .filter((gw) => gw.odds && isValuePlay(gw.odds.groupWinnerOdds))
    .sort((a, b) => oddsToDecimal(b.odds!.groupWinnerOdds) - oddsToDecimal(a.odds!.groupWinnerOdds))
    .slice(0, 5);

  // Top 4 final positions
  const sf = bracket.sf;
  const sfTeams = sf
    .flatMap((m) => [m.team1, m.team2])
    .filter((t): t is NonNullable<typeof t> => t !== null);

  return (
    <div>
      {/* Champion reveal */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(232,185,74,0.06) 0%, rgba(232,185,74,0.02) 100%)',
          border: '1px solid rgba(232,185,74,0.30)',
          borderRadius: 6,
          padding: '32px 24px',
          textAlign: 'center',
          marginBottom: 28,
        }}
      >
        <TLabel color="var(--color-gold)">Your champion</TLabel>
        {winner ? (
          <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 16 }}>
            {flagUrl(winner.flag, 80) && (
              <img
                src={flagUrl(winner.flag, 80)!}
                alt={winner.name}
                width={48}
                height={32}
                style={{ borderRadius: 2, boxShadow: '0 1px 0 rgba(0,0,0,0.4)' }}
              />
            )}
            <span
              style={{
                fontSize: 36,
                fontWeight: 600,
                color: 'var(--color-gold)',
                letterSpacing: '-0.018em',
              }}
            >
              {winner.name}
            </span>
          </div>
        ) : (
          <div style={{ marginTop: 12, color: 'var(--color-text-3)', fontSize: 14 }}>
            Finish picking the bracket to lock a winner.
          </div>
        )}
        {winnerOdds && (
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--color-text-2)',
            }}
          >
            {winnerOdds.outrightSource === 'live' ? (
              <>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    padding: '2px 7px',
                    borderRadius: 3,
                    background: 'rgba(94,200,138,0.10)',
                    border: '1px solid rgba(94,200,138,0.28)',
                    color: 'var(--color-green)',
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: 'var(--color-green)',
                      boxShadow: '0 0 0 2px rgba(94,200,138,0.20)',
                    }}
                  />
                  Live
                </span>
                <span>
                  Median <span style={{ color: 'var(--color-gold)' }}>{winnerOdds.outrightOdds}</span>
                </span>
                {winnerOdds.outrightBest !== undefined && (
                  <>
                    <span style={{ color: 'var(--color-text-4)' }}>·</span>
                    <span>
                      Best{' '}
                      <span style={{ color: 'var(--color-gold)' }}>
                        {winnerOdds.outrightBest.toFixed(2)}
                      </span>
                    </span>
                  </>
                )}
                {winnerOdds.outrightSamples !== undefined && (
                  <>
                    <span style={{ color: 'var(--color-text-4)' }}>·</span>
                    <span style={{ color: 'var(--color-text-3)' }}>
                      {winnerOdds.outrightSamples} books
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                Pinnacle outright price ·{' '}
                <span style={{ color: 'var(--color-gold)' }}>{winnerOdds.outrightOdds}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Track the picks this bracket implies */}
      {winner && (
        <div style={{ marginBottom: 28 }}>
          <AmiupCallout
            source="bracket-results"
            eyebrow="Now turn it into bets"
            headline={`Back ${winner.name} + your value group winners on Am I Up`}
            sub="Paste the outright, the group winners, the top scorer — it logs them as structured rows. P/L, CLV and equity curve update live as results come in."
            buttonLabel="Track this bracket"
          />
        </div>
      )}

      {/* Final + top scorer summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 28 }}>
        {finalist1 && finalist2 && (
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              padding: 16,
            }}
          >
            <TLabel>Predicted final</TLabel>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <FinalistChip team={finalist1} />
              <span style={{ fontSize: 11, color: 'var(--color-text-4)', fontFamily: 'var(--font-mono)' }}>VS</span>
              <FinalistChip team={finalist2} />
            </div>
            <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-3)' }}>
              MetLife Stadium · July 19
            </div>
          </div>
        )}

        {topScorer && (
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 6,
              padding: 16,
            }}
          >
            <TLabel>Golden Boot pick</TLabel>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              {flagUrl(topScorer.flag, 40) && (
                <img
                  src={flagUrl(topScorer.flag, 40)!}
                  alt={topScorer.country}
                  width={28}
                  height={19}
                  style={{ borderRadius: 1, flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text)', letterSpacing: '-0.012em' }}>
                  {topScorer.name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {topScorer.country}
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-gold)', fontWeight: 600 }}>
                {topScorer.odds}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Semi-finalists row */}
      {sfTeams.length === 4 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ marginBottom: 10 }}>
            <TLabel>Your semi-finalists</TLabel>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
            {sfTeams.map((slot, i) => (
              <SemiCard key={i} slot={slot} />
            ))}
          </div>
        </div>
      )}

      {/* Value plays */}
      {valuePlays.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ marginBottom: 10 }}>
            <TLabel>Group-winner value plays</TLabel>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 8 }}>
            {valuePlays.map(({ group, team, odds }) => team && odds && (
              <div
                key={group}
                style={{
                  background: 'rgba(94,200,138,0.04)',
                  border: '1px solid rgba(94,200,138,0.25)',
                  borderRadius: 4,
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                {flagUrl(team.flag, 40) && (
                  <img src={flagUrl(team.flag, 40)!} alt={team.name} width={20} height={14} style={{ borderRadius: 1, flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--color-text)', letterSpacing: '-0.005em' }}>
                    {team.name} to win Group {group}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--color-green)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>
                    Value play
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-green)', fontWeight: 600 }}>
                  {odds.groupWinnerOdds}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All group winners table */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ marginBottom: 10 }}>
          <TLabel>All group winner picks</TLabel>
        </div>
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 6,
            overflow: 'hidden',
            background: 'var(--color-surface)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{
                  padding: '10px 14px',
                  textAlign: 'left',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-3)',
                  fontWeight: 500,
                  borderBottom: '1px solid var(--color-border)',
                }}>Group</th>
                <th style={{
                  padding: '10px 14px',
                  textAlign: 'left',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-3)',
                  fontWeight: 500,
                  borderBottom: '1px solid var(--color-border)',
                }}>Pick</th>
                <th style={{
                  padding: '10px 14px',
                  textAlign: 'right',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-3)',
                  fontWeight: 500,
                  borderBottom: '1px solid var(--color-border)',
                }}>Odds</th>
              </tr>
            </thead>
            <tbody>
              {groupWinnerPicks.map(({ group, team, odds }, i) => team && odds && (
                <tr
                  key={group}
                  style={{
                    background: i % 2 ? 'var(--color-bg-2)' : 'transparent',
                    borderBottom: i === groupWinnerPicks.length - 1 ? 'none' : '1px solid var(--color-border)',
                  }}
                >
                  <td style={{ padding: '9px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text-3)' }}>
                    {group}
                  </td>
                  <td style={{ padding: '9px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {flagUrl(team.flag, 40) && (
                        <img src={flagUrl(team.flag, 40)!} alt={team.name} width={18} height={12} style={{ borderRadius: 1 }} />
                      )}
                      <span style={{ fontSize: 13, color: 'var(--color-text)' }}>{team.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '9px 14px', textAlign: 'right' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        color: isValuePlay(odds.groupWinnerOdds) ? 'var(--color-green)' : 'var(--color-text-2)',
                        fontWeight: isValuePlay(odds.groupWinnerOdds) ? 600 : 400,
                      }}
                    >
                      {odds.groupWinnerOdds}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
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
          ← Back to top scorer
        </button>
        <button
          onClick={onReset}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: 4,
            color: 'var(--color-text-3)',
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.04em',
          }}
        >
          Start over
        </button>
      </div>
    </div>
  );
}

function FinalistChip({ team }: { team: { name: string; flag: string } }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 10px',
        background: 'var(--color-bg-2)',
        border: '1px solid var(--color-border)',
        borderRadius: 3,
      }}
    >
      {flagUrl(team.flag, 40) && (
        <img src={flagUrl(team.flag, 40)!} alt={team.name} width={20} height={14} style={{ borderRadius: 1 }} />
      )}
      <span style={{ fontSize: 13, color: 'var(--color-text)', fontWeight: 500 }}>{team.name}</span>
    </span>
  );
}

function SemiCard({ slot }: { slot: { team: { name: string; flag: string; code: string }; source: string } }) {
  const url = flagUrl(slot.team.flag, 40);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 4,
      }}
    >
      {url ? (
        <img src={url} alt={slot.team.name} width={20} height={14} style={{ borderRadius: 1 }} />
      ) : (
        <div style={{ width: 20, height: 14, borderRadius: 1, background: 'var(--color-surface-3)' }} />
      )}
      <span style={{ flex: 1, fontSize: 13, color: 'var(--color-text)', letterSpacing: '-0.005em' }}>
        {slot.team.name}
      </span>
      <TMono size={9} color="var(--color-text-4)">{slot.source}</TMono>
    </div>
  );
}

// Suppress lint warning for unused import — TPill is exported for future hooks but
// not currently rendered. Keep ready for share-card iteration.
void TPill;
