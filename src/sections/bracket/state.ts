// Bracket Simulator state — central store of every pick the user has made.
// Persisted to localStorage so reloads don't lose progress.

import type { BracketData } from '../../lib/bracketEngine';

export type BracketStep = 'intro' | 'groups' | 'thirds' | 'knockouts' | 'topscorer' | 'results';

export interface GroupRanking {
  /** FIFA codes — 'BRA', 'ARG', etc. */
  first: string;
  second: string;
  third: string;
  fourth: string;
}

export interface BracketSimState {
  step: BracketStep;
  /** Per-group standings, keyed by 'A'..'L'. */
  groupResults: Record<string, GroupRanking>;
  /** 8 group letters whose 3rd-placer qualifies for the R32. */
  qualifyingThirds: string[];
  /** Built bracket once groups + thirds are locked. */
  bracket: BracketData | null;
  /** Player name picked for Golden Boot. */
  topScorerName: string | null;
}

export const INITIAL_STATE: BracketSimState = {
  step: 'intro',
  groupResults: {},
  qualifyingThirds: [],
  bracket: null,
  topScorerName: null,
};

const STORAGE_KEY = 'mundial-bracket-sim:v1';

export function loadState(): BracketSimState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw) as BracketSimState;
    // Light validation — fall back to defaults if shape is wrong.
    if (typeof parsed !== 'object' || parsed === null) return INITIAL_STATE;
    return {
      step: parsed.step ?? 'intro',
      groupResults: parsed.groupResults ?? {},
      qualifyingThirds: Array.isArray(parsed.qualifyingThirds) ? parsed.qualifyingThirds : [],
      bracket: parsed.bracket ?? null,
      topScorerName: parsed.topScorerName ?? null,
    };
  } catch {
    return INITIAL_STATE;
  }
}

export function saveState(state: BracketSimState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* localStorage may be full or disabled — silently ignore */
  }
}

export function clearState(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
