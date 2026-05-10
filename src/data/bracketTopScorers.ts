// Top-scorer / Golden Boot candidate list for the Bracket Simulator's Top Scorer
// step. Players are tiered visually by their fractional odds.

export interface TopScorerCandidate {
  name: string;
  country: string;
  countryCode: string;  // FIFA 3-letter
  flag: string;         // ISO 2-letter (or gb-eng / gb-sct)
  odds: string;         // fractional, e.g. "6/1"
}

export const TOP_SCORERS: TopScorerCandidate[] = [
  // 6/1
  { name: "Kylian Mbappe",   country: "France",    countryCode: "FRA", flag: "fr",     odds: "6/1" },
  // 7/1
  { name: "Harry Kane",      country: "England",   countryCode: "ENG", flag: "gb-eng", odds: "7/1" },
  // 12/1
  { name: "Lionel Messi",    country: "Argentina", countryCode: "ARG", flag: "ar",     odds: "12/1" },
  // 14/1
  { name: "Erling Haaland",  country: "Norway",    countryCode: "NOR", flag: "no",     odds: "14/1" },
  { name: "Lamine Yamal",    country: "Spain",     countryCode: "ESP", flag: "es",     odds: "14/1" },
  // 20/1
  { name: "Cristiano Ronaldo", country: "Portugal", countryCode: "POR", flag: "pt",   odds: "20/1" },
  { name: "Nick Woltemade",  country: "Germany",   countryCode: "GER", flag: "de",     odds: "20/1" },
  { name: "Ousmane Dembele", country: "France",    countryCode: "FRA", flag: "fr",     odds: "20/1" },
  // 25/1
  { name: "Lautaro Martinez", country: "Argentina", countryCode: "ARG", flag: "ar",   odds: "25/1" },
  { name: "Vinicius Jr.",    country: "Brazil",    countryCode: "BRA", flag: "br",     odds: "25/1" },
  // 33/1
  { name: "Bukayo Saka",     country: "England",   countryCode: "ENG", flag: "gb-eng", odds: "33/1" },
  { name: "Estevao",         country: "Brazil",    countryCode: "BRA", flag: "br",     odds: "33/1" },
  { name: "Joao Pedro",      country: "Brazil",    countryCode: "BRA", flag: "br",     odds: "33/1" },
  { name: "Mikel Merino",    country: "Spain",     countryCode: "ESP", flag: "es",     odds: "33/1" },
  { name: "Mikel Oyarzabal", country: "Spain",     countryCode: "ESP", flag: "es",     odds: "33/1" },
  { name: "Raphinha",        country: "Brazil",    countryCode: "BRA", flag: "br",     odds: "33/1" },
  { name: "Richarlison",     country: "Brazil",    countryCode: "BRA", flag: "br",     odds: "33/1" },
  { name: "Romelu Lukaku",   country: "Belgium",   countryCode: "BEL", flag: "be",     odds: "33/1" },
  { name: "Luis Suarez",     country: "Colombia",  countryCode: "COL", flag: "co",     odds: "33/1" },
  // 40/1
  { name: "Bruno Fernandes", country: "Portugal",  countryCode: "POR", flag: "pt",     odds: "40/1" },
  { name: "Cody Gakpo",      country: "Netherlands", countryCode: "NED", flag: "nl",   odds: "40/1" },
  { name: "Cole Palmer",     country: "England",   countryCode: "ENG", flag: "gb-eng", odds: "40/1" },
  { name: "Florian Wirtz",   country: "Germany",   countryCode: "GER", flag: "de",     odds: "40/1" },
  { name: "Jude Bellingham", country: "England",   countryCode: "ENG", flag: "gb-eng", odds: "40/1" },
  { name: "Julian Alvarez",  country: "Argentina", countryCode: "ARG", flag: "ar",     odds: "40/1" },
  { name: "Michael Olise",   country: "France",    countryCode: "FRA", flag: "fr",     odds: "40/1" },
  { name: "Neymar Jr",       country: "Brazil",    countryCode: "BRA", flag: "br",     odds: "40/1" },
  { name: "Phil Foden",      country: "England",   countryCode: "ENG", flag: "gb-eng", odds: "40/1" },
  // 50/1
  { name: "Dani Olmo",       country: "Spain",     countryCode: "ESP", flag: "es",     odds: "50/1" },
  { name: "Desire Doue",     country: "France",    countryCode: "FRA", flag: "fr",     odds: "50/1" },
  { name: "Ferran Torres",   country: "Spain",     countryCode: "ESP", flag: "es",     odds: "50/1" },
  { name: "Goncalo Ramos",   country: "Portugal",  countryCode: "POR", flag: "pt",     odds: "50/1" },
  { name: "Hugo Ekitike",    country: "France",    countryCode: "FRA", flag: "fr",     odds: "50/1" },
  { name: "Jamal Musiala",   country: "Germany",   countryCode: "GER", flag: "de",     odds: "50/1" },
  { name: "Jean-Philippe Mateta", country: "France", countryCode: "FRA", flag: "fr",  odds: "50/1" },
  { name: "Leandro Trossard", country: "Belgium",  countryCode: "BEL", flag: "be",     odds: "50/1" },
  { name: "Luis Diaz",       country: "Colombia",  countryCode: "COL", flag: "co",     odds: "50/1" },
  { name: "Marcus Rashford", country: "England",   countryCode: "ENG", flag: "gb-eng", odds: "50/1" },
  { name: "Memphis Depay",   country: "Netherlands", countryCode: "NED", flag: "nl",   odds: "50/1" },
  { name: "Mohamed Salah",   country: "Egypt",     countryCode: "EGY", flag: "eg",     odds: "50/1" },
  { name: "Morgan Rogers",   country: "England",   countryCode: "ENG", flag: "gb-eng", odds: "50/1" },
  { name: "Nico Williams",   country: "Spain",     countryCode: "ESP", flag: "es",     odds: "50/1" },
  { name: "Serge Gnabry",    country: "Germany",   countryCode: "GER", flag: "de",     odds: "50/1" },
  // 66/1
  { name: "Darwin Nunez",    country: "Uruguay",   countryCode: "URU", flag: "uy",     odds: "66/1" },
  { name: "Donyell Malen",   country: "Netherlands", countryCode: "NED", flag: "nl",   odds: "66/1" },
  { name: "Eberechi Eze",    country: "England",   countryCode: "ENG", flag: "gb-eng", odds: "66/1" },
  { name: "Jeremy Doku",     country: "Belgium",   countryCode: "BEL", flag: "be",     odds: "66/1" },
  { name: "Kevin De Bruyne", country: "Belgium",   countryCode: "BEL", flag: "be",     odds: "66/1" },
  { name: "Leroy Sane",      country: "Germany",   countryCode: "GER", flag: "de",     odds: "66/1" },
  { name: "Lois Openda",     country: "Belgium",   countryCode: "BEL", flag: "be",     odds: "66/1" },
  { name: "Mateo Retegui",   country: "Italy",     countryCode: "ITA", flag: "it",     odds: "66/1" },
  { name: "Pedro Neto",      country: "Portugal",  countryCode: "POR", flag: "pt",     odds: "66/1" },
  { name: "Robert Lewandowski", country: "Poland", countryCode: "POL", flag: "pl",     odds: "66/1" },
  // 80/1
  { name: "Alexander Sorloth", country: "Norway",  countryCode: "NOR", flag: "no",     odds: "80/1" },
  { name: "Anthony Gordon",  country: "England",   countryCode: "ENG", flag: "gb-eng", odds: "80/1" },
  { name: "Bradley Barcola", country: "France",    countryCode: "FRA", flag: "fr",     odds: "80/1" },
  { name: "Christian Pulisic", country: "USA",     countryCode: "USA", flag: "us",     odds: "80/1" },
  { name: "Kingsley Coman",  country: "France",    countryCode: "FRA", flag: "fr",     odds: "80/1" },
  { name: "Rafael Leao",     country: "Portugal",  countryCode: "POR", flag: "pt",     odds: "80/1" },
  { name: "Randal Muani",    country: "France",    countryCode: "FRA", flag: "fr",     odds: "80/1" },
  { name: "Sadio Mane",      country: "Senegal",   countryCode: "SEN", flag: "sn",     odds: "80/1" },
  // 100/1
  { name: "Armando Gonzalez", country: "Mexico",   countryCode: "MEX", flag: "mx",     odds: "100/1" },
  { name: "Folarin Balogun", country: "USA",       countryCode: "USA", flag: "us",     odds: "100/1" },
  { name: "Francesco Esposito", country: "Italy",  countryCode: "ITA", flag: "it",     odds: "100/1" },
  { name: "Gabriel Martinelli", country: "Brazil", countryCode: "BRA", flag: "br",     odds: "100/1" },
  { name: "Giacomo Raspadori", country: "Italy",   countryCode: "ITA", flag: "it",     odds: "100/1" },
  { name: "Haji Wright",     country: "USA",       countryCode: "USA", flag: "us",     odds: "100/1" },
  { name: "James Rodriguez", country: "Colombia",  countryCode: "COL", flag: "co",     odds: "100/1" },
  { name: "Jhon Duran",      country: "Colombia",  countryCode: "COL", flag: "co",     odds: "100/1" },
  { name: "Jonathan David",  country: "Canada",    countryCode: "CAN", flag: "ca",     odds: "100/1" },
  { name: "Lennart Karl",    country: "Germany",   countryCode: "GER", flag: "de",     odds: "100/1" },
  { name: "Matheus Cunha",   country: "Brazil",    countryCode: "BRA", flag: "br",     odds: "100/1" },
  { name: "Nicolas Jackson", country: "Senegal",   countryCode: "SEN", flag: "sn",     odds: "100/1" },
  { name: "Noa Lang",        country: "Netherlands", countryCode: "NED", flag: "nl",   odds: "100/1" },
  { name: "Omar Marmoush",   country: "Egypt",     countryCode: "EGY", flag: "eg",     odds: "100/1" },
  { name: "Pedri",           country: "Spain",     countryCode: "ESP", flag: "es",     odds: "100/1" },
  { name: "Promise David",   country: "Canada",    countryCode: "CAN", flag: "ca",     odds: "100/1" },
  { name: "Rasmus Hojlund",  country: "Denmark",   countryCode: "DEN", flag: "dk",     odds: "100/1" },
  { name: "Raul Jimenez",    country: "Mexico",    countryCode: "MEX", flag: "mx",     odds: "100/1" },
  { name: "Ricardo Pepi",    country: "USA",       countryCode: "USA", flag: "us",     odds: "100/1" },
  { name: "Xavi Simons",     country: "Netherlands", countryCode: "NED", flag: "nl",   odds: "100/1" },
  // 125/1
  { name: "Arda Guler",      country: "Türkiye",   countryCode: "TUR", flag: "tr",     odds: "125/1" },
  { name: "Ayase Ueda",      country: "Japan",     countryCode: "JPN", flag: "jp",     odds: "125/1" },
  { name: "Breel Embolo",    country: "Switzerland", countryCode: "SUI", flag: "ch",   odds: "125/1" },
  { name: "Heung-Min Son",   country: "South Korea", countryCode: "KOR", flag: "kr",   odds: "125/1" },
  { name: "Kenan Yildiz",    country: "Türkiye",   countryCode: "TUR", flag: "tr",     odds: "125/1" },
  // 150/1
  { name: "Alphonso Davies", country: "Canada",    countryCode: "CAN", flag: "ca",     odds: "150/1" },
  { name: "Andrej Kramaric", country: "Croatia",   countryCode: "CRO", flag: "hr",     odds: "150/1" },
  { name: "Antonio Nusa",    country: "Norway",    countryCode: "NOR", flag: "no",     odds: "150/1" },
  { name: "Ayoub El Kaabi",  country: "Morocco",   countryCode: "MAR", flag: "ma",     odds: "150/1" },
  { name: "Brian Rodriguez", country: "Uruguay",   countryCode: "URU", flag: "uy",     odds: "150/1" },
  { name: "Cyle Larin",      country: "Canada",    countryCode: "CAN", flag: "ca",     odds: "150/1" },
  { name: "Daizen Maeda",    country: "Japan",     countryCode: "JPN", flag: "jp",     odds: "150/1" },
  { name: "Denzel Dumfries", country: "Netherlands", countryCode: "NED", flag: "nl",   odds: "150/1" },
  { name: "Enzo Fernandez",  country: "Argentina", countryCode: "ARG", flag: "ar",     odds: "150/1" },
  { name: "Granit Xhaka",    country: "Switzerland", countryCode: "SUI", flag: "ch",   odds: "150/1" },
  { name: "Hamza Igamane",   country: "Morocco",   countryCode: "MAR", flag: "ma",     odds: "150/1" },
  { name: "Hirving Lozano",  country: "Mexico",    countryCode: "MEX", flag: "mx",     odds: "150/1" },
  { name: "Jhon Arias",      country: "Colombia",  countryCode: "COL", flag: "co",     odds: "150/1" },
  { name: "Jorgen Larsen",   country: "Norway",    countryCode: "NOR", flag: "no",     odds: "150/1" },
  { name: "Kang-In Lee",     country: "South Korea", countryCode: "KOR", flag: "kr",   odds: "150/1" },
  { name: "Marko Arnautovic", country: "Austria",  countryCode: "AUT", flag: "at",     odds: "150/1" },
  { name: "Mehdi Taremi",    country: "Iran",      countryCode: "IRN", flag: "ir",     odds: "150/1" },
  { name: "Orbelin Pineda",  country: "Mexico",    countryCode: "MEX", flag: "mx",     odds: "150/1" },
  { name: "Oscar Bobb",      country: "Norway",    countryCode: "NOR", flag: "no",     odds: "150/1" },
  { name: "Riyad Mahrez",    country: "Algeria",   countryCode: "ALG", flag: "dz",     odds: "150/1" },
  { name: "Scott McTominay", country: "Scotland",  countryCode: "SCO", flag: "gb-sct", odds: "150/1" },
  { name: "Youssef En Nesyri", country: "Morocco", countryCode: "MAR", flag: "ma",     odds: "150/1" },
  { name: "Brahim Diaz",     country: "Morocco",   countryCode: "MAR", flag: "ma",     odds: "150/1" },
  // 200/1
  { name: "Chris Wood",      country: "New Zealand", countryCode: "NZL", flag: "nz",   odds: "200/1" },
  { name: "Facundo Pellistri", country: "Uruguay", countryCode: "URU", flag: "uy",     odds: "200/1" },
  { name: "Giovanni Reyna",  country: "USA",       countryCode: "USA", flag: "us",     odds: "200/1" },
  { name: "Hee-Chan Hwang",  country: "South Korea", countryCode: "KOR", flag: "kr",   odds: "200/1" },
  { name: "Ismaila Sarr",    country: "Senegal",   countryCode: "SEN", flag: "sn",     odds: "200/1" },
  { name: "Martin Odegaard", country: "Norway",    countryCode: "NOR", flag: "no",     odds: "200/1" },
  { name: "Nikola Vlasic",   country: "Croatia",   countryCode: "CRO", flag: "hr",     odds: "200/1" },
  { name: "Takumi Minamino", country: "Japan",     countryCode: "JPN", flag: "jp",     odds: "200/1" },
  // 250/1
  { name: "Achraf Hakimi",   country: "Morocco",   countryCode: "MAR", flag: "ma",     odds: "250/1" },
  { name: "Che Adams",       country: "Scotland",  countryCode: "SCO", flag: "gb-sct", odds: "250/1" },
  { name: "Declan Rice",     country: "England",   countryCode: "ENG", flag: "gb-eng", odds: "250/1" },
  { name: "Saleh Al Shehri", country: "Saudi Arabia", countryCode: "KSA", flag: "sa", odds: "250/1" },
  { name: "Salem Al Dawsari", country: "Saudi Arabia", countryCode: "KSA", flag: "sa", odds: "250/1" },
  // 350/1
  { name: "Daichi Kamada",   country: "Japan",     countryCode: "JPN", flag: "jp",     odds: "350/1" },
  { name: "Julio Enciso",    country: "Paraguay",  countryCode: "PAR", flag: "py",     odds: "350/1" },
  { name: "Lyndon Dykes",    country: "Scotland",  countryCode: "SCO", flag: "gb-sct", odds: "350/1" },
  { name: "Ryan Christie",   country: "Scotland",  countryCode: "SCO", flag: "gb-sct", odds: "350/1" },
  // 500/1
  { name: "Brenden Aaronson", country: "USA",      countryCode: "USA", flag: "us",     odds: "500/1" },
  { name: "Eldor Shomurodov", country: "Uzbekistan", countryCode: "UZB", flag: "uz",   odds: "500/1" },
  { name: "John McGinn",     country: "Scotland",  countryCode: "SCO", flag: "gb-sct", odds: "500/1" },
  { name: "Lyle Foster",     country: "South Africa", countryCode: "RSA", flag: "za",  odds: "500/1" },
  { name: "Martin Boyle",    country: "Australia", countryCode: "AUS", flag: "au",     odds: "500/1" },
  { name: "Nestory Irankunda", country: "Australia", countryCode: "AUS", flag: "au",   odds: "500/1" },
  // 1000/1
  { name: "Ben Waine",       country: "New Zealand", countryCode: "NZL", flag: "nz",   odds: "1000/1" },
];

/** Tier breakpoints (decimal odds) — used to group the picker visually. */
export const TOP_SCORER_TIERS: Array<{ label: string; maxDecimal: number }> = [
  { label: "Favourites",  maxDecimal: 15 },
  { label: "Contenders",  maxDecimal: 35 },
  { label: "In the mix",  maxDecimal: 55 },
  { label: "Outsiders",   maxDecimal: 110 },
  { label: "Long shots",  maxDecimal: 300 },
  { label: "Dark horses", maxDecimal: Infinity },
];

function decimalOdds(odds: string): number {
  if (odds === "Evens") return 2;
  const [a, b] = odds.split("/").map((s) => parseInt(s, 10));
  return a / b + 1;
}

export function topScorersByTier(): Array<{ label: string; players: TopScorerCandidate[] }> {
  return TOP_SCORER_TIERS.map((tier, i) => {
    const min = i === 0 ? 0 : TOP_SCORER_TIERS[i - 1].maxDecimal;
    return {
      label: tier.label,
      players: TOP_SCORERS.filter((p) => {
        const d = decimalOdds(p.odds);
        return d > min && d <= tier.maxDecimal;
      }),
    };
  }).filter((tier) => tier.players.length > 0);
}
