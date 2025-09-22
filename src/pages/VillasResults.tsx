import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { defaultHotelImage } from '@/lib/assets';

const VillasResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as any) || {};
  const results = (state && state.results) || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Villas & Homestays</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>

      {results.length === 0 ? (
        <div className="text-muted-foreground">No stays matched. Try changing filters.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item: any) => (
            <div key={item._id} className="rounded-xl overflow-hidden border border-border bg-card shadow">
              <img
                src={item.image || defaultHotelImage}
                alt={item.name}
                className="w-full h-44 object-cover"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = defaultHotelImage }}
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{item.type}</span>
                </div>
                <div className="text-sm text-muted-foreground">{item.location}</div>
                {item.description && (
                  <div className="text-sm mt-1 line-clamp-2 text-muted-foreground">{item.description}</div>
                )}
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <div className="text-xl font-bold">₹ {item.pricePerNight}
                      <span className="text-xs font-normal text-muted-foreground"> / night</span>
                    </div>
                    <div className="text-xs text-muted-foreground">⭐ {item.rating || '-'} rating</div>
                  </div>
                  <Button className="bg-primary text-primary-foreground" onClick={() => navigate('/checkout', { state: { type: 'hotel', item } })}>Book</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VillasResults;
