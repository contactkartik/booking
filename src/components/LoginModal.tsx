import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
}

const LoginModal = ({ isOpen, onClose, onLogin, onSignup }: LoginModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">{isSignup ? 'Create Account' : 'Login'}</h2>
        {isSignup && (
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="mb-3"
          />
        )}
        <Input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-3"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-4"
        />
        <Button
          className="w-full mb-2"
          onClick={() => {
            if (isSignup) {
              onSignup(name, email, password);
            } else {
              onLogin(email, password);
            }
          }}
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </Button>
        <div className="flex justify-between text-xs">
          <button className="text-primary" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Already have an account?' : 'Create Account'}
          </button>
          <button className="text-muted-foreground" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
