/**
 * Page galerie - Affiche les photos récentes
 * 
 * @module app/gallery/page
 */

import { SEOHead } from '@/components/shared/SEOHead';
import { ImageGrid } from '@/components/feature';
import { api } from '@/lib/api';

/**
 * Gallery Page - RSC
 * 
 * Affiche les photos récentes de la galerie.
 * Composant serveur car pas d'interactivité (pour l'instant).
 * 
 * TODO: Ajouter pagination client-side
 * 
 * @returns Page complète
 */
export default async function GalleryPage() {
  // Fetch photos côté serveur
  let photos = [];
  let error = null;

  try {
    const result = await api.listRecent(30, 1);
    photos = result.photos;
  } catch (err) {
    console.error('Failed to fetch photos:', err);
    error = err instanceof Error ? err.message : 'Failed to load photos';
  }

  return (
    <>
      <SEOHead
        title="AI Photo Gallery | PhotoGlow"
        description="Browse stunning AI-generated photos created with PhotoGlow"
      />

      <div className="min-h-screen bg-black text-white py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              AI Photo Gallery
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore amazing AI-generated photos created by our community
            </p>
          </div>

          {/* Error state */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Gallery Grid */}
          {!error && (
            <ImageGrid
              photos={photos}
              columns={{ mobile: 1, tablet: 2, desktop: 3 }}
              showMetadata
              showStats
            />
          )}

          {/* Empty state */}
          {!error && photos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No photos yet. Be the first to create!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
