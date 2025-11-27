import image_ffe26301c2af5df48a3eace6ad54f9fb2585a75c from '../../assets/ffe26301c2af5df48a3eace6ad54f9fb2585a75c.png';
import { memo, useCallback } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

interface CategoryShowcaseProps {
  onCategoryClick?: (categoryId: string) => void;
  onViewExamples?: (categoryId: string) => void;
}

// Static data moved outside component to prevent re-creation
const categories = [
    {
      id: 'professional',
      emoji: '🧠',
      title: 'AI Headshots',
      description: 'Generate professional portraits and realistic AI headshots for LinkedIn, business profiles, and corporate use. Our AI headshot generator creates photorealistic headshot photos with studio-quality lighting. Perfect for virtual headshots, AI portrait photos, and professional profile pictures. Transform casual selfies into polished AI-generated headshots with our advanced AI portrait face generator.',
      images: [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop'
      ],
      photoCount: '32 PHOTOS',
      weeklyCount: '30K RAN THIS WEEK',
      gradient: 'from-blue-500/20 to-indigo-500/20',
      badge: 'bg-blue-500'
    },
    {
      id: 'linkedin-headshots',
      emoji: '💼',
      title: 'LinkedIn Headshots',
      description: 'Your LinkedIn profile is your digital first impression—make it count with a studio-quality professional headshot that enhances your credibility and personal brand. Photo AI helps you create polished, high-quality headshots that meet the standards of recruiters, hiring managers, and business professionals.',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop'
      ],
      photoCount: '38 PHOTOS',
      weeklyCount: '35K RAN THIS WEEK',
      gradient: 'from-blue-600/20 to-cyan-500/20',
      badge: 'bg-blue-600'
    },
    {
      id: 'tinder',
      emoji: '❤️',
      title: 'Tinder Photos',
      description: 'Look your best while staying true to who you are. Take photos with a variety of poses, playful expressions, and vibrant colors to make your dating profile stand out. Attract more matches on apps like Tinder, Bumble, and Hinge by showcasing your unique personality and style.',
      images: [
        image_ffe26301c2af5df48a3eace6ad54f9fb2585a75c,
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop'
      ],
      photoCount: '42 PHOTOS',
      weeklyCount: '45K RAN THIS WEEK',
      gradient: 'from-pink-500/20 to-red-500/20',
      badge: 'bg-pink-500'
    },
    {
      id: 'instagram',
      emoji: '📱',
      title: 'Instagram Influencer',
      description: 'Take engaging and visually stunning photos that feature you as an Instagram influencer. Boost your confidence, likes and followers with captivating images that reflect your unique style and charisma.',
      images: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop'
      ],
      photoCount: '40 PHOTOS',
      weeklyCount: '38K RAN THIS WEEK',
      gradient: 'from-purple-500/20 to-pink-500/20',
      badge: 'bg-purple-500'
    },
    {
      id: 'model',
      emoji: '💃',
      title: 'AI Model Photo',
      description: 'Create stunning fashion photography and AI model photoshoots for brands, influencers, and lookbooks. Our AI model generator produces realistic fashion portraits and virtual model photography with professional styling. Generate AI fashion shoots, model girl portraits, and editorial fashion photos. Perfect for AI model creators seeking photorealistic fashion imagery and realistic model photography.',
      images: [
        image_ffe26301c2af5df48a3eace6ad54f9fb2585a75c,
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop'
      ],
      photoCount: '36 PHOTOS',
      weeklyCount: '29K RAN THIS WEEK',
      gradient: 'from-purple-500/20 to-pink-500/20',
      badge: 'bg-purple-500'
    },
    {
      id: 'glamour',
      emoji: '✨',
      title: 'Glamour Photography',
      description: 'Create stunning glamour portraits with dramatic lighting, elegant poses, and Hollywood-style sophistication. Perfect for fashion portfolios, editorial shoots, and high-end personal branding.',
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop'
      ],
      photoCount: '34 PHOTOS',
      weeklyCount: '26K RAN THIS WEEK',
      gradient: 'from-gold-500/20 to-amber-500/20',
      badge: 'bg-amber-500'
    },
    {
      id: 'realistic',
      emoji: '🌈',
      title: 'AI Realistic Photo Creator',
      description: 'Generate ultra-photorealistic portraits and images with our advanced AI realistic photo creator. Create photorealistic AI portraits with studio-quality detail, realistic skin textures, and professional color grading. Our AI photorealistic generator produces realistic pictures and photoreal models with 4K quality. Perfect for creating realistic AI portraits, photorealistic images, and professional realistic photo generation.',
      images: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop'
      ],
      photoCount: '40 PHOTOS',
      weeklyCount: '25K RAN THIS WEEK',
      gradient: 'from-cyan-500/20 to-purple-500/20',
      badge: 'bg-cyan-500'
    },
    {
      id: 'ai-influencer',
      emoji: '🤖',
      title: 'AI Influencer Generator',
      description: 'Design your own AI influencer from scratch—customizing every detail from their look to their personality. Generate stunning photos and videos, make them speak in lifelike AI-generated videos, and bring them to life across social media.',
      images: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=500&fit=crop'
      ],
      photoCount: '45 PHOTOS',
      weeklyCount: '32K RAN THIS WEEK',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      badge: 'bg-cyan-500'
    },
    {
      id: 'luxury-lifestyle',
      emoji: '💎',
      title: 'Luxury Lifestyle',
      description: 'Capture the essence of luxury living with high-end fashion, exotic destinations, and sophisticated settings. Perfect for personal branding, luxury influencers, and premium lifestyle content.',
      images: [
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=500&fit=crop'
      ],
      photoCount: '38 PHOTOS',
      weeklyCount: '24K RAN THIS WEEK',
      gradient: 'from-gold-500/20 to-purple-500/20',
      badge: 'bg-yellow-500'
    },
    {
      id: 'selfie',
      emoji: '🤳',
      title: 'AI Selfie Generator',
      description: 'Create perfect AI-generated selfies and profile pictures with our AI selfie generator. Transform casual photos into professional selfie portraits and AI profile pictures for social media. Our AI selfie creator produces realistic selfie models and AI photo faces with natural lighting. Perfect for generating AI selfies, profile photos, and realistic selfie portraits for Instagram, dating apps, and social profiles.',
      images: [
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop'
      ],
      photoCount: '29 PHOTOS',
      weeklyCount: '22K RAN THIS WEEK',
      gradient: 'from-pink-500/20 to-rose-500/20',
      badge: 'bg-pink-500'
    },
    {
      id: 'beach-bikini',
      emoji: '🏖️',
      title: 'Beach & Bikini',
      description: 'Capture stunning beach lifestyle photos with swimwear, tropical locations, and summer vibes. Perfect for vacation content, fitness portfolios, and lifestyle influencer posts.',
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=500&fit=crop'
      ],
      photoCount: '35 PHOTOS',
      weeklyCount: '28K RAN THIS WEEK',
      gradient: 'from-cyan-500/20 to-blue-400/20',
      badge: 'bg-cyan-500'
    },
    {
      id: 'fitness',
      emoji: '💪',
      title: 'Fitness Influencer',
      description: 'Showcase your fitness journey with professional gym photos, athletic wear, and motivational poses. Perfect for fitness influencers, personal trainers, and wellness brands.',
      images: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop'
      ],
      photoCount: '32 PHOTOS',
      weeklyCount: '27K RAN THIS WEEK',
      gradient: 'from-green-500/20 to-emerald-500/20',
      badge: 'bg-green-500'
    },
    {
      id: 'travel',
      emoji: '✈️',
      title: 'Travel Photography',
      description: 'Create stunning travel content from exotic destinations around the world. Perfect for travel bloggers, digital nomads, and adventure enthusiasts showcasing global experiences.',
      images: [
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=500&fit=crop'
      ],
      photoCount: '40 PHOTOS',
      weeklyCount: '31K RAN THIS WEEK',
      gradient: 'from-blue-500/20 to-teal-500/20',
      badge: 'bg-blue-500'
    },
    {
      id: 'corporate-team',
      emoji: '👔',
      title: 'Corporate Team Headshots',
      description: 'Ensure brand consistency across your organization with professional, AI-generated headshots for your team members. Perfect for company websites, internal directories, and marketing materials.',
      images: [
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop'
      ],
      photoCount: '30 PHOTOS',
      weeklyCount: '20K RAN THIS WEEK',
      gradient: 'from-gray-600/20 to-blue-600/20',
      badge: 'bg-gray-600'
    },
    {
      id: 'portrait',
      emoji: '🎨',
      title: 'AI Portrait Generator',
      description: 'Generate artistic AI portraits and professional headshots with our AI portrait photo generator. Create realistic AI portraits, AI-generated headshots, and virtual portrait photography. Our AI portrait face generator produces high-quality AI headshot photos with professional lighting and composition. Perfect for creating AI realistic headshots, portrait photos, and professional AI portrait imagery for any purpose.',
      images: [
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
        'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=500&fit=crop'
      ],
      photoCount: '35 PHOTOS',
      weeklyCount: '27K RAN THIS WEEK',
      gradient: 'from-rose-500/20 to-orange-500/20',
      badge: 'bg-rose-500'
    },
    {
      id: 'dating',
      emoji: '📸',
      title: 'AI Dating Photos',
      description: 'Generate engaging dating photos for Tinder, Bumble, and Hinge with our AI photo generator. Create photorealistic dating portraits and AI photoshoots that boost matches. Our AI photography app produces realistic photo profiles and AI-generated pictures optimized for dating apps. Perfect for creating AI photo shoots, realistic dating portraits, and virtual photography that stands out on dating platforms.',
      images: [
        image_ffe26301c2af5df48a3eace6ad54f9fb2585a75c,
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop'
      ],
      photoCount: '29 PHOTOS',
      weeklyCount: '22K RAN THIS WEEK',
      gradient: 'from-pink-500/20 to-purple-500/20',
      badge: 'bg-pink-500'
    }
  ];

