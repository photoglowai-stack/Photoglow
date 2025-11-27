import { memo } from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { SocialProof } from '../landing/SocialProof';
import { HowItWorks } from './HowItWorks';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { FAQ } from './FAQ';
import { CategoryTestimonials } from './Testimonials';
import { categoryPagesConfig, CategoryPageConfig } from '../categoryPagesConfig';

interface CategoryUniversalPageProps {
  categoryId: string;
  onBack?: () => void;
  onGetStarted?: () => void;
}

/**
 * Universal Category Page Component
 * Follows EXACT structure of main landing page:
 * - Hero Section (dynamically colored)
 * - Social Proof (reused from landing)
 * - Before/After Comparison
 * - How It Works (reused structure)
 * - Gallery / Examples
 * - Testimonials (category-specific)
 * - FAQ (category-specific)
 * - Final CTA
 */
export const CategoryUniversalPage = memo(function CategoryUniversalPage({ 
  categoryId, 
  onBack,
  onGetStarted 
}: CategoryUniversalPageProps) {
  const config: CategoryPageConfig | undefined = categoryPagesConfig[categoryId];
  
  if (!config) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Category not found: {categoryId}</p>
      </div>
    );
  }

  const { colors, title, subtitle, heroImage, beforeAfterExamples, additionalImages, keywords, faqItems, badge } = config;

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      // Default: scroll to pricing or show signup modal
      console.log('Get started clicked for category:', categoryId);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* ========================================
          HERO SECTION - Matches Landing Page
          ======================================== */}
      <section className="min-h-screen bg-black pt-8 md:pt-12 pb-6 md:pb-8 relative overflow-hidden">
        {/* Dynamic gradient background orbs - Category colors */}
        <div 
          className="absolute top-0 left-1/4 w-[900px] h-[900px] rounded-full blur-3xl opacity-25"
          style={{ 
            background: `radial-gradient(circle, ${colors.primary}40 0%, ${colors.primary}20 40%, transparent 70%)`,
            animation: 'orb-pulse 8s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute top-1/3 right-1/5 w-[800px] h-[800px] rounded-full blur-3xl opacity-25"
          style={{ 
            background: `radial-gradient(circle, ${colors.secondary}40 0%, ${colors.secondary}20 40%, transparent 70%)`,
            animation: 'orb-pulse-purple 10s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />

        {/* Back button */}
        {onBack && (
          <div className="absolute top-4 left-4 z-50">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center pt-16 md:pt-20 lg:pt-24 pb-4 md:pb-6">
            {/* Badge - Same style as landing page */}
            <div className="flex justify-center animate-in fade-in zoom-in-95 duration-700 delay-200 mb-8">
              <Badge 
                className="text-white border-0 shadow-lg text-sm md:text-base px-5 py-2.5 rounded-full"
                style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}
              >
                <Star className="w-4 h-4 md:w-5 md:h-5 mr-2 fill-white" />
                {badge}
              </Badge>
            </div>

            {/* H1 - SEO optimized with gradient */}
            <div className="space-y-10 text-center max-w-6xl px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight">
                <span className="text-white">{title}</span>
                <br />
                <span 
                  className="inline-block bg-clip-text text-transparent animate-shimmer bg-gradient-to-r"
                  style={{ 
                    backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.secondary}, ${colors.primary})`,
                    backgroundSize: '200% auto',
                  }}
                >
                  {subtitle}
                </span>
              </h1>

              {/* H2 - Benefit-driven subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                Upload your selfies and transform them into stunning {title.toLowerCase()} in minutes — no studio, no photographer needed.
              </p>

              {/* CTA Buttons - Same layout as landing */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="text-lg px-8 py-6 md:px-10 md:py-7 shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 text-white border-0"
                  style={{ 
                    background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                    boxShadow: `0 0 30px ${colors.glowColor}`,
                  }}
                >
                  <Star className="mr-2 w-5 h-5 fill-white" />
                  Start Creating Now
                </Button>
              </div>

              {/* Hero Image - Large central image */}
              <div className="pt-8 md:pt-12 animate-in fade-in zoom-in-95 duration-1000 delay-700">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto" style={{ boxShadow: `0 0 60px ${colors.glowColor}` }}>
                  <ImageWithFallback
                    src={heroImage}
                    alt={`${title} ${subtitle} example`}
                    className="w-full h-auto"
                  />
                  <div 
                    className="absolute inset-0 border-2 rounded-2xl"
                    style={{ borderColor: `${colors.primary}40` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SOCIAL PROOF - Identical to Landing Page
          ======================================== */}
      <SocialProof />

      {/* ========================================
          BEFORE/AFTER COMPARISON SECTION
          ======================================== */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Real Transformations from<br />
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r"
                style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}
              >
                Selfies to {title}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See how our AI transforms casual photos into professional {title.toLowerCase()}
            </p>
          </div>

          {/* Before/After Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {beforeAfterExamples.map((example, index) => (
              <div
                key={index}
                className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid grid-cols-2 gap-2">
                  {/* Before */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={example.before}
                      alt="Original selfie"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 px-3 py-1 rounded-full text-xs">
                      Before
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={example.after}
                      alt={`Generated ${title}`}
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs text-white"
                      style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}
                    >
                      After
                    </div>
                  </div>
                </div>
                
                {/* Improvement badge */}
                <div className="text-center">
                  <Badge 
                    className="text-sm border-0"
                    style={{ 
                      background: `linear-gradient(to right, ${colors.primary}20, ${colors.secondary}20)`,
                      color: colors.primary 
                    }}
                  >
                    {example.improvement} Better
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          HOW IT WORKS - Reused Structure
          ======================================== */}
      <HowItWorks />

      {/* ========================================
          GALLERY / EXAMPLE SECTION
          ======================================== */}
      <section className="py-12 md:py-16 relative overflow-hidden bg-black">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Explore {title}<br />
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r"
                style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}
              >
                Photo Examples
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover the variety of styles and quality our AI can create
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {additionalImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer animate-in fade-in zoom-in-95 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${title} example ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div 
                  className="absolute inset-0 border-2 border-transparent group-hover:border-opacity-50 rounded-2xl transition-all duration-300"
                  style={{ borderColor: `${colors.primary}00`, '--hover-border': colors.primary } as React.CSSProperties}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          TESTIMONIALS - Category Specific
          ======================================== */}
      <CategoryTestimonials categoryId={categoryId} accentColor={colors.primary} />

      {/* ========================================
          FAQ - Category Specific
          ======================================== */}
      <FAQ categoryId={categoryId} accentColor={colors.primary} />

      {/* ========================================
          FINAL CTA SECTION
          ======================================== */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-black">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div 
            className="rounded-3xl p-1"
            style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}
          >
            <div className="bg-black rounded-3xl p-12 md:p-16 space-y-6">
              <h3 className="text-3xl md:text-5xl font-bold text-white">
                Ready to Create Your<br />
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r"
                  style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}
                >
                  {title} {subtitle}?
                </span>
              </h3>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join thousands of users creating stunning AI photos. Start your transformation today.
              </p>
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="text-lg px-10 py-7 shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 text-white border-0"
                style={{ 
                  background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                  boxShadow: `0 0 30px ${colors.glowColor}`,
                }}
              >
                <Star className="mr-2 w-5 h-5 fill-white" />
                Start Creating {title} Now
              </Button>

              {/* SEO Keywords display (hidden but in DOM for SEO) */}
              <div className="sr-only">
                Keywords: {keywords.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
