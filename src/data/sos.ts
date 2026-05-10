import sosJson from './sos.json';

export interface SosRecord {
  team: string;
  confederation: string;
  sosRank: number | null;
  gamesPlayed: number | null;
  teamElo: number | null;
  avgOppElo: number | null;
  sosScore: number | null;
  difficulty: string;
}

export const SOS: SosRecord[] = sosJson.rows as SosRecord[];
export const SOS_AS_OF: string = sosJson.asOf;

// Map manager-data nation names → the spelling used in the SOS sheet
const MGR_TO_SOS_ALIAS: Record<string, string> = {
  'Bosnia and Herzegovina': 'Bosnia & Herzegovina',
  'Cabo Verde': 'Cape Verde',
  'Czechia': 'Czech Republic',
  "Côte d'Ivoire": 'Ivory Coast',
};

export function sosByNation(nation: string): SosRecord | undefined {
  const key = MGR_TO_SOS_ALIAS[nation] ?? nation;
  return SOS.find((s) => s.team === key);
}

// Difficulty → color tier for visual treatment
export function difficultyTone(difficulty: string): {
  text: string;
  bg: string;
  ring: string;
} {
  const d = difficulty.toLowerCase();
  if (d.includes('extremely')) return { text: 'text-rose-300', bg: 'bg-rose-500/10', ring: 'ring-rose-500/40' };
  if (d.includes('very')) return { text: 'text-orange-300', bg: 'bg-orange-500/10', ring: 'ring-orange-500/40' };
  if (d.startsWith('difficult')) return { text: 'text-amber-300', bg: 'bg-amber-500/10', ring: 'ring-amber-500/40' };
  if (d.includes('above')) return { text: 'text-amber-200', bg: 'bg-amber-500/[0.05]', ring: 'ring-amber-500/20' };
  if (d.includes('host')) return { text: 'text-stone-500', bg: 'bg-stone-700/30', ring: 'ring-stone-700/40' };
  return { text: 'text-stone-300', bg: 'bg-stone-700/40', ring: 'ring-stone-600/40' };
}
