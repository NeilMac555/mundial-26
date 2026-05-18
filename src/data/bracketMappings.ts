// FIFA 2026 World Cup R32 third-placer slotting rules.
//
// FIFA's official bracket reserves 8 R32 slots for 3rd-placers from the 12
// groups. Each slot has a *fixed allowed-source-group set* (5 possible groups)
// drawn from the official 2026 schedule:
//
//   M74 (1E vs 3rd):  A / B / C / D / F
//   M77 (1I vs 3rd):  C / D / F / G / H
//   M79 (1A vs 3rd):  C / E / F / H / I
//   M80 (1L vs 3rd):  E / H / I / J / K
//   M81 (1D vs 3rd):  B / E / F / I / J
//   M82 (1G vs 3rd):  A / E / H / I / J
//   M85 (1B vs 3rd):  E / F / G / I / J
//   M87 (1K vs 3rd):  D / E / I / J / L
//
// The allowed sets exclude the paired group winner's group, so no same-group
// rematch is possible in the R32 by construction. R16+ pairings keep 1X / 2X /
// 3X teams in opposite halves of the bracket so the earliest a same-group
// rematch can occur is the QF — matching FIFA's intent.
//
// 8 of 12 groups' 3rd-placers qualify → C(12,8) = 495 possible qualifying
// subsets. For each subset we use a backtracking solver to find a valid
// assignment of 3rd-placers to slots (each slot must receive a 3rd-placer
// from one of its allowed source groups). Solver is deterministic — for any
// given qualifying subset it always returns the same mapping.

// 8 R32 slot labels, indexed by the group whose winner plays that slot's
// 3rd-placer in the FIFA bracket. So slot "1A" is the 3rd-placer playing
// Group A's winner in M79 (which is itself referenced as r32_11 internally).
export const SLOT_LABELS = ['1A', '1B', '1D', '1E', '1G', '1I', '1K', '1L'] as const;
export type SlotLabel = (typeof SLOT_LABELS)[number];

// Allowed source groups per slot — FIFA's published constraint.
export const SLOT_ALLOWED_SOURCES: Record<SlotLabel, readonly string[]> = {
  '1A': ['C', 'E', 'F', 'H', 'I'],
  '1B': ['E', 'F', 'G', 'I', 'J'],
  '1D': ['B', 'E', 'F', 'I', 'J'],
  '1E': ['A', 'B', 'C', 'D', 'F'],
  '1G': ['A', 'E', 'H', 'I', 'J'],
  '1I': ['C', 'D', 'F', 'G', 'H'],
  '1K': ['D', 'E', 'I', 'J', 'L'],
  '1L': ['E', 'H', 'I', 'J', 'K'],
};

export interface ThirdPlaceMapping {
  '1A': string;  // e.g. "3E"
  '1B': string;
  '1D': string;
  '1E': string;
  '1G': string;
  '1I': string;
  '1K': string;
  '1L': string;
}

/**
 * Given the 8 group letters whose 3rd-placers qualify (e.g. ["A","C","D","F","G","I","K","L"]),
 * return a mapping from each R32 slot to the group letter whose 3rd-placer
 * fills it (formatted as "3X").
 *
 * Uses depth-first backtracking on the 8 slots, picking the most-constrained
 * slot first (fewest available source groups) to maximise pruning. Pure
 * function — same input always produces the same output.
 *
 * If no valid mapping exists (impossible for any real 8-group subset because
 * FIFA's allowed-source sets are designed to always admit a perfect matching),
 * falls back to alphabetical assignment so the bracket still renders.
 */
export function computeThirdPlaceMapping(qualifyingGroups: string[]): ThirdPlaceMapping {
  if (qualifyingGroups.length !== 8) {
    // Defensive fallback — should never happen if the UI gates the third-place
    // step to exactly 8 picks, but render *something* rather than throw.
    return alphabeticalFallback(qualifyingGroups);
  }

  const available = new Set(qualifyingGroups);
  // Sort slots most-constrained-first (fewest available sources).
  const slotsByConstraint = [...SLOT_LABELS].sort((a, b) => {
    const aN = SLOT_ALLOWED_SOURCES[a].filter((g) => available.has(g)).length;
    const bN = SLOT_ALLOWED_SOURCES[b].filter((g) => available.has(g)).length;
    return aN - bN;
  });

  const used = new Set<string>();
  const result: Partial<Record<SlotLabel, string>> = {};

  function assign(i: number): boolean {
    if (i === slotsByConstraint.length) return true;
    const slot = slotsByConstraint[i];
    for (const group of SLOT_ALLOWED_SOURCES[slot]) {
      if (!available.has(group) || used.has(group)) continue;
      used.add(group);
      result[slot] = `3${group}`;
      if (assign(i + 1)) return true;
      used.delete(group);
      delete result[slot];
    }
    return false;
  }

  if (assign(0)) return result as ThirdPlaceMapping;
  return alphabeticalFallback(qualifyingGroups);
}

function alphabeticalFallback(qualifyingGroups: string[]): ThirdPlaceMapping {
  const sorted = [...qualifyingGroups].sort();
  const out: Partial<Record<SlotLabel, string>> = {};
  SLOT_LABELS.forEach((slot, i) => {
    out[slot] = `3${sorted[i] ?? '?'}`;
  });
  return out as ThirdPlaceMapping;
}
