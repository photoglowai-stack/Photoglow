import { Card } from '../ui/card';
import { Star } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { categoryPagesConfig } from '../categoryPagesConfig';

interface CategoryTestimonialsProps {
  categoryId: string;
  accentColor?: string;
  backgroundColor?: string;
}

export function CategoryTestimonials({ 
  categoryId,
  accentColor = '#EC4899',
  backgroundColor = '#0A0A0F'
}: CategoryTestimonialsProps) {
  const config = categoryPagesConfig[categoryId];
  
  if (!config) {
    return null;
  }

  const testimonials = config.testimonials || [];
  const categoryName = `${config.title} ${config.subtitle}`;
  const isBlueTheme = accentColor === '#0A66C2';

  // Determine gradient colors based on accentColor
  const getGradientColors = () => {
    // LinkedIn Blue theme
    if (isBlueTheme) {
      return 'from-blue-600/10 via-blue-500/10 to-blue-400/10';
    }
    // Default pink/purple theme
    return 'from-pink-500/10 via-purple-600/10 to-cyan-500/10';
  };

  const getBorderHoverClass = () => {
    if (isBlueTheme) {
      return 'hover:border-blue-500/30';
    }
    return 'hover:border-pink-500/30';
  };

  const getGlowEffectClass = () => {
    if (isBlueTheme) {
      return 'from-blue-600/15 via-blue-500/15 to-transparent';
    }
    return 'from-pink-500/15 via-purple-600/15 to-transparent';
  };

  const getAccentTextClass = () => {
    if (isBlueTheme) {
      return 'text-blue-400';
    }
    return 'text-pink-400';
  };

  return (
    <section 
      className="py-20 px-6 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Breathing gradient background animation - CSS */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${getGradientColors()} animate-gradient`}
          style={{ backgroundSize: '400% 400%' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section - CSS animation */}
        <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-800">
          <h2 className="text-4xl md:text-5xl text-white">
            Loved by Creators, Professionals & Innovators{' '}
            <span className="inline-block">✨</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Thousands of people use {categoryName} worldwide — real results from real users.
          </p>
        </div>

        {/* Testimonials Grid - CSS stagger */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group animate-in fade-in slide-in-from-bottom-10 duration-600 hover:-translate-y-1.5 transition-transform"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className={`p-6 h-full bg-[#18181B] border-2 border-white/10 transition-all duration-500 rounded-2xl relative overflow-hidden backdrop-blur-sm ${getBorderHoverClass()}`}>
                {/* Glow effect on hover - CSS */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGlowEffectClass()} rounded-2xl blur-xl`} />
                </div>

                <div className="space-y-4 relative z-10">
                  {/* 5 Star Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="hover:scale-120 hover:rotate-15 transition-transform duration-200"
                      >
                        <Star className="w-5 h-5 fill-[#FACC15] text-[#FACC15]" />
                      </div>
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-white text-lg leading-relaxed min-h-[120px]">
                    "{testimonial.text}"
                  </p>

                  {/* User Info */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-3">
                      {testimonial.image && (
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-semibold text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA - CSS animation */}
        <div className="text-center mt-12 animate-in fade-in duration-800 delay-400">
          <p className="text-gray-400">
            Join thousands of satisfied users worldwide{' '}
            <span className={getAccentTextClass()}>→</span>
          </p>
        </div>
      </div>
    </section>
  );
}
