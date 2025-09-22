import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: any };
  const type = state?.type as 'flight' | 'hotel' | undefined;

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-xl mx-auto bg-card border border-border rounded-2xl shadow p-8">
        <div className="text-4xl mb-2">🎉</div>
        <h1 className="text-2xl font-bold mb-2">Thank you for your booking!</h1>
        <p className="text-muted-foreground mb-6">We will contact you shortly with confirmation details and next steps.</p>

        {type && (
          <p className="text-sm text-muted-foreground mb-6">Your {type === 'flight' ? 'flight' : 'stay'} has been received. A confirmation email will follow soon.</p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => navigate('/bookings')} className="bg-primary text-primary-foreground w-full sm:w-auto">Go to My Bookings</Button>
          <Button variant="outline" onClick={() => navigate('/')} className="w-full sm:w-auto">Back to Home</Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
