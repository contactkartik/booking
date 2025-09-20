import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { CalendarIcon, Users } from 'lucide-react'
import { format } from 'date-fns'

const HotelBookingForm = () => {
  const [location, setLocation] = useState('')
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [guests, setGuests] = useState('1')
  const [isCheckInOpen, setIsCheckInOpen] = useState(false)
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false)

  const guestOptions = ['1 Guest', '2 Guests', '3-5 Guests', '6-10 Guests', '10+ Guests']

  const handleSearch = () => {
    console.log('Hotel search:', {
      location,
      checkInDate,
      checkOutDate,
      guests
    })
  }

  return (
    <div className="bg-card rounded-b-2xl border-t-0 border border-border shadow-medium p-6 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Location */}
        <div className="lg:col-span-3">
          <Label className="text-sm font-medium mb-2 block">Location</Label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city or hotel name"
          />
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
  )
}

export default HotelBookingForm
