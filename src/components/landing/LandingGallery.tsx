import { useLandingPhotos } from "../../hooks/useLandingPhotos";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { LazyImage } from "../shared/LazyImage";
import { AlertCircle, Image as ImageIcon } from "lucide-react";

export function LandingGallery() {
  const { photos, isLoading, error } = useLandingPhotos();

  return (
    <section className="relative py-12 md:py-16 px-4 md:px-6 bg-black" id="public-gallery">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-black" />
      <div className="relative max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-pink-300/80">Community</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Latest PhotoGlow results</h2>
            <p className="text-gray-400 max-w-2xl mt-2">
              Photos loaded from the live backend when available. We keep a curated fallback so the landing page is never empty.
            </p>
          </div>
          <Badge className="bg-white/10 text-white border-white/10 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            {photos.length} photos
          </Badge>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-200 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden bg-white/5 border-white/10">
              <div className="aspect-[4/5]">
                <LazyImage
                  src={photo.image_url}
                  alt={photo.prompt || "Generated photo"}
                  className="w-full h-full object-cover"
                  blurhash="L6H2j=00~q00009F-;M{00Rj00M{"
                />
              </div>
              <div className="p-3 space-y-1">
                <p className="text-sm text-white line-clamp-2">{photo.prompt || "PhotoGlow result"}</p>
                {photo.category && (
                  <Badge className="bg-pink-500/10 text-pink-200 border-pink-400/30">
                    {photo.category}
                  </Badge>
                )}
              </div>
            </Card>
          ))}

          {isLoading && (
            <div className="col-span-full text-center text-gray-300 py-10 animate-pulse">
              Loading gallery...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
