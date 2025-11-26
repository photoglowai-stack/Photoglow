import { Camera, X } from 'lucide-react';
import { Button } from '../ui/button';

interface CategoryPageHeaderProps {
  onBack: () => void;
  onGenerateNow: () => void; // This now redirects to pricing
  onLogoClick?: () => void;
}

export function CategoryPageHeader({ onBack, onGenerateNow, onLogoClick }: CategoryPageHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/80 border-b border-purple-500/20">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* PhotoGlow Logo - Left */}
          <button 
            onClick={onLogoClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Return to PhotoGlow home"
          >
            <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            <span className="text-lg sm:text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              PhotoGlow
            </span>
          </button>

          {/* Right Side - Generate Button + Close */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Generate This Pic Now Button - Shimmer CSS */}
            <Button
              onClick={onGenerateNow}
              className="h-9 sm:h-10 px-4 sm:px-6 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:via-purple-700 hover:to-pink-600 text-white text-xs sm:text-sm rounded-full relative overflow-hidden transition-all duration-300 group hover:scale-105"
              style={{
                boxShadow: '0 4px 16px rgba(236, 72, 153, 0.4)',
              }}
            >
              {/* Shimmer effect - réutilise diagonal-shimmer CSS */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{ animation: 'diagonal-shimmer 4s ease-in-out infinite' }}
              />
              <span className="relative z-10">
                Generate This Pic Now
              </span>
            </Button>

            {/* Close Button */}
            <button
              onClick={onBack}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
