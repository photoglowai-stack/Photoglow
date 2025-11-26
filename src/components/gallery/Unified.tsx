import { useState, memo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { AspectRatio } from '../ui/aspect-ratio';
import { Download, Eye, Heart } from 'lucide-react';
import { LazyImage } from '../shared/LazyImage';

interface UnifiedGalleryProps {
  images: string[];
  layout?: 'grid' | 'masonry' | 'carousel';
  columns?: 2 | 3 | 4;
  onImageClick?: (url: string, index: number) => void;
  showActions?: boolean;
}

// Optimisé avec memo pour éviter re-renders inutiles
export const UnifiedGallery = memo(function UnifiedGallery({
  images,
  layout = 'grid',
  columns = 3,
  onImageClick,
  showActions = true,
}: UnifiedGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Grid Layout
  if (layout === 'grid') {
    return (
      <div
        className={`grid gap-4 ${
          columns === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : columns === 3
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}
      >
        {images.map((imageUrl, index) => (
          <GalleryCard
            key={index}
            imageUrl={imageUrl}
            index={index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            onClick={() => onImageClick?.(imageUrl, index)}
            showActions={showActions}
          />
        ))}
      </div>
    );
  }

  // Masonry Layout
  if (layout === 'masonry') {
    return (
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((imageUrl, index) => (
          <div key={index} className="break-inside-avoid mb-4">
            <GalleryCard
              imageUrl={imageUrl}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              onClick={() => onImageClick?.(imageUrl, index)}
              showActions={showActions}
            />
          </div>
        ))}
      </div>
    );
  }

  // Carousel Layout
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
      {images.map((imageUrl, index) => (
        <div key={index} className="flex-shrink-0 w-80 snap-center">
          <GalleryCard
            imageUrl={imageUrl}
            index={index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            onClick={() => onImageClick?.(imageUrl, index)}
            showActions={showActions}
          />
        </div>
      ))}
    </div>
  );
});

// ============================================
// GALLERY CARD - Carte photo individuelle (optimisée avec memo)
// ============================================

interface GalleryCardProps {
  imageUrl: string;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  showActions: boolean;
}

// Optimisé avec memo - évite re-render quand les props ne changent pas
const GalleryCard = memo(function GalleryCard({
  imageUrl,
  index,
  isHovered,
  onHover,
  onLeave,
  onClick,
  showActions,
}: GalleryCardProps) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ 
        animationDelay: `${index * 50}ms`,
        opacity: 0,
        animation: 'fadeInUp 0.3s ease-out forwards'
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Card className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-105">
        <AspectRatio ratio={1}>
          {/* Utiliser LazyImage optimisé avec intersection observer */}
          <LazyImage
            src={imageUrl}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover"
            onClick={onClick}
          />

          {/* Overlay + Actions */}
          {showActions && isHovered && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:text-pink-400"
                onClick={(e) => {
                  e.stopPropagation();
                  // Download logic
                }}
                aria-label="Download image"
              >
                <Download className="w-4 h-4" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:text-pink-400"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                aria-label="View full size"
              >
                <Eye className="w-4 h-4" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:text-pink-400"
                onClick={(e) => {
                  e.stopPropagation();
                  // Like logic
                }}
                aria-label="Like image"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          )}
        </AspectRatio>
      </Card>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
});
