import { Skeleton } from './ui/skeleton';

/**
 * Loading skeleton amélioré pour Suspense fallback
 * Remplace le spinner basique
 */
export function LoadingSkeleton() {
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
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="aspect-square bg-gray-800 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
