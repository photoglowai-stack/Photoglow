/**
 * @file LoadingSkeleton - Composant de chargement skeleton
 * @description Skeleton screen pour améliorer l'UX pendant le chargement
 * 
 * Utilisé comme fallback pour Suspense ou pendant les chargements de données.
 * Affiche une représentation visuelle de la structure de la page en cours de chargement.
 */

import { Skeleton } from '../../ui/skeleton';

/**
 * Props pour le composant LoadingSkeleton
 */
export interface LoadingSkeletonProps {
  /** Variant du skeleton (défaut: full page) */
  variant?: 'full' | 'hero' | 'gallery' | 'card';
  /** Nombre d'items pour le variant gallery/card */
  count?: number;
}

/**
 * Composant LoadingSkeleton
 * 
 * Affiche un skeleton screen pendant le chargement pour :
 * - Améliorer la perception de performance
 * - Éviter les layouts shifts
 * - Donner un feedback visuel à l'utilisateur
 * 
 * Variantes disponibles :
 * - `full` : Page complète (header + hero + gallery)
 * - `hero` : Section hero uniquement
 * - `gallery` : Grille de photos uniquement
 * - `card` : Cards individuelles
 * 
 * @example
 * ```tsx
 * // Fallback Suspense
 * <Suspense fallback={<LoadingSkeleton />}>
 *   <MyComponent />
 * </Suspense>
 * 
 * // Gallery skeleton
 * {isLoading ? (
 *   <LoadingSkeleton variant="gallery" count={9} />
 * ) : (
 *   <Gallery photos={photos} />
 * )}
 * ```
 */
export function LoadingSkeleton({ 
  variant = 'full',
  count = 6 
}: LoadingSkeletonProps) {
  
  // ============================================
  // VARIANT - Full Page Skeleton
  // ============================================
  
  if (variant === 'full') {
    return (
      <div className="min-h-screen bg-black">
        {/* Header Skeleton */}
        <div className="w-full h-20 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
          <Skeleton className="h-8 w-40 bg-gray-800" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24 bg-gray-800" />
            <Skeleton className="h-10 w-32 bg-gray-800" />
          </div>
        </div>

        {/* Hero Skeleton */}
        <div className="w-full py-20 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Skeleton className="h-16 w-3/4 mx-auto bg-gray-800" />
            <Skeleton className="h-8 w-1/2 mx-auto bg-gray-800" />
            <Skeleton className="h-12 w-48 mx-auto bg-gray-800 rounded-full" />
          </div>
        </div>

        {/* Gallery Skeleton */}
        <div className="w-full px-6 pb-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(count)].map((_, i) => (
              <Skeleton key={i} className="aspect-square bg-gray-800 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // ============================================
  // VARIANT - Hero Only
  // ============================================
  
  if (variant === 'hero') {
    return (
      <div className="w-full py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Skeleton className="h-16 w-3/4 mx-auto bg-gray-800" />
          <Skeleton className="h-8 w-1/2 mx-auto bg-gray-800" />
          <Skeleton className="h-12 w-48 mx-auto bg-gray-800 rounded-full" />
        </div>
      </div>
    );
  }
  
  // ============================================
  // VARIANT - Gallery Grid
  // ============================================
  
  if (variant === 'gallery') {
    return (
      <div className="w-full px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(count)].map((_, i) => (
            <Skeleton key={i} className="aspect-square bg-gray-800 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  
  // ============================================
  // VARIANT - Card
  // ============================================
  
  if (variant === 'card') {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-gray-900 rounded-lg p-6 space-y-3">
            <Skeleton className="h-6 w-1/3 bg-gray-800" />
            <Skeleton className="h-4 w-full bg-gray-800" />
            <Skeleton className="h-4 w-2/3 bg-gray-800" />
          </div>
        ))}
      </div>
    );
  }
  
  return null;
}
