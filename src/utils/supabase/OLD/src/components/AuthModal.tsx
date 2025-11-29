import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Lock, Camera, AlertCircle, User, X } from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export function AuthModal({ isOpen, onClose, onAuthenticated }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [error, setError] = useState<string>('');

  // Handle guest/demo login
  const handleGuestLogin = () => {
    // Create a fake user session in localStorage
    const fakeUser = {
      id: 'guest-' + Date.now(),
      email: 'guest@photoglow.demo',
      user_metadata: {
        name: 'Demo User'
      },
      created_at: new Date().toISOString()
    };
    
    localStorage.setItem('photoglow_demo_user', JSON.stringify(fakeUser));
    localStorage.setItem('photoglow_guest_credits', '100');
    
    console.log('✅ Guest mode activated:', fakeUser);
    
    toast.success('Welcome to PhotoGlow! 🎉 (Guest Mode)');
    
    // Force reload to trigger auth check
    setTimeout(() => {
      onAuthenticated();
      onClose();
      window.location.reload();
    }, 500);
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });

      if (error) throw error;
      
      toast.success('Redirecting to Google...');
    } catch (error: any) {
      console.error('Google auth error:', error);
      setError(error.message || 'Failed to sign in with Google');
      toast.error('Google authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    setError('');

    try {
      if (authMode === 'signup') {
        // Use server endpoint for signup with automatic email confirmation
        console.log('🔵 Step 1: Calling signup endpoint...');
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/signup`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({ email, password, name }),
          }
        );

        const data = await response.json();
        console.log('🔵 Step 2: Signup response:', data);

        if (!response.ok) {
          console.error('❌ Signup failed:', data.error);
          throw new Error(data.error || 'Failed to create account');
        }

        console.log('✅ Signup succeeded! Now attempting auto sign-in...');

        // Wait a moment for account to be fully created
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Automatically sign in after successful signup
        console.log('🔵 Step 3: Attempting sign-in...');
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          console.error('❌ Auto sign-in failed:', signInError);
          throw signInError;
        }

        console.log('✅ Sign-in succeeded!', signInData);

        if (signInData.session) {
          toast.success('Account created successfully! Welcome to PhotoGlow! 🎉');
          onAuthenticated();
          onClose();
          setEmail('');
          setPassword('');
          setName('');
        }
      } else {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          toast.success('Welcome back! ✨');
          onAuthenticated();
          onClose();
          setEmail('');
          setPassword('');
        }
      }
    } catch (error: any) {
      console.error('Email auth error:', error);
      
      // Better error messages
      let errorMessage = error.message || 'Authentication failed';
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = "Invalid email or password. Don't have an account? Click 'Sign up' below.";
        toast.error("Invalid credentials. Try signing up if you don't have an account yet.");
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'Please check your email to confirm your account.';
        toast.error('Please confirm your email address');
      } else if (error.message?.includes('User already registered')) {
        errorMessage = 'This email is already registered. Try signing in instead.';
        toast.error('Email already exists. Try signing in.');
        setAuthMode('login'); // Switch to login mode
      } else {
        toast.error(authMode === 'signup' ? 'Failed to create account' : 'Failed to sign in');
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success('Password reset email sent! Please check your inbox. 📧');
      setAuthMode('login');
      setEmail('');
    } catch (error: any) {
      console.error('Password reset error:', error);
      setError(error.message || 'Failed to send reset email');
      toast.error('Failed to send password reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[480px] max-h-[95vh] overflow-y-auto bg-gradient-to-b from-gray-900 to-black border border-pink-500/20 rounded-lg shadow-2xl text-white p-5 md:p-6 animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4 text-gray-400" />
          <span className="sr-only">Close</span>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-xl md:text-2xl text-center bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 bg-clip-text text-transparent mb-2">
            {authMode === 'reset' ? 'Reset Password' : authMode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
          </h2>
          <p className="text-gray-400 text-center text-xs md:text-sm px-2">
            {authMode === 'reset' 
              ? 'Enter your email address and we\'ll send you a link to reset your password'
              : authMode === 'login' 
                ? 'Sign in to generate your AI photos and access your gallery'
                : 'Join thousands of users creating stunning AI photos'}
          </p>
        </div>

        <div className="space-y-4 mt-4">
          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {authMode === 'reset' ? (
            /* Password Reset Form */
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-pink-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !email}
                className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:via-purple-700 hover:to-pink-600 text-white border-0 relative overflow-hidden group"
              >
                <span className="relative font-semibold">
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </span>
              </Button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                >
                  Back to{' '}
                  <span className="font-semibold text-pink-400">Sign in</span>
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* GUEST BUTTON - Main CTA */}
              <Button
                onClick={handleGuestLogin}
                className="w-full h-14 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:via-purple-700 hover:to-pink-600 text-white border-0 relative overflow-hidden group shadow-lg shadow-pink-500/30"
              >
                <span className="relative font-bold text-lg">
                  Continue as Guest ✨
                </span>
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-500">Or sign in</span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <Button
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full h-12 bg-white hover:bg-gray-100 text-gray-900 border-0 relative overflow-hidden group transition-all duration-300"
              >
                <div className="relative flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="font-semibold">
                    {isLoading ? 'Connecting...' : 'Continue with Google'}
                  </span>
                </div>
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-500">Or continue with email</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-pink-500"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-pink-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-pink-500"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:via-purple-700 hover:to-pink-600 text-white border-0 relative overflow-hidden group"
                >
                  <span className="relative font-semibold">
                    {isLoading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
                  </span>
                </Button>
              </form>

              {/* Toggle between login/signup */}
              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                >
                  {authMode === 'login' ? (
                    <>
                      Don't have an account?{' '}
                      <span className="font-semibold text-pink-400">Sign up</span>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <span className="font-semibold text-pink-400">Sign in</span>
                    </>
                  )}
                </button>
              </div>

              {/* Password Reset */}
              {authMode === 'login' && (
                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => setAuthMode('reset')}
                    className="text-gray-400 hover:text-pink-400 transition-colors"
                  >
                    Forgot your password?{' '}
                    <span className="font-semibold text-pink-400">Reset password</span>
                  </button>
                </div>
              )}

              {/* Terms and Privacy */}
              <p className="text-xs text-center text-gray-500 pt-2">
                By continuing, you agree to PhotoGlow's{' '}
                <button className="underline hover:text-pink-400 transition-colors">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="underline hover:text-pink-400 transition-colors">
                  Privacy Policy
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}