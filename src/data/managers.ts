import managersJson from './managers.json';

export type Tier = 'ELITE' | 'STRONG' | 'SOLID' | 'BELOW_PAR';
export type Confederation = 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC';

export interface ManagerRecord {
  nation: string;
  confederation: Confederation;
  group: string;
  manager: string;
  matches: number;
  ppm: number | null;
  tier: Tier;
  small_sample: boolean;
  manager_appointed: string;
  notes: string;
}

export const MANAGERS: ManagerRecord[] = (managersJson.teams as ManagerRecord[]).slice().sort((a, b) =>
  a.nation.localeCompare(b.nation),
);

// Map an Elo-data team name to the nation key used in MANAGERS, where the spellings differ.
const ELO_TO_MANAGER_ALIAS: Record<string, string> = {
  Turkey: 'Türkiye',
  'Ivory Coast': "Côte d'Ivoire",
  'Cape Verde': 'Cabo Verde',
};

// Reverse lookup — manager nation name → Elo team name (for cross-referencing the Elo dataset).
const MANAGER_TO_ELO_ALIAS: Record<string, string> = Object.fromEntries(
  Object.entries(ELO_TO_MANAGER_ALIAS).map(([elo, mgr]) => [mgr, elo]),
);

export function eloNameForNation(nation: string): string {
  return MANAGER_TO_ELO_ALIAS[nation] ?? nation;
}

export function managerByNation(nation: string): ManagerRecord | undefined {
  return MANAGERS.find((m) => m.nation === nation);
}

export function managerByEloName(eloName: string): ManagerRecord | undefined {
  const candidate = ELO_TO_MANAGER_ALIAS[eloName] ?? eloName;
  return managerByNation(candidate);
}

// Tier visual config — the trophy gold scale, rose for failure.
export const TIER_DISPLAY: Record<Tier, { label: string; chip: string; text: string }> = {
  ELITE: {
    label: 'Elite',
    chip: 'bg-amber-400/20 text-amber-200 ring-1 ring-amber-400/50',
    text: 'text-amber-200',
  },
  STRONG: {
    label: 'Strong',
    chip: 'bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30',
    text: 'text-amber-300',
  },
  SOLID: {
    label: 'Solid',
    chip: 'bg-stone-700/40 text-stone-300 ring-1 ring-stone-600/40',
    text: 'text-stone-300',
  },
  BELOW_PAR: {
    label: 'Below par',
    chip: 'bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/30',
    text: 'text-rose-300',
  },
};

export function formatTenure(appointed: string): string {
  // Input is "YYYY-MM". Compute years to today.
  const [y, m] = appointed.split('-').map(Number);
  if (!y || !m) return appointed;
  const start = new Date(y, m - 1, 1);
  const now = new Date();
  const years = (now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  if (years < 1) return `${Math.round(years * 12)}m in post`;
  return `${years.toFixed(1)}y in post`;
}

export const MANAGER_SOURCE = {
  asOf: managersJson.last_updated,
  url: 'https://www.transfermarkt.co.uk/',
};
