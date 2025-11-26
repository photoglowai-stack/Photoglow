/**
 * @file useExamplePhotos - Hook pour charger les photos d'exemple
 * @description Récupère les photos d'exemple pour une catégorie avec fallback Unsplash
 * 
 * Fonctionnalités :
 * - Tente de charger depuis l'API Supabase
 * - Fallback automatique vers Unsplash si échec
 * - Timeout de 8 secondes pour éviter les hangs
 * - Transformation des données Supabase au format attendu
 * - Gestion d'erreurs gracieuse
 * 
 * Les photos sont utilisées pour :
 * - Exemples dans les galeries
 * - Previews dans IdeasPage
 * - Inspiration pour les utilisateurs
 */

import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

/**
 * Photo d'exemple depuis Supabase
 */
interface Photo {
  id: string;
  category: string;
  prompt: string;
  seed: number | null;
  image_url: string;
  source?: string;
  created_at: string;
}

// Fallback images from Unsplash if no photos in database
const FALLBACK_PHOTOS: Record<string, Array<{ prompt: string; image_url: string; seed: number }>> = {
  'ai-headshots': [
    { prompt: 'Professional headshot, studio lighting, white background', image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', seed: 56492 },
    { prompt: 'Glamour portrait with dramatic lighting, elegant pose', image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', seed: 73829 },
    { prompt: 'Business portrait in modern office setting', image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400', seed: 38571 }
  ],
  'ai-model-photo': [
    { prompt: 'Fashion model in luxury hotel lobby, designer outfit', image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400', seed: 94723 },
    { prompt: 'Editorial fashion shoot in Milan', image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', seed: 61482 },
    { prompt: 'High fashion photoshoot in Parisian cafe', image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400', seed: 25678 }
  ],
  'ai-dating-photos': [
    { prompt: 'Casual smile, natural outdoor lighting, park background', image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400', seed: 12345 },
    { prompt: 'Coffee shop setting, friendly expression, soft focus', image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', seed: 67890 },
    { prompt: 'Outdoor adventure, hiking trail, genuine laugh', image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', seed: 54321 }
  ],
  'ai-fitness-photos': [
    { prompt: 'Athletic woman running on beach at sunrise', image_url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400', seed: 41937 },
    { prompt: 'Fitness model in gym, dynamic pose, dramatic lighting', image_url: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=400', seed: 88264 },
    { prompt: 'Yoga pose on mountain summit, breathtaking view', image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400', seed: 52719 }
  ],
  'ai-lifestyle-travel': [
    { prompt: 'Woman walking through Tokyo at night, neon reflections', image_url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400', seed: 47571 },
    { prompt: 'Model in Paris streets, Eiffel Tower background, golden hour', image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', seed: 82346 },
    { prompt: 'Urban fashion shoot in New York City subway station', image_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400', seed: 19283 }
  ],
  'ai-realistic-photo': [
    { prompt: 'Hyper-realistic portrait, natural skin texture, studio setup', image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', seed: 24681 },
    { prompt: 'Photorealistic close-up, authentic details, soft lighting', image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', seed: 13579 },
  ],
  'ai-selfie-generator': [
    { prompt: 'Casual selfie, natural smile, soft daylight', image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', seed: 98765 },
    { prompt: 'Glamorous selfie, makeup, golden hour lighting', image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', seed: 45678 },
  ],
  'ai-portrait-generator': [
    { prompt: 'Artistic portrait, dramatic shadows, creative composition', image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', seed: 87654 },
    { prompt: 'Contemporary portrait, minimalist background, moody lighting', image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400', seed: 32198 },
  ],
  'ai-cosplay-fantasy': [
    { prompt: 'Fantasy character, magical forest background, ethereal lighting', image_url: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=400', seed: 11111 },
    { prompt: 'Cosplay warrior, dramatic pose, epic scenery', image_url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400', seed: 22222 },
  ],
};

/**
 * Hook pour charger les photos d'exemple d'une catégorie
 * 
 * Stratégie de chargement :
 * 1. Tente de charger depuis l'API Supabase
 * 2. Si timeout (8s) ou erreur, utilise fallback Unsplash
 * 3. Si pas de photos en base, utilise fallback Unsplash
 * 
 * Les photos fallback sont des images Unsplash de haute qualité
 * pré-sélectionnées pour chaque catégorie.
 * 
 * @param category - Slug de la catégorie (ex: 'ai-headshots')
 * @returns État de chargement et photos
 * 
 * @example
 * ```tsx
 * function PhotoGallery({ categoryId }: { categoryId: string }) {
 *   const { photos, isLoading, error } = useExamplePhotos(categoryId);
 *   
 *   if (isLoading) return <LoadingSkeleton variant="gallery" />;
 *   
 *   return (
 *     <div className="grid grid-cols-3 gap-4">
 *       {photos.map((photo, i) => (
 *         <img key={i} src={photo.image_url} alt={photo.prompt} />
 *       ))}
 *     </div>
 *   );
 * }
 * 
 * // Les photos incluent prompt et seed pour régénération
 * function RegenerateButton({ photo }: { photo: Photo }) {
 *   const regenerate = () => {
 *     generateImage({ prompt: photo.prompt, seed: photo.seed });
 *   };
 * }
 * ```
 */
export function useExamplePhotos(category: string) {
  const [photos, setPhotos] = useState<Array<{ id?: string; prompt: string; image_url: string; seed: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/list-photos?category=${category}`;
        console.log('[useExamplePhotos] Fetching from:', url);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout
        
        const response = await fetch(
          url,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            signal: controller.signal
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          console.warn('[useExamplePhotos] API error, using fallback photos');
          setPhotos(FALLBACK_PHOTOS[category] || FALLBACK_PHOTOS['ai-headshots']);
          setIsLoading(false);
          return;
        }

        const data = await response.json().catch(() => ({ photos: [] }));
        console.log('[useExamplePhotos] Response data:', data);
        
        if (data.photos && data.photos.length > 0) {
          // Transform Supabase photos to match expected format
          const transformedPhotos = data.photos.map((photo: Photo) => ({
            id: photo.id,
            prompt: photo.prompt,
            image_url: photo.image_url,
            seed: photo.seed ?? Math.floor(Math.random() * 100000), // Use random seed if null
          }));
          console.log('[useExamplePhotos] Using uploaded photos:', transformedPhotos.length);
          setPhotos(transformedPhotos);
        } else {
          // Use fallback photos if no photos in database
          console.log('[useExamplePhotos] No photos found, using fallback');
          setPhotos(FALLBACK_PHOTOS[category] || FALLBACK_PHOTOS['ai-headshots']);
        }
      } catch (err: any) {
        console.error('[useExamplePhotos] Error loading photos:', err);
        
        // Only set error message if it's not a timeout or network issue
        if (err.name !== 'AbortError' && !err.message.includes('Failed to fetch')) {
          setError(err.message);
        } else {
          console.log('[useExamplePhotos] Timeout or network error - using fallback photos');
        }
        
        // Use fallback photos on error
        setPhotos(FALLBACK_PHOTOS[category] || FALLBACK_PHOTOS['ai-headshots']);
      } finally {
        setIsLoading(false);
      }
    };

    if (category) {
      loadPhotos();
    }
  }, [category]);

  return { photos, isLoading, error };
}