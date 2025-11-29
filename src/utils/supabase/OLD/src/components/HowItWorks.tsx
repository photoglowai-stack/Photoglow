import image_78561249bdabb10db45f2e19c3785798769f88cb from 'figma:asset/78561249bdabb10db45f2e19c3785798769f88cb.png';
import image_06c17fd60b109f44663983174a9fcffb6a7e8ca4 from 'figma:asset/06c17fd60b109f44663983174a9fcffb6a7e8ca4.png';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { Heart, Upload, Sparkles, Grid3x3, Check, Bookmark, ThumbsUp, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import phoneImage from 'figma:asset/16b71f196debb8a02e63c336078a93f05b9711fe.png';
import instagramLogo from 'figma:asset/a3d62fe320695b906cb3bc1f68f9228f8d43ed2c.png';
import linkedinLogo from 'figma:asset/b45cb94262e9dc3e4f49d97475ceb9570d781443.png';
import pinterestLogo from 'figma:asset/5d083b8c046522abf88456dc17431671c7a94f0d.png';
import instagramPhoto from 'figma:asset/7908cc95b51e4da62111a52533d59e9ff10cea21.png';
import linkedinPhoto from 'figma:asset/889909b48ee021025e71d69b390ad6902f141398.png';
import aiProcessingPhoto from 'figma:asset/9fbd94f84c686f8a660346c0a5b33d5f11f2713f.png';

export function HowItWorks() {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [pixelLevel, setPixelLevel] = useState(10);
  const dragX = useMotionValue(0);

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
      image: "https://images.unsplash.com/photo-1618842688917-0540b01cb7fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjAwMjE3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
      image: "https://images.unsplash.com/photo-1658688976101-e19db9ab35d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJlYWNoJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwMDA4NDI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
        <div className="relative">
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
            <div className="relative max-w-[260px] mx-auto">
              <img 
                src={phoneImage} 
                alt="Phone gallery"
                className="w-full h-auto rounded-3xl"
              />
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <span className="text-lg">📷</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <span className="text-lg">🌈</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <span className="text-lg">💾</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <span className="text-lg">📱</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <span className="text-lg">f</span>
              </div>
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
        <div className="relative">
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
            <div className="relative aspect-square max-w-[250px] mx-auto rounded-xl overflow-hidden bg-gray-800">
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
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-70"
                style={{
                  top: `${((10 - pixelLevel) / 10) * 100}%`,
                  transition: 'top 0.3s linear'
                }}
              />
              
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/80 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-pink-400" />
                      AI Processing...
                    </span>
                    <span className="text-pink-400 text-xs">{Math.round(((10 - pixelLevel) / 10) * 100)}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300"
                      style={{ width: `${((10 - pixelLevel) / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1 shadow-lg">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>AI Enhancement</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: "Use Across All Platforms",
      description: "Get professional photos optimized for LinkedIn, dating apps, Instagram, Pinterest, and more. Stand out everywhere with PhotoGlow's stunning AI-generated portraits.",
      icon: Grid3x3,
      visual: (
        <div className="relative">
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
            {/* Platform cards carousel with drag */}
            <div className="relative h-[380px] max-w-[260px] mx-auto overflow-hidden">
              {platforms.map((platform, index) => {
                const isActive = currentProfile === index;
                const isPrev = currentProfile === (index - 1 + platforms.length) % platforms.length;
                const isNext = currentProfile === (index + 1) % platforms.length;
                
                return (
                  <motion.div
                    key={platform.name}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : isPrev || isNext ? 0.3 : 0,
                      scale: isActive ? 1 : 0.85,
                      x: isActive ? 0 : isPrev ? -50 : isNext ? 50 : 0,
                      zIndex: isActive ? 10 : isPrev || isNext ? 5 : 0,
                      rotateY: isActive ? 0 : isPrev ? 10 : isNext ? -10 : 0
                    }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.32, 0.72, 0, 1]
                    }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    style={{
                      x: isActive ? dragX : 0
                    }}
                  >
                    <div className={`bg-gradient-to-br ${platform.bgGradient} rounded-2xl overflow-hidden border-2 ${platform.borderColor} shadow-xl h-full flex flex-col`}>
                      {/* Platform image */}
                      <div className="relative h-[240px] flex-shrink-0">
                        <ImageWithFallback
                          src={platform.image}
                          alt={platform.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        
                        {/* Platform badge with logo */}
                        {platform.badge}

                        {/* AI Enhanced badge */}
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2.5 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg">
                          <Sparkles className="w-3 h-3" />
                          <span>AI</span>
                        </div>
                      </div>

                      {/* Platform info */}
                      <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-gray-800/50 to-gray-900/80 backdrop-blur-sm">
                        <div>
                          <h4 className="text-white mb-1">{platform.title}</h4>
                          <p className="text-gray-300 text-xs mb-3">{platform.subtitle}</p>
                        </div>

                        {/* Platform-specific action */}
                        <div className="flex justify-center">
                          {platform.action}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Swipe hint */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs flex items-center gap-2 pointer-events-none">
                <span>←</span>
                <span>Swipe</span>
                <span>→</span>
              </div>
            </div>

            {/* Platform indicators */}
            <div className="flex justify-center gap-2 mt-10">
              {platforms.map((platform, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProfile(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentProfile
                      ? 'w-6 bg-gradient-to-r from-pink-500 to-purple-600'
                      : 'w-2 bg-gray-600 hover:bg-gray-500'
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
    <section className="section-spacing bg-black relative overflow-hidden section-separator">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-purple-900/5 to-violet-900/10" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
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

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Gradient circle with number */}
              <div className="flex justify-center mb-6">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 opacity-20 blur-sm" />
                  <div className="absolute inset-0 rounded-full border-2 border-pink-500/40 bg-gradient-to-br from-pink-500/10 to-purple-500/10 flex items-center justify-center">
                    <span className="text-white text-xl">{step.number}</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl text-center mb-4 min-h-[64px] flex items-center justify-center">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-center mb-6 leading-relaxed min-h-[96px]">
                {step.description}
              </p>

              {/* Visual */}
              <div className="mt-6">
                {step.visual}
              </div>
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
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/30 rounded-full px-6 py-3">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="text-white">Ready to transform your photos?</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
