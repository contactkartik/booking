import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { api } from '@/lib/api';

// Define a type for the booking data
interface Booking {
  _id: string;
  userId: string;
  type: 'flight' | 'hotel';
  status: string;
  createdAt: string;
  flight?: { flightId: string; totalPrice: number };
  hotel?: { hotelId: string; totalPrice: number };
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await api.getAllBookings(token);
        setBookings(response.results || []);
      } catch (err: any) {
        toast.error(err?.message || 'Failed to fetch bookings');
        if (err.message.includes('Forbidden') || err.message.includes('Unauthorized')) {
          localStorage.removeItem('admin_token');
          navigate('/admin/login');
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>
      
      <div className="bg-card border rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">All Bookings ({bookings.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3">Booking ID</th>
                <th className="p-3">User ID</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b last:border-b-0 hover:bg-muted/50">
                  <td className="p-3 font-mono text-xs">{booking._id}</td>
                  <td className="p-3 font-mono text-xs">{booking.userId}</td>
                  <td className="p-3 capitalize">{booking.type}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${booking.status === 'cancelled' ? 'bg-destructive/20 text-destructive-foreground' : 'bg-success/20 text-success-foreground'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3">{new Date(booking.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 text-right">₹{booking.flight?.totalPrice || booking.hotel?.totalPrice || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {bookings.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
