/**
 * Loading state pour /create
 */

import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

export default function CreateLoading() {
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <LoadingSkeleton variant="full" />
      </div>
    </div>
  );
}
