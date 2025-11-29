import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  Lock, 
  Zap, 
  Star, 
  Target, 
  Shield, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  Clock,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  CreditCard,
  Crown
} from 'lucide-react';
import { LazyImage } from './LazyImage';
import { Header } from './Header';

interface TinderPaymentPageProps {
  onPurchase: (packageId: string) => void;
  onBack?: () => void;
  onShowLanding?: () => void;
}

export function TinderPaymentPage({ onPurchase, onBack, onShowLanding }: TinderPaymentPageProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('annual-premium'); // Default to annual premium
  const [timeLeft, setTimeLeft] = useState(895); // ~15 minutes in seconds
  const [showReassurance, setShowReassurance] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true); // Annual by default
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Enhanced photos carousel data
  const enhancedPhotos = [
    {
      id: 1,
      before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      after: 'https://images.unsplash.com/photo-1758600588319-fa4097ee5208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwY29uZmlkZW50JTIwbWFufGVufDF8fHx8MTc2MDA1MjIyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      improvement: '+92% more attractive',
      label: 'Professional Upgrade'
    },
    {
      id: 2,
      before: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      after: 'https://images.unsplash.com/photo-1758922584983-82ffd5720c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjAwNTIyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      improvement: '+89% more confident',
      label: 'Stunning Transformation'
    },
    {
      id: 3,
      before: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      after: 'https://images.unsplash.com/photo-1690297216785-80aab79505ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kc29tZSUyMG1hbiUyMGNhc3VhbCUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjAwNTIyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      improvement: '+85% more appealing',
      label: 'Lifestyle Enhanced'
    },
    {
      id: 4,
      before: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400',
      after: 'https://images.unsplash.com/photo-1735487524925-0ced2ba82859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMG5hdHVyYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjAwNTIyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      improvement: '+94% more stunning',
      label: 'Natural Beauty'
    }
  ];

  const monthlyPlans = [
    {
      id: 'standard',
      name: 'Standard Pack',
      photos: 8,
      price: 19.90,
      originalPrice: 39.90,
      popular: false,
      features: ['8 AI-enhanced photos', 'Standard quality', '24h delivery', 'Email support']
    },
    {
      id: 'premium',
      name: 'Premium Pack',
      photos: 35,
      price: 29.90,
      originalPrice: 59.90,
      popular: true,
      savings: 'Best Value',
      features: ['35 AI-enhanced photos', 'Ultra HD quality', 'Instant delivery', 'Priority support', '3 bonus styles']
    },
    {
      id: 'pro',
      name: 'Pro Pack',
      photos: 80,
      price: 49.90,
      originalPrice: 99.90,
      popular: false,
      savings: 'Maximum Results',
      features: ['80 AI-enhanced photos', 'Ultra HD quality', 'Instant delivery', 'VIP support', '10 bonus styles', 'Exclusive filters']
    }
  ];

  const annualPlans = [
    {
      id: 'annual-standard',
      name: 'Annual Basic',
      photos: 96,
      price: 108, // 9$/month × 12 months
      monthlyPrice: 9,
      originalPrice: 228,
      popular: false,
      savings: 'Save 50%',
      features: ['96 AI photos (8/month)', 'Standard quality', '24h delivery', 'Email support', '12 months access', 'Cancel anytime']
    },
    {
      id: 'annual-premium',
      name: 'Annual Standard',
      photos: 420,
      price: 300, // 25$/month × 12 months
      monthlyPrice: 25,
      originalPrice: 588,
      popular: true,
      savings: 'Save 49% 🔥',
      features: ['420 AI photos (35/month)', 'Ultra HD quality', 'Instant delivery', 'Priority support', 'Unlimited styles', '12 months access', 'Cancel anytime']
    },
    {
      id: 'annual-pro',
      name: 'Annual Premium',
      photos: 960,
      price: 588, // 49$/month × 12 months
      monthlyPrice: 49,
      originalPrice: 1188,
      popular: false,
      savings: 'Save 51% 🔥',
      features: ['960 AI photos (80/month)', 'Ultra HD quality', 'Instant delivery', 'VIP support', 'Unlimited styles', '12 months access', 'Priority rendering', 'Exclusive filters']
    }
  ];

  // Get current plans based on toggle
  const currentPlans = isAnnual ? annualPlans : monthlyPlans;

  // Update selected package when switching billing period
  useEffect(() => {
    // Map between monthly and annual packages
    const packageMapping: Record<string, string> = {
      'standard': 'annual-standard',
      'premium': 'annual-premium',
      'pro': 'annual-pro',
      'annual-standard': 'standard',
      'annual-premium': 'premium',
      'annual-pro': 'pro'
    };
    
    if (packageMapping[selectedPackage]) {
      setSelectedPackage(packageMapping[selectedPackage]);
    }
  }, [isAnnual]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance carousel with transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % enhancedPhotos.length);
        setIsTransitioning(false);
      }, 250);
    }, 4000);
    return () => clearInterval(interval);
  }, [enhancedPhotos.length]);

  // Show reassurance after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowReassurance(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePurchase = () => {
    onPurchase(selectedPackage);
  };

  const handlePhotoChange = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPhotoIndex(newIndex);
      setIsTransitioning(false);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] relative overflow-hidden">
      <Header onShowLanding={onShowLanding} currentPage="pricing" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/8 via-transparent to-pink-900/8 pointer-events-none" />
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse-slow-delayed" />
      </div>

      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group animate-in fade-in slide-in-from-left-4 duration-300"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
      )}

      {/* Main Content - 2 Column Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* LEFT SECTION - Social Proof & Results */}
          <div className="lg:sticky lg:top-24 space-y-6 animate-in fade-in slide-in-from-left-8 duration-600">
            {/* Header with stat circle */}
            <div className="space-y-4">
              {/* Upgrade stat badge */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 animate-spin-slow" viewBox="0 0 120 120">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9333EA" />
                        <stop offset="50%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#9333EA" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="60"
                      cy="60"
                      r="56"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeDasharray="10 5"
                      opacity="0.6"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-pink-400 mb-1" />
                    <div className="text-2xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                      +87%
                    </div>
                    <div className="text-xs text-gray-400">Upgrade</div>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl text-white mb-2">
                  Real Results from Other Users
                </h1>
                <p className="text-gray-400 text-lg">
                  See how our AI boosted dating profiles — these are real results from real users.
                </p>
              </div>
            </div>

            {/* Before/After Carousel */}
            <div className="relative bg-[#18181B] rounded-2xl p-6 shadow-2xl border border-white/5">
              <div className={`space-y-4 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {/* Before/After Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Badge className="bg-gray-700/50 text-gray-300 text-xs">Before</Badge>
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800">
                      <LazyImage
                        src={enhancedPhotos[currentPhotoIndex].before}
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs">After</Badge>
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800 ring-2 ring-pink-500/50 shadow-lg shadow-pink-500/20">
                      <LazyImage
                        src={enhancedPhotos[currentPhotoIndex].after}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                      {/* Improvement label */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                        <div className="text-pink-400 text-sm">
                          {enhancedPhotos[currentPhotoIndex].improvement}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Label */}
                <div className="text-center">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {enhancedPhotos[currentPhotoIndex].label}
                  </Badge>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePhotoChange((currentPhotoIndex - 1 + enhancedPhotos.length) % enhancedPhotos.length)}
                  className="text-gray-400 hover:text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                {/* Dots indicator */}
                <div className="flex gap-2">
                  {enhancedPhotos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePhotoChange(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentPhotoIndex
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 w-6'
                          : 'bg-gray-600 w-2'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePhotoChange((currentPhotoIndex + 1) % enhancedPhotos.length)}
                  className="text-gray-400 hover:text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Social proof strip */}
            <div className="bg-[#18181B] rounded-xl p-4 border border-white/5 flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-gray-300 text-sm">
                <span className="text-white">4.8/5</span> · 50K+ users upgraded their profiles
              </div>
            </div>

            {/* Trust indicators - desktop only */}
            <div className="hidden lg:grid grid-cols-3 gap-4">
              {[
                { icon: Shield, text: '100% Private' },
                { icon: Zap, text: 'Instant Delivery' },
                { icon: Lock, text: 'Secure Payment' }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center gap-2 text-center p-3 bg-[#18181B]/50 rounded-lg border border-white/5 animate-in fade-in zoom-in-95 duration-300"
                  style={{ animationDelay: `${400 + idx * 100}ms` }}
                >
                  <item.icon className="w-5 h-5 text-purple-400" />
                  <span className="text-xs text-gray-400">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SECTION - Checkout */}
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-600 delay-200">
            {/* Limited-Time Offer Banner */}
            <div className="relative bg-gradient-to-r from-red-600/20 via-orange-600/20 to-red-600/20 rounded-2xl p-6 border border-red-500/30 overflow-hidden">
              <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-5 h-5 text-orange-400" />
                    <span className="text-orange-400">Limited-Time Offer</span>
                  </div>
                  <p className="text-gray-300 text-sm">Special pricing ends soon!</p>
                </div>
                <div className="bg-black/50 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <div className="text-2xl text-white font-mono tabular-nums animate-pulse-gentle">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none animate-shine" />
            </div>

            {/* Main Payment Card */}
            <div className="bg-[#18181B] rounded-2xl p-6 md:p-8 border border-white/5 shadow-2xl space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl text-white">
                  Your AI Model is Ready
                </h2>
                <p className="text-gray-400">
                  Unlock your enhanced photos and boost your results instantly.
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-3">
                {[
                  { icon: Target, text: 'Multiply your matches', color: 'text-pink-400' },
                  { icon: Zap, text: 'Instant AI delivery', color: 'text-purple-400' },
                  { icon: Lock, text: '100% privacy guaranteed', color: 'text-blue-400' }
                ].map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-300"
                    style={{ animationDelay: `${400 + idx * 100}ms` }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className={`w-4 h-4 ${benefit.color}`} />
                    </div>
                    <span className="text-gray-300">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

              {/* Pricing Plans */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white">Choose Your Pack</h3>
                  
                  {/* Billing Toggle */}
                  <div className="flex items-center gap-3 bg-gray-800/50 rounded-full p-1 border border-gray-700">
                    <button
                      onClick={() => setIsAnnual(false)}
                      className={`px-4 py-1.5 rounded-full transition-all text-sm ${
                        !isAnnual
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setIsAnnual(true)}
                      className={`px-4 py-1.5 rounded-full transition-all text-sm flex items-center gap-1.5 ${
                        isAnnual
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Annual
                      {!isAnnual && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px] px-1 py-0">
                          -70%
                        </Badge>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {currentPlans.map((plan, planIdx) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPackage(plan.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] ${
                        selectedPackage === plan.id
                          ? 'border-purple-500 bg-gradient-to-br from-purple-500/10 to-pink-500/10 shadow-lg shadow-purple-500/20'
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                    >
                      {/* Popular badge */}
                      {plan.popular && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            Popular
                          </Badge>
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 pr-2">
                          <div className="text-white mb-1">{plan.name}</div>
                          <div className="text-sm text-gray-400">{plan.photos} AI-enhanced photos</div>
                          {plan.savings && (
                            <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                              {plan.savings}
                            </Badge>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          {plan.originalPrice && (
                            <div className="text-sm text-gray-500 line-through mb-0.5">
                              ${plan.originalPrice}
                            </div>
                          )}
                          {isAnnual && 'monthlyPrice' in plan ? (
                            // Annual plan - show only monthly price
                            <div>
                              <div className="text-2xl text-white">${plan.monthlyPrice}</div>
                              <div className="text-xs text-gray-500">/month</div>
                              <div className="text-[10px] text-gray-600">billed annually</div>
                            </div>
                          ) : (
                            // Monthly plan - show one-time price
                            <div>
                              <div className="text-2xl text-white">${plan.price}</div>
                              <div className="text-xs text-gray-500">one-time</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-1.5">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Selection indicator */}
                      {selectedPackage === plan.id && (
                        <div className="absolute inset-0 border-2 border-purple-500 rounded-xl pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

              {/* CTA Section */}
              <div className="space-y-4">
                <h3 className="text-white text-center">Ready to Glow Up?</h3>
                
                <Button
                  onClick={handlePurchase}
                  className="w-full h-14 bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 hover:from-pink-600 hover:via-purple-700 hover:to-pink-600 text-white rounded-full text-lg shadow-2xl shadow-purple-500/50 relative overflow-hidden group hover:scale-105 active:scale-95 transition-all"
                  style={{ backgroundSize: '200% 100%' }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-shine" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Get My AI Photos
                    <span className="inline-block animate-bounce-x">→</span>
                  </span>
                </Button>

                {/* Trust line */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Private • Secure • Instant Delivery</span>
                </div>

                {/* Payment logos */}
                <div className="flex items-center justify-center gap-4 pt-2 opacity-50 grayscale">
                  <CreditCard className="w-8 h-8 text-gray-600" />
                  <div className="text-xs text-gray-600">VISA</div>
                  <div className="text-xs text-gray-600">MASTERCARD</div>
                  <div className="text-xs text-gray-600">PAYPAL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reassurance Toast - Bottom Right */}
      {showReassurance && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-8 slide-in-from-right-8 duration-500">
          <div className="bg-[#18181B] border border-purple-500/30 rounded-xl p-4 shadow-2xl shadow-purple-500/20 backdrop-blur-lg">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="text-white mb-1">Don't worry!</div>
                <p className="text-sm text-gray-400">
                  Your photos will be processed instantly after payment.
                </p>
              </div>
              <button
                onClick={() => setShowReassurance(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0B0D]/95 backdrop-blur-lg border-t border-white/10 p-4">
        <Button
          onClick={handlePurchase}
          className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg shadow-purple-500/50"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Get My AI Photos → ${currentPlans.find(p => p.id === selectedPackage)?.price}
        </Button>
      </div>
    </div>
  );
}
