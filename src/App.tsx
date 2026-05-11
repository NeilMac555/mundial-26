import { useEffect, useMemo, useState } from 'react';
import { SECTIONS } from './data/sections';
import { SectionNav } from './components/SectionNav';
import { Section } from './components/Section';
import { Overview } from './sections/Overview';
import { Elo } from './sections/Elo';
import { Altitude } from './sections/Altitude';
import { Rules } from './sections/Rules';
import { Compare } from './sections/Compare';
import { Sos } from './sections/Sos';
import { History } from './sections/History';
import { Heat } from './sections/Heat';
import { QualifyingXg } from './sections/QualifyingXg';
import { SquadValue } from './sections/SquadValue';
import { GoldenBoot } from './sections/GoldenBoot';
import { Fixtures } from './sections/Fixtures';
import { Americas } from './sections/Americas';
import { Bracket } from './sections/Bracket';
import { TEyebrow, TMono } from './components/terminal/atoms';
import { PaywallProvider, usePaywall } from './paywall/PaywallContext';
import { PaywallModal } from './paywall/PaywallModal';
import { PaywallGate } from './paywall/PaywallGate';

const SECTION_COMPONENTS: Record<string, () => React.ReactElement> = {
  overview: Overview,
  compare: Compare,
  elo: Elo,
  altitude: Altitude,
  rules: Rules,
  sos: Sos,
  history: History,
  'heat-travel': Heat,
  'qual-xg': QualifyingXg,
  'squad-value': SquadValue,
  'golden-boot': GoldenBoot,
  fixtures: Fixtures,
  americas: Americas,
  'bracket-sim': Bracket,
};

function readHashId(): string {
  if (typeof window === 'undefined') return SECTIONS[0].id;
  const raw = window.location.hash.replace(/^#\/?/, '').trim();
  return SECTIONS.some((s) => s.id === raw) ? raw : SECTIONS[0].id;
}

export default function App() {
  return (
    <PaywallProvider>
      <AppShell />
      <PaywallModal />
    </PaywallProvider>
  );
}

function AppShell() {
  const [activeId, setActiveId] = useState<string>(readHashId);

  useEffect(() => {
    const onHash = () => {
      setActiveId(readHashId());
      const main = document.getElementById('mundial-main');
      if (main) main.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const active = useMemo(() => SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0], [activeId]);
  const Body = SECTION_COMPONENTS[active.id];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '232px 1fr',
        height: '100vh',
        background: 'var(--color-bg)',
      }}
    >
      <SectionNav activeId={activeId} />

      <div
        style={{
          display: 'grid',
          gridTemplateRows: '56px 1fr',
          minWidth: 0,
        }}
      >
        <Topbar active={active} />
        <main
          id="mundial-main"
          style={{
            overflow: 'auto',
            padding: '0 28px 60px',
          }}
        >
          <Section title={active.title} blurb={active.blurb} lede={active.lede} status={active.status}>
            {Body ? (
              active.pro === 'full' ? (
                <PaywallGate feature={active.title} blurb={active.blurb}>
                  <Body />
                </PaywallGate>
              ) : (
                <Body />
              )
            ) : null}
          </Section>
        </main>
      </div>
    </div>
  );
}

function Topbar({ active }: { active: typeof SECTIONS[number] }) {
  const { hasPro, openUnlock } = usePaywall();
  return (
    <header
      style={{
        height: 56,
        padding: '0 24px',
        background: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <TEyebrow>FIFA World Cup 2026 · USA · Canada · Mexico</TEyebrow>
      <span style={{ width: 1, height: 18, background: 'var(--color-border)', margin: '0 6px' }} />
      <TMono size={11} color="var(--color-text-3)">{active.group}</TMono>
      <span style={{ color: 'var(--color-text-4)', fontSize: 11 }}>›</span>
      <TMono size={11} color="var(--color-text)">{active.title}</TMono>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 10px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 4,
          color: 'var(--color-text-3)',
          minWidth: 220,
        }}>
          <span style={{ fontSize: 12 }}>⌕</span>
          <span style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: 11 }}>Search teams, players, markets</span>
          <span style={{
            padding: '1px 5px',
            background: 'var(--color-surface-3)',
            borderRadius: 2,
            fontSize: 9.5,
            color: 'var(--color-text-2)',
            fontFamily: 'var(--font-mono)',
          }}>⌘K</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--color-green)',
            boxShadow: '0 0 0 3px rgba(94,200,138,0.16)',
          }} />
          <TMono size={10} color="var(--color-text-2)">FEED · LIVE</TMono>
        </div>
        {hasPro ? (
          <div
            onClick={openUnlock}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '5px 10px',
              background: 'rgba(232,185,74,0.10)',
              border: '1px solid rgba(232,185,74,0.40)',
              borderRadius: 4,
              cursor: 'pointer',
            }}
            title="Manage your Pro access"
          >
            <span style={{ fontSize: 10, color: 'var(--color-gold)' }}>✓</span>
            <TMono size={10} color="var(--color-gold)">PRO</TMono>
          </div>
        ) : (
          <button
            onClick={openUnlock}
            style={{
              padding: '6px 12px',
              background: 'var(--color-gold)',
              color: 'var(--color-bg)',
              border: 'none',
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Unlock · £14.99
          </button>
        )}
      </div>
    </header>
  );
}
