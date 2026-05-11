import { sectionsByGroup, SECTION_GROUPS } from '../data/sections';
import { TLabel, TMono } from './terminal/atoms';
import { usePaywall } from '../paywall/PaywallContext';

export function SectionNav({ activeId }: { activeId: string }) {
  const grouped = sectionsByGroup();
  const { hasPro } = usePaywall();
  return (
    <aside
      style={{
        width: 232,
        height: '100vh',
        background: 'var(--color-bg-2)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <BrandBlock />
      <nav style={{ flex: 1, overflow: 'auto', padding: '10px 0' }}>
        {SECTION_GROUPS.map((group) => (
          <div key={group} style={{ marginBottom: 14 }}>
            <div
              style={{
                padding: '8px 18px 4px',
                fontFamily: 'var(--font-mono)',
                fontSize: 9.5,
                color: 'var(--color-text-4)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {group}
            </div>
            {grouped[group].map((s) => {
              const isActive = activeId === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  style={{
                    display: 'block',
                    padding: '8px 16px 8px 18px',
                    fontSize: 13,
                    color: isActive ? 'var(--color-text)' : 'var(--color-text-2)',
                    fontWeight: isActive ? 500 : 400,
                    background: isActive ? 'var(--color-surface-2)' : 'transparent',
                    borderLeft: '2px solid ' + (isActive ? 'var(--color-gold)' : 'transparent'),
                    letterSpacing: '-0.005em',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--color-row-hov)';
                      e.currentTarget.style.color = 'var(--color-text)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--color-text-2)';
                    }
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {s.navLabel ?? s.title}
                    {!hasPro && s.pro && <NavLock peek={s.pro === 'peek'} />}
                  </span>
                  {s.status === 'stub' && (
                    <span
                      style={{
                        marginLeft: 6,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9,
                        letterSpacing: '0.1em',
                        color: 'var(--color-red)',
                        textTransform: 'uppercase',
                      }}
                    >
                      todo
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
      <FooterBlock />
    </aside>
  );
}

function NavLock({ peek }: { peek: boolean }) {
  return (
    <svg
      width={10}
      height={10}
      viewBox="0 0 12 12"
      fill="none"
      aria-label={peek ? 'Sneak peek — full version locked' : 'Pro only'}
      style={{ flexShrink: 0, opacity: peek ? 0.55 : 0.85 }}
    >
      <rect
        x="2.5"
        y="5.5"
        width="7"
        height="5"
        rx="0.8"
        stroke="var(--color-gold)"
        strokeWidth="1.1"
      />
      <path d="M4 5.5V4a2 2 0 1 1 4 0v1.5" stroke="var(--color-gold)" strokeWidth="1.1" />
    </svg>
  );
}

function BrandBlock() {
  return (
    <div
      style={{
        padding: '18px 16px',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Logo />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <a
          href="#overview"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--color-text)',
            letterSpacing: '-0.005em',
            textDecoration: 'none',
          }}
        >
          Mundial<span style={{ color: 'var(--color-gold)' }}> · </span>'26
        </a>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9.5,
            color: 'var(--color-text-3)',
            letterSpacing: '0.1em',
            marginTop: 2,
          }}
        >
          v 0.5 · '26 EDITION
        </span>
      </div>
    </div>
  );
}

function FooterBlock() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div
      style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <TLabel>Snapshot</TLabel>
      <TMono size={11} color="var(--color-text-2)">{today.toUpperCase()}</TMono>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--color-green)',
            boxShadow: '0 0 0 3px rgba(94,200,138,0.16)',
          }}
        />
        <TMono size={10} color="var(--color-text-3)">FEED · LIVE</TMono>
      </div>
    </div>
  );
}

function Logo() {
  // Simple gold trophy mark, matches the spirit of the design package's TLogo
  // without lifting the SVG verbatim.
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="m-logo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-gold-2)" />
          <stop offset="100%" stopColor="var(--color-gold)" />
        </linearGradient>
      </defs>
      <g fill="url(#m-logo)" stroke="var(--color-gold-d)" strokeWidth="0.4">
        <rect x="8" y="20.2" width="8" height="2.2" rx="0.4" />
        <rect x="9" y="18.4" width="6" height="1.8" rx="0.3" />
        <path d="M10.6 18.4 L13.4 18.4 L13.1 14.5 L10.9 14.5 Z" />
        <path d="M7 8 C 7 5, 9 3.5, 11 3.5 L 11 5 C 9.6 5, 8.5 6.2, 8.5 8 C 8.5 11.5, 10.5 14, 12 14.6 L 11.2 15.5 C 9.5 14.7, 7 12, 7 8 Z" />
        <path d="M17 8 C 17 5, 15 3.5, 13 3.5 L 13 5 C 14.4 5, 15.5 6.2, 15.5 8 C 15.5 11.5, 13.5 14, 12 14.6 L 12.8 15.5 C 14.5 14.7, 17 12, 17 8 Z" />
        <circle cx="12" cy="6.4" r="2.4" />
      </g>
    </svg>
  );
}
