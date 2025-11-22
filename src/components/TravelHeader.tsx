import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EVENTS_URL } from '@/lib/config'
import { Link } from 'react-router-dom'
import { Plane } from 'lucide-react'

interface TravelHeaderProps {
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  user?: { email: string } | null;
}

const TravelHeader = ({ onLoginClick, onLogoutClick, user }: TravelHeaderProps) => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
              <Plane className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <span className="text-xl sm:text-2xl font-bold" style={{ color: '#ff8800' }}>BookKaro</span>
            <span className="text-xl sm:text-2xl font-bold text-black">India</span>
          </div>
          
          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
            <Button variant="ghost" size="sm">List Your Property</Button>
            <Button variant="ghost" size="sm">Introducing myBiz</Button>
            <Link to="/bookings"><Button variant="ghost" size="sm">My Trips</Button></Link>
            <a
              href={`${EVENTS_URL}?utm_source=bookkaroindia_nav`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600"
            >
              Event Planner
            </a>
            {user ? (
              <>
                <span className="font-semibold text-primary">Welcome, {user.email}</span>
                <Button variant="outline" size="sm" onClick={onLogoutClick}>Logout</Button>
              </>
            ) : (
              <Button variant="default" size="sm" className="bg-gradient-primary" onClick={onLoginClick}>
                Login or Create Account
              </Button>
            )}
          </div>
        </div>
        {/* Mobile actions */}
        <div className="mt-2 sm:mt-3 flex md:hidden items-center justify-between gap-2 sm:gap-3">
          <Link to="/bookings" className="flex-1">
            <Button variant="outline" className="w-full">My Trips</Button>
          </Link>
          <a
            href={`${EVENTS_URL}/book?utm_source=bookkaroindia_nav`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button className="w-full bg-orange-500 hover:bg-orange-600">Event Planner</Button>
          </a>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden xs:inline text-sm font-medium text-primary truncate max-w-[120px]">{user.email}</span>
              <Button variant="secondary" onClick={onLogoutClick}>Logout</Button>
            </div>
          ) : (
            <Button className="bg-gradient-primary" onClick={onLoginClick}>Login</Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default TravelHeader