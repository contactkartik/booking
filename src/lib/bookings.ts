import { getCurrentUser, type User } from './auth';

const KEY = 'bk_bookings_fallback';

export type Booking = {
  id: string;
  userId: string;
  type: 'flight' | 'hotel';
  createdAt: string;
  status: 'confirmed' | 'cancelled';
  flight?: any;
  hotel?: any;
};

function readAll(): Booking[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

function writeAll(items: Booking[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addBooking(b: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
  const items = readAll();
  const booking: Booking = {
    ...b,
    id: 'loc-' + Math.random().toString(36).slice(2, 10),
    createdAt: new Date().toISOString(),
    status: 'confirmed',
  };
  items.unshift(booking);
  writeAll(items);
  return booking;
}

export function listBookings(userId?: string): Booking[] {
  const all = readAll();
  return userId ? all.filter((b) => b.userId === userId) : all;
}

export function cancelBookingLocal(id: string): Booking | undefined {
  const items = readAll();
  const idx = items.findIndex((i) => i.id === id);
  if (idx >= 0) {
    items[idx].status = 'cancelled';
    writeAll(items);
    return items[idx];
  }
  return undefined;
}
