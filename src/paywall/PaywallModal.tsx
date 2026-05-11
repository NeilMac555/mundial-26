// PaywallModal — the unlock dialog. Renders three states:
//   1. Unauthenticated → "Unlock for £14.99" CTA + feature list
//   2. Currently confirming checkout → spinner
//   3. Successfully unlocked → confetti-style success state

import { useState } from 'react';
import { usePaywall } from './PaywallContext';
import { TLabel, TMono, TPill } from '../components/terminal/atoms';

const PRO_FEATURES = [
  'Compare any 2 of 48 teams · full verdict + edges',
  'Live outright market — best prices across 9 bookmakers',
  'Likely XI pitch view for all 48 nations',
  'Qualifying xG — finishing + defending delta per team',
  'Strength of Schedule rankings (full 48 teams)',
  'Heat & Altitude vulnerability per team',
  'Squad Market Value (€)',
  'Manager PPM + tier classification',
  'Americas-Host effect analysis',
  'Golden Boot Forecast',
];

export function PaywallModal() {
  const { hasPro, isUnlockOpen, closeUnlock, isConfirming, signOut } = usePaywall();
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isUnlockOpen) return null;

  const handleCheckout = async () => {
    setError(null);
    setRedirecting(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Checkout unavailable');
      }
      const { url } = await res.json();
      if (!url) throw new Error('No checkout URL returned');
      window.location.href = url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setRedirecting(false);
    }
  };

  return (
    <div
      onClick={closeUnlock}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'grid',
        placeItems: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          width: '100%',
          maxWidth: 480,
          padding: 28,
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {isConfirming ? (
          <ConfirmingState />
        ) : hasPro ? (
          <SuccessState onClose={closeUnlock} onSignOut={signOut} />
        ) : (
          <UnlockState
            error={error}
            redirecting={redirecting}
            onCheckout={handleCheckout}
            onClose={closeUnlock}
          />
        )}
      </div>
    </div>
  );
}

function UnlockState({
  error, redirecting, onCheckout, onClose,
}: {
  error: string | null;
  redirecting: boolean;
  onCheckout: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <div style={{ marginBottom: 6, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <TLabel>Unlock Mundial '26 Pro</TLabel>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-3)',
            fontSize: 18,
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <h2
        style={{
          margin: '6px 0 14px',
          fontSize: 22,
          fontWeight: 500,
          color: 'var(--color-text)',
          letterSpacing: '-0.012em',
        }}
      >
        Everything. One payment. Forever for this World Cup.
      </h2>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 20 }}>
        <TMono size={28} weight={600} color="var(--color-gold)">
          £14.99
        </TMono>
        <TMono size={11} color="var(--color-text-3)">one-time</TMono>
        <TPill tone="green" size="sm">No subscription</TPill>
      </div>

      <div style={{ marginBottom: 22 }}>
        <TLabel>What you get</TLabel>
        <ul
          style={{
            margin: '8px 0 0',
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {PRO_FEATURES.map((f) => (
            <li
              key={f}
              style={{
                fontSize: 13,
                color: 'var(--color-text-2)',
                paddingLeft: 18,
                position: 'relative',
                lineHeight: 1.45,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 2,
                  color: 'var(--color-gold)',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {error && (
        <div
          style={{
            marginBottom: 14,
            padding: '8px 12px',
            background: 'rgba(220,80,80,0.08)',
            border: '1px solid rgba(220,80,80,0.30)',
            borderRadius: 4,
            color: 'var(--color-red)',
            fontSize: 12,
          }}
        >
          {error}
        </div>
      )}

      <button
        onClick={onCheckout}
        disabled={redirecting}
        style={{
          width: '100%',
          padding: '14px 22px',
          background: redirecting ? 'var(--color-surface-2)' : 'var(--color-gold)',
          color: redirecting ? 'var(--color-text-3)' : 'var(--color-bg)',
          border: 'none',
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 600,
          cursor: redirecting ? 'wait' : 'pointer',
          letterSpacing: '-0.005em',
        }}
      >
        {redirecting ? 'Taking you to checkout…' : 'Unlock for £14.99'}
      </button>

      <div
        style={{
          marginTop: 14,
          fontSize: 11,
          color: 'var(--color-text-4)',
          textAlign: 'center',
          letterSpacing: '0.02em',
        }}
      >
        Cards · Apple Pay · Google Pay · Link · Klarna · Clearpay
      </div>
    </>
  );
}

function ConfirmingState() {
  return (
    <div style={{ padding: '32px 0', textAlign: 'center' }}>
      <TMono size={11} color="var(--color-text-3)">CONFIRMING PAYMENT</TMono>
      <h2
        style={{
          margin: '8px 0 0',
          fontSize: 18,
          fontWeight: 500,
          color: 'var(--color-text)',
          letterSpacing: '-0.012em',
        }}
      >
        Unlocking your access…
      </h2>
    </div>
  );
}

function SuccessState({ onClose, onSignOut }: { onClose: () => void; onSignOut: () => void }) {
  return (
    <div>
      <TLabel>Mundial '26 Pro</TLabel>
      <h2
        style={{
          margin: '8px 0 14px',
          fontSize: 22,
          fontWeight: 500,
          color: 'var(--color-gold)',
          letterSpacing: '-0.012em',
        }}
      >
        You're in.
      </h2>
      <p style={{ margin: '0 0 18px', fontSize: 14, color: 'var(--color-text-2)', lineHeight: 1.55 }}>
        Every section is unlocked on this browser. Check your inbox for a magic link — paste it in any
        other browser (phone, work laptop) to unlock there too.
      </p>
      <button
        onClick={onClose}
        style={{
          width: '100%',
          padding: '12px 22px',
          background: 'var(--color-gold)',
          color: 'var(--color-bg)',
          border: 'none',
          borderRadius: 4,
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Let's go
      </button>
      <div style={{ marginTop: 14, textAlign: 'center' }}>
        <button
          onClick={onSignOut}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-4)',
            fontSize: 11,
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Sign out of this browser
        </button>
      </div>
    </div>
  );
}
