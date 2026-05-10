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

  Algeria: {
    nation: 'Algeria',
    formation: '4-2-2-2',
    kit: { primary: '#006233', accent: '#d21034', outline: '#003a1d', number: '#ffffff' },
    rows: [
      // Strike pair
      [
        { name: 'Gouiri', pos: 'ST' },
        { name: 'Amoura', pos: 'ST' },
      ],
      // Narrow #10s
      [
        { name: 'Aouar', pos: 'LAM' },
        { name: 'Mahrez', pos: 'RAM' },
      ],
      // Double pivot
      [
        { name: 'Bennacer', pos: 'CM' },
        { name: 'Boudaoui', pos: 'CM' },
      ],
      // Back four
      [
        { name: 'Aït Nouri', pos: 'LB' },
        { name: 'Bensebaini', pos: 'CB' },
        { name: 'Mandi', pos: 'CB' },
        { name: 'Belghali', pos: 'RB' },
      ],
      // Goalkeeper — Luca Zidane
      [
        { name: 'Zidane', pos: 'GK' },
      ],
    ],
    bench: ['M’Bolhi', 'Atal', 'Tougai', 'Zorgane', 'Brahimi', 'Belaili', 'Slimani'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Morocco: {
    nation: 'Morocco',
    formation: '4-1-2-3',
    kit: { primary: '#c1272d', accent: '#006233', outline: '#8a1c20', number: '#ffffff' },
    rows: [
      // Front three
      [
        { name: 'Ezzalzouli', pos: 'LW' },
        { name: 'El Kaabi', pos: 'ST' },
        { name: 'Brahim Díaz', pos: 'RW' },
      ],
      // Two CMs
      [
        { name: 'Ounahi', pos: 'CM' },
        { name: 'Saïbari', pos: 'CM' },
      ],
      // Single pivot
      [
        { name: 'El Aynaoui', pos: 'CDM' },
      ],
      // Back four
      [
        { name: 'Mazraoui', pos: 'LB' },
        { name: 'Saïss', pos: 'CB' },
        { name: 'Aguerd', pos: 'CB' },
        { name: 'Hakimi', pos: 'RB' },
      ],
      // Goalkeeper — Bono
      [
        { name: 'Bounou', pos: 'GK' },
      ],
    ],
    bench: ['Munir', 'Benoun', 'Adli', 'Bilal El Khannouss', 'Ben Seghir', 'Aboukhlal', 'En-Nesyri'],
    source: 'ESPN lineup tool (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Portugal: {
    nation: 'Portugal',
    formation: '4-2-3-1',
    kit: { primary: '#a32638', accent: '#006a44', outline: '#6b1825', number: '#ffffff' },
    rows: [
      // Lone striker — Ronaldo at 41, still picking himself
      [
        { name: 'Ronaldo', pos: 'ST' },
      ],
      // Front three — flat line behind the striker
      [
        { name: 'Leão', pos: 'LW' },
        { name: 'Fernandes', pos: 'CAM' },
        { name: 'Silva', pos: 'RW' },
      ],
      // Double pivot — J. Neves (PSG) over Rúben Neves
      [
        { name: 'J. Neves', pos: 'CM' },
        { name: 'Vitinha', pos: 'CM' },
      ],
      // Back four
      [
        { name: 'Mendes', pos: 'LB' },
        { name: 'Inácio', pos: 'CB' },
        { name: 'Dias', pos: 'CB' },
        { name: 'Cancelo', pos: 'RB' },
      ],
      // Goalkeeper — Diogo Costa
      [
        { name: 'Costa', pos: 'GK' },
      ],
    ],
    bench: ['José Sá', 'A. Silva', 'Dalot', 'R. Neves', 'P. Neto', 'J. Félix', 'G. Ramos'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Austria: {
    nation: 'Austria',
    formation: '4-2-3-1',
    kit: { primary: '#ed2939', accent: '#ffffff', outline: '#8b1820', number: '#ffffff' },
    rows: [
      // Lone striker
      [
        { name: 'Arnautović', pos: 'ST' },
      ],
      // Front three behind the striker
      [
        { name: 'Baumgartner', pos: 'LW' },
        { name: 'Sabitzer', pos: 'CAM' },
        { name: 'Schmid', pos: 'RW' },
      ],
      // Double pivot — Xaver Schlager (Leipzig CM)
      [
        { name: 'Seiwald', pos: 'CM' },
        { name: 'X. Schlager', pos: 'CM' },
      ],
      // Back four
      [
        { name: 'Mwene', pos: 'LB' },
        { name: 'Danso', pos: 'CB' },
        { name: 'Friedl', pos: 'CB' },
        { name: 'Laimer', pos: 'RB' },
      ],
      // Goalkeeper — Alexander Schlager (no relation to Xaver)
      [
        { name: 'A. Schlager', pos: 'GK' },
      ],
    ],
    bench: ['Pentz', 'Lindner', 'Trauner', 'Posch', 'Grillitsch', 'Gregoritsch', 'Adamu'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Jordan: {
    nation: 'Jordan',
    formation: '3-4-2-1',
    kit: { primary: '#ce1126', accent: '#ffffff', outline: '#7a0a17', number: '#ffffff' },
    rows: [
      [
        { name: 'Al Naimat', pos: 'ST' },
      ],
      [
        { name: 'Al Tamari', pos: 'LAM' },
        { name: 'Al Olwan', pos: 'RAM' },
      ],
      [
        { name: 'Al Quraishi', pos: 'LM' },
        { name: 'Jamous', pos: 'CM' },
        { name: 'Al Rashdan', pos: 'CM' },
        { name: 'Taha', pos: 'RM' },
      ],
      [
        { name: 'Al Dahab', pos: 'LCB' },
        { name: 'Nasib', pos: 'CB' },
        { name: 'Al Arab', pos: 'RCB' },
      ],
      [
        { name: 'Abulaila', pos: 'GK' },
      ],
    ],
    bench: ['Al Fakhouri', 'Al Ajalin', 'Haddad', 'Al Mardi', 'Al Rawabdeh', 'Marei', 'Al Saify'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Colombia: {
    nation: 'Colombia',
    formation: '4-2-3-1',
    kit: { primary: '#FCD116', accent: '#003893', outline: '#8a7308', number: '#003893' },
    rows: [
      [
        { name: 'Suárez', pos: 'ST' },
      ],
      [
        { name: 'Díaz', pos: 'LW' },
        { name: 'Rodríguez', pos: 'CAM' },
        { name: 'Arias', pos: 'RW' },
      ],
      [
        { name: 'Lerma', pos: 'CM' },
        { name: 'Ríos', pos: 'CM' },
      ],
      [
        { name: 'Mojica', pos: 'LB' },
        { name: 'Lucumí', pos: 'CB' },
        { name: 'Sánchez', pos: 'CB' },
        { name: 'Muñoz', pos: 'RB' },
      ],
      [
        { name: 'Vargas', pos: 'GK' },
      ],
    ],
    bench: ['Mier', 'Mina', 'Cuesta', 'Barrios', 'Uribe', 'Borja', 'Cuadrado'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Croatia: {
    nation: 'Croatia',
    formation: '4-2-3-1',
    kit: { primary: '#ed1f23', accent: '#ffffff', outline: '#8a1216', number: '#ffffff' },
    rows: [
      [
        { name: 'Budimir', pos: 'ST' },
      ],
      [
        { name: 'Perišić', pos: 'LW' },
        { name: 'Kramarić', pos: 'CAM' },
        { name: 'Pašalić', pos: 'RW' },
      ],
      [
        { name: 'Modrić', pos: 'CM' },
        { name: 'Kovačić', pos: 'CM' },
      ],
      [
        { name: 'Gvardiol', pos: 'LB' },
        { name: 'Ćaleta-Car', pos: 'CB' },
        { name: 'Vušković', pos: 'CB' },
        { name: 'Stanišić', pos: 'RB' },
      ],
      [
        { name: 'Livaković', pos: 'GK' },
      ],
    ],
    bench: ['Ivušić', 'Erlić', 'Sosa', 'Sučić', 'Brozović', 'Petković', 'Baturina'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Ghana: {
    nation: 'Ghana',
    formation: '3-4-2-1',
    kit: { primary: '#ffffff', accent: '#ce1126', outline: '#1a1a1a', number: '#006b3f' },
    rows: [
      [
        { name: 'Williams', pos: 'ST' },
      ],
      [
        { name: 'Ayew', pos: 'LAM' },
        { name: 'Semenyo', pos: 'RAM' },
      ],
      [
        { name: 'Mensah', pos: 'LM' },
        { name: 'Sibo', pos: 'CM' },
        { name: 'Partey', pos: 'CM' },
        { name: 'Yirenkyi', pos: 'RM' },
      ],
      [
        { name: 'Opoku', pos: 'LCB' },
        { name: 'Djiku', pos: 'CB' },
        { name: 'Adjetey', pos: 'RCB' },
      ],
      [
        { name: 'Asare', pos: 'GK' },
      ],
    ],
    bench: ['Wollacott', 'J. Mensah', 'Salisu', 'Baba Rahman', 'Kudus', 'Sulemana', 'Bukari'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Panama: {
    nation: 'Panama',
    formation: '4-2-3-1',
    kit: { primary: '#db3030', accent: '#1d39b3', outline: '#8a1d1d', number: '#ffffff' },
    rows: [
      [
        { name: 'Waterman', pos: 'ST' },
      ],
      [
        { name: 'Díaz', pos: 'LW' },
        { name: 'Carrasquilla', pos: 'CAM' },
        { name: 'Rodríguez', pos: 'RW' },
      ],
      [
        { name: 'Harvey', pos: 'CM' },
        { name: 'Godoy', pos: 'CM' },
      ],
      [
        { name: 'Davis', pos: 'LB' },
        { name: 'Córdoba', pos: 'CB' },
        { name: 'Andrade', pos: 'CB' },
        { name: 'Murillo', pos: 'RB' },
      ],
      [
        { name: 'Mosquera', pos: 'GK' },
      ],
    ],
    bench: ['Mejía', 'Galindo', 'Bárcenas', 'Welch', 'Tanner', 'Fajardo', 'Watson'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  England: {
    nation: 'England',
    formation: '4-2-3-1',
    kit: { primary: '#ffffff', accent: '#1d3a5f', outline: '#1a1a1a', number: '#ce1126' },
    rows: [
      [
        { name: 'Kane', pos: 'ST' },
      ],
      [
        { name: 'Gordon', pos: 'LW' },
        { name: 'Bellingham', pos: 'CAM' },
        { name: 'Saka', pos: 'RW' },
      ],
      [
        { name: 'Rice', pos: 'CM' },
        { name: 'Anderson', pos: 'CM' },
      ],
      [
        { name: 'O’Reilly', pos: 'LB' },
        { name: 'Guéhi', pos: 'CB' },
        { name: 'Konsa', pos: 'CB' },
        { name: 'James', pos: 'RB' },
      ],
      [
        { name: 'Pickford', pos: 'GK' },
      ],
    ],
    bench: ['D. Henderson', 'Stones', 'Trippier', 'Mainoo', 'Foden', 'Watkins', 'Eze'],
    source: 'futbolfantasy.com (May 2026 best-guess) — Palmer → Gordon swap per Neil',
    asOf: '2026-05-10',
  },

  Netherlands: {
    nation: 'Netherlands',
    formation: '4-3-3',
    kit: { primary: '#ff7900', accent: '#ffffff', outline: '#a04500', number: '#ffffff' },
    rows: [
      [
        { name: 'Gakpo', pos: 'LW' },
        { name: 'Depay', pos: 'ST' },
        { name: 'Malen', pos: 'RW' },
      ],
      [
        { name: 'Reijnders', pos: 'CM' },
        { name: 'De Jong', pos: 'CM' },
        { name: 'Gravenberch', pos: 'CM' },
      ],
      [
        { name: 'Van de Ven', pos: 'LB' },
        { name: 'Van Dijk', pos: 'CB' },
        { name: 'Timber', pos: 'CB' },
        { name: 'Dumfries', pos: 'RB' },
      ],
      [
        { name: 'Verbruggen', pos: 'GK' },
      ],
    ],
    bench: ['Flekken', 'Aké', 'Hato', 'Schouten', 'Xavi Simons', 'Brobbey', 'Weghorst'],
    source: 'ESPN lineup tool (May 2026 best-guess)',
    asOf: '2026-05-10',
  },
};

export function lineupForNation(nation: string): Lineup | null {
  return LINEUPS[nation] ?? null;
}
