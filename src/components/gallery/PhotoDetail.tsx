import { Button } from '../ui/button';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { LazyImage } from '../shared/LazyImage';
import { categoryPhotoPrompts } from './categoryPhotoPrompts';
import { categoryMasonryImages } from './categoryMasonryData';

interface PhotoDetailPageProps {
  photoUrl: string;
  photoIndex: number;
  categoryId?: string; // Category ID for masonry gallery photos
  onBack: () => void;
  onGenerateNow: () => void;
  onSuggestionClick: (index: number) => void;
  onPhotoPackClick: (categoryId: string) => void;
}

// AI Prompts for each photo in the ScrollingMosaic (legacy, for backward compatibility)
// categoryId must match App.tsx state names exactly
const photoPromptsData = [
  {
    title: "Professional Business Headshot",
    prompt: "Professional corporate headshot with clean background, confident expression, business attire, studio lighting, sharp focus on face, neutral backdrop",
    category: "Professional",
    categoryId: "ai-headshots"
  },
  {
    title: "Urban Fashion Portrait",
    prompt: "Urban street fashion portrait, stylish modern outfit, city background, natural daylight, contemporary aesthetic, confident pose",
    category: "Fashion",
    categoryId: "ai-model-photo"
  },
  {
    title: "Executive Business Portrait",
    prompt: "Executive business portrait, elegant professional attire, office setting, confident demeanor, sophisticated lighting, modern corporate aesthetic",
    category: "Professional",
    categoryId: "ai-headshots"
  },
  {
    title: "Lifestyle Casual Portrait",
    prompt: "Casual lifestyle portrait, relaxed natural pose, soft lighting, everyday setting, authentic expression, candid photography style",
    category: "Lifestyle",
    categoryId: "ai-lifestyle-travel"
  },
  {
    title: "Athletic Fitness Portrait",
    prompt: "Athletic fitness portrait, dynamic sporty look, active wear, gym or outdoor setting, energetic pose, motivational aesthetic",
    category: "Fitness",
    categoryId: "ai-fitness-photos"
  },
  {
    title: "Creative Artistic Portrait",
    prompt: "Creative artistic portrait, unique composition, interesting lighting, expressive mood, artistic background, contemporary photography",
    category: "Creative",
    categoryId: "ai-portrait-generator"
  },
  {
    title: "Elegant Evening Portrait",
    prompt: "Elegant evening portrait, sophisticated attire, dramatic lighting, refined setting, graceful pose, luxury aesthetic",
    category: "Elegant",
    categoryId: "ai-model-photo"
  },
  {
    title: "Casual Social Portrait",
    prompt: "Casual social media portrait, friendly approachable look, natural setting, warm lighting, relatable aesthetic, perfect for dating apps",
    category: "Dating",
    categoryId: "ai-dating-photos"
  },
  {
    title: "Outdoor Adventure Portrait",
    prompt: "Outdoor adventure portrait, natural environment, active lifestyle, golden hour lighting, adventurous spirit, authentic outdoor aesthetic",
    category: "Lifestyle",
    categoryId: "ai-lifestyle-travel"
  },
  {
    title: "Studio Professional Portrait",
    prompt: "Clean studio portrait, professional styling, controlled lighting setup, polished appearance, minimalist background, high-end photography",
    category: "Professional",
    categoryId: "ai-headshots"
  },
  {
    title: "Fashion Editorial Portrait",
    prompt: "Fashion editorial portrait, high-fashion styling, dramatic composition, editorial lighting, runway-inspired aesthetic, contemporary fashion",
    category: "Fashion",
    categoryId: "ai-model-photo"
  },
  {
    title: "Model Portfolio Shot",
    prompt: "Professional model portfolio shot, versatile look, clean composition, perfect lighting, industry-standard quality, portfolio-ready",
    category: "Model",
    categoryId: "ai-model-photo"
  },
  {
    title: "Corporate Lifestyle Portrait",
    prompt: "Corporate lifestyle portrait, business casual attire, modern office environment, professional yet approachable, natural corporate aesthetic",
    category: "Professional",
    categoryId: "ai-headshots"
  },
  {
    title: "Professional Headshot Women",
    prompt: "Professional headshot for women, elegant business attire, clean background, confident professional expression, studio quality lighting",
    category: "Professional",
    categoryId: "ai-headshots"
  },
  {
    title: "Outdoor Lifestyle Portrait",
    prompt: "Outdoor lifestyle portrait, natural environment, authentic moment, soft natural lighting, relaxed atmosphere, travel photography aesthetic",
    category: "Lifestyle",
    categoryId: "ai-lifestyle-travel"
  },
];

