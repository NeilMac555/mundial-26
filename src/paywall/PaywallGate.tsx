// PaywallGate — wraps any premium content. If user has Pro, renders children.
// Otherwise renders either:
//   - A full lock card (when no `peek` provided)
//   - The `peek` content with a "Unlock the rest" CTA underneath (sneak-peek pattern)

import type { ReactNode } from 'react';
import { usePaywall } from './PaywallContext';
import { TLabel, TMono } from '../components/terminal/atoms';

interface FullLockProps {
  /** What the user is locked out of, e.g. "Heat Vulnerability". */
  feature: string;
  /** Optional one-line description of what they'll get. */
  blurb?: string;
}

interface PaywallGateProps {
  feature: string;
  blurb?: string;
  /** If provided, the gate renders this preview, with a small unlock CTA underneath. */
  peek?: ReactNode;
  /** What to render when the user IS Pro. */
  children: ReactNode;
}

export function PaywallGate({ feature, blurb, peek, children }: PaywallGateProps) {
  const { hasPro, openUnlock } = usePaywall();
  if (hasPro) return <>{children}</>;
  if (peek) {
    return (
      <div>
        {peek}
        <SneakPeekFooter feature={feature} onUnlock={openUnlock} />
      </div>
    );
  }
  return <FullLockCard feature={feature} blurb={blurb} onUnlock={openUnlock} />;
}

function FullLockCard({
  feature,
  blurb,
  onUnlock,
}: FullLockProps & { onUnlock: () => void }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gold corner accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          background: 'radial-gradient(circle at top right, rgba(232,185,74,0.10), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <LockIcon />
        <TLabel color="var(--color-gold)">Mundial '26 Pro</TLabel>
      </div>

      <div>
        <h3
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 500,
            color: 'var(--color-text)',
            letterSpacing: '-0.012em',
          }}
        >
          Unlock {feature}
        </h3>
        {blurb && (
          <p
            style={{
              margin: '6px 0 0',
              fontSize: 13,
              color: 'var(--color-text-3)',
              lineHeight: 1.55,
              maxWidth: 540,
            }}
          >
            {blurb}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 4 }}>
        <button
          onClick={onUnlock}
          style={{
            padding: '11px 22px',
            background: 'var(--color-gold)',
            color: 'var(--color-bg)',
            border: 'none',
            borderRadius: 4,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '-0.005em',
          }}
        >
          Unlock for £14.99
        </button>
        <TMono size={11} color="var(--color-text-3)">one-time · no subscription</TMono>
      </div>
    </div>
  );
}

function SneakPeekFooter({
  feature,
  onUnlock,
}: {
  feature: string;
  onUnlock: () => void;
}) {
  return (
    <div
      style={{
        marginTop: 18,
        padding: '14px 18px',
        background: 'linear-gradient(180deg, rgba(232,185,74,0.04), rgba(232,185,74,0.08))',
        border: '1px solid rgba(232,185,74,0.30)',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <LockIcon size={14} />
        <div>
          <div
            style={{
              fontSize: 13,
              color: 'var(--color-text)',
              fontWeight: 500,
              letterSpacing: '-0.005em',
            }}
          >
            That's the sneak peek — unlock the full {feature}
          </div>
          <TMono size={10} color="var(--color-text-3)">
            Plus 10 more pro sections · one £14.99 payment
          </TMono>
        </div>
      </div>
      <button
        onClick={onUnlock}
        style={{
          padding: '9px 18px',
          background: 'var(--color-gold)',
          color: 'var(--color-bg)',
          border: 'none',
          borderRadius: 4,
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '-0.005em',
          flexShrink: 0,
        }}
      >
        Unlock · £14.99
      </button>
    </div>
  );
}

function LockIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      style={{ flexShrink: 0 }}
      aria-hidden
    >
      <rect x="2" y="5.5" width="8" height="5" rx="1" stroke="var(--color-gold)" strokeWidth="1.2" />
      <path d="M4 5.5V4a2 2 0 1 1 4 0v1.5" stroke="var(--color-gold)" strokeWidth="1.2" />
    </svg>
  );
}
