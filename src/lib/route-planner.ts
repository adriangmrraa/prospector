export interface LeadCoords {
  id: number;
  nombre: string;
  lat: number;
  lng: number;
  direccion?: string;
  telefono?: string;
  rating?: string;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function calculateTspRoute(leads: LeadCoords[], userLat?: number, userLng?: number): LeadCoords[] {
  if (leads.length === 0) return [];
  if (leads.length === 1) return [leads[0]];

  const unvisited = [...leads];
  let current: LeadCoords;

  if (userLat !== undefined && userLng !== undefined) {
    // Start from the lead closest to the user
    let closestIdx = 0;
    let minDist = Infinity;
    for (let i = 0; i < unvisited.length; i++) {
      const dist = calculateDistance(userLat, userLng, unvisited[i].lat, unvisited[i].lng);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = i;
      }
    }
    current = unvisited[closestIdx];
    unvisited.splice(closestIdx, 1);
  } else {
    // Start from the northernmost
    unvisited.sort((a, b) => b.lat - a.lat);
    current = unvisited.shift()!;
  }

  const route: LeadCoords[] = [current];

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let minDistance = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const dist = calculateDistance(current.lat, current.lng, unvisited[i].lat, unvisited[i].lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIdx = i;
      }
    }

    current = unvisited[nearestIdx];
    route.push(current);
    unvisited.splice(nearestIdx, 1);
  }

  return route;
}

export function calculateTotalDistance(route: LeadCoords[]): number {
  let total = 0;
  for (let i = 1; i < route.length; i++) {
    total += calculateDistance(route[i - 1].lat, route[i - 1].lng, route[i].lat, route[i].lng);
  }
  return Math.round(total * 100) / 100;
}
