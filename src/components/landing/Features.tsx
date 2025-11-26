import { memo } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Sparkles, 
  Shield, 
  Zap, 
  Camera, 
  Users, 
  Heart,
  Smartphone,
  Clock,
  Award
} from 'lucide-react';

// Static data moved outside component to prevent re-creation
const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Enhancement",
    description: "Advanced AI algorithms enhance your photos while keeping them 100% authentic and natural-looking.",
    highlight: "99.9% accuracy"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your photos are processed securely and deleted after 24 hours. We never store or share your images.",
    highlight: "Fully private"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get your enhanced photos in under 60 seconds. No waiting, no delays - just instant transformation.",
    highlight: "< 60 seconds"
  },
  {
    icon: Camera,
    title: "Professional Quality",
    description: "Studio-quality results without the studio. Perfect lighting, composition, and photo editing.",
    highlight: "Studio-grade"
  },
  {
    icon: Users,
    title: "Multiple Styles",
    description: "Choose from casual, professional, outdoor, or party styles. Perfect for every dating scenario.",
    highlight: "20+ styles"
  },
  {
    icon: Heart,
    title: "Match Guarantee",
    description: "97% of users see a significant increase in matches within the first week or money back.",
    highlight: "Match guarantee"
  }
];

const benefits = [
  {
    icon: Smartphone,
    title: "Works on Any Device",
    description: "Upload from your phone, tablet, or computer. Works seamlessly across all platforms."
  },
  {
    icon: Clock,
    title: "24/7 Processing",
    description: "Our AI never sleeps. Get your photos enhanced any time, day or night."
  },
  {
    icon: Award,
    title: "Award-Winning Technology",
    description: "Recognized by industry experts for breakthrough AI photo enhancement technology."
  }
];

// Memoized: Static feature content - Animations CSS natives
export const Features = memo(function Features() {
  return (
    <section id="features" className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-b from-black to-purple-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Cutting-Edge Features
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Why Choose
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {" "}PhotoGlow?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our advanced AI technology and user-first approach make us the #1 choice 
            for AI photo generation and enhancement.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="p-6 h-full bg-white/5 backdrop-blur-md border-purple-500/30 hover:bg-white/10 hover:border-pink-500/50 hover:-translate-y-2 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 text-xs">
                      {feature.highlight}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white group-hover:text-pink-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-3xl p-8 border border-pink-500/20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Plus These Amazing Benefits
            </h3>
            <p className="text-gray-300">
              Everything you need for dating success, all in one platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center space-y-4 animate-in fade-in zoom-in-95 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto">
                  <benefit.icon className="w-8 h-8 text-pink-400" />
                </div>
                <h4 className="font-semibold text-white">{benefit.title}</h4>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
