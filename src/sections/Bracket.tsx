// Bracket Simulator section — full multi-step pick-em UI.
// Internally a step machine with localStorage persistence; externally a single
// Mundial Companion sidebar entry under Markets.

import { useEffect, useMemo, useReducer, useRef } from 'react';
import { BRACKET_GROUPS, bracketTeamByCode } from '../data/bracketTeams';
import { buildBracket, type BracketData, type GroupResult } from '../lib/bracketEngine';
import {
  type BracketSimState,
  type BracketStep,
  INITIAL_STATE,
  loadState,
  saveState,
  clearState,
} from './bracket/state';
import { Stepper } from './bracket/Stepper';
import { IntroStep } from './bracket/IntroStep';
import { GroupsStep } from './bracket/GroupsStep';
import { ThirdPlaceStep } from './bracket/ThirdPlaceStep';
import { KnockoutStep } from './bracket/KnockoutStep';
import { TopScorerStep } from './bracket/TopScorerStep';
import { ResultsStep } from './bracket/ResultsStep';

/* ============================================================
   Reducer — single source of truth for all picks
   ============================================================ */

type Action =
  | { type: 'load'; state: BracketSimState }
  | { type: 'goto'; step: BracketStep }
  | { type: 'setGroups'; groupResults: BracketSimState['groupResults'] }
  | { type: 'setThirds'; qualifyingThirds: string[] }
  | { type: 'setBracket'; bracket: BracketData }
  | { type: 'setTopScorer'; name: string | null }
  | { type: 'reset' };

function reducer(state: BracketSimState, action: Action): BracketSimState {
  switch (action.type) {
    case 'load':       return action.state;
    case 'goto':       return { ...state, step: action.step };
    case 'setGroups':  return { ...state, groupResults: action.groupResults };
    case 'setThirds':  return { ...state, qualifyingThirds: action.qualifyingThirds };
    case 'setBracket': return { ...state, bracket: action.bracket };
    case 'setTopScorer': return { ...state, topScorerName: action.name };
    case 'reset':      return INITIAL_STATE;
  }
}

/* ============================================================
   Section orchestrator
   ============================================================ */

