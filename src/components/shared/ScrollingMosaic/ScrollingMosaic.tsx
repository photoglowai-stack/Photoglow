/**
 * @file ScrollingMosaic - Mosaïque de photos avec scroll infini
 * @description Composant d'affichage de galerie avec scroll automatique infini
 * 
 * Utilisé dans le HeroSection pour montrer des exemples de photos AI.
 * Les photos défilent automatiquement dans deux directions (haut et bas)
 * pour créer un effet visuel dynamique.
 * 
 * Optimisations :
 * - Animations CSS natives (pas de JS)
 * - GPU acceleration avec will-change
 * - Containment CSS pour perf
 * - LazyImage pour images
 * - Photos quadruplées pour scroll seamless
 */

import { LazyImage } from '../LazyImage';

/**
 * Mapping index → catégorie pour navigation
 */
interface PhotoCategoryMap {
  [key: number]: string;
}

/**
 * Props pour ScrollingMosaic
 */
export interface ScrollingMosaicProps {
  /** Callback au clic sur une photo (optionnel) */
  onPhotoClick?: (photoIndex: number, photoUrl: string) => void;
}

/**
 * ScrollingMosaic - Galerie avec scroll infini
 * 
 * Affiche une mosaïque de photos qui scrollent automatiquement
 * dans deux directions pour créer un effet dynamique.
 * 
 * Fonctionnalités :
 * - Scroll automatique infini (CSS animations)
 * - 2 rangées scrollant dans directions opposées
 * - Fade edges pour effet seamless
 * - Click handlers optionnels
 * - 15 photos de base, quadruplées pour continuité
 * 
 * Performance :
 * - Containment CSS
 * - GPU acceleration
 * - Pas de JS pour l'animation
 * 
 * @example
 * ```tsx
 * // Basique
 * <ScrollingMosaic />
 * 
 * // Avec click handler
 * <ScrollingMosaic 
 *   onPhotoClick={(index, url) => openModal(url)}
 * />
 * ```
 */
export function ScrollingMosaic({ onPhotoClick }: ScrollingMosaicProps) {
  
  // ============================================
  // DATA - Photo to Category Mapping
  // ============================================
  
  /**
   * Mapping de chaque photo vers sa catégorie AI
   * Utilisé pour navigation quand l'utilisateur clique
   */
  const photoCategoryMap: PhotoCategoryMap = {
    0: 'professional',  // AI Headshots
    1: 'professional',  // AI Headshots
    2: 'dating',        // AI Dating Photos
    3: 'dating',        // AI Dating Photos
    4: 'model',         // AI Model Photo
    5: 'model',         // AI Model Photo
    6: 'fitness',       // AI Fitness Photos
    7: 'fitness',       // AI Fitness Photos
    8: 'selfie',        // AI Selfie Generator
    9: 'selfie',        // AI Selfie Generator
    10: 'portrait',     // AI Portrait Generator
    11: 'portrait',     // AI Portrait Generator
    12: 'realistic',    // AI Realistic Photo
    13: 'realistic',    // AI Realistic Photo
    14: 'lifestyle',    // AI Lifestyle Travel
  };

  // ============================================
  // DATA - Photos Collection
  // ============================================
  
  /**
   * Collection de 15 photos Unsplash pour la mosaïque
   * Ces photos sont des exemples de différents styles AI
   */
  const mosaicPhotos = [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1581093458791-9d42e7d44e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhc2hpb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MjIxOTN8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDUyMjE5M3ww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1653419403196-ab64c4c740c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA1MTkxMDZ8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1609846685336-9cb06880bb48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNDg1ODcwfDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1597202992582-9ee5c6672095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRyYWl0JTIwcGhvdG98ZW58MXx8fHwxNzYwNTIxMjE0fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1640876305588-dbdab5869200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTA5NjQ1fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1607664919395-9ee609a88ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwb3J0cmFpdCUyMHBob3RvfGVufDF8fHx8MTc2MDUyMTIxM3ww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1680557345345-6f9ef109d252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYwNTIxMjE3fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1636379688556-f9cc75dca5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA0MzEwMzh8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGhlYWRzaG90JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDUyMjU3Mnww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1589351189946-b8eb5e170ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwaG90b3xlbnwxfHx8fDE3NjA1MjI1NzJ8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0JTIwbWFufGVufDF8fHx8MTc2MDUyMjU3M3ww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MDUyMjU3M3ww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1607880609114-742ed2638069?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwb3J0cmFpdCUyMG91dGRvb3J8ZW58MXx8fHwxNzYwNTIyNTczfDA&ixlib=rb-4.1.0&q=80&w=400',
  ];

  /**
   * Quadrupler les photos pour scroll seamless infini
   * Permet à l'animation de boucler sans coupure visible
   */
  const allPhotos = [...mosaicPhotos, ...mosaicPhotos, ...mosaicPhotos, ...mosaicPhotos];

  // ============================================
  // RENDER
  // ============================================

  return (
    <div 
      className="relative w-full py-6 overflow-hidden bg-black" 
      style={{ contain: 'layout style paint' }} // Performance optimization
    >
      {/* ========== Edge Fade Masks ========== */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" 
        style={{ willChange: 'auto' }} 
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" 
        style={{ willChange: 'auto' }} 
      />

      {/* ========== Top Row - Scrolling Left ========== */}
      <div 
        className="flex gap-3 mb-3 animate-scroll-left" 
        style={{ width: 'max-content', willChange: 'transform' }}
      >
        {/* Triple les images pour scroll infini seamless */}
        {[...allPhotos, ...allPhotos, ...allPhotos].map((photo, index) => {
          const originalIndex = index % 15;
          const category = photoCategoryMap[originalIndex];
          
          return (
            <div
              key={`top-${index}`}
              className="relative flex-shrink-0 w-32 h-40 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => onPhotoClick?.(originalIndex, photo)}
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <LazyImage
                src={photo}
                alt={`${category} example photo`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* ========== Bottom Row - Scrolling Right ========== */}
      <div 
        className="flex gap-3 animate-scroll-right" 
        style={{ width: 'max-content', willChange: 'transform' }}
      >
        {/* Triple les images pour scroll infini seamless */}
        {[...allPhotos, ...allPhotos, ...allPhotos].map((photo, index) => {
          const originalIndex = index % 15;
          const category = photoCategoryMap[originalIndex];
          
          return (
            <div
              key={`bottom-${index}`}
              className="relative flex-shrink-0 w-32 h-40 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => onPhotoClick?.(originalIndex, photo)}
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <LazyImage
                src={photo}
                alt={`${category} example photo`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
