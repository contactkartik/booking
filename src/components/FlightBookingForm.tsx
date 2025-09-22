import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { 
  CalendarIcon, 
  ArrowLeftRight, 
  Users,
  Info,
  Sparkles
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from '@/components/ui/sonner'
import { api } from '@/lib/api'
import { getAirlineLogo, defaultFlightImage } from '@/lib/assets'
import { useNavigate } from 'react-router-dom'

const FlightBookingForm = () => {
  const [tripType, setTripType] = useState('one-way')
  const [from, setFrom] = useState('Delhi')
  const [to, setTo] = useState('Mumbai')
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [travellers, setTravellers] = useState('1')
  const [travelClass, setTravelClass] = useState('Economy')
  const [fareType, setFareType] = useState('regular')
  const [results, setResults] = useState<any[]>([])
  const [isDepartureDateOpen, setIsDepartureDateOpen] = useState(false)
  const [isReturnDateOpen, setIsReturnDateOpen] = useState(false)
  const navigate = useNavigate()

  const fareOptions = [
    { 
      id: 'regular', 
      label: 'Regular', 
      description: 'Regular fares',
      savings: false
    },
    { 
      id: 'student', 
      label: 'Student', 
      description: 'Extra discounts/baggage',
      discount: 'Up to ₹ 600 off'
    },
    { 
      id: 'senior', 
      label: 'Senior Citizen', 
      description: 'Up to ₹ 600 off'
    },
    { 
      id: 'armed', 
      label: 'Armed Forces', 
      description: 'Up to ₹ 600 off'
    },
    { 
      id: 'doctor', 
      label: 'Doctor and Nurses', 
      description: 'Up to ₹ 600 off'
    }
  ]

  const buildMockFlights = () => {
    const basePrice = travelClass === 'Business' ? 9500 : 4500
    const depart = departureDate || new Date()
    const arrive = new Date((departureDate || new Date()).getTime() + 2.5 * 60 * 60 * 1000)
    return [
      {
        _id: 'mock-1',
        airline: 'IndiGo',
        flightNumber: '6E-201',
        from,
        to,
        departDate: depart.toISOString(),
        arriveDate: arrive.toISOString(),
        price: basePrice,
        durationMinutes: 150,
        stops: 0,
        cabinClass: travelClass,
        seatsLeft: 9,
      },
      {
        _id: 'mock-2',
        airline: 'Air India',
        flightNumber: 'AI-865',
        from,
        to,
        departDate: depart.toISOString(),
        arriveDate: new Date(arrive.getTime() + 15 * 60000).toISOString(),
        price: basePrice + 600,
        durationMinutes: 165,
        stops: 0,
        cabinClass: travelClass,
        seatsLeft: 5,
      },
    ]
  }

  const swapLocations = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleSearch = async () => {
    try {
      const departDateStr = departureDate ? new Date(departureDate).toISOString().split('T')[0] : undefined
      const { results } = await api.searchFlights({
        from,
        to,
        departDate: departDateStr,
        cabinClass: travelClass,
        passengers: Number(travellers) || 1,
      })
      const finalResults = results && results.length > 0 ? results : buildMockFlights()
      toast.success(`${finalResults.length} flights found`)
      setResults(finalResults)
      navigate('/flights/results', { state: { results: finalResults } })
    } catch (e:any) {
      const fallback = buildMockFlights()
      toast.message('Showing sample results', { description: e?.message || 'Backend not reachable' })
      setResults(fallback)
      navigate('/flights/results', { state: { results: fallback } })
    }
  }

  return (
    <>
    <div className="bg-card rounded-b-2xl border-t-0 border border-border shadow-medium p-6">
      {/* Trip Type Selection */}
      <div className="mb-6">
        <RadioGroup value={tripType} onValueChange={setTripType} className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-way" id="one-way" />
            <Label htmlFor="one-way">One Way</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="round-trip" id="round-trip" />
            <Label htmlFor="round-trip">Round Trip</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multi-city" id="multi-city" />
            <Label htmlFor="multi-city">Multi City</Label>
          </div>
        </RadioGroup>
        <div className="mt-2 text-right">
          <span className="text-sm text-muted-foreground">Book International and Domestic Flights</span>
        </div>
      </div>

      {/* Main Search Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* From */}
        <div className="lg:col-span-3">
          <Label className="text-sm font-medium mb-2 block">From</Label>
          <div className="relative">
            <Input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Button
                variant="ghost"
                size="sm"
                onClick={swapLocations}
                className="h-6 w-6 p-0 hover:bg-primary/10"
              >
                <ArrowLeftRight className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">DEL, Delhi Airport India</div>
        </div>

        {/* To */}
        <div className="lg:col-span-3">
          <Label className="text-sm font-medium mb-2 block">To</Label>
          <Input
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <div className="text-xs text-muted-foreground mt-1">BOM, Chhatrapati Shivaji International...</div>
        </div>

        {/* Departure Date */}
        <div className="lg:col-span-2">
          <Label className="text-sm font-medium mb-2 block">Departure</Label>
          <Popover open={isDepartureDateOpen} onOpenChange={setIsDepartureDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <div>
                  <div className="font-semibold">
                    {departureDate ? format(departureDate, "dd") : "21"} Sep'25
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {departureDate ? format(departureDate, "EEEE") : "Sunday"}
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={(date) => {
                  setDepartureDate(date)
                  setIsDepartureDateOpen(false)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Return Date */}
        <div className="lg:col-span-2">
          <Label className="text-sm font-medium mb-2 block">Return</Label>
          <Popover open={isReturnDateOpen} onOpenChange={setIsReturnDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                disabled={tripType === 'one-way'}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <div>
                  <div className="font-semibold">
                    {tripType === 'one-way' 
                      ? 'Tap to add a return' 
                      : returnDate 
                        ? format(returnDate, "dd MMM'yy") 
                        : "Select date"
                    }
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tripType === 'one-way' ? 'date for bigger' : ''}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tripType === 'one-way' ? 'discounts' : ''}
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={(date) => {
                  setReturnDate(date)
                  setIsReturnDateOpen(false)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Travellers & Class */}
        <div className="lg:col-span-2">
          <Label className="text-sm font-medium mb-2 block">Travellers & Class</Label>
          <Select value={`${travellers}-${travelClass}`} onValueChange={(value) => {
            const [t, c] = value.split('-')
            setTravellers(t)
            setTravelClass(c)
          }}>
            <SelectTrigger>
              <SelectValue>
                <div>
                  <div className="font-semibold flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {travellers} Traveller
                  </div>
                  <div className="text-xs text-muted-foreground">{travelClass}/Premium Economy</div>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-Economy">1 Traveller, Economy</SelectItem>
              <SelectItem value="2-Economy">2 Travellers, Economy</SelectItem>
              <SelectItem value="1-Business">1 Traveller, Business</SelectItem>
              <SelectItem value="2-Business">2 Travellers, Business</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Special Fares */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Label className="text-sm font-medium">Select a special fare</Label>
          <Badge className="ml-2 bg-success text-white text-xs">EXTRA SAVINGS</Badge>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {fareOptions.map((option) => (
            <div
              key={option.id}
              className={`relative p-3 rounded-lg border cursor-pointer transition-colors ${
                fareType === option.id 
                  ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setFareType(option.id)}
            >
              <div className="flex items-start space-x-2">
                <div className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
                  fareType === option.id ? 'border-primary bg-primary' : 'border-border'
                } flex items-center justify-center`}>
                  {fareType === option.id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                  {option.discount && (
                    <div className="text-xs text-success font-medium">{option.discount}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Options & Search */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start space-x-2">
          <Checkbox id="delay-protection" />
          <div>
            <Label htmlFor="delay-protection" className="text-sm font-medium cursor-pointer">
              Add Flight Delay Protection
            </Label>
            <div className="text-xs text-muted-foreground">
              Get compensation for delays of 1 hour or more 
              <Button variant="link" className="h-auto p-0 ml-1 text-xs text-primary">
                View Details
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4" />
            <span>Flight Tracker</span>
            <Badge className="bg-primary text-primary-foreground text-xs">new</Badge>
          </Button>
          
          <Button 
            onClick={handleSearch}
            className="bg-gradient-primary text-white px-8 py-6 text-lg font-medium min-w-[120px]"
            size="lg"
          >
            SEARCH
          </Button>
        </div>
      </div>
    </div>

    {/* Results */}
    {results.length > 0 && (
      <div className="mt-6 bg-card rounded-xl border border-border shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Flight Results</h3>
          <div className="text-sm text-muted-foreground">{results.length} options</div>
        </div>
        <div className="space-y-3">
          {results.map((f: any) => (
            <div key={f._id} className="p-3 rounded-lg border border-border flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <img src={getAirlineLogo(f.airline) || defaultFlightImage} alt={f.airline}
                  className="h-10 w-10 object-contain rounded bg-muted/20" />
                <div className="font-medium">{f.airline} • {f.flightNumber}</div>
                <div className="text-sm text-muted-foreground">{f.from} → {f.to}</div>
                <div className="text-xs text-muted-foreground">{Math.round((new Date(f.arriveDate).getTime()-new Date(f.departDate).getTime())/60000) || f.durationMinutes} mins • {f.stops || 0} stops • {f.cabinClass}</div>
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
      </div>
    )}
    </>
  )
}

export default FlightBookingForm