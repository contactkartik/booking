import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { defaultHotelImage } from '@/lib/assets';

const packages = [
  {
    _id: 'pkg-goa-3n4d',
    name: 'Goa Beach Escape',
    location: 'Goa, India',
    description: '3 Nights / 4 Days • Beachside resort • Breakfast • Airport transfers',
    image: 'https://images.unsplash.com/photo-1519821172141-b5d8a4d4b7df?auto=format&fit=crop&w=1200&q=60',
    pricePerNight: 4500,
    nights: 3,
  },
  {
    _id: 'pkg-kerala-4n5d',
    name: 'Kerala Backwaters & Munnar',
    location: 'Kerala, India',
    description: '4 Nights / 5 Days • Houseboat cruise • Tea gardens • Guided sightseeing',
    image: 'https://images.unsplash.com/photo-1542370285-b8eb8317691e?auto=format&fit=crop&w=1200&q=60',
    pricePerNight: 5200,
    nights: 4,
  },
  {
    _id: 'pkg-jaipur-2n3d',
    name: 'Jaipur Royal Getaway',
    location: 'Jaipur, Rajasthan',
    description: '2 Nights / 3 Days • Palace stay • City tour • Cultural evening',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=60',
    pricePerNight: 3800,
    nights: 2,
  },
  {
    _id: 'pkg-manali-3n4d',
    name: 'Manali Adventure Trip',
    location: 'Manali, Himachal',
    description: '3 Nights / 4 Days • Snow activities • Solang Valley • Local sightseeing',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60',
    pricePerNight: 4200,
    nights: 3,
  },
];

const PackagesResults = () => {
  const navigate = useNavigate();

  const book = (pkg: any) => {
    // Reuse the same checkout flow as hotels/villas by passing type='hotel'
    navigate('/checkout', { state: { type: 'hotel', item: pkg } });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Holiday Packages</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className="bg-card border border-border rounded-xl overflow-hidden shadow">
            <img
              src={pkg.image}
              alt={pkg.name}
              className="w-full h-44 object-cover"
              loading="lazy"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = defaultHotelImage }}
            />
            <div className="p-4">
              <div className="font-semibold text-lg">{pkg.name}</div>
              <div className="text-muted-foreground text-sm mb-2">{pkg.location}</div>
              <div className="text-sm mb-3">{pkg.description}</div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <div className="font-medium">₹ {pkg.pricePerNight} / night</div>
                  <div className="text-muted-foreground">{pkg.nights} nights</div>
                </div>
                <Button className="bg-primary text-primary-foreground" onClick={() => book(pkg)}>Book Now</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagesResults;
