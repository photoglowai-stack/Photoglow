import { memo } from 'react';

// Static data moved outside component
const logos = [
  { name: 'CNN', delay: 0.1 },
  { name: 'TikTok', delay: 0.2 },
  { name: 'Forbes', delay: 0.3 },
  { name: 'TechCrunch', delay: 0.4 },
  { name: 'Business Insider', delay: 0.5 }
];

// Memoized: Pure static content - Temporarily without animations to fix build
export const FeaturedIn = memo(function FeaturedIn() {

  return (
    <section className="py-12 md:py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center">
          {/* Title */}
          <p className="text-sm md:text-base uppercase tracking-wider mb-12 md:mb-16">
            <span className="bg-gradient-to-r from-gray-400 via-pink-400/60 to-gray-400 bg-clip-text text-transparent">
              As featured in
            </span>
          </p>
          
          {/* Media Logos Row */}
          <div className="flex items-center justify-center gap-12 md:gap-20 lg:gap-24 flex-wrap">
            
            {/* CNN Logo */}
            <div className="opacity-70 hover:opacity-90 hover:scale-105 transition-all duration-300">
              <svg width="104" height="31" viewBox="0 0 80 24" fill="none" className="fill-gray-300 w-[104px] h-[31px]">
                <path d="M8.5 6C5.46 6 3 8.46 3 11.5S5.46 17 8.5 17c1.41 0 2.73-.52 3.75-1.46L10.94 14.2c-.6.6-1.42.94-2.27.94C7.12 15.14 6 14.02 6 12.67s1.12-2.47 2.67-2.47c.85 0 1.67.34 2.27.94l1.31-1.34C11.23 8.52 9.91 8 8.5 8V6z"/>
                <path d="M23.5 6v11h-3V9.5L18 17h-2l-2.5-7.5V17h-3V6h4.5l2 6 2-6h4.5z"/>
                <path d="M35.5 6v11h-3V9.5L30 17h-2l-2.5-7.5V17h-3V6h4.5l2 6 2-6h4.5z"/>
              </svg>
            </div>

            {/* TikTok Logo */}
            <div className="opacity-70 hover:opacity-90 hover:scale-105 transition-all duration-300">
              <svg width="104" height="31" viewBox="0 0 80 24" fill="none" className="fill-gray-300 w-[104px] h-[31px]">
                <path d="M16.8 8.4c1.6 1.2 3.6 1.9 5.7 1.9v-3.6c-.4 0-.8 0-1.2-.1V9.8c-2.1 0-4.1-.7-5.7-1.9v8.6c0 4.3-3.5 7.8-7.8 7.8-1.6 0-3.1-.5-4.3-1.4 1.4 1.4 3.4 2.3 5.5 2.3 4.3 0 7.8-3.5 7.8-7.8V8.4z"/>
                <path d="M15.6 6.8c-.8-.9-1.3-2-1.4-3.2h-1.1c.3 1.6 1.2 3 2.5 3.2z"/>
                <path d="M7.8 19.5c-2.4 0-4.3-1.9-4.3-4.3 0-2.4 1.9-4.3 4.3-4.3.4 0 .9.1 1.3.2v-3.7c-.4-.1-.9-.1-1.3-.1v3.2c-.4-.1-.8-.2-1.3-.2-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3c1.8 0 3.4-1.1 4.1-2.7v-3.5c-.7 1.2-2 2-3.5 2z"/>
              </svg>
            </div>

            {/* Forbes Logo */}
            <div className="opacity-70 hover:opacity-90 hover:scale-105 transition-all duration-300">
              <svg width="117" height="31" viewBox="0 0 90 24" fill="none" className="fill-gray-300 w-[117px] h-[31px]">
                <path d="M8 6h12v3H11v2h8v3h-8v3h9v3H8V6zm16 0h8c2.2 0 4 1.8 4 4v6c0 2.2-1.8 4-4 4h-8V6zm3 3v8h5c.6 0 1-.4 1-1V10c0-.6-.4-1-1-1h-5zm14 0V6h3v3h4v3h-4v5c0 .6.4 1 1 1h3v3h-3c-2.2 0-4-1.8-4-4v-5h-2V9h2zm14-3h8c2.2 0 4 1.8 4 4v2h-9v2c0 .6.4 1 1 1h8v3h-8c-2.2 0-4-1.8-4-4V10c0-2.2 1.8-4 4-4zm0 3c-.6 0-1 .4-1 1v1h6v-1c0-.6-.4-1-1-1h-4z"/>
              </svg>
            </div>

            {/* TechCrunch Logo */}
            <div className="opacity-70 hover:opacity-90 hover:scale-105 transition-all duration-300">
              <svg width="156" height="31" viewBox="0 0 120 24" fill="none" className="fill-gray-300 w-[156px] h-[31px]">
                <path d="M12 6H0v3h4.5v8H8v-8h4V6zm8 0h-8v11h3V13h5c1.7 0 3-1.3 3-3V9c0-1.7-1.3-3-3-3zm0 4h-5V9h5v1zm12-4h-8v11h8v-3h-5v-1h5V10h-5V9h5V6zm8 0h-3v11h3V13l3 4h4l-4-4.5 4-3.5h-4l-3 3V6zm16 0h-8c-1.7 0-3 1.3-3 3v5c0 1.7 1.3 3 3 3h5v-3h-5v-1h8v-4c0-1.7-1.3-3-3-3zm0 4h-5V9h5v1zm14-4h-8v11h3v-3h5c1.7 0 3-1.3 3-3V9c0-1.7-1.3-3-3-3zm0 4h-5V9h5v1zm12-4h-8v11h3V13l3 4h4l-4-4.5 4-3.5h-4l-3 3V6z"/>
              </svg>
            </div>

            {/* Business Insider Logo */}
            <div className="opacity-70 hover:opacity-90 hover:scale-105 transition-all duration-300">
              <svg width="130" height="31" viewBox="0 0 100 24" fill="none" className="fill-gray-300 w-[130px] h-[31px]">
                <path d="M8 6H0v11h8c2.2 0 4-1.8 4-4v-3c0-2.2-1.8-4-4-4zm1 7c0 .6-.4 1-1 1H3V9h5c.6 0 1 .4 1 1v3zm8-7v11h3V6h-3zm12 5v6h3v-6c0-1.7-1.3-3-3-3s-3 1.3-3 3v6h3v-6zm8-5v3h2v8h3V9h2V6h-7zm14 0h-3v11h3V6zm8 0h-3l-3 8-3-8h-3l4.5 11h3L77 6zm14 0h-8v11h8v-3h-5v-1h5V10h-5V9h5V6zm8 0h-3v11h3V13l3 4h4l-4-4.5 4-3.5h-4l-3 3V6z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});