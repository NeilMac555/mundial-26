// Total squad market value per WC 2026 qualifier, in millions of euros.
// Source: Transfermarkt national-team market value rankings, captured 2026-05-02.
// globalRank is the team's position on Transfermarkt's all-nations leaderboard.
export interface SquadValue {
  nation: string;
  totalM: number;       // €m, total squad market value
  globalRank: number | null; // null for nations ranked outside top 100
}

export const SQUAD_VALUES: SquadValue[] = [
  { nation: 'England',                totalM: 1620.00, globalRank: 1 },
  { nation: 'France',                 totalM: 1360.00, globalRank: 2 },
  { nation: 'Spain',                  totalM: 1310.00, globalRank: 3 },
  { nation: 'Portugal',               totalM:  864.50, globalRank: 4 },
  { nation: 'Brazil',                 totalM:  778.50, globalRank: 6 },
  { nation: 'Germany',                totalM:  773.50, globalRank: 7 },
  { nation: 'Netherlands',            totalM:  766.00, globalRank: 8 },
  { nation: 'Argentina',              totalM:  761.20, globalRank: 9 },
  { nation: 'Belgium',                totalM:  534.20, globalRank: 10 },
  { nation: 'Norway',                 totalM:  504.00, globalRank: 11 },
  { nation: 'Senegal',                totalM:  474.00, globalRank: 12 },
  { nation: 'Morocco',                totalM:  456.00, globalRank: 13 },
  { nation: 'Türkiye',                totalM:  440.20, globalRank: 14 },
  { nation: "Côte d'Ivoire",          totalM:  425.90, globalRank: 15 },
  { nation: 'Ecuador',                totalM:  366.73, globalRank: 17 },
  { nation: 'Sweden',                 totalM:  363.98, globalRank: 18 },
  { nation: 'Uruguay',                totalM:  362.45, globalRank: 19 },
  { nation: 'United States',          totalM:  356.70, globalRank: 20 },
  { nation: 'Switzerland',            totalM:  322.10, globalRank: 21 },
  { nation: 'Colombia',               totalM:  300.50, globalRank: 22 },
  { nation: 'Croatia',                totalM:  283.30, globalRank: 25 },
  { nation: 'Japan',                  totalM:  264.20, globalRank: 26 },
  { nation: 'Austria',                totalM:  263.40, globalRank: 27 },
  { nation: 'Algeria',                totalM:  227.75, globalRank: 29 },
  { nation: 'Ghana',                  totalM:  199.28, globalRank: 34 },
  { nation: 'Scotland',               totalM:  198.15, globalRank: 35 },
  { nation: 'Czechia',                totalM:  176.80, globalRank: 40 },
  { nation: 'DR Congo',               totalM:  153.40, globalRank: 41 },
  { nation: 'South Korea',            totalM:  136.75, globalRank: 43 },
  { nation: 'Paraguay',               totalM:  134.70, globalRank: 44 },
  { nation: 'Canada',                 totalM:  129.38, globalRank: 46 },
  { nation: 'Bosnia and Herzegovina', totalM:  127.10, globalRank: 47 },
  { nation: 'Egypt',                  totalM:  108.00, globalRank: 50 },
  { nation: 'Mexico',                 totalM:   79.80, globalRank: 55 },
  { nation: 'Uzbekistan',             totalM:   63.75, globalRank: 60 },
  { nation: 'Haiti',                  totalM:   55.35, globalRank: 63 },
  { nation: 'Tunisia',                totalM:   52.30, globalRank: 66 },
  { nation: 'Australia',              totalM:   51.23, globalRank: 67 },
  { nation: 'Cabo Verde',             totalM:   44.85, globalRank: 68 },
  { nation: 'South Africa',           totalM:   41.15, globalRank: 71 },
  { nation: 'Panama',                 totalM:   32.40, globalRank: 78 },
  { nation: 'Curaçao',                totalM:   28.73, globalRank: 85 },
  { nation: 'Saudi Arabia',           totalM:   27.63, globalRank: 86 },
  { nation: 'Iran',                   totalM:   23.08, globalRank: 88 },
  { nation: 'New Zealand',            totalM:   22.20, globalRank: 89 },
  { nation: 'Iraq',                   totalM:   19.18, globalRank: 90 },
  { nation: 'Qatar',                  totalM:   18.30, globalRank: 95 },
  { nation: 'Jordan',                 totalM:   16.00, globalRank: null },
];

export function squadValueByNation(nation: string): SquadValue | undefined {
  return SQUAD_VALUES.find((s) => s.nation === nation);
}

export function formatSquadValue(totalM: number): string {
  if (totalM >= 1000) return `€${(totalM / 1000).toFixed(2)}bn`;
  return `€${totalM.toFixed(2)}m`;
}

export const SQUAD_VALUE_SOURCE = {
  asOf: '2026-05-02',
  url: 'https://www.transfermarkt.com/wettbewerbe/fifa',
};
