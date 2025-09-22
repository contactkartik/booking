import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { api } from '@/lib/api';
import { getCurrentUser } from '@/lib/auth';
import { addBooking } from '@/lib/bookings';

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: any };
  const { type, item } = state || {};

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(1);

  if (!type || !item) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-muted-foreground">Nothing to checkout. Please pick an item first.</div>
        <Button className="mt-4" variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const user = getCurrentUser();

  useEffect(() => {
    if (user?.email) setEmail(user.email);
    if (name.trim().length === 0 && user?.email) setName(user.email.split('@')[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmBooking = async () => {
    try {
      // Basic validation
      if (!name.trim()) {
        toast.error('Please enter your full name');
        return;
      }
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error('Please enter a valid email address');
        return;
      }
      if (!user) {
        toast.message('Proceeding without login', { description: 'Booking will be saved locally.' });
      }

      if (type === 'flight') {
        // backend attempt
        try {
          if (user?.id && item._id) {
            await api.createFlightBooking({ userId: user.id, flightId: item._id, passengers: [{ name: name || 'Guest', age: 30 }] });
            toast.success('Flight booked successfully');
          } else {
            throw new Error('Missing user or flight id');
          }
        } catch (e) {
          // local fallback
          addBooking({ userId: user?.id || 'guest', type: 'flight', flight: { flightId: item._id, passengers: [{ name: name || 'Guest', age: 30 }], totalPrice: item.price } });
          toast.message('Flight booked (local)');
        }
      } else {
        // hotel/villa style
        try {
          if (user?.id && item._id) {
            const today = new Date();
            const tomorrow = new Date(Date.now() + 24*60*60*1000);
            await api.createHotelBooking({ userId: user.id, hotelId: item._id, checkIn: today.toISOString(), checkOut: tomorrow.toISOString(), guests, rooms: 1 });
            toast.success('Stay booked successfully');
          } else {
            throw new Error('Missing user or hotel id');
          }
        } catch (e) {
          addBooking({ userId: user?.id || 'guest', type: 'hotel', hotel: { hotelId: item._id, checkIn: new Date().toISOString(), checkOut: new Date(Date.now()+24*60*60*1000).toISOString(), guests, rooms: 1, totalPrice: item.pricePerNight } });
          toast.message('Stay booked (local)');
        }
      }

      navigate('/thank-you', { state: { type } });
    } catch (err: any) {
      toast.error(err?.message || 'Failed to book');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-4 border rounded-xl bg-card">
          <div className="mb-4">
            <Label className="block mb-1">Full Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="mb-4">
            <Label className="block mb-1">Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          {type !== 'flight' && (
            <div className="mb-4">
              <Label className="block mb-1">Guests</Label>
              <Input type="number" min={1} value={guests} onChange={(e) => setGuests(parseInt(e.target.value || '1'))} />
            </div>
          )}

          <Button className="mt-2 bg-primary text-primary-foreground" onClick={confirmBooking}>Confirm Booking</Button>
        </div>

        <div className="p-4 border rounded-xl bg-card">
          <div className="font-semibold mb-2">Summary</div>
          {type === 'flight' ? (
            <div className="text-sm">
              <div>{item.airline} • {item.flightNumber}</div>
              <div className="text-muted-foreground">{item.from} → {item.to}</div>
              <div className="mt-2">Price: ₹ {item.price}</div>
            </div>
          ) : (
            <div className="text-sm">
              <div>{item.name}</div>
              <div className="text-muted-foreground">{item.location}</div>
              <div className="mt-2">Price: ₹ {item.pricePerNight} / night</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
