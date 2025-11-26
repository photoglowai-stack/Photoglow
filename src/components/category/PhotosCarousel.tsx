import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CategoryPhotosCarouselProps {
  photos: string[];
  categoryName: string;
}

export function CategoryPhotosCarousel({ photos, categoryName }: CategoryPhotosCarouselProps) {
  // Duplicate photos for seamless infinite scroll
  const duplicatedPhotos = [...photos, ...photos];

  return null;
}