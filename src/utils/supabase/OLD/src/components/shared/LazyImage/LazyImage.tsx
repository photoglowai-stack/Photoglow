/**
 * @file LazyImage - Composant d'image lazy-loaded optimisé
 * @description Image avec chargement lazy via Intersection Observer
 * 
 * Fonctionnalités :
 * - Lazy loading avec Intersection Observer
 * - Support placeholder blur-up
 * - Skeleton fallback
 * - Gestion d'erreurs
 * - GPU acceleration
 * - Memoizé pour performance
 */

import { useState, useEffect, useRef, memo } from 'react';

/**
 * Props pour le composant LazyImage
 */
export interface LazyImageProps {
  /** URL de l'image à charger */
  src: string;
  /** Texte alternatif pour accessibilité */
  alt: string;
  /** Classes CSS additionnelles */
  className?: string;
  /** Placeholder blur-up (base64 low-res) pour meilleure UX */
  placeholder?: string;
  /** Callback au clic sur l'image */
  onClick?: () => void;
  /** Styles CSS inline */
  style?: React.CSSProperties;
  /** Marge de préchargement en pixels (défaut: 100px) */
  rootMargin?: string;
}

/**
 * Composant LazyImage optimisé
 * 
 * Charge les images uniquement quand elles entrent dans le viewport
 * pour améliorer les performances et réduire la bande passante.
 * 
 * Optimisations :
 * - Intersection Observer pour lazy loading
 * - Préchargement 100px avant visibilité
 * - GPU acceleration avec translate3d
 * - Memoizé pour éviter re-renders inutiles
 * - Support placeholder blur-up ou skeleton
 * - Gestion gracieuse des erreurs
 * 
 * @example
 * ```tsx
 * // Basique
 * <LazyImage 
 *   src="https://example.com/photo.jpg"
 *   alt="Ma photo"
 *   className="w-full h-full object-cover"
 * />
 * 
 * // Avec placeholder blur-up
 * <LazyImage 
 *   src="photo-hd.jpg"
 *   placeholder="data:image/jpeg;base64,..."
 *   alt="Photo HD"
 * />
 * 
 * // Avec clic
 * <LazyImage 
 *   src="photo.jpg"
 *   alt="Cliquable"
 *   onClick={() => openModal(photo)}
 * />
 * ```
 */
export const LazyImage = memo(function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  onClick,
  style,
  rootMargin = '100px'
}: LazyImageProps) {
  
  // ============================================
  // STATE - Loading & Error Management
  // ============================================
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // ============================================
  // EFFECTS - Intersection Observer
  // ============================================

  useEffect(() => {
    if (!imgRef.current) return;

    /**
     * Intersection Observer pour détecter la visibilité
     * Précharge l'image 100px avant qu'elle soit visible
     */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Déconnecter après le premier trigger
        }
      },
      {
        rootMargin, // Précharger avant visibilité
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [rootMargin]);

  // ============================================
  // HANDLERS - Error Management
  // ============================================

  /**
   * Gère les erreurs de chargement d'image
   * Affiche un fallback et évite le placeholder infini
   */
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Considérer comme "chargé" pour éviter placeholder infini
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      style={style}
    >
      {/* ========== Placeholder Blur-up ========== */}
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
      
      {/* ========== Skeleton Placeholder ========== */}
      {!placeholder && !isLoaded && (
        <div 
          className={`${className} bg-gray-800 animate-pulse`}
          aria-hidden="true"
        />
      )}
      
      {/* ========== Image Réelle (Lazy Loaded) ========== */}
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
            // GPU acceleration pour smooth rendering
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      )}

      {/* ========== Fallback Error State ========== */}
      {hasError && (
        <div className={`${className} bg-gray-900 flex items-center justify-center`}>
          <div className="text-gray-500 text-center p-4">
            {/* Icon image cassée */}
            <svg 
              className="w-8 h-8 mx-auto mb-2 opacity-30" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
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

LazyImage.displayName = 'LazyImage';
