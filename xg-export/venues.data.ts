export type Country = 'USA' | 'Mexico' | 'Canada';

export interface Venue {
  city: string;
  stadium: string;
  country: Country;
  lat: number;
  lng: number;
  altitudeM: number;
  juneAvgHighC: number;
  juneAvgHumidity: number;
  roof: 'open' | 'closed' | 'retractable';
  notes?: string;
}

// 16 host cities for FIFA World Cup 2026 (USA / Mexico / Canada).
// Climate values are approximate June averages — verify before publishing.
export const VENUES: Venue[] = [
  { city: 'Atlanta',           stadium: 'Mercedes-Benz Stadium',  country: 'USA',    lat: 33.755, lng:  -84.401, altitudeM:  320, juneAvgHighC: 30, juneAvgHumidity: 70, roof: 'retractable' },
  { city: 'Boston',            stadium: 'Gillette Stadium',       country: 'USA',    lat: 42.091, lng:  -71.264, altitudeM:   30, juneAvgHighC: 25, juneAvgHumidity: 65, roof: 'open' },
  { city: 'Dallas',            stadium: 'AT&T Stadium',           country: 'USA',    lat: 32.748, lng:  -97.094, altitudeM:  168, juneAvgHighC: 33, juneAvgHumidity: 60, roof: 'retractable' },
  { city: 'Houston',           stadium: 'NRG Stadium',            country: 'USA',    lat: 29.685, lng:  -95.411, altitudeM:   14, juneAvgHighC: 33, juneAvgHumidity: 75, roof: 'retractable' },
  { city: 'Kansas City',       stadium: 'Arrowhead Stadium',      country: 'USA',    lat: 39.049, lng:  -94.484, altitudeM:  270, juneAvgHighC: 29, juneAvgHumidity: 65, roof: 'open' },
  { city: 'Los Angeles',       stadium: 'SoFi Stadium',           country: 'USA',    lat: 33.953, lng: -118.339, altitudeM:   30, juneAvgHighC: 24, juneAvgHumidity: 70, roof: 'closed' },
  { city: 'Miami',             stadium: 'Hard Rock Stadium',      country: 'USA',    lat: 25.958, lng:  -80.239, altitudeM:    3, juneAvgHighC: 31, juneAvgHumidity: 78, roof: 'open' },
  { city: 'New York/New Jersey', stadium: 'MetLife Stadium',      country: 'USA',    lat: 40.813, lng:  -74.074, altitudeM:    2, juneAvgHighC: 27, juneAvgHumidity: 65, roof: 'open' },
  { city: 'Philadelphia',      stadium: 'Lincoln Financial Field',country: 'USA',    lat: 39.901, lng:  -75.168, altitudeM:   12, juneAvgHighC: 28, juneAvgHumidity: 67, roof: 'open' },
  { city: 'San Francisco Bay', stadium: "Levi's Stadium",         country: 'USA',    lat: 37.403, lng: -121.970, altitudeM:    2, juneAvgHighC: 23, juneAvgHumidity: 70, roof: 'open' },
  { city: 'Seattle',           stadium: 'Lumen Field',            country: 'USA',    lat: 47.595, lng: -122.331, altitudeM:    6, juneAvgHighC: 22, juneAvgHumidity: 70, roof: 'open' },
  { city: 'Guadalajara',       stadium: 'Estadio Akron',          country: 'Mexico', lat: 20.681, lng: -103.462, altitudeM: 1560, juneAvgHighC: 28, juneAvgHumidity: 60, roof: 'open', notes: 'Moderate altitude — meaningful aerobic effect' },
  { city: 'Mexico City',       stadium: 'Estadio Azteca',         country: 'Mexico', lat: 19.303, lng:  -99.150, altitudeM: 2240, juneAvgHighC: 25, juneAvgHumidity: 60, roof: 'open', notes: 'High altitude — major impact on stamina, ball flight' },
  { city: 'Monterrey',         stadium: 'Estadio BBVA',           country: 'Mexico', lat: 25.669, lng: -100.244, altitudeM:  540, juneAvgHighC: 33, juneAvgHumidity: 65, roof: 'open' },
  { city: 'Toronto',           stadium: 'BMO Field',              country: 'Canada', lat: 43.633, lng:  -79.418, altitudeM:   76, juneAvgHighC: 24, juneAvgHumidity: 65, roof: 'open' },
  { city: 'Vancouver',         stadium: 'BC Place',               country: 'Canada', lat: 49.277, lng: -123.111, altitudeM:    0, juneAvgHighC: 21, juneAvgHumidity: 70, roof: 'closed' },
];
