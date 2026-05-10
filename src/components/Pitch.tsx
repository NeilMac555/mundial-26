// Pitch — renders a predicted starting XI on a half-pitch background.
// Designed to drop into the Compare page below the Manager block.

import type { Lineup, PlayerSlot, KitColors } from '../data/lineups';
import { TLabel, TMono } from './terminal/atoms';

export function Pitch({ lineup }: { lineup: Lineup }) {
  return (
    <div>
      {/* Formation chip header */}
      <div style={{ marginBottom: 8, display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <TLabel>Formation</TLabel>
        <TMono size={14} weight={600} color="var(--color-text)">{lineup.formation}</TMono>
      </div>

      {/* Pitch */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 360,
          margin: '0 auto',
          aspectRatio: '3 / 4',
          background: 'linear-gradient(180deg, #0d2418 0%, #0a1d13 100%)',
          border: '1px solid rgba(232,185,74,0.18)',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: 'inset 0 0 24px rgba(0,0,0,0.45)',
        }}
      >
        <PitchMarkings />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            padding: '14px 6px 18px',
          }}
        >
          {lineup.rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {row.map((slot, j) => (
                <Shirt key={`${i}-${j}-${slot.name}`} slot={slot} kit={lineup.kit} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bench */}
      {lineup.bench && lineup.bench.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <TLabel>Bench</TLabel>
          <div
            style={{
              marginTop: 6,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
            }}
          >
            {lineup.bench.map((name) => (
              <span
                key={name}
                style={{
                  padding: '3px 8px',
                  background: 'var(--color-bg-2)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 3,
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-2)',
                  letterSpacing: '-0.005em',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Source attribution */}
      {(lineup.source || lineup.asOf) && (
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          {lineup.source && (
            <TMono size={9} color="var(--color-text-4)">SOURCE · {lineup.source}</TMono>
          )}
          {lineup.asOf && (
            <TMono size={9} color="var(--color-text-4)">AS OF · {lineup.asOf}</TMono>
          )}
        </div>
      )}
    </div>
  );
}

function Shirt({ slot, kit }: { slot: PlayerSlot; kit: KitColors }) {
  const stroke = kit.outline ?? '#000';
  const accent = kit.accent ?? kit.primary;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        flex: '1 1 0',
        minWidth: 0,
        maxWidth: 88,
      }}
      title={slot.pos ? `${slot.pos} · ${slot.name}` : slot.name}
    >
      <svg width="34" height="34" viewBox="0 0 40 40" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.45))' }}>
        {/* Jersey body */}
        <path
          d="M8 10 L14 6 L16 8 Q20 12 24 8 L26 6 L32 10 L34 16 L28 18 L28 34 L12 34 L12 18 L6 16 Z"
          fill={kit.primary}
          stroke={stroke}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        {/* Sleeve accent */}
        <path
          d="M8 10 L14 6 L16 8 L12 18 L6 16 Z"
          fill={accent}
          fillOpacity={0.55}
          stroke={stroke}
          strokeWidth={0.5}
        />
        <path
          d="M32 10 L26 6 L24 8 L28 18 L34 16 Z"
          fill={accent}
          fillOpacity={0.55}
          stroke={stroke}
          strokeWidth={0.5}
        />
      </svg>
      <span
        style={{
          fontSize: 10.5,
          fontFamily: 'var(--font-sans)',
          color: '#fff',
          textAlign: 'center',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          textShadow: '0 1px 2px rgba(0,0,0,0.7)',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {slot.name}
      </span>
      {slot.backup && (
        <span
          style={{
            fontSize: 9,
            fontFamily: 'var(--font-sans)',
            fontStyle: 'italic',
            color: 'rgba(232,185,74,0.78)',
            textAlign: 'center',
            lineHeight: 1.05,
            textShadow: '0 1px 2px rgba(0,0,0,0.65)',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {slot.backup}
        </span>
      )}
    </div>
  );
}

function PitchMarkings() {
  // viewBox is 100 (w) × 134 (h) for a 3:4 aspect — half-pitch portrait orientation.
  // Using stroke that's barely there so the shirts dominate.
  const stroke = 'rgba(232,185,74,0.13)';
  return (
    <svg
      viewBox="0 0 100 134"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      preserveAspectRatio="none"
    >
      {/* Outer touchlines */}
      <rect x="2" y="2" width="96" height="130" fill="none" stroke={stroke} strokeWidth="0.5" />
      {/* Halfway line (top — opposition half visual) */}
      <line x1="2" y1="34" x2="98" y2="34" stroke={stroke} strokeWidth="0.4" />
      {/* Centre circle on halfway line */}
      <circle cx="50" cy="34" r="9" fill="none" stroke={stroke} strokeWidth="0.4" />
      {/* Top penalty box (opposition) */}
      <rect x="26" y="2" width="48" height="14" fill="none" stroke={stroke} strokeWidth="0.4" />
      <rect x="38" y="2" width="24" height="6" fill="none" stroke={stroke} strokeWidth="0.4" />
      {/* Bottom penalty box (own) */}
      <rect x="26" y="118" width="48" height="14" fill="none" stroke={stroke} strokeWidth="0.4" />
      <rect x="38" y="126" width="24" height="6" fill="none" stroke={stroke} strokeWidth="0.4" />
      {/* Penalty spots */}
      <circle cx="50" cy="11" r="0.6" fill={stroke} />
      <circle cx="50" cy="123" r="0.6" fill={stroke} />
    </svg>
  );
}
