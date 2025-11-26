import { useState, useRef, useEffect, memo } from 'react';
import { LazyImage } from '../shared/LazyImage';
import { Card } from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';

interface VirtualGalleryProps {
  images: string[];
  columns?: 2 | 3 | 4;
  onImageClick?: (url: string, index: number) => void;
  itemHeight?: number; // Hauteur d'une carte en pixels
}

/**
 * Virtual Gallery - Optimisé pour afficher des milliers d'images
 * Utilise le virtual scrolling pour ne render que les éléments visibles
 */
export const VirtualGallery = memo(function VirtualGallery({
  images,
  columns = 3,
  onImageClick,
  itemHeight = 350,
}: VirtualGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Gérer le scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    const handleResize = () => {
      setContainerHeight(container.clientHeight);
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial size
    setContainerHeight(container.clientHeight);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculer les indices visibles
  const itemsPerRow = columns;
  const rowHeight = itemHeight + 16; // 16px gap
  const totalRows = Math.ceil(images.length / itemsPerRow);
  const totalHeight = totalRows * rowHeight;

  const startRow = Math.floor(scrollTop / rowHeight);
  const endRow = Math.ceil((scrollTop + containerHeight) / rowHeight);
  
  // Overscan de 2 rows pour smooth scrolling
  const overscan = 2;
  const visibleStartRow = Math.max(0, startRow - overscan);
  const visibleEndRow = Math.min(totalRows, endRow + overscan);

  // Calculer les items visibles
  const visibleItems: Array<{ image: string; index: number; row: number; col: number }> = [];
  
  for (let row = visibleStartRow; row < visibleEndRow; row++) {
    for (let col = 0; col < itemsPerRow; col++) {
      const index = row * itemsPerRow + col;
      if (index < images.length) {
        visibleItems.push({
          image: images[index],
          index,
          row,
          col,
        });
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-y-auto"
      style={{ height: '600px' }} // Hauteur fixe pour le container
    >
      {/* Spacer pour simuler la hauteur totale */}
      <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
        {/* Grid container pour les items visibles */}
        <div
          className={`grid gap-4 absolute left-0 right-0 ${
            columns === 2
              ? 'grid-cols-2'
              : columns === 3
              ? 'grid-cols-3'
              : 'grid-cols-4'
          }`}
          style={{
            top: `${visibleStartRow * rowHeight}px`,
          }}
        >
          {visibleItems.map(({ image, index }) => (
            <VirtualGalleryCard
              key={index}
              imageUrl={image}
              index={index}
              onClick={() => onImageClick?.(image, index)}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-pink-500/30 text-xs text-gray-300">
        Showing {visibleStartRow * itemsPerRow + 1} - {Math.min(visibleEndRow * itemsPerRow, images.length)} of {images.length}
      </div>
    </div>
  );
});

// ============================================
// VIRTUAL GALLERY CARD - Optimisé pour virtual scrolling
// ============================================

interface VirtualGalleryCardProps {
  imageUrl: string;
  index: number;
  onClick: () => void;
}

const VirtualGalleryCard = memo(function VirtualGalleryCard({
  imageUrl,
  index,
  onClick,
}: VirtualGalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-105">
        <AspectRatio ratio={1}>
          <LazyImage
            src={imageUrl}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover"
            onClick={onClick}
          />

          {/* Hover overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-pink-500/90 px-4 py-2 rounded-full">
                <p className="text-white text-sm">View Image</p>
              </div>
            </div>
          )}
        </AspectRatio>
      </Card>
    </div>
  );
});
