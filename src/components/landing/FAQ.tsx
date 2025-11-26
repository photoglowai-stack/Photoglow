import { memo, useEffect } from 'react';
import {
  SimpleAccordion as Accordion,
  SimpleAccordionContent as AccordionContent,
  SimpleAccordionItem as AccordionItem,
  SimpleAccordionTrigger as AccordionTrigger,
} from "../ui/simple-accordion";
import { 
  HelpCircle, 
  Shield, 
  Clock, 
  Camera, 
  CreditCard, 
  Sparkles, 
  Video,
  Image as ImageIcon,
  Zap,
  Users,
  Download,
  Edit3,
  Briefcase,
  ShoppingCart,
  Trash2,
  RefreshCw,
  DollarSign,
  Smartphone,
  TrendingUp
} from 'lucide-react';

// Static FAQ data with 24 questions
const faqData = [
  {
    id: "item-1",
    icon: <Sparkles className="w-5 h-5 text-pink-400" />,
    question: "What is PhotoGlow, and how does it work?",
    answer: "PhotoGlow is an AI photo and video generator that creates professional, realistic portraits in any setting or style. Upload your selfies, our AI learns your facial features, and within minutes, you can generate photos or videos of yourself — no studio, no photographer needed."
  },
  {
    id: "item-2",
    icon: <Camera className="w-5 h-5 text-purple-400" />,
    question: "How do I create my own AI model with PhotoGlow?",
    answer: "Upload 10–20 clear photos of yourself in different angles, lighting conditions, and expressions. PhotoGlow's AI trains a personalized model that replicates your likeness. Once trained, you can instantly generate unlimited AI images or videos of yourself in various outfits and environments."
  },
  {
    id: "item-3",
    icon: <Video className="w-5 h-5 text-cyan-400" />,
    question: "Can I generate AI videos with PhotoGlow?",
    answer: "Yes. After creating your AI photos, you can transform them into short, lifelike videos. PhotoGlow's AI animates your likeness with natural movement and realistic lighting — perfect for marketing content, social media, or creative storytelling."
  },
  {
    id: "item-4",
    icon: <Briefcase className="w-5 h-5 text-green-400" />,
    question: "Can I use PhotoGlow for commercial purposes?",
    answer: "Yes. Commercial usage is included in our Pro, Premium, and Business plans. You can safely use your AI-generated photos and videos for business, advertising, personal branding, or monetized projects. The Starter plan is for personal use only."
  },
  {
    id: "item-5",
    icon: <ImageIcon className="w-5 h-5 text-blue-400" />,
    question: "What kind of photos should I upload to train my model?",
    answer: "Choose clear, well-lit selfies showing your face without filters or obstructions. Include various poses, expressions, and angles. Avoid sunglasses, hats, and blurred or overexposed pictures — the better your input, the more realistic your AI results."
  },
  {
    id: "item-6",
    icon: <Clock className="w-5 h-5 text-yellow-400" />,
    question: "How long does it take to train my AI model?",
    answer: "Model training typically takes between 5 and 30 minutes, depending on your plan. Premium and Business users benefit from priority servers and faster model completion times."
  },
  {
    id: "item-7",
    icon: <Download className="w-5 h-5 text-pink-400" />,
    question: "What file formats can I upload?",
    answer: "PhotoGlow supports JPG, PNG, and WebP files. We recommend high-resolution images for the best AI accuracy and detail."
  },
  {
    id: "item-8",
    icon: <Zap className="w-5 h-5 text-purple-400" />,
    question: "How long does it take to generate an AI photo or video?",
    answer: "A single image takes 10–30 seconds, while AI videos can take a few minutes to process. Higher-tier plans include faster generation speeds and parallel rendering for multiple outputs."
  },
  {
    id: "item-9",
    icon: <CreditCard className="w-5 h-5 text-cyan-400" />,
    question: "What's the difference between the pricing plans?",
    answer: "Higher-tier plans provide: More photos and faster processing, High-resolution output (4K available on Premium), Batch and video generation, Commercial use license. Starter plans include limited generations for personal use."
  },
  {
    id: "item-10",
    icon: <Edit3 className="w-5 h-5 text-green-400" />,
    question: "Can I change the background, lighting, or outfit in my AI photos?",
    answer: "Yes. PhotoGlow's AI Magic Editor lets you modify your background, lighting, outfits, and even poses using simple text prompts. Describe what you want — the AI does the rest."
  },
  {
    id: "item-11",
    icon: <Users className="w-5 h-5 text-blue-400" />,
    question: "Can I use PhotoGlow for professional headshots or LinkedIn photos?",
    answer: "Definitely. Many users generate AI headshots for LinkedIn, resumes, or company profiles. You can choose from preset photo styles such as corporate, lifestyle, creative, or editorial looks — all designed for professional use."
  },
  {
    id: "item-12",
    icon: <ShoppingCart className="w-5 h-5 text-yellow-400" />,
    question: "Can I use PhotoGlow for e-commerce or product photos?",
    answer: "Yes. PhotoGlow can generate lifelike product images or virtual try-ons. It's ideal for online stores, marketing campaigns, or brand visuals that need consistent, polished photography without the cost of a photo shoot."
  },
  {
    id: "item-13",
    icon: <Trash2 className="w-5 h-5 text-pink-400" />,
    question: "Can I delete my data or photos?",
    answer: "Yes. You can delete any image, video, or trained model from your account at any time. Deleted content is permanently removed from our servers within a short security retention period."
  },
  {
    id: "item-14",
    icon: <DollarSign className="w-5 h-5 text-purple-400" />,
    question: "What happens if I cancel my subscription but still see charges?",
    answer: "This usually occurs if you used a different email or billing account. Double-check the address linked to your plan or contact our support team — we'll fix it immediately."
  },
  {
    id: "item-15",
    icon: <RefreshCw className="w-5 h-5 text-cyan-400" />,
    question: "Do you offer refunds?",
    answer: "If you haven't used your credits or started a generation, you can request a refund through our billing support. Once approved, refunds are processed within 2–3 business days."
  },
  {
    id: "item-16",
    icon: <TrendingUp className="w-5 h-5 text-green-400" />,
    question: "Can I upgrade or downgrade my plan at any time?",
    answer: "Yes. You can switch plans or billing frequency (monthly ↔ yearly) anytime from your account dashboard. Yearly plans offer reduced pricing and bonus credits."
  },
  {
    id: "item-17",
    icon: <Sparkles className="w-5 h-5 text-blue-400" />,
    question: "What AI engines power PhotoGlow?",
    answer: "PhotoGlow uses top-tier AI models including Flux 1.1 Pro and Runway Gen-4, optimized for face realism, consistent lighting, and authentic expression. This ensures your AI results are natural, detailed, and truly look like you."
  },
  {
    id: "item-18",
    icon: <Camera className="w-5 h-5 text-yellow-400" />,
    question: "Will my AI photos really look like me?",
    answer: "Yes. Because PhotoGlow trains your model specifically on your photos, the results maintain your facial structure, expressions, and overall likeness — typically above 95% accuracy when you upload clear, diverse selfies."
  },
  {
    id: "item-19",
    icon: <CreditCard className="w-5 h-5 text-pink-400" />,
    question: "What payment methods do you accept?",
    answer: "We accept Visa, MasterCard, American Express, and local payment options (Sofort, iDEAL, Bancontact, etc.) depending on your country. PayPal or crypto are not supported at this time."
  },
  {
    id: "item-20",
    icon: <Smartphone className="w-5 h-5 text-purple-400" />,
    question: "Does PhotoGlow have a mobile app?",
    answer: "PhotoGlow is fully optimized for mobile browsers and works seamlessly on both iOS and Android. Native mobile apps are planned for a future release."
  },
  {
    id: "item-21",
    icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
    question: "How can I get the best results with PhotoGlow?",
    answer: "Use diverse, well-lit photos, try different styles, and write descriptive prompts. The more expressive your inputs, the more natural and detailed your outputs. Experiment with our style presets for quick professional results."
  },
  {
    id: "item-22",
    icon: <Briefcase className="w-5 h-5 text-green-400" />,
    question: "Can I generate photos in bulk for business use?",
    answer: "Yes. The Business plan includes batch generation features, allowing you to create hundreds of AI photos or videos at once — ideal for brands, influencers, or creative agencies."
  },
  {
    id: "item-23",
    icon: <Users className="w-5 h-5 text-blue-400" />,
    question: "Who created PhotoGlow?",
    answer: "PhotoGlow was built by a team of AI engineers and designers passionate about making professional photo generation accessible to everyone. Our mission is to bring studio-grade visuals to creators, professionals, and brands using AI."
  },
  {
    id: "item-24",
    icon: <Download className="w-5 h-5 text-yellow-400" />,
    question: "Can I export my AI photos or videos?",
    answer: "Yes. You can download all generated photos and videos in high resolution. However, your trained AI model stays securely hosted on our servers for privacy, performance, and copyright protection."
  }
];

