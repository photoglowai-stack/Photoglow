import { memo } from 'react';
import { Badge } from './ui/badge';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { LazyImage } from '../shared/LazyImage';
import selfie1 from 'figma:asset/0add018c10f3889f2c712223ec4a093b5ddf753a.png';
import selfie2 from 'figma:asset/2c508c4e08485a8f3e97314d1e81a5ddf454e5a1.png';
import selfie3 from 'figma:asset/0690a5805cd67144f4f9f4968e8da6dc518fa63d.png';
import selfie4 from 'figma:asset/e5d9a2a1cdcb17f07c69550c0cd20071344f5cec.png';
import aiResult from 'figma:asset/122dcd2ebe2b9d58e158d5aa006fd43d2ea55ea8.png';

interface BeforeAfterTransformationProps {
  onStartTransformation?: () => void;
  customResultImage?: string;
}

// Static selfies array moved outside component
const selfies = [
  selfie1,
  selfie2,
  selfie3,
  selfie4
];

// Memoized: Props rarely change - Animations CSS natives + LazyImage optimizations
export const BeforeAfterTransformation = memo(function BeforeAfterTransformation({ onStartTransformation, customResultImage }: BeforeAfterTransformationProps) {

  // AI Generated result photo - use custom image if provided, otherwise default
  const aiResultPhoto = customResultImage || aiResult;

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Upload your selfies and start taking<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
              stunning AI photos now
            </span>
          </h2>
        </div>

        {/* Main Transformation Display */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center">
          {/* LEFT: 4 Selfies Grid */}
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-left-8 duration-700">
            {selfies.map((selfie, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer animate-in fade-in zoom-in-95 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <LazyImage
                  src={selfie}
                  alt={`Selfie example ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  blurhash="L6H1l-4o00~q00xu4n^%01-;00RP"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Border glow effect */}
                <div className="absolute inset-0 border-2 border-purple-500/0 group-hover:border-purple-500/50 rounded-2xl transition-all duration-300" />
              </div>
            ))}
          </div>

          {/* CENTER: Arrow */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-90 duration-700 delay-300">
            {/* Pointing finger emoji */}
            <div className="text-7xl animate-pulse">
              👉
            </div>
            
            {/* AI Text */}
            <div className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full border border-purple-500/30">
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                AI Transform
              </span>
            </div>
          </div>

          {/* Mobile Arrow (vertical) */}
          <div className="lg:hidden flex justify-center py-4 animate-in fade-in duration-700">
            <div className="flex flex-col items-center gap-3">
              {/* Pointing down finger emoji */}
              <div className="text-6xl animate-pulse">
                👇
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full border border-purple-500/30">
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  AI Transform
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: AI Generated Result */}
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 delay-400">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 group">
              <LazyImage
                src={aiResultPhoto}
                alt="AI Generated Photo Result"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                blurhash="L8F5?a%M00~q00xu4n^%01-;00RP"
                priority
              />
              
              {/* AI Generated Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-green-500 text-white border-0 px-4 py-2 text-xs font-bold uppercase shadow-lg">
                  PHOTO AI GENERATED
                </Badge>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Glow border effect */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-purple-500/50 rounded-3xl transition-all duration-300" />
              
              {/* Purple glow shadow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-3xl" />
              </div>
            </div>

            {/* Quality indicators */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                4K Quality
              </Badge>
              <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                Studio Lighting
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                Professional
              </Badge>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-600">
          <Button
            onClick={onStartTransformation}
            className="px-12 py-6 text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold rounded-2xl shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 transition-all duration-300 hover:scale-105 group"
          >
            <span>Start Your AI Transformation</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform inline-block" />
          </Button>
          
          <p className="mt-4 text-gray-400 text-sm">
            Upload 4-10 selfies • Get 32+ professional AI photos • Ready in 5 minutes
          </p>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-500 animate-in fade-in duration-700 delay-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>100% Private & Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>50,000+ Users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span>4.9★ Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
});
