import { LazyImage } from '../shared/LazyImage';
import { 
  Star, 
  Sparkles, 
  Users, 
  TrendingUp,
  ArrowLeft,
  Zap,
  Shield,
  Upload,
  Download,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export interface CategoryStyle {
  id: string;
  title: string;
  emoji: string;
  image: string;
  description: string;
}

export interface BeforeAfterExample {
  id: number;
  beforeImage: string;
  afterImage: string;
  improvement: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

export interface CategoryData {
  id: string;
  name: string;
  emoji: string;
  title: string;
  subtitle: string;
  seoKeyword?: string;
  description: string;
  heroImage: string;
  gradient: string;
  styles: CategoryStyle[];
  beforeAfterExamples: BeforeAfterExample[];
  testimonials: Testimonial[];
  stats: {
    users: string;
    improvement: string;
  };
}

interface CategoryPageProps {
  category: CategoryData;
  onBack: () => void;
  onPurchase: () => void;
}

export function CategoryPage({ category, onBack, onPurchase }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Purple Light Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 right-10 w-[30rem] h-[30rem] bg-pink-500/25 rounded-full blur-3xl animate-pulse-slow-delayed" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-violet-500/30 rounded-full blur-3xl animate-pulse-medium" />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between bg-black/50 backdrop-blur-md border-b border-purple-500/20">
        <div className="flex items-center space-x-2">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-gray-300 hover:text-white mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className={`w-8 h-8 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center`}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xl">{category.name}</span>
        </div>
        
        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
          <Star className="w-4 h-4 mr-2" />
          AI Enhanced
        </Badge>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-16">
          
          {/* Hero Section */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-800">
            <div className="text-6xl mb-4">{category.emoji}</div>
            <h1 className="text-4xl md:text-6xl text-white leading-tight max-w-4xl mx-auto">
              {category.title}
              <span className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                {" "}{category.seoKeyword || category.subtitle}
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {category.description}
            </p>

            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">{category.stats.improvement} better results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-pink-400" />
                <span className="text-gray-300">{category.stats.users} happy users</span>
              </div>
            </div>

            <Button
              onClick={onPurchase}
              className={`bg-gradient-to-r ${category.gradient} text-white px-8 py-6 text-lg hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-300`}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Your Photos Now
            </Button>
          </div>

          {/* AI Styles Section */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-800 delay-200">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl mb-3 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                ✨ Available AI Styles ✨
              </h2>
              <div className={`w-16 h-0.5 bg-gradient-to-r ${category.gradient} mx-auto rounded-full`}></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {category.styles.map((style, index) => (
                <div
                  key={style.id}
                  className="group cursor-pointer hover:scale-103 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-400"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative overflow-hidden rounded-xl border-2 border-gray-700 hover:border-pink-400/50 transition-all duration-300 h-56 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-violet-500/5">
                    <div className="absolute inset-0 pointer-events-none">
                      <LazyImage
                        src={style.image}
                        alt={style.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"></div>
                    </div>

                    <div className="relative z-10 h-full flex flex-col justify-end items-center text-center p-4">
                      <div className="text-4xl mb-2 filter drop-shadow-lg group-hover:scale-110 transition-transform">
                        {style.emoji}
                      </div>
                      <h3 className="text-white drop-shadow-lg mb-1">
                        {style.title}
                      </h3>
                      <p className="text-gray-300 text-xs">{style.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* As Featured In */}
          <div className="py-8 animate-in-viewport fade-in slide-in-from-bottom-8 duration-600">
            <p className="text-gray-400 text-sm mb-6">AS FEATURED IN</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['TechCrunch', 'Forbes', 'Wired', 'The Verge', 'Mashable'].map((brand) => (
                <span key={brand} className="text-gray-500 text-xl">{brand}</span>
              ))}
            </div>
          </div>

          {/* Before/After Examples */}
          <div className="space-y-8 animate-in-viewport fade-in slide-in-from-bottom-8 duration-600">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl mb-3 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                Real Transformations
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                See the amazing results our AI creates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {category.beforeAfterExamples.map((example, index) => (
                <div
                  key={example.id}
                  className="space-y-4 animate-in-viewport fade-in slide-in-from-bottom-8 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <LazyImage
                        src={example.beforeImage}
                        alt="Before"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-black/70 px-3 py-1 rounded-full text-xs">
                        Before
                      </div>
                    </div>
                    <div className="relative">
                      <LazyImage
                        src={example.afterImage}
                        alt="After"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className={`absolute top-2 right-2 bg-gradient-to-r ${category.gradient} px-3 py-1 rounded-full text-xs`}>
                        After
                      </div>
                    </div>
                  </div>
                  <div className={`text-center bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                    {example.improvement} Improvement
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="space-y-12 py-8 animate-in-viewport fade-in slide-in-from-bottom-8 duration-600">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl mb-3 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                How It Works
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Get professional AI-enhanced photos in just 3 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500"></div>

              {[
                { icon: Upload, title: 'Upload Photos', desc: 'Upload your photos and select your preferred style' },
                { icon: Sparkles, title: 'AI Enhancement', desc: 'Our advanced AI processes and enhances your photos' },
                { icon: Download, title: 'Download Results', desc: 'Get your professional photos in minutes' }
              ].map((step, index) => (
                <div
                  key={index}
                  className="relative text-center space-y-4 animate-in-viewport fade-in slide-in-from-bottom-8 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center mx-auto relative z-10`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 w-10 h-10 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center text-sm z-20`}>
                    {index + 1}
                  </div>
                  <h3 className="text-white text-xl">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-8 animate-in-viewport fade-in slide-in-from-bottom-8 duration-600">
            <div className="text-center">
              <h2 className={`text-3xl md:text-4xl mb-3 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                What Our Users Say
              </h2>
              <p className="text-gray-400">Join thousands of satisfied customers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {category.testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 space-y-4 hover:border-purple-500/50 transition-all duration-300 animate-in-viewport fade-in slide-in-from-bottom-8 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <LazyImage
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-white">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-in-viewport fade-in slide-in-from-bottom-8 duration-800">
            <div className="text-center space-y-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center mx-auto`}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white">Lightning Fast</h4>
              <p className="text-gray-400 text-sm">Get your enhanced photos in under 5 minutes</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center mx-auto`}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white">100% Private</h4>
              <p className="text-gray-400 text-sm">Your photos are processed securely and deleted after</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center mx-auto`}>
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white">Professional Quality</h4>
              <p className="text-gray-400 text-sm">Studio-level results powered by advanced AI</p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="py-12 animate-in-viewport fade-in slide-in-from-bottom-8 duration-600">
            <div className={`bg-gradient-to-r ${category.gradient} p-1 rounded-2xl max-w-2xl mx-auto`}>
              <div className="bg-black rounded-2xl p-8 space-y-6 text-center">
                <h3 className="text-3xl text-white">
                  Ready to Transform Your Photos?
                </h3>
                <p className="text-gray-300">
                  Join {category.stats.users} users and get professional AI-enhanced photos today
                </p>
                <Button
                  onClick={onPurchase}
                  className={`bg-gradient-to-r ${category.gradient} text-white px-8 py-6 text-lg hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-300`}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Start Creating Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
