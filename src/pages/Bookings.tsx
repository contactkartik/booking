import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { getCurrentUser } from '@/lib/auth';
import { api } from '@/lib/api';
import { listBookings, cancelBookingLocal, type Booking } from '@/lib/bookings';

const BookingsPage = () => {
  const user = getCurrentUser();
  const [items, setItems] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      if (user?.id) {
        try {
          const res = await api.getUserBookings(user.id);
          setItems(
            (res?.results || []).map((b: any) => ({
              id: b._id,
              userId: b.userId,
              type: b.type,
              createdAt: b.createdAt,
              status: b.status,
              flight: b.flight,
              hotel: b.hotel,
            }))
          );
        } catch {
          setItems(listBookings(user.id));
        }
      } else {
        setItems(listBookings());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cancelBooking = async (id: string) => {
    try {
      try {
        await api.cancelBooking(id);
        toast.success('Booking cancelled');
      } catch {
        cancelBookingLocal(id);
        toast.message('Booking cancelled (local)');
      }
      await load();
    } catch (e: any) {
      toast.error(e?.message || 'Failed to cancel');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {loading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-muted-foreground">No bookings yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((b) => (
            <div key={b.id} className="p-4 rounded-lg border border-border bg-card flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="text-sm">
                <div className="font-medium capitalize">{b.type} booking</div>
                <div className="text-xs text-muted-foreground">{new Date(b.createdAt).toLocaleString()}</div>
                {b.type === 'flight' && b.flight && (
                  <div className="mt-1">Flight • {b.flight.flightId}</div>
                )}
                {b.type === 'hotel' && b.hotel && (
                  <div className="mt-1">Stay • {b.hotel.hotelId}</div>
                )}
                <div className="mt-1 text-xs">Status: <span className="font-medium">{b.status}</span></div>
              </div>
              <div className="flex items-center gap-3">
                {b.status !== 'cancelled' && (
                  <Button variant="destructive" onClick={() => cancelBooking(b.id)}>Cancel</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
