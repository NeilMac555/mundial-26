// PaywallContext — single source of truth for Pro-access state.
//
// Persists the unlock JWT in localStorage, reads ?unlock= from the URL
// (magic-link flow) and ?checkout=success&session_id= (just-paid flow),
// and exposes hasPro + the unlock modal trigger to the rest of the app.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'mundial26.proToken';

interface PaywallValue {
  /** True if the user has a valid Pro JWT in localStorage. */
  hasPro: boolean;
  /** Open the unlock modal (e.g. when user clicks a gated feature). */
  openUnlock: () => void;
  /** Close the unlock modal. */
  closeUnlock: () => void;
  /** Is the unlock modal open? */
  isUnlockOpen: boolean;
  /** Manually unlock with a token (used by magic-link + checkout-success flows). */
  setToken: (token: string) => void;
  /** Sign out / clear stored token. */
  signOut: () => void;
  /** Are we currently in the middle of confirming a just-completed checkout? */
  isConfirming: boolean;
}

const PaywallCtx = createContext<PaywallValue | null>(null);

function decodeJwtExpiry(token: string): number | null {
  // Lightweight JWT exp extraction — full verification happens server-side
  // (we trust localStorage for UX; gated content always has server-side fallback).
  try {
    const [, payloadB64] = token.split('.');
    if (!payloadB64) return null;
    const padded = payloadB64 + '='.repeat((4 - (payloadB64.length % 4)) % 4);
    const json = JSON.parse(atob(padded.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof json.exp === 'number' ? json.exp : null;
  } catch {
    return null;
  }
}

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  const exp = decodeJwtExpiry(token);
  if (exp == null) return false;
  return Date.now() / 1000 < exp;
}

export function PaywallProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    return isTokenValid(stored) ? stored : null;
  });
  const [isUnlockOpen, setUnlockOpen] = useState(false);
  const [isConfirming, setConfirming] = useState(false);

  const setToken = useCallback((next: string) => {
    if (!isTokenValid(next)) {
      console.warn('[paywall] refusing to store invalid token');
      return;
    }
    localStorage.setItem(STORAGE_KEY, next);
    setTokenState(next);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setTokenState(null);
  }, []);

  // On first mount, handle three URL-driven flows:
  //   ?unlock=<jwt>           → from magic-link email
  //   ?checkout=success&session_id=<id> → from Stripe redirect after pay
  //   ?checkout=cancel        → just clean the URL
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    const unlockParam = params.get('unlock');
    if (unlockParam) {
      setToken(unlockParam);
      params.delete('unlock');
      window.history.replaceState(null, '', url.pathname + (params.toString() ? '?' + params.toString() : '') + url.hash);
      return;
    }

    const checkout = params.get('checkout');
    if (checkout === 'success') {
      const sessionId = params.get('session_id');
      params.delete('checkout');
      params.delete('session_id');
      window.history.replaceState(null, '', url.pathname + (params.toString() ? '?' + params.toString() : '') + url.hash);

      if (sessionId) {
        setConfirming(true);
        fetch('/api/verify-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        })
          .then(async (r) => {
            if (!r.ok) throw new Error('verification failed');
            return r.json();
          })
          .then((data: { token: string }) => {
            if (data.token) setToken(data.token);
            setUnlockOpen(true); // show the success modal
          })
          .catch((err) => {
            console.error('[paywall] checkout verification failed:', err);
          })
          .finally(() => setConfirming(false));
      }
      return;
    }
    if (checkout === 'cancel') {
      params.delete('checkout');
      window.history.replaceState(null, '', url.pathname + (params.toString() ? '?' + params.toString() : '') + url.hash);
    }
  }, [setToken]);

  const value = useMemo<PaywallValue>(
    () => ({
      hasPro: isTokenValid(token),
      openUnlock: () => setUnlockOpen(true),
      closeUnlock: () => setUnlockOpen(false),
      isUnlockOpen,
      setToken,
      signOut,
      isConfirming,
    }),
    [token, isUnlockOpen, setToken, signOut, isConfirming]
  );

  return <PaywallCtx.Provider value={value}>{children}</PaywallCtx.Provider>;
}

export function usePaywall(): PaywallValue {
  const ctx = useContext(PaywallCtx);
  if (!ctx) throw new Error('usePaywall must be used inside <PaywallProvider>');
  return ctx;
}
