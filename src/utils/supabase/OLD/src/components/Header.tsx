import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { Button } from "./ui/button";
import { SimpleDropdown, SimpleDropdownItem, SimpleDropdownLabel, SimpleDropdownSeparator } from "./ui/dropdown-simple";
import { Menu, ArrowRight, User, LogOut, Settings, Sparkles, Coins, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import type { User as SupabaseUser } from '@supabase/supabase-js@2.47.10';
import { fetchCredits } from '../utils/api-client';

interface HeaderProps {
  onShowPricing?: () => void;
  onShowPhotoGlow?: () => void;
  onShowIdeas?: () => void;
  isLandingPage?: boolean;
  onShowAuth?: () => void;
  onShowAdmin?: () => void;
  onShowProfile?: () => void;
  currentPage?: string;
  onShowLanding?: () => void;
}

// Memoized Header component to prevent unnecessary re-renders
export const Header = memo(function Header({ onShowPricing, onShowPhotoGlow, onShowIdeas, isLandingPage, onShowAuth, onShowAdmin, onShowProfile, currentPage, onShowLanding }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for user session
  useEffect(() => {
    // Check for demo user first
    const demoUser = localStorage.getItem('photoglow_demo_user');
    if (demoUser) {
      try {
        const parsedUser = JSON.parse(demoUser);
        setUser(parsedUser as any);
        return;
      } catch (e) {
        console.error('Error parsing demo user:', e);
      }
    }

    // Check for real Supabase user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch credits when user ID changes (not entire user object)
  useEffect(() => {
    const loadCredits = async () => {
      if (!user?.id) {
        setCredits(null);
        return;
      }

      try {
        const creditsBalance = await fetchCredits();
        setCredits(creditsBalance);
      } catch (error) {
        console.error('Error fetching credits:', error);
        setCredits(null);
      }
    };

    loadCredits();
  }, [user?.id]); // Only trigger when user ID changes, not entire user object

  // Keyboard shortcut: A to go to Admin
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Safety check: ensure e.key exists before calling toLowerCase
    if (!e.key) return;
    
    if (e.key.toLowerCase() === 'a' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Don't trigger if user is typing in an input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      
      if (onShowAdmin) {
        onShowAdmin();
      }
    }
  }, [onShowAdmin]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleSignOut = useCallback(async () => {
    try {
      // Remove demo user if exists
      localStorage.removeItem('photoglow_demo_user');
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Signed out successfully');
      setUser(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  }, []);

  // Memoize navLinks to prevent re-creation on every render
  const navLinks = useMemo(() => [
    { label: 'Features', href: '#features' },
    { label: 'Examples', href: '#examples' },
    { label: 'Ideas', onClick: onShowIdeas },
    { label: 'Pricing', onClick: onShowPricing },
    { label: 'Reviews', href: '#testimonials' },
  ], [onShowIdeas, onShowPricing]);

  return (
    <header className={`sticky-header w-full px-4 md:px-6 py-4 flex items-center justify-between bg-black/50 backdrop-blur-md border-b border-purple-500/20 ${scrolled ? 'scrolled' : ''}`}>
      <button 
        onClick={onShowLanding} 
        className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
        aria-label="Go to home page"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">P</span>
        </div>
        <span className="text-white font-bold text-xl">PhotoGlow</span>
      </button>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        {navLinks.map((link) => 
          link.onClick ? (
            <button 
              key={link.label}
              onClick={link.onClick}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ) : (
            <a 
              key={link.label}
              href={link.href} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          )
        )}
      </nav>
      
      {/* Desktop Buttons */}
      <div className="hidden lg:flex items-center space-x-4">
        {/* Credits Badge */}
        {user && credits !== null && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-semibold">{credits}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 border-purple-500/30">
                <p className="text-sm">Available credits</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Admin Button - Always visible */}
        {onShowAdmin && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onShowAdmin}
                  variant="outline"
                  className={`transition-all ${
                    currentPage === 'admin'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-pink-500 text-white hover:from-pink-600 hover:to-purple-700'
                      : 'bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/30 text-pink-300 hover:from-pink-500/20 hover:to-purple-500/20 hover:text-pink-100'
                  }`}
                >
                  <Sparkles className="mr-2 w-4 h-4" />
                  Admin
                  <kbd className="ml-2 px-1.5 py-0.5 text-[10px] bg-black/30 rounded border border-pink-500/30">
                    A
                  </kbd>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 border-pink-500/30">
                <p className="text-sm">Interface de test IA centralisée</p>
                <p className="text-xs text-gray-400 mt-1">Raccourci : Appuyez sur "A"</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {!isLandingPage && onShowPricing && (
          <Button 
            onClick={onShowPricing}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full px-6"
          >
            Take photos like these
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}
        {isLandingPage && !user && (
          <>
            <Button 
              variant="ghost" 
              className="text-white hover:text-pink-400"
              onClick={onShowAuth}
            >
              Sign In
            </Button>
            {onShowPhotoGlow && (
              <Button 
                onClick={onShowPhotoGlow}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                Generate Pics Now
              </Button>
            )}
          </>
        )}
        {user && (
          <SimpleDropdown
            align="end"
            trigger={
              <Button 
                variant="ghost" 
                className="text-white hover:text-pink-400 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <span className="hidden md:inline">{user.email?.split('@')[0]}</span>
              </Button>
            }
          >
            <SimpleDropdownLabel className="text-gray-400">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-white">{user.user_metadata?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </SimpleDropdownLabel>
            <SimpleDropdownSeparator className="bg-purple-500/20" />
            {onShowProfile && (
              <SimpleDropdownItem 
                className="text-gray-300 hover:text-white hover:bg-purple-500/10 cursor-pointer"
                onClick={onShowProfile}
              >
                <User className="mr-2 w-4 h-4" />
                Mon Profil
              </SimpleDropdownItem>
            )}
            <SimpleDropdownItem 
              className="text-gray-300 hover:text-white hover:bg-purple-500/10 cursor-pointer"
            >
              <Settings className="mr-2 w-4 h-4" />
              Settings
            </SimpleDropdownItem>
            <SimpleDropdownSeparator className="bg-purple-500/20" />
            {onShowAdmin && (
              <SimpleDropdownItem 
                className="text-pink-300 hover:text-pink-100 hover:bg-pink-500/10 cursor-pointer" 
                onClick={onShowAdmin}
              >
                <Sparkles className="mr-2 w-4 h-4" />
                Admin Panel
              </SimpleDropdownItem>
            )}
            <SimpleDropdownSeparator className="bg-purple-500/20" />
            <SimpleDropdownItem 
              className="text-gray-300 hover:text-white hover:bg-purple-500/10 cursor-pointer" 
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 w-4 h-4" />
              Sign Out
            </SimpleDropdownItem>
          </SimpleDropdown>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:text-pink-400"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </Button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-[320px] bg-black/95 backdrop-blur-xl border-l border-purple-500/20 overflow-y-auto animate-in slide-in-from-right duration-300">
              {/* Close button */}
              <div className="sticky top-0 bg-black/95 backdrop-blur-xl border-b border-purple-500/20 p-4 flex items-center justify-between">
                <span className="text-white font-semibold">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="flex flex-col p-6 space-y-6">
                {/* User Section */}
                {user && (
                  <div className="pb-4 border-b border-purple-500/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold truncate">{user.user_metadata?.name || 'User'}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                    </div>

                    {/* Credits Mobile */}
                    {credits !== null && (
                      <div className="px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-yellow-400" />
                          <span className="text-white font-semibold">{credits}</span>
                        </div>
                        <span className="text-xs text-gray-400">credits</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => 
                    link.onClick ? (
                      <button 
                        key={link.label}
                        onClick={() => {
                          link.onClick?.();
                          setMobileMenuOpen(false);
                        }}
                        className="text-gray-300 hover:text-white transition-colors text-left py-2.5 px-4 hover:bg-purple-500/10 rounded-lg"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a 
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-300 hover:text-white transition-colors py-2.5 px-4 hover:bg-purple-500/10 rounded-lg"
                      >
                        {link.label}
                      </a>
                    )
                  )}
                </nav>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 pt-4 border-t border-purple-500/20">
                  {onShowAdmin && (
                    <Button 
                      onClick={() => {
                        onShowAdmin();
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 justify-start"
                    >
                      <Sparkles className="mr-2 w-4 h-4" />
                      Admin Panel
                    </Button>
                  )}

                  {!isLandingPage && onShowPricing && (
                    <Button 
                      onClick={() => {
                        onShowPricing();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                      Take photos like these
                    </Button>
                  )}

                  {isLandingPage && !user && (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full bg-transparent border-purple-500/50 text-white hover:bg-purple-500/10"
                        onClick={() => {
                          onShowAuth?.();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                      {onShowPhotoGlow && (
                        <Button 
                          onClick={() => {
                            onShowPhotoGlow();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
                        >
                          Generate Pics Now
                        </Button>
                      )}
                    </>
                  )}
                </div>

                {/* User Account Menu */}
                {user && (
                  <div className="pt-4 border-t border-purple-500/20">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3 px-4">Account</p>
                    <div className="flex flex-col space-y-1">
                      {onShowProfile && (
                        <button 
                          className="text-gray-300 hover:text-white transition-colors text-left py-2.5 px-4 hover:bg-purple-500/10 rounded-lg flex items-center"
                          onClick={() => {
                            onShowProfile();
                            setMobileMenuOpen(false);
                          }}
                        >
                          <User className="mr-3 w-4 h-4" />
                          Mon Profil
                        </button>
                      )}
                      <button className="text-gray-300 hover:text-white transition-colors text-left py-2.5 px-4 hover:bg-purple-500/10 rounded-lg flex items-center">
                        <Settings className="mr-3 w-4 h-4" />
                        Settings
                      </button>
                      <div className="border-t border-purple-500/20 my-2"></div>
                      <button 
                        className="text-red-300 hover:text-red-100 hover:bg-red-500/10 transition-colors text-left py-2.5 px-4 rounded-lg flex items-center" 
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="mr-3 w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
});
