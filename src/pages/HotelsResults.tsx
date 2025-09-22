import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { defaultHotelImage } from '@/lib/assets';

const HotelsResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as any) || {};
  const results = (state && state.results) || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Hotel Results</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>

      {results.length === 0 ? (
        <div className="text-muted-foreground">No results. Try another search.</div>
      ) : (
        <div className="space-y-3">
          {results.map((h: any) => (
            <div key={h._id} className="p-4 rounded-lg border border-border flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-card">
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={h.image || defaultHotelImage}
                  alt={h.name}
                  className="h-14 w-20 object-cover rounded"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = defaultHotelImage }}
                />
                <div>
                  <div className="font-medium">{h.name}</div>
                  <div className="text-sm text-muted-foreground">{h.location}</div>
                  <div className="text-xs text-muted-foreground">Rating {typeof h.rating === 'number' ? h.rating.toFixed(1) : (h.rating || '-')} • Amenities: {(h.amenities || []).slice(0,3).join(', ')}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xl font-bold">₹ {h.pricePerNight} <span className="text-xs font-normal">/ night</span></div>
                  <div className="text-xs text-muted-foreground">{h.roomsAvailable || 0} rooms available</div>
                </div>
                <Button className="bg-primary text-primary-foreground" onClick={() => navigate('/checkout', { state: { type: 'hotel', item: h } })}>Book</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelsResults;
