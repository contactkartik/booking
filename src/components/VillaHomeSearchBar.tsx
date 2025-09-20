import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { CalendarIcon, Users } from 'lucide-react'
import { format } from 'date-fns'

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

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-0 items-stretch border">
      <div className="flex-1 min-w-[180px] border-r px-4 py-2">
        <Label className="text-sm font-medium mb-1 block">City, Property Name Or Location</Label>
        <div className="font-bold text-3xl mb-1">{location}</div>
        <div className="text-muted-foreground text-sm">India</div>
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
    </div>
  )
}
