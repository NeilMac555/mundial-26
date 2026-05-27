import { BASE_CAMPS, haversineKm } from '../src/data/baseCamps';
import { GROUPS, GROUP_KEYS, MATCHES } from '../src/data/fixtures';
import { VENUES } from '../src/data/venues';

const all = GROUP_KEYS.flatMap((k) => GROUPS[k]);
const camps = new Set(BASE_CAMPS.map((b) => b.nation));
const missing = all.filter((n) => !camps.has(n));
const extra = [...camps].filter((n) => !all.includes(n));

console.log('Total teams in groups:', all.length);
console.log('Total base camps:     ', BASE_CAMPS.length);
console.log('Teams missing a camp: ', missing);
console.log('Camps with no group:  ', extra);

// Verify stadium → venue mapping coverage
const venueStadiums = new Set(VENUES.map((v) => v.stadium));
const fixtureStadiums = new Set(MATCHES.map((m) => m.stadium));
const stadiumMisses = [...fixtureStadiums].filter((s) => !venueStadiums.has(s));
console.log('Fixture stadiums missing in VENUES:', stadiumMisses);

// Compute top-5 most-traveled and bottom-5 lowest-traveled (group stage only).
// Match-to-match travel only — pre-tournament arrival flight (base → MD1) excluded.
function travel(nation: string): { km: number; legs: number } {
  const fixtures = MATCHES.filter((m) => m.stage === 'GROUP' && (m.home === nation || m.away === nation))
    .sort((a, b) => a.iso.localeCompare(b.iso));
  let km = 0;
  let legs = 0;
  for (let i = 1; i < fixtures.length; i++) {
    const a = VENUES.find((x) => x.stadium === fixtures[i - 1].stadium);
    const b = VENUES.find((x) => x.stadium === fixtures[i].stadium);
    if (!a || !b) continue;
    km += haversineKm({ lat: a.lat, lng: a.lng }, { lat: b.lat, lng: b.lng });
    legs++;
  }
  return { km, legs };
}

const travelTable = all.map((n) => ({ nation: n, ...travel(n) }));
travelTable.sort((a, b) => b.km - a.km);

console.log('\nTop 5 most-traveled:');
travelTable.slice(0, 5).forEach((r) =>
  console.log(`  ${r.nation.padEnd(28)} ${Math.round(r.km).toLocaleString().padStart(6)} km  (${r.legs} legs)`),
);
console.log('\nBottom 5 lowest-traveled:');
travelTable.slice(-5).forEach((r) =>
  console.log(`  ${r.nation.padEnd(28)} ${Math.round(r.km).toLocaleString().padStart(6)} km  (${r.legs} legs)`),
);
