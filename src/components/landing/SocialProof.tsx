import { memo } from 'react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star, Quote } from 'lucide-react';

// Static testimonials data moved outside component
const testimonials = [
  {
    name: "Emily Rodriguez",
    age: 28,
    location: "Los Angeles",
    rating: 5,
    text: "The AI photos look so natural and professional. I use them for everything - social media, professional profiles, you name it. Best investment I've made!",
    avatar: "ER",
    dates: "Perfect for all occasions!"
  },
  {
    name: "Marcus Thompson",
    age: 32,
    location: "New York",
    rating: 5,
    text: "The quality is incredible. These don't look like AI photos at all - they look like I hired a professional photographer. My engagement increased significantly.",
    avatar: "MT",
    dates: "Professional quality!"
  },
  {
    name: "Sophie Chen",
    age: 26,
    location: "San Francisco",
    rating: 5,
    text: "As someone who's camera shy, this was perfect. The AI created photos that actually look like me but way more confident and polished.",
    avatar: "SC",
    dates: "Boosted my confidence!"
  }
];





// Memoized: Static testimonials content
export const SocialProof = memo(function SocialProof() {
  return (
    <section id="testimonials" className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-b from-purple-900/10 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Breathing gradient background animation */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-600/10 to-cyan-500/10"
            style={{
              animation: 'gradient-breathe 15s ease-in-out infinite',
              backgroundSize: '400% 400%'
            }}
          />
        </div>

        {/* Title Section */}
        <div className="text-center space-y-4 mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Loved by Creators, Professionals & Innovators{' '}
            <span className="inline-block">✨</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Thousands of people use PhotoGlow worldwide — from LinkedIn headshots to fashion shoots, dating photos, and more.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
          {[
            {
              quote: "My AI photo actually looks better than my studio shoot! I used it for my CV and LinkedIn — recruiters loved it.",
              name: "Guillaume Sere",
              role: "IT Consultant",
              country: "France",
              hasLinkedIn: true
            },
            {
              quote: "I tested it just out of curiosity, but the quality blew me away. Now I use PhotoGlow for all my social profiles.",
              name: "Wicem Mokni",
              role: "Data Engineer",
              country: "Canada",
              hasLinkedIn: true
            },
            {
              quote: "Needed clean, consistent portraits for my job applications — done in 2 minutes. Game changer.",
              name: "Yanis Boulkroune",
              role: "Communication Student",
              country: "Belgium",
              hasLinkedIn: true
            },
            {
              quote: "The AI helped me get realistic headshots that match every situation — perfect lighting, confident posture.",
              name: "Adrien Piquenet",
              role: "Tech Lead",
              country: "Switzerland",
              hasLinkedIn: true
            },
            {
              quote: "Quick, affordable, and surprisingly human-looking results. I use my AI photo everywhere now.",
              name: "Inès Choukri",
              role: "Recruiter",
              country: "UAE",
              hasLinkedIn: true
            },
            {
              quote: "PhotoGlow transformed my online presence. The AI understands exactly what professional photos should look like.",
              name: "Sarah Mitchell",
              role: "Marketing Director",
              country: "UK",
              hasLinkedIn: true
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              className="group hover:-translate-y-1.5 transition-transform duration-300"
            >
              <Card className="p-6 h-full bg-[#18181B] border-2 border-white/10 hover:border-pink-500/30 transition-all duration-500 rounded-2xl relative overflow-hidden backdrop-blur-sm">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/15 via-purple-600/15 to-transparent rounded-2xl blur-xl" />
                </div>

                <div className="space-y-4 relative z-10">
                  {/* 5 Star Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="hover:scale-110 hover:rotate-12 transition-transform duration-200"
                      >
                        <Star className="w-5 h-5 fill-[#FACC15] text-[#FACC15]" />
                      </div>
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-white text-lg leading-relaxed min-h-[120px]">
                    "{testimonial.quote}"
                  </p>

                  {/* User Info */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-white">
                            {testimonial.name}
                          </span>
                          {testimonial.hasLinkedIn && (
                            <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          )}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          {testimonial.role}, {testimonial.country}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 relative z-10">
          <p className="text-gray-400">
            Join thousands of satisfied users worldwide{' '}
            <span className="text-pink-400">→</span>
          </p>
        </div>
      </div>
    </section>
  );
});