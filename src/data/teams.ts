// Stub team list — populate with the official 48 qualifiers as the field locks.
// Group letters are placeholders until the draw is wired in (data/groups.ts).
export interface Team {
  code: string;        // 3-letter FIFA code, e.g. 'BRA'
  name: string;
  confederation: 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC';
  group?: string;      // 'A'..'L' once draw is wired
}

export const TEAMS: Team[] = [
  // TODO: replace with the full 48-team field. Sample seeds below.
  { code: 'USA', name: 'United States',     confederation: 'CONCACAF' },
  { code: 'MEX', name: 'Mexico',            confederation: 'CONCACAF' },
  { code: 'CAN', name: 'Canada',            confederation: 'CONCACAF' },
  { code: 'BRA', name: 'Brazil',            confederation: 'CONMEBOL' },
  { code: 'ARG', name: 'Argentina',         confederation: 'CONMEBOL' },
  { code: 'FRA', name: 'France',            confederation: 'UEFA' },
  { code: 'ENG', name: 'England',           confederation: 'UEFA' },
  { code: 'ESP', name: 'Spain',             confederation: 'UEFA' },
  { code: 'GER', name: 'Germany',           confederation: 'UEFA' },
  { code: 'POR', name: 'Portugal',          confederation: 'UEFA' },
];
