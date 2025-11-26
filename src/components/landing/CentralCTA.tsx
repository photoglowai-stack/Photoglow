import { useState, useEffect, memo } from 'react';
import { Button } from './ui/button';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

interface CentralCTAProps {
  onStartForm: (gender: 'male' | 'female') => void;
}

// Memoized: Only re-renders when onStartForm changes
export const CentralCTA = memo(function CentralCTA({ onStartForm }: CentralCTAProps) {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      // Show CTA when user scrolls past header (after ~100px)
      setIsVisible(scrolled > 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <section className="py-12 md:py-16 bg-black relative overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-600">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow-delayed" />
      </div>

      {/* Section removed */}
    </section>
  );
}
);
