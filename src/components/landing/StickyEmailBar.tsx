import { useState, useEffect } from 'react';
import { X, Sparkles, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface StickyEmailBarProps {
  onEmailSubmit?: (email: string) => void;
  onStartNow?: () => void;
}

export function StickyEmailBar({ onEmailSubmit, onStartNow }: StickyEmailBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isDismissed, setIsDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // Show bar after scrolling down 100px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  // Countdown timer - resets every 24 hours to stay honest
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset to 24 hours when timer reaches 0
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && onEmailSubmit) {
      onEmailSubmit(email);
    }
    // Redirect to start flow after email submission
    if (onStartNow) {
      onStartNow();
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleStartNow = () => {
    if (onStartNow) {
      onStartNow();
    }
  };

  return (
    <>
      {isVisible && !isDismissed && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 pointer-events-auto animate-in slide-in-from-bottom-full fade-in duration-300"
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/90 to-transparent backdrop-blur-xl pointer-events-none" />

          {/* Main bar */}
          <div className="relative border-t border-purple-500/30 shadow-2xl shadow-purple-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Desktop Layout */}
              <div className="hidden lg:flex items-center justify-between gap-6">
                {/* Left: Email Input */}
                <form onSubmit={handleEmailSubmit} className="flex-1 max-w-md">
                  <div className="relative">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Type your email..."
                      className="w-full h-12 px-4 bg-white/10 border-2 border-purple-500/30 rounded-xl text-white placeholder:text-gray-400 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      required
                    />
                  </div>
                </form>

                {/* Center: Limited Time Offer */}
                <div className="flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-400 animate-pulse" />
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Limited Time Offer:</span>
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                          1 MONTH FREE
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="flex items-center gap-2 pl-4 border-l border-purple-500/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white tabular-nums">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-400 uppercase">Hours</div>
                    </div>
                    <span className="text-2xl text-purple-400">:</span>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white tabular-nums">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-400 uppercase">Mins</div>
                    </div>
                    <span className="text-2xl text-purple-400">:</span>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white tabular-nums">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-400 uppercase">Secs</div>
                    </div>
                  </div>
                </div>

                {/* Right: CTA Button */}
                <Button
                  onClick={handleStartNow}
                  className="h-12 px-8 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold rounded-xl shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 whitespace-nowrap"
                >
                  Start Taking AI Photos Now →
                </Button>
              </div>

              {/* Mobile/Tablet Layout */}
              <div className="lg:hidden space-y-3">
                {/* Offer + Timer */}
                <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider leading-tight">Limited Offer</div>
                      <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 leading-tight">
                        1 MONTH FREE
                      </div>
                    </div>
                  </div>

                  {/* Compact Timer */}
                  <div className="flex items-center gap-1 px-2 py-1 bg-black/40 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-sm font-bold text-white tabular-nums">
                      {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Email + CTA */}
                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email..."
                    className="flex-1 h-11 px-4 bg-white/10 border-2 border-purple-500/30 rounded-xl text-white placeholder:text-gray-400 text-sm focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                  <Button
                    type="submit"
                    className="h-11 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 whitespace-nowrap text-sm"
                  >
                    Start Now →
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
