export const airlineLogos: Record<string, string> = {
  indigo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/IndiGo_logo.svg',
  'air india': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Air_India_Logo.svg',
  vistara: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Vistara_logo.svg',
  spicejet: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/SpiceJet_logo.svg',
};

export function getAirlineLogo(airline?: string): string | undefined {
  if (!airline) return undefined;
  const key = airline.toLowerCase().trim();
  // best-effort exact match
  if (airlineLogos[key]) return airlineLogos[key];
  // contains lookup
  for (const k of Object.keys(airlineLogos)) {
    if (key.includes(k)) return airlineLogos[k];
  }
  return undefined;
}

export const defaultFlightImage = 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=60';
export const defaultHotelImage = 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=60';
