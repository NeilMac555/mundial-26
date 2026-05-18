#!/usr/bin/env tsx
// Exhaustively verifies that for every C(12,8) = 495 possible combination of
// qualifying 3rd-placers, the bracket engine produces an R32 with no
// same-group rematches anywhere from group stage. Bails on the first
// violation.

import { computeThirdPlaceMapping, SLOT_ALLOWED_SOURCES, SLOT_LABELS } from '../src/data/bracketMappings';

const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

function combinations<T>(arr: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  const [first, ...rest] = arr;
  return [
    ...combinations(rest, k - 1).map((c) => [first, ...c]),
    ...combinations(rest, k),
  ];
}

// R32 third-placer slot ↔ group-winner pairing (from bracketEngine R32_SEEDS).
const SLOT_TO_GROUP_WINNER: Record<string, string> = {
  '1A': 'A', '1B': 'B', '1D': 'D', '1E': 'E',
  '1G': 'G', '1I': 'I', '1K': 'K', '1L': 'L',
};

let total = 0;
let failures = 0;

for (const combo of combinations(GROUPS, 8)) {
  total++;
  const mapping = computeThirdPlaceMapping(combo);

  for (const slot of SLOT_LABELS) {
    const assignment = mapping[slot]; // e.g. "3E"
    const sourceGroup = assignment.replace('3', '');
    const pairedWinnerGroup = SLOT_TO_GROUP_WINNER[slot];

    // Constraint 1: source group must be in the allowed set for this slot
    const allowed = SLOT_ALLOWED_SOURCES[slot];
    if (!allowed.includes(sourceGroup)) {
      console.error(`❌ combo=[${combo.join(',')}] slot=${slot} got 3${sourceGroup} but allowed=[${allowed.join(',')}]`);
      failures++;
      continue;
    }

    // Constraint 2: no same-group rematch
    if (sourceGroup === pairedWinnerGroup) {
      console.error(`❌ combo=[${combo.join(',')}] slot=${slot} produces same-group rematch: 1${pairedWinnerGroup} vs 3${sourceGroup}`);
      failures++;
    }

    // Constraint 3: source group must actually be in the qualifying combo
    if (!combo.includes(sourceGroup)) {
      console.error(`❌ combo=[${combo.join(',')}] slot=${slot} got 3${sourceGroup} but that group isn't qualifying`);
      failures++;
    }
  }

  // Constraint 4: all 8 qualifying groups must be assigned exactly once
  const assigned = SLOT_LABELS.map((s) => mapping[s].replace('3', ''));
  const assignedSet = new Set(assigned);
  if (assignedSet.size !== 8) {
    console.error(`❌ combo=[${combo.join(',')}] duplicate assignments: ${assigned.join(',')}`);
    failures++;
  }
  for (const g of combo) {
    if (!assignedSet.has(g)) {
      console.error(`❌ combo=[${combo.join(',')}] group ${g} qualifies but never assigned`);
      failures++;
    }
  }
}

console.log(`[verify-bracket] checked ${total} combinations`);
if (failures === 0) {
  console.log(`[verify-bracket] ✅ all clean — no allowed-set violations, no same-group rematches, no duplicate assignments`);
} else {
  console.log(`[verify-bracket] ❌ ${failures} violations`);
  process.exit(1);
}
