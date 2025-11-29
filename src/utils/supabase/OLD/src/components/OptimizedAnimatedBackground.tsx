import { memo } from 'react';

interface OptimizedAnimatedBackgroundProps {
  colorScheme?: {
    gradient1: string;
    gradient2: string;
    gradient3: string;
  };
}

/**
 * Animated Background optimisé avec CSS animations pures
 * Plus de dépendance à Motion/Framer Motion
 */
export const OptimizedAnimatedBackground = memo(({ colorScheme }: OptimizedAnimatedBackgroundProps) => {
  // Default pink/purple scheme
  const colors = colorScheme || {
    gradient1: 'rgba(236, 72, 153, 0.4)',
    gradient2: 'rgba(147, 51, 234, 0.35)',
    gradient3: 'rgba(236, 72, 153, 0.3)',
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient 1 - Optimized with CSS animations */}
        <div 
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-3xl animate-float-1"
          style={{ 
            background: `radial-gradient(circle, ${colors.gradient1} 0%, transparent 70%)`,
            willChange: 'transform, opacity',
            transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
          }}
        />
        
        {/* Gradient 2 */}
        <div 
          className="absolute top-1/3 right-1/5 w-[700px] h-[700px] rounded-full blur-3xl animate-float-2"
          style={{ 
            background: `radial-gradient(circle, ${colors.gradient2} 0%, transparent 70%)`,
            willChange: 'transform, opacity',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
        
        {/* Gradient 3 */}
        <div 
          className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-3xl animate-float-3"
          style={{ 
            background: `radial-gradient(circle, ${colors.gradient3} 0%, transparent 70%)`,
            willChange: 'transform, opacity',
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      </div>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes float-1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate3d(50px, 30px, 0) scale(1.1);
            opacity: 0.5;
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.25;
          }
          50% {
            transform: translate3d(-40px, 50px, 0) scale(1.15);
            opacity: 0.45;
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate3d(30px, -40px, 0) scale(1.2);
            opacity: 0.4;
          }
        }

        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 10s ease-in-out infinite 2s;
        }

        .animate-float-3 {
          animation: float-3 12s ease-in-out infinite 4s;
        }
      `}</style>
    </>
  );
});

OptimizedAnimatedBackground.displayName = 'OptimizedAnimatedBackground';
