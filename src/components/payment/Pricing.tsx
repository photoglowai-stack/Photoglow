import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LazyImage } from './LazyImage';
import { 
  Star, 
  Sparkles, 
  Lock, 
  Zap, 
  Shield, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft,
  Camera,
  Briefcase,
  Check,
  Edit3,
  Crop,
  ZoomOut,
  Lightbulb,
  Video,
  Palette,
  Link2,
  Wand2,
  Shirt,
  Rocket,
  User,
  Image,
  Users
} from 'lucide-react';

interface PhotoGlowPricingProps {
  selectedPurpose: string;
  onPurchase: (packageId: string) => void;
  onBack?: () => void;
}

interface PricingFeature {
  icon: React.ElementType;
  text: string;
  highlight?: boolean;
}

interface PricingPackage {
  id: string;
  name: string;
  emoji: string;
  photos: number;
  price: string;
  originalPrice?: string;
  badge?: string;
  popular?: boolean;
  description: string;
  features: PricingFeature[];
  personalUseOnly?: boolean;
  commercialLicense?: boolean;
}

const allPackages: PricingPackage[] = [
  {
    id: 'standard',
    name: 'Standard Pack',
    emoji: '🟢',
    photos: 50,
    price: '19.90',
    description: 'Perfect for individuals who want simple, high-fidelity AI photos.',
    personalUseOnly: true,
    features: [
      { icon: Check, text: 'Balanced quality (optimized for natural look)' },
      { icon: Check, text: 'Process one photo at a time' },
      { icon: Check, text: 'Standard delivery (up to 24h)' },
      { icon: Check, text: 'Email support' },
    ]
  },
  {
    id: 'premium',
    name: 'Premium Pack',
    emoji: '💎',
    photos: 500,
    price: '39.90',
    badge: 'Most Popular',
    popular: true,
    description: 'Ideal for creators, designers, and influencers who want creative control and flexibility.',
    features: [
      { icon: Check, text: 'Ultra HD quality' },
      { icon: Zap, text: 'Instant delivery', highlight: true },
      { icon: Shield, text: 'Priority support' },
      { icon: User, text: 'Create your own AI persona' },
      { icon: Image, text: 'Add custom objects in photos' },
      { icon: Shirt, text: 'Virtual Try-On' },
      { icon: Edit3, text: 'Edit photos' },
      { icon: Crop, text: 'Crop & resize' },
      { icon: ZoomOut, text: 'Zoom out or expand photos' },
      { icon: Lightbulb, text: 'Relight photos' },
      { icon: Video, text: 'Shoot short AI videos' },
      { icon: Palette, text: 'Use LoRAs from Civitai' },
      { icon: Link2, text: 'Combine multiple photos' },
      { icon: Wand2, text: 'Magic upscaler for improved details' },
      { icon: Shirt, text: 'Try on clothes (Shopify-ready)' },
      { icon: Rocket, text: 'Early access to new features' },
    ]
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    emoji: '🚀',
    photos: 1500,
    price: '79.90',
    badge: 'Best Value',
    description: 'For professionals, agencies, and power users who need maximum creative freedom.',
    commercialLicense: true,
    features: [
      { icon: Check, text: 'Ultra HD + Fine-tuning for perfect likeness' },
      { icon: Zap, text: 'Instant delivery', highlight: true },
      { icon: Shield, text: 'VIP support', highlight: true },
      { icon: Users, text: 'Unlimited AI personas', highlight: true },
      { icon: Image, text: 'Add custom objects in photos' },
      { icon: Shirt, text: 'Virtual Try-On (advanced)' },
      { icon: Edit3, text: 'Full photo editing suite' },
      { icon: Video, text: 'Generate AI videos' },
      { icon: Lightbulb, text: 'Dynamic relighting tools' },
      { icon: Link2, text: 'Merge and layer photos' },
      { icon: Palette, text: 'Import custom LoRAs and styles' },
      { icon: Wand2, text: 'Magic upscaler (high-precision)' },
      { icon: Rocket, text: 'Early access to experimental AI features' },
      { icon: Briefcase, text: 'Commercial use license', highlight: true },
    ]
  }
];

const exampleImages = [
  'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODc2MjYyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbnxlbnwxfHx8fDE3NTg3MjMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1544601386-904f9418a792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMHdvbWFufGVufDF8fHx8MTc1Nzg4NzkyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1669268576117-d58d73b6d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRpbmclMjBwcm9maWxlJTIwYXR0cmFjdGl2ZSUyMG1hbnxlbnwxfHx8fDE3NTc4ODc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
];

