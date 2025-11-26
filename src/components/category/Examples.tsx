import { LazyImage } from '../shared/LazyImage';
import { SEOHead } from '../shared/SEOHead';
import { Camera, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { CategoryPageHeader } from './CategoryPageHeader';
import { OptimizedAnimatedBackground } from './OptimizedAnimatedBackground';

interface CategoryExamplesPageProps {
  categoryName: string;
  categoryTitle: string;
  description: string;
  examples: string[];
  onBack: () => void;
  onGenerateNow: () => void;
  colorScheme?: {
    gradient1: string;
    gradient2: string;
    gradient3: string;
  };
}

export function CategoryExamplesPage({
  categoryName,
  categoryTitle,
  description,
  examples,
  onBack,
  onGenerateNow,
  colorScheme = {
    gradient1: 'rgba(236, 72, 153, 0.4)',
    gradient2: 'rgba(168, 85, 247, 0.35)',
    gradient3: 'rgba(236, 72, 153, 0.3)'
  }
}: CategoryExamplesPageProps) {
  return (
    <>
      <SEOHead 
        title={`${categoryTitle} - Examples | PhotoGlow`}
        description={description}
        keywords={`${categoryName}, ai photos, examples, gallery`}
      />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Optimized Animated Background */}
        <OptimizedAnimatedBackground colorScheme={colorScheme} />

        {/* Header */}
        <CategoryPageHeader onBack={onBack} onGenerateNow={onGenerateNow} />

        <div className="max-w-7xl mx-auto px-6 py-8 md:py-14 pt-20 md:pt-24">
          {/* Hero Section - CSS animation */}
          <div className="text-center space-y-6 mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-8 duration-800">
            <h1 className="text-4xl md:text-6xl text-white">
              {categoryTitle}{' '}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Examples
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          {/* Examples Grid - CSS stagger + LazyImage */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {examples.map((photo, index) => (
              <div
                key={index}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer animate-in zoom-in-95 fade-in duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <LazyImage
                  src={photo}
                  alt={`${categoryName} Example ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-full">
                    <p className="text-white text-sm">Example #{index + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section - CSS animation */}
          <div className="text-center space-y-8 py-12 animate-in fade-in slide-in-from-bottom-8 duration-600 delay-300">
            <h2 className="text-3xl md:text-5xl text-white">
              Create Your Own{' '}
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Photos
              </span>
            </h2>
            <Button
              onClick={onGenerateNow}
              className="h-16 px-12 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 hover:from-pink-600 hover:via-purple-600 hover:to-pink-700 text-white text-lg rounded-2xl group relative overflow-hidden transition-all duration-300"
              style={{
                boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4), 0 12px 48px rgba(168, 85, 247, 0.3)',
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"
                style={{ transform: 'skewX(-20deg)' }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate My {categoryName} Now
              </span>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-purple-500/10 bg-black/90 backdrop-blur-sm py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Camera className="w-6 h-6 text-purple-400" />
              <span className="text-xl text-white">PhotoGlow</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 PhotoGlow. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
