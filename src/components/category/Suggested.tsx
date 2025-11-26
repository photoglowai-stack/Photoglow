import { LazyImage } from './LazyImage';
import { ArrowRight, Camera, Heart, Palette, Shirt, Zap, Briefcase } from 'lucide-react';

interface SuggestedCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
  excludeCategory?: string;
  accentColor?: string;
}

export function SuggestedCategories({ onSelectCategory, excludeCategory, accentColor = '#EC4899' }: SuggestedCategoriesProps) {
  const isBlueTheme = accentColor === '#0A66C2';
  
  const getGradientClass = () => {
    if (isBlueTheme) {
      return 'from-transparent via-blue-900/10 to-transparent';
    }
    return 'from-transparent via-purple-900/10 to-transparent';
  };

  const getBorderHoverClass = () => {
    if (isBlueTheme) {
      return 'group-hover:border-blue-500/60';
    }
    return 'group-hover:border-purple-500/60';
  };

  const getBoxShadow = () => {
    if (isBlueTheme) {
      return '0 0 30px rgba(10, 102, 194, 0.5), 0 0 60px rgba(96, 165, 250, 0.3)';
    }
    return '0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)';
  };
  
  const categories = [
    {
      id: 'professional',
      title: 'AI Headshots',
      tagline: 'For your professional profile',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1759399093797-997e0c85e85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90JTIwcG9ydHJhaXQlMjBjb25maWRlbnR8ZW58MXx8fHwxNzYwMDk3MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      blurhash: 'L6H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'model',
      title: 'AI Model Photo',
      tagline: 'Runway-ready fashion looks',
      icon: Shirt,
      image: 'https://images.unsplash.com/photo-1717765697681-5a160db970d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdCUyMHN0dWRpbyUyMGJlYXV0aWZ1bHxlbnwxfHx8fDE3NjAwOTcyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      blurhash: 'L8H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'dating',
      title: 'AI Dating Photos',
      tagline: 'Boost your dating success',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1755519024827-fd05075a7200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwcGhvdG8lMjBhdHRyYWN0aXZlJTIwc21pbGV8ZW58MXx8fHwxNzYwMDk3MjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      blurhash: 'L9H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'selfie',
      title: 'AI Selfie Generator',
      tagline: 'Perfect for social media',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1758525866119-8246f9f940ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmaWUlMjBwb3J0cmFpdCUyMGhhcHB5JTIwYXV0aGVudGljfGVufDF8fHx8MTc2MDA5NzIzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      blurhash: 'L7H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'portrait',
      title: 'AI Portrait Generator',
      tagline: 'Create artistic masterpieces',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1758216959230-f447e3ba0abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMHBvcnRyYWl0JTIwY3JlYXRpdmUlMjBsaWdodGluZ3xlbnwxfHx8fDE3NjAwOTcyMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      blurhash: 'L5H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'realistic',
      title: 'AI Realistic Photo',
      tagline: 'Ultra-realistic portraits',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1748500192009-f19ae6606960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeSUyMHJlYWxpc3RpY3xlbnwxfHx8fDE3NjAwOTcyMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      blurhash: 'L4H2j=00~q00009F-;M{00Rj00M{'
    }
  ];

  const filteredCategories = categories.filter(cat => cat.id !== excludeCategory);

  return (
    <div className={`py-16 bg-gradient-to-b ${getGradientClass()}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - CSS animation */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-6 duration-600">
          <h2 className="text-3xl md:text-4xl text-white mb-3">
            Explore Other AI Styles
          </h2>
          <p className="text-lg text-gray-300">
            Discover more ways to transform your photos with AI
          </p>
        </div>

        {/* Grid avec stagger CSS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {filteredCategories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="group cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-500"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl h-64 sm:h-72 md:h-80 lg:h-96 transition-all duration-500 group-hover:shadow-2xl">
                {/* Full-bleed high-quality photo avec LazyImage */}
                <div className="absolute inset-0 pointer-events-none">
                  <LazyImage
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    blurhash={category.blurhash}
                  />
                  {/* Dark overlay gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Neon glow border on hover */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 pointer-events-none ${getBorderHoverClass()}`}>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: getBoxShadow(),
                    }}
                  />
                </div>

                {/* Content overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-6 md:p-7">
                  {/* Tagline */}
                  <p className="text-xs sm:text-sm text-gray-300 mb-2 font-medium tracking-wide">
                    {category.tagline}
                  </p>

                  {/* Large CTA-style title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                    {category.title}
                  </h3>

                  {/* CTA Button Effect - CSS hover */}
                  <div className="flex items-center space-x-2 text-sm sm:text-base text-pink-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    <span className="font-semibold">Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
