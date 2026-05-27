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
      [
        { name: 'N. Williams', backup: 'Olmo', pos: 'LW' },
        { name: 'Oyarzabal', pos: 'ST' },
        { name: 'Ferran', backup: 'Yamal (injured)', pos: 'RW' },
      ],
      [
        { name: 'Fabián', pos: 'CM' },
        { name: 'Pedri', pos: 'CM' },
      ],
      [
        { name: 'Rodri', backup: 'Zubimendi', pos: 'CDM' },
      ],
      [
        { name: 'Cucurella', pos: 'LB' },
        { name: 'Laporte', backup: 'Eric García', pos: 'CB' },
        { name: 'Cubarsí', pos: 'CB' },
        { name: 'M. Llorente', backup: 'Porro / Víctor Muñoz', pos: 'RB' },
      ],
      [
        { name: 'Unai Simón', backup: 'Joan García', pos: 'GK' },
      ],
    ],
    bench: ['Raya', 'Le Normand', 'Grimaldo', 'Mikel Merino', 'Morata', 'Gavi', 'Baena'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Brazil: {
    nation: 'Brazil',
    formation: '4-2-3-1',
    kit: { primary: '#f6d10b', accent: '#009b3a', outline: '#5a4d00', number: '#009b3a' },
    rows: [
      // Lone striker — Endrick primary, Igor Thiago backup (Brentford CF)
      [
        { name: 'Endrick', backup: 'Igor Thiago', pos: 'ST' },
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
        { name: 'Gabriel Magalhães', pos: 'CB' },
        { name: 'Marquinhos', pos: 'CB' },
        { name: 'Wesley', backup: 'Danilo Luiz', pos: 'RB' },
      ],
      // Goalkeeper
      [
        { name: 'Alisson', pos: 'GK' },
      ],
    ],
    bench: ['Ederson', 'Bremer', 'Roger Ibañez', 'Lucas Paquetá', 'Neymar', 'Martinelli', 'Luiz Henrique'],
    source: 'CBF official final World Cup squad',
    asOf: '2026-05-19',
  },

  Mexico: {
    nation: 'Mexico',
    formation: '4-3-2-1',
    kit: { primary: '#006341', accent: '#ffffff', outline: '#003a23', number: '#ffffff' },
    rows: [
      [
        { name: 'Raúl Jiménez', pos: 'ST' },
      ],
      [
        { name: 'Quiñones', backup: 'Brian Gutiérrez', pos: 'LAM' },
        { name: 'Alvarado', pos: 'RAM' },
      ],
      [
        { name: 'Fidalgo', pos: 'CM' },
        { name: 'Lira', pos: 'CM' },
      ],
      [
        { name: 'É. Álvarez', backup: 'Vargas', pos: 'CDM' },
      ],
      [
        { name: 'Gallardo', pos: 'LB' },
        { name: 'Vásquez', pos: 'CB' },
        { name: 'Montes', pos: 'CB' },
        { name: 'Israel Reyes', backup: 'Jorge Sánchez', pos: 'RB' },
      ],
      [
        { name: 'Rangel', pos: 'GK' },
      ],
    ],
    bench: ['Ochoa', 'Luis Chávez', 'Lozano', 'Santi Giménez', 'Lainez', 'Pizarro', 'Antuna'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Cherki', backup: 'D. Doué', pos: 'LW' },
        { name: 'Dembélé', pos: 'RW' },
      ],
      [
        { name: 'Olise', pos: 'CAM' },
      ],
      [
        { name: 'Rabiot', pos: 'CM' },
        { name: 'Tchouaméni', pos: 'CM' },
      ],
      [
        { name: 'Theo', pos: 'LB' },
        { name: 'Upamecano', backup: 'Konaté', pos: 'CB' },
        { name: 'Saliba', pos: 'CB' },
        { name: 'Koundé', pos: 'RB' },
      ],
      [
        { name: 'Maignan', pos: 'GK' },
      ],
    ],
    bench: ['Samba', 'B. Barcola', 'Lucas Hernández', 'Camavinga', 'Zaire-Emery', 'Thuram', 'Kolo Muani'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Germany: {
    nation: 'Germany',
    formation: '4-2-3-1',
    kit: { primary: '#ffffff', accent: '#000000', outline: '#1a1a1a', number: '#000000' },
    rows: [
      [
        { name: 'Havertz', backup: 'Woltemade', pos: 'ST' },
      ],
      [
        { name: 'Musiala', pos: 'LW' },
        { name: 'Sané', pos: 'RW' },
      ],
      [
        { name: 'Wirtz', pos: 'CAM' },
      ],
      [
        { name: 'Goretzka', backup: 'Groß / Stiller', pos: 'CM' },
        { name: 'Pavlovic', pos: 'CM' },
      ],
      [
        { name: 'Raum', pos: 'LB' },
        { name: 'Schlotterbeck', pos: 'CB' },
        { name: 'Tah', backup: 'Rüdiger', pos: 'CB' },
        { name: 'Kimmich', pos: 'RB' },
      ],
      [
        { name: 'Neuer', backup: 'Baumann', pos: 'GK' },
      ],
    ],
    bench: ['Rüdiger', 'Leweling', 'Karl', 'Thiaw', 'Beier', 'Anton', 'Stiller'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Argentina: {
    nation: 'Argentina',
    formation: '4-2-3-1',
    kit: { primary: '#6cace4', accent: '#ffffff', outline: '#1a3a6a', number: '#1a3a6a' },
    rows: [
      [
        { name: 'L. Martínez', backup: 'Almada', pos: 'ST' },
      ],
      [
        { name: 'Messi', pos: 'LW' },
        { name: 'Mac Allister', pos: 'CAM' },
        { name: 'Álvarez', pos: 'RW' },
      ],
      [
        { name: 'De Paul', backup: 'Paredes', pos: 'CM' },
        { name: 'Enzo Fernández', pos: 'CM' },
      ],
      [
        { name: 'Tagliafico', pos: 'LB' },
        { name: 'Romero', pos: 'CB' },
        { name: 'Lisandro Martínez', backup: 'Otamendi', pos: 'CB' },
        { name: 'Molina', pos: 'RB' },
      ],
      [
        { name: 'E. Martínez', pos: 'GK' },
      ],
    ],
    bench: ['Rulli', 'Lo Celso', 'Garnacho', 'N. González', 'Mastantuono', 'Acuña', 'Quintero'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Algeria: {
    nation: 'Algeria',
    formation: '4-3-3',
    kit: { primary: '#006233', accent: '#d21034', outline: '#003a1d', number: '#ffffff' },
    rows: [
      [
        { name: 'Maza', pos: 'LW' },
        { name: 'Gouiri', backup: 'Amoura', pos: 'ST' },
        { name: 'Mahrez', backup: 'Chaïbi', pos: 'RW' },
      ],
      [
        { name: 'Bennacer', pos: 'CM' },
        { name: 'Boudaoui', pos: 'CM' },
        { name: 'Chergui', pos: 'CM' },
      ],
      [
        { name: 'Aït-Nouri', pos: 'LB' },
        { name: 'Bensebaïni', backup: 'Belaïd', pos: 'CB' },
        { name: 'Mandi', pos: 'CB' },
        { name: 'Belghali', pos: 'RB' },
      ],
      [
        { name: 'Luca Zidane', pos: 'GK' },
      ],
    ],
    bench: ['M’Bolhi', 'Atal', 'Tougai', 'Zorgane', 'Brahimi', 'Belaili', 'Aouar'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Morocco: {
    nation: 'Morocco',
    formation: '4-1-2-3',
    kit: { primary: '#c1272d', accent: '#006233', outline: '#8a1c20', number: '#ffffff' },
    rows: [
      [
        { name: 'Abde', pos: 'LW' },
        { name: 'El Kaabi', backup: 'En-Nesyri', pos: 'ST' },
        { name: 'Brahim', pos: 'RW' },
      ],
      [
        { name: 'Ounahi', pos: 'CM' },
        { name: 'El Khannouss', pos: 'CM' },
      ],
      [
        { name: 'S. Amrabat', backup: 'El Aynaoui', pos: 'CDM' },
      ],
      [
        { name: 'Mazraoui', pos: 'LB' },
        { name: 'Aguerd', pos: 'CB' },
        { name: 'Chadi Riad', backup: 'Diop', pos: 'CB' },
        { name: 'Achraf', pos: 'RB' },
      ],
      [
        { name: 'Bono', pos: 'GK' },
      ],
    ],
    bench: ['Munir', 'Benoun', 'Saïss', 'Adli', 'Ben Seghir', 'Aboukhlal', 'Saïbari'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Portugal: {
    nation: 'Portugal',
    formation: '4-2-3-1',
    kit: { primary: '#a32638', accent: '#006a44', outline: '#6b1825', number: '#ffffff' },
    rows: [
      [
        { name: 'Ronaldo', backup: 'G. Ramos', pos: 'ST' },
      ],
      [
        { name: 'Leão', pos: 'LW' },
        { name: 'Fernandes', pos: 'CAM' },
        { name: 'B. Silva', pos: 'RW' },
      ],
      [
        { name: 'J. Neves', pos: 'CM' },
        { name: 'Vitinha', pos: 'CM' },
      ],
      [
        { name: 'N. Mendes', pos: 'LB' },
        { name: 'R. Dias', pos: 'CB' },
        { name: 'Inácio', pos: 'CB' },
        { name: 'Cancelo', backup: 'Dalot', pos: 'RB' },
      ],
      [
        { name: 'D. Costa', pos: 'GK' },
      ],
    ],
    bench: ['José Sá', 'A. Silva', 'R. Neves', 'P. Neto', 'J. Félix', 'Veiga', 'Conceição'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Austria: {
    nation: 'Austria',
    formation: '4-2-3-1',
    kit: { primary: '#ed2939', accent: '#ffffff', outline: '#8b1820', number: '#ffffff' },
    rows: [
      [
        { name: 'Arnautović', pos: 'ST' },
      ],
      [
        { name: 'Wimmer', pos: 'LW' },
        { name: 'Sabitzer', pos: 'CAM' },
        { name: 'Schmid', backup: 'Baumgartner', pos: 'RW' },
      ],
      [
        { name: 'Seiwald', pos: 'CM' },
        { name: 'X. Schlager', pos: 'CM' },
      ],
      [
        { name: 'Mwene', pos: 'LB' },
        { name: 'Alaba', pos: 'CB' },
        { name: 'Danso', pos: 'CB' },
        { name: 'Laimer', pos: 'RB' },
      ],
      [
        { name: 'Pentz', backup: 'A. Schlager', pos: 'GK' },
      ],
    ],
    bench: ['Lindner', 'Trauner', 'Posch', 'Grillitsch', 'Gregoritsch', 'Adamu', 'Friedl'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Jordan: {
    nation: 'Jordan',
    formation: '3-4-2-1',
    kit: { primary: '#ce1126', accent: '#ffffff', outline: '#7a0a17', number: '#ffffff' },
    rows: [
      [
        { name: 'Ali Olwan', backup: 'Al-Mardi', pos: 'ST' },
      ],
      [
        { name: 'Al-Taamari', pos: 'LAM' },
        { name: 'Al-Rawabdeh', pos: 'RAM' },
      ],
      [
        { name: 'Abu Hashish', pos: 'LWB' },
        { name: 'Assaf', pos: 'CM' },
        { name: 'Al-Rashdan', pos: 'CM' },
        { name: 'Abu Taha', pos: 'RWB' },
      ],
      [
        { name: 'Naseeb', pos: 'LCB' },
        { name: 'Al Arab', pos: 'CB' },
        { name: 'Al Nadi', pos: 'RCB' },
      ],
      [
        { name: 'Layla', pos: 'GK' },
      ],
    ],
    bench: ['Al Fakhouri', 'Al Ajalin', 'Haddad', 'Sabra', 'Marei', 'Al Saify', 'Jamous'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Colombia: {
    nation: 'Colombia',
    formation: '4-2-3-1',
    kit: { primary: '#FCD116', accent: '#003893', outline: '#8a7308', number: '#003893' },
    rows: [
      [
        { name: 'Luis Suárez', backup: 'Córdoba', pos: 'ST' },
      ],
      [
        { name: 'Luis Díaz', pos: 'LW' },
        { name: 'James', pos: 'CAM' },
        { name: 'Jhon Arias', pos: 'RW' },
      ],
      [
        { name: 'Lerma', pos: 'CM' },
        { name: 'Richard Ríos', pos: 'CM' },
      ],
      [
        { name: 'Mojica', pos: 'LB' },
        { name: 'Lucumí', pos: 'CB' },
        { name: 'Davinson', backup: 'Montero', pos: 'CB' },
        { name: 'Muñoz', pos: 'RB' },
      ],
      [
        { name: 'Vargas', pos: 'GK' },
      ],
    ],
    bench: ['Mier', 'Mina', 'Cuesta', 'Barrios', 'Uribe', 'Borja', 'Cuadrado'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Kovačić', backup: 'L. Sučić', pos: 'CM' },
      ],
      [
        { name: 'Sosa', pos: 'LB' },
        { name: 'Gvardiol', pos: 'CB' },
        { name: 'Šutalo', backup: 'Ćaleta-Car / Vušković', pos: 'CB' },
        { name: 'Stanišić', pos: 'RB' },
      ],
      [
        { name: 'Livaković', pos: 'GK' },
      ],
    ],
    bench: ['Ivušić', 'Erlić', 'Brozović', 'Petković', 'Baturina', 'Sučić', 'Pjaca'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'J. Ayew', pos: 'LAM' },
        { name: 'Semenyo', backup: 'Fatawu', pos: 'RAM' },
      ],
      [
        { name: 'Seidu', pos: 'LWB' },
        { name: 'Thomas', pos: 'CM' },
        { name: 'Sibo', backup: 'Köhn', pos: 'CM' },
        { name: 'Yirenkyi', pos: 'RWB' },
      ],
      [
        { name: 'Opoku', pos: 'LCB' },
        { name: 'Djiku', pos: 'CB' },
        { name: 'Adjetey', pos: 'RCB' },
      ],
      [
        { name: 'Asare', backup: 'Ati-Zigi', pos: 'GK' },
      ],
    ],
    bench: ['Wollacott', 'J. Mensah', 'Salisu', 'Baba Rahman', 'Owusu', 'Sulemana', 'Bukari'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Panama: {
    nation: 'Panama',
    formation: '4-2-3-1',
    kit: { primary: '#db3030', accent: '#1d39b3', outline: '#8a1d1d', number: '#ffffff' },
    rows: [
      [
        { name: 'Waterman', backup: 'Fajardo', pos: 'ST' },
      ],
      [
        { name: 'Ismael Díaz', pos: 'LW' },
        { name: 'Carrasquilla', backup: 'Bárcenas', pos: 'CAM' },
        { name: 'Rodríguez', pos: 'RW' },
      ],
      [
        { name: 'Blackman', backup: 'Harvey', pos: 'CM' },
        { name: 'Godoy', pos: 'CM' },
      ],
      [
        { name: 'Davis', pos: 'LB' },
        { name: 'Córdoba', pos: 'CB' },
        { name: 'Andrade', backup: 'Escobar', pos: 'CB' },
        { name: 'Murillo', pos: 'RB' },
      ],
      [
        { name: 'Mosquera', pos: 'GK' },
      ],
    ],
    bench: ['Mejía', 'Galindo', 'Welch', 'Tanner', 'Watson', 'Galván', 'Cox'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Rashford', backup: 'Gordon', pos: 'LW' },
        { name: 'Bellingham', backup: 'Eze / Rogers', pos: 'CAM' },
        { name: 'Saka', pos: 'RW' },
      ],
      [
        { name: 'Rice', pos: 'CM' },
        { name: 'Anderson', backup: 'Mainoo', pos: 'CM' },
      ],
      [
        { name: 'O’Reilly', pos: 'LB' },
        { name: 'Guéhi', pos: 'CB' },
        { name: 'Konsa', backup: 'Stones', pos: 'CB' },
        { name: 'James', pos: 'RB' },
      ],
      [
        { name: 'Pickford', pos: 'GK' },
      ],
    ],
    bench: ['D. Henderson', 'Trippier', 'Foden', 'Watkins', 'Livramento', 'Burn', 'Madueke'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Netherlands: {
    nation: 'Netherlands',
    formation: '4-3-3',
    kit: { primary: '#ff7900', accent: '#ffffff', outline: '#a04500', number: '#ffffff' },
    rows: [
      [
        { name: 'Gakpo', pos: 'LW' },
        { name: 'Memphis', backup: 'Zirkzee', pos: 'ST' },
        { name: 'Malen', pos: 'RW' },
      ],
      [
        { name: 'Reijnders', pos: 'CM' },
        { name: 'F. de Jong', pos: 'CM' },
        { name: 'Gravenberch', pos: 'CM' },
      ],
      [
        { name: 'Aké', backup: 'Van de Ven', pos: 'LB' },
        { name: 'Van Dijk', pos: 'CB' },
        { name: 'Timber', backup: 'Van Hecke', pos: 'CB' },
        { name: 'Dumfries', pos: 'RB' },
      ],
      [
        { name: 'Verbruggen', pos: 'GK' },
      ],
    ],
    bench: ['Flekken', 'Hato', 'Schouten', 'Xavi Simons', 'Brobbey', 'Weghorst', 'Frimpong'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Senegal: {
    nation: 'Senegal',
    formation: '4-3-3',
    kit: { primary: '#00853f', accent: '#fdef42', outline: '#00541f', number: '#ffffff' },
    rows: [
      [
        { name: 'Mané', pos: 'LW' },
        { name: 'Jackson', pos: 'ST' },
        { name: 'I. Sarr', backup: 'Ndiaye', pos: 'RW' },
      ],
      [
        { name: 'Pape Gueye', pos: 'CM' },
        { name: 'Gana Gueye', pos: 'CM' },
        { name: 'Diarra', backup: 'Camara', pos: 'CM' },
      ],
      [
        { name: 'Malick Diouf', pos: 'LB' },
        { name: 'Niakhaté', backup: 'M. Sarr', pos: 'CB' },
        { name: 'Koulibaly', pos: 'CB' },
        { name: 'Diatta', pos: 'RB' },
      ],
      [
        { name: 'É. Mendy', pos: 'GK' },
      ],
    ],
    bench: ['Dieng', 'Seck', 'Sabaly', 'Pape Matar Sarr', 'Dia', 'Boulaye Dia', 'Lopy'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  'United States': {
    nation: 'United States',
    formation: '4-2-3-1',
    kit: { primary: '#1a3766', accent: '#c8102e', outline: '#0c1f3d', number: '#ffffff' },
    rows: [
      [
        { name: 'Balogun', backup: 'Pepi', pos: 'ST' },
      ],
      [
        { name: 'Pulisic', pos: 'LW' },
        { name: 'Tillman', pos: 'CAM' },
        { name: 'Weah', pos: 'RW' },
      ],
      [
        { name: 'McKennie', pos: 'CM' },
        { name: 'Adams', pos: 'CM' },
      ],
      [
        { name: 'Robinson', pos: 'LB' },
        { name: 'Ream', pos: 'CB' },
        { name: 'Richards', backup: 'McKenzie / Trusty', pos: 'CB' },
        { name: 'Dest', pos: 'RB' },
      ],
      [
        { name: 'Freese', pos: 'GK' },
      ],
    ],
    bench: ['Turner', 'Scally', 'Musah', 'Reyna', 'Aaronson', 'Tessmann', 'Cardoso'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Japan: {
    nation: 'Japan',
    formation: '3-4-2-1',
    kit: { primary: '#0a1d3a', accent: '#bc002d', outline: '#050d1c', number: '#ffffff' },
    rows: [
      [
        { name: 'Ueda', backup: 'Maeda', pos: 'ST' },
      ],
      [
        { name: 'Kamada', pos: 'LAM' },
        { name: 'Kubo', pos: 'RAM' },
      ],
      [
        { name: 'Sugawara', pos: 'LWB' },
        { name: 'Endo', pos: 'CM' },
        { name: 'Ao Tanaka', backup: 'K. Nakamura', pos: 'CM' },
        { name: 'Doan', pos: 'RWB' },
      ],
      [
        { name: 'H. Ito', pos: 'LCB' },
        { name: 'Tomiyasu', pos: 'CB' },
        { name: 'Watanabe', backup: 'Itakura', pos: 'RCB' },
      ],
      [
        { name: 'Suzuki', pos: 'GK' },
      ],
    ],
    bench: ['D. Suzuki', 'Sakai', 'Morita', 'Minamino', 'Asano', 'Mitoma', 'Y. Suzuki'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'D. Svensson', pos: 'LWB' },
        { name: 'Ayari', backup: 'Gudmundsson', pos: 'CM' },
        { name: 'Karlström', pos: 'CM' },
        { name: 'H. Johansson', pos: 'RWB' },
      ],
      [
        { name: 'Lindelöf', pos: 'LCB' },
        { name: 'Starfelt', pos: 'CB' },
        { name: 'Hien', backup: 'Lagerbielke', pos: 'RCB' },
      ],
      [
        { name: 'Nordfeldt', pos: 'GK' },
      ],
    ],
    bench: ['Olsen', 'Augustinsson', 'Ekdal', 'Bergvall', 'Kulusevski', 'Forsberg', 'Bengtsson'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Tunisia: {
    nation: 'Tunisia',
    formation: '4-2-3-1',
    kit: { primary: '#e70013', accent: '#ffffff', outline: '#8a000c', number: '#ffffff' },
    rows: [
      [
        { name: 'Mastouri', backup: 'Chaouat', pos: 'ST' },
      ],
      [
        { name: 'Tounekti', pos: 'LW' },
        { name: 'Ben Slimane', backup: 'Mejbri', pos: 'CAM' },
        { name: 'Gharbi', pos: 'RW' },
      ],
      [
        { name: 'Skhiri', backup: 'Laïdouni', pos: 'CM' },
        { name: 'Khedira', pos: 'CM' },
      ],
      [
        { name: 'Abdi', pos: 'LB' },
        { name: 'Talbi', pos: 'CB' },
        { name: 'Bronn', backup: 'Rekik', pos: 'CB' },
        { name: 'Valery', pos: 'RB' },
      ],
      [
        { name: 'Dahmen', pos: 'GK' },
      ],
    ],
    bench: ['Ben Mustapha', 'Drager', 'Maaloul', 'Elias Saad', 'Achouri', 'Khazri', 'Msakni'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Paraguay: {
    nation: 'Paraguay',
    formation: '4-2-3-1',
    kit: { primary: '#d52b1e', accent: '#ffffff', outline: '#8a1813', number: '#003a8c' },
    rows: [
      [
        { name: 'Sanabria', backup: 'Bobadilla', pos: 'ST' },
      ],
      [
        { name: 'Enciso', backup: 'Sosa', pos: 'LW' },
        { name: 'Almirón', pos: 'CAM' },
        { name: 'Diego Gómez', pos: 'RW' },
      ],
      [
        { name: 'Cubas', pos: 'CM' },
        { name: 'Ojeda', pos: 'CM' },
      ],
      [
        { name: 'Alonso', pos: 'LB' },
        { name: 'G. Gómez', pos: 'CB' },
        { name: 'Alderete', pos: 'CB' },
        { name: 'Cáceres', pos: 'RB' },
      ],
      [
        { name: 'Fernández', backup: 'Gill', pos: 'GK' },
      ],
    ],
    bench: ['Olivier', 'R. Rojas', 'Caballero', 'Galarza', 'Avalos', 'Bareiro', 'Sanabria (V)'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Hrustic', pos: 'RAM' },
      ],
      [
        { name: 'Bos', backup: 'Trewin', pos: 'LWB' },
        { name: 'Irvine', pos: 'CM' },
        { name: 'O’Neill', backup: 'Metcalfe', pos: 'CM' },
        { name: 'Italiano', pos: 'RWB' },
      ],
      [
        { name: 'Burgess', pos: 'LCB' },
        { name: 'Souttar', pos: 'CB' },
        { name: 'Circati', backup: 'Rowles', pos: 'RCB' },
      ],
      [
        { name: 'Ryan', pos: 'GK' },
      ],
    ],
    bench: ['Vukovic', 'Behich', 'Mooy', 'Duke', 'Borello', 'Boyle', 'Velupillay'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  'Türkiye': {
    nation: 'Türkiye',
    formation: '4-2-3-1',
    kit: { primary: '#e30a17', accent: '#ffffff', outline: '#8a060e', number: '#ffffff' },
    rows: [
      [
        { name: 'Aktürkoğlu', backup: 'Yılmaz', pos: 'ST' },
      ],
      [
        { name: 'Yıldız', pos: 'LW' },
        { name: 'Arda Güler', backup: 'Orkun', pos: 'CAM' },
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
        { name: 'Çelik', backup: 'Müldür', pos: 'RB' },
      ],
      [
        { name: 'Çakır', pos: 'GK' },
      ],
    ],
    bench: ['Bayındır', 'Söyüncü', 'Kökçü', 'Yokuşlu', 'Akgün', 'Tosun', 'Kahveci'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Mbuku', backup: 'Cipenga', pos: 'RAM' },
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
    bench: ['Akolo', 'Tshibola', 'Bongonda', 'Bayo', 'Mukoko', 'Lukeba', 'Brym'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Ganiev', pos: 'RAM' },
      ],
      [
        { name: 'Urozov', pos: 'LWB' },
        { name: 'Shukurov', pos: 'CM' },
        { name: 'Khamrobekov', pos: 'CM' },
        { name: 'Alijonov', pos: 'RWB' },
      ],
      [
        { name: 'Karimov', pos: 'LCB' },
        { name: 'Ashurmatov', backup: 'Nasrullayev', pos: 'CB' },
        { name: 'Khusanov', pos: 'RCB' },
      ],
      [
        { name: 'Nematov', backup: 'Yusupov', pos: 'GK' },
      ],
    ],
    bench: ['Erkinov', 'Sergeev', 'Davronov', 'Yakhshiboev', 'Abdikholikov', 'Komilov', 'Fayzullaev'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  'Curaçao': {
    nation: 'Curaçao',
    formation: '4-3-2-1',
    kit: { primary: '#002b7f', accent: '#fdef42', outline: '#001645', number: '#ffffff' },
    rows: [
      [
        { name: 'Kastaneer', backup: 'Locadia', pos: 'ST' },
      ],
      [
        { name: 'Gorré', backup: 'Chong', pos: 'LAM' },
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
        { name: 'Obispo', backup: 'van Eijma', pos: 'CB' },
        { name: 'Gaari', pos: 'CB' },
        { name: 'Sambo', backup: 'Brenet', pos: 'RB' },
      ],
      [
        { name: 'Room', pos: 'GK' },
      ],
    ],
    bench: ['Jong', 'Bitton', 'Janga', 'Diemers', 'Gunsa', 'Maher', 'Pelupessy'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  "Côte d'Ivoire": {
    nation: "Côte d'Ivoire",
    formation: '4-3-2-1',
    kit: { primary: '#f77f1b', accent: '#009e60', outline: '#8a4500', number: '#ffffff' },
    rows: [
      [
        { name: 'Guessand', backup: 'Yan Diomande', pos: 'ST' },
      ],
      [
        { name: 'Adingra', pos: 'LAM' },
        { name: 'Amad', pos: 'RAM' },
      ],
      [
        { name: 'Kessié', pos: 'CM' },
        { name: 'Seko Fofana', pos: 'CM' },
      ],
      [
        { name: 'Sangaré', pos: 'CDM' },
      ],
      [
        { name: 'Konan', pos: 'LB' },
        { name: "N'Dicka", pos: 'CB' },
        { name: 'Kossounou', backup: 'Diomande', pos: 'CB' },
        { name: 'Singo', backup: 'Guela Doue', pos: 'RB' },
      ],
      [
        { name: 'Fofana', backup: 'Lafont', pos: 'GK' },
      ],
    ],
    bench: ['Mandé', 'Boly', 'Aurier', 'Bayo', 'Pépé', 'Haller', 'Krasso'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Ecuador: {
    nation: 'Ecuador',
    formation: '4-3-3',
    kit: { primary: '#fcd116', accent: '#003893', outline: '#8a7308', number: '#003893' },
    rows: [
      [
        { name: 'Angulo', pos: 'LW' },
        { name: 'Enner Valencia', backup: 'Yeboah', pos: 'ST' },
        { name: 'Plata', pos: 'RW' },
      ],
      [
        { name: 'Caicedo', pos: 'CM' },
        { name: 'A. Franco', pos: 'CM' },
        { name: 'Vite', pos: 'CM' },
      ],
      [
        { name: 'Estupiñán', pos: 'LB' },
        { name: 'Hincapié', pos: 'CB' },
        { name: 'Pacho', pos: 'CB' },
        { name: 'Ordóñez', pos: 'RB' },
      ],
      [
        { name: 'Galíndez', pos: 'GK' },
      ],
    ],
    bench: ['Domínguez', 'Preciado', 'Cifuentes', 'Sarmiento', 'Sornoza', 'Mena', 'Rodríguez'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Canada: {
    nation: 'Canada',
    formation: '4-2-3-1',
    kit: { primary: '#d52b1e', accent: '#ffffff', outline: '#8a1813', number: '#ffffff' },
    rows: [
      [
        { name: 'Jonathan David', backup: 'Larin / Oluwaseyi', pos: 'ST' },
      ],
      [
        { name: 'Davies', pos: 'LW' },
        { name: 'Ali Ahmed', backup: 'Millar', pos: 'CAM' },
        { name: 'Buchanan', pos: 'RW' },
      ],
      [
        { name: 'Eustáquio', pos: 'CM' },
        { name: 'Koné', pos: 'CM' },
      ],
      [
        { name: 'Laryea', pos: 'LB' },
        { name: 'Cornelius', pos: 'CB' },
        { name: 'Bombito', backup: 'Sigur', pos: 'CB' },
        { name: 'Johnston', pos: 'RB' },
      ],
      [
        { name: 'St. Clair', backup: 'Crépeau', pos: 'GK' },
      ],
    ],
    bench: ['Vitória', 'Adekugbe', 'Choinière', 'Hoilett', 'Cavallini', 'Shaffelburg', 'Brym'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Memić', backup: 'Bašić', pos: 'LAM' },
        { name: 'Bajraktarević', backup: 'Alajbegović', pos: 'RAM' },
      ],
      [
        { name: 'Šunjić', pos: 'CM' },
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
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Al-Haydos', pos: 'LAM' },
        { name: 'Akram Afif', pos: 'RAM' },
      ],
      [
        { name: 'Madibo', pos: 'CM' },
        { name: 'Edmilson', pos: 'CM' },
      ],
      [
        { name: 'Boudiaf', backup: 'Hatem', pos: 'CDM' },
      ],
      [
        { name: 'Lucas Mendes', pos: 'LB' },
        { name: 'Khoukhi', pos: 'CB' },
        { name: 'Pedro Miguel', pos: 'CB' },
        { name: 'Al Amin', pos: 'RB' },
      ],
      [
        { name: 'Barsham', pos: 'GK' },
      ],
    ],
    bench: ['Salah Zakaria', 'Salman', 'Abdurisag', 'Asad', 'Muntari', 'Almahdi', 'Khoukhi (jr)'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Switzerland: {
    nation: 'Switzerland',
    formation: '4-2-3-1',
    kit: { primary: '#da291c', accent: '#ffffff', outline: '#8a1813', number: '#ffffff' },
    rows: [
      [
        { name: 'Embolo', backup: 'Okafor', pos: 'ST' },
      ],
      [
        { name: 'Vargas', pos: 'LW' },
        { name: 'Rieder', backup: 'Zakaria / Sow', pos: 'CAM' },
        { name: 'Ndoye', pos: 'RW' },
      ],
      [
        { name: 'Xhaka', pos: 'CM' },
        { name: 'Freuler', pos: 'CM' },
      ],
      [
        { name: 'Rodríguez', pos: 'LB' },
        { name: 'Elvedi', pos: 'CB' },
        { name: 'Akanji', pos: 'CB' },
        { name: 'Widmer', pos: 'RB' },
      ],
      [
        { name: 'Kobel', backup: 'Mvogo', pos: 'GK' },
      ],
    ],
    bench: ['Sommer', 'Cömert', 'Aebischer', 'Amdouni', 'Itten', 'Seferović', 'Jashari'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Moremi', backup: 'Zwane', pos: 'LW' },
        { name: 'Mofokeng', backup: 'Zwane', pos: 'CAM' },
        { name: 'Appollis', pos: 'RW' },
      ],
      [
        { name: 'Adams', pos: 'CM' },
        { name: 'Mokoena', pos: 'CM' },
      ],
      [
        { name: 'Modiba', pos: 'LB' },
        { name: 'Mbokazi', pos: 'CB' },
        { name: 'Ngezana', backup: 'Okon', pos: 'CB' },
        { name: 'Mudau', pos: 'RB' },
      ],
      [
        { name: 'Williams', pos: 'GK' },
      ],
    ],
    bench: ['Mosimane', 'Sithole', 'Du Preez', 'Hlongwane', 'Tau', 'Maboe', 'Davids'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  'South Korea': {
    nation: 'South Korea',
    formation: '3-4-2-1',
    kit: { primary: '#cd2e3a', accent: '#003478', outline: '#8a1c25', number: '#ffffff' },
    rows: [
      [
        { name: 'Hwang Hee-chan', backup: 'Oh Hyeon-gyu', pos: 'ST' },
      ],
      [
        { name: 'Son Heung-min', pos: 'LAM' },
        { name: 'Lee Kang-in', pos: 'RAM' },
      ],
      [
        { name: 'Lee Tae-seok', pos: 'LWB' },
        { name: 'Hwang In-beom', pos: 'CM' },
        { name: 'Paik Seung-ho', pos: 'CM' },
        { name: 'Seol Young-woo', pos: 'RWB' },
      ],
      [
        { name: 'Cho Yu-min', backup: 'Kim Tae-hyeon', pos: 'LCB' },
        { name: 'Kim Min-jae', pos: 'CB' },
        { name: 'Lee Han-beom', backup: 'Lee Jae-sung', pos: 'RCB' },
      ],
      [
        { name: 'Kim Seung-gyu', pos: 'GK' },
      ],
    ],
    bench: ['Jo Hyeon-woo', 'Kim Young-gwon', 'Kim Moon-hwan', 'Park Yong-woo', 'Cho Gue-sung', 'Kim Jin-gyu', 'Hong Hyun-seok'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Provod', backup: 'Chorý', pos: 'LAM' },
        { name: 'Šulc', pos: 'RAM' },
      ],
      [
        { name: 'Zelený', backup: 'Jurásek', pos: 'LWB' },
        { name: 'Darida', pos: 'CM' },
        { name: 'Souček', pos: 'CM' },
        { name: 'Coufal', pos: 'RWB' },
      ],
      [
        { name: 'Krejčí', pos: 'LCB' },
        { name: 'Hranáč', pos: 'CB' },
        { name: 'Chaloupek', backup: 'Holeš', pos: 'RCB' },
      ],
      [
        { name: 'Kovář', pos: 'GK' },
      ],
    ],
    bench: ['Mandous', 'Sadílek', 'Hložek', 'Chytil', 'Černý', 'Karabec', 'Soucek'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Haiti: {
    nation: 'Haiti',
    formation: '4-2-3-1',
    kit: { primary: '#00209f', accent: '#d21034', outline: '#001263', number: '#ffffff' },
    rows: [
      [
        { name: 'Isidor', backup: 'Etienne Jr', pos: 'ST' },
      ],
      [
        { name: 'Deedson L.', pos: 'LW' },
        { name: 'Providence', pos: 'CAM' },
        { name: 'Pierrot', backup: 'Nazon', pos: 'RW' },
      ],
      [
        { name: 'Bellegarde', pos: 'CM' },
        { name: 'Jean Jacques', pos: 'CM' },
      ],
      [
        { name: 'Expérience', pos: 'CDM' },
      ],
      [
        { name: 'Pierre', pos: 'LB' },
        { name: 'Adé', pos: 'CB' },
        { name: 'Duverne', backup: 'Delcroix', pos: 'CB' },
        { name: 'Arcus', pos: 'RB' },
      ],
      [
        { name: 'Placide', pos: 'GK' },
      ],
    ],
    bench: ['Genevois', 'Pierre-Gabriel', 'Belfort', 'Sainté', 'Casimir', 'Charles', 'Boniface'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Scotland: {
    nation: 'Scotland',
    formation: '3-4-2-1',
    kit: { primary: '#0e1a3d', accent: '#ffffff', outline: '#050d1c', number: '#ffffff' },
    rows: [
      [
        { name: 'Adams', backup: 'Dykes', pos: 'ST' },
      ],
      [
        { name: 'McGinn', pos: 'LAM' },
        { name: 'Christie', pos: 'RAM' },
      ],
      [
        { name: 'Hickey', backup: 'Robertson', pos: 'LWB' },
        { name: 'Gilmour', pos: 'CM' },
        { name: 'McTominay', pos: 'CM' },
        { name: 'Ralston', backup: 'Patterson', pos: 'RWB' },
      ],
      [
        { name: 'Tierney', pos: 'LCB' },
        { name: 'Hendry', pos: 'CB' },
        { name: 'Souttar', pos: 'RCB' },
      ],
      [
        { name: 'Gunn', pos: 'GK' },
      ],
    ],
    bench: ['Kelly', 'Cooper', 'Hanley', 'Ferguson', 'Doak', 'Armstrong', 'Forrest'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Pellistri', pos: 'LAM' },
        { name: 'Canobbio', backup: 'M. Araújo', pos: 'RAM' },
      ],
      [
        { name: 'Valverde', pos: 'CM' },
        { name: 'Ugarte', backup: 'Bentancur', pos: 'CM' },
      ],
      [
        { name: 'M. Olivera', pos: 'LB' },
        { name: 'R. Araújo', pos: 'CB' },
        { name: 'Giménez', pos: 'CB' },
        { name: 'Nández', backup: 'Varela', pos: 'RB' },
      ],
      [
        { name: 'Muslera', backup: 'Rochet', pos: 'GK' },
      ],
    ],
    bench: ['Coates', 'De La Cruz', 'Vecino', 'Pereira', 'Viñas', 'Cabral', 'Trezza'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  'Saudi Arabia': {
    nation: 'Saudi Arabia',
    formation: '4-3-2-1',
    kit: { primary: '#006c35', accent: '#ffffff', outline: '#00451f', number: '#ffffff' },
    rows: [
      [
        { name: 'Al-Buraikan', pos: 'ST' },
      ],
      [
        { name: 'S. Al-Dawsari', pos: 'LAM' },
        { name: 'N. Al-Dawsari', pos: 'RAM' },
      ],
      [
        { name: 'Al-Juwayr', pos: 'CM' },
        { name: 'Al-Khaibari', pos: 'CM' },
      ],
      [
        { name: 'Kanno', pos: 'CDM' },
      ],
      [
        { name: 'Al-Amri', pos: 'LB' },
        { name: 'Thakri', pos: 'CB' },
        { name: 'Tambakti', pos: 'CB' },
        { name: 'Abdulhamid', backup: 'Al-Harbi', pos: 'RB' },
      ],
      [
        { name: 'Al-Aqidi', pos: 'GK' },
      ],
    ],
    bench: ['Al-Owais', 'Al-Bulaihi', 'Al-Faraj', 'Al-Sahafi', 'Al-Shehri', 'Al-Brikan', 'Al-Hamdan'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  'Cabo Verde': {
    nation: 'Cabo Verde',
    formation: '4-2-3-1',
    kit: { primary: '#00277a', accent: '#ffffff', outline: '#001245', number: '#ffffff' },
    rows: [
      [
        { name: 'Livramento', backup: 'Telmo', pos: 'ST' },
      ],
      [
        { name: 'Y. Semedo', pos: 'LW' },
        { name: 'Ryan Mendes', pos: 'CAM' },
        { name: 'Garry Rodrigues', backup: 'Willy Semedo', pos: 'RW' },
      ],
      [
        { name: 'Jamiro Monteiro', pos: 'CM' },
        { name: 'Sidny Cabral', backup: 'Kevin Pina', pos: 'CM' },
      ],
      [
        { name: 'João Paulo', pos: 'LB' },
        { name: 'Pico Lopes', pos: 'CB' },
        { name: 'Logan Costa', pos: 'CB' },
        { name: 'Moreira', pos: 'RB' },
      ],
      [
        { name: 'Vozinha', pos: 'GK' },
      ],
    ],
    bench: ['Marcio', 'Stopira', 'Bebé', 'Bruninho', 'Bruno Varela', 'Andrade', 'Pereira'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Belgium: {
    nation: 'Belgium',
    formation: '4-2-3-1',
    kit: { primary: '#ed2939', accent: '#fae042', outline: '#8a1820', number: '#000000' },
    rows: [
      [
        { name: 'Lukaku', backup: 'De Ketelaere', pos: 'ST' },
      ],
      [
        { name: 'Doku', pos: 'LW' },
        { name: 'De Bruyne', backup: 'De Ketelaere', pos: 'CAM' },
        { name: 'Trossard', backup: 'Lukebakio', pos: 'RW' },
      ],
      [
        { name: 'Tielemans', pos: 'CM' },
        { name: 'Onana', pos: 'CM' },
      ],
      [
        { name: 'Theate', backup: 'De Cuyper', pos: 'LB' },
        { name: 'Debast', pos: 'CB' },
        { name: 'Castagne', pos: 'CB' },
        { name: 'Meunier', pos: 'RB' },
      ],
      [
        { name: 'Courtois', pos: 'GK' },
      ],
    ],
    bench: ['Sels', 'Faes', 'Mechele', 'Vanaken', 'Saelemaekers', 'Openda', 'Bakayoko'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Møller Wolfe', pos: 'LB' },
        { name: 'Heggem', pos: 'CB' },
        { name: 'Østigård', backup: 'Ajer', pos: 'CB' },
        { name: 'Ryerson', pos: 'RB' },
      ],
      [
        { name: 'Nyland', pos: 'GK' },
      ],
    ],
    bench: ['Dyngeland', 'Strandberg', 'Bjørkan', 'Bobb', 'Vetlesen', 'Strand Larsen', 'Solbakken'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Iraq: {
    nation: 'Iraq',
    formation: '4-2-2-2',
    kit: { primary: '#007a3d', accent: '#ce1126', outline: '#00451f', number: '#ffffff' },
    rows: [
      [
        { name: 'Hussein', pos: 'ST' },
        { name: 'Al-Hamadi', pos: 'ST' },
      ],
      [
        { name: 'Bayesh', pos: 'LAM' },
        { name: 'Amyn', backup: 'Ali Jasim', pos: 'RAM' },
      ],
      [
        { name: 'Al-Ammari', pos: 'CM' },
        { name: 'Aimar Sher', pos: 'CM' },
      ],
      [
        { name: 'Doski', pos: 'LB' },
        { name: 'Hashem', pos: 'CB' },
        { name: 'Tahseen', pos: 'CB' },
        { name: 'Hussein Ali', backup: 'Ahmed Basil', pos: 'RB' },
      ],
      [
        { name: 'Hassan', pos: 'GK' },
      ],
    ],
    bench: ['Al Fadhli', 'Bayar Tahir', 'Iqbal', 'Mohanad Ali', 'Salem Al-Ferdaws', 'Mostafa Saadoun', 'Akam Hashim'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  Iran: {
    nation: 'Iran',
    formation: '4-3-2-1',
    kit: { primary: '#ffffff', accent: '#239f40', outline: '#1a1a1a', number: '#da0000' },
    rows: [
      [
        { name: 'Taremi', backup: 'Mohebi', pos: 'ST' },
      ],
      [
        { name: 'Hosseinzadeh', pos: 'LAM' },
        { name: 'Ghayedi', backup: 'Gholizadeh', pos: 'RAM' },
      ],
      [
        { name: 'Jahanbakhsh', pos: 'CM' },
        { name: 'Ghoddos', pos: 'CM' },
      ],
      [
        { name: 'Ezatolahi', pos: 'CDM' },
      ],
      [
        { name: 'Mohammadi', pos: 'LB' },
        { name: 'Kanaani', pos: 'CB' },
        { name: 'Kanaanizadegan', backup: 'Khalilzadeh', pos: 'CB' },
        { name: 'Hardani', backup: 'Rezaeian', pos: 'RB' },
      ],
      [
        { name: 'Beiranvand', pos: 'GK' },
      ],
    ],
    bench: ['Hosseini', 'Pouraliganji', 'Hajsafi', 'Azmoun', 'Karimi', 'Habibinejad', 'Cheshmi'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },

  'New Zealand': {
    nation: 'New Zealand',
    formation: '3-4-2-1',
    kit: { primary: '#ffffff', accent: '#000000', outline: '#1a1a1a', number: '#000000' },
    rows: [
      [
        { name: 'Wood', backup: 'Ben Old', pos: 'ST' },
      ],
      [
        { name: 'Singh', pos: 'LAM' },
        { name: 'Eli Just', pos: 'RAM' },
      ],
      [
        { name: 'Cacace', pos: 'LWB' },
        { name: 'Bell', pos: 'CM' },
        { name: 'Stamenic', pos: 'CM' },
        { name: 'McCowatt', pos: 'RWB' },
      ],
      [
        { name: 'Bindon', pos: 'LCB' },
        { name: 'Boxall', pos: 'CB' },
        { name: 'Payne', pos: 'RCB' },
      ],
      [
        { name: 'Crocombe', pos: 'GK' },
      ],
    ],
    bench: ['Sail', 'Tuiloma', 'Reid', 'Smith', 'Wynne', 'Surman', 'Waine'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
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
        { name: 'Fattouh', pos: 'LM' },
        { name: 'Fathi', pos: 'CM' },
        { name: 'Attia', pos: 'CM' },
        { name: 'Trezeguet', pos: 'RM' },
      ],
      [
        { name: 'Hany', pos: 'LCB' },
        { name: 'Abdelmonem', pos: 'CB' },
        { name: 'Rabia', backup: 'Abdelmaguid', pos: 'RCB' },
      ],
      [
        { name: 'El Shenawy', pos: 'GK' },
      ],
    ],
    bench: ['Gabaski', 'Hegazi', 'Sobhi', 'Mostafa Mohamed', 'Saleh Gomaa', 'Tarek Hamed', 'Soliman'],
    source: 'futbolfantasy.com',
    asOf: '2026-05-26',
  },
};

export function lineupForNation(nation: string): Lineup | null {
  return LINEUPS[nation] ?? null;
}
