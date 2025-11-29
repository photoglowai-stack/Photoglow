import { Button } from './ui/button';
import { ArrowRight, Star } from 'lucide-react';
import { Badge } from './ui/badge';

interface SimpleCategoryHeroProps {
  title: string;
  highlightedWord: string; // The word to highlight in gradient
  subtitle: string;
  onGenerateNow: () => void;
  badgeText?: string;
}

export function SimpleCategoryHero({
  title,
  highlightedWord,
  subtitle,
  onGenerateNow,
  badgeText = "#1 AI Photo Generator"
}: SimpleCategoryHeroProps) {
  // Split title to highlight specific word
  const titleParts = title.split(highlightedWord);
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 text-center">
      {/* Badge - CSS animation */}
      <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 px-6 py-2.5 text-sm md:text-base rounded-full shadow-lg">
          <Star className="w-4 h-4 mr-2 fill-current" />
          {badgeText}
        </Badge>
      </div>

      {/* Title with gradient highlight - CSS animation */}
      <h1
        className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100"
        style={{ fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif' }}
      >
        <span className="text-white">
          {titleParts[0]}
        </span>
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">
          {highlightedWord}
        </span>
        <span className="text-white">
          {titleParts[1]}
        </span>
      </h1>

      {/* Subtitle - CSS animation */}
      <p className="text-base md:text-xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        {subtitle}
      </p>

      {/* CTA Button - CSS animation */}
      <div className="mb-8 animate-in fade-in zoom-in-95 duration-700 delay-300">
        <Button
          onClick={onGenerateNow}
          className="h-14 md:h-16 px-8 md:px-10 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:via-purple-700 hover:to-pink-600 text-white text-base md:text-lg rounded-full group relative overflow-hidden transition-all duration-300 hover:scale-105"
          style={{
            boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4), 0 12px 48px rgba(147, 51, 234, 0.3)',
          }}
        >
          {/* Shimmer effect - CSS animation */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ animation: 'diagonal-shimmer 4s ease-in-out infinite' }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            Create Your AI Photos Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </div>

      {/* Social Proof - Google & Trustpilot - CSS animation */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-sm md:text-base text-gray-300 animate-in fade-in duration-700 delay-400">
        <span className="font-medium">6,800+ total reviews on</span>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full shadow-sm border border-white/20 hover:bg-white/15 transition-colors">
            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-semibold text-white">4.8★</span>
          </div>
          <span className="text-gray-400 hidden sm:inline">and</span>
          <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full shadow-sm border border-white/20 hover:bg-white/15 transition-colors">
            <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#00B67A">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="font-semibold text-white">4.8★</span>
          </div>
        </div>
      </div>
    </div>
  );
}
