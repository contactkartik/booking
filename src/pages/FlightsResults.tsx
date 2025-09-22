import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getAirlineLogo, defaultFlightImage } from '@/lib/assets';

const FlightsResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as any) || {};
  const results = (state && state.results) || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Flight Results</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>

      {results.length === 0 ? (
        <div className="text-muted-foreground">No results. Try another search.</div>
      ) : (
        <div className="space-y-3">
          {results.map((f: any) => (
            <div key={f._id} className="p-4 rounded-lg border border-border flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-card">
              <div className="flex items-center gap-3 flex-1">
                <img src={getAirlineLogo(f.airline) || defaultFlightImage} alt={f.airline} className="h-10 w-10 object-contain rounded bg-muted/20" />
                <div>
                  <div className="font-medium">{f.airline} • {f.flightNumber}</div>
                  <div className="text-sm text-muted-foreground">{f.from} → {f.to}</div>
                  <div className="text-xs text-muted-foreground">{Math.round((new Date(f.arriveDate).getTime()-new Date(f.departDate).getTime())/60000) || f.durationMinutes} mins • {f.stops || 0} stops • {f.cabinClass}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xl font-bold">₹ {f.price}</div>
                  <div className="text-xs text-muted-foreground">{f.seatsLeft || 0} seats left</div>
                </div>
                <Button className="bg-primary text-primary-foreground" onClick={() => navigate('/checkout', { state: { type: 'flight', item: f } })}>Book</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlightsResults;
