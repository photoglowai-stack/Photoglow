import { useState, memo } from 'react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Star, Sparkles, Camera, ShoppingBag } from 'lucide-react';
import { ScrollingMosaic } from '../shared/ScrollingMosaic';

interface HeroSectionProps {
  onStartForm: (gender: 'male' | 'female') => void;
  onExploreModels: () => void;
  onPhotoClick?: (photoIndex: number, photoUrl: string) => void;
}

// Memoized HeroSection - Animations CSS natives optimisées
export const HeroSection = memo(function HeroSection({ onStartForm, onExploreModels, onPhotoClick }: HeroSectionProps) {
  const [selectedGender] = useState<'male' | 'female'>('male');

  return (
    <section className="min-h-screen bg-black pt-8 md:pt-12 pb-6 md:pb-8 relative overflow-hidden">
      {/* Animated floating particles (embers/ash) - Réduit de 35 à 10 pour perf */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-pink-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${3 + Math.random() * 4}s ease-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              '--tx': `${Math.random() * 50 - 25}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      
      {/* Enhanced luminous background orbs - Pink/Purple theme */}
      <div 
        className="absolute top-0 left-1/4 w-[900px] h-[900px] rounded-full blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, rgba(236, 72, 153, 0.15) 40%, transparent 70%)',
          animation: 'orb-pulse 8s ease-in-out infinite',
          '--tx': '50px',
          '--ty': '30px',
        } as React.CSSProperties}
      />
      <div 
        className="absolute top-1/3 right-1/5 w-[800px] h-[800px] rounded-full blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, rgba(147, 51, 234, 0.15) 40%, transparent 70%)',
          animation: 'orb-pulse-purple 10s ease-in-out infinite',
          animationDelay: '2s',
          '--tx': '-40px',
          '--ty': '40px',
        } as React.CSSProperties}
      />
      <div 
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
        style={{ 
          background: 'radial-gradient(circle, rgba(219, 39, 119, 0.2) 0%, rgba(219, 39, 119, 0.1) 40%, transparent 70%)',
          animation: 'orb-pulse-pink 12s ease-in-out infinite',
          animationDelay: '4s',
          '--tx': '30px',
          '--ty': '-30px',
        } as React.CSSProperties}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center pt-16 md:pt-20 lg:pt-24 pb-4 md:pb-6">
          {/* Hero Text Content */}
          <div className="space-y-10 text-center max-w-6xl px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-8">
              <div className="flex justify-center animate-in fade-in zoom-in-95 duration-700 delay-200">
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-lg text-sm md:text-base px-5 py-2.5 rounded-full">
                  <Star className="w-4 h-4 md:w-5 md:h-5 mr-2 fill-white" />
                  #1 AI Photo Generator
                </Badge>
              </div>
              
              {/* H1 with gradient shimmer animation - Fully responsive */}
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[96px] font-bold text-white leading-[1.1] tracking-tight px-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
                style={{ fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif' }}
              >
                <span className="inline-block">
                  The Most Popular{" "}
                  <span className="relative inline-block bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    AI Photo Generator
                  </span>
                </span>
              </h1>
              
              {/* 3-Column Grid - Remplace le paragraphe */}
              <div className="max-w-5xl mx-auto px-4 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
                  {/* Column 1: Custom Models */}
                  <div className="flex flex-col items-center text-center space-y-3 md:border-r md:border-gray-700/50 md:pr-6 lg:pr-12">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-pink-500/30 flex items-center justify-center mb-2">
                      <Sparkles className="w-7 h-7 text-pink-400" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif' }}>
                      Custom Models
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                      Clone yourself or build a 100% AI influencer.
                    </p>
                  </div>

                  {/* Column 2: Photo & Video */}
                  <div className="flex flex-col items-center text-center space-y-3 md:border-r md:border-gray-700/50 md:pr-6 lg:pr-12">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-2">
                      <Camera className="w-7 h-7 text-purple-400" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif' }}>
                      Photo & Video
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                      Generate any pose, action, or location instantly.
                    </p>
                  </div>

                  {/* Column 3: Brand & Biz */}
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-pink-500/30 flex items-center justify-center mb-2">
                      <ShoppingBag className="w-7 h-7 text-pink-400" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white" style={{ fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif' }}>
                      Brand & Biz
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                      Virtual try-on, product videos & social packs.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button - 68px height, rounded-full */}
              <div className="pt-6 animate-in fade-in zoom-in-95 duration-700 delay-700">
                <Button 
                  className="relative h-14 sm:h-16 md:h-[68px] bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:via-purple-700 hover:to-pink-600 text-white px-6 sm:px-8 md:px-10 lg:px-14 rounded-2xl text-base sm:text-lg md:text-xl overflow-hidden group border-2 border-transparent transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  style={{ 
                    boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4), 0 12px 48px rgba(147, 51, 234, 0.3), 0 0 0 2px rgba(236, 72, 153, 0.3)',
                    fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
                    fontWeight: 700
                  }}
                  onClick={() => onStartForm(selectedGender)}
                >
                  {/* Laser Serpent - Animated Border Trail (Vert néon) */}
                  <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ borderRadius: '1rem' }}
                  >
                    <defs>
                      <linearGradient id="laserGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#A3FF66" />
                        <stop offset="50%" stopColor="#22D3EE" />
                        <stop offset="100%" stopColor="#9333EA" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <rect
                      x="2"
                      y="2"
                      width="calc(100% - 4px)"
                      height="calc(100% - 4px)"
                      rx="16"
                      fill="none"
                      stroke="url(#laserGradient)"
                      strokeWidth="2"
                      strokeDasharray="20 280"
                      filter="url(#glow)"
                      style={{ 
                        mixBlendMode: 'screen',
                        animation: 'laser-dash 2s linear infinite'
                      }}
                    />
                  </svg>

                  {/* Diagonal shimmer effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{ animation: 'diagonal-shimmer 4s ease-in-out infinite' }}
                  />
                  
                  {/* Pulsing outer glow on hover */}
                  <div 
                    className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 rounded-2xl -z-10"
                    style={{ animation: 'glow-pulse 1.5s ease-in-out infinite' }}
                  />
                  
                  {/* Inner glow border effect */}
                  <div className="absolute inset-0 rounded-2xl" 
                    style={{
                      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(147, 51, 234, 0.25) 100%)',
                      mixBlendMode: 'screen'
                    }}
                  />
                  
                  <span className="relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                    Start Creating Now →
                  </span>
                </Button>
                
                {/* Micro-copy sous le bouton */}
                <p className="text-xs md:text-sm text-gray-500 mt-3 animate-in fade-in duration-700 delay-800">
                  No credit card required • Cancel anytime
                </p>
              </div>

              {/* Social Proof - improved styling */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm md:text-base text-gray-300 pt-2 animate-in fade-in duration-700 delay-900">
                <span className="font-medium">6,800+ total reviews on</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full shadow-sm border border-white/20 hover:bg-white/15 transition-colors">
                    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="font-semibold text-white">4.8★</span>
                  </div>
                  <span className="text-gray-400">and</span>
                  <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full shadow-sm border border-white/20 hover:bg-white/15 transition-colors">
                    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#00B67A">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="font-semibold text-white">4.8★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Mosaic - AI Generated Photos */}
          <div className="mt-8 -mx-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1100">
            <ScrollingMosaic onPhotoClick={onPhotoClick} />
          </div>
        </div>
      </div>
    </section>
  );
});
