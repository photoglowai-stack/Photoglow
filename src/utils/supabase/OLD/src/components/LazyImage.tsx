import { useState, useEffect, useRef, memo } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string; // Optional blur-up placeholder (low-res base64)
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * Optimized LazyImage component with Intersection Observer
 * - Only loads images when they enter the viewport
 * - Supports blur-up placeholder for better UX
 * - Optimized with memo to prevent unnecessary re-renders
 */
export const LazyImage = memo(function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  onClick,
  style
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    // Intersection Observer pour détecter quand l'image entre dans le viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Déconnecter après le premier trigger
        }
      },
      {
        rootMargin: '100px', // Précharger 100px avant que l'image soit visible
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  // Gérer le cas où l'image ne charge pas
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Considérer comme "chargé" pour éviter le placeholder infini
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      style={style}
    >
      {/* Placeholder blur - Affiché pendant le chargement */}
      {placeholder && !isLoaded && (
        <img
          src={placeholder}
          alt=""
          className={`${className} absolute inset-0 blur-lg scale-110 transition-opacity duration-300`}
          aria-hidden="true"
          style={{
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}
      
      {/* Skeleton placeholder si pas de blur-up */}
      {!placeholder && !isLoaded && (
        <div 
          className={`${className} bg-gray-800 animate-pulse`}
          aria-hidden="true"
        />
      )}
      
      {/* Image réelle - Chargée seulement quand visible */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          loading="lazy"
          decoding="async"
          style={{
            transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      )}

      {/* Fallback si erreur de chargement */}
      {hasError && (
        <div className={`${className} bg-gray-900 flex items-center justify-center`}>
          <div className="text-gray-500 text-center p-4">
            <svg 
              className="w-8 h-8 mx-auto mb-2 opacity-30" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span className="text-xs">Image unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
});
