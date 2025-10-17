import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search, Users } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { EVENTS_URL } from '@/lib/config';
import { defaultHotelImage } from '@/lib/assets';

export default function HeroSection() {
  const travelImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=1200&q=80',
  ];
  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % travelImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Agoda widget after component mounts
  useEffect(() => {
    const initializeWidget = () => {
      if ((window as any).AgdSherpa && document.getElementById('adgshp-732420038')) {
        try {
          const stg: any = {};
          stg.crt = "2614661451938";
          stg.version = "1.04";
          stg.id = stg.name = "adgshp-732420038";
          stg.width = "1288px";
          stg.height = "300px";
          stg.ReferenceKey = "11ISUEBrEFvTidZyXID0eg==";
          stg.Layout = "Oneline";
          stg.Language = "en-us";
          stg.Cid = "1950485";
          stg.DestinationName = "";
          stg.OverideConf = false;
          new (window as any).AgdSherpa(stg).initialize();
          
          // Add styling to hide branding and ensure proper display
          setTimeout(() => {
            const style = document.createElement('style');
            style.textContent = `
              /* Hide Agoda branding */
              #adgshp-732420038 .agd-logo,
              #adgshp-732420038 [class*="logo"],
              #adgshp-732420038 img[src*="agoda"],
              #adgshp-732420038 .agd-brand,
              #adgshp-732420038 a[href*="agoda"] {
                display: none !important;
              }
              
              /* Ensure widget fits properly */
              #adgshp-732420038 {
                max-width: 1288px !important;
                margin: 0 auto !important;
                border-radius: 0px !important;
                overflow: hidden !important;
              }
              
              /* Remove border-radius from widget content */
              #adgshp-732420038 > div,
              #adgshp-732420038 * {
                border-radius: 0px !important;
              }
              
              /* Center the main text content */
              #adgshp-732420038 h1,
              #adgshp-732420038 h2,
              #adgshp-732420038 .agd-title,
              #adgshp-732420038 [class*="title"],
              #adgshp-732420038 .main-text {
                text-align: center !important;
                margin: 0 auto !important;
                display: block !important;
                width: 100% !important;
              }
              
              /* Responsive adjustments */
              @media (max-width: 1400px) {
                #adgshp-732420038 {
                  transform: scale(0.9) !important;
                  transform-origin: center !important;
                }
              }
              
              @media (max-width: 1200px) {
                #adgshp-732420038 {
                  transform: scale(0.8) !important;
                  transform-origin: center !important;
                }
              }
              
              @media (max-width: 768px) {
                #adgshp-732420038 {
                  transform: scale(0.7) !important;
                  transform-origin: center !important;
                }
              }
            `;
            document.head.appendChild(style);
          }, 1000);
          
        } catch (error) {
          console.error('Agoda widget initialization failed:', error);
        }
      } else {
        // Retry after a short delay if script isn't loaded yet
        setTimeout(initializeWidget, 500);
      }
    };

    // Start initialization after component mounts
    const timer = setTimeout(initializeWidget, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('');
  const [guests, setGuests] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const categories = [
    'Adventure Tours',
    'Cultural Experiences',
    'Wildlife Safaris',
    'Beach Activities',
    'Mountain Treks',
    'City Tours',
    'Spiritual Journeys',
    'Food Tours',
  ];
  const guestOptions = ['1 Guest', '2 Guests', '3-5 Guests', '6-10 Guests', '10+ Guests'];
  const navigate = useNavigate();

  const buildMockHotels = () => {
    const loc = destination || 'Goa';
    return [
      {
        _id: 'hero-mock-1',
        name: `${loc} Experience Stay`,
        location: loc,
        rating: 4.6,
        amenities: ['WiFi', 'Breakfast', 'Guide'],
        pricePerNight: 2999,
        roomsAvailable: 4,
      },
      {
        _id: 'hero-mock-2',
        name: `${category || 'Adventure'} Retreat`,
        location: loc,
        rating: 4.8,
        amenities: ['Pool', 'Spa', 'WiFi'],
        pricePerNight: 3899,
        roomsAvailable: 7,
      },
    ];
  };

  const handleSearch = () => {
    const results = buildMockHotels();
    toast.success(`${results.length} options in ${destination || 'popular destinations'}`);
    navigate('/hotels/results', { state: { results } });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={travelImages[bgIndex]}
          alt="Travel background"
          className="w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: 0.7 }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = defaultHotelImage }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      <div className="w-full pt-10 pb-4 text-center" style={{ marginBottom: '40px' }}>
        <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-2 drop-shadow-lg">
          Discover Incredible <span className="text-orange-500">India</span>
        </h1>
        <p className="text-lg text-card-foreground/80 mb-6">
          From ancient temples to pristine beaches, thrilling adventures to cultural immersions -<br/>
          find and book your perfect Indian experience with BookKaroIndia.
        </p>
        <Button
          onClick={() => navigate('/checkout')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200"
          aria-label="Go to booking page to enter details"
        >
          Start Planning Your Trip
        </Button>
      </div>
      <div className="flex justify-center w-full">
        <div className="bg-card/95 backdrop-blur-md p-6 shadow-large border border-border/50 max-w-7xl w-full mx-2 md:mx-auto mt-2">
          {/* Agoda Search Widget - Replaces the old search form */}
          <div className="flex justify-center overflow-hidden">
            <div 
              id="adgshp-732420038" 
              className="w-full mx-auto"
              style={{
                minHeight: '300px',
                maxWidth: '1300px',
                background: 'transparent',
                overflow: 'hidden',
                marginLeft: '10px'
              }}
            ></div>
          </div>
          
          {/* Popular searches moved below the widget */}
          <div className="mt-6 text-center">
            <p className="text-sm text-card-foreground/80 mb-4 drop-shadow-sm">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Goa Beaches", "Kerala Backwaters", "Rajasthan Desert", "Himachal Treks", "Golden Triangle"].map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-card/80 border-border/50 hover:bg-card text-card-foreground"
                  onClick={() => {
                    setDestination(tag);
                    console.log("Quick search:", tag);
                  }}
                  data-testid={`button-quick-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}