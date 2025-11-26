/**
 * Loading state pour /admin
 */

import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <LoadingSkeleton variant="full" />
      </div>
    </div>
  );
}
