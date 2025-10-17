import { getCurrentUser } from './auth';

function authHeaders() {
  const u = getCurrentUser();
  return u?.token ? { Authorization: `Bearer ${u.token}` } : {};
}

async function fetchWithTimeout(input: RequestInfo | URL, init?: RequestInit & { timeoutMs?: number }) {
  const { timeoutMs = 5000, ...rest } = init || {} as any;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, { ...rest, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export const api = {
  async searchFlights(params: { from: string; to: string; departDate?: string; cabinClass?: string; passengers?: number; page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params.from) query.set('from', params.from);
    if (params.to) query.set('to', params.to);
    if (params.departDate) query.set('departDate', params.departDate);
    if (params.cabinClass) query.set('cabinClass', params.cabinClass);
    if (params.passengers) query.set('passengers', String(params.passengers));
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));

    const res = await fetch(`/api/search/flights?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to search flights');
    return res.json();
  },

  async searchHotels(params: { location?: string; minPrice?: number; maxPrice?: number; page?: number; limit?: number }) {
    const query = new URLSearchParams();
    if (params.location) query.set('location', params.location);
    if (params.minPrice != null) query.set('minPrice', String(params.minPrice));
    if (params.maxPrice != null) query.set('maxPrice', String(params.maxPrice));
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));

    // Use a short timeout to fallback quickly if backend is slow
    const res = await fetchWithTimeout(`/api/search/hotels?${query.toString()}`, { timeoutMs: 3500 });
    if (!res.ok) throw new Error('Failed to search hotels');
    return res.json();
  },

  async createFlightBooking(body: { userId: string; flightId: string; passengers: Array<{ name: string; age: number; gender?: string }> }) {
    const res = await fetch('/api/bookings/flight', { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error('Failed to create flight booking');
    return res.json();
  },

  async createHotelBooking(body: { userId: string; hotelId: string; checkIn: string; checkOut: string; guests: number; rooms: number }) {
    const res = await fetch('/api/bookings/hotel', { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error('Failed to create hotel booking');
    return res.json();
  },

  async getUserBookings(userId: string) {
    const res = await fetch(`/api/bookings/user/${userId}`, { headers: { ...authHeaders() } });
    if (!res.ok) throw new Error('Failed to load user bookings');
    return res.json();
  },

  async cancelBooking(id: string) {
    const res = await fetch(`/api/bookings/${id}/cancel`, { method: 'PATCH', headers: { ...authHeaders() } });
    if (!res.ok) throw new Error('Failed to cancel booking');
    return res.json();
  },

  async adminLogin(password: string) {
    const res = await fetch('/api/users/admin-login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Admin login failed');
    }
    return res.json();
  },

  async getAllBookings(token: string) {
    const res = await fetch('/api/bookings/all', { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to fetch bookings');
    }
    return res.json();
  },
};
