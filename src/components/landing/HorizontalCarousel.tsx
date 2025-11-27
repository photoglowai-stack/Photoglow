import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function HorizontalTransformCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Different AI-generated portraits - NOT before/after of same person
  // Each photo is a unique AI-generated portrait
  const allAIPhotos = [
    'https://images.unsplash.com/photo-1581093458791-9d42e7d44e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDUyMTg2OHww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDQ5NTgxNXww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1653419403196-ab64c4c740c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTE5MTA2fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1580643375398-5174902ebcec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25maWRlbnQlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MTU0OTF8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1640876305588-dbdab5869200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjA1MDk2NDV8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1539710762589-eac1cb3302d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTIxODcwfDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1636379688556-f9cc75dca5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwd29tYW4lMjBwaG90b3xlbnwxfHx8fDE3NjA1MjE4NzB8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MjEyMTR8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDQ5NjM1MHww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzZnVsJTIwbWFuJTIwcGhvdG98ZW58MXx8fHwxNzYwNTIxODcyfDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1607664919395-9ee609a88ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDUyMTIxM3ww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kc29tZSUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDUyMTg3M3ww&ixlib=rb-4.1.0&q=80&w=400',
  ];

  // Create photo pairs by combining different photos
  const photoPairs = allAIPhotos.slice(0, 6).map((photo, index) => ({
    id: index + 1,
    leftPhoto: photo,
    rightPhoto: allAIPhotos[(index + 6) % allAIPhotos.length],
  }));

  // Duplicate photos for seamless loop
  const allPhotos = [...photoPairs, ...photoPairs, ...photoPairs];

  useEffect(() => {
    // Speed: 240 px/s at 60fps = 4px per frame
    // Adjust interval for smoother animation: 25ms interval ≈ 40fps
    const scrollSpeed = isHovered ? 2 : 4; // 50% speed on hover
    
    const interval = setInterval(() => {
      setScrollPosition((prev) => prev + scrollSpeed);
    }, 25);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Calculate photo width for seamless loop
  const photoWidth = 160; // Width of each photo container (160x160)
  const gap = 24; // Gap between photos (24px)
  const totalWidth = (photoWidth + gap) * photoPairs.length;

  return (
    <div 
      className="relative w-full h-40 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edge fade masks - 32px left/right */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

      {/* Central Divider Line - 2px white, z-index above images */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white z-30 shadow-lg shadow-white/50 -translate-x-1/2" />

      {/* Scrolling Container - RIGHT TO LEFT direction */}
      <div 
        className="flex gap-6 h-full items-center"
        style={{
          transform: `translateX(${scrollPosition % totalWidth}px)`, // Positive for right-to-left
          transition: 'none',
        }}
      >
        {allPhotos.map((pair, index) => (
          <PhotoTransformCard
            key={`${pair.id}-${index}`}
            leftPhoto={pair.leftPhoto}
            rightPhoto={pair.rightPhoto}
            scrollPosition={scrollPosition}
            index={index}
            photoWidth={photoWidth}
            gap={gap}
          />
        ))}
      </div>
    </div>
  );
}

interface PhotoTransformCardProps {
  leftPhoto: string;
  rightPhoto: string;
  scrollPosition: number;
  index: number;
  photoWidth: number;
  gap: number;
}

function PhotoTransformCard({ leftPhoto, rightPhoto, scrollPosition, index, photoWidth, gap }: PhotoTransformCardProps) {
  // Calculate position relative to center divider
  // RIGHT TO LEFT: position increases as scrollPosition increases
  const photoPosition = index * (photoWidth + gap) + scrollPosition;
  const centerPosition = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const distanceFromCenter = photoPosition - centerPosition;
  
  // Calculate opacity for crossfade effect (transition zone: smoother 250ms effect)
  // Left of divider (negative distance) = Left Photo visible
  // Right of divider (positive distance) = Right Photo visible (different person)
  const transitionZone = 80; // Smooth transition zone
  const rightPhotoOpacity = Math.max(0, Math.min(1, (distanceFromCenter + transitionZone) / (transitionZone * 2)));

  return (
    <div 
      className="relative flex-shrink-0 rounded-3xl overflow-hidden shadow-lg"
      style={{ 
        width: `${photoWidth}px`,
        height: `${photoWidth}px`, // Square 160x160
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Left Photo (bottom layer, visible on left side of divider) */}
      <img
        src={leftPhoto}
        alt="AI Generated Portrait"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: 'opacity 250ms ease-out',
        }}
      />
      
      {/* Right Photo (top layer, visible on right side of divider - DIFFERENT person) */}
      <img
        src={rightPhoto}
        alt="AI Generated Portrait"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: rightPhotoOpacity,
          transition: 'opacity 250ms ease-out',
        }}
      />

      {/* AI Generated badge - always visible */}
      <div className="absolute bottom-2 left-2 right-2 z-10">
        <div className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-md flex items-center justify-center gap-1 shadow-md">
          <span className="text-pink-500">✨</span>
          <span>AI Generated by PhotoGlow</span>
        </div>
      </div>

      {/* Subtle border */}
      <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
    </div>
  );
}
