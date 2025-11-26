import { useState } from 'react';
import { LazyImage } from '../shared/LazyImage';

interface AIStyle {
  id: string;
  title: string;
  emoji: string;
  image: string;
  gradient: string;
  blurhash?: string;
}

interface AIStylesSectionProps {
  onStyleClick?: (styleId: string) => void;
}

export function AIStylesSection({ onStyleClick }: AIStylesSectionProps = {}) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const aiStyles: AIStyle[] = [
    {
      id: 'professional',
      title: 'AI Headshots',
      emoji: '💼',
      image: 'https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsaW5rZWRpbiUyMGhlYWRzaG90JTIwYnVzaW5lc3N8ZW58MXx8fHwxNzU4ODI5NDYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'from-blue-500 to-indigo-500',
      blurhash: 'L6H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'model',
      title: 'AI Model Photo',
      emoji: '💃',
      image: 'https://images.unsplash.com/photo-1717765697681-5a160db970d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdCUyMHN0dWRpb3xlbnwxfHx8fDE3NTk5NzUxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'from-gray-700 to-gray-900',
      blurhash: 'L8H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'realistic',
      title: 'AI Realistic Photo Creator',
      emoji: '🌈',
      image: 'https://images.unsplash.com/photo-1515701599759-ebd9d17a09e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2MDAxNzg2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'from-cyan-500 to-purple-500',
      blurhash: 'L5H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'selfie',
      title: 'AI Selfie Generator',
      emoji: '🤳',
      image: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmaWUlMjBwaG90byUyMHJlYWxpc3RpY3xlbnwxfHx8fDE3NjAwMjMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'from-gray-600 to-gray-800',
      blurhash: 'L7H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'portrait',
      title: 'AI Portrait Generator',
      emoji: '🎨',
      image: 'https://images.unsplash.com/photo-1701958213864-2307a737e853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMHBvcnRyYWl0JTIwcGFpbnRpbmd8ZW58MXx8fHwxNzU5OTMyNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'from-rose-500 to-orange-500',
      blurhash: 'L9H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'dating',
      title: 'AI Dating Photos',
      emoji: '📸',
      image: 'https://images.unsplash.com/photo-1542131596-52b8276764bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjB0aW5kZXIlMjBwcm9maWxlJTIwcGhvdG8lMjBhdHRyYWN0aXZlfGVufDF8fHx8MTc1ODgyOTQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      gradient: 'from-pink-500 to-red-500',
      blurhash: 'L4H2j=00~q00009F-;M{00Rj00M{'
    }
  ];

  const handleCardClick = (styleId: string) => {
    if (onStyleClick) {
      onStyleClick(styleId);
    }
  };

  return (
    <section className="relative py-12 px-6 bg-black overflow-hidden">
      {/* Background Gradient Glows - CSS animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-pink-500/8 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-36 h-36 bg-cyan-500/6 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Title - CSS animation */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-6 duration-600">
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-3 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
            ✨ Explore Our AI Styles ✨
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mx-auto rounded-full shadow-lg shadow-purple-500/50"></div>
        </div>

        {/* Desktop & Tablet Grid - CSS stagger */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {aiStyles.map((style, index) => (
            <div
              key={style.id}
              onMouseEnter={() => setHoveredCard(style.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(style.id)}
              className="group cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-400 hover:scale-103 transition-transform"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`
                relative overflow-hidden rounded-xl border-2 transition-all duration-300 h-32
                ${hoveredCard === style.id 
                  ? `border-gradient-to-r ${style.gradient} shadow-lg shadow-pink-500/20 bg-gradient-to-r ${style.gradient} p-0.5`
                  : 'border-gray-700 hover:border-pink-400/30'
                }
              `}>
                <div className={`
                  relative h-full rounded-xl overflow-hidden bg-black
                  ${hoveredCard === style.id ? 'bg-opacity-90' : 'bg-opacity-100'}
                `}>
                  {/* Background Image with LazyImage */}
                  <div className="absolute inset-0 pointer-events-none">
                    <LazyImage
                      src={style.image}
                      alt={style.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      blurhash={style.blurhash}
                    />
                    <div className={`
                      absolute inset-0 transition-all duration-300 pointer-events-none
                      ${hoveredCard === style.id 
                        ? `bg-gradient-to-t from-black/70 via-transparent to-black/30 bg-gradient-to-r ${style.gradient} mix-blend-multiply opacity-50`
                        : 'bg-gradient-to-t from-black/85 via-black/40 to-transparent'
                      }
                    `}></div>
                  </div>

                  {/* New Badge for AI Model Photo - CSS conditional */}
                  {style.id === 'model' && hoveredCard === style.id && (
                    <div className="absolute top-2 right-2 z-20 bg-gradient-to-r from-amber-400 to-rose-400 text-white px-2 py-0.5 rounded-full text-xs shadow-lg flex items-center space-x-1 animate-in zoom-in-95 duration-200">
                      <span>✨</span>
                      <span>New</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-2">
                    <div className="text-2xl mb-1 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-200">
                      {style.emoji}
                    </div>
                    <h3 className={`
                      text-xs transition-all duration-300 text-center
                      ${hoveredCard === style.id 
                        ? 'text-white drop-shadow-lg shadow-white/50' 
                        : 'text-white'
                      }
                    `}>
                      {style.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scrollable Slider - CSS stagger */}
        <div className="md:hidden">
          <div className="flex gap-3 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory">
            {aiStyles.map((style, index) => (
              <div
                key={style.id}
                onClick={() => handleCardClick(style.id)}
                className="group cursor-pointer flex-shrink-0 w-24 snap-center animate-in fade-in slide-in-from-right-8 duration-400"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden rounded-xl border-2 border-gray-700 hover:border-pink-400/30 transition-all duration-300 h-24 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5">
                  {/* New Badge for AI Model Photo on mobile */}
                  {style.id === 'model' && (
                    <div className="absolute top-1 right-1 z-20 bg-gradient-to-r from-amber-400 to-rose-400 text-white px-1.5 py-0.5 rounded-full text-xs shadow-lg flex items-center space-x-0.5">
                      <span className="text-xs">✨</span>
                    </div>
                  )}

                  {/* Background Image avec LazyImage */}
                  <div className="absolute inset-0 pointer-events-none">
                    <LazyImage
                      src={style.image}
                      alt={style.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      blurhash={style.blurhash}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-1">
                    <div className="text-lg mb-0.5 filter drop-shadow-lg">
                      {style.emoji}
                    </div>
                    <h3 className="text-xs text-white drop-shadow-lg leading-tight">
                      {style.title.split(' ')[0]}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Glow Line - CSS animation */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent shadow-lg shadow-pink-500/30 animate-in fade-in duration-800 delay-300" style={{ animation: 'appear-scale 0.8s ease-out 0.3s both' }} />
      </div>
    </section>
  );
}
