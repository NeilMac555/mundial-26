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

  Brazil: {
    nation: 'Brazil',
    formation: '4-2-3-1',
    kit: { primary: '#f6d10b', accent: '#009b3a', outline: '#5a4d00', number: '#009b3a' },
    rows: [
      // Lone striker — Neil swap: João Pedro starter, Endrick backup
      [
        { name: 'João Pedro', backup: 'Endrick', pos: 'ST' },
      ],
      // Attacking midfield band (LW, CAM, RW)
      [
        { name: 'Vinicius', pos: 'LW' },
        { name: 'Matheus Cunha', pos: 'CAM' },
        { name: 'Raphinha', pos: 'RW' },
      ],
      // Double pivot
      [
        { name: 'Bruno Guimarães', pos: 'CM' },
        { name: 'Casemiro', pos: 'CM' },
      ],
      // Back four
      [
        { name: 'Alex Sandro', pos: 'LB' },
        { name: 'Gabriel M.', pos: 'CB' },
        { name: 'Marquinhos', pos: 'CB' },
        { name: 'Wesley', backup: 'Danilo', pos: 'RB' },
      ],
      // Goalkeeper
      [
        { name: 'Alisson', pos: 'GK' },
      ],
    ],
    bench: ['Ederson', 'Militão', 'Bremer', 'Andreas Pereira', 'Lucas Paquetá', 'Rodrygo', 'Antony'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Mexico: {
    nation: 'Mexico',
    formation: '4-3-2-1',
    kit: { primary: '#006341', accent: '#ffffff', outline: '#003a23', number: '#ffffff' },
    rows: [
      // Lone striker
      [
        { name: 'Jiménez', pos: 'ST' },
      ],
      // Behind the striker
      [
        { name: 'Vega', pos: 'LAM' },
        { name: 'Alvarado', pos: 'RAM' },
      ],
      // Box-to-box midfield
      [
        { name: 'Vargas', pos: 'CM' },
        { name: 'Fidalgo', pos: 'CM' },
      ],
      // Single pivot
      [
        { name: 'Lira', pos: 'CDM' },
      ],
      // Back four
      [
        { name: 'Gallardo', pos: 'LB' },
        { name: 'Vásquez', pos: 'CB' },
        { name: 'Montes', pos: 'CB' },
        { name: 'Sánchez', pos: 'RB' },
      ],
      // Goalkeeper
      [
        { name: 'Rangel', pos: 'GK' },
      ],
    ],
    bench: ['Ochoa', 'Edson Álvarez', 'Luis Chávez', 'Lozano', 'Santi Giménez', 'Lainez', 'Antuna'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  France: {
    nation: 'France',
    formation: '4-2-3-1',
    kit: { primary: '#002654', accent: '#ed2939', outline: '#001a3a', number: '#ffffff' },
    rows: [
      // Lone striker
      [
        { name: 'Mbappé', pos: 'ST' },
      ],
      // Wingers
      [
        { name: 'Cherki', backup: 'Barcola', pos: 'LW' },
        { name: 'Dembélé', pos: 'RW' },
      ],
      // #10 dropping between lines
      [
        { name: 'Olise', pos: 'CAM' },
      ],
      // Double pivot
      [
        { name: 'Rabiot', pos: 'CM' },
        { name: 'Tchouaméni', pos: 'CM' },
      ],
      // Back four
      [
        { name: 'Theo', pos: 'LB' },
        { name: 'Upamecano', backup: 'Konaté', pos: 'CB' },
        { name: 'Saliba', pos: 'CB' },
        { name: 'Koundé', pos: 'RB' },
      ],
      // Goalkeeper
      [
        { name: 'Maignan', pos: 'GK' },
      ],
    ],
    bench: ['Samba', 'Pavard', 'Lucas Hernández', 'Camavinga', 'Zaire-Emery', 'Thuram', 'Kolo Muani'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Germany: {
    nation: 'Germany',
    formation: '4-2-3-1',
    kit: { primary: '#ffffff', accent: '#000000', outline: '#1a1a1a', number: '#000000' },
    rows: [
      // Lone striker — Woltemade picked over Havertz
      [
        { name: 'Woltemade', backup: 'Havertz', pos: 'ST' },
      ],
      // Wide forwards
      [
        { name: 'Musiala', pos: 'LW' },
        { name: 'Sané', pos: 'RW' },
      ],
      // #10 between lines
      [
        { name: 'Wirtz', pos: 'CAM' },
      ],
      // Double pivot — Goretzka holds off Groß and Stiller
      [
        { name: 'Goretzka', backup: 'Groß / Stiller', pos: 'CM' },
        { name: 'Pavlovic', pos: 'CM' },
      ],
      // Back four
      [
        { name: 'Raum', pos: 'LB' },
        { name: 'Schlotterbeck', pos: 'CB' },
        { name: 'Tah', backup: 'Rüdiger', pos: 'CB' },
        { name: 'Kimmich', pos: 'RB' },
      ],
      // Goalkeeper
      [
        { name: 'Baumann', pos: 'GK' },
      ],
    ],
    bench: ['ter Stegen', 'Kehrer', 'Anton', 'Andrich', 'Gnabry', 'Füllkrug', 'Beier'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Argentina: {
    nation: 'Argentina',
    formation: '4-2-3-1',
    kit: { primary: '#6cace4', accent: '#ffffff', outline: '#1a3a6a', number: '#1a3a6a' },
    rows: [
      // Lone striker — Lautaro
      [
        { name: 'L. Martínez', pos: 'ST' },
      ],
      // Front three behind the striker — flat line in the source image
      [
        { name: 'Álvarez', pos: 'LW' },
        { name: 'Mac Allister', pos: 'CAM' },
        { name: 'Messi', pos: 'RW' },
      ],
      // Double pivot
      [
        { name: 'De Paul', pos: 'CM' },
        { name: 'Fernández', pos: 'CM' },
      ],
      // Back four
      [
        { name: 'Tagliafico', pos: 'LB' },
        { name: 'Otamendi', pos: 'CB' },
        { name: 'Romero', pos: 'CB' },
        { name: 'Molina', pos: 'RB' },
      ],
      // Goalkeeper — Dibu
      [
        { name: 'E. Martínez', pos: 'GK' },
      ],
    ],
    bench: ['Rulli', 'Lisandro Martínez', 'Paredes', 'Lo Celso', 'Almada', 'Garnacho', 'N. González'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },
};

export function lineupForNation(nation: string): Lineup | null {
  return LINEUPS[nation] ?? null;
}
