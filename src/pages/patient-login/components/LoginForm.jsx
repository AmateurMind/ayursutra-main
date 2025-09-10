import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDemoAccount, setSelectedDemoAccount] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
    // Clear demo account selection when user types manually
    if (selectedDemoAccount) setSelectedDemoAccount(null);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!formData?.email || !formData?.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await signIn(formData?.email, formData?.password);
      
      if (authError) {
        setError(authError?.message || 'Failed to sign in');
        return;
      }

      if (data?.user) {
        navigate('/patient-dashboard');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (email, password, accountType) => {
    setFormData({ email, password });
    setSelectedDemoAccount(accountType);
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Welcome Back to AyurSutra
        </h1>
        <p className="font-body text-text-secondary">
          Sign in to continue your wellness journey
        </p>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="font-body text-sm text-error">{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="font-body text-sm font-medium text-foreground">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            disabled={loading}
            className={`w-full ${
              selectedDemoAccount ? 'bg-green-50 border-green-200' : ''
            }`}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="font-body text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData?.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              disabled={loading}
              className={`w-full pr-10 ${
                selectedDemoAccount ? 'bg-green-50 border-green-200' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground"
              disabled={loading}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className={`w-full ${
            selectedDemoAccount ? 'border-green-200' : ''
          }`}
          iconName={loading ? 'Loader2' : 'LogIn'}
          iconPosition="left"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      {/* Demo Credentials Section */}
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <h3 className="font-body text-sm font-medium text-foreground mb-3">
          Demo Credentials (Click to auto-fill)
        </h3>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleDemoLogin('patient@ayursutra.com', 'patient123', 'patient')}
            className={`w-full text-left p-2 rounded border border-border transition-colors ${
              selectedDemoAccount === 'patient'
                ? 'bg-green-100 hover:bg-green-200 border-green-300'
                : 'bg-card hover:bg-muted/70'
            }`}
            disabled={loading}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm font-medium text-foreground">Patient Account</p>
                <p className="font-body text-xs text-text-secondary">patient@ayursutra.com / patient123</p>
              </div>
              <Icon name="User" size={16} className="text-primary" />
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => handleDemoLogin('practitioner@ayursutra.com', 'practitioner123', 'practitioner')}
            className={`w-full text-left p-2 rounded border border-border transition-colors ${
              selectedDemoAccount === 'practitioner'
                ? 'bg-green-100 hover:bg-green-200 border-green-300'
                : 'bg-card hover:bg-muted/70'
            }`}
            disabled={loading}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm font-medium text-foreground">Practitioner Account</p>
                <p className="font-body text-xs text-text-secondary">practitioner@ayursutra.com / practitioner123</p>
              </div>
              <Icon name="Stethoscope" size={16} className="text-secondary" />
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => handleDemoLogin('admin@ayursutra.com', 'admin123', 'admin')}
            className={`w-full text-left p-2 rounded border border-border transition-colors ${
              selectedDemoAccount === 'admin'
                ? 'bg-green-100 hover:bg-green-200 border-green-300'
                : 'bg-card hover:bg-muted/70'
            }`}
            disabled={loading}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm font-medium text-foreground">Admin Account</p>
                <p className="font-body text-xs text-text-secondary">admin@ayursutra.com / admin123</p>
              </div>
              <Icon name="Shield" size={16} className="text-warning" />
            </div>
          </button>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            className="font-body text-primary hover:text-primary/80 underline"
            disabled={loading}
          >
            Forgot Password?
          </button>
          <button
            type="button"
            onClick={() => navigate('/patient-registration')}
            className="font-body text-primary hover:text-primary/80 underline"
            disabled={loading}
          >
            Create Account
          </button>
        </div>
        
        <div className="pt-4 border-t border-border">
          <p className="font-body text-xs text-text-secondary">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;