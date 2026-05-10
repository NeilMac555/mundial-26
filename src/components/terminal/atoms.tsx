// Mundial Terminal — atom library.
// Every section composes these. Inline `style={{ ... }}` reading CSS vars from
// index.css (--color-bg, --color-surface, --color-text, --color-gold, etc.) so
// nothing depends on Tailwind's stone/amber palette.

import type { CSSProperties, ReactNode } from 'react';

/* ============================================================
   T_LABEL — small uppercase mono microtype
   ============================================================ */

export function TLabel({
  children, color, className,
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={'font-mono uppercase ' + (className ?? '')}
      style={{
        fontSize: 10,
        letterSpacing: '0.12em',
        color: color ?? 'var(--color-text-3)',
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

/* ============================================================
   T_EYEBROW — labels with a leading gold dot
   ============================================================ */

export function TEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="t-eyebrow">{children}</span>
  );
}

/* ============================================================
   T_MONO — generic mono numeric display
   ============================================================ */

export function TMono({
  children, size = 12, color, weight = 500, className, style,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  weight?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={'num ' + (className ?? '')}
      style={{
        fontSize: size,
        color: color ?? 'var(--color-text-2)',
        fontWeight: weight,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ============================================================
   T_PILL — small chip with a tone
   ============================================================ */

export type PillTone = 'mute' | 'gold' | 'red' | 'green' | 'outline';

const PILL_TONES: Record<PillTone, { bg: string; fg: string; bd: string }> = {
  mute:    { bg: 'rgba(154,164,182,0.08)', fg: 'var(--color-text-2)', bd: 'rgba(154,164,182,0.18)' },
  gold:    { bg: 'rgba(232,185,74,0.10)',  fg: 'var(--color-gold)',   bd: 'rgba(232,185,74,0.28)'  },
  red:     { bg: 'rgba(214,90,108,0.10)',  fg: 'var(--color-red)',    bd: 'rgba(214,90,108,0.28)'  },
  green:   { bg: 'rgba(94,200,138,0.10)',  fg: 'var(--color-green)',  bd: 'rgba(94,200,138,0.28)'  },
  outline: { bg: 'transparent',             fg: 'var(--color-text-2)', bd: 'var(--color-border-2)'  },
};

export function TPill({
  children, tone = 'mute', size = 'md',
}: {
  children: ReactNode;
  tone?: PillTone;
  size?: 'sm' | 'md';
}) {
  const t = PILL_TONES[tone];
  const fs = size === 'sm' ? 10 : 11;
  const pd = size === 'sm' ? '2px 6px' : '3px 8px';
  return (
    <span
      className="font-mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: pd,
        borderRadius: 3,
        background: t.bg,
        color: t.fg,
        border: '1px solid ' + t.bd,
        fontSize: fs,
        fontWeight: 500,
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

/* ============================================================
   T_DELTA — directional pill with arrow + value
   ============================================================ */

export function TDelta({
  value, format = 'num', precision = 2, suffix = '', invert = false,
}: {
  value: number;
  format?: 'num' | 'pct';
  precision?: number;
  suffix?: string;
  /** If true, treat negatives as gold (good) and positives as red. Useful for "cost" deltas. */
  invert?: boolean;
}) {
  const positive = invert ? value < 0 : value > 0;
  const tone: PillTone = value === 0 ? 'mute' : positive ? 'green' : 'red';
  const arrow = value === 0 ? '·' : positive ? '↑' : '↓';
  const txt = format === 'pct'
    ? `${Math.abs(value).toFixed(precision)}%`
    : `${value > 0 ? '+' : ''}${value.toFixed(precision)}${suffix}`;
  return <TPill tone={tone} size="sm">{arrow} {txt}</TPill>;
}

/* ============================================================
   T_SORT_HEAD — clickable column header with sort caret
   ============================================================ */

export function TSortHead({
  label, align = 'right', active, dir, onClick, mono = true, className,
}: {
  label: ReactNode;
  align?: 'left' | 'right';
  active?: boolean;
  dir?: 'asc' | 'desc';
  onClick?: () => void;
  mono?: boolean;
  className?: string;
}) {
  return (
    <th
      onClick={onClick}
      className={'cursor-pointer select-none ' + (className ?? '')}
      style={{
        textAlign: align,
        padding: '11px 14px',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <span
        className={mono ? 'font-mono' : ''}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 10.5,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: active ? 'var(--color-text)' : 'var(--color-text-3)',
        }}
      >
        {label}
        <span
          style={{
            fontSize: 9,
            color: active ? 'var(--color-gold)' : 'var(--color-text-4)',
            transform: active && dir === 'asc' ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.15s',
          }}
        >
          ▾
        </span>
      </span>
    </th>
  );
}

/* ============================================================
   T_PAGE_HEADER — title + lede + KPI row
   Used at the top of every section page.
   ============================================================ */

export interface KPI {
  label: string;
  value: ReactNode;
  delta?: number;
  unit?: string;
  tone?: PillTone;
}

export function TPageHeader({
  title, lede, kpis,
}: {
  title: string;
  lede?: string;
  kpis?: KPI[];
}) {
  return (
    <div
      style={{
        padding: '28px 0 18px',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <h1
        className="font-display"
        style={{
          margin: 0,
          fontSize: 32,
          fontWeight: 500,
          color: 'var(--color-text)',
          letterSpacing: '-0.018em',
          lineHeight: 1.1,
        }}
      >
        {title}
      </h1>
      {lede && (
        <p
          style={{
            margin: '8px 0 0',
            fontSize: 14,
            lineHeight: 1.5,
            color: 'var(--color-text-2)',
            maxWidth: 760,
            fontWeight: 400,
          }}
        >
          {lede}
        </p>
      )}
      {kpis && kpis.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 28,
            marginTop: 22,
          }}
        >
          {kpis.map((k, i) => (
            <div key={i}>
              <TLabel>{k.label}</TLabel>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span
                  className="num"
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    color: 'var(--color-text)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {k.value}
                </span>
                {k.delta !== undefined && <TDelta value={k.delta} format="num" precision={2} />}
                {k.unit && (
                  <TMono size={11} color="var(--color-text-3)">
                    {k.unit}
                  </TMono>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   T_CAPTION — methodology / source line under page header
   ============================================================ */

export function TCaption({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        padding: '14px 0',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {children}
    </div>
  );
}

export function TCaptionItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TLabel>{label}</TLabel>
      <TMono size={11} color="var(--color-text-2)">{value}</TMono>
    </div>
  );
}

/* ============================================================
   T_CARD — generic surface card
   ============================================================ */

export function TCard({
  children, className, padding = 18, style,
}: {
  children: ReactNode;
  className?: string;
  padding?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   T_BAR — mini horizontal bar (track + fill)
   ============================================================ */

export function TBar({
  pct, color, width, height = 4,
}: {
  pct: number;          // 0–100
  color?: string;       // fill colour
  width?: number;       // optional fixed width
  height?: number;
}) {
  return (
    <div
      style={{
        width: width ?? '100%',
        height,
        background: 'var(--color-surface-3)',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${Math.max(0, Math.min(100, pct))}%`,
          height: '100%',
          background: color ?? 'var(--color-gold)',
        }}
      />
    </div>
  );
}
