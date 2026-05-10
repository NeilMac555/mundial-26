// Bracket-Simulator-only team data. Uses 3-letter FIFA codes as primary key
// and 2-letter ISO codes for flagcdn — keeps the bracket logic self-contained
// without rewiring the existing nation-name keyed datasets.

export interface BracketTeam {
  name: string;
  code: string;        // FIFA 3-letter code
  flag: string;        // 2-letter ISO code (or gb-eng / gb-sct)
  group: string;       // A-L
  isPlayoff?: boolean; // reserved for play-off TBD slots
}

export const BRACKET_TEAMS: BracketTeam[] = [
  // Group A
  { name: "Mexico", code: "MEX", flag: "mx", group: "A" },
  { name: "South Africa", code: "RSA", flag: "za", group: "A" },
  { name: "South Korea", code: "KOR", flag: "kr", group: "A" },
  { name: "Czechia", code: "CZE", flag: "cz", group: "A" },

  // Group B
  { name: "Canada", code: "CAN", flag: "ca", group: "B" },
  { name: "Bosnia", code: "BIH", flag: "ba", group: "B" },
  { name: "Qatar", code: "QAT", flag: "qa", group: "B" },
  { name: "Switzerland", code: "SUI", flag: "ch", group: "B" },

  // Group C
  { name: "Brazil", code: "BRA", flag: "br", group: "C" },
  { name: "Morocco", code: "MAR", flag: "ma", group: "C" },
  { name: "Haiti", code: "HAI", flag: "ht", group: "C" },
  { name: "Scotland", code: "SCO", flag: "gb-sct", group: "C" },

  // Group D
  { name: "USA", code: "USA", flag: "us", group: "D" },
  { name: "Paraguay", code: "PAR", flag: "py", group: "D" },
  { name: "Australia", code: "AUS", flag: "au", group: "D" },
  { name: "Turkey", code: "TUR", flag: "tr", group: "D" },

  // Group E
  { name: "Germany", code: "GER", flag: "de", group: "E" },
  { name: "Curacao", code: "CUR", flag: "cw", group: "E" },
  { name: "Ivory Coast", code: "CIV", flag: "ci", group: "E" },
  { name: "Ecuador", code: "ECU", flag: "ec", group: "E" },

  // Group F
  { name: "Netherlands", code: "NED", flag: "nl", group: "F" },
  { name: "Japan", code: "JPN", flag: "jp", group: "F" },
  { name: "Sweden", code: "SWE", flag: "se", group: "F" },
  { name: "Tunisia", code: "TUN", flag: "tn", group: "F" },

  // Group G
  { name: "Belgium", code: "BEL", flag: "be", group: "G" },
  { name: "Egypt", code: "EGY", flag: "eg", group: "G" },
  { name: "Iran", code: "IRN", flag: "ir", group: "G" },
  { name: "New Zealand", code: "NZL", flag: "nz", group: "G" },

  // Group H
  { name: "Spain", code: "ESP", flag: "es", group: "H" },
  { name: "Cape Verde", code: "CPV", flag: "cv", group: "H" },
  { name: "Saudi Arabia", code: "KSA", flag: "sa", group: "H" },
  { name: "Uruguay", code: "URU", flag: "uy", group: "H" },

  // Group I
  { name: "France", code: "FRA", flag: "fr", group: "I" },
  { name: "Senegal", code: "SEN", flag: "sn", group: "I" },
  { name: "Iraq", code: "IRQ", flag: "iq", group: "I" },
  { name: "Norway", code: "NOR", flag: "no", group: "I" },

  // Group J
  { name: "Argentina", code: "ARG", flag: "ar", group: "J" },
  { name: "Algeria", code: "ALG", flag: "dz", group: "J" },
  { name: "Austria", code: "AUT", flag: "at", group: "J" },
  { name: "Jordan", code: "JOR", flag: "jo", group: "J" },

  // Group K
  { name: "Portugal", code: "POR", flag: "pt", group: "K" },
  { name: "DR Congo", code: "COD", flag: "cd", group: "K" },
  { name: "Uzbekistan", code: "UZB", flag: "uz", group: "K" },
  { name: "Colombia", code: "COL", flag: "co", group: "K" },

  // Group L
  { name: "England", code: "ENG", flag: "gb-eng", group: "L" },
  { name: "Croatia", code: "CRO", flag: "hr", group: "L" },
  { name: "Ghana", code: "GHA", flag: "gh", group: "L" },
  { name: "Panama", code: "PAN", flag: "pa", group: "L" },
];

export const BRACKET_GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as const;
export type BracketGroupLetter = (typeof BRACKET_GROUPS)[number];

export function bracketTeamsByGroup(group: string): BracketTeam[] {
  return BRACKET_TEAMS.filter((t) => t.group === group);
}

export function bracketTeamByCode(code: string): BracketTeam | undefined {
  return BRACKET_TEAMS.find((t) => t.code === code);
}

/** Build a flagcdn URL for a given 2-letter ISO code. flagcdn supports widths 20/40/80/160. */
export function flagUrl(flag: string, width: 20 | 40 | 80 | 160 = 40): string | null {
  if (!flag || flag === "eu" || flag === "un") return null;
  return `https://flagcdn.com/w${width}/${flag}.png`;
}

// Aliases — when other parts of the codebase use a different canonical nation name
// (typically the managers.json spelling) we still need to find the FIFA code. The
// keys here are the "external" names; the values are the BRACKET_TEAMS.name target.
const NATION_NAME_ALIASES: Record<string, string> = {
  'United States': 'USA',
  'Türkiye': 'Turkey',
  'Cabo Verde': 'Cape Verde',
  "Côte d'Ivoire": 'Ivory Coast',
  'Czech Republic': 'Czechia',
  'Bosnia and Herzegovina': 'Bosnia',
  'Bosnia & Herzegovina': 'Bosnia',
};

/**
 * Resolve any qualifier nation name (in any of the spellings used across the
 * datasets) to its FIFA 3-letter code. Returns null for non-qualifiers / unknown.
 */
export function fifaCodeForNation(nation: string): string | null {
  const normalized = NATION_NAME_ALIASES[nation] ?? nation;
  const team = BRACKET_TEAMS.find((t) => t.name === normalized);
  return team?.code ?? null;
}
