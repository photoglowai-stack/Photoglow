import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface InstagramPreviewProps {
  previewImage?: string;
  username?: string;
  likes?: number;
}

export function InstagramPreview({ 
  previewImage = 'https://images.unsplash.com/photo-1515701599759-ebd9d17a09e8?w=1080',
  username = 'yourprofile',
  likes = 1247
}: InstagramPreviewProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('natural');

  const styles = [
    { id: 'natural', name: 'Natural', filter: 'brightness-100' },
    { id: 'vibrant', name: 'Vibrant', filter: 'saturate-150 contrast-105' },
    { id: 'soft', name: 'Soft', filter: 'brightness-105 contrast-95 saturate-110' },
    { id: 'dramatic', name: 'Dramatic', filter: 'contrast-125 brightness-95' },
    { id: 'vintage', name: 'Vintage', filter: 'sepia-20 contrast-110' }
  ];

  const getCurrentFilter = () => {
    return styles.find(s => s.id === selectedStyle)?.filter || 'brightness-100';
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in zoom-in-95 fade-in duration-500">
      {/* Instagram Post Card */}
      <div className="bg-black border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 p-0.5">
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-xs">👤</span>
              </div>
            </div>
            <span className="text-sm text-white">{username}</span>
          </div>
          <button className="text-white">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Image avec LazyImage */}
        <div className="relative aspect-square bg-gray-900">
          <LazyImage
            src={previewImage}
            alt="Instagram preview"
            className={`w-full h-full object-cover transition-all duration-500 ${getCurrentFilter()}`}
            blurhash="L5H2j=00~q00009F-;M{00Rj00M{"
          />
          
          {/* Style Badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-700">
            <span className="text-xs text-white">
              {styles.find(s => s.id === selectedStyle)?.name || 'Natural'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="transition-transform hover:scale-110"
              >
                <Heart 
                  className={`w-6 h-6 transition-all duration-200 ${isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-white'}`}
                />
              </button>
              <button className="transition-transform hover:scale-110">
                <MessageCircle className="w-6 h-6 text-white" />
              </button>
              <button className="transition-transform hover:scale-110">
                <Send className="w-6 h-6 text-white" />
              </button>
            </div>
            <button className="transition-transform hover:scale-110">
              <Bookmark className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Likes */}
          <div className="text-sm text-white">
            <span>
              {(likes + (isLiked ? 1 : 0)).toLocaleString()} likes
            </span>
          </div>

          {/* Caption */}
          <div className="text-sm text-white">
            <span className="mr-2">{username}</span>
            <span className="text-gray-300">
              Perfect selfie with AI ✨ #AISelfie #PhotoGlow
            </span>
          </div>

          {/* Time */}
          <div className="text-xs text-gray-400 uppercase">
            2 hours ago
          </div>
        </div>
      </div>

      {/* Style Selector */}
      <div className="mt-6 space-y-3">
        <h4 className="text-sm text-gray-300 text-center">Choose Your Style</h4>
        <div className="flex flex-wrap gap-2 justify-center">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedStyle === style.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
