import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { CalendarIcon, Users } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from '@/components/ui/sonner'
import { api } from '@/lib/api'
import { defaultHotelImage } from '@/lib/assets'
import { useNavigate } from 'react-router-dom'

const HotelBookingForm = () => {
  const [location, setLocation] = useState('')
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [guests, setGuests] = useState('1')
  const [isCheckInOpen, setIsCheckInOpen] = useState(false)
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const navigate = useNavigate()

  const guestOptions = ['1 Guest', '2 Guests', '3-5 Guests', '6-10 Guests', '10+ Guests']

  const suggestedLocations = ['Mumbai', 'New Delhi', 'Goa', 'Jaipur']
  const [isSuggestOpen, setIsSuggestOpen] = useState(false)

  const buildMockHotels = () => {
    const pics = [
      'https://images.unsplash.com/photo-1501117716987-c8e1ecb21092?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2e07?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80',
    ]
    const loc = location || 'Mumbai'
    const names = [
      'Grand Seaside Resort',
      'City Center Hotel',
      'Royal Palace Inn',
      'Lakeside Retreat',
      'Sunset Boulevard Hotel',
      'Heritage Deluxe',
      'The Urban Stay',
      'Garden View Suites',
      'Skyline Residency',
      'Palm Grove Resort',
    ]
    return names.map((n, i) => ({
      _id: `mock-h${i+1}`,
      name: n,
      location: loc,
      rating: 4.3 + (i % 5) * 0.1,
      amenities: ['WiFi', 'Breakfast', i % 2 ? 'Gym' : 'Pool'],
      pricePerNight: 2500 + i * 300,
      roomsAvailable: (10 - i),
      image: pics[i % pics.length],
    }))
  }

  const handleSearch = async () => {
    try {
      const { results } = await api.searchHotels({ location })
      const finalResults = results && results.length > 0 ? results : buildMockHotels()
      toast.success(`${finalResults.length} hotels found`)
      setResults(finalResults)
      navigate('/hotels/results', { state: { results: finalResults } })
      // TODO: navigate to results page and pass results/state
    } catch (e:any) {
      const fallback = buildMockHotels()
      toast.message('Showing sample results', { description: e?.message || 'Backend not reachable' })
      setResults(fallback)
      navigate('/hotels/results', { state: { results: fallback } })
    }
  }

  return (
    <>
    <div className="bg-card rounded-b-2xl border-t-0 border border-border shadow-medium p-6 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Location */}
        <div className="lg:col-span-3 relative">
          <Label className="text-sm font-medium mb-2 block">Location</Label>
          <Input
            value={location}
            onChange={(e) => { setLocation(e.target.value); setIsSuggestOpen(true); }}
            onFocus={() => setIsSuggestOpen(true)}
            placeholder="Enter city or hotel name"
          />
          {isSuggestOpen && (
            <div className="absolute z-20 mt-1 w-full bg-card border border-border rounded-md shadow-sm max-h-56 overflow-auto">
              {suggestedLocations.filter((l) => l.toLowerCase().includes((location||'').toLowerCase())).map((l) => (
                <div key={l} className="px-3 py-2 cursor-pointer hover:bg-muted/50 text-sm" onMouseDown={() => { setLocation(l); setIsSuggestOpen(false); }}>
                  {l}
                </div>
              ))}
              <div className="px-3 py-2 text-xs text-muted-foreground border-t" onMouseDown={() => setIsSuggestOpen(false)}>Close</div>
            </div>
          )}
        </div>

        {/* Check-in Date */}
        <div className="lg:col-span-2">
          <Label className="text-sm font-medium mb-2 block">Check-In</Label>
          <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkInDate ? format(checkInDate, "dd MMM'yy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={(date) => {
                  setCheckInDate(date)
                  setIsCheckInOpen(false)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="lg:col-span-2">
          <Label className="text-sm font-medium mb-2 block">Check-Out</Label>
          <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOutDate ? format(checkOutDate, "dd MMM'yy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={(date) => {
                  setCheckOutDate(date)
                  setIsCheckOutOpen(false)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="lg:col-span-2">
          <Label className="text-sm font-medium mb-2 block">Guests</Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger>
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

        {/* Search Button */}
        <div className="lg:col-span-3 flex items-end">
          <Button 
            className="w-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground"
            onClick={handleSearch}
            size="lg"
          >
            SEARCH
          </Button>
        </div>
      </div>
    </div>

    {/* Results Grid */}
    {results.length > 0 && (
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Hotel Results</h3>
          <div className="text-sm text-muted-foreground">{results.length} options</div>
        </div>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] gap-6">
          {results.map((h: any) => (
            <div key={h._id} className="rounded-xl overflow-hidden border border-border bg-card shadow">
              <img 
                src={h.image || defaultHotelImage}
                alt={h.name}
                className="w-full h-44 object-cover"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = defaultHotelImage }}
              />
              <div className="p-4">
                <div className="font-medium text-lg">{h.name}</div>
                <div className="text-sm text-muted-foreground">{h.location}</div>
                <div className="text-xs text-muted-foreground mt-1">⭐ {typeof h.rating === 'number' ? h.rating.toFixed(1) : (h.rating || '-')} • Amenities: {(h.amenities || []).slice(0,3).join(', ')}</div>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-xl font-bold">₹ {h.pricePerNight} <span className="text-xs font-normal text-muted-foreground">/ night</span></div>
                  <Button className="bg-primary text-primary-foreground" onClick={() => navigate('/checkout', { state: { type: 'hotel', item: h } })}>Book</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    </>
  )
}

export default HotelBookingForm
