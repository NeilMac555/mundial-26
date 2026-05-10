import perfJson from './performance.json';

export interface PerformanceRecord {
  schedRank: number | null;
  team: string;
  confederation: string;
  status: string;
  teamElo: number | null;
  gp: number;
  w: number;
  d: number;
  l: number;
  actualPctTop100: number | null;
  expFromMedian: number | null;
  deltaSchedule: number | null;
  scheduleVerdict: string;
  eloRank: number | null;
  expFromOwnElo: number | null;
  deltaElo: number | null;
  eloVerdict: string;
  smallSample: boolean;
}

export const PERFORMANCE: PerformanceRecord[] = perfJson.rows as PerformanceRecord[];
export const PERFORMANCE_NOTE: string = perfJson.note;
export const PERFORMANCE_AS_OF: string = perfJson.asOf;

const MGR_TO_PERF_ALIAS: Record<string, string> = {
  'Bosnia and Herzegovina': 'Bosnia & Herzegovina',
  'Cabo Verde': 'Cape Verde',
  'Czechia': 'Czech Republic',
  "Côte d'Ivoire": 'Ivory Coast',
};

export function performanceByNation(nation: string): PerformanceRecord | undefined {
  const key = MGR_TO_PERF_ALIAS[nation] ?? nation;
  return PERFORMANCE.find((p) => p.team === key);
}

// Verdict → color tier. 'Massive overperformance' = gold, 'underperformance' = rose, etc.
export function verdictTone(verdict: string): { text: string; chip: string } {
  const v = verdict.toLowerCase();
  if (v.includes('massive over')) return { text: 'text-amber-200', chip: 'bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/40' };
  if (v.includes('clear over') || v.includes('overperform')) return { text: 'text-amber-300', chip: 'bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30' };
  if (v.includes('met expect') || v.includes('on expect')) return { text: 'text-stone-300', chip: 'bg-stone-700/40 text-stone-300 ring-1 ring-stone-600/40' };
  if (v.includes('massive under')) return { text: 'text-rose-300', chip: 'bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/40' };
  if (v.includes('clear under') || v.includes('underperform')) return { text: 'text-orange-300', chip: 'bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/30' };
  return { text: 'text-stone-400', chip: 'bg-stone-700/40 text-stone-400 ring-1 ring-stone-600/40' };
}
