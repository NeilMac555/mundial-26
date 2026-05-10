import type { ReactNode } from 'react';
import { TPageHeader } from './terminal/atoms';

interface Props {
  title: string;
  blurb?: string;
  lede?: string;
  status?: 'live' | 'stub';
  children: ReactNode;
}

/**
 * Section frame for the Terminal layout.
 *
 * Renders a TPageHeader (h1 + lede) at the top, then the children below in a
 * 28px-padded body. Sections themselves are responsible for any KPIs, captions,
 * cards, or tables — Section just provides the page-level frame so chrome stays
 * consistent across all 13 pages.
 */
export function Section({ title, blurb, lede, status = 'live', children }: Props) {
  return (
    <section style={{ paddingTop: 0 }}>
      <TPageHeader title={title} lede={lede ?? blurb} />
      {status === 'stub' && (
        <div
          style={{
            margin: '14px 0 0',
            padding: '10px 14px',
            background: 'rgba(214,90,108,0.08)',
            border: '1px solid rgba(214,90,108,0.28)',
            borderRadius: 4,
            color: 'var(--color-red)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Stub — needs data
        </div>
      )}
      <div style={{ paddingTop: 22, paddingBottom: 60 }}>{children}</div>
    </section>
  );
}
