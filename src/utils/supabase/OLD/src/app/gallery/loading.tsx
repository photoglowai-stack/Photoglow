/**
 * Loading state pour /gallery
 */

import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <LoadingSkeleton variant="gallery" count={9} />
      </div>
    </div>
  );
}
