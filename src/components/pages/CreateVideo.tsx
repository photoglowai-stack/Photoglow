import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';
import { 
  Loader2, 
  Video, 
  Upload, 
  ArrowLeft,
  Download,
  Play
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from '../hooks/useAuth';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface CreateVideoPageProps {
  onBack?: () => void;
  initialImageUrl?: string;
}

export function CreateVideoPage({ onBack, initialImageUrl }: CreateVideoPageProps) {
  const { session } = useAuth();
  
  const [imageUrl, setImageUrl] = useState(initialImageUrl || '');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState('');
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (initialImageUrl) {
      setImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setUploadedImageFile(file);

    // Upload to Supabase Storage
    try {
      setUploadProgress(10);
      
      // Get signed upload URL
      const signedUrlResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ab844084/upload-signed-url`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type
          })
        }
      );

      if (!signedUrlResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { signedUrl, publicUrl } = await signedUrlResponse.json();
      
      setUploadProgress(50);

      // Upload file
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      setUploadProgress(100);
      setImageUrl(publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleGenerateVideo = async () => {
    if (!imageUrl || !prompt.trim()) {
      toast.error('Please provide an image and prompt');
      return;
    }

    if (!session?.access_token) {
      toast.error('Please sign in to generate videos');
      return;
    }

    setIsGenerating(true);
    setGeneratedVideoUrl('');

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_url: imageUrl,
          prompt: prompt.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate video');
      }

      const data = await response.json();
      
      if (data.success && data.video_url) {
        setGeneratedVideoUrl(data.video_url);
        toast.success('Video generated successfully!');
      } else {
        throw new Error(data.error || 'Failed to generate video');
      }
    } catch (error: any) {
      console.error('Error generating video:', error);
      toast.error(error.message || 'Failed to generate video');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadVideo = () => {
    if (generatedVideoUrl) {
      window.open(generatedVideoUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0B0B0D]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
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
                Create Video
              </h1>
              <p className="text-sm text-gray-400">
                Turn your image into an animated video
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="space-y-6">
            <Card className="bg-[#18181B] border-purple-500/30 p-6 space-y-6">
              <div className="space-y-3">
                <Label className="text-white font-semibold">Source Image</Label>
                
                {imageUrl ? (
                  <div className="space-y-3">
                    <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-purple-500/50">
                      <ImageWithFallback
                        src={imageUrl}
                        alt="Source image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      onClick={() => {
                        setImageUrl('');
                        setUploadedImageFile(null);
                      }}
                      variant="outline"
                      className="w-full bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div>
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-purple-500/50 rounded-lg cursor-pointer bg-[#0B0B0D] hover:bg-[#1a1a1d] transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 mb-3 text-purple-400" />
                        <p className="mb-2 text-sm text-gray-300">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    {uploadProgress > 0 && (
                      <Progress value={uploadProgress} className="mt-2" />
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-white font-semibold">
                  Animation Prompt
                </Label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the animation you want... (e.g., 'smiling and waving at camera', 'walking towards the camera', 'hair blowing in the wind')"
                  className="min-h-[120px] bg-[#0B0B0D] border-purple-500/50 text-white placeholder:text-gray-500 resize-none"
                />
                <p className="text-xs text-gray-500">
                  Describe the motion or animation you want to see
                </p>
              </div>

              <Button
                onClick={handleGenerateVideo}
                disabled={isGenerating || !imageUrl || !prompt.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Video...
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5 mr-2" />
                    Generate Video
                  </>
                )}
              </Button>

              {isGenerating && (
                <div className="text-center text-sm text-gray-400 space-y-1">
                  <p>⏱️ This may take 2-5 minutes...</p>
                  <p className="text-xs">Processing your video with AI</p>
                </div>
              )}
            </Card>
          </div>

          {/* Right: Preview */}
          <div className="space-y-6">
            <Card className="bg-[#18181B] border-purple-500/30 p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Preview</h3>
                
                {generatedVideoUrl ? (
                  <div className="space-y-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-purple-500/50 bg-black">
                      <video
                        src={generatedVideoUrl}
                        controls
                        autoPlay
                        loop
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleDownloadVideo}
                        className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Video
                      </Button>
                      <Button
                        onClick={() => {
                          setGeneratedVideoUrl('');
                          setPrompt('');
                        }}
                        variant="outline"
                        className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        Create New
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-700 rounded-lg">
                    <Play className="w-16 h-16 text-gray-600 mb-3" />
                    <p className="text-gray-500 text-sm">Your video will appear here</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Info Card */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 p-6">
              <h4 className="text-sm font-semibold text-purple-300 mb-2">💡 Tips for Best Results</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Use clear, high-quality images</li>
                <li>• Describe simple, natural movements</li>
                <li>• Keep prompts concise and specific</li>
                <li>• Videos are typically 3-5 seconds long</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
