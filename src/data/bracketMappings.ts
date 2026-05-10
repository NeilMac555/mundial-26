// FIFA 2026 World Cup bracket structure.
// 18 possible combinations for which 8 of 12 third-placed teams qualify.
// Each row maps the 8 R32 third-place slots (1A/1B/1D/1E/1G/1I/1K/1L)
// to the specific group whose 3rd-place team fills that slot.

export interface ThirdPlaceMapping {
  "1A": string;
  "1B": string;
  "1D": string;
  "1E": string;
  "1G": string;
  "1I": string;
  "1K": string;
  "1L": string;
}

export const thirdPlaceCombinations: Record<string, ThirdPlaceMapping> = {
  "EFGHIJKL": { "1A": "3E", "1B": "3J", "1D": "3I", "1E": "3F", "1G": "3H", "1I": "3G", "1K": "3L", "1L": "3K" },
  "DFGHIJKL": { "1A": "3H", "1B": "3G", "1D": "3I", "1E": "3D", "1G": "3J", "1I": "3F", "1K": "3L", "1L": "3K" },
  "DEGHIJKL": { "1A": "3E", "1B": "3J", "1D": "3I", "1E": "3D", "1G": "3H", "1I": "3G", "1K": "3L", "1L": "3K" },
  "DEFHIJKL": { "1A": "3E", "1B": "3J", "1D": "3I", "1E": "3D", "1G": "3H", "1I": "3F", "1K": "3L", "1L": "3K" },
  "DEFGIJKL": { "1A": "3E", "1B": "3G", "1D": "3I", "1E": "3D", "1G": "3J", "1I": "3F", "1K": "3L", "1L": "3K" },
  "DEFGHJKL": { "1A": "3E", "1B": "3G", "1D": "3J", "1E": "3D", "1G": "3H", "1I": "3F", "1K": "3L", "1L": "3K" },
  "DEFGHIKL": { "1A": "3E", "1B": "3G", "1D": "3I", "1E": "3D", "1G": "3H", "1I": "3F", "1K": "3L", "1L": "3K" },
  "DEFGHIJL": { "1A": "3E", "1B": "3G", "1D": "3J", "1E": "3D", "1G": "3H", "1I": "3F", "1K": "3L", "1L": "3I" },
  "DEFGHIJK": { "1A": "3E", "1B": "3G", "1D": "3J", "1E": "3D", "1G": "3H", "1I": "3F", "1K": "3I", "1L": "3K" },
  "CFGHIJKL": { "1A": "3H", "1B": "3G", "1D": "3I", "1E": "3C", "1G": "3J", "1I": "3F", "1K": "3L", "1L": "3K" },
  "CEGHIJKL": { "1A": "3E", "1B": "3J", "1D": "3I", "1E": "3C", "1G": "3H", "1I": "3G", "1K": "3L", "1L": "3K" },
  "CEFHIJKL": { "1A": "3E", "1B": "3J", "1D": "3I", "1E": "3C", "1G": "3H", "1I": "3F", "1K": "3L", "1L": "3K" },
  "CEFGIJKL": { "1A": "3E", "1B": "3G", "1D": "3I", "1E": "3C", "1G": "3J", "1I": "3F", "1K": "3L", "1L": "3K" },
  "CEFGHJKL": { "1A": "3E", "1B": "3G", "1D": "3J", "1E": "3C", "1G": "3H", "1I": "3F", "1K": "3L", "1L": "3K" },
  "CEFGHIKL": { "1A": "3E", "1B": "3G", "1D": "3I", "1E": "3C", "1G": "3H", "1I": "3F", "1K": "3L", "1L": "3K" },
  "CEFGHIJL": { "1A": "3E", "1B": "3G", "1D": "3J", "1E": "3C", "1G": "3H", "1I": "3F", "1K": "3L", "1L": "3I" },
  "CEFGHIJK": { "1A": "3E", "1B": "3G", "1D": "3J", "1E": "3C", "1G": "3H", "1I": "3F", "1K": "3I", "1L": "3K" },
  "CDGHIJKL": { "1A": "3H", "1B": "3G", "1D": "3I", "1E": "3C", "1G": "3J", "1I": "3D", "1K": "3L", "1L": "3K" },
};