export function PhotoDetailPage({ 
  photoUrl, 
  photoIndex, 
  categoryId,
  onBack, 
  onGenerateNow,
  onSuggestionClick,
  onPhotoPackClick
}: PhotoDetailPageProps) {
  // Use category-specific prompts if categoryId is provided, otherwise use legacy data
  let photoData;
  let suggestionImages: string[] = [];
  
  if (categoryId && categoryPhotoPrompts[categoryId]) {
    // Using category masonry gallery
    const categoryPrompts = categoryPhotoPrompts[categoryId];
    const categoryImages = categoryMasonryImages[categoryId] || [];
    
    photoData = {
      ...categoryPrompts[photoIndex % categoryPrompts.length],
      categoryId: categoryId
    };
    
    suggestionImages = categoryImages;
  } else {
    // Using legacy ScrollingMosaic data
    photoData = photoPromptsData[photoIndex] || photoPromptsData[0];
    
    // All photos from ScrollingMosaic
    suggestionImages = [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1581093458791-9d42e7d44e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhc2hpb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MjIxOTN8MA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1653419403196-ab64c4c740c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MTkxMDZ8MA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1609846685336-9cb06880bb48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNDg1ODcwfDA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRyYWl0JTIwcGhvdG98ZW58MXx8fHwxNzYwNTIxMjE0fDA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1640876305588-dbdab5869200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTA5NjQ1fDA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1607664919395-9ee609a88ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMTIxM3ww&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1680557345345-6f9ef109d252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTIxMjE3fDA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1636379688556-f9cc75dca5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA0MzEwMzh8MA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGhlYWRzaG90JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDUyMjU3Mnww&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1589351189946-b8eb5e170ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwaG90b3xlbnwxfHx8fDE3NjA1MjI1NzJ8MA&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFufGVufDF8fHx8MTc2MDUyMjU3Mnww&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDUyMjU3Mnww&ixlib=rb-4.1.0&q=80&w=400',
      'https://images.unsplash.com/photo-1607880609114-742ed2638069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwb3J0cmFpdCUyMG91dGRvb3J8ZW58MXx8fHwxNzYwNTIyNTczfDA&ixlib=rb-4.1.0&q=80&w=400',
    ];
  }
  
  // Generate 3 suggestion indices (different from current)
  const totalImages = suggestionImages.length;
  const suggestionIndices = [
    (photoIndex + 3) % totalImages,
    (photoIndex + 7) % totalImages,
    (photoIndex + 11) % totalImages,
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top right CTA button - Fixed */}
      <div className="fixed top-6 right-24 z-50 animate-in fade-in slide-in-from-top-8 duration-500 delay-300">
        <Button
          onClick={onGenerateNow}
          className="h-12 px-6 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:via-purple-700 hover:to-pink-600 text-white rounded-xl group relative overflow-hidden shadow-lg"
          style={{
            boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4), 0 12px 48px rgba(147, 51, 234, 0.3)',
          }}
        >
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"
            style={{ transform: 'skewX(-20deg)' }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            Generate This With Yourself In It
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </div>

      {/* Close button - Fixed top right */}
      <button
        onClick={onBack}
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center transition-all border border-white/20 group animate-in fade-in duration-300"
      >
        <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Photo */}
          <div className="lg:sticky lg:top-24 animate-in fade-in slide-in-from-left-8 duration-600">
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl shadow-purple-500/20">
              <LazyImage
                src={photoUrl}
                alt={photoData.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Category badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-black/80 backdrop-blur-xl border border-pink-500/30 rounded-full px-4 py-2">
                  <p className="text-sm bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {photoData.category}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form & Details */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-600 delay-200">
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {photoData.title}
              </h1>
              <p className="text-gray-400 text-lg">
                Create professional AI photos in this style with yourself in it
              </p>
            </div>

            {/* AI Prompt Section */}
            <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/10 border border-pink-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <h3 className="text-white">AI Generation Prompt</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {photoData.prompt}
              </p>
            </div>

            {/* Photo Pack CTA - Redirect to Category Page */}
            <div
              onClick={() => onPhotoPackClick(photoData.categoryId)}
              className="cursor-pointer animate-in fade-in zoom-in-95 duration-300 delay-500"
            >
              <div className="w-full bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/10 hover:from-pink-500/20 hover:via-purple-500/20 hover:to-pink-500/20 border-2 border-pink-500/30 hover:border-pink-500/50 rounded-2xl p-6 transition-all group hover:scale-105 active:scale-95">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-pink-400" />
                      <h4 className="text-white">Photo Pack</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      Explore all {photoData.category} styles and options
                    </p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-pink-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '⚡', text: '5 min generation' },
                { icon: '🎨', text: '100+ AI styles' },
                { icon: '📸', text: 'Studio quality' },
                { icon: '✨', text: 'Unlimited edits' },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-300"
                  style={{ animationDelay: `${400 + idx * 100}ms` }}
                >
                  <p className="text-2xl mb-1">{feature.icon}</p>
                  <p className="text-sm text-gray-300">{feature.text}</p>
                </div>
              ))}
            </div>

            {/* Other Suggestions */}
            <div className="space-y-4">
              <h3 className="text-xl text-white">Similar Styles You Might Like</h3>
              <div className="grid grid-cols-3 gap-4">
                {suggestionIndices.map((sugIdx, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSuggestionClick(sugIdx)}
                    className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group animate-in zoom-in-95 fade-in duration-500"
                    style={{ animationDelay: `${600 + idx * 100}ms` }}
                  >
                    <LazyImage
                      src={suggestionImages[sugIdx]}
                      alt={`Suggestion ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <p className="text-white text-xs">View</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
