import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { api } from '@/lib/api';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.adminLogin(password);
      if (response.token) {
        localStorage.setItem('admin_token', response.token);
        toast.success('Admin login successful');
        navigate('/admin/dashboard');
      } else {
        throw new Error('Login failed to return a token');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-sm p-6 border rounded-xl bg-card">
        <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>
        <div className="space-y-4">
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              onKeyUp={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