// Memoized component - Animations CSS natives
export const CategoryShowcase = memo(function CategoryShowcase({ onCategoryClick, onViewExamples }: CategoryShowcaseProps) {
  const handleCategoryClick = useCallback((categoryId: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  }, [onCategoryClick]);

  const handleExamplesClick = useCallback((categoryId: string) => {
    if (onViewExamples) {
      onViewExamples(categoryId);
    }
  }, [onViewExamples]);

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Explore Our AI Photo Categories
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From professional headshots to artistic portraits — discover the perfect AI photo generator for your needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-in fade-in slide-in-from-bottom-8 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card 
                className="relative overflow-hidden bg-black/60 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 cursor-pointer group"
                onClick={() => handleCategoryClick(category.id)}
              >
                {/* Images Grid */}
                <div className="grid grid-cols-2 gap-2 p-4 pb-0">
                  {category.images.map((image, imgIndex) => (
                    <div 
                      key={imgIndex}
                      className="relative aspect-[3/4] rounded-xl overflow-hidden"
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${category.title} example ${imgIndex + 1}`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Title */}
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{category.emoji}</span>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>

                  {/* Description with SEO keywords */}
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-4">
                    {category.description}
                  </p>

                  {/* Badges */}
                  <div className="flex items-center justify-between pt-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {category.photoCount}
                    </Badge>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                      {category.weeklyCount}
                    </Badge>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(category.id);
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/30"
                    >
                      <span>Try {category.title}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExamplesClick(category.id);
                      }}
                      className="w-full px-4 py-3 bg-white/10 text-white rounded-xl font-semibold border border-white/20 hover:border-pink-400/60 transition-all duration-300"
                    >
                      View examples
                    </button>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-pink-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-500 pointer-events-none" />
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          <p className="text-gray-400 mb-6">
            Not sure which category? Start with our most popular AI photo generator
          </p>
          <button 
            onClick={() => handleCategoryClick('professional')}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
          >
            Start Creating Now →
          </button>
        </div>
      </div>
    </section>
  );
});
