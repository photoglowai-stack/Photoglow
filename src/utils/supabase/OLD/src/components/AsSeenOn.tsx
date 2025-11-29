import { memo } from 'react';

// Static logos data moved outside component
const logos = [
    { name: 'The New York Times' },
    { name: 'Shopify' },
    { name: 'TechCrunch' },
    { name: 'MSN' },
    { name: 'Yahoo' },
    { name: 'Google' },
    { name: 'Intel' },
    { name: 'PwC' },
    { name: 'Stanford' },
    { name: 'MIT' }
  ];

// Memoized: Pure static content - Animations CSS natives
export const AsSeenOn = memo(function AsSeenOn() {
  return (
    <div className="relative z-10 w-full border-b border-white/5 bg-black/30 backdrop-blur-md py-2.5 md:py-3 animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-2 md:gap-2.5">
          {/* "As seen on" text */}
          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-medium">
            as seen on
          </p>
          
          {/* Logos grid - responsive layout */}
          <div className="w-full overflow-hidden">
            <div className="flex items-center justify-center flex-wrap gap-3 md:gap-5 lg:gap-6">
              {logos.map((logo, index) => (
                <div
                  key={logo.name}
                  className="flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity duration-300 grayscale hover:grayscale-0 animate-in fade-in zoom-in-95 duration-300"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <span className="text-gray-400 text-[11px] md:text-xs font-medium whitespace-nowrap">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
