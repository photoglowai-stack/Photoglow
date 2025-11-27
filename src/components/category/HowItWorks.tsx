import image_78561249bdabb10db45f2e19c3785798769f88cb from '../../assets/78561249bdabb10db45f2e19c3785798769f88cb.png';
import image_06c17fd60b109f44663983174a9fcffb6a7e8ca4 from '../../assets/06c17fd60b109f44663983174a9fcffb6a7e8ca4.png';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, PanInfo } from 'framer-motion';
import { Heart, Upload, Sparkles, Grid3x3, Bookmark, ThumbsUp, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import phoneImage from '../../assets/16b71f196debb8a02e63c336078a93f05b9711fe.png';
import instagramLogo from '../../assets/a3d62fe320695b906cb3bc1f68f9228f8d43ed2c.png';
import linkedinLogo from '../../assets/b45cb94262e9dc3e4f49d97475ceb9570d781443.png';
import pinterestLogo from '../../assets/5d083b8c046522abf88456dc17431671c7a94f0d.png';
import instagramPhoto from '../../assets/7908cc95b51e4da62111a52533d59e9ff10cea21.png';
import linkedinPhoto from '../../assets/889909b48ee021025e71d69b390ad6902f141398.png';
import aiProcessingPhoto from '../../assets/9fbd94f84c686f8a660346c0a5b33d5f11f2713f.png';
import selfie2 from '../../assets/2c508c4e08485a8f3e97314d1e81a5ddf454e5a1.png';
import aiResult from '../../assets/122dcd2ebe2b9d58e158d5aa006fd43d2ea55ea8.png';

interface ColorScheme {
  primary: string;
  secondary: string;
  bgGradient: string;
  borderColor: string;
  glowColor: string;
}

interface CategoryHowItWorksProps {
  colorScheme?: ColorScheme;
}

export function CategoryHowItWorks({ colorScheme }: CategoryHowItWorksProps) {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [pixelLevel, setPixelLevel] = useState(10);
  const dragX = useMotionValue(0);

  // Default color scheme (pink/purple from landing page)
  const defaultColorScheme: ColorScheme = {
    primary: 'pink-500',
    secondary: 'purple-600',
    bgGradient: 'from-pink-900/10 via-purple-900/5 to-violet-900/10',
    borderColor: 'border-pink-500/40',
    glowColor: 'pink-500'
  };

  const colors = colorScheme || defaultColorScheme;

  // Auto-rotate profiles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProfile((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Pixelation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPixelLevel((prev) => {
        if (prev <= 1) return 10;
        return prev - 1;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const platforms = [
    {
      name: "LinkedIn",
      logo: linkedinLogo,
      image: linkedinPhoto,
      title: "Senior Product Designer",
      subtitle: "Tech Industry • 500+ connections",
      bgGradient: "from-[#0077B5]/20 to-[#00A0DC]/10",
      borderColor: "border-[#0077B5]/40",
      action: (
        <button className="flex items-center gap-2 bg-[#0077B5] hover:bg-[#006399] text-white px-4 py-2 rounded-lg transition-colors">
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm">Connect</span>
        </button>
      ),
      badge: (
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
          <img src={image_06c17fd60b109f44663983174a9fcffb6a7e8ca4} alt="LinkedIn" className="w-5 h-5" />
        </div>
      )
    },
    {
      name: "Dating Apps",
      logo: null,
      image: selfie2,
      title: "Sophie, 28",
      subtitle: "2 km away",
      bgGradient: "from-pink-500/20 to-rose-500/10",
      borderColor: "border-pink-500/40",
      action: (
        <div className="flex items-center gap-3">
          <button className="w-14 h-14 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110">
            <MessageCircle className="w-6 h-6 text-gray-600" />
          </button>
          <button className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110">
            <Heart className="w-7 h-7 text-white fill-white" />
          </button>
        </div>
      ),
      badge: (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1 shadow-lg">
          <Heart className="w-3 h-3 fill-white" />
          <span>Tinder</span>
        </div>
      )
    },
    {
      name: "Pinterest",
      logo: pinterestLogo,
      image: aiResult,
      title: "Summer Style Inspiration",
      subtitle: "Fashion & Lifestyle • 2.4K saves",
      bgGradient: "from-[#E60023]/20 to-[#BD081C]/10",
      borderColor: "border-[#E60023]/40",
      action: (
        <button className="flex items-center gap-2 bg-[#E60023] hover:bg-[#BD081C] text-white px-4 py-2 rounded-lg transition-colors">
          <Bookmark className="w-4 h-4" />
          <span className="text-sm">Save</span>
        </button>
      ),
      badge: (
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
          <img src={image_78561249bdabb10db45f2e19c3785798769f88cb} alt="Pinterest" className="w-5 h-5" />
        </div>
      )
    },
    {
      name: "Instagram",
      logo: instagramLogo,
      image: instagramPhoto,
      title: "@lucas_adventures",
      subtitle: "Travel • Lifestyle • 12.5K followers",
      bgGradient: "from-purple-500/20 via-pink-500/10 to-orange-500/10",
      borderColor: "border-pink-500/40",
      action: (
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white px-4 py-2 rounded-lg transition-opacity">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Like</span>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            Follow
          </button>
        </div>
      ),
      badge: (
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
          <img src={instagramLogo} alt="Instagram" className="w-5 h-5" />
        </div>
      )
    }
  ];

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) > 500 || Math.abs(offset) > 100) {
      if (offset > 0) {
        // Swiped right - go to previous
        setCurrentProfile((prev) => (prev - 1 + platforms.length) % platforms.length);
      } else {
        // Swiped left - go to next
        setCurrentProfile((prev) => (prev + 1) % platforms.length);
      }
    }
  };

  const steps = [
    {
      number: 1,
      title: "Upload Your Photos",
      description: "Simply upload 6 to 8 photos of yourself. Selfies work perfectly!",
      icon: Upload,
      visual: (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-gray-900/70 rounded-2xl p-4 border border-gray-700 w-full max-w-[240px]">
            <div className="relative max-w-[240px] mx-auto">
              <img
                src={phoneImage}
                alt="Phone gallery"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      number: 2,
      title: "Our AI Gets to Work",
      description: "Developed by Meta and Microsoft AI researchers, our cutting-edge technology generates photos that look just like you.",
      icon: Sparkles,
      visual: (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="relative w-full max-w-[180px] aspect-square rounded-xl overflow-hidden bg-gray-800">
            <ImageWithFallback
              src={aiProcessingPhoto}
              alt="AI Processing"
              className="w-full h-full object-cover transition-all duration-300"
              style={{
                filter: `blur(${pixelLevel}px)`,
                imageRendering: pixelLevel > 5 ? 'pixelated' : 'auto'
              }}
            />
            
            <div 
              className={`absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-${colors.primary} to-transparent opacity-70`}
              style={{
                top: `${((10 - pixelLevel) / 10) * 100}%`,
                transition: 'top 0.3s linear'
              }}
            />
            
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-black/80 backdrop-blur-sm rounded-full px-3 py-1.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-xs flex items-center gap-1">
                    <Sparkles className={`w-2.5 h-2.5 text-${colors.primary}`} />
                    AI Processing...
                  </span>
                  <span className={`text-${colors.primary} text-xs`}>{Math.round(((10 - pixelLevel) / 10) * 100)}%</span>
                </div>
                <div className="w-full h-0.5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r from-${colors.primary} to-${colors.secondary} transition-all duration-300`}
                    style={{ width: `${((10 - pixelLevel) / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="absolute top-2 right-2 w-14 h-14 rounded-lg overflow-hidden border border-white/30 shadow-lg">
              <ImageWithFallback
                src={aiResult}
                alt="Enhanced preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className={`absolute top-2 left-2 bg-gradient-to-r from-${colors.primary} to-${colors.secondary} text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg`}>
              <Sparkles className="w-2.5 h-2.5 animate-pulse" />
              <span>AI</span>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: "Use Across All Platforms",
      description: "Get professional photos optimized for LinkedIn, dating apps, Instagram, Pinterest, and more.",
      icon: Grid3x3,
      visual: (
        <div className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden">
          <div className="relative w-full max-w-[200px] h-full">
            {platforms.map((platform, index) => {
              const isActive = currentProfile === index;
              
              return (
                <motion.div
                  key={platform.name}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.85,
                    zIndex: isActive ? 10 : 0
                  }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.32, 0.72, 0, 1]
                  }}
                >
                  <div className={`bg-gradient-to-br ${platform.bgGradient} rounded-xl overflow-hidden border-2 ${platform.borderColor} shadow-2xl h-full flex flex-col`}>
                    {/* Platform image - 140px height */}
                    <div className="relative h-[140px] flex-shrink-0">
                      <ImageWithFallback
                        src={platform.image}
                        alt={platform.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Platform badge with logo */}
                      <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-lg">
                        {platform.logo ? (
                          <img src={platform.logo} alt={platform.name} className="w-4 h-4" />
                        ) : (
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                            <span className="text-[10px] font-semibold text-gray-800">Tinder</span>
                          </div>
                        )}
                      </div>

                      {/* AI badge */}
                      <div className={`absolute top-2 right-2 bg-gradient-to-r from-${colors.primary} to-${colors.secondary} text-white px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1 shadow-lg`}>
                        <Sparkles className="w-2.5 h-2.5" />
                        <span className="font-semibold">AI</span>
                      </div>
                    </div>

                    {/* Platform info - Remaining space (~70px) */}
                    <div className="flex-1 flex flex-col justify-between p-2.5 bg-gradient-to-b from-gray-900/50 to-gray-900/80 backdrop-blur-sm">
                      <div className="space-y-0.5">
                        <h4 className="text-white text-xs font-semibold line-clamp-1">
                          {platform.title}
                        </h4>
                        <p className="text-gray-300 text-[10px] line-clamp-1">
                          {platform.subtitle}
                        </p>
                      </div>

                      {/* Platform-specific action buttons */}
                      <div className="flex justify-center mt-1">
                        {platform.name === 'LinkedIn' && (
                          <button className="flex items-center gap-1 bg-[#0077B5] hover:bg-[#006399] text-white px-3 py-1 rounded-md transition-colors text-[10px] font-semibold">
                            <ThumbsUp className="w-3 h-3" />
                            <span>Connect</span>
                          </button>
                        )}
                        {platform.name === 'Dating Apps' && (
                          <div className="flex items-center gap-1.5">
                            <button className="w-8 h-8 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110">
                              <MessageCircle className="w-3.5 h-3.5 text-gray-600" />
                            </button>
                            <button className="w-9 h-9 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110">
                              <Heart className="w-4 h-4 text-white fill-white" />
                            </button>
                          </div>
                        )}
                        {platform.name === 'Pinterest' && (
                          <button className="flex items-center gap-1 bg-[#E60023] hover:bg-[#BD081C] text-white px-3 py-1 rounded-md transition-colors text-[10px] font-semibold">
                            <Bookmark className="w-3 h-3" />
                            <span>Save</span>
                          </button>
                        )}
                        {platform.name === 'Instagram' && (
                          <div className="flex items-center gap-1">
                            <button className="flex items-center gap-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white px-2.5 py-1 rounded-md transition-opacity text-[10px] font-semibold">
                              <Heart className="w-3 h-3" />
                              <span>Like</span>
                            </button>
                            <button className="bg-gray-800 hover:bg-gray-700 text-white px-2.5 py-1 rounded-md transition-colors text-[10px] font-semibold">
                              Follow
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Platform indicators */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {platforms.map((platform, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProfile(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === currentProfile
                      ? `w-4 bg-gradient-to-r from-${colors.primary} to-${colors.secondary}`
                      : 'w-1 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to ${platform.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-black relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bgGradient}`} />
      
      {/* Container with max-width 1140px, centered, and responsive padding */}
      <div className="max-w-[1140px] mx-auto px-6 md:px-16 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-4">
              How does it work?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Transform your selfies into professional photos in 3 simple steps
            </p>
          </motion.div>
        </div>

        {/* Steps Grid - Responsive: desktop 3, tablet 2, mobile 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex flex-col p-5 gap-3 rounded-2xl bg-gray-900/40 border border-gray-800/50 hover:border-pink-500/30 transition-all duration-300 h-auto"
            >
              {/* Gradient circle with number */}
              <div className="flex justify-center">
                <div className="relative w-14 h-14">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-${colors.primary} via-${colors.secondary} to-${colors.primary} opacity-20 blur-sm`} />
                  <div className={`absolute inset-0 rounded-full border-2 ${colors.borderColor} bg-gradient-to-br from-${colors.primary}/10 to-${colors.secondary}/10 flex items-center justify-center`}>
                    <span className="text-white text-lg">{step.number}</span>
                  </div>
                </div>
              </div>

              {/* Image container - Height 220px, radius 12, overflow hidden */}
              <div className="relative h-[220px] w-full rounded-xl overflow-hidden bg-gray-800/50 border border-gray-700/50">
                {step.visual}
              </div>

              {/* Title - Limited to 2 lines */}
              <h3 className="text-xl text-center line-clamp-2">
                {step.title}
              </h3>

              {/* Description - Limited to 2 lines */}
              <p className="text-gray-400 text-center text-sm leading-relaxed line-clamp-2">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className={`inline-flex items-center space-x-2 bg-gradient-to-r from-${colors.primary}/20 to-${colors.secondary}/20 border ${colors.borderColor} rounded-full px-6 py-3`}>
            <Sparkles className={`w-5 h-5 text-${colors.primary}`} />
            <span className="text-white">Ready to transform your photos?</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}