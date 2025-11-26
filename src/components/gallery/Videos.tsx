import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { 
  Loader2, 
  Video, 
  Download, 
  Trash2,
  Play,
  ArrowLeft,
  Clock
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { projectId } from '../utils/supabase/info';

interface VideoItem {
  id: string;
  video_url: string;
  thumbnail_url?: string;
  prompt: string;
  source_image_url?: string;
  duration?: number;
  created_at: string;
}

interface VideosGalleryPageProps {
  onBack?: () => void;
  onCreateVideo?: () => void;
}

export function VideosGalleryPage({ onBack, onCreateVideo }: VideosGalleryPageProps) {
  const { session } = useAuth();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    if (session?.access_token) {
      loadVideos();
    }
  }, [session]);

  const loadVideos = async () => {
    if (!session?.access_token) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/videos`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load videos');
      }

      const data = await response.json();
      
      if (data.success && data.videos) {
        setVideos(data.videos);
      }
    } catch (error: any) {
      console.error('Error loading videos:', error);
      toast.error('Failed to load videos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (videoId: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    setDeletingId(videoId);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/videos/${videoId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete video');
      }

      setVideos(videos.filter(v => v.id !== videoId));
      toast.success('Video deleted successfully');
    } catch (error: any) {
      console.error('Error deleting video:', error);
      toast.error('Failed to delete video');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '~5s';
    return `${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0B0B0D]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button
                  onClick={onBack}
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </Button>
              )}
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  My Videos
                </h1>
                <p className="text-sm text-gray-400">
                  {videos.length} video{videos.length !== 1 ? 's' : ''} generated
                </p>
              </div>
            </div>
            
            {onCreateVideo && (
              <Button
                onClick={onCreateVideo}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Video className="w-4 h-4 mr-2" />
                Create New Video
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
            <p className="text-gray-400">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center mb-6">
              <Video className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No videos yet</h3>
            <p className="text-gray-400 text-center mb-6">
              Create your first AI video from an image
            </p>
            {onCreateVideo && (
              <Button
                onClick={onCreateVideo}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Video className="w-4 h-4 mr-2" />
                Create Video
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <Card
                key={video.id}
                className="bg-[#18181B] border-purple-500/30 overflow-hidden group hover:border-purple-500/60 transition-all"
              >
                <div className="relative aspect-square bg-black">
                  {playingId === video.id ? (
                    <video
                      src={video.video_url}
                      controls
                      autoPlay
                      loop
                      className="w-full h-full object-contain"
                      onEnded={() => setPlayingId(null)}
                    />
                  ) : (
                    <>
                      {video.thumbnail_url || video.source_image_url ? (
                        <img
                          src={video.thumbnail_url || video.source_image_url}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="w-16 h-16 text-gray-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => setPlayingId(video.id)}
                          className="w-16 h-16 rounded-full bg-purple-500 hover:bg-purple-600 flex items-center justify-center transition-transform hover:scale-110"
                        >
                          <Play className="w-8 h-8 text-white ml-1" />
                        </button>
                      </div>
                      {video.duration && (
                        <Badge className="absolute top-2 right-2 bg-black/70 text-white border-0">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDuration(video.duration)}
                        </Badge>
                      )}
                    </>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {video.prompt || 'No description'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(video.created_at)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(video.video_url)}
                      className="flex-1 bg-purple-500 hover:bg-purple-600 text-white h-8 text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      onClick={() => handleDelete(video.id)}
                      disabled={deletingId === video.id}
                      variant="outline"
                      className="bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/10 h-8 text-xs"
                    >
                      {deletingId === video.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
