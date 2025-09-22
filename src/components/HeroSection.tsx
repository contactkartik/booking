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
    <section className="relative min-h-[600px] flex flex-col items-center justify-center">
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
      <div className="w-full pt-10 pb-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-2 drop-shadow-lg">
          Discover Incredible <span className="text-orange-500">India</span>
        </h1>
        <p className="text-lg text-card-foreground/80 mb-4">
          From ancient temples to pristine beaches, thrilling adventures to cultural immersions -<br/>
          find and book your perfect Indian experience with BookKaroIndia.
        </p>
      </div>
      <div className="flex justify-center w-full">
        <div className="bg-card/95 backdrop-blur-md rounded-2xl p-6 shadow-large border border-border/50 max-w-5xl w-full mx-4 md:mx-auto mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-1">
              <label className="text-sm font-medium text-card-foreground mb-2 block">Where to?</label>
              <Input
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
                data-testid="input-destination"
              />
            </div>
            <div className="lg:col-span-1">
              <label className="text-sm font-medium text-card-foreground mb-2 block">Experience Type</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger data-testid="select-category" className="bg-background/50 border-border/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-1">
              <label className="text-sm font-medium text-card-foreground mb-2 block">When?</label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-background/50 border-border/50"
                    data-testid="button-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      setIsCalendarOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="lg:col-span-1">
              <label className="text-sm font-medium text-card-foreground mb-2 block">Guests</label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger data-testid="select-guests" className="bg-background/50 border-border/50">
                  <SelectValue placeholder="How many?" />
                </SelectTrigger>
                <SelectContent>
                  {guestOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        {option}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-1 flex items-end">
              <Button
                className="w-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground"
                onClick={handleSearch}
                size="lg"
                data-testid="button-search"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
          <div className="mt-8 text-center">
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