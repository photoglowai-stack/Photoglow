import { memo } from 'react';
import image_b5d162384a2ba13d77f091ac4c17c3ffe2c0ba8d from 'figma:asset/b5d162384a2ba13d77f091ac4c17c3ffe2c0ba8d.png';
import image_ee083d841901de5407c30b4be9b4a42239af9fc0 from 'figma:asset/ee083d841901de5407c30b4be9b4a42239af9fc0.png';
import { Check, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import transformationGif from 'figma:asset/52f7e7d0adee03854e33fae60c4b2d16b8b1e46e.gif';
import heroImage from 'figma:asset/7b72549a8a77efb9402ca42ba29b2b153272e742.png';

interface ComparisonFeature {
  label: string;
  midjourney: boolean;
  photoglow: boolean;
  chatgpt: boolean;
}

// Static comparison data moved outside component
const comparisonFeatures: ComparisonFeature[] = [
  { label: 'Train real people', midjourney: false, photoglow: true, chatgpt: false },
  { label: 'Consistent character', midjourney: false, photoglow: true, chatgpt: false },
  { label: 'High photorealism', midjourney: true, photoglow: true, chatgpt: false },
  { label: 'High resolution', midjourney: true, photoglow: true, chatgpt: true },
  { label: 'Maintains ethnicity', midjourney: false, photoglow: true, chatgpt: false },
  { label: 'Clear and sharp', midjourney: true, photoglow: true, chatgpt: false },
  { label: 'Create videos', midjourney: false, photoglow: false, chatgpt: false },
  { label: 'Zoom out of photos', midjourney: true, photoglow: false, chatgpt: false },
];

// Memoized: Static comparison content - Animations CSS natives
export const ComparisonSection = memo(function ComparisonSection() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 bg-[#0B0B0D] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-purple-950/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h2 className="text-3xl md:text-5xl lg:text-6xl px-4">
            <span className="text-white">How does </span>
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PhotoGlow
            </span>
            <br className="hidden sm:block" />
            <span className="text-white"> compare to other AI photo generators?</span>
          </h2>
          
          <p className="text-base md:text-xl text-gray-300 max-w-4xl mx-auto px-4">
            With the same uploaded selfies, PhotoGlow performs far better in photorealism, lighting, and resemblance.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Midjourney Card */}
          <div className="bg-gradient-to-b from-gray-900/90 to-gray-950/90 rounded-[24px] overflow-hidden border border-gray-800/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {/* Image */}
            <div className="aspect-[4/3] bg-gray-900 overflow-hidden">
              <ImageWithFallback
                src={image_ee083d841901de5407c30b4be9b4a42239af9fc0}
                alt="Midjourney AI generated photo example"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl text-white text-center">
                Midjourney 2025
              </h3>
              
              {/* Features List */}
              <div className="space-y-3 pt-4">
                {comparisonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{feature.label}</span>
                    {feature.midjourney ? (
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PhotoGlow Card - CENTER with GLOW */}
          <div className="relative lg:-mt-4 lg:mb-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-[26px] opacity-75 blur-xl animate-pulse" />
            
            {/* Card */}
            <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-[24px] overflow-hidden border-2 border-pink-500/50">
              {/* Image/GIF */}
              <div className="aspect-[4/3] bg-gray-900 overflow-hidden relative">
                <ImageWithFallback
                  src={heroImage}
                  alt="PhotoGlow AI generated photo - superior quality"
                  className="w-full h-full object-cover"
                />
                {/* Badge overlay */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs">
                  BEST
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl text-center">
                  <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    PhotoGlow™ 2025
                  </span>
                </h3>
                
                {/* Features List */}
                <div className="space-y-3 pt-4">
                  {comparisonFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{feature.label}</span>
                      {feature.photoglow ? (
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ChatGPT Card */}
          <div className="bg-gradient-to-b from-gray-900/90 to-gray-950/90 rounded-[24px] overflow-hidden border border-gray-800/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            {/* Image */}
            <div className="aspect-[4/3] bg-gray-900 overflow-hidden">
              <ImageWithFallback
                src={image_b5d162384a2ba13d77f091ac4c17c3ffe2c0ba8d}
                alt="ChatGPT AI generated photo example"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl text-white text-center">
                ChatGPT 2025
              </h3>
              
              {/* Features List */}
              <div className="space-y-3 pt-4">
                {comparisonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{feature.label}</span>
                    {feature.chatgpt ? (
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="text-center mt-12 md:mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <p className="text-gray-400 text-sm md:text-base">
            Trusted by over 50,000+ professionals and creators worldwide
          </p>
        </div>
      </div>
    </section>
  );
});