export function Bracket() {
  // Lazy init — `loadState()` runs once on mount, before any render or effect,
  // so the very first paint already reflects what's in localStorage. No separate
  // hydrate effect (and therefore no race with the persistence effect below).
  const [state, dispatch] = useReducer(reducer, undefined, () => loadState());

  // Skip the very first persist call — it would just write back what we just
  // loaded. Subsequent renders genuinely save user changes.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveState(state);
  }, [state]);

  // Derive completion state for the stepper.
  const completed: Record<BracketStep, boolean> = useMemo(() => ({
    intro: true,
    groups: Object.keys(state.groupResults).length === 12,
    thirds: state.qualifyingThirds.length === 8,
    knockouts: !!state.bracket?.final.winner,
    topscorer: !!state.topScorerName,
    results: false, // never marked done — terminal step
  }), [state]);

  // Sub-progress for the active step (used as the thin bar under the stepper).
  const subProgress = useMemo(() => {
    switch (state.step) {
      case 'groups': return (Object.keys(state.groupResults).length / 12) * 100;
      case 'thirds': return (state.qualifyingThirds.length / 8) * 100;
      case 'knockouts':
        if (!state.bracket) return 0;
        const total = 31;
        const done =
          state.bracket.r32.filter((m) => m.winner).length +
          state.bracket.r16.filter((m) => m.winner).length +
          state.bracket.qf.filter((m) => m.winner).length +
          state.bracket.sf.filter((m) => m.winner).length +
          (state.bracket.final.winner ? 1 : 0);
        return (done / total) * 100;
      default: return undefined;
    }
  }, [state]);

  // Helpers — wrap dispatch with bracket-rebuild logic where needed.
  const handleGoto = (step: BracketStep) => dispatch({ type: 'goto', step });

  const continueFromGroups = () => dispatch({ type: 'goto', step: 'thirds' });

  const continueFromThirds = () => {
    // Build the bracket once we've got groups + thirds.
    const groupResults: GroupResult[] = BRACKET_GROUPS.map((g) => {
      const r = state.groupResults[g];
      return {
        group: g,
        first:  bracketTeamByCode(r.first)!,
        second: bracketTeamByCode(r.second)!,
        third:  bracketTeamByCode(r.third)!,
        fourth: bracketTeamByCode(r.fourth)!,
      };
    });
    const bracket = buildBracket(groupResults, state.qualifyingThirds);
    dispatch({ type: 'setBracket', bracket });
    dispatch({ type: 'goto', step: 'knockouts' });
  };

  const continueFromKnockouts = () => dispatch({ type: 'goto', step: 'topscorer' });
  const continueFromTopScorer = () => dispatch({ type: 'goto', step: 'results' });

  const handleReset = () => {
    clearState();
    dispatch({ type: 'reset' });
  };

  const hasProgress =
    Object.keys(state.groupResults).length > 0 ||
    state.qualifyingThirds.length > 0 ||
    state.bracket !== null ||
    state.topScorerName !== null;

  return (
    <div>
      <Stepper
        active={state.step}
        completed={completed}
        onJump={handleGoto}
        progress={subProgress}
      />

      {state.step === 'intro' && (
        <IntroStep
          hasProgress={hasProgress}
          onStart={() => dispatch({ type: 'goto', step: 'groups' })}
          onResume={() => {
            // Resume at the furthest-completed step.
            const next: BracketStep =
              !completed.groups   ? 'groups'    :
              !completed.thirds   ? 'thirds'    :
              !completed.knockouts ? 'knockouts' :
              !completed.topscorer ? 'topscorer' :
              'results';
            dispatch({ type: 'goto', step: next });
          }}
          onReset={handleReset}
        />
      )}

      {state.step === 'groups' && (
        <GroupsStep
          groupResults={state.groupResults}
          onChange={(gr) => {
            // If groups change after building a bracket, scrap the bracket — it's based on stale standings.
            if (state.bracket) dispatch({ type: 'setBracket', bracket: null as unknown as BracketData });
            dispatch({ type: 'setGroups', groupResults: gr });
          }}
          onContinue={continueFromGroups}
        />
      )}

      {state.step === 'thirds' && (
        <ThirdPlaceStep
          groupResults={state.groupResults}
          qualifyingThirds={state.qualifyingThirds}
          onChange={(qt) => {
            if (state.bracket) dispatch({ type: 'setBracket', bracket: null as unknown as BracketData });
            dispatch({ type: 'setThirds', qualifyingThirds: qt });
          }}
          onContinue={continueFromThirds}
          onBack={() => dispatch({ type: 'goto', step: 'groups' })}
        />
      )}

      {state.step === 'knockouts' && state.bracket && (
        <KnockoutStep
          bracket={state.bracket}
          onChange={(bracket) => dispatch({ type: 'setBracket', bracket })}
          onContinue={continueFromKnockouts}
          onBack={() => dispatch({ type: 'goto', step: 'thirds' })}
        />
      )}

      {state.step === 'knockouts' && !state.bracket && (
        <BracketBuildPrompt onBack={() => dispatch({ type: 'goto', step: 'thirds' })} />
      )}

      {state.step === 'topscorer' && (
        <TopScorerStep
          topScorerName={state.topScorerName}
          onChange={(name) => dispatch({ type: 'setTopScorer', name })}
          onContinue={continueFromTopScorer}
          onBack={() => dispatch({ type: 'goto', step: 'knockouts' })}
        />
      )}

      {state.step === 'results' && state.bracket && (
        <ResultsStep
          bracket={state.bracket}
          groupResults={state.groupResults}
          topScorerName={state.topScorerName}
          onBack={() => dispatch({ type: 'goto', step: 'topscorer' })}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

function BracketBuildPrompt({ onBack }: { onBack: () => void }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        padding: '24px',
        textAlign: 'center',
        color: 'var(--color-text-2)',
        fontSize: 14,
      }}
    >
      You need to finish picking groups + the qualifying third-placers before the bracket builds.
      <div style={{ marginTop: 14 }}>
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
          }}
        >
          ← Go back
        </button>
      </div>
    </div>
  );
}
