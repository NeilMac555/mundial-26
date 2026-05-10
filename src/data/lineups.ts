// Predicted starting XI per qualified nation. Reuses the same nation-name keys
// as managers.json so the Compare page can look it up without aliases.
//
// Source-of-truth: best-guess XIs based on most recent qualifier squads + form,
// to be revised as squads / friendlies / injuries firm up. Bench listed as
// 5-7 likely subs.

export interface PlayerSlot {
  name: string;
  /** Optional backup player listed in italic underneath the starter (futbolfantasy convention). */
  backup?: string;
  /** Position label for tooltip / accessibility (GK, LB, CB, CDM, CM, CAM, LW, ST, RW, etc.). */
  pos?: string;
}

export interface KitColors {
  /** Primary shirt fill. */
  primary: string;
  /** Optional secondary stripe / sleeve / collar accent. */
  accent?: string;
  /** Stroke around the shirt SVG (defaults to a subtle dark line). */
  outline?: string;
  /** Number / crest text color (defaults to white or black depending on contrast). */
  number?: string;
}

export interface Lineup {
  nation: string;
  formation: string;          // "4-3-3", "4-2-3-1", "3-4-3", etc.
  /** Rows ordered from ATTACK (top) to DEFENCE (bottom) — GK is the last row. */
  rows: PlayerSlot[][];
  bench?: string[];
  source?: string;
  asOf?: string;              // YYYY-MM-DD
  kit: KitColors;
}

export const LINEUPS: Record<string, Lineup> = {
  Spain: {
    nation: 'Spain',
    formation: '4-1-2-3',
    kit: { primary: '#c60b1e', accent: '#ffd700', outline: '#7a0712', number: '#ffd700' },
    rows: [
      // Attack
      [
        { name: 'N. Williams', backup: 'Fermín', pos: 'LW' },
        { name: 'Oyarzabal', pos: 'ST' },
        { name: 'Yamal', pos: 'RW' },
      ],
      // Attacking midfield
      [
        { name: 'Fabián', pos: 'CM' },
        { name: 'Pedri', pos: 'CM' },
      ],
      // Defensive midfield
      [
        { name: 'Rodri', backup: 'Zubimendi', pos: 'CDM' },
      ],
      // Defence
      [
        { name: 'Cucurella', pos: 'LB' },
        { name: 'Laporte', backup: 'Eric García', pos: 'CB' },
        { name: 'Cubarsí', pos: 'CB' },
        { name: 'M. Llorente', pos: 'RB' },
      ],
      // Goalkeeper
      [
        { name: 'Unai Simón', backup: 'Joan García', pos: 'GK' },
      ],
    ],
    bench: ['Raya', 'Le Normand', 'Grimaldo', 'Mikel Merino', 'Olmo', 'Morata', 'Ferran Torres'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },
};

export function lineupForNation(nation: string): Lineup | null {
  return LINEUPS[nation] ?? null;
}
