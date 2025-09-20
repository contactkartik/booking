import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface TravelHeaderProps {
  onLoginClick?: () => void;
  user?: { email: string } | null;
}

const TravelHeader = ({ onLoginClick, user }: TravelHeaderProps) => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold" style={{ color: '#ff8800' }}>BookKaro</span><span className="text-2xl font-bold text-black">India</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" size="sm">List Your Property</Button>
            <Button variant="ghost" size="sm">Introducing myBiz</Button>
            <Button variant="ghost" size="sm">My Trips</Button>
            {user ? (
              <span className="font-semibold text-primary">Welcome, {user.email}</span>
            ) : (
              <Button variant="default" size="sm" className="bg-gradient-primary" onClick={onLoginClick}>
                Login or Create Account
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default TravelHeader