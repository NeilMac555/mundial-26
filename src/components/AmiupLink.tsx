// Single source of truth for every link to amiup.io across the Mundial site.
// Change the URL, copy, or tone here and every placement updates.

import type { CSSProperties, ReactNode } from 'react';

export const AMIUP_URL = 'https://amiup.io';

interface BaseProps {
  /** Optional UTM-like ref param so we can see which surface drove the click. */
  source: string;
  children?: ReactNode;
  style?: CSSProperties;
  /** Forces text content when `children` is omitted. */
  label?: string;
}

function href(source: string): string {
  // Use a single shareable query param so the destination can log attribution
  // without us touching analytics here.
  const sep = AMIUP_URL.includes('?') ? '&' : '?';
  return `${AMIUP_URL}${sep}ref=mundial&src=${encodeURIComponent(source)}`;
}

/* ============================================================
   PILL — loud gold-bordered CTA. Topbar + contextual cards.
   ============================================================ */

export function AmiupPill({ source, label = 'Track on amiup.io', style, children }: BaseProps) {
  return (
    <a
      href={href(source)}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        background: 'rgba(232,185,74,0.10)',
        border: '1px solid var(--color-gold)',
        borderRadius: 4,
        color: 'var(--color-gold)',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '-0.005em',
        textDecoration: 'none',
        fontFamily: 'var(--font-sans)',
        whiteSpace: 'nowrap',
        transition: 'background 0.12s',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(232,185,74,0.18)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(232,185,74,0.10)'; }}
    >
      {children ?? label}
      <span style={{ fontSize: 10, opacity: 0.85 }}>↗</span>
    </a>
  );
}

/* ============================================================
   INLINE — small mono link. Sidebar footer + post-card tucks.
   ============================================================ */

export function AmiupInline({ source, label = 'amiup.io', style }: BaseProps) {
  return (
    <a
      href={href(source)}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10.5,
        color: 'var(--color-gold)',
        letterSpacing: '0.04em',
        textDecoration: 'none',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
      onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
    >
      {label} ↗
    </a>
  );
}

/* ============================================================
   CALLOUT — full-width gold-bordered card for end-of-section CTAs.
   ============================================================ */

interface CalloutProps {
  source: string;
  /** Eyebrow label (small uppercase mono). */
  eyebrow?: string;
  /** Headline (bigger, gold). */
  headline: string;
  /** Supporting copy (body text). */
  sub?: string;
  /** Button label override. */
  buttonLabel?: string;
}

export function AmiupCallout({
  source,
  eyebrow = 'Now turn it into bets',
  headline,
  sub,
  buttonLabel = 'Open Am I Up',
}: CalloutProps) {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(232,185,74,0.06), rgba(232,185,74,0.12))',
        border: '1px solid rgba(232,185,74,0.40)',
        borderRadius: 8,
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ minWidth: 0, flex: '1 1 360px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            fontWeight: 500,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 16,
            fontWeight: 500,
            color: 'var(--color-text)',
            letterSpacing: '-0.01em',
          }}
        >
          {headline}
        </div>
        {sub && (
          <div style={{ marginTop: 6, fontSize: 12.5, lineHeight: 1.5, color: 'var(--color-text-2)' }}>
            {sub}
          </div>
        )}
      </div>
      <AmiupPill source={source} label={buttonLabel} />
    </div>
  );
}
