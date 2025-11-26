import { useState } from 'react';
import { Button } from '../ui/button';
import { Star, CheckCircle, Lock } from 'lucide-react';

interface FigmaStylePaymentPageProps {
  onPurchase: (packageId: string) => void;
}

const testimonials = [
  {
    name: "Harry",
    age: 25,
    location: "Dating in Melbourne 😍",
    rating: 5,
    avatar: "H",
    text: "I loved everything about it, to be honest. What I liked was that you emphasized that this isn't a platform for me to please people, it's a platform for me to show who I am and it's take it or leave it. I liked how you showed me the photos I needed to integrate, that I didn't need to scatter by uploading random photos, how you explained it all in detail and how you went through the algorithm."
  },
  {
    name: "Attila",
    age: 23,
    location: "Dating in Bucharest 😍",
    rating: 5,
    avatar: "A",
    text: "Before I started using ROAST, my matches were quite low. I wasn't really getting the girls I would have liked to have, so I was a bit depressed and wanted to quit Tinder. But after listening to the advice and feedback from dating experts, my game and love life changed. So I'm pretty happy!"
  },
  {
    name: "Donald",
    age: 21,
    location: "Dating in San Diego 😍",
    rating: 5,
    avatar: "D",
    text: "I really liked ROAST, I learned a lot. I learned what to do to take good photos and write a good bio. Without it, I would have been lost, but they really helped me make my profile excellent and get more matches."
  }
];

export function FigmaStylePaymentPage({ onPurchase }: FigmaStylePaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      onPurchase('premium');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/20 via-pink-900/10 to-black pointer-events-none" />
      
      <div className="relative max-w-md mx-auto px-6 py-8">
        {/* Header Score Section */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-bold text-[#fff4eb] uppercase mb-6">Your Score</h1>
          
          <div className="flex items-center justify-center mb-4">
            <div className="text-6xl font-bold text-white mr-2">42</div>
            <div className="text-gray-400 text-lg">/100</div>
          </div>
          
          <p className="text-orange-400 text-lg leading-7 px-4">
            We detected 1 critical errors in your profile that sabotage your match rate.
          </p>
        </div>

        {/* Photos Section */}
        <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-6 mb-6">
          <h2 className="text-[28px] font-bold text-[#fff4eb] uppercase mb-6">Photos</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-[#66FF78] mr-3 flex-shrink-0" />
              <span className="text-[#c7c7c7] text-lg">Your best (and worst) photo revealed</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-[#66FF78] mr-3 flex-shrink-0" />
              <span className="text-[#c7c7c7] text-lg">Precise improvements to make</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-[#66FF78] mr-3 flex-shrink-0" />
              <span className="text-[#c7c7c7] text-lg">Targeted advice to look more attractive</span>
            </div>
          </div>

          {/* Photo Preview with Blur */}
          <div className="mt-6 relative">
            <div className="bg-[#1b1f22] h-32 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center pointer-events-none">
                <Lock className="w-8 h-8 text-[#fff4eb]" />
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-[#fff4eb] font-bold text-xl">29%</span>
            </div>
          </div>
        </div>

        {/* Action Plan Section */}
        <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-6 mb-6">
          <h2 className="text-[28px] font-bold text-[#fff4eb] uppercase mb-6">Action Plan</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-[#66FF78] mr-3 flex-shrink-0" />
              <span className="text-[#c7c7c7] text-lg">Quick tips for fast results</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-[#66FF78] mr-3 flex-shrink-0" />
              <span className="text-[#c7c7c7] text-lg">Step-by-step roadmap</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-[#66FF78] mr-3 flex-shrink-0" />
              <span className="text-[#c7c7c7] text-lg">Exclusive algorithm hacks</span>
            </div>
          </div>

          {/* Blurred Action Items */}
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-4 relative">
                <div className="absolute inset-0 backdrop-blur-sm bg-black/50 rounded-lg flex items-center justify-center pointer-events-none">
                  <Lock className="w-8 h-8 text-[#fff4eb]" />
                </div>
                <div className="text-[#c7c7c7] text-sm uppercase tracking-wider mb-2">Action {item}</div>
                <div className="space-y-2">
                  <div className="bg-[#1b1f22] h-4 rounded"></div>
                  <div className="bg-[#1b1f22] h-4 w-32 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Potential Chart */}
        <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-6 mb-8">
          <div className="text-center mb-4">
            <div className="text-lg font-bold text-[#fff4eb] mb-2">You're only reaching</div>
            <div className="bg-[rgba(102,255,120,0.3)] px-4 py-2 rounded inline-block">
              <span className="text-[#fff4eb] font-bold text-lg">10% of your potential</span>
            </div>
          </div>
          
          {/* Chart visualization */}
          <div className="mt-6 h-44 flex items-end justify-center space-x-2">
            <div className="bg-[#A8A29E] w-8 h-16 rounded-t"></div>
            <div className="bg-[#68FF7A] w-8 h-32 rounded-t"></div>
            <div className="bg-[#A8A29E] w-8 h-20 rounded-t"></div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-8">
          <h2 className="text-[28px] font-bold text-[#fff4eb] uppercase mb-6">Boost Your Profile</h2>
          <p className="text-[#c7c7c7] text-lg mb-6">Join over 500,000 singles who crushed it</p>
          
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-4">
                {/* Stars */}
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
                  ))}
                </div>
                
                <p className="text-[#c7c7c7] text-base leading-6 mb-4">
                  {testimonial.text}
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-[#fff4eb] font-semibold">{testimonial.name}, {testimonial.age}</div>
                    <div className="text-[#c7c7c7] text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="max-w-md mx-auto">
            <Button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="w-full bg-[#66ff78] hover:bg-[#66ff78]/90 text-black font-bold text-lg py-4 rounded uppercase tracking-wide"
            >
              {isProcessing ? 'Processing...' : 'Unlock for $3.49'}
            </Button>
          </div>
        </div>

        {/* Spacer for fixed button */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}