// Generate JSON-LD structured data for SEO
const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
};

// Memoized: Static FAQ content with SEO structured data
export const FAQ = memo(function FAQ() {
  useEffect(() => {
    // Inject JSON-LD structured data for SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(generateFAQSchema());
    script.id = 'faq-schema';
    
    // Remove existing schema if present
    const existing = document.getElementById('faq-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);
    
    return () => {
      const schemaScript = document.getElementById('faq-schema');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, []);

  return (
    <section className="py-12 md:py-16 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-pink-900/10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/30 rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-5 h-5 text-pink-400" />
            <span className="text-pink-400 font-semibold">Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything you need to know
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Quickly find answers to your questions about PhotoGlow AI photo and video generator
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={item.id}
                className="animate-in fade-in slide-in-from-left-4 duration-700"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <AccordionItem 
                  value={item.id} 
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl px-6 py-2 data-[state=open]:border-pink-500/50 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline text-white font-semibold text-lg py-6 hover:text-pink-400 transition-colors">
                    <div className="flex items-center space-x-3">
                      {item.icon && item.icon}
                      <span>{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-base leading-relaxed pb-6 pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-3">
              Can't find your answer?
            </h3>
            <p className="text-gray-300 mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex justify-center">
              <a 
                href="mailto:support@photoglow.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
