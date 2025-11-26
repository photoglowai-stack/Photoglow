import { LazyImage } from '../shared/LazyImage';
import { Sparkles } from 'lucide-react';

interface StyleCategory {
  id: string;
  title: string;
  emoji: string;
  image: string;
  blurhash?: string;
}

export function ExploreAIStyles() {
  const categories: StyleCategory[] = [
    {
      id: 'professional',
      title: 'AI Headshots',
      emoji: '💼',
      image: 'https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsaW5rZWRpbiUyMGhlYWRzaG90JTIwYnVzaW5lc3N8ZW58MXx8fHwxNzU4ODI5NDYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      blurhash: 'L6H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'model',
      title: 'AI Model Photo',
      emoji: '💃',
      image: 'https://images.unsplash.com/photo-1717765697681-5a160db970d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdCUyMHN0dWRpb3xlbnwxfHx8fDE3NTk5NzUxMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      blurhash: 'L8H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'realistic',
      title: 'AI Realistic Photo Creator',
      emoji: '🌈',
      image: 'https://images.unsplash.com/photo-1515701599759-ebd9d17a09e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXN0aWMlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2MDAxNzg2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      blurhash: 'L5H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'selfie',
      title: 'AI Selfie Generator',
      emoji: '🤳',
      image: 'https://images.unsplash.com/photo-1662695089339-a2c24231a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmaWUlMjBwaG90byUyMHJlYWxpc3RpY3xlbnwxfHx8fDE3NjAwMjMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      blurhash: 'L7H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'portrait',
      title: 'AI Portrait Generator',
      emoji: '🎨',
      image: 'https://images.unsplash.com/photo-1701958213864-2307a737e853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMHBvcnRyYWl0JTIwcGFpbnRpbmd8ZW58MXx8fHwxNzU5OTMyNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      blurhash: 'L9H2j=00~q00009F-;M{00Rj00M{'
    },
    {
      id: 'dating',
      title: 'AI Dating Photos',
      emoji: '📸',
      image: 'https://images.unsplash.com/photo-1542131596-52b8276764bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjB0aW5kZXIlMjBwcm9maWxlJTIwcGhvdG8lMjBhdHRyYWN0aXZlfGVufDF8fHx8MTc1ODgyOTQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      blurhash: 'L4H2j=00~q00009F-;M{00Rj00M{'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    console.log(`Selected category: ${categoryId}`);
  };

  const handleCreatePhotos = () => {
    console.log('Create Photos clicked');
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-black to-gray-950 overflow-hidden">
      {/* Background decorative elements - CSS animations */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title - CSS animation */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-6 duration-600">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            ✨ Explore Our AI Styles ✨
          </h2>
        </div>

        {/* Cards Grid - 2 columns with CSS stagger */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-500 hover:scale-103 transition-transform"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                {/* Background Image avec LazyImage */}
                <div className="absolute inset-0 pointer-events-none">
                  <LazyImage
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    blurhash={category.blurhash}
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 pointer-events-none"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 filter drop-shadow-lg group-hover:scale-120 group-hover:rotate-5 transition-transform duration-300">
                    {category.emoji}
                  </div>
                  <h3 className="text-white text-sm sm:text-base lg:text-lg drop-shadow-lg">
                    {category.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Create Photos Button - CSS animations */}
        <div className="flex justify-end animate-in zoom-in-95 fade-in duration-600 delay-400">
          <button
            onClick={handleCreatePhotos}
            className="group relative inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full shadow-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {/* Emoji Circle */}
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            
            {/* Button Text */}
            <span className="text-white text-base pr-2">
              Create Photos
            </span>

            {/* Animated glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-300 pointer-events-none"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
