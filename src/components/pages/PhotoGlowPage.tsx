'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';
import { 
  Star, 
  Sparkles, 
  Users, 
  TrendingUp, 
  Camera, 
  Heart, 
  Briefcase, 
  Waves,
  ArrowLeft,
  Lock,
  Zap,
  Shield,
  ChevronLeft,
  ChevronRight,
  Clock,
  Upload,
  Download,
  Check,
  Palette,
  Shirt,
  ArrowRight
} from 'lucide-react';

interface PhotoGlowPageProps {
  onBack?: () => void;
  onSelectPurpose?: (purpose: string) => void;
}

interface PurposeOption {
  id: string;
  title: string;
  tagline: string;
  icon: any;
  image: string;
}

export function PhotoGlowPage({ onBack, onSelectPurpose }: PhotoGlowPageProps) {
  const [selectedPurpose, setSelectedPurpose] = useState<string>('');
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const purposeOptions: PurposeOption[] = [
    {
      id: 'professional',
      title: 'AI Headshots',
      tagline: 'For your professional profile',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1759399093797-997e0c85e85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGhlYWRzaG90JTIwcG9ydHJhaXQlMjBjb25maWRlbnR8ZW58MXx8fHwxNzYwMDk3MjI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'model',
      title: 'AI Model Photo',
      tagline: 'Runway-ready fashion looks',
      icon: Shirt,
      image: 'https://images.unsplash.com/photo-1717765697681-5a160db970d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdCUyMHN0dWRpbyUyMGJlYXV0aWZ1bHxlbnwxfHx8fDE3NjAwOTcyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'dating',
      title: 'AI Dating Photos',
      tagline: 'Boost your dating success',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1755519024827-fd05075a7200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwcGhvdG8lMjBhdHRyYWN0aXZlJTIwc21pbGV8ZW58MXx8fHwxNzYwMDk3MjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'selfie',
      title: 'AI Selfie Generator',
      tagline: 'Perfect for social media',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1758525866119-8246f9f940ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmaWUlMjBwb3J0cmFpdCUyMGhhcHB5JTIwYXV0aGVudGljfGVufDF8fHx8MTc2MDA5NzIzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'portrait',
      title: 'AI Portrait Generator',
      tagline: 'Create artistic masterpieces',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1758216959230-f447e3ba0abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMHBvcnRyYWl0JTIwY3JlYXRpdmUlMjBsaWdodGluZ3xlbnwxfHx8fDE3NjAwOTcyMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'realistic',
      title: 'AI Realistic Photo',
      tagline: 'Ultra-realistic portraits',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1748500192009-f19ae6606960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwcG9ydHJhaXQlMjBwaG90b2dyYXBoeSUyMHJlYWxpc3RpY3xlbnwxfHx8fDE3NjAwOTcyMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const beforeAfterExamples = [
    {
      id: 1,
      beforeImage: 'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODc2MjYyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      afterImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      improvement: '+94%'
    },
    {
      id: 2,
      beforeImage: 'https://images.unsplash.com/photo-1758274252417-dd8173e5ab8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBhcHAlMjBzZWxmaWUlMjB5b3VuZ3xlbnwxfHx8fDE3NTg4MDU3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      afterImage: 'https://images.unsplash.com/photo-1669268576117-d58d73b6d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMG1hbnxlbnwxfHx8fDE3NTc4ODc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      improvement: '+89%'
    },
    {
      id: 3,
      beforeImage: 'https://images.unsplash.com/photo-1632024346940-1354e1a59a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHNlbGZpZSUyMHNvY2lhbCUyMG1lZGlhfGVufDF8fHx8MTc1ODgwNTc1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      afterImage: 'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      improvement: '+92%'
    }
  ];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextExample = () => {
    setCurrentExampleIndex((prev) => (prev + 1) % beforeAfterExamples.length);
  };

  const prevExample = () => {
    setCurrentExampleIndex((prev) => (prev - 1 + beforeAfterExamples.length) % beforeAfterExamples.length);
  };

  const handlePurposeSelect = (purposeId: string) => {
    setSelectedPurpose(purposeId);
  };

  const handleUpgrade = () => {
    if (!selectedPurpose) return;
    setIsProcessing(true);
    setTimeout(() => {
      if (onSelectPurpose) {
        onSelectPurpose(selectedPurpose);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Purple/Pink Light Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-violet-500/25 rounded-full blur-3xl"
        />
      </div>

      {/* Header - Responsive */}
      <header className="relative z-10 w-full px-4 md:px-6 py-4 flex items-center justify-between bg-black/50 backdrop-blur-md border-b border-pink-500/20">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          {onBack && (
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white flex-shrink-0 md:w-auto md:px-4"
            >
              <ArrowLeft className="w-5 h-5 md:mr-2" />
              <span className="hidden md:inline">Back</span>
            </Button>
          )}
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg md:text-xl truncate">PhotoGlow</span>
        </div>
        
        <Badge className="hidden md:flex bg-pink-500/20 text-pink-400 border-pink-500/30 flex-shrink-0">
          <Star className="w-4 h-4 mr-2" />
          #1 AI Photo Enhancement
        </Badge>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Centered Content Layout */}
        <div className="text-center space-y-12 md:space-y-16">
          
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto px-4">
              Transform Your Photos with
              <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                {" "}AI Photo Generator
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto px-4">
              Professional AI-enhanced photos in minutes. Choose your purpose and watch our advanced AI create stunning, authentic results.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 md:w-5 h-4 md:h-5 text-green-400" />
                <span className="text-sm md:text-base text-gray-300">500% better results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 md:w-5 h-4 md:h-5 text-pink-400" />
                <span className="text-sm md:text-base text-gray-300">50K+ happy users</span>
              </div>
            </div>
          </motion.div>

          {/* AI Styles Section - REDESIGNED */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Enhanced Title */}
            <div className="text-center space-y-4">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              >
                Explore Our AI Styles
              </motion.h2>
              
              {/* Animated gradient underline */}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="flex justify-center"
              >
                <div className="relative w-32 h-1 overflow-hidden rounded-full">
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{ width: "50%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-70" />
                </div>
              </motion.div>

              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
                Choose the style that matches your vision. Each AI model is trained to create authentic, emotionally engaging portraits.
              </p>
            </div>

            {/* Redesigned Category Grid - More Human & Engaging */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
              {purposeOptions.map((style, index) => (
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={() => onSelectPurpose?.(style.id)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl h-64 sm:h-72 md:h-80 lg:h-96 transition-all duration-500 group-hover:shadow-2xl">
                    {/* Full-bleed high-quality photo */}
                    <div className="absolute inset-0 pointer-events-none">
                      <ImageWithFallback
                        src={style.image}
                        alt={style.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />
                      {/* Dark overlay gradient for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* Neon glow border on hover */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-500/60 transition-all duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          boxShadow: '0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)',
                        }}
                      />
                    </div>

                    {/* Content overlay */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-6 md:p-7">
                      {/* Tagline */}
                      <motion.p 
                        className="text-xs sm:text-sm text-gray-300 mb-2 font-medium tracking-wide"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                      >
                        {style.tagline}
                      </motion.p>

                      {/* Large CTA-style title */}
                      <motion.h3 
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:scale-105 transition-transform duration-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 + index * 0.05 }}
                      >
                        {style.title}
                      </motion.h3>

                      {/* CTA Button Effect */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-2 text-sm sm:text-base text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <span className="font-semibold">Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* As Featured In */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="py-8"
          >
            <p className="text-gray-400 text-sm mb-6">AS FEATURED IN</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <span className="text-gray-500 text-xl">TechCrunch</span>
              <span className="text-gray-500 text-xl">Forbes</span>
              <span className="text-gray-500 text-xl">Wired</span>
              <span className="text-gray-500 text-xl">The Verge</span>
            </div>
          </motion.div>

          {/* Before/After Examples */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                See The <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">Magic</span>
              </h2>
              <p className="text-gray-400 text-lg">Real transformations from our AI</p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {beforeAfterExamples.map((example) => (
                  <motion.div
                    key={example.id}
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden border-2 border-gray-800 group-hover:border-pink-500/50 transition-all duration-300">
                      {/* Before */}
                      <div className="relative aspect-[3/4]">
                        <ImageWithFallback
                          src={example.beforeImage}
                          alt="Before"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-red-500/90 text-white text-xs px-2 py-1 rounded">
                          Before
                        </div>
                      </div>
                      {/* After */}
                      <div className="relative aspect-[3/4]">
                        <ImageWithFallback
                          src={example.afterImage}
                          alt="After"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded">
                          After
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <Badge className="bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0">
                        {example.improvement} Better
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                How It <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">Works</span>
              </h2>
              <p className="text-gray-400 text-lg">Get stunning AI photos in 3 simple steps</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: '01',
                  icon: Upload,
                  title: 'Upload Your Photos',
                  description: 'Choose your best selfies or portraits. Our AI works with any photo quality.'
                },
                {
                  step: '02',
                  icon: Sparkles,
                  title: 'AI Enhancement',
                  description: 'Our advanced AI analyzes and enhances your photos in minutes with professional quality.'
                },
                {
                  step: '03',
                  icon: Download,
                  title: 'Download & Use',
                  description: 'Get your enhanced photos instantly. Perfect for dating apps, LinkedIn, or social media.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-center space-y-4">
                    <div className="relative inline-block">
                      <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-black border-2 border-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-pink-400 text-sm font-bold">{item.step}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-pink-500/50 to-transparent"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
                What Our <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">Users Say</span>
              </h2>
              <p className="text-gray-400 text-lg">Join 50,000+ happy users</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: 'Sarah M.',
                  role: 'Marketing Professional',
                  rating: 5,
                  text: 'My LinkedIn profile views increased 300% after using PhotoGlow! The AI made my headshot look incredibly professional.',
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
                },
                {
                  name: 'Mike T.',
                  role: 'Dating App User',
                  rating: 5,
                  text: 'Got 5x more matches on Tinder after updating my photos with PhotoGlow. The transformation is insane!',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
                },
                {
                  name: 'Emily R.',
                  role: 'Content Creator',
                  rating: 5,
                  text: 'The AI quality is mind-blowing. My Instagram engagement doubled with these professional-looking photos!',
                  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-6 h-full">
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
                      />
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{testimonial.text}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold">Lightning Fast</h4>
              <p className="text-gray-400 text-sm">Get your enhanced photos in under 5 minutes</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold">100% Private</h4>
              <p className="text-gray-400 text-sm">Your photos are processed securely and deleted after</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold">Professional Quality</h4>
              <p className="text-gray-400 text-sm">Studio-level results powered by advanced AI</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
