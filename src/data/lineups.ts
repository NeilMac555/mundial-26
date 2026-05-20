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
      // Lone striker — Endrick primary, João Pedro backup
      [
        { name: 'Endrick', backup: 'João Pedro', pos: 'ST' },
      ],
      // Attacking midfield band (LW, CAM, RW) — Matheus Cunha at the #10
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
    bench: ['Ederson', 'Militão', 'Bremer', 'Andreas Pereira', 'Lucas Paquetá', 'Savinho', 'Antony'],
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

  Senegal: {
    nation: 'Senegal',
    formation: '4-3-3',
    kit: { primary: '#00853f', accent: '#fdef42', outline: '#00541f', number: '#ffffff' },
    rows: [
      [
        { name: 'Mané', pos: 'LW' },
        { name: 'Jackson', pos: 'ST' },
        { name: 'I. Ndiaye', pos: 'RW' },
      ],
      [
        { name: 'P. Gueye', pos: 'CM' },
        { name: 'I. Gueye', pos: 'CM' },
        { name: 'Diarra', pos: 'CM' },
      ],
      [
        { name: 'Diouf', pos: 'LB' },
        { name: 'Niakhaté', pos: 'CB' },
        { name: 'Koulibaly', pos: 'CB' },
        { name: 'Diatta', pos: 'RB' },
      ],
      [
        { name: 'Mendy', pos: 'GK' },
      ],
    ],
    bench: ['Dieng', 'Seck', 'Sabaly', 'Pape Matar Sarr', 'Camara', 'I. Sarr', 'Dia'],
    source: 'ESPN lineup tool (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  'United States': {
    nation: 'United States',
    formation: '3-4-2-1',
    kit: { primary: '#1a3766', accent: '#c8102e', outline: '#0c1f3d', number: '#ffffff' },
    rows: [
      [
        { name: 'Balogun', pos: 'ST' },
      ],
      [
        { name: 'McKennie', pos: 'LAM' },
        { name: 'Pulisic', pos: 'RAM' },
      ],
      [
        { name: 'Robinson', pos: 'LWB' },
        { name: 'Tessmann', pos: 'CM' },
        { name: 'Adams', pos: 'CM' },
        { name: 'Dest', pos: 'RWB' },
      ],
      [
        { name: 'Ream', pos: 'LCB' },
        { name: 'Richards', pos: 'CB' },
        { name: 'McKenzie', pos: 'RCB' },
      ],
      [
        { name: 'Freese', pos: 'GK' },
      ],
    ],
    bench: ['Turner', 'Scally', 'Cardoso', 'Musah', 'Reyna', 'Aaronson', 'Pepi'],
    source: 'ESPN lineup tool (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Japan: {
    nation: 'Japan',
    formation: '3-4-2-1',
    kit: { primary: '#0a1d3a', accent: '#bc002d', outline: '#050d1c', number: '#ffffff' },
    rows: [
      [
        { name: 'Ueda', pos: 'ST' },
      ],
      [
        { name: 'Kamada', pos: 'LAM' },
        { name: 'Kubo', pos: 'RAM' },
      ],
      [
        { name: 'Mitoma', pos: 'LWB' },
        { name: 'Sano', pos: 'CM' },
        { name: 'Endo', pos: 'CM' },
        { name: 'Doan', pos: 'RWB' },
      ],
      [
        { name: 'Ito', pos: 'LCB' },
        { name: 'Tomiyasu', pos: 'CB' },
        { name: 'Taniguchi', pos: 'RCB' },
      ],
      [
        { name: 'Suzuki', pos: 'GK' },
      ],
    ],
    bench: ['D. Suzuki', 'Itakura', 'Sakai', 'Tanaka', 'Morita', 'Minamino', 'Asano'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Sweden: {
    nation: 'Sweden',
    formation: '3-4-2-1',
    kit: { primary: '#fecc00', accent: '#005293', outline: '#8a7300', number: '#005293' },
    rows: [
      [
        { name: 'Gyökeres', pos: 'ST' },
      ],
      [
        { name: 'Isak', pos: 'LAM' },
        { name: 'Elanga', pos: 'RAM' },
      ],
      [
        { name: 'Gudmundsson', pos: 'LWB' },
        { name: 'Ayari', pos: 'CM' },
        { name: 'Karlström', pos: 'CM' },
        { name: 'Svensson', pos: 'RWB' },
      ],
      [
        { name: 'Lindelöf', pos: 'LCB' },
        { name: 'Starfelt', pos: 'CB' },
        { name: 'Hien', pos: 'RCB' },
      ],
      [
        { name: 'Nordfeldt', pos: 'GK' },
      ],
    ],
    bench: ['Olsen', 'Augustinsson', 'Bengtsson', 'Ekdal', 'Bergvall', 'Kulusevski', 'Forsberg'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Tunisia: {
    nation: 'Tunisia',
    formation: '4-3-2-1',
    kit: { primary: '#e70013', accent: '#ffffff', outline: '#8a000c', number: '#ffffff' },
    rows: [
      [
        { name: 'Mastouri', pos: 'ST' },
      ],
      [
        { name: 'Saad', pos: 'LAM' },
        { name: 'Ben Slimane', pos: 'RAM' },
      ],
      [
        { name: 'Hannibal', pos: 'CM' },
        { name: 'Skhiri', pos: 'CM' },
      ],
      [
        { name: 'Khedira', pos: 'CDM' },
      ],
      [
        { name: 'El Abdi', pos: 'LB' },
        { name: 'Bronn', pos: 'CB' },
        { name: 'Talbi', pos: 'CB' },
        { name: 'Zaalouni', pos: 'RB' },
      ],
      [
        { name: 'Dahmen', pos: 'GK' },
      ],
    ],
    bench: ['Ben Mustapha', 'Drager', 'Maaloul', 'Laidouni', 'Sliti', 'Khazri', 'Msakni'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Paraguay: {
    nation: 'Paraguay',
    formation: '4-2-2-2',
    kit: { primary: '#d52b1e', accent: '#ffffff', outline: '#8a1813', number: '#003a8c' },
    rows: [
      [
        { name: 'Enciso', pos: 'ST' },
        { name: 'Sanabria', pos: 'ST' },
      ],
      [
        { name: 'Almirón', pos: 'LAM' },
        { name: 'Sosa', pos: 'RAM' },
      ],
      [
        { name: 'Cubas', pos: 'CM' },
        { name: 'D. Gómez', pos: 'CM' },
      ],
      [
        { name: 'Alonso', pos: 'LB' },
        { name: 'G. Gómez', pos: 'CB' },
        { name: 'Alderete', pos: 'CB' },
        { name: 'Cáceres', pos: 'RB' },
      ],
      [
        { name: 'Gill', pos: 'GK' },
      ],
    ],
    bench: ['Olivier', 'R. Rojas', 'Caballero', 'Bobadilla', 'Galarza', 'Avalos', 'Bareiro'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Australia: {
    nation: 'Australia',
    formation: '3-4-2-1',
    kit: { primary: '#ffcd00', accent: '#00471b', outline: '#8a7300', number: '#00471b' },
    rows: [
      [
        { name: 'Touré', pos: 'ST' },
      ],
      [
        { name: 'Irankunda', pos: 'LAM' },
        { name: 'Boyle', pos: 'RAM' },
      ],
      [
        { name: 'Bos', pos: 'LWB' },
        { name: 'Irvine', pos: 'CM' },
        { name: 'McGree', pos: 'CM' },
        { name: 'Italiano', pos: 'RWB' },
      ],
      [
        { name: 'Burgess', pos: 'LCB' },
        { name: 'Souttar', pos: 'CB' },
        { name: 'Circati', pos: 'RCB' },
      ],
      [
        { name: 'Ryan', pos: 'GK' },
      ],
    ],
    bench: ['Vukovic', 'Rowles', 'Behich', 'Hrustic', 'Mooy', 'Duke', 'Borello'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  'Türkiye': {
    nation: 'Türkiye',
    formation: '4-2-3-1',
    kit: { primary: '#e30a17', accent: '#ffffff', outline: '#8a060e', number: '#ffffff' },
    rows: [
      [
        { name: 'Aktürkoğlu', pos: 'ST' },
      ],
      [
        { name: 'Yıldız', pos: 'LW' },
        { name: 'Güler', pos: 'CAM' },
        { name: 'Yılmaz', pos: 'RW' },
      ],
      [
        { name: 'Yüksek', pos: 'CM' },
        { name: 'Çalhanoğlu', pos: 'CM' },
      ],
      [
        { name: 'Kadıoğlu', pos: 'LB' },
        { name: 'Bardakcı', pos: 'CB' },
        { name: 'Demiral', pos: 'CB' },
        { name: 'Çelik', pos: 'RB' },
      ],
      [
        { name: 'Çakır', pos: 'GK' },
      ],
    ],
    bench: ['Bayındır', 'Müldür', 'Söyüncü', 'Kökçü', 'Yokuşlu', 'Akgün', 'Tosun'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  'DR Congo': {
    nation: 'DR Congo',
    formation: '4-2-2-2',
    kit: { primary: '#4292d4', accent: '#fdef42', outline: '#1a5285', number: '#fff200' },
    rows: [
      [
        { name: 'Bakambu', pos: 'ST' },
        { name: 'Wissa', pos: 'ST' },
      ],
      [
        { name: 'Elia', pos: 'LAM' },
        { name: 'Mbuku', pos: 'RAM' },
      ],
      [
        { name: 'Moutoussamy', pos: 'CM' },
        { name: 'Sadiki', pos: 'CM' },
      ],
      [
        { name: 'Masuaku', pos: 'LB' },
        { name: 'Tuanzebe', pos: 'CB' },
        { name: 'Mbemba', pos: 'CB' },
        { name: 'Wan-Bissaka', pos: 'RB' },
      ],
      [
        { name: 'Mpasi', pos: 'GK' },
      ],
    ],
    bench: ['Akolo', 'Bushiri', 'Bongonda', 'Bayo', 'Mukoko', 'Lukeba', 'Brym'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Uzbekistan: {
    nation: 'Uzbekistan',
    formation: '3-4-2-1',
    kit: { primary: '#ffffff', accent: '#0099b5', outline: '#1a1a1a', number: '#0099b5' },
    rows: [
      [
        { name: 'Shomurodov', pos: 'ST' },
      ],
      [
        { name: 'Urunov', pos: 'LAM' },
        { name: 'Fayzullaev', pos: 'RAM' },
      ],
      [
        { name: 'Nasrullayev', pos: 'LWB' },
        { name: 'Shukurov', pos: 'CM' },
        { name: 'Khamrobekov', pos: 'CM' },
        { name: 'Alijonov', pos: 'RWB' },
      ],
      [
        { name: 'Abdullaev', pos: 'LCB' },
        { name: 'Ashurmatov', pos: 'CB' },
        { name: 'Khusanov', pos: 'RCB' },
      ],
      [
        { name: 'Yusupov', pos: 'GK' },
      ],
    ],
    bench: ['Nematov', 'Erkinov', 'Sergeev', 'Davronov', 'Yakhshiboev', 'Abdikholikov', 'Komilov'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  'Curaçao': {
    nation: 'Curaçao',
    formation: '4-3-2-1',
    kit: { primary: '#002b7f', accent: '#fdef42', outline: '#001645', number: '#ffffff' },
    rows: [
      [
        { name: 'Kastaneer', pos: 'ST' },
      ],
      [
        { name: 'Gorré', pos: 'LAM' },
        { name: 'Antonisse', pos: 'RAM' },
      ],
      [
        { name: 'J. Bacuna', pos: 'CM' },
        { name: 'L. Bacuna', pos: 'CM' },
      ],
      [
        { name: 'Comenencia', pos: 'CDM' },
      ],
      [
        { name: 'Floranus', pos: 'LB' },
        { name: 'Obispo', pos: 'CB' },
        { name: 'Gaari', pos: 'CB' },
        { name: 'Sambo', pos: 'RB' },
      ],
      [
        { name: 'Room', pos: 'GK' },
      ],
    ],
    bench: ['Jong', 'Bitton', 'Brenet', 'Chong', 'Janga', 'Diemers', 'Gunsa'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  "Côte d'Ivoire": {
    nation: "Côte d'Ivoire",
    formation: '4-3-2-1',
    kit: { primary: '#f77f1b', accent: '#009e60', outline: '#8a4500', number: '#ffffff' },
    rows: [
      [
        { name: 'Guessand', pos: 'ST' },
      ],
      [
        { name: 'Diomandé', pos: 'LAM' },
        { name: 'Diallo', pos: 'RAM' },
      ],
      [
        { name: 'Oulai', pos: 'CM' },
        { name: 'Kessié', pos: 'CM' },
      ],
      [
        { name: 'Sangaré', pos: 'CDM' },
      ],
      [
        { name: 'Konan', pos: 'LB' },
        { name: "N'Dicka", pos: 'CB' },
        { name: 'Kossounou', pos: 'CB' },
        { name: 'Doué', pos: 'RB' },
      ],
      [
        { name: 'Fofana', pos: 'GK' },
      ],
    ],
    bench: ['Mandé', 'Singo', 'Boly', 'Aurier', 'Bayo', 'Pépé', 'Haller'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Ecuador: {
    nation: 'Ecuador',
    formation: '4-2-2-2',
    kit: { primary: '#fcd116', accent: '#003893', outline: '#8a7308', number: '#003893' },
    rows: [
      [
        { name: 'Valencia', pos: 'ST' },
        { name: 'Plata', pos: 'ST' },
      ],
      [
        { name: 'Angulo', pos: 'LAM' },
        { name: 'Franco', pos: 'RAM' },
      ],
      [
        { name: 'Vite', pos: 'CM' },
        { name: 'Caicedo', pos: 'CM' },
      ],
      [
        { name: 'Estupiñán', pos: 'LB' },
        { name: 'Hincapié', pos: 'CB' },
        { name: 'Pacho', pos: 'CB' },
        { name: 'Ordoñez', pos: 'RB' },
      ],
      [
        { name: 'Galíndez', pos: 'GK' },
      ],
    ],
    bench: ['Domínguez', 'Preciado', 'Cifuentes', 'Sarmiento', 'Sornoza', 'Mena', 'Rodríguez'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Canada: {
    nation: 'Canada',
    formation: '4-2-2-2',
    kit: { primary: '#d52b1e', accent: '#ffffff', outline: '#8a1813', number: '#ffffff' },
    rows: [
      [
        { name: 'David', pos: 'ST' },
        { name: 'Larin', pos: 'ST' },
      ],
      [
        { name: 'Ahmed', pos: 'LAM' },
        { name: 'Buchanan', pos: 'RAM' },
      ],
      [
        { name: 'Eustáquio', pos: 'CM' },
        { name: 'Koné', pos: 'CM' },
      ],
      [
        { name: 'Davies', pos: 'LB' },
        { name: 'Cornelius', pos: 'CB' },
        { name: 'Bombito', pos: 'CB' },
        { name: 'Johnston', pos: 'RB' },
      ],
      [
        { name: 'St. Clair', pos: 'GK' },
      ],
    ],
    bench: ['Crépeau', 'Vitória', 'Adekugbe', 'Choinière', 'Millar', 'Cavallini', 'Shaffelburg'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  'Bosnia and Herzegovina': {
    nation: 'Bosnia and Herzegovina',
    formation: '4-2-2-2',
    kit: { primary: '#002395', accent: '#fdc52e', outline: '#001245', number: '#ffffff' },
    rows: [
      [
        { name: 'Demirović', pos: 'ST' },
        { name: 'Džeko', pos: 'ST' },
      ],
      [
        { name: 'Memić', pos: 'LAM' },
        { name: 'Bajraktarević', pos: 'RAM' },
      ],
      [
        { name: 'Sunjić', pos: 'CM' },
        { name: 'Tahirović', pos: 'CM' },
      ],
      [
        { name: 'Kolašinac', pos: 'LB' },
        { name: 'Muharemović', pos: 'CB' },
        { name: 'Katić', pos: 'CB' },
        { name: 'Dedić', pos: 'RB' },
      ],
      [
        { name: 'Vasilj', pos: 'GK' },
      ],
    ],
    bench: ['Šehić', 'Ahmedhodžić', 'Bičakčić', 'Pjanić', 'Hadžiahmetović', 'Hajradinović', 'Šabanadžović'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Qatar: {
    nation: 'Qatar',
    formation: '4-3-2-1',
    kit: { primary: '#8a1538', accent: '#ffffff', outline: '#4d0c20', number: '#ffffff' },
    rows: [
      [
        { name: 'Almoez Ali', pos: 'ST' },
      ],
      [
        { name: 'Al Mannai', pos: 'LAM' },
        { name: 'Afif', pos: 'RAM' },
      ],
      [
        { name: 'Madibo', pos: 'CM' },
        { name: 'Edmilson', pos: 'CM' },
      ],
      [
        { name: 'Boudiaf', pos: 'CDM' },
      ],
      [
        { name: 'Miquel', pos: 'LB' },
        { name: 'Mendes', pos: 'CB' },
        { name: 'Khoukhi', pos: 'CB' },
        { name: 'Al Ouwi', pos: 'RB' },
      ],
      [
        { name: 'Barsham', pos: 'GK' },
      ],
    ],
    bench: ['Salah Zakaria', 'Pedro Miguel', 'Salman', 'Hatem', 'Asad', 'Al-Haydos', 'Muntari'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Switzerland: {
    nation: 'Switzerland',
    formation: '4-2-3-1',
    kit: { primary: '#da291c', accent: '#ffffff', outline: '#8a1813', number: '#ffffff' },
    rows: [
      [
        { name: 'Embolo', pos: 'ST' },
      ],
      [
        { name: 'Ndoye', pos: 'LW' },
        { name: 'Rieder', pos: 'CAM' },
        { name: 'Vargas', pos: 'RW' },
      ],
      [
        { name: 'Xhaka', pos: 'CM' },
        { name: 'Freuler', pos: 'CM' },
      ],
      [
        { name: 'Rodríguez', pos: 'LB' },
        { name: 'Akanji', pos: 'CB' },
        { name: 'Schär', pos: 'CB' },
        { name: 'Widmer', pos: 'RB' },
      ],
      [
        { name: 'Kobel', pos: 'GK' },
      ],
    ],
    bench: ['Sommer', 'Cömert', 'Aebischer', 'Sow', 'Zakaria', 'Itten', 'Seferović'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  'South Africa': {
    nation: 'South Africa',
    formation: '4-2-3-1',
    kit: { primary: '#ffd200', accent: '#006a44', outline: '#8a7308', number: '#006a44' },
    rows: [
      [
        { name: 'Foster', pos: 'ST' },
      ],
      [
        { name: 'Appollis', pos: 'LW' },
        { name: 'Mofokeng', pos: 'CAM' },
        { name: 'Hlongwane', pos: 'RW' },
      ],
      [
        { name: 'Mokoena', pos: 'CM' },
        { name: 'Sithole', pos: 'CM' },
      ],
      [
        { name: 'Modiba', pos: 'LB' },
        { name: 'Mbokazi', pos: 'CB' },
        { name: 'Okon', pos: 'CB' },
        { name: 'Mudau', pos: 'RB' },
      ],
      [
        { name: 'Williams', pos: 'GK' },
      ],
    ],
    bench: ['Mosimane', 'Du Preez', 'Ndlovu', 'Tau', 'Maboe', 'Magubane', 'Davids'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  'South Korea': {
    nation: 'South Korea',
    formation: '3-4-2-1',
    kit: { primary: '#cd2e3a', accent: '#003478', outline: '#8a1c25', number: '#ffffff' },
    rows: [
      [
        { name: 'Hwang Hee-chan', pos: 'ST' },
      ],
      [
        { name: 'Son Heung-min', pos: 'LAM' },
        { name: 'Lee Kang-in', pos: 'RAM' },
      ],
      [
        { name: 'Lee Tae-seok', pos: 'LWB' },
        { name: 'Hwang In-beom', pos: 'CM' },
        { name: 'Kim Jin-gyu', pos: 'CM' },
        { name: 'Seol Young-woo', pos: 'RWB' },
      ],
      [
        { name: 'Kim Joo-sung', pos: 'LCB' },
        { name: 'Kim Min-jae', pos: 'CB' },
        { name: 'Cho Yu-min', pos: 'RCB' },
      ],
      [
        { name: 'Kim Seung-gyu', pos: 'GK' },
      ],
    ],
    bench: ['Jo Hyeon-woo', 'Kim Young-gwon', 'Kim Moon-hwan', 'Park Yong-woo', 'Cho Gue-sung', 'Lee Jae-sung', 'Hong Hyun-seok'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Czechia: {
    nation: 'Czechia',
    formation: '3-4-2-1',
    kit: { primary: '#d7141a', accent: '#ffffff', outline: '#8a0c10', number: '#11457e' },
    rows: [
      [
        { name: 'Schick', pos: 'ST' },
      ],
      [
        { name: 'Šulc', pos: 'LAM' },
        { name: 'Provod', pos: 'RAM' },
      ],
      [
        { name: 'Jurásek', pos: 'LWB' },
        { name: 'Darida', pos: 'CM' },
        { name: 'Souček', pos: 'CM' },
        { name: 'Coufal', pos: 'RWB' },
      ],
      [
        { name: 'Krejčí', pos: 'LCB' },
        { name: 'Hranáč', pos: 'CB' },
        { name: 'Chaloupek', pos: 'RCB' },
      ],
      [
        { name: 'Kovář', pos: 'GK' },
      ],
    ],
    bench: ['Mandous', 'Holeš', 'Sadílek', 'Hložek', 'Chytil', 'Černý', 'Karabec'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Haiti: {
    nation: 'Haiti',
    formation: '4-2-3-1',
    kit: { primary: '#00209f', accent: '#d21034', outline: '#001263', number: '#ffffff' },
    rows: [
      [
        { name: 'Isidor', pos: 'ST' },
      ],
      [
        { name: 'Providence', pos: 'LW' },
        { name: 'Casimir', pos: 'CAM' },
        { name: 'Deedson', pos: 'RW' },
      ],
      [
        { name: 'Pierre', pos: 'CM' },
        { name: 'Bellegarde', pos: 'CM' },
      ],
      [
        { name: 'Lacroix', pos: 'LB' },
        { name: 'Delcroix', pos: 'CB' },
        { name: 'Ade', pos: 'CB' },
        { name: 'Arcus', pos: 'RB' },
      ],
      [
        { name: 'Placide', pos: 'GK' },
      ],
    ],
    bench: ['Genevois', 'Pierre-Gabriel', 'Belfort', 'Sainté', 'Pierrot', 'Charles', 'Boniface'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Scotland: {
    nation: 'Scotland',
    formation: '4-2-3-1',
    kit: { primary: '#0e1a3d', accent: '#ffffff', outline: '#050d1c', number: '#ffffff' },
    rows: [
      [
        { name: 'Adams', pos: 'ST' },
      ],
      [
        { name: 'Gilmour', pos: 'LW' },
        { name: 'McTominay', pos: 'CAM' },
        { name: 'McGinn', pos: 'RW' },
      ],
      [
        { name: 'Ferguson', pos: 'CM' },
        { name: 'Christie', pos: 'CM' },
      ],
      [
        { name: 'Robertson', pos: 'LB' },
        { name: 'Hanley', pos: 'CB' },
        { name: 'Souttar', pos: 'CB' },
        { name: 'Ralston', pos: 'RB' },
      ],
      [
        { name: 'Gunn', pos: 'GK' },
      ],
    ],
    bench: ['Kelly', 'Tierney', 'Cooper', 'Doak', 'Armstrong', 'Dykes', 'Forrest'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Uruguay: {
    nation: 'Uruguay',
    formation: '4-2-2-2',
    kit: { primary: '#5cbcec', accent: '#ffffff', outline: '#1a3a6a', number: '#1a3a6a' },
    rows: [
      [
        { name: 'Núñez', pos: 'ST' },
        { name: 'De Arrascaeta', pos: 'ST' },
      ],
      [
        { name: 'F. Araújo', pos: 'LAM' },
        { name: 'Canobbio', pos: 'RAM' },
      ],
      [
        { name: 'Ugarte', pos: 'CM' },
        { name: 'Valverde', pos: 'CM' },
      ],
      [
        { name: 'Olivera', pos: 'LB' },
        { name: 'Giménez', pos: 'CB' },
        { name: 'R. Araújo', pos: 'CB' },
        { name: 'Valera', pos: 'RB' },
      ],
      [
        { name: 'Muslera', pos: 'GK' },
      ],
    ],
    bench: ['Rochet', 'Coates', 'Pellistri', 'Bentancur', 'De La Cruz', 'Vecino', 'Pereira'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  'Saudi Arabia': {
    nation: 'Saudi Arabia',
    formation: '4-3-2-1',
    kit: { primary: '#006c35', accent: '#ffffff', outline: '#00451f', number: '#ffffff' },
    rows: [
      [
        { name: 'Al Buraikan', pos: 'ST' },
      ],
      [
        { name: 'S. Al-Dawsari', pos: 'LAM' },
        { name: 'N. Al-Dawsari', pos: 'RAM' },
      ],
      [
        { name: 'Al Juwayr', pos: 'CM' },
        { name: 'Al-Khaibari', pos: 'CM' },
      ],
      [
        { name: 'Kanno', pos: 'CDM' },
      ],
      [
        { name: 'Boushal', pos: 'LB' },
        { name: 'Ali Lajami', pos: 'CB' },
        { name: 'Tambakti', pos: 'CB' },
        { name: 'Abdulhamid', pos: 'RB' },
      ],
      [
        { name: 'Al Aqidi', pos: 'GK' },
      ],
    ],
    bench: ['Al-Owais', 'Al-Bulaihi', 'Al-Faraj', 'Al-Sahafi', 'Al-Shehri', 'Al-Brikan', 'Al-Hamdan'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  'Cabo Verde': {
    nation: 'Cabo Verde',
    formation: '4-2-3-1',
    kit: { primary: '#00277a', accent: '#ffffff', outline: '#001245', number: '#ffffff' },
    rows: [
      [
        { name: 'Livramento', pos: 'ST' },
      ],
      [
        { name: 'Semedo', pos: 'LW' },
        { name: 'Monteiro', pos: 'CAM' },
        { name: 'Mendes', pos: 'RW' },
      ],
      [
        { name: 'S. Semedo', pos: 'CM' },
        { name: 'Lenini', pos: 'CM' },
      ],
      [
        { name: 'Paulo', pos: 'LB' },
        { name: 'Lopes', pos: 'CB' },
        { name: 'Costa', pos: 'CB' },
        { name: 'Moreira', pos: 'RB' },
      ],
      [
        { name: 'Vozinha', pos: 'GK' },
      ],
    ],
    bench: ['Marcio', 'Stopira', 'Cabral', 'Bebé', 'Bruninho', 'Garry', 'Bruno Varela'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Belgium: {
    nation: 'Belgium',
    formation: '4-2-3-1',
    kit: { primary: '#ed2939', accent: '#fae042', outline: '#8a1820', number: '#000000' },
    rows: [
      [
        { name: 'De Ketelaere', backup: 'Lukaku', pos: 'ST' },
      ],
      [
        { name: 'Doku', pos: 'LW' },
        { name: 'De Bruyne', pos: 'CAM' },
        { name: 'Trossard', pos: 'RW' },
      ],
      [
        { name: 'Tielemans', pos: 'CM' },
        { name: 'Onana', pos: 'CM' },
      ],
      [
        { name: 'De Cuyper', pos: 'LB' },
        { name: 'Theate', pos: 'CB' },
        { name: 'Mechele', pos: 'CB' },
        { name: 'Meunier', pos: 'RB' },
      ],
      [
        { name: 'Courtois', pos: 'GK' },
      ],
    ],
    bench: ['Sels', 'Faes', 'Castagne', 'Vanaken', 'Saelemaekers', 'Openda', 'Bakayoko'],
    source: 'futbolfantasy.com (May 2026 best-guess) — Lukaku as backup CF per Neil',
    asOf: '2026-05-10',
  },

  Norway: {
    nation: 'Norway',
    formation: '4-3-2-1',
    kit: { primary: '#ed2939', accent: '#00205b', outline: '#8a1820', number: '#ffffff' },
    rows: [
      [
        { name: 'Haaland', pos: 'ST' },
      ],
      [
        { name: 'Nusa', pos: 'LAM' },
        { name: 'Sørloth', pos: 'RAM' },
      ],
      [
        { name: 'Berg', pos: 'CM' },
        { name: 'Ødegaard', pos: 'CM' },
      ],
      [
        { name: 'Berge', pos: 'CDM' },
      ],
      [
        { name: 'Wolfe', pos: 'LB' },
        { name: 'Østgaard', pos: 'CB' },
        { name: 'Ajer', pos: 'CB' },
        { name: 'Ryerson', pos: 'RB' },
      ],
      [
        { name: 'Nyland', pos: 'GK' },
      ],
    ],
    bench: ['Dyngeland', 'Strandberg', 'Bjørkan', 'Bobb', 'Vetlesen', 'Strand Larsen', 'Solbakken'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Iraq: {
    nation: 'Iraq',
    formation: '4-2-2-2',
    kit: { primary: '#007a3d', accent: '#ce1126', outline: '#00451f', number: '#ffffff' },
    rows: [
      [
        { name: 'Al Hamadi', pos: 'ST' },
        { name: 'Aymen Hussein', pos: 'ST' },
      ],
      [
        { name: 'Ibrahim Bayesh', pos: 'LAM' },
        { name: 'Youssef Amyn', pos: 'RAM' },
      ],
      [
        { name: 'Al Ammari', pos: 'CM' },
        { name: 'Iqbal', pos: 'CM' },
      ],
      [
        { name: 'Merchas Doski', pos: 'LB' },
        { name: 'Hashim Rahman', pos: 'CB' },
        { name: 'Zaid Tahseen', pos: 'CB' },
        { name: 'Hussein Ali', pos: 'RB' },
      ],
      [
        { name: 'Al Fadhli', pos: 'GK' },
      ],
    ],
    bench: ['Jalal Hassan', 'Bayar Tahir', 'Maranan', 'Mohanad Ali', 'Salem Al-Ferdaws', 'Mostafa Saadoun', 'Akam Hashim'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Iran: {
    nation: 'Iran',
    formation: '4-3-2-1',
    kit: { primary: '#ffffff', accent: '#239f40', outline: '#1a1a1a', number: '#da0000' },
    rows: [
      [
        { name: 'Taremi', pos: 'ST' },
      ],
      [
        { name: 'Hosseinzadeh', pos: 'LAM' },
        { name: 'Ghayedi', pos: 'RAM' },
      ],
      [
        { name: 'Noorafkan', pos: 'CM' },
        { name: 'Ghoddos', pos: 'CM' },
      ],
      [
        { name: 'Ezatolahi', pos: 'CDM' },
      ],
      [
        { name: 'Mohammadi', pos: 'LB' },
        { name: 'Khalilzadeh', pos: 'CB' },
        { name: 'Nemati', pos: 'CB' },
        { name: 'Esmaeilifar', pos: 'RB' },
      ],
      [
        { name: 'Beiranvand', pos: 'GK' },
      ],
    ],
    bench: ['Hosseini', 'Pouraliganji', 'Hajsafi', 'Azmoun', 'Jahanbakhsh', 'Karimi', 'Mohebi'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  'New Zealand': {
    nation: 'New Zealand',
    formation: '4-2-3-1',
    kit: { primary: '#ffffff', accent: '#000000', outline: '#1a1a1a', number: '#000000' },
    rows: [
      [
        { name: 'Wood', pos: 'ST' },
      ],
      [
        { name: 'Singh', pos: 'LW' },
        { name: 'Garbett', pos: 'CAM' },
        { name: 'Just', pos: 'RW' },
      ],
      [
        { name: 'Bell', pos: 'CM' },
        { name: 'Stamenic', pos: 'CM' },
      ],
      [
        { name: 'Old', pos: 'LB' },
        { name: 'Bindon', pos: 'CB' },
        { name: 'Boxall', pos: 'CB' },
        { name: 'Cacace', pos: 'RB' },
      ],
      [
        { name: 'Crocombe', pos: 'GK' },
      ],
    ],
    bench: ['Sail', 'Tuiloma', 'Reid', 'Smith', 'Wynne', 'Surman', 'Waine'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },

  Egypt: {
    nation: 'Egypt',
    formation: '3-4-1-2',
    kit: { primary: '#cf0921', accent: '#ffffff', outline: '#8a070f', number: '#ffffff' },
    rows: [
      [
        { name: 'Marmoush', pos: 'ST' },
        { name: 'Salah', pos: 'ST' },
      ],
      [
        { name: 'Ashour', pos: 'CAM' },
      ],
      [
        { name: 'El Fetouh', pos: 'LM' },
        { name: 'Trezeguet', pos: 'CM' },
        { name: 'Attia', pos: 'CM' },
        { name: 'Hany', pos: 'RM' },
      ],
      [
        { name: 'Rabia', pos: 'LCB' },
        { name: 'Abdelmonem', pos: 'CB' },
        { name: 'El Hanafi', pos: 'RCB' },
      ],
      [
        { name: 'El Shenawy', pos: 'GK' },
      ],
    ],
    bench: ['Gabaski', 'Hegazi', 'Sobhi', 'Mostafa Mohamed', 'Saleh Gomaa', 'Tarek Hamed', 'Mahmoud Hassan'],
    source: 'futbolfantasy.com (May 2026 best-guess)',
    asOf: '2026-05-10',
  },
};

export function lineupForNation(nation: string): Lineup | null {
  return LINEUPS[nation] ?? null;
}
