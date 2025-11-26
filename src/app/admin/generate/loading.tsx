/**
 * Loading state pour admin generate page
 */

export default function LoadingAdminGenerate() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
        <p className="text-gray-400">Loading admin panel...</p>
      </div>
    </div>
  );
}
