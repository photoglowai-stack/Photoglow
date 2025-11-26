import { useState, useEffect, memo } from 'react';
import { LazyImage } from '../shared/LazyImage';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';

// Static examples data already outside component - good!
const maleExamples = [
  {
    category: "LinkedIn Professional",
    before: "https://images.unsplash.com/photo-1589458223095-03eee50f0054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjAwMjE5NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1589458223095-03eee50f0054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjAwMjE5NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    improvement: "+92% profile views"
  },
  {
    category: "Social Media & Portraits",
    before: "https://images.unsplash.com/photo-1679767912893-3729cf672b3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjYXN1YWwlMjBkYXRpbmd8ZW58MXx8fHwxNzYwMDIxOTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1679767912893-3729cf672b3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjYXN1YWwlMjBkYXRpbmd8ZW58MXx8fHwxNzYwMDIxOTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    improvement: "+156% more engagement"
  },
  {
    category: "Lifestyle & Travel",
    before: "https://images.unsplash.com/photo-1669986480113-695b1c9a4a75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjB0cmF2ZWwlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzYwMDIxOTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1669986480113-695b1c9a4a75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjB0cmF2ZWwlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzYwMDIxOTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    improvement: "+124% engagement"
  },
  {
    category: "Cosplay & Fantasy",
    before: "https://images.unsplash.com/photo-1759736810847-24daf6bffcbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjb3NwbGF5JTIwY2hhcmFjdGVyfGVufDF8fHx8MTc2MDAyMTk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1759736810847-24daf6bffcbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjb3NwbGF5JTIwY2hhcmFjdGVyfGVufDF8fHx8MTc2MDAyMTk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    improvement: "+210% cosplay likes"
  },
  {
    category: "Fitness & Bikini",
    before: "https://images.unsplash.com/photo-1734458211458-4d508abf564e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBmaXRuZXNzJTIwZ3ltfGVufDF8fHx8MTc2MDAyMTk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1734458211458-4d508abf564e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBmaXRuZXNzJTIwZ3ltfGVufDF8fHx8MTc2MDAyMTk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    improvement: "+189% fitness followers"
  }
];

const femaleExamples = [
  {
    category: "LinkedIn Professional",
    before: "https://images.unsplash.com/photo-1638727295415-286409421143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGxpbmtlZGlufGVufDF8fHx8MTc2MDAyMTk2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1638727295415-286409421143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGxpbmtlZGlufGVufDF8fHx8MTc2MDAyMTk2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    improvement: "+88% recruiter views"
  },
  {
    category: "Social Media & Portraits",
    before: "https://images.unsplash.com/photo-1620862658014-b7cb662d3df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGRhdGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDAyMTk2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1620862658014-b7cb662d3df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGRhdGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDAyMTk2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    improvement: "+143% profile engagement"
  },
  {
    category: "Lifestyle & Travel",
    before: "https://images.unsplash.com/photo-1710433399611-749e641e8b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHRyYXZlbCUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjAwMjE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1710433399611-749e641e8b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHRyYXZlbCUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjAwMjE5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    improvement: "+167% travel inspiration"
  },
  {
    category: "Cosplay & Fantasy",
    before: "https://images.unsplash.com/photo-1739654235915-5523ab58d7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZhbnRhc3klMjBjb3NwbGF5fGVufDF8fHx8MTc2MDAyMTk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1739654235915-5523ab58d7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZhbnRhc3klMjBjb3NwbGF5fGVufDF8fHx8MTc2MDAyMTk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    improvement: "+195% cosplay fans"
  },
  {
    category: "Fitness & Bikini",
    before: "https://images.unsplash.com/photo-1615327951452-7cda991728fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZpdG5lc3MlMjBiaWtpbml8ZW58MXx8fHwxNzYwMDIxOTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1615327951452-7cda991728fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZpdG5lc3MlMjBiaWtpbml8ZW58MXx8fHwxNzYwMDIxOTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    improvement: "+172% fitness motivation"
  }
];

// Carousel Component - CSS animations remplacent AnimatePresence
function BeforeAfterCarousel({ examples, gender }: { examples: typeof maleExamples, gender: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % examples.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [examples.length]);

  const currentExample = examples[currentIndex];

  return (
    <div className="relative h-full">
      {/* Carte avec transition CSS fade */}
      <div 
        key={currentIndex}
        className="animate-in fade-in duration-600"
      >
        <Card className="p-6 bg-white/5 backdrop-blur-md border-purple-500/30 h-full">
          <div className="space-y-6">
            {/* Header with Category */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl text-white mb-1">{gender} Transformation</h3>
                <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 text-xs">
                  {currentExample.category}
                </Badge>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {currentExample.improvement}
              </Badge>
            </div>

            {/* Before After Section */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
              {/* Before */}
              <div className="space-y-3">
                <div className="text-center">
                  <span className="text-sm text-gray-400 uppercase tracking-wide">Before</span>
                </div>
                <div className="aspect-[3/4] relative rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                  <LazyImage 
                    src={currentExample.before}
                    alt="Before transformation"
                    className="w-full h-full object-cover filter grayscale"
                    blurhash="L6H2j=00~q00009F-;M{00Rj00M{"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>

              {/* Arrow - Animation CSS */}
              <div className="flex items-center justify-center">
                <div className="text-pink-400 animate-pulse-slow">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>

              {/* After */}
              <div className="space-y-3">
                <div className="text-center">
                  <span className="text-sm text-pink-400 uppercase tracking-wide">After</span>
                </div>
                <div className="aspect-[3/4] relative rounded-xl overflow-hidden ring-2 ring-pink-500/50 hover:scale-105 transition-transform duration-300">
                  <LazyImage 
                    src={currentExample.after}
                    alt="After transformation"
                    className="w-full h-full object-cover"
                    blurhash="L8H2j=00~q00009F-;M{00Rj00M{"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-pink-500 text-white border-0 text-xs">
                      AI Enhanced
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 pt-2">
              {examples.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 w-6'
                      : 'bg-gray-600 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Memoized main component - CSS animations natives
export const PhotoExamples = memo(function PhotoExamples() {
  return (
    <section id="examples" className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      {/* Dark glossy background with pink/purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/40 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.2),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h2 className="text-3xl md:text-5xl lg:text-6xl px-4">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              How does PhotoGlow compare
            </span>
            <br />
            <span className="text-white">
              to other AI image generators?
            </span>
          </h2>
          
          <p className="text-base md:text-xl text-gray-300 max-w-4xl mx-auto px-4">
            With the same uploaded selfies, PhotoGlow performs far better than competitors in photorealism and resemblance.
          </p>
        </div>

        {/* Comparison Image with Glow Effect */}
        <div className="relative max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-700 delay-200">
          {/* Glow effect background */}
          <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl opacity-60 animate-pulse" />
          
          {/* Image container avec LazyImage */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-pink-500/20 shadow-2xl shadow-purple-500/20">
            <LazyImage
              src="/src/assets/2638598107c8ea13d0e934e46d83f29bb6da1175.png"
              alt="PhotoGlow AI comparison - Superior photorealism and character consistency"
              className="w-full h-auto"
              blurhash="L24_kVt700Rj00ay-;of00WB-;WB"
              priority
            />
            
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="text-center mt-12 md:mt-16 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <p className="text-gray-300 text-base md:text-lg">
            Trusted by professionals and creators worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm md:text-base text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Train on real people</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <span>Consistent character</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>High photorealism</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
