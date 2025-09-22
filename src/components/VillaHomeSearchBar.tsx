import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { CalendarIcon, Users } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/sonner'
import { defaultHotelImage } from '@/lib/assets'

const priceOptions = [
  '₹0-₹1500',
  '₹1500-₹2500',
  '₹2500-₹5000',
  '₹5000+',
]

const guestOptions = [
  'Add Adults & Children',
  '1 Guest',
  '2 Guests',
  '3-5 Guests',
  '6+ Guests',
]

export const VillaHomeSearchBar = () => {
  const [location, setLocation] = useState('Goa, India')
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [guests, setGuests] = useState('Add Adults & Children')
  const [price, setPrice] = useState('')
  const [isCheckInOpen, setIsCheckInOpen] = useState(false)
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false)
  const navigate = useNavigate()
  const [results, setResults] = useState<any[]>([])
  const suggestedLocations = ['Goa, India', 'Manali, India', 'Jaipur, India', 'Udaipur, India']
  const [isSuggestOpen, setIsSuggestOpen] = useState(false)

  const buildMockVillas = () => {
    const pics = [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2e07?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80',
    ]
    const loc = location || 'Goa, India'
    return [
      {
        _id: 'villa-1',
        name: 'Casa Sol Villa',
        location: loc,
        description: 'Luxury villa with private pool and lush garden.',
        type: 'Villa',
        pricePerNight: 4800,
        image: pics[0],
        rating: 4.7,
      },
      {
        _id: 'villa-2',
        name: 'Beachfront Bliss',
        location: loc,
        description: 'Modern villa right on the beach with sunset views.',
        type: 'Villa',
        pricePerNight: 6200,
        image: pics[1],
        rating: 4.8,
      },
      {
        _id: 'villa-3',
        name: 'Heritage Homestay',
        location: loc,
        description: 'Experience local culture in a heritage homestay.',
        type: 'Homestay',
        pricePerNight: 2800,
        image: pics[2],
        rating: 4.6,
      },
      {
        _id: 'villa-4',
        name: 'Forest Retreat',
        location: loc,
        description: 'Secluded stay surrounded by lush forest.',
        type: 'Homestay',
        pricePerNight: 3400,
        image: pics[3],
        rating: 4.5,
      },
    ]
  }

  const handleSearch = () => {
    const data = buildMockVillas()
    toast.success(`${data.length} stays in ${location || 'popular destinations'}`)
    setResults(data)
    navigate('/villas/results', { state: { results: data } })
  }

  return (
    <>
    <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-0 items-stretch border">
      <div className="relative flex-1 min-w-[220px] border-r px-4 py-2">
        <Label className="text-sm font-medium mb-1 block">City, Property Name Or Location</Label>
        <Input
          value={location}
          onChange={(e) => {
            setLocation(e.target.value)
            setIsSuggestOpen(true)
          }}
          onFocus={() => setIsSuggestOpen(true)}
          placeholder="Search location (e.g., Goa, Jaipur)"
          className="bg-transparent rounded px-3 py-2 text-base"
        />
        {isSuggestOpen && (
          <div className="absolute z-20 mt-1 w-[calc(100%-2rem)] bg-card border border-border rounded-md shadow-sm max-h-56 overflow-auto">
            {suggestedLocations
              .filter((l) => l.toLowerCase().includes(location.toLowerCase()))
              .map((l) => (
                <div
                  key={l}
                  className="px-3 py-2 cursor-pointer hover:bg-muted/50 text-sm"
                  onMouseDown={() => {
                    setLocation(l)
                    setIsSuggestOpen(false)
                  }}
                >
                  {l}
                </div>
              ))}
            <div className="px-3 py-2 text-xs text-muted-foreground border-t" onMouseDown={() => setIsSuggestOpen(false)}>Close</div>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-[140px] border-r px-4 py-2">
        <Label className="text-sm font-medium mb-1 block">Check-In <span className="text-blue-600">▼</span></Label>
        <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
          <PopoverTrigger asChild>
            <div className="cursor-pointer bg-transparent rounded px-2 py-2 text-center font-semibold text-2xl text-gray-600 hover:bg-muted/20">
              {checkInDate ? format(checkInDate, 'dd MMM yyyy') : 'Select Date'}
            </div>
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
      <div className="flex-1 min-w-[140px] border-r px-4 py-2">
        <Label className="text-sm font-medium mb-1 block">Check-Out <span className="text-blue-600">▼</span></Label>
        <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
          <PopoverTrigger asChild>
            <div className="cursor-pointer bg-transparent rounded px-2 py-2 text-center font-semibold text-2xl text-gray-600 hover:bg-muted/20">
              {checkOutDate ? format(checkOutDate, 'dd MMM yyyy') : 'Select Date'}
            </div>
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
      <div className="flex-1 min-w-[140px] border-r px-4 py-2">
        <Label className="text-sm font-medium mb-1 block">Guests <span className="text-blue-600">▼</span></Label>
        <Select value={guests} onValueChange={setGuests}>
          <SelectTrigger className="bg-transparent rounded px-2 py-2 text-center font-semibold text-2xl text-gray-600">
            <SelectValue placeholder="Add Adults & Children" />
          </SelectTrigger>
          <SelectContent>
            {guestOptions.map((option) => (
              <SelectItem key={option} value={option}>
                <Users className="mr-2 h-4 w-4" />
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-w-[140px] px-4 py-2">
        <Label className="text-sm font-medium mb-1 block">Price Per Night <span className="text-blue-600">▼</span></Label>
        <Select value={price} onValueChange={setPrice}>
          <SelectTrigger className="bg-transparent rounded px-2 py-2 text-center font-semibold text-2xl text-gray-600">
            <SelectValue placeholder="₹0-₹1500, ₹1500-₹2500,..." />
          </SelectTrigger>
          <SelectContent>
            {priceOptions.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-w-[160px] px-4 py-2 flex items-end">
        <Button className="w-full bg-gradient-primary hover:bg-primary-hover text-primary-foreground" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>

    {/* Inline Results Grid */}
    {results.length > 0 && (
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((item:any) => (
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
              <div className="text-sm mt-1 line-clamp-2 text-muted-foreground">{item.description}</div>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <div className="text-xl font-bold">₹ {item.pricePerNight}<span className="text-xs font-normal text-muted-foreground"> / night</span></div>
                  <div className="text-xs text-muted-foreground">⭐ {item.rating || '-'} rating</div>
                </div>
                <Button className="bg-primary text-primary-foreground" onClick={() => navigate('/checkout', { state: { type: 'hotel', item } })}>Book</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
    </>
  )
}