export function PhotoGlowPricing({ selectedPurpose, onPurchase, onBack }: PhotoGlowPricingProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('premium'); // Default to premium (most popular)

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % exampleImages.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + exampleImages.length) % exampleImages.length);
  };

  const handlePurchase = async () => {
    if (!selectedPackage) return;
    setIsProcessing(true);
    setTimeout(() => {
      onPurchase(selectedPackage);
    }, 2000);
  };

  const getPrice = () => {
    const selectedPkg = allPackages.find(pkg => pkg.id === selectedPackage);
    return selectedPkg?.price || '0';
  };

  const getSelectedPackage = () => {
    return allPackages.find(pkg => pkg.id === selectedPackage);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header - Responsive */}
      <header className="w-full px-4 md:px-6 py-4 flex items-center justify-between bg-black/50 backdrop-blur-md border-b border-orange-500/20">
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
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg md:text-xl truncate">PhotoGlow</span>
        </div>
        
        <Badge className="hidden md:flex bg-orange-500/20 text-orange-400 border-orange-500/30 flex-shrink-0">
          <Star className="w-4 h-4 mr-2" />
          #1 AI Photo Enhancement
        </Badge>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Main Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            💰 AI Photo Packs
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose the perfect pack for your creative needs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* Left Column - Preview Section */}
          <div className="space-y-6 md:space-y-8">
            <div className="text-center">
              <div className="flex flex-col md:flex-row items-center justify-center mb-4 gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Real Results from Other Users
                </h2>
              </div>
              
              {/* Circular Progress Score */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#orangeGradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${91 * 2.51} ${100 * 2.51}`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">+91%</div>
                    <div className="text-xs text-gray-400">upgrade</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-transparent bg-clip-text font-bold text-xl mb-2">
                Photo Enhancement Score: +91%
              </div>
              <p className="text-gray-300 text-sm max-w-md mx-auto">
                See how our AI transforms photos – these are real results from actual users.
              </p>
            </div>

            {/* Photo Carousel */}
            <div className="relative">
              <div className="relative h-80 md:h-96 bg-gray-800 rounded-2xl overflow-hidden mb-4">
                <LazyImage
                  src={exampleImages[currentPhotoIndex]}
                  alt={`Enhanced photo ${currentPhotoIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation buttons */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
                
                {/* Improvement indicator */}
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-yellow-500 px-3 py-1 rounded-full text-white text-sm font-semibold">
                  +91% improvement
                </div>
              </div>
              
              {/* Photo indicators */}
              <div className="flex justify-center space-x-2">
                {exampleImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentPhotoIndex
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Packages */}
          <div className="space-y-6">
            {/* Packages Grid */}
            <div className="space-y-4">
              {allPackages.map((pkg) => {
                const isSelected = selectedPackage === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
                      isSelected 
                        ? 'border-orange-500 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 shadow-lg shadow-orange-500/20' 
                        : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                    } ${pkg.popular ? 'ring-2 ring-orange-500/50' : ''}`}
                  >
                    {/* Badge */}
                    {pkg.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold ${
                          pkg.popular 
                            ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white' 
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {pkg.badge}
                        </span>
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{pkg.emoji}</span>
                          <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                        </div>
                        <p className="text-gray-400 text-sm">{pkg.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">€{pkg.price}</div>
                        <div className="text-sm text-gray-400">{pkg.photos} photos</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {pkg.features.slice(0, 5).map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Icon className={`w-4 h-4 flex-shrink-0 ${
                              feature.highlight ? 'text-orange-400' : 'text-green-400'
                            }`} />
                            <span className={feature.highlight ? 'text-white font-medium' : 'text-gray-300'}>
                              {feature.text}
                            </span>
                          </div>
                        );
                      })}
                      {pkg.features.length > 5 && (
                        <div className="text-xs text-gray-400 ml-6">
                          + {pkg.features.length - 5} more features
                        </div>
                      )}
                    </div>

                    {/* Special labels */}
                    {pkg.personalUseOnly && (
                      <div className="text-xs text-yellow-400 flex items-center gap-1 mt-3">
                        <span>⚠️</span>
                        <span>Personal use only</span>
                      </div>
                    )}
                    {pkg.commercialLicense && (
                      <div className="text-xs text-green-400 flex items-center gap-1 mt-3">
                        <Briefcase className="w-3 h-3" />
                        <span className="font-medium">Commercial use license included</span>
                      </div>
                    )}

                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Purchase Button */}
            <Button
              onClick={handlePurchase}
              disabled={isProcessing || !selectedPackage}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold text-lg py-4 rounded-xl disabled:opacity-50 shadow-lg shadow-orange-500/30"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                `Get ${getSelectedPackage()?.name} – €${getPrice()}`
              )}
            </Button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Instant access</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Reassurance Bar */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="flex justify-center items-center space-x-12">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300">Secure payment</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300">Instant unlock</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300">Trusted by 100k+ users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}