import { 
  Plane, 
  Building, 
  Home, 
  Package,
  Train,
  Bus,
  Car,
  MapPin,
  FileText,
  Ship,
  CreditCard,
  Shield
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const TravelServices = ({ activeService, setActiveService }) => {
  const services = [
    { icon: Plane, label: 'Flights' },
    { icon: Building, label: 'Hotels' },
    { icon: Home, label: 'Homestays & Villas' },
    { icon: Package, label: 'Holiday Packages', badge: 'new' },
    { icon: Train, label: 'Trains' },
    { icon: Bus, label: 'Buses' },
    { icon: Car, label: 'Cabs' },
    { icon: CreditCard, label: 'Forex Card & Currency' },
    { icon: Shield, label: 'Travel Insurance' }
  ]

  return (
    <div className="bg-card rounded-t-2xl border border-border shadow-medium">
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(110px,1fr))]">
        {services.map((service, index) => (
          <div 
            key={service.label}
            className={`relative flex flex-col items-center p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
              activeService === service.label ? 'border-b-2 border-primary bg-primary/5' : ''
            }`}
            onClick={() => setActiveService(service.label)}
          >
            {service.badge && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 text-xs px-1 py-0 h-4 bg-primary text-primary-foreground"
              >
                {service.badge}
              </Badge>
            )}
            <service.icon className="h-8 w-8 mb-2 text-muted-foreground" />
            <span className="text-xs text-center font-medium text-foreground leading-tight">
              {service.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TravelServices