import { useState } from 'react';
import { LazyImage } from './LazyImage';
import {
  ArrowLeft,
  Star,
  TrendingUp,
  Users,
  Upload,
  Wand2,
  Download,
  Briefcase,
  Zap,
  Lock,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { categoryPagesConfig } from './categoryPagesConfig';
import { BeforeAfterTransformation } from './BeforeAfterTransformation';

interface UniversalCategoryPageProps {
  categoryId: string;
  onBack: () => void;
  onGenerateNow: () => void;
  onCategorySelect?: (categoryId: string) => void;
  onPhotoDetailClick?: (photoUrl: string, photoIndex: number) => void;
}

// Map categoryId to config keys
const categoryIdToConfigKey: Record<string, string> = {
  'professional': 'ai-headshots',
  'model': 'ai-model-photo',
  'realistic': 'ai-realistic-photo',
  'selfie': 'ai-selfie',
  'portrait': 'ai-portrait',
  // Configs below don't exist yet, using fallbacks to existing configs
  'dating': 'ai-portrait', // Fallback: dating photos → portrait style
  'cosplay': 'ai-portrait', // Fallback: cosplay → artistic portrait
  'beach': 'ai-selfie', // Fallback: beach/fitness → selfie style
  'fitness': 'ai-selfie', // Fallback: fitness → selfie style
  'lifestyle': 'ai-realistic-photo', // Fallback: lifestyle → realistic photo
};

export function UniversalCategoryPage({ categoryId, onBack, onGenerateNow }: UniversalCategoryPageProps) {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

  // Get the config based on categoryId
  // Try mapping first, then use categoryId as-is, finally fallback to ai-headshots
  const configKey = categoryIdToConfigKey[categoryId] || categoryId || 'ai-headshots';
  const config = categoryPagesConfig[configKey];

  // Handle case where config is not found
  if (!config) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Category not found</h1>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleStartForm = () => {
    onGenerateNow();
  };

  const nextExample = () => {
    setCurrentExampleIndex((prev) => (prev + 1) % config.beforeAfterExamples.length);
  };

  const prevExample = () => {
    setCurrentExampleIndex((prev) => (prev - 1 + config.beforeAfterExamples.length) % config.beforeAfterExamples.length);
  };

  // Determine background glow colors based on category
  const getGlowStyle = () => {
    return config.colors.glowColor;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Light Effects - adapté aux couleurs de la catégorie */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
          style={{ backgroundColor: getGlowStyle() }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse-slow-delayed"
          style={{ backgroundColor: getGlowStyle() }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full blur-3xl animate-pulse-medium"
          style={{ backgroundColor: getGlowStyle() }}
        />
      </div>

      {/* Header - Responsive */}
      <header className={`relative z-10 w-full px-4 md:px-6 py-4 flex items-center justify-between bg-black/50 backdrop-blur-md border-b border-${config.colors.gradient.split('-')[1]}-500/20`}>
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white flex-shrink-0 md:w-auto md:px-4"
          >
            <ArrowLeft className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">Back</span>
          </Button>
          <div className={`w-8 h-8 bg-gradient-to-r ${config.colors.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <config.icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-base md:text-xl truncate">{config.title} {config.subtitle}</span>
        </div>
        
        <Badge className={`hidden md:flex bg-gradient-to-r ${config.colors.badgeGradient} border-${config.colors.gradient.split('-')[1]}-500/30 flex-shrink-0`}>
          <Star className="w-4 h-4 mr-2" />
          {config.badge}
        </Badge>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Centered Content Layout - Identical structure */}
        <div className="text-center space-y-16">
          
          {/* Hero Section */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-800">
            <h1 className="text-4xl md:text-6xl text-white leading-tight max-w-4xl mx-auto">
              {config.title}
              <span className={`bg-gradient-to-r ${config.colors.gradient} bg-clip-text text-transparent`}>
                {" "}{config.subtitle}
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Professional AI-enhanced photos in minutes. {config.keywords.slice(0, 3).join(', ')} powered by advanced AI technology.
            </p>

            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">600% better results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-pink-400" />
                <span className="text-gray-300">50K+ happy users</span>
              </div>
            </div>
          </div>

          {/* Gender Selection Form - Identical to PhotoGlow */}
          <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-8 duration-800 delay-200">
            <Card className="bg-gray-900/50 border-gray-800 p-6">
              <p className="text-sm text-gray-400 mb-4 text-center">I am a:</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setSelectedGender('male')}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${
                    selectedGender === 'male'
                      ? `border-${config.colors.gradient.split('-')[1]}-500 bg-${config.colors.gradient.split('-')[1]}-500/20 shadow-lg`
                      : 'border-gray-700 bg-gray-800/50'
                  }`}
                >
                  <span className="text-4xl mb-2 block">👨</span>
                  <span className="text-white">Man</span>
                </button>
                
                <button
                  onClick={() => setSelectedGender('female')}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${
                    selectedGender === 'female'
                      ? `border-${config.colors.gradient.split('-')[1]}-500 bg-${config.colors.gradient.split('-')[1]}-500/20 shadow-lg`
                      : 'border-gray-700 bg-gray-800/50'
                  }`}
                >
                  <span className="text-4xl mb-2 block">👩</span>
                  <span className="text-white">Woman</span>
                </button>
              </div>

              <Button 
                onClick={handleStartForm}
                size="lg"
                className={`w-full bg-gradient-to-r ${config.colors.buttonGradient} text-white py-6 text-lg hover:shadow-2xl hover:scale-102 active:scale-98 transition-all`}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Now
              </Button>
            </Card>
          </div>

          {/* Hero Image */}
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-800 delay-400">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <LazyImage
                src={config.heroImage}
                alt={`${config.title} example`}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className={`absolute bottom-6 left-6 right-6 bg-gradient-to-r ${config.colors.badgeGradient} backdrop-blur-md rounded-xl p-4 border border-gray-700`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${config.colors.gradient} rounded-full flex items-center justify-center`}>
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white">AI Generated</p>
                      <p className="text-xs text-gray-300">Professional quality</p>
                    </div>
                  </div>
                  <Badge className={`bg-gradient-to-r ${config.colors.badgeGradient}`}>
                    Ready to use
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured In Section - Identical */}
      <section className="py-16 bg-black border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-in-viewport fade-in duration-600">
            <p className="text-center text-gray-500 text-sm mb-8">AS FEATURED IN</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-40">
              {['TechCrunch', 'Forbes', 'Wired', 'The Verge', 'Mashable'].map((brand) => (
                <div key={brand} className="text-center">
                  <p className="text-gray-400 text-xl">{brand}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Identical structure */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16 animate-in-viewport fade-in slide-in-from-bottom-8 duration-600">
            <h2 className={`text-3xl md:text-5xl bg-gradient-to-r ${config.colors.gradient} bg-clip-text text-transparent`}>
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Create professional {config.title.toLowerCase()} in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className={`hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r ${config.colors.gradient}`} />

            {[
              {
                icon: Upload,
                step: 1,
                title: 'Upload Your Photo',
                description: `Upload a casual photo or selfie. Our ${config.keywords[0]} works with any photo.`
              },
              {
                icon: Wand2,
                step: 2,
                title: 'AI Enhancement',
                description: `Our ${config.keywords[1]} processes your photo and creates professional results instantly.`
              },
              {
                icon: Download,
                step: 3,
                title: 'Download & Use',
                description: `Get your ${config.keywords[2]} ready for use in minutes.`
              }
            ].map((item, index) => (
              <div
                key={index}
                className="relative animate-in-viewport fade-in slide-in-from-bottom-8 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="bg-gray-900/50 border-gray-800 p-8 hover:border-gray-700 transition-all h-full">
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-r ${config.colors.gradient} rounded-full flex items-center justify-center text-white shadow-lg z-10`}>
                    {item.step}
                  </div>
                  
                  <div className="mt-6 space-y-4 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${config.colors.badgeGradient} rounded-2xl flex items-center justify-center mx-auto border border-gray-700`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl text-white">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Examples - With carousel like PhotoGlow */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16 animate-in-viewport fade-in slide-in-from-bottom-8 duration-600">
            <h2 className="text-3xl md:text-5xl text-white">
              Real Transformations
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See how our {config.keywords[0]} transforms photos
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="grid grid-cols-2 gap-4">
              <div
                key={`before-${currentExampleIndex}`}
                className="relative group animate-fade-in"
              >
                <LazyImage
                  src={config.beforeAfterExamples[currentExampleIndex].before}
                  alt="Before photo"
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute top-3 left-3 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                  Before
                </div>
              </div>

              <div
                key={`after-${currentExampleIndex}`}
                className="relative group animate-fade-in"
              >
                <LazyImage
                  src={config.beforeAfterExamples[currentExampleIndex].after}
                  alt="After AI enhancement"
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${config.colors.badgeGradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                <div className={`absolute top-3 right-3 bg-gradient-to-r ${config.colors.gradient} px-3 py-1 rounded-full text-xs shadow-lg`}>
                  After
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <p 
                key={currentExampleIndex}
                className={`text-2xl bg-gradient-to-r ${config.colors.gradient} bg-clip-text text-transparent animate-fade-in`}
              >
                {config.beforeAfterExamples[currentExampleIndex].improvement} Better Results
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              <Button
                onClick={prevExample}
                variant="ghost"
                className="text-white hover:bg-gray-800"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex space-x-2">
                {config.beforeAfterExamples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentExampleIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentExampleIndex 
                        ? `bg-gradient-to-r ${config.colors.gradient} w-8`
                        : 'bg-gray-600 w-2'
                    }`}
                  />
                ))}
              </div>
              <Button
                onClick={nextExample}
                variant="ghost"
                className="text-white hover:bg-gray-800"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Examples Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16 animate-in-viewport fade-in slide-in-from-bottom-8 duration-600">
            <h2 className="text-3xl md:text-5xl text-white">
              More Examples
            </h2>
            <p className="text-xl text-gray-400">
              Professional {config.title.toLowerCase()} for every style
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {config.additionalImages.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer hover:scale-105 transition-transform animate-in-viewport fade-in zoom-in-95 duration-400"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <LazyImage
                  src={image}
                  alt={`Example ${index + 1}`}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge className={`bg-gradient-to-r ${config.colors.badgeGradient}`}>
                    AI Generated
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16 animate-in-viewport fade-in slide-in-from-bottom-8 duration-600">
            <h2 className="text-3xl md:text-5xl text-white">
              Why Choose Our {config.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {config.features.map((feature, index) => (
              <div
                key={index}
                className="animate-in-viewport fade-in slide-in-from-bottom-8 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="bg-gray-900/50 border-gray-800 p-8 hover:border-gray-700 transition-all h-full">
                  <div className={`w-14 h-14 bg-gradient-to-br ${config.colors.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    {index === 0 && <Briefcase className="w-7 h-7 text-white" />}
                    {index === 1 && <Zap className="w-7 h-7 text-white" />}
                    {index === 2 && <Lock className="w-7 h-7 text-white" />}
                  </div>
                  <h3 className="text-xl text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16 animate-in-viewport fade-in slide-in-from-bottom-8 duration-600">
            <h2 className="text-3xl md:text-5xl text-white">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-400">
              Join 50,000+ happy users
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {config.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="animate-in-viewport fade-in slide-in-from-bottom-8 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="bg-gray-900/50 border-gray-800 p-6 hover:border-gray-700 transition-all h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <LazyImage
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed">"{testimonial.text}"</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16 animate-in-viewport fade-in slide-in-from-bottom-8 duration-600">
            <h2 className="text-3xl md:text-5xl text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about our {config.keywords[0]}
            </p>
          </div>

          <div className="space-y-4">
            {config.faqItems.map((faq, index) => (
              <div
                key={index}
                className="animate-in-viewport fade-in slide-in-from-bottom-4 duration-400"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="bg-gray-900/50 border-gray-800 p-6 hover:border-gray-700 transition-all">
                  <h3 className="text-lg text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Form Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-8 animate-in-viewport fade-in slide-in-from-bottom-8 duration-600">
            <h2 className="text-3xl md:text-5xl text-white">
              Ready to Create Your {config.title}?
            </h2>
            <p className="text-xl text-gray-400">
              Join 50,000+ users and get started today
            </p>

            <Card className="bg-gray-900/50 border-gray-800 p-8 max-w-md mx-auto">
              <p className="text-gray-400 mb-6 text-center">Select your gender to get started:</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setSelectedGender('male')}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${
                    selectedGender === 'male'
                      ? `border-${config.colors.gradient.split('-')[1]}-500 bg-${config.colors.gradient.split('-')[1]}-500/20 shadow-lg`
                      : 'border-gray-700 bg-gray-800/50'
                  }`}
                >
                  <span className="text-5xl mb-2 block">👨</span>
                  <span className="text-white">Man</span>
                </button>
                
                <button
                  onClick={() => setSelectedGender('female')}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${
                    selectedGender === 'female'
                      ? `border-${config.colors.gradient.split('-')[1]}-500 bg-${config.colors.gradient.split('-')[1]}-500/20 shadow-lg`
                      : 'border-gray-700 bg-gray-800/50'
                  }`}
                >
                  <span className="text-5xl mb-2 block">👩</span>
                  <span className="text-white">Woman</span>
                </button>
              </div>

              <Button 
                onClick={handleStartForm}
                size="lg"
                className={`w-full bg-gradient-to-r ${config.colors.buttonGradient} text-white py-6 text-lg hover:shadow-2xl hover:scale-102 active:scale-98 transition-all`}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Now
              </Button>

              <div className="mt-6 space-y-3">
                {[
                  '✓ Professional Quality Results',
                  '✓ Multiple Styles Available',
                  '✓ High-Resolution Downloads',
                  '✓ Ready in Under 5 Minutes'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 mt-6 text-center">
                Starting at $9.90 • No subscription • Instant delivery
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Before/After Transformation */}
      <BeforeAfterTransformation 
        onStartTransformation={handleStartForm}
      />
    </div>
  );
}
