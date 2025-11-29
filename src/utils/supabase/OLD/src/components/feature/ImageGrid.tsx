/**
 * Grille d'images responsive
 * Composant RSC pour afficher une grille de photos
 * 
 * @module components/feature/ImageGrid
 */

import { LazyImage } from '@/components/shared/LazyImage';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Heart, Download } from 'lucide-react';
import type { Photo } from '@/lib/validators';

/**
 * Props pour ImageGrid
 */
export interface ImageGridProps {
  /** Tableau de photos à afficher */
  photos: Photo[];
  /** Nombre de colonnes (responsive) */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /** Afficher les métadonnées */
  showMetadata?: boolean;
  /** Afficher les stats (views, likes) */
  showStats?: boolean;
  /** Callback au clic sur une photo */
  onPhotoClick?: (photo: Photo) => void;
  /** Classe CSS personnalisée */
  className?: string;
}

/**
 * ImageGrid - Grille d'images responsive
 * 
 * Affiche une grille de photos avec support du lazy loading.
 * Pas d'interactivité → RSC
 * 
 * Fonctionnalités :
 * - Responsive grid (mobile, tablet, desktop)
 * - Lazy loading automatique
 * - Métadonnées optionnelles (prompt, model)
 * - Stats optionnelles (views, likes)
 * - Hover effects
 * 
 * @example
 * ```tsx
 * // RSC - Pas de "use client"
 * const photos = await api.listRecent(20);
 * 
 * <ImageGrid
 *   photos={photos}
 *   showMetadata
 *   showStats
 * />
 * ```
 */
export function ImageGrid({
  photos,
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  showMetadata = false,
  showStats = false,
  onPhotoClick,
  className = '',
}: ImageGridProps) {
  // Classes de colonnes responsive
  const gridCols = `grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`;

  // Message si vide
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <p className="text-gray-400 text-center">No photos to display</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-4 md:gap-6 ${className}`}>
      {photos.map((photo) => (
        <Card
          key={photo.id}
          className="group relative overflow-hidden bg-gray-900/50 border-gray-800 hover:border-pink-500/50 transition-all duration-300 cursor-pointer"
          onClick={() => onPhotoClick?.(photo)}
          tabIndex={0}
          role="button"
          aria-label={`View photo: ${photo.prompt}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPhotoClick?.(photo);
            }
          }}
        >
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <LazyImage
              src={photo.url}
              alt={photo.prompt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay au hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                {/* Stats */}
                {showStats && (
                  <div className="flex items-center gap-4 text-sm text-white">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{photo.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{photo.likes || 0}</span>
                    </div>
                  </div>
                )}

                {/* Prompt (truncated) */}
                {showMetadata && (
                  <p className="text-sm text-white line-clamp-2">{photo.prompt}</p>
                )}
              </div>
            </div>

            {/* Badge modèle */}
            {showMetadata && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-black/60 text-white border-0">
                  {photo.model}
                </Badge>
              </div>
            )}
          </div>

          {/* Metadata footer (optionnel) */}
          {showMetadata && (
            <div className="p-3 space-y-2">
              <p className="text-sm text-gray-400 line-clamp-2">{photo.prompt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{photo.aspectRatio}</span>
                <span>
                  {photo.width} × {photo.height}
                </span>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
