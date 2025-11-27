import { useState } from 'react';
import { LazyImage } from '../shared/LazyImage';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import headshotsBackgroundImage from '../../assets/889909b48ee021025e71d69b390ad6902f141398.png';
import modelPhotoImage from '../../assets/fd2d84766f3bd55ec81bb9f9d14061be4b7db6eb.png';
import realisticPhotoImage from '../../assets/bfa55256432d7539c6b31bba765fd93642044b16.png';
import selfieGeneratorImage from '../../assets/8aed63db7b98c23095a2c7c5d9cbdea71c63cebf.png';
import portraitGeneratorImage from '../../assets/c64c6e3c6e39c9c66e75dde8e3b1ae2feb40a370.png';
import datingPhotosImage from '../../assets/f1baab1b3b8f881d3d83c13cb1c12b8ee0fe7321.png';
import fitnessPhotosImage from '../../assets/cd7a3ba47085bb0a7c2fa0d53a61aab19bcb87b9.png';

interface ExploreAIModelsPageProps {
  onBack: () => void;
  onModelSelect: (modelId: string) => void;
  categories?: Array<{ id: string; name?: string; title?: string; description?: string; image_url?: string }>;
  loadingCategories?: boolean;
  categoriesError?: string | null;
}

export function ExploreAIModelsPage({ onBack, onModelSelect, categories, loadingCategories, categoriesError }: ExploreAIModelsPageProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const dynamicModels = (categories || []).map(category => ({
    id: category.id,
    title: category.name || category.title || category.id,
    emoji: '✨',
    image: category.image_url,
    gradient: 'from-pink-500 to-purple-500',
    description: category.description || 'AI generation preset',
    blurhash: 'L5H2j=00~q00009F-;M{00Rj00M{'
  }));

  const aiModels = (dynamicModels.length ? dynamicModels : [
    {
      id: 'professional',
      title: 'AI Headshots',
      emoji: '👔',
      image: headshotsBackgroundImage,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Professional headshots for LinkedIn, resumes, and corporate profiles',
      blurhash: 'L6H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'model',
      title: 'AI Model Photo',
      emoji: '📸',
      image: modelPhotoImage,
      gradient: 'from-purple-500 to-pink-500',
      description: 'High-fashion model photos with editorial styling',
      isNew: true,
      blurhash: 'L8H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'realistic',
      title: 'AI Realistic Photo Creator',
      emoji: '🎨',
      image: realisticPhotoImage,
      gradient: 'from-green-500 to-emerald-500',
      description: 'Ultra-realistic AI-generated photos indistinguishable from real',
      blurhash: 'L5H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'selfie',
      title: 'AI Selfie Generator',
      emoji: '🤳',
      image: selfieGeneratorImage,
      gradient: 'from-orange-500 to-amber-500',
      description: 'Perfect selfies for social media and personal branding',
      blurhash: 'L7H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'portrait',
      title: 'AI Portrait Generator',
      emoji: '🖼️',
      image: portraitGeneratorImage,
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Artistic portrait photography with creative styles',
      blurhash: 'L9H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'dating',
      title: 'AI Dating Photos',
      emoji: '💕',
      image: datingPhotosImage,
      gradient: 'from-rose-500 to-pink-500',
      description: 'Attractive dating profile photos that get more matches',
      blurhash: 'L4H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'fitness',
      title: 'AI Fitness Photos',
      emoji: '💪',
      image: fitnessPhotosImage,
      gradient: 'from-red-500 to-orange-500',
      description: 'Fitness and athletic photography to showcase your physique',
      blurhash: 'L3H2j=00~q00009F-;M{00Rj00M{'
    },
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-pink-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="text-sm text-gray-400">Choose Your AI Model</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated background orbs - CSS animations */}
        <div 
          className="absolute top-0 left-1/4 w-[900px] h-[900px] rounded-full blur-3xl animate-float"
          style={{ 
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, rgba(236, 72, 153, 0.15) 40%, transparent 70%)' 
          }}
        />
        <div 
          className="absolute top-1/3 right-1/5 w-[800px] h-[800px] rounded-full blur-3xl animate-float-delayed"
          style={{ 
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, rgba(147, 51, 234, 0.15) 40%, transparent 70%)' 
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Title - CSS animation */}
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-800">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ✨ Explore Our AI Models ✨
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {loadingCategories
                ? 'Loading presets from the Photoglow backend...'
                : categoriesError
                  ? categoriesError
                  : 'Choose the perfect AI model for your photos. Each model is trained for specific styles and purposes.'}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mx-auto mt-8 rounded-full shadow-lg shadow-purple-500/50"></div>
          </div>

          {/* AI Models Grid - CSS stagger animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {aiModels.map((model, index) => (
              <div
                key={model.id}
                onMouseEnter={() => setHoveredCard(model.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onModelSelect(model.id)}
                className="group cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-500 hover:scale-103 transition-transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`
                  relative overflow-hidden rounded-3xl border-2 transition-all duration-300 h-80
                  ${hoveredCard === model.id 
                    ? `border-gradient-to-r ${model.gradient} shadow-2xl shadow-pink-500/30 bg-gradient-to-r ${model.gradient} p-0.5`
                    : 'border-gray-700/50 hover:border-pink-400/40 shadow-xl'
                  }
                `}>
                  <div className={`
                    relative h-full rounded-3xl overflow-hidden bg-black
                    ${hoveredCard === model.id ? 'bg-opacity-90' : 'bg-opacity-100'}
                  `}>
                    {/* Background Image avec LazyImage */}
                    <div className="absolute inset-0 pointer-events-none">
                      <LazyImage
                        src={model.image}
                        alt={model.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        blurhash={model.blurhash}
                      />
                      <div className={`
                        absolute inset-0 transition-all duration-300 pointer-events-none
                        ${hoveredCard === model.id 
                          ? `bg-gradient-to-t from-black/80 via-black/50 to-black/30 bg-gradient-to-r ${model.gradient} mix-blend-multiply opacity-60`
                          : 'bg-gradient-to-t from-black/90 via-black/60 to-transparent'
                        }
                      `}></div>
                    </div>

                    {/* New Badge - CSS conditional display */}
                    {model.isNew && hoveredCard === model.id && (
                      <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-400 to-rose-400 text-white px-3 py-1 rounded-full text-xs shadow-lg flex items-center space-x-1 animate-in zoom-in-95 duration-200">
                        <span>✨</span>
                        <span>New</span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-6">
                      <div className="text-5xl mb-3 filter drop-shadow-2xl group-hover:scale-110 transition-transform">
                        {model.emoji}
                      </div>
                      <h3 className={`
                        text-xl md:text-2xl mb-2 transition-all duration-300
                        ${hoveredCard === model.id 
                          ? 'text-white drop-shadow-2xl' 
                          : 'text-white'
                        }
                      `}>
                        {model.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {model.description}
                      </p>

                      {/* CTA Button on hover - CSS transition */}
                      <div 
                        className={`mt-4 transition-all duration-200 ${
                          hoveredCard === model.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                        }`}
                      >
                        <Button
                          className={`w-full bg-gradient-to-r ${model.gradient} hover:opacity-90 text-white transition-all duration-300`}
                        >
                          Select Model →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
