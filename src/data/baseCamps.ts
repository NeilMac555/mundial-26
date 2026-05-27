// Team base camps — where each of the 48 qualifiers is housed + trains
// during the tournament group stage. Source: Wikipedia "2026 FIFA World Cup"
// (https://en.wikipedia.org/wiki/2026_FIFA_World_Cup), section "Team base camps".
// Captured 2026-05-27.
//
// Each entry is the team's residential city / region. Lat/lng is the city centre
// (or specific hotel where it's notable) used as the start-point for travel-distance
// calculations.
//
// Team-key convention: matches the canonical names used everywhere else
// (Cabo Verde, Czechia, Türkiye, Côte d'Ivoire) — fixtures.canonicalNation() will
// route incoming wiki names to the same keys.

export interface BaseCamp {
  /** Canonical nation key — matches GROUPS, lineups, manager lookup. */
  nation: string;
  /** Short city label shown in tables. */
  city: string;
  /** Region/state/country qualifier for the city. */
  region: string;
  /** Hotel / accommodation name. */
  hotel: string;
  /** Training facility name. */
  training: string;
  lat: number;
  lng: number;
}

export const BASE_CAMPS: BaseCamp[] = [
  { nation: 'Algeria',                city: 'Lawrence',                  region: 'Kansas',                hotel: 'The Oread Lawrence',                                                  training: 'University of Kansas',                                  lat: 38.9717, lng:  -95.2353 },
  { nation: 'Argentina',              city: 'Kansas City',               region: 'Missouri',              hotel: 'Origin Kansas City Riverfront',                                       training: 'Sporting KC Training Center (KCK)',                     lat: 39.1142, lng:  -94.6275 },
  { nation: 'Australia',              city: 'Berkeley',                  region: 'California',            hotel: 'Claremont Hotel & Spa',                                               training: 'Oakland Roots/Soul Training Facility, Alameda',         lat: 37.8568, lng: -122.2461 },
  { nation: 'Austria',                city: 'Goleta',                    region: 'California',            hotel: 'Bacara Resort',                                                       training: 'UCSB Harder Stadium, Santa Barbara',                    lat: 34.4358, lng: -119.8276 },
  { nation: 'Belgium',                city: 'Renton',                    region: 'Washington',            hotel: 'Hyatt Regency Lake Washington (Southport)',                           training: 'Seattle Sounders FC Performance Center',                lat: 47.4829, lng: -122.2171 },
  { nation: 'Bosnia and Herzegovina', city: 'Salt Lake City',            region: 'Utah',                  hotel: 'Asher Adams, Autograph Collection',                                   training: 'Real Salt Lake Stadium, Sandy',                         lat: 40.7608, lng: -111.8910 },
  { nation: 'Brazil',                 city: 'Basking Ridge',             region: 'New Jersey',            hotel: 'The Ridge',                                                           training: 'Columbia Park, Morristown',                             lat: 40.7080, lng:  -74.5532 },
  { nation: 'Cabo Verde',             city: 'Tampa',                     region: 'Florida',               hotel: 'Grand Hyatt Tampa Bay',                                               training: 'Waters Sportsplex',                                     lat: 27.9506, lng:  -82.4572 },
  { nation: 'Canada',                 city: 'Vancouver',                 region: 'British Columbia',      hotel: 'The Westin Bayshore',                                                 training: 'National Soccer Development Centre',                    lat: 49.2827, lng: -123.1207 },
  { nation: 'Colombia',               city: 'Guadalajara',               region: 'Jalisco',               hotel: 'Grand Fiesta Americana Country Club',                                 training: 'Academia Atlas FC, Zapopan',                            lat: 20.6597, lng: -103.3496 },
  { nation: 'Croatia',                city: 'Alexandria',                region: 'Virginia',              hotel: 'Hotel AKA Alexandria',                                                training: 'Episcopal High School',                                 lat: 38.8048, lng:  -77.0469 },
  { nation: "Côte d'Ivoire",          city: 'Wilmington',                region: 'Delaware',              hotel: 'Hotel Du Pont',                                                       training: 'Philadelphia Union Stadium, Chester PA',                lat: 39.7392, lng:  -75.5398 },
  { nation: 'Curaçao',                city: 'Boca Raton',                region: 'Florida',               hotel: 'Boca Raton Marriott at Boca Center',                                  training: 'Florida Atlantic University',                           lat: 26.3683, lng:  -80.1289 },
  { nation: 'Czechia',                city: 'Arlington',                 region: 'Texas',                 hotel: 'Hilton Garden Inn Dallas-Arlington South',                            training: 'Mansfield Multipurpose Stadium',                        lat: 32.7357, lng:  -97.1081 },
  { nation: 'DR Congo',               city: 'Houston',                   region: 'Texas',                 hotel: 'Omni Houston Hotel',                                                  training: 'Houston Sports Park',                                   lat: 29.7604, lng:  -95.3698 },
  { nation: 'Ecuador',                city: 'Columbus',                  region: 'Ohio',                  hotel: 'Le Méridien Columbus, The Joseph',                                    training: 'Columbus Crew Performance Center',                      lat: 39.9612, lng:  -82.9988 },
  { nation: 'Egypt',                  city: 'Spokane',                   region: 'Washington',            hotel: 'Northern Quest Resort & Casino (Airway Heights)',                     training: 'Gonzaga University',                                    lat: 47.6588, lng: -117.4260 },
  { nation: 'England',                city: 'Prairie Village',           region: 'Kansas',                hotel: 'The Inn at Meadowbrook',                                              training: 'Swope Soccer Village, Kansas City MO',                  lat: 38.9917, lng:  -94.6358 },
  { nation: 'France',                 city: 'Boston',                    region: 'Massachusetts',         hotel: 'Four Seasons Hotel Boston',                                           training: 'Bentley University, Waltham',                           lat: 42.3601, lng:  -71.0589 },
  { nation: 'Germany',                city: 'Winston-Salem',             region: 'North Carolina',        hotel: 'Graylyn',                                                             training: 'Wake Forest University',                                lat: 36.0999, lng:  -80.2442 },
  { nation: 'Ghana',                  city: 'Providence',                region: 'Rhode Island',          hotel: 'Providence Biltmore',                                                 training: 'Bryant University, Smithfield',                         lat: 41.8240, lng:  -71.4128 },
  { nation: 'Haiti',                  city: 'Atlantic City',             region: 'New Jersey',            hotel: 'Sheraton Atlantic City Convention Center',                            training: 'Stockton University, Galloway Township',                lat: 39.3643, lng:  -74.4229 },
  { nation: 'Iran',                   city: 'Tijuana',                   region: 'Baja California',       hotel: 'Tijuana Marriott Hotel',                                              training: 'Club Tijuana Training Center',                          lat: 32.5149, lng: -117.0382 },
  { nation: 'Iraq',                   city: 'White Sulphur Springs',     region: 'West Virginia',         hotel: 'Greenbrier Resort',                                                   training: 'The Greenbrier Sports Performance Centre',              lat: 37.7956, lng:  -80.2954 },
  { nation: 'Japan',                  city: 'Nashville',                 region: 'Tennessee',             hotel: 'TBA, Nashville',                                                      training: 'Nashville SC Training Center',                          lat: 36.1627, lng:  -86.7816 },
  { nation: 'Jordan',                 city: 'Portland',                  region: 'Oregon',                hotel: 'The Nines Hotel',                                                     training: 'University of Portland',                                lat: 45.5152, lng: -122.6784 },
  { nation: 'Mexico',                 city: 'Mexico City',               region: 'CDMX',                  hotel: 'Centro de Alto Rendimiento (on-site)',                                training: 'Centro de Alto Rendimiento',                            lat: 19.4326, lng:  -99.1332 },
  { nation: 'Morocco',                city: 'Warren',                    region: 'New Jersey',            hotel: 'Somerset Hills, Tapestry Collection',                                 training: 'Pingry School, Basking Ridge',                          lat: 40.6398, lng:  -74.5060 },
  { nation: 'Netherlands',            city: 'Kansas City',               region: 'Missouri',              hotel: 'Cascade Hotel, Tribute Portfolio',                                    training: 'Kansas City Current Training Facility, Riverside',      lat: 39.0997, lng:  -94.5786 },
  { nation: 'New Zealand',            city: 'San Diego',                 region: 'California',            hotel: 'Hyatt Regency La Jolla at Aventine',                                  training: 'Torero Stadium',                                        lat: 32.8500, lng: -117.2750 },
  { nation: 'Norway',                 city: 'Greensboro',                region: 'North Carolina',        hotel: 'Grandover Resort & Spa, Wyndham Grand',                               training: 'UNC Greensboro',                                        lat: 36.0726, lng:  -79.7920 },
  { nation: 'Panama',                 city: 'New Tecumseth',             region: 'Ontario',               hotel: 'Nottawasaga Inn Resort',                                              training: 'Nottawasaga Training Site',                             lat: 44.1395, lng:  -79.8654 },
  { nation: 'Paraguay',               city: 'San Jose',                  region: 'California',            hotel: 'Signia by Hilton San Jose',                                           training: 'Spartan Soccer Complex',                                lat: 37.3382, lng: -121.8863 },
  { nation: 'Portugal',               city: 'Palm Beach',                region: 'Florida',               hotel: 'Four Seasons Hotel Palm Beach',                                       training: 'Gardens North County District Park, Palm Beach Gardens',lat: 26.7056, lng:  -80.0364 },
  { nation: 'Qatar',                  city: 'Goleta',                    region: 'California',            hotel: 'Courtyard by Marriott Santa Barbara Goleta',                          training: 'Westmont College, Santa Barbara',                       lat: 34.4358, lng: -119.8276 },
  { nation: 'Saudi Arabia',           city: 'Austin',                    region: 'Texas',                 hotel: 'Four Seasons Hotel Austin',                                           training: 'Austin FC Stadium',                                     lat: 30.2672, lng:  -97.7431 },
  { nation: 'Scotland',               city: 'Charlotte',                 region: 'North Carolina',        hotel: 'Renaissance Charlotte SouthPark',                                     training: 'Charlotte FC Training Center',                          lat: 35.2271, lng:  -80.8431 },
  { nation: 'Senegal',                city: 'New Brunswick',             region: 'New Jersey',            hotel: 'The Heldrich Hotel and Conference Center',                            training: 'Rutgers University, Piscataway',                        lat: 40.4862, lng:  -74.4518 },
  { nation: 'South Africa',           city: 'Pachuca',                   region: 'Hidalgo',               hotel: 'Camino Real Pachuca',                                                 training: 'Universidad del Fútbol, San Agustín Tlaxiaca',          lat: 20.1011, lng:  -98.7591 },
  { nation: 'South Korea',            city: 'Guadalajara',               region: 'Jalisco',               hotel: 'The Westin Guadalajara',                                              training: 'Chivas Verde Valle, Zapopan',                           lat: 20.6597, lng: -103.3496 },
  { nation: 'Spain',                  city: 'Chattanooga',               region: 'Tennessee',             hotel: 'The Read House Hotel',                                                training: 'Baylor School',                                         lat: 35.0456, lng:  -85.3097 },
  { nation: 'Sweden',                 city: 'Frisco',                    region: 'Texas',                 hotel: 'Westin Dallas Stonebriar Golf Resort & Spa',                          training: 'FC Dallas Stadium',                                     lat: 33.1507, lng:  -96.8236 },
  { nation: 'Switzerland',            city: 'San Diego',                 region: 'California',            hotel: 'Fairmont Grand Del Mar',                                              training: 'San Diego Jewish Academy',                              lat: 32.9484, lng: -117.2156 },
  { nation: 'Tunisia',                city: 'Monterrey',                 region: 'Nuevo León',            hotel: 'InterContinental Presidente Monterrey (San Pedro Garza García)',      training: 'Rayados Training Center, Santiago',                     lat: 25.6505, lng: -100.4017 },
  { nation: 'Türkiye',                city: 'Mesa',                      region: 'Arizona',               hotel: 'Courtyard Mesa at Wrigleyville West',                                 training: 'Arizona Athletic Grounds',                              lat: 33.4152, lng: -111.8315 },
  { nation: 'United States',          city: 'Irvine',                    region: 'California',            hotel: 'Marriott Irvine Spectrum',                                            training: 'Orange County Great Park',                              lat: 33.6846, lng: -117.8265 },
  { nation: 'Uruguay',                city: 'Playa del Carmen',          region: 'Quintana Roo',          hotel: 'Fairmont Mayakoba',                                                   training: 'Mayakoba Training Centre',                              lat: 20.6296, lng:  -87.0739 },
  { nation: 'Uzbekistan',             city: 'Atlanta',                   region: 'Georgia',               hotel: 'JW Marriott Atlanta Buckhead',                                        training: 'Atlanta United Training Center, Marietta',              lat: 33.7490, lng:  -84.3880 },
];

// Lookup by nation key.
const BY_NATION = new Map<string, BaseCamp>(BASE_CAMPS.map((b) => [b.nation, b]));
export function baseCampByNation(nation: string): BaseCamp | undefined {
  return BY_NATION.get(nation);
}

/* ============================================================
   HAVERSINE — great-circle distance between two lat/lng points
   ============================================================ */

const EARTH_R_KM = 6371;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance in km between two (lat, lng) points. */
export function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  return 2 * EARTH_R_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}